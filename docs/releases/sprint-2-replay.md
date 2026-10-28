# Sprint 2 — Comprendre les acteurs, les pièces et l’incertitude

Statut : incrément finalisé pour livraison dans PR47. La version initiale du Sprint 1 examinée par le pair reste figée au commit `09ac8b9412db1d582ee9b42012bd9bcfccdb98aa` ; sa consigne de revue indépendante est dans `sprint-1-peer-review.md`. Ses quatre P2 ont été corrigés et intégrés dans PR48.

## Objectif

Rendre concret ce que signifie « responsabilité visible, vérifiable et assignable » dans une action IA. Le visiteur suit un virement fictif de 1 200 €, référence V-042, dont la confirmation disparaît.

## Premier incrément

- Huit événements sur les routes existantes `/rejouer/` et `/en/replay/` : intention, autorisation, réservation, envoi, réponse perdue, HOLD, vérification externe, réconciliation.
- À chaque événement : acteurs, responsable de la suite, pièces disponibles, connaissance et impact. Une question facultative permet d’approfondir.
- L’état de connaissance reste inconnu après la perte de réponse, y compris quand une décision HOLD est prise. La réconciliation ne fabrique pas de confirmation.
- ACCEPT est expliqué comme un effet établi dans ce cas, à distinguer de l’autorisation ALLOW. HOLD suspend la reprise ; NON DÉMONTRÉ décrit les limites des pièces. Les deux derniers peuvent coexister.
- Navigation directe ou précédent/suivant, annonce des changements aux technologies d’assistance et récit intégral consultable sans JavaScript.

Les enrichissements de PR45 sont repris sur le replay intégré. Les modifications d’accueil de cette PR ne font pas partie de cet incrément.

## Critères de revue

La question centrale est : après la perte de confirmation, peut-on identifier ce qui est connu, ce qui manque et qui porte la prochaine décision ? Vérifier aussi la cohérence des termes avec les cartes sectorielles, la parité FR/EN et la charge de lecture à 320/390 pixels.

Le contrôle `scripts/check-action-replay.mjs` couvre les huit événements, les acteurs, les pièces, le maintien de l’état inconnu sous HOLD, les trois termes de conclusion, les questions dépliables, le clavier, les liens de langue, les erreurs JavaScript, le débordement horizontal et le récit sans JavaScript. Le workflow est étendu aux nouveaux fichiers de données et styles. Le contrôle complémentaire mesure aussi le contraste du texte d’action, de connaissance, du responsable, de l’impact et des étapes visibles en clair et sombre ; il ne constitue pas un audit exhaustif des contrastes du site.

Validation locale du premier incrément : build Astro de 103 routes, 108 pages sans lien interne cassé, six parcours Chrome FR/EN à 320/390/1280 pixels réussis (thème sombre à 320 pixels), deux lectures intégrales sans JavaScript réussies. Les captures françaises mobile et ordinateur ont été inspectées. Ces contrôles ne remplacent pas une revue indépendante ni un essai avec lecteur d’écran.

## Suite du sprint

La revue indépendante du Sprint 1 a conclu « à corriger avant validation ». Les quatre P2 sont repris ici : titre désignant la demande envoyée, limite explicite de l’identifiant/réservation, récit intégral sans JavaScript et annonce des changements incluant le statut. Le correctif à six étapes est intégré via PR48. Le contrôle complémentaire `scripts/check-replay-accessibility.mjs` est partagé entre les deux versions et le workflow surveille aussi les styles globaux et le script du site.

La livraison du Sprint 2 conserve comme suites de revue l’écoute réelle avec lecteur d’écran, le zoom navigateur réel à 200 % et l’appréciation indépendante de la charge de lecture. Les contrôles automatisés ne sont pas présentés comme une validation indépendante de ces dimensions.
