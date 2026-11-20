# TENIR Labs — publication gate and rollback

The website is automatically published by GitHub Actions on pushes to `main` using `.github/workflows/deploy.yml`. **A successful pull-request preview is not proof that GitHub Pages deployed successfully.** A release is declared live only after deployment and public smoke checks.

## Before merge
1. Check the PR is based on the current `main` and no unreviewed changes to `KB3` or normative REG claims are included.
2. Confirm all required workflows have passed, especially `npm run build`, `npm run check:links`, `node scripts/check-contact-address.mjs`, `node scripts/check-release-readiness.mjs`, and the relevant Playwright tests.
3. Verify FR/EN claims, evidence limits, semantic version labels, and date of source review.
4. PR #96 has been merged: missing `og:image` or a page with more or fewer than one `h1` on the ten critical routes is a **blocking release defect**, enforced by `scripts/check-release-readiness.mjs`. Review a representative social share preview and accessible heading outline.
5. Keep magazine PDF PR #81 separate: do not publish unreproduced Windows-font PDF binaries.

## After merge (manual verification required)
1. Open [Deploy to GitHub Pages](https://github.com/skiredj-prog/skiredj-prog.github.io/actions/workflows/deploy.yml), select the latest run targeting the merged `main` SHA, and confirm `build` **and** `deploy` conclude `success`.
2. On a fresh browser session, inspect `https://tenirlabs.cc/`, `/en/`, `/contact/`, `/en/contact/`, `/offre/`, `/en/offer/`, `/statut/`, `/en/status/`, `/preuves/`, `/en/evidence/`, and `/magazine/n02/`. Check no stale contact address remains in HTML, links or dynamic e-mail drafts.
3. Confirm the public domain returns HTTPS, the locale switch works and the canonical URLs are correct. Separately check `https://mobile.tenirlabs.cc/discover` because it may be deployed outside this repository.
4. Complete a real test email to `skiredj@gmail.com` and confirm receipt in the destination inbox. Do not claim the mailbox works from a `mailto:` URL alone.
5. Record deployed commit SHA, workflow run URL, check time, smoke-check evidence and remaining holds in issue #101 or the release issue.

## Failure and rollback
- If GitHub Pages fails: **HOLD** external release claims, inspect failed workflow logs and correct the offending PR on a branch. Do not change canonical governance to force a green build.
- If a critical regression reaches production: revert the specific merged change in a new PR, let the protected `main` workflow deploy the revert, then re-check the URLs above.
- If `tenirlabs.cc` cannot be reached, avoid asserting a successful deployment until DNS, Pages configuration and actual response have been verified.
- Do not mark issue #101 complete until the live contact email has been proven to reach its inbox.

## Separation of responsibilities
- Content and source validity: editorial reviewer.
- Deterministic preflight and regression checks: QA.
- Production deploy status and rollback: release owner.
- Any changes to TENIR/REG standing, invariants or conformance claims: governed upstream decisions, not site copy edits.
