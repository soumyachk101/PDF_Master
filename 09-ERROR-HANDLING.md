# Error Handling Document
## PDFForge — Online PDF Tool Suite

---

## 1. Error Handling Philosophy

### 1.1 Principles
```
1. NEVER expose internal errors to users
2. ALWAYS log full error details server-side
3. ALWAYS return consistent error format
4. ALWAYS include actionable user messages
5. ALWAYS include error codes for client handling
6. NEVER swallow errors silently
7. ALWAYS cleanup resources on error (files, temp dirs)
```

---

## 2. Error Response Format

### 2.1 Standard Error Response
```typescript
// All API errors follow this format

interface ErrorResponse {
  success: false;
  error: {
    code: string;          // Machine-readable error code
    message: string;       // Human-readable message
    details?: Record<string, any>;  // Additional context
    requestId?: string;    // For support/debugging
    timestamp: string;     // ISO 8601
  };
}

// Example
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File exceeds the maximum size of 25MB for your plan.",
    "details": {
      "maxSize": 26214400,
      "actualSize": 52428800,
      "currentTier": "free",
      "upgradeUrl": "/pricing"
    },
    "requestId": "req_7a8b9c0d1e2f",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 3. Error Code Registry

### 3.1 Authentication Errors (AUTH_*)
| Code | HTTP Status | Message | When |
|------|------------|---------|------|
| `AUTH_INVALID_CREDENTIALS` | 401 | Invalid email or password. | Wrong login |
| `AUTH_TOKEN_EXPIRED` | 401 | Access token has expired. Please refresh. | Expired JWT |
| `AUTH_TOKEN_INVALID` | 401 | Invalid authentication token. | Malformed JWT |
| `AUTH_REFRESH_EXPIRED` | 401 | Session expired. Please log in again. | Expired refresh |
| `AUTH_REFRESH_REVOKED` | 401 | Session has been revoked. | Used revoked token |
| `AUTH_ACCOUNT_SUSPENDED` | 403 | Account has been suspended. | Banned user |
| `AUTH_EMAIL_EXISTS` | 409 | Email is already registered. | Duplicate register |
| `AUTH_WEAK_PASSWORD` | 400 | Password does not meet requirements. | Weak password |
| `AUTH_RESET_INVALID` | 400 | Password reset link is invalid or expired. | Bad reset token |

### 3.2 File/Upload Errors (FILE_*)
| Code | HTTP Status | Message | When |
|------|------------|---------|------|
| `FILE_TOO_LARGE` | 413 | File exceeds maximum size for your plan. | Over size limit |
| `FILE_INVALID_TYPE` | 400 | File type not supported for this tool. | Wrong format |
| `FILE_CORRUPT` | 400 | File appears to be corrupted or invalid. | Bad file structure |
| `FILE_ENCRYPTED` | 400 | File is password-protected. Please unlock first. | Encrypted PDF |
| `FILE_VIRUS_DETECTED` | 400 | File failed security scan. | ClamAV positive |
| `FILE_EMPTY` | 400 | Uploaded file is empty. | 0 bytes |
| `FILE_NOT_FOUND` | 404 | File not found or has expired. | Missing file |
| `FILE_EXPIRED` | 410 | File has been deleted (auto-cleanup). | Past TTL |
| `FILE_UPLOAD_FAILED` | 500 | Failed to upload file. Please try again. | S3 error |
| `FILE_LIMIT_EXCEEDED` | 400 | Too many files. Maximum is {max} for this tool. | Over file count |

### 3.3 Job/Processing Errors (JOB_*)
| Code | HTTP Status | Message | When |
|------|------------|---------|------|
| `JOB_NOT_FOUND` | 404 | Job not found. | Invalid jobId |
| `JOB_INVALID_TOOL` | 400 | Unknown tool type: {tool}. | Bad tool name |
| `JOB_INVALID_OPTIONS` | 400 | Invalid options for {tool}. | Bad options |
| `JOB_PROCESSING_FAILED` | 500 | Processing failed. Please try again. | Worker crash |
| `JOB_PROCESSING_TIMEOUT` | 504 | Processing timed out. Try a smaller file. | Exceeded timeout |
| `JOB_CANCELLED` | 409 | Job has been cancelled. | User cancelled |
| `JOB_EXPIRED` | 410 | Job result has expired. | Past result TTL |
| `JOB_ALREADY_COMPLETE` | 409 | Job has already been processed. | Re-process attempt |

### 3.4 Rate Limiting Errors (RATE_*)
| Code | HTTP Status | Message | When |
|------|------------|---------|------|
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests. Please wait {seconds}s. | Over API limit |
| `RATE_UPLOAD_EXCEEDED` | 429 | Upload limit reached. Try again in {minutes}m. | Over upload limit |
| `RATE_JOB_EXCEEDED` | 429 | Processing limit reached for your plan. | Over job limit |
| `RATE_CONCURRENT_EXCEEDED` | 429 | Too many active jobs. Wait for current to finish. | Over concurrent |

### 3.5 Subscription/Tier Errors (TIER_*)
| Code | HTTP Status | Message | When |
|------|------------|---------|------|
| `TIER_FEATURE_LOCKED` | 403 | This feature requires a {required} plan. | Premium only |
| `TIER_LIMIT_REACHED` | 403 | Daily limit reached. Upgrade for unlimited. | Daily cap |
| `TIER_BATCH_NOT_ALLOWED` | 403 | Batch processing requires Pro or higher. | Free batch |

### 3.6 System Errors (SYS_*)
| Code | HTTP Status | Message | When |
|------|------------|---------|------|
| `SYS_INTERNAL_ERROR` | 500 | Something went wrong. Please try again. | Unknown error |
| `SYS_SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable. | System down |
| `SYS_STORAGE_ERROR` | 500 | Storage service error. Please try again. | S3 down |
| `SYS_QUEUE_ERROR` | 500 | Processing queue error. Please try again. | Redis/queue down |
| `SYS_MAINTENANCE` | 503 | System under maintenance. Back shortly. | Planned downtime |

---

## 4. Error Handling Implementation

### 4.1 Global Exception Filter
```typescript
// src/common/filters/all-exceptions.filter.ts

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId = request.headers['x-request-id'] || generateRequestId();

    let status: number;
    let errorCode: string;
    let message: string;
    let details: Record<string, any> | undefined;

    if (exception instanceof AppException) {
      // Known application error
      status = exception.status;
      errorCode = exception.code;
      message = exception.message;
      details = exception.details;
    } else if (exception instanceof HttpException) {
      // NestJS HTTP exception
      status = exception.getStatus();
      errorCode = `SYS_HTTP_${status}`;
      message = exception.message;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      // Database error
      status = 500;
      errorCode = 'SYS_DATABASE_ERROR';
      message = 'A database error occurred. Please try again.';
      // Log full Prisma error internally
      this.logger.error(`Prisma error: ${exception.code}`, exception.meta);
    } else {
      // Unknown error
      status = 500;
      errorCode = 'SYS_INTERNAL_ERROR';
      message = 'Something went wrong. Please try again.';
    }

    // Log full error details (server-side only)
    this.logger.error({
      requestId,
      errorCode,
      message: exception instanceof Error ? exception.message : 'Unknown',
      stack: exception instanceof Error ? exception.stack : undefined,
      path: request.url,
      method: request.method,
      ip: request.ip
