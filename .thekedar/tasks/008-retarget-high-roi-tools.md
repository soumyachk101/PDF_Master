# Task 008 — Retarget the 8 highest-ROI tools

**Status:** TODO
**Depends on:** none
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

The eight tools at the top of the audit's ROI order stop aiming at head terms a zero-authority domain
cannot win and start aiming at the winnable phrase their existing article already earns. Metadata
fields only — `seoTitle`, `seoDesc`, `seoKeywords`.

## In scope

`frontend/src/utils/tools.js`, these 8 tools, in this order (audit section C ROI ranking):

| slug | new target phrase |
|---|---|
| `redact-pdf` | redact pdf **permanently**, not just a black box over the text |
| `repair-pdf` | the verbatim user error string "there was an error opening this document" |
| `html-to-pdf` | webpage/URL to PDF — the audit's one genuinely thin SERP; lean into it |
| `pdf-to-pdfa` | PDF/A for **court e-filing** / long-term archiving compliance |
| `scan-to-pdf` | scan to pdf **without an app** (the rivals here are mobile apps, not web tools) |
| `compare-pdf` | compare two PDFs — thinnest SERP on the site, take the plain phrasing |
| `excel-to-pdf` | convert excel to pdf without uploading **financial data** |
| `edit-pdf` | free pdf editor **no watermark, no sign up** ("edit pdf online free" is unwinnable) |

For each: rewrite `seoTitle`, `seoDesc`, `seoKeywords`. If the first sentence of `seoArticle` now
contradicts the new title, adjust that one sentence — nothing more.

## NOT in scope (the fence — do not cross)

- Do NOT change `slug` — it is the URL, the canonical, the sitemap entry and the internal link target.
- Do NOT change `name`, `shortDesc`, `desc`, `icon`, `category`, `color`, `accept`, `multiple`,
  `minFiles`, `urlInput`, `outputExt`, `outputMime`, `hasThumbnails`, `isNew` — these drive the UI and
  the tool's actual behaviour.
- Do NOT expand `seoArticle` length or add paragraphs — that is Phase 3 (tasks 012–017).
- Do NOT touch the `faqs` arrays.
- Do NOT touch the other 22 tools (the remaining 9 retargets are task 009).
- Do NOT invent search volumes, difficulty scores or traffic estimates in comments or the task report.
  No keyword API is configured; every figure would be fabricated.
- Do NOT restructure the `TOOLS` array shape or add new fields.

## Acceptance criteria

- [ ] All 8 `seoTitle` values are ≤ 52 characters (the layout template appends `" | DocShift"` = 11 more, keeping the rendered title ≤ 63)
- [ ] All 30 `seoTitle` values across the file are still unique, and all 30 `seoDesc` values are 120–160 characters
- [ ] Each of the 8 target phrases from the table above appears verbatim (or as an exact inflection) in that tool's `seoTitle` **or** `seoDesc`
- [ ] `npm run build` succeeds and built `/tool/redact-pdf` HTML contains the new `<title>` and `<meta name="description">`

## Notes

`redact-pdf` and `repair-pdf` are first because the audit found their articles already say the right
thing — the retitle is pure upside at zero content cost. `pdf-to-pdfa`, `html-to-pdf` and `compare-pdf`
are not in the audit's 14-row table but rank high in its ROI ordering, so they ride along here.
