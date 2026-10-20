---
title: Before the costly action
kicker: From the side of the one who decides
description: TENIR applications from the side of someone connecting an agent to a costly action. Context, pain, value, and three illustrative scenarios.
lede: The agent may propose. Someone still has to know whether the effect occurred.
sources: Execution Control Plane demo, scenes 1, 2, and 5; Architecture page; KB3, rendering line enacted on 19 October 2026
---

<p>This page speaks to someone about to connect an agent to a payment, a record, or a tool call. It does not describe a deployment. No sector, no customer, and no impact figure is established by the public repositories.</p>

## Context

<p>An agent proposes an action. A tool sends it. A response may arrive, arrive late, or never come back. Between intention and confirmation, the state can be UNKNOWN: the dispatch took place, the result is not confirmed.</p>

<p>The question is not only what the agent is allowed to say. It is what must stay true while it acts: do not double an effect that has already left, do not treat silence as proof, and do not let a local rule leave the whole inadmissible.</p>

## Pain points

<ul>
  <li><strong>Silence.</strong> Resending because the response is missing can produce a second effect. The absence of evidence is not evidence of non-execution.</li>
  <li><strong>The duplicate.</strong> The same request, submitted again, is not a new decision. The idempotency key is claimed before evaluation.</li>
  <li><strong>The shared limit.</strong> A local rule can hold while the aggregate budget, invariant I8 in the drawing, no longer does. Idempotency stops the repeat. By itself it does not hold the limit of the whole.</li>
  <li><strong>Intention taken for confirmation.</strong> Authorizing is not observing that the external effect occurred.</li>
</ul>

## Value proposition

<p>TENIR requires the state to be proved before acting again. The membrane decides. The execution verdicts, PASS, FLAG, HOLD, and HARD_VETO, stay a field apart from the postures NORMAL, CAUTION, and HOLDING-FIRST.</p>

<p>What is offered, in the public scope, is an accompanied diagnostic: one action, one agreed scope, and a sheet that separates established facts, unknowns, and the next control. Guarantees stay bounded to that scope. This site certifies no implementation. It does not promise an external effect exactly once. The service is set out on the <a href="/en/offer/">Offer</a> page.</p>

<div class="actions">
  <a class="btn btn-primary" href="mailto:skiredj@tenirlabs.cc?subject=Scoping%20%E2%80%94%20diagnostic%20of%20an%20agent%E2%80%99s%20controls&amp;body=Hello%2C%0A%0AI%20would%20like%20to%20scope%20a%20diagnostic%20of%20an%20agent%E2%80%99s%20controls.%0A%0A1.%20Which%20precise%20action%20can%20the%20agent%20trigger%2C%20in%20which%20system%2C%20and%20which%20consequence%20must%20be%20preserved%3F%0ATo%20be%20specified%0A%0A2.%20Which%20incident%2C%20doubt%2C%20or%20change%20motivates%20the%20request%3F%0ATo%20be%20specified%0A%0A3.%20Which%20decision%20has%20to%20be%20made%2C%20and%20by%20when%3F%0ATo%20be%20specified%0A%0A4.%20Which%20rules%2C%20people%2C%20and%20traces%20are%20available%20for%20the%20examination%3F%0ATo%20be%20specified%0A%0A5.%20Who%20carries%20the%20decision%20and%20the%20budget%20for%20the%20diagnostic%2C%20and%20who%20will%20take%20part%20in%20the%20restitution%3F%0ATo%20be%20specified%0A%0AThank%20you.">Scope my diagnostic</a>
  <a class="btn" href="/en/offer/">Read the offer</a>
</div>

## Scenarios

<p>The three situations below are those of the demonstration. They are illustrative only. They are not customer files, and not equipped sectors.</p>

<div class="grid-3">
  <article class="card">
    <p class="role">Payment</p>
    <h3>An admissible action</h3>
    <p>The demo shows a payment of 10 against a capacity of 100. The score returns FLAG, the membrane PASS, the composition FLAG. The state moves to RESERVED, then to CONFIRMED after dispatch. The key is claimed at CREATED, before evaluation.</p>
    <p><a href="/en/architecture/demo/#scene-1">Scene 1</a></p>
  </article>
  <article class="card">
    <p class="role">Duplicate</p>
    <h3>The same key, again</h3>
    <p>The same key, submitted a second time, receives HARD_VETO. The resumption shown goes through the existing claim, not through a new adjudication.</p>
    <p><a href="/en/architecture/demo/#scene-2">Scene 2</a></p>
  </article>
  <article class="card">
    <p class="role">Lost receipt</p>
    <h3>A timeout is not a failure</h3>
    <p>A provider timeout leads to UNKNOWN, not to FAILED. UNKNOWN is not terminal. The reconciliation shown can confirm that the effect already occurred. Treating silence as failure could double it.</p>
    <p><a href="/en/architecture/demo/#scene-5">Scene 5</a></p>
  </article>
</div>

<p>The business rule cited by the drawing is of the same order: do not double-execute a payment. It is complete in its register, and not yet executable until it has crossed the levels. Payment, record change, and tool call are the action classes already named. They are not a catalogue of sectors.</p>

## Where to see the mechanics

<p>The demonstration, the interactive walkthrough, and the illustrative drawing sit under <a href="/en/architecture/demo/">Mechanics</a>. The illustrative drawing is in French. The walkthrough and the control-plane demo are in English inside the artifact.</p>

## Limits

<p>Class of this page: simplified public-facing. The scenes stay attributed to the demo. No adopter is declared. The bounds are on <a href="/en/status/">Status</a>.</p>
