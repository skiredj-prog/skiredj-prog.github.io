# TENIR Labs — P1 pull-request reconciliation register (review candidate)

**Register ID:** P1-PRS-20261025  
**Verified:** 2026-10-25 UTC, website main [408eb2bff693](https://github.com/skiredj-prog/skiredj-prog.github.io/commit/408eb2bff6932c4ad7e43bbd0e44ffef4ff2960a)  
**State:** **A2 dispositions APPROVED by project owner in this conversation on 2026-10-25.** No PR has been merged, closed or published by this approval. Individual PR actions still require safety checks and separately recorded authorization.  
**Scope:** Website PRs #13, #15, #21, #22 and #23. Based on GitHub PR metadata and unified diffs, not solely PR descriptions.  
**Source/reviewer custody:** Project-owner A2 instruction explicitly recorded in chat (2026-10-25); authenticated GitHub sign-off, second reviewer, accountable delegates and release approval remain open.

## A2-approved disposition matrix (approval of plan, not execution)

| PR | Current state / factual changes | Recommended classification | Action required *after approval* | Collision / rationale |
| --- | --- | --- | --- | --- |
| [#13 — REG Discovery web integration](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/13) | Open draft; base **codex/ux-journey-redesign** (not main); introduces FR/EN /discovery/ routes, projection, browser tests and a pinned upstream reg-conformance revision; touches Home, Base, site.ts, deployments, conformance. | **AMEND**; hold merge | Rebase/restack on current main; ensure upstream catalogue pin/license/version and prerequisites are valid; preserve bounded exploratory claims; reconcile navigation with #23; run its full integration/browser tests; require explicit release gate. | Large surface/stacked history; do not publish Discovery simply by merging. Independent of X-Ray and mobile appointment task. |
| [#15 — Products top-level visibility](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/15) | Open draft; GitHub reports **mergeable=false**. Adds top-level header Products, footer CTA, Home microcopy and visibility test; edits Base. | **SUPERSEDE by #23** for navigation | Do not merge as-is; separately assess the footer CTA and link test for a subsequent small change; close #15 only after the navigation choice is approved and preserved elements documented. | Competes with #23's explicit user-requested *inside Vos besoins* placement; stale Home context, duplicate header entry, branch conflict. |
| [#21 — REG microcopy/spec links](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/21) | Open draft; homepage label refinements; removes working REG v0.1 links on false assertion the spec pages are absent. | **CLOSE as stale; selectively reuse copy** | Keep both live-source spec links; incorporate useful bilingual CTA wording, if still appropriate, in a new P1 content PR; close #21 **after approval** rather than merge. | [FR](https://github.com/skiredj-prog/skiredj-prog.github.io/blob/main/src/content/fr/publications/reg-v0.1.md) and [EN](https://github.com/skiredj-prog/skiredj-prog.github.io/blob/main/src/content/en/publications/reg-v0.1.md) specification pages exist on main. |
| [#22 — REG microcopy/nav/disclaimers](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/22) | Open draft; adds top-level 'REG · Services' header link, removes existing spec links, strengthens fictional-example and non-certification microtext; edits Base. | **SUPERSEDE / SPLIT salvage** | Preserve substantive fictional-example and non-certification changes only after verifying they are not already on main; retain real spec links; do not take its conflicting header link; close old PR after approved replacement. | Overlaps #15/#23 navigation and #21's wrong link-removal assumption; useful disclosure improvements may deserve independent PR. |
| [#23 — Products inside Vos besoins](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/23) | Open draft, base main, mergeable=true; three files: Base.astro, bilingual nav assertion, workflow paths; earlier GitHub run **40159071046 completed success**. | **MERGE CANDIDATE (not approved)** | Run/record manual FR+EN desktop/mobile dropdown check, confirm accessible menu/state and no duplicates, get editorial approver's explicit go-ahead, then merge via normal gate. | Smallest alignment to observed navigation defect; preserves five visitor journeys and catalog destination. |

### Distinguish *classification* from *state*

- **MERGE CANDIDATE** = intended outcome after checks and explicit authorization, never "merged".
- **AMEND** = retain PR but revise/retarget before review.
- **SUPERSEDE** = intended replacement; original remains open until approved close and any valuable patches are salvaged.
- **CLOSE** = proposed disposition pending approval; no API action has closed it.

## Evidence supporting the classifications

1. Main branch includes the specification pages ([FR](https://github.com/skiredj-prog/skiredj-prog.github.io/blob/main/src/content/fr/publications/reg-v0.1.md), [EN](https://github.com/skiredj-prog/skiredj-prog.github.io/blob/main/src/content/en/publications/reg-v0.1.md)). Therefore the premise behind removing their links in #21/#22 is obsolete.
2. Current [Base.astro on main](https://github.com/skiredj-prog/skiredj-prog.github.io/blob/main/src/layouts/Base.astro) has the five **Vos besoins / Your needs** journeys but not a link to **Produits et services / Products & Services** *inside the dropdown*. The site already stores both localized links in [navProducts in site.ts](https://github.com/skiredj-prog/skiredj-prog.github.io/blob/main/src/data/site.ts).
3. #23 adds the link in the requested location, preserves the five journeys and adds an automated *inside dropdown* regression check. The [REG bilingual content and links workflow, run 40159071046](https://github.com/skiredj-prog/skiredj-prog.github.io/actions/runs/40159071046) previously concluded success for #23. This is build/link assertion evidence **not a completed manual mobile usability review**.
4. #15 and #22 each propose additional *top-level* navigation, whereas the settled requirement is inclusion **inside Vos besoins**. These approaches conflict and must not be combined blindly.
5. #13 is stacked on an older UX base and modifies extensive site and build/projection paths; integration must be rebased and verified, not silently promoted to production.
6. Current [FR status page](https://github.com/skiredj-prog/skiredj-prog.github.io/blob/main/src/content/fr/statut.md) calls v5.6.0 the published runtime; separate [TENIR-Gov release v5.7.0](https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0) was published 2026-10-24. **Draft status-correction [PR #25](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/25) prepared, CI green, unmerged and not deployed**, separate from these unrelated PRs.

## Decisions: owner-approved dispositions; per-action gates remain

| Decision | Recommendation | Approver / record | Status |
| --- | --- | --- | --- |
| D-P1-PR-01 | #23 becomes sole current nav fix (after manual desktop/mobile FR/EN check). | A2 project-owner approval in conversation; deploy/merge approver still to be recorded | **A2 APPROVED; execution gated** |
| D-P1-PR-02 | #15 superseded, close after evaluating footer CTA and regression check. | A2 project-owner approval in conversation; closure separately gated | **A2 APPROVED; execution gated** |
| D-P1-PR-03 | #21 close; retain FR/EN working-draft links; optionally reuse CTA labels. | A2 project-owner approval in conversation; closure separately gated | **A2 APPROVED; execution gated** |
| D-P1-PR-04 | #22 supersede/split; preserve verified disclaimers only. | A2 project-owner approval in conversation; closure separately gated | **A2 APPROVED; execution gated** |
| D-P1-PR-05 | #13 amend/rebase, validate pinned upstream source, independent go/no-go. | A2 project-owner approval in conversation; integration/release decision separately gated | **A2 APPROVED; execution gated** |
| D-P1-PR-06 | [Draft #25](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/25) prepares FR/EN v5.7.0 status; automated checks green; C3/external exactly-once explicitly excluded. | Named technical + editorial owner and separately authorized release still required | **PREPARED, NOT MERGED** |

## Dependency-safe execution order (not authorization)

1. **A1/A2 recorded** for map classifications and PR dispositions; assign named accountable owners and clear remaining source custody gaps before declaring P1 complete.
2. Verify #23 FR/EN menu in desktop/mobile; on approval merge #23, record sha/build.
3. Resolve #15, #21, #22 without competing header and without deleting extant spec links. Salvage useful microcopy into narrow, separately tested content PR if needed.
4. Rebase and scope #13 as a separate Discovery exploratory launch after upstream pin, contract, privacy and browser gates.
5. Correct FR and EN status/product-copy against tagged/runtime evidence in isolated PR; avoid implying deployed client systems.
6. Verify both paths (journey-led and need-led), nine public product fields per entry, with source and owner governance metadata, working links, visible maturity/limits and no unsupported claim.
7. Freeze accepted P1 baseline, then and only then consider any subsequent visual redesign.

## P1 acceptance and "ready for next redesign" gate

- [ ] Owners and reviewer/approver named; exceptions explicitly accepted.
- [ ] All 11 portfolio entries reconciled with sources; unresolved artifact-location gaps logged and handled honestly.
- [x] A2-approved dispositions recorded for all five PRs; resulting merge/closure/replacement links remain required before completing P1.
- [ ] Navigation (FR/EN, desktop/mobile) and actual site deployment sha checked; no duplicate product entry path.
- [ ] FR/EN Products & Services reflect canonical map, two distinct entry modes and evidence-backed maturity.
- [ ] FR/EN runtime status reflects tagged source and bounded C3 non-claim without claiming a client deployment.
- [ ] All links/builds/UX checks green; no unsupported certification, runtime guarantee or invented product.
- [ ] **Explicit owner approval of P1 closure** recorded before authorizing visual redesign.

**A2 approval does not execute PR operations. P1 remains OPEN, website redesign remains BLOCKED until all release and deployment checks succeed.**
