# PROJECT_STATE

> Single source of truth for this project's Thekedar workflow.
> Contract: a fresh session must be able to resume correctly from this file alone.
> Updated by the orchestrator after every task. Keep it terse.

## 🔴🔴🔴 FOUNDATIONAL — the site's entire "100% browser-based, private, no upload" claim is false (found 2026-07-26, during Phase 3 content-drafting verification)

**This is bigger than any other finding in this document. It is not a per-tool bug — it is the core brand
promise of the whole product, and it is false, in production, right now, on every page.**

### The claim, and where it lives

"Free browser-based PDF tools... No uploads, 100% private... processes locally on your device... never
sent over the internet" is asserted, in some form, in: the homepage hero and `layout.jsx`'s meta
description, virtually every one of the 30 tools' `shortDesc`/`desc` fields, `ToolPage.jsx`'s **persistent
UI sidebar shown on every single tool page** ("100% In-Browser Secure... runs strictly locally via
client-side WebAssembly. No files are ever sent to external cloud servers, preventing data leaks" —
`ToolPage.jsx:992-998`), the About page ("without uploading a single byte to any server... runs entirely
in your browser using JavaScript and WebAssembly... When you close the tab, your data is gone"),
`ToolSEOContent.jsx`'s "Why use DocShift?" paragraph (written by this session, task 011), `robots.ts`'s
CCBot-unblock comment (written by this session, task 006 — "user files never leave the browser"), the
`Organization`/`WebSite` schema `description` fields (written by this session, task 010), and 17 of the 30
tools' `seoTitle`/`seoDesc` (retargeted around "without uploading" by this session, tasks 008/009).

### The reality, verified independently by three separate Phase-3 adversarial-verify agents, then confirmed
### a fourth time by direct inspection of primary sources before writing this entry

- `frontend/src/hooks/useFileUpload.js:63` — every tool submission is
  `axios.post(\`/api/pdf/${toolSlug}\`, formData, axiosConfig)`, a real HTTP POST carrying the actual
  file (`formData.append('files', file)`, line 38).
- `frontend/next.config.js:61` — `const backendUrl = process.env.BACKEND_URL ||
  'https://pdf-master-backend-sxvj.onrender.com';` — proxies `/api/*` to a real external server.
- `frontend/src/hooks/useFileUpload.js:8-9,57-58` — comments: "Wake the backend (free-tier host spins
  down when idle)" and "the free-tier backend 502s while it cold-boots (~30-60s), so spaced retries
  usually succeed." **This is a Render.com free-tier Node server that sleeps and cold-boots** — about as
  far from "client-side WASM, never leaves your device" as a web architecture can be.
- `backend/src/services/pdf.service.js` — every operation (`mergePdf`, `compressPdf`, `pdfToWord`,
  `pdfToPdfa`, `signPdf`, `ocrPdf`, etc.) is plain server-side Node using `fs`, Ghostscript (`gs`), `qpdf`,
  `libreoffice-convert`, a Python `pdf2docx` subprocess, and Tesseract.js — none of it runs in a browser,
  none of it is WASM.
- `grep -rln "wasm\|WebAssembly" frontend/src frontend/app` — the string "WebAssembly" appears only as
  **marketing copy** in `HomePage.jsx`, `ToolPage.jsx`, and `about/page.jsx`. There is no actual
  WebAssembly module, build step, or client-side processing path anywhere in the codebase.
- `sign-pdf`'s live UI (`ToolPage.jsx:706-736`, rendered the moment a user types a signature) goes
  further and fabricates a specific security mechanism: *"COMPLIANT ELECTRONIC SEAL... VERIFIED... This
  signature is generated and stamped client-side using local cryptography. The document is protected
  against unauthorized layout manipulation."* None of that is true either — same server round-trip, same
  `pdf-lib` text stamp, no cryptography, no tamper-evidence of any kind.

### Why this matters more than the three broken-placeholder tools

Those were "this specific advertised feature doesn't do what it says." This is "the site tells every user,
on every page, that their file never leaves their device — while uploading it to a cold-starting free-tier
server running conventional Node/Ghostscript/LibreOffice/Python processes." Users are told this while
being asked to process tax paperwork, signed contracts, financial spreadsheets (this session's own
`excel-to-pdf` retarget explicitly leaned into "financial data never leaves your device," task 008),
redaction targets, and legal documents. This is a materially false safety/privacy representation, not a
feature gap.

