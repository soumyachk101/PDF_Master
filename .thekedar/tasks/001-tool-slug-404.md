# Task 001 — Invalid tool slugs must return HTTP 404

**Status:** DONE
**Depends on:** none
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

`/tool/<any-invalid-slug>` returns HTTP 404 and renders the existing `app/not-found.jsx`, instead of
today's HTTP 200 + "Tool Not Found" body + `<meta name="robots" content="index, follow">`. This closes
an unbounded indexable soft-404 URL space — the single most damaging defect in the audit.

## In scope

- `frontend/app/tool/[toolSlug]/page.jsx`: make unknown slugs 404.
  Preferred fix (one line, no import): `export const dynamicParams = false;` — the 30 slugs are fully
  known at build time via the existing `generateStaticParams`, so anything else should never render.
  Fallback if the deploy target behaves differently: `import { notFound } from 'next/navigation'` and
  call `notFound()` at the top of `ToolRoute` when `getToolBySlug()` returns null.
- Belt-and-braces: the `if (!tool)` branch in `generateMetadata` also returns
  `robots: { index: false, follow: false }`.

## NOT in scope (the fence — do not cross)

- Do NOT touch `generateStaticParams` or the `TOOLS` array — the slug list is correct.
- Do NOT modify `frontend/app/not-found.jsx`; its design and copy are fine as-is.
- Do NOT change the metadata returned for **valid** tools (title/desc/canonical/OG all stay byte-identical).
- Do NOT touch `ToolPage.jsx` or `ToolSEOContent.jsx`.
- Do NOT add redirects, fuzzy slug matching, or a "did you mean" suggestion — a 404 is the correct answer.

## Acceptance criteria

- [ ] `npm run build` in `frontend/` succeeds and still prerenders 30 `/tool/*` pages
- [ ] Against a production build (`npm run build && npm run start`), `curl -sI http://localhost:3000/tool/not-a-real-tool` returns `HTTP/1.1 404`
- [ ] That same response body contains no `content="index, follow"` and no `content="index,follow"`
- [ ] `curl -sI http://localhost:3000/tool/merge-pdf` still returns `HTTP/1.1 200` and its HTML still contains `<link rel="canonical" href="https://www.docshift.tech/tool/merge-pdf"`

## Expected files

- `frontend/app/tool/[toolSlug]/page.jsx` (modify)

## Notes

Root-cause fix, not a symptom patch: the same `if (!tool)` hole exists in both `generateMetadata` and
`ToolRoute`. `dynamicParams = false` short-circuits both before either runs, which is why it is the
preferred option. Verify the 200-path is untouched — that is the only regression risk.
