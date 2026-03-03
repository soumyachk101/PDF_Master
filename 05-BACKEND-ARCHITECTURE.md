# Backend Architecture Document
## PDFForge — Online PDF Tool Suite

---

## 1. Project Structure

```
backend/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app.module.ts                    # Root module
│   ├── app.controller.ts               # Health check
│   │
│   ├── common/                          # Shared utilities
│   │   ├── config/
│   │   │   ├── app.config.ts            # App configuration
│   │   │   ├── database.config.ts       # DB configuration
│   │   │   ├── redis.config.ts          # Redis configuration
│   │   │   ├── storage.config.ts        # S3/R2 configuration
│   │   │   └── queue.config.ts          # BullMQ configuration
│   │   ├── constants/
│   │   │   ├── error-codes.ts           # Error code enums
│   │   │   ├── job-types.ts             # PDF operation types
│   │   │   ├── file-limits.ts           # Size/type limits per tier
│   │   │   └── queue-names.ts           # Queue name constants
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── public.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── tier.decorator.ts
│   │   ├── dto/
│   │   │   ├── pagination.dto.ts
│   │   │   ├── api-response.dto.ts
│   │   │   └── error-response.dto.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   └── all-exceptions.filter.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── rate-limit.guard.ts
│   │   │   ├── tier.guard.ts
│   │   │   └── file-limit.guard.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   └── timeout.interceptor.ts
│   │   ├── pipes/
│   │   │   ├── file-validation.pipe.ts
│   │   │   └── parse-page-range.pipe.ts
│   │   ├── interfaces/
│   │   │   ├── request-with-user.ts
│   │   │   ├── job-data.interface.ts
│   │   │   └── processing-result.interface.ts
│   │   └── utils/
│   │       ├── file-utils.ts
│   │       ├── hash-utils.ts
│   │       └── pagination-utils.ts
│   │
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   ├── refresh-token.dto.ts
│   │   │   ├── forgot-password.dto.ts
│   │   │   └── reset-password.dto.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── jwt-refresh.strategy.ts
│   │   │   └── local.strategy.ts
│   │   └── guards/
│   │       └── local-auth.guard.ts
│   │
│   ├── user/
│   │   ├── user.module.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── dto/
│   │       ├── update-profile.dto.ts
│   │       └── user-response.dto.ts
│   │
│   ├── upload/
│   │   ├── upload.module.ts
│   │   ├── upload.controller.ts
│   │   ├── upload.service.ts
│   │   ├── dto/
│   │   │   └── upload-response.dto.ts
│   │   └── validators/
│   │       ├── file-type.validator.ts    # Magic bytes validation
│   │       ├── file-size.validator.ts
│   │       └── virus-scan.validator.ts   # ClamAV integration
│   │
│   ├── jobs/
│   │   ├── jobs.module.ts
│   │   ├── jobs.controller.ts
│   │   ├── jobs.service.ts
│   │   ├── dto/
│   │   │   ├── create-job.dto.ts
│   │   │   ├── job-response.dto.ts
│   │   │   └── job-options/
│   │   │       ├── merge-options.dto.ts
│   │   │       ├── split-options.dto.ts
│   │   │       ├── compress-options.dto.ts
│   │   │       ├── pdf-to-jpg-options.dto.ts
│   │   │       └── jpg-to-pdf-options.dto.ts
│   │   └── enums/
│   │       ├── job-status.enum.ts
│   │       └── job-type.enum.ts
│   │
│   ├── download/
│   │   ├── download.module.ts
│   │   ├── download.controller.ts
│   │   └── download.service.ts
│   │
│   ├── storage/
│   │   ├── storage.module.ts
│   │   ├── storage.service.ts           # S3 operations
│   │   └── interfaces/
│   │       └── storage-provider.interface.ts
│   │
│   ├── queue/
│   │   ├── queue.module.ts
│   │   ├── queue.service.ts             # Job enqueue/management
│   │   └── processors/
│   │       ├── pdf-job.processor.ts     # BullMQ processor
│   │       └── cleanup-job.processor.ts
│   │
│   ├── subscription/
│   │   ├── subscription.module.ts
│   │   ├── subscription.controller.ts
│   │   ├── subscription.service.ts
│   │   ├── dto/
│   │   │   ├── create-subscription.dto.ts
│   │   │   └── subscription-response.dto.ts
│   │   └── webhooks/
│   │       └── stripe.webhook.ts
│   │
│   ├── cleanup/
│   │   ├── cleanup.module.ts
│   │   └── cleanup.service.ts           # Cron-based cleanup
│   │
│   └── health/
│       ├── health.module.ts
│       └── health.controller.ts
│
├── prisma/
│   ├── schema.prisma                    # Database schema
│   ├── migrations/                      # Migration files
│   └── seed.ts                          # Seed data
│
├── test/
│   ├── unit/
│   │   ├── auth/
│   │   ├── jobs/
│   │   ├── upload/
│   │   └── storage/
│   ├── integration/
│   │   ├── auth.integration.spec.ts
│   │   ├── jobs.integration.spec.ts
│   │   └── upload.integration.spec.ts
│   └── e2e/
│       └── app.e2e-spec.ts
│
├── docker/
│   ├── Dockerfile                       # API Dockerfile
│   ├── Dockerfile.worker                # Worker Dockerfile
│   └── docker-compose.yml
│
├── .env.example
├── .env.test
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── package.json
└── README.md
```

