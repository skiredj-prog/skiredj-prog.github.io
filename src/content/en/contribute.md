---
title: Contribute
kicker: Open research · Apache-2.0 where it is declared
description: How to propose a correction to the TENIR-Gov repositories and the REG suite, without confusing a code change with an amendment of the canon.
lede: A platform contribution improves reproducibility, tests, or documentation. It does not rename the canon and does not imitate a TENIR 2.x version.
sources: CONTRIBUTING.md of tenir_governance; vectors/CONTRIBUTING.md; namespace policy v2; Apache-2.0 LICENSE
---

<p>The file <a href="https://github.com/skiredj-prog/tenir_governance/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a> presents TENIR-Gov as research software accompanying a manuscript. It especially welcomes reproducibility, documentation, and test coverage. It currently points issues at <code>skiredj-prog/tenir-gov</code>, an earlier repository. For the active tree, issues on <a href="https://github.com/skiredj-prog/tenir_governance/issues">tenir_governance</a> are the coherent address. The file has not yet followed the move.</p>

<h2>Before a proposal</h2>
<ol>
  <li>Start from <code>main</code> on the repository concerned. For hyphenated <code>tenir-governance</code>, the default branch that was read is <code>master</code>.</li>
  <li>Say whether the change touches the runtime, a conformance vector, or documentation only.</li>
  <li>Do not present a profile, a module, or an extension as a new canonical version.</li>
</ol>

<p>The test command cited by CONTRIBUTING.md:</p>
<pre><code>pytest tests/ r4/tests/ \
  r5_hardened/IRON_OMEGA_R5/test_r5_all.py \
  r5_hardened/IRON_OMEGA_R5/test_institutional_hardening.py \
  r5_wired/test_r5_governance_integration.py \
  --cov=tenir_governance</code></pre>

<p>The policy validator, for a change under <code>tenir_governance/</code>:</p>
<pre><code>tenir-validate --policy default
tenir-validate --policy partner_a
tenir-validate --policy partner_b</code></pre>

<p>Invariants the file asks contributors not to break: membrane decisions go through <code>PolicyEngine.evaluate_membrane()</code>; the CAVE expansion remains Control, Aim, Veto, Epistemics; a default policy fingerprint is given (<code>d083e0b82a16c04d</code>) and any intentional change must update it together with the policy version. Python 3.10 or newer.</p>

<h2>REG vectors</h2>
<p>The <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/vectors/CONTRIBUTING.md">vectors/</a> directory separates core, commit, and extended vectors, and the statuses valid, proposed, rejected, deprecated. A proposal is not a ratification. <code>compile.py</code> produces the bundled JSON from the YAML.</p>

<h2>Licence</h2>
<p>Apache-2.0 is the licence text of <code>tenir_governance</code>, <code>tenir-governance</code>, <code>tenir-gov</code>, and <code>reg-conformance</code>. Contributing to those repositories, according to their CONTRIBUTING file, places the work under that licence. <code>tenir-conformance-s1-g1</code> and <code>tenir-schemas</code> had no LICENSE file in the cloned trees. Do not assume the same licence without reading it there.</p>

<p>KB2 and the versioning policy are not, in the repositories, files to patch with a pull request. A definition disagreement is reported. It is not “fixed” in the runtime in order to make the words match.</p>
