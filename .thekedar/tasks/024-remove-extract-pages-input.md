# Task 024 — Real page-picker input for remove-pages and extract-pages

**Status:** DONE (see notes)
**Depends on:** none
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, express, node

## Objective

`remove-pages` and `extract-pages` currently submit with no page-selection data at all, so every real
use is either a silent no-op (`remove-pages` — `pdf.service.js:950-960` removes nothing) or always
returns page 1 only (`extract-pages` — `pdf.service.js:122` defaults `indicesToCopy = [0]`). Give both
tools a real page-range text input, wired the same way `split-pdf`'s existing `splitRanges` field
already is (`ToolPage.jsx:302-345`), so the params these tools' backend functions already accept
correctly actually get sent.

## In scope

- `frontend/src/views/ToolPage.jsx`: two new state vars (e.g. `removePagesInput`, `extractPagesInput`),
  two new conditional UI blocks mirroring the existing `tool.slug === 'split-pdf'` block at lines
  ~302–345 (same input styling/classes, same "e.g., 1-3, 5, 7-10"-style placeholder — adapt copy per
  tool: remove-pages picks pages *to delete*, extract-pages picks pages *to keep*). Quick-select preset
  buttons are optional — split-pdf has them, they are not required here; add only if trivial, don't let
  them grow this task.
  Wire both into `handleSubmit`'s `additionalData` block (~line 107 onward): `additionalData.pages` for
  `remove-pages` (matches `pdf.controller.js`'s `removePages` destructuring `{ pages }`), and
  `additionalData.ranges` for `extract-pages` (matches `extractPdf`'s existing `ranges` param — already
  wired correctly server-side, this field name is not new).
- `backend/src/services/pdf.service.js`: `exports.removePages` (line 944) currently parses
  `pagesToRemoveString` as comma-separated single integers only (`.split(',').map(Number)` — no `-`
  range support, unlike `extractPdf`). Extract the range-parsing logic already inside `exports.extractPdf`
  (lines 106–120: handles both `"N"` and `"N-M"` comma-separated parts) into one small shared helper in
  this file (e.g. `parsePageRanges(rangeString, totalPages)` returning a sorted, deduped array of
  0-indexed pages), and have **both** `extractPdf` and `removePages` call it. This part is required, not
  a nice-to-have: without it, a user typing `"3-7"` into the new remove-pages input silently removes
  nothing — exactly the class of silent-failure bug this whole phase exists to eliminate. The two
  sibling tools must accept identical input syntax.

## NOT in scope (the fence — do not cross)

- Do NOT build a visual thumbnail/page-picker UI for these two tools. `hasThumbnails: true` is set on
  both in `tools.js` but is unused dead config (zero consumers anywhere in `ToolPage.jsx`, confirmed by
  grep) — a text range input is the deliberate, scoped fix here, not a thumbnail grid. Leave the flag
  as-is; do not repurpose or remove it.
- Do NOT touch `split-pdf`'s own UI block, state, or behavior.
- Do NOT change `pdf.controller.js`'s `removePages`/`extractPdf` — they already destructure the correct
  body fields (`pages`, `ranges`); only the service-layer parsing changes.
- Do NOT rewrite `tools.js` copy (`shortDesc`, `seoArticle`, `faqs`, `steps`) for either tool — that is
  explicitly deferred content work, not this task.
- Do NOT change `removePages`'s or `extractPdf`'s existing 1-indexed, comma-separated public contract —
  only add range (`-`) support on top of what already works.

## Acceptance criteria

- [ ] Uploading a multi-page test PDF to `remove-pages` with input `"2-3"` returns a PDF with those pages
  actually removed (verify page count and content before/after).
- [ ] Uploading the same PDF to `extract-pages` with input `"2-3"` returns a 2-page PDF containing
  exactly original pages 2 and 3, not page 1.
- [ ] `extractPdf` and `removePages` both call the same shared range-parsing helper — `grep` shows one
  definition and two call sites, not duplicated parsing logic.
- [ ] `npm run build` (frontend) succeeds; both new input blocks render only on their respective tool
  page and do not appear on `split-pdf` or any other tool.

## Notes

**Both subtrees need pushing.** This task touches both `frontend/` (mirrored to `PDF_Master_Frontend` via
git remote `frontend_repo`) and `backend/` (mirrored to `PDF_Master_Backend` via git remote
`backend_repo`) — both confirmed present in `.git/config` alongside `origin` (→ `PDF_Master`). Commit in
this monorepo first, then `git subtree push` each touched prefix to its remote, the same way this
session's frontend work was pushed (`git log --oneline origin/frontend-split -1` and `git remote -v` show
the existing remotes/branch shape if the exact prior command needs rediscovering in a fresh session).
Render (backend) and Vercel (frontend) both deploy from the split repos, not from this monorepo —
skipping either push means that half of the fix never reaches production.

Backend param naming is intentionally asymmetric (`pages` for remove, `ranges` for extract) because
that's what the existing, unchanged controller/service functions already destructure — match the existing
contract rather than renaming it to be tidy.

This is the smallest and least risky of Phase 5's tasks and has no dependencies — good first pick.

## Execution note

Built and verified 2026-07-27. Full change record, verification detail (including the redaction text-extraction test and the empirically-confirmed PyMuPDF coordinate system): see `.thekedar/changes/task-024-to-031-phase5.md`.
