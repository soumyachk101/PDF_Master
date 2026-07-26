# DocShift SEO Audit — consolidated findings (2026-07-26)

Source: 6 parallel specialist audits (technical, keyword-cluster, content, GEO, schema, backlinks).
**No paid SEO APIs were available** (no DataForSEO / Moz / GSC / GA4). Every volume, difficulty and
referring-domain figure below is a free-source directional estimate. Treat as such. Nothing here is fabricated;
where an agent could not verify something it is marked UNVERIFIED.

Full sub-reports: `scratchpad/audit-schema.md`, `scratchpad/audit-keyword-clusters.md`.

---

## A. Technical (live site verified by curl, no JS)

**Good news first — the thing that would have been fatal is fine:**
Tool page `seoArticle` + FAQ text IS in the raw server HTML. `ToolSEOContent.jsx` has no `'use client'`,
so it prerenders as a Server Component via `generateStaticParams`. Verified across 8 tool pages spanning all
categories. Ranking is not at risk from client-side rendering.

| Sev | Location | Issue | Fix |
|---|---|---|---|
| **CRITICAL** | `frontend/app/tool/[toolSlug]/page.jsx` | `/tool/<any-invalid-slug>` returns **HTTP 200** with a "Tool Not Found" body *and* `<meta name="robots" content="index, follow">`. Unbounded indexable soft-404 space. Real top-level 404s behave correctly. | `if (!tool) notFound()` from `next/navigation` at the top of `ToolRoute` — one shared fix covers page + metadata |
| MEDIUM | `frontend/src/views/ToolPage.jsx` ~651 | Unconditional `<link rel=stylesheet href=fonts.googleapis.com/css2?family=Alex+Brush…>` rendered mid-JSX **inside `<body>`** on every `/tool/sign-pdf` load. Invalid tag placement + render-blocking. | Move to `next/font` in `layout.jsx` alongside the other fonts; delete the manual `<link>` |
| MEDIUM | `frontend/src/components/IntroOverlay.jsx` | Full-viewport `z-[99999]` splash blocks content ~600ms–1.25s, gated only by `localStorage`. Every first-time visitor and **every clean-profile Lighthouse/PSI run** eats it, so lab CWV always includes the splash. | Shorten drastically or skip render for first-paint/automated contexts |
| MEDIUM | `frontend/next.config.js` | `public/` assets (favicon.svg, logo.png, hero_graphic.webp, manifest.json) served `max-age=0, must-revalidate`. ETag revalidation works (304 confirmed), so cost is a round-trip per asset per load, not a re-download. | Add a `headers()` rule for those paths → `public, max-age=31536000, immutable` |
| MEDIUM | `frontend/app/layout.jsx` ~60 | OG image declares `logo.png` as 1200×630; file is actually **1024×1024**. Social previews crop wrong. | Ship a real 1200×630 `og-image.png` |
| MEDIUM | `frontend/app/layout.jsx` ~73 | `apple` icon = `favicon.svg`; iOS does not support SVG in that slot. No `favicon.ico`. | Add `apple-touch-icon.png` (180×180) + `favicon.ico` |
| LOW | `frontend/app/sitemap.ts` ~10 | `lastModified` hardcoded to `2026-06-22`; content edited July 2026. | Derive from real content change, or bump on edit |
| LOW | repo-wide | No IndexNow key file, no ping. `/indexnow.txt` → 404. | Add key file + ping on publish (free Bing/Yandex/Naver win) |

**Passing, do not touch:** canonicals match served host + sitemap exactly on all sampled pages · apex→www and
http→https redirect chains correct (308, ≤2 hops) · trailing-slash normalised · HSTS + nosniff + X-Frame-Options
+ CSP frame-ancestors + Permissions-Policy all present · `/_next/static/*` immutable · **zero raw `<img>` tags**
(all via `next/image`) · zero broken internal links, zero orphan tools across all 30 slugs.

**Unverified (flagged, not guessed):** `pdf-preview-page.tsx` image props · `manifest.json` contents ·
22 of 30 tool pages not individually curled · mobile tap-target / overflow checks inconclusive.

---

## B. Content (script-verified against `tools.js`, 30/30 tools)

- **Every one of the 30 tools is under 300 words** of unique copy. Site average **143 words/page**
  (`seoArticle` + FAQs, HTML stripped). Competitors run 300–800. Target: 400.
- Thinnest 10: `protect-pdf` 115 · `split-pdf` 120 · `translate-pdf` 121 · `rotate-pdf` 125 ·
  `page-numbers` 128 · `add-watermark` 129 · `html-to-pdf` 130 · `merge-pdf` 131 · `compress-pdf` 131 ·
  `excel-to-pdf` 132.
- **200 words of byte-identical boilerplate on all 30 pages** = avg **56%** of each page's visible text
  (range 50–62%). The "Why use DocShift?" block ("100% Private & Secure…", "Blazing Fast…", "Zero Installation…"),
  the 4-step "How to use X" list, and the sidebar blocks.
