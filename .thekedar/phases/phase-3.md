# Phase 3 — Content depth & de-boilerplating

**Status:** planned
**Tasks:** 011–017

## Goal

Every tool page carries ≥ 400 words of genuinely unique copy, and the ~200 words of byte-identical
boilerplate that currently make up 56% of each page drop to ≤ 60. Task 011 builds the mechanism and
the measuring script; 012–017 author the copy one category cluster at a time.

## Task list

- [ ] 011 — tool-content-scaffolding — per-tool `steps` + `updated`, shrink the shared "Why" block, add the word-count script
- [ ] 012 — content-organize-cluster — 6 tools: merge, split, remove-pages, extract-pages, organize, scan-to-pdf
- [ ] 013 — content-optimize-intelligence-cluster — 5 tools: compress, repair, ocr, compare, translate
- [ ] 014 — content-convert-to-cluster — 5 tools: jpg, word, pptx, excel, html → PDF
- [ ] 015 — content-convert-from-cluster — 5 tools: pdf-to-jpg, -word, -pptx, -excel, -pdfa
- [ ] 016 — content-edit-cluster — 5 tools: rotate, page-numbers, add-watermark, crop, edit-pdf
- [ ] 017 — content-security-cluster — 4 tools: unlock, protect, sign, redact

## Exit criteria

- [ ] `node scripts/content-audit.mjs` reports all 30 tools at ≥ 400 words
- [ ] Shared boilerplate on a tool page is ≤ 60 words (was ~200)
- [ ] No `seoArticle` opens with a sentence containing an `<a>` tag (passage citability)
- [ ] All 7 tasks DONE

## Notes

- Depends on Phase 2: titles/keywords must be settled before articles are written around them.
- Every content task inherits the same hard fence: no invented statistics, benchmarks, user counts,
  ratings, testimonials or credentials; no claims about features the tool does not have.
- Cross-links move OUT of the opening answer sentence and into later paragraphs or the existing
  Related Tools component — an AI engine lifting the first passage must get something self-contained.
- Filler FAQs the audit named for replacement: `html-to-pdf` (014), `pdf-to-pptx` and `pdf-to-excel`
  (015), `add-watermark` (016), `sign-pdf` (017).
