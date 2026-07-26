# Task 026 — Backend: real organize-pdf (reorder + delete) engine

**Status:** DONE (see notes)
**Depends on:** none
**Risk:** low
**Estimated size:** S
**Stack tags:** express, node, pdf-lib

## Objective

`organize-pdf` is wired to `pdfController.rotatePdf` (`pdf.routes.js:21`, `// MVP: Basic rotate
functionality`) — every real use blind-rotates the whole document 90°, never reorders or deletes a page.
Replace the alias with a real reorder/delete engine. (Frontend UI is task 027, which depends on this.)

## In scope

- `backend/src/routes/pdf.routes.js:21`: point `/organize-pdf` at a new `pdfController.organizePdf`;
  delete the `// MVP: Basic rotate functionality` comment (no longer true).
- New `pdfController.organizePdf` in `pdf.controller.js`, same shape as the neighboring `removePages`/
  `extractPdf` controllers: validate `req.file`, read `order` from `req.body`, call the service function,
  clean up the temp file, respond `application/pdf` with filename `"organized.pdf"`.
- New `pdfService.organizePdf(filePath, order)` in `pdf.service.js`, same shape as `exports.extractPdf`
  (lines 100–129): load the doc, parse `order` — a comma-separated, 1-indexed list of page numbers **in
  the desired final sequence** (not a range string like split/extract/remove use, since order matters and
  ranges can't express "3, then 1, then 2"). Filter to valid `1..totalPages` values using the same
  tolerant filtering `extractPdf`/`removePages` already use. **Do not dedupe or sort** — the given order
  IS the output order, verbatim, minus out-of-range junk. `copyPages(pdfDoc, indices)` + `addPage` each in
  that exact sequence, the same pattern every multi-page-copy function in this file already uses. Throw a
  clear error if `order` is missing or resolves to zero valid pages (mirroring `cropPdf`'s existing
  all-zero-margin error pattern at `pdf.service.js:699-701`) — a submission with nothing to reorganize is
  a user error, not a silent 200 no-op.

## NOT in scope (the fence — do not cross)

- Do NOT build any frontend UI in this task — task 027 depends on this one and handles it.
- Do NOT touch `rotatePdf` itself — `rotate-pdf` (the real, separate tool) still uses it via its own
  route (`pdf.routes.js:53`); only the `organize-pdf` route's target changes.
- Do NOT add per-page rotation support to `organizePdf` in this task. The user-facing ask for
  `organize-pdf` is reorder + delete; rotate-in-place is a plausible future enhancement but adds a second
  parameter and a second UI control — out of scope here, don't bundle it in unasked.
- Do NOT rewrite `tools.js` copy for `organize-pdf` — deferred content work, not this task.

## Acceptance criteria

- [ ] `grep -n "MVP: Basic rotate" backend/src/routes/pdf.routes.js` returns nothing.
- [ ] Posting a 5-page test PDF to `/api/pdf/organize-pdf` with `order=3,1,2` returns a 3-page PDF whose
  pages are original pages 3, 1, 2 in that exact order (verify by rendering or by distinct per-page
  marker content in the test fixture).
- [ ] Omitting `order` (or sending an empty/all-invalid value) returns a clear 4xx/error response, not a
  silently-unchanged or empty-but-200 PDF.
- [ ] `rotate-pdf` (the standalone tool) is unaffected — still rotates 90° by default as before.

## Notes

Mirrors `extractPdf`'s exact copy-pages shape (`pdf.service.js:100-129`) closely enough that it's worth
reading that function first rather than `rotatePdf` (the function this route currently — wrongly —
points at).

Backend-only task; only `backend_repo` needs a subtree push (see task 024's Notes for the mechanics).

## Execution note

Built and verified 2026-07-27. Full change record, verification detail (including the redaction text-extraction test and the empirically-confirmed PyMuPDF coordinate system): see `.thekedar/changes/task-024-to-031-phase5.md`.
