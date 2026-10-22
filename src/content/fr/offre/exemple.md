---
title: Simulation locale — issue inconnue
kicker: Exemple rempli · pas une référence client
description: Fiche illustrative d’un diagnostic, préparée sur le démonstrateur TENIR/REG. Aucun client, aucun incident réel.
lede: La forme d’une fiche de diagnostic, remplie sur un dossier simulé. Aucun client n’est représenté.
sources: "dossier local du démonstrateur TENIR/REG, figé ; preuves #5 et #6 ; préparé le 20 octobre 2026"
---

<div class="callout callout-limit">
  <p><strong>Exemple simulé — données fictives.</strong> Fiche illustrative préparée le 20 octobre 2026 à partir du dossier du démonstrateur TENIR/REG. Aucun client, entretien, incident réel ou gain commercial n’est représenté. La fiche est rédigée à la main. Les recommandations ne sont pas des résultats signés du moteur. Un essai de ce démonstrateur ne démontre pas le système d’un client.</p>
</div>

<p>La synthèse illustre la fiche remise à l’issue du service décrit sur <a href="/offre/">l’offre</a>. Les annexes explicitent ses sources et les limites de l’exemple. PASS, ici, est un verdict d’exécution. Ce n’est pas une posture. Ce cas montre une issue UNKNOWN après un PASS. Il ne montre pas un nouveau verdict HOLD.</p>

## Fiche de synthèse

<div class="table-scroll">
<table>
  <thead><tr><th>Rubrique</th><th>Fiche remplie</th></tr></thead>
  <tbody>
    <tr><td>Action examinée</td><td>L’opération <code>issue-inconnue</code> demande au fournisseur simulé une action de <strong>10 000 <code>demo-unit</code></strong>. Cette unité représente un budget de démonstration.</td></tr>
    <tr><td>Question</td><td>Les traces confirment-elles le résultat de l’action ? Quelle information faudrait-il obtenir avant d’envisager une nouvelle tentative dans un système intégré ?</td></tr>
    <tr><td>Périmètre</td><td>Une opération du profil <code>tenir-reg-local-demo/0.1.0</code>, en mémoire et dans un seul processus. Lecture des preuves #5 et #6 et du journal simulé.</td></tr>
    <tr><td>Décision initiale</td><td><code>PASS</code> à la preuve #5 : budget et observation jugés valides par le profil local. L’état enregistré est alors <code>DISPATCHING</code>.</td></tr>
    <tr><td>Envoi enregistré</td><td>La preuve #6 contient un appel du fournisseur simulé pour cette opération : <code>call_id=2</code>. C’est un appel pour cette opération, dans un journal de deux appels cumulés.</td></tr>
    <tr><td>Résultat enregistré</td><td><code>UNKNOWN</code> à la preuve #6. Le <code>PASS</code> initial demeure une décision historique. Il ne confirme pas l’effet. La branche UNKNOWN est imposée par le scénario simulé.</td></tr>
    <tr><td>Ressource</td><td><strong>10 000 réservés</strong>, <strong>20 000 consommés</strong>, <strong>40 000 disponibles</strong>, pour un plafond de 70 000 <code>demo-unit</code>. Les 20 000 consommés proviennent d’une opération antérieure confirmée.</td></tr>
    <tr><td>Observation</td><td>Signal <code>demo-observation-1</code>, statut <code>VERIFIED</code>, émis par <code>demo-assure</code> pour <code>demo-budget</code>. Il est valide au temps figé de ce scénario.</td></tr>
    <tr><td>Conclusion</td><td>Le dossier établit ce que le simulateur a enregistré : autorisation, appel et issue inconnue, avec maintien de la réservation. <strong>Il ne permet pas de conclure à un effet externe confirmé.</strong></td></tr>
    <tr><td>Information manquante</td><td>Dans un système intégré : un état faisant autorité sur l’effet attendu, relié sans ambiguïté à l’identité de l’opération. Aucun service externe de ce type n’est interrogé dans cet exemple.</td></tr>
    <tr><td>Prochain contrôle proposé</td><td>Définir puis éprouver, dans un environnement d’essai, la recherche de l’effet par identifiant stable. Conserver l’incertitude tant que le résultat obtenu ne suffit pas à conclure.</td></tr>
    <tr><td>Responsabilité et échéance</td><td>Rôle proposé : responsable de l’intégration du système destinataire, avec validation du propriétaire métier. Nom et date à convenir pour une mission réelle. Aucun engagement client n’existe dans cet exemple.</td></tr>
    <tr><td>Critère observable du prochain essai</td><td>Une réponse positive, une absence d’enregistrement et une réponse indisponible sont distinguées. La règle précise, pour chacune, la conclusion permise, le traitement de la réservation et l’autorité de reprise. Une simple absence d’enregistrement ne vaut pas échec définitif sans contrat qui le garantit.</td></tr>
  </tbody>
