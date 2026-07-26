# Change record — Phase 4: hubs, comparison pages, llms-full.txt, About E-E-A-T

**Date:** 2026-07-27 · **Tasks:** 018, 019, 020, 021, 022, 023 · **Commit:** (see PROJECT_STATE.md)

## What happened — two task files had premises the FOUNDATIONAL fix had already invalidated

Tasks 018–023 were written before the Phase 3 investigation found that DocShift's "100%
browser-based, files never leave your device" claim was false site-wide (see PROJECT_STATE.md's
FOUNDATIONAL section). Re-reading each task file fresh before implementing (rather than executing
verbatim) surfaced two more places that same false premise had been baked into a *planned* task,
not just already-shipped copy:

- **Task 020** listed "what happens to a file when an online tool uploads it, vs
  browser-local processing" as an explanatory topic to cover, implicitly framing DocShift as the
  browser-local side of that comparison. Rewritten to drop the false dichotomy: the section
  explains that most real PDF operations need server-side libraries, so the honest, useful axis is
  retention (what happens to the file afterward), not location — and states DocShift's actual,
  verified practice (upload, process, delete immediately).
- **Task 023** asked for a bio fact covering "the browser-local architecture decision and why."
  Reframed to the real, verifiable decision: deleting every uploaded file immediately after
  processing rather than storing it, sourced from the About page's own (already-corrected) "How It
  Works" section.
- **Task 021** was the serious one: Q1's answer (2026-07-26) made the *only* permitted claim about
  a named competitor "DocShift processes in the browser, they process on a server" — which is false
  for the DocShift side too. Stopped and asked the user before writing anything (AskUserQuestion,
  same pattern as the FOUNDATIONAL/redact-pdf/organize-pdf stops). **User chose: rebuild without the
  architecture claim entirely** — comparison pages become 100%-DocShift-content, competitors named
  only for search-intent framing (title/intro/one FAQ question), zero comparative assertions about
  them of any kind. This is a stricter bar than Q1's original answer, not a looser one.

A third, smaller pre-existing gap was also caught and fixed while in `Footer.jsx` for task 018's
"add a Guides link" requirement: the copyright bar read "Secure Local Processing" — the same false
claim family, missed by every earlier sweep because it's plain text in the footer bar, not near any
of the phrase patterns those greps targeted. Fixed to "Secure PDF Processing."

## What was built

- **Task 018** — `frontend/app/convert-pdf/page.jsx`. Hub linking all 10 conversion tools
  (`convertTo`/`convertFrom` categories, filtered from `TOOLS`, not hardcoded), split into "PDF to
  another format" / "another format to PDF" sections, a decision-helper paragraph, 4 FAQs,
  `BreadcrumbList` + `CollectionPage` + `FAQPage` JSON-LD. 584 unique words (floor: 500).
- **Task 019** — `frontend/app/free-pdf-tools/page.jsx`. All 30 tools grouped by the 7 real
  `CATEGORIES` (filtered, not hardcoded; the stale `count` field is never read). Every "free" claim
  verified against the app before writing (see Verification below). 537 unique words (floor: 500).
- **Task 020** — `frontend/app/pdf-security-guide/page.jsx`. 5 `<h2>` sections (upload/retention,
  user vs. owner password, redaction vs. black box, visible vs. certificate signature, PDF/A), each
  linking a tool — **except** the redaction section, which deliberately does not link `redact-pdf`
  (see Deviation below). 952 unique words (floor: 700). `WebPage` (not `Article`) + `FAQPage` +
  `BreadcrumbList` JSON-LD, no `datePublished`/`dateModified`.
- **Task 021** — `frontend/app/alternatives/[slug]/page.jsx`, exactly two static params
  (`ilovepdf`, `smallpdf`) via `generateStaticParams` + `dynamicParams = false` (confirmed:
  `/alternatives/foo` → 404). 627 / 609 unique words respectively (floor: 600). Every sentence
  mentioning the competitor name is listed below, per the task's own reporting requirement.
- **Task 022** — `frontend/app/llms-full.txt/route.ts`. Static Route Handler (`dynamic =
  'force-static'`), generated entirely from `TOOLS` + `CATEGORIES` at build time — no hand-written
  tool content. Confirmed: all 30 tool slugs present, zero HTML tags in the output, `text/plain;
  charset=utf-8` content-type.
- **Task 023** — `PERSON_ID`/`personNode` added to `frontend/src/utils/schema.js`;
  `organizationNode.founder` changed from an inline `Person` object to `{ '@id': PERSON_ID }`.
  **Deviation from the task's literal file list**: the task only mentioned emitting the `Person`
  node on `/about`, but `organizationNode.founder`'s `@id` reference needs the full `Person` node
  present in the *same page's* JSON-LD graph to resolve anywhere except `/about` — so `personNode`
  is additionally emitted globally in `frontend/app/layout.jsx`, exactly like `organizationNode`/
  `webSiteNode` already are. Verified only one inline `'@type': 'Person'` object exists anywhere in
  `src`/`app` (in `schema.js` itself). `/about` bio expanded (sourced from the existing "Built By"
  section + the site's own corrected "How It Works" copy — no invented credentials, employer,
  location or dates). `frontend/app/contact/page.jsx` gained `ContactPage` JSON-LD referencing
  `ORG_ID`.

