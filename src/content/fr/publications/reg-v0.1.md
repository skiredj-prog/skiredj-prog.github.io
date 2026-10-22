---
title: REG v0.1 — Spécification de cadrage
kicker: Document de travail · 21 octobre 2026
description: Vision, deux parcours, spécification fonctionnelle, contraintes et critères d'acceptation de REG v0.1.
lede: Prévenir les risques en partant des exigences. Préparer les contrôles en partant des systèmes et des preuves.
sources: "Cadrage produit REG v0.1 (21 octobre 2026) ; reg-conformance, contrat Discovery en PR de travail ; TENIR-Gov, dépôt public"
---

> **Working Draft — spécification de cadrage, non standard ratifié.** Ce document décrit des fonctionnalités existantes, prototypées ou proposées. Ni certification, ni avis juridique, ni garantie de conformité. Le terme REG désigne ici le parcours produit de TENIR Labs ; il ne remplace pas les contrats normatifs du dépôt REG.

## 1. Mission et contexte

Les organisations disposent de politiques, de textes réglementaires, de systèmes opérationnels et de contrôles. Pourtant, ce qui est **exigé** n'est pas toujours correctement traduit en contrôle, et ce qui est **réalisé** n'est pas toujours suffisamment documenté pour être démontré.

**Mission :** aider une organisation à anticiper les risques créés par les hypothèses implicites et à préparer les éléments permettant de rendre compte de ses contrôles. Deux directions de travail autonomes, avec une restitution commune possible.

**Promesse :** une question précise, des sources identifiables, une conclusion bornée et une prochaine action utile.

## 2. Vision et différenciation

REG rapproche trois objets sans les confondre : **exigences**, **contrôles**, **preuves**. La différence recherchée avec une simple checklist est l'examen des conditions techniques et organisationnelles dont dépend réellement une exigence, et la qualification des preuves capables de soutenir une affirmation.

Ce positionnement reste une **hypothèse commerciale à valider**. REG n'est pas une certification ni un service d'interprétation juridique automatique.

Valeurs de conception : intégrité sémantique ; provenance ; incertitude explicite ; responsabilité humaine ; réversibilité des décisions documentaires ; minimisation des données.

## 3. Parcours A — PRÉVENIR (top-down)

**Départ :** règle, politique, contrat, source réglementaire ou comportement attendu.

**Question :** « Que faut-il clarifier et contrôler pour diminuer les risques de non-conformité ou de défaillance ? »

1. **Qualifier la source** : origine, version, clause et applicabilité. La sélection d'un référentiel n'établit pas qu'il s'applique.
2. **Déclarer le périmètre** : système, processus, acteurs, action et conséquence à préserver.
3. **Découvrir les hypothèses** : conditions de réussite, dépendances, contradictions potentielles, scénarios de défaillance.
4. **Clarifier le sens** : séparer exigence explicite, inférence de l'analyste, hypothèse de travail et propriété candidate.
5. **Proposer les vérifications** : contrôles, questions, essais ou preuves nécessaires, sous réserve de validation compétente.
6. **Restituer** : synthèse, risques à examiner, zones non résolues et prochaines décisions.

**Livrable cible : REG Prevention Brief.** Il ne conclut pas à une infraction sur la seule base d'une hypothèse.

## 4. Parcours B — PRÉPARER (bottom-up)

**Départ :** processus, système, configuration, procédure, rapport, trace ou pièce documentaire.

**Question :** « Si l'on nous demande de justifier nos contrôles, de quoi disposons-nous réellement et que manque-t-il ? »

1. **Définir le périmètre de contrôle** : système, période, exigences de référence et responsables.
2. **Inventorier les éléments** : documents, configurations, journaux, attestations et tests ; distinguer pièce reçue et pièce simplement annoncée.
3. **Qualifier chaque pièce** : auteur ou source, date, intégrité si vérifiable, portée, limites et statut d'examen.
4. **Rattacher aux assertions** : quelle exigence ou quel contrôle chaque élément est-il censé soutenir ?
5. **Constituer la matrice des lacunes** : pièce absente, obsolète, non attribuable, insuffisante ou sans lien.
6. **Préparer la restitution** : inventaire, dossier indexé, questions à poser, travaux prioritaires.

