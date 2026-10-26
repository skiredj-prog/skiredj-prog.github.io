---
title: Cas documentés et scénarios pédagogiques
kicker: Lire un incident comme une chaîne de responsabilité
description: Des cas sourcés pour comprendre comment une promesse d’IA devient une décision, un effet et parfois une responsabilité difficile à attribuer.
lede: Un cas ne sert pas seulement à désigner un coupable. Il sert à voir les acteurs, la séquence, l’impact et la preuve disponible.
sources: Sources primaires ou références publiées indiquées dans chaque cas · interprétations TENIR explicitement séparées des faits
---

## Comment lire un cas

Chaque fiche suit la même séquence :

```text
Promesse du marché
        ↓
Achat ou intégration
        ↓
Délégation
        ↓
Décision ou action
        ↓
Incident
        ↓
Recherche du responsable
        ↓
Preuve disponible ou absente
```

Les faits publiés, les interprétations possibles et les questions ouvertes ne sont jamais confondus.

## Cas 1 — Quand une réponse devient une promesse

**Secteur :** transport aérien · relation client

Un assistant conversationnel a fourni à un client une information erronée concernant une possibilité de remboursement. Le client a tenté de s’appuyer sur cette information dans sa relation avec la compagnie.

La question n’est pas seulement de savoir si la réponse était fausse. Il faut aussi demander : l’organisation pouvait-elle établir quelles règles, données ou limites avaient encadré cette réponse ? Le client pouvait-il raisonnablement la recevoir comme une information officielle ?

**À retenir :** une réponse automatisée peut être reçue comme un engagement de l’entreprise, même lorsqu’elle n’a pas été rédigée ou validée par une personne.

**Trois questions :**

- Les réponses qui annoncent un droit, un prix ou un remboursement sont-elles reliées à une source officielle ?
- Qui peut corriger une réponse fausse et dans quel délai ?
- L’organisation peut-elle retrouver la version de la règle et de l’assistant qui ont produit la réponse ?

**Statut :** cas documenté — chatbot fournissant une information erronée, et non agent autonome exécutant une transaction.

**Source :** [Civil Resolution Tribunal, *Moffatt v. Air Canada*, 2024 BCCRT 149](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html). Cette décision ne permet pas, à elle seule, de conclure quelle technologie exacte se trouvait derrière l’assistant.

## Cas 2 — Quand personne ne sait si l’opération est partie

**Statut :** scénario pédagogique — aucun règlement bancaire réel démontré.

**Secteur :** banque · assurance · paiement

Une intention est formulée. Une commande est envoyée. La réponse du fournisseur disparaît. L’organisation doit décider quoi faire alors qu’elle ne sait pas si l’effet externe a eu lieu.

Le réflexe le plus dangereux consiste à transformer le silence en échec, puis à répéter l’opération. Une autorisation prouve qu’une action pouvait être demandée. Elle ne prouve pas que l’effet externe a eu lieu — ni qu’il n’a pas eu lieu.

**Les joueurs :** système d’orchestration, propriétaire du compte, moteur de politique, fournisseur de règlement, équipe opérationnelle, responsable du risque, auditeur et bénéficiaire.

**À examiner :** l’identité unique de l’opération, l’état réel auprès du fournisseur, la trace de la première tentative et l’autorité qui décide de reprendre, suspendre ou réconcilier.

**Limite :** ce scénario ne certifie aucun règlement bancaire réel et ne remplace pas un test autorisé chez un fournisseur.

## Cas 3 — Le marché se renvoie la chaîne

**Statut :** matrice d’analyse — à compléter par des sources avant toute présentation comme cas réel.

**Secteur :** intégration IA · gouvernance fournisseur

Le fournisseur indique que le client reste responsable de l’usage. L’intégrateur indique qu’il a suivi les spécifications. L’équipe métier indique qu’elle s’est appuyée sur la solution. La personne affectée reçoit pourtant une conséquence unique.

**Question centrale :** qui possède la chaîne de preuve reliant la promesse commerciale, le mandat, la configuration, l’action, l’effet et la réparation ?

Ce cas doit être complété par des sources et exemples vérifiables avant toute publication comme « cas réel ». En attendant, il sert de matrice d’analyse et non d’allégation factuelle.

## Une règle de lecture

> **Ce qu’un cas permet d’affirmer doit rester plus étroit que ce que le marché permet d’imaginer.**

[Voir les acteurs qui composent chaque chaîne →](/acteurs/)
