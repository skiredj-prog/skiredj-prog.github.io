---
title: Status
kicker: Actual maturity · October 2026
description: Status of the TENIR framework, REG drafts and released TENIR-Gov v5.7.0, with explicit deployment boundaries and limitations.
lede: KB3 is the active doctrinal rendering line and the REG RFCs remain proposed drafts. TENIR-Gov v5.7.0 was published on 24 October 2026 with a bounded single-host deployment scope, no multi-host C3 claim and no production certification.
sources: KB3 and versioning policy; REG RFCs; TENIR-Gov v5.7.0 release (24 October 2026), README and pyproject.toml; historical 5.6.x change logs; harness STATUS.md
---

## Where each namespace stands

<table>
  <thead><tr><th>Namespace</th><th>State the sources themselves assume</th></tr></thead>
  <tbody>
    <tr><td>TENIR 2.0</td><td>Name of the framework in the canon namespace. That name is not, by itself, the enactment of KB3.</td></tr>
    <tr><td>KB3</td><td>Enacted, active doctrinal rendering line, by the owner’s declaration of 19 October 2026. The files provided with that declaration contain no signed record under <code>00_GOVERNANCE/04_DECISIONS_AND_RATIFICATIONS</code>. A document layer, outside the code. KB3 renders meaning; it does not create sovereign meaning and is not a new constitution. Specialized services or applications may wrap or extend it; they must not redefine it. TENIR-Gov should align to it; it is not KB3.</td></tr>
    <tr><td>KB2</td><td>Prior rendering line, continuity only. No simultaneous active authority with KB3. The build of 30 March 2026 is kept. The note that once named it active, at institution, is historical context, not current authority. KB1.1 is historical. Written and curated with assistance; author Abdelaziz Skiredj.</td></tr>
    <tr><td>REG</td><td>RFC-0 through RFC-7: Proposed Standard, frozen draft, 2–3 October 2026. Not a standard adopted by an external body.</td></tr>
    <tr><td>TENIR-Gov</td><td>Open-source beta software (“Development Status :: 4 - Beta”). <a href="https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0">v5.7.0</a> released on 24 October 2026, tied to tagged source commit <code>47ef67e3efc5f3008896a7d88bebf929fa0a98f0</code>. A published release is not evidence of a qualified customer deployment.</td></tr>
    <tr><td>5.6.1</td><td>Historical snapshot: the changelog reviewed on 19 October still said “Pending release”. That statement no longer describes the latest published release.</td></tr>
    <tr><td>5.7.0</td><td>GitHub release and <a href="https://pypi.org/project/tenir-governance/5.7.0/">PyPI package 5.7.0</a>, published 24 October 2026. Published deployment boundary: single host, verified production manifest and durable registry configuration; production multi-host Raft blocked by FM-20, with no multi-host C3 fault tolerance or external exactly-once provider effect claimed.</td></tr>
    <tr><td>S1 harness</td><td>Laboratory validation on tested interleavings. Non-certification written at the head of the repository.</td></tr>
    <tr><td>Schemas v1</td><td>Publishable bundle of February 2026, example hosts, stubs acknowledged.</td></tr>
  </tbody>
</table>


## Published deployment boundary — TENIR-Gov v5.7.0

<p>The <a href="https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0">24 October 2026 release</a> and its <a href="https://github.com/skiredj-prog/tenir_governance/blob/v5.7.0/README.md">tagged README</a> explicitly separate publication, CI success and deployment qualification. The published boundary is <strong>bounded single-host</strong> operation with a verified production manifest and configured durable registry. Publication does not prove that a customer has deployed the package, an external exactly-once effect, or multi-host C3 tolerance. Test figures require a named commit, environment and test selection; historical coverage figures are not guarantees for this release.</p>

## Historical 5.6.0 audit (not the v5.7.0 status)

