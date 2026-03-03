# Technical Requirements Document (TRD)
## PDFForge — Online PDF Tool Suite

---

## 1. Technology Stack

### 1.1 Frontend
| Component | Technology | Version | Justification |
|-----------|-----------|---------|---------------|
| Framework | Next.js (React) | 14.x | SSR, routing, API routes, ecosystem |
| Styling | Tailwind CSS | 3.x | Rapid UI development, utility-first |
| State Management | Zustand | 4.x | Lightweight, simple global state |
| File Upload | react-dropzone | 14.x | Drag/drop, file validation |
| PDF Preview | pdf.js (pdfjs-dist) | 3.x | Browser-based PDF rendering |
| HTTP Client | Axios | 1.x | Interceptors, progress tracking |
| Form Handling | React Hook Form + Zod | Latest | Validation, type safety |
| Icons | Lucide React | Latest | Clean, consistent iconography |
| Notifications | Sonner | Latest | Toast notifications |

### 1.2 Backend
| Component | Technology | Version | Justification |
|-----------|-----------|---------|---------------|
| Runtime | Node.js | 20 LTS | Stable, ecosystem, performance |
| Framework | NestJS | 10.x | Modular, TypeScript, enterprise-grade |
| ORM | Prisma | 5.x | Type-safe, migrations, excellent DX |
| Validation | class-validator + class-transformer | Latest | DTO validation in NestJS |
| Auth | Passport.js + JWT | Latest | Flexible auth strategies |
| File Upload | Multer | Latest | Multipart form handling |
| Job Queue | BullMQ | 4.x | Redis-backed, retries, priorities |
| Cache | Redis (ioredis) | Latest | Session, queue, rate limiting |
| Storage | AWS SDK v3 (S3) | Latest | S3/R2/MinIO compatible |
| Logging | Pino | Latest | Structured, fast JSON logging |
| API Docs | Swagger (via @nestjs/swagger) | Latest | Auto-generated API docs |

### 1.3 Processing Workers
| Tool | Purpose | License |
|------|---------|---------|
| qpdf | Merge, split, encrypt, linearize | Apache 2.0 |
| Ghostscript | Compress, render | AGPL (or commercial) |
| Poppler (pdftoppm, pdfimages) | PDF to image conversion | GPL |
| ImageMagick | Image manipulation | Apache 2.0 |
| LibreOffice (headless) | Office ↔ PDF conversion | MPL 2.0 |
| Tesseract OCR | Optical character recognition | Apache 2.0 |
| sharp | Image processing/optimization | Apache 2.0 |

### 1.4 Infrastructure
| Component | Technology | Justification |
|-----------|-----------|---------------|
| Database | PostgreSQL 16 | Reliable, feature-rich, JSONB support |
| Cache/Queue | Redis 7 | BullMQ backend, caching, rate limiting |
| Object Storage | Cloudflare R2 or AWS S3 | Cost-effective, S3-compatible |
| Container Runtime | Docker + Docker Compose | Consistent environments |
| Orchestration (prod) | Docker Swarm or Kubernetes | Scaling workers |
| Reverse Proxy | Nginx or Caddy | TLS termination, rate limiting |
| CDN | Cloudflare | DDoS protection, edge caching |
| CI/CD | GitHub Actions | Automated testing + deployment |
| Monitoring | Prometheus + Grafana | Metrics, alerting |
| Error Tracking | Sentry | Exception tracking |
| Log Aggregation | Loki or ELK | Centralized logging |

---

## 2. System Requirements

### 2.1 Development Environment
```
- Node.js >= 20 LTS
- pnpm >= 8.x (package manager)
- Docker >= 24.x + Docker Compose v2
- PostgreSQL 16 (via Docker)
- Redis 7 (via Docker)
- Git >= 2.40
```

### 2.2 Minimum Production Server
| Resource | MVP (small) | Growth (medium) |
|----------|------------|-----------------|
| CPU | 2 vCPU | 4-8 vCPU |
| RAM | 4 GB | 16 GB |
| Storage | 50 GB SSD | 200 GB SSD |
| Bandwidth | 1 TB/mo | 5 TB/mo |

### 2.3 Worker Resource Requirements
| Operation | CPU | RAM | Time (10MB file) |
|-----------|-----|-----|-------------------|
| Merge | Low | 256MB | 1-3s |
| Split | Low | 256MB | 1-2s |
| Compress | High | 512MB | 3-10s |
| PDF → JPG | High | 512MB | 2-8s |
| JPG → PDF | Low | 256MB | 1-3s |
| OCR | Very High | 1GB+ | 10-60s |
| Word → PDF | High | 1GB+ | 5-30s |

---

## 3. API Specifications

### 3.1 API Design Principles
- RESTful design
- JSON request/response bodies
- Multipart form-data for file uploads
- JWT Bearer token authentication
- API versioning via URL prefix (`/api/v1/`)
- Rate limiting per tier
- Consistent error response format

### 3.2 Core API Endpoints

#### Authentication
```
POST   /api/v1/auth/register        — Register new user
POST   /api/v1/auth/login            — Login (returns JWT)
POST   /api/v1/auth/refresh           — Refresh JWT
POST   /api/v1/auth/logout            — Invalidate token
POST   /api/v1/auth/forgot-password   — Send reset email
POST   /api/v1/auth/reset-password    — Reset with token
```

#### File Operations
```
POST   /api/v1/upload                 — Upload file(s), returns fileId(s)
GET    /api/v1/upload/:fileId/status   — Check upload status
DELETE /api/v1/upload/:fileId          — Cancel/delete upload
```

