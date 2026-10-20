---
title: Architecture
kicker: Document illustratif · adapté
description: Architecture illustrative de TENIR / REG — théorie, standard, runtime, signaux, double noyau et preuve. Dessin illustratif, pas schéma normatif.
lede: Une intention ne devient pas un effet parce qu’un composant a dit oui. Elle traverse une règle, une contrainte, une médiation, un profil, puis un runtime qui sépare juger, muter et prouver.
sources: TENIR / REG — Architecture illustrative ; parcours interactif REG+ v5.6.0 ; démo Execution Control Plane ; KB3, ligne instituée ; dépôts tenir_governance et reg-conformance
---

<div class="callout callout-note">
  <p><strong>Statut du dessin.</strong> Classe : illustrative only. Le document source se dit illustratif. Il n’est pas le schéma normatif, ni le YAML du catalogue, ni un rapport d’audit complet. Là où il nomme V « volatilité », la ligne antérieure dit « vitesse ». KB3 ne reformule pas V et interdit de renommer en silence un champ du contrat machine. Le dessin du runtime est conservé. Cette page ne choisit pas un nom souverain pour V.</p>
</div>

## KB3, les extensions, le code

<p>KB3 est la ligne de rendu doctrinale instituée et active. C’est une couche documentaire, hors du code. Il rend le sens ; il ne crée pas de sens souverain et n’est pas une constitution. Les services ou applications spécialisés l’enveloppent ou l’étendent : ils s’appuient sur KB3 et ne doivent pas le redéfinir. Cette discipline est celle de la politique d’extensions gouvernées et des espaces de noms. TENIR-Gov, ligne IronOmega, est une implémentation du plan de contrôle d’exécution. Elle doit s’aligner sur KB3. Elle n’est pas KB3. Cette page ne cite aucun chemin de code comme module KB3.</p>

## Trois piliers de l’écosystème technique

<div class="grid-3">
  <article class="card">
    <h3>Théorie</h3>
    <p>Les textes posent le diagnostic et la séparation. Ils disent pourquoi gouverner l’exécution n’est pas réduire le problème à un moteur de politiques.</p>
  </article>
  <article class="card">
    <h3>Standard REG</h3>
    <p>REG Core pour les invariants. REG+ pour les profils, les hypothèses et les règles de compatibilité. Le profil σ est un contrat. Les invariants I* sont les primitives.</p>
  </article>
  <article class="card">
    <h3>Runtime TENIR-Gov</h3>
    <p>Implémentation de référence. Elle évalue, engage, enregistre. Elle ne redéfinit pas le canon.</p>
  </article>
</div>

## Cinq niveaux

<div class="stack">
  <article><span class="n">Niveau 0</span><p><strong>Règle métier.</strong> Formulée par l’équipe ou le régulateur. Exemple donné : ne pas double-exécuter un paiement. Complète dans son registre, pas encore exécutable.</p></article>
  <article><span class="n">Niveau 1</span><p><strong>Contrainte réglementaire.</strong> Le document cite, comme exemples, l’article 12 de l’EU AI Act et l’article 9 de DORA : obligations de traçabilité, de supervision ou de contrôle. Ce site ne vérifie pas ces articles.</p></article>
  <article><span class="n">Niveau 2</span><p><strong>Acte de médiation.</strong> Intention métier plus hypothèses d’infrastructure égale règle substantive. La règle devient dépendante du déploiement.</p></article>
  <article><span class="n">Niveau 3</span><p><strong>REG Core et REG+.</strong> Resolve(i, h, R, V) → Profile(σ, I*). Le profil est le contrat. Les invariants sont exécutables.</p></article>
  <article><span class="n">Niveau 4</span><p><strong>Runtime.</strong> Evaluate produit un verdict. Commit tente la mutation. Record produit une preuve reconstructible.</p></article>
</div>

