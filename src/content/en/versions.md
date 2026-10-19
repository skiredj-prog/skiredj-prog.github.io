---
title: Versions
kicker: Policy v2 · 4 April 2026
description: TENIR namespaces — canon, knowledge base, profiles, platform, products, extensions — and what each repository is allowed to mean.
lede: A platform version does not replace a doctrinal version. No profile, product, or extension imitates a canonical line.
sources: TENIR Versioning, Namespace and Governed Extension Policy v2; KB2, artifact 00
---

<p>The note of 4 April 2026 is active. It supersedes the earlier naming policy where developer surfaces were not yet named. It protects semantic integrity across canon, knowledge base, profiles, platform, products, and the developer ecosystem.</p>

## Namespaces

<table>
  <thead><tr><th>Namespace</th><th>Reserved for</th><th>Given examples</th></tr></thead>
  <tbody>
    <tr><td>Canon</td><td>Constitutional framework versions</td><td>TENIR 2.0, later TENIR 2.1</td></tr>
    <tr><td>Knowledge base</td><td>Doctrinal rendering</td><td>KB1.1, historical; KB2, active</td></tr>
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

<p>A change of definition, equation, posture semantics, collapse logic, hierarchy, stage order, ethical policy, or constitutional scope requires a major canon bump. KB2 specifies that ethical policy means the binding rules of truth, provenance, non-manipulation, transparency, do-no-harm posture, and responsibility.</p>

<p>The Developer Platform follows contract semver: major when a public contract breaks, minor when it extends without breaking, patch for a clarification. A silent break is prohibited. A deprecation window must be published.</p>

## Historical resolution

<table>
  <thead><tr><th>Label</th><th>Treatment</th></tr></thead>
  <tbody>
    <tr><td>v1.x</td><td>Canon history, legacy</td></tr>
    <tr><td>KB1.1</td><td>Historical rendering</td></tr>
    <tr><td>Informal “v3”</td><td>Deprecated as a canonical reference. Became a profile.</td></tr>
    <tr><td>K+4 RC</td><td>Implementation line. Chassis, not semantic sovereignty.</td></tr>
    <tr><td>TENIR2C</td><td>Review branch / platform line</td></tr>
    <tr><td>IronOmega, 5.0.0 through 5.6.x</td><td>Names of the code line in the repositories. They belong to the platform namespace. They are not TENIR 2.0.</td></tr>
  </tbody>
</table>

<p>Compliance classes named by KB2: Canonical 2.0, Legacy processable, Profile-governed, Simplified public-facing, Illustrative only. This site is a simplified public rendering. The architecture drawing is illustrative only. KB2 is the doctrinal rendering, active, while the formal constitutional note is pending.</p>

## What the repositories are entitled to say

<p>Every exposed surface should declare, where relevant, the doctrinal or spec version, the product version, the contract version, the compliance class, the active profiles, and the authority it does or does not carry. The files that were read do not all do this. The <code>pyproject.toml</code> of <code>tenir_governance</code> says 5.6.1. The changelog says that entry is not a publication and that a PyPI package must not be inferred from it. <code>CITATION.cff</code> and <code>.zenodo.json</code> still carry 5.5.0, and the citation points at the hyphenated repository. The README of the same tree still describes an earlier line and a test count that is no longer the 5.6.0 changelog’s count.</p>

<p>KB2 also names a portfolio: Lens as a reading instrument, Engine API as a traceable diagnostic core, Governance as a control plane, an agentic profile, and an institutional programme in which UM6P is cited as a possible setting for pilots. The designated reading case is the public Anthropic Economic Index corpus. Nothing in the cloned repositories records a deployment, an agreement, or an endorsement by those third parties. The February 2026 schemas describe an analysis API whose hosts are examples (<code>api.tenir.example.com</code>).</p>