### What this means for this session's own work

Tasks 006, 008, 009, 010, and 011 — all already committed — each reinforced or built directly on top of
this false premise, in good faith, because it was the codebase's own stated architecture (in the UI,
the About page, and the pre-existing SEO copy this session was asked to optimize, not to architecturally
audit). The Phase 3 content-drafting workflow that just completed (27 tools, 6 clusters) was explicitly
instructed to use "without uploading"/"runs in your browser" as a core differentiator in several clusters,
following the same premise — **none of that content has been applied to `tools.js` yet.** It is sitting
in the workflow's output file, unapplied, pending this decision.

### Status: STOPPED. Awaiting user direction before any further Phase 3/4 work.

This is not a call to make unilaterally. Options that need the user's input: (a) is there in fact a
genuine client-side/WASM processing path for at least some tools that this investigation missed and the
user can point to, (b) if the architecture is genuinely server-side as verified, how should the site's
entire privacy narrative be corrected — a scope far larger than an SEO content task, (c) whether to apply
any of the already-drafted Phase 3 content as-is (much of it doesn't repeat the false claim directly, but
ships on pages whose surrounding UI does), with revisions, or not at all pending the larger fix.

## 🔴 CRITICAL — blocking product bug (found 2026-07-26, during task 017 investigation)

**`redact-pdf` cannot succeed. Ever.** Confirmed by reading the full request path, not assumed:

1. `backend/src/routes/pdf.routes.js:64` — `router.post('/redact-pdf', upload.single('files'),
   pdfController.protectPdf); // MVP: Use protect as placeholder`. The redact endpoint is a literal alias
   to `protectPdf` — there is no redaction implementation anywhere in the backend (`grep redact
   backend/src/services/pdf.service.js` returns zero matches).
2. `backend/src/controllers/pdf.controller.js:236-237` — `protectPdf` requires `req.body.password`;
   without it, returns **HTTP 400** immediately.
3. `frontend/src/views/ToolPage.jsx` — zero special-case handling for `tool.slug === 'redact-pdf'`
   anywhere (`grep -n "redact-pdf" src/views/ToolPage.jsx` = no matches). No password field, no
   text-selection UI. `additionalData.password` is set only for `protect-pdf` (line 151).

**Net effect: every real use of "Redact PDF" 400s.** Not silently wrong — actively broken, always.

**Also discovered:** `node-signpdf` and `node-forge` are installed (`backend/package.json`) but never
invoked anywhere in the codebase (`grep -rn "node-signpdf\|require('forge')" backend/src/` = zero
matches). `sign-pdf`'s real implementation (`pdf.service.js:595`) draws the typed/drawn signature text and
a cosmetic "Digitally signed · &lt;date&gt;" label onto the page via `pdf-lib` — a visual stamp, not a
PKI/certificate signature. Relevant to task 017's content, not a bug — sign-pdf's copy must not claim
eIDAS/ESIGN/PAdES/X.509 compliance.

**Also discovered:** the pre-existing (pre-session) `pdf-to-pdfa` FAQ claims "We target PDF/A-2b." The
actual implementation (`pdf.service.js:930`) is a bare Ghostscript call — `gs -dPDFA -dBATCH -dNOPAUSE
-sProcessColorModel=DeviceRGB -sDEVICE=pdfwrite -sPDFACompatibilityPolicy=1` — with no explicit level flag
and no post-conversion validation step. This does not verifiably back a "PDF/A-2b" claim. Task 015 must
not carry this claim forward; describe the archival conversion functionally instead.

**Decision (user, 2026-07-26):** Pause `redact-pdf` content work. Task 017 ships the other 3 security
tools (`unlock-pdf`, `protect-pdf`, `sign-pdf`) and explicitly skips `redact-pdf`. The actual backend fix
is separate engineering work, the user's call on timing. **Also corrected as a standalone fix** (not
part of task 008 or 017): `redact-pdf`'s already-shipped title/desc/keywords/article/faqs made explicit
false permanence claims ("gone for good, even in forensic tools", a fabricated "text-select mode" UI that
does not exist) — these were live before this session started, and task 008 (commit `e97a97d`)
unknowingly strengthened them further. Softened to honest, hedged language that asserts nothing
unverifiable. See commit `2b8c4f3` for this fix, separate from task 008's and 017's changelogs.

### Two more of the same pattern, found immediately after (same investigation pass)

