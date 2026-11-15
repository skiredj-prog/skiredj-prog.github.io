## UI/UX skills

Taste, a11y, bans, voice, and icon library for this project live in `.ux-profile.md`.
Run `setup-ui-ux-skills` again only to change those defaults.
Before UI or microcopy work, read `.ux-profile.md`, then the matching domain skill (page-patterns, viewports, forms, surfaces, loaders, empty-states, copy, motion).
Before creating a new page, read `page-patterns` and name the pattern. Do not write page markup until the pattern is named.
Layouts must pass `viewports` at 375px and 1280px.
Before finishing UI, run `ux-audit`.
These skills come from the `vectorlab-ux-skills` plugin. Without the plugin, these steps replace `ux-audit` and the other skill steps: follow `.ux-profile.md`, then run `npm run build` and `npm run check:links`, plus the browser checks in `.github/workflows/` that cover the pages you changed (they expect `astro preview` on port 4173; the replay checks expect `dist/` served on 4174).
