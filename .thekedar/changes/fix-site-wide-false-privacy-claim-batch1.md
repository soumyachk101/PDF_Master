# Change record — Site-wide false privacy claim fix, batch 1: UI components, meta, legal pages

**Date:** 2026-07-27 · **Commit:** `723100d` · **Priority fix, not part of any numbered task**

## What happened

Phase 3's content-drafting workflow ran 3 adversarial verify agents (across the optimize, convertFrom,
and security clusters). All three independently surfaced the same finding from different angles: DocShift's
core claim — "100% browser-based, files never leave your device, no uploads" — is false. Confirmed
directly before acting on it, not just trusted secondhand:

- `frontend/src/hooks/useFileUpload.js:63` — every submission is `axios.post('/api/pdf/${toolSlug}',
  formData, ...)`, a real upload.
- `frontend/next.config.js:61` — proxies to `https://pdf-master-backend-sxvj.onrender.com`, a real
  external server.
- `useFileUpload.js:8-9,57-58` — comments confirm this is a Render.com **free-tier host that sleeps and
  cold-boots** (~30-60s), with retry logic built around exactly that.
- `backend/src/services/pdf.service.js` — every operation is plain server-side Node: `fs`, Ghostscript,
  `qpdf`, `libreoffice-convert`, a Python `pdf2docx` subprocess, Tesseract.js. No WASM anywhere in the
  codebase — `grep -rln "wasm\|WebAssembly"` only finds the string inside marketing copy.
- `ToolPage.jsx`'s persistent sidebar (shown on **every** tool page) claimed "100% In-Browser Secure...
  client-side WebAssembly. No files are ever sent to external cloud servers." Sign-pdf's UI went further,
  fabricating a "COMPLIANT ELECTRONIC SEAL... generated and stamped client-side using local cryptography"
  — no cryptography of any kind exists in `signPdf` (`pdf.service.js:595-632`, plain `pdf-lib` text stamp).

Full detail and the user's decision are recorded in `.thekedar/PROJECT_STATE.md`'s FOUNDATIONAL section.
**User decision: fix the copy everywhere it appears, pause Phase 3/4 until this batch lands.**

Before writing any replacement copy, verified the actual data-retention behavior so the new copy is
honest rather than just "less false": `grep` across every controller endpoint in
`backend/src/controllers/pdf.controller.js` shows **26 of 27 endpoints call `fs.unlinkSync` on the
uploaded file immediately after processing** (the 27th, `htmlToPdf`, takes a URL, not a file, so no
upload exists to clean up). `backend/src/middleware/upload.js` stores incoming files only in `os.tmpdir()`
— no database, no S3, no persistent storage anywhere in the codebase. This is a genuine, verifiable,
still-meaningful privacy story: **upload → process → delete immediately**, not **stays entirely on your
device**.

## What changed (this batch)

Replaced every instance of the false claim with honest copy built on the verified delete-after-processing
behavior, across:

- **`frontend/src/views/ToolPage.jsx`** — the sidebar box (heading + body), the "Quick Instructions" card's
  steps 3–4, and the entire sign-pdf "seal" card: heading ("COMPLIANT ELECTRONIC SEAL" →
  "SIGNATURE PREVIEW"), the fabricated `DocID: SECURE-WASM-...` string → `DocID: SIGNED-...`, the
  "VERIFIED" badge → "ADDED", and the fake-cryptography sentence → an honest statement that this is a
  typed/drawn signature image, not a certificate-based signature, with a pointer to a dedicated e-signature
  service for anything needing legal certainty.
- **`frontend/src/components/HeroSection.jsx`** — the marquee ticker item, the "LOCAL WASM ENGINE" badge,
  and the subheading paragraph.
