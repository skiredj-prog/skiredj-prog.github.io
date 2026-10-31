---
title: Architecture
kicker: Illustrative document · adapted
description: Illustrative architecture of TENIR / REG — theory, standard, runtime, signals, dual kernel, and proof. An illustrative drawing, not the normative schema.
lede: An intention does not become an effect because a component said yes. It passes a business rule, a regulatory constraint, a mediation, a profile, then a runtime that separates judging, mutating, and proving.
sources: TENIR / REG — illustrative architecture; REG+ v5.6.0 interactive walkthrough; Execution Control Plane demo; KB3, enacted rendering line; tenir_governance and reg-conformance
---

## In one sentence

This page explains **how TENIR thinks about the path from a request to a real action**: what is proposed, what is checked, what is actually sent, and what may still be unknown. It is a design map, not proof that a customer system already works this way.

### How to read this page

- **Looking for the idea:** start with the three pillars.
- **Looking for the mechanics:** read the five levels and four functions.
- **Looking for release evidence:** use the [Status](/en/status/) page instead.
- **Looking for an example:** open the [demos](/en/portfolio/demos/), which remain simulations where stated.

<div class="callout callout-note">
  <p><strong>Status of the drawing.</strong> Class: illustrative only. The source document calls itself illustrative. It is not the normative schema, not the catalogue YAML, and not a full audit report. Where it names V “volatility”, the prior rendering line says “velocity”. KB3 does not restate V and forbids silently renaming a machine-contract field. The runtime drawing is kept. This page does not elect a sovereign name for V.</p>
</div>

## KB3, extensions, and code

<p>KB3 is the enacted, active doctrinal rendering line. It is a document layer, outside the code. It renders meaning; it does not create sovereign meaning and is not a constitution. Specialized services or applications wrap or extend it: they build on KB3 and must not redefine it. That is the discipline of the governed-extension policy and of the namespaces. TENIR-Gov, the IronOmega line, is an implementation of the execution control plane. It should align to KB3. It is not KB3. This page cites no code path as a KB3 module.</p>

## Three pillars of the technical ecosystem

<div class="grid-3">
  <article class="card">
    <h3>Theory</h3>
    <p>The papers set the diagnosis and the separation. They say why governing execution is not the same as reducing the problem to a policy engine.</p>
  </article>
  <article class="card">
    <h3>REG standard</h3>
    <p>REG Core for invariants. REG+ for profiles, hypotheses, and compatibility rules. Profile σ is a contract. Invariants I* are the primitives.</p>
  </article>
  <article class="card">
    <h3>TENIR-Gov runtime</h3>
    <p>Reference implementation. It evaluates, commits, and records. It does not redefine the canon.</p>
  </article>
</div>

## Five levels

<div class="stack">
  <article><span class="n">Level 0</span><p><strong>Business rule.</strong> Stated by the functional team or a regulator. The given example: do not double-execute a payment. Complete in its register, not yet executable.</p></article>
  <article><span class="n">Level 1</span><p><strong>Regulatory constraint.</strong> The document cites, as examples, EU AI Act Art. 12 and DORA Art. 9: traceability, supervision, or control obligations. This site does not verify those articles.</p></article>
  <article><span class="n">Level 2</span><p><strong>Act of mediation.</strong> Business intention plus infrastructure hypotheses equals a substantive rule. The rule becomes deployment-dependent.</p></article>
  <article><span class="n">Level 3</span><p><strong>REG Core and REG+.</strong> Resolve(i, h, R, V) → Profile(σ, I*). The profile is the contract. The invariants are executable.</p></article>
  <article><span class="n">Level 4</span><p><strong>Runtime.</strong> Evaluate produces a verdict. Commit attempts the mutation. Record produces reconstructible proof.</p></article>
</div>

<p>The prior rendering line describes the same separation as three implementation layers: interpretive, constitutional, governance. The principle it states: the model proposes, the constitutional layer adjudicates, the governance layer applies, and the responsible human remains accountable. KB3 requires that asymmetry to stay visible. A model-assisted explanation does not replace adjudication of posture, compliance, degradation, or trace.</p>

## Four functions

