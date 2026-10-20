---
title: Produits et services
kicker: Catalogue
description: Le diagnostic accompagné est l’entrée. Les ateliers et l’architecture de gouvernance se cadrent à part. Les briques ouvertes sont publiques, en 5.7.0-rc, FM-20 ouvert.
lede: Le diagnostic accompagné est le point d’entrée. Rien n’est vendu comme SaaS.
sources: offre du 20 octobre 2026 ; dépôts publics lus le 19 octobre 2026 ; guide REG du 19 octobre 2026, cas illustratifs seulement
---

<div class="callout callout-note">
  <p><strong>Limite.</strong> Hypothèse de lancement du 20 octobre 2026. Le format et la charge du diagnostic sont à confirmer dans chaque devis. Cette page ne constitue pas une certification, ni une autorisation de mise en production. La communication publique reste gelée jusqu’à une 5.7.0 durcie. Les briques ouvertes sont en 5.7.0-rc. FM-20 reste ouvert.</p>
</div>

<p>On commence par le diagnostic. Les suites éventuelles se cadrent à part. Rien n’est vendu comme SaaS.</p>

## Le service d’entrée

<p>L’entrée est le diagnostic accompagné des contrôles d’un agent. Le même texte est publié, seul, sur la page <a href="/offre/">Offre</a>. Un <a href="/offre/exemple/">exemple simulé</a> montre la forme de la fiche. Le scénario <a href="/souverainete/">Souveraineté d’exécution</a> est une lecture éditoriale, pas un déploiement.</p>

## La promesse

<p>Votre agent peut déclencher un paiement, modifier une donnée ou envoyer une commande. Qu’est-ce qui l’autorise ? Qu’est-ce qui doit l’arrêter ? Que faire lorsque la réponse manque ?</p>

<p>Avec votre équipe, nous examinons une action précise à partir des règles, documents et traces disponibles. Vous repartez avec une fiche de diagnostic qui distingue les faits établis, les inconnues et le prochain contrôle à vérifier, avec une responsabilité proposée et un critère observable.</p>

<p><strong>La décision préparée.</strong> Les éléments disponibles suffisent-ils pour poursuivre le projet, faut-il obtenir une information supplémentaire, ou faut-il préparer un essai ciblé ? Toute décision opérationnelle reste prise par le responsable compétent du client.</p>

<p>Lorsqu’un dossier nomme PASS, FLAG, HOLD ou HARD_VETO, ce sont des verdicts d’exécution. Ils restent un champ distinct des postures NORMAL, CAUTION et HOLDING-FIRST. UNKNOWN décrit un résultat non confirmé. HOLD est une décision de retenue, notamment sur une demande de relance du même effet logique ; l’autorisation historique reste distincte. HOLD n’est pas la posture HOLDING-FIRST. La membrane, dans le cadre TENIR, est la ligne qui tranche. Le diagnostic ne la remplace pas : il prépare une décision humaine, dans un périmètre écrit.</p>

## Pour qui, et à quel moment

<p>Le commanditaire est le responsable qui porte l’action : direction technique, responsable IA, architecte ou responsable des opérations. Le propriétaire métier et une personne capable d’expliquer le parcours technique participent à l’examen.</p>

<p>Une même offre couvre deux situations, choisies au cadrage.</p>

<div class="table-scroll">
<table>
  <thead><tr><th>Situation</th><th>Question de départ</th><th>Matière examinée</th></tr></thead>
  <tbody>
    <tr><td>Avant une mise en service ou un changement</td><td>Avons-nous défini les contrôles et les conditions de reprise de cette action ?</td><td>Conception, règles et comportements attendus. Les scénarios restent des hypothèses tant qu’ils ne sont pas éprouvés.</td></tr>
    <tr><td>Après un incident ou une réponse ambiguë</td><td>Que pouvons-nous établir avant de décider de la suite ?</td><td>Une occurrence convenue, sa chronologie et les traces accessibles, même partielles.</td></tr>
  </tbody>
</table>
</div>