<p>La ligne antérieure décrit la même séparation en trois couches d’implémentation : interprétative, constitutionnelle, gouvernance. Le principe qu’elle formule : le modèle propose, la couche constitutionnelle adjudique, la couche de gouvernance applique, l’humain responsable reste comptable. KB3 exige de garder cette asymétrie visible. Une explication assistée par modèle ne remplace pas l’adjudication de la posture, de la conformité, de la dégradation ou de la trace.</p>

## Quatre fonctions

<div class="grid-2">
  <article class="card">
    <h3>Evaluate()</h3>
    <p>Fonction pure. Elle lit le profil, les invariants, l’état s et la transition proposée. Elle ne modifie rien. Verdicts : PASS, FLAG, HOLD, HARD_VETO.</p>
  </article>
  <article class="card">
    <h3>Commit()</h3>
    <p>Fonction mutative. Si elle échoue, le résultat effectif n’est pas un PASS. Issues nommées : COMMITTED, FAILED_RACE, FAILED_CONSTRAINT, SKIPPED.</p>
  </article>
  <article class="card">
    <h3>Record()</h3>
    <p>EvidenceRecord : contexte, entrées, résultats, trace de commit, hash, signature. Le contrat vise une preuve qu’un tiers peut rejouer. SHA-256, Ed25519 et JCS sont les moyens nommés, pas une certification obtenue.</p>
  </article>
  <article class="card">
    <h3>Assure()</h3>
    <p>Service qui observe l’infrastructure et injecte des signaux attestés. Le moteur ne détecte pas lui-même la violation d’une hypothèse de déploiement. Signaux : HYPOTHESIS_VERIFIED, WEAKENED, VIOLATED.</p>
  </article>
</div>

## Signaux

<table>
  <thead><tr><th>Famille</th><th>Origine</th><th>Nature</th></tr></thead>
  <tbody>
    <tr><td>S1</td><td>Passage proposé</td><td>Déclarative. Peut être fausse ou mal formée. Exemples : agent, type d’action, montant, clé d’idempotence.</td></tr>
    <tr><td>S2</td><td>État métier</td><td>Observée. Doit être fraîche. Exemples : ressource disponible, quarantaine, score d’autorité.</td></tr>
    <tr><td>S3</td><td>Assure()</td><td>Attestée. Fraîcheur à vérifier.</td></tr>
    <tr><td>S4</td><td>Registre durable</td><td>Historique. Base de l’idempotence et de la reconstruction.</td></tr>
  </tbody>
</table>

<p>Ces quatre familles ne sont pas le scénario de laboratoire « S1 — Evidence Lost After Commit ». Le même identifiant désigne, selon le document, une famille de signaux ou un cas de conformance. Les deux usages coexistent. Il faut les lire dans leur fichier.</p>

## Chaîne

<div class="pipeline">
  <article><span class="n">0</span><p>Observation brute des quatre familles.</p></article>
  <article><span class="n">1</span><p>Normalisation en coordonnées. Une coordonnée absente devient <code>unmeasured</code>, jamais une valeur favorable.</p></article>
  <article><span class="n">2</span><p>Score continu. Le score n’est pas le verdict.</p></article>
  <article><span class="n">3</span><p>Invariants discrets, indépendants du score.</p></article>
  <article><span class="n">4</span><p>Composition : treillis, réactions de signaux du profil, fraîcheur.</p></article>
  <article><span class="n">5</span><p>Commit, seulement si la mutation est autorisée.</p></article>
  <article><span class="n">6</span><p>EvidenceRecord.</p></article>
  <article><span class="n">7</span><p>Après coup : classe de réversibilité τ⁻¹ et EVP. Rétrospectif. Sans droit d’écriture sur le verdict.</p></article>
</div>

## Double noyau

<p>Le double noyau n’oppose pas « structurel » et « substantif ». Il sépare un score continu et une membrane d’invariants discrets. Aucun invariant ne lit le score.</p>

