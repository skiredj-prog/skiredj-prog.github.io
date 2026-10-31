# Audit langage & accessibilité — TENIR Labs

**Date :** 30 octobre 2026  
**Périmètre :** site statique TENIR Labs, versions française et anglaise, pages marketing, portefeuille, parcours d’auto-évaluation, cas sectoriels, crédibilité, replay et navigation.  
**Méthode :** lecture des composants et contenus sources, build statique, contrôle des liens, suites Chromium existantes, contrôle HTML sur les 109 routes générées et axe-core sur 18 parcours publics prioritaires.

## Résumé exécutif

Le site est techniquement stable sur les parcours critiques : la build passe, les 115 pages contrôlées n’ont pas de liens internes cassés, les suites Chromium commerciales et éditoriales passent sur les largeurs testées, le questionnaire FR/EN fonctionne et la navigation mobile a été vérifiée.

Le principal risque n’est pas un défaut de fonctionnement. C’est la **compréhension** : le site présente simultanément une thèse grand public, un catalogue de services, un logiciel bêta, des simulations et une doctrine technique. Les limites sont souvent honnêtement documentées, mais elles arrivent parfois après des noms, chiffres ou termes qui peuvent donner une impression de maturité ou de garantie plus large que le périmètre réel.

Aucun P0 bloquant n’a été identifié. Il existe toutefois des corrections P1 à traiter avant une nouvelle campagne commerciale ou une publication majeure.

## Résultats des contrôles

| Contrôle | Résultat | Lecture |
|---|---:|---|
| Build Astro | PASS | 109 pages générées |
| Liens internes | PASS | 115 pages, aucun lien cassé |
| Contrôle P2 éditorial | PASS | navigation bilingue, cas, vidéos, identifiants |
| Contrôles Chromium commerciaux | PASS | FR/EN, 320 à 1710 px, questionnaire, crédibilité |
| Navigation mobile | PASS | 320 à 1100 px + desktop |
| Contrôle asset registry | PASS avec maintenance hold documenté | cinq écarts connus, non inférés |
| axe-core | Défauts sérieux relevés | contraste et nom accessible du lien de marque |
| Contrôle portefeuille | ÉCHEC de contrat | le test attend encore l’ancien tableau `pm-table`, remplacé par la nouvelle matrice 2×2 |

## P1 — à corriger avant diffusion commerciale

### 1. Clarifier la promesse de la page d’accueil

La page d’accueil veut être grand public mais réintroduit rapidement des termes internes : « agents IA », « actions à risque », « frontière gouvernée », « HOLD », « rapprochement », « maturité » et « traçabilité ».

La bonne ligne éditoriale est celle déjà engagée dans Why Now : paiement, dossier modifié, réponse client, confirmation absente. Il faut la tenir partout sur la home.

**Recommandation :** faire suivre la promesse par une phrase simple et constante :

> Nous vous aidons à comprendre ce qui s’est passé, ce qui reste incertain et quelle décision prendre ensuite.

À la première occurrence seulement : « mettre l’action en pause (HOLD) » ; « vérifier auprès du système concerné (rapprochement) ».

### 2. Réduire les portes d’entrée concurrentes

Le site propose en parallèle : Why Now, démo, diagnostic, rapport, parcours, contact, crédibilité et produits. Les CTA sont fonctionnels, mais leur hiérarchie n’est pas encore intuitive pour un visiteur qui arrive sans contexte.

**Parcours recommandé :**

1. Comprendre le problème avec une situation concrète.
2. Voir une simulation clairement fictive.
3. Choisir entre un diagnostic accompagné, un outil bêta ou une lecture documentaire.
4. Seulement ensuite proposer l’auto-évaluation ou le contact.

Chaque CTA devrait préciser ce qui se passe après le clic :

- « Lire l’explication en 3 minutes » ;
- « Ouvrir la simulation fictive » ;
- « Répondre à 10 questions — 5 minutes, sans compte » ;
- « Parler d’un cas précis ».

### 3. Normaliser les statuts des produits

Les fiches mélangent service proposé, logiciel bêta, simulation, prototype et cadre de recherche. Les noms `REG Prevent`, `REG Prepare`, `REG Explorer`, `REG Discovery`, `REG Mediation`, `REG Translation Studio`, `REG+`, `REG-ARCH` et `REG Conformance` forment une taxonomie utile en interne mais trop dense en première lecture.

**Recommandation :** afficher systématiquement une légende visible :

- **Service proposé** ;
- **Logiciel bêta** ;
- **Simulation fictive** ;
- **Prototype** ;
- **Cadre de recherche**.

Pour chaque fiche, ajouter une ligne : **« À choisir si… »**. Garder le nom REG comme nom de méthode, mais faire précéder le visiteur par le problème qu’il cherche à résoudre :

- « Clarifier une règle » ;
- « Retrouver les preuves » ;
- « Examiner une action incertaine ».

### 4. Encadrer les chiffres de preuve

Les mentions `v5.7.0`, `46/46 PASS`, `81/81` et « badge » sont précises, mais leur périmètre n’est pas toujours visible au même endroit. En lecture rapide, elles peuvent être comprises comme une certification générale.