Reading the full `backend/src/routes/pdf.routes.js` (rather than one route at a time) surfaced two more
tools wired to unrelated placeholder functions via the identical `// MVP: ... as placeholder` comment:

- **`organize-pdf` → `pdfController.rotatePdf`** (`pdf.routes.js:22`, `// MVP: Basic rotate
  functionality`). The frontend never sends reorder/delete data for this tool (`grep additionalData
  frontend/src/views/ToolPage.jsx` — no entry for `organize-pdf` at all), so the backend call always
  resolves to `rotatePdf(filePath, undefined)` → `parseInt(undefined) || 90` → **a blind 90° rotation of
  the entire document, every time** — actively wrong, not merely incomplete. Cannot reorder or delete a
  single page today.
- **`edit-pdf` → `pdfController.watermarkPdf`** (`pdf.routes.js:57`, `// MVP: Use watermark as
  placeholder`). No freehand drawing, shape, or text-editing implementation exists anywhere in the
  codebase (confirmed: zero matches for `edit`/`annotate` in `pdf.controller.js`, zero matches for
  `hasCanvas`/edit-specific UI in `ToolPage.jsx` beyond the `hasCanvas: true` config flag itself). Clicking
  "Edit PDF" stamps a watermark; nothing else.

**Decision (user, 2026-07-26):** Same treatment as `redact-pdf`. Tasks 012 and 016 skip these two tools
(012 ships 5 of 6: `merge-pdf`, `split-pdf`, `remove-pages`, `extract-pdf`, `scan-to-pdf`; 016 ships 4 of
5: `rotate-pdf`, `page-numbers`, `add-watermark`, `crop-pdf`). Already-shipped copy for both corrected in
a standalone fix — see the dedicated commit, separate from tasks 012/016's changelogs.

### One more found the same pass — works, but is materially mis-described

**`translate-pdf`** actually runs (not broken), but its copy claims "AI-powered translation that
preserves layout... fonts, document layouts, and formatting perfectly intact." The real implementation
(`pdf.service.js:211`) extracts plain text via `pdf-parse` (all layout/font/formatting discarded),
translates it through the free MyMemory API (`api.mymemory.translated.net`), and the controller
(`pdf.controller.js:130-131`) serves the result as `Content-Type: text/plain`,
`translated-result.txt`. Zero layout preservation occurs anywhere in the pipeline.

**Decision (user, 2026-07-26):** Not paused — task 013 proceeds, but describes `translate-pdf` honestly
as text extraction + translation, output is a plain translated text file. Every "preserves layout/fonts",
"formatting perfectly intact", and "AI-powered" claim dropped.

### A fourth and fifth gap, found by the Phase 3 drafting agent's own investigation (not the adversarial verify pass)

While drafting the organize cluster, the agent discovered — and documented in its own notes, read in full
before this entry was written — that **`remove-pages` and `extract-pages` have no page-picker UI at all**,
despite both being configured with `hasThumbnails: true`:

- `frontend/src/views/ToolPage.jsx`'s `handleSubmit` (the `additionalData` block, ~lines 105-166) sets a
  `pages`/`ranges` value for `split-pdf`, `rotate-pdf`, `add-watermark`, and several others — but has
  **no `tool.slug === 'remove-pages'` or `'extract-pages'` branch at all**. Confirmed independently by
  this session, not just trusted from the agent's report.
- `remove-pages` therefore always submits with no `pages` param. `pdf.service.js:950-960` returns the
  file with nothing removed — a **silent no-op**, not an error.
- `extract-pages` always submits with no `ranges` param. `pdf.service.js:122` defaults to
  `indicesToCopy = [0]` — it **always extracts only page 1**, regardless of what a user might expect to
  select.

This is milder than the redact/organize/edit situation (no active wrong-direction damage, and the fix is
plausibly small — wiring up an input control similar to `split-pdf`'s existing ranges field — rather than
requiring new backend logic), so it was not raised as its own blocking question. The content applied for
both tools during this session's tools.js sweep deliberately uses soft, mechanism-agnostic phrasing
("tell DocShift which page numbers...") rather than the old, specific, now-disproven "tick the
thumbnails" claim — so nothing false is asserted — but neither page's copy currently warns that the
picker doesn't exist yet. **Flagging for the same fix-it-when-ready treatment as the other three**, at
the user's discretion on timing.

### Summary of every tool affected by this investigation

