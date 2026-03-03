# File Management Document
## PDFForge — Online PDF Tool Suite

---

## 1. File Lifecycle

### 1.1 Complete File Lifecycle Diagram
```
USER UPLOAD                    PROCESSING                  DOWNLOAD/CLEANUP
═══════════                    ══════════                  ════════════════

┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│  Select  │──▶│ Validate │──▶│  Upload  │──▶│  Store   │──▶│  Ready   │
│  File    │   │ (client) │   │ (stream) │   │  in S3   │   │  for     │
│          │   │          │   │          │   │          │   │  Process │
└──────────┘   └──────────┘   └──────────┘   └──────────┘   └────┬─────┘
                    │                              │               │
                 (invalid)                     (failed)        (job start)
                    │                              │               │
                    ▼                              ▼               ▼
              ┌──────────┐                  ┌──────────┐   ┌──────────┐
              │  Error   │                  │  Retry/  │   │ Worker   │
              │  Message │                  │  Error   │   │ Download │
              └──────────┘                  └──────────┘   └────┬─────┘
                                                                │
                                                           (processing)
                                                                │
                                                                ▼
                                                          ┌──────────┐
┌──────────┐   ┌──────────┐   ┌──────────┐              │  Output  │
│  Files   │◀──│  Cron    │◀──│  TTL     │              │  Upload  │
│  Deleted │   │  Cleanup │   │  Expires │◀─────────────│  to S3   │
│  from S3 │   │  Job     │   │          │              └────┬─────┘
└──────────┘   └──────────┘   └──────────┘                   │
                                    ▲                         │
                                    │                    (completed)
                                    │                         │
                              ┌──────────┐              ┌──────────┐
                              │  User    │◀─────────────│ Download │
                              │  Finishes│              │  Link    │
                              │          │              │  Ready   │
                              └──────────┘              └──────────┘
```

### 1.2 File States
| State | Description | Transitions |
|-------|-------------|-------------|
| `UPLOADING` | File being uploaded | → `UPLOADED` or → `DELETED` |
| `UPLOADED` | File in S3, ready for processing | → `PROCESSING` or → `EXPIRED` |
| `PROCESSING` | Currently being processed by worker | → `UPLOADED` (done) |
| `DELETED` | Manually deleted by user | Terminal |
| `EXPIRED` | Auto-deleted by cleanup | Terminal |

---

## 2. Storage Architecture

### 2.1 S3 Bucket Structure
```
pdfforge-input/                    # Input files bucket
├── 2024/
│   ├── 01/
│   │   ├── 15/
│   │   │   ├── {uuid1}.pdf
│   │   │   ├── {uuid2}.pdf
│   │   │   ├── {uuid3}.jpg
│   │   │   └── {uuid4}.png
│   │   └── 16/
│   │       └── ...
│   └── 02/
│       └── ...
└── ...

pdfforge-output/                   # Output files bucket
├── 2024/
│   ├── 01/
│   │   ├── 15/
│   │   │   ├── {job-uuid1}.pdf
│   │   │   ├── {job-uuid2}.zip    # Multi-file outputs
│   │   │   └── {job-uuid3}.pdf
│   │   └─��� ...
│   └── ...
└── ...
```

### 2.2 Storage Key Format
```
Input files:  input/{YYYY}/{MM}/{DD}/{uuid}.{ext}
Output files: output/{YYYY}/{MM}/{DD}/{job-uuid}.{ext}

Examples:
  input/2024/01/15/a8f3b2c1-d4e5-6f7a-8b9c-0d1e2f3a4b5c.pdf
  output/2024/01/15/j-7c8d9e0f-1a2b-3c4d-5e6f-7a8b9c0d1e2f.pdf
  output/2024/01/15/j-7c8d9e0f-1a2b-3c4d-5e6f-7a8b9c0d1e2f.zip
```

### 2.3 S3 Bucket Policies
```json
// Input bucket policy
{
  "Rules": [
    {
      "ID": "AutoDeleteInput",
      "Status": "Enabled",
      "Filter": { "Prefix": "input/" },
      "Expiration": { "Days": 1 },
      "NoncurrentVersionExpiration": { "NoncurrentDays": 1 }
    }
  ]
}

// Output bucket policy
{
  "Rules": [
    {
      "ID": "AutoDeleteOutput",
      "Status": "Enabled",
      "Filter": { "Prefix": "output/" },
      "Expiration": { "Days": 1 },
      "NoncurrentVersionExpiration": { "NoncurrentDays": 1 }
    }
  ]
}
```

---

## 3. Upload Pipeline

