# Change record — Batch 3 (final false-claim sweep) + Phase 3 content applied

**Date:** 2026-07-27 · **Commit:** `96cab93` · **Priority fix batch 3, plus tasks 012/013 content-depth, plus corrections to 014-017**

## What happened — an unexpected discovery mid-batch

Reading `frontend/src/utils/tools.js` in full (to plan this batch) revealed that **the Phase 3
content-drafting workflow's agents for the convertTo, convertFrom, edit, and security clusters had
written their drafted `seoArticle`/`steps`/`faqs` directly to `tools.js` during the workflow run** —
bypassing the intended design where agents return structured JSON and the orchestrator applies it after
review. The organize and optimize/intelligence clusters' agents, by contrast, correctly returned JSON
only, exactly as instructed.

Root cause: the workflow's `COMMON_RULES` said "do not modify any component" and "you are drafting values
for tools.js fields," but never explicitly said "return only, do not write to disk." Four of six agents
apparently interpreted that as license to write directly. Verified this was safe rather than corrupted
before proceeding: the file still parses correctly, all 30 tools present, no duplicate slugs, no
duplicated/interleaved content — the four agents' writes did not race or collide with each other.

This changed the shape of this batch: instead of "apply 6 clusters' worth of fresh JSON," it became
"apply 2 clusters that were never written (012, 013), and fix the *metadata* fields (`seoTitle`,
`seoDesc`, `seoKeywords`, `shortDesc`, `desc`) on the 4 clusters whose *content* fields were already
written but whose locked metadata still carried the pre-existing false claims task 008/009 built around."

## What changed

### Applied for the first time (previously only JSON, never written to disk)

- **Task 012 (organize cluster), 5 of its 6 tools** — `merge-pdf` (replacing its task-011 smoke-test
  content), `split-pdf`, `remove-pages`, `extract-pages`, `scan-to-pdf`. `organize-pdf` stays excluded
  (broken placeholder tool, per the earlier decision).
- **Task 013 (optimize/intelligence cluster), all 5 tools** — `compress-pdf`, `repair-pdf`, `ocr-pdf`,
  `compare-pdf`, `translate-pdf` — with the adversarial verify pass's findings folded in before
  applying (see below), not applied blind.

### Metadata corrected on already-written tools (content was fine; title/desc/keywords were not)

`jpg-to-pdf`, `word-to-pdf`, `pptx-to-pdf`, `excel-to-pdf` (task 014); `pdf-to-jpg`, `pdf-to-word`,
`pdf-to-pptx`, `pdf-to-excel`, `pdf-to-pdfa` (task 015); `page-numbers`, `add-watermark`, `edit-pdf`
(task 016); `sign-pdf`, `redact-pdf` (task 017); plus `organize-pdf`'s metadata (missed in the earlier
standalone fix — see Corrections below). `html-to-pdf`'s "without uploading anything" was reviewed and
**kept** — genuinely true for this tool, since it takes a URL, not a file; no upload occurs at all.

### Verify-agent findings incorporated before applying (not applied blind)

- **`compress-pdf`**: removed an unhedged, unsourced claim that Ghostscript's pdfwrite device "re-emits
  vector content losslessly" — softened to the verifiable takeaway (text/vector graphics typically stay
  sharp) without asserting a specific unverified mechanism.
- **`ocr-pdf`**: fixed a mislabeling — "a fixed limit in the engine" wrongly attributed `MAX_OCR_PAGES = 30`
  to Tesseract itself. It's DocShift's own constant (`pdf.service.js:176`); Tesseract has no such limit.
  Reworded to "a limit DocShift applies."
- **`compare-pdf`**: three fixes. (1) The steps described a sequential "drop file 1, then Add More Files
  for file 2" flow that doesn't match the actual dropzone behavior (`DropzoneArea.jsx`'s `onDrop` replaces
  the selection rather than appending) — rewritten to correctly instruct selecting both files together.
  (2) "Redact the sections that changed" implied `redact-pdf` works — it doesn't (broken placeholder) —
  replaced with a `protect-pdf` suggestion instead. (3) Hedged the "report opens with a header giving
  page and line counts" claim, since page count is only present when `pdf-parse` succeeds; the
  Ghostscript-fallback path returns `pages: null`.
