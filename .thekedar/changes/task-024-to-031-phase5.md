# Change record — Phase 5: real fixes for redact-pdf, organize-pdf, edit-pdf, remove/extract-pages

**Date:** 2026-07-27 · **Tasks:** 024, 025, 026, 027, 028, 029, 030, 031

## What happened

Phase 5 replaced four tools' placeholder backends with real implementations, and fixed two tools'
missing input UI. All four were previously documented in `PROJECT_STATE.md`'s CRITICAL section as
broken (aliased to an unrelated function) or non-functional (missing UI wiring). Two tasks (028, 030)
carried blocking questions; both were answered by the user before implementation started:

- **Q1 (task 028, redact-pdf):** PyMuPDF via Python subprocess, Option A. AGPL-3.0 licensing accepted.
- **Q2 (tasks 030/031, edit-pdf):** text boxes + freehand pen only, as proposed — no image insertion,
  shapes, or existing-content editing in this v1.

## What was built

### Backend (`backend/src/`)

- **`services/pdf.service.js`**:
  - `parsePageRanges(rangeString, totalPages)` — new shared helper extracted from `extractPdf`'s existing
    range-parsing logic. `extractPdf` and `removePages` both now call it, so both accept identical
    `"2-3, 5, 7-10"` syntax. Previously `removePages` only accepted comma-separated single integers with
    no range support — typing `"3-7"` silently removed nothing.
  - `getThumbnails(filePath)` — renders up to `MAX_THUMBNAIL_PAGES` (200) low-res page previews via
    `pdf-to-png-converter` (same call convention as `ocrPdf`, `viewportScale: 0.5`), returns
    `{ pageCount, pages: [{ index, width, height, thumbnail }] }`. `width`/`height` are each page's real
    point size (`page.getSize()`), needed downstream for pixel→point coordinate conversion. Throws with
    `.status = 400` for a corrupted/0-page PDF (verified: does not 500 or hang).
  - `organizePdf(filePath, order)` — real reorder/delete engine. `order` is a comma-separated, 1-indexed
    list of page numbers in the desired final sequence (not a range string — order matters and ranges
    can't express `"3, then 1, then 2"`). Verbatim order preserved, not sorted/deduped, minus out-of-range
    values. Throws with `.status = 400` if the result is zero valid pages.
  - `redactPdf(filePath, regions)` — real content-stream redaction via a PyMuPDF Python subprocess
    (`page.add_redact_annot()` + `page.apply_redactions()`), following the exact deployment pattern
    already proven by `pdfToWord` (inline temp-file Python script, `PYTHONPATH` pointing at the
    Dockerfile's `.python_deps`, regions passed via a temp JSON file path — not inline in the shell
    command — to avoid `exec()` quoting issues). Throws with `.status = 400` for an empty regions array.
  - `editPdf(filePath, annotations)` — pure `pdf-lib`, no new dependency. `text` annotations via
    `page.drawText`; `draw` (freehand) annotations via a `page.drawLine` call per consecutive point pair
    (avoids `drawSvgPath`'s unverified coordinate convention entirely, per the task's own guidance). Added
    a small `parseHexColor()` helper so the annotation contract's `color` field (`'#rrggbb'`) actually
    takes effect — the first draft ignored it and hardcoded black.
- **`controllers/pdf.controller.js`**: new `getThumbnails`, `organizePdf`, `redactPdf`, `editPdf`
  controllers, all following the existing file's shape (validate `req.file`, clean up the temp file,
  respond with the right `Content-Type`/filename). `redactPdf`/`editPdf` each `JSON.parse` their body
  field in a try/catch, returning 400 on malformed JSON rather than throwing unhandled. All four new
  controllers check `error.status` (set by the service layer for user-input errors) and respond with that
  code instead of falling through to the global error handler's 500 default — a small, explicit
  convention added for this phase; existing controllers are unchanged and untouched.
- **`routes/pdf.routes.js`**: new `POST /thumbnails` route; `/organize-pdf`, `/redact-pdf`, `/edit-pdf`
  repointed from their placeholder aliases to the new controllers; all three `// MVP: ... as placeholder`
  comments removed. `/rotate-pdf`, `/add-watermark`, `/protect-pdf` (the real, separate tools that used to
  be aliased *to*) are untouched and still work identically.
