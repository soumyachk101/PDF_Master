# Task 027 — Frontend: drag-to-reorder + delete UI for organize-pdf

**Status:** DONE (see notes)
**Depends on:** 025, 026
**Risk:** medium
**Estimated size:** M
**Stack tags:** nextjs, react, framer-motion

## Objective

Give `organize-pdf` the visual reorder/delete UI `hasThumbnails: true` has implied since before this
project's tool-content phases, wired to task 026's real backend endpoint.

## In scope

- On file selection for `tool.slug === 'organize-pdf'`, call task 025's `POST /api/pdf/thumbnails` once
  (e.g. in a `useEffect` keyed on `selectedFiles`) and store the result as local page-order state: an
  array of `{ originalIndex (1-based), thumbnail }` objects, initialized in original order.
- Render that array as a draggable grid/list using **`framer-motion`'s `Reorder.Group` / `Reorder.Item`**
  — already a project dependency (`framer-motion` is used extensively elsewhere in this exact file via
  `motion`/`AnimatePresence`) — do **not** add a new drag-and-drop package (no `dnd-kit`, no
  `react-beautiful-dnd`). `Reorder.Group`'s standard shape is a single-axis vertical list; if a
  multi-column thumbnail grid feels unreliable to drag within, fall back to a simple vertical
  one-row-per-page layout (drag handle + thumbnail + delete button per row) — a correct list beats a
  janky grid.
- A delete (×) button per item that removes it from the array (local state only, no backend call).
- On submit, compute `additionalData.order` as the current array's `originalIndex` values, comma-joined,
  in on-screen order (deleted pages are simply absent — they were already removed from the array).
- A loading state while thumbnails are being fetched, and a clear fallback message if the fetch fails
  (e.g. file too large/corrupted) — don't leave the user staring at a blank box with no explanation.

## NOT in scope (the fence — do not cross)

- Do NOT implement per-page rotation in this task (see task 026's matching fence).
- Do NOT touch any other tool's UI block, or `DropzoneArea.jsx`'s core drop behavior.
- Do NOT add a new drag-and-drop dependency — see above.
- Do NOT rewrite `tools.js` copy for `organize-pdf`.
- Do NOT change how thumbnails are generated server-side — that's task 025, already done by the time
  this task starts.

## Acceptance criteria

- [ ] Dropping a multi-page PDF on `/tool/organize-pdf` shows one thumbnail per page (or the first
  `MAX_THUMBNAIL_PAGES` pages, per task 025's cap) within a few seconds.
- [ ] Dragging a thumbnail to a new position visibly reorders the list; clicking a delete button removes
  that page from the list without disturbing the others' relative order.
- [ ] Clicking "Process" submits `order` reflecting the exact on-screen sequence (verify via network
  inspector, not a guess) and the downloaded PDF matches — pages in the order shown, deleted pages absent.
- [ ] `npm run build` succeeds; no other tool page shows this reorder grid.

## Notes

Frontend-only task; only `frontend_repo` needs a subtree push (see task 024's Notes for the mechanics).

Reuses task 025's response shape but doesn't need the Y-flip coordinate math described in that task's
Notes — that only matters for tasks 029/031, which draw *onto* a thumbnail rather than just displaying and
reordering it.

## Execution note

Built and verified 2026-07-27. Full change record, verification detail (including the redaction text-extraction test and the empirically-confirmed PyMuPDF coordinate system): see `.thekedar/changes/task-024-to-031-phase5.md`.
