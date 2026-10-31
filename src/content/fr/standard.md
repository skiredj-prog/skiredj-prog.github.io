---
title: Le standard
kicker: REG · brouillons gelés
description: Le standard Runtime Execution Governance, ses RFC, et ce qu’il n’est pas par rapport au cadre diagnostique.
lede: Runtime Execution Governance (REG) propose des exigences pour la frontière où une action peut devenir un effet, et les preuves qui vont avec. L’architecture qui les réalise reste distincte.
sources: RFC-0 à RFC-7 dans reg-conformance ; spec.md v0.3.1 ; KB3, séparation posture et exécution
---

## En une phrase

**REG est une proposition de règles pour décider si une action sensible peut partir et pour garder la trace de cette décision.** Ce n’est ni une certification, ni un produit installé chez un client, ni la preuve qu’un fournisseur externe a bien produit l’effet attendu.

### Ce que cette page vous aide à distinguer

- **La proposition :** les RFC décrivent ce qu’un système devrait vérifier.
- **Le logiciel :** TENIR-Gov est une implémentation publiée, avec un périmètre précis.
- **La preuve :** les tests et simulations montrent seulement ce qu’ils ont réellement couvert.
- **La réalité externe :** une autorisation locale ne confirme pas à elle seule l’effet chez le fournisseur.

<p>Le mantra de RFC-0, daté du 3 octobre 2026, statut « Proposed Standard (Frozen Draft) », est : « The agent proposes. The membrane decides. Authorised / Admissible. » L’origine déclarée du texte est la convergence de TENIR-Gov, CCEAF et CommitGate. Les dépôts publics lus ne documentent pas CCEAF ni CommitGate au-delà de cette ligne.</p>

<div class="callout callout-limit">
  <p><strong>Ce que REG n’est pas.</strong> Ce n’est pas KB3, ni la ligne antérieure, ni TENIR 2.0. KB3 est la ligne de rendu doctrinale instituée et active, hors du code. REG est le standard d’exécution. TENIR-Gov doit s’aligner sur KB3 ; il ne le constitue pas. Une disposition PASS n’est pas la posture NORMAL. Un mode d’exécution — shadow-passive, shadow-critical, enforce — n’est pas non plus une posture : s’il apparaît, c’est un champ séparé. Le symbole τ du faisceau TAU n’est pas le τ de la transition proposée, ni la fenêtre τ_K.</p>
</div>

## Lexique de RFC-0

<ul>
  <li><strong>Frontière d’exécution.</strong> Là où une action conséquente peut devenir un effet externe.</li>
  <li><strong>Action conséquente.</strong> Ce qui modifie un état externe, déplace de la valeur, ou produit un effet qui n’est pas trivialement réversible. Dans le doute, elle est conséquente.</li>
  <li><strong>Membrane.</strong> La surface qui intercepte ces actions avant la frontière. Le mot est technique dans les RFC. Il n’est pas un synonyme de la posture TENIR.</li>
  <li><strong>Fail-closed.</strong> En cas d’incertitude, d’expiration ou de panne, l’action est bloquée.</li>
</ul>

<p>Trois dimensions indépendantes composent l’admissibilité : la standing (l’acteur a-t-il encore l’autorité), la structure (l’action est-elle compatible avec l’état), le commit (la décision peut-elle devenir exactement cet effet sans perdre son intégrité). Le standard n’impose pas un pipeline séquentiel. Si les dispositions divergent, la plus restrictive l’emporte. HARD_VETO l’emporte sur tout.</p>

<table>
  <thead><tr><th>Disposition</th><th>Instruction</th></tr></thead>
  <tbody>
    <tr><td>PASS</td><td>Autoriser, borné par <code>valid_until</code> et par la dérive d’état. Un PASS n’est pas permanent.</td></tr>
    <tr><td>FLAG</td><td>Autoriser seulement sous une condition ou une supervision explicite. Jamais un allow nu.</td></tr>
    <tr><td>HOLD</td><td>Suspendre. Déclenche la fenêtre τ_K.</td></tr>
    <tr><td>HARD_VETO</td><td>Refuser pour cette évaluation. Produit un reçu de refus signé.</td></tr>
  </tbody>
