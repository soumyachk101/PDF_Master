# PROJECT_STATE

> Single source of truth for this project's Thekedar workflow.
> Contract: a fresh session must be able to resume correctly from this file alone.
> Updated by the orchestrator after every task. Keep it terse.

## Project overview

DocShift — 30 free browser-based PDF tools (files never leave the browser). Next.js 15.3 App Router in `frontend/`, Express backend in `backend/`, live at https://www.docshift.tech (canonical host = www).
Current goal: take SEO from "good on-page" to top-notch — per-tool keyword targeting, structural content gaps, schema, GEO/AI-search, and the assets that make backlinks acquirable.

## Current phase

Phase 1 — Technical correctness · **review** (all 7 tasks committed; paused for user checkpoint per agreed cadence)

## Phases

<!-- Phase N — name · tasks NNN–NNN · planned | building | done -->
- Phase 0 — Audit & plan · no task files · **done** (6 specialist audits → `.thekedar/AUDIT_FINDINGS.md`, 23 tasks planned)
- Phase 1 — Technical correctness · tasks 001–007 · **done, pending user checkpoint**
- Phase 2 — Keyword realignment & schema · tasks 008–010 · planned
- Phase 3 — Content depth · tasks 011–017 · planned
- Phase 4 — Hubs, comparison, link assets · tasks 018–023 · planned

## Active task

none — Phase 1 closed, waiting on user go-ahead for Phase 2

## Done

<!-- newest last -->
- 001 — Invalid tool slugs return HTTP 404 · `5b041b9`
- 002 — Signature fonts via next/font · `9b820ad`
- 003 — Long-cache unhashed public/ assets · `c0d518a`
- 004 — Real 1200×630 OG images via file convention · `b70711a`
- 005 — Real PNG apple-touch-icon · `285adc5`
- 006 — IndexNow key, CCBot unblock, honest llms.txt · `669d95c`
- 007 — Intro splash shortened + audit-tool skip · `8cbf37b`

## Up next

- 008 — Retarget the 8 high-ROI tools (Phase 2)

## Decisions log (append-only)

<!-- Date — decision — one-line why. Never delete entries. -->
- 2026-07-26 — Canonical host stays `www.docshift.tech` — apex already 308-redirects to www and every canonical/OG/sitemap URL uses www; flipping it now would churn every URL for no gain. Note: `SEO_AUDIT_REPORT.md` claims the opposite (www→apex); that doc is stale and should be corrected, not followed.
- 2026-07-26 — No paid SEO APIs configured (no DataForSEO / Moz / GSC / GA4). All keyword and backlink numbers are free-source estimates and must be labelled as such. Never fabricate metrics.
- 2026-07-26 — No fabricated ratings/reviews. `aggregateRating` schema is off the table until real user ratings exist — fake review markup risks a manual action.
- 2026-07-26 — **Q1 answered (task 021): comparison pages use the architecture axis only.** iLovePDF and Smallpdf may be named, but the sole permitted claim about them is server-side upload vs in-browser processing. No pricing, limits, watermarks, retention or feature tables — there is no verified source for any of it.
- 2026-07-26 — URL shape for 021 is `/alternatives/[slug]` with exactly two hand-written slugs (`ilovepdf`, `smallpdf`). Orchestrator's call. More pages under option (a) would be near-duplicate thin content.
- 2026-07-26 — **No LICENSE file is being added.** `llms.txt` wording softens from "Open source" to "source code is public on GitHub" and the link repoints from the profile to `github.com/soumyachk101/PDF_Master`. Owner's decision; revisit if awesome-selfhosted/awesome-privacy listings become a priority, as both require a licence.
- 2026-07-26 — **CCBot gets unblocked** in `robots.ts`, reversing the earlier decision recorded in that file's comment. Two independent audits converged: the Common Crawl zero is why no free backlink tool can see the site, and CCBot costs nothing for a discovery-first project.
- 2026-07-26 — Execution cadence: pause after each phase for review. Tasks auto-continue *within* a phase.

## Deferred with reasons (do not re-litigate without new information)

