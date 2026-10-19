---
title: TENIR
kicker: TENIR 2.0 · rendu public
description: TENIR est un cadre de diagnostic et de gouvernance pour les unités bornées sous pression, et le nom d’une ligne d’exécution qui tente de tenir la frontière entre une intention et un effet.
lede: Diagnostiquer si une unité reconstruite peut encore tenir, puis empêcher qu’une action devienne un effet tant que les conditions exigées ne sont pas établies.
sources: KB3, cible de rendu maintenue, prête pour ratification ; KB2, ligne antérieure (30 mars 2026) ; guide public Beyond the Layers ; dépôts publics au 19 octobre 2026
---

<p>TENIR 2.0 est un cadre diagnostique et de gouvernance, reconstruction-first, pour les unités bornées sous pression. Il porte sur l’admissibilité, la préservation des options, la validité épistémique, la récupérabilité et la posture. Cette page est un rendu public simplifié. Elle suit KB3, cible de rendu maintenue, prête pour ratification et non formellement instituée. KB3 rend le sens ; il n’est pas un nouveau canon. Les définitions qu’il ne reformule pas sont conservées depuis KB2 (30 mars 2026), ligne de rendu antérieure, sans autorité active simultanée. Le mot TENIR désigne aussi, dans les dépôts, une ligne d’implémentation : TENIR-Gov, le runtime de référence du standard Runtime Execution Governance (REG).</p>

<div class="triad">
  <article class="card">
    <p class="sym">τ</p>
    <p class="role">Invariant</p>
    <h2>TAU</h2>
    <p>Le faisceau invariant qui définit l’identité admissible à l’échelle déclarée. S’il est violé, l’unité change de nature ou perd sa validité dans le sens pertinent. Libellé conservé depuis la ligne antérieure : KB3 ne reformule pas TAU.</p>
  </article>
  <article class="card">
    <p class="sym">⟂</p>
    <p class="role">Posture</p>
    <h2>TENIR</h2>
    <p>Le maintien discipliné qui empêche la violation de TAU tout en préservant l’espace d’options admissible et l’intégrité décisionnelle sous pression.</p>
  </article>
  <article class="card">
    <p class="sym">⊥</p>
    <p class="role">Sortie</p>
    <h2>Posture</h2>
    <p>Les termes fixés sont NORMAL, CAUTION et HOLDING-FIRST. CAUTION : l’action reste possible, mais des contraintes matérielles restent ouvertes. HOLDING-FIRST : l’action ne doit pas avancer tant que les blocages déterminants ne sont pas résolus. Le score informe. Il ne décide pas seul.</p>
  </article>
</div>

## Pourquoi cela importe maintenant

Les systèmes autonomes ne se contentent plus de produire une réponse. Ils appellent des outils, envoient des requêtes, modifient des enregistrements, déplacent de l’argent, délèguent et déclenchent des événements hors d’eux-mêmes. La question de sûreté devient alors une question d’exécution : que doit-il rester vrai pendant que le système agit, et comment le vérifier quand l’information est incomplète.

Un composant peut appliquer correctement sa règle locale et laisser pourtant le système entier dans un état non admissible. Deux agents autorisés chacun à dépenser 1&nbsp;000 peuvent exécuter une seule fois deux paiements distincts et dépasser un budget commun de 1&nbsp;500. L’idempotence a empêché le doublon. Elle n’a pas tenu la limite globale.

Un délai n’est pas une preuve d’échec. Une confirmation absente n’est pas une preuve de succès. La demande peut n’avoir jamais atteint le service, ou le service peut avoir engagé l’effet sans que l’accusé revienne. Reprendre sur le seul silence peut dupliquer l’effet. Fail-closed, ici, ne veut pas dire renoncer : ne pas faire le pas suivant tant qu’une condition nécessaire reste non établie.

<blockquote>Le modèle propose. La couche constitutionnelle adjudique. La couche de gouvernance applique. L’humain responsable demeure comptable.</blockquote>

## Trois couches à ne pas confondre

<div class="grid-3">
  <article class="card">
    <p class="role">Rendu · KB3</p>
    <h3>Doctrine rendue</h3>
    <p>TENIR 2.0 nomme le cadre : identité admissible, portes, posture, effondrement. KB3 est la cible de rendu maintenue, prête pour ratification, non formellement instituée. Elle n’est pas un nouveau canon. KB2 est la ligne antérieure, pour la continuité seulement. La gouvernance et la source machine restent en amont.</p>
  </article>
  <article class="card">
    <p class="role">Standard</p>
    <h3>REG</h3>
    <p>Runtime Execution Governance fixe les obligations de la frontière d’exécution. RFC-0 à RFC-7 sont des brouillons gelés. Le standard ne prescrit pas le mécanisme. Une disposition d’exécution n’est pas une posture.</p>
  </article>
  <article class="card">
    <p class="role">Plateforme</p>
    <h3>TENIR-Gov</h3>
    <p>L’implémentation de référence, ligne IronOmega puis 5.x. Elle sert le cadre. Elle ne le redéfinit pas. La 5.6.1 n’est pas une publication.</p>
  </article>
</div>

<p>Le guide public <em>Beyond the Layers</em> pose la distinction utile pour un lecteur non spécialiste : la gouvernance dit ce qui est permis ; le middleware et le runtime appliquent des contraintes au moment d’agir. Les diagrammes de couches disent où vivent les composants. Ils ne disent pas ce que ces composants protègent. Ce guide est une simplification. Il n’est pas la ligne de rendu.</p>

## Parcours de lecture

<ol class="path">
  <li><a href="/origine/">Origine</a></li>
  <li><a href="/concepts/">Concepts</a></li>
  <li><a href="/architecture/">Architecture</a></li>
  <li><a href="/standard/">Standard REG</a></li>
  <li><a href="/versions/">Versions</a></li>
  <li><a href="/conformance/">Conformance</a></li>
  <li><a href="/statut/">Statut</a></li>
</ol>

## À qui s’adresse ce site

<ul>
  <li><strong>Lecteur général.</strong> La page d’accueil et l’origine suffisent pour la question : que doit-il rester vrai quand un système agit.</li>
  <li><strong>Ingénieur.</strong> L’architecture, les dépôts et la conformance indiquent ce qui s’exécute, ce qui se lance, et ce qui n’est pas démontré.</li>
  <li><strong>Chercheur ou lecteur de norme.</strong> Les concepts, le standard et le statut séparent le rendu, les RFC, les preuves d’auteur et les limites d’un harnais de laboratoire.</li>
</ul>

<div class="callout callout-limit">
  <p><strong>Limite.</strong> Classe de cette page : simplified public-facing. Aucun adopteur, aucun revenu et aucun chiffre d’impact ne sont établis par les dépôts publics. La ligne antérieure nomme des surfaces de produit et un cas de lecture ; ce n’est pas un registre de déploiements. Le document d’architecture illustrative conditionne en outre la communication publique marketing à une version durcie 5.7.0, qui n’existe pas dans l’arbre lu.</p>
</div>
