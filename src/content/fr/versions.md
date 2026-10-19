---
title: Versions
kicker: Politique v2 · 4 avril 2026
description: Espaces de noms TENIR — canon, knowledge base, profils, plateforme, produits, extensions — et ce que chaque dépôt est autorisé à signifier.
lede: Une version de plateforme ne remplace pas une version de doctrine. Aucun profil, produit ou extension ne mime une ligne canonique.
sources: TENIR Versioning, Namespace and Governed Extension Policy v2 ; KB2, artifact 00
---

<p>La note du 4 avril 2026 est active. Elle supplante la politique de nommage antérieure là où les surfaces développeur n’étaient pas encore nommées. Elle protège l’intégrité sémantique entre le canon, la knowledge base, les profils, la plateforme, les produits et l’écosystème développeur.</p>

## Espaces

<table>
  <thead><tr><th>Espace</th><th>Réservé à</th><th>Exemples donnés</th></tr></thead>
  <tbody>
    <tr><td>Canon</td><td>Versions du cadre constitutionnel</td><td>TENIR 2.0, plus tard TENIR 2.1</td></tr>
    <tr><td>Knowledge base</td><td>Rendu doctrinal</td><td>KB1.1, historique ; KB2, actif</td></tr>
    <tr><td>Profils et modules</td><td>Doctrine spécialisée, sans remplacer le canon</td><td>Gouvernance agentique, métabolique, rhizomatique, chacun en v1.0 dans les exemples</td></tr>
    <tr><td>Plateforme</td><td>Releases d’implémentation</td><td>K+4 RC, TENIR2C</td></tr>
    <tr><td>Produits</td><td>Surfaces visibles par l’utilisateur</td><td>Lens / Studio, Engine API, Governance, Reports</td></tr>
    <tr><td>Developer Platform</td><td>Contrats d’écosystème</td><td>Contract Registry, portail, sandbox, kits</td></tr>
    <tr><td>Extension partenaire</td><td>Intégrations tierces sous gouvernance explicite</td><td>Exemples nommés : connecteur UM6P, pont d’export de gouvernance</td></tr>
  </tbody>
</table>

## Interdits

<ol>
  <li>Aucun overlay, module, profil, produit, surface développeur ou extension partenaire n’imite une ligne de version canonique.</li>
  <li>Aucune API publique ni aucun portail n’implique une autorité sémantique qu’il n’a pas.</li>
  <li>Aucune extension ne supprime, quand c’est pertinent, la classe de conformité, le profil actif, la version de contrat ou les limites d’autorité.</li>
</ol>

<p>Un changement de définition, d’équation, de sémantique de posture, de logique de collapse, de hiérarchie, d’ordre des étapes, de politique éthique ou de périmètre constitutionnel demande une version majeure du canon. KB2 précise que la politique éthique désigne les règles contraignantes de vérité, de provenance, de non-manipulation, de transparence, de posture de non-nuisance et de responsabilité.</p>

<p>La Developer Platform suit un semver de contrat : majeur si le contrat public casse, mineur s’il s’étend sans casser, correctif pour une clarification. Une rupture silencieuse est interdite. Une fenêtre de dépréciation doit être publiée.</p>

## Résolution historique

<table>
  <thead><tr><th>Étiquette</th><th>Traitement</th></tr></thead>
  <tbody>
    <tr><td>v1.x</td><td>Histoire du canon, legacy</td></tr>
    <tr><td>KB1.1</td><td>Rendu historique</td></tr>
    <tr><td>« v3 » informel</td><td>Déprécié comme référence canonique. Devenu profil.</td></tr>
    <tr><td>K+4 RC</td><td>Ligne d’implémentation. Châssis, pas souveraineté sémantique.</td></tr>
    <tr><td>TENIR2C</td><td>Branche de revue / ligne de plateforme</td></tr>
    <tr><td>IronOmega, 5.0.0 à 5.6.x</td><td>Noms de la ligne de code dans les dépôts. Ils appartiennent à l’espace plateforme. Ils ne sont pas TENIR 2.0.</td></tr>
  </tbody>
</table>

<p>Classes de conformité nommées par KB2 : Canonical 2.0, Legacy processable, Profile-governed, Simplified public-facing, Illustrative only. Ce site est un rendu public simplifié. Le dessin d’architecture est illustrative only. KB2 est le rendu doctrinal, actif, pendant que la note constitutionnelle formelle est en attente.</p>

## Ce que les dépôts ont le droit de dire

<p>Chaque surface exposée devrait déclarer, quand c’est pertinent, la version doctrinale ou de spec, la version produit, la version de contrat, la classe de conformité, les profils actifs, et l’autorité qu’elle porte ou ne porte pas. Les fichiers lus ne le font pas tous. Le <code>pyproject.toml</code> de <code>tenir_governance</code> dit 5.6.1. Le journal dit que cette entrée n’est pas une publication et qu’il ne faut pas en inférer un paquet PyPI. <code>CITATION.cff</code> et <code>.zenodo.json</code> portent encore 5.5.0, et la citation pointe un dépôt à trait d’union. Le README du même arbre décrit encore une ligne antérieure et un décompte de tests qui n’est plus celui du journal 5.6.0.</p>

<p>KB2 nomme aussi un portefeuille : Lens comme instrument de lecture, Engine API comme noyau diagnostique traçable, Governance comme plan de contrôle, un profil agentique, et un programme institutionnel où UM6P est cité comme lieu possible de pilotes. Le cas de lecture désigné est le corpus public Anthropic Economic Index. Rien, dans les dépôts clonés, n’enregistre un déploiement, un accord ou une approbation de ces tiers. Les schémas de février 2026 décrivent une API d’analyse dont les hôtes sont des exemples (<code>api.tenir.example.com</code>).</p>
