# Change record — Task 003: Long-cache static `public/` assets

**Date:** 2026-07-26 · **Commit:** `c0d518a` · **Fix loops used:** 0/3

## What changed

Five unhashed images in `frontend/public/` now serve `Cache-Control: public, max-age=31536000, immutable`
instead of `max-age=0, must-revalidate`: `favicon.svg`, `logo.png`, `logo.webp`, `hero_graphic.png`,
`hero_graphic.webp`. `manifest.json` gets `public, max-age=86400` — it can legitimately change, so a year
would be wrong.

Two rules appended to `headers()` in `next.config.js`, after the existing global security-header rule.
The image rule uses a single path-to-regexp alternation rather than five separate entries.

Practical effect: the audit confirmed ETag revalidation already worked (304s observed), so this removes a
revalidation round-trip per asset per page load — a latency win, not a bandwidth one.

## What was deliberately NOT changed

- **`/sw.js` and `/offline.html` got no cache header at all.** This is the whole reason the rule is an
  explicit allowlist rather than a `public/(.*)` glob: a long-cached service worker pins users to a stale
  build with no way to recover. Verified both still serve `public, max-age=0`.
- `/google34fa8d6ffd2a7690.html` (Search Console verification) and `/llms.txt` — no header added.
- The global `/(.*)` security-header rule — untouched and verified still applying.
- `redirects()`, `rewrites()`, `images`, `experimental` — untouched.
- No file in `frontend/public/` was renamed, re-encoded, hashed, compressed or deleted.
- No CDN config, no cache middleware, no custom server.

## Why

`immutable` is only safe here because nothing references these files by a versioned URL. That is a real
constraint the code cannot enforce: **if any of these five files is ever replaced, it must be replaced
under a new filename**, or users hold the old bytes for a year. Noted here because it is the kind of thing
that bites eighteen months later.

## Files touched

- `frontend/next.config.js` — two rules appended to `headers()`

## Verification

Production build, clean server (port confirmed free before start).

- build: **PASS** — compiled in 3.8s, 41/41 static pages
- AC1 `curl -sI /logo.png`: **PASS** — `public, max-age=31536000, immutable`
- AC2 `curl -sI /sw.js`: **PASS** — `public, max-age=0`, no `31536000`
- AC3 `curl -sI /` security headers: **PASS** — both `strict-transport-security` and `x-frame-options` present
- AC4 `curl -sI /tool/merge-pdf`: **PASS** — `s-maxage=31536000`, the Next default for an SSG route; the new
  rules do not match `/tool/*` so this path is untouched
- coverage sweep: `favicon.svg`, `logo.webp`, `hero_graphic.webp` all `immutable`; `manifest.json`
  `max-age=86400`; `offline.html` `max-age=0` — every file landed in the intended bucket
- drift-check: **no drift** — `frontend/next.config.js` only, matching Expected files.
  (Manual `git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- The `immutable` promise above is a maintenance constraint, not a code invariant. Worth a line in the
  README if these assets are ever handed to someone else.
