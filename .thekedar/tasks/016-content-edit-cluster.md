# Task 016 — Content depth: Edit cluster (5 tools)

**Status:** DONE (see notes)
**Depends on:** 009, 011
**Risk:** low
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

`rotate-pdf`, `page-numbers`, `add-watermark`, `crop-pdf` and `edit-pdf` each carry ≥ 400 words of
unique, citable copy, and the filler FAQs on `add-watermark` are replaced. Four of these five
(`rotate-pdf` 125, `page-numbers` 128, `add-watermark` 129) are in the audit's thinnest-ten list.

## In scope

For each of the 5 tools in `frontend/src/utils/tools.js`:

- Expand `seoArticle` to 250–320 words, 2–3 `<p>` blocks, **first sentence link-free and self-contained**.
- Add `steps`: 4–6 tool-specific steps verified against `ToolPage.jsx` (rotation angle and per-page vs
  all-pages, number position/start-value options, watermark text/opacity/position controls, crop margins).
- Bring `faqs` to 4–5 entries each. **Replace the filler FAQs on `add-watermark`** (audit section B)
  with real-intent questions: removing a watermark later, watermarking every page vs one, opacity for
  print, whether a watermark is security (it is not — point at `redact-pdf`/`protect-pdf`).
- Set `updated` to the real edit date.

Per-tool angles:
- `rotate-pdf` — permanent rotation vs a viewer's temporary rotate; fixing sideways scans
- `page-numbers` — position, starting number, skipping a cover page; why renumbering after deleting pages
- `add-watermark` — draft/confidential marking, and the honest caveat that a watermark is cosmetic, not protection
- `crop-pdf` — trimming scanner margins, uniform crop across pages, what happens to content outside the box
- `edit-pdf` — the task-008 target: **free PDF editor, no watermark, no sign up**; state plainly what
  the editor can and cannot do

## NOT in scope (the fence — do not cross)

- Do NOT touch the other 25 tools.
- Do NOT change `seoTitle`, `seoDesc` or `seoKeywords` — tasks 008/009 settled those.
- Do NOT change `slug`, `name`, `shortDesc`, `desc`, or any functional field.
- **Do NOT oversell `edit-pdf`.** Read its branch in `ToolPage.jsx` first. If it annotates rather than
  reflows native PDF text, the copy must say so. Promising full text editing that the tool does not do
  is both a fabrication and a bounce-rate problem.
- Do NOT describe `add-watermark` as a security or copy-protection feature.
- Do NOT invent supported font lists, DPI values, maximum page counts, or positioning presets.
- Do NOT add ratings, reviews, testimonials, or `aggregateRating`.
- Do NOT modify `ToolSEOContent.jsx`, `ToolPage.jsx`, or any component. Data only.

## Acceptance criteria

- [ ] `node frontend/scripts/content-audit.mjs` reports all 5 of these tools at ≥ 400 words
- [ ] No `seoArticle` among the 5 has an `<a` tag before its first `.`
- [ ] No 6-word sequence repeats verbatim between any two of the 5 tools' `seoArticle` values
- [ ] `add-watermark` has 4–5 FAQs, none of which is one of its current entries, and its copy contains no claim that a watermark protects or secures a document
- [ ] `npm run build` succeeds and `/tool/edit-pdf` server HTML contains "no watermark" and "no sign up" (or exact inflections) in natural prose

## Notes

`edit-pdf` is the one page in this cluster where the honest description is also the better-ranking one:
"edit pdf online free" is unwinnable, while "free pdf editor no watermark no sign up" is both winnable
and exactly what the tool truthfully is.

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