- **`frontend/src/views/HomePage.jsx`** — the "100% Private" and "Lightning Fast" feature cards (retitled/
  reworded), and the entire "Built for Privacy" section (two paragraphs plus the "SECURITY NOTICE" callout).
  **Also removed the "Offline Capable" feature card entirely** — a claim not caught by the original grep
  (it doesn't repeat the standard phrasing) but equally false: every tool requires a live server
  round-trip, so there is no offline capability to advertise, and no honest adjacent claim to substitute
  in its place. Removed the now-unused `ServerCrash` icon import that only that card used.
- **`frontend/app/layout.jsx`** — site-wide `metadata.description` (root + `openGraph` + `twitter`, all
  three occurrences), `metadata.keywords`, and the `SoftwareApplication` schema's `description`.
- **`frontend/app/page.jsx`** — homepage `metadata.description` (all three occurrences: root, `openGraph`,
  `twitter`).
- **`frontend/src/utils/schema.js`** — `organizationNode.description` and `webSiteNode.description` (same
  string, both occurrences).
- **`frontend/app/privacy/page.jsx`** — the highest-stakes fix in this batch, being a legal document.
  Section 2 ("Information We Collect") and Section 6 ("Data Security") both asserted the false claim in
  legally-significant language ("we do not collect, upload, or store... your files never leave your
  device"; "never transmitted over the internet"). Rewritten to accurately describe upload → process →
  delete, HTTPS in transit, no database of user files. **Also fixed Section 5** ("Third-Party Services"),
  which named only Vercel (frontend host) and omitted the actual file-processing backend host entirely —
  now discloses both, without naming the specific processor (not required, and this session doesn't know
  whether that's meant to stay unnamed for infrastructure-security reasons). Bumped the "Last updated"
  date to the date of this actual edit (previously stale at May 28, 2026).
- **`frontend/app/about/page.jsx`** — "What is DocShift?", "How It Works", and the "Why DocShift?" list all
  rewritten. **Also fixed the same profile-vs-repo GitHub link issue task 006 already corrected in
  `llms.txt`**: this page independently said "open source" and linked
  `github.com/soumyachk101` (a profile, not a repo) — same reasoning as task 006 applies here (the repo
  has no LICENSE file, so "open source" is unverifiable as worded), softened to "Source Available" and
  repointed to `github.com/soumyachk101/PDF_Master`.

## What was deliberately NOT changed

- `frontend/backend` architecture itself — untouched. This batch is a copy/content correction, not an
  attempt to build real client-side processing (that would be a from-scratch engineering effort, far
  beyond this scope, and not requested).
- No `LICENSE` file added to the repo (consistent with task 006's earlier decision — the user's call).
- Vercel Analytics/Speed Insights disclosure in the privacy policy — left as-is; this batch only touched
  the sections that made the false processing-location claim.
- Any tool-specific content in `tools.js` — that is batch 2 of this fix (next).
- `Footer.jsx`, `DropzoneArea.jsx`, `opengraph-image.tsx`, `robots.ts`'s comment, `public/llms.txt` — all
  still contain instances of the same claim (confirmed by the original file-list grep); those are a
  separate, smaller batch, not yet done as of this commit.
- Visual design, layout, colors, component structure — every change in this batch is text-only. The
  sign-pdf seal card keeps its exact visual treatment (border, background, badge shape); only the words
  and one ID-string prefix changed.

## Why

The replacement narrative (upload → process → delete immediately, no database, no third-party sharing)
was chosen because it is the strongest **honest** claim available — verified against 26 of 27 controller
endpoints actually calling `fs.unlinkSync` right after processing. This preserves a genuine privacy
differentiator (most competitors' retention policies are far less transparent) without repeating a claim
this session has now proven false four times over.

## Verification

- `npm run build`: **PASS** — compiled, 73/73 pages, no errors from any of the 8 edited files.
- Per-file re-grep for the false-claim phrase family (`in-browser`, `webassembly`, `never leaves your
  device`, `never sent`, `runs ... your browser`, `100% local/private`, `no upload`, `without uploading`,
  `wasm`, plus file-specific variants like "never transmitted over the internet" and "do not collect,
  upload, or store"): **CLEAN** on all 8 files after editing, checked individually, not just once at the
  end.
- drift-check: **no drift** — exactly the 8 files touched, matching what was edited.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- Batch 2 (next): sweep all 30 tools in `tools.js` for the same claim family in `shortDesc`, `desc`,
  `seoTitle`, `seoDesc`, `seoArticle`, and `faqs` — this is the largest remaining surface area.
- Batch 3: `Footer.jsx`, `DropzoneArea.jsx`, `opengraph-image.tsx`, `robots.ts`'s comment (currently
  justifies the CCBot unblock decision partly on "user files never leave the browser," written by this
  session in task 006 — needs its own correction), and `public/llms.txt`.
- After all batches land: re-verify the Phase 3 draft content (27 tools, already generated, sitting
  unapplied) against the corrected narrative before applying any of it — several clusters were explicitly
  instructed to lean on "without uploading"/"runs in your browser" as a selling point and will need
  revision, not just application as originally drafted.
