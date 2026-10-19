---
title: Concepts
kicker: Artifact 01–03 · Noyau KB2
description: Définitions, algèbre et portes de TENIR 2.0 selon la Knowledge Base 2, avec les écarts de vocabulaire du runtime et du manuscrit.
lede: La narrative d’entrée n’est pas l’objet du diagnostic. On reconstruit l’unité, on fixe l’échelle, on formule TAU, puis seulement on synthétise.
sources: KB2 (30 mars 2026) ; introduction, Casablanca 2026 ; manuscrit v7.1 ; RFC-2
---

<div class="callout callout-note">
  <p><strong>Autorité.</strong> Quand un dépôt, un RFC ou l’introduction emploie le même mot autrement, cette page suit KB2 et signale l’écart. KB2 est le rendu doctrinal actif. Il ne se substitue pas à la note constitutionnelle, qui reste à instituer.</p>
</div>

## Thèse

<p>TENIR 2.0 diagnostique l’admissibilité, la préservation des options, la validité épistémique, la récupérabilité et la posture, aux échelles déclarées : individu, organisation, institution, État. Le moteur doit reconstruire l’unité implicite, stabiliser l’échelle, formuler TAU, puis synthétiser l’état structurel, la validité épistémique, la viabilité de l’agence et la récupérabilité trajectorielle.</p>

<p>Quatre plans se superposent. Le système est le substrat : frontières, dépendances, pression, capacité, options, dégradation, tenue. L’agence corrige par les acteurs, les leviers, le veto et le contrôle coopératif. La trajectoire corrige par le régime, les fermetures, l’hystérésis et la proximité de l’irréversibilité. Le narratif est une sous-couche épistémique : il protège contre l’omission, l’amplification, la mauvaise attribution et la clôture prématurée.</p>

## Définitions

<dl>
  <dt>TAU</dt>
  <dd>Faisceau invariant déclaré qui définit l’identité admissible à l’échelle pertinente. Dans l’introduction : ce qui ne peut être livré sans que le système cesse d’être lui-même. Ni une règle. Un noyau non substituable.</dd>
  <dt>TENIR</dt>
  <dd>Posture de maintien discipliné qui empêche la violation de TAU tout en préservant l’espace d’options admissible et l’intégrité décisionnelle. L’introduction : traverser la pression sans livrer l’essentiel. Pas résister. Pas guérir. Maintenir la continuité minimale admissible.</dd>
  <dt>Souveraineté épistémique</dt>
  <dd>Degré de contrôle que l’unité responsable conserve sur la base de réalité utilisée pour justifier une action irréversible.</dd>
  <dt>Abandon épistémique</dt>
  <dd>L’action devient matériellement gouvernée par des épistémiques synthétiques ou médiées que l’acteur responsable ne vérifie plus. L’introduction le dit ainsi : on ne peut pas opposer un veto à ce qu’on a délégué à l’oracle.</dd>
  <dt>CAVE</dt>
  <dd>Control, Aim, Veto/constraints, Epistemics. Modèle des agents saillants. Le registre de noms du code exige la même expansion : Control, Aim, Veto, Epistemics.</dd>
  <dt>Agency failure</dt>
  <dd>Aucun agent coopératif ne garde une surface de contrôle suffisante sur les variables pertinentes pour TAU.</dd>
  <dt>Trajectory lock-in</dt>
  <dd>L’irréversibilité devient imminente, ou plusieurs fermetures irréversibles s’accumulent dans un régime critique.</dd>
</dl>

<div class="callout callout-limit">
  <p><strong>Écart de nom.</strong> Le manuscrit v7.1, dans <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/manuscript/v7.1.md">reg-conformance</a>, définit TAU comme Autonomous Unit, l’unité de décision capable d’agir, et écarte explicitement d’autres développements du sigle. Une note de durcissement R5 disait plutôt : TAU est l’identité, TENIR la fidélité à cette identité sous pression. KB2 tranche pour le faisceau d’identité admissible. Le manuscrit décrit une spécialisation technique ultérieure, pas la définition doctrinale.</p>
</div>

## Algèbre

<p>L’état minimal historique est A(t) = { P, V, K, O, τ }. L’état composite de la synthèse est A*(t) = { P, V, K, O, τ, S, Ep, Ag, Tr }.</p>

<div class="formula">S = K / (P × V + ε)</div>
<div class="formula">dO/dt = − α·max(0, P×V − K) − β·Commitments(t) − γ·IrreversibleActs(t)</div>

<table>
  <thead><tr><th>Symbole</th><th>Nom KB2</th><th>Sens</th></tr></thead>
  <tbody>
    <tr><td>P</td><td>Pression</td><td>Forces qui augmentent la contrainte et le risque de perte irréversible.</td></tr>
    <tr><td>V</td><td>Vitesse</td><td>Rythme et accélération du changement des pressions et des exigences de décision.</td></tr>
    <tr><td>K</td><td>Capacité</td><td>Bande passante d’absorption : ressources, structure, résilience, légitimité, réserve.</td></tr>
    <tr><td>O</td><td>Espace d’options</td><td>Manœuvrabilité admissible restante.</td></tr>
    <tr><td>τ</td><td>Faisceau TAU</td><td>Invariant d’identité admissible. Ce n’est pas la fenêtre τ_K du standard REG, ni la transition proposée.</td></tr>
    <tr><td>S</td><td>Stabilité</td><td>Proxy informatif de K relativement à P×V. Jamais souverain.</td></tr>
    <tr><td>Ep, Ag, Tr</td><td>États</td><td>Épistémique, agence, trajectoire. Ils peuvent annuler un score structurel modéré.</td></tr>
  </tbody>
