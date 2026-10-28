# Sprint 1 — Rejouer une action IA

Clôture : 28 octobre 2026.

Livraison clôturée ; la revue indépendante de cette version a ensuite conclu « à corriger avant validation ». Les corrections et les limites de leur vérification sont suivies dans `sprint-1-peer-review-response.md`. La revalidation indépendante reste à obtenir sur la version corrigée.

## Livré

PR44 constitue le premier incrément : `/rejouer/` et `/en/replay/`, une séquence fictive de remboursement en six étapes, de l’intention à la réconciliation. Le visiteur peut avancer, revenir ou choisir une étape, consulter l’acteur et les pièces visibles, puis explorer les démonstrations ou les cas. Aucune opération réelle n’est exécutée.

La finition du sprint traduit les pièces en anglais, les affiche dès le rendu initial, corrige la formulation anglaise de l’envoi de commande et expose l’étape courante aux technologies d’assistance avec `aria-current="step"`.

## Validation

- Build Astro : 103 routes générées.
- Liens internes : 108 pages vérifiées, aucun lien cassé.
- Navigateur : six étapes, UNKNOWN puis HOLD, pièces traduites, précédent/suivant, sélection au clavier et changement de langue.
- Affichage à 390 et 1280 pixels : aucun débordement horizontal ni erreur JavaScript.
- Régression automatisée : `scripts/check-action-replay.mjs`, exécutée dans le workflow `Action replay regression`.

Pour relancer le contrôle, servir `dist` sur `http://127.0.0.1:4174`, installer Playwright et son Chromium, puis exécuter `node scripts/check-action-replay.mjs`. Les variables `REPLAY_BASE_URL`, `PLAYWRIGHT_MODULE` et `REPLAY_BROWSER_CHANNEL` permettent d’utiliser un serveur ou un navigateur local différent.

## Suite retenue

PR45 est conservée comme référence de conception et fermée sans fusion. Sa branche reste disponible. Les enrichissements retenus pour le Sprint 2 sont le scénario bancaire plus précis, les acteurs et pièces par événement, les états de connaissance et une conclusion explicitant les sorties ACCEPT / HOLD / NON DÉMONTRÉ.

Ce prochain incrément partira du replay intégré. Les propositions de refonte de l’accueil de PR45 devront être examinées séparément.