- **`requirements.txt`**: added `pymupdf==1.28.0`, pinned (matching the existing `pdf2docx>=0.5.8` style).

### Frontend (`frontend/src/`)

- **`hooks/useThumbnails.js`** (new) — shared by all three page-picker-backed tools. Same cold-start
  retry pattern as `useFileUpload` (502/503/504 → retry after 8s/25s). `loading`/`pages`/`pageCount` are
  all derived from comparing a `fetchedForFile` state value against the current `file`, not set directly —
  see the lint note below for why.
- **`components/tool-panels/`** (new directory):
  - `OrganizePagesPanel.jsx` — drag-to-reorder via `framer-motion`'s `Reorder.Group`/`Reorder.Item`
    (already a project dependency; no new drag-and-drop package added), delete button per page.
  - `RedactRegionsPanel.jsx` — drag-a-rectangle region marking over rendered thumbnails (plain
    absolutely-positioned `<div>` overlay, no canvas needed for axis-aligned rectangles).
  - `EditAnnotationsPanel.jsx` — Text/Pen toolbar, 4-color swatch set, undo/clear-all. Text via
    click-to-place inline input; pen via `<canvas>` freehand strokes, points sampled at a minimum 4px
    on-screen distance (not per-`pointermove`-event, to avoid needless payload/segment bloat).