---

## 2. Module Architecture

### 2.1 Module Dependency Graph
```
AppModule
├── ConfigModule (global)
├── PrismaModule (global)
├── RedisModule (global)
├── AuthModule
│   └── UserModule
├── UploadModule
│   ├── StorageModule
│   └── QueueModule
├── JobsModule
│   ├── StorageModule
│   └── QueueModule
├── DownloadModule
│   └── StorageModule
├── SubscriptionModule
│   └── UserModule
├── CleanupModule
│   └── StorageModule
└── HealthModule
```

### 2.2 Key Service Implementations

#### Auth Service
```typescript
// src/auth/auth.service.ts — Key methods

class AuthService {
  // Registration
  async register(dto: RegisterDto): Promise<AuthResponse>
    // 1. Check if email exists
    // 2. Hash password (bcrypt, rounds=12)
    // 3. Create user + free tier subscription
    // 4. Generate JWT pair
    // 5. Return tokens + user profile

  // Login
  async login(dto: LoginDto): Promise<AuthResponse>
    // 1. Find user by email
    // 2. Verify password
    // 3. Check account status (active/banned)
    // 4. Generate JWT pair
    // 5. Store refresh token hash in DB
    // 6. Return tokens

  // Refresh
  async refreshToken(refreshToken: string): Promise<AuthResponse>
    // 1. Verify refresh token
    // 2. Check if token is in DB (not revoked)
    // 3. Generate new JWT pair
    // 4. Rotate refresh token (invalidate old)
    // 5. Return new tokens

  // Password Reset
  async forgotPassword(email: string): Promise<void>
    // 1. Find user
    // 2. Generate reset token (crypto.randomBytes)
    // 3. Store hashed token with expiry (1 hour)
    // 4. Send reset email

  async resetPassword(token: string, newPassword: string): Promise<void>
    // 1. Find valid reset token
    // 2. Hash new password
    // 3. Update user password
    // 4. Invalidate all refresh tokens
    // 5. Delete reset token
}
```

#### Upload Service
```typescript
// src/upload/upload.service.ts — Key methods

class UploadService {
  async uploadFile(
    file: Express.Multer.File,
    userId?: string
  ): Promise<UploadResponse>
    // 1. Validate file type (magic bytes)
    // 2. Validate file size against user tier
    // 3. Scan for viruses (ClamAV)
    // 4. Generate unique filename (UUIDv4 + original extension)
    // 5. Upload to S3 (input/ prefix)
    // 6. Create File record in DB
    // 7. Return fileId + metadata

  async uploadMultiple(
    files: Express.Multer.File[],
    userId?: string
  ): Promise<UploadResponse[]>
    // 1. Validate batch size against tier
    // 2. Process each file (parallel, max 5 concurrent)
    // 3. Return array of upload responses

  async getFileStatus(fileId: string): Promise<FileStatus>
    // 1. Query DB for file record
    // 2. Verify file exists in S3
    // 3. Return status + metadata

  async deleteFile(fileId: string, userId?: string): Promise<void>
    // 1. Verify ownership
    // 2. Delete from S3
    // 3. Update DB record
}
```

#### Jobs Service
```typescript
// src/jobs/jobs.service.ts — Key methods

class JobsService {
  async createJob(dto: CreateJobDto, userId?: string): Promise<JobResponse>
    // 1. Validate tool type
    // 2. Verify all input files exist and are accessible
    // 3. Check rate limits for user tier
    // 4. Create Job record (status: QUEUED)
    // 5. Calculate priority based on tier
    // 6. Enqueue to BullMQ with priority
    // 7. Return jobId + status

  async getJobStatus(jobId: string): Promise<JobResponse>
    // 1. Find job record
    // 2. If completed, generate download URL
    // 3. Return status + progress + result

  async listJobs(
    userId: string,
    pagination: PaginationDto
  ): Promise<PaginatedResponse<JobResponse>>
    // 1. Query jobs for user
    // 2. Sort by created_at DESC
    // 3. Return paginated results

  async cancelJob(jobId: string, userId: string): Promise<void>
    // 1. Verify ownership
    // 2. If queued: remove from queue
    // 3. If processing: send cancel signal
    // 4. Update status to CANCELLED
    // 5. Cleanup any partial outputs
}
```