</table>

## Cycle et τ_K

<ol>
  <li>Pré-exécution : la demande porte l’intention, la cible, les effets attendus, un instantané d’état.</li>
  <li>Autorisation conditionnelle : verdict et enveloppe d’octroi.</li>
  <li>Exécution supervisée : si un HARD_VETO survient, l’exécution s’arrête ou passe dans un état sûr.</li>
  <li>Clôture : un manifeste de preuve ancre le cycle.</li>
</ol>

<p>τ_K est la fenêtre maximale de résolution humaine d’un HOLD. RFC-0 dit qu’elle se dérive d’accords de niveau de service existants. Elle ne s’invente pas. À l’expiration, la politique pré-déclarée s’applique. Le défaut est fail-closed. Un mode dégradé n’est admis que s’il a été déclaré et s’il préserve l’invariant.</p>

<p>RFC-2 fixe S = K / (P × V + ε) comme modèle de référence de l’admissibilité structurelle, avec d’autres modèles permis s’ils respectent les contraintes épistémiques, d’invariant et de conservatisme. L’incertitude contracte la région admissible. L’absence de preuve qu’un invariant tient n’est pas la preuve qu’il tient. Dans ce RFC, V est la volatilité et l’irréversibilité, pas la vitesse nommée par la ligne antérieure. KB3 ne fond pas les deux noms.</p>

## La série

<table>
  <thead><tr><th>RFC</th><th>Titre</th><th>Statut dans l’arbre</th></tr></thead>
  <tbody>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-0.md">RFC-0</a></td><td>Constitution du standard</td><td>v0.2, gelé, 3 octobre 2026</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-1.md">RFC-1</a></td><td>Enveloppe d’octroi et protocole</td><td>v0.1, gelé</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-2.md">RFC-2</a></td><td>Admissibilité structurelle</td><td>v0.1, gelé</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-3.md">RFC-3</a></td><td>Standing et continuité d’autorité</td><td>v0.1, gelé</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-4.md">RFC-4</a></td><td>Commit et preuve d’exécution</td><td>v0.2, gelé, 2 octobre 2026</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-5.md">RFC-5</a></td><td>Vivacité et opérationnalisation</td><td>v0.1, gelé</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-6.md">RFC-6</a></td><td>Sécurité, transport, cryptographie</td><td>v0.1, gelé</td></tr>
    <tr><td><a href="https://github.com/skiredj-prog/reg-conformance/blob/main/reg-standards-baseline/rfc/rfc-7.md">RFC-7</a></td><td>Suite de conformance</td><td>v0.1, gelé</td></tr>
  </tbody>
</table>

<p>RFC-0 sépare l’obligation normative du statut d’implémentation. Si la référence n’a pas encore réalisé une obligation, elle est marquée écart d’implémentation. Elle ne réécrit pas l’obligation. Le fichier <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/spec.md">spec.md</a> est titré « REG Conformance Spec — v0.3.1 » (29 septembre 2026). Le runner se décrit « v0.3.2 ». Le message du dernier commit lu dit « v0.5.0 ». Trois étiquettes coexistent. Ce site ne les fond pas en une seule version.</p>

<p>Le manuscrit <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/manuscript/v7.1.md">Governing the Unobserved</a>, v7.1 du 12 octobre 2026, est un working paper. Il étudie la membrane après l’admission, quand l’effet peut rester inobservé. Il ne revendique ni la sûreté générale sous concurrence, ni la certification d’une passerelle de production. DOI de version : <a href="https://doi.org/10.5281/zenodo.23314839">10.5281/zenodo.23314839</a>. Le DOI concept est <a href="https://doi.org/10.5281/zenodo.23270928">10.5281/zenodo.23270928</a>.</p>
