# Task 012 — Content depth: Organize cluster (6 tools)

**Status:** TODO
**Depends on:** 009, 011
**Risk:** low
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

The six Organize tools each carry ≥ 400 words of unique, citable copy: `merge-pdf`, `split-pdf`,
`remove-pages`, `extract-pages`, `organize-pdf`, `scan-to-pdf`. Today they average ~130 words.

## In scope

For each of the 6 tools in `frontend/src/utils/tools.js`:

- Expand `seoArticle` to 250–320 words across 2–3 `<p>` blocks. **The first sentence must be a
  self-contained direct answer with no `<a>` tag in it** — cross-links move to later paragraphs.
- Add `steps`: 4–6 genuinely tool-specific steps (mention the real controls: page-range syntax for
  split/extract, drag-to-reorder thumbnails for organize, the multi-file drop order for merge).
  Verify each step against what `frontend/src/views/ToolPage.jsx` actually does before writing it.
- Bring `faqs` to 4–5 entries per tool. Keep the existing good ones.
- Set `updated` to the real date you make the edit.

Per-tool angles the audit supports:
- `merge-pdf` — page-order control, what happens to bookmarks/form fields, why no upload matters for contracts
- `split-pdf` — range syntax, split-by-range vs split-every-page, the ZIP output
- `remove-pages` — the remove vs extract vs split distinction (already partly written; expand it)
- `extract-pages` — original stays intact; sharing one chapter/section
- `organize-pdf` — visual reorder, rotate-in-place, works on touch/mobile
- `scan-to-pdf` — no app install needed, EXIF orientation, receipts/whiteboards/multi-page archives

## NOT in scope (the fence — do not cross)

- Do NOT touch the other 24 tools. Only the 6 named above.
- Do NOT change `seoTitle`, `seoDesc` or `seoKeywords` — tasks 008/009 settled those. If a title now
  contradicts the article, change the *article*.
- Do NOT change `slug`, `name`, `shortDesc`, `desc`, or any functional field.
- Do NOT invent statistics, benchmarks, compression ratios, page limits, user counts, "trusted by"
  claims, awards, or performance numbers. If you cannot verify it in this repo, do not write it.
- Do NOT add ratings, reviews, testimonials, or `aggregateRating` markup.
- Do NOT claim a capability the tool does not have — read the tool's branch in `ToolPage.jsx` first.
- Do NOT modify `ToolSEOContent.jsx`, `ToolPage.jsx`, or any component. Data only.
- Do NOT pad to hit the word count with restated sentences; the n-gram criterion below catches it.

## Acceptance criteria

- [ ] `node frontend/scripts/content-audit.mjs` reports all 6 of these tools at ≥ 400 words
- [ ] No `seoArticle` among the 6 has an `<a` tag before its first `.` (link-free opening answer)
- [ ] No 6-word sequence repeats verbatim between any two of the 6 tools' `seoArticle` values
- [ ] Each of the 6 has ≥ 4 `faqs` entries and a `steps` array of 4–6 entries
- [ ] `npm run build` succeeds and `/tool/scan-to-pdf` renders the new steps, article and FAQs in the server HTML (`curl` with JS disabled)

## Notes

The link-free opening sentence is the GEO fix: when an AI engine lifts the first passage, a dangling
`<a href="/tool/...">` reference breaks self-containment and the passage stops being citable.
`merge-pdf` already got a smoke-test `steps` array in task 011 — replace it with the real one.
