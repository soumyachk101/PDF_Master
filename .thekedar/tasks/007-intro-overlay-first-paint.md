# Task 007 — Stop the intro splash from eating first-paint

**Status:** DONE
**Depends on:** none
**Risk:** medium
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

The `IntroOverlay` full-viewport `z-[99999]` splash stops obscuring content for ~1.25s on every
first-time visit. It keeps existing — same look, same brand moment — but at a duration that does not
dominate LCP for the first-visit majority of a discovery-driven site, and it never fires in automated
audit contexts (every clean-profile Lighthouse/PSI run currently measures the splash, not the site).

## In scope

- `frontend/src/components/IntroOverlay.jsx` only:
  - Cut the visible hold from `600ms` → `≤300ms` and the unmount from `1250ms` → `≤700ms`, and shorten
    the exit `transition` duration to match so the animation still completes before unmount.
  - Skip rendering entirely when `navigator.webdriver === true` (set by Lighthouse, PSI, Puppeteer and
    every WebDriver-based tool) — set the `docshift_intro_run` flag as usual so behaviour is consistent.
  - Skip rendering when `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
  - Keep the progress bar reaching 100% within the new hold window (the `25ms`/`+5` interval currently
    assumes 500ms — re-derive it, do not leave the bar stuck mid-fill).

## NOT in scope (the fence — do not cross)

- Do NOT delete the overlay, and do NOT gate it behind a feature flag or env var.
- Do NOT change its visual design: colours, the DOC/SHIFT wordmark, the neumorphic shadow, "PRIVACY
  SECURED", "Initializing browser sandbox...", the fonts or the layout all stay exactly as they are.
- Do NOT change the `localStorage` key `docshift_intro_run` or switch to `sessionStorage`.
- Do NOT move the component out of `frontend/app/layout.jsx` or change where it mounts.
- Do NOT user-agent sniff. `navigator.webdriver` is a standard property; string-matching UAs is not.
- Do NOT touch any other component in the first-paint path (`Navbar`, `Footer`, `Providers`, `ScrollToHash`).

## Acceptance criteria

- [ ] `npm run build` succeeds; the server-rendered HTML for `/` still contains no overlay markup (it is client-gated today and must stay that way)
- [ ] In a normal browser with `localStorage` cleared, the splash appears once and is fully gone within 700ms of hydration (measured, e.g. with a `performance.now()` log or DevTools recording)
- [ ] Reloading the same profile does not show the splash again
- [ ] With `navigator.webdriver` forced true (or under a headless run), the overlay never renders — assert on `document.querySelector('.z-\\[99999\\]')` being null

## Notes

The real fix is the duration cut; the `webdriver` skip is secondary and only removes measurement noise
from lab tooling. Both are needed — shortening alone still leaves every PSI run with a splash in the
filmstrip. This is the only Phase 1 task that changes something a human can see, hence medium risk.
