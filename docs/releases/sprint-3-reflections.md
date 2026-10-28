# Sprint 3 — Mettre les distinctions à l’épreuve

## Incrément

Trois mises en situation facultatives prolongent les questions déjà présentes dans le replay : ce que prouve ALLOW, la conduite à tenir après une réponse perdue et la valeur des pièces lors d’une vérification externe. Elles sont disponibles en français et en anglais.

Le visiteur peut choisir une proposition et lire son explication, en examiner une autre ou poursuivre librement le récit. Il n’y a ni score, ni étape supplémentaire, ni validation conditionnant la suite. Les choix restent visibles lorsqu’on revient sur un événement pendant la même lecture ; le composant n’utilise aucun stockage applicatif et n’envoie aucune donnée.

L’explication générale est rendue côté serveur. Sans JavaScript, elle reste lisible dans le volet natif et les choix interactifs restent cachés.

## Points pédagogiques

- ALLOW décrit une permission située, sans prouver la réception ou le paiement.
- Une confirmation absente ne justifie ni un verdict d’échec ni un renvoi immédiat.
- Un état bancaire fiable et relié à l’opération permet de progresser ; son résultat peut aussi indiquer un traitement encore en cours. La présence d’une réponse ne suffit donc pas à conclure automatiquement ACCEPT.

## Vérifications

Le contrôle `scripts/check-replay-reflections.mjs` vérifie que le récit reste parcourable sans répondre, que chaque choix produit son explication, que les groupes de boutons radio fonctionnent au clavier et restent indépendants, que les réponses sont conservées dans le DOM lors des changements d’événement et qu’aucune requête d’écriture n’est déclenchée.

Les contrôles du replay à huit événements et de son accessibilité restent applicables. Le nouveau contrôle couvre FR/EN à 320/390/1280 pixels et les explications sans JavaScript. L’annonce est portée par une région de statut ; cela ne remplace pas un essai d’écoute avec lecteur d’écran.

Validation locale : build de 103 routes, 108 pages sans lien interne cassé, six parcours des mises en situation en FR/EN à 320/390/1280 pixels et deux lectures sans JavaScript réussis. Les six parcours du replay existant restent fonctionnels. Les captures françaises à 390 et 1280 pixels ont été inspectées. Le contrôle de contraste est étendu aux propositions, à leur légende et à l’explication visible dans les deux thèmes.
