# Task 002 — Move signature fonts to next/font, delete the in-body `<link>`

**Status:** TODO
**Depends on:** none
**Risk:** medium
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

The Sign PDF signature-style picker keeps its exact four typefaces, but they load through
`next/font/google` instead of a render-blocking `<link rel="stylesheet">` illegally rendered inside
`<body>` at `frontend/src/views/ToolPage.jsx:651`.

## In scope

- New `frontend/src/utils/signatureFonts.js`: four `next/font/google` loaders at module scope for
  **Dancing Script (600), Great Vibes (400), Alex Brush (400), Caveat (700)** — the only four actually
  referenced at `ToolPage.jsx:680-683` and `:722-725`. Each loader uses
  `display: 'swap'`, `preload: false`, `subsets: ['latin']`. `preload: false` matters: these are
  decorative fonts used by one branch of one tool, they must not be preloaded on the other 29 pages.
- Drop **Reenie Beanie** and **Sacramento** — the current `<link>` requests them and nothing uses them.
- `frontend/src/views/ToolPage.jsx`: delete the `<link>` element; swap the two `fontFamily:
  "'X', cursive"` sites to use the `.style.fontFamily` (or `.className`) from the new module.

## NOT in scope (the fence — do not cross)

- Do NOT change the four visible style names ("Elegant Cursive", "Calligraphy", "Classic Script",
  "Modern Hand"), their `id` values, or the option order — these are persisted UI state.
- Do NOT change signature drawing, placement, sizing, or PDF-embedding logic anywhere in `ToolPage.jsx`.
- Do NOT add these fonts to `frontend/app/layout.jsx` — that would load them on all 30 tool pages.
- Do NOT touch the three existing layout fonts (Inter, Bebas Neue, IBM Plex Mono).
- Do NOT touch the `<link rel="preconnect">` tags in `layout.jsx` (they serve the layout fonts).

## Acceptance criteria

- [ ] `grep -r "fonts.googleapis.com/css2" frontend/src frontend/app` returns no results
- [ ] `npm run build` succeeds; the built `/tool/sign-pdf` HTML contains no `<link rel="stylesheet">` inside `<body>`
- [ ] On a running build, `/tool/sign-pdf` renders all four signature-style previews in four visibly distinct cursive faces (manual check, screenshot in the task report)
- [ ] The built `/tool/merge-pdf` HTML contains no preload for Dancing Script / Great Vibes / Alex Brush / Caveat

## Notes

`next/font` loaders must be called at module scope with literal arguments — that is why they go in
their own module rather than inline. The only regression risk is the signature preview silently
falling back to a system cursive; the third acceptance criterion is a visual check for exactly that.