**Recommandation :** afficher immédiatement le périmètre :

> Résultat valable pour le profil loopback mono-hôte testé. Ce n’est ni une certification ni une garantie de l’effet externe.

Même règle pour TENIR-Gov :

> Bêta mono-hôte ; ne garantit pas un effet externe exactement une fois ni la conformité de tout environnement.

### 5. Requalifier l’auto-évaluation

Le parcours est fonctionnel et bien testé, mais « rapport personnalisé », « rapport gratuit » et « trois prochaines actions » peuvent suggérer une expertise vérifiée. Le résultat repose sur des réponses déclaratives.

**Recommandation :** employer partout :

- **Auto-évaluation indicative** ;
- **Aperçu de votre parcours de maturité** ;
- **Trois pistes à examiner** ;
- **Préparer une discussion**, et non « recommandation » ou « diagnostic ».

La limite doit apparaître avant le démarrage, pas uniquement dans le résultat : « Ce résultat vous aide à formuler les bonnes questions ; il ne vérifie pas vos systèmes. »

### 6. Résoudre le contrat de test portefeuille

Le nouveau composant `PortfolioMatrix.astro` présente désormais la matrice 2×2 grand public. Le script `scripts/check-portfolio.mjs` attend encore l’ancien tableau HTML avec `pm-table`, `scope="row"` et `scope="col"`.

Ce n’est pas un défaut de la nouvelle UX, mais c’est un **gate CI obsolète**. Tant qu’il n’est pas mis à jour, la prochaine PR de contenu risque d’être bloquée ou de donner une fausse impression de régression.

**Recommandation :** réécrire le test pour vérifier :

- quatre cellules de la matrice ;
- deux axes explicites ;
- un intitulé visible pour chaque situation ;
- le statut de chaque produit ;
- une navigation clavier sur la région si elle est nécessaire ;
- la présence des liens vers les fiches.

## P1 — accessibilité

### 7. Nom accessible du lien de marque

axe-core signale sur toutes les pages :

```html
<a aria-label="TENIR — accueil">… TENIR LABS …</a>
```

Le nom accessible ne contient pas le texte visible `TENIR LABS`, ce qui crée une discordance pour les utilisateurs de commande vocale et certains lecteurs d’écran.

**Correction recommandée :**

```html
aria-label="TENIR Labs — accueil"
```

et en anglais :

```html
aria-label="TENIR Labs — home"
```

### 8. Contrastes insuffisants détectés par axe-core

Les zones suivantes sont signalées comme sérieuses :

- lien de langue active dans la navigation ;
- mention `.ml-fiction` sur l’accueil ;
- note de la vidéo d’exécution ;
- libellé `.role` dans les cartes sectorielles ;
- note `.cr-note` dans la page Crédibilité.

**Recommandation :** ne pas utiliser `color-mix(... transparent)` pour du texte informatif. Définir un token de texte secondaire vérifié sur chaque fond, avec une valeur plus sombre en clair et plus claire en sombre. Les petits textes monospace sont particulièrement sensibles au contraste.

### 9. Landmarks non uniques dans les cartes sectorielles

axe-core signale des sections imbriquées avec le même rôle et un nom de landmark non suffisamment distinct dans la carte banque-assurance.

**Recommandation :** donner à chaque section un titre accessible unique ou transformer les sections internes en simples `div` quand elles ne constituent pas un landmark de navigation. Exemple : `aria-labelledby="banque-assurance-sector-sequence-title"` est bon ; il faut vérifier le rendu final et éviter les doublons générés dans les variantes de carte.

### 10. H1 multiples dans l’accueil et le rapport

Le contrôle HTML trouve deux éléments `h1` sur la home et sur le parcours de rapport. Le second provient d’un contenu de lecture ou d’un panneau masqué par l’interface, mais il reste présent dans le DOM.

**Recommandation :** conserver un seul `h1` par route. Pour le titre de résultat, utiliser `h2` ou rendre le panneau non pertinent pour les technologies d’assistance tant qu’il est masqué, avec une gestion explicite de `hidden`/`aria-hidden` cohérente.

Le parcours `parcours-ia` n’a pas de lien skip visible, contrairement aux pages éditoriales. Ce n’est pas bloquant pour le questionnaire, mais il faudrait ajouter un lien « Aller au contenu » cohérent avec le reste du site.

## P2 — langage et cohérence

### 11. Choisir un vocabulaire public stable

Le même objet est appelé « membrane », « surface », « couche », « moteur de contrôle », « porte » ou « frontière ». Pour le public, choisir :

> **contrôle placé avant l’action**

Puis réserver « membrane » aux pages techniques.

Même règle pour : « artefact », « Workbench », « Control Tower », « souveraineté d’exécution », « fondations », « architecture » et « conformance ». Chaque terme doit être accompagné d’un format compréhensible : « simulation interactive », « atelier de diagnostic », « schéma explicatif », « tests de conformité ».

### 12. Séparer clairement public et expertise

