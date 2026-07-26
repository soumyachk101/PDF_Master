# Task 011 — Content scaffolding: per-tool steps, real dates, boilerplate shrink, word-count script

**Status:** DONE
**Depends on:** 010
**Risk:** medium
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

Build the mechanism the six content tasks need, and cut the shared boilerplate in one move.
`ToolSEOContent` renders per-tool how-to steps and a real "last updated" date when the data provides
them, the identical "Why use DocShift?" block shrinks from ~140 words to a single short paragraph, and
a runnable script reports each tool's unique word count so tasks 012–017 have an objective target.

## In scope

- `frontend/src/views/ToolSEOContent.jsx`:
  - render `tool.steps` (array of HTML strings) as the `<ol>` when present; fall back to the current
    generic 4-step list when absent, so nothing breaks before 012–017 land
  - replace the three-paragraph "Why use DocShift?" block with **one** short paragraph (≤ 45 words)
    carrying the same three claims (local processing, speed, no install) in compressed form
  - render `Last updated: <formatted tool.updated>` under the article, **only** when `tool.updated` is set
- `frontend/src/utils/tools.js`: add optional `steps` and `updated` (ISO `YYYY-MM-DD` string) to
  **`merge-pdf` only**, as a working smoke test. No other tool gets content here.
- `frontend/app/sitemap.ts`: per-tool `lastModified` = `tool.updated` when present, else a single
  build-time constant; drop the hardcoded `new Date('2026-06-22')`.
- New `frontend/scripts/content-audit.mjs`: no dependencies, imports `TOOLS`, strips HTML, and prints
  a per-tool table of unique word count (`seoArticle` + `steps` + `faqs`) plus a total, exiting
  non-zero if any tool is below a `--min` threshold (default 400).

## NOT in scope (the fence — do not cross)

- Do NOT author `steps`, expanded articles, dates or FAQs for any tool other than `merge-pdf`. The
  other 29 belong to tasks 012–017 and doing them here makes the diff unreviewable.
- Do NOT set an `updated` date on a tool whose copy has not actually been edited. A date that does not
  correspond to a real edit is fabrication. Omit the field instead — the renderer already handles absent.
- Do NOT remove the FAQ section, the Related Tools grid, or the `seoArticle` fallback paragraph.
- Do NOT change any CSS class, colour, heading level or layout in `ToolSEOContent.jsx` beyond what the
  shrink requires — this is a content change, not a redesign.
- Do NOT touch `frontend/src/views/ToolPage.jsx` (the tool UI above the fold).
- Do NOT restructure the `TOOLS` array — two optional fields added, nothing renamed or removed.
- Do NOT change `changeFrequency` or `priority` values in `sitemap.ts`.
- Do NOT install an npm package for the script or for HTML stripping — a regex over `<[^>]*>` is enough.

## Acceptance criteria

- [ ] `node frontend/scripts/content-audit.mjs` runs with zero dependencies and prints all 30 tools with a word count; today it exits non-zero because all 30 are under 400
- [ ] `npm run build` succeeds; built `/tool/merge-pdf` shows the custom `steps` and a `Last updated:` line
- [ ] Built `/tool/split-pdf` (no `steps`, no `updated`) still shows a 4-step how-to list and shows **no** `Last updated:` line
- [ ] The text shared byte-identically across `/tool/merge-pdf` and `/tool/split-pdf` (excluding nav, footer and the Related Tools grid) is ≤ 60 words — verify by diffing the two rendered pages
- [ ] `sitemap.xml` on a running build shows `/tool/merge-pdf` with a `lastmod` matching its `updated` value, and no URL still carries `2026-06-22`

## Notes

The word-count script is shared infrastructure for six downstream tasks — that is the only reason it
exists. Keep it to one file and under ~60 lines; it is a ruler, not a linter.
