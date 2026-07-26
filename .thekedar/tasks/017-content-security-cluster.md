# Task 017 — Content depth: Security cluster (4 tools)

**Status:** DONE (see notes)
**Depends on:** 009, 011
**Risk:** medium
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

`unlock-pdf`, `protect-pdf`, `sign-pdf` and `redact-pdf` each carry ≥ 400 words of unique, citable
copy, and the filler FAQs on `sign-pdf` are replaced. `protect-pdf` is the thinnest page on the entire
site (115 words). Risk is medium because these four pages make security claims — every one must be
accurate.

## In scope

For each of the 4 tools in `frontend/src/utils/tools.js`:

- Expand `seoArticle` to 250–320 words, 2–3 `<p>` blocks, **first sentence link-free and self-contained**.
- Add `steps`: 4–6 tool-specific steps verified against `ToolPage.jsx` (password entry and the
  user-vs-owner password distinction, signature style/placement, redaction area selection).
- Bring `faqs` to 4–5 entries each. **Replace the filler FAQs on `sign-pdf`** (audit section B) with
  real-intent questions: legal validity, signing without printing, whether the signature is an image
  or a certificate, signing on mobile.
- Set `updated` to the real edit date.

Per-tool angles:
- `unlock-pdf` — removing a password you legitimately hold; the honest statement that this is not a cracker
- `protect-pdf` — the encryption the tool actually applies; user password vs owner/permissions password
- `sign-pdf` — task-009 target "sign pdf without uploading document"; visible signature vs digital certificate
- `redact-pdf` — task-008 target: **permanent redaction, not a black rectangle you can drag off**; why
  the difference matters and what the tool does to the underlying content

## NOT in scope (the fence — do not cross)

- Do NOT touch the other 26 tools.
- Do NOT change `seoTitle`, `seoDesc` or `seoKeywords` — tasks 008/009 settled those.
- Do NOT change `slug`, `name`, `shortDesc`, `desc`, or any functional field.
- **Do NOT claim `redact-pdf` permanently removes the underlying text unless the implementation
  actually removes it.** Read the code. If it only draws over content, the page must say so — a false
  redaction claim is the most damaging possible inaccuracy on this site.
- **Do NOT claim `sign-pdf` produces a legally binding or digitally certified signature** (eIDAS, ESIGN,
  UETA, PAdES, X.509) unless the implementation genuinely does. A drawn/typed signature image is not a
  digital certificate; say which one it is.
- Do NOT name an encryption standard (AES-256, RC4, 128-bit) for `protect-pdf` that the code does not use.
- Do NOT position `unlock-pdf` as a password cracker or recovery tool for passwords the user lacks.
- Do NOT cite a law, regulation, standard number, or compliance certification.
- Do NOT add ratings, reviews, testimonials, or `aggregateRating`.
- Do NOT modify `ToolSEOContent.jsx`, `ToolPage.jsx`, or any component. Data only.

## Acceptance criteria

- [ ] `node frontend/scripts/content-audit.mjs` reports all 4 of these tools at ≥ 400 words
- [ ] No `seoArticle` among the 4 has an `<a` tag before its first `.`
- [ ] No 6-word sequence repeats verbatim between any two of the 4 tools' `seoArticle` values
- [ ] `sign-pdf` has 4–5 FAQs, none of which is one of its current entries
- [ ] Every security claim in the 4 pages is traceable to a specific line in the implementation — the task report lists each claim with its source line, or states that the claim was softened
- [ ] `npm run build` succeeds

## Notes

The fifth acceptance criterion is unusual and deliberate: this cluster is the one place where confident
prose can create real user harm (someone shipping a "redacted" document that is not redacted). Claim
verification is part of the deliverable, not a nice-to-have.

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
