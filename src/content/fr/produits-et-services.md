---
title: Produits et Services
kicker: REG — Prévention et préparation réglementaire
description: Comprendre les exigences, examiner les contrôles et préparer une synthèse sourcée avec des actions prioritaires.
lede: "Une règle à comprendre, un usage de l’IA à éclaircir ou un contrôle à préparer ? Un diagnostic accompagné peut aider à préciser les faits, les lacunes et la suite à décider."
sources: REG v0.1 Working Draft — 21 octobre 2026
---

# REG — Prévenir · Préparer · Démontrer

## Commencer par un diagnostic accompagné

Vous portez une question métier, de conformité ou de conception. Le point de départ est une situation précise : comprendre ce qu'une exigence implique, retrouver les éléments qui soutiennent un contrôle, ou éclaircir un usage de l'IA dans un processus.

**La restitution, selon le périmètre convenu :** une synthèse sourcée des constats, des inconnues et des lacunes, accompagnée d'un plan d'actions priorisé. Elle permet de préparer une décision et de retrouver ce qui la soutient.

| Vous apportez | Nous examinons ensemble | Vous recevez |
| --- | --- | --- |
| Une règle ou un processus, avec les documents et éléments disponibles | Les exigences, les contrôles annoncés, les éléments vérifiables et les écarts | Une synthèse avec ses sources et ses limites, puis les prochaines vérifications ou décisions proposées |

Le diagnostic est un **accompagnement à cadrer**, pas un logiciel à installer. Un premier échange à distance sert à choisir la question. Une proposition précise ensuite le périmètre, les accès autorisés, la confidentialité, les livrables et les conditions commerciales. Aucun accès technique ou document sensible n'est requis pour prendre contact.

[Discuter d'un diagnostic accompagné →](/contact/)

La page de contact aide à préparer votre message ; vous le relisez avant de l'envoyer depuis votre messagerie.

## REG : deux directions de travail

Sur cette page, **REG désigne la démarche produit Prévenir · Préparer** de TENIR Labs. Ses outils ont des maturités différentes, précisées ci-dessous. Le standard technique **[Runtime Execution Governance (REG)](/standard/)** traite de la frontière d'exécution des actions ; ses contrats ne sont pas remplacés par cette démarche.

- [Les produits et leur état d'avancement](/portfolio/products/) — capacités, accès et limites.
- [Les accompagnements](/portfolio/services/) — périmètres, déroulement et livrables.
- [Les démonstrations](/portfolio/demos/) — ce que vous pouvez explorer et ce que chaque exemple permet d'observer.

## Après le diagnostic : des étapes facultatives

Si la question concerne l'IA, l'examen peut porter sur sa présence réelle dans les outils, les données traitées, les décisions ou actions influencées et les protections disponibles. Un usage déclaré et un usage observé restent distingués.

Un pilote d'observation **non bloquant** peut ensuite être étudié si une intégration est justifiée et autorisée. Il nécessite une analyse des impacts techniques, des données et des responsabilités ; il n'est pas présenté comme sans risque ni comme déjà déployable chez tout client.

La gouvernance bloquante (**ENFORCE**) est une étape ultérieure soumise à validation des invariants, des modes de défaillance et des garanties dans un périmètre défini. Elle n'est ni automatique ni incluse dans le diagnostic.

## Le problème

Deux écarts peuvent apparaître dans les organisations :

**En amont** : une exigence est publiée, mais ses conditions d'application, ses dépendances et ses hypothèses implicites restent dans l'ombre. On applique sans savoir ce qui est réellement requis.

**En aval** : des systèmes fonctionnent, des procédures existent — mais au moment de rendre des comptes, on ne peut pas démontrer clairement ce qui est couvert, partiellement vérifié ou absent.

**REG** répond aux deux, séparément puis ensemble.

## Parcours A — PRÉVENIR

### De l'exigence vers la maîtrise

*« Qu'implique réellement cette règle pour nos systèmes, nos décisions et nos risques ? »*

- **Découvrir** : extraire le texte, conserver la distinction entre source et interprétation
- **Révéler** : faire apparaître les conditions implicites, les dépendances cachées, les ambiguïtés
- **Clarifier** : transformer l'intention en règles candidates, sans masquer ce qui reste incertain
- **Rapprocher** : identifier les contrôles qui répondent — ou devraient répondre — à chaque exigence
- **Livrer** : un plan de prévention avec risques identifiés, hypothèses critiques et prochaines vérifications

## Parcours B — PRÉPARER

### Des systèmes vers la preuve

*« Si un auditeur ou un régulateur demande demain, que pouvons-nous démontrer ? »*

- **Définir le périmètre** : ce qui est inclus, ce qui est laissé de côté
- **Recenser** : documents, configurations, traces, tests — et marquer ce qui est déclaré mais absent
- **Qualifier** : origine, date, validité, lien avec l'exigence, niveau de confiance
- **Rapprocher** : faire correspondre ce qui est attendu à ce qui est disponible
- **Constituer** : un dossier structuré, exportable, avec un registre explicite des lacunes
- **Agir** : lister ce qui doit être retrouvé, vérifié ou créé pour compléter la réponse

## Convergence : la matrice des écarts

Lorsque les deux parcours sont alimentés, REG établit la correspondance :

| Ce qui est attendu    | Ce qui est disponible | État                             |
| --------------------- | --------------------- | -------------------------------- |
| Exigence clarifiée    | Contrôle identifié    | Couverture candidate — à vérifier |
| Exigence clarifiée    | Contrôle déclaré ⚠️   | À vérifier                       |
| Exigence clarifiée    | Preuve absente ❌      | Lacune — action requise          |
| Hypothèse non résolue | —                     | À clarifier avant décision       |
| Référence ambiguë     | —                     | En attente de formulation stable |

**Aucune case ne devient "conforme" sur simple présence.** Chaque conclusion porte son origine, sa date et ses limites.

## Comment lire la restitution

Une pièce disponible, une déclaration et un contrôle vérifié portent des statuts différents. Une lacune reste visible et précise ce qu'elle empêche de conclure. La restitution aide à décider de la prochaine vérification ; elle ne constitue ni une certification, ni un avis juridique, ni une validation de production. REG ne revendique pas un audit en temps réel des systèmes et ne produit pas de preuves pour combler les absences.

## État du projet

État de référence du **21 octobre 2026** :

- **Version :** 0.1 — cadrage consolidé, Working Draft.
- **Accessible :** un exemple simulé public, sans données client.
- **En développement :** Discovery testé sur branche de travail, en aperçu privé ; Translation Studio en prototype ; Préparation en construction.
- **À éprouver :** la valeur et le format de l'accompagnement lors des premières missions réelles.

[Lire la spécification de cadrage REG v0.1 — Working Draft →](/publications/reg-v0.1/)
[Voir le dossier simulé — aucune donnée client →](/offre/exemple/)
[Nous contacter →](/contact/)
