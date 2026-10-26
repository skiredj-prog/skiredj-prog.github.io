---
title: Apprendre à reconnaître
kicker: Cinq distinctions pour ne pas confondre promesse et preuve
description: Comprendre les écarts entre intention, autorisation, contrôle, supervision, résultat et responsabilité.
lede: Les mots du marché se ressemblent. Les conséquences, elles, ne se ressemblent pas.
sources: TENIR Labs · matériel pédagogique éditorial · distinctions à appliquer dans un périmètre précis
---

## Intention n’est pas autorisation

Un objectif légitime ne donne pas automatiquement le droit d’utiliser tous les outils, toutes les données ou tous les moyens nécessaires pour l’atteindre.

## Autorisation n’est pas sûreté

Une action techniquement permise peut être inappropriée dans le contexte réel : mauvais moment, mauvais destinataire, état incertain ou conséquence disproportionnée.

## Simulation n’est pas réalité

Un scénario réussi dans un environnement contrôlé ne prouve pas son comportement face à la latence, aux accès concurrents, aux interruptions ou aux dépendances d’un système réel.

## Supervision n’est pas contrôle effectif

Un humain dans la boucle n’est pas un contrôle si l’action va plus vite que sa capacité d’intervention ou si les informations reçues ne permettent pas de décider.

## Traçabilité n’est pas responsabilité

Un journal peut montrer qu’un événement a eu lieu. Il ne dit pas toujours qui avait le pouvoir de l’autoriser, qui devait l’arrêter ou qui doit réparer ses conséquences.

## La chaîne de preuve

Une politique n’est pas une preuve. Une configuration n’est pas une preuve d’usage. Un log n’est pas une preuve d’effet.

Pour commencer à établir une responsabilité, il faut relier :

```text
Règle
  ↓
Autorité
  ↓
Configuration
  ↓
Action
  ↓
Effet
  ↓
État observé
  ↓
Décision de reprise ou de réparation
```

## Les questions utiles

- Quelle règle était active ?
- Quelle version du système était utilisée ?
- Qui avait autorité ?
- Quelle action a été envoyée ?
- Quel effet est confirmé ?
- Que reste-t-il inconnu ?
- Qui a décidé de poursuivre, suspendre ou réparer ?

## L’issue honnête

Une conclusion peut être positive, partielle, en attente ou non démontrée. **« Nous ne savons pas encore »** n’est pas une faiblesse lorsque cette ignorance est située, attribuée et suivie d’une prochaine vérification.

[Examiner une responsabilité dans votre organisation →](/contact/)
