# TENIR Labs — classification 2D du portefeuille (vue éditoriale)

**Statut :** proposition éditoriale non canonique, introduite dans la PR #54 le 29 octobre 2026.  
**Source principale :** `src/data/portfolio.ts` ; rendu : `src/components/PortfolioMatrix.astro`.  
**Origine du besoin :** le patch fourni `home-lifecycle-band.patch` présente une frise unidimensionnelle Avant / Pendant / Après, non une classification 2D.

## Les deux dimensions

- **Colonnes — objet traité :** les trois lanes REG-ARCH : **Prétention (Claim), Action, Représentation (Representation)**. Ce sont des objets distincts, pas trois étapes successives.
- **Lignes — fonction principale proposée :** **Explorer / diagnostiquer**, **Formaliser / relier**, **Contrôler / vérifier**. Il s'agit d'un découpage éditorial des capacités, pas d'un modèle normatif ni d'un état de maturité.

| Fonction × objet | Prétention | Action | Représentation |
| --- | --- | --- | --- |
| Explorer / diagnostiquer | REG Discovery, REG Prevent | AI Exposure X-Ray, REG Explorer | REG Prepare |
| Formaliser / relier | REG Translation Studio, REG Mediation | REG+ et RFC (profils candidats, **hors runtime**) | REG-ARCH (entrée par relations / représentation) |
| Contrôler / vérifier | REG Conformance (contrats / exigences testées) | TENIR-Gov (runtime borné) | REG Prepare, REG Conformance |

**Transversal :** TENIR est le cadre. REG est le standard proposé. REG-ARCH décrit les relations entre les trois objets ; son placement dans une cellule du tableau est un point d'entrée pédagogique, pas une limite de portée. Le diagnostic accompagné est un service qui peut s'appliquer à plusieurs cases. Control Tower et les expériences sont des démonstrations **simulées**, non des contrôles de production.

Les placements multiples sont intentionnels : un produit peut explorer un objet tout en étayant un autre. **Une case ne constitue ni une déclaration de livraison, ni une intégration démontrée, ni une certification.** Les statuts, sources et limitations demeurent ceux des fiches du portefeuille.

## Ce que le patch apporte, séparément

La frise Avant / Pendant / Après est conservée sur l'accueil sous la forme d'une **illustration de scénario**, pour comprendre comment préparation, contrôle à la frontière d'exécution et réconciliation peuvent intervenir.

Elle **ne remplace pas** la matrice de classification et n'implique pas que REG Prevent doit précéder REG Prepare ni que REG+ s'exécute dans le runtime. Les revendications du patch « vérifie chaque action en temps réel » et « montre le blocage » n'ont pas été reprises telles quelles, faute de preuve de couverture universelle.

## Règles de maintenance

1. Maintenir tous les produits de `portfolioOrder` couverts par une case, ou signalés explicitement comme transversaux/services/démonstrations.
2. Ne jamais confondre le statut commercial d'une offre avec une garantie technique démontrée.
3. Vérifier les deux langues, les liens et le contrôle `scripts/check-portfolio.mjs` en CI.
4. Pour passer de cette vue éditoriale à une matrice canonique : obtenir un document d'autorité explicitant les axes, les placements, l'origine et la version, puis remplacer les labels et placements seulement après revue.
