# Database Structure Document
## PDFForge — Online PDF Tool Suite

---

## 1. Database Technology

- **Engine**: PostgreSQL 16
- **ORM**: Prisma 5.x
- **Migrations**: Prisma Migrate
- **Connection Pooling**: Prisma built-in (or PgBouncer for production)

---

## 2. Entity Relationship Diagram (ASCII)

```
┌──────────────────┐     ┌──────────────────────┐     ┌──────────────────┐
│      users       │     │    subscriptions      │     │   refresh_tokens │
├──────────────────┤     ├──────────────────────┤     ├──────────────────┤
│ id (PK)          │◄───┐│ id (PK)              │     │ id (PK)          │
│ email            │    ││ user_id (FK)  ───────┼────▶│ user_id (FK)     │
│ password_hash    │    ││ plan                  │     │ token_hash       │
│ name             │    ││ status                │     │ expires_at       │
│ avatar_url       │    ││ stripe_customer_id    │     │ created_at       │
│ role             │    ││ stripe_subscription_id│     │ revoked_at       │
│ status           │    ││ current_period_start  │     └───────┬──────────┘
│ created_at       │    ││ current_period_end    │             │
│ updated_at       │    ││ created_at            │             │
└──────┬───────────┘    ││ updated_at            │             │
       │                │└──────────────────────┘             │
       │                │                                      │
       │                │     ┌──────────────────┐            │
       │                │     │      files       │            │
       │                │     ├──────────────────┤            │
       │                └────▶│ id (PK)          │            │
       │                      │ user_id (FK)     │◄───────────┘
       │                      │ original_name    │
       │                      │ stored_name      │     ┌──────────────────┐
       │                      │ mime_type        │     │    job_files     │
       │                      │ size             │     ├──────────────────┤
       │                      │ pages            │     │ id (PK)          │
       │                      │ storage_key      │◄────│ file_id (FK)     │
       │                      │ bucket           │     │ job_id (FK)  ────┤
       │                      │ status           │     │ role (input/     │
       │                      │ virus_scanned    │     │       output)    │
       │                      │ checksum         │     │ sort_order       │
       │                      │ expires_at       │     └──────────────────┘
       │                      │ created_at       │            │
       │                      └──────────────────┘            │
       │                                                      │
       │                      ┌──────────────────┐            │
       │                      │      jobs        │            │
       │                      ├──────────────────┤            │
       └─────────────────────▶│ id (PK)          │◄───────────┘
                              │ user_id (FK)     │
                              │ tool_type        │
                              │ status           │
                              │ priority         │
                              │ options (JSONB)  │
                              │ progress         │
                              │ error_code       │
                              │ error_message    │
                              │ processing_time  │
                              │ worker_id        │
                              │ ip_address       │
                              │ user_agent       │
                              │ started_at       │
                              │ completed_at     │
                              │ expires_at       │
                              │ created_at       │
                              │ updated_at       │
                              └──────────────────┘

┌──────────────────┐     ┌──────────────────────┐
│  usage_records   │     │  password_resets      │
├──────────────────┤     ├──────────────────────┤
│ id (PK)          │     │ id (PK)              │
│ user_id (FK)     │     │ user_id (FK)         │
│ ip_address       │     │ token_hash           │
│ tool_type        │     │ expires_at           │
│ file_count       │     │ used_at              │
│ total_size       │     │ created_at           │
│ created_at       │     └──────────────────────┘
└──────────────────┘

┌──────────────────┐
│  api_keys        │
├──────────────────┤
│ id (PK)          │
│ user_id (FK)     │
│ key_hash         │
│ name             │
│ last_used_at     │
│ expires_at       │
│ created_at       │
│ revoked_at       │
└──────────────────┘
```

---

## 3. Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ──────────────────────────────────────────────

enum UserRole {
  USER
  ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  DELETED
}

enum PlanType {
  FREE
  PRO
  BUSINESS
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  PAST_DUE
  EXPIRED
}

enum FileStatus {
  UPLOADING
  UPLOADED
  PROCESSING
  DELETED
  EXPIRED
}

enum JobStatus {
  QUEUED
  PROCESSING
  COMPLETED
  FAILED
  CANCELLED
  EXPIRED
}

enum JobType {
  MERGE
  SPLIT
  COMPRESS
  PDF_TO_JPG
  JPG_TO_PDF
  ROTATE
  WATERMARK
  PROTECT
  UNLOCK
  OCR
  PDF_TO_WORD
  WORD_TO_PDF
}

enum FileRole {
  INPUT
  OUTPUT
}

// ─── MODELS ─────────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  name          String?
  avatarUrl     String?   @map("avatar_url")
  role          UserRole  @default(USER)
  status        UserStatus @default(ACTIVE)

  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // Relations
  subscription  Subscription?
  files         File[]
  jobs          Job[]
  refreshTokens RefreshToken[]
  passwordResets PasswordReset[]
  usageRecords  UsageRecord[]
  apiKeys       ApiKey[]

  @@map("users")
  @@index([email])
  @@index([status])
}

