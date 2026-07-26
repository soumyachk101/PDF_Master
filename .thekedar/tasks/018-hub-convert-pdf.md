# Task 018 — `/convert-pdf` cluster hub

**Status:** TODO
**Depends on:** 014, 015
**Risk:** low
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

A `/convert-pdf` hub page exists, links to all 10 conversion tools with descriptive anchors, and pulls
them out of the one-inbound-internal-link hole the audit found. This is the audit's highest-ROI new page.

## In scope

- New `frontend/app/convert-pdf/page.jsx` — a Server Component:
  - `metadata` with title, description, `keywords`, `alternates.canonical: '/convert-pdf'`
  - ≥ 500 words of unique copy answering "which PDF conversion do I need?" — split into a
    **PDF → other formats** section (5 tools) and an **other formats → PDF** section (5 tools)
  - one descriptive link per tool, built by filtering `TOOLS` on `category` in
    `['convertTo', 'convertFrom']` — do not hardcode the list
  - a short FAQ block (3–4 questions) about conversion generally
  - JSON-LD: `BreadcrumbList` + `CollectionPage` with `isPartOf: { '@id': SITE_ID }` from
    `frontend/src/utils/schema.js`
  - reuse existing components (`NeumorphicCard` and friends) — no new design system pieces
- `frontend/app/sitemap.ts`: add the `/convert-pdf` entry
- `frontend/src/components/Footer.jsx`: add a "Guides" or equivalent link group entry pointing at `/convert-pdf`
- `frontend/public/llms.txt`: add `/convert-pdf` under `## Pages`

## NOT in scope (the fence — do not cross)

- Do NOT name, compare against, or mention any competitor product. Competitor content is task 021 and
  is gated on Q1.
- Do NOT modify any of the 30 tool pages or `frontend/src/utils/tools.js`.
- Do NOT modify `frontend/src/components/Navbar.jsx` — the header UI stays as it is.
- Do NOT create a new layout, theme, or UI component; reuse what exists.
- Do NOT invent conversion statistics, "most popular tool" claims, usage counts, or comparison tables
  of speed/quality between the site's own tools.
- Do NOT add `aggregateRating`, reviews or testimonials.
- Do NOT create `/free-pdf-tools` or `/pdf-security-guide` here — tasks 019 and 020.
- Do NOT hardcode the tool list; if a tool is added to `tools.js` later the hub must pick it up.

## Acceptance criteria

- [ ] `npm run build` succeeds and prerenders `/convert-pdf`; `curl` with JS disabled shows the full copy in the server HTML
- [ ] The page contains exactly 10 `/tool/` links, one per `convertTo`/`convertFrom` tool, each with a descriptive anchor (not "click here" / not the bare slug)
- [ ] `/sitemap.xml` on a running build includes `https://www.docshift.tech/convert-pdf`
- [ ] The page's `<link rel="canonical">` is `https://www.docshift.tech/convert-pdf` and its JSON-LD parses with a `CollectionPage` and a `BreadcrumbList` node
- [ ] `node frontend/scripts/content-audit.mjs` (or a manual strip-and-count) shows ≥ 500 words of body copy

## Notes

Depends on 014/015 so the hub links into pages that already carry real depth — a hub pointing at thin
pages just distributes authority to nothing. Do not hardcode the ten slugs; deriving from `TOOLS` is
both less code and self-maintaining.