### 3.1 Client-Side Validation (before upload)
```typescript
// Validation rules applied in browser

const VALIDATION_RULES = {
  merge: {
    accept: ['.pdf'],
    mimeTypes: ['application/pdf'],
    maxFiles: 20,
    maxFileSize: { free: 25_000_000, pro: 100_000_000, business: 250_000_000 },
    maxTotalSize: { free: 50_000_000, pro: 200_000_000, business: 500_000_000 },
  },
  split: {
    accept: ['.pdf'],
    mimeTypes: ['application/pdf'],
    maxFiles: 1,
    maxFileSize: { free: 25_000_000, pro: 100_000_000, business: 250_000_000 },
  },
  compress: {
    accept: ['.pdf'],
    mimeTypes: ['application/pdf'],
    maxFiles: 1,  // batch: 10(pro), 50(business)
    maxFileSize: { free: 25_000_000, pro: 100_000_000, business: 250_000_000 },
  },
  'pdf-to-jpg': {
    accept: ['.pdf'],
    mimeTypes: ['application/pdf'],
    maxFiles: 1,
    maxFileSize: { free: 25_000_000, pro: 100_000_000, business: 250_000_000 },
    maxPages: { free: 50, pro: 200, business: 500 },
  },
  'jpg-to-pdf': {
    accept: ['.jpg', '.jpeg', '.png', '.webp'],
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles: 20,
    maxFileSize: { free: 10_000_000, pro: 25_000_000, business: 50_000_000 },
  },
};
```

### 3.2 Server-Side Validation (on upload)
```typescript
// Validation pipeline on backend

class FileValidationPipeline {
  
  // Step 1: Check file extension
  validateExtension(filename: string, allowedExtensions: string[]): boolean

  // Step 2: Check MIME type from Content-Type header
  validateMimeType(mimeType: string, allowedTypes: string[]): boolean

  // Step 3: Magic bytes validation (most important!)
  validateMagicBytes(buffer: Buffer): FileType
  // PDF: starts with %PDF (0x25 0x50 0x44 0x46)
  // JPEG: starts with 0xFF 0xD8 0xFF
  // PNG: starts with 0x89 0x50 0x4E 0x47
  // ZIP: starts with 0x50 0x4B 0x03 0x04

  // Step 4: File size check against user tier
  validateFileSize(size: number, tier: string, tool: string): boolean

  // Step 5: Virus scan (ClamAV)
  async scanForVirus(buffer: Buffer): Promise<ScanResult>
  // Returns: { clean: boolean, threat?: string }

  // Step 6: PDF integrity check (for PDF files)
  async validatePdfIntegrity(buffer: Buffer): Promise<PdfInfo>
  // Uses qpdf --check to verify PDF structure
  // Returns: { valid: boolean, pages: number, encrypted: boolean }
}
```

### 3.3 Upload Flow Implementation
```typescript
// Upload controller pseudocode

@Post('upload')
@UseInterceptors(FileInterceptor('file', multerConfig))
async uploadFile(
  @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  @CurrentUser() user?: UserPayload,
  @Ip() ip: string,
) {
  // 1. Determine user tier
  const tier = user ? await this.getUserTier(user.id) : 'anonymous';

  // 2. Check rate limits
  await this.rateLimiter.checkUploadLimit(user?.id || ip, tier);

  // 3. Validate file (magic bytes, size, virus scan)
  const validation = await this.validator.validate(file, tier);
  if (!validation.valid) {
    throw new BadRequestException(validation.error);
  }

  // 4. Generate storage key
  const storageKey = this.generateStorageKey(file);

  // 5. Upload to S3
  await this.storage.upload(file.buffer, storageKey, file.mimetype);

  // 6. Create DB record
  const fileRecord = await this.prisma.file.create({
    data: {
      userId: user?.id,
      originalName: file.originalname,
      storedName: path.basename(storageKey),
      mimeType: file.mimetype,
      size: file.size,
      pages: validation.pages,
      storageKey: storageKey,
      bucket: 'pdfforge-input',
      status: 'UPLOADED',
      virusScanned: true,
      checksum: validation.checksum,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    },
  });

  // 7. Return response
  return {
    fileId: fileRecord.id,
    fileName: file.originalname,
    size: file.size,
    pages: validation.pages,
    uploadedAt: fileRecord.createdAt,
    expiresAt: fileRecord.expiresAt,
  };
}
```

---

## 4. Processing File Handling

