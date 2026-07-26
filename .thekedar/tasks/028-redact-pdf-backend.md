# Task 028 — Backend: real content-removing redaction engine

**Status:** DONE (see notes)
**Depends on:** none
**Risk:** high
**Estimated size:** M
**Stack tags:** express, node, python, pdf-lib

## Objective

`redact-pdf` is aliased to `pdfController.protectPdf` (`pdf.routes.js:64`), which 400s immediately
(requires a `password` the frontend never sends) — every real use fails today. Replace it with a real
engine that **removes** the underlying text/image content in marked regions, not just draws a box over
it. A box drawn on top of an untouched content stream is exactly the false claim this project already had
to walk back once in copy form (`PROJECT_STATE.md` FOUNDATIONAL/CRITICAL sections) — shipping that same
gap in code, silently, would be worse: it would *look* fixed while still leaking the "redacted" data to
anyone who copy-pastes or text-extracts the output.

## Q1 — technical approach (BLOCKING, needs an answer before this task starts)

Two real options, both grounded in what's actually available in this repo's Docker image
(`backend/Dockerfile`: Node 20 + Python3/pip + Ghostscript/qpdf/LibreOffice/Tesseract/Chromium already
provisioned):

**Option A — PyMuPDF (`pymupdf`), true content-stream redaction. This plan's recommended default, if the
licensing is acceptable.**
Python already runs a real subprocess pipeline in this exact codebase today (`pdfToWord` →
`pdf.service.js:399-471`: writes a Python script to a temp file, execs it with `PYTHONPATH` pointing at
the pip `--target .python_deps` directory the Dockerfile installs into, reads the output file back).
Adding `pymupdf` to `backend/requirements.txt` is a one-line change using that identical, already-proven
deployment mechanism. PyMuPDF's `page.add_redact_annot(rect, fill=(0,0,0))` +
`page.apply_redactions()` is a purpose-built API that removes the covered text/image objects from the
content stream and draws the fill — the real thing, not an overlay; this is the same category of
mechanism commercial redaction tools use. Possible bonus: PyMuPDF's page coordinate convention is
reportedly top-left-origin (matching screen/canvas coordinates), which may avoid the bottom-left-origin
flip described in task 025's Notes — **verify this against the installed version's own docs before
relying on it**, this plan does not have live doc access to confirm it with certainty.
**The catch: PyMuPDF is dual-licensed AGPL-3.0 or a paid Artifex commercial license.** This project has
already made one licensing-adjacent call explicitly ("No LICENSE file is being added" — decisions log,
2026-07-26); whether AGPL's network-copyleft terms are acceptable for a hosted backend dependency is a
business call, not an engineering one, and this plan does not make it unilaterally.

