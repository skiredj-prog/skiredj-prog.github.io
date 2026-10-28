# Suite de la revue indépendante du Sprint 1

La revue porte sur le commit figé `09ac8b9412db1d582ee9b42012bd9bcfccdb98aa`. Son verdict « à corriger avant validation » reste celui de cette version ; la clôture de livraison ne vaut pas validation indépendante sans réserves.

## Corrections des quatre P2

| Constat | Correction dans le replay à six étapes | Vérification |
| --- | --- | --- |
| Titre pouvant suggérer un effet réalisé | « La demande de remboursement a été envoyée » / « The refund request was sent » | Titre contrôlé dans les deux langues |
| Identifiant et réservation trop protecteurs | Leur aide à la comparaison est distinguée de la réception et de l’absence de double effet ; leur dépendance au système externe est explicite | Relecture des textes FR/EN de la commande |
| Parcours incomplet sans JavaScript | Les six panneaux sont rendus côté serveur ; le script améliore la lecture en n’affichant qu’une étape. Les contrôles restent cachés sans script | Parcours complet sans JavaScript, FR/EN |
| Contenu dynamique non annoncé | Région `role="status"`, `aria-live="polite"`, `aria-atomic="true"`, contenant numéro, étape, rôle, statut et action ; focus conservé sur le contrôle | Mise à jour de la région et maintien du focus au clavier |

La réconciliation est aussi explicitée comme la comparaison des traces locales avec l’état enregistré par le fournisseur. La page conserve un seul titre h1 ; les événements sont des sections nommées.

## Régression

Le workflow surveille désormais `src/styles/site.css`, `src/scripts/site.ts` et le nouveau contrôle `scripts/check-replay-accessibility.mjs`. Ce contrôle vérifie les formulations d’ouverture, le titre, les relations de nommage, l’annonce avec le statut, le focus clavier, les destinations des deux sorties et l’affichage sans JavaScript. Il est exécuté en français et en anglais, en thème clair et sombre, avec une largeur de 320 pixels pour le thème sombre.

Le contrôle existant conserve ses six étapes attendues, les pièces localisées, UNKNOWN/HOLD, précédent/suivant et le changement de langue.

Vérification locale du correctif : build de 103 routes, 108 pages sans lien interne cassé, quatre parcours interactifs FR/EN à 390/1280 pixels réussis, contrôles complémentaires FR/EN en clair et sombre réussis, deux lectures sans JavaScript réussies, `git diff --check` propre.

## Limites et retour au pair

Les assertions sur la région live et le focus vérifient le mécanisme dans le navigateur. Elles ne constituent pas un essai d’écoute avec NVDA ou VoiceOver. Le zoom réel à 200 %, les contrastes exhaustifs et la qualité de l’annonce à l’écoute restent à examiner lors de la revalidation indépendante. Aucun de ces contrôles n’est présenté comme déjà validé.

Le Sprint 2 reprend ces corrections sur son récit bancaire à huit événements. Il reste une évolution distincte, à relire dans PR47. Le présent correctif ne modifie pas l’accueil ni le portefeuille.
