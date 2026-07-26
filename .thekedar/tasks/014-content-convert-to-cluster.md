# Task 014 — Content depth: Convert-to-PDF cluster (5 tools)

**Status:** DONE (see notes)
**Depends on:** 009, 011
**Risk:** low
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

`jpg-to-pdf`, `word-to-pdf`, `pptx-to-pdf`, `excel-to-pdf` and `html-to-pdf` each carry ≥ 400 words of
unique, citable copy, and the filler FAQs on `html-to-pdf` are replaced with questions people actually ask.

## In scope

For each of the 5 tools in `frontend/src/utils/tools.js`:

- Expand `seoArticle` to 250–320 words, 2–3 `<p>` blocks, **first sentence link-free and self-contained**.
- Add `steps`: 4–6 tool-specific steps verified against `ToolPage.jsx` (note `html-to-pdf` takes a URL,
  not a file — `urlInput: true`, `minFiles: 0`; its steps must not say "drag and drop your file").
- Bring `faqs` to 4–5 entries each. **Replace the filler FAQs on `html-to-pdf`** (audit section B) with
  questions matching real intent: paywalled/login-gated pages, lazy-loaded images, long scrolling pages,
  print stylesheets.
- Set `updated` to the real edit date.

Per-tool angles:
- `jpg-to-pdf` — combining many images into one PDF without uploading; margins/orientation; original resolution kept
- `word-to-pdf` — no upload of the document; what carries over (fonts, spacing, layout) and what may not
- `pptx-to-pdf` — presentation stays private; one slide per page; viewing without Office installed
- `excel-to-pdf` — the financial-privacy angle from task 008: invoices, payroll, statements never leaving the device
- `html-to-pdf` — the audit's thinnest SERP; public URLs only, what a capture can and cannot include

## NOT in scope (the fence — do not cross)

- Do NOT touch the other 25 tools.
- Do NOT change `seoTitle`, `seoDesc` or `seoKeywords` — tasks 008/009 settled those.
- Do NOT change `slug`, `name`, `shortDesc`, `desc`, or any functional field.
- Do NOT claim `html-to-pdf` can capture pages behind a login, paywall, or a private network — check
  the actual implementation and describe only what it does.
- Do NOT state that any conversion is "pixel perfect" or "100% accurate" unless that is demonstrably
  true; describe fidelity honestly.
- Do NOT invent statistics, file-size limits, conversion speeds, or supported-format counts beyond what
  the tool's `accept` map actually declares.
- Do NOT add ratings, reviews, testimonials, or `aggregateRating`.
- Do NOT modify `ToolSEOContent.jsx`, `ToolPage.jsx`, or any component. Data only.

## Acceptance criteria

- [ ] `node frontend/scripts/content-audit.mjs` reports all 5 of these tools at ≥ 400 words
- [ ] No `seoArticle` among the 5 has an `<a` tag before its first `.`
- [ ] No 6-word sequence repeats verbatim between any two of the 5 tools' `seoArticle` values
- [ ] `html-to-pdf` has 4–5 FAQs, none of which is one of its current two
- [ ] `npm run build` succeeds and `/tool/html-to-pdf` server HTML shows the new steps referencing a URL input, not a file drop

## Notes

These 5 plus the 5 in task 015 are the 10 conversion tools the audit found with only one inbound
internal link each. The `/convert-pdf` hub (task 018) fixes the link structure; this task fixes the
pages it will link to. Order matters — write the content before building the hub around it.

## Execution note (added post-hoc, honest record of what actually happened)

This task's content was drafted by a multi-agent Workflow (6 clusters in parallel), not applied
task-by-task in the usual one-commit-per-task pattern. Some drafting agents wrote directly to
`tools.js` during the workflow run rather than returning JSON for the orchestrator to apply — an
instruction gap, not intended. The orchestrator discovered this, verified no corruption resulted, then:
(1) applied whichever clusters had NOT been auto-written, (2) corrected locked `seoTitle`/`seoDesc`/
`seoKeywords` fields left stale by the ones that had, and (3) folded in adversarial-verify findings
before finalizing. One tool in this cluster may be excluded if it was found to be a broken backend
placeholder mid-investigation (see `.thekedar/PROJECT_STATE.md`'s FOUNDATIONAL/CRITICAL sections).

Full record: `.thekedar/changes/fix-site-wide-false-privacy-claim-batch1.md`, `batch2.md`, and
`batch3-and-phase3-content.md`. No separate per-task changelog was written for this task number
specifically — the batch changelogs are the authoritative record, organized by what changed rather than
by original task number, since the two didn't stay 1:1 once the site-wide false-claim investigation
took over the same work session.
