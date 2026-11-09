# Magazine TENIR — « Les grands choix, expliqués »

`n01.json` contient le texte du numéro pilote n° 01 (« Maroc 2030 : construire vite, garder le choix ») en français, anglais et arabe. C’est le même texte que l’édition imprimée A5 (canvas Design « TENIR — N° 01, magazine pilote »), après typographie (espaces insécables).

| Route | Rôle |
| --- | --- |
| `/n01/` | Lien court imprimé dans les trois éditions : choix de la langue, règles éditoriales |
| `/magazine/` | Accueil du magazine (même contenu que `/n01/`, URL canonique) |
| `/magazine/n01/`, `/magazine/n01/en/`, `/magazine/n01/ar/` | Édition web complète, sources cliquables, corrections datées |
| `/magazine/avis/?n=01&l=fr|en|ar&s=papier|web` | Cible des QR codes. Le site n’enregistre rien : le formulaire prépare un courriel. Changer de formulaire ne change que cette page. |

Fichiers servis : `public/magazine/n01/` (couverture web, image de partage, PDF A5 et `SHA256SUMS.txt`) et `public/magazine/fonts/` (polices OFL chargées uniquement par ces pages ; le reste du site ne charge aucune police externe).

Gabarit : `src/layouts/Magazine.astro`, composants `src/components/magazine/`, styles `src/styles/magazine.css`. Identité propre au magazine, distincte de l’identité console du site.

Statut : numéro d’essai gratuit, non périodique. Pour toute correction : modifier le texte ici et dans l’édition imprimée, régénérer les PDF, mettre à jour `SHA256SUMS.txt` et la ligne « Corrections » (date).
