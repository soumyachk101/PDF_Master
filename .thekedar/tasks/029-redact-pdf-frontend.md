# Task 029 — Frontend: region-marking UI for redact-pdf

**Status:** DONE (see notes)
**Depends on:** 025, 028
**Risk:** medium
**Estimated size:** S
**Stack tags:** nextjs, react

## Objective

Let the user actually mark what to redact, feeding task 028's real engine. No such UI exists today
(confirmed: zero `redact-pdf` special-casing anywhere in `ToolPage.jsx`; no password field, no
text-selection UI, `additionalData.password` is set only for `protect-pdf`).

## In scope

- On file selection for `tool.slug === 'redact-pdf'`, fetch thumbnails from task 025's
  `POST /api/pdf/thumbnails` (same call as task 027's organize-pdf — share the fetch logic in a small
  helper/hook if that's genuinely less code than duplicating it; don't force a shared abstraction if it
  ends up being more code than the duplication would have been).
- Render each page's thumbnail with an overlaid drawable surface (a `<canvas>` or an absolutely-positioned
  div sized to match the thumbnail) so the user can drag out one or more rectangles per page. Support
  removing a drawn rectangle (click it, or a small per-rectangle delete control).
- On submit, convert every drawn rectangle from on-screen pixel coordinates to the PDF point-space
  contract task 028 expects (`{ page, x, y, width, height }`), using each page's `width`/`height` from the
  thumbnails response and **the Y-flip described in task 025's Notes** — verify empirically (draw a
  rectangle near the top of a page, confirm the resulting PDF's black box is actually near the top, not
  the bottom) before considering this done. Serialize as `additionalData.regions = JSON.stringify(...)`.
- Require at least one drawn region before submit is allowed — block with a clear message otherwise,
  mirroring how `crop-pdf`'s and `sign-pdf`'s existing blocks already validate before calling
  `processFiles` (`ToolPage.jsx`'s `handleSubmit`, e.g. the `setLocalError(...); return;` pattern at
  lines ~122–124 and ~134–136).

## NOT in scope (the fence — do not cross)

- Do NOT implement text-selection-based redaction ("select text to redact" rather than draw a box) — the
  existing (now-corrected) copy already had this fabricated as a UI mode that never existed; drawing a
  rectangle over a rendered page image is the scoped mechanism for this task, not text selection.
- Do NOT touch task 028's backend contract — if the region shape needs to change, that's a two-task
  conversation, not a silent frontend-side reinterpretation.
- Do NOT rewrite `tools.js` copy for `redact-pdf`.
- Do NOT add a new canvas/drawing library — a plain `<canvas>` 2D context (pointer events) is sufficient
  for axis-aligned rectangles; this doesn't need `fabric.js`/`konva`/etc.

## Acceptance criteria

- [ ] Dropping a PDF on `/tool/redact-pdf` shows thumbnails and lets the user drag out a rectangle on any
  page.
- [ ] Submitting with zero regions drawn is blocked with a clear on-page message, not a silent no-op or a
  server error.
- [ ] Submitting with ≥1 region produces a downloaded PDF where the black box lands in the same visual
  location (same page, same corner/edge proximity) as where it was drawn — confirms the Y-flip was
  applied correctly, not just present.
- [ ] `npm run build` succeeds; no other tool page shows this region-drawing UI.

## Notes

Frontend-only task; only `frontend_repo` needs a subtree push (see task 024's Notes for the mechanics).

This task's own shape doesn't actually depend on *which* option Q1 picked for task 028 — PyMuPDF and the
rasterize-fallback both consume the same `{page, x, y, width, height}` region list. It's blocked on 028
only because there's nothing real to submit to until that task lands, not because this task's own scope
changes either way.

## Execution note

Built and verified 2026-07-27. Full change record, verification detail (including the redaction text-extraction test and the empirically-confirmed PyMuPDF coordinate system): see `.thekedar/changes/task-024-to-031-phase5.md`.