- `favicon.ico` — SVG favicon is accepted by every current browser and by Googlebot.
- `SearchAction`/sitelinks searchbox — Google retired the rich result Nov 2024, and wiring `?q=` into `HomePage.jsx` would be a functional UI change for zero SEO value.
- `HowTo` schema — deprecated Sept 2023; the visible `<ol>` steps are already crawlable.
- `Article`/`BlogPosting` schema — requires publish/modified dates that do not honestly exist yet.
- A `/blog` — the three hubs plus comparison pages close every gap the audit named. Add one when there is a second thing to publish.
- IndexNow auto-ping on build — would fire on every preview deploy and burn quota. Manual `npm run indexnow` only.

## Needs a human — cannot be verified in this environment

The Chrome extension is not connected, so no browser-based check was possible. These are the acceptance
criteria that were written but not executed. Each is low-probability, but none is *verified*:

- **Task 002** — `/tool/sign-pdf`: type a name and confirm the four signature previews render in four
  visibly distinct cursive faces. (Verified indirectly: all four families served with distinct woff2 files.)
- **Task 005** — the 180×180 apple-touch-icon has not been seen on a real iOS home screen. Dimensions,
  format and markup are verified; legibility of the wordmark at that size is not.
- **Task 007** — three of four criteria: splash gone within 700ms of hydration (measured), reload does not
  re-show it, and `navigator.webdriver` forced true renders nothing. (Verified indirectly: every constant
  and both guards are present in the shipped bundle.)
- **Task 006** — the IndexNow ping has never been sent. Run `npm run indexnow` **after** deploying, once
  the key file is live at `https://www.docshift.tech/f4ebcfecf43c89c997f6109b9c2f5184.txt`.
- Re-run PageSpeed Insights after deploy to confirm the splash is gone from the filmstrip.

## Owner actions outside the codebase

- **Three GitHub repos are wasting free DR-96 links.** `PDF_Master`, `PDF_Master_Backend`,
  `PDF_Master_Frontend` all have no description, no topics, and a `homepage` field pointing at a stale
  `*.vercel.app` URL instead of `docshift.tech`. Fixable only in GitHub's UI.
- **Verify indexing in GSC URL Inspection.** The backlink audit could not check Google directly (anti-bot
  interstitial); every other free source showed the site as invisible. This is the one real gap in that data.
- Directory submissions (OpenAlternative, SaaSHub, Fazier, Uneed, TinyLaunch, BetaList, Show HN, Product
  Hunt, `awesome-privacy` PR) — verified-live URLs are in `.thekedar/AUDIT_FINDINGS.md` §F. Manual work.

## Known issues / follow-ups

- ~~`layout.jsx` OG image size lie~~ — **fixed, task 004**.
- ~~`apple-touch-icon` pointing at an SVG~~ — **fixed, task 005**. `favicon.ico` deliberately deferred.
- `app/sitemap.ts` hardcodes `lastModified` to 2026-06-22 — stale vs content edited in July 2026.
  **Still open.** Task 011 introduces a per-tool `updated` field for the sitemap to read from, so this is
  deliberately deferred to Phase 3 rather than patched with another hardcoded date.
- **The PDF signature does not match its preview.** `backend/src/services/pdf.service.js:602` maps
  `font-dancing` → `HelveticaOblique` and `font-alex` → `TimesRomanItalic`, so picking "Elegant Cursive"
  produces oblique Helvetica in the signed PDF. Found while tracing task 002; out of scope there (tool
  functionality, explicitly fenced off). Real UX defect, deserves its own task.
- No `/blog`, `/guides`, or comparison routes exist. `SEO_OFFPAGE_PLAYBOOK.md` Phases 2–3 are written but never built — these are the assets that make links acquirable.
- Site-wide `WebSite` schema is bare (name + url only); no `SearchAction`, no `publisher`.
- Four overlapping SEO docs at root and in `frontend/` (`SEO_AUDIT_REPORT.md`, `SEO_OFFPAGE_PLAYBOOK.md`, `frontend/SEO_IMPROVEMENTS_PLAN.md`, `frontend/seo-report.md`) — at least one contains a stale claim. Consolidate at the end.
