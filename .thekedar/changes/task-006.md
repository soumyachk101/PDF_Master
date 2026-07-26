# Change record — Task 006: IndexNow key, CCBot unblock, honest llms.txt

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3

## What changed

Three unrelated crawler-facing corrections.

**1. IndexNow.** New key file `frontend/public/f4ebcfecf43c89c997f6109b9c2f5184.txt` (contents equal its
own filename, as the spec requires) plus `frontend/scripts/indexnow.mjs`, wired as `npm run indexnow`.
Submits all 35 URLs to Bing/Yandex/Naver/Seznam. Zero dependencies — Node's built-in `fetch` and `fs`.

**2. CCBot unblocked.** `robots.ts` flipped `{ userAgent: 'CCBot', disallow: '/' }` to `allow: '/'`, with
the comment rewritten to say why. This reverses a deliberate earlier decision, so the reasoning is on the
record: two independent audits found that the Common Crawl block was *why* no free backlink or index
checker could see docshift.tech at all — Common Crawl showed 0 captures across the last 4 crawl batches.
CCBot sends no traffic and no citations itself, but its dumps feed both open-model pretraining and most
free SEO tooling. The site's content is public marketing copy; user files never leave the browser either way.

**3. `llms.txt` made honest.** The "Open source — code on GitHub at github.com/soumyachk101" line claimed
something unverifiable and linked a **profile**, not a repo. Verified: `PDF_Master` exists and is public
(200), but has **no LICENSE file** — 404 on both `main` and `master`, and none in the working tree. With
no licence the code is legally all-rights-reserved, so "open source" was inaccurate. Now reads
"**Source available** — source code is public on GitHub at .../PDF_Master", which is exactly true.

## What was deliberately NOT changed

- **No `LICENSE` file added.** Choosing a licence is the owner's call, not a planning assumption. This was
  put to the owner directly and the answer was to soften the wording instead. The claim is now accurate
  without one. Recorded in PROJECT_STATE's decisions log, including that MIT/Apache would be needed later
  if `awesome-selfhosted` / `awesome-privacy` listings are ever pursued.
- **IndexNow is manual only.** Not wired into `postbuild`, CI, or any deploy hook — it would fire on every
  preview build and burn the quota. The npm script is the only trigger.
- Every other `robots.ts` rule is byte-identical: the `/api/` and `/pdf-preview` disallows, all seven AI
  crawler allows, the `Sitemap:` and `Host:` lines. Verified against the served `robots.txt`.
- `llms.txt` structure and all 30 tool entries — untouched. Link and wording only.
- No `llms-full.txt` — that is task 022.
- No npm package installed.

## Why

`indexnow.mjs` reads tool slugs out of `src/utils/tools.js` with a regex rather than importing it.
`tools.js` uses ESM `export` syntax but the package has no `"type": "module"`, so Node treats it as CJS
and an import would throw. Regex-reading the one real source of truth beats maintaining a second copy of
the slug list that would silently rot.

The script also validates its own key file — exactly one `[a-f0-9]{32,64}.txt` in `public/`, and its
contents must equal its filename — and throws otherwise. That check exists because a mismatched key file
makes IndexNow reject every submission silently.

## Files touched

- `frontend/public/f4ebcfecf43c89c997f6109b9c2f5184.txt` (new) — IndexNow key file
- `frontend/scripts/indexnow.mjs` (new) — submission script with `--dry-run`
- `frontend/package.json` — `"indexnow"` script added
- `frontend/app/robots.ts` — CCBot `disallow` → `allow`, comment rewritten
- `frontend/public/llms.txt` — one line: repo link + "Source available" wording

## Verification

- build: **PASS** — compiled, 73/73 static pages
- AC1 key file: **PASS** — served at its URL, contents `f4ebcfecf43c89c997f6109b9c2f5184` exactly equal
  to the filename minus `.txt`
- AC2 `npm run indexnow -- --dry-run`: **PASS** — prints 35 absolute `https://www.docshift.tech/...` URLs,
  exits 0, sends nothing. 35 matches the sitemap's URL count exactly (1 home + 30 tools + 4 static)
- AC3 served `robots.txt`: **PASS** — `User-Agent: CCBot` / `Allow: /`; `Disallow: /api/`, `Host:` and
  `Sitemap:` lines all still present
- AC4 `llms.txt`: **PASS** — line 71 now links `.../PDF_Master`; `grep -ci "open source"` returns **0**
- drift-check: **no drift** — the five Expected files and nothing else.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- **The IndexNow ping has not actually been sent.** Only `--dry-run` was exercised; a real submission is
  an outward-facing action and needs the owner to run `npm run indexnow` after this deploys. It will fail
  until the key file is live at `https://www.docshift.tech/<key>.txt`.
- CCBot's effect is not instant — Common Crawl re-crawls on its own schedule, so free backlink tools stay
  blind for weeks yet. Do not read that as this change having failed.
- The three GitHub repos (`PDF_Master`, `_Backend`, `_Frontend`) still have no description, no topics, and
  `homepage` fields pointing at stale `*.vercel.app` URLs instead of docshift.tech. That is repo metadata,
  not code — the owner has to fix it in GitHub's UI. Three free DR-96 links currently wasted.
