# Change record — Task 011: Content scaffolding

**Date:** 2026-07-26 · **Commit:** `055a161` · **Fix loops used:** 0/3

## What changed

Built the mechanism tasks 012–017 need, and cut the shared boilerplate in the same move.

- `frontend/src/views/ToolSEOContent.jsx`: renders `tool.steps` (an array of HTML strings) as the `<ol>`
  when present, falling back to the original generic 4-step list when absent. The three-paragraph
  "Why use DocShift?" block (100% Private, Blazing Fast, Zero Installation — ~140 words) is now one
  34-word paragraph carrying all three claims. A `Last updated: <date>` line renders under the article,
  only when `tool.updated` is set — formatted via `toLocaleDateString` with an explicit `timeZone: 'UTC'`
  so the date can't shift a day depending on server timezone.
- `frontend/src/utils/tools.js`: `merge-pdf` gets a working `steps` array (4 entries) and
  `updated: '2026-07-26'` — the actual date of this edit, as a smoke test. No other tool touched.
- `frontend/app/sitemap.ts`: per-tool `lastModified` now reads `tool.updated` when present, else a
  `defaultLastModified` constant bumped from the stale `2026-06-22` to `2026-07-26` (today — the real
  date this file was actually edited, which is what the constant has always meant: "last time the
  sitemap-generation logic itself changed," not a per-page timestamp).
- New `frontend/scripts/content-audit.mjs` (46 lines, zero dependencies): strips HTML from
  `seoArticle` + `steps` + `faqs`, prints a per-tool word count sorted ascending, exits non-zero if any
  tool is under `--min` (default 400).

## What was deliberately NOT changed

- No `steps`, expanded articles, dates, or FAQs written for any tool other than `merge-pdf` — the other
  29 belong to tasks 012–017.
- No `updated` date set on any tool whose copy was not actually edited today — the renderer's `tool.updated
  && (...)` guard already handles the absent case, so omitting the field costs nothing.
- The FAQ section, Related Tools grid, and `seoArticle` fallback paragraph — all present, untouched
  beyond the margin-class change needed for the date line.
- No CSS class, colour, heading level, or layout changed beyond what the paragraph consolidation and the
  new conditional date line required.
- `frontend/src/views/ToolPage.jsx` — not touched.
- `TOOLS` array shape — two optional fields added (`steps`, `updated`), nothing renamed or removed.
- `changeFrequency` / `priority` values in `sitemap.ts` — untouched.
- No npm package installed for the script or HTML stripping — a `<[^>]*>` regex is enough.

## Why

`content-audit.mjs` reads `tools.js` the same way `indexnow.mjs` does (task 006): transform `export
const` → `const`, write to a temp `.cjs`, `require()` it. Same root cause as before — the file uses ESM
syntax in a package with no `"type": "module"`, so a plain `import()`/`require()` throws on the bare
`export` keyword. Reusing the established pattern rather than inventing a second way to read the file.

The `Last updated` line's `<!-- -->` in the rendered HTML (visible when grepping the raw markup) is
React's SSR hydration boundary comment between two adjacent JSX expression children — invisible to
browsers and crawlers, not a bug. Worth noting because a naive raw-text grep for the literal string
`"Last updated: July 26, 2026"` fails to match across it; verification below accounts for that.

## Files touched

- `frontend/src/views/ToolSEOContent.jsx` — conditional steps, compressed claims paragraph, conditional date line
- `frontend/src/utils/tools.js` — `merge-pdf` smoke test only
- `frontend/app/sitemap.ts` — per-tool `lastModified`, fallback constant bumped
- `frontend/scripts/content-audit.mjs` (new) — word-count ruler

## Verification

- AC1 `node scripts/content-audit.mjs`: **PASS** — runs with zero dependencies, prints all 30 tools
  sorted by word count, exits **1** (verified via explicit `$?` capture, not through a pipe — piping
  through `head`/`tail` reports the pipe's exit code, not the script's, and the first check attempt made
  exactly that mistake) since all 30 are currently under 400. `merge-pdf` shows `article 78, steps 53,
  faqs 53` — confirms `steps` is being counted, proving the mechanism works end to end.
- AC2 build + `/tool/merge-pdf`: **PASS** — compiled, 73/73 pages. Real server-rendered DOM (isolated
  from the RSC hydration-payload script, which duplicates page text as serialized JSON and would produce
  false positives if not excluded) contains both new `steps` sentences and
  `Last updated: <!-- -->July 26, 2026`.
- AC3 `/tool/split-pdf`: **PASS** — real DOM contains the original generic 4-step fallback text and
  **zero** occurrences of "Last updated" (counted only within the DOM slice before the first hydration
  script, to avoid the same false-positive risk).
- AC4 shared byte-identical text between the two pages: **PASS** — isolated each page's `ToolSEOContent`
  section (`How to use` → `Related Tools`), stripped tags, and diffed word sequences with
  `difflib.SequenceMatcher`: **57 shared words** (≤ 60), almost entirely the single compressed claims
  paragraph and the "Frequently Asked Questions" / "Q:" heading text — exactly what should be shared,
  down from the audit's measured ~200-word boilerplate.
- AC5 sitemap: **PASS** — `/tool/merge-pdf` shows `<lastmod>2026-07-26T00:00:00.000Z</lastmod>` matching
  its `updated` value; `grep -c "2026-06-22"` across the built `sitemap.xml` returns **0**.
- drift-check: **no drift** — the four Expected files exactly (plus this session's standing `.thekedar/`
  bookkeeping, not code). (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed
  in this project.)

## Follow-ups

- None from this task. Tasks 012–017 replace `merge-pdf`'s smoke-test `steps` with the real version and
  add `steps`/`updated`/expanded articles to the other 29 tools, using `content-audit.mjs` as their
  shared acceptance ruler.