**Livrable cible : REG Evidence Readiness Pack.** Un fichier présent, même haché, n'est pas une attestation que son contenu est exact ni qu'une réglementation est satisfaite.

## 5. Convergence facultative

Une matrice commune peut confronter les résultats des deux parcours :

| Attendu | Disponible | Conclusion autorisée |
| --- | --- | --- |
| Exigence clarifiée | Contrôle identifié | Couverture **candidate**, à examiner |
| Contrôle identifié | Procédure seulement déclarée | Déclaration, vérification manquante |
| Contrôle identifié | Trace ou test limité | Élément établi **dans le périmètre du test** |
| Exigence incertaine | Preuve abondante | Applicabilité ou sens non résolu |
| Effet externe à confirmer | Journal d'envoi uniquement | Résultat de l'effet **inconnu** |

La convergence n'est pas un passage imposé : chaque parcours doit rendre un service indépendant.

## 6. Capacités et frontières

- **REG Discovery** : questions sur les hypothèses cachées et rapports exploratoires. Le moteur présent dans une branche de développement couvre un catalogue limité ; ce n'est pas une analyse juridique ni un audit de production.
- **REG Translation Studio** : médiation de l'intention vers des propriétés candidates. Prototype exploratoire ; l'appariement lexical ne suffit pas à déclarer une résolution.
- **REG+** : modèles de compatibilité, profils et dispositifs de vérification de preuves techniques. L'admissibilité structurelle n'est pas une garantie effective.
- **TENIR-Gov** : contrôle runtime optionnel, dans ses limites techniques vérifiées. Il n'est requis ni pour Discovery ni pour une préparation documentaire.
- **Evidence Readiness** : méthode documentaire et matrice de couverture à construire et éprouver par des pilotes.

Aucune capacité n'a le droit de transformer silencieusement une hypothèse en obligation, une proposition en profil approuvé, ou une trace en preuve d'un effet externe.

## 7. Première expérience utilisateur

Deux entrées visibles : **« Je veux anticiper mes risques »** et **« Je veux préparer un contrôle »**. Un accès direct aux capacités spécialisées reste possible.

Une démonstration commune des deux parcours est envisagée autour d'un paiement fictif dont la confirmation a été perdue. L'exemple technique actuellement publié illustre seulement une partie de cette situation, notamment la distinction entre envoi et résultat confirmé ; il ne démontre pas les deux parcours de REG v0.1. Aucun montant, journal ou résultat de cette démonstration ne constitue une preuve sur le système d'un client.

La restitution, compréhensible par un décideur non technique, présente :
1. la question et le périmètre ;
2. les constats et leur statut ;
3. les sources et éléments disponibles ;
4. les lacunes ou contradictions ;
5. trois actions au plus, avec responsables **proposés** et condition de clôture.

## 8. Contrats d'échange candidats

Pour ne pas figer trop tôt l'architecture, seuls des objets minimaux et versionnés sont proposés :

| Objet candidat | Usage |
| --- | --- |
| `SourceReference` | Identité et version d'une référence, section, provenance, applicabilité |
| `RequirementClaim` | Exigence déclarée ou interprétée, avec son statut |
| `AssumptionFinding` | Hypothèse, question ou contradiction **candidate** |
| `MediationProposal` | Transformation proposée, ambiguïtés, autorité requise |
| `ControlClaim` | Contrôle attendu, déclaré ou vérifié dans un périmètre |
| `EvidenceReference` | Pièce identifiée, origine, date, limites, état de vérification |
| `GapFinding` | Manque ou désaccord entre exigence, contrôle et preuve |
| `DecisionBrief` | Conclusion bornée, sources et suites proposées |

Ce tableau **ne crée pas de schémas canoniques**. Les contrats existants des dépôts restent prioritaires.