<div class="compose">
  <article class="card">
    <h3>Score</h3>
    <p class="formula">S = K / (P · V + ε)</p>
    <p>Dans ce dessin, V est appelé volatilité. La ligne antérieure l’appelle vitesse. Les deux noms restent visibles. Les seuils τ_pass et τ_block du dessin sont des paramètres du runtime, pas les postures NORMAL / CAUTION / HOLDING-FIRST. PASS, FLAG, HOLD et HARD_VETO sont des dispositions, pas ces postures.</p>
  </article>
  <div class="op" aria-hidden="true">×</div>
  <article class="card">
    <h3>Membrane</h3>
    <p>Exemples cités : I1 permis à usage unique, I2 liaison d’engagement, I6 pas d’admission sous quarantaine, I8 budget agrégé, I9 cohérence temporelle de trajectoire. La liste complète dépend du profil.</p>
  </article>
</div>

<div class="formula">
Si l’un dit HARD_VETO → HARD_VETO<br />
sinon si l’un dit HOLD → HOLD<br />
sinon si l’un dit FLAG → FLAG<br />
sinon → PASS
</div>

<p>Ensuite, une réaction explicite du profil peut encore modifier la décision. Sans règle dans σ, un signal est ignoré. Exemple donné : HYPOTHESIS_VIOLATED frais peut imposer HARD_VETO.</p>

<h3>États, à part des verdicts</h3>
<p>Le verdict autorise, suspend ou refuse. L’état opérationnel décrit la vie de l’opération : CREATED, RESERVED, DISPATCHING, puis CONFIRMED ou FAILED, avec UNKNOWN, HOLD et ESCALATED pour l’incertitude. Un fournisseur silencieux n’est pas un succès.</p>

<h3>Preuve et après-coup</h3>
<p>L’EvidenceRecord sépare le contexte d’évaluation, les entrées, les résultats — dont le détail par invariant, pas un booléen global —, la trace de commit et l’intégrité. τ⁻¹ classe PRE_COMMIT, EXACT_INVERSE, COMPENSATION, IRREVERSIBLE, INDETERMINATE. INDETERMINATE n’est pas IRREVERSIBLE : l’ignorance n’est pas la preuve d’un non-retour. EVP distingue valeur visée, valeur réalisée, perte d’exécution et friction rapportée à part. Le dépôt <code>tenir_governance</code> dit qu’EVP lit les enregistrements sans chemin d’écriture vers le verdict.</p>

## Démonstration du plan de contrôle

<p>Trois artefacts accompagnent ce dessin. Ils sont illustrative only. Leurs verdicts PASS, FLAG, HOLD et HARD_VETO sont des dispositions d’exécution. Ils ne remplacent pas les postures NORMAL, CAUTION et HOLDING-FIRST. Le HOLD d’une opération n’est pas la posture HOLDING-FIRST.</p>

<ul>
  <li><a href="/architecture/drawing/">Le dessin illustratif</a>, tel que fourni.</li>
  <li><a href="/architecture/interactive/">Le parcours interactif</a>, titré TENIR Governance, badge REG+ v5.6.0.</li>
  <li><a href="/architecture/demo/">La démo du plan de contrôle</a>, six scènes, en anglais dans l’artefact.</li>
</ul>

<p>La démo dessine deux noyaux, puis un treillis. Le noyau 1 calcule S = K / (P·V + ε). Le paramètre d’appel montré s’appelle <code>velocity</code>. Le parcours interactif écrit, pour la même lettre, « Velocity / Volatility ». KB3 ne reformule pas V. Cette page ne choisit pas un nom. Le noyau 2, dans la démo, vérifie les invariants I3 à I9. Le parcours interactif liste I1, I2, I3, I4, I6, I7, I8 et I9, et ne nomme pas I5. Les deux listes restent visibles. Aucun invariant ne lit le score.</p>

<p>Le treillis de la démo et du parcours est le même que celui du dessin : HARD_VETO l’emporte, puis HOLD, puis FLAG, sinon PASS. Un score élevé ne garantit pas PASS. Si un noyau échoue, si une donnée manque, ou si l’issue est indéterminée, la démo dit que la composition produit HOLD, jamais PASS.</p>

