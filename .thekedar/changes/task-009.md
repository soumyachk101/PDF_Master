# Change record — Task 009: Retarget the remaining 9 mis-targeted tools

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3

## What changed

Nine tools' `seoTitle` / `seoDesc` / `seoKeywords` retargeted, completing keyword realignment for all
17 tools the audit flagged as mis-targeted:

| slug | new target |
|---|---|
| `split-pdf` | split pdf without uploading files |
| `remove-pages` | delete pdf pages without uploading, + the remove-vs-extract distinction |
| `organize-pdf` | reorder pdf pages without uploading |
| `jpg-to-pdf` | combine jpg images into one pdf without uploading |
| `word-to-pdf` | convert word to pdf without uploading document |
| `pptx-to-pdf` | convert powerpoint to pdf without uploading presentation |
| `pdf-to-jpg` | convert pdf to jpg without uploading, high resolution |
| `pdf-to-word` | **deviated from the task's suggested phrase — see Why** |
| `sign-pdf` | sign pdf without uploading document |

The literal strings `"split pdf online free"`, `"delete pdf pages online"` and `"edit pdf online free"`
no longer appear anywhere in `tools.js` (whole-file scan, not just the touched fields).

## What was deliberately NOT changed

- `slug`, `name`, `shortDesc`, `desc`, and every functional field on all 9 tools.
- The 8 tools from task 008 — not re-touched.
- `seoArticle` and `faqs` on all 9 — read every article's opening sentence and none contradicted its
  new title, so per the fence the "adjust only if it contradicts" clause was never triggered. Notably
  `remove-pages`'s article already contains the remove-vs-extract distinction verbatim
  ("Unlike 'split' ... or 'extract' ... remove-pages surgically deletes...") — the new title surfaces
  something the copy already said, rather than requiring new copy.
- No keyword volume, difficulty, or competitor-rank data invented — none is available.
- No new fields added to the `TOOLS` objects.

## Why

**`pdf-to-word` deviates from the task's suggested phrase, per the fence's own instruction.** The task
proposed "convert scanned pdf to editable word document free," but required verifying the tool can
actually do that before shipping the claim. Checked two independent sources before writing anything:

1. `pdf-to-word`'s own (pre-existing, untouched) FAQ already says: *"Scanned pages are images. Run them
   through OCR PDF first to make the text selectable, then convert to Word."* — an admission that scans
   are not handled directly.
2. `backend/src/services/pdf.service.js:399` (`exports.pdfToWord`) confirmed this in the actual
   implementation: conversion shells out to Python's `pdf2docx`, a layout/text extractor with no OCR
   step. It cannot produce a real DOCX from a scanned, image-only PDF.

Shipping "scanned" in the title would have been a false claim about tool capability — the exact failure
mode the audit's cross-cutting constraint (never fabricate) exists to prevent. Retargeted to "convert pdf
to word without uploading document" instead: true, verifiable in this repo, and consistent with the
"without uploading" differentiator the other 8 tools in this task already use.

## Files touched

- `frontend/src/utils/tools.js` — 9 tools, 3 fields each (27 lines changed)

## Verification

- Structural check (`scratchpad/verify-seo-copy.cjs`, extended with a whole-file banned-string scan):
  - AC1, all 9 titles ≤ 52 chars: **PASS** — 46, 46, 47, 47, 48, 49, 49, 51, 51
  - AC2 desc range for these 9: **PASS** — 135, 136, 137, 137, 138, 138, 143, 144, 154 (all 120–160)
  - AC2 uniqueness across all 30 titles: **PASS** — 30 checked, 30 unique
  - AC3 target phrase present in title or desc: **PASS** for all 9
  - AC4 banned strings: **PASS** — `grep -ci` for all three literal strings across the whole file
    returns 0, confirmed on both the source and (spot-checked on split-pdf, remove-pages, edit-pdf)
    the built HTML
  - AC5 build + built `/tool/split-pdf` HTML: **PASS** — compiled, 73/73 pages;
    `<title>Split PDF Without Uploading Files | Free &amp; Fast | DocShift</title>` and matching
    `<meta name="description">` present
- drift-check: **no drift** — `frontend/src/utils/tools.js` only.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

**The two pending desc-range violations from task 008's changelog resolved as predicted.** `pdf-to-jpg`
(was 118) is now 137; `pdf-to-word` (was 119) is now 136 — both fixed as a side effect of the retarget,
not by a separate pass. `pdf-to-excel` (119) and `crop-pdf` (119) remain out of range and remain out of
scope for both Phase 2 tasks — unchanged status from task 008's changelog, still logged as a Phase 3
follow-up.

## Follow-ups

- All 17 audit-flagged tools are now retargeted (8 + 9). Remaining title-length outliers in the file
  (`extract-pages` 56, `pdf-to-pptx` 59, `rotate-pdf` 56, `add-watermark` 53, `unlock-pdf` 55,
  `translate-pdf` 58) were never flagged by the audit as mis-targeted and are outside both 008 and 009's
  scope — noted for awareness, not an open item from this task.
- Same pdf.service.js finding as task 002's PDF-signature-font mismatch: reading backend code before
  writing frontend copy caught a real gap between what the UI implies and what the service does. Worth
  keeping as a standing habit for the remaining content tasks (012–017).