- Inside `seoArticle` prose itself, no 4+ word phrase repeats verbatim across tools (n-gram checked) — the
  articles themselves are genuinely unique. 7/30 share the closing connective "if you need" / "you can also".
- **E-E-A-T — correcting an earlier assumption:** the About page *does* name an author (Soumya Chakraborty +
  GitHub) and Contact lists email/X/GitHub/Discord. Not authorless. But: no bio, no photo, no Person schema,
  no credentials, **no dates anywhere on the site**, no third-party validation of the privacy claim.
- Filler FAQs to replace: `html-to-pdf`, `pdf-to-pptx`, `add-watermark`, `pdf-to-excel`, `sign-pdf`
  (specific replacement questions are in the agent report).

---

## C. Keyword targeting

**14 of 30 tools target the wrong keyword** — mostly generic head terms a zero-authority domain cannot win,
when the tool's own article already earns a thinner, winnable phrase:

| slug | currently targets | should target |
|---|---|---|
| split-pdf | "split pdf online free" (head) | split pdf without uploading files |
| remove-pages | "delete pdf pages online" | delete pdf pages without uploading + remove-vs-extract |
| organize-pdf | generic reorder | reorder pdf pages without uploading |
| scan-to-pdf | "scan to pdf" | scan to pdf **without an app** (rivals here are mobile apps, not browser tools) |
| repair-pdf | "repair corrupted pdf" | the verbatim error string "there was an error opening this document" |
| jpg-to-pdf | generic, no privacy angle | combine jpg images into one pdf without uploading |
| word-to-pdf | vague "secure" | convert word to pdf without uploading document |
| pptx-to-pdf | vague "secure" | convert powerpoint to pdf without uploading presentation |
| excel-to-pdf | generic | convert excel to pdf without uploading **financial data** |
| pdf-to-jpg | generic (rival owns plain no-upload phrasing) | convert pdf to jpg without uploading, high resolution |
| pdf-to-word | hardest head term on the site | convert **scanned** pdf to editable word document free |
| edit-pdf | "edit pdf online free" (unwinnable) | free pdf editor no watermark no sign up |
| redact-pdf | "blackout pdf information" | redact pdf **permanently, not just a black box** |
| sign-pdf | generic, no privacy angle | sign pdf without uploading document |

**Missing cluster hubs** (10 convert tools — a third of the site — have only 1 inbound internal link each):
`/convert-pdf`, `/free-pdf-tools` (alternative-to hub), `/pdf-security-guide`.

Highest-ROI moves, in order: retitle `redact-pdf` and `repair-pdf` (zero content cost, the articles already
say the right thing) → build `/convert-pdf` hub → retarget `html-to-pdf` (genuinely thin SERP, the one tool
where Adobe/iLovePDF/Sejda barely rank) → sharpen `pdf-to-pdfa` toward court e-filing → `scan-to-pdf` "without
an app" → `compare-pdf` (thinnest SERP on the site) → `/free-pdf-tools` hub → `excel-to-pdf` financial-privacy
angle → `/pdf-security-guide` hub.

---

## D. GEO / AI search

- **`llms.txt` is accurate** — spec-compliant, all 30 slugs cross-checked 1:1 against `tools.js`. But:
  - **The "Open source" link points at `github.com/soumyachk101` (a profile), not the actual repo
    `github.com/soumyachk101/PDF_Master` — and that repo has no LICENSE file.** "Open source" as worded is
    an unverifiable claim. Fix the link and add a licence, or soften the wording. This one is correctness,
    not SEO.
  - No `llms-full.txt` — agents currently need 35 separate fetches.
- **Passage citability:** every `seoArticle` mixes its direct answer with 2–4 inline cross-sell links; those
  dangling refs break self-containment when an engine lifts the passage. Fix: one link-free direct-answer
  sentence, then a 100–140 word detail block, with cross-links moved out to the existing "Related Tools"
  component. FAQs are already close to ideal.
- **CCBot: unblock.** It drives no citations, but its dumps feed pretraining for many open models. Blocking
  buys nothing for a discovery-first site.
- **Brand entity ≈ zero.** Honest caveat: the GEO agent had no working search tool — DuckDuckGo returned a
  CAPTCHA, Bing's static HTML carried no organic results, Reddit blocked anonymous API reads. It explicitly
  **retracted** an earlier set of competitor names as hallucinated from the CAPTCHA page. The single clean
  data point: Wikipedia API returns zero hits for "DocShift PDF". Treat brand presence as unproven-but-likely-nil;
  re-check with a real search tool before acting on it.
- Zero `/vs/` or `/alternatives` content exists. For "alternative" and "is it safe to upload" queries, AI
  answers structurally need a page that names competitors and states the differentiator. Biggest single gap.

---

## E. Schema

