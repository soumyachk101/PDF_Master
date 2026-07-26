# Change record — Task 008: Retarget the 8 highest-ROI tools

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3

## What changed

Eight tools' `seoTitle` / `seoDesc` / `seoKeywords` in `frontend/src/utils/tools.js` retargeted from
unwinnable head terms to the winnable phrases the audit identified, in its ROI order:

| slug | new target |
|---|---|
| `redact-pdf` | redact pdf **permanently**, not just a black box |
| `repair-pdf` | the verbatim error string "there was an error opening this document" |
| `html-to-pdf` | URL/webpage to PDF |
| `pdf-to-pdfa` | PDF/A for **court e-filing** |
| `scan-to-pdf` | scan to pdf **without an app** |
| `compare-pdf` | compare two PDFs, plain phrasing |
| `excel-to-pdf` | excel to pdf without uploading **financial data** |
| `edit-pdf` | free pdf editor **no watermark, no sign up** |

No `seoArticle` sentence needed adjusting — in every one of the 8, the article's opening already agreed
with (or didn't contradict) the new title, so the fence's "adjust the first sentence only if it now
contradicts" clause was never triggered. Verified by reading each article, not assumed.

## What was deliberately NOT changed

- `slug`, `name`, `shortDesc`, `desc`, `icon`, `category`, `color`, and every functional field
  (`accept`, `multiple`, `minFiles`, `urlInput`, `outputExt`, `outputMime`, `hasThumbnails`) — untouched
  on all 8.
- `seoArticle` length and the `faqs` arrays — untouched. That is Phase 3's job.
- The other 22 tools — untouched here (9 of them are task 009).
- No search volume, difficulty score, or traffic estimate was invented anywhere — no keyword API is
  configured, so none of these figures exist to report.
- The `TOOLS` array shape — no new fields added.

## Why

`redact-pdf` and `repair-pdf` went first because their existing articles already said the right thing —
`repair-pdf`'s article already contains the literal string `"There was an error opening this document"`,
and `redact-pdf`'s already leads with "Permanently redact...". The retitle was pure upside at zero content
cost, which is why the audit ranked them 1 and 2.

`pdf-to-pdfa`, `html-to-pdf` and `compare-pdf` are not in the audit's 14-row mis-targeting table (task
009 owns that table) but ride along here because they rank high in the audit's ROI ordering independently
— thinnest SERPs on the site, or a genuinely different competitor set (mobile scanner apps, not other
browser tools, for `scan-to-pdf`).

## Files touched

- `frontend/src/utils/tools.js` — 8 tools, 3 fields each (24 lines changed)

## Verification

Verification split into two layers: a purpose-built structural check (title length, desc length,
uniqueness, phrase presence) that a human reviewer can't reliably eyeball across 30 rows, plus the
task's stated build check.

**Structural check** (`scratchpad/verify-seo-copy.cjs` — see Notes for why it isn't a plain `import`):
- AC1, all 8 titles ≤ 52 chars: **PASS** — 42, 45, 46, 47, 47, 49, 49, 51
- AC2 desc range for these 8: **PASS** — 136, 137, 143, 145, 146, 148, 148, 150 (all within 120–160)
- AC2 uniqueness across all 30 titles: **PASS** — 30 checked, 30 unique, zero collisions with the
  unchanged 22
- AC3 each target phrase present verbatim/inflected in title or desc: **PASS** for all 8, checked by regex
  per tool (e.g. `repair-pdf` title is literally `Fix "There was an error opening this document"`)
- AC4 build + built HTML: **PASS** — compiled, 73/73 pages; `/tool/redact-pdf` built HTML contains
  `<title>Redact PDF Permanently | Not Just a Black Box | DocShift</title>` (45 + " | DocShift" (11) = 56,
  within the 63 budget the task's own note allows) and the matching `<meta name="description">`
- drift-check: **no drift** — `frontend/src/utils/tools.js` only, matching Expected files.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

**A pre-existing condition was found, not introduced.** The task's AC2 states all 30 `seoDesc` values
must be 120–160 characters. Running the check whole-file (not just these 8) shows **4 pre-existing
violations that predate this task**, none of which are among the 8 touched here:
`pdf-to-jpg` (118 chars), `pdf-to-word` (119), `pdf-to-excel` (119), `crop-pdf` (119). Two of the four —
`pdf-to-jpg` and `pdf-to-word` — are in task 009's edit list and will very likely land in range as a
side effect of that retarget. The other two, `pdf-to-excel` and `crop-pdf`, are in **neither** task 008's
nor task 009's scope; this task's fence explicitly forbids touching "the other 22 tools," so they were
left alone rather than silently expanding scope to chase a global AC. Logged in PROJECT_STATE as a known
issue for Phase 3 (both tools already belong to a Phase 3 cluster task) rather than fixed here.

## Follow-ups

- `pdf-to-excel` (119 chars) and `crop-pdf` (119 chars) will still be 1 character short of the 120-char
  floor after Phase 2 closes. Flagged for whoever writes tasks 015 (convertFrom cluster, owns
  `pdf-to-excel`) and 016 (edit cluster, owns `crop-pdf`) in Phase 3 — trivial to absorb into that
  content-depth pass, not worth a standalone task.