model Subscription {
  id                    String             @id @default(cuid())
  userId                String             @unique @map("user_id")
  plan                  PlanType           @default(FREE)
  status                SubscriptionStatus @default(ACTIVE)
  stripeCustomerId      String?            @map("stripe_customer_id")
  stripeSubscriptionId  String?            @map("stripe_subscription_id")
  currentPeriodStart    DateTime?          @map("current_period_start")
  currentPeriodEnd      DateTime?          @map("current_period_end")

  createdAt             DateTime           @default(now()) @map("created_at")
  updatedAt             DateTime           @updatedAt @map("updated_at")

  // Relations
  user                  User               @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("subscriptions")
  @@index([stripeCustomerId])
  @@index([stripeSubscriptionId])
}

model RefreshToken {
  id         String    @id @default(cuid())
  userId     String    @map("user_id")
  tokenHash  String    @map("token_hash")
  expiresAt  DateTime  @map("expires_at")
  revokedAt  DateTime? @map("revoked_at")

  createdAt  DateTime  @default(now()) @map("created_at")

  // Relations
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("refresh_tokens")
  @@index([userId])
  @@index([tokenHash])
  @@index([expiresAt])
}

model PasswordReset {
  id         String    @id @default(cuid())
  userId     String    @map("user_id")
  tokenHash  String    @map("token_hash")
  expiresAt  DateTime  @map("expires_at")
  usedAt     DateTime? @map("used_at")

  createdAt  DateTime  @default(now()) @map("created_at")

  // Relations
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("password_resets")
  @@index([tokenHash])
  @@index([expiresAt])
}

model File {
  id            String      @id @default(cuid())
  userId        String?     @map("user_id")
  originalName  String      @map("original_name")
  storedName    String      @map("stored_name")
  mimeType      String      @map("mime_type")
  size          BigInt                           // bytes
  pages         Int?                             // for PDFs
  storageKey    String      @map("storage_key")
  bucket        String
  status        FileStatus  @default(UPLOADING)
  virusScanned  Boolean     @default(false) @map("virus_scanned")
  checksum      String?                          // SHA-256
  expiresAt     DateTime    @map("expires_at")

  createdAt     DateTime    @default(now()) @map("created_at")

  // Relations
  user          User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  jobFiles      JobFile[]

  @@map("files")
  @@index([userId])
  @@index([status])
  @@index([expiresAt])
  @@index([storageKey])
}

model Job {
  id              String    @id @default(cuid())
  userId          String?   @map("user_id")
  toolType        JobType   @map("tool_type")
  status          JobStatus @default(QUEUED)
  priority        Int       @default(3)          // 1=highest, 4=lowest
  options         Json      @default("{}")       // Tool-specific options
  progress        Int       @default(0)          // 0-100
  errorCode       String?   @map("error_code")
  errorMessage    String?   @map("error_message")
  processingTime  Int?      @map("processing_time") // milliseconds
  workerId        String?   @map("worker_id")
  ipAddress       String?   @map("ip_address")
  userAgent       String?   @map("user_agent")

  startedAt       DateTime? @map("started_at")
  completedAt     DateTime? @map("completed_at")
  expiresAt       DateTime? @map("expires_at")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  // Relations
  user            User?     @relation(fields: [userId], references: [id], onDelete: SetNull)
  jobFiles        JobFile[]

  @@map("jobs")
  @@index([userId])
  @@index([status])
  @@index([toolType])
  @@index([createdAt])
  @@index([expiresAt])
  @@index([priority, createdAt])
}

model JobFile {
  id         String   @id @default(cuid())
  jobId      String   @map("job_id")
  fileId     String   @map("file_id")
  role       FileRole                    // INPUT or OUTPUT
  sortOrder  Int      @default(0) @map("sort_order")

  // Relations
  job        Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  file       File     @relation(fields: [fileId], references: [id], onDelete: Cascade)

  @@map("job_files")
  @@index([jobId])
  @@index([fileId])
  @@unique([jobId, fileId, role])
}

model UsageRecord {
  id         String   @id @default(cuid())
  userId     String?  @map("user_id")
  ipAddress  String   @map("ip_address")
  toolType   JobType  @map("tool_type")
  fileCount  Int      @map("file_count")
  totalSize  BigInt   @map("total_size")  // bytes

  createdAt  DateTime @default(now()) @map("created_at")

  // Relations
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@map("usage_records")
  @@index([userId, createdAt])
  @@index([ipAddress, createdAt])
  @@index([createdAt])
}

