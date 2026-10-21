---
title: Conformance
kicker: Suites · not a certification
description: How to read and run the REG conformance suites, and what a passing test actually establishes.
lede: A structurally admissible configuration is not a demonstrated effective guarantee. A harness that passes is not a validation of production REG.
sources: reg-conformance/README.md and spec.md; tenir-conformance-s1-g1/README.md and STATUS.md; illustrative architecture, audit section
---

<p>The <a href="https://github.com/skiredj-prog/reg-conformance">reg-conformance</a> repository is an implementation-neutral suite. It defines properties — safety, liveness, fault tolerance, I8 — and a <code>ConsensusBackend</code> interface: reserve, commit, release, reconcile, get_state. It prescribes neither Raft, nor Paxos, nor a particular database. Any backend that holds the properties declared by its profile is a possible subject of conformance. “Consensus” in the interface name means a coordination point for shared state, not necessarily a distributed algorithm.</p>

## Catalogue

<p>The README and the illustrative document report the same counts, which they say are checked by a test independent of the generator: 144 theoretical combinations, 42 structurally admissible (9 single-process, 18 single-host, 15 multi-host), 102 rejected. Rules R1, R2, and R3 bind host scope, concurrency, and deduplication. A profile that violates resilience bounds is rejected: for crash-only, n ≥ 2f+1; for Byzantine, n ≥ 3m+1.</p>

<div class="callout callout-limit">
  <p><strong>Structural is not effective.</strong> The effective-guarantee verifier requires a proof file to be present, a SHA-256 equal to the attestation, and a relative path without <code>..</code>. Otherwise it fails closed. The README says that failure, for the example profiles, is the intended behaviour. That absence is an incomplete marking: INCONCLUSIVE, IMPLEMENTATION_GAP, or a missing proof is not summarised as full admissibility, nor as posture NORMAL.</p>
</div>

## Run

<p>From a copy of the repository, the documented commands are:</p>

<pre><code>python3 tools/enumerate_configs.py
python3 tools/validate_profiles.py
python3 tests/test_catalog_enumeration.py
python3 tools/verify_effective_guarantees.py</code></pre>

<p>The runner <code>runner.py</code> describes itself as suite v0.3.2. Modes: <code>--mode http</code> (adapter, evidence level 2), <code>--mode native</code> (in-process kernel, level 3), or both. A result must declare <code>interface_mode</code>. Mixing native and adapter without a label is non-conformant in the sense of RFC-7. Report states include PASS, FAIL, INCONCLUSIVE, NOT_APPLICABLE, ADAPTER_REQUIRED, IMPLEMENTATION_GAP. INCONCLUSIVE is never a PASS.</p>

<p><code>spec.md</code> v0.3.1 says the runner registers 53 vectors, of which 36 extended vectors were still IMPLEMENTATION_GAP, native C4 not applicable, and CT-R4-009 and CT-R4-010 open. That sentence dates the file’s scope. The tree continued. Do not read 36 as the live count without re-reading <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/VECTORS.md">VECTORS.md</a>.</p>

## Published validation — 20 October 2026

<div class="callout">
  <p><strong>REG-Conformant — Raft single-host loopback profile (limited scope)</strong></p>
  <p>The <a href="https://github.com/skiredj-prog/reg-conformance/releases/tag/v0.6.1">REG Conformance v0.6.1 release</a>, published on 21 October 2026, reports an independent re-run by Harv Banning on 20 October 2026: <strong>46 of 46 tests PASS</strong>, for TENIR-Gov v5.6.1 (commit <code>8203705</code>), on a single-host Raft loopback cluster.</p>
  <p><strong>Declared SHA-256 fingerprint:</strong> <code>f9f9c98b42c939acd9b953e08e1da89a94fcbb3a5d8cf11abb8e3ec60d785172</code>.</p>
  <p><strong>Scope:</strong> C3 is not claimed; this is not a third-party certification; physical multi-host remains unsupported. The release summary is a published attestation, not in itself an independent reproduction of the evidence or a production-behaviour guarantee.</p>
</div>

## Evidence, as of 19 October 2026

<p>Logs under <code>evidence/</code> carry headers that say execution was in the author’s environment, not by an independent verifier. The hash proves the file has not changed since the attestation. It does not prove the test was executed correctly. <code>deployment.manifest</code> remains, in the profiles that were read, a blocking dependency: without it, an external auditor cannot bind the evidence to the host hypothesis.</p>

<p>The README still summarises some multi-host profiles as having no evidence, and writes that no multi-host consensus implementation exists. The <code>consensus-replicated.yaml</code> profile in the same tree nevertheless declares RaftConsensusBackend 5.6.0 and points at <code>evidence/test-raft-*.log</code>. Those two texts do not agree. The logs themselves describe a 3-node cluster, a fault model with no Byzantine faults, and an author rather than a third party. The <code>tenir_governance</code> changelog states that test nodes use localhost and separate ports: this is not a trial on a physical multi-host network. The architecture drawing adds: Raft 5.6.0 is not proof of consensus in a hostile environment.</p>

## S1 harness

<p>The <a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1">tenir-conformance-s1-g1</a> repository, version 0.1.0, is the S1 G0+G1 executable harness, “Evidence Lost After Commit”. Its first line says it is not a validation of production REG. The G1 file repeats it: passing the tests proves that the harness satisfies the G0 assertions, not that REG or TENIR is validated.</p>

<p><a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1/blob/main/STATUS.md">STATUS.md</a> is more precise, and narrower. It says the G0 operational definitions for S1 through S6 were run against an RFC-4 laboratory membrane, for the tested sequential interleavings, with CI artifacts. The S1 path calls a real <code>PolicyEngine</code> for the score. That does not establish unconstrained concurrency, production cryptographic verification, or certification of a gateway. The public sentence it asks readers to keep is exactly that.</p>

<p>Limits written in the harness README: the trust public key is supplied by the caller; rotation and revocation are not implemented; declared postconditions do not prove an effect in the world; S11 commitments are in-process artifacts. To run case S1:</p>

<pre><code>python -m pytest tests/test_s1.py -v
python tools/run_s1.py</code></pre>

<p>The spec’s evidence levels — semantic mapping, adapter-tested, native conformant — remain labels that must be declared. None of them equals an independent audit until the subject, the revision, and the environment are cleanly pinned. The spec.md text says so.</p>
