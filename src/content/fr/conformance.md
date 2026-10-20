---
title: Conformance
kicker: Suites · pas une certification
description: Comment lire et lancer les suites de conformance REG, et ce qu’un passage de tests établit réellement.
lede: Une configuration structurellement admissible n’est pas une garantie effective démontrée. Un harnais qui passe n’est pas une validation du REG de production.
sources: reg-conformance/README.md et spec.md ; tenir-conformance-s1-g1/README.md et STATUS.md ; architecture illustrative, section audit
---

<p>Le dépôt <a href="https://github.com/skiredj-prog/reg-conformance">reg-conformance</a> est une suite neutre vis-à-vis de l’implémentation. Elle définit des propriétés — safety, liveness, tolérance aux fautes, I8 — et une interface <code>ConsensusBackend</code> : reserve, commit, release, reconcile, get_state. Elle ne prescrit ni Raft, ni Paxos, ni une base particulière. Tout backend qui tient les propriétés déclarées de son profil est le sujet possible d’une conformance. « Consensus » dans le nom de l’interface désigne un point de coordination d’état, pas forcément un algorithme distribué.</p>

## Catalogue

<p>Le README et le document illustratif rapportent les mêmes comptes, vérifiés selon eux par un test indépendant du générateur : 144 combinaisons théoriques, 42 admissibles structurellement (9 mono-processus, 18 mono-hôte, 15 multi-hôtes), 102 rejetées. Les règles R1, R2 et R3 lient le périmètre d’hôte, la concurrence et la déduplication. Un profil qui viole les bornes de résilience est rejeté : pour le crash seul, n ≥ 2f+1 ; pour le byzantin, n ≥ 3m+1.</p>

<div class="callout callout-limit">
  <p><strong>Structurel n’est pas effectif.</strong> Le vérificateur de garanties effectives exige un fichier de preuve présent, un SHA-256 égal à l’attestation, et un chemin relatif sans <code>..</code>. Il échoue fermé sinon. Le README dit que cet échec, pour les profils d’exemple, est le comportement voulu. Cette absence est un marquage incomplet : INCONCLUSIVE, IMPLEMENTATION_GAP ou une preuve manquante ne se résument pas en admissibilité pleine, ni en posture NORMAL.</p>
</div>

## Lancer

<p>Depuis une copie du dépôt, les commandes documentées sont :</p>

<pre><code>python3 tools/enumerate_configs.py
python3 tools/validate_profiles.py
python3 tests/test_catalog_enumeration.py
python3 tools/verify_effective_guarantees.py</code></pre>

<p>Le runner <code>runner.py</code> se décrit comme suite v0.3.2. Modes : <code>--mode http</code> (adaptateur, niveau de preuve 2), <code>--mode native</code> (noyau en processus, niveau 3), ou les deux. Un résultat doit déclarer <code>interface_mode</code>. Mélanger natif et adaptateur sans étiquette est non conforme au sens de RFC-7. Les états de rapport incluent PASS, FAIL, INCONCLUSIVE, NOT_APPLICABLE, ADAPTER_REQUIRED, IMPLEMENTATION_GAP. INCONCLUSIVE n’est jamais un PASS.</p>

<p><code>spec.md</code> v0.3.1 dit que le runner enregistre 53 vecteurs, dont 36 vecteurs étendus encore en IMPLEMENTATION_GAP, C4 natif non applicable, CT-R4-009 et CT-R4-010 ouverts. Cette phrase date le périmètre du fichier. L’arbre a continué. Il ne faut pas lire 36 comme le décompte vivant sans relire <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/VECTORS.md">VECTORS.md</a>.</p>

## Preuves, au 19 octobre 2026

<p>Les journaux sous <code>evidence/</code> portent des en-têtes qui disent l’exécution dans l’environnement de l’auteur, pas par un vérificateur indépendant. Le hash prouve que le fichier n’a pas changé depuis l’attestation. Il ne prouve pas que le test a été bien exécuté. <code>deployment.manifest</code> reste, dans les profils lus, une dépendance bloquante : sans lui, un auditeur externe ne relie pas la preuve à l’hypothèse d’hôte.</p>

<p>Le README résume encore certains profils multi-hôtes comme sans preuve, et écrit qu’aucune implémentation de consensus multi-hôte n’existe. Le profil <code>consensus-replicated.yaml</code> du même arbre déclare pourtant RaftConsensusBackend 5.6.0 et pointe des journaux <code>evidence/test-raft-*.log</code>. Ces deux textes ne concordent pas. Les journaux eux-mêmes disent un essaim de 3 nœuds, un modèle de faute sans byzantin, et un auteur plutôt qu’un tiers. Le journal de <code>tenir_governance</code> précise que les nœuds de test utilisent localhost et des ports distincts : ce n’est pas un essai sur un réseau physique multi-hôtes. Le dessin d’architecture ajoute : Raft 5.6.0 n’est pas une preuve de consensus en environnement hostile.</p>

## Harnais S1

<p>Le dépôt <a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1">tenir-conformance-s1-g1</a>, version 0.1.0, est le harnais exécutable S1 G0+G1, « Evidence Lost After Commit ». Sa première ligne dit qu’il n’est pas une validation du REG de production. Le fichier G1 le répète : passer les tests prouve que le harnais satisfait les assertions G0, pas que REG ou TENIR est validé.</p>

<p><a href="https://github.com/skiredj-prog/tenir-conformance-s1-g1/blob/main/STATUS.md">STATUS.md</a> est plus précis, et plus étroit. Il dit que les définitions opérationnelles G0 de S1 à S6 ont été confrontées à une membrane de laboratoire RFC-4, pour les entrelacements séquentiels testés, avec des artefacts de CI. Le chemin S1 appelle un vrai <code>PolicyEngine</code> pour le score. Cela n’établit pas la concurrence non contrainte, la vérification cryptographique de production, ni la certification d’une passerelle. La phrase publique qu’il demande de tenir est exactement celle-là.</p>

<p>Limites écrites dans le README du harnais : la clé publique de confiance est fournie par l’appelant ; la rotation et la révocation ne sont pas implémentées ; les postconditions déclarées ne prouvent pas un effet dans le monde ; les engagements S11 sont des artefacts en processus. Lancer le cas S1 :</p>

<pre><code>python -m pytest tests/test_s1.py -v
python tools/run_s1.py</code></pre>

<p>Les niveaux de preuve de la spec — correspondance sémantique, test via adaptateur, conformance native — restent des étiquettes à déclarer. Aucune n’équivaut à un audit indépendant tant que le sujet, la révision et l’environnement ne sont pas épinglés proprement. Le texte de spec.md le dit.</p>