</table>
</div>

## Entrées utilisées

<ul>
  <li>Le <a href="/offre/sources/evidence.json">dossier de preuves figé</a>, son <a href="/offre/sources/receipt.json">reçu signé</a>, les clés publiques <a href="/offre/sources/evidence.public.pem">de preuve</a> et <a href="/offre/sources/signal.public.pem">de signal</a>, le <a href="/offre/sources/verification.json">résumé de vérification</a> et les <a href="/offre/sources/test-results.json">résultats d’essais du démonstrateur</a>.</li>
  <li>Les preuves #5 et #6, le profil local, les budgets avant et après, et le journal du fournisseur simulé.</li>
  <li>La recette déjà enregistrée dans les résultats d’essais. Son existence est contrôlée avec le dossier. Elle n’est pas une campagne d’essais réalisée chez un client.</li>
</ul>

<p>Le reçu liste huit fichiers et porte <code>go_local=true</code>, <code>production=false</code>. Le résumé de vérification porte <code>valid=true</code>, 6 enregistrements, 4 opérations, 2 appels. Les clés fournies permettent de vérifier la cohérence cryptographique du dossier local. Elles n’établissent pas à elles seules une autorité externe.</p>

<p>Trois fichiers nommés par le reçu ne sont pas republiés ici : le catalogue de configuration, le configurateur et le rapport HTML. Leur volume est celui d’un outil de démonstration, et leurs empreintes restent dans le reçu. Le chemin local d’où le dossier a été copié n’est pas publié. Cette page ne rejoue pas le vérificateur.</p>

<p>Le temps <code>1792404000</code>, soit le 19 octobre 2026 à 10:00:00 UTC, est l’horloge figée du scénario. Il ne décrit pas une date réelle d’incident ou de génération du dossier.</p>

## Sources des constats

<p>Les chemins ci-dessous sont des JSON Pointers à partir de la racine de <code>evidence.json</code>. L’index 4 correspond à la preuve #5. L’index 5 correspond à la preuve #6.</p>

<div class="table-scroll">
<table>
  <thead><tr><th>Réf.</th><th>Constat</th><th>Source exacte</th><th>Nature</th></tr></thead>
  <tbody>
    <tr><td>S1</td><td>Autorisation <code>PASS</code> avant envoi</td><td><code>/records/4/payload/decision/verdict</code></td><td>Payload signé, #5</td></tr>
    <tr><td>S2</td><td>Motif <code>BUDGET_AND_OBSERVATION_VALID</code></td><td><code>/records/4/payload/decision/reasons/0</code></td><td>Payload signé, #5</td></tr>
    <tr><td>S3</td><td>Observation <code>VERIFIED</code></td><td><code>/records/4/payload/request/signal/payload/status</code></td><td>Payload signé, #5</td></tr>
    <tr><td>S4</td><td>Budget avant et après réservation</td><td><code>/records/4/payload/budget_before</code> et <code>/records/4/payload/budget_after</code></td><td>Payload signé, #5</td></tr>
    <tr><td>S5</td><td>Résultat <code>UNKNOWN</code></td><td><code>/records/5/payload/operation_state</code></td><td>Payload signé, #6</td></tr>
    <tr><td>S6</td><td>Appel <code>call_id=2</code>, opération <code>issue-inconnue</code></td><td><code>/records/5/payload/provider_journal/1</code></td><td>Payload signé, #6</td></tr>
    <tr><td>S7</td><td>Réservation conservée à 10 000</td><td><code>/records/5/payload/budget_after/reserved</code></td><td>Payload signé, #6</td></tr>
    <tr><td>S8</td><td>Verdict historique <code>PASS</code> conservé</td><td><code>/records/5/payload/decision/verdict</code></td><td>Payload signé, #6</td></tr>
    <tr><td>S9</td><td>Scénario explicitement simulé</td><td><code>/records/5/payload/simulation_only</code> et <code>/records/5/payload/request/simulated_outcome</code></td><td>Payload signé, #6</td></tr>
  </tbody>
</table>
</div>

<p>Les nombres d’appels sont des calculs de lecture du journal de la preuve #6 : sa longueur vaut 2 ; le filtrage par <code>operation_id=issue-inconnue</code> donne 1. Ils ne sont pas présentés comme des champs de compteur distincts du payload.</p>

## Contrôles observés, questions ouvertes

