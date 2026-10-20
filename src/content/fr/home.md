---
title: Une action a été autorisée. Sa réponse n’arrive pas.
kicker: Atelier de diagnostic
description: Atelier de diagnostic des contrôles d’agents. L’état UNKNOWN, le reçu perdu, puis l’arc Tenir, Trancher, Prouver.
lede: L’état est UNKNOWN. Renvoyer, au risque d’un double effet, ou attendre ?
sources: démo Execution Control Plane, scène 5, Timeout → Reconcile ; KB3, ligne instituée le 19 octobre 2026 ; KB2, ligne antérieure
---

<p>Beaucoup de systèmes d’agents renvoient, et espèrent. TENIR exige de prouver l’état avant d’agir de nouveau. L’absence de preuve n’est pas la preuve de la non-exécution.</p>

<div class="grid-3">
  <article class="card">
    <p class="role">Tenir</p>
    <h2>Ancrage</h2>
    <p>Ce qui doit rester intact : la trajectoire, l’espace d’options, la vérité de ce qui est connu, et TAU. Les postures sont NORMAL, CAUTION et HOLDING-FIRST. Ce ne sont pas les verdicts d’exécution.</p>
    <p><a href="/concepts/">Concepts</a> · <a href="/origine/">Origine</a></p>
  </article>
  <article class="card">
    <p class="role">Trancher</p>
    <h2>La membrane décide</h2>
    <p>La membrane tranche. PASS, FLAG, HOLD et HARD_VETO sont des verdicts d’exécution. Ils restent un champ distinct des postures. Le HOLD d’une opération n’est pas HOLDING-FIRST.</p>
    <p><a href="/architecture/demo/#scene-5">Démonstration</a> · <a href="/architecture/interactive/">Parcours interactif</a></p>
  </article>
  <article class="card">
    <p class="role">Prouver</p>
    <h2>Intended vs Confirmed</h2>
    <p>L’intention et la confirmation ne se confondent pas. Une preuve manquante ne dit pas que l’effet n’a pas eu lieu. Les garanties montrées restent bornées au périmètre écrit.</p>
    <p><a href="/conformance/">Conformance</a> · <a href="/statut/">Statut</a></p>
  </article>
</div>

## Avant de connecter un agent à des actions coûteuses…

<p>Un diagnostic accompagné, pour identifier les contrôles, les cas d’incertitude et les preuves à conserver, avec des garanties explicitement bornées dans un périmètre défini.</p>

<p><a class="btn btn-primary" href="mailto:skiredj@tenirlabs.cc">Demander un diagnostic</a></p>

<p>Le contexte, les points de douleur et les scénarios illustratifs sont sur <a href="/applications/">Applications</a>.</p>

## Statut et limites

<p>KB3 est la ligne de rendu doctrinale instituée et active, par la déclaration du propriétaire du 19 octobre 2026. KB2 est la ligne antérieure. KB3 n’est pas dans le code. Ce site ne déclare aucune implémentation close. Le détail est sur la page <a href="/statut/">Statut</a>.</p>

<p>Classe de cette page : simplified public-facing. Aucun adopteur, aucun revenu et aucun chiffre d’impact ne sont établis par les dépôts publics. La ligne antérieure nomme des surfaces de produit et un cas de lecture ; ce n’est pas un registre de déploiements. Le document d’architecture illustrative conditionne en outre la communication publique marketing à une version durcie 5.7.0, qui n’existe pas dans l’arbre lu.</p>
