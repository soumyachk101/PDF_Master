# Task 025 — Backend: shared page-thumbnail rendering endpoint

**Status:** DONE (see notes)
**Depends on:** none
**Risk:** low
**Estimated size:** S
**Stack tags:** express, node, pdf-lib

## Objective

`organize-pdf` (tasks 026/027), `redact-pdf` (tasks 028/029) and `edit-pdf` (tasks 030/031) all need to
show the user a visual preview of each page before they can reorder, mark, or annotate anything — and
none of that exists today (`hasThumbnails`/`hasCanvas` are config flags in `tools.js` with zero consumers
anywhere in `ToolPage.jsx`, confirmed by grep). Build ONE shared backend endpoint that renders page
thumbnails, so the three upcoming frontend tasks reuse it instead of three near-identical
implementations.

## In scope

- New route `POST /api/pdf/thumbnails` in `backend/src/routes/pdf.routes.js` (`upload.single('files')`,
  the same multer convention every other single-file route in this file already uses).
- New `pdfController.getThumbnails` in `backend/src/controllers/pdf.controller.js`: validate `req.file`,
  call the service function below, respond `application/json`, clean up the temp file the same way every
  neighboring controller already does.
- New `pdfService.getThumbnails(filePath)` in `backend/src/services/pdf.service.js`:
  - Load via `PDFDocument.load` to read each page's true point-space size via `page.getSize()` (needed
    later for pixel→PDF-point coordinate conversion in tasks 029/031 — return it now so those tasks don't
    need a second endpoint).
  - Render low-res previews via `pdfToPng` from `pdf-to-png-converter` — **reuse the exact call
    convention already proven in this codebase** at `pdf.service.js:172-189` (`ocrPdf`), just with a much
    smaller `viewportScale` (e.g. `0.4`–`0.6`; `ocrPdf` uses `2.0` for OCR quality, thumbnails don't need
    that) and a higher, clearly-named page cap constant (`ocrPdf`'s `MAX_OCR_PAGES = 30` is too low for a
    page-picker; something like 200, named e.g. `MAX_THUMBNAIL_PAGES`).
  - Return JSON: `{ pageCount: <true total>, pages: [{ index (1-based), width, height (PDF points, from
    getSize()), thumbnail: "data:image/png;base64,..." }, ...] }`. `pages` is capped at
    `MAX_THUMBNAIL_PAGES` even when `pageCount` is higher — mark that cap with a `ponytail:`-style code
    comment naming the ceiling (documents beyond it can't use the visual pickers; unaffected: task 024's
    text-range inputs for `remove-pages`/`extract-pages`/`split-pdf` have no such limit).

## NOT in scope (the fence — do not cross)

- Do NOT wire any frontend consumer in this task — that's tasks 027/029/031, which depend on this one.
- Do NOT persist the uploaded file or the generated thumbnails anywhere (no new "session"/token concept,
  no DB, no disk cache). Render, respond, delete — identical lifecycle to every existing route in this
  file. The frontend re-uploads the same original `File` object for the real operation afterward; this
  endpoint is a one-shot preview call, not a stored session.
- Do NOT touch any existing route, controller, or service function.
- Do NOT add a new npm dependency — `pdf-to-png-converter` is already installed and already used in this
  exact codebase for exactly this kind of rendering (`ocrPdf`).

## Acceptance criteria

- [ ] `curl -F files=@test.pdf http://localhost:<port>/api/pdf/thumbnails` returns 200 with JSON matching
  the shape above; `pages.length === min(pageCount, MAX_THUMBNAIL_PAGES)`.
- [ ] Each `thumbnail` value is a valid `data:image/png;base64,...` string that actually decodes to an
  image showing the right page (not blank/corrupt) — check at least one in a browser.
- [ ] Each page's returned `width`/`height` matches that page's real point size (spot-check against
  `PDFDocument.load(...).getPages()[i].getSize()` for a known test file).
- [ ] The temp uploaded file is deleted after the response — no leftover file in `os.tmpdir()`.
- [ ] A 0-page or corrupted-PDF upload returns a clear 4xx JSON error, not a 500 or a hang.

## Notes

**Coordinate conversion note — read this before starting tasks 028–031.** Every existing `pdf-lib` call
in this codebase (`watermarkPdf`, `signPdf`, `rotatePdf`, `cropPdf`) confirms this project's PDF pages use
the standard PDF coordinate system: origin at **bottom-left**, y increases **upward**, units are points
(`watermarkPdf`'s `y = height - textHeight - 30` for a "top" position proves this — it subtracts from
page height to reach the top). Browser/canvas coordinates are the opposite: origin **top-left**, y
increases **downward**, in CSS pixels. Any task that captures a rectangle or a stroke on a rendered
thumbnail **must** convert: `scale = pdfPointWidth / thumbnailPixelWidth` (using this endpoint's returned
`width`), then `pdfX = pixelX * scale`, and — the part that's easy to get backwards —
`pdfY = pdfPointHeight - (pixelY * scale)`, not `pdfY = pixelY * scale`. A missed Y-flip silently marks
the wrong half of the page; verify against a real rendered sample, don't assume it's right.

`hasThumbnails`/`hasCanvas` in `tools.js` are pre-existing dead flags (set on `remove-pages`,
`extract-pages`, `organize-pdf`, `sign-pdf`, `redact-pdf`, `edit-pdf` — none read anywhere in the
codebase today). This task doesn't touch them; the frontend tasks that consume this endpoint gate their
new UI on `tool.slug` directly, matching how every existing tool-specific block in `ToolPage.jsx` already
works.

Backend-only task; only `backend_repo` needs a subtree push (see task 024's Notes for the mechanics).

## Execution note

Built and verified 2026-07-27. Full change record, verification detail (including the redaction text-extraction test and the empirically-confirmed PyMuPDF coordinate system): see `.thekedar/changes/task-024-to-031-phase5.md`.