<p>Exemples d’actions : créer une commande fournisseur, modifier un droit d’accès, publier une donnée ou transmettre une instruction de paiement. Ces exemples décrivent des usages possibles. Ils ne constituent pas des références clients.</p>

## Le périmètre

<p>Le périmètre proposé comprend <strong>un processus, un type d’action, un système destinataire, un environnement de référence et une question centrale</strong>. Pour une revue d’incident, il porte sur une occurrence ou un dossier d’incident convenu par écrit.</p>

<p>Le travail se fait à partir de documents, d’exports et d’entretiens. Il comprend le cadrage, l’analyse, un atelier, une restitution et un cycle de correction factuelle. Il ne demande pas d’accès permettant de déclencher une action en production.</p>

<p>Les modifications de code, l’instrumentation, les tests dans le système du client et le déploiement d’un mécanisme de reprise font l’objet d’un périmètre complémentaire. Le diagnostic peut préciser les essais à réaliser. Leur exécution doit être explicitement convenue.</p>

## Les entrées

<div class="table-scroll">
<table>
  <thead><tr><th>Entrée</th><th>Exemple minimal</th><th>Si elle manque</th></tr></thead>
  <tbody>
    <tr><td>Action et conséquence à préserver</td><td>Créer une seule commande par demande approuvée</td><td>Le cadrage commence par choisir cette action.</td></tr>
    <tr><td>Règles et responsabilités</td><td>Qui autorise, limite de montant ou de volume, conditions d’arrêt</td><td>Une règle déclarée reste une hypothèse à faire confirmer.</td></tr>
    <tr><td>Parcours technique</td><td>Agent, outil, service destinataire, point où l’effet devient engagé</td><td>La cartographie est reconstruite avec l’équipe et marquée comme déclarative.</td></tr>
    <tr><td>Identité et chronologie</td><td>Identifiant de demande, identifiant d’appel, séquence des événements</td><td>Les limites de rapprochement sont consignées.</td></tr>
    <tr><td>Traces disponibles, pour un incident</td><td>Décision, requête, réponse, journal, accusé ou état du destinataire</td><td>La conclusion peut être « non établi » et déboucher sur un plan de collecte.</td></tr>
    <tr><td>Procédure de reprise connue</td><td>Relance, annulation, rapprochement, intervention humaine</td><td>Le diagnostic formule les décisions de conception nécessaires.</td></tr>
    <tr><td>Interlocuteurs et décision attendue</td><td>Responsable métier, responsable technique, décision à préparer</td><td>La proposition précise les participants nécessaires avant démarrage.</td></tr>
  </tbody>
</table>
</div>

<p>Les documents peuvent être expurgés des secrets et des données sans utilité pour la question. Les modalités de transmission, d’accès, de conservation et de suppression sont convenues au cadrage.</p>

## Les cinq étapes

<ol>
  <li><strong>Cadrage de 30 minutes.</strong> Choisir l’action, la question, les sources accessibles et les critères de réception. Le périmètre écrit permet de décider du lancement.</li>
  <li><strong>Préparation documentaire.</strong> Inventorier les sources, relever les contradictions et préparer la grille des contrôles.</li>
  <li><strong>Atelier de 90 minutes.</strong> Reconstituer autorisation, envoi, résultat et ressource engagée. Examiner le déroulement normal et les exceptions pertinentes.</li>
  <li><strong>Analyse et rédaction.</strong> Produire la fiche, les références et au maximum trois actions prioritaires dans le périmètre convenu.</li>
  <li><strong>Restitution de 45 minutes.</strong> Relire les faits, préciser les désaccords, confirmer les responsables et décider de la suite. Un cycle de correction factuelle est inclus.</li>
</ol>

<p>Une enveloppe initiale de deux à trois jours de travail prestataire, répartis sur une semaine après réception des éléments convenus, peut servir à chiffrer les premiers devis. Ce format reste à éprouver sur les premières missions. Il ne constitue pas un délai contractuel déjà garanti.</p>

## Ce que l’on examine

