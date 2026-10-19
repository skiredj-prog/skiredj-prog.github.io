---
title: Concepts
kicker: Artifacts 01–03 · KB2 core
description: Definitions, algebra, and gates of TENIR 2.0 according to Knowledge Base 2, with the vocabulary gaps of the runtime and the manuscript.
lede: The entry narrative is not the object of the diagnosis. Reconstruct the unit, fix the scale, formulate TAU, and only then synthesise.
sources: KB2 (30 March 2026); Casablanca 2026 introduction; manuscript v7.1; RFC-2
---

<div class="callout callout-note">
  <p><strong>Authority.</strong> Where a repository, an RFC, or the introduction uses the same word differently, this page follows KB2 and marks the gap. KB2 is the active doctrinal rendering. It does not replace the constitutional note, which is still to be instituted.</p>
</div>

## Thesis

<p>TENIR 2.0 diagnoses admissibility, preservation of options, epistemic validity, recoverability, and posture, at declared scales: individual, organisation, institution, state. The engine must reconstruct the implicit unit, stabilise the scale, formulate TAU, and then synthesise structural state, epistemic validity, agency viability, and trajectory recoverability.</p>

<p>Four planes stack. The system is the substrate: boundaries, dependencies, pressure, capacity, options, degradation, holding. Agency corrects through actors, levers, veto, and cooperative control. Trajectory corrects through regime, closures, hysteresis, and proximity to irreversibility. Narrative is a formal epistemic sub-layer: it guards against omission, amplification, misattribution, and premature closure.</p>

## Definitions

<dl>
  <dt>TAU</dt>
  <dd>The declared invariant bundle that defines admissible identity at the relevant scale. In the introduction: what cannot be given up without the system ceasing to be itself. Not a rule. A non-substitutable core.</dd>
  <dt>TENIR</dt>
  <dd>The disciplined holding posture that prevents a TAU violation while preserving admissible option-space and decision integrity. The introduction: cross the pressure without surrendering the essential. Not resisting. Not healing. Maintaining the minimum admissible continuity.</dd>
  <dt>Epistemic sovereignty</dt>
  <dd>The degree of control the responsible unit retains over the reality-base used to justify an irreversible action.</dd>
  <dt>Epistemic abandonment</dt>
  <dd>Action becomes materially governed by synthetic or externally mediated epistemics that the responsible actor no longer actually checks. The introduction puts it this way: one cannot veto what one has delegated to the oracle.</dd>
  <dt>CAVE</dt>
  <dd>Control, Aim, Veto/constraints, Epistemics. The model of salient agents. The code name-registry requires the same expansion: Control, Aim, Veto, Epistemics.</dd>
  <dt>Agency failure</dt>
  <dd>No cooperative agent retains a sufficient control surface over the TAU-relevant variables.</dd>
  <dt>Trajectory lock-in</dt>
  <dd>Irreversibility becomes imminent, or several irreversible closures accumulate in a critical regime.</dd>
</dl>

<div class="callout callout-limit">
  <p><strong>Name gap.</strong> Manuscript v7.1, in <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/manuscript/v7.1.md">reg-conformance</a>, defines TAU as Autonomous Unit, the decision-making unit capable of acting, and explicitly declines other expansions of the acronym. An R5 hardening note said instead: TAU is identity, TENIR is fidelity to that identity under pressure. KB2 decides for the bundle of admissible identity. The manuscript is a later technical specialisation, not the doctrinal definition.</p>
</div>

## Algebra

<p>The historical minimal state is A(t) = { P, V, K, O, τ }. The composite state of the synthesis is A*(t) = { P, V, K, O, τ, S, Ep, Ag, Tr }.</p>

<div class="formula">S = K / (P × V + ε)</div>
<div class="formula">dO/dt = − α·max(0, P×V − K) − β·Commitments(t) − γ·IrreversibleActs(t)</div>

<table>
  <thead><tr><th>Symbol</th><th>KB2 name</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>P</td><td>Pressure</td><td>Forces that increase constraint and the risk of irreversible loss.</td></tr>
    <tr><td>V</td><td>Velocity</td><td>Pace and acceleration of changing pressures and decision demands.</td></tr>
    <tr><td>K</td><td>Capacity</td><td>Absorption bandwidth: resources, structure, resilience, legitimacy, reserve.</td></tr>
    <tr><td>O</td><td>Option-space</td><td>Remaining admissible manoeuvrability.</td></tr>
    <tr><td>τ</td><td>TAU bundle</td><td>Invariant of admissible identity. Not the REG window τ_K, and not the proposed transition.</td></tr>
    <tr><td>S</td><td>Stability</td><td>An informative proxy of K relative to P×V. Never sovereign.</td></tr>
    <tr><td>Ep, Ag, Tr</td><td>States</td><td>Epistemic, agency, trajectory. They can override a moderate structural score.</td></tr>
  </tbody>
