# Change record — Task 002: Signature fonts via next/font

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3

## What changed

The four signature typefaces on `/tool/sign-pdf` now load through `next/font/google` instead of a
`<link rel="stylesheet">` that was being rendered **inside `<body>`** at `ToolPage.jsx:651`. That tag was
invalid placement, render-blocking, and fired on every sign-pdf load regardless of whether the user ever
opened the signature picker.

- New `frontend/src/utils/signatureFonts.js` — four module-scope loaders (Dancing Script 600, Great Vibes
  400, Alex Brush 400, Caveat 700), each `display: 'swap'`, `preload: false`, plus a `SIGNATURE_FONTS` map
  keyed by the same ids the component already uses and a `signatureFontFamily(id)` helper.
- `ToolPage.jsx` — deleted the `<link>`, pointed the four style-picker options at `SIGNATURE_FONTS[id].style`,
  and collapsed the four-branch inline `fontFamily` ternary to `signatureFontFamily(selectedSignatureFont)`.

Two side effects worth naming: **Reenie Beanie and Sacramento are gone** — the old `<link>` requested both
and nothing referenced either. And the fonts are now self-hosted from `/_next/static/media/`, so sign-pdf
makes **zero external font requests**.

## What was deliberately NOT changed

- The four visible style names, their `id` values, and the option order — all persisted UI state, untouched.
- Signature drawing, placement, sizing, and PDF embedding — untouched. Traced the full path first:
  `ToolPage.jsx:138` sends `additionalData.font = selectedSignatureFont`, i.e. the **id string**, and
  `backend/src/services/pdf.service.js:602` maps those ids to pdf-lib `StandardFonts`. The browser-side
  `fontFamily` is preview-only and cannot affect PDF output.
- `layout.jsx` — the signature fonts were deliberately NOT added there; that would load them on all 30 tool pages.
- Inter / Bebas Neue / IBM Plex Mono — the three layout fonts are untouched.
- The `<link rel="preconnect">` tags — they serve the layout fonts and the fence forbade touching them.
  This is why `fonts.googleapis.com` still appears in the sign-pdf HTML; it is preconnect only, not a stylesheet.

## Why

`next/font` loaders must be called at module scope with literal arguments — no spread, no shared options
object — which is why they live in their own module rather than inline in the component. `preload: false`
is the load-bearing choice: these are decorative faces used by one branch of one tool, and preloading them
would have pushed four extra font fetches onto the other 29 tool pages.

## Files touched

- `frontend/src/utils/signatureFonts.js` (new) — four loaders + id map + helper
- `frontend/src/views/ToolPage.jsx` — `<link>` deleted, two usage sites rewired

## Verification

Ran against a clean production build. **Note:** the first verification pass produced a false failure —
a `next start` process from task 001 was still holding port 3000 and serving the previous build (the new
CSS bundle returned 9 bytes against 5697 on disk). All results below are from a confirmed-clean server.

- AC1 `grep -r "fonts.googleapis.com/css2" frontend/src frontend/app`: **PASS** — no results
- AC2 build: **PASS** — compiled, 41/41 static pages, 30 tool routes still SSG
- AC2 stylesheet `<link>` inside `<body>` on `/tool/sign-pdf`: **PASS** — 0
- AC4 signature-font preloads on `/tool/merge-pdf`: **PASS** — 3 `as="font"` preloads, all three are the
  layout fonts; none of the four signature faces is preloaded
- AC3 **NOT VERIFIED AS WRITTEN** — see below
- font delivery proxy: **PASS** — all four families present in the served CSS with distinct `src` URLs
  (Alex Brush 3 faces, Caveat 4, Dancing Script 3, Great Vibes 6 — multiple faces per family is normal
  unicode-range subsetting), 16 distinct woff2 files, each returning `200` with a non-zero body
- external font requests on sign-pdf: **PASS** — zero `fonts.gstatic.com` stylesheet/font fetches
- drift-check: **no drift** — `git status` shows exactly `frontend/src/utils/signatureFonts.js` (new) and
  `frontend/src/views/ToolPage.jsx` (modified), matching Expected files.
  (Manual `git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- **AC3 is unverified.** It requires a human to look at `/tool/sign-pdf`, type a name, and confirm the four
  previews render in four visibly distinct cursive faces. The Chrome extension is not connected in this
  environment, so no browser check was possible. The headless proxy above is strong evidence the fonts are
  delivered, but it cannot prove they *render* distinctly. **Someone should eyeball this before the phase ships.**
- **Unrelated defect found while tracing (NOT fixed, out of scope):** the PDF output does not match the
  preview. `pdf.service.js:602` maps `font-dancing` → `HelveticaOblique` and `font-alex` → `TimesRomanItalic`,
  so a user who picks "Elegant Cursive" gets oblique Helvetica in the actual signed PDF. That is a real UX
  mismatch, but it is tool functionality and this task's fence explicitly barred touching it. Worth its own task.