<div class="table-scroll">
<table>
  <thead><tr><th>Question</th><th>Ce que l’examen recherche</th></tr></thead>
  <tbody>
    <tr><td>Autorisation</td><td>Règle applicable, autorité, limites et observation requise avant envoi.</td></tr>
    <tr><td>Identité de l’action</td><td>Lien entre demande, tentative, appel et effet attendu. Comportement lors d’un rejeu.</td></tr>
    <tr><td>Résultat</td><td>Différence entre autorisation, appel enregistré, réponse reçue et effet confirmé.</td></tr>
    <tr><td>Ressource engagée</td><td>Montant ou quota consommé, réservé et disponible. Règle de mise à jour.</td></tr>
    <tr><td>Exceptions</td><td>Refus, observation absente ou périmée, réponse inconnue, demande concurrente et interruption, selon le cas.</td></tr>
    <tr><td>Reprise</td><td>Information faisant autorité, responsable de la décision et condition nécessaire avant une nouvelle tentative.</td></tr>
  </tbody>
</table>
</div>

<p>Chaque point reçoit un statut : <strong>documenté</strong>, <strong>déclaré par l’équipe</strong>, <strong>démontré par un essai identifié</strong>, ou <strong>non établi</strong>. Un essai du démonstrateur TENIR/REG ne démontre pas le comportement du système du client.</p>

## Les livrables

<p><strong>Une fiche de synthèse d’une page</strong> : action, question, périmètre, principaux constats, inconnues, conclusion et prochain contrôle.</p>

<p><strong>Des annexes de travail courtes</strong> : cartographie de l’action, registre des sources et grille des contrôles examinés. Une trace est référencée par fichier, identifiant, séquence ou chemin exploitable. Une déclaration est attribuée à son interlocuteur.</p>

<p><strong>Un plan de suite limité à trois priorités</strong> : problème traité, contrôle proposé, preuve attendue, responsabilité proposée puis confirmée par le client, et condition de clôture. Si les éléments suffisent déjà, le dossier peut conclure à l’absence de complément nécessaire dans le périmètre étudié.</p>

<p>Le démonstrateur peut servir de support pédagogique pendant l’atelier. La valeur livrée est l’analyse du cas du client et la décision qu’elle permet de préparer. L’<a href="/offre/exemple/">exemple rempli — simulation locale, issue inconnue</a> montre la forme attendue. Ce n’est pas une référence client.</p>

## Les critères de réception

<div class="table-scroll">
<table>
  <thead><tr><th>Critère</th><th>Vérification lors de la restitution</th></tr></thead>
  <tbody>
    <tr><td>Périmètre explicite</td><td>L’action, le système, l’environnement et la question sont nommés. Les limites sont visibles.</td></tr>
    <tr><td>Constats traçables</td><td>Chaque constat important renvoie à une source retrouvable, à une déclaration attribuée ou à une lacune explicite.</td></tr>
    <tr><td>États correctement distingués</td><td>Autorisation, envoi, résultat et ressource engagée sont présentés séparément.</td></tr>
    <tr><td>Incertitude conservée</td><td>Chaque information manquante indique ce qu’elle empêche de conclure et, si possible, comment l’obtenir.</td></tr>
    <tr><td>Suite exploitable</td><td>Chaque action prioritaire a un objectif, une responsabilité identifiée ou à confirmer, et un critère observable.</td></tr>
    <tr><td>Relecture close</td><td>Les corrections factuelles sont intégrées. Les désaccords restant ouverts sont consignés.</td></tr>
  </tbody>
</table>
</div>

<p>Une conclusion « non établi avec les éléments disponibles » est recevable si elle explique la lacune et ses conséquences. La réception n’exige ni découverte d’une défaillance, ni résolution de l’incident, ni achat de logiciel. Elle ne constitue pas une certification ou une autorisation générale de mise en production.</p>

## Forfait sur devis

<p id="cadrer"><strong>Un forfait sur devis, accepté après cadrage.</strong> Le devis fixe le volume documentaire, les participants, les dates, le format des livrables et les modalités de réception. Aucun prix n’est affiché ici.</p>

