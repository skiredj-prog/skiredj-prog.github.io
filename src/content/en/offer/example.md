---
title: Local simulation — unknown outcome
kicker: Filled example · not a client reference
description: An illustrative diagnostic sheet, prepared on the TENIR/REG demonstrator. No client, no real incident.
lede: The form of a diagnostic sheet, filled on a simulated file. No client is represented.
sources: "frozen local file of the TENIR/REG demonstrator; evidence records #5 and #6; prepared on 20 October 2026"
---

<div class="callout callout-limit">
  <p><strong>Local simulation.</strong> Illustrative sheet prepared on 20 October 2026 from the TENIR/REG demonstrator file. No client, interview, real incident, or commercial gain is represented. The sheet is written by hand. The recommendations are not signed results of the engine. A trial of this demonstrator does not show a client’s system.</p>
</div>

<p>The synthesis illustrates the sheet delivered at the end of the service described in the <a href="/en/offer/">offer</a>. The annexes state its sources and the limits of the example. PASS, here, is an execution verdict. It is not a posture. This case shows an UNKNOWN outcome after a PASS. It does not show a new HOLD verdict.</p>

## Synthesis sheet

<div class="table-scroll">
<table>
  <thead><tr><th>Heading</th><th>Filled sheet</th></tr></thead>
  <tbody>
    <tr><td>Action examined</td><td>The operation <code>issue-inconnue</code> asks the simulated provider for an action of <strong>10,000 <code>demo-unit</code></strong>. This unit stands for a demonstration budget.</td></tr>
    <tr><td>Question</td><td>Do the traces confirm the result of the action? What information would have to be obtained before considering another attempt in an integrated system?</td></tr>
    <tr><td>Scope</td><td>One operation of the profile <code>tenir-reg-local-demo/0.1.0</code>, in memory and in a single process. A reading of evidence records #5 and #6 and of the simulated journal.</td></tr>
    <tr><td>Initial decision</td><td><code>PASS</code> at record #5: budget and observation judged valid by the local profile. The recorded state is then <code>DISPATCHING</code>.</td></tr>
    <tr><td>Recorded dispatch</td><td>Record #6 contains a call from the simulated provider for this operation: <code>call_id=2</code>. That is one call for this operation, inside a journal of two cumulative calls.</td></tr>
    <tr><td>Recorded result</td><td><code>UNKNOWN</code> at record #6. The initial <code>PASS</code> remains a historical decision. It does not confirm the effect. The UNKNOWN branch is imposed by the simulated scenario.</td></tr>
    <tr><td>Resource</td><td><strong>10,000 reserved</strong>, <strong>20,000 consumed</strong>, <strong>40,000 available</strong>, against a ceiling of 70,000 <code>demo-unit</code>. The 20,000 consumed come from an earlier confirmed operation.</td></tr>
    <tr><td>Observation</td><td>Signal <code>demo-observation-1</code>, status <code>VERIFIED</code>, emitted by <code>demo-assure</code> for <code>demo-budget</code>. It is valid at the frozen time of this scenario.</td></tr>
    <tr><td>Conclusion</td><td>The file establishes what the simulator recorded: authorization, call, and unknown outcome, with the reservation kept. <strong>It does not allow a conclusion that an external effect was confirmed.</strong></td></tr>
    <tr><td>Missing information</td><td>In an integrated system: a state with authority over the expected effect, linked without ambiguity to the identity of the operation. No external service of that kind is queried in this example.</td></tr>
    <tr><td>Next control proposed</td><td>Define, then test in a trial environment, the search for the effect by a stable identifier. Keep the uncertainty until the result obtained is enough to conclude.</td></tr>
    <tr><td>Responsibility and date</td><td>Proposed role: the person who integrates the destination system, with validation by the business owner. Name and date to be agreed for a real mission. No client commitment exists in this example.</td></tr>
    <tr><td>Observable criterion of the next trial</td><td>A positive response, an absence of a record, and an unavailable response are distinguished. The rule states, for each, the conclusion it permits, the treatment of the reservation, and the authority to resume. A mere absence of a record is not a final failure unless a contract guarantees that reading.</td></tr>
  </tbody>
