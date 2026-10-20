---
title: Execution sovereignty
kicker: TENIR Labs · editorial proposition
description: An editorial proposition. A lost-receipt scenario shows why retrying becomes a governance decision, with no real transaction and no connected engine.
lede: Your cloud is sovereign. Do your agents remain so?
sources: TENIR Labs editorial proposition ; Offer, Architecture, and Status pages
---

<p>Keeping data under your control is essential. Keeping control of what your agents may commit, retry, or export matters just as much.</p>

<p>TENIR helps you define the limits of autonomous action, treat situations of uncertainty, and state the evidence required before going on.</p>

<ol class="path">
  <li><a href="mailto:skiredj@tenirlabs.cc?subject=Control%20perimeter%20%E2%80%94%20execution%20sovereignty">Define my control perimeter ↗</a></li>
  <li><a href="#lost-receipt">Explore the lost receipt</a></li>
</ol>

<p class="role">For AI, risk, and architecture teams · sensitive environments · critical processes</p>

<h2 id="environment-and-perimeter">Environment and perimeter</h2>

<div class="grid-2">
  <article class="card">
    <p class="role">Your environment</p>
    <h3>Where the system operates</h3>
    <p>Data · Models · Keys · Access · Infrastructure</p>
  </article>
  <article class="card">
    <p class="role">The perimeter of action</p>
    <h3>What it may commit</h3>
    <ul>
      <li>An explicit mandate and mission</li>
      <li>Limits on shared resources</li>
      <li>A defined treatment of uncertainty</li>
      <li>A decision bound to its evidence</li>
    </ul>
  </article>
</div>

<div class="callout callout-note">
  <p><strong>Tenir · trancher · prouver.</strong> Two complementary levels of control. One shared requirement: keep operational authority.</p>
</div>

<h2 id="turning-point">The turning point</h2>
<p>A datum can stay local. An action can still exceed its mandate.</p>

<div class="stack">
  <article>
    <span class="n">01</span>
    <div>
      <p class="role">Authority</p>
      <h3>Access is not an unlimited mandate</h3>
      <p>An agent has a tool. That does not authorise it to commit any amount, on any mission, or under any conditions.</p>
    </div>
  </article>
  <article>
    <span class="n">02</span>
    <div>
      <p class="role">Continuity</p>
      <h3>Continuing requires clear conditions</h3>
      <p>A lost connection changes what is known. Define in advance what may continue, what must wait, and who may authorise resumption.</p>
    </div>
  </article>
  <article>
    <span class="n">03</span>
    <div>
      <p class="role">Evidence</p>
      <h3>Silence is not non-execution</h3>
      <p>A service may have carried out the action without returning its reply. Before retrying, distinguish the intention, the dispatch, and the confirmed effect.</p>
    </div>
  </article>
</div>

<h2 id="lost-receipt">The receipt is missing</h2>
<p class="role">Illustrative path · 5 steps</p>
<p>Control has to hold. An agent initiates a payment. Amount: [to be set after scoping]. The provider’s reply is lost. The path shows why “retry” becomes a governance decision.</p>