<div class="table-scroll">
<table>
  <thead><tr><th>Axe</th><th>Configuration et portée observées</th><th>Ce qui reste à instruire pour un autre système</th></tr></thead>
  <tbody>
    <tr><td>Périmètre d’exécution</td><td><code>mono-process</code></td><td>Comportement après interruption et entre plusieurs processus.</td></tr>
    <tr><td>Prévention des doublons</td><td><code>local-registry</code>, registre local en mémoire</td><td>Identité stable, persistance et contrat du destinataire. Les deux preuves ne démontrent pas une idempotence générale.</td></tr>
    <tr><td>Coordination</td><td><code>thread-lock</code></td><td>Coordination entre instances si le déploiement en utilise plusieurs.</td></tr>
    <tr><td>Observation insuffisante</td><td><code>fail-closed</code> pour le profil local</td><td>Sources, fraîcheur et traitement d’une observation indisponible dans le système cible.</td></tr>
    <tr><td>Issue après envoi</td><td>UNKNOWN avec réservation conservée</td><td>Source faisant autorité, règles de rapprochement, et décision humaine ou technique de reprise.</td></tr>
  </tbody>
</table>
</div>

<p>L’arrêt avant envoi et l’incertitude après envoi doivent rester distingués.</p>

## Plan de suite illustratif

<div class="table-scroll">
<table>
  <thead><tr><th>Priorité</th><th>Action proposée</th><th>Preuve attendue</th><th>Condition de clôture</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Définir la source faisant autorité sur l’effet et son lien avec l’identité de l’opération.</td><td>Contrat de recherche et exemples de réponses positive, absente et indisponible.</td><td>L’équipe sait dire quelle réponse permet quelle conclusion, et quand l’état doit rester inconnu.</td></tr>
    <tr><td>2</td><td>Définir le traitement de la réservation et l’autorité de reprise.</td><td>Tableau des transitions, responsabilités et critères d’essai.</td><td>Chaque transition est justifiée. Aucune libération de réservation ou nouvelle tentative ne découle d’une simple supposition de résultat.</td></tr>
    <tr><td>3, si une mission exige la reprise après arrêt</td><td>Concevoir la persistance et la prévention des doublons aux frontières du système.</td><td>Essais d’interruption et de reprise convenus dans un environnement borné.</td><td>Le dossier d’essai décrit les états retrouvés et les appels observés aux points d’interruption choisis.</td></tr>
  </tbody>
</table>
</div>

<p>Ce plan est une interprétation documentaire. Aucune réconciliation, relance, modification du moteur ou intégration n’a été exécutée pour le produire.</p>

## Réception de l’exemple

<div class="table-scroll">
<table>
  <thead><tr><th>Critère</th><th>État de cette illustration</th></tr></thead>
  <tbody>
    <tr><td>Périmètre et question explicites</td><td>Renseignés dans la fiche.</td></tr>
    <tr><td>Constats traçables</td><td>Sources S1 à S9 et dossier figé consultables.</td></tr>
    <tr><td>Autorisation, appel, résultat et budget séparés</td><td>Présentés distinctement. Unités et portée des compteurs précisées.</td></tr>
    <tr><td>Inconnues et conséquences explicites</td><td>Effet externe non établi. Information à rechercher nommée.</td></tr>
    <tr><td>Prochain contrôle observable</td><td>Critère proposé dans la fiche et détaillé dans le plan.</td></tr>
    <tr><td>Responsable, date et validation par le client</td><td>À convenir lors d’une mission réelle. L’exemple ne simule pas une réception ou une approbation client.</td></tr>
  </tbody>
</table>
</div>

## Empreintes

<p>Les empreintes ci-dessous sont des métadonnées d’intégrité. Elles sont distinctes des constats et des recommandations. Les signatures et le reçu ne certifient pas cette fiche éditoriale.</p>

<pre><code>evidence.json — SHA-256 du fichier
af9bae4c89f994b83fc2a8aa965a862afaea0035b4e777979537f1c035bdaa54

receipt.json — SHA-256 du fichier
c8b022b1211596ea120199afba28bb80b0ea155cfeac2cb7eca407602f4cc441

source_sha256 enregistré dans le dossier
06bb6718ea2f760ba0693238588c68ee62d6c67b6943825b46235d99bd623cf5

Preuve #5 — integrity/payload_sha256
283bca6f32971371b89196b853042ada518e83297c3ad6f701516b7291d9c948

Preuve #6 — integrity/payload_sha256
86bdf58f70d091bcbe3e69f73c9cac3fafdeab8ded440dd04221cf78d2a8471b</code></pre>

<p><a href="/offre/">Retour à l’offre</a></p>