</table>
</div>

## Inputs actually used

<ul>
  <li>The <a href="/offre/sources/evidence.json">frozen evidence file</a>, its <a href="/offre/sources/receipt.json">signed receipt</a>, the <a href="/offre/sources/evidence.public.pem">evidence</a> and <a href="/offre/sources/signal.public.pem">signal</a> public keys, the <a href="/offre/sources/verification.json">verification summary</a>, and the demonstrator’s <a href="/offre/sources/test-results.json">test results</a>.</li>
  <li>Records #5 and #6, the local profile, the budgets before and after, and the simulated provider journal.</li>
  <li>The recipe already recorded in the test results. Its existence is checked with the file. It is not a trial campaign run at a client.</li>
</ul>

<p>The receipt lists eight files and carries <code>go_local=true</code>, <code>production=false</code>. The verification summary carries <code>valid=true</code>, 6 records, 4 operations, 2 calls. The keys supplied make it possible to check the cryptographic consistency of the local file. By themselves they do not establish an external authority.</p>

<p>Three files named by the receipt are not republished here: the configuration catalogue, the configurator, and the HTML report. Their size is that of a demonstration tool, and their digests remain in the receipt. The local path from which the file was copied is not published. This page does not re-run the verifier.</p>

<p>The time <code>1792404000</code>, that is 19 October 2026 at 10:00:00 UTC, is the frozen clock of the scenario. It does not describe a real incident date, or a real generation date of the file.</p>

## Sources of the findings

<p>The paths below are JSON Pointers from the root of <code>evidence.json</code>. Index 4 is record #5. Index 5 is record #6.</p>

<div class="table-scroll">
<table>
  <thead><tr><th>Ref.</th><th>Finding</th><th>Exact source</th><th>Nature</th></tr></thead>
  <tbody>
    <tr><td>S1</td><td>Authorization <code>PASS</code> before dispatch</td><td><code>/records/4/payload/decision/verdict</code></td><td>Signed payload, #5</td></tr>
    <tr><td>S2</td><td>Reason <code>BUDGET_AND_OBSERVATION_VALID</code></td><td><code>/records/4/payload/decision/reasons/0</code></td><td>Signed payload, #5</td></tr>
    <tr><td>S3</td><td>Observation <code>VERIFIED</code></td><td><code>/records/4/payload/request/signal/payload/status</code></td><td>Signed payload, #5</td></tr>
    <tr><td>S4</td><td>Budget before and after reservation</td><td><code>/records/4/payload/budget_before</code> and <code>/records/4/payload/budget_after</code></td><td>Signed payload, #5</td></tr>
    <tr><td>S5</td><td>Result <code>UNKNOWN</code></td><td><code>/records/5/payload/operation_state</code></td><td>Signed payload, #6</td></tr>
    <tr><td>S6</td><td>Call <code>call_id=2</code>, operation <code>issue-inconnue</code></td><td><code>/records/5/payload/provider_journal/1</code></td><td>Signed payload, #6</td></tr>
    <tr><td>S7</td><td>Reservation kept at 10,000</td><td><code>/records/5/payload/budget_after/reserved</code></td><td>Signed payload, #6</td></tr>
    <tr><td>S8</td><td>Historical verdict <code>PASS</code> kept</td><td><code>/records/5/payload/decision/verdict</code></td><td>Signed payload, #6</td></tr>
    <tr><td>S9</td><td>Scenario explicitly simulated</td><td><code>/records/5/payload/simulation_only</code> and <code>/records/5/payload/request/simulated_outcome</code></td><td>Signed payload, #6</td></tr>
  </tbody>
</table>
</div>

<p>The call counts are a reading of the journal in record #6: its length is 2; filtering by <code>operation_id=issue-inconnue</code> gives 1. They are not presented as counter fields separate from the payload.</p>

## Controls observed, questions still open

