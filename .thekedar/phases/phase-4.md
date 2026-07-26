# Phase 4 — Hubs, comparison content & link-earning assets

**Status:** planned
**Tasks:** 018–023

## Goal

The three missing cluster hubs exist and pull the 10 orphaned convert tools out of their
one-inbound-link hole; the site finally has a page that answers "is X a safe alternative"; and the
assets that make backlinks *acquirable* are shipped. No task here acquires a link — that is manual
human outreach, out of scope for code.

## Task list

- [ ] 018 — hub-convert-pdf — `/convert-pdf` cluster hub for all 10 conversion tools
- [ ] 019 — hub-free-pdf-tools — `/free-pdf-tools` hub on the free/no-signup/no-watermark angle
- [ ] 020 — hub-pdf-security-guide — `/pdf-security-guide` educational hub
- [ ] 021 — comparison-alternatives — competitor comparison pages **[BLOCKED — Q1]**
- [ ] 022 — llms-full-txt — single-fetch `llms-full.txt` generated from `tools.js`
- [ ] 023 — about-eeat-person-schema — real author bio + Person/AboutPage schema

## Exit criteria

- [ ] All three hubs return 200, are in `sitemap.xml`, and are linked from the footer
- [ ] Every one of the 30 tools has ≥ 2 inbound internal links from non-footer content
- [ ] `/llms-full.txt` returns 200 with every tool's copy in one response
- [ ] All tasks DONE or explicitly deferred

## Notes

- **Q1 gates task 021.** Naming competitors and asserting facts about their products is the one place
  in this project where an agent would have to invent verifiable claims. Do not start 021 until the
  question is answered.
- Hubs 018–020 deliberately name **no** competitors, so they are not gated by Q1.
- `SEO_OFFPAGE_PLAYBOOK.md` Phase 2–4 (outreach, listicle placements, HN/PH launches) stays manual
  human work and gets no task file. These tasks build the pages that outreach can point at.
- Not planned: a `/blog`. Three hubs plus comparison content is the smallest set that closes the
  audit's named gaps. Add a blog only when there is a second thing to publish.
