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

## Dossier Coupe du monde 2030 (pages 8 à 11, ancre `#coupe-du-monde`)

Ajouté le 9 novembre 2026. Quatre pages : l’ouverture (faits, 115 000 places prévues contre 80 000 exigées par la FIFA pour une finale), cinq précédents (Afrique du Sud 2010, Brésil 2014, Le Cap, Russie 2018 et Qatar 2022, Portugal 2004 puis 2030), ce qui est prévu ou non publié à Benslimane, et ce qui peut encore se décider avant 2030. Les liens sont dans le sixième groupe de `sources_links`.

Points datés, à revérifier avant toute réimpression : coût du Grand Stade Hassan II (5 milliards de DH annoncés ; 13,6 milliards de marchés selon Le Desk, relayé le 1er octobre 2026), lieu de la finale (non attribué au 11 septembre 2026), annonce sur le Raja, le Wydad et l’équipe nationale (octobre 2026).