## Shared-file edits (applied once, after all 5 new routes existed, to avoid duplicate/racing edits)

- `frontend/app/sitemap.ts` — 5 new entries (`/convert-pdf`, `/free-pdf-tools`,
  `/pdf-security-guide`, `/alternatives/ilovepdf`, `/alternatives/smallpdf`).
- `frontend/src/components/Footer.jsx` — new "Guides" column (5 links) added as a sibling in the
  existing grid (the Legal column already forces a row-wrap via `lg:col-start-1`, so Guides simply
  auto-places next to it — no grid redesign). Copyright line's false claim fixed (see above).
- `frontend/public/llms.txt` — 5 new lines under `## Pages`, plus one new `## Full Content` section
  pointing at `/llms-full.txt`. Rest of the file untouched.
- `frontend/app/layout.jsx` — second `<link rel="alternate" type="text/plain">` for
  `llms-full.txt`; `personNode` import + script tag (see task 023 above).
- `frontend/app/robots.ts` — **no change**. Confirmed `/llms-full.txt` and all 5 new routes fall
  under the existing wildcard `allow: '/'` and are not caught by `disallow: ['/api/',
  '/pdf-preview']`.

## Deviation: `/pdf-security-guide` does not link `redact-pdf`

Task 020's text listed `redact-pdf` among the tools this guide should link to. `redact-pdf` is the
tool confirmed broken in Phase 3 (400s on every real use — aliased to `protectPdf` with no password
sent) and paused per the user's 2026-07-26 decision. Linking a *new* page to it would be actively
driving fresh traffic to a tool that cannot succeed, which contradicts the reason it was paused in
the first place. The "redaction vs. black box" section explains the concept generally (a real,
useful PDF-literacy fact independent of DocShift's own tool state) and its closing link points to
`protect-pdf` instead, worded to describe encryption/access-restriction, not redaction — it does not
imply `protect-pdf` performs redaction. Applied the same treatment consistently in the two
`/alternatives/*` pages (where `redact-pdf` is named as one of the three tools being rebuilt, an
honest disclosure, but never linked as something to try).

## Every sentence mentioning iLovePDF or Smallpdf (task 021's reporting requirement)

Both pages, all occurrences (grep-verified complete — see Verification):

- `name: 'iLovePDF'` / `name: 'Smallpdf'` — internal data label, not rendered as a claim.
- Page title: `"DocShift: A Free iLovePDF Alternative"` / `"...Smallpdf Alternative"` — naming only.
- `seoTitle`/`seoDesc` — same naming-only pattern, no assertion about the competitor.
- Intro sentence: *"Looking for an iLovePDF alternative that skips the account prompts? DocShift
  runs the same core PDF jobs..."* / *"Comparing Smallpdf alternatives that don't require a login?
  DocShift covers the same everyday PDF tasks..."* — names the competitor for search intent, then
  the rest of the sentence is entirely about DocShift.
- One FAQ question each: *"Why look for an iLovePDF alternative?"* / *"Why switch from Smallpdf?"*
  — the **question** names the competitor; the **answer** (required by schema to match visible
  content) asserts only DocShift facts (no account needed, deletes files after processing).

No sentence anywhere states a price, tier, limit, watermark policy, retention period, feature, or
architecture claim about either competitor. Confirmed by grep (see Verification).

## Every biographical fact added on /about (task 023's fabrication guard)

| Fact stated | Source |
|---|---|
| Soumya Chakraborty created and maintains DocShift | Pre-existing "Built By" section on `/about`, unchanged |
| GitHub URL `github.com/soumyachk101` | Pre-existing "Built By" link + `organizationNode.founder.url` (task 010) |
| Built around deleting every uploaded file immediately after processing rather than storing it | `/about`'s own "How It Works" section (corrected in this session's site-wide false-claim fix) |
| "...so there's nothing left on our servers to lose, leak, or hand over" | Direct, verifiable consequence of the fact above (no DB, no persistent storage anywhere in `backend/src`) — not a separate claim |
| X (`x.com/soumyachk1`), Discord (`discord.com/users/soumya.chk101`), Contact page link | Pre-existing `/contact` page links + `organizationNode.sameAs` (task 010), unchanged |

No job title, employer, degree, certification, location, founding story, or date was added — none
of those exist anywhere in the repo or site copy, so per the task's fence, none went on the page.

## Verification

- `npm run build`: **PASS**, all 6 new routes prerendered (`○`/`●` static, not dynamic).
- Word counts (precise method: strip all `<script>` blocks, extract and subtract `<nav>`/`<footer>`
  markup separately, count what's left — isolates true unique per-page content from shared site
  chrome): convert-pdf 584w, free-pdf-tools 537w, pdf-security-guide 952w, ilovepdf 627w, smallpdf
  609w. All clear their respective floors (500/500/700/600/600) with margin.
  - **Process note**: an earlier verification pass silently served a *stale* build — `pkill -f
    "next start"` doesn't match the actual running process name (`next-server`, not `next start`),
    so the old server kept answering on the port through a full rebuild. Caught by grepping for a
    string only the new edit could contain and getting zero matches on a page that was supposedly
    already rebuilt; fixed by killing the actual PID bound to the port (`lsof -ti`) instead of
    pattern-matching the process name. Worth remembering for any future local-server verification.