<p>Un second processus, plusieurs environnements, une reconstitution technique étendue ou des essais supplémentaires déclenchent un recadrage écrit. Un atelier ou une architecture de gouvernance, décrits plus bas, restent des suites possibles, cadrées à part.</p>

<p>Le bouton ouvre un message à <a href="mailto:skiredj@tenirlabs.cc">skiredj@tenirlabs.cc</a>, déjà structuré par cinq questions : l’action et la conséquence à préserver, le motif, la décision et son échéance, les sources accessibles, et qui porte la décision. Le site ne l’envoie pas : la messagerie s’ouvre chez vous, pour relecture.</p>

<div class="actions">
  <a class="btn btn-primary" href="mailto:skiredj@tenirlabs.cc?subject=Cadrage%20%E2%80%94%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent&amp;body=Bonjour%2C%0A%0AJe%20souhaite%20cadrer%20un%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent.%0A%0A1.%20Quelle%20action%20pr%C3%A9cise%20l%E2%80%99agent%20peut-il%20d%C3%A9clencher%2C%20dans%20quel%20syst%C3%A8me%2C%20et%20quelle%20cons%C3%A9quence%20faut-il%20pr%C3%A9server%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A2.%20Quel%20incident%2C%20doute%20ou%20changement%20motive%20la%20demande%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A3.%20Quelle%20d%C3%A9cision%20faut-il%20prendre%2C%20et%20%C3%A0%20quelle%20%C3%A9ch%C3%A9ance%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A4.%20Quelles%20r%C3%A8gles%2C%20personnes%20et%20traces%20sont%20accessibles%20pour%20l%E2%80%99examen%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A5.%20Qui%20porte%20la%20d%C3%A9cision%20et%20le%20budget%20du%20diagnostic%2C%20et%20qui%20participera%20%C3%A0%20la%20restitution%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0AMerci.">Cadrer mon diagnostic</a>
  <a class="btn" href="/offre/exemple/">Voir l’exemple simulé</a>
  <a class="btn" href="/souverainete/">Lire le scénario Souveraineté</a>
</div>

## Suites possibles

<p>Ces deux prestations ne font pas partie du diagnostic. Chacune a son propre cadrage, ses livrables à contractualiser et ses critères de réception. Le modèle reste un forfait sur devis après cadrage. Aucun prix n’est affiché.</p>

<div class="grid-2">
  <article class="card">
    <p class="role">Suite · à cadrer à part</p>
    <h3>Ateliers et formation</h3>
    <p>Un langage commun pour les équipes métier, risque et technique qui doivent décider d’une conception et comprendre les limites des contrôles.</p>
    <p><strong>Périmètre.</strong> Un public et une question de travail, convenus par écrit.</p>
    <p><strong>Livrables à contractualiser.</strong> Un atelier contextualisé, des exercices sur un incident, une grille de questions, une feuille de route adaptée au public.</p>
    <p><strong>Réception.</strong> Le public, la question et les limites énoncées sont visibles dans les supports. Les désaccords restés ouverts sont consignés. La réception ne constitue pas une certification des participants.</p>
  </article>
  <article class="card">
    <p class="role">Suite · à cadrer à part</p>
    <h3>Architecture de gouvernance</h3>
    <p>Où les décisions sont prises, où elles sont appliquées, et qui peut autoriser une reprise. Conseil sur un périmètre écrit, pas un déploiement.</p>
    <p><strong>Périmètre.</strong> Une frontière de système, nommée, distincte du diagnostic.</p>
    <p><strong>Livrables à contractualiser.</strong> Une architecture logique, les points de contrôle, des contrats d’intégration proposés, des règles de dégradation, un plan de vérification.</p>
    <p><strong>Réception.</strong> La frontière, les points de contrôle et les limites sont nommés. Ce qui n’est pas établi reste marqué. La réception n’autorise pas un déploiement.</p>
  </article>
</div>

## Trois rôles

