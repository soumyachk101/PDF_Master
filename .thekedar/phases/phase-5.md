# Phase 5 — Real tool fixes

**Status:** done — all 8 tasks built and verified 2026-07-27 (Q1: PyMuPDF/AGPL accepted; Q2: text+freehand accepted)
**Tasks:** 024–031

## Goal

Four tools this project's SEO phases deliberately left broken and only patched in copy (`redact-pdf`,
`organize-pdf`, `edit-pdf`) or left silently non-functional (`remove-pages`, `extract-pages`) get real,
working implementations — no fabricated capability, no black-box-over-live-content redaction, no
unscoped "full editor" for edit-pdf. This is engineering work, not content work; none of these tasks
touch `tools.js` copy.

## Task list

- [x] 024 — remove-extract-pages-input — real page-range input for both tools (frontend + a small shared
  backend parsing fix)
- [x] 025 — page-thumbnails-endpoint — shared backend thumbnail-rendering endpoint (used by 027/029/031)
- [x] 026 — organize-pdf-backend — real reorder/delete engine, replaces the rotate-alias
- [x] 027 — organize-pdf-frontend — drag-to-reorder + delete UI (depends on 025, 026)
- [x] 028 — redact-pdf-backend — real content-removing redaction engine (Q1: PyMuPDF, AGPL accepted)
- [x] 029 — redact-pdf-frontend — region-marking UI (depends on 025, 028)
- [x] 030 — edit-pdf-backend — minimal text+freehand annotation engine (Q2: text+freehand, as proposed)
- [x] 031 — edit-pdf-frontend — text+freehand annotation canvas (depends on 025, 030)

## Exit criteria

- [x] `pdf.routes.js` has zero remaining `// MVP: ... as placeholder`-style aliases among these four tools
- [x] `remove-pages`/`extract-pages` actually act on user-selected pages, not silent defaults
- [x] `redact-pdf`'s output has verifiably no extractable original content in a marked region — verified
  via an independent extractor (Ghostscript), not PyMuPDF checking its own work
- [x] `organize-pdf` actually reorders/deletes pages; `edit-pdf` actually adds real text/freehand marks
- [x] Every task that touched `backend/` and `frontend/` had both subtrees pushed to `PDF_Master_Backend`
  and `PDF_Master_Frontend` (see task 024's Notes) — see `.thekedar/PROJECT_STATE.md` for the commit/push
  record

## Notes

- **Q1 gates task 028** (and transitively 029, which has nothing real to submit to until 028 lands):
  PyMuPDF (AGPL/commercial-licensed, true content-stream redaction) vs. a zero-new-dependency
  rasterize-affected-pages-only fallback. See task 028 for the full tradeoff and this plan's recommended
  default (Option A, if the AGPL dependency is acceptable).
- **Q2 gates tasks 030 and 031**: confirm or amend "text boxes + freehand only" as `edit-pdf`'s v1 scope
  before either task starts. Unlike Q1/028-029, both the backend AND frontend task's in-scope content are
  directly written around this specific answer, not just their start time.
- Tasks 024, 025, 026 have no blockers and no cross-dependencies on each other — buildable immediately, in
  any order, in parallel with Q1/Q2 being decided.
- A new shared endpoint (task 025) exists because three of these four fixes independently need to show
  page previews before the user can act (reorder, mark a redaction region, place an annotation) — one
  endpoint, three consumers, instead of three near-identical ones.
- No content/copy task is included here on purpose. Once these ship, `tools.js`'s copy for these tools
  (already honestly hedged, per `PROJECT_STATE.md`'s CRITICAL section) can likely be *strengthened* to
  describe real capability — that's a follow-up content task, deliberately not bundled into this
  engineering phase.