- **`views/ToolPage.jsx`**: two new state-backed text inputs for `remove-pages`/`extract-pages` (mirrors
  `split-pdf`'s existing range-input block exactly); three new conditional blocks rendering the panels
  above for `organize-pdf`/`redact-pdf`/`edit-pdf`; `handleSubmit` validation for all five tools (blocks
  with a clear on-page message if pages/regions/annotations are empty, mirroring `crop-pdf`'s and
  `sign-pdf`'s existing validation pattern); `resetAll` clears all five tools' new state.

## The coordinate system finding (read before touching either drawing panel again)

Task 025's notes flagged that every pdf-lib call in this codebase uses a bottom-left-origin, y-up page
space, and that task 028 should *verify, not assume* PyMuPDF's own convention before relying on it.
Verified empirically: built a tiny script in an isolated local venv that filled a rect at
`Rect(0,0,width,50)` and rendered it — the fill appeared at the **top** of the image, not the bottom, and
a redaction test confirmed the same (marking `y=0..40` removed text placed near the top of the page, not
the bottom). **PyMuPDF's page coordinate space is top-left origin, y-down** — the same orientation as
on-screen pixels, and the *opposite* of pdf-lib's bottom-left/y-up space.

Practical consequence, already reflected in the code: `RedactRegionsPanel.jsx`'s pixel→PDF-point
conversion is a straight scale (`x * scale`, `y * scale`) with **no** Y-flip, while
`EditAnnotationsPanel.jsx`'s conversion (feeding `pdf-lib`-based `edit-pdf`) **does** flip
(`pdfPointHeight - y * scale`). This is correct, not an inconsistency — the two backends have genuinely
opposite conventions. Anyone touching either panel's coordinate math should re-read this before assuming
the other panel's sign is a copy-paste template.

## Verification

- **Backend, direct function calls**: a standalone Node script (scratchpad only, not committed) called
  every new/changed service export with real PDFs built via `pdf-lib` — not mocks. All passed, including:
  - `extractPdf("2-3")`/`removePages("2-3")` — verified real content presence/absence per page, not just
    page counts (removePages("2-3") on a 4-page doc keeps pages 1 and 4, actually removes 2 and 3).
  - `getThumbnails` — pageCount/thumbnail-count/dimensions all correct; corrupted-PDF input throws with
    `.status === 400`.
  - `organizePdf("3,1,2")` — verified actual page *content* ends up in that exact order (not just a page
    count match), by re-extracting each output page individually and checking its distinguishing text.
  - **`redactPdf` — the test that actually matters**: built a PDF with a unique string
    (`"REDACTME12345"`) inside a marked region, redacted it, then extracted text from the *output* via
    Ghostscript's `txtwrite` device — an extractor completely independent of PyMuPDF — and confirmed the
    string does not appear anywhere, while unrelated text elsewhere on the page survives. A visual black
    box with the string still extractable would have been a failing implementation regardless of how it
    looked; this is the criterion the task specifically called out as the one that matters.
  - `editPdf` — text annotation appears in extracted output text; empty-annotations input rejected.
  - Discovered mid-verification and unrelated to this phase: this repo's bundled `pdf-parse` cannot read
    plain `pdf-lib`-generated output at all (`FormatError: Unknown compression method`) — `pdf.service.js`'s
    own `extractPdfText` already falls back to Ghostscript for exactly this reason; the same fallback was
    used for this phase's own test verification once identified.
- **Backend, real HTTP**: started the backend locally and hit every new/changed endpoint with `curl` and
  real multipart bodies (the exact shape the frontend sends) — `/thumbnails`, `/organize-pdf`,
  `/redact-pdf`, `/edit-pdf`, `/remove-pages`, `/extract-pages` — all 200 with correct content, all error
  paths (missing input, empty regions/annotations/order, malformed JSON, corrupted PDF) a clean 4xx, not a
  500 or a hang. Confirmed `rotate-pdf`/`add-watermark` (the real, separate tools `organize-pdf`/`edit-pdf`
  used to be aliased to) still work identically and were not touched.
- **Frontend**: `npm run build` — compiled clean, all 79 pages, after fixing several build-*breaking*
  (not just warning-level) lint violations from this project's `react-hooks/set-state-in-effect` and
  `react-hooks/refs` rules — see the process note below.
- **Local environment gaps found and closed during verification** (unrelated to any code change): this
  Mac had neither Ghostscript nor qpdf installed, meaning several pre-existing tools could never have been
  locally tested before this phase either. Installed both via Homebrew.
- **Not verified**: the actual browser interaction (dragging a reorder handle, dragging out a redaction
  rectangle, drawing a freehand pen stroke, placing a text box by click) — no Chrome extension was
  connected this session. Logged in `PROJECT_STATE.md`'s "Needs a human" section.

## Process notes for future sessions

- **This build enforces `react-hooks/set-state-in-effect` and `react-hooks/refs` as compile errors, not
  warnings.** Two real fixes were needed, not lint-suppression:
  - Never call `setState` synchronously in an effect body (including in an early-return guard clause) —
    compute the "nothing yet" case directly during render instead, or (when local editable state needs to
    reset when a prop changes) use React's documented "adjust state during render" pattern: compare the
    new value against a `useState`-tracked previous value, and call `setState` conditionally in the render
    body itself, not in an effect. `setState` calls are fine inside an async `.then()/.catch()` — the rule
    is specifically about the effect's synchronous execution path.
  - Never read a ref's `.current` directly in the JSX render body (e.g. to show a live drag-preview
    rectangle) — anything read during render must be `useState`, even when a ref "works" at runtime.
  See `useThumbnails.js` and `RedactRegionsPanel.jsx` for the corrected patterns if a future component
  needs the same shape.
- `pkill -f "next start"` does not match the actual running process (`next-server`, not `next start`) —
  this bit Phase 4 and is already documented in `PROJECT_STATE.md`'s Phase 4 notes; not re-hit this phase
  only because it was already known.

## What was deliberately NOT changed

- `tools.js` copy for any of these 5 tools — still the honest, hedged pre-fix language from Phase 3.
  Strengthening it to describe real capability is a follow-up content task, kept separate on purpose.
- `hasThumbnails`/`hasCanvas` flags in `tools.js` — left as-is; the new panels gate on `tool.slug` directly
  like every other tool-specific block in `ToolPage.jsx` already does, not on these flags.
- `rotatePdf`, `watermarkPdf`, `protectPdf` themselves — untouched; only the routes that used to alias
  `organize-pdf`/`edit-pdf`/`redact-pdf` to them changed.
- Per-page rotation in `organize-pdf`, image insertion/shapes in `edit-pdf`, text-selection-based redaction
  in `redact-pdf` — all explicitly out of scope per each task's fence; re-scope as new tasks if wanted.

## Deploy

Both subtrees pushed after this batch — see `.thekedar/PROJECT_STATE.md`'s Done list for the commit hash
and push confirmation. Render (backend) and Vercel (frontend) both deploy from the split repos
(`PDF_Master_Backend`, `PDF_Master_Frontend`), not from this monorepo directly.
