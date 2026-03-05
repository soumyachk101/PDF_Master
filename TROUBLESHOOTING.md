# Troubleshooting Guide: "Something Went Wrong" Error

## Problem
When trying to process files, the frontend shows "Something went wrong" error message.

## Root Causes & Solutions

### 1. **Backend Connection Issues** (Most Common)

#### Symptoms:
- Error appears immediately when clicking "Process"
- Console shows `ERR_NETWORK` or connection timeout
- Health check fails

#### Solution:
The frontend cannot reach the Railway backend. This is usually due to:

**a) Incorrect API URL**
- Check `frontend/.env` file
- Verify `VITE_API_URL` matches your actual Railway URL
- Format: `https://your-app-name.up.railway.app` (no trailing slash)

**b) Backend Not Running**
- Visit your Railway URL directly: `https://your-app.up.railway.app/health`
- Should return: `{"status":"ok",...}`
- If not working, check Railway dashboard for deployment errors

**c) Railway Sleep Mode**
- Railway free tier apps sleep after inactivity
- First request after sleep takes 30-60 seconds to respond
- Wait and try again, or upgrade Railway plan

### 2. **CORS Errors**

#### Symptoms:
- Browser console shows: "Access to XMLHttpRequest blocked by CORS policy"
- Backend logs show: `[cors] Blocked origin: https://your-frontend.com`

#### Solution:

**Option A: Update Backend CORS Settings**
1. In Railway dashboard, add environment variable:
   ```
   FRONTEND_URL=https://your-actual-frontend-domain.com
   ```
2. Redeploy the backend

**Option B: Temporary Debug Mode**
1. In Railway dashboard, add:
   ```
   ALLOW_ALL_CORS=true
   ```
2. Redeploy (use only for debugging!)

**Common Frontend Domains:**
- Vercel: `https://your-app.vercel.app`
- Netlify: `https://your-app.netlify.app`
- Local dev: `http://localhost:5173`

### 3. **File Size Limits**

#### Symptoms:
- Error shows: "File too large" or HTTP 413
- Large files fail, small files work

#### Solution:
Check both frontend and backend limits:

**Backend (`backend/.env`):**
```
MAX_FILE_SIZE_MB=100
```

**Railway Platform:**
- Default limit: 500MB
- Cannot be increased on free tier

**Frontend Upload:**
- No hard limit in code
- Limited by browser and server timeouts

### 4. **Unsupported File Type**

#### Symptoms:
- Error shows: "Unsupported file type" or HTTP 415
- Specific file types always fail

#### Solution:
Each tool has specific allowed formats:

| Tool | Accepted Formats |
|------|-----------------|
| PDF to Word | .pdf |
| Word to PDF | .doc, .docx |
| PDF to JPG | .pdf |
| JPG to PDF | .jpg, .jpeg |
| Merge PDF | .pdf |
| Compress PDF | .pdf |

Check file extension matches expected format.

### 5. **Server Processing Errors**

#### Symptoms:
- Upload succeeds, processing starts, then fails
- HTTP 500 error
- Backend logs show processing errors

#### Common Issues:

**a) Missing System Dependencies**
```
Error: LibreOffice not found
Error: poppler-utils not installed
```
**Fix:** Ensure `nixpacks.toml` and `Aptfile` include all required packages

**b) Out of Memory**
```
Error: JavaScript heap out of memory
```
**Fix:** Increase Railway memory allocation (Settings → Resources)

**c) Temp Directory Issues**
```
Error: ENOENT: no such file or directory
```
**Fix:** Ensure temp directory exists and has write permissions

### 6. **Timeout Issues**

#### Symptoms:
- Large files start processing but timeout midway
- Network timeout errors

#### Solution:
Railway has default timeout of 60 seconds. For large files:

1. Optimize file size before upload
2. Use compression tools first
3. Consider splitting large PDFs

## Debugging Steps

### Step 1: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Try processing a file
4. Look for error messages starting with `[upload]`

Expected logs:
```
[upload] Starting upload to: https://...
[upload] Files: 1
[upload] Options: {}
```

Error logs will show:
```
[upload] Error details: ...
[upload] Response status: 500
```

### Step 2: Test Backend Health
Visit in browser:
```
https://your-railway-app.up.railway.app/health
```

Should return:
```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "...",
  "env": "production"
}
```

### Step 3: Test API Directly
Using curl or Postman:
```bash
curl -X POST https://your-railway-app.up.railway.app/api/pdf/merge-pdf \
  -F "files=@test.pdf"
```

### Step 4: Check Railway Logs
1. Go to Railway dashboard
2. Select your project
3. Click "Deployments"
4. View latest deployment logs
5. Look for errors during:
   - Build phase
   - Startup phase
   - Request processing

### Step 5: Verify Environment Variables
In Railway dashboard, ensure these are set:
```
PORT=4000                    # Required
NODE_ENV=production          # Required
FRONTEND_URL=...             # Your frontend URL
MAX_FILE_SIZE_MB=100         # Optional
TEMP_FILE_TTL_MINUTES=30     # Optional
RAILWAY=true                 # Recommended
```

## Quick Fixes

### Fix 1: Update Frontend API URL
Edit `frontend/.env`:
```env
VITE_API_URL=https://your-correct-railway-url.up.railway.app
```

Then rebuild and redeploy frontend:
```bash
cd frontend
npm run build
# Deploy to Vercel/Netlify/etc
```

### Fix 2: Enable Detailed Logging
Add to backend `.env`:
```env
NODE_ENV=development
```

This shows detailed error messages instead of generic ones.

### Fix 3: Test Locally
Run both frontend and backend locally:

**Terminal 1 (Backend):**
```bash
cd backend
npm install --legacy-peer-deps
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` and test.

### Fix 4: Clear Caches
Sometimes browser or build caches cause issues:

```bash
# Clear frontend build cache
cd frontend
rm -rf dist node_modules/.vite
npm run build

# Clear Railway cache (in dashboard)
Settings → Danger Zone → Delete Cache
```

## Error Message Reference

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Cannot connect to server" | Backend unreachable | Check API URL, verify backend is running |
| "File is too large" | Exceeds MAX_FILE_SIZE_MB | Reduce file size or increase limit |
| "Unsupported file type" | Wrong file extension | Use correct format for the tool |
| "Invalid request" | Malformed upload | Check file integrity, try different file |
| "Server error" | Backend processing failed | Check Railway logs, verify dependencies |

## Still Having Issues?

1. **Enable Debug Mode**
   Add to backend `.env`:
   ```
   NODE_ENV=development
   ALLOW_ALL_CORS=true
   ```

2. **Check All Logs**
   - Browser console (F12)
   - Railway deployment logs
   - Railway runtime logs

3. **Test with Small File**
   Try with a tiny PDF (< 1MB) to rule out size/timeout issues

4. **Verify Deployment**
   - Backend: Visit `/health` endpoint
   - Frontend: Check built files deployed correctly

5. **Revert Recent Changes**
   If it worked before, revert to last working version

## Contact Support

If none of the above helps:
- Check Railway status: https://status.railway.app
- Review Railway docs: https://docs.railway.app
- Share error logs when asking for help

---

**Last Updated:** March 5, 2026
**Version:** 1.0
