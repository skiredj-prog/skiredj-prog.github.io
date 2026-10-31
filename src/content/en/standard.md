---
title: The standard
kicker: REG · frozen drafts
description: The Runtime Execution Governance standard, its RFCs, and what it is not relative to the diagnostic framework.
lede: Runtime Execution Governance (REG) proposes requirements for the boundary where an action may become an effect, and the evidence that goes with it. The architecture that implements them remains separate.
sources: RFC-0 through RFC-7 in reg-conformance; spec.md v0.3.1; KB3, posture and execution kept separate
---

## In one sentence

**REG is a proposed set of rules for deciding whether a consequential action may proceed and for recording that decision.** It is not a certification, not a customer installation, and not proof that an external provider produced the expected effect.

### What this page helps separate

- **The proposal:** the RFCs describe what a system should check.
- **The software:** TENIR-Gov is a published implementation with a precise scope.
- **The evidence:** tests and simulations show only what they actually covered.
- **The external reality:** a local authorisation does not by itself confirm an effect at the provider.

<p>The mantra of RFC-0, dated 3 October 2026, status “Proposed Standard (Frozen Draft)”, is: “The agent proposes. The membrane decides. Authorised / Admissible.” The text’s declared origin is the convergence of TENIR-Gov, CCEAF, and CommitGate. The public repositories that were read do not document CCEAF or CommitGate beyond that line.</p>

<div class="callout callout-limit">
  <p><strong>What REG is not.</strong> It is not KB3, not the prior rendering line, and not TENIR 2.0. KB3 is the enacted, active doctrinal rendering line, outside the code. REG is the execution standard. TENIR-Gov should align to KB3; it does not constitute it. A PASS disposition is not the NORMAL posture. An execution mode — shadow-passive, shadow-critical, enforce — is not a posture either: if it appears, it is a separate field. The symbol τ of the TAU bundle is not the τ of the proposed transition, nor the window τ_K.</p>
</div>

## RFC-0 lexicon

<ul>
  <li><strong>Execution boundary.</strong> Where a consequential action may become an external effect.</li>
  <li><strong>Consequential action.</strong> Whatever modifies external state, moves value, or produces an effect that is not trivially reversible. In doubt, it is consequential.</li>
  <li><strong>Membrane.</strong> The surface that intercepts those actions before the boundary. The word is technical in the RFCs. It is not a synonym of the TENIR posture.</li>
  <li><strong>Fail-closed.</strong> Under uncertainty, timeout, or failure, the action is blocked.</li>
</ul>

<p>Three independent dimensions compose admissibility: standing (does the actor still have authority), structure (is the action compatible with the state), and commit (can the decision become exactly this effect without losing its integrity). The standard does not impose a sequential pipeline. If dispositions conflict, the most restrictive governs. HARD_VETO governs all.</p>

<table>
  <thead><tr><th>Disposition</th><th>Instruction</th></tr></thead>
  <tbody>
    <tr><td>PASS</td><td>Allow, bounded by <code>valid_until</code> and by state drift. A PASS is not permanent.</td></tr>
    <tr><td>FLAG</td><td>Allow only under an explicit condition or supervision. Never a bare allow.</td></tr>
    <tr><td>HOLD</td><td>Suspend. Starts the τ_K window.</td></tr>
    <tr><td>HARD_VETO</td><td>Refuse for this evaluation. Produces a signed refusal receipt.</td></tr>
  </tbody>
</table>

## Lifecycle and τ_K

<ol>
  <li>Pre-execution: the request carries intent, target, expected effects, and a state snapshot.</li>
  <li>Conditional authorisation: verdict and grant envelope.</li>
  <li>Supervised execution: if a HARD_VETO occurs, execution halts or moves to a safe state.</li>
  <li>Closure: an evidence manifest anchors the cycle.</li>
</ol>

<p>τ_K is the maximum window for human resolution of a HOLD. RFC-0 says it is derived from existing service-level agreements. It is not invented. On expiry, the pre-declared policy applies. The default is fail-closed. A degraded mode is admitted only if it was declared and preserves the invariant.</p>

<p>RFC-2 fixes S = K / (P × V + ε) as the reference model of structural admissibility, with other models permitted if they satisfy the epistemic, invariant, and conservatism constraints. Uncertainty contracts the admissible region. Absence of proof that an invariant holds is not proof that it holds. In that RFC, V is volatility and irreversibility, not the velocity named by the prior rendering line. KB3 does not collapse the two names.</p>

## The series

<table>
  <thead><tr><th>RFC</th><th>Title</th><th>Status in the tree</th></tr></thead>
  <tbody>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-0.md">RFC-0</a></td><td>Constitution of the standard</td><td>v0.2, frozen, 3 October 2026</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-1.md">RFC-1</a></td><td>Grant envelope and protocol</td><td>v0.1, frozen</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-2.md">RFC-2</a></td><td>Structural admissibility</td><td>v0.1, frozen</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-3.md">RFC-3</a></td><td>Standing and authority continuity</td><td>v0.1, frozen</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-4.md">RFC-4</a></td><td>Commit and execution proof</td><td>v0.2, frozen, 2 October 2026</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-5.md">RFC-5</a></td><td>Liveness and operationalisation</td><td>v0.1, frozen</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-6.md">RFC-6</a></td><td>Security, transport, cryptography</td><td>v0.1, frozen</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-7.md">RFC-7</a></td><td>Conformance suite</td><td>v0.1, frozen</td></tr>
  </tbody>
</table>

<p>RFC-0 separates a normative obligation from implementation status. If the reference has not yet engineered an obligation, it is marked as an implementation gap. It does not rewrite the obligation. The file <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/spec.md">spec.md</a> is titled “REG Conformance Spec — v0.3.1” (29 September 2026). The runner describes itself as “v0.3.2”. The latest commit message that was read says “v0.5.0”. Three labels coexist. This site does not merge them into one version.</p>

<p>The manuscript <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/manuscript/v7.1.md">Governing the Unobserved</a>, v7.1 of 12 October 2026, is a working paper. It studies the membrane after admission, when the effect may remain unobserved. It claims neither general safety under concurrency nor certification of a production gateway. Version DOI: <a href="https://doi.org/10.5281/zenodo.23314839">10.5281/zenodo.23314839</a>. Concept DOI: <a href="https://doi.org/10.5281/zenodo.23270928">10.5281/zenodo.23270928</a>.</p>