#### Jobs (PDF Operations)
```
POST   /api/v1/jobs                   — Create processing job
GET    /api/v1/jobs/:jobId             — Get job status + result
GET    /api/v1/jobs                    — List user's jobs (auth required)
DELETE /api/v1/jobs/:jobId             — Cancel job
```

#### Downloads
```
GET    /api/v1/download/:jobId         — Download processed file
GET    /api/v1/download/:jobId/preview — Preview result (thumbnail)
```

#### User & Subscription
```
GET    /api/v1/user/profile            — Get user profile
PUT    /api/v1/user/profile            — Update profile
GET    /api/v1/user/usage              — Get usage stats
POST   /api/v1/subscription/create     — Create subscription
PUT    /api/v1/subscription/cancel     — Cancel subscription
GET    /api/v1/subscription/status     — Get subscription status
```

### 3.3 Rate Limits
| Tier | Requests/min | Uploads/hour | Max Concurrent Jobs |
|------|-------------|-------------|-------------------|
| Anonymous | 20 | 10 | 2 |
| Free (logged in) | 30 | 20 | 3 |
| Pro | 60 | Unlimited | 10 |
| Business | 120 | Unlimited | 25 |

---

## 4. Data Flow Specifications

### 4.1 File Upload Flow
```
1. Client → POST /api/v1/upload (multipart)
2. Server validates: file type, size, virus scan
3. Server stores to temp location
4. Server uploads to S3 (input bucket)
5. Server returns { fileId, status: "uploaded" }
6. Client stores fileId for job creation
```

### 4.2 Job Processing Flow
```
1. Client → POST /api/v1/jobs { tool, fileIds, options }
2. API validates request + checks rate limits
3. API creates Job record (status: "queued")
4. API pushes job to BullMQ queue
5. API returns { jobId, status: "queued" }
6. Worker picks up job from queue
7. Worker downloads input files from S3
8. Worker processes (merge/split/compress/etc.)
9. Worker uploads output to S3 (output bucket)
10. Worker updates Job record (status: "completed", outputFileId)
11. Client polls GET /api/v1/jobs/:jobId (or receives WebSocket event)
12. Client downloads via GET /api/v1/download/:jobId
```

### 4.3 File Cleanup Flow
```
1. Cron job runs every 15 minutes
2. Query files where created_at < NOW() - TTL
3. Delete from S3 (both input + output buckets)
4. Update DB records (status: "deleted")
5. Log cleanup metrics
```

---

## 5. Security Requirements

### 5.1 Authentication & Authorization
- JWT tokens with 15-minute access / 7-day refresh
- Bcrypt password hashing (cost factor 12)
- Rate-limited login attempts (5/minute)
- CSRF protection for cookie-based auth
- OAuth 2.0 (Google, GitHub) — Phase 2

### 5.2 File Security
- Virus scanning via ClamAV on all uploads
- File type validation (magic bytes, not just extension)
- Randomized file names (UUIDv4)
- Signed S3 URLs for downloads (expire in 1 hour)
- No public S3 buckets
- Encryption at rest (S3 server-side encryption)

### 5.3 Infrastructure Security
- TLS 1.3 everywhere
- CORS restricted to known origins
- Helmet.js security headers
- SQL injection prevention (Prisma parameterized queries)
- XSS prevention (React auto-escaping + CSP headers)
- Docker containers run as non-root
- seccomp + AppArmor profiles for workers
- Network isolation between services

### 5.4 Compliance
- GDPR: data deletion on request, minimal data collection
- Privacy Policy + Terms of Service required before launch
- Cookie consent banner
- Data processing agreement for EU users

---

## 6. Performance Requirements

### 6.1 Response Time Targets
| Operation | Target P50 | Target P95 |
|-----------|-----------|-----------|
| Page Load (SSR) | < 500ms | < 1.5s |
| File Upload (10MB) | < 3s | < 8s |
| Job Creation | < 200ms | < 500ms |
| Merge (5 files, 10MB total) | < 3s | < 8s |
| Compress (10MB) | < 5s | < 15s |
| PDF → JPG (10 pages) | < 5s | < 12s |
| Download Start | < 500ms | < 1.5s |

### 6.2 Scalability Targets
| Metric | MVP | Growth |
|--------|-----|--------|
| Concurrent Users | 50 | 500 |
| Jobs/minute | 20 | 200 |
| Worker Instances | 2 | 10-20 |
| Storage (monthly) | 50 GB | 500 GB |

---

## 7. Monitoring & Observability

### 7.1 Metrics to Track
```
- HTTP request latency (by endpoint)
- Job processing time (by tool type)
- Queue depth + wait time
- Worker CPU/memory utilization
- Upload/download bandwidth
- Error rates (by type)
- S3 storage usage
- Active user sessions
- Rate limit hits
```

### 7.2 Alerting Rules
| Alert | Condition | Severity |
|-------|-----------|----------|
| High Error Rate | > 5% 5xx in 5 min | Critical |
| Queue Backlog | > 50 jobs waiting > 5 min | Warning |
| Worker Down | < 1 healthy worker | Critical |
| Disk Space | > 80% used | Warning |
| High Memory | > 90% used on any worker | Warning |
| SSL Expiry | < 14 days | Warning |

---

## 8. Testing Requirements

| Type | Coverage Target | Tool |
|------|----------------|------|
| Unit Tests | > 80% | Jest |
| Integration Tests | Critical paths | Jest + Supertest |
| E2E Tests | Core user flows | Playwright |
| Load Tests | Break point identification | k6 / Artillery |
| Security Tests | OWASP Top 10 | OWASP ZAP |