# Test Cases Document
## PDFForge — Online PDF Tool Suite

---

## 1. Testing Strategy

### 1.1 Testing Pyramid
```
          ╱╲
         ╱  ╲          E2E Tests (Playwright)
        ╱    ╲         ~20 tests — Critical user flows
       ╱──────╲
      ╱        ╲       Integration Tests (Jest + Supertest)
     ╱          ╲      ~80 tests — API endpoints, DB, Queue
    ╱────────────╲
   ╱              ╲    Unit Tests (Jest)
  ╱                ╲   ~200 tests — Services, validators, utils
 ╱──────────────────╲
```

### 1.2 Test Configuration
```typescript
// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

---

## 2. Unit Tests

### 2.1 File Validation Tests
```typescript
// test/unit/upload/file-validation.spec.ts

describe('FileValidationPipeline', () => {
  
  // ─── Extension Validation ────────────────────────
  
  describe('validateExtension', () => {
    it('TC-UV-001: should accept .pdf extension', () => {
      expect(validator.validateExtension('doc.pdf', ['.pdf'])).toBe(true);
    });

    it('TC-UV-002: should accept .PDF (case insensitive)', () => {
      expect(validator.validateExtension('doc.PDF', ['.pdf'])).toBe(true);
    });

    it('TC-UV-003: should reject .exe extension', () => {
      expect(validator.validateExtension('virus.exe', ['.pdf'])).toBe(false);
    });

    it('TC-UV-004: should reject double extension attack (.pdf.exe)', () => {
      expect(validator.validateExtension('doc.pdf.exe', ['.pdf'])).toBe(false);
    });

    it('TC-UV-005: should reject no extension', () => {
      expect(validator.validateExtension('document', ['.pdf'])).toBe(false);
    });

    it('TC-UV-006: should accept .jpg for image tools', () => {
      expect(validator.validateExtension('photo.jpg', ['.jpg', '.jpeg', '.png'])).toBe(true);
    });
  });

  // ─── Magic Bytes Validation ──────────────────────
  
  describe('validateMagicBytes', () => {
    it('TC-UV-010: should identify valid PDF (starts with %PDF)', () => {
      const buffer = Buffer.from('%PDF-1.4 ...', 'ascii');
      expect(validator.validateMagicBytes(buffer)).toBe('application/pdf');
    });

    it('TC-UV-011: should identify valid JPEG', () => {
      const buffer = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]);
      expect(validator.validateMagicBytes(buffer)).toBe('image/jpeg');
    });

    it('TC-UV-012: should identify valid PNG', () => {
      const buffer = Buffer.from([0x89, 0x50, 0x4E, 0x47]);
      expect(validator.validateMagicBytes(buffer)).toBe('image/png');
    });

    it('TC-UV-013: should reject EXE disguised as PDF', () => {
      const buffer = Buffer.from([0x4D, 0x5A]); // MZ header
      expect(validator.validateMagicBytes(buffer)).not.toBe('application/pdf');
    });

    it('TC-UV-014: should reject empty file', () => {
      const buffer = Buffer.alloc(0);
      expect(() => validator.validateMagicBytes(buffer)).toThrow('Empty file');
    });

    it('TC-UV-015: should reject file with wrong magic bytes for claimed type', () => {
      const pngBuffer = Buffer.from([0x89, 0x50, 0x4E, 0x47]);
      expect(validator.validateMagicBytes(pngBuffer)).not.toBe('application/pdf');
    });
  });

  // ─── File Size Validation ────────────────────────
  
  describe('validateFileSize', () => {
    it('TC-UV-020: should accept file under free tier limit (25MB)', () => {
      expect(validator.validateFileSize(10_000_000, 'free', 'merge')).toBe(true);
    });

    it('TC-UV-021: should reject file over free tier limit', () => {
      expect(validator.validateFileSize(30_000_000, 'free', 'merge')).toBe(false);
    });

    it('TC-UV-022: should accept 100MB file for pro tier', () => {
      expect(validator.validateFileSize(100_000_000, 'pro', 'merge')).toBe(true);
    });

    it('TC-UV-023: should reject 0-byte file', () => {
      expect(validator.validateFileSize(0, 'free', 'merge')).toBe(false);
    });

    it('TC-UV-024: should accept file at exact limit boundary', () => {
      expect(validator.validateFileSize(25_000_000, 'free', 'merge')).toBe(true);
    });
  });
});
```

### 2.2 Auth Service Tests
```typescript
// test/unit/auth/auth.service.spec.ts

