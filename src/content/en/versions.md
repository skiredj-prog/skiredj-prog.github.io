---
title: Versions
kicker: Policy v2 · 4 April 2026
description: TENIR namespaces — canon, knowledge base, profiles, platform, products, extensions — and what each repository is allowed to mean.
lede: A platform version does not replace a doctrinal version. No profile, product, or extension imitates a canonical line.
sources: TENIR Versioning, Namespace and Governed Extension Policy v2; KB3, status note of 14 April 2026; KB2, artifact 00, prior rendering line
---

<p>The note of 4 April 2026 is active. It supersedes the earlier naming policy where developer surfaces were not yet named. It protects semantic integrity across canon, knowledge base, profiles, platform, products, and the developer ecosystem.</p>

## Namespaces

<table>
  <thead><tr><th>Namespace</th><th>Reserved for</th><th>Given examples</th></tr></thead>
  <tbody>
    <tr><td>Canon</td><td>Constitutional framework versions</td><td>TENIR 2.0, later TENIR 2.1</td></tr>
    <tr><td>Knowledge base</td><td>Document rendering, outside the code</td><td>KB1.1, historical; KB2, prior line; KB3, enacted and active</td></tr>
    <tr><td>Profiles and modules</td><td>Specialised doctrine that does not replace the canon</td><td>Agentic governance, metabolic, rhizomatic, each v1.0 in the examples</td></tr>
    <tr><td>Platform</td><td>Implementation releases</td><td>K+4 RC, TENIR2C</td></tr>
    <tr><td>Products</td><td>User-facing surfaces</td><td>Lens / Studio, Engine API, Governance, Reports</td></tr>
    <tr><td>Developer Platform</td><td>Ecosystem contracts</td><td>Contract Registry, portal, sandbox, kits</td></tr>
    <tr><td>Partner extension</td><td>Third-party integrations under explicit governance</td><td>Named examples: UM6P bundle connector, governance export bridge</td></tr>
  </tbody>
</table>

## Prohibitions

<ol>
  <li>No overlay, module, profile, product, developer surface, or partner extension imitates a canonical version line.</li>
  <li>No public API or portal implies semantic authority it does not hold.</li>
  <li>No extension suppresses, where relevant, the compliance class, the active profile, the contract version, or authority limits.</li>
</ol>

<p>A change of definition, equation, posture semantics, collapse logic, hierarchy, stage order, ethical policy, or constitutional scope requires a major canon bump. The prior rendering line specifies that ethical policy means the binding rules of truth, provenance, non-manipulation, transparency, do-no-harm posture, and responsibility. KB3 does not redefine that list. A change that would touch posture semantics, the authority hierarchy, determinant logic, minimum required outputs, or profile boundaries is not a rendering patch: it is escalated.</p>

<p>The Developer Platform follows contract semver: major when a public contract breaks, minor when it extends without breaking, patch for a clarification. A silent break is prohibited. A deprecation window must be published.</p>

## Historical resolution

<table>
  <thead><tr><th>Label</th><th>Treatment</th></tr></thead>
  <tbody>
    <tr><td>v1.x</td><td>Canon history, legacy</td></tr>
    <tr><td>KB1.1</td><td>Historical rendering</td></tr>
    <tr><td>KB2</td><td>Prior rendering line. Continuity only. Not active.</td></tr>
    <tr><td>KB3</td><td>Enacted, active doctrinal rendering line, the owner’s declaration of 19 October 2026. No signed record in the files provided. Not a canon version, and not a code module.</td></tr>
    <tr><td>Informal “v3”</td><td>Deprecated as a canonical reference. Became a profile.</td></tr>
    <tr><td>K+4 RC</td><td>Implementation line. Chassis, not semantic sovereignty.</td></tr>
    <tr><td>TENIR2C</td><td>Review branch / platform line</td></tr>
    <tr><td>IronOmega, 5.0.0 through 5.6.x</td><td>Names of the code line in the repositories. They belong to the platform namespace. They are not TENIR 2.0.</td></tr>
  </tbody>
</table>

<p>Compliance classes named by the prior rendering line, kept because KB3 requires them to stay visible and does not rename them: Canonical 2.0, Legacy processable, Profile-governed, Simplified public-facing, Illustrative only. This site is simplified public-facing. The architecture drawing, the control-plane demo, and the interactive walkthrough are illustrative only. KB3 is not the Canonical 2.0 class: it is the enacted, active doctrinal rendering line, outside the code. Enactment is the owner’s declaration of 19 October 2026. The files provided with that declaration contain no signed record under <code>00_GOVERNANCE/04_DECISIONS_AND_RATIFICATIONS</code>. KB2 is no longer an active rendering line.</p>

<p>Specialized services and applications wrap or extend KB3. They build on that line and must not redefine it: no new posture vocabulary, no authority they do not hold, no version line that imitates the canon. TENIR-Gov, in the platform namespace, the IronOmega line, is an implementation that should align to KB3. It is not KB3, and this page points at no source file as a KB3 module.</p>

## What the repositories are entitled to say

<p>Every exposed surface should declare, where relevant, the doctrinal or spec version, the product version, the contract version, the compliance class, the active profiles, and the authority it does or does not carry. The files that were read do not all do this. The <code>pyproject.toml</code> of <code>tenir_governance</code> says 5.6.1. The changelog says that entry is not a publication and that a PyPI package must not be inferred from it. <code>CITATION.cff</code> and <code>.zenodo.json</code> still carry 5.5.0, and the citation points at the hyphenated repository. The README of the same tree still describes an earlier line and a test count that is no longer the 5.6.0 changelog’s count.</p>

<p>The prior rendering line also names a portfolio: Lens as a reading instrument, Engine API as a traceable diagnostic core, Governance as a control plane, an agentic profile, and an institutional programme in which UM6P is cited as a possible setting for pilots. The designated reading case is the public Anthropic Economic Index corpus. Nothing in the cloned repositories records a deployment, an agreement, or an endorsement by those third parties. The February 2026 schemas describe an analysis API whose hosts are examples (<code>api.tenir.example.com</code>).</p>