<div class="table-scroll">
<table>
  <thead><tr><th>Axis</th><th>Configuration and scope observed</th><th>What remains to be examined for another system</th></tr></thead>
  <tbody>
    <tr><td>Execution scope</td><td><code>mono-process</code></td><td>Behavior after an interruption, and across several processes.</td></tr>
    <tr><td>Duplicate prevention</td><td><code>local-registry</code>, a local in-memory registry</td><td>Stable identity, persistence, and the destination contract. The two records do not show a general idempotence.</td></tr>
    <tr><td>Coordination</td><td><code>thread-lock</code></td><td>Coordination across instances if the deployment uses more than one.</td></tr>
    <tr><td>Insufficient observation</td><td><code>fail-closed</code> for the local profile</td><td>Sources, freshness, and the treatment of an unavailable observation in the target system.</td></tr>
    <tr><td>Outcome after dispatch</td><td>UNKNOWN with the reservation kept</td><td>A source with authority, matching rules, and a human or technical decision to resume.</td></tr>
  </tbody>
</table>
</div>

<p>A stop before dispatch and uncertainty after dispatch have to stay distinguished.</p>

## Illustrative follow-up plan

<div class="table-scroll">
<table>
  <thead><tr><th>Priority</th><th>Proposed action</th><th>Evidence expected</th><th>Closing condition</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Define the source with authority over the effect, and its link to the identity of the operation.</td><td>A search contract, and examples of a positive response, an absent response, and an unavailable response.</td><td>The team can say which response permits which conclusion, and when the state must stay unknown.</td></tr>
    <tr><td>2</td><td>Define the treatment of the reservation and the authority to resume.</td><td>A table of transitions, responsibilities, and trial criteria.</td><td>Each transition is justified. No release of a reservation, and no new attempt, follows from a mere supposition of the result.</td></tr>
    <tr><td>3, if a mission requires resume after a stop</td><td>Design persistence and duplicate prevention at the boundaries of the system.</td><td>Interruption and resume trials agreed inside a bounded environment.</td><td>The trial file describes the states recovered and the calls observed at the interruption points chosen.</td></tr>
  </tbody>
</table>
</div>

<p>This plan is a documentary interpretation. No reconciliation, retry, engine change, or integration was executed in order to produce it.</p>

## Acceptance of the example

<div class="table-scroll">
<table>
  <thead><tr><th>Criterion</th><th>State of this illustration</th></tr></thead>
  <tbody>
    <tr><td>Explicit scope and question</td><td>Filled in on the sheet.</td></tr>
    <tr><td>Traceable findings</td><td>Sources S1 to S9 and the frozen file can be consulted.</td></tr>
    <tr><td>Authorization, call, result, and budget separated</td><td>Presented distinctly. Units and the scope of the counters are stated.</td></tr>
    <tr><td>Unknowns and consequences explicit</td><td>External effect not established. The information to look for is named.</td></tr>
    <tr><td>Next observable control</td><td>Criterion proposed on the sheet and detailed in the plan.</td></tr>
    <tr><td>Owner, date, and validation by the client</td><td>To be agreed on a real mission. The example does not simulate an acceptance or a client approval.</td></tr>
  </tbody>
</table>
</div>

## Digests

<p>The digests below are integrity metadata. They are distinct from the findings and from the recommendations. The signatures and the receipt do not certify this editorial sheet.</p>

<pre><code>evidence.json — SHA-256 of the file
af9bae4c89f994b83fc2a8aa965a862afaea0035b4e777979537f1c035bdaa54

receipt.json — SHA-256 of the file
c8b022b1211596ea120199afba28bb80b0ea155cfeac2cb7eca407602f4cc441

source_sha256 recorded in the file
06bb6718ea2f760ba0693238588c68ee62d6c67b6943825b46235d99bd623cf5

Record #5 — integrity/payload_sha256
283bca6f32971371b89196b853042ada518e83297c3ad6f701516b7291d9c948

Record #6 — integrity/payload_sha256
86bdf58f70d091bcbe3e69f73c9cac3fafdeab8ded440dd04221cf78d2a8471b</code></pre>

<p><a href="/en/offer/">Back to the offer</a></p>
