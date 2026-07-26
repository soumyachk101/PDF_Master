# Task 009 — Retarget the remaining 9 mis-targeted tools

**Status:** DONE
**Depends on:** 008
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

The remaining nine tools from the audit's mis-targeting table get winnable target phrases, completing
the keyword realignment for all 17 affected tools. Metadata fields only.

## In scope

`frontend/src/utils/tools.js`, these 9 tools:

| slug | currently targets | new target phrase |
|---|---|---|
| `split-pdf` | "split pdf online free" (head) | split pdf without uploading files |
| `remove-pages` | "delete pdf pages online" | delete pdf pages without uploading + the remove-vs-extract distinction |
| `organize-pdf` | generic "reorder" | reorder pdf pages without uploading |
| `jpg-to-pdf` | generic, no privacy angle | combine jpg images into one pdf without uploading |
| `word-to-pdf` | vague "secure" | convert word to pdf without uploading document |
| `pptx-to-pdf` | vague "secure" | convert powerpoint to pdf without uploading presentation |
| `pdf-to-jpg` | generic (a rival owns the plain no-upload phrasing) | convert pdf to jpg without uploading, high resolution |
| `pdf-to-word` | hardest head term on the site | convert **scanned** pdf to editable word document free |
| `sign-pdf` | generic, no privacy angle | sign pdf without uploading document |

For each: rewrite `seoTitle`, `seoDesc`, `seoKeywords`. Adjust the first `seoArticle` sentence only if
it now contradicts the title.

## NOT in scope (the fence — do not cross)

- Do NOT change `slug`, `name`, `shortDesc`, `desc`, or any functional field (`accept`, `outputExt`,
  `multiple`, `minFiles`, `urlInput`, `outputMime`, `hasThumbnails`, `category`, `icon`, `color`).
- Do NOT re-touch the 8 tools done in task 008.
- Do NOT expand `seoArticle` length or edit `faqs` — Phase 3 owns that.
- Do NOT claim `pdf-to-word` produces a perfect OCR'd DOCX unless `ToolPage.jsx` actually does that.
  Verify the behaviour before writing "scanned" into the title; if the tool cannot handle scans, flag
  it in the task report and target the non-scanned long-tail instead.
- Do NOT invent keyword volumes, difficulty or competitor rank data — no keyword API is configured.
- Do NOT add new fields to the `TOOLS` objects.

## Acceptance criteria

- [ ] All 9 `seoTitle` values are ≤ 52 characters; all 30 across the file remain unique
- [ ] All 30 `seoDesc` values are 120–160 characters
- [ ] Each of the 9 target phrases appears verbatim (or as an exact inflection) in that tool's `seoTitle` or `seoDesc`
- [ ] The literal strings `"split pdf online free"`, `"delete pdf pages online"` and `"edit pdf online free"` no longer appear anywhere in `tools.js`
- [ ] `npm run build` succeeds and built `/tool/split-pdf` HTML shows the new title and description

## Notes

Nine of these hinge on the same differentiator — "without uploading". That is deliberate: it is the
one thing the site can truthfully claim that upload-based rivals cannot. The titles must still read as
nine distinct pages, not nine templates; the uniqueness criterion is the guard against that.
