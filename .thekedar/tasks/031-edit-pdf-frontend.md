# Task 031 — Frontend: text + freehand annotation canvas for edit-pdf

**Status:** DONE (see notes)
**Depends on:** 025, 030
**Risk:** medium
**Estimated size:** M
**Stack tags:** nextjs, react

## Objective

Give `edit-pdf` a real annotation UI matching task 030's v1 scope (text boxes + freehand pen only),
replacing the current watermark-stamp behavior. **This task's toolbar and interaction model are written
for Q2's text+freehand default — if that answer changes, this task's In-scope section needs to change
with it, not just task 030's.**

## In scope

- On file selection for `tool.slug === 'edit-pdf'`, fetch thumbnails from task 025's
  `POST /api/pdf/thumbnails` (same reuse note as task 029).
- A small toolbar with exactly two tools: **Text** and **Pen**, plus an undo/clear-last action and a
  single color choice (a small fixed swatch set is fine; a full color picker is not required for v1).
- Text tool: click a point on a page thumbnail, type into an inline text input, place it.
- Pen tool: freehand drag across a thumbnail captures a point path (throttle/sample points at a
  reasonable interval — don't record every single `pointermove` event uncapped; that's needless payload
  size and needless `drawLine` segments on the backend).
- On submit, convert every placed text box and stroke to task 030's PDF-point-space annotation contract
  (bottom-left origin, y-up — **the opposite flip direction from task 029's redact regions**, since this
  path stays pure `pdf-lib` rather than PyMuPDF; re-derive the conversion from task 025's Notes, don't
  copy task 029's sign unchanged). Serialize as `additionalData.annotations = JSON.stringify(...)`.
- Require at least one placed annotation before allowing submit (same validation pattern as task 029).

## NOT in scope (the fence — do not cross)

- Do NOT add toolbar buttons for image insertion, shapes, or highlighting — matches task 030's fence.
  Don't let the UI imply capabilities the backend doesn't have.
- Do NOT add a canvas/drawing library (`fabric.js`, `konva`, etc.) — plain `<canvas>` pointer-event
  capture is sufficient for freehand points and text-box placement.
- Do NOT rewrite `tools.js` copy for `edit-pdf`.

## Acceptance criteria

- [ ] Dropping a PDF on `/tool/edit-pdf` shows thumbnails with a Text/Pen toolbar.
- [ ] Placing a text box and submitting produces a downloaded PDF with that text visible in roughly the
  right place on the right page.
- [ ] Drawing a freehand stroke and submitting produces a visible line following the drawn path in the
  same orientation it was drawn in (not vertically mirrored) — confirms the y-flip direction was derived
  correctly for this (non-PyMuPDF) path, not copy-pasted from task 029's opposite convention.
- [ ] Submitting with nothing placed is blocked with a clear message, not silently sent as a no-op edit.
- [ ] `npm run build` succeeds.

## Notes

Frontend-only task; only `frontend_repo` needs a subtree push (see task 024's Notes for the mechanics).

## Execution note

Built and verified 2026-07-27. Full change record, verification detail (including the redaction text-extraction test and the empirically-confirmed PyMuPDF coordinate system): see `.thekedar/changes/task-024-to-031-phase5.md`.
