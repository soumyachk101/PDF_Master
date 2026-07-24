# DocShift — Off-Page SEO Playbook

**Reality check:** On-page is maxed. Every tool has unique title/H1/keywords/article/FAQ + WebApplication/BreadcrumbList/FAQPage schema. Google *can* rank these pages. The only thing left between DocShift and iLovePDF-level ranking is **domain authority** — and that is 100% off-page. This is the work that moves rankings from here.

Ranking = page quality × domain trust. You've maxed page quality. This doc builds trust.

---

## Why iLovePDF ranks and you don't (yet)

| Signal | iLovePDF | DocShift | Gap |
|---|---|---|---|
| Domain age | ~2010 | new | 15 yrs of trust |
| Referring domains | tens of thousands | ~0 | the whole game |
| Brand searches ("ilovepdf") | millions/mo | ~0 | Google reads this as authority |
| Monthly organic traffic | ~100M+ | low | engagement signals |

On-page can't fake any of these. Backlinks + brand + time do.

---

## Phase 0 — Foundation (do this week, 1 day)

1. **Google Search Console** — verify the **`www.docshift.tech`** property (or a Domain property covering both hosts). Submit `https://www.docshift.tech/sitemap.xml`. Request indexing on the 10 money pages.
2. **Bing Webmaster Tools** — same. Bing powers ChatGPT/Copilot search. Free traffic channel iLovePDF underinvests in.
3. **Google Analytics 4** (or Plausible/Umami for privacy match) — you can't improve what you can't measure.
4. **Brand entity** — create consistent NAP/brand profiles: a real logo, `sameAs` links in your Organization schema pointing to socials (X, GitHub, LinkedIn, Product Hunt). Google builds a knowledge-graph entity from these.

---

## Phase 1 — Easy wins / launch links (weeks 1–4)

These are directories and launches that link out and send early trust + traffic. Do all — a weekend of work.

- **Product Hunt** launch. Biggest single early lever. Prep: GIF demo, tagline "privacy-first PDF tools that never upload your files". A top-5-of-day gets a DR-90 dofollow-ish link + hundreds of visitors + secondary press pickups.
- **Hacker News** — "Show HN: Private in-browser PDF tools (no uploads, WASM)". Your privacy/client-side angle is genuinely HN-catnip. One front-page hit = dozens of organic links.
- **Reddit** (value-first, not spam): r/webdev, r/privacy, r/degoogle, r/InternetIsBeautiful, r/software. Lead with the privacy story.
- **Dev/tool directories** (submit to all, ~2h): AlternativeTo (position as iLovePDF/Smallpdf alternative — huge for you), Slant, SaaSHub, Toolfinder, There's An AI For That, FutureTools, Sideprojectors, BetaList, Uneed, Fazier, TinyLaunch, Peerlist.
- **GitHub** — if any part is open-source, a public repo with a good README linking the site = a DR-96 link. Even an open-source "how our client-side PDF engine works" repo works.
- **llms.txt is already live** — good for AI-engine discovery. Keep it accurate.

Target: 20–40 referring domains in month 1. That alone lifts a zero-authority domain into "Google will actually index and test-rank the pages" territory.

---

## Phase 2 — The "alternative to" play (weeks 2–8)

Your single best positioning: **the private alternative to iLovePDF/Smallpdf**. People already search these — ride the demand.

- Publish comparison pages / posts: "iLovePDF alternative", "Smallpdf alternative", "is it safe to upload PDFs to online converters?" These rank for competitor-brand + alternative queries that convert well and are far less contested than "merge pdf".
- Get listed on every "best free PDF tools 2026" / "iLovePDF alternatives" listicle. Find them: Google `intitle:"ilovepdf alternative"` and `"best free pdf tools"`, email each author offering your privacy angle as a differentiated entry. ~30 outreach emails → several placements.

---

## Phase 3 — Content that earns links (months 2–6)

Tool pages don't earn links — *resources* do. Build a small `/blog` or `/guides`:

- "How online PDF tools handle your data (and why we don't upload)" — the privacy explainer. Links from privacy blogs.
- "Client-side PDF processing with WebAssembly" — technical, earns dev links + HN/Reddit.
- Data/original research: e.g. test 20 online PDF converters for what they upload. Original research = link magnet.
- Free embeddable widget or a small open dataset — assets others cite.

---

## Phase 4 — Brand + engagement signals (ongoing)

- Get people searching "docshift" — social presence, PH/HN traffic, word of mouth. Branded search volume is a top-tier trust signal.
- Keep bounce low / engagement high: fast load (already good — WASM, no upload wait), clear CTAs. Google reads engagement.
- Ship new tools periodically — freshness + more long-tail entry points.

---

## What NOT to do (will get you penalized)

- ❌ Buy backlinks / PBNs / fiverr link packages → manual penalty, hard to recover.
- ❌ Fake reviews / AggregateRating schema you don't have → structured-data penalty.
- ❌ Mass doorway pages (one page per city/keyword variant with thin content) → spam penalty. Cluster variants onto ONE strong page instead (see audit output).
- ❌ Exact-match anchor spam. Vary anchors naturally.

---

## Realistic timeline

| When | Expected |
|---|---|
| Week 1–2 | Pages indexed (after GSC submit + first links) |
| Month 1–2 | Ranking for long-tail ("merge pdf without uploading", brand+alternative terms) |
| Month 3–6 | Page 2–3 for mid-competition terms, page 1 for low-competition |
| Month 6–12+ | Contending for head terms ("merge pdf", "jpg to pdf") *if* backlink/brand growth is sustained |

Head terms like "merge pdf" against iLovePDF/Adobe are a 12-month+ authority game, not a code change. Everything above is the actual path. The on-page work is done and won't be the bottleneck.
