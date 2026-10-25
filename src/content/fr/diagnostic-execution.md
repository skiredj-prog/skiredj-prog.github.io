---
title: "REG Execution Boundary Diagnostic"
kicker: "Offre spécialisée · un flux critique"
description: "Diagnostic borné des frontières d'exécution des agents IA : duplications, interruptions, résultat inconnu et réconciliation."
lede: "Un agent peut déclencher une action. Saurions-nous établir son résultat avant d'autoriser une nouvelle commande ?"
sources: "Pack commercial TENIR Labs du 25 octobre 2026 · proposition à qualifier, non certifiante"
---

## Un flux. Une frontière. Une conclusion vérifiable.

Un agent IA peut produire une décision plausible tout en laissant une opération dans un état ambigu : **commande envoyée ou non, réservation créée ou non, effet exécuté ou non**.

Le **REG Execution Boundary Diagnostic** examine **un seul flux critique**, ses transitions, ses hypothèses implicites et ce que les éléments accessibles permettent réellement de démontrer.

**Vous recevez :** une cartographie des transitions, une matrice des contrôles et des scénarios examinés, un registre des hypothèses et des inconnues, puis un rapport qui indique si la revendication est **acceptable dans le périmètre testé**, en **HOLD**, ou **non démontrée**. L'issue peut légitimement être « non démontré ».

[Présenter un flux pour qualification →](/contact/) · [Voir le scénario bancaire fictif →](/embeds/demonstration-bancaire.html)

## À qui s'adresse ce diagnostic ?

Banques, assurances, fintechs, intégrateurs IA ou cloud, équipes d'architecture, de risques, de sécurité et de conformité confrontées à une action agentique avec **un effet externe identifiable** : paiement, modification d'un dossier, allocation de ressource ou commande vers un fournisseur.

Le point de départ n'est **pas une évaluation du modèle IA**. C'est la question de l'autorité d'exécution, de la répétition, de l'interruption et de la preuve de l'effet.

## La question à résoudre

| Situation | Ce qu'il faut pouvoir établir |
| --- | --- |
| Action nominale | Qui a admis la commande, quel identifiant lie la tentative et l'effet, et quel état final est confirmé ? |
| Duplication | La même opération, ou la même intention sous un autre identifiant, peut-elle produire un deuxième effet ? |
| Réponse absente | L'absence de confirmation est-elle conservée comme **UNKNOWN** plutôt que transformée en échec ? |
| Reprise ou réconciliation | Quelle autorité et quelle preuve sont nécessaires avant de relancer, clôturer ou escalader ? |

Un **PASS** d'admission n'est pas la confirmation d'un effet externe. Un test favorable du démonstrateur ne prouve pas le comportement du système du client.

## Déroulement proposé en cinq étapes

1. **Cadrage** : identifier le propriétaire métier et technique, un flux, un système destinataire, les effets à protéger et les critères de réception.
2. **Cartographie** : représenter les états, commandes, réservations, écritures et points de réconciliation.
3. **Hypothèses** : qualifier notamment les identifiants, l'autorité des writers, la finalité du fournisseur et la reprise après panne.
4. **Essais bornés, lorsque convenus** : observer dans un environnement autorisé les scénarios nominal, doublon, interruption, réponse perdue et réconciliation. **Sans environnement ou accès approuvé, ce travail reste une analyse documentaire et un plan de tests**, pas une campagne exécutée.
5. **Restitution** : qualifier résultats observés, absences de preuve, protections requises et conditions de décision.

## Périmètre et conditions

**Un flux critique lors du premier engagement.** Accès minimaux, données synthétiques et environnement de test privilégiés. La confidentialité, les rôles, les pièces consultées et les exclusions sont définis avant démarrage.

La **durée et le prix sont définis sur devis après qualification** du flux, du nombre de systèmes, des sources disponibles et du niveau de preuve attendu. Aucun essai en environnement client ni délai de livraison n'est présumé avant accord écrit.

Les modifications de code, la connexion à un fournisseur réel, le déploiement d'un gouverneur et toute mise en production constituent des engagements distincts.

## Ce que le diagnostic ne promet pas

- Ni certification de conformité ni avis juridique.
- Ni garantie générale de non-duplication ou de fiabilité en production.
- Ni preuve de règlement bancaire réel lorsque le fournisseur externe n'a pas été testé.
- Ni déploiement automatique de **TENIR-Gov** : le logiciel n'est à étudier que si le diagnostic justifie une frontière runtime indépendante.
- Ni conclusion positive obligatoire : **HOLD** et **non démontré** sont des résultats recevables.

## Préparer le premier échange

Il suffit de préciser **l'action concernée**, son **effet externe**, **le coût d'un doublon ou d'un blocage** et **ce qu'on observe en cas de réponse perdue**. N'envoyez aucun identifiant secret, donnée financière nominative ou document confidentiel lors du premier contact.

[Demander la qualification du flux →](/contact/) · [Lire l'offre générale de diagnostic accompagné →](/offre/) · [Examiner un rapport fictif →](/offre/exemple/)
