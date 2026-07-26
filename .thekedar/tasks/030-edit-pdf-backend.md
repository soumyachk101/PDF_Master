# Task 030 — Backend: minimal real annotation engine for edit-pdf

**Status:** DONE (see notes)
**Depends on:** none
**Risk:** medium
**Estimated size:** M
**Stack tags:** express, node, pdf-lib

## Objective

`edit-pdf` is aliased to `pdfController.watermarkPdf` (`pdf.routes.js:57`, `// MVP: Use watermark as
placeholder`) — clicking it stamps a watermark, nothing else. `hasCanvas: true` is set in `tools.js` but
no annotation implementation exists anywhere (confirmed: zero matches for `edit`/`annotate` in
`pdf.controller.js`, zero matches for edit-specific UI in `ToolPage.jsx` beyond the config flag itself).

## Q2 — v1 scope (BLOCKING, needs a yes/no or an amendment before this task starts)

"Edit PDF" is undefined enough to balloon into an unscoped full editor if nobody draws a line. **This
plan's proposed v1, matching the tool's own existing (honest, already-shipped) description — "Make simple
additions to a PDF document online" — is: text boxes and freehand pen strokes only.** Explicitly **not**
in v1: image insertion, shapes (rectangles/arrows/highlighter), form-field editing, or any
existing-content editing (moving/deleting what's already on the page — this tool only *adds*, matching
"additions" in its own copy). This keeps the task to roughly the same shape as `redact-pdf`'s region-list
contract (a list of typed annotations with page + position), buildable with `pdf-lib` alone (`drawText`
for text, `drawLine` per stroke segment for pen strokes — no new dependency, no Python subprocess). If
this scope is wrong — e.g. image insertion is actually the priority, or shapes matter more than freehand —
say so; this task's In-scope section below is written for the text+freehand default and would need real
edits for a different answer, not just a green light.

## In scope (once Q2 is confirmed or amended)

- `backend/src/routes/pdf.routes.js:57`: point `/edit-pdf` at a new `pdfController.editPdf`; delete the
  `// MVP: Use watermark as placeholder` comment.
- New `pdfController.editPdf`: validate `req.file`, parse an `annotations` field from `req.body` (JSON
  string: array of either `{ type: 'text', page, x, y, text, size, color }` or
  `{ type: 'draw', page, points: [{x,y}, ...], color, width }`, all coordinates in PDF point space,
  bottom-left origin, y-up — per task 025's coordinate note; **not** PyMuPDF's convention, this path stays
  pure `pdf-lib`, which is bottom-left/y-up throughout this codebase, confirmed by every existing
  `drawText` call). 400 on invalid/missing JSON. Call the service function, clean up, respond
  `application/pdf`, filename `"edited.pdf"`.
- New `pdfService.editPdf(filePath, annotations)`: load the doc once, embed one
  `StandardFonts.Helvetica` (mirroring `watermarkPdf`'s font-embedding pattern), iterate annotations. For
  `text` entries: `page.drawText(...)`, the same call shape `watermarkPdf`/`signPdf` already use. For
  `draw` entries: convert the `points` array into a sequence of `page.drawLine({ start, end, thickness,
  color })` calls between consecutive points — the simplest, least coordinate-ambiguous option (plain
  page-space points, no SVG-path coordinate-system translation to get wrong). Save and return the buffer.

## NOT in scope (the fence — do not cross)

- Do NOT implement image insertion, shape tools, a highlighter, or any editing of pre-existing page
  content in this task — see Q2. If the user wants these, that's a new, re-scoped task, not scope creep
  into this one.
- Do NOT use `page.drawSvgPath` for strokes unless `drawLine` is proven insufficient — SVG-path coordinate
  conventions in `pdf-lib` need separate verification against a rendered sample; `drawLine` avoids that
  ambiguity entirely and is the recommended default.
- Do NOT touch `watermarkPdf`/`add-watermark` itself — that tool keeps using it unchanged via its own
  route (`pdf.routes.js:55`).
- Do NOT rewrite `tools.js` copy for `edit-pdf`.

## Acceptance criteria

- [ ] `grep -n "MVP: Use watermark as placeholder" backend/src/routes/pdf.routes.js` returns nothing.
- [ ] Posting a test PDF with one `text` annotation returns a PDF with that exact text visible at roughly
  the specified position on the specified page.
- [ ] Posting a test PDF with one `draw` annotation (a multi-point stroke) returns a PDF showing a
  connected line following those points, not a single dot or a misplaced/mirrored line (confirms the
  bottom-left/y-up coordinate handling is correct, not flipped).
- [ ] `add-watermark` (the real tool) is unaffected — still stamps a watermark as before.

## Notes

Backend-only task; only `backend_repo` needs a subtree push (see task 024's Notes for the mechanics).

## Execution note

Built and verified 2026-07-27. Full change record, verification detail (including the redaction text-extraction test and the empirically-confirmed PyMuPDF coordinate system): see `.thekedar/changes/task-024-to-031-phase5.md`.