- **`pdf-to-jpg`**: removed an invented comparative-quality claim ("PNG holds up better for crisp text...
  WEBP splits the difference") that contradicts the actual pipeline — every format renders through the
  same lossy JPEG pass first, so PNG/WEBP are re-encoded from already-compressed output, not rendered
  fresh. Fixed in both the article and the matching FAQ.
- **`pdf-to-excel`**: the real server response is `Content-Type: text/csv`, `converted-excel.csv`
  (`pdf.controller.js`) — not XLSX. `shortDesc`, `seoTitle`, and `seoKeywords` all claimed "XLSX" three
  times; corrected to generic "spreadsheet" language. `outputExt`/`outputMime` (functional fields) left
  as `.xlsx` deliberately — `useFileUpload.js` reads the real response headers for the actual download,
  so this stale config value doesn't cause a user-facing bug, only an internal inconsistency; fixing it
  is a separate, smaller cleanup, not a content-accuracy fire.
- **`pdf-to-pdfa`**: "Court E-Filing Compliant" and "regulation-compliant archiving" removed from
  `seoTitle`/`desc` — this is exactly the claim `PROJECT_STATE.md`'s FOUNDATIONAL section already flagged
  as unverifiable (bare Ghostscript call, no explicit conformance level, no validation step). The
  article/FAQs were already honest on this point; only the locked title/desc needed fixing.
- **`sign-pdf`**: the verify agent's most serious finding — `ToolPage.jsx`'s live signature-preview panel
  (found one JSX block below the code the drafter itself cited) reads "COMPLIANT ELECTRONIC SEAL...
  generated and stamped client-side using local cryptography" — was already caught and fixed in batch 1
  before this batch ran. This batch additionally fixed the tool's locked `seoTitle`/`seoDesc` ("Sign PDF
  Without Uploading... 100% private in your browser").

### Three more instances found during this batch's own verification sweep, not by any agent

- **`app/tool/[toolSlug]/page.jsx`'s `WebApplication` JSON-LD `featureList`** — machine-readable structured
  data served on all 30 tool pages, read by search engines, claimed `"100% private - files processed in
  browser"` and `"No uploads or server storage"`. Corrected to the verified retention policy.
- **`ToolSEOContent.jsx`'s shared "Why use DocShift?" paragraph** — written by this session in task 011,
  rendered on every tool page — said "processes every file locally in your browser... never leaves your
  device." Also its generic 4-step fallback list (steps 3–4), which still renders today for the 3 paused
  tools (`organize-pdf`, `edit-pdf`, `redact-pdf`, none of which have a custom `steps` array).
- **`ToolPage.jsx`'s "WASM ENGINE DIRECT" status badge** and **`public/manifest.json`'s PWA install
  description** ("...work entirely in your browser... 100% privacy. No uploads required.") — found by a
  final exhaustive `grep` sweep across `frontend/src` and `frontend/app` for the full claim-phrase family,
  run after every previously-known instance was already fixed, specifically to catch what individual
  fixes might have missed.

### A standalone metadata gap in the earlier `organize-pdf`/`edit-pdf`/`redact-pdf` fix

The batch-adjacent standalone fix (commit `7ba9fc2`) corrected those three tools' capability claims but,
written before the full scope of the site-wide claim was understood, left their `seoTitle`/`seoDesc`/
`seoKeywords`/article location-claims ("without uploading," "locally in your browser") untouched. All
three fully corrected in this batch.

### A fourth and fifth tool found to have no working input UI (documented, not fixed here)

While applying task 012's draft, discovered — and independently verified before writing this entry —
that `remove-pages` and `extract-pages` have `hasThumbnails: true` but **no corresponding branch in
`ToolPage.jsx`'s `additionalData` construction**. `remove-pages` silently submits with no `pages` param
(backend does nothing); `extract-pages` always defaults to extracting page 1 only
(`pdf.service.js:122`). Full detail in `PROJECT_STATE.md`. Content for both tools uses soft,
mechanism-agnostic phrasing that doesn't assert a specific (non-existent) UI, so nothing false is
claimed — but neither page currently works as a user would expect. Flagged for a UI fix, not attempted
here (small, plausible fix — wiring an input similar to `split-pdf`'s existing one — but still a
functional change outside this content/copy pass).

## What was deliberately NOT changed

- `crop-pdf`'s `seoDesc` (119 chars, 1 under the 120 floor) — pre-existing condition from before this
  session, already documented in task 008's changelog as out of scope for that task; still out of scope
  here, since this batch's job is removing false claims, not closing a pre-existing length gap.
- `rotate-pdf`, `add-watermark`, `unlock-pdf` `seoTitle` lengths (>52 chars) — pre-existing, unrelated to
  the false-claim family, already logged as a Phase 2 follow-up.
- `pdf-to-jpg`/`pdf-to-word`/`pdf-to-excel`/`pdf-to-pdfa`'s `outputExt`/`outputMime` functional fields —
  the pdf-to-excel CSV/XLSX mismatch is real but doesn't break the actual download (verified:
  `useFileUpload.js` trusts the live response headers over this config), so left alone as a smaller,
  separate cleanup rather than expanding this batch's blast radius into functional config.
