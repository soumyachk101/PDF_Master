# Phase 2 — Keyword realignment & schema entity graph

**Status:** planned
**Tasks:** 008–010

## Goal

All 17 mis-targeted tools point at a phrase a zero-authority domain can actually win, and the
structured data stops being three disconnected islands. Metadata only — no article rewriting here,
that is Phase 3.

## Task list

- [ ] 008 — retarget-high-roi-tools — retitle the 8 highest-ROI tools from the audit's ROI order
- [ ] 009 — retarget-remaining-tools — retitle the remaining 9 mis-targeted tools
- [ ] 010 — schema-entity-graph — `@id`-linked Organization/WebSite/WebPage graph

## Exit criteria

- [ ] All 30 `seoTitle` values are unique and ≤ 52 characters
- [ ] Every tool named in AUDIT_FINDINGS section C carries its replacement target phrase
- [ ] Every JSON-LD block on a built tool page parses and contains exactly one Organization node
- [ ] All 3 tasks DONE

## Notes

- **Deliberately skipped: `SearchAction` / sitelinks searchbox.** The audit marks it BLOCKED on
  URL-wired search. Google retired the sitelinks searchbox rich result in November 2024, so wiring
  `?q=` into `HomePage.jsx` would be a functional UI change for zero ranking value. Not planned.
- **Deliberately skipped: `HowTo` schema** (deprecated Sept 2023) and `Article`/`BlogPosting`
  (needs publish dates we do not have and must not invent).
- `aggregateRating` is forbidden site-wide until a real review mechanism exists.
