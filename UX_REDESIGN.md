# Refonte du parcours public TENIR

La première visite doit permettre de se reconnaître dans une situation, de choisir un parcours et de préparer une prochaine étape. Cinq intentions sont accessibles directement dans le menu « Vos besoins » : se faire une idée, déléguer une tâche, préparer un agent, éclaircir un résultat et étudier les sources. Chaque intention a une page d’entrée en français et en anglais. La matrice des besoins, du vocabulaire et de la profondeur figure dans `AUDIENCE_AND_CONTENT.md`.

## Choix de conception

- Identité commune : fond clair, vert profond, titres avec empattements, texte sans empattements, clair/sombre et FR/EN sur la page équivalente.
- Navigation par intentions : Découvrir, Vos besoins, En pratique, Essayer, Ressources, puis Poser une question. Les destinations sont expliquées avant le clic ; les chemins restent accessibles depuis l’accueil et le pied de page.
- Parcours client potentiel : trois situations illustratives articulent profil, secteur et besoin. Une démo ou un exemple précède l’accompagnement proposé. L’offre payante est explicite dans ce parcours, après la reconnaissance du besoin ; l’accueil conserve sa question ouverte et ses cinq intentions.
- Substance visible : TENIR comme cadre, REG comme standard proposé et TENIR-Gov comme logiciel en évaluation, puis accès direct aux démonstrations techniques et au statut. Les situations ne sont pas présentées comme des références clients.
- Exemple guidé : autorisation et envoi, résultat inconnu, contrôle nécessaire avant la suite. Il s’agit d’une lecture illustrative, sans opération exécutée.
- Boucle d’observation : question, modèle, observation, interprétation, restitution et suivi. Adaptation pédagogique du schéma fourni par le propriétaire ; le schéma d’origine reste consultable. Cette lecture ne crée aucune nouvelle définition normative.
- Prototype mobile : passerelle vers `https://mobile.tenirlabs.cc/discover`, dont la page de découverte a été consultée. Le prototype reste présenté comme une simulation distincte ; son code et son hébergement ne sont pas modifiés par cette refonte.
- Contact : une question libre, une situation modifiable et un champ facultatif sur ce qui compte pour le visiteur. Le contexte du parcours est repris. L’ouverture de la messagerie reste distincte. Les réponses ne sont pas transmises au site ; un transfert temporaire dans le stockage de l’onglet permet de les retrouver lors d’un changement FR/EN. Une adresse directe est disponible sans JavaScript.
- Documentation : fil d’Ariane, sources dépliables, sommaire sur téléphone et ordinateur, liens pour poursuivre le parcours. Les textes techniques et les limites restent accessibles.

## Vérification

Construction Astro, contrôle des liens internes et `git diff --check`. Les liens sont aussi vérifiés dans le workflow GitHub Pages avant publication.

Contrôle visuel initial : accueil sur ordinateur et cadres de 320 et 390 pixels, menu mobile, contact, langues et thème sombre. Après le retour sur le dialogue : navigation par besoins à 1280 et 390 pixels, page d’entrée pour un résultat incertain, questions dépliables, équivalence FR/EN et reprise du contexte vers le contact. Le brouillon non commercial et la conservation du texte lors du changement de langue ont été vérifiés avec des données de test, sans ouverture ni envoi d’e-mail.

Ces vérifications ne constituent pas un test utilisateur. L’amélioration de conversion ou d’adoption reste à mesurer : capacité à expliquer TENIR après lecture, accès à un parcours pertinent, compréhension du statut du prototype, et réalisation d’un premier contact. Aucun gain chiffré n’est revendiqué.

Extension du parcours client potentiel : 53 routes construites et 56 pages contrôlées sans lien interne cassé. Vérification du menu à 1280 et 390 pixels, des cartes à 320 pixels, de l’ouverture directe d’une situation depuis l’accueil et de la reprise du profil dans le brouillon. Un profil et une intention modifiés dans le formulaire sont conservés avec le texte lors du passage FR/EN, y compris depuis le menu mobile. Aucun e-mail n’a été envoyé.