| Tool | Status | Task | Treatment |
|---|---|---|---|
| `redact-pdf` | Broken (400s always) | 017 | Skipped; false copy corrected (commit `2b8c4f3`) |
| `organize-pdf` | Broken (wrong action, not just incomplete) | 012 | Skipped; false copy corrected |
| `edit-pdf` | Broken (does something unrelated) | 016 | Skipped; false copy corrected |
| `translate-pdf` | Works, badly mis-described | 013 | Proceeds with honest copy |
| `remove-pages` | No page-picker UI — silent no-op | 012 | Content applied with neutral phrasing; flagged for a UI fix |
| `extract-pages` | No page-picker UI — always extracts page 1 only | 012 | Content applied with neutral phrasing; flagged for a UI fix |

**Root-cause pattern for the three broken tools:** all three follow the identical
`// MVP: Use X as placeholder` alias comment in `pdf.routes.js`, suggesting an unfinished MVP build where
several features were stubbed to a same-shaped neighbor function and never completed. Worth a dedicated
engineering pass across the whole routes file, not just these three — this investigation did not
exhaustively verify every remaining route (e.g. `comparePdf`, `cropPdf`, `addPageNumbers` were checked
only for existence/dedicated-function-ownership, not for behavioral correctness at the level applied to
security/organize/edit).

## Project overview

DocShift — 30 free browser-based PDF tools (files never leave the browser). Next.js 15.3 App Router in `frontend/`, Express backend in `backend/`, live at https://www.docshift.tech (canonical host = www).
Current goal: take SEO from "good on-page" to top-notch — per-tool keyword targeting, structural content gaps, schema, GEO/AI-search, and the assets that make backlinks acquirable.

## Current phase

