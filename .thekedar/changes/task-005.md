# Change record — Task 005: Real PNG apple-touch-icon

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3 (one self-caught defect, see Verification)

## What changed

`metadata.icons.apple` pointed at `/favicon.svg`. iOS does not support SVG in the apple-touch-icon slot
at all, so "Add to Home Screen" produced a blank or generic tile.

- New `frontend/app/apple-icon.tsx` — a 180×180 PNG generated with `ImageResponse`, prerendered at build.
- `frontend/app/layout.jsx` — `apple` now points at that generated icon with explicit `sizes` and `type`.

The composition is deliberately not the OG card's: a 1200×630 landscape layout is unreadable at 180px.
Palette and wordmark are the same — `#e5e7eb` field, black block, white uppercase mark, six-colour bar —
so it reads as the same brand.

## What was deliberately NOT changed

- **No `favicon.ico` added.** Every current browser and Google's favicon crawler accept the existing SVG;
  a second raster format is maintenance for no gain. Explicitly deferred, and recorded in PROJECT_STATE's
  deferred list so it does not get re-proposed.
- `frontend/public/favicon.svg` — not modified, not moved, not deleted. The `icon: '/favicon.svg'` entry
  is untouched and verified still emitting.
- `frontend/public/manifest.json` — untouched. PWA icon entries are a separate concern and no audit ever
  verified that file's contents.
- `metadata.themeColor` / the `viewport` export — untouched.
- No binary `.png` committed.

## Why

The task specified simply removing the `apple` key and letting Next's file convention supply the tag.
**That does not work here**, and the first build proved it: with `metadata.icons` explicitly defined,
Next suppresses convention-derived icon tags entirely. The generated `/apple-icon` route existed and
served a correct PNG, but no `<link rel="apple-touch-icon">` appeared in the HTML at all — strictly worse
than before, since the old (broken) SVG tag at least existed.

The fix keeps the explicit `icons` block — required anyway, because `favicon.svg` lives in `public/` and
not as an `app/icon.*` convention file — and declares the apple entry pointing at the generated route.
Moving the favicon into `app/` would have been the alternative, but the fence forbade touching it.

## Files touched

- `frontend/app/apple-icon.tsx` (new) — 180×180 `ImageResponse`
- `frontend/app/layout.jsx` — `apple` entry repointed with explicit `sizes`/`type`

## Verification

- AC1 build: **PASS** — compiled, 73/73 static pages, `/apple-icon` listed as `○ Static`
- AC2 `<link rel="apple-touch-icon">` on `/`: **PASS with one literal deviation** —
  `<link rel="apple-touch-icon" href="/apple-icon" sizes="180x180" type="image/png"/>`.
  The AC asked for "a URL ending in `.png`". Next serves the generated icon at the **extensionless**
  route `/apple-icon`, so the href has no suffix. The substantive requirement — a real PNG rather than
  the unsupported SVG — is met and verified below by content-type and actual pixel inspection. Recording
  this as a deviation rather than claiming a clean pass.
- AC3 `curl /apple-icon`: **PASS** — `200`, `content-type: image/png`; `sips` confirms `pixelWidth: 180`,
  `pixelHeight: 180`
- AC4 `<link rel="icon" href="/favicon.svg"/>`: **PASS** — still present
- coverage: the apple-touch-icon tag also emits on `/tool/merge-pdf`, i.e. it inherits site-wide as intended
- drift-check: **no drift** — `frontend/app/apple-icon.tsx` (new) and `frontend/app/layout.jsx` (modified),
  matching Expected files exactly.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- `public/manifest.json` still has unverified icon entries — no audit read that file. If the PWA install
  tile matters, it deserves its own look.
- The icon has not been viewed on a real iOS device. Dimensions, format and markup are verified; visual
  legibility of the wordmark at 180px is not. Same limitation as task 002 — no browser in this environment.
