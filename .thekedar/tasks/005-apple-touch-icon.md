# Task 005 — Real PNG apple-touch-icon

**Status:** DONE
**Depends on:** 004
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

iOS "Add to Home Screen" shows the DocShift mark instead of a blank/generic tile. Today
`layout.jsx` declares `apple: '/favicon.svg'`, and iOS does not support SVG in the apple-touch-icon
slot at all.

## In scope

- New `frontend/app/apple-icon.tsx` — a 180×180 PNG generated with `ImageResponse` from `next/og`,
  exporting `size = { width: 180, height: 180 }` and `contentType = 'image/png'`. Match the wordmark
  and palette used by the OG image from task 004.
- `frontend/app/layout.jsx`: remove the `apple: '/favicon.svg'` entry from `metadata.icons`. Keep
  `icon: '/favicon.svg'`.

## NOT in scope (the fence — do not cross)

- Do NOT add a `favicon.ico`. Every current browser and Google's favicon crawler accept the existing
  SVG; a second icon format is maintenance for no gain. Explicitly deferred.
- Do NOT modify or delete `frontend/public/favicon.svg`.
- Do NOT edit `frontend/public/manifest.json` — PWA icon entries are a separate concern and the audit
  never verified that file's contents.
- Do NOT change `metadata.themeColor` / the `viewport` export.
- Do NOT commit a binary `.png`.

## Acceptance criteria

- [ ] `npm run build` succeeds
- [ ] Built HTML for `/` contains `<link rel="apple-touch-icon"` with `sizes="180x180"` and a URL ending in `.png` (not `.svg`)
- [ ] Fetching that URL on a running build returns `200` with `content-type: image/png`
- [ ] Built HTML for `/` still contains a `<link rel="icon"` pointing at `/favicon.svg`

## Notes

Depends on 004 so the apple icon can reuse the same `ImageResponse` design decisions rather than
inventing a second visual treatment.
