# Change record — Task 001: Invalid tool slugs must return HTTP 404

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3

## What changed

`/tool/<any-invalid-slug>` now returns a real HTTP 404 and renders `app/not-found.jsx`. Before this, any
made-up slug returned **HTTP 200** with a "Tool Not Found" body carrying
`<meta name="robots" content="index, follow">` — an unbounded, indexable soft-404 URL space that a crawler
could wander into forever. This was the most damaging single defect in the audit.

Two lines of actual change:
- `export const dynamicParams = false` — the 30 valid slugs are fully enumerated by the existing
  `generateStaticParams`, so Next 404s anything else before either `generateMetadata` or `ToolRoute` runs.
- The `if (!tool)` branch in `generateMetadata` also returns `robots: { index: false, follow: false }`
  as belt-and-braces. It is unreachable now, which is the point — it stays correct if `dynamicParams`
  is ever changed.

## What was deliberately NOT changed

- `generateStaticParams` and the `TOOLS` array — the slug list was already correct.
- `app/not-found.jsx` — its design and copy are fine; it just needed to actually be reached.
- Metadata for valid tools — title, description, keywords, canonical, OG and Twitter tags are all
  byte-identical. Verified: `/tool/merge-pdf` still returns 200 with
  `<link rel="canonical" href="https://www.docshift.tech/tool/merge-pdf">`.
- `ToolPage.jsx` and `ToolSEOContent.jsx` — untouched.
- No redirect, no fuzzy slug matching, no "did you mean" suggestion. A 404 is the correct answer for a
  URL that does not exist; anything else would recreate the soft-404 problem in a friendlier costume.

## Why

`dynamicParams = false` was chosen over `notFound()` because the same `if (!tool)` hole existed in **two**
places — `generateMetadata` and `ToolRoute`. A `notFound()` call patches one call site; `dynamicParams`
short-circuits both before either executes. One line, no import, and it cannot drift out of sync with
`generateStaticParams`. That is the root-cause fix rather than the symptom patch.

## Files touched

- `frontend/app/tool/[toolSlug]/page.jsx` — `dynamicParams = false` + `robots: noindex` on the dead branch

## Verification

Ran against a real production build (`npm run build && npm run start`), not a dev server.

- build: **PASS** — compiled in 3.8s, 41/41 static pages generated, all 30 `/tool/*` routes still prerendered (`● SSG`)
- AC2 `curl -sI /tool/not-a-real-tool`: **PASS** — `HTTP/1.1 404 Not Found`
- AC3 `index, follow` in that body: **PASS** — 0 occurrences
- AC4 `curl -sI /tool/merge-pdf`: **PASS** — `HTTP/1.1 200 OK`, canonical byte-identical
- regression, seoArticle in raw HTML (no JS): **PASS** — still present
- regression, `"@type":"FAQPage"` JSON-LD: **PASS** — still present
- regression, real 404 route `/this-page-does-not-exist`: **PASS** — still `404`
- bonus: the invalid-slug response now renders the proper not-found page
  (`<title>Page Not Found – 404 | DocShift Free PDF Tools | DocShift</title>`)
- drift-check: **no drift** — `git diff --stat` shows exactly 1 file, `frontend/app/tool/[toolSlug]/page.jsx`,
  +5 insertions, matching the task's Expected files exactly.
  (Note: `hooks/drift-check.sh` is not installed in this project — no `.claude/hooks/` directory exists —
  so this was done manually via `git diff --stat`. Recorded honestly rather than fabricating a `DRIFT:` line.)

## Follow-ups

- The thekedar reviewer agents (`error-checker`, `security-auditor`, `frontend-reviewer`) are **not installed**
  in this environment — `.claude/agents/`, `~/.claude/agents/` and the plugin's `agents/` directory are all
  empty. Only `thekedar:planner` exists. Per-task gate verdicts are therefore substituted by objective
  build + curl checks, with one `cavecrew-reviewer` pass over the combined Phase 1 diff before the phase
  is handed back. This deviation applies to every task in this project, not just 001.
- The `/api/og` route is still `ƒ (Dynamic)` and sits under the robots-disallowed `/api/` path. Task 004
  removes it.
