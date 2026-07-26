# Task 021 — Comparison / alternatives content

**Status:** DONE (see notes — Q1 answer superseded, user re-confirmed)
**Depends on:** 019, 020
**Risk:** high
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

Close the audit's single biggest gap: the site has zero comparison or "alternative to" content, which
is structurally what both competitor-brand searches and AI answer engines need in order to surface
DocShift. **Scope cannot be finalised until Q1 is answered.**

## Q1 — ANSWERED 2026-07-26

**Option (a) — architecture axis only.** Competitors may be named. The ONLY assertion permitted about a
named competitor is that it processes files on a server (files are uploaded), versus DocShift processing
in the browser. Nothing else. No pricing, no free-tier limits, no file-size caps, no watermark policy,
no retention periods, no feature availability, no feature-comparison table.

Everything else on the page must be about DocShift and verifiable in this repo.

**URL shape — orchestrator's call, not the user's:** `/alternatives/[slug]` with exactly TWO slugs,
`ilovepdf` and `smallpdf`. Two hand-written entries in a data array, not a generator over a competitor
list. Rationale: option (a) makes the competitor-specific portion of each page one paragraph, so more
than two pages would be near-duplicate thin content — the doorway pattern the fence below bans. Two
pages is enough to capture both brand queries.

## In scope

- New route `frontend/app/alternatives/[slug]/page.jsx` + `generateStaticParams` returning exactly
  `ilovepdf` and `smallpdf`
- Per page: ≥ 600 words, an honest statement of what DocShift does **not** do, links to the relevant
  tools, `BreadcrumbList` + `WebPage` + `FAQPage` JSON-LD
- `frontend/app/sitemap.ts`, `frontend/src/components/Footer.jsx`, `frontend/public/llms.txt` entries

## NOT in scope (the fence — do not cross)

- **Named competitors are exactly `iLovePDF` and `Smallpdf`. Do NOT name any other company.**
- Do NOT state any competitor's price, free-tier limit, file-size cap, watermark policy, retention
  period, or feature availability. Under the answered Q1 (option a) there is NO source for these, so
  any such sentence is fabrication. The single permitted claim is server-side processing vs in-browser.
- Do NOT build a feature-comparison table. A table with unverified cells is fabrication with better
  formatting.
- Do NOT create a third `/alternatives/*` page or turn the two slugs into a generated list.
- Do NOT claim a competitor is insecure, negligent, or has suffered a breach.
- Do NOT build a feature-comparison table under option (a) or (c) — a table with unverified cells is
  fabrication with better formatting.
- Do NOT use a competitor's logo, trademark, screenshot, or brand colours.
- Do NOT generate one page per competitor per tool (30 × N doorway pages) — that is the spam pattern
  `SEO_OFFPAGE_PLAYBOOK.md` explicitly warns against.
- Do NOT modify the 30 tool pages or `frontend/src/utils/tools.js`.
- Do NOT add `aggregateRating`, reviews or testimonials.
- Do NOT attempt any outreach, submission, or link acquisition — this task builds the asset only.

## Acceptance criteria

- [ ] Exactly two pages exist: `/alternatives/ilovepdf` and `/alternatives/smallpdf`. No third page.
- [ ] The task report lists EVERY sentence mentioning iLovePDF or Smallpdf, one per line. Each must assert only server-side-vs-in-browser processing. Any other claim about them fails the task.
- [ ] `grep -riE "free tier|per day|file size limit|watermark|retention|pricing|\$[0-9]|[0-9]+ ?(MB|GB)" frontend/app/alternatives/` returns nothing that refers to a competitor
- [ ] Each page ≥ 600 words, prerendered, in `sitemap.xml`, with a correct canonical and parsing JSON-LD
- [ ] Each page contains at least one sentence stating a genuine DocShift limitation
- [ ] `npm run build` succeeds

## Notes

The "what DocShift does not do" requirement is not modesty — a comparison page with no downside reads
as marketing to both readers and answer engines, and gets ignored by exactly the queries it targets.
Option (a) is the recommended default if the human has no preference: it is honest, it captures the
brand queries, and it needs no external research.

## Execution note

Built and verified 2026-07-27. Full change record, verification detail, and deviations from spec: see `.thekedar/changes/task-018-to-023-phase4.md`.