describe('AuthService', () => {
  
  describe('register', () => {
    it('TC-AU-001: should register user with valid email/password', async () => {
      const result = await authService.register({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
      });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
    });

    it('TC-AU-002: should reject duplicate email', async () => {
      await authService.register({ email: 'dup@test.com', password: 'Pass123!' });
      await expect(
        authService.register({ email: 'dup@test.com', password: 'Pass456!' })
      ).rejects.toThrow('Email already registered');
    });

    it('TC-AU-003: should reject weak password (< 8 chars)', async () => {
      await expect(
        authService.register({ email: 'test@test.com', password: '123' })
      ).rejects.toThrow('Password too weak');
    });

    it('TC-AU-004: should hash password (never store plain text)', async () => {
      await authService.register({ email: 'hash@test.com', password: 'MyPass123!' });
      const user = await prisma.user.findUnique({ where: { email: 'hash@test.com' } });
      expect(user.passwordHash).not.toBe('MyPass123!');
      expect(user.passwordHash).toMatch(/^\$2[aby]\$/); // bcrypt format
    });

    it('TC-AU-005: should create FREE subscription by default', async () => {
      const result = await authService.register({ email: 'new@test.com', password: 'Pass123!' });
      const sub = await prisma.subscription.findUnique({ where: { userId: result.user.id } });
      expect(sub.plan).toBe('FREE');
    });
  });

  describe('login', () => {
    it('TC-AU-010: should login with correct credentials', async () => {
      const result = await authService.login({ email: 'test@test.com', password: 'Pass123!' });
      expect(result).toHaveProperty('accessToken');
    });

    it('TC-AU-011: should reject wrong password', async () => {
      await expect(
        authService.login({ email: 'test@test.com', password: 'WrongPass!' })
      ).rejects.toThrow('Invalid credentials');
    });

    it('TC-AU-012: should reject non-existent email', async () => {
      await expect(
        authService.login({ email: 'ghost@test.com', password: 'Pass123!' })
      ).rejects.toThrow('Invalid credentials');
    });

    it('TC-AU-013: should reject suspended account', async () => {
      // ... setup suspended user
      await expect(
        authService.login({ email: 'suspended@test.com', password: 'Pass123!' })
      ).rejects.toThrow('Account suspended');
    });
  });

  describe('refreshToken', () => {
    it('TC-AU-020: should issue new tokens with valid refresh token', async () => {
      const { refreshToken } = await authService.login({ email: 'test@test.com', password: 'Pass123!' });
      const result = await authService.refreshToken(refreshToken);
      expect(result).toHaveProperty('accessToken');
      expect(result.accessToken).not.toBe(refreshToken);
    });

    it('TC-AU-021: should reject expired refresh token', async () => {
      // ... setup expired token
      await expect(authService.refreshToken('expired-token')).rejects.toThrow();
    });

    it('TC-AU-022: should reject revoked refresh token', async () => {
      // ... setup revoked token
      await expect(authService.refreshToken('revoked-token')).rejects.toThrow();
    });

    it('TC-AU-023: should rotate refresh token (old one invalid)', async () => {
      const { refreshToken: oldToken } = await authService.login({ ... });
      await authService.refreshToken(oldToken);
      await expect(authService.refreshToken(oldToken)).rejects.toThrow();
    });
  });
});
```

### 2.3 Jobs Service Tests
```typescript
// test/unit/jobs/jobs.service.spec.ts

