# PDF Master Frontend

A React + Vite application for PDF manipulation, built with MUI, Tailwind CSS, and Vercel Analytics.

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
npm install
```

### Running locally

```bash
npm run dev
```

The app starts on `http://localhost:5173` by default.

## Environment Variables

All environment variables exposed to the browser must be prefixed with `VITE_`.

### Local setup

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```
2. Open `.env.local` and fill in the values for your environment.

> `.env.local` is listed in `.gitignore` and must **never** be committed.

### Available variables

| Variable | Description | Default (dev) |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API server | `http://localhost:4000` |

### Setting variables in Vercel

1. Go to your project in the [Vercel dashboard](https://vercel.com/dashboard).
2. Open **Settings → Environment Variables**.
3. Add each variable and choose which environments (Production, Preview, Development) it applies to.

The `vercel.json` in this repo configures the build. Environment variables are managed separately via the Vercel dashboard or CLI:

```bash
# Add VITE_API_URL for production
vercel env add VITE_API_URL production

# Add VITE_API_URL for preview deployments
vercel env add VITE_API_URL preview
```

Vercel makes any variable added this way available automatically during the build.

## Vercel Deployments

### Preview deployments

Every push to a non-`main` branch and every pull request automatically triggers a **preview deployment** on Vercel. Each preview gets its own unique URL (e.g. `pdf-master-frontend-git-feature-branch.vercel.app`), so you can share and review changes before merging.

### Production deployments

Merging or pushing directly to `main` triggers a **production deployment**, which updates the live site.

### Deploying with the Vercel CLI

```bash
# Install the CLI (once)
npm i -g vercel

# Deploy a preview
vercel

# Deploy to production
vercel --prod
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint |
__________________________________________________________________________________________________________________________________________________________________________