### 4.1 Worker Temp Directory Management
```typescript
// Each job gets an isolated temp directory

class TempDirectoryManager {
  private readonly baseDir = '/tmp/pdfforge-worker';

  // Create isolated temp dir for a job
  async createJobDir(jobId: string): Promise<string> {
    const dir = path.join(this.baseDir, jobId);
    await fs.mkdir(dir, { recursive: true });
    await fs.mkdir(path.join(dir, 'input'), { recursive: true });
    await fs.mkdir(path.join(dir, 'output'), { recursive: true });
    return dir;
  }

  // Structure:
  // /tmp/pdfforge-worker/
  //   └── {jobId}/
  //       ├── input/
  //       │   ├── file1.pdf
  //       │   └── file2.pdf
  //       └── output/
  //           └── merged.pdf

  // Cleanup after job (always in finally block)
  async cleanupJobDir(jobId: string): Promise<void> {
    const dir = path.join(this.baseDir, jobId);
    await fs.rm(dir, { recursive: true, force: true });
  }

  // Emergency cleanup (on worker start, clear stale dirs)
  async cleanupStale(maxAgeMs: number = 3600000): Promise<void> {
    const entries = await fs.readdir(this.baseDir);
    for (const entry of entries) {
      const stat = await fs.stat(path.join(this.baseDir, entry));
      if (Date.now() - stat.mtimeMs > maxAgeMs) {
        await fs.rm(path.join(this.baseDir, entry), { recursive: true, force: true });
      }
    }
  }
}
```

### 4.2 Processing Commands per Tool
```typescript
// Tool-specific command configurations

const TOOL_COMMANDS = {
  merge: {
    binary: 'qpdf',
    buildArgs: (inputFiles: string[], outputPath: string) => [
      '--empty',
      '--pages',
      ...inputFiles.flatMap(f => [f, '--']),
      outputPath,
    ],
    timeout: 60000,  // 60s
  },

  split: {
    binary: 'qpdf',
    buildArgs: (inputFile: string, outputPath: string, ranges: string) => [
      inputFile,
      '--pages', inputFile, ranges, '--',
      outputPath,
    ],
    timeout: 60000,
  },

  compress: {
    binary: 'gs',  // Ghostscript
    buildArgs: (inputFile: string, outputPath: string, level: string) => {
      const settings = {
        low: '/prepress',
        medium: '/ebook',
        high: '/screen',
      };
      return [
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        `-dPDFSETTINGS=${settings[level]}`,
        '-dNOPAUSE',
        '-dBATCH',
        `-sOutputFile=${outputPath}`,
        inputFile,
      ];
    },
    timeout: 120000,  // 120s
  },

  'pdf-to-jpg': {
    binary: 'pdftoppm',  // Poppler
    buildArgs: (inputFile: string, outputPrefix: string, dpi: number) => [
      `-jpeg`,
      `-r`, String(dpi),
      inputFile,
      outputPrefix,
    ],
    timeout: 120000,
  },

  'jpg-to-pdf': {
    binary: 'convert',  // ImageMagick
    buildArgs: (inputFiles: string[], outputPath: string, pageSize: string) => [
      ...inputFiles,
      '-quality', '95',
      '-page', pageSize,
      outputPath,
    ],
    timeout: 60000,
  },
};
```

---

## 5. Download Management

### 5.1 Signed URL Generation
```typescript
class DownloadService {
  
  // Generate short-lived signed URL for download
  async getDownloadUrl(jobId: string, userId?: string): Promise<DownloadInfo> {
    // 1. Find job
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        jobFiles: {
          where: { role: 'OUTPUT' },
          include: { file: true },
        },
      },
    });

    // 2. Verify access (owner or anonymous job matched by session)
    this.verifyAccess(job, userId);

    // 3. Check if output file still exists
    const outputFile = job.jobFiles[0]?.file;
    if (!outputFile || outputFile.status === 'EXPIRED') {
      throw new GoneException('File has expired and been deleted.');
    }

    // 4. Generate signed URL (expires in 10 minutes)
    const signedUrl = await this.storage.getSignedUrl(
      outputFile.storageKey,
      600, // 10 minutes
    );

    return {
      url: signedUrl,
      fileName: this.getOutputFileName(job),
      size: outputFile.size,
      expiresAt: new Date(Date.now() + 600000),
    };
  }

  // Output file naming convention
  private getOutputFileName(job: Job): string {
    const toolName = job.toolType.toLowerCase().replace('_', '-');
    const inputName = job.jobFiles
      .find(jf => jf.role === 'INPUT')
      ?.file.originalName.replace(/\.[^/.]+$/, '');
    
    const nameMap = {
      MERGE: `merged-${inputName || 'document'}.pdf`,
      SPLIT: `split-${inputName || 'document'}.pdf`,
      COMPRESS: `compressed-${inputName || 'document'}.pdf`,
      PDF_TO_JPG: `${inputName || 'pages'}.zip`,
      JPG_TO_PDF: `converted-images.pdf`,
    };

    return nameMap[job.toolType] || `output-${job.id}.pdf`;
  }
}
```

