# Task 006 — IndexNow key, CCBot unblock, honest llms.txt

**Status:** TODO
**Depends on:** none
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

Three independent crawler-facing corrections: Bing/Yandex/Naver can be pinged on publish via IndexNow,
CCBot is no longer blocked from a site whose whole strategy is discovery, and `llms.txt` stops making
an unverifiable "open source" claim that links to a GitHub *profile* rather than a repo.

## In scope

- New `frontend/public/<32-64-hex-char-key>.txt` containing exactly that key as its only content
  (IndexNow's key-file verification format). Generate the key locally — any hex string of legal length.
- New `frontend/scripts/indexnow.mjs` — a Node script (no new dependencies, use `fetch`) that POSTs
  `https://api.indexnow.org/indexnow` with `host`, `key`, `keyLocation` and the URL list built from
  `TOOLS`. Wire it as an npm script `"indexnow"` in `frontend/package.json`. Manual invocation only.
- `frontend/app/robots.ts`: remove the `{ userAgent: 'CCBot', disallow: '/' }` rule and replace the
  comment above it with the actual reason for allowing it (feeds open-model pretraining; a
  discovery-first site loses nothing).
- `frontend/public/llms.txt`: point the "Open source" link at the real repository
  `https://github.com/soumyachk101/PDF_Master`, and soften the wording to what is verifiably true
  today (e.g. "Source code is public on GitHub") since the repo carries no LICENSE file.

## NOT in scope (the fence — do not cross)

- Do NOT add a `LICENSE` file to the repository — choosing a licence is the owner's decision, not a
  planning assumption. The wording change above makes the current state honest without one.
- Do NOT wire the IndexNow ping into `postbuild`, CI, or a deploy hook. It would fire on every preview
  build and burn the quota. Manual `npm run indexnow` only.
- Do NOT change any other rule in `robots.ts` — the `/api/` and `/pdf-preview` disallows, the seven AI
  crawler allows, the `sitemap` and `host` lines all stay exactly as they are.
- Do NOT restructure `llms.txt` or edit any of the 30 tool entries in it — link and wording only.
- Do NOT create `llms-full.txt` here; that is task 022.
- Do NOT install any npm package.

## Acceptance criteria

- [ ] `frontend/public/<key>.txt` exists, and its contents equal its filename minus `.txt`
- [ ] `node frontend/scripts/indexnow.mjs --dry-run` (or equivalent) prints 35+ absolute `https://www.docshift.tech/...` URLs and exits 0 without sending a request
- [ ] `npm run build && npm run start`, then `curl -s http://localhost:3000/robots.txt` contains no `CCBot` disallow and still contains `Disallow: /api/` and the `Sitemap:` line
- [ ] `grep -n "soumyachk101" frontend/public/llms.txt` shows the repo URL `PDF_Master`, and `grep -ci "open source" frontend/public/llms.txt` returns 0

## Notes

**Assumption, cheap to veto:** unblocking CCBot reverses an explicit prior decision recorded in the
`robots.ts` comment. The audit recommends it (CCBot dumps feed pretraining for many open models, and
this site's content is public marketing). If the owner disagrees, revert that one rule — nothing else
in this task depends on it.
