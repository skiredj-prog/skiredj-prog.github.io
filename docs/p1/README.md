# P1 — Portfolio reconciliation decision package

**State:** A1 + A2 **approved by project-owner instruction in this conversation**, decision note dated 2026-10-25; implementation and release gates remain pending. **As-of:** 2026-10-25.  
**Website baseline:** [main 408eb2bff693](https://github.com/skiredj-prog/skiredj-prog.github.io/commit/408eb2bff6932c4ad7e43bbd0e44ffef4ff2960a).  
**No merge, deployment, product launch or visual redesign authorized by this documentation.**

1. [Canonical portfolio map](./PORTFOLIO_MAP.md) — 11 entries covering **nine client-facing fields** (pain, use case, function, inputs, output, relationships, maturity/deployment, non-claims, next step) plus two internal governance fields (**source of truth and owner**).
2. [PR reconciliation register](./PR_RECONCILIATION.md) — #13, #15, #21, #22, #23; disposition proposal, evidence, collisions, gates, approval states.
3. **Approval provenance:** the project owner explicitly wrote `A1 and A2 appeoved` in the current project conversation on 2026-10-25. This register captures that direction. A separately authenticated GitHub approval/sign-off, named delegates, deployment approval and release gate are **not yet recorded**. Preparing draft implementation PRs is allowed; merging, closing, publishing and redesign remain independently gated.

## P1 — Current Status (source-verified baseline)

- **Baseline review:** [PR #24](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/24) (draft; documentation only), with the product map, PR register and this decision package.
- **Coverage:** 11/11 portfolio entries now contain **9 page fields + source/owner governance metadata**; 5/5 selected PRs have **proposed** dispositions; **0 merges or closures were executed by P1**.
- **Evidence-backed discrepancy:** GitHub [TENIR-Gov v5.7.0](https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0) published 2026-10-24; main website status remains at 5.6.0.
- **Pending verification:** live website deployment equivalence, formal product/approval owners and canonical source revisions for X-Ray, Translation Studio, REG-ARCH and the named Labs experiences.
- **Review state:** A1 + A2 **approved by owner direction, recorded here**; product-source ownership assignments, implementation and release/deployment remain unverified and separately gated. This is not a constitutional amendment or authorization to publish.

## P1 — Approval & Release Gate

| Stage | Meaning | Current outcome |
| --- | --- | --- |
| **Documented** | Proposed map, discrepancies and PR decisions exist with source links. | P1 documentation prepared |
| **Approved** | Product map (A1) and PR dispositions (A2) accepted by explicit owner direction; formal GitHub acknowledgement still to be captured. | **A1 + A2 APPROVED (chat direction)** |
| **Implemented** | Authorized content/navigation corrections are merged with recorded commit and tests. | **NOT YET** |
| **Verified** | FR/EN deployed pages match approved revisions, including limitations and mobile navigation. | **NOT YET** |

### Eight approval checks (formal evidence required)

- [x] **A1 approved** — accept all 11 portfolio identities, nine page-facing fields and classifications; open source/owner gaps remain visible and are not asserted resolved.
- [ ] Assign named accountable owners and resolve or explicitly accept source-of-truth gaps.
- [x] **A2 approved** — accept proposed dispositions for PRs #13, #15, #21, #22 and #23; merge/close/amend operations still require their checks and separate authorization.
- [ ] Inspect **Vos besoins / Your needs** and Products & Services navigation on desktop/mobile in FR/EN.
- [ ] Approve evidence-backed v5.7.0 status and limitations (single-host, no C3 multi-host claim) on both language routes.
- [ ] Verify that journey-led and need-led routes are **genuinely distinct**, with bounded next steps.
- [ ] Confirm deployed commit equivalence, links, build and scoped checks in FR/EN; mark absent sources or inconclusive checks explicitly.
- [ ] Record named owner approval for P1 closure; only then authorize any visual redesign.

**Governance hold:** Completing or ticking this checklist without evidence, a named approver and a recorded decision does **not** authorize merges, closures, deployments or redesign. No implementation in this documentation PR.

## Workstreams

| ID | Workstream | Current state | Blocking decision |
| --- | --- | --- | --- |
| P1-W1 | Navigation | PR #23 approved **as candidate**, still unmerged; site main lacks link inside Vos besoins | Manual FR/EN review and separate merge/release authorization |
| P1-W2 | PR reconciliation | 5 dispositions approved by A2; five PRs still open | Safely amend/supersede, preserve useful code, separately authorize closures |
| P1-W3 | Status correction | Runtime v5.7.0 published; website status still 5.6.0 | Approve bounded evidence-backed copy |
| P1-W4 | Canonical product map | 11-entry candidate here; owners/precise artifact sources unresolved | Product authority and source ownership |

## Approval log (fill before proceeding)

| Decision | Approver | Date | Evidence / issue URL | State |
| --- | --- | --- | --- | --- |
| **A1** — adopt 11 portfolio classifications and nine public fields; source/owner gaps remain open | Project owner (approval in this conversation; GitHub authentication not asserted) | 2026-10-25 | Owner direction in current project conversation; PR #24 is the durable decision record | **APPROVED — gaps not waived** |
| **A2** — approve proposed dispositions #13/#15/#21/#22/#23 | Project owner (approval in this conversation; GitHub authentication not asserted) | 2026-10-25 | Owner direction in current project conversation; [PR register](./PR_RECONCILIATION.md) | **APPROVED — no PR operations authorized** |
| Approve site release copy and two-entry-mode criteria | Not recorded | — | — | PENDING |
| Authorize P1 closure and any new redesign | Not recorded | — | — | BLOCKED |

**A1/A2 approval is explicitly user-provided, not inferred.** It does not constitute a signed GitHub approval, resolve unassigned custodians, or authorize merge, closure, production deployment or visual redesign. All other decisions remain pending.
