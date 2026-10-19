---
title: Status
kicker: Actual maturity · October 2026
description: What is rendered, what is frozen as a draft, what is tested in the laboratory, and what is not published.
lede: The framework has an active doctrinal rendering and a constitution still waiting for its note. The standard has frozen drafts. The runtime has a beta tree whose latest changelog entry is not a release.
sources: KB2; policy v2; illustrative architecture, sections 11 and 13; CHANGELOG 5.6.0 and 5.6.1; harness STATUS.md
---

## Where each namespace stands

<table>
  <thead><tr><th>Namespace</th><th>State the sources themselves assume</th></tr></thead>
  <tbody>
    <tr><td>TENIR 2.0</td><td>Canonical name. KB2, build of 30 March 2026, calls the rendering active and the constitution awaiting a formal note.</td></tr>
    <tr><td>KB2</td><td>Active as the knowledge layer. KB1.1 is historical. Written and curated with assistance; author Abdelaziz Skiredj.</td></tr>
    <tr><td>REG</td><td>RFC-0 through RFC-7: Proposed Standard, frozen draft, 2–3 October 2026. Not a standard adopted by an external body.</td></tr>
    <tr><td>TENIR-Gov</td><td>Classifier “Development Status :: 4 - Beta”. IronOmega 5.0.0 line in June–July 2026, continued through the 5.6.1 tree.</td></tr>
    <tr><td>5.6.1</td><td>The changelog marks it “Pending release” and forbids inferring a PyPI publication.</td></tr>
    <tr><td>5.7.0</td><td>Objective named by the illustrative document. Absent from the tree that was read.</td></tr>
    <tr><td>S1 harness</td><td>Laboratory validation on tested interleavings. Non-certification written at the head of the repository.</td></tr>
    <tr><td>Schemas v1</td><td>Publishable bundle of February 2026, example hosts, stubs acknowledged.</td></tr>
  </tbody>
</table>

## Audit of 5.6.0, as the drawing reports it

<p>The illustrative document calls the chain conceptually sound, and records three open defects on 5.6.0:</p>
<ul>
  <li><strong>F-01, commit.</strong> <code>reconcile_commit()</code> might force a mutation without re-checking capacity. A RELEASED state might become COMMITTED, violating I8.</li>
  <li><strong>F-02, normalisation.</strong> <code>register_resource()</code> would reset state. After a crash or reload, an available-resource signal might become false.</li>
  <li><strong>F-03, assessment.</strong> The linearizability checker would be invalid. LIN evidence might contain false positives.</li>
</ul>

<p>The unpublished 5.6.1 changelog describes corrections: reject <code>reconcile_commit()</code> unless the reservation is RESERVED, non-destructive resource registration, and further safety corrections “under review”, including the linearizability checker. The excluded perimeter is explicit: Byzantine tolerance, hardened authenticated transport, third-party attestation, proof of exactly-once external effect. An earlier Raft run is reported: 46 tests passed on commit <code>8203705</code>, GitHub run <code>39205580977</code>, Python 3.11.17, localhost. This site does not replay those tests. It does not conclude that F-01, F-02, or F-03 are closed in a published version.</p>

<p>The same document, in its release section, freezes public communication and marketing artifacts until the hardened 5.7.0. This page reports that. It does not replace it with an argument of maturity.</p>

## Counts that should not be cited alone

<p>The 5.6.0 changelog writes 787 passing tests, a sum it itemises. The <code>tenir_governance</code> README still speaks of 733 tests and of v5.4.2. The <code>tenir-governance</code> README speaks of 557 tests and 96% coverage for R5. The <code>tenir-gov</code> README speaks of 313 tests. These are sentences from different files, not a single series. None was replayed for this site.</p>

## What is not established

<ul>
  <li>Production certification, an independent audit, or a deployment manifest binding the evidence to a real host.</li>
  <li>Byzantine tolerance. Raft, in the texts that were read, is crash-only.</li>
  <li>Exactly-once external effect. Silence is not non-execution. The manuscript treats this as the E1–E3 limit, not as a deployed theorem.</li>
  <li>Key rotation and a signed trust anchor in the S11 harness.</li>
  <li>Adopters, contracts, or results of a UM6P programme. The profile names <code>partner_a</code> and <code>partner_b</code> exist in the code. They do not document a deployment.</li>
  <li>Blueprint v4.4, cited by the code and by the manuscript, absent from the cloned trees.</li>
</ul>

## What the sources themselves leave open

<p>KB2 asks the chassis to consume a complete TENIR 2.0 object instead of letting the implementation define the doctrine. The 5.7.0 drawing asks for safe reconciliation, non-destructive persistence, a reliable linearizability validator, and hardened consensus transport. The conformance README asks for <code>deployment.manifest</code> before any external audit. The harness STATUS.md asks readers to keep the non-certification sentence, and lists documentary remainder outside the repository. The versioning policy asks every surface to declare the authority it does not have.</p>