<div class="grid-2">
  <article class="card">
    <h3>Evaluate()</h3>
    <p>A pure function. It reads the profile, the invariants, state s, and the proposed transition. It changes nothing. Verdicts: PASS, FLAG, HOLD, HARD_VETO.</p>
  </article>
  <article class="card">
    <h3>Commit()</h3>
    <p>A mutating function. If it fails, the effective result is not a PASS. Named outcomes: COMMITTED, FAILED_RACE, FAILED_CONSTRAINT, SKIPPED.</p>
  </article>
  <article class="card">
    <h3>Record()</h3>
    <p>EvidenceRecord: context, inputs, results, commit trace, hash, signature. The contract aims at proof a third party can replay. SHA-256, Ed25519, and JCS are the named means, not a certification obtained.</p>
  </article>
  <article class="card">
    <h3>Assure()</h3>
    <p>A service that observes infrastructure and injects attested signals. The engine does not itself detect a violated deployment hypothesis. Signals: HYPOTHESIS_VERIFIED, WEAKENED, VIOLATED.</p>
  </article>
</div>

## Signals

<table>
  <thead><tr><th>Family</th><th>Origin</th><th>Nature</th></tr></thead>
  <tbody>
    <tr><td>S1</td><td>Proposed passage</td><td>Declarative. May be false or ill-formed. Examples: agent, action type, amount, idempotency key.</td></tr>
    <tr><td>S2</td><td>Business state</td><td>Observed. Must be fresh. Examples: available resource, quarantine, authority score.</td></tr>
    <tr><td>S3</td><td>Assure()</td><td>Attested. Freshness must be checked.</td></tr>
    <tr><td>S4</td><td>Durable registry</td><td>Historical. Basis of idempotency and reconstruction.</td></tr>
  </tbody>
</table>

<p>These four families are not the laboratory scenario “S1 — Evidence Lost After Commit”. The same identifier denotes, depending on the document, a signal family or a conformance case. Both uses coexist. Read them in their own file.</p>

## Chain

<div class="pipeline">
  <article><span class="n">0</span><p>Raw observation of the four families.</p></article>
  <article><span class="n">1</span><p>Normalisation into coordinates. A missing coordinate becomes <code>unmeasured</code>, never a favourable value.</p></article>
  <article><span class="n">2</span><p>Continuous score. The score is not the verdict.</p></article>
  <article><span class="n">3</span><p>Discrete invariants, independent of the score.</p></article>
  <article><span class="n">4</span><p>Composition: lattice, profile signal reactions, freshness.</p></article>
  <article><span class="n">5</span><p>Commit, only if the mutation is authorised.</p></article>
  <article><span class="n">6</span><p>EvidenceRecord.</p></article>
  <article><span class="n">7</span><p>Afterwards: reversibility class τ⁻¹ and EVP. Retrospective. No write path back into the verdict.</p></article>
</div>

## Dual kernel

<p>The dual kernel does not oppose “structural” and “substantive”. It separates a continuous score and a membrane of discrete invariants. No invariant reads the score.</p>

<div class="compose">
  <article class="card">
    <h3>Score</h3>
    <p class="formula">S = K / (P · V + ε)</p>
    <p>In this drawing, V is called volatility. The prior rendering line calls it velocity. Both names stay visible. The drawing’s thresholds τ_pass and τ_block are runtime parameters, not the postures NORMAL / CAUTION / HOLDING-FIRST. PASS, FLAG, HOLD, and HARD_VETO are dispositions, not those postures.</p>
  </article>
  <div class="op" aria-hidden="true">×</div>
  <article class="card">
    <h3>Membrane</h3>
    <p>Cited examples: I1 single-use permit, I2 commit binding, I6 no admission under quarantine, I8 aggregate budget, I9 trajectory temporal consistency. The full list depends on the profile.</p>
  </article>
</div>

<div class="formula">
If either says HARD_VETO → HARD_VETO<br />
else if either says HOLD → HOLD<br />
else if either says FLAG → FLAG<br />
else → PASS
</div>

<p>An explicit profile reaction can still modify the decision. Without a rule in σ, a signal is ignored. The given example: a fresh HYPOTHESIS_VIOLATED can force HARD_VETO.</p>

<h3>States, apart from verdicts</h3>
<p>The verdict allows, suspends, or refuses. The operational state describes the life of the operation: CREATED, RESERVED, DISPATCHING, then CONFIRMED or FAILED, with UNKNOWN, HOLD, and ESCALATED for uncertainty. A silent provider is not a success.</p>

<h3>Proof and after the fact</h3>
<p>The EvidenceRecord separates evaluation context, inputs, results — including per-invariant detail, not a global boolean —, the commit trace, and integrity. τ⁻¹ classes are PRE_COMMIT, EXACT_INVERSE, COMPENSATION, IRREVERSIBLE, INDETERMINATE. INDETERMINATE is not IRREVERSIBLE: ignorance is not proof that there is no way back. EVP separates intended value, realised value, execution loss, and friction reported apart. The <code>tenir_governance</code> repository says EVP reads records with no write path into the verdict.</p>

## Control-plane demonstration

