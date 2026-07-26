# Change record — Task 007: Stop the intro splash from eating first-paint

**Date:** 2026-07-26 · **Commit:** `<pending>` · **Fix loops used:** 0/3

## What changed

The `IntroOverlay` full-viewport `z-[99999]` splash covered content for ~1.25s on every first visit —
and, because it is gated only on `localStorage`, on **every clean-profile Lighthouse/PSI run**. Lab audits
were measuring the splash, not the site.

- Hold `600ms → 300ms`, unmount `1250ms → 700ms`, exit transition `0.65s → 0.4s`.
  300 + 400 = 700, so the slide completes exactly as the component unmounts.
- Progress-bar interval `25ms → 15ms`. 20 steps of `+5` at 15ms is exactly 300ms, so the bar still reaches
  100% as the exit starts. The bar's own CSS transition went `duration-300 → duration-150` for the same
  reason — at the new pace it would otherwise lag behind its own width changes.
- Every entrance animation duration and delay **halved** (`0.5s/0.2s → 0.25s/0.1s`, `0.3s/0.35s →
  0.15s/0.18s`, `0.3s/0.45s → 0.15s/0.22s`, `0.3s/0.55s → 0.15s/0.28s`). This preserves the choreography's
  exact relative timing against a hold that halved; leaving them would have had elements fading in after
  the overlay had already started sliding away.
- Skips rendering entirely when `navigator.webdriver === true` **or** when
  `prefers-reduced-motion: reduce` matches — setting the `docshift_intro_run` flag in both cases so
  behaviour matches a normal first visit.

## What was deliberately NOT changed

- The overlay still exists, still shows once per browser, and is **not** behind a feature flag or env var.
- Visual design is untouched: `#E4EDE8` field, `#7C3AED` accent, the DOC/SHIFT wordmark, the neumorphic
  `boxShadow` values, "PRIVACY SECURED", "Initializing browser sandbox...", fonts, layout, the
  `cubic-bezier(0.76, 0, 0.24, 1)` easing curve. Only durations changed.
- `localStorage` key `docshift_intro_run` — same key, still `localStorage` not `sessionStorage`.
- Still mounted from `app/layout.jsx` in the same position.
- **No user-agent sniffing.** `navigator.webdriver` is a standard property; string-matching UAs would be
  the wrong tool and the fence forbade it.
- `Navbar`, `Footer`, `Providers`, `ScrollToHash` — nothing else in the first-paint path was touched.

## Why

The animation-timing rescale is the non-obvious part. The task only asked for the hold and unmount to
shrink, but halving those without halving the entrance delays would have left the "Initializing browser
sandbox..." line (delay 0.55s) starting to fade in *after* the overlay began leaving at 300ms. Scaling
everything by the same 0.5 factor keeps the sequence identical, just at 2× speed — which is what "same
look, same brand moment" actually requires.

## Files touched

- `frontend/src/components/IntroOverlay.jsx` — timings, animation rescale, two skip guards

## Verification

- build: **PASS** — compiled, 73/73 static pages
- AC1 server-rendered HTML for `/`: **PASS** — `grep -c "PRIVACY SECURED"` returns **0**; the overlay is
  still client-gated and adds nothing to the server payload
- shipped-bundle inspection (`.next/static/chunks/app/layout-*.js`): **PASS** — contains `,15)`, `,300)`,
  `,700)`, `transform 0.4s`, `navigator.webdriver`, `prefers-reduced-motion`, `docshift_intro_run`, and
  both copy strings. Every intended constant reached production output and no copy was lost.
- AC2 / AC3 / AC4: **NOT VERIFIED — see below**
- drift-check: **no drift** — `frontend/src/components/IntroOverlay.jsx` only, matching Expected files.
  (Manual `git status`/`git diff --stat`; `hooks/drift-check.sh` is not installed in this project.)

## Follow-ups

- **Three of the four acceptance criteria could not be executed.** AC2 (splash gone within 700ms of
  hydration, measured), AC3 (reload does not re-show), and AC4 (`navigator.webdriver` forced true renders
  nothing, asserted via `document.querySelector('.z-\\[99999\\]')`) all require a live browser. The Chrome
  extension is not connected in this environment. What is verified is that the correct constants and both
  guard conditions are present in the shipped bundle — strong, but not the same as observing the behaviour.
  **These three need a human pass before the phase is considered shipped**, and they are the reason this
  task was rated medium risk: it is the only Phase 1 change a user can see.
- Worth re-running PageSpeed Insights after deploy specifically to confirm the splash no longer appears in
  the filmstrip — that was the whole point of the `webdriver` guard.
