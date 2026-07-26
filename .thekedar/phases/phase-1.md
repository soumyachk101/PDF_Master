# Phase 1 — Technical correctness

**Status:** planned
**Tasks:** 001–007

## Goal

Every crawler-facing technical defect found in the audit is gone: no indexable soft-404s, no invalid
head markup, correct social/icon assets, correct cache headers, honest crawler files. Nothing in this
phase changes a single word of tool copy — it is pure plumbing, so it ships fast and reviews fast.

## Task list

- [ ] 001 — tool-slug-404 — invalid `/tool/<slug>` returns real HTTP 404, not indexable 200
- [ ] 002 — signature-fonts-next-font — remove the in-`<body>` Google Fonts `<link>` from ToolPage
- [ ] 003 — static-asset-cache-headers — long-cache `public/` images, leave the service worker alone
- [ ] 004 — og-image-file-convention — real 1200×630 OG images via Next file convention
- [ ] 005 — apple-touch-icon — PNG apple icon instead of the unsupported SVG
- [ ] 006 — crawler-files — IndexNow key + ping script, unblock CCBot, fix the llms.txt "open source" claim
- [ ] 007 — intro-overlay-first-paint — stop the splash from eating first-time LCP

## Exit criteria

- [ ] `curl -I https://www.docshift.tech/tool/does-not-exist` (or the local build equivalent) returns 404
- [ ] `npm run build` in `frontend/` succeeds with no new warnings
- [ ] No `<link rel="stylesheet">` is emitted inside `<body>` on any tool page
- [ ] All 7 tasks DONE

## Notes

- SSR is confirmed working — no task in this phase should touch rendering strategy.
- Canonical host stays `www.docshift.tech`. Do not revisit; `SEO_AUDIT_REPORT.md` is stale on this point.
- Deliberately skipped: `favicon.ico`. Google and every current browser accept the existing SVG favicon;
  a `.ico` buys nothing. Add one only if an RSS reader or legacy client is ever reported broken.