Les pages `architecture`, `concepts`, `standard`, `versions` et `status` mélangent lecture grand public et doctrine détaillée. Les termes `KB3`, `KB2`, `C3`, `Raft`, `ledger`, `exactly-once`, `admissibilité structurelle` et `HOLDING-FIRST` doivent être conservés pour la preuve, mais pas exposés au même niveau que le message commercial.

**Recommandation :** commencer chaque page technique par :

- **En une phrase** ;
- **Ce que cette page explique** ;
- **Pour qui elle est utile** ;
- puis seulement les détails RFC et les tableaux.

### 13. Harmoniser FR/EN

Les contrôles fonctionnels FR/EN passent, mais l’équivalence éditoriale est encore inégale :

- `Crédibilité`, `Evidence` et `Credibility Journey` désignent des concepts proches mais pas identiques selon les pages ;
- les simulations peuvent être en anglais sur un parcours français et inversement ;
- des valeurs métier françaises apparaissent encore dans certaines structures anglaises ;
- la page française conserve des verbes anglais comme `Extract`, `Uncover`, `Formalize`, `Map`, `Deliver`.

**Recommandation :** constituer un glossaire canonique bilingue avant de retoucher les pages une par une.

### 14. Clarifier les simulations et les cas

Le mot « démo » désigne plusieurs objets : simulation bancaire, Control Tower, schéma, prototype mobile et exemples éditoriaux.

**Recommandation :** remplacer par :

- « simulation fictive » ;
- « exemple interactif » ;
- « prototype mobile » ;
- « schéma explicatif ».

Afficher la langue et le statut avant le clic. Pour les cas sectoriels, afficher systématiquement : **Cas fictif — modèle pédagogique**, sauf lorsqu’il s’agit d’un fait externe précisément sourcé.

## Ce qui fonctionne déjà bien

- Le parcours de la home est désormais testé sur plusieurs largeurs et en deux langues.
- Le questionnaire fonctionne sans compte, sans email obligatoire et avec téléchargement déclenché par l’utilisateur.
- Les scénarios explicatifs mentionnent généralement leurs limites et distinguent simulation, preuve locale et effet externe.
- La navigation mobile et les états clavier principaux ont déjà une couverture automatisée.
- Les vidéos et simulations n’imposent pas d’autoplay.
- Le registre d’assets distingue correctement les actifs publiés, historiques et en maintenance hold.

## Plan recommandé

### Lot 1 — accessibilité objective

1. Corriger les deux `aria-label` de marque.
2. Corriger les cinq groupes de contraste axe-core.
3. Vérifier les landmarks des cartes sectorielles.
4. Réduire les H1 DOM multiples et ajouter le skip link au parcours.
5. Remplacer le test portefeuille obsolète par des assertions sur la matrice 2×2.

**Statut au 30 octobre 2026 : traité et vérifié.** Les douze routes prioritaires FR/EN passent axe-core sans violation, le build passe, les liens internes passent, la matrice 2×2 est couverte par le test portefeuille, et les suites Chromium du parcours commercial, du questionnaire, du replay et du mobile passent.

### Lot 2 — lisibilité de conversion

1. Stabiliser la promesse principale de la home.
2. Mettre les situations concrètes avant les noms REG.
3. Ajouter une légende de statut aux produits.
4. Requalifier le parcours comme auto-évaluation indicative.
5. Réduire les CTA concurrents et préciser le résultat de chaque clic.

**Première et deuxième passes effectuées :** l’ancien CTA « rapport gratuit » est devenu un « aperçu de maturité », sa raison d’être est expliquée avant le questionnaire, les exports et boutons reprennent ce vocabulaire, et la page Produits commence par les situations reconnaissables plutôt que par les noms d’outils. Les cartes affichent désormais « Cela peut vous concerner si… », un résultat attendu et un statut public simplifié ; la matrice 2×2 parle d’avant/après une action plutôt que de catégories internes. Toutes les validations navigateur restent au vert.

**Lot 3 effectué :** Architecture, Standard et Statut disposent maintenant d’un résumé d’entrée bilingue qui sépare l’idée, le fonctionnement, la preuve de version et la démonstration. Les pages distinguent explicitement proposition normative, logiciel bêta, simulation et effet externe. Les validations de build, liens, portfolio, éditorial, mobile, commercial et interactif restent au vert.

### Lot 3 — cohérence éditoriale profonde

1. Créer le glossaire FR/EN.
2. Réviser les pages techniques avec un résumé « En une phrase ».
3. Séparer les simulations, services, logiciels et références de recherche.
4. Revoir les cas sectoriels et les mentions réglementaires pour distinguer fait, source externe et scénario pédagogique.
5. Refaire une passe de contraste et de lecteur d’écran après les corrections.

## Verdict

Le site est **fonctionnellement prêt pour une revue humaine et le Lot 1 d’accessibilité est traité**. La prochaine étape à plus forte valeur n’est pas d’ajouter de nouvelles pages : c’est d’appliquer le Lot 2, c’est-à-dire une nomenclature publique cohérente, des situations concrètes avant les noms REG et une promesse de conversion plus explicite sur la home, le parcours et le portefeuille.
