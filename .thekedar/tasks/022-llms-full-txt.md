# Task 022 — Generated `llms-full.txt`

**Status:** DONE (see notes)
**Depends on:** 017, 020
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

An AI agent can read the entire site in one fetch instead of 35. `/llms-full.txt` is generated at build
time from `TOOLS`, so it can never drift from the tool pages the way a hand-written file would.

## In scope

- New `frontend/app/llms-full.txt/route.ts` — a static Route Handler (`export const dynamic = 'force-static'`)
  returning `text/plain; charset=utf-8`, built from `TOOLS`:
  - the same header block as `llms.txt` (name, one-line summary, the privacy model)
  - for each of the 30 tools, grouped by category: name, URL, `seoDesc`, the `seoArticle` with HTML
    stripped, the `steps`, and every FAQ as `Q:` / `A:` pairs
  - the hub pages from tasks 018–020 with their descriptions
- `frontend/public/llms.txt`: add one line pointing at `https://www.docshift.tech/llms-full.txt`
- `frontend/app/layout.jsx`: add a second `<link rel="alternate" type="text/plain">` for the full file,
  alongside the existing `llms.txt` link
- `frontend/app/robots.ts`: no change needed — confirm `/llms-full.txt` is not caught by an existing
  `Disallow` and note the confirmation in the task report

## NOT in scope (the fence — do not cross)

- Do NOT hand-write the tool content into a static file. It must be generated from `tools.js`, or it
  goes stale the first time anyone edits a tool.
- Do NOT rewrite, restructure or regenerate the existing `frontend/public/llms.txt` — one added line only.
- Do NOT change `frontend/src/utils/tools.js` in any way.
- Do NOT add content to `llms-full.txt` that does not exist on the site. It is a serialisation of
  existing pages, not a new place to write copy.
- Do NOT include the backend, API routes, `/pdf-preview`, or anything under a `Disallow` rule.
- Do NOT install a markdown or HTML-parsing dependency; a regex strip of `<[^>]*>` is sufficient.
- Do NOT create `llms.txt` variants for individual tools.

## Acceptance criteria

- [ ] `npm run build` succeeds; on a running build `curl -s http://localhost:3000/llms-full.txt` returns 200 with `content-type: text/plain`
- [ ] The response contains all 30 tool slugs and, for a spot-checked tool, its full article text and every FAQ question
- [ ] The response contains no HTML tags (`grep -c '<[a-z/]' ` returns 0)
- [ ] `frontend/public/llms.txt` contains exactly one new line referencing `llms-full.txt`, and the rest of the file is byte-identical to before
- [ ] Built `/` HTML contains two `<link rel="alternate" type="text/plain">` tags

## Notes

Depends on the content tasks so the file ships with the expanded copy rather than the 143-word version.
Route Handler rather than a `public/` file specifically so it regenerates on every build — the same
reason the sitemap is generated rather than checked in.

## Execution note

Built and verified 2026-07-27. Full change record, verification detail, and deviations from spec: see `.thekedar/changes/task-018-to-023-phase4.md`.
