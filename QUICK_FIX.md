# Quick Fix Guide for "Something Went Wrong" Error

## 🚀 **Immediate Action Plan**

### Step 1: Check if Backend is Running
Open in browser: `https://web-production-f7439.up.railway.app/health`

**If it shows an error or doesn't load:**
- Backend is not deployed correctly
- Go to Railway dashboard and check deployment logs
- Common issue: Build failed or server crashed

**If it loads successfully:**
You should see JSON like:
```json
{
  "status": "ok",
  "uptime": 123.456,
  ...
}
```
Proceed to Step 2.

---

### Step 2: Open Browser Console
1. Go to your frontend website
2. Press **F12** (or right-click → Inspect)
3. Click the **Console** tab
4. Try to process a file
5. Look for RED error messages

**Common errors:**
- `ERR_NETWORK` → Cannot reach backend
- `CORS policy` → CORS configuration issue  
- `413` → File too large
- `415` → Wrong file type
- `500` → Server processing error

---

### Step 3: Most Likely Fixes

#### Fix A: Update Frontend API URL (Most Common!)
Your frontend might be pointing to wrong backend URL.

1. Open `frontend/.env`
2. Check this line:
   ```env
   VITE_API_URL=https://web-production-f7439.up.railway.app
   ```
3. Make sure it matches your ACTUAL Railway URL exactly
4. Save and rebuild frontend:
   ```bash
   cd frontend
   npm run build
   ```
5. Redeploy to Vercel/Netlify

#### Fix B: Add FRONTEND_URL to Backend
Backend needs to know your frontend's domain for CORS.

1. Get your frontend URL (from Vercel/Netlify):
   - Example: `https://pdf-master-frontend.vercel.app`
   
2. In Railway dashboard:
   - Go to your project
   - Click "Variables"
   - Add: `FRONTEND_URL=https://your-frontend.vercel.app`
   - Deploy will trigger automatically

3. Wait 2-3 minutes for deployment

#### Fix C: Enable Detailed Errors Temporarily
For debugging only!

1. In Railway dashboard, add variable:
   ```
   NODE_ENV=development
   ```
2. This will show detailed error messages instead of generic ones
3. Try processing again and check what specific error appears

---

### Step 4: Test with Small File
Sometimes large files timeout.

1. Create a tiny test PDF (1-2 pages, < 100KB)
2. Try to process it
3. If it works → You have a timeout issue
4. If it fails → You have a connection/CORS issue

---

### Step 5: Check Railway Logs
1. Go to https://railway.app
2. Select your project
3. Click on latest deployment
4. View logs

**Look for errors during:**
- Build phase (missing dependencies?)
- Startup (port binding issues?)
- Runtime (processing errors?)

---

## ✅ **Checklist - Verify These**

- [ ] Backend health check passes (`/health` returns status "ok")
- [ ] Frontend `.env` has correct `VITE_API_URL`
- [ ] Backend has `FRONTEND_URL` environment variable set
- [ ] No CORS errors in browser console
- [ ] Small test file (< 1MB) tested
- [ ] Railway deployment completed successfully (no red X in dashboard)

---

## 🔍 **What's the Actual Error?**

The message "Something went wrong" is a GENERIC error that doesn't tell us much. We need to see the REAL error message. 

**To find it:**

1. **Browser Console Method:**
   - F12 → Console tab
   - Look for `[upload] Error details:` message
   - This shows the actual error

2. **Backend Logs Method:**
   - Railway dashboard → Logs
   - Look for error messages when you try to process

3. **Test Page Method:**
   - Open `backend/test-backend.html` in browser
   - This will test connection and show detailed results

---

## 💡 **Common Scenarios**

### Scenario 1: Works Locally, Fails on Production
**Cause:** Environment variables mismatch

**Fix:**
1. Compare local `.env` with Railway variables
2. Ensure `FRONTEND_URL` matches production URL
3. Rebuild frontend with correct API URL

### Scenario 2: Nothing Works at All
**Cause:** Backend not deployed or crashed

**Fix:**
1. Check Railway dashboard for deployment status
2. Look for build errors
3. Verify all system dependencies installed

### Scenario 3: Sometimes Works, Sometimes Doesn't
**Cause:** Railway sleep mode or resource limits

**Fix:**
1. First request after inactivity takes longer
2. Wait 30-60 seconds and try again
3. Consider upgrading Railway plan

---

## 📞 **Need More Help?**

When asking for help, provide:
1. Screenshot of browser console errors
2. Railway deployment logs (last 50 lines)
3. Your `VITE_API_URL` value
4. Your frontend domain
5. What tool/file type you're trying to process

---

**Last Updated:** March 5, 2026