</table>

<div class="callout callout-limit">
  <p><strong>Gap on V and on S.</strong> The introduction writes S = K / (P × V), without ε, and speaks of pressure times velocity. KB2 keeps velocity and adds ε, a floor that keeps the denominator from being zero. RFC-2 and the illustrative architecture call V volatility or irreversibility, and treat the formula as the reference model of structural admissibility in the runtime. This page keeps KB2’s velocity for the framework, and volatility as the meaning of the score inside the implementation kernel. Numeric thresholds in the repositories are policy parameters, not canon constants.</p>
</div>

<p>Option erosion is read together with agency constraints, historical closures, time-to-closure, and reversibility class. The expressions above are KB2’s. In the repositories that were read, they are not a test suite demonstrating the erosion equation.</p>

## Three required determinants

<div class="grid-3">
  <article class="card">
    <h3>Epistemic gate</h3>
    <p>Statuses ok, contested, invalid. Signals carry evidence tags. No high-confidence diagnosis without this validation. Axiom A4.</p>
  </article>
  <article class="card">
    <h3>Agency</h3>
    <p>Each salient agent is read through CAVE. A structurally viable state can remain unactionable if cooperative control is missing.</p>
  </article>
  <article class="card">
    <h3>Trajectory</h3>
    <p>The current state does not exhaust recoverability. Regime, crossed thresholds, hysteresis, and lock-in count.</p>
  </article>
</div>

<p>HOLDING-FIRST becomes mandatory on an irreversible path when any of these bear on it: epistemic invalidity, TAU violation, critical option erosion, agency failure, severe coordination risk, trajectory lock-in, high risk of epistemic abandonment. Collapse flags to expose at minimum: pressure-capacity, critical option erosion, TAU proximity or violation, silent breach, agency failure, trajectory lock-in, epistemic invalidity, epistemic-abandonment risk.</p>

## Doctrinal postures and runtime verdicts

<table>
  <thead><tr><th>Layer</th><th>Outputs</th><th>Role</th></tr></thead>
  <tbody>
    <tr><td>KB2</td><td>NORMAL, CAUTION, HOLDING-FIRST</td><td>Composite posture. HOLDING-FIRST is the deliberate halt when continuing is not admissible.</td></tr>
    <tr><td>REG runtime</td><td>PASS, FLAG, HOLD, HARD_VETO</td><td>Dispositions at the execution boundary. HOLD suspends. HARD_VETO refuses. These are not KB2’s three postures.</td></tr>
  </tbody>
</table>

<p>The introduction ties HOLDING-FIRST to the condition where pressure times velocity exceeds capacity. KB2 widens that obligation: it does not depend on the P×V ratio alone. The public guide says the same discipline in ordinary language: hold, investigate, reconcile, or escalate, rather than proceed blindly.</p>

## Axioms kept

<ul>
  <li><strong>A1.</strong> Every diagnosis requires a unit and a declared scale. TAU is defined at that scale.</li>
  <li><strong>A2.</strong> TENIR exists only if the unit can respond without crossing the TAU boundary.</li>
  <li><strong>A4.</strong> No high-confidence diagnosis without epistemic validation.</li>
  <li><strong>Agency.</strong> Structural viability is not enough without a cooperative control surface.</li>
  <li><strong>Trajectory.</strong> History counts. The current state does not exhaust recoverability.</li>
  <li><strong>A7.</strong> The primary narrative is an input representation, not the object of the diagnosis.</li>
</ul>

## Asymmetry

<p>TENIR 2.0 is hybrid in implementation and constitutionally asymmetric. Model-assisted interpretation is allowed to reconstruct a dirty ingress, propose a TAU formulation, extract CAVE, index a trajectory, hypothesise a distortion, or draft a briefing. The following stay deterministic or explicitly rule-governed: schema validation, thresholds, epistemic status, the stability calculation, option erosion, flags, posture, degraded mode, and the trace.</p>

<p>Patterns — canonical structural reading, agentic governance, metabolic, rhizomatic, hybrid — activate according to the terrain. They remain subordinate to the constitution. No pattern output overrides it alone. What was informally called “v3” is not a successor canon line: KB2 normalises it as the Agentic Governance Profile.</p>