describe('JobsService', () => {

  describe('createJob', () => {
    it('TC-JB-001: should create merge job with valid inputs', async () => {
      const job = await jobsService.createJob({
        tool: 'merge',
        fileIds: ['file1', 'file2'],
        options: {},
      });
      expect(job.status).toBe('QUEUED');
      expect(job).toHaveProperty('jobId');
    });

    it('TC-JB-002: should reject job with non-existent file IDs', async () => {
      await expect(
        jobsService.createJob({ tool: 'merge', fileIds: ['nonexistent'] })
      ).rejects.toThrow('File not found');
    });

    it('TC-JB-003: should reject merge with single file', async () => {
      await expect(
        jobsService.createJob({ tool: 'merge', fileIds: ['file1'] })
      ).rejects.toThrow('Merge requires at least 2 files');
    });

    it('TC-JB-004: should reject job exceeding rate limit', async () => {
      // Create max jobs for free tier
      for (let i = 0; i < 10; i++) {
        await jobsService.createJob({ tool: 'compress', fileIds: ['file1'] });
      }
      await expect(
        jobsService.createJob({ tool: 'compress', fileIds: ['file1'] })
      ).rejects.toThrow('Rate limit exceeded');
    });

    it('TC-JB-005: should set priority based on user tier', async () => {
      const proJob = await jobsService.createJob(
        { tool: 'merge', fileIds: ['f1', 'f2'] },
        proUserId
      );
      expect(proJob.priority).toBe(2); // Pro priority
    });

    it('TC-JB-006: should reject invalid tool type', async () => {
      await expect(
        jobsService.createJob({ tool: 'invalid-tool', fileIds: ['f1'] })
      ).rejects.toThrow('Invalid tool type');
    });
  });

  describe('getJobStatus', () => {
    it('TC-JB-010: should return queued status', async () => {
      const { jobId } = await jobsService.createJob({ ... });
      const status = await jobsService.getJobStatus(jobId);
      expect(status.status).toBe('QUEUED');
    });

    it('TC-JB-011: should return completed status with download URL', async () => {
      // ... setup completed job
      const status = await jobsService.getJobStatus(completedJobId);
      expect(status.status).toBe('COMPLETED');
      expect(status.result).toHaveProperty('downloadUrl');
    });

    it('TC-JB-012: should return failed status with error details', async () => {
      // ... setup failed job
      const status = await jobsService.getJobStatus(failedJobId);
      expect(status.status).toBe('FAILED');
      expect(status).toHaveProperty('errorCode');
      expect(status).toHaveProperty('errorMessage');
    });

    it('TC-JB-013: should return 404 for non-existent job', async () => {
      await expect(
        jobsService.getJobStatus('nonexistent-job')
      ).rejects.toThrow('Job not found');
    });
  });
});
```

### 2.4 Processing Tests
```typescript
// test/unit/processors/merge.processor.spec.ts

describe('MergeProcessor', () => {

  it('TC-PR-001: should merge 2 PDFs successfully', async () => {
    const result = await mergeProcessor.process({
      inputFiles: ['test/fixtures/page1.pdf', 'test/fixtures/page2.pdf'],
      options: {},
    });
    expect(result.outputPath).toBeDefined();
    expect(fs.existsSync(result.outputPath)).toBe(true);
  });

  it('TC-PR-002: should merge 20 PDFs (max for free)', async () => {
    const files = Array.from({ length: 20 }, (_, i) => `test/fixtures/page${i + 1}.pdf`);
    const result = await mergeProcessor.process({ inputFiles: files, options: {} });
    expect(result.outputPath).toBeDefined();
  });

  it('TC-PR-003: should preserve page order', async () => {
    const result = await mergeProcessor.process({
      inputFiles: ['test/fixtures/labeled-1.pdf', 'test/fixtures/labeled-2.pdf'],
      options: {},
    });
    const pageLabels = await extractPageLabels(result.outputPath);
    expect(pageLabels).toEqual(['Page 1', 'Page 2']);
  });

  it('TC-PR-004: should handle encrypted PDF input', async () => {
    await expect(
      mergeProcessor.process({
        inputFiles: ['test/fixtures/encrypted.pdf'],
        options: {},
      })
    ).rejects.toThrow('ENCRYPTED_PDF');
  });

  it('TC-PR-005: should cleanup temp files on error', async () => {
    const tempDir = '/tmp/pdfforge-worker/test-job';
    try {
      await mergeProcessor.process({
        inputFiles: ['test/fixtures/corrupt.pdf'],
        options: {},
      });
    } catch {
      // expected
    }
    expect(fs.existsSync(tempDir)).toBe(false);
  });

  it('TC-PR-006: should timeout after configured limit', async () => {
    const hugePdf = 'test/fixtures/huge-500pages.pdf';
    await expect(
      mergeProcessor.process({
        inputFiles: [hugePdf, hugePdf],
        options: {},
        timeout: 1000, // 1 second
      })
    ).rejects.toThrow('PROCESSING_TIMEOUT');
  });
});

