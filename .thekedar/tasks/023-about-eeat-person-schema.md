# Task 023 — About page E-E-A-T: real bio + Person schema

**Status:** TODO
**Depends on:** 010
**Risk:** low
**Estimated size:** S
**Stack tags:** nextjs, react, seo

## Objective

The About page stops being a name-and-a-GitHub-link and becomes a real entity signal: a short factual
bio, `Person` schema wired into the existing `@id` graph, and `AboutPage`/`ContactPage` markup. The
audit corrected an earlier assumption here — the site is *not* authorless, it just has no structured
or expanded author identity.

## In scope

- `frontend/app/about/page.jsx`:
  - a short factual bio paragraph for Soumya Chakraborty covering **only** what is already verifiable
    from this repository and the existing site copy: that he built and maintains DocShift, the
    browser-local architecture decision and why, and the public GitHub/X/Discord/email contact points
    already listed on `/contact`
  - JSON-LD: `AboutPage` node + a `Person` node with `@id` = `https://www.docshift.tech/#person`,
    `name`, `url`, `sameAs` (only the profiles already in `organizationSchema`)
- `frontend/src/utils/schema.js`: export `PERSON_ID` and the `personNode`; change
  `organizationNode.founder` from an inline Person object (added in task 010) to `{ '@id': PERSON_ID }`
- `frontend/app/contact/page.jsx`: add `ContactPage` JSON-LD referencing `{ '@id': ORG_ID }`

## NOT in scope (the fence — do not cross)

- **Do NOT invent credentials.** No degrees, universities, job titles, employers, years of experience,
  certifications, awards, conference talks, or publications. If it is not already on this site or in
  this repo, it does not go on the page.
- Do NOT add a photo, avatar, or headshot — there is no image asset and one must not be generated.
- Do NOT add `datePublished`, `dateModified`, or a "writing since" date.
- Do NOT invent a founding story, team size, company registration, or location.
- Do NOT add `Person.jobTitle`, `alumniOf`, `worksFor` or `knowsAbout` unless each value is verifiable.
- Do NOT add `aggregateRating`, reviews, testimonials, press mentions, or "as featured in".
- Do NOT add a `sameAs` profile that is not already listed in the current `organizationSchema`.
- Do NOT redesign the About or Contact pages — add copy and schema, keep the layout.
- Do NOT add `AboutPage`/`ContactPage` schema to `/privacy` or `/terms`; the audit found no value there.

## Acceptance criteria

- [ ] `npm run build` succeeds
- [ ] Built `/about` JSON-LD parses and contains an `AboutPage` node and a `Person` node with `@id` `https://www.docshift.tech/#person`
- [ ] On any page, `organizationNode.founder` resolves by `@id` to that same Person — there is no second inline Person object anywhere
- [ ] Built `/contact` JSON-LD parses and contains a `ContactPage` node referencing `ORG_ID`
- [ ] The task report lists every biographical fact added, each with the file or existing page it came from

## Notes

The last acceptance criterion is the fabrication guard. An E-E-A-T task is the single easiest place for
an agent to helpfully invent a plausible résumé; requiring a source for each fact makes that impossible
to do quietly.
