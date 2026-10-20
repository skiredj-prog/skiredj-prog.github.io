# Refonte du parcours public TENIR

La première visite doit permettre de comprendre le sujet, de choisir un parcours et de préparer une prochaine étape. Le site documentaire devient une porte d’entrée vers trois besoins : découvrir le cadre, explorer un prototype, examiner un cas avec l’équipe.

## Choix de conception

- Identité commune : fond clair, vert profond, titres avec empattements, texte sans empattements, clair/sombre et FR/EN sur la page équivalente.
- Navigation resserrée : Comprendre, Démonstrations, Ressources, Diagnostic. Menu repliable sur téléphone ; le pied de page garde la carte des contenus.
- Exemple guidé : autorisation et envoi, résultat inconnu, contrôle nécessaire avant la suite. Il s’agit d’une lecture illustrative, sans opération exécutée.
- Boucle d’observation : question, modèle, observation, interprétation, restitution et suivi. Adaptation pédagogique du schéma fourni par le propriétaire ; le schéma d’origine reste consultable. Cette lecture ne crée aucune nouvelle définition normative.
- Prototype mobile : passerelle vers `https://mobile.tenirlabs.cc/discover`, dont la page de découverte a été consultée. Le prototype reste présenté comme une simulation distincte ; son code et son hébergement ne sont pas modifiés par cette refonte.
- Contact : trois champs, dont un requis, préparent un brouillon visible. L’ouverture de la messagerie est une action distincte. Les réponses ne sont ni envoyées ni enregistrées par le formulaire. Une adresse directe est disponible sans JavaScript.
- Documentation : fil d’Ariane, sources dépliables, sommaire sur téléphone et ordinateur, liens pour poursuivre le parcours. Les textes techniques et les limites restent accessibles.

## Vérification

Construction Astro, contrôle des liens internes et `git diff --check`. Les liens sont aussi vérifiés dans le workflow GitHub Pages avant publication.

Contrôle visuel dans le navigateur : accueil sur ordinateur et dans des cadres de 320 et 390 pixels, menu mobile ouvert/fermé, contact, traduction de la page courante et thème sombre. Vérification de l’exemple guidé, des onglets d’observation, du champ obligatoire et de la préparation d’un brouillon avec des données de test sans ouverture ni envoi d’e-mail.

Ces vérifications ne constituent pas un test utilisateur. L’amélioration de conversion ou d’adoption reste à mesurer : capacité à expliquer TENIR après lecture, accès à un parcours pertinent, compréhension du statut du prototype, et réalisation d’un premier contact. Aucun gain chiffré n’est revendiqué.