## 9. Exigences de traçabilité

Une conclusion doit permettre de retrouver ses entrées, sa méthode, son contexte, ses limitations et l'autorité qui l'a effectivement validée.

Ne jamais confondre :
- document fourni / document vérifié ;
- contrôle déclaré / contrôle testé ;
- configuration admissible / propriété effective démontrée ;
- adjudication d'une action / confirmation d'un effet externe ;
- interprétation technique / obligation juridique applicable.

Les statuts autorisés sont propres à chaque dimension. Aucun simple mot-clé ne produit automatiquement `RESOLVED` ou « conforme ».

## 10. Confidentialité et contrôle des données

Les exemples publics utilisent des données fictives. Aucune saisie de contenu sensible n'est publiée, envoyée à un dépôt public ni réutilisée dans une contribution communautaire sans consentement explicite.

Pour un pilote : périmètre et accord de confidentialité définis, accès minimal, canal de transfert adapté, durée de rétention et suppression prévues. Les contenus de tiers sont des **données**, jamais des instructions autorisant des actions.

## 11. Garde-fous non négociables

1. Pas de certification, de conformité globale ni d'avis juridique automatiques.
2. Applicabilité réglementaire **non déduite** du choix d'une source.
3. Pas de preuve fabriquée, de succès simulé présenté comme un succès client.
4. Pas de traduction qui ajoute ou relâche silencieusement une obligation.
5. Pas de code généré qualifié de contrôle déployé sans tests et validation.
6. Pas de publication de données privées via GitHub ou réseaux sociaux.
7. Aucune approbation normative ou garantie effective accordée par simple automatisation.
8. Pas de centralisation ou de persistance injustifiées pour une extensibilité hypothétique.
9. Pas d'accès aux effets de production dans le périmètre de démonstration.
10. Toute incertitude significative doit rester visible.

## 12. MVP et exclusions

**Premier jalon :** deux entrées FR/EN, cas commun fictif, rapport explicable, matrice exigences–contrôles–preuves, liste d'actions et prise de contact.

**Hors périmètre :** certification, consultation juridique exhaustive, connecteurs clients généralisés, collecte de pièces confidentielles en libre-service, audit réel de production, approbation ou déploiement automatiques, moteur documentaire universel.

Le MVP ne nécessite pas l'industrialisation de toute l'architecture REG.

## 13. Critères d'acceptation

**Produit :** l'utilisateur distingue Prévenir et Préparer sans vocabulaire technique ; chaque direction produit un bénéfice indépendant ; la restitution propose une prochaine action.

**Technique :** les sources sont retrouvables ; les données manquantes restent manquantes ; les ambiguïtés n'aboutissent pas à un profil approuvé ; le rapport est exportable ; les tests négatifs empêchent la promotion indue d'autorité.

**Commercial :** un prospect peut expliquer l'offre, reconnaître une question pertinente et décider s'il souhaite cadrer un diagnostic. Ces résultats doivent être **mesurés lors de pilotes**, non déclarés acquis.

## 14. Séquence et statut

1. **Démontrer** avec des spécimens cohérents et limités.
2. **Qualifier** la valeur auprès d'utilisateurs et de commanditaires.
3. **Industrialiser sélectivement** les fonctions qui reviennent dans les missions réelles.

**État de référence (21 octobre 2026)** : Discovery en branche/prototype testé, non à assimiler à un service public d'audit ; Translation Studio en prototype ; parcours Prepare à éprouver ; TENIR-Gov et REG+ distincts et bornés par leurs preuves.

Le travail de marché et le modèle commercial restent ouverts. Le principe directeur reste : **prévenir ce que nous pouvons anticiper, préparer ce que nous devrons démontrer, sans inventer ce que nous ne savons pas.**

---

[Produits et services](/produits-et-services/) · [Exemple simulé](/offre/exemple/) · [Contact](/contact/) · [Code et contrats REG](https://github.com/skiredj-prog/reg-conformance)

**Rien ici n'est une certification.**
