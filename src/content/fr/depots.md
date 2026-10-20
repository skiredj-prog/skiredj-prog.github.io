---
title: Dépôts
kicker: Cartographie · 19 octobre 2026
description: Rôle de chaque dépôt public de skiredj-prog lié à TENIR, REG et IronOmega, avec les fichiers à ouvrir en premier.
lede: "Sept dépôts publics, lus le 19 octobre 2026. L’un, celui-ci, était vide à cette date. Les autres ne sont pas sept copies du même logiciel : doctrine, standard, runtime et schémas n’y avaient pas le même âge ni la même autorité."
sources: arbres clonés le 19 octobre 2026 ; politique de namespaces v2
---

<table>
  <thead>
    <tr><th>Dépôt</th><th>Rôle</th><th>Repère lu</th><th>Ouvrir d’abord</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir_governance">tenir_governance</a></td>
      <td>Runtime actif. Membrane, budget, backends, ledger, composition.</td>
      <td><code>pyproject.toml</code> 5.6.1, journal : pas une publication. Commit du 19 octobre 2026. Apache-2.0. Classifieur Beta.</td>
      <td><a href="https://github.com/skiredj-prog/tenir_governance/blob/main/CHANGELOG.md">CHANGELOG</a>, <a href="https://github.com/skiredj-prog/tenir_governance/blob/main/README.md">README</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/reg-conformance">reg-conformance</a></td>
      <td>Suite et textes du standard REG. Neutre quant au mécanisme.</td>
      <td>Commit du 19 octobre 2026, message v0.5.0. Apache-2.0.</td>
      <td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/README.md">README</a>, <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/spec.md">spec.md</a>, <a href="https://github.com/skiredj-prog/reg-conformance/tree/main/reg-standards-baseline/rfc">RFC</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1">tenir-conformance-s1-g1</a></td>
      <td>Harnais de laboratoire S1 G0+G1. Pas une validation de production.</td>
      <td>Version 0.1.0. Pas de fichier LICENSE dans l’arbre cloné.</td>
      <td><a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1/blob/main/README.md">README</a>, <a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1/blob/main/STATUS.md">STATUS</a>, <a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1/blob/main/G0_S1_Evidence_Lost_After_Commit.md">G0 S1</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir-governance">tenir-governance</a></td>
      <td>Instantané de la ligne R5, branche par défaut <code>master</code>.</td>
      <td>Version 5.0.0, commit du 18 juillet 2026 : baseline IronOmega R5. Apache-2.0.</td>
      <td><a href="https://github.com/skiredj-prog/tenir-governance/blob/master/README.md">README</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir-gov">tenir-gov</a></td>
      <td>Même famille, décrite sur GitHub comme IronOmega 5.0.0.</td>
      <td>Version 5.0.0, 29 juin 2026. Apache-2.0. Code sous <code>r5_hardened/IRON_OMEGA_R5</code>.</td>
      <td><a href="https://github.com/skiredj-prog/tenir-gov/blob/main/README.md">README</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/tenir-schemas">tenir-schemas</a></td>
      <td>Faisceau JSON Schema et OpenAPI d’un moteur d’analyse, février 2026.</td>
      <td>v1.0.0. Certains schémas sont des stubs. Pas de LICENSE dans l’arbre cloné. Les <code>$id</code> visent <code>skiredj-prog.github.io</code>, vide à la date de cette lecture.</td>
      <td><a href="https://github.com/skiredj-prog/tenir-schemas/blob/main/schemas/v1/index.json">index</a>, <a href="https://github.com/skiredj-prog/tenir-schemas/blob/main/openapi/tenir-engine.openapi.yaml">OpenAPI</a></td>
    </tr>
    <tr>
      <td><a href="https://github.com/skiredj-prog/skiredj-prog.github.io">skiredj-prog.github.io</a></td>
      <td>Cible de GitHub Pages. Vide au moment de la lecture du 19 octobre 2026. Ce n’est plus l’état du dépôt.</td>
      <td>Aucun fichier à cette date.</td>
      <td>Le README de ce site explique comment y publier le rendu.</td>
    </tr>
  </tbody>
</table>

## Comment ils s’articulent

<p>KB3 ne vit pas dans ces dépôts. C’est la ligne de rendu doctrinale instituée, une couche documentaire hors du code. Le runtime doit s’y aligner ; il ne le constitue pas. Les services ou applications spécialisés enveloppent ou étendent KB3 et ne doivent pas le redéfinir. KB2 est la ligne antérieure, pour la continuité. La politique de namespaces reste la note de versions. Aucun de ces textes n’est « le » sens porté par le code, et cette page ne désigne aucun chemin comme module KB3. <code>reg-conformance</code> porte le standard et la suite. <code>tenir_governance</code> est le runtime le plus récent de la ligne IronOmega / 5.x. Les dépôts <code>tenir-gov</code> et <code>tenir-governance</code> sont des états antérieurs de cette ligne, pas des forks au sens d’un produit différent : le second est initialisé, le 18 juillet 2026, comme baseline v5.0.0-IronOmega-R5. Le harnais S1 teste des définitions opérationnelles contre une membrane de laboratoire ; il peut appeler le moteur de score, sans certifier le runtime. <code>tenir-schemas</code> est antérieur : son <code>TauResult</code> porte une distance, un epsilon et un statut de continuité OK, FRAGILIZED ou BROKEN. Ce n’est pas le faisceau TAU conservé depuis la ligne antérieure, ni l’Autonomous Unit du manuscrit. Les statuts OK, FRAGILIZED et BROKEN ne sont pas les postures NORMAL, CAUTION et HOLDING-FIRST.</p>

<p>Auteur indiqué dans les <code>pyproject.toml</code> et les citations : Abdelaziz Skiredj. Courriel public de ce site : <a href="mailto:skiredj@tenirlabs.cc">skiredj@tenirlabs.cc</a>. L’affiliation « TENIR Labs » et l’ORCID <a href="https://orcid.org/0009-0003-2678-4069">0009-0003-2678-4069</a> figurent dans <code>CITATION.cff</code> de <code>tenir_governance</code>. Les DOI qui y sont écrits ne concordent pas tous avec le README ni avec la version du paquet. Voir la page Statut avant de citer un identifiant.</p>
