# Cartographie 2D des capacités TENIR Labs — version éditoriale révisable

**Portée :** choix de navigation, pas taxonomie normative, pas définition du canon TENIR ou des RFC.  
**Sources :** descriptions et statuts de `src/data/portfolio.ts`, architectures et conditions d'intégration du site.  
**Implémentation :** `src/components/PortfolioMatrix.astro`, rendu bilingue sur les pages Produits.  
**Point de départ :** le patch `home-lifecycle-band.patch` a inspiré une frise pédagogique Avant / Pendant / Après, mais n'est pas une autorité de classification.

## Décision de design

L'ancienne v1 classait par objet REG-ARCH (**Claim / Action / Representation**) et par fonction (**Explore / Formalize / Verify**). Elle présentait trois défauts :
1. Elle présupposait que le visiteur connaît REG-ARCH.
2. Elle plaçait artificiellement des **fondations transversales** (REG+ et REG-ARCH) dans des cellules de produits.
3. Elle mélangeait des cadres, des services et des instruments de maturité très différente.

La v2 conserve les deux questions complémentaires mais en langage de problème et d'usage, avec **une séparation explicite des statuts et des types d'actifs**.

**Colonnes — De quoi parle-t-on ?**
- Exigences et intentions (politiques, mandat, prescriptions)
- Systèmes et actions (intégration, exposition, engagement)
- Preuves et résultats (traces, reçus, garanties vérifiables)

**Lignes — Que fait-on ?**
- Comprendre (voir le problème, ses inconnues et ses hypothèses)
- Formaliser (produire des contraintes ou des contrôles *candidats*)
- Contrôler / vérifier (adjudication bornée, tests reproductibles, qualification des pièces)

| Fonction × problème | Exigences et intentions | Systèmes et actions | Preuves et résultats |
| --- | --- | --- | --- |
| Comprendre | REG Discovery | AI Exposure X-Ray, REG Explorer | REG Prepare |
| Formaliser | REG Prevent, REG Translation Studio, REG Mediation | — | — |
| Contrôler / vérifier | — | TENIR-Gov | REG Conformance, REG Prepare |

Les cases vides **ne sont pas des lacunes commerciales à masquer** : aucune fiche produit du catalogue n'y justifie un instrument autonome dans ce classement. REG Prepare apparaît deux fois car l'inventaire des pièces et leur qualification couvrent deux fonctions distinctes.

## Les fondations hors matrice

- **TENIR :** cadre de diagnostic des systèmes sous pression, transversal au portefeuille.
- **REG :** standard proposé de gouvernance de l'exécution. Il ne se réduit pas aux méthodes Prevent / Prepare.
- **REG+ / RFC :** travail de médiation hors runtime, profils et contrats candidats, conditions d'admission à vérifier ; **pas un produit de contrôle runtime livré**.
- **REG-ARCH :** architecture des liens entre Claim, Action, Representation. Ces objets gardent leur utilité dans les **pages techniques**, sans être imposés au visiteur comme axes d'entrée.
- **Diagnostic accompagné :** service qui peut mobiliser les instruments selon une question bornée.
- **Control Tower, expériences :** simulations, pas composants d'application à un système réel.

## Lecture complémentaire : la frise d'accueil

La frise Avant / Pendant / Après illustre comment une action peut être préparée, évaluée et rapprochée de ses résultats. Elle **n'établit pas un ordre obligatoire entre produits**. Prevent / Prepare peuvent s'appliquer à différents moments, et REG+ n'est pas un moteur exécuté dans la boucle de gouvernance.

## Statut, preuve et maturité

La matrice ne code **aucune maturité sur les axes**. Chaque entrée réutilise le `status` de sa fiche : Working Draft, prototype, bêta publiée, release bornée, etc. La proximité spatiale de deux produits ne démontre ni leur intégration, ni une assurance équivalente, ni une garantie de production.

## Principes d'évolution

- Tester cette classification avec des visiteurs : compréhension en 10 secondes, distinction produit / fondation / service / simulation et capacité à trouver une fiche.
- Revoir les placements lorsqu'une fonctionnalité est démontrée ou qu'une fiche évolue ; ne pas figer la navigation au nom d'un dessin.
- Conserver des sources pour chaque revendication et vérifier ses limites.
- Ne **pas** ériger le patch, cette note, l'avis de l'utilisateur ou celui de l'assistant en autorité absolue. Une nouvelle disposition plus utile, plus explicative ou mieux fondée doit pouvoir remplacer la v2.
- Bloquer la fusion tant que la compilation, les liens, les tests FR/EN et la revue mobile/accessibilité ne sont pas satisfaisants.
