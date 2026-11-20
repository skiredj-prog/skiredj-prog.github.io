# TENIR Labs — Souveraineté d’exécution

## Ouvrir la page
Ouvrir `souverainete-execution.html` dans un navigateur. Cette page autonome intègre tout son CSS et son JavaScript. Aucune installation ni dépendance externe.

## Intégrer la section
1. Insérer le contenu de `section.html` dans le corps de la page cible.
2. Charger `sovereignty.css` après les styles du site.
3. Charger `sovereignty.js` avec `defer`, ou après la section.

Les styles sont limités à `.tn-sovereignty`. Ils reprennent les variables de couleur, de police et de thème existantes sur tenirlabs.cc, avec des valeurs de repli. Utiliser une seule instance par page (identifiants HTML fixes).

### Astro
Copier les fichiers dans un dossier de composants. Exemple :

```astro
---
import section from './section.html?raw';
import './sovereignty.css';
---
<Fragment set:html={section} />
<script>
  import './sovereignty.js';
</script>
```

Dans une page qui possède déjà un h1, remplacer le h1 de la section par un h2 en conservant son identifiant ; adapter la hiérarchie des titres suivants. Les h1 et h2 partagent la famille typographique ; ajuster la taille du titre de section selon la page.

## Choix éditoriaux
- Français, aligné sur la langue principale et les couleurs actuelles du site.
- Angle : maîtrise de l’hébergement + maîtrise de l’action autonome.
- Offre : diagnostic accompagné, sans prétendre à un déploiement validé.
- Appels à l’action via l’adresse de contact publiquement affichée sur tenirlabs.cc : skiredj@tenirlabs.cc.
- Le texte fourni sur le cloud souverain inspire le contexte. Les rapprochements spéculatifs avec Microsoft ne sont pas repris comme faits.
- Aucun logo, partenariat, certification ni intégration fournisseur revendiqués.

## Statut de la livraison
Proposition éditoriale et intégrable, non installée sur tenirlabs.cc. Le site consulté indique des limites de statut et une condition documentaire liée à la communication marketing. Cette livraison n’atteste pas que cette condition est levée : publication à apprécier au regard de votre statut de release actuel.

## Parcours illustratif
Cinq états narratifs, sans moteur d’exécution ni connexion prestataire. UNKNOWN désigne le résultat non confirmé ; HOLD est distingué comme verdict sur une action proposée. La branche finale suppose un effet confirmé et n’autorise pas une relance automatique.

## Vérifications
Syntaxe JavaScript, correspondance des sélecteurs/identifiants, transitions du parcours et intégrité du ZIP. Pas de vérification visuelle dans un navigateur durant cette session.
