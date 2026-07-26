# Task 020 — `/pdf-security-guide` hub

**Status:** DONE (see notes — one deviation from spec)
**Depends on:** 017, 019
**Risk:** medium
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

An educational `/pdf-security-guide` page answers the "is it safe to upload my PDF" question family,
explains the concepts the security tools implement, and links to `unlock-pdf`, `protect-pdf`,
`redact-pdf`, `sign-pdf` and `pdf-to-pdfa`. This is the page most likely to be cited by an AI answer
engine, because it is the site's only genuinely explanatory content.

## In scope

- New `frontend/app/pdf-security-guide/page.jsx` — a Server Component:
  - `metadata` with title, description, `keywords`, `alternates.canonical: '/pdf-security-guide'`
  - ≥ 700 words of unique explanatory copy, `<h2>`-sectioned, covering:
    - what happens to a file when an online tool uploads it, vs browser-local processing
    - user password vs owner/permissions password
    - redaction vs drawing a black box (and why the difference matters)
    - visible signature vs digital certificate signature
    - PDF/A and why archives require it
  - each section ends with a link to the relevant tool
  - an FAQ block (4–5 questions) with the literal questions people ask
  - JSON-LD: `BreadcrumbList` + `WebPage` (**not** `Article` — no publish date exists and none may be
    invented) + `FAQPage`, with `isPartOf: { '@id': SITE_ID }`
- `frontend/app/sitemap.ts`: add the entry
- `frontend/src/components/Footer.jsx`: add the link
- `frontend/public/llms.txt`: add `/pdf-security-guide` under `## Pages`

## NOT in scope (the fence — do not cross)

- **Do NOT name a competitor or assert what any specific named service does with uploaded files.**
  Describe the general upload-based architecture, not a named company's behaviour. Competitor content
  is task 021, gated on Q1.
- Do NOT cite a law, regulation, standard number, breach incident, court case, or compliance
  certification (GDPR article numbers, HIPAA, ISO, SOC 2, eIDAS…). None of it is verifiable here.
- Do NOT quote encryption standards, key lengths, or algorithm names that the app does not actually use.
- Do NOT invent statistics about data breaches, upload risks, or how many services retain files.
- Do NOT add a `datePublished`, `dateModified`, author byline with credentials, or `Article` schema.
- Do NOT claim DocShift is audited, certified, penetration-tested, or third-party verified.
- Do NOT modify the 30 tool pages or `frontend/src/utils/tools.js`.
- Do NOT modify `Navbar.jsx` or create new UI components.
- Do NOT add `aggregateRating`, reviews or testimonials.

## Acceptance criteria

- [ ] `npm run build` succeeds and prerenders `/pdf-security-guide`; server HTML (JS disabled) shows the full copy
- [ ] ≥ 700 words of body copy, in ≥ 5 `<h2>` sections, each linking to its related tool
- [ ] JSON-LD parses and contains `WebPage` + `FAQPage` + `BreadcrumbList`, and **no** `Article`, `BlogPosting`, `datePublished` or `dateModified`
- [ ] `grep -icE 'ilovepdf|smallpdf|adobe|sejda|pdf24|GDPR|HIPAA|ISO ?27001|SOC ?2' frontend/app/pdf-security-guide/page.jsx` returns 0
- [ ] `/sitemap.xml` includes the URL and the canonical is correct

## Notes

Medium risk because the topic invites confident, unverifiable security claims — the fence above is
longer than usual for exactly that reason. Depends on 017 so the tool pages it links to already carry
verified security copy rather than contradicting the guide.

## Execution note

Built and verified 2026-07-27. Full change record, verification detail, and deviations from spec: see `.thekedar/changes/task-018-to-023-phase4.md`.
