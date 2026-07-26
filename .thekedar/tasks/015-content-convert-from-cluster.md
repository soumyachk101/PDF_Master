# Task 015 — Content depth: Convert-from-PDF cluster (5 tools)

**Status:** DONE (see notes)
**Depends on:** 009, 011
**Risk:** low
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

`pdf-to-jpg`, `pdf-to-word`, `pdf-to-pptx`, `pdf-to-excel` and `pdf-to-pdfa` each carry ≥ 400 words of
unique, citable copy, and the filler FAQs on `pdf-to-pptx` and `pdf-to-excel` are replaced.

## In scope

For each of the 5 tools in `frontend/src/utils/tools.js`:

- Expand `seoArticle` to 250–320 words, 2–3 `<p>` blocks, **first sentence link-free and self-contained**.
- Add `steps`: 4–6 tool-specific steps verified against `ToolPage.jsx` (resolution/DPI choice for
  pdf-to-jpg, the ZIP output where applicable, the PDF/A conformance level for pdf-to-pdfa).
- Bring `faqs` to 4–5 entries each. **Replace the filler FAQs on `pdf-to-pptx` and `pdf-to-excel`**
  (audit section B) with real-intent questions: editable text vs image slides, whether table structure
  survives, what to do when the source PDF is a scan.
- Set `updated` to the real edit date.

Per-tool angles:
- `pdf-to-jpg` — high-resolution export without uploading (task 008/009 target); per-page images, ZIP output
- `pdf-to-word` — the **scanned-PDF-to-editable-DOCX** angle from task 009; the OCR-first workflow via `/tool/ocr-pdf`
- `pdf-to-pptx` — what a converted deck actually gives you and what it does not
- `pdf-to-excel` — table extraction realities; when the source is a scan
- `pdf-to-pdfa` — **court e-filing and long-term archiving compliance** (task 008 target): what PDF/A
  guarantees, embedded fonts, why filing portals require it

## NOT in scope (the fence — do not cross)

- Do NOT touch the other 25 tools.
- Do NOT change `seoTitle`, `seoDesc` or `seoKeywords` — tasks 008/009 settled those.
- Do NOT change `slug`, `name`, `shortDesc`, `desc`, or any functional field.
- **Do NOT name a specific court, jurisdiction, filing system, or regulation as requiring PDF/A** unless
  you can point at the actual published rule. Describe the general archiving/e-filing requirement instead.
- Do NOT claim a PDF/A conformance level (`PDF/A-1b`, `-2b`, `-3b`) that the implementation does not
  actually produce — read the code and state only what it emits.
- Do NOT claim table structure, formulas, or slide animations survive conversion unless they do.
- Do NOT invent accuracy rates, DPI defaults, or format-support counts.
- Do NOT add ratings, reviews, testimonials, or `aggregateRating`.
- Do NOT modify `ToolSEOContent.jsx`, `ToolPage.jsx`, or any component. Data only.

## Acceptance criteria

- [ ] `node frontend/scripts/content-audit.mjs` reports all 5 of these tools at ≥ 400 words
- [ ] No `seoArticle` among the 5 has an `<a` tag before its first `.`
- [ ] No 6-word sequence repeats verbatim between any two of the 5 tools' `seoArticle` values
- [ ] `pdf-to-pptx` and `pdf-to-excel` each have 4–5 FAQs, none of which is one of their current entries
- [ ] `npm run build` succeeds and `/tool/pdf-to-pdfa` server HTML contains archiving/e-filing copy with no named court or regulation

## Notes

`pdf-to-word` is the hardest term on the site as a head phrase and the easiest as a long tail — the
whole page should read as "scanned PDF → editable Word", not as a generic converter. If the tool cannot
handle scanned input without a separate OCR pass, say so plainly and link the OCR tool from a *later*
paragraph.

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