---

## 6. Cleanup System

### 6.1 Cleanup Cron Service
```typescript
// src/cleanup/cleanup.service.ts

@Injectable()
class CleanupService {
  private readonly logger = new Logger(CleanupService.name);

  // Run every 15 minutes
  @Cron('*/15 * * * *')
  async cleanupExpiredFiles(): Promise<void> {
    this.logger.log('Starting file cleanup...');

    const batchSize = 100;
    let totalDeleted = 0;

    while (true) {
      // Find expired files
      const expiredFiles = await this.prisma.file.findMany({
        where: {
          expiresAt: { lt: new Date() },
          status: { notIn: ['DELETED', 'EXPIRED'] },
        },
        take: batchSize,
        select: { id: true, storageKey: true, bucket: true },
      });

      if (expiredFiles.length === 0) break;

      // Delete from S3 in batch
      const keys = expiredFiles.map(f => f.storageKey);
      await this.storage.deleteMultiple(keys);

      // Update DB records
      await this.prisma.file.updateMany({
        where: { id: { in: expiredFiles.map(f => f.id) } },
        data: { status: 'EXPIRED' },
      });

      totalDeleted += expiredFiles.length;
    }

    this.logger.log(`Cleanup complete. Deleted ${totalDeleted} files.`);
  }

  // Run daily at 3 AM — clean up old job records
  @Cron('0 3 * * *')
  async cleanupOldRecords(): Promise<void> {
    // Delete job records older than 90 days
    const cutoff = new Date(Date.now() - 90 * 24 * 3600 * 1000);
    
    const deleted = await this.prisma.job.deleteMany({
      where: { createdAt: { lt: cutoff } },
    });

    this.logger.log(`Cleaned up ${deleted.count} old job records.`);
  }

  // Run daily — clean up expired refresh tokens
  @Cron('0 4 * * *')
  async cleanupExpiredTokens(): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { revokedAt: { not: null } },
        ],
      },
    });
  }
}
```

### 6.2 Cleanup Monitoring
```typescript
// Metrics to track for cleanup
const cleanupMetrics = {
  'cleanup.files_deleted': Counter,       // Total files deleted
  'cleanup.bytes_freed': Counter,         // Total bytes freed
  'cleanup.duration_ms': Histogram,       // Cleanup job duration
  'cleanup.errors': Counter,              // Cleanup errors
  'storage.total_files': Gauge,           // Current file count
  'storage.total_bytes': Gauge,           // Current storage usage
  'storage.expired_pending': Gauge,       // Files past TTL not yet cleaned
};
```

---

## 7. Security Measures

### 7.1 File Security Checklist
```
✅ Randomized file names (UUIDv4) — never use original name for storage
✅ No directory listing on S3 buckets
✅ No public read access on buckets
✅ Signed URLs with short expiry (10 min for downloads)
✅ Virus scanning on all uploads (ClamAV)
✅ Magic bytes validation (don't trust Content-Type header)
✅ File size limits enforced server-side
✅ PDF structure validation (qpdf --check)
✅ No executable file types allowed
✅ Server-side encryption (AES-256 on S3)
✅ TLS in transit
✅ Temp files cleaned immediately after processing
✅ Worker processes run as non-root user
✅ seccomp profiles for worker containers
✅ No symlink following in temp directories
```

### 7.2 Malicious PDF Protection
```typescript
// Additional PDF safety checks

async function validatePdfSafety(filePath: string): Promise<SafetyResult> {
  // 1. Check for JavaScript in PDF (common attack vector)
  const hasJS = await checkPdfForJavaScript(filePath);
  
  // 2. Check for embedded files/attachments
  const hasEmbedded = await checkPdfForEmbedded(filePath);
  
  // 3. Check for form actions (auto-submit)
  const hasFormActions = await checkPdfForFormActions(filePath);
  
  // 4. Check file size vs page count ratio (zip bomb detection)
  const sizeRatio = fileSize / pageCount;
  const isSuspicious = sizeRatio > 100_000_000; // 100MB per page
  
  return {
    safe: !hasJS && !hasEmbedded && !isSuspicious,
    warnings: [
      hasJS && 'PDF contains JavaScript',
      hasEmbedded && 'PDF contains embedded files',
      hasFormActions && 'PDF contains form actions',
      isSuspicious && 'Suspicious file size ratio',
    ].filter(Boolean),
  };
}
```