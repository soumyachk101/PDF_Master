# Change record — Standalone fix: organize-pdf and edit-pdf false claims

**Date:** 2026-07-26 · **Commit:** `7ba9fc2` · **Not part of task 012, 016, or any Phase 3 task**

## What happened

Continuing the investigation that surfaced `redact-pdf`'s placeholder alias, reading the complete
`backend/src/routes/pdf.routes.js` (rather than one route at a time) found two more tools wired to
unrelated placeholder functions via the identical `// MVP: ... as placeholder` comment pattern:

- **`organize-pdf` → `pdfController.rotatePdf`** (`pdf.routes.js:22`). The frontend sends no
  reorder/delete payload for this tool (confirmed: no `organize-pdf` entry anywhere in `ToolPage.jsx`'s
  `additionalData` construction), so the call always resolves to `rotatePdf(filePath, undefined)` →
  `parseInt(undefined) || 90` → **a blind 90° rotation of the entire document, every time**. Not merely
  incomplete — actively wrong regardless of what the user did in the UI.
- **`edit-pdf` → `pdfController.watermarkPdf`** (`pdf.routes.js:57`). No freehand-drawing, shape, or
  text-editing implementation exists anywhere in the codebase. Clicking "Edit PDF" stamps a watermark.

Presented both to the user alongside a related-but-different finding (`translate-pdf` works but is
mis-described — separate changelog). Decision: same treatment as `redact-pdf` — pause content-depth work
for both tools, correct the already-shipped false claims now.

## What changed

`frontend/src/utils/tools.js`:

- **`organize-pdf`**: `shortDesc`, `desc`, `seoTitle`, `seoDesc`, `seoKeywords`, `seoArticle`, both
  `faqs` — every field claiming drag-and-drop reorder, per-page rotation, or page deletion. Replaced
  with honest copy describing page-layout adjustment in general terms, and the article/FAQs now
  **redirect to the tools that actually do these things reliably** — `rotate-pdf` for rotation,
  `remove-pages` for deletion. `updated: '2026-07-26'` set.
- **`edit-pdf`**: same fields, same treatment. The false "add text, images, shapes, or freehand
  annotations" claim (present in `shortDesc`, `desc`, `seoTitle`, `seoDesc`, `seoArticle`, and all 3
  `faqs`) is gone. New copy describes "simple additions" without asserting specific unavailable
  capabilities, and redirects to `add-watermark`, `page-numbers`, `sign-pdf` for anything specific.
  `updated: '2026-07-26'` set.
- **Cross-link corrections in five other tools' `seoArticle` values**, found by grepping for every
  internal link pointing at these tools: `remove-pages` and `crop-pdf` both linked to `organize-pdf`
  with the anchor text "reorder…" — changed to "adjust the page layout" / "adjust the newly cropped
  pages". `pdf-to-word`, `pdf-to-pptx`, `page-numbers`, and `translate-pdf` all linked to `edit-pdf` with
  anchor text claiming annotation/drawing capability ("PDF annotation tool", "add annotations to
  slides", "draw more highlights or text", "PDF text annotator") — all changed to neutral phrasing
  ("PDF editor", "make simple edits", "make further additions"). Otherwise these five tools' content is
  untouched.
- Two more `redact-pdf` cross-links, missed by the first fix because they live in *other* tools'
  articles rather than `redact-pdf`'s own: `excel-to-pdf` said "permanently hide sensitive financial
  data" and another tool's article said "permanently blackout text… entirely" — both had "permanently"
  removed, matching the standalone `redact-pdf` fix's reasoning.

## What was deliberately NOT changed

- No functional/routing field on any of the seven touched tools (`slug`, `icon`, `category`, `color`,
  `accept`, `multiple`, `minFiles`, `urlInput`, `outputExt`, `outputMime`, `hasThumbnails`/`hasCanvas`).
- The actual bugs — `pdf.routes.js`, `ToolPage.jsx` — untouched. Real engineering work, the user's call
  on timing, same as `redact-pdf`.
- Neither tool was hidden, disabled, or removed from navigation/sitemap/`TOOLS`.
- `compare-pdf`'s cross-link to `redact-pdf` ("blackout any discrepancies") was **left alone** — it never
  said "permanently" and doesn't assert forensic-level removal, so it isn't one of the false claims.
- A sixth `edit-pdf` cross-link, in `compare-pdf`'s article ("Edit PDF (which modifies a single file)"),
  was **left alone** — "modifies a single file" is still true (watermarking does modify the file); it
  doesn't claim a false capability the way "annotation tool" or "draw highlights" does.
- `steps` left unset on both tools — generic fallback list applies, no invented tool-specific steps for
  features whose content-depth work is paused.

## Why

The cross-link sweep matters as much as the primary fix. A false claim removed from a tool's own page
but still repeated as confident anchor text on five *other* pages is only half-fixed — a user (or a
crawler) reaches the same wrong belief via a different route. Grepping every tool's `seoArticle` for
links pointing at the corrected tools, rather than trusting that fixing the source page was sufficient,
is what caught these seven additional instances.

## Verification

- Combined regex sweep for every specific false phrase identified across both fixes
  (`gone for good|content stream|text-select mode|irrevocably strips|only safe redaction
  method|permanently.{0,3}(redact|blackout|hide sensitive|remove)|reorder pdf pages|freehand
  annotations|PDF annotation tool|PDF text annotator|draw more highlights`): **1 match**, manually
  inspected — `remove-pages`'s own `desc`, "Select and permanently remove specific pages from your PDF
  document." A false positive: `remove-pages` has a genuine, dedicated implementation
  (`pdf.service.js:944`, `exports.removePages`, using `pdf-lib`'s page removal — confirmed real, not
  aliased), and "permanently remove a page" is a trivially true claim for a working deletion feature,
  unrelated to the forensic-recoverability meaning "permanently" carried in the `redact-pdf` claims.
  Left unchanged, correctly.
- `npm run build`: **PASS** — compiled, 73/73 pages.
- `node scripts/content-audit.mjs`: `organize-pdf` 116 words, `edit-pdf` 114 words — both still under
  400, correctly, since both tools' content-depth work is paused, not delivered here.
- drift-check: **no drift** — `frontend/src/utils/tools.js` only.

## Follow-ups

- Tasks 012 and 016 ship 5 of 6 and 4 of 5 tools respectively, explicitly skipping `organize-pdf` and
  `edit-pdf`.
- The three broken placeholder tools (`redact-pdf`, `organize-pdf`, `edit-pdf`) all share one root
  cause: an unfinished MVP where several features were stubbed to a same-shaped neighbor function. Worth
  a dedicated engineering pass across the remaining routes this investigation did not exhaustively
  verify (`comparePdf`, `cropPdf`, `addPageNumbers` were checked only for existence, not behavior).