<p>Three artifacts sit beside this drawing. They are illustrative only. Their verdicts PASS, FLAG, HOLD, and HARD_VETO are execution dispositions. They do not replace the postures NORMAL, CAUTION, and HOLDING-FIRST. An operation’s HOLD is not the HOLDING-FIRST posture.</p>

<ul>
  <li><a href="/en/architecture/drawing/">The illustrative drawing</a>, as provided.</li>
  <li><a href="/en/architecture/interactive/">The interactive walkthrough</a>, titled TENIR Governance, badged REG+ v5.6.0.</li>
  <li><a href="/en/architecture/demo/">The control-plane demo</a>, six scenes. The artifact itself is in English.</li>
</ul>

<p>The demo draws two kernels, then a lattice. Kernel 1 computes S = K / (P·V + ε). The call parameter it shows is named <code>velocity</code>. The interactive walkthrough writes, for the same letter, “Velocity / Volatility”. KB3 does not restate V. This page does not elect a name. Kernel 2, in the demo, checks invariants I3 through I9. The walkthrough lists I1, I2, I3, I4, I6, I7, I8, and I9, and does not name I5. Both lists stay visible. No invariant reads the score.</p>

<p>The lattice in the demo and in the walkthrough is the same as in the drawing: HARD_VETO wins, then HOLD, then FLAG, otherwise PASS. A high score does not guarantee PASS. If either kernel errors, if data is missing, or if the outcome is indeterminate, the demo says the composition produces HOLD, never PASS.</p>

<p>The six scenes, attributed to the demo and not replayed here:</p>
<ol>
  <li><strong>Admissible operation.</strong> A payment of 10 against a capacity of 100. The scoring kernel returns FLAG, the membrane PASS, the composition FLAG, the state RESERVED, then CONFIRMED after dispatch. The idempotency key is claimed at CREATED, before evaluation.</li>
  <li><strong>Duplicate blocked.</strong> The same key, submitted again, receives HARD_VETO. Recovery goes through <code>resume_existing()</code>, not a fresh adjudication.</li>
  <li><strong>HOLD lifecycle.</strong> A per-operation suspension, with τ_K, distinct from QUARANTINE_LOCK, which blocks all admission for an entity. Exits shown: RESERVED when evidence suffices, ESCALATED to a risk officer, FAILED when τ_K expires. ESCALATED has no time-based auto-exit. Expiry in that state produces UNKNOWN, not a resolution. This HOLD is an operation state.</li>
  <li><strong>Memory or persistence.</strong> Without <code>store_path</code>, a restart loses the claim and a second adjudication can return FLAG. With a store, it returns HARD_VETO. <code>require_persistence=True</code> without a path raises ValueError. Since the fix the demo cites, a missing store emits a UserWarning.</li>
  <li><strong>Timeout, then reconciliation.</strong> A provider timeout leads to UNKNOWN, not FAILED. UNKNOWN is not terminal. The reconciliation shown can confirm that the effect did occur. Treating silence as failure could duplicate the effect.</li>
  <li><strong>Guarantee boundary.</strong> At most one dispatch through the governance gate, on a single host. Fail-closed composition and mandatory invariants are local. Cross-host coordination requires distributed infrastructure. Exactly-once external effect depends on the provider. <a href="https://pypi.org/project/tenir-governance/">PyPI</a> artifact integrity depends on the packaging ecosystem. A governance decision does not, by itself, prove that an external effect occurred exactly once.</li>
</ol>

<p>The interactive walkthrough adds limits it itself calls open: <code>reconcile_commit()</code> can violate I8 by adding to committed without subtracting from reserved; <code>time.time()</code> inside <code>@replicated</code> methods; no validation of negative or NaN amounts; non-atomic durable stores; a linearizability checker that takes shortcuts; pysyncobj pickle without authentication; a quorum formula f+1 that is not general; Raft tried on localhost only, self-attested evidence, no Byzantine tolerance. This site does not replay those defects. It does not declare them closed. The <a href="/en/status/">Status</a> page keeps the illustrative drawing’s audit of F-01, F-02, and F-03.</p>

## Traps the drawing asks readers to avoid

<ul>
  <li>The configuration catalogue is not the Assure service.</li>
  <li>A ConsensusBackend interface, and the Raft 5.6.0 implementation, are not proof of consensus in a hostile environment.</li>
  <li>A high score does not guarantee PASS. An invariant can impose HARD_VETO alone.</li>
  <li><code>admissible_structural</code> does not imply <code>effective_guarantee_demonstrated</code>.</li>
</ul>

<p>The audit this document attaches to 5.6.0 is summarised on the <a href="/en/status/">Status</a> page.</p>