- The actual `remove-pages`/`extract-pages` UI gap — content only, no `ToolPage.jsx` wiring added.
- `html-to-pdf`'s "without uploading anything" — reviewed and kept; this tool takes a URL, not a file, so
  the claim is genuinely true, unlike every other instance fixed in this batch.

## Verification

- Structural: file parses via the transform-and-`require` method used throughout this session; 30
  tools, no duplicate slugs, 30 unique `seoTitle` values.
- Length constraints (the task 008/009 convention): all `seoTitle` values this batch touched are ≤52
  chars; all `seoDesc` values this batch touched are 120–160 chars, re-verified and adjusted twice after
  initial edits landed several a few characters short.
- `node scripts/content-audit.mjs`: 27 of 30 tools now report ≥400 words (up from 0 of 30 at the start
  of Phase 3). The 3 under 400 are exactly the 3 paused tools (`organize-pdf` 100w, `edit-pdf` 113w,
  `redact-pdf` 165w) — expected, not a gap. Total unique word count across the site: **15,409**, up from
  task 011's baseline of 4,350.
- Link-free-opening-sentence check (task 012–017's GEO requirement): verified programmatically via the
  parsed `TOOLS` array (not fragile raw-text regex) across all 27 active tools — zero violations.
- Exhaustive `grep` sweep for the full false-claim phrase family across `frontend/src` and `frontend/app`
  (every `.js`/`.jsx`/`.ts`/`.tsx` file, not just `tools.js`): **zero matches** except `html-to-pdf`'s
  verified-true "without uploading anything."
- `npm run build`: **PASS** — compiled, 73/73 static pages.
- Server-rendered spot-check (production build, not dev server) on 5 tool pages plus the homepage: **zero**
  false-claim matches on every page checked.
- drift-check: diff touches exactly `tools.js`, the tool-page schema file, the two shared view components,
  and `manifest.json` — matches what was actually edited.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- **Process note for any future multi-agent content workflow**: explicitly state "return your answer via
  the schema only; do not write to any file" in the common instructions, not just "don't modify
  components." This batch's opening discovery was a direct result of that gap.
- `remove-pages` and `extract-pages` need their page-picker UI actually built — see `PROJECT_STATE.md`.
- `pdf-to-excel`'s `outputExt`/`outputMime` mismatch (declares XLSX, serves CSV) — cosmetic/config
  cleanup, not urgent, not a user-facing bug.
- Phase 3 is now functionally complete for all 27 non-paused tools across all 6 clusters. Remaining
  Phase 3 task-file bookkeeping (marking 012–017 DONE, per-task changelogs matching the original task
  numbering) should follow in the next step, along with the Phase 3 review gate.
