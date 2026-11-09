# Magazine TENIR — « Les grands choix, expliqués »

`n01.json` contient le texte du numéro pilote n° 01 (« Maroc 2030 : construire vite, garder le choix ») en français, anglais et arabe. Le site et les trois PDF A5 sont générés à partir de cette source commune.

| Route | Rôle |
| --- | --- |
| `/n01/` | Lien court imprimé dans les trois éditions : choix de la langue, règles éditoriales |
| `/magazine/` | Accueil du magazine (même contenu que `/n01/`, URL canonique) |
| `/magazine/n01/`, `/magazine/n01/en/`, `/magazine/n01/ar/` | Édition web complète, sources cliquables, corrections datées |
| `/magazine/avis/?n=01&l=fr\|en\|ar&s=papier\|web` | Cible des QR codes. Le site n’enregistre rien : le formulaire prépare un courriel. Changer de formulaire ne change que cette page. |

Fichiers servis : `public/magazine/n01/` (couverture web, image de partage, PDF A5 et `SHA256SUMS.txt`) et `public/magazine/fonts/` (polices OFL chargées uniquement par les pages du magazine, `/n01/` compris ; ces pages ne chargent aucune police externe).

Gabarit : `src/layouts/Magazine.astro`, composants `src/components/magazine/`, styles `src/styles/magazine.css`. Identité propre au magazine, distincte de l’identité console du site.

Statut : numéro d’essai gratuit, non périodique. Pour toute correction : modifier le texte ici, régénérer les trois PDF avec `scripts/magazine/print_n01.py`, mettre à jour `SHA256SUMS.txt` et la ligne « Corrections » (date). Les PDF contiennent des liens actifs vers les sources principales et vers la page de réponse.

Génération locale des PDF : installer `scripts/magazine/requirements.txt`, puis lancer `python scripts/magazine/print_n01.py`. Le générateur utilise les polices Arial, Georgia et Tahoma du système Windows. Contrôler ensuite 16 pages A5 par langue, les liens PDF, les QR codes et les pages rendues avant de committer les binaires. Le PDF arabe conserve le texte Unicode logique dans des séquences `/ActualText` et déclare `ar-MA`. Certains extracteurs (dont pypdf et pdfminer) continuent toutefois à renvoyer les glyphes visuels. Les PDF ne sont pas balisés PDF/UA : la version web est le support de lecture accessible et indexable.

La page 14 nomme **MC (Marge de correction)** et **EHV (Exposition sous hypothèses non vérifiées)**, avec unité, exemple et possibilité de résultat non calculable. Ce sont des instruments expérimentaux, sans score global et sans évaluation chiffrée des projets de ce numéro. Les trois autres dimensions de travail (MV, TOP, CPC) restent hors du N° 01 tant qu’un cas ne permet pas de les mesurer de façon reproductible.

## Dossier Coupe du monde 2030 (pages 8 à 11, ancre `#coupe-du-monde`)

Ajouté le 9 novembre 2026. Quatre pages : l’ouverture (faits, 115 000 places prévues contre 80 000 exigées par la FIFA pour une finale), cinq précédents (Afrique du Sud 2010, Brésil 2014, Le Cap, Russie 2018 et Qatar 2022, Portugal 2004 puis 2030), ce qui est prévu ou non publié à Benslimane, et ce qui peut encore se décider avant 2030. Les liens sont dans le sixième groupe de `sources_links`.

Points datés, à revérifier avant toute réimpression : marchés du Grand Stade Hassan II (5 milliards de DH initialement annoncés ; 13,6 milliards de marchés lancés ou attribués selon Le Desk au 6 octobre 2026, périmètres différents), lieu de la finale (non attribué au 9 novembre 2026), annonce sur le Raja, le Wydad et l’équipe nationale (octobre 2026), capacité de dessalement annoncée le 2 novembre 2026 (447 millions de m³ par an).
