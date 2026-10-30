# TENIR Labs — direction canonique du site

**Statut :** document de cadrage produit et éditorial  
**Branche de travail :** `rescue/tenir-labs-canonical-20261030`  
**Date :** 2026-10-30

## 1. Décision de direction

Le site public doit être un **parcours d’adoption lisible** pour une organisation qui veut comprendre, essayer puis cadrer l’usage d’une IA autonome. Il ne doit pas être un catalogue de prototypes, une documentation technique complète, ni un empilement de démonstrations historiques.

La promesse centrale est :

> **L’IA agit. Vous gardez la main.**

La formulation opérationnelle est :

> **TENIR Labs examine les conditions dans lesquelles une action d’IA peut être admise, suspendue ou refusée, et rend les limites visibles.**

Le site doit toujours distinguer :

- ce qui est **expliqué** ;
- ce qui est **essayable** ;
- ce qui est **proposé comme accompagnement** ;
- ce qui est **prototype, working draft ou recherche** ;
- ce qui est **publié et vérifiable** ;
- ce qui reste **inconnu ou non démontré**.

## 2. Source de vérité visuelle et narrative

La référence principale est `tenir-labs-site.html` fourni le 30 octobre 2026. Il fixe :

- le langage visuel : **navy profond, bleu cobalt, ambre pour HOLD, vert pour ALLOW, rouge pour DENY** ;
- la typographie : serif éditoriale pour les thèses, sans-serif pour la lecture, mono pour les états et métadonnées ;
- la structure : hero clair, formule de valeur, cycle de maturité, cartes d’entrée, preuves et appel à la conversation ;
- le ton : précis, calme, institutionnel, sans promesse excessive ;
- l’idée pédagogique : montrer la frontière entre intention, décision et effet externe.

La référence fonctionnelle du rapport est `tenir-questionnaire.html`. Elle fixe :

- une entrée courte et rassurante ;
- 10 questions ;
- aucun compte obligatoire ;
- un résultat immédiat ;
- un profil de maturité et une recommandation ;
- un langage explicite sur les limites : le résultat n’est pas une certification.

Les autres pièces jointes — dashboards, ontologie, executive pitch, prototypes React et exports Qwen — sont des **matériaux de travail**. Elles ne doivent pas devenir des pages publiques indépendantes sans décision produit explicite.

## 3. Parcours public canonique

Le premier écran donne trois informations, dans cet ordre :

1. **Ce que TENIR Labs protège :** les conditions d’une action autonome avant son effet externe.
2. **Ce que le visiteur peut faire maintenant :** obtenir son rapport gratuit ou explorer une démonstration bornée.
3. **Où aller ensuite :** Produits, Démos, Crédibilité, Approche.

Le parcours recommandé est :

```text
Accueil
  ├── Rapport gratuit → Questionnaire de maturité → Profil + prochaine étape
  ├── Produits → Services, logiciels, fondations et statut de chaque entrée
  ├── Démos → Scénarios bornés, sans action sur un système réel
  ├── Crédibilité → Versions, tests, limites et preuves attribuées
  └── Approche → Comment un cas est examiné et cadré
```

Le visiteur ne doit pas avoir à deviner la différence entre une offre, un prototype et une preuve. Chaque carte ou lien doit porter un libellé de type : **Service**, **Logiciel**, **Démo**, **Fondation** ou **Rapport gratuit**.

## 4. Hiérarchie de contenu

### Niveau 1 — décision immédiate

- Rapport gratuit / parcours IA ;
- Décrire une situation ;
- Voir une démo bornée.

### Niveau 2 — compréhension commerciale

- Produits et services ;
- Diagnostic accompagné ;
- REG Prevent / Prepare ;
- TENIR-Gov ;
- Démos et expériences.

### Niveau 3 — confiance et examen

- Crédibilité ;
- versions et releases ;
- tests et profils qualifiés ;
- statut et limites ;
- architecture et documents sources.

### Niveau 4 — recherche et dépôts

- RFC, REG-ARCH, code, prototypes, working drafts et expériences historiques.

Les éléments du niveau 4 ne doivent jamais concurrencer le CTA principal du niveau 1.

## 5. Règles de statut

Aucune page ne doit transformer un prototype ou une proposition en produit établi. Les libellés autorisés sont notamment :

- `Offre proposée · périmètre et devis à convenir` ;
- `Working Draft` ;
- `Prototype expérimental` ;
- `Démo bornée` ;
- `Release publiée · périmètre qualifié` ;
- `Fondation documentaire` ;
- `Statut non établi`.

Les formulations suivantes sont interdites sans preuve dédiée : `certifié`, `conforme` sans profil explicite, `exactly-once` pour l’effet externe, `production-ready`, `garantie réglementaire`, `audit automatique`, `client réel` ou `déployé chez`.

## 6. Ce qui est conservé, isolé ou retiré

### À conserver et relier au parcours principal

- `MarketingHome.astro` et son hero guidé ;
- `PathwayAssessment.astro` et le rapport gratuit ;
- les pages Produits, Démos, Crédibilité et Approche ;
- le catalogue avec statut et limites ;
- les expériences bancaires ou d’exécution lorsqu’elles sont explicitement présentées comme fictives ou bornées.

### À isoler derrière « Approfondir » ou « Ressources »

- cartes ontologiques ;
- architecture détaillée ;
- RFC et documents de travail ;
- prototypes React et dashboards ;
- dépôts et workbenches ;
- anciens parcours éditoriaux qui ne servent pas l’entrée commerciale.

### À ne pas publier comme pages concurrentes

- les HTML autonomes issus de générations exploratoires ;
- les variantes Qwen ou anciennes landing pages ;
- les promesses de contrôle ou de conformité non rattachées à une version, un périmètre et une preuve ;
- les menus qui exposent simultanément cinq à dix portes sans hiérarchie.

## 7. Critères d’acceptation avant fusion

Un changement du site est acceptable uniquement si :

1. le hero explique la valeur et expose le rapport gratuit sans scroll sur desktop ;
2. les trois CTA principaux sont compréhensibles en moins de cinq secondes ;
3. les versions FR et EN suivent la même hiérarchie ;
4. chaque entrée du portefeuille affiche son type, son statut, sa maturité et ses limites ;
5. une démo précise si elle est fictive, bornée et sans action externe ;
6. le questionnaire mène à un résultat sans demander un email obligatoire ;
7. les tests responsive couvrent mobile, desktop et premier écran ;
8. aucune page publique ne réintroduit l’ancienne palette ou les anciens menus sans justification ;
9. les sources et la date de vérification sont accessibles ;
10. `main` reste inchangé tant que la branche de sauvetage n’a pas reçu une revue visuelle humaine.

## 8. Prochaine séquence de travail

1. Valider le rendu PR55 comme base visuelle et responsive.
2. Faire un audit des routes publiques et supprimer les doublons de parcours.
3. Réduire la navigation visible au parcours canonique ; déplacer les ressources dans des menus secondaires.
4. Harmoniser les fiches du portefeuille sur le même modèle : valeur, quand l’utiliser, entrée, sortie, statut, limites, prochaine étape.
5. Vérifier le rapport gratuit FR/EN contre `tenir-questionnaire.html`.
6. Capturer les écrans desktop/mobile et effectuer une revue humaine avant toute fusion.
7. Ouvrir une PR de sauvetage dédiée ; ne pas fusionner les anciens drafts par opportunité.
