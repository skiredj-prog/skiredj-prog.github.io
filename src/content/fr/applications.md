---
title: Avant l’action coûteuse
kicker: Côté de celui qui décide
description: Applications de TENIR vues du côté de celui qui connecte un agent à une action coûteuse. Contexte, douleur, valeur, et trois scénarios illustratifs.
lede: L’agent peut proposer. Quelqu’un doit encore savoir si l’effet a eu lieu.
sources: démo Execution Control Plane, scènes 1, 2 et 5 ; page Architecture ; KB3, ligne instituée le 19 octobre 2026
---

<p>Cette page parle à celui qui va connecter un agent à un paiement, un enregistrement ou un appel d’outil. Elle ne décrit pas un déploiement. Aucun secteur, aucun client et aucun chiffre d’impact ne sont établis par les dépôts publics.</p>

## Contexte

<p>Un agent propose une action. Un outil l’envoie. Une réponse peut arriver, tarder, ou ne jamais revenir. Entre l’intention et la confirmation, l’état peut être UNKNOWN : l’envoi a eu lieu, le résultat n’est pas confirmé.</p>

<p>La question n’est pas seulement ce que l’agent a le droit de dire. C’est ce qui doit rester vrai pendant qu’il agit : ne pas doubler un effet déjà parti, ne pas traiter un silence comme une preuve, ne pas laisser une règle locale rendre l’ensemble inadmissible.</p>

## Points de douleur

<ul>
  <li><strong>Le silence.</strong> Renvoyer parce que la réponse manque peut produire un second effet. L’absence de preuve n’est pas la preuve de la non-exécution.</li>
  <li><strong>Le doublon.</strong> La même demande, soumise encore, n’est pas une nouvelle décision. La clé d’idempotence se réclame avant l’évaluation.</li>
  <li><strong>La limite partagée.</strong> Une règle locale peut être respectée pendant que le budget agrégé, l’invariant I8 du dessin, ne l’est plus. L’idempotence arrête la répétition. Elle ne tient pas, à elle seule, la limite de l’ensemble.</li>
  <li><strong>L’intention prise pour une confirmation.</strong> Autoriser n’est pas constater que l’effet externe a eu lieu.</li>
</ul>

## Proposition de valeur

<p>TENIR demande de prouver l’état avant d’agir de nouveau. La membrane tranche. Les verdicts d’exécution, PASS, FLAG, HOLD et HARD_VETO, restent un champ distinct des postures NORMAL, CAUTION et HOLDING-FIRST.</p>

<p>Ce qui est proposé, dans le périmètre public, est un diagnostic accompagné : une action, un périmètre convenu, une fiche qui sépare les faits établis, les inconnues et le prochain contrôle. Les garanties restent bornées à ce périmètre. Ce site ne certifie aucune implémentation. Il ne promet pas un effet externe exactement une fois. Le détail du service est sur la page <a href="/offre/">Offre</a>.</p>

<div class="actions">
  <a class="btn btn-primary" href="mailto:skiredj@tenirlabs.cc?subject=Cadrage%20%E2%80%94%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent&amp;body=Bonjour%2C%0A%0AJe%20souhaite%20cadrer%20un%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent.%0A%0A1.%20Quelle%20action%20pr%C3%A9cise%20l%E2%80%99agent%20peut-il%20d%C3%A9clencher%2C%20dans%20quel%20syst%C3%A8me%2C%20et%20quelle%20cons%C3%A9quence%20faut-il%20pr%C3%A9server%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A2.%20Quel%20incident%2C%20doute%20ou%20changement%20motive%20la%20demande%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A3.%20Quelle%20d%C3%A9cision%20faut-il%20prendre%2C%20et%20%C3%A0%20quelle%20%C3%A9ch%C3%A9ance%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A4.%20Quelles%20r%C3%A8gles%2C%20personnes%20et%20traces%20sont%20accessibles%20pour%20l%E2%80%99examen%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A5.%20Qui%20porte%20la%20d%C3%A9cision%20et%20le%20budget%20du%20diagnostic%2C%20et%20qui%20participera%20%C3%A0%20la%20restitution%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0AMerci.">Cadrer mon diagnostic</a>
  <a class="btn" href="/offre/">Lire l’offre</a>
</div>

## Scénarios

<p>Les trois situations ci-dessous sont celles de la démonstration. Elles sont illustrative only. Ce ne sont pas des dossiers clients, ni des secteurs équipés.</p>

<div class="grid-3">
  <article class="card">
    <p class="role">Paiement</p>
    <h3>Une action admissible</h3>
    <p>La démo montre un paiement de 10 sur une capacité de 100. Le score renvoie FLAG, la membrane PASS, la composition FLAG. L’état passe à RESERVED, puis à CONFIRMED après l’envoi. La clé est réclamée à CREATED, avant l’évaluation.</p>
    <p><a href="/architecture/demo/#scene-1">Scène 1</a></p>
  </article>
  <article class="card">
    <p class="role">Doublon</p>
    <h3>La même clé, encore</h3>
    <p>La même clé, soumise une seconde fois, reçoit HARD_VETO. La reprise montrée passe par la réclamation existante, pas par une nouvelle adjudication.</p>
    <p><a href="/architecture/demo/#scene-2">Scène 2</a></p>
  </article>
  <article class="card">
    <p class="role">Reçu perdu</p>
    <h3>Le délai n’est pas un échec</h3>
    <p>Un timeout de fournisseur mène à UNKNOWN, pas à FAILED. UNKNOWN n’est pas terminal. La réconciliation montrée peut confirmer que l’effet a déjà eu lieu. Traiter le silence comme un échec pourrait le doubler.</p>
    <p><a href="/architecture/demo/#scene-5">Scène 5</a></p>
  </article>
</div>

<p>La règle métier citée par le dessin est du même ordre : ne pas double-exécuter un paiement. Elle est complète dans son registre, et pas encore exécutable tant qu’elle n’a pas traversé les niveaux. Le paiement, l’enregistrement et l’appel d’outil sont les classes d’action déjà nommées. Ils ne forment pas un catalogue de secteurs.</p>

## Où voir la mécanique

<p>La démonstration, le parcours interactif et le dessin illustratif sont sous <a href="/architecture/demo/">Mécanique</a>. Le dessin illustratif est en français. Le parcours et la démo du plan de contrôle sont en anglais dans l’artefact.</p>

## Limites

<p>Classe de cette page : simplified public-facing. Les scènes restent attribuées à la démo. Aucun adopteur n’est déclaré. Le détail des bornes est sur <a href="/statut/">Statut</a>.</p>