#### Storage Service
```typescript
// src/storage/storage.service.ts — Key methods

class StorageService {
  async upload(
    buffer: Buffer,
    key: string,
    contentType: string
  ): Promise<string>
    // Upload to S3 with server-side encryption

  async download(key: string): Promise<Buffer>
    // Download from S3

  async getSignedUrl(key: string, expiresIn: number): Promise<string>
    // Generate pre-signed download URL

  async delete(key: string): Promise<void>
    // Delete object from S3

  async deleteMultiple(keys: string[]): Promise<void>
    // Batch delete from S3

  async exists(key: string): Promise<boolean>
    // Check if object exists
}
```

---

## 3. Authentication Flow

### 3.1 JWT Token Strategy
```
Access Token:
  - Algorithm: HS256
  - Expiry: 15 minutes
  - Payload: { sub: userId, email, tier, iat, exp }
  - Stored: Client memory (NOT localStorage)

Refresh Token:
  - Algorithm: HS256
  - Expiry: 7 days
  - Payload: { sub: userId, tokenId, iat, exp }
  - Stored: HttpOnly secure cookie
  - Hashed in DB for validation
```

### 3.2 Auth Middleware Chain
```
Request
  │
  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Rate Limiter │──▶│  JWT Guard   │──▶│  Tier Guard  │──▶ Controller
│ (per IP/user)│   │ (extract/    │   │ (check       │
│              │   │  verify JWT) │   │  permissions) │
└──────────────┘   └──────────────┘   └──────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
  429 Too Many        401 Unauth          403 Forbidden
```

### 3.3 Anonymous User Handling
```
Anonymous users can:
  ✅ Use tools (with free tier limits)
  ✅ Upload files
  ✅ Create jobs
  ✅ Download results

Anonymous users CANNOT:
  ❌ View job history
  ❌ Access dashboard
  ❌ Use premium features

Tracking: Anonymous users identified by IP + session cookie
Rate limits applied per IP for anonymous users
```

---

## 4. Queue & Worker Architecture

### 4.1 BullMQ Configuration
```typescript
// Queue Setup
const pdfQueue = new Queue('pdf-processing', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,    // 1s, 4s, 16s
    },
    removeOnComplete: {
      age: 3600,       // Keep completed jobs for 1 hour
      count: 1000,     // Keep last 1000
    },
    removeOnFail: {
      age: 86400,      // Keep failed jobs for 24 hours
    },
  },
});

// Priority mapping
const PRIORITY_MAP = {
  business: 1,  // Highest
  pro: 2,
  free: 3,
  anonymous: 4, // Lowest
};

// Concurrency per worker
const WORKER_CONCURRENCY = 3; // 3 jobs per worker instance
```

### 4.2 Job Data Structure
```typescript
interface PdfJobData {
  jobId: string;
  type: 'merge' | 'split' | 'compress' | 'pdf-to-jpg' | 'jpg-to-pdf';
  inputFileIds: string[];
  options: Record<string, any>;  // Tool-specific options
  userId?: string;
  tier: 'anonymous' | 'free' | 'pro' | 'business';
  createdAt: string;
}

// Example: Merge job
{
  jobId: "job_abc123",
  type: "merge",
  inputFileIds: ["file_001", "file_002", "file_003"],
  options: {
    outputFileName: "merged-document.pdf"
  },
  userId: "user_xyz",
  tier: "pro",
  createdAt: "2024-01-15T10:30:00Z"
}

// Example: Split job
{
  jobId: "job_def456",
  type: "split",
  inputFileIds: ["file_004"],
  options: {
    mode: "ranges",        // "ranges" | "pages" | "every_n"
    ranges: "1-3,5,7-10",
    outputFormat: "single"  // "single" | "separate"
  },
  userId: null,
  tier: "anonymous",
  createdAt: "2024-01-15T10:31:00Z"
}

// Example: Compress job
{
  jobId: "job_ghi789",
  type: "compress",
  inputFileIds: ["file_005"],
  options: {
    level: "medium"  // "low" | "medium" | "high"
  },
  userId: "user_abc",
  tier: "free",
  createdAt: "2024-01-15T10:32:00Z"
}
```

---

## 5. Rate Limiting Strategy