<p>REG, REG+ et TENIR-Gov ne sont pas le même objet. REG définit les exigences. REG+ vise la résolution des profils à partir d’exigences et d’hypothèses explicites. Le catalogue examiné couvre leur compatibilité structurelle ; la résolution complète du profil et des invariants reste à formaliser. TENIR-Gov est un logiciel montré pour une évaluation technique. Il ne définit pas le standard.</p>

<div class="grid-3">
  <article class="card">
    <p class="role">Standard proposé</p>
    <h3>REG</h3>
    <p>Runtime Execution Governance. Contrat indépendant d’une implémentation : la frontière où une action peut devenir un effet, et les obligations de preuve qui vont avec. Brouillons gelés. Une suite de conformance n’établit pas le standard à elle seule.</p>
    <p><a href="/standard/">Le standard</a></p>
  </article>
  <article class="card">
    <p class="role">Médiation, hors du code</p>
    <h3>REG+</h3>
    <p>REG+ vise la résolution des profils à partir d’exigences et d’hypothèses explicites. Le catalogue examiné couvre leur compatibilité structurelle ; la résolution complète du profil et des invariants reste à formaliser. Ce n’est pas un service automatisé déjà livré.</p>
  </article>
  <article class="card">
    <p class="role">Logiciel · évaluation technique</p>
    <h3>TENIR-Gov</h3>
    <p>Implémentation à examiner sur un périmètre défini. Ligne 5.7.0-rc, FM-20 ouvert. Mono-hôte en cours de durcissement ; multi-hôte à l’étude. Le paquet publié sur PyPI, lu le 20 octobre 2026, est la 5.6.0, bêta.</p>
    <p><a href="https://pypi.org/project/tenir-governance/">tenir-governance</a> · <a href="https://github.com/skiredj-prog/tenir_governance">dépôt</a></p>
  </article>
</div>

<div class="callout callout-limit">
  <p><strong>Mono-hôte, multi-hôte.</strong> Mono-hôte en cours de durcissement ; multi-hôte à l’étude. L’admissibilité structurelle d’une configuration ne suffit pas à démontrer une garantie effective.</p>
</div>

## Cas illustratifs

<p>Trois situations prises dans le guide de spécification REG du 19 octobre 2026. Elles sont illustratives. Elles ne décrivent ni un client, ni un déploiement, ni un mécanisme disponible.</p>

<div class="grid-3">
  <article class="card">
    <p class="role">Illustratif</p>
    <h3>Mandat financier</h3>
    <p>Plusieurs agents proposent des opérations sur un même plafond. Chacun peut voir le plafond comme encore libre. La question illustrée est celle d’une réservation agrégée, avant que la somme ne dépasse le plafond.</p>
  </article>
  <article class="card">
    <p class="role">Illustratif</p>
    <h3>Budget d’infrastructure</h3>
    <p>Plusieurs agents restent chacun dans sa propre limite. La somme peut tout de même dépasser l’enveloppe commune. La question illustrée est celle de cette somme, pas d’un plafond individuel.</p>
  </article>
  <article class="card">
    <p class="role">Illustratif</p>
    <h3>Achats multi-agents</h3>
    <p>Plusieurs équipes peuvent engager des commandes sur une même enveloppe. Mono-hôte en cours de durcissement ; multi-hôte à l’étude. Ce cas ne rend pas un mécanisme inter-hôtes disponible.</p>
  </article>
</div>

## Briques ouvertes

<p>Ces briques existent déjà en public. Leur maturité de ligne est 5.7.0-rc. FM-20 reste ouvert. La page <a href="/statut/">Statut</a> conserve la lecture du 19 octobre 2026 : une 5.7.0 durcie n’était pas dans l’arbre lu. Les repères de version ci-dessous sont ceux des dépôts lus, pas une publication de cette ligne.</p>

