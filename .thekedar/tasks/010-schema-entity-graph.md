# Task 010 — `@id`-linked schema entity graph

**Status:** DONE
**Depends on:** 001
**Risk:** medium
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

The site's structured data stops being three disconnected islands with `Organization` re-inlined three
times per tool page. One canonical `Organization` node and one `WebSite` node get stable `@id`s and are
referenced by `@id` everywhere else, and each tool page gains a `WebPage` node tying it to the site.

## In scope

- New `frontend/src/utils/schema.js` exporting:
  - `ORG_ID = 'https://www.docshift.tech/#organization'`, `SITE_ID = 'https://www.docshift.tech/#website'`
  - `organizationNode` — the existing Organization from `layout.jsx` plus `@id: ORG_ID` and
    `founder: { '@type': 'Person', name: 'Soumya Chakraborty', url: 'https://github.com/soumyachk101' }`
    (matching the existing About/Terms copy — no invented title, bio or credentials)
  - `webSiteNode` — `@id: SITE_ID`, plus `description`, `inLanguage: 'en'`, `alternateName`, and
    `publisher: { '@id': ORG_ID }`
- `frontend/app/layout.jsx`: emit `organizationNode` and `webSiteNode` from the module; keep the
  existing `SoftwareApplication` node but replace its inlined `author` object with `{ '@id': ORG_ID }`.
- `frontend/app/tool/[toolSlug]/page.jsx`:
  - replace the inlined `author` Organization on the `WebApplication` node with `{ '@id': ORG_ID }`
  - add a `WebPage` node: `@id` = the page URL + `#webpage`, `url`, `name`, `description`,
    `isPartOf: { '@id': SITE_ID }`, `breadcrumb` referencing the existing BreadcrumbList by `@id`,
    `inLanguage: 'en'`
  - give the existing `BreadcrumbList` an `@id` so `WebPage.breadcrumb` can point at it
- `frontend/app/page.jsx`: leave the `ItemList` content alone; add `isPartOf: { '@id': SITE_ID }` only.

## NOT in scope (the fence — do not cross)

- **Do NOT add `aggregateRating`, `Review`, `ratingValue`, or `reviewCount` anywhere.** No review
  mechanism exists; fabricated review markup is a manual-action risk. Hard stop.
- Do NOT add `Article`, `BlogPosting`, `datePublished` or `dateModified` — the site has no real dates
  and none may be invented.
- Do NOT add `HowTo` (deprecated Sept 2023) or `SearchAction` (site search is local `useState` with no
  `?q=` URL, and Google retired the sitelinks searchbox result — deliberately skipped, see phase-2.md).
- Do NOT remove or alter the existing `FAQPage` markup or the shipped `ItemList` on the homepage.
- Do NOT add `AboutPage` / `ContactPage` schema here — that is task 023.
- Do NOT invent `foundingDate`, employee counts, addresses, or any `sameAs` profile that is not already
  listed in the current `organizationSchema`.
- Do NOT change any visible page content or component.

## Acceptance criteria

- [ ] `npm run build` succeeds
- [ ] For built `/tool/merge-pdf`, every `application/ld+json` block parses with `JSON.parse` and, across all blocks combined, there is **exactly one** node whose `@type` is `Organization`
- [ ] Every `@id` referenced from an `author`, `publisher`, `isPartOf` or `breadcrumb` field resolves to a node actually present on that page or emitted by the shared layout
- [ ] `grep -c "aggregateRating\|ratingValue\|reviewCount" frontend/app frontend/src -r` returns 0
- [ ] Built `/tool/merge-pdf` contains a `WebPage` node and still contains its `FAQPage` and `BreadcrumbList` nodes

## Notes

The shared module exists because three files need the same two `@id` strings — duplicating them is how
entity graphs silently break. It is a constants file, not an abstraction layer; do not grow it into a
schema builder framework.