<p>Les six scènes, attribuées à la démo et non rejouées ici :</p>
<ol>
  <li><strong>Opération admissible.</strong> Un paiement de 10 sur une capacité de 100. Le noyau de score renvoie FLAG, la membrane PASS, la composition FLAG, l’état RESERVED, puis CONFIRMED après dispatch. La clé d’idempotence est réclamée à CREATED, avant l’évaluation.</li>
  <li><strong>Doublon bloqué.</strong> La même clé, soumise encore, reçoit HARD_VETO. La reprise passe par <code>resume_existing()</code>, pas par une nouvelle adjudication.</li>
  <li><strong>Cycle de HOLD.</strong> Suspension par opération, avec τ_K, distincte de QUARANTINE_LOCK, qui bloque toute admission pour une entité. Sorties montrées : RESERVED si la preuve suffit, ESCALATED vers un officier du risque, FAILED si τ_K expire. ESCALATED n’a pas de sortie automatique par le temps. L’expiration dans cet état produit UNKNOWN, pas une résolution. Ce HOLD est un état d’opération.</li>
  <li><strong>Mémoire ou persistance.</strong> Sans <code>store_path</code>, un redémarrage perd la réclamation et la seconde adjudication peut revenir FLAG. Avec un magasin, elle revient HARD_VETO. <code>require_persistence=True</code> sans chemin lève ValueError. Depuis le correctif cité par la démo, l’absence de magasin émet un UserWarning.</li>
  <li><strong>Délai, puis réconciliation.</strong> Un timeout de fournisseur mène à UNKNOWN, pas à FAILED. UNKNOWN n’est pas terminal. La réconciliation montrée peut confirmer que l’effet a eu lieu. Traiter le silence comme un échec pourrait doubler l’effet.</li>
  <li><strong>Frontière de garantie.</strong> Au plus un dispatch par la porte de gouvernance, sur un seul hôte. La composition fail-closed et les invariants obligatoires sont locaux. La coordination inter-hôtes demande une infrastructure distribuée. L’effet externe exactly-once dépend du fournisseur. L’intégrité d’un artefact <a href="https://pypi.org/project/tenir-governance/">PyPI</a> dépend de l’écosystème d’empaquetage. Une décision de gouvernance ne prouve pas, à elle seule, qu’un effet externe a eu lieu exactement une fois.</li>
</ol>

<p>Le parcours interactif ajoute, comme limites qu’il appelle lui-même ouvertes : <code>reconcile_commit()</code> peut violer I8 en ajoutant au committed sans retirer du reserved ; <code>time.time()</code> dans des méthodes <code>@replicated</code> ; pas de validation des montants négatifs ou NaN ; magasins durables non atomiques ; vérificateur de linéarisabilité trop court ; pickle de pysyncobj sans authentification ; formule de quorum f+1 non générale ; Raft essayé sur localhost seulement, preuves auto-attestées, pas de tolérance byzantine. Ce site ne rejoue pas ces défauts. Il ne les déclare pas clos. La page <a href="/statut/">Statut</a> garde l’audit F-01, F-02 et F-03 du dessin illustratif.</p>

## Pièges que le dessin demande d’éviter

<ul>
  <li>Le catalogue des configurations n’est pas le service Assure.</li>
  <li>Une interface ConsensusBackend, et l’implémentation Raft 5.6.0, ne sont pas une preuve de consensus en environnement hostile.</li>
  <li>Un score élevé ne garantit pas PASS. Un invariant peut imposer HARD_VETO seul.</li>
  <li><code>admissible_structural</code> n’implique pas <code>effective_guarantee_demonstrated</code>.</li>
</ul>

<p>L’audit porté par ce document sur la 5.6.0 est résumé dans la page <a href="/statut/">Statut</a>.</p>
