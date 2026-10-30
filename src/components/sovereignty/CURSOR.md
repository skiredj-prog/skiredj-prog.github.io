# Cursor — incorporate on tenirlabs.cc

Branch: `content/sovereignty-execution`
Site: `skiredj-prog/skiredj-prog.github.io` (Astro, FR default, EN under `/en/`).

Do not publish until the release-status condition in `README.md` is accepted. This handoff is the section, not a live page.

## Files

- `section.html` — markup to insert. Scoped to `.tn-sovereignty`.
- `sovereignty.css` — load after `src/styles/site.css`.
- `sovereignty.js` — load with `defer`, after the section. One instance per page (fixed ids).
- `souverainete-execution.html` — standalone preview only. Do not ship it.
- `README.md` — editorial constraints. Keep them.

## Where

`src/layouts/Base.astro` already renders an `h1` from frontmatter (lines 107 and 124). In `section.html`, change the section `h1#tn-sovereignty-title` to `h2` and keep the id. Shift the following heading levels if a second `h1` would remain.

Suggested page, FR first:

- `src/pages/souverainete-execution.astro`
- content from `src/content/fr/` if the page should follow the existing content pattern
- import `sovereignty.css` in that page or in `Base.astro` only when this slug is active
- mount `section.html` and `sovereignty.js` as in the Astro snippet in `README.md`

Do not add it to the home page unless asked. Do not add a nav item unless asked.

## Constraints

- French. CTA stays `mailto:skiredj@tenirlabs.cc`.
- No logo, partnership, certification, or vendor integration claim.
- UNKNOWN is the unconfirmed attempt result. HOLD is a verdict on a new action. Do not merge them.
- The last step assumes a confirmed effect. It does not authorize an automatic retry.
- Colors already fall back to the site tokens (`--bg`, `--ink`, `--accent`, `--formula`).

## Check

- One `h1` on the page.
- Tabs, previous, next, and keyboard arrows move the five steps.
- Mobile at 390px: no horizontal overflow.
- `scripts/check-links.mjs` still passes.