- JSON-LD: all 7 blocks per new page parse (`WebSite`, `Organization`, `Person`,
  `SoftwareApplication` globally from `layout.jsx`, plus each page's own `BreadcrumbList` +
  `CollectionPage`/`WebPage` + `FAQPage`). No `Article`/`BlogPosting`/`datePublished` anywhere.
- `/about`: `AboutPage` node present, `mainEntity` correctly resolves to `{'@id':
  'https://www.docshift.tech/#person'}`, and the full `Person` node is present on the same page
  (via the global layout emission) — confirmed resolved, not dangling.
- `/contact`: `ContactPage` node present, `mainEntity` resolves to `ORG_ID`.
- Exactly one inline `'@type': 'Person'` object exists anywhere in `src`/`app`
  (`src/utils/schema.js`) — grep-confirmed no duplicate.
- `/alternatives/foo` (invalid slug): **404**, confirming `dynamicParams = false` — only
  `ilovepdf`/`smallpdf` directories were ever generated.
- `grep -icE 'ilovepdf|smallpdf|adobe|sejda|pdf24|soda ?pdf'` on `convert-pdf`, `free-pdf-tools`,
  `pdf-security-guide`: **0** each.
- `grep -icE '...|GDPR|HIPAA|ISO ?27001|SOC ?2'` on `pdf-security-guide`: **0**.
- `grep -riE "free tier|per day|file size limit|watermark|retention|pricing|\$[0-9]|[0-9]+ ?(MB|GB)"`
  under `app/alternatives/` filtered to lines also mentioning a competitor name: **0** matches.
- `free-pdf-tools`: no "no file size limit" or "unlimited" claim written — the real 100 MB cap
  (`MAX_FILE_SIZE_MB` env, `backend/src/middleware/upload.js`) is stated honestly instead.
- Sitemap: all 5 new URLs present in `/sitemap.xml` with correct canonicals.
- `llms-full.txt`: HTTP 200, `content-type: text/plain; charset=utf-8`, all 30 tool slugs present,
  zero HTML tags (`grep -c '<[a-z/]'` → 0), generated entirely from `TOOLS`/`CATEGORIES` at
  request/build time (no hand-written tool content in the route file itself).
- Final exhaustive false-claim-family grep (`locally|in your browser|never leaves your device|
  client-side webassembly|100% private|no upload|without uploading`) across every file touched or
  created this phase, then again across the *entire* `app/`+`src/` tree: **zero matches** both
  times.

## What was verified before writing (task 019's "free" claims, listed with source)

- No account/signup/email anywhere on the site — `grep -rln "signup\|login\|useAuth\|session\|jwt"
  frontend/src backend/src` → zero matches; there is no auth system in the codebase.
- No automatic branding watermark on any output — `grep -n "watermark" backend/src/services/
  pdf.service.js` shows the only watermark logic lives in `addWatermark`/`watermarkPdf` itself
  (user-supplied text, default `'CONFIDENTIAL'` only if the user leaves it blank) — no other
  endpoint stamps anything.
- No premium tier / no paid gating — confirmed by the absence of any pricing, billing, or
  entitlement-check code anywhere in `backend/src` or `frontend/src`.
- 100 MB per-file limit — real, not invented: `backend/src/middleware/upload.js:18`,
  `limits: { fileSize: Number(process.env.MAX_FILE_SIZE_MB || 100) * 1024 * 1024 }`; matches the
  "Max: 100 MB" text already shown in `DropzoneArea.jsx`.
- A 60-requests-per-15-minutes rate limiter does exist (`backend/src/app.js:66`,
  `express-rate-limit`) — this is anti-abuse infrastructure, not a monetization gate (no tier
  bypasses it, it isn't day-based). Deliberately not mentioned in customer-facing copy either way,
  to avoid implying either "there is no rate limit" (false) or framing basic abuse protection as a
  business-model cap (misleading in the other direction).

## Follow-ups

- None of tasks 018–023 touched `frontend/src/utils/tools.js` or any of the 30 tool pages, per every
  task's fence.
- The three paused tools (`organize-pdf`, `edit-pdf`, `redact-pdf`) are now also disclosed, by name,
  on the two `/alternatives/*` pages as "currently being rebuilt" — this is the first time that fact
  is stated somewhere other than internal project docs. Consistent with the existing decision to
  keep their tool pages live with neutral copy rather than delist them.
- Phase 4 was the last planned phase (0–4) in `PROJECT_STATE.md`. Remaining open items are the
  three broken-tool backend fixes, the `remove-pages`/`extract-pages` UI gap, and the owner actions
  already logged — none are blocked by anything in this phase.