model ApiKey {
  id         String    @id @default(cuid())
  userId     String    @map("user_id")
  keyHash    String    @map("key_hash")
  name       String
  lastUsedAt DateTime? @map("last_used_at")
  expiresAt  DateTime? @map("expires_at")
  revokedAt  DateTime? @map("revoked_at")

  createdAt  DateTime  @default(now()) @map("created_at")

  // Relations
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("api_keys")
  @@index([keyHash])
  @@index([userId])
}
```

---

## 4. Key Queries & Access Patterns

### 4.1 Frequently Executed Queries
```sql
-- Get user's active subscription tier
SELECT u.id, u.email, s.plan, s.status
FROM users u
LEFT JOIN subscriptions s ON s.user_id = u.id
WHERE u.id = $1 AND u.status = 'ACTIVE';

-- Get job with input/output files
SELECT j.*, 
  json_agg(DISTINCT jsonb_build_object(
    'fileId', f.id,
    'name', f.original_name,
    'size', f.size,
    'role', jf.role,
    'sortOrder', jf.sort_order
  )) as files
FROM jobs j
JOIN job_files jf ON jf.job_id = j.id
JOIN files f ON f.id = jf.file_id
WHERE j.id = $1
GROUP BY j.id;

-- Count user's jobs in last hour (rate limiting)
SELECT COUNT(*) 
FROM jobs 
WHERE (user_id = $1 OR ip_address = $2)
  AND created_at > NOW() - INTERVAL '1 hour';

-- Find expired files for cleanup
SELECT f.id, f.storage_key, f.bucket
FROM files f
WHERE f.expires_at < NOW()
  AND f.status NOT IN ('DELETED', 'EXPIRED')
LIMIT 100;

-- User's recent jobs with pagination
SELECT j.*, 
  (SELECT json_agg(jsonb_build_object('name', f.original_name, 'role', jf.role))
   FROM job_files jf JOIN files f ON f.id = jf.file_id WHERE jf.job_id = j.id) as files
FROM jobs j
WHERE j.user_id = $1
ORDER BY j.created_at DESC
LIMIT $2 OFFSET $3;

-- Usage analytics (admin)
SELECT 
  tool_type,
  DATE(created_at) as date,
  COUNT(*) as total_jobs,
  SUM(file_count) as total_files,
  SUM(total_size) as total_bytes,
  AVG(total_size) as avg_size
FROM usage_records
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY tool_type, DATE(created_at)
ORDER BY date DESC, total_jobs DESC;
```

### 4.2 Index Strategy
```sql
-- Primary lookup indexes (covered in Prisma schema @@index)
-- Additional composite indexes for performance:

-- Jobs by status + priority (worker queue polling)
CREATE INDEX idx_jobs_status_priority ON jobs (status, priority, created_at)
  WHERE status = 'QUEUED';

-- Files cleanup (find expired)
CREATE INDEX idx_files_cleanup ON files (expires_at)
  WHERE status NOT IN ('DELETED', 'EXPIRED');

-- Usage rate limiting (per user per hour)
CREATE INDEX idx_usage_rate ON usage_records (user_id, created_at DESC);

-- Usage rate limiting (per IP per hour, for anonymous)
CREATE INDEX idx_usage_rate_ip ON usage_records (ip_address, created_at DESC);
```

---

## 5. Data Retention Policy

| Data Type | Retention | Action |
|-----------|-----------|--------|
| Input files (S3) | 1 hour after upload | Auto-delete (cleanup cron) |
| Output files (S3) | 1 hour after job completion | Auto-delete (cleanup cron) |
| File DB records | 30 days | Soft delete (status → EXPIRED) |
| Job DB records | 90 days | Hard delete |
| Usage records | 365 days | Archive to cold storage |
| Refresh tokens | 7 days | Hard delete on expiry |
| Password reset tokens | 1 hour | Hard delete on use/expiry |
| User accounts (deleted) | 30 days grace | Hard delete all data |

---

## 6. Migration Strategy

### 6.1 Migration Commands
```bash
# Generate migration from schema changes
npx prisma migrate dev --name <migration-name>

# Apply migrations to production
npx prisma migrate deploy

# Reset database (development only!)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Seed database
npx prisma db seed
```

### 6.2 Seed Data
```typescript
// prisma/seed.ts
import { PrismaClient, PlanType, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@pdfforge.io' },
    update: {},
    create: {
      email: 'admin@pdfforge.io',
      passwordHash: adminPassword,
      name: 'Admin',
      role: UserRole.ADMIN,
      subscription: {
        create: {
          plan: PlanType.BUSINESS,
          status: 'ACTIVE',
        },
      },
    },
  });

  // Create test users for each tier
  const tiers = [
    { email: 'free@test.io', plan: PlanType.FREE },
    { email: 'pro@test.io', plan: PlanType.PRO },
    { email: 'business@test.io', plan: PlanType.BUSINESS },
  ];

  for (const tier of tiers) {
    const password = await bcrypt.hash('test123!', 12);
    await prisma.user.upsert({
      where: { email: tier.email },
      update: {},
      create: {
        email: tier.email,
        passwordHash: password,
        name: `Test ${tier.plan}`,
        subscription: {
          create: {
            plan: tier.plan,
            status: 'ACTIVE',
          },
        },
      },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```