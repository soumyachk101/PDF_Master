# Change record — Task 010: `@id`-linked schema entity graph

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3

## What changed

The site's structured data stops being three disconnected islands with `Organization` re-inlined on
every single page. One canonical `Organization` and one `WebSite` node now carry stable `@id`s and are
referenced by `@id` everywhere else, and every tool page gains a `WebPage` node tying it to the site.

- New `frontend/src/utils/schema.js` — exports `ORG_ID`, `SITE_ID`, `organizationNode`, `webSiteNode`.
  `organizationNode` is the pre-existing Organization from `layout.jsx` plus `@id` and a `founder` Person
  (name + URL match the "Built By" credit on `/about` and the operator line on `/terms` verbatim — checked
  both before writing, not assumed).
- `frontend/app/layout.jsx` — emits `webSiteNode` and `organizationNode` from the shared module instead of
  two locally-defined, `@id`-less objects. `SoftwareApplication`'s inlined `author` Organization replaced
  with `{ '@id': ORG_ID }`.
- `frontend/app/tool/[toolSlug]/page.jsx` — `WebApplication.author` replaced with `{ '@id': ORG_ID }`;
  `BreadcrumbList` gains `@id` (`<page-url>#breadcrumb`); a new `WebPage` node is added:
  `@id` = `<page-url>#webpage`, `url`, `name` (from `tool.seoTitle`), `description` (from `tool.seoDesc`),
  `inLanguage: 'en'`, `isPartOf: { '@id': SITE_ID }`, `breadcrumb: { '@id': breadcrumbId }`.
- `frontend/app/page.jsx` — `ItemList` gains `isPartOf: { '@id': SITE_ID }`. Nothing else in it touched.

## What was deliberately NOT changed

- **No `aggregateRating`, `Review`, `ratingValue`, or `reviewCount` anywhere.** Confirmed by grep across
  `frontend/app` and `frontend/src`: zero matches. No review mechanism exists on this site.
- No `Article`, `BlogPosting`, `datePublished` or `dateModified` — no real dates exist to attach.
- No `HowTo` or `SearchAction` — both were already ruled out in Phase 1/2 planning (`HowTo` deprecated
  2023; site search is local `useState` with no `?q=` URL, so `SearchAction` has nothing to point at).
- The existing `FAQPage` markup and the homepage's shipped `ItemList` content — untouched beyond the one
  added field.
- No `AboutPage`/`ContactPage` schema — that is task 023.
- No invented `foundingDate` change, employee counts, address, or `sameAs` entry beyond what
  `organizationSchema` already listed.
- No visible page content or component changed. This is exclusively `<script type="application/ld+json">`
  payloads.

## Why

Before this, `Organization` was a full object inlined three times per tool page (once via the layout's
site-wide script, again inside `SoftwareApplication.author`, again inside `WebApplication.author`) — three
independent copies with no `@id`, meaning a crawler had no way to know they were the same entity, and any
future edit to one would silently diverge from the other two. Giving `Organization` and `WebSite` a single
`@id` each and referencing them everywhere collapses that to one source of truth per entity.

`schema.js` is deliberately a constants file, not a builder: three files need the exact same two `@id`
strings, and duplicating those strings across files is exactly how an entity graph breaks silently — a
typo in one copy of `'https://www.docshift.tech/#organization'` would desync it from the others with no
error, just a broken graph a human wouldn't notice.

## Files touched

- `frontend/src/utils/schema.js` (new)
- `frontend/app/layout.jsx` — 39 lines removed (two locally-defined schema objects → module import), net simpler
- `frontend/app/tool/[toolSlug]/page.jsx` — `@id` wiring + new `WebPage` node
- `frontend/app/page.jsx` — one field added

## Verification

Wrote `scratchpad/verify-schema-graph.mjs`: fetches a URL, extracts every `<script type="application/ld+json">`
block, `JSON.parse`s each, counts `Organization` nodes, and — the part a human can't check by eye across
7 blocks — resolves every `@id` reference found in an `author`/`publisher`/`isPartOf`/`breadcrumb` field
against the set of `@id`s actually present on that page.

- build: **PASS** — compiled, all pages generated, 30 tool routes still SSG
- AC1 build: **PASS**
- AC2 `/tool/merge-pdf`, all blocks parse + exactly one Organization: **PASS** — 7 blocks (WebSite, Organization,
  SoftwareApplication, WebApplication, BreadcrumbList, WebPage, FAQPage), all valid JSON, exactly 1
  `@type: Organization`
- AC3 every `@id` reference resolves: **PASS** — 5 references checked on `/tool/merge-pdf`
  (`WebSite.publisher`, `SoftwareApplication.author`, `WebApplication.author`, `WebPage.isPartOf`,
  `WebPage.breadcrumb`), all five resolve to a node present on the page or emitted by the shared layout
- AC4 `grep -c "aggregateRating\|ratingValue\|reviewCount"`: **PASS** — 0 across `frontend/app` and `frontend/src`
- AC5 `/tool/merge-pdf` contains `WebPage`, still contains `FAQPage` and `BreadcrumbList`: **PASS**
- spot-checked a second tool page (`/tool/sign-pdf`) with the same script: **PASS**, same shape
- spot-checked the homepage: **PASS** on the checks that apply to it (1 Organization node, 3 references —
  `WebSite.publisher`, `SoftwareApplication.author`, `ItemList.isPartOf` — all resolve). The verifier
  script also asserts `WebPage present` unconditionally, which fails on `/` — that assertion is a flaw in
  the generic script, not a defect in the page: task 010 never requires a `WebPage` node on the homepage,
  only the one added `isPartOf` field, which is present and resolves correctly.
- drift-check: **no drift** — the four Expected files exactly, nothing else touched.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- None outstanding from this task. `AboutPage`/`ContactPage` schema (task 023) and the comparison pages
  (task 021) will both want to import `ORG_ID`/`SITE_ID` from `schema.js` rather than re-inlining — that's
  the point of having built it as a shared module now.
