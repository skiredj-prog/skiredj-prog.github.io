# Consigne de revue indépendante — Sprint 1

## Mission et version à examiner

Évaluer si le premier replay TENIR explique clairement pourquoi une autorisation ne prouve pas l’effet d’une action IA, et si son parcours est utilisable en français et en anglais. Rendre un avis indépendant, fondé sur les comportements observés et le code, sans prendre les descriptions des PR pour des preuves.

Dépôt : https://github.com/skiredj-prog/skiredj-prog.github.io

Version figée : `09ac8b9412db1d582ee9b42012bd9bcfccdb98aa`, après fusion de PR44 et PR46. Comparer à `15674510071578cd8fdbc968432597dd0ec93c67`, avant Sprint 1. Utiliser un checkout séparé de cette version : le site public et la branche du Sprint 2 peuvent évoluer pendant la revue.

PR livrées :

- https://github.com/skiredj-prog/skiredj-prog.github.io/pull/44
- https://github.com/skiredj-prog/skiredj-prog.github.io/pull/46

PR45 a été fermée sans fusion. Elle donne du contexte pour le Sprint 2 ; ses fonctionnalités ne font pas partie du Sprint 1 à valider.

## Périmètre

Examiner `/rejouer/` et `/en/replay/`, leurs accès depuis la navigation, le changement de langue et les sorties vers les démonstrations et les cas.

Fichiers principaux :

- `src/components/ActionReplay.astro`
- `src/pages/rejouer.astro` et `src/pages/en/replay.astro`
- ajouts de navigation et correspondance FR/EN dans `src/data/site.ts`
- styles `.replay-*` dans `src/styles/experience.css`
- `scripts/check-action-replay.mjs` et `.github/workflows/action-replay.yml`
- `docs/releases/sprint-1-replay.md`

Le Sprint 1 livre six étapes : intention, autorisation, commande, réponse perdue, HOLD, réconciliation. Le scénario est fictif et ne réalise aucune opération bancaire. Évaluer ce qui est livré ; identifier séparément les évolutions possibles.

## Questions à résoudre

1. Après une lecture courte, un visiteur non spécialiste comprend-il ce qui s’est passé, ce qui reste inconnu et pourquoi une reprise peut être risquée ? Les termes HOLD, réconciliation et preuve d’effet sont-ils compréhensibles dans leur contexte ?
2. Le récit distingue-t-il bien intention, autorisation, émission, réception et effet externe ? Une formulation laisse-t-elle croire qu’un log local, un identifiant ou un HOLD garantit un résultat ou évite tout doublon ?
3. Le responsable de la suite est-il identifiable ? Les pièces affichées aident-elles réellement à comprendre la situation ? Signaler les ambiguïtés sans inventer de garanties produit.
4. Les six étapes peuvent-elles être choisies directement et parcourues dans les deux sens ? La sélection courante et les limites des boutons sont-elles claires ?
5. Les textes, pièces, liens et métadonnées de langue sont-ils cohérents dans les deux versions ? Le changement de langue mène-t-il au replay correspondant ?
6. Vérifier clavier, focus visible, titres, sémantique ARIA et restitution des changements aux lecteurs d’écran. Les tests automatisés ne prouvent pas à eux seuls l’accessibilité.
7. Examiner mobile étroit, ordinateur, zoom 200 %, thèmes clair/sombre et JavaScript désactivé. Signaler précisément ce qui devient illisible, inaccessible ou trompeur.
8. Le visiteur peut-il explorer librement, comprendre les sorties et poursuivre sans pression commerciale ni étapes imposées ?
9. Le contrôle de régression échouerait-il si les pièces anglaises redevenaient françaises, si une étape cessait de fonctionner ou si les liens de langue étaient cassés ? Examiner les angles morts du test et la fiabilité du workflow.

## Vérification

Sur le checkout figé, avec Node compatible avec `package.json` :

```sh
npm ci
npm run build
npm run check:links
git diff --check 15674510071578cd8fdbc968432597dd0ec93c67 09ac8b9412db1d582ee9b42012bd9bcfccdb98aa
npm install --no-save playwright@1.56.1
npx playwright install chromium
```

Servir `dist` sur `http://127.0.0.1:4174` dans un terminal séparé, puis exécuter `node scripts/check-action-replay.mjs`. Documenter tout contrôle non exécuté et pourquoi. Ne pas modifier la branche livrée, publier ou fusionner de correctif dans le cadre de cette revue.

Résultats annoncés à reproduire : 103 routes générées, 108 pages vérifiées sans lien cassé, quatre parcours FR/EN à 390 et 1280 pixels sans erreur JavaScript ni débordement horizontal. Ces résultats ne valent pas audit exhaustif du site.

## Compte rendu attendu

Commencer par les constats, classés par gravité : P1 blocage du parcours ou message matériellement trompeur ; P2 défaut utilisateur significatif ; P3 amélioration mineure. Pour chaque constat : comportement observé, attendu, reproduction, route/langue/largeur, référence fichier et ligne, impact et correction minimale proposée.

Séparer défauts reproductibles, appréciations UX et idées pour un sprint ultérieur. Si aucun défaut n’est établi, le dire. Terminer par un verdict motivé : **validé**, **validé avec réserves** ou **à corriger avant validation**, puis les limites de la revue. Ne pas implémenter les recommandations dans cette mission.
