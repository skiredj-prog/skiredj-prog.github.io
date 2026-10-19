---
title: Repositories
kicker: Map · 19 October 2026
description: Role of each public skiredj-prog repository related to TENIR, REG, and IronOmega, with the files to open first.
lede: "Seven public repositories, read on 19 October 2026. One of them, this one, was empty on that date. The others are not seven copies of the same software: doctrine, standard, runtime, and schemas did not share the same age or the same authority."
sources: trees cloned on 19 October 2026; namespace policy v2
---

<table>
  <thead>
    <tr><th>Repository</th><th>Role</th><th>Marker that was read</th><th>Open first</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir_governance">tenir_governance</a></td>
      <td>Active runtime. Membrane, budget, backends, ledger, composition.</td>
      <td><code>pyproject.toml</code> 5.6.1; changelog: not a publication. Commit of 19 October 2026. Apache-2.0. Beta classifier.</td>
      <td><a href="https://github.com/skiredj-prog/tenir_governance/blob/main/CHANGELOG.md">CHANGELOG</a>, <a href="https://github.com/skiredj-prog/tenir_governance/blob/main/README.md">README</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/reg-conformance">reg-conformance</a></td>
      <td>Suite and texts of the REG standard. Neutral as to mechanism.</td>
      <td>Commit of 19 October 2026, message v0.5.0. Apache-2.0.</td>
      <td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/README.md">README</a>, <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/spec.md">spec.md</a>, <a href="https://github.com/skiredj-prog/reg-conformance/tree/main/reg-standards-baseline/rfc">RFCs</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1">tenir-conformance-s1-g1</a></td>
      <td>S1 G0+G1 laboratory harness. Not a production validation.</td>
      <td>Version 0.1.0. No LICENSE file in the cloned tree.</td>
      <td><a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1/blob/main/README.md">README</a>, <a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1/blob/main/STATUS.md">STATUS</a>, <a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1/blob/main/G0_S1_Evidence_Lost_After_Commit.md">G0 S1</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir-governance">tenir-governance</a></td>
      <td>Snapshot of the R5 line. Default branch <code>master</code>.</td>
      <td>Version 5.0.0, commit of 18 July 2026: IronOmega R5 baseline. Apache-2.0.</td>
      <td><a href="https://github.com/skiredj-prog/tenir-governance/blob/master/README.md">README</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir-gov">tenir-gov</a></td>
      <td>Same family, described on GitHub as IronOmega 5.0.0.</td>
      <td>Version 5.0.0, 29 June 2026. Apache-2.0. Code under <code>r5_hardened/IRON_OMEGA_R5</code>.</td>
      <td><a href="https://github.com/skiredj-prog/tenir-gov/blob/main/README.md">README</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir-schemas">tenir-schemas</a></td>
      <td>JSON Schema and OpenAPI bundle for an analysis engine, February 2026.</td>
      <td>v1.0.0. Some schemas are stubs. No LICENSE in the cloned tree. The <code>$id</code> values point at <code>skiredj-prog.github.io</code>, which was empty on the date of this reading.</td>
      <td><a href="https://github.com/skiredj-prog/tenir-schemas/blob/main/schemas/v1/index.json">index</a>, <a href="https://github.com/skiredj-prog/tenir-schemas/blob/main/openapi/tenir-engine.openapi.yaml">OpenAPI</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/skiredj-prog.github.io">skiredj-prog.github.io</a></td>
      <td>GitHub Pages target. Empty at the reading of 19 October 2026. That is no longer the state of the repository.</td>
      <td>No files on that date.</td>
      <td>This site’s README explains how to publish the build there.</td>
    </tr>
  </tbody>
</table>

## How they fit

<p>KB3 does not live in these repositories. It is the enacted doctrinal rendering line, a document layer outside the code. The runtime should align to it; it does not constitute it. Specialized services or applications wrap or extend KB3 and must not redefine it. KB2 is the prior rendering line, for continuity. The namespace policy remains the versioning note. None of those texts is “the” meaning carried by the code, and this page names no path as a KB3 module. <code>reg-conformance</code> carries the standard and the suite. <code>tenir_governance</code> is the most recent runtime of the IronOmega / 5.x line. The <code>tenir-gov</code> and <code>tenir-governance</code> repositories are earlier states of that line, not forks of a different product: the second was initialised, on 18 July 2026, as the v5.0.0-IronOmega-R5 baseline. The S1 harness tests operational definitions against a laboratory membrane; it may call the scoring engine without certifying the runtime. <code>tenir-schemas</code> is earlier: its <code>TauResult</code> carries a distance, an epsilon, and a continuity status of OK, FRAGILIZED, or BROKEN. That is not the TAU bundle carried from the prior rendering line, nor the manuscript’s Autonomous Unit. The statuses OK, FRAGILIZED, and BROKEN are not the postures NORMAL, CAUTION, and HOLDING-FIRST.</p>

<p>Author named in the <code>pyproject.toml</code> files and the citations: Abdelaziz Skiredj, <a href="mailto:skiredj@gmail.com">skiredj@gmail.com</a>. The affiliation “TENIR Labs” and ORCID <a href="https://orcid.org/0009-0003-2678-4069">0009-0003-2678-4069</a> appear in the <code>CITATION.cff</code> of <code>tenir_governance</code>. The DOIs written there do not all agree with the README or with the package version. See the Status page before citing an identifier.</p>