// test/unit/processors/compress.processor.spec.ts

describe('CompressProcessor', () => {

  it('TC-PR-010: should reduce file size at medium level', async () => {
    const originalSize = fs.statSync('test/fixtures/large.pdf').size;
    const result = await compressProcessor.process({
      inputFile: 'test/fixtures/large.pdf',
      options: { level: 'medium' },
    });
    const compressedSize = fs.statSync(result.outputPath).size;
    expect(compressedSize).toBeLessThan(originalSize);
  });

  it('TC-PR-011: should maintain valid PDF after compression', async () => {
    const result = await compressProcessor.process({
      inputFile: 'test/fixtures/large.pdf',
      options: { level: 'high' },
    });
    const isValid = await validatePdf(result.outputPath);
    expect(isValid).toBe(true);
  });

  it('TC-PR-012: should handle already-compressed PDF gracefully', async () => {
    const result = await compressProcessor.process({
      inputFile: 'test/fixtures/already-compressed.pdf',
      options: { level: 'medium' },
    });
    expect(result.outputPath).toBeDefined();
    // Size might not decrease much, but shouldn't error
  });
});

// test/unit/processors/split.processor.spec.ts

describe('SplitProcessor', () => {

  it('TC-PR-020: should split by range "1-3"', async () => {
    const result = await splitProcessor.process({
      inputFile: 'test/fixtures/10pages.pdf',
      options: { mode: 'ranges', ranges: '1-3' },
    });
    const pageCount = await getPdfPageCount(result.outputPath);
    expect(pageCount).toBe(3);
  });

  it('TC-PR-021: should split by specific pages "1,3,5"', async () => {
    const result = await splitProcessor.process({
      inputFile: 'test/fixtures/10pages.pdf',
      options: { mode: 'pages', pages: '1,3,5' },
    });
    const pageCount = await getPdfPageCount(result.outputPath);
    expect(pageCount).toBe(3);
  });

  it('TC-PR-022: should reject invalid page range "0-5"', async () => {
    await expect(
      splitProcessor.process({
        inputFile: 'test/fixtures/10pages.pdf',
        options: { mode: 'ranges', ranges: '0-5' },
      })
    ).rejects.toThrow('INVALID_PAGE_RANGE');
  });

  it('TC-PR-023: should reject page beyond document "1-50" for 10-page doc', async () => {
    await expect(
      splitProcessor.process({
        inputFile: 'test/fixtures/10pages.pdf',
        options: { mode: 'ranges', ranges: '1-50' },
      })
    ).rejects.toThrow('PAGE_OUT_OF_RANGE');
  });
});
```

---

## 3. Integration Tests

### 3.1 Upload API Integration
```typescript
// test/integration/upload.integration.spec.ts

describe('POST /api/v1/upload', () => {

  it('TC-INT-001: should upload PDF and return fileId', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/upload')
      .attach('file', 'test/fixtures/sample.pdf')
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('fileId');
    expect(res.body.data.mimeType).toBe('application/pdf');
  });

  it('TC-INT-002: should reject non-PDF for PDF tools', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/upload')
      .attach('file', 'test/fixtures/malware.exe')
      .expect(400);

    expect(res.body.error.code).toBe('INVALID_FILE_TYPE');
  });

  it('TC-INT-003: should reject oversized file for free tier', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/upload')
      .attach('file', 'test/fixtures/30mb.pdf')
      .expect(413);

    expect(res.body.error.code).toBe('FILE_TOO_LARGE');
  });

  it('TC-INT-004: should accept large file for pro user', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/upload')
      .set('Authorization', `Bearer ${proUserToken}`)
      .attach('file', 'test/fixtures/50mb.pdf')
      .expect(201);

    expect(res.body.success).toBe(true);
  });

  it('TC-INT-005: should store file in S3 after upload', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/upload')
      .attach('file', 'test/fixtures/sample.pdf')
      .expect(201);

    const file = await prisma.file.findUnique({ where: { id: res.body.data.fileId } });
    const exists = await storageService.exists(file.storageKey);
    expect(exists).toBe(true);
  });
});
```

### 3.2 Job API Integration
```typescript
// test/integration/jobs.integration.spec.ts

