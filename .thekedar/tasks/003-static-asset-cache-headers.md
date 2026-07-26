# Task 003 — Long-cache static `public/` assets

**Status:** TODO
**Depends on:** none
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

The unhashed image assets in `frontend/public/` stop being served `max-age=0, must-revalidate` and
start being served with a long immutable cache, removing one revalidation round-trip per asset per
page load. `/_next/static/*` is already correct and stays untouched.

## In scope

- `frontend/next.config.js` → `headers()`: add rules **after** the existing global security-header rule.
  - `public, max-age=31536000, immutable` for: `/favicon.svg`, `/logo.png`, `/logo.webp`,
    `/hero_graphic.png`, `/hero_graphic.webp`
  - `public, max-age=86400` for `/manifest.json` (it can legitimately change; a year is too long)
- Keep the existing global `/(.*)` security-header rule exactly as it is.

## NOT in scope (the fence — do not cross)

- **Do NOT add any cache header for `/sw.js`.** A long-cached service worker is a self-inflicted
  outage — users get pinned to a stale worker. Same for `/offline.html`.
- Do NOT add a header for `/google34fa8d6ffd2a7690.html` (Search Console verification) or `/llms.txt`.
- Do NOT touch `redirects()`, `rewrites()`, `images`, or `experimental` in the same file.
- Do NOT rename, re-encode, hash, compress or delete any file in `frontend/public/`.
- Do NOT introduce a CDN config, `Cache-Control` middleware, or a custom server.

## Acceptance criteria

- [ ] `npm run build && npm run start`, then `curl -sI http://localhost:3000/logo.png | grep -i cache-control` shows `max-age=31536000, immutable`
- [ ] `curl -sI http://localhost:3000/sw.js | grep -i cache-control` does **not** show `max-age=31536000`
- [ ] `curl -sI http://localhost:3000/ | grep -iE 'strict-transport-security|x-frame-options'` still returns both headers (global rule intact)
- [ ] `curl -sI http://localhost:3000/tool/merge-pdf | grep -i cache-control` is unchanged from before the task

## Notes

The audit confirmed ETag revalidation already works (304s observed), so the cost today is latency, not
bandwidth. `immutable` is safe for these files only because nothing else references them by a versioned
URL — if one is ever replaced, it must be replaced under a new filename.