Phase 3 — Content depth · **done** (all 6 clusters landed; see the FOUNDATIONAL section above for the
site-wide false-claim investigation that dominated this phase's actual work)

## Phases

<!-- Phase N — name · tasks NNN–NNN · planned | building | done -->
- Phase 0 — Audit & plan · no task files · **done** (6 specialist audits → `.thekedar/AUDIT_FINDINGS.md`, 23 tasks planned)
- Phase 1 — Technical correctness · tasks 001–007 · **done**
- Phase 2 — Keyword realignment & schema · tasks 008–010 · **done**
- Phase 3 — Content depth · tasks 011–017 · **done** (27 of 30 tools; 3 paused — see FOUNDATIONAL)
- Phase 4 — Hubs, comparison, link assets · tasks 018–023 · planned, next up

## Active task

none — Phase 3 closed, waiting on user go-ahead for Phase 4

## Done

<!-- newest last -->
- 001 — Invalid tool slugs return HTTP 404 · `5b041b9`
- 002 — Signature fonts via next/font · `9b820ad`
- 003 — Long-cache unhashed public/ assets · `c0d518a`
- 004 — Real 1200×630 OG images via file convention · `b70711a`
- 005 — Real PNG apple-touch-icon · `285adc5`
- 006 — IndexNow key, CCBot unblock, honest llms.txt · `669d95c`
- 007 — Intro splash shortened + audit-tool skip · `8cbf37b`
- 008 — Retarget 8 high-ROI tools · `e97a97d`
- 009 — Retarget remaining 9 mis-targeted tools · `3902376`
- 010 — `@id`-linked schema entity graph · `415810e`
- 011 — Tool content scaffolding · `055a161`
- **fix** — redact-pdf broken backend + false claims · `2b8c4f3`
- **fix** — organize-pdf/edit-pdf broken backend + false claims · `7ba9fc2`
- **fix** — site-wide false privacy claim, batch 1 (UI/meta/legal) · `723100d`
- **fix** — site-wide false privacy claim, batch 2 (dropzone/OG/robots/llms.txt) · `cee542d`
- 012–017 (content depth, 27/30 tools) + **fix** batch 3 (final sweep) · `96cab93`

## Up next

- 018 — `/convert-pdf` cluster hub — Phase 4

## Decisions log (append-only)

<!-- Date — decision — one-line why. Never delete entries. -->
- 2026-07-26 — Canonical host stays `www.docshift.tech` — apex already 308-redirects to www and every canonical/OG/sitemap URL uses www; flipping it now would churn every URL for no gain. Note: `SEO_AUDIT_REPORT.md` claims the opposite (www→apex); that doc is stale and should be corrected, not followed.
- 2026-07-26 — No paid SEO APIs configured (no DataForSEO / Moz / GSC / GA4). All keyword and backlink numbers are free-source estimates and must be labelled as such. Never fabricate metrics.
- 2026-07-26 — No fabricated ratings/reviews. `aggregateRating` schema is off the table until real user ratings exist — fake review markup risks a manual action.
- 2026-07-26 — **Q1 answered (task 021): comparison pages use the architecture axis only.** iLovePDF and Smallpdf may be named, but the sole permitted claim about them is server-side upload vs in-browser processing. No pricing, limits, watermarks, retention or feature tables — there is no verified source for any of it.
- 2026-07-26 — URL shape for 021 is `/alternatives/[slug]` with exactly two hand-written slugs (`ilovepdf`, `smallpdf`). Orchestrator's call. More pages under option (a) would be near-duplicate thin content.
- 2026-07-26 — **No LICENSE file is being added.** `llms.txt` wording softens from "Open source" to "source code is public on GitHub" and the link repoints from the profile to `github.com/soumyachk101/PDF_Master`. Owner's decision; revisit if awesome-selfhosted/awesome-privacy listings become a priority, as both require a licence.
- 2026-07-26 — **CCBot gets unblocked** in `robots.ts`, reversing the earlier decision recorded in that file's comment. Two independent audits converged: the Common Crawl zero is why no free backlink tool can see the site, and CCBot costs nothing for a discovery-first project.
- 2026-07-26 — Execution cadence: pause after each phase for review. Tasks auto-continue *within* a phase.

## Deferred with reasons (do not re-litigate without new information)

- `favicon.ico` — SVG favicon is accepted by every current browser and by Googlebot.
- `SearchAction`/sitelinks searchbox — Google retired the rich result Nov 2024, and wiring `?q=` into `HomePage.jsx` would be a functional UI change for zero SEO value.
- `HowTo` schema — deprecated Sept 2023; the visible `<ol>` steps are already crawlable.
- `Article`/`BlogPosting` schema — requires publish/modified dates that do not honestly exist yet.
- A `/blog` — the three hubs plus comparison pages close every gap the audit named. Add one when there is a second thing to publish.
- IndexNow auto-ping on build — would fire on every preview deploy and burn quota. Manual `npm run indexnow` only.

## Phase 2 notes

- All 17 audit-flagged mis-targeted tools are now retargeted (8 in task 008 + 9 in task 009). Every new
  `seoTitle` ≤52 chars, every `seoDesc` in the 8/9 touched 120–160 chars, all 30 titles unique, the three
  legacy banned phrases gone file-wide. `pdf-to-word` deliberately deviated from its suggested "scanned
  PDF" phrasing — verified in `backend/src/services/pdf.service.js:399` that conversion uses Python
  `pdf2docx` with no OCR step, so that claim would have been false. Retargeted to "without uploading"
  instead, matching its siblings.
- Schema entity graph (task 010) collapses `Organization` from 3 inlined copies per tool page to 1
  canonical node referenced by `@id`. New `frontend/src/utils/schema.js` is the shared source of truth —
  task 023 (About/Contact schema) and task 021 (comparison pages) should import `ORG_ID`/`SITE_ID` from
  it rather than re-inlining.
- Adversarial review of the full Phase 2 diff (`git diff 8cbf37b..415810e`) ran clean — confirmed the
  reviewer actually executed the diff (cited real line numbers/quotes) rather than rubber-stamping.

## Phase 3 notes

- **This phase's actual work turned out to be much bigger than its original scope.** What started as
  "add content depth to 30 tools" surfaced the FOUNDATIONAL false-privacy-claim finding above (the
  site's core "100% browser-based" promise is false) plus 2 more broken-placeholder tools
  (`remove-pages`/`extract-pages` lack a page-picker UI). Both are documented in full above rather than
  repeated here.
- 27 of 30 tools now carry ≥400 words of unique, verified copy (15,409 total words, up from 4,350 at the
  start of this phase). The 3 exceptions (`organize-pdf`, `edit-pdf`, `redact-pdf`) are deliberately
  paused pending their backend fixes, not an oversight.
- Every `seoTitle`/`seoDesc`/`seoKeywords` field this phase touched had its "without uploading"/"in your
  browser" framing (from tasks 008/009) replaced with the verified "deleted from our server right after
  processing" narrative. This was necessary work, not scope creep — the old framing is what task
  008/009 built the site's entire keyword strategy around, and it turned out to be false.
- `pdf-to-excel` declares `outputExt: '.xlsx'` but the real server response is CSV — a functional-field
  inconsistency, not a content one. Doesn't break the actual download (the frontend trusts real response
  headers over this config value), so left as a minor follow-up rather than expanded into this phase.

## Needs a human — cannot be verified in this environment

The Chrome extension is not connected, so no browser-based check was possible. These are the acceptance
criteria that were written but not executed. Each is low-probability, but none is *verified*:

- **Task 002** — `/tool/sign-pdf`: type a name and confirm the four signature previews render in four
  visibly distinct cursive faces. (Verified indirectly: all four families served with distinct woff2 files.)
- **Task 005** — the 180×180 apple-touch-icon has not been seen on a real iOS home screen. Dimensions,
  format and markup are verified; legibility of the wordmark at that size is not.
- **Task 007** — three of four criteria: splash gone within 700ms of hydration (measured), reload does not
  re-show it, and `navigator.webdriver` forced true renders nothing. (Verified indirectly: every constant
  and both guards are present in the shipped bundle.)
- **Task 006** — the IndexNow ping has never been sent. Run `npm run indexnow` **after** deploying, once
  the key file is live at `https://www.docshift.tech/f4ebcfecf43c89c997f6109b9c2f5184.txt`.
- Re-run PageSpeed Insights after deploy to confirm the splash is gone from the filmstrip.

## Owner actions outside the codebase

- **Three GitHub repos are wasting free DR-96 links.** `PDF_Master`, `PDF_Master_Backend`,
  `PDF_Master_Frontend` all have no description, no topics, and a `homepage` field pointing at a stale
  `*.vercel.app` URL instead of `docshift.tech`. Fixable only in GitHub's UI.
- **Verify indexing in GSC URL Inspection.** The backlink audit could not check Google directly (anti-bot
  interstitial); every other free source showed the site as invisible. This is the one real gap in that data.
- Directory submissions (OpenAlternative, SaaSHub, Fazier, Uneed, TinyLaunch, BetaList, Show HN, Product
  Hunt, `awesome-privacy` PR) — verified-live URLs are in `.thekedar/AUDIT_FINDINGS.md` §F. Manual work.

## Known issues / follow-ups

- ~~`layout.jsx` OG image size lie~~ — **fixed, task 004**.
- ~~`apple-touch-icon` pointing at an SVG~~ — **fixed, task 005**. `favicon.ico` deliberately deferred.
- `app/sitemap.ts` hardcodes `lastModified` to 2026-06-22 — stale vs content edited in July 2026.
  **Still open.** Task 011 introduces a per-tool `updated` field for the sitemap to read from, so this is
  deliberately deferred to Phase 3 rather than patched with another hardcoded date.
- **The PDF signature does not match its preview.** `backend/src/services/pdf.service.js:602` maps
  `font-dancing` → `HelveticaOblique` and `font-alex` → `TimesRomanItalic`, so picking "Elegant Cursive"
  produces oblique Helvetica in the signed PDF. Found while tracing task 002; out of scope there (tool
  functionality, explicitly fenced off). Real UX defect, deserves its own task.
- **Two tools sit 1 character under the 120-char seoDesc floor**, pre-existing, found during task 008's
  verification: `pdf-to-excel` (119 chars) and `crop-pdf` (119 chars). Both are outside every Phase 2
  task's scope. Both already belong to a Phase 3 cluster task (`pdf-to-excel` → 015 convertFrom cluster,
  `crop-pdf` → 016 edit cluster) — trivial to absorb there, not worth a standalone task.
- Six tool titles exceed 52 characters but were never flagged by the audit as mis-targeted, so Phase 2
  left them alone: `extract-pages` (56), `pdf-to-pptx` (59), `rotate-pdf` (56), `add-watermark` (53),
  `unlock-pdf` (55), `translate-pdf` (58). Not urgent — only the audit's 17-tool list was in scope.
- No `/blog`, `/guides`, or comparison routes exist. `SEO_OFFPAGE_PLAYBOOK.md` Phases 2–3 are written but never built — these are the assets that make links acquirable.
- Site-wide `WebSite` schema is bare (name + url only); no `SearchAction`, no `publisher`.
- Four overlapping SEO docs at root and in `frontend/` (`SEO_AUDIT_REPORT.md`, `SEO_OFFPAGE_PLAYBOOK.md`, `frontend/SEO_IMPROVEMENTS_PLAN.md`, `frontend/seo-report.md`) — at least one contains a stale claim. Consolidate at the end.