**Option B — rasterize only the affected pages, zero new dependencies.**
For any page with ≥1 redaction region: render that page to a high-res PNG (`pdf-to-png-converter`,
already installed, same call convention as `ocrPdf`/task 025 but at a much higher `viewportScale`, e.g.
2.5–3, since this becomes the page's actual final content), composite solid black rectangles over the
marked regions with `sharp` (already installed) at the corresponding scaled pixel coordinates, then
rebuild the PDF: touched pages become an embedded flattened image (`pdfDoc.embedPng` + `page.drawImage`,
the same pattern `jpgToPdf` already uses), untouched pages are `copyPages`'d straight from the original
(the same pattern `mergePdfs` already uses), so only pages that actually needed redacting lose
text-selectability. This **guarantees** no residual selectable text or vector data survives on a redacted
page — the whole page becomes pixels — at the cost of that page (not the whole document) no longer being
searchable/copyable. Uses only dependencies already in `backend/package.json`.

**Absent a different answer, this plan defaults to Option A**, since it's a strictly better user outcome
(only the marked region loses fidelity, not the whole page) and reuses an already-proven deployment
pattern — *if* the AGPL dependency is acceptable. If not, Option B is a fully real, honest fix, just with
a bigger (page-level, not region-level) fidelity cost. **Do not start building until this is answered** —
the two options produce a different service-function implementation, a different `requirements.txt` entry
(or none at all), and a different verification method.

## In scope (applies to either option once Q1 is answered)

- `backend/src/routes/pdf.routes.js:64`: point `/redact-pdf` at a new `pdfController.redactPdf`; delete
  the `// MVP: Use protect as placeholder` comment.
- New `pdfController.redactPdf`: validate `req.file`, parse a `regions` field from `req.body` (JSON
  string: array of `{ page (1-based), x, y, width, height }` in PDF point space — agree on and document
  the exact origin/axis convention in code where it's produced (task 029) and consumed (here), per task
  025's coordinate note). 400 on invalid/missing JSON rather than throwing an unhandled error. Call the
  service function, clean up, respond `application/pdf`, filename `"redacted.pdf"`.
- New `pdfService.redactPdf(filePath, regions)` implementing whichever option Q1 selects.
- If Option A: add `pymupdf` to `backend/requirements.txt` (pin an explicit version, don't leave it
  unpinned, matching the existing `pdf2docx>=0.5.8` style); write the redaction Python script as an
  **inline temp-file string exactly like `pdfToWord` already does** (`pdf.service.js:399-440`) — do
  **not** add a new static checked-in `.py` file under `backend/` root. (`backend/pdf2docx_converter.py`
  already exists at that exact path and is **dead code** — nothing in `src/` references it, and the
  Dockerfile's `COPY src ./src` never copies anything outside `src/` into the image, so a root-level
  script silently wouldn't exist in production. If a static file is preferred for readability over an
  inline template string, it must live under `backend/src/` and be referenced via
  `path.join(__dirname, ...)`.) Pass the regions via a temp JSON file path as a CLI arg, not inline in the
  shell command string, to avoid quoting/escaping issues with `exec`.

## NOT in scope (the fence — do not cross)

- Do NOT draw an opaque rectangle over the page as the *only* mechanism, under either option — that is
  the exact false claim this task exists to eliminate. A visual box with the original content stream (or
  original pixels) still intact underneath is not acceptable output, full stop.
- Do NOT build any frontend UI in this task — task 029 depends on this one.
- Do NOT touch `protectPdf` itself — `protect-pdf` (the real, separate tool) keeps using it unchanged.
- Do NOT rewrite `tools.js` copy for `redact-pdf` in this task. Its existing copy was already softened to
  honest, hedged language when the tool was found broken (commit `2b8c4f3`); once this ships, that copy
  may be safe to *strengthen* again, but that is a follow-up content task's call, not this one's.
- Do NOT attempt OCR'd/scanned-image-specific redaction as a separate code path. If a region is marked on
  a page that's already an image (no extractable text), Option A's `apply_redactions` still blacks out
  that image region (it operates on rendered/rasterized content too, not just glyph objects) — verify
  this behavior rather than assume it; don't build a second pipeline for it.

## Acceptance criteria

- [ ] `grep -n "MVP: Use protect as placeholder" backend/src/routes/pdf.routes.js` returns nothing.
- [ ] **The real test**: build a test PDF with known, distinctive text inside a marked region (e.g. a
  unique string like `"REDACTME12345"`). After redaction, run a text extractor (`pdf-parse`, already a
  dependency, or `pdftotext`) against the **output** file and confirm the string does **not** appear
  anywhere in the extracted text. This is the criterion that actually matters — a visual black box that
  passes with the underlying string still extractable is a failing task, regardless of how it looks.
- [ ] The redacted region is visibly black/opaque when the output PDF is viewed normally.
- [ ] Content **outside** marked regions is unchanged on both touched and untouched pages (spot-check: an
  untouched page's text is still extractable; under Option B specifically, untouched pages remain
  searchable).
- [ ] `protect-pdf` (the real tool) is unaffected — still requires and uses a password as before.

## Notes

**High risk, deliberately.** This is the one place in this whole phase where a subtly-wrong
implementation looks *more* trustworthy than the honestly-broken 400 it replaces — a user who sees a
black box and downloads the file has every reason to believe the sensitive content is gone. Verify with
the actual text-extraction test above, not a visual check alone, before calling this done.

Backend-only task; only `backend_repo` needs a subtree push (see task 024's Notes for the mechanics). If
Option A is chosen, locally verify with `pip3 install pymupdf` if not already present on the dev machine —
the Dockerfile's `pip3 install --target .python_deps` step only runs inside the container build, so a
fresh local environment needs its own install to test the script before trusting a deploy-and-pray
verification.

## Execution note

Built and verified 2026-07-27. Full change record, verification detail (including the redaction text-extraction test and the empirically-confirmed PyMuPDF coordinate system): see `.thekedar/changes/task-024-to-031-phase5.md`.
