# TENIR Labs — Operational asset register and release integrity

**Baseline:** 2026-10-25 (site main after PR #31)  
**Machine registry:** [`data/asset-registry.v1.json`](../../data/asset-registry.v1.json)  
**Validator:** [`scripts/check-asset-registry.mjs`](../../scripts/check-asset-registry.mjs)  
**Evidence class:** editorial/source custody and release-identity controls, **not** technical conformance.

## Why this exists

The website had product names that were underlinked, differently versioned or confused with conceptual working drafts. A historical consolidation from 2026-10-24 also contains X-Ray **v0.5.1**, while the current page reports **v0.2**. Automatic replacement would invent lineage.

The registry follows **14 canonical page entries** in both French and English, plus noncanonical historical/staged items. Its URL, status and version assertions fail CI if the pages diverge. Release references for TENIR-Gov v5.7.0 and REG Conformance v0.6.1 additionally pin the exact public Git tag target SHA; the CI rechecks GitHub's public tag refs on changes and weekly.

**Never copy the historical zip into the public repo**: it holds old source/build snapshots, not a verified public release. Only its filename, SHA-256, item metadata and documented conflicts are retained here.

## Field contract

Every `assets[]` item has:

| Field | Meaning |
| --- | --- |
| `asset_id` | Stable key matching both `portfolio.fr` and `portfolio.en`. Not a commercial product classification. |
| `lineage` | Technology/product identity. Can point to historical alternatives *without equating them*. |
| `kind` | Editorial class: product, service, demo or foundation. |
| `site.fr/en.route/title/status` | Exact bilingual page identity and current maturity wording. |
| `site.claimed_version` / `version_embedded` | Displayed version versus version embedded in an artifact; null is **unknown/not verified**, not v1.0. |
| `source_ref` | Git repository and pinned revision when justified; null is unresolved, not implicitly `main`. |
| `build_ref` | Actual build origin where verified, not a conjectured artifact path. |
| `test_ref` | Attributable evidence and its confidence level; quoted release statements are not independent reruns. |
| `release_gate` | Whether an asset is a draft, bounded prototype, published scoped release, deployed simulation or other bounded state. |
| `public_artifact_url` | Direct demo/release only when the public artifact exists. **Not** the editorial page URL. |
| `public_access` | Exact type of access cross-checked against `portfolioAccess.ts`. Documentation/example links never silently become runnable prototypes. |
| `claims_scope`, `non_claims` | Explicit boundaries to preserve in marketing copy. |
| `dependencies` | **Context/navigation only**; do not interpret this array as runtime/bootstrap prerequisites. |

Every historical item includes filename version, embedded version, archive/source reference and `release_gate`. `open_discrepancies[]` documents evidence required to reconcile conflicting versions; the CI does not automatically resolve them.

## How to maintain

1. Introduce a verified change through a source commit or a documented local build. Record **source tag/commit, artifact hash, embedded version, test results and deployment URL independently**.
2. Revise the appropriate `portfolio.ts` entry and `portfolioAccess.ts` only if the public access is real. Never create an "Open demo" link solely because a prototype exists on someone's machine.
3. Update the corresponding asset entry **in the same PR**. If evidence is missing, keep `source_ref`, `build_ref` or `public_artifact_url` null; record the gap as an issue or discrepancy.
4. Run `npm ci && npm run build && npm run check:assets:unit && npm run check:assets && npm run check:assets:remote && npm run check:links`. Remote check requires network/API access.
5. Review claims in FR and EN with a second person. A green build cannot validate product readiness, browser usability or signer identity.
6. Obtain release approval for the **exact output bytes**, digest, license, channel and scope before publishing any new asset. Site editorials and technical runtime promotions are different decisions.

GitHub Actions applies these checks on PRs, pushes to `main`, every Monday and manual dispatch. No CI result automatically publishes or changes REG normative standing.

## Current explicit exceptions

- **X-Ray:** site reports v0.2; historical embedded v0.5.1. Do not auto-rename. Separate the `reg.discovery.self_report` v1 handoff from admissible evidence.
- **Explorer:** v0.2 READY WITH CONDITIONS; final browser acceptance, executable build pin and URL are missing here.
- **Point of No Return:** old filename v0.3 with embedded title v0.2. Replay is not real-world undo.
- **Integrated UX:** old filename v0.3.1, title v0.3. Its historical AI/effect classifier must not be reused.
- **REG-ARCH:** historical proposal v0.1 and later design references v0.4 must be versioned independently.

**Additional exclusions:** the Workbench candidate belongs to private `tenir-reg-demo` PR #4 and remains separate from site PR #27; do not infer it is deployed. The live banking scenario has its own synthetic-only claims. REG Conformance v0.6.1's 46/46 PASS is restricted to Raft single-host loopback; no C3 or physical multi-host claim. G3.1 experimental PR #72 cannot be promoted into published TENIR-Gov v5.7.0 by a website metadata change.

## Release-gate rule

**A historical version, an experimental PASS, a working draft, a CI green check and a production deployment are different statements.** Preserve the boundary until the relevant source, tests and operational evidence close it.