describe('Jobs API Integration', () => {

  describe('POST /api/v1/jobs', () => {
    it('TC-INT-010: full merge flow — upload → create job → poll → download', async () => {
      // Upload 2 files
      const upload1 = await uploadFile('test/fixtures/page1.pdf');
      const upload2 = await uploadFile('test/fixtures/page2.pdf');

      // Create merge job
      const jobRes = await request(app.getHttpServer())
        .post('/api/v1/jobs')
        .send({
          tool: 'merge',
          fileIds: [upload1.fileId, upload2.fileId],
          options: {},
        })
        .expect(201);

      const jobId = jobRes.body.data.jobId;

      // Wait for processing
      let status;
      for (let i = 0; i < 30; i++) {
        const statusRes = await request(app.getHttpServer())
          .get(`/api/v1/jobs/${jobId}`)
          .expect(200);
        status = statusRes.body.data;
        if (status.status === 'COMPLETED' || status.status === 'FAILED') break;
        await sleep(1000);
      }

      expect(status.status).toBe('COMPLETED');
      expect(status.result).toHaveProperty('downloadUrl');

      // Download
      const downloadRes = await request(app.getHttpServer())
        .get(status.result.downloadUrl)
        .expect(200);

      expect(downloadRes.headers['content-type']).toContain('application/pdf');
    });

    it('TC-INT-011: should enforce rate limits for anonymous users', async () => {
      // Make 10 job requests (free limit)
      for (let i = 0; i < 10; i++) {
        await request(app.getHttpServer())
          .post('/api/v1/jobs')
          .send({ tool: 'compress', fileIds: [uploadedFileId] })
          .expect(201);
      }

      // 11th should be rejected
      await request(app.getHttpServer())
        .post('/api/v1/jobs')
        .send({ tool: 'compress', fileIds: [uploadedFileId] })
        .expect(429);
    });
  });
});
```

---

## 4. E2E Tests (Playwright)

### 4.1 Core User Flows
```typescript
// test/e2e/merge-pdf.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Merge PDF Tool', () => {

  test('TC-E2E-001: complete merge flow from homepage', async ({ page }) => {
    // Navigate to merge tool
    await page.goto('/');
    await page.click('[data-testid="tool-merge-pdf"]');
    await expect(page).toHaveURL('/tools/merge-pdf');

    // Upload files via drag & drop zone
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      'test/fixtures/page1.pdf',
      'test/fixtures/page2.pdf',
    ]);

    // Verify files appear in list
    await expect(page.locator('[data-testid="file-card"]')).toHaveCount(2);

    // Click merge button
    await page.click('[data-testid="btn-merge"]');

    // Wait for processing
    await expect(page.locator('[data-testid="status-processing"]')).toBeVisible();

    // Wait for completion
    await expect(page.locator('[data-testid="status-completed"]')).toBeVisible({
      timeout: 30000,
    });

    // Verify download button appears
    await expect(page.locator('[data-testid="btn-download"]')).toBeVisible();

    // Click download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('[data-testid="btn-download"]'),
    ]);

    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('TC-E2E-002: should show error for invalid file type', async ({ page }) => {
    await page.goto('/tools/merge-pdf');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(['test/fixtures/image.jpg']);

    await expect(page.locator('[data-testid="error-invalid-type"]')).toBeVisible();
  });

  test('TC-E2E-003: should allow reordering files', async ({ page }) => {
    await page.goto('/tools/merge-pdf');

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      'test/fixtures/doc-a.pdf',
      'test/fixtures/doc-b.pdf',
    ]);

    // Drag second file to first position
    const secondFile = page.locator('[data-testid="file-card"]:nth-child(2)');
    const firstPosition = page.locator('[data-testid="file-card"]:nth-child(1)');
    await secondFile.dragTo(firstPosition);

    // Verify order changed
    const firstFileName = await page.locator('[data-testid="file-card"]:nth-child(1) .file-name').textContent();
    expect(firstFileName).toContain('doc-b.pdf');
  });
});
```

### 4.2 Auth Flow E2E
```typescript
// test/e2e/auth.spec.ts