| Priority | Type | State | Action |
|---|---|---|---|
| **DO NOT ADD** | `aggregateRating` | none, no review mechanism exists | Fabricated ratings = manual-action risk. Only once real reviews exist. |
| HIGH | `WebSite` (layout.jsx) | bare — name + url only | Add description, inLanguage, alternateName, `@id`, publisher→Organization |
| HIGH | entity graph | 3 disconnected nodes; Organization re-inlined 3× per tool page | Give Organization + WebSite an `@id`, reference by `@id` from author/publisher |
| MEDIUM | `WebPage` | absent on 30 tool pages | Add — no fabricated dates needed, unlike Article/BlogPosting |
| LOW | `AboutPage`/`ContactPage` | absent | Optional. Skip privacy/terms — no value. |
| BLOCKED | `SearchAction` | absent | **Genuinely blocked** — homepage search is local `useState` (`HomePage.jsx:60`), no `?q=` URL. Needs URL-wired search first. |
| SKIP | `HowTo` | absent | Deprecated Sept 2023; visible `<ol>` steps already crawlable |
| KEEP | `FAQPage` | live on all 30 | Google retired FAQ rich results, but it still aids AI/LLM citation |
| KEEP | `ItemList` | **already shipped** at `app/page.jsx:33` | Verified present |
| ADD | `Organization.founder` | missing | Real Person, matching existing About/Terms copy |

Live production HTML was confirmed to match repo source exactly — no deploy drift.

---

## F. Backlinks / off-page

**Referring domains: effectively zero.** Confidence ~0.60 that it is 0 to low-single-digits.
Evidence: Common Crawl 0 captures across the last 4 crawl batches · Bing and DuckDuckGo `site:docshift.tech`
0 results (clean, unblocked checks) · Wayback Machine 0 snapshots · Wikipedia API 0 entity hits.
The Google check was blocked by an anti-bot interstitial — **verify indexing yourself via GSC URL Inspection**,
that is the one genuine hole in this method.

**Self-inflicted invisibility — two independent agents converged on this:** the Common Crawl zero is caused by
DocShift's own `robots.txt` (`User-Agent: CCBot / Disallow: /`). It buys nothing (CCBot sends no citations and
no traffic) and costs pretraining presence in many open models plus the free-tool visibility that every
backlink checker depends on. Recommendation: unblock CCBot.

**GitHub repos — three free DR-96 links currently thrown away** (verified live via the GitHub API):

| repo | homepage field | description | licence |
|---|---|---|---|
| `PDF_Master` | `https://pdf-master-red.vercel.app` (stale) | missing | **none** |
| `PDF_Master_Backend` | `https://pdf-master-backend.vercel.app` (stale) | missing | **none** |
| `PDF_Master_Frontend` | `https://pdf-master-frontend.vercel.app` (stale) | missing | **none** |

None point at `docshift.tech`. All three lack a description and topics. Fixing this is a metadata edit, not code.

**Related correctness issue:** `llms.txt:71` claims *"Open source — code on GitHub at
https://github.com/soumyachk101"*. That URL is the **profile**, not a repo, and `PDF_Master` has **no LICENSE
file** (verified: 404 on both `main` and `master`, none in the working tree). With no licence the code is
legally all-rights-reserved, so "open source" is inaccurate as written. Either add a real licence or soften the
wording to "source available" — and fix the link either way. **The licence choice is the user's decision.**

**Verified-live submission targets** (the playbook's list has rotted — these were re-checked today):
OpenAlternative `openalternative.co/submit` (best fit, has a PDF category) · SaaSHub `saashub.com/services/new` ·
Fazier `fazier.com/launch` · Uneed `uneed.best/submit-a-tool` (playbook's `/submit` path now 404s) ·
TinyLaunch · BetaList `betalist.com/submit` (account-gated, not dead) · Toolfinder (low authority, quick win) ·
Show HN · Product Hunt · `awesome-privacy` PR.
**Drop from the playbook:** Slant.co (connection failed, appears dead) and SideProjectors (a project
marketplace, wrong fit).

**Assets that unlock links — this is the actual bottleneck, and it is what the code tasks must build:**
1. Repair the three GitHub repos (description, `homepage` → docshift.tech, topics, LICENSE)
2. Demo GIF/video
3. "vs iLovePDF" / "vs Smallpdf" comparison pages — none exist
4. LICENSE + docker-compose (unlocks `awesome-selfhosted` eligibility)
5. WASM/architecture technical write-up
6. Original research: "what do PDF tools actually upload" — highest link value, highest effort

No penalty-risk tactics were found in the existing playbook; its "what not to do" guidance still holds.

---

## G. Cross-cutting constraints for every task below

1. **Never fabricate**: no invented ratings, reviews, testimonials, dates, credentials, or metrics.
2. **UI/UX and tool functionality stay intact.** SEO work must not alter how the tools behave.
3. Every content change lands in `frontend/src/utils/tools.js` or a view component — the data model is
   already right, do not restructure it.
4. Off-page/backlink work is manual human work. Code tasks can only build the *assets* that make links
   acquirable (comparison pages, guides, a licensed public repo).