<div class="scenario" data-scenario>
  <div class="scenario-steps" role="tablist" aria-label="Scenario steps">
    <button type="button" data-step aria-controls="step-frame">01 Frame</button>
    <button type="button" data-step aria-controls="step-mandate">02 Mandate</button>
    <button type="button" data-step aria-controls="step-incident">03 Incident</button>
    <button type="button" data-step aria-controls="step-hold">04 Hold</button>
    <button type="button" data-step aria-controls="step-evidence">05 Evidence</button>
  </div>

  <article class="scenario-panel" id="step-frame" data-panel>
    <p class="role">Frame · explicit</p>
    <h3>Fix what must remain intact</h3>
    <p>The treasury process operates in a controlled environment. The business requirement stays explicit: one payment intention must not produce two effects.</p>
    <div class="situation">
      <div>
        <p class="role">Requirement to preserve</p>
        <p>One intention. At most one effective payment.</p>
      </div>
      <div>
        <p class="role">State of the situation</p>
        <p><strong>Frame declared.</strong> Hosting and control of the action are two subjects to treat together.</p>
      </div>
    </div>
  </article>

  <article class="scenario-panel" id="step-mandate" data-panel hidden>
    <p class="role">Mandate · bounded</p>
    <h3>Name what the tool does not authorise</h3>
    <p>The agent has a means of payment. The mandate of this mission is narrower: one intention, amount: [to be set after scoping], at most one effect. Access to the tool does not authorise any amount, on any mission, or under any conditions.</p>
    <div class="situation">
      <div>
        <p class="role">Requirement to preserve</p>
        <p>An explicit mandate. One amount. A single intention.</p>
      </div>
      <div>
        <p class="role">State of the situation</p>
        <p><strong>Mandate named.</strong> Access and the right to commit remain two distinct decisions.</p>
      </div>
    </div>
  </article>

  <article class="scenario-panel" id="step-incident" data-panel hidden>
    <p class="role">Incident · reply absent</p>
    <h3>The provider’s reply does not come back</h3>
    <p>The agent initiated the payment. Amount: [to be set after scoping]. The reply is lost. A lost connection changes what is known: the intention was formed, the dispatch may have happened, the effect is not confirmed.</p>
    <div class="situation">
      <div>
        <p class="role">Requirement to preserve</p>
        <p>Do not read a missing reply as a certain failure, or as a success.</p>
      </div>
      <div>
        <p class="role">State of the situation</p>
        <p><strong>Effect unknown.</strong> What was known before the dispatch is no longer enough to continue.</p>
      </div>
    </div>
  </article>

  <article class="scenario-panel" id="step-hold" data-panel hidden>
    <p class="role">Hold · resumption conditioned</p>
    <h3>“Retry” is not an automatic continuation</h3>
    <p>What may continue, what must wait, and who may authorise resumption are defined in advance. A retry requires conditions of resumption. The expiry of a delay does not replace them. While the effect stays unconfirmed, a second execution could produce the second payment the requirement forbids.</p>
    <p>In the runtime vocabulary, UNKNOWN names an unconfirmed result. HOLD is a decision to hold, including a request to retry the same logical effect. The historical authorisation stays distinct. This path describes that condition. It does not issue the verdict. HOLD is not the posture HOLDING-FIRST.</p>
    <div class="situation">
      <div>
        <p class="role">Requirement to preserve</p>
        <p>At most one effective payment, including when the first result is unknown.</p>
      </div>
      <div>
        <p class="role">State of the situation</p>
        <p><strong>Hold.</strong> Resumption is not opened by silence alone.</p>
      </div>
    </div>
  </article>

  <article class="scenario-panel" id="step-evidence" data-panel hidden>
    <p class="role">Evidence · three distinct facts</p>
    <h3>Distinguish intention, dispatch, and effect</h3>
    <p>A service may have carried out the action without returning its reply. Before retrying, these three facts stay separate. Silence does not establish non-execution. Expected evidence is not tested evidence, and tested evidence is not confirmation of this particular effect.</p>
    <div class="situation">
      <div>
        <p class="role">Requirement to preserve</p>
        <p>Resume only once intention, dispatch, and confirmed effect have been distinguished.</p>
      </div>
      <div>
        <p class="role">State of the situation</p>
        <p><strong>Evidence not collapsed.</strong> The scenario stops on the question. It does not deliver a receipt.</p>
      </div>
    </div>
  </article>

  <div class="scenario-controls">
    <button type="button" data-prev>← Previous</button>
    <button type="button" data-next>Next step →</button>
  </div>
</div>

<p>An explanatory scenario, with no real transaction and no connected governance engine. The navigation describes the expected conditions. It does not demonstrate a production guarantee.</p>

<h2 id="difference">Bind the rule to the real action</h2>
<p>The question is not only: “Does this agent have access?” It becomes: “Does this action remain admissible, with this mandate, these commitments, and what we know now?”</p>

<div class="grid-3">
  <article class="card">
    <h3>Beyond the isolated request</h3>
    <p>Take cumulative commitments and resources shared between agents into account, inside an explicit perimeter of storage and concurrency.</p>
  </article>
  <article class="card">
    <h3>Uncertainty that counts in the decision</h3>
    <p>Treat an unknown result as a state to resolve. A retry requires conditions of resumption, not only the expiry of a delay.</p>
  </article>
  <article class="card">
    <h3>Guarantees whose limits are known</h3>
    <p>Bind each claim to a scenario, a control mechanism, and verifiable evidence. Distinguish what is expected, what is tested, and what is actually confirmed.</p>
  </article>
</div>

<h2 id="diagnosis">Accompanied diagnosis</h2>
<p>Before widening autonomy, make its limits explicit. Start from a real process. Identify where an agent can commit a resource, lose track of whether a result occurred, or continue under hypotheses that have become false.</p>

<div class="stack">
  <article>
    <span class="n">01</span>
    <div>
      <h3>Map</h3>
      <p>Actions, dependencies, authorities, and points of commitment.</p>
    </div>
  </article>
  <article>
    <span class="n">02</span>
    <div>
      <h3>Define</h3>
      <p>Invariants, hold cases, and conditions of resumption.</p>
    </div>
  </article>
  <article>
    <span class="n">03</span>
    <div>
      <h3>Test</h3>
      <p>Incident scenarios, controls to verify, and evidence to keep.</p>
    </div>
  </article>
</div>

<p><a href="mailto:skiredj@tenirlabs.cc?subject=Critical%20process%20%E2%80%94%20execution%20sovereignty">Let us talk about your critical process ↗</a></p>
<p>A concrete perimeter. Decisions and evidence to examine. The shape of the deliverable is the <a href="/en/offer/example/">example sheet</a>. The frame of the service is the <a href="/en/offer/">Offer</a> page. Terms are agreed before any engagement.</p>

<h2 id="perimeter-and-status">Perimeter and status</h2>
<ul>
  <li>This page is an editorial proposition. It does not describe a deployment, a client, or a transaction that took place.</li>
  <li>The five steps are an explanatory scenario. No governance engine is connected to them. The conditions shown are expected. They are not a guarantee demonstrated in production.</li>
  <li>Amount: [to be set after scoping]. It is not an observed measurement.</li>
  <li>What is expected, what is tested, and what is actually confirmed remain three registers. This page stays in the first. The state of the runtime is on the <a href="/en/status/">Status</a> page.</li>
  <li>Accompanied diagnosis is a format to be scoped. No price or deadline is fixed here.</li>
</ul>
