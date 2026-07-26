# Change record — Standalone fix: remove false permanence claims from redact-pdf

**Date:** 2026-07-26 · **Commit:** `2b8c4f3` · **Not part of task 008, 011, or 017**

## What happened

While investigating task 017 (security-cluster content, which requires every security claim to be
traceable to a specific implementation line), tracing `redact-pdf`'s actual behavior surfaced a critical
product bug — documented in full in `.thekedar/PROJECT_STATE.md`'s new CRITICAL section:

`backend/src/routes/pdf.routes.js:64` routes `/redact-pdf` to `pdfController.protectPdf` — a literal
alias, with the code comment `// MVP: Use protect as placeholder`. `protectPdf`'s controller
(`pdf.controller.js:236-237`) requires a `password` field or returns HTTP 400. `ToolPage.jsx` has zero
special-case handling for `redact-pdf` (no password field, no text-selection UI — confirmed by grep,
zero matches). **Every real use of "Redact PDF" fails with a 400 error. Always. There is no redaction
implementation anywhere in the codebase.**

Meanwhile, `redact-pdf`'s existing copy — live before this session, and strengthened by task 008
(commit `e97a97d`) — made explicit, specific false claims: "not just a black box… the underlying data is
stripped for good… gone for good, even if someone opens the file in a forensic tool… the only safe
redaction method for PII, financials, and legal discovery," and an FAQ stating "Yes. We replace the
underlying text objects with black rectangles and remove them from the content stream," plus a second
FAQ claiming a "text-select mode" UI feature that does not exist anywhere in `ToolPage.jsx`.

Presented this to the user directly before writing another word of content. Chosen path: pause
`redact-pdf` content work in task 017 (ships the other 3 security tools), defer the actual backend fix
as separate engineering work on the user's own timeline. This fix — correcting the already-shipped false
claims — is the part that cannot wait for that decision, since shipping "gone for good, even in forensic
tools" copy about a feature that cannot execute even once is actively harmful regardless of when the
backend gets fixed.

## What changed

In `frontend/src/utils/tools.js`, `redact-pdf`: `shortDesc`, `desc`, `seoTitle`, `seoDesc`,
`seoKeywords`, `seoArticle`, and both `faqs` entries — every field asserting or implying permanent,
forensic-proof, content-stream-level removal, or a region/text-selection UI. Replaced with honest,
hedged language: the tool visually marks/blacks out content; users are told to verify the result
themselves before relying on it for sensitive documents; `remove-pages` and `protect-pdf` are offered as
more certain alternatives. `updated: '2026-07-26'` set — a real edit happened today.

## What was deliberately NOT changed

- `slug`, `icon`, `category`, `color`, `accept`, `multiple`, `minFiles`, `urlInput`, `outputExt`,
  `outputMime`, `hasThumbnails` — no functional/routing field touched.
- The actual bug — `pdf.routes.js`, `pdf.controller.js`, `ToolPage.jsx` — untouched. Fixing a broken
  backend feature is real engineering work, not a content correction, and the user chose to handle its
  timing separately.
- The tool was not hidden, disabled, or removed from navigation/sitemap/`TOOLS`. That is a product
  decision outside an SEO-content fix's scope.
- `steps` was deliberately left unset — the page falls back to the generic 4-step list rather than
  inventing tool-specific steps for a feature task 017 is explicitly skipping this pass.

## Why

Fixing the marketing copy could not wait for the backend decision. The user's own reasoning when
choosing how to handle this ("SEO copy for a 400-erroring tool would only be actively harmful") applies
identically to copy that was already live before this conversation — the only difference is exposure
time, which cuts the other way: the longer false permanence claims stay live, the more real users might
already be trusting them with genuinely sensitive documents.

## Verification

- `grep -iE "gone for good|content stream|text-select mode|irrevocably strips|only safe redaction method"`
  across `frontend/src/utils/tools.js`: **0 matches** — every specific false claim identified is gone.
- `npm run build`: **PASS** — compiled, 73/73 pages.
- `node scripts/content-audit.mjs`: redact-pdf reports 165 words (article 87, faqs 78) — still under
  400, correctly, since this tool's content-depth work (task 017) is explicitly paused, not delivered
  here. This fix corrects honesty, not depth.
- drift-check: **no drift** — `frontend/src/utils/tools.js` only.

## Follow-ups

- **The actual redaction feature does not exist and needs to be built**, or the route needs to stop
  silently aliasing to an unrelated function. This is the user's call on priority and approach — noted
  prominently in `PROJECT_STATE.md` so it isn't lost.
- Task 017 will cover `unlock-pdf`, `protect-pdf`, `sign-pdf` only (3 of its original 4 tools).
  `redact-pdf` content-depth work is deferred until the backend actually does something the copy can
  honestly describe.
