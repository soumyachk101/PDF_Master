# Task 019 — `/free-pdf-tools` hub

**Status:** DONE (see notes)
**Depends on:** 018
**Risk:** low
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

A `/free-pdf-tools` hub captures the "free / no signup / no watermark / no file limit / no email"
query family across all 30 tools, and gives every tool a second inbound internal link from body content.

## In scope

- New `frontend/app/free-pdf-tools/page.jsx` — a Server Component:
  - `metadata` with title, description, `keywords`, `alternates.canonical: '/free-pdf-tools'`
  - ≥ 500 words of unique copy on what "free" concretely means here: no account, no email, no
    watermark on output, no per-day cap, no paid tier gating features. Every one of these claims must
    be verified against the actual app before it is written.
  - all 30 tools grouped by the seven `CATEGORIES`, derived from `TOOLS` — not hardcoded
  - an FAQ block (4–5 questions): "is it really free", "do I need an account", "is there a watermark",
    "what is the file size limit", "how is this free"
  - JSON-LD: `BreadcrumbList` + `CollectionPage` with `isPartOf: { '@id': SITE_ID }`
- `frontend/app/sitemap.ts`: add the `/free-pdf-tools` entry
- `frontend/src/components/Footer.jsx`: add the link
- `frontend/public/llms.txt`: add `/free-pdf-tools` under `## Pages`

## NOT in scope (the fence — do not cross)

- **Do NOT name or compare against any competitor**, and do not frame the page as an "alternative to X".
  The audit labelled this hub "alternative-to", but competitor claims are gated on Q1 and belong in
  task 021. This page stands on DocShift's own verifiable properties only.
- Do NOT claim "no file size limit" unless there is genuinely no cap — browser memory is a real ceiling
  and the copy should be honest about large files.
- Do NOT claim "no watermark" for a tool that adds one; check every output path first.
- Do NOT invent a business model explanation, funding story, revenue figure, or user count.
- Do NOT modify the 30 tool pages or `frontend/src/utils/tools.js`.
- Do NOT modify `Navbar.jsx` or create new UI components.
- Do NOT add `aggregateRating`, reviews or testimonials.
- Do NOT fix the stale `count` values in the `CATEGORIES` array — `HomePage.jsx` computes counts
  dynamically and ignores them; touching that array is out of scope here.

## Acceptance criteria

- [ ] `npm run build` succeeds and prerenders `/free-pdf-tools`; server HTML (JS disabled) contains all 30 tool links
- [ ] The page links to all 30 `/tool/` slugs, derived from `TOOLS` (adding a 31st tool would appear automatically)
- [ ] `/sitemap.xml` includes `https://www.docshift.tech/free-pdf-tools`; canonical is correct; JSON-LD parses
- [ ] `grep -icE 'ilovepdf|smallpdf|adobe|sejda|pdf24|soda ?pdf' frontend/app/free-pdf-tools/page.jsx` returns 0
- [ ] Every "free"/"no X" claim on the page is listed in the task report with where it was verified in the app

## Notes

Combined with task 018, this gives all 30 tools at least two inbound internal links from body content
rather than footer-only, which was the audit's stated internal-linking problem.

## Execution note

Built and verified 2026-07-27. Full change record, verification detail, and deviations from spec: see `.thekedar/changes/task-018-to-023-phase4.md`.