</table>

<div class="callout callout-limit">
  <p><strong>Écart sur V et sur S.</strong> L’introduction écrit S = K / (P × V), sans ε, et parle de pression multipliée par la vitesse. KB2 conserve la vitesse et ajoute ε, plancher qui empêche un dénominateur nul. RFC-2 et le document d’architecture illustrative appellent V volatilité ou irréversibilité, et traitent la formule comme modèle de référence de l’admissibilité structurelle du runtime. Cette page garde la vitesse de KB2 pour le cadre, et la volatilité comme sens du score dans le noyau d’implémentation. Les seuils numériques des dépôts sont des paramètres de politique, pas des constantes du canon.</p>
</div>

<p>L’érosion des options se lit avec les contraintes d’agence, les fermetures historiques, le temps de clôture et la classe de réversibilité. Les expressions ci-dessus sont celles de KB2. Elles ne sont pas, dans les dépôts lus, une suite de tests qui démontrerait l’équation d’érosion.</p>

## Trois déterminants requis

<div class="grid-3">
  <article class="card">
    <h3>Porte épistémique</h3>
    <p>Statuts ok, contested, invalid. Les signaux portent des tags de preuve. Aucun diagnostic à haute confiance sans cette validation. Axiome A4.</p>
  </article>
  <article class="card">
    <h3>Agence</h3>
    <p>Chaque agent saillant est lu par CAVE. Un état structurellement viable peut rester non actionnable si le contrôle coopératif manque.</p>
  </article>
  <article class="card">
    <h3>Trajectoire</h3>
    <p>L’état courant n’épuise pas la récupérabilité. Le régime, les seuils franchis, l’hystérésis et le lock-in comptent.</p>
  </article>
</div>

<p>Peuvent forcer HOLDING-FIRST sur un chemin irréversible : invalidité épistémique, violation de TAU, érosion critique des options, agency failure, risque sévère de coordination, trajectory lock-in, fort risque d’abandon épistémique. Les flags de collapse à exposer au minimum : pression-capacité, érosion critique des options, proximité ou violation de TAU, silent breach, agency failure, trajectory lock-in, invalidité épistémique, risque d’abandon épistémique.</p>

## Postures doctrinales et verdicts de runtime

<table>
  <thead><tr><th>Couche</th><th>Sorties</th><th>Rôle</th></tr></thead>
  <tbody>
    <tr><td>KB2</td><td>NORMAL, CAUTION, HOLDING-FIRST</td><td>Posture composite. HOLDING-FIRST est l’arrêt délibéré quand la poursuite n’est pas admissible.</td></tr>
    <tr><td>Runtime REG</td><td>PASS, FLAG, HOLD, HARD_VETO</td><td>Dispositions à la frontière d’exécution. HOLD suspend. HARD_VETO refuse. Ce ne sont pas les trois postures de KB2.</td></tr>
  </tbody>
</table>

<p>L’introduction relie HOLDING-FIRST à la condition où la pression multipliée par la vitesse dépasse la capacité. KB2 élargit cette obligation : elle ne dépend pas du seul rapport P×V. Le guide public dit la même discipline en langue ordinaire : tenir, examiner, réconcilier ou escalader, plutôt que continuer à l’aveugle.</p>

## Axiomes retenus

<ul>
  <li><strong>A1.</strong> Tout diagnostic exige une unité et une échelle déclarée. TAU est défini à cette échelle.</li>
  <li><strong>A2.</strong> TENIR n’existe que si l’unité peut répondre sans franchir la frontière TAU.</li>
  <li><strong>A4.</strong> Pas de diagnostic à haute confiance sans validation épistémique.</li>
  <li><strong>Agence.</strong> La viabilité structurelle ne suffit pas s’il n’y a pas de surface de contrôle coopérative.</li>
  <li><strong>Trajectoire.</strong> L’histoire compte. L’état courant n’épuise pas la récupérabilité.</li>
  <li><strong>A7.</strong> La narrative primaire est une représentation d’entrée, pas l’objet du diagnostic.</li>
</ul>

## Asymétrie

<p>TENIR 2.0 est hybride en implémentation et constitutionnellement asymétrique. L’interprétation assistée par modèle est admise pour reconstruire un ingress sale, proposer une formulation de TAU, extraire CAVE, indexer une trajectoire, hypotéquer une distorsion, rédiger un briefing. Restent déterministes ou explicitement gouvernés par règles : la validation de schéma, les seuils, le statut épistémique, le calcul de stabilité, l’érosion des options, les flags, la posture, le mode dégradé, la trace.</p>

<p>Les patterns — lecture structurelle, gouvernance agentique, métabolique, rhizomatique, hybride — s’activent selon le terrain. Ils restent subordonnés à la constitution. Aucune sortie de pattern ne l’annule à elle seule. Ce qui était appelé informellement « v3 » n’est pas une ligne canonique successeure : KB2 le normalise comme Profil de Gouvernance Agentique.</p>
