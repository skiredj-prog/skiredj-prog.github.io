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

## Diagnostic des contrôles d’un agent

<p>Une action a été envoyée, mais son résultat reste incertain ? Ou votre équipe prépare sa mise en service ? Nous examinons avec vous ses règles, ses traces et ses conditions de reprise. Vous repartez avec une fiche sourcée : faits établis, questions ouvertes et prochain contrôle à vérifier.</p>

<p>Une action · un périmètre convenu · une restitution accompagnée.</p>

<div class="actions">
  <a class="btn btn-primary" href="mailto:skiredj@tenirlabs.cc?subject=Cadrage%20%E2%80%94%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent&amp;body=Bonjour%2C%0A%0AJe%20souhaite%20cadrer%20un%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent.%0A%0A1.%20Quelle%20action%20pr%C3%A9cise%20l%E2%80%99agent%20peut-il%20d%C3%A9clencher%2C%20dans%20quel%20syst%C3%A8me%2C%20et%20quelle%20cons%C3%A9quence%20faut-il%20pr%C3%A9server%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A2.%20Quel%20incident%2C%20doute%20ou%20changement%20motive%20la%20demande%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A3.%20Quelle%20d%C3%A9cision%20faut-il%20prendre%2C%20et%20%C3%A0%20quelle%20%C3%A9ch%C3%A9ance%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A4.%20Quelles%20r%C3%A8gles%2C%20personnes%20et%20traces%20sont%20accessibles%20pour%20l%E2%80%99examen%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A5.%20Qui%20porte%20la%20d%C3%A9cision%20et%20le%20budget%20du%20diagnostic%2C%20et%20qui%20participera%20%C3%A0%20la%20restitution%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0AMerci.">Cadrer mon diagnostic</a>
  <a class="btn" href="/offre/">Lire l’offre</a>
</div>

<p><a href="/offre/exemple/">Voir un exemple rempli — simulation locale</a>. Le contexte, les points de douleur et les scénarios illustratifs sont sur <a href="/applications/">Applications</a>.</p>

## Statut et limites

<p>KB3 est la ligne de rendu doctrinale instituée et active, par la déclaration du propriétaire du 19 octobre 2026. KB2 est la ligne antérieure. KB3 n’est pas dans le code. Ce site ne déclare aucune implémentation close. Le détail est sur la page <a href="/statut/">Statut</a>.</p>

<p>Classe de cette page : simplified public-facing. Aucun adopteur, aucun revenu et aucun chiffre d’impact ne sont établis par les dépôts publics. La ligne antérieure nomme des surfaces de produit et un cas de lecture ; ce n’est pas un registre de déploiements. Le document d’architecture illustrative conditionne en outre la communication publique marketing à une version durcie 5.7.0, qui n’existe pas dans l’arbre lu.</p>