<p>The earlier illustrative document reported three findings on v5.6.0. Keeping them here preserves the history; it neither proves that they persist nor that all v5.7.0 configurations remediate them:</p>
<ul>
  <li><strong>F-01, commit.</strong> <code>reconcile_commit()</code> might force a mutation without re-checking capacity. A RELEASED state might become COMMITTED, violating I8.</li>
  <li><strong>F-02, normalisation.</strong> <code>register_resource()</code> would reset state. After a crash or reload, an available-resource signal might become false.</li>
  <li><strong>F-03, assessment.</strong> The linearizability checker would be invalid. LIN evidence might contain false positives.</li>
</ul>

<p>The then-unpublished 5.6.1 changelog described corrections: reject <code>reconcile_commit()</code> unless the reservation is RESERVED, non-destructive resource registration, and further safety corrections “under review”, including the linearizability checker. The excluded perimeter is explicit: Byzantine tolerance, hardened authenticated transport, third-party attestation, proof of exactly-once external effect. An earlier Raft run is reported: 46 tests passed on commit <code>8203705</code>, GitHub run <code>39205580977</code>, Python 3.11.17, localhost. This site does not replay those tests. For conclusions about v5.7.0, consult the tagged source, scoped CI results and a corresponding deployment manifest.</p>

<p>The communication freeze described by the earlier illustrative document was a historical prerequisite to v5.7.0. The release has since been published; publication does not turn tests into certification or establish production suitability for every deployment.</p>

<p>The identified published package is <a href="https://pypi.org/project/tenir-governance/5.7.0/">tenir-governance 5.7.0</a> (beta line). Two SSRN working papers are recorded on the <a href="/en/publications/">Publications</a> page: <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7291620">7291620</a> and <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7197218">7197218</a>. They do not certify the runtime, and they are not KB3.</p>

## Historical counts that are not v5.7.0 results

<p>Older R5/R4 documents describe different test scopes: the v5.6.0 changelog recorded 787 tests; an older <code>tenir_governance</code> README cited 733 tests and v5.4.2. The <code>tenir-governance</code> README speaks of 557 tests and 96% coverage for R5. The <code>tenir-gov</code> README speaks of 313 tests. Those historical statements from different files are neither a single series nor measurements of v5.7.0. The Raft and full release test suites overlap: do not sum their counts. No tests were replayed for this site.</p>

## What is not established

<ul>
  <li>Production certification, an independent audit, or evidence that a customer deployment has a validated manifest binding evidence to its real host.</li>
  <li>Byzantine tolerance or <strong>multi-host C3</strong> fault tolerance: neither is claimed for v5.7.0. Production multi-host Raft remains blocked by FM-20.</li>
  <li>Exactly-once external effect. Silence is not non-execution. The manuscript treats this as the E1–E3 limit, not as a deployed theorem.</li>
  <li>Key rotation and a signed trust anchor in the S11 harness.</li>
  <li>Adopters, contracts, or results of a UM6P programme. The profile names <code>partner_a</code> and <code>partner_b</code> exist in the code. They do not document a deployment.</li>
  <li>Blueprint v4.4, cited by the code and by the manuscript, absent from the cloned trees.</li>
</ul>

## What the sources themselves leave open

<p>The prior rendering line asks the chassis to consume a complete TENIR 2.0 object instead of letting the implementation define the doctrine. KB3, without creating a new canon, further asks for one rendering line at a time, visible compliance class and degraded status, no silent renaming of the machine contract, execution mode kept separate from posture, and a public surface that states what it simplifies. The 5.7.0 drawing asks for safe reconciliation, non-destructive persistence, a reliable linearizability validator, and hardened consensus transport. The conformance README asks for <code>deployment.manifest</code> before any external audit. The harness STATUS.md asks readers to keep the non-certification sentence, and lists documentary remainder outside the repository. The versioning policy asks every surface to declare the authority it does not have. None of those asks is closed by this page.</p>
