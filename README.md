## PDFForge — Online PDF Tool Suite

PDFForge is a **PDF tools platform** (similar to iLovePDF) that lets users merge, split, compress, and convert PDFs.

This repository contains:

- **Backend API (`backend/`)**: NestJS + Prisma service exposing the PDF/Jobs/Auth APIs.
- **Next.js Frontend (`web/`)**: Production-ready Next.js 14 + Tailwind UI, designed for Vercel.
- **Architecture & product docs (`01-PRD.md` … `09-ERROR-HANDLING.md`)**: Complete product, system, and testing specifications.

---

## Backend Status (API service)

- Stack: **NestJS 11**, **Node 20**, **Prisma 5**, **PostgreSQL 16**, **BullMQ**, **S3-compatible storage**.
- The code in `backend/src` aligns with the architecture, database schema, and flows defined in:
  - `01-PRD.md` (product)
  - `02-TRD.md` (technical)
  - `03-SYSTEM-DESIGN.md`
  - `05-BACKEND-ARCHITECTURE.md`
  - `06-DATABASE-STRUCTURE.md`
  - `07-FILE-MANAGEMENT.md`
  - `08-TEST-CASES.md`
  - `09-ERROR-HANDLING.md`

You can run the backend locally and deploy it to any Node-compatible host (Railway, Render, AWS, etc.). Vercel is recommended mainly for the **Next.js frontend**, not this long‑running NestJS API.

### Backend: local development

```bash
cd backend
npm install

# copy and configure environment
cp .env.example .env
# edit .env with your DATABASE_URL, Redis, S3/R2, JWT secrets, Stripe, etc.

# run migrations
npx prisma migrate deploy

# start dev server
npm run start:dev
```

The API will be available on the port configured in `.env` (see `05-BACKEND-ARCHITECTURE.md` and `.env.example` for details).

---

## Frontend / Website (Vercel-ready)

The `web/` directory is a **Next.js 14 (App Router) + Tailwind CSS** app designed to be deployed on Vercel:

- Modern UI with:
  - `app/page.tsx`: homepage with tool grid.
  - `app/tools/merge-pdf/page.tsx`: full Merge PDF flow (upload → job → download).
- Uses `NEXT_PUBLIC_API_URL` to talk to the backend (`/api/v1/upload`, `/api/v1/jobs`).

### Frontend: local development

```bash
cd web
npm install
npm run dev
```

By default the frontend expects the API at `http://localhost:3001`. You can change this using:

```bash
cd web
echo NEXT_PUBLIC_API_URL=http://localhost:3001 > .env.local
```

### Deploying frontend to Vercel

1. **Deploy backend API** to a Node host and note the public URL (for example `https://api.yourdomain.com`).
2. **Push this repo to GitHub** (or another VCS).
3. In Vercel:
   - Import the repo.
   - Set **Project root** to `web/`.
   - Set environment variable `NEXT_PUBLIC_API_URL` to your backend URL (for example `https://api.yourdomain.com`).
   - Use the default Next.js build command (`npm run build`) and output directory (`.next`).
4. Deploy. Your website (tool UI) will be served from Vercel, talking to the external backend API.

Once the backend is reachable from Vercel and `NEXT_PUBLIC_API_URL` is set, the Merge PDF tool page will be production-ready.


