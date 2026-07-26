# Change record — Task 004: Real 1200×630 OG images via Next file convention

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3 (one self-caught defect, see Verification)

## What changed

Social previews now use genuinely 1200×630 PNGs generated at build time, replacing two separate defects:

1. `layout.jsx` and `app/page.jsx` both declared `logo.png` as `width: 1200, height: 630`. The file is
   **1024×1024**. Every share on every platform was cropping a square image into a landscape slot.
2. The 30 tool pages pointed their OG image at `/api/og?title=…&desc=…`. That path sits under `/api/`,
   which `robots.ts` disallows — and Twitterbot honours robots.txt, so those previews were unreachable
   for it. It was also `ƒ (Dynamic)`, rendering per request.

Now: `app/opengraph-image.tsx` (site-wide) and `app/tool/[toolSlug]/opengraph-image.tsx` (per-tool, with
`generateStaticParams`) — both prerendered. The build went from 41 to **72 static pages**: 41 existing
+ 1 root card + 30 tool cards. The old dynamic route is deleted; `app/api/` is now empty and gone.

Artwork is byte-for-byte the previous design — same `#e5e7eb` field, same black uppercase wordmark, same
six-colour bar — so previews look identical to before, just at the right dimensions and off `/api/`.

## What was deliberately NOT changed

- No `title`, `description`, `keywords`, or `alternates.canonical` value in any metadata block was touched.
- `twitter.card` (`summary_large_image`) and `twitter.site` (`@soumyachk1`) — unchanged.
- `public/logo.png` and `logo.webp` — **not** deleted, resized or re-exported. They are used by the
  visible UI, not only by OG. Only the false 1200×630 *claim* about them was removed.
- `app/robots.ts` — `/api/` stays disallowed. This task routes around that rule rather than weakening it.
- No image library added (`sharp`, `canvas`, `jimp`). `next/og` was already a dependency.
- No binary `.png` committed — everything is generated at build.
- The `/api/:path*` → backend rewrite in `next.config.js` is untouched. Deleting the local `og` route
  means `/api/og` now falls through to that rewrite and 404s at the backend. Nothing references it.

## Why

The file convention was chosen over patching the `/api/og` URLs because it fixes the robots.txt problem
structurally rather than by exception, and it makes the images static instead of per-request.

`src/utils/ogTemplate.tsx` was added as a **declared scope addition** (recorded in the task file before
writing). Three call sites need identical artwork — the root card, the tool cards, and task 005's apple
icon, which is required to "match the wordmark and palette used by the OG image from task 004". One
shared module is the only way that requirement stays true; three copies of ~60 lines of JSX would drift.

## Files touched

- `frontend/src/utils/ogTemplate.tsx` (new, scope addition) — shared card artwork + size/contentType
- `frontend/app/opengraph-image.tsx` (new) — site-wide 1200×630 card
- `frontend/app/tool/[toolSlug]/opengraph-image.tsx` (new) — per-tool card, 30 static params
- `frontend/app/layout.jsx` — removed `openGraph.images` and `twitter.images`
- `frontend/app/page.jsx` — removed `openGraph.images` and `twitter.images`
- `frontend/app/tool/[toolSlug]/page.jsx` — removed both `/api/og?…` entries
- `frontend/app/api/og/route.tsx` (deleted, 94 lines) — `app/api/` removed with it

## Verification

**A real defect was caught and fixed mid-task.** The task's Notes predicted the OG route would inherit
`dynamicParams` from task 001's `page.jsx`. It does not — route segment config is per-file. First run:
`/tool/not-a-real-tool/opengraph-image` returned **HTTP 200** with a generic card, recreating exactly the
unbounded soft-200 surface task 001 had just closed. Fixed by exporting `dynamicParams = false` from the
OG route too, then re-verified.

- build: **PASS** — 72/72 static pages; `/opengraph-image` is `○ Static`, `/tool/[toolSlug]/opengraph-image`
  is `● SSG` with 30 paths; `/api/og` no longer in the route table
- AC2 homepage: **PASS** — `og:image:width` `1200`, `og:image:height` `630`; `og:image` URL contains
  neither `/api/og` nor `logo.png`
- AC3 `/tool/merge-pdf`: **PASS** — `og:image` does not start with `/api/`; fetching it returns `200`
  with `content-type: image/png`
- AC4 `grep -rn "api/og" frontend/app frontend/src`: **PASS** — no results
- **actual pixels checked, not just the declared tags** — `sips` on a generated card reports
  `pixelWidth: 1200, pixelHeight: 630, format: png`. This is the check that would have caught the
  original bug, so it is the one that matters here
- spot-checked 4 cards (`/`, merge-pdf, sign-pdf, pdf-to-word, compress-pdf): all `200 image/png`
- regression: `/tool/not-a-real-tool` page still `404`; invalid-slug OG now `404` too
- drift-check: **one declared scope addition, no undeclared drift.** Changed set is the five Expected
  files plus the deletion, plus `src/utils/ogTemplate.tsx` which was recorded in the task file's
  `## Scope addition` section before it was written.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- The OG card is text-only. Once a real 1200×630 brand asset exists it could be composited in, but that
  needs a designed image, not a generated one.
- `og:image` URLs are absolute against `metadataBase` (`https://www.docshift.tech`), so they only resolve
  against production. That is correct for crawlers, but it means local verification must hit the
  localhost path directly — noting it so the next person does not read a production 404 as a failure.
