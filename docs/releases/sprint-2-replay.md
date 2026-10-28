# Sprint 2 — Comprendre les acteurs, les pièces et l’incertitude

Statut : premier incrément préparé pour revue. Le Sprint 1 reste figé au commit `09ac8b9412db1d582ee9b42012bd9bcfccdb98aa` ; sa consigne de revue indépendante est dans `sprint-1-peer-review.md`.

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

Le contrôle `scripts/check-action-replay.mjs` couvre les huit événements, les acteurs, les pièces, le maintien de l’état inconnu sous HOLD, les trois termes de conclusion, les questions dépliables, le clavier, les liens de langue, les erreurs JavaScript, le débordement horizontal et le récit sans JavaScript. Le workflow existant est étendu aux nouveaux fichiers de données et styles.

Validation locale du premier incrément : build Astro de 103 routes, 108 pages sans lien interne cassé, six parcours Chrome FR/EN à 320/390/1280 pixels réussis (thème sombre à 320 pixels), deux lectures intégrales sans JavaScript réussies. Les captures françaises mobile et ordinateur ont été inspectées. Ces contrôles ne remplacent pas une revue indépendante ni un essai avec lecteur d’écran.

## Suite du sprint

Relire ce premier incrément avec le retour de la revue indépendante du Sprint 1. Évaluer la compréhension des termes et l’équilibre entre lecture courte et approfondissement avant clôture du Sprint 2.