test.describe('Authentication', () => {

  test('TC-E2E-010: registration flow', async ({ page }) => {
    await page.goto('/auth/register');

    await page.fill('[data-testid="input-name"]', 'Test User');
    await page.fill('[data-testid="input-email"]', `test-${Date.now()}@example.com`);
    await page.fill('[data-testid="input-password"]', 'SecurePass123!');
    await page.fill('[data-testid="input-confirm-password"]', 'SecurePass123!');
    await page.click('[data-testid="btn-register"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-greeting"]')).toContainText('Test User');
  });

  test('TC-E2E-011: login and use premium feature', async ({ page }) => {
    await page.goto('/auth/login');

    await page.fill('[data-testid="input-email"]', 'pro@test.io');
    await page.fill('[data-testid="input-password"]', 'test123!');
    await page.click('[data-testid="btn-login"]');

    await expect(page).toHaveURL('/dashboard');

    // Navigate to a tool and verify pro badge
    await page.goto('/tools/compress-pdf');
    await expect(page.locator('[data-testid="tier-badge"]')).toContainText('Pro');
  });
});
```

---

## 5. Load & Performance Tests

### 5.1 k6 Load Test Script
```javascript
// test/load/merge-flow.k6.js

import http from 'k6/http';
import { check, sleep } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

export const options = {
  stages: [
    { duration: '1m', target: 10 },   // Ramp up
    { duration: '3m', target: 50 },   // Sustained load
    { duration: '1m', target: 100 },  // Peak
    { duration: '1m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],  // 95% under 5s
    http_req_failed: ['rate<0.05'],     // < 5% errors
  },
};

export default function () {
  const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';

  // 1. Upload file
  const fd = new FormData();
  fd.append('file', http.file(open('test/fixtures/sample.pdf', 'b'), 'sample.pdf'));

  const uploadRes = http.post(`${BASE_URL}/api/v1/upload`, fd.body(), {
    headers: { 'Content-Type': fd.contentType },
  });

  check(uploadRes, {
    'upload status 201': (r) => r.status === 201,
    'has fileId': (r) => JSON.parse(r.body).data.fileId !== undefined,
  });

  const fileId = JSON.parse(uploadRes.body).data.fileId;

  // 2. Create job
  const jobRes = http.post(`${BASE_URL}/api/v1/jobs`, JSON.stringify({
    tool: 'compress',
    fileIds: [fileId],
    options: { level: 'medium' },
  }), { headers: { 'Content-Type': 'application/json' } });

  check(jobRes, {
    'job status 201': (r) => r.status === 201,
    'has jobId': (r) => JSON.parse(r.body).data.jobId !== undefined,
  });

  const jobId = JSON.parse(jobRes.body).data.jobId;

  // 3. Poll for completion
  let completed = false;
  for (let i = 0; i < 30; i++) {
    const statusRes = http.get(`${BASE_URL}/api/v1/jobs/${jobId}`);
    const status = JSON.parse(statusRes.body).data.status;
    if (status === 'COMPLETED' || status === 'FAILED') {
      check(statusRes, {
        'job completed': () => status === 'COMPLETED',
      });
      completed = true;
      break;
    }
    sleep(1);
  }

  check(null, { 'job finished in time': () => completed });
  sleep(1);
}
```

---

## 6. Security Tests

### 6.1 Security Test Cases
```
TC-SEC-001: Verify uploaded files are not accessible via direct URL
TC-SEC-002: Verify signed URLs expire after configured time
TC-SEC-003: Verify ClamAV blocks known virus test file (EICAR)
TC-SEC-004: Verify path traversal attack in filename is blocked
TC-SEC-005: Verify SQL injection in query parameters is blocked
TC-SEC-006: Verify XSS in file name is sanitized
TC-SEC-007: Verify CSRF token is required for state-changing operations
TC-SEC-008: Verify rate limiting blocks excessive requests
TC-SEC-009: Verify JWT tokens cannot be forged
TC-SEC-010: Verify password reset tokens are single-use
TC-SEC-011: Verify one user cannot access another user's files
TC-SEC-012: Verify expired files return 410 Gone
TC-SEC-013: Verify file upload ZIP bomb detection
TC-SEC-014: Verify no directory traversal in S3 keys
TC-SEC-015: Verify CORS headers restrict origins properly
```