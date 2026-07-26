# Task 013 — Content depth: Optimize + Intelligence clusters (5 tools)

**Status:** TODO
**Depends on:** 009, 011
**Risk:** low
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

`compress-pdf`, `repair-pdf`, `ocr-pdf`, `compare-pdf` and `translate-pdf` each carry ≥ 400 words of
unique, citable copy. `compress-pdf` (131) and `translate-pdf` (121) are among the thinnest pages on
the site today.

## In scope

For each of the 5 tools in `frontend/src/utils/tools.js`:

- Expand `seoArticle` to 250–320 words, 2–3 `<p>` blocks, **first sentence link-free and
  self-contained**, cross-links pushed to later paragraphs.
- Add `steps`: 4–6 tool-specific steps verified against that tool's branch in `ToolPage.jsx`
  (e.g. OCR's language selector and its documented 30-page-per-run limit; translate's target-language picker).
- Bring `faqs` to 4–5 entries each.
- Set `updated` to the real edit date.

Per-tool angles:
- `compress-pdf` — what compression actually touches (images, metadata) vs what it preserves; when to split instead
- `repair-pdf` — build the page around the verbatim error string "There was an error opening this
  document"; xref rebuild, orphaned objects, and the honest limit (heavily truncated files lose pages)
- `ocr-pdf` — image-only vs text PDFs, Latin-script language support, the 30-page-per-run ceiling
- `compare-pdf` — thinnest SERP on the site; describe what a diff between two revisions actually shows
- `translate-pdf` — layout preservation, OCR-first workflow for scans, what "AI-powered" concretely means here

## NOT in scope (the fence — do not cross)

- Do NOT touch the other 25 tools.
- Do NOT change `seoTitle`, `seoDesc` or `seoKeywords` — settled in task 008.
- Do NOT change `slug`, `name`, `shortDesc`, `desc`, or any functional field.
- **Do NOT quote a compression percentage, file-size reduction, OCR accuracy rate, or translation
  quality score.** None of these are measured anywhere in this repo. This is the single highest
  fabrication risk in the whole project — the numbers are tempting and all of them would be invented.
- Do NOT name the OCR or translation engine/model unless it is verifiably identified in the codebase.
- Do NOT add ratings, reviews, testimonials, or `aggregateRating`.
- Do NOT modify `ToolSEOContent.jsx`, `ToolPage.jsx`, or any component. Data only.

## Acceptance criteria

- [ ] `node frontend/scripts/content-audit.mjs` reports all 5 of these tools at ≥ 400 words
- [ ] No `seoArticle` among the 5 has an `<a` tag before its first `.`
- [ ] No 6-word sequence repeats verbatim between any two of the 5 tools' `seoArticle` values
- [ ] `grep -oE '[0-9]+(\.[0-9]+)?%' ` over the 5 tools' copy returns no results (no invented percentages)
- [ ] `npm run build` succeeds and `/tool/repair-pdf` server HTML contains the string "There was an error opening this document"

## Notes

`repair-pdf` is the highest-intent page in this cluster: people paste the literal error message into
search. Getting that exact string on the page in natural prose is most of the value.
