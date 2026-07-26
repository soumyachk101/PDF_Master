# Task 004 — Real 1200×630 OG images via Next file convention

**Status:** TODO
**Depends on:** 001
**Risk:** medium
**Estimated size:** M
**Stack tags:** nextjs, react, seo

## Objective

Social previews stop cropping wrong. Site-wide and per-tool Open Graph images are generated at build
time by Next's `opengraph-image` file convention at true 1200×630, replacing (a) `layout.jsx`'s claim
that the square 1024×1024 `logo.png` is 1200×630, and (b) the per-tool `/api/og?...` URLs which sit
under the `/api/` path that `robots.ts` disallows — Twitterbot honours robots.txt, so those previews
are currently unreachable for it.

## In scope

- New `frontend/app/opengraph-image.tsx` — site-wide 1200×630 `ImageResponse`. Reuse the existing
  visual design in `frontend/app/api/og/route.tsx` (same palette, layout, wordmark).
- New `frontend/app/tool/[toolSlug]/opengraph-image.tsx` — per-tool 1200×630, reading `params.toolSlug`
  through `getToolBySlug` for the title/description text. Export `generateStaticParams` so all 30 are
  built statically, plus `size` / `contentType` / `alt`.
- `frontend/app/layout.jsx`: delete `openGraph.images` and `twitter.images` (the convention supplies both).
- `frontend/app/page.jsx`: delete `openGraph.images` and `twitter.images`.
- `frontend/app/tool/[toolSlug]/page.jsx`: delete the `/api/og?...` entries from `openGraph.images`
  and `twitter.images`.
- Delete `frontend/app/api/og/route.tsx` **only if** `grep -rn "api/og" frontend/app frontend/src`
  returns nothing after the edits above.

## NOT in scope (the fence — do not cross)

- Do NOT change any `title`, `description`, `keywords`, or `alternates.canonical` value in any metadata block.
- Do NOT change `twitter.card` (`summary_large_image`) or `twitter.site` (`@soumyachk1`).
- Do NOT delete, replace, resize or re-export `frontend/public/logo.png` / `logo.webp` — they are used
  by the visible UI, not just OG.
- Do NOT add a new image library (`sharp`, `canvas`, `jimp`). `next/og` is already a dependency.
- Do NOT change `frontend/app/robots.ts` — `/api/` stays disallowed; this task routes around it.
- Do NOT commit any binary `.png` OG asset. Everything here is generated at build time.

## Acceptance criteria

- [ ] `npm run build` succeeds and emits an opengraph-image for the root route and for all 30 tool routes
- [ ] Built `/` HTML contains `og:image:width` `1200` and `og:image:height` `630`, and its `og:image` URL does **not** contain `/api/og` or `logo.png`
- [ ] Built `/tool/merge-pdf` HTML contains an `og:image` URL that does not start with `/api/`, and fetching that URL on a running build returns `200` with `content-type: image/png`
- [ ] `grep -rn "api/og" frontend/app frontend/src` returns no results

## Notes

Depends on 001 only for ordering — both touch `app/tool/[toolSlug]/page.jsx` and 001 is the critical
fix, so it lands first. The per-tool OG route inherits `dynamicParams` behaviour from 001, so invalid
slugs will not generate images either.