<div class="grid-2">
  <article class="card">
    <p class="role">Paquet Python · 5.7.0-rc · FM-20 ouvert</p>
    <h3>tenir-governance</h3>
    <p>Paquet public de la membrane : budget, backends, registre et composition. La release PyPI lue le 20 octobre 2026 est 5.6.0, bêta.</p>
    <p><a href="https://pypi.org/project/tenir-governance/">pypi.org/project/tenir-governance</a></p>
  </article>
  <article class="card">
    <p class="role">Suite · 5.7.0-rc · FM-20 ouvert</p>
    <h3>reg-conformance</h3>
    <p>Suite et textes du standard REG, neutres quant au mécanisme. Le repère lu est un commit marqué v0.5.0.</p>
    <p><a href="https://github.com/skiredj-prog/reg-conformance">github.com/skiredj-prog/reg-conformance</a></p>
  </article>
  <article class="card">
    <p class="role">Harnais · 5.7.0-rc · FM-20 ouvert</p>
    <h3>S1 G0+G1</h3>
    <p>Harnais de laboratoire S1 G0+G1, version lue 0.1.0. Ce n’est pas une validation du REG de production.</p>
    <p><a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1">github.com/skiredj-prog/tenir-conformance-s1-g1</a></p>
  </article>
  <article class="card">
    <p class="role">Schémas · 5.7.0-rc · FM-20 ouvert</p>
    <h3>tenir-schemas</h3>
    <p>Faisceau JSON Schema et OpenAPI d’un moteur d’analyse. Repère lu : v1.0.0. Certains schémas sont des stubs.</p>
    <p><a href="https://github.com/skiredj-prog/tenir-schemas">github.com/skiredj-prog/tenir-schemas</a></p>
  </article>
  <article class="card">
    <p class="role">Démonstrateur du site</p>
    <h3>Plan de contrôle</h3>
    <p>Six scènes d’une démo déjà publiée ici. L’artefact est en anglais. Ce n’est pas la ligne 5.7.0-rc.</p>
    <p><a href="/architecture/demo/">Ouvrir la démonstration</a></p>
  </article>
  <article class="card">
    <p class="role">Démonstrateur du site</p>
    <h3>Parcours interactif</h3>
    <p>Parcours déjà publié ici, artefact en anglais, badge REG+ v5.6.0. Ce n’est pas la ligne 5.7.0-rc.</p>
    <p><a href="/architecture/interactive/">Ouvrir le parcours</a></p>
  </article>
  <article class="card">
    <p class="role">Démonstrateur du site</p>
    <h3>Dessin illustratif</h3>
    <p>Dessin d’architecture déjà publié ici, en français. Les schémas restent illustratifs. Ce n’est pas la ligne 5.7.0-rc.</p>
    <p><a href="/architecture/drawing/">Ouvrir le dessin</a></p>
  </article>
</div>

## Comment commencer

<p>On commence par le diagnostic. Rien n’est vendu comme SaaS.</p>

<div class="actions">
  <a class="btn btn-primary" href="mailto:skiredj@tenirlabs.cc?subject=Cadrage%20%E2%80%94%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent&amp;body=Bonjour%2C%0A%0AJe%20souhaite%20cadrer%20un%20diagnostic%20des%20contr%C3%B4les%20d%E2%80%99un%20agent.%0A%0A1.%20Quelle%20action%20pr%C3%A9cise%20l%E2%80%99agent%20peut-il%20d%C3%A9clencher%2C%20dans%20quel%20syst%C3%A8me%2C%20et%20quelle%20cons%C3%A9quence%20faut-il%20pr%C3%A9server%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A2.%20Quel%20incident%2C%20doute%20ou%20changement%20motive%20la%20demande%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A3.%20Quelle%20d%C3%A9cision%20faut-il%20prendre%2C%20et%20%C3%A0%20quelle%20%C3%A9ch%C3%A9ance%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A4.%20Quelles%20r%C3%A8gles%2C%20personnes%20et%20traces%20sont%20accessibles%20pour%20l%E2%80%99examen%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0A5.%20Qui%20porte%20la%20d%C3%A9cision%20et%20le%20budget%20du%20diagnostic%2C%20et%20qui%20participera%20%C3%A0%20la%20restitution%20%3F%0A%C3%80%20pr%C3%A9ciser%0A%0AMerci.">Cadrer mon diagnostic</a>
  <a class="btn" href="/offre/">Lire l’offre en détail</a>
</div>
