# PROJECT_STATE

> Single source of truth for this project's Thekedar workflow.
> Contract: a fresh session must be able to resume correctly from this file alone.
> Updated by the orchestrator after every task. Keep it terse.

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
unverifiable. See the dedicated commit for this fix, separate from task 008's and 017's changelogs.

## Project overview

DocShift — 30 free browser-based PDF tools (files never leave the browser). Next.js 15.3 App Router in `frontend/`, Express backend in `backend/`, live at https://www.docshift.tech (canonical host = www).
Current goal: take SEO from "good on-page" to top-notch — per-tool keyword targeting, structural content gaps, schema, GEO/AI-search, and the assets that make backlinks acquirable.

## Current phase

Phase 2 — Keyword realignment & schema · **review** (all 3 tasks committed, reviewed clean; paused for user checkpoint per agreed cadence)

## Phases

<!-- Phase N — name · tasks NNN–NNN · planned | building | done -->
- Phase 0 — Audit & plan · no task files · **done** (6 specialist audits → `.thekedar/AUDIT_FINDINGS.md`, 23 tasks planned)
- Phase 1 — Technical correctness · tasks 001–007 · **done**
- Phase 2 — Keyword realignment & schema · tasks 008–010 · **done, pending user checkpoint**
- Phase 3 — Content depth · tasks 011–017 · planned
- Phase 4 — Hubs, comparison, link assets · tasks 018–023 · planned

## Active task

none — Phase 2 closed, waiting on user go-ahead for Phase 3

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

## Up next

- 011 — Tool content scaffolding (per-tool `steps` + `updated` fields, word-count script) — Phase 3

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
