# Change record — Site-wide false privacy claim fix, batch 2: dropzone, OG card, robots.ts, llms.txt

**Date:** 2026-07-27 · **Commit:** `<pending>` · **Priority fix, continuation of batch 1**

## What changed

- **`frontend/src/components/DropzoneArea.jsx`** — the upload-widget prompt shown on every tool page
  before a file is added said "Processing occurs 100% locally. File contents are never transmitted." This
  is arguably the single most prominent instance of the false claim, since it sits directly in the
  interactive element every user touches first. Replaced with "Your file is deleted from our server right
  after processing."
- **`frontend/app/opengraph-image.tsx`** — the site-wide social-share card's `alt` text ("Free PDF Tools
  that never upload your files") and `description` prop ("No uploads, 100% private") both corrected. The
  per-tool OG card (`app/tool/[toolSlug]/opengraph-image.tsx`) reads `tool.shortDesc` directly, so it
  inherits the fix automatically once `tools.js` is swept (next batch) — not edited separately here.
- **`frontend/app/robots.ts`** — two comments, both written by this session in task 006, both said "user
  files never leave the browser" as part of the reasoning for the CCBot-unblock and AI-crawler-allow
  decisions. The underlying decisions themselves are still correct (CCBot genuinely sends no traffic;
  crawlable content is genuinely public marketing copy) — only the false justification detail was
  removed, replaced with the verified fact (files are deleted right after processing).
- **`frontend/public/llms.txt`** — four fixes: the H1 blockquote and the privacy-first summary paragraph
  (both machine-read verbatim by AI agents, so accuracy here matters more than almost anywhere else on
  the site); the `translate-pdf` entry, which claimed "AI-powered translation that preserves layout" —
  the same false claim one of Phase 3's verify agents caught in the tools.js draft for this tool,
  independently present here too since this file is hand-maintained separately from `tools.js`; and the
  "No uploads" bullet under "Key Differentiators."

## What was deliberately NOT changed

- `Footer.jsx` — re-checked with the same targeted regex used throughout this fix; it does **not**
  actually contain the false claim. It was flagged by this investigation's first, broader grep pass
  (which matched generically on `100%`), catching "100% Free. No limits. No signup required." — a
  business-model claim (no cost), not a processing-location claim. Confirmed false positive, left as-is.
- `frontend/app/tool/[toolSlug]/opengraph-image.tsx` — not edited directly; it sources its description
  from `tool.shortDesc`, which the next batch (tools.js sweep) corrects at the source.
- `llms.txt`'s "redact" entry in the tool list and the per-tool description lines beyond `translate-pdf` —
  left as-is here; the broader per-tool description sweep is the tools.js batch, and `redact-pdf` staying
  listed is consistent with the earlier decision not to hide that tool from navigation while its backend
  fix is pending.
- No structural change to `llms.txt` (headings, page list, tool list) — wording corrections only, same
  scope discipline as task 006's earlier edit to this file.

## Verification

- Targeted re-grep for the full false-claim phrase family across all 5 touched files: **CLEAN**.
- `npm run build`: **PASS** — compiled, 73/73 pages.
- drift-check: **no drift** — exactly the 4 code/content files touched (plus this session's own
  changelog bookkeeping).
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- The big remaining batch: sweep all 30 tools in `tools.js` (`shortDesc`, `desc`, `seoTitle`, `seoDesc`,
  `seoArticle`, `faqs`) for the same claim family. This is the largest surface area and will also
  automatically correct the per-tool OG card descriptions once done.
- After that: re-verify and apply the paused Phase 3 draft content (27 tools) against the now-corrected
  narrative.