### 5.1 Multi-Layer Rate Limiting
```
Layer 1: Nginx (connection-level)
  - 100 req/s per IP (burst: 200)
  - 10 concurrent connections per IP

Layer 2: Application (API-level)
  - Sliding window via Redis
  - Different limits per tier
  - Key: `ratelimit:{userId||IP}:{endpoint}`

Layer 3: Queue (job-level)
  - Max concurrent jobs per user
  - Max jobs per hour per user
```

### 5.2 Rate Limit Configuration
```typescript
const RATE_LIMITS = {
  anonymous: {
    requestsPerMinute: 20,
    uploadsPerHour: 10,
    jobsPerHour: 10,
    maxConcurrentJobs: 2,
    maxFileSize: 25 * 1024 * 1024,  // 25MB
  },
  free: {
    requestsPerMinute: 30,
    uploadsPerHour: 20,
    jobsPerHour: 20,
    maxConcurrentJobs: 3,
    maxFileSize: 25 * 1024 * 1024,
  },
  pro: {
    requestsPerMinute: 60,
    uploadsPerHour: -1,  // unlimited
    jobsPerHour: -1,
    maxConcurrentJobs: 10,
    maxFileSize: 100 * 1024 * 1024,  // 100MB
  },
  business: {
    requestsPerMinute: 120,
    uploadsPerHour: -1,
    jobsPerHour: -1,
    maxConcurrentJobs: 25,
    maxFileSize: 250 * 1024 * 1024,  // 250MB
  },
};
```

---

## 6. Environment Configuration

### 6.1 Environment Variables
```bash
# .env.example

# Application
NODE_ENV=development
PORT=3001
APP_URL=http://localhost:3000
API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://pdfforge:password@localhost:5432/pdfforge

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_ACCESS_SECRET=your-access-secret-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# S3/R2 Storage
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_INPUT=pdfforge-input
S3_BUCKET_OUTPUT=pdfforge-output

# File Limits
MAX_FILE_SIZE_FREE=26214400      # 25MB
MAX_FILE_SIZE_PRO=104857600      # 100MB
MAX_FILE_SIZE_BUSINESS=262144000 # 250MB
FILE_TTL_HOURS=1

# Queue
QUEUE_REDIS_HOST=localhost
QUEUE_REDIS_PORT=6379
WORKER_CONCURRENCY=3

# ClamAV
CLAMAV_HOST=localhost
CLAMAV_PORT=3310

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_BUSINESS_PRICE_ID=price_...

# Email (optional - Phase 2)
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Sentry (optional)
SENTRY_DSN=

# Logging
LOG_LEVEL=debug
```

---

## 7. API Request/Response Examples

### 7.1 Upload File
```
POST /api/v1/upload
Content-Type: multipart/form-data
Authorization: Bearer <token> (optional)

Body: file (binary)

Response 201:
{
  "success": true,
  "data": {
    "fileId": "f_8a3b2c1d",
    "fileName": "document.pdf",
    "originalName": "My Document.pdf",
    "mimeType": "application/pdf",
    "size": 2457600,
    "pages": 12,
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "expiresAt": "2024-01-15T11:30:00.000Z"
  }
}
```

### 7.2 Create Job
```
POST /api/v1/jobs
Content-Type: application/json
Authorization: Bearer <token> (optional)

Body:
{
  "tool": "merge",
  "fileIds": ["f_8a3b2c1d", "f_9e4f5a6b", "f_1c2d3e4f"],
  "options": {
    "outputFileName": "merged-report.pdf"
  }
}

Response 201:
{
  "success": true,
  "data": {
    "jobId": "j_abc123def",
    "tool": "merge",
    "status": "queued",
    "position": 3,
    "estimatedWait": 5,
    "createdAt": "2024-01-15T10:31:00.000Z"
  }
}
```

### 7.3 Get Job Status
```
GET /api/v1/jobs/j_abc123def
Authorization: Bearer <token> (optional)

Response 200 (completed):
{
  "success": true,
  "data": {
    "jobId": "j_abc123def",
    "tool": "merge",
    "status": "completed",
    "progress": 100,
    "result": {
      "fileName": "merged-report.pdf",
      "size": 7340032,
      "pages": 36,
      "downloadUrl": "/api/v1/download/j_abc123def"
    },
    "processingTime": 2340,
    "createdAt": "2024-01-15T10:31:00.000Z",
    "completedAt": "2024-01-15T10:31:02.340Z",
    "expiresAt": "2024-01-15T11:31:02.340Z"
  }
}
```

### 7.4 Error Response Format
```
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File exceeds maximum size of 25MB for free tier.",
    "details": {
      "maxSize": 26214400,
      "actualSize": 52428800,
      "tier": "free",
      "upgradeUrl": "/pricing"
    }
  }
}
```