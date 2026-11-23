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

## N° 02 — « Donnez à l’IA le travail, pas les clés de votre entreprise » (novembre 2026)

Numéro pilote en trois langues, par date de mise en ligne : français (17 novembre 2026), anglais (20 novembre), arabe (23 novembre). Le PDF A5 n’existe qu’en français.

| Route | Rôle |
| --- | --- |
| `/n02/` | Lien court imprimé dans le numéro |
| `/magazine/n02/` | Édition web complète en français (URL canonique) |
| `/magazine/n02/en/` | Édition web anglaise |
| `/magazine/n02/ar/` | Édition web arabe, de droite à gauche |

Sources : `src/data/magazine/n02.fr.html`, `n02.en.html` et `n02.ar.html` (texte des éditions web, inséré tel quel), `src/components/magazine/Issue02Page.astro` (couverture et gabarit), `src/styles/magazine-n02.css` (compléments à `magazine.css`, mêmes jetons, chargés par toutes les pages du N° 02).

Fichiers servis : `public/magazine/n02/` (couverture, image de partage, huit illustrations, PDF A5 de 16 pages et `SHA256SUMS.txt`). Les pages ne chargent aucune police externe.

Différences avec le N° 01 : pas de fichier JSON ni de générateur ; le PDF est imprimé depuis une maquette HTML A5 qui n’est pas dans ce dépôt, avec les polices Libre Baskerville et DM Sans incorporées. Pour une correction, modifier `n02.fr.html` et la maquette, réimprimer le PDF, puis mettre à jour `SHA256SUMS.txt`.

Édition anglaise (rédigée le 17 novembre 2026, en ligne le 20) : `n02.en.html`, servie sur `/magazine/n02/en/`. Même structure et mêmes classes que `n02.fr.html` ; les ancres sont en anglais. Toute correction de fond se fait dans les trois fichiers. Les renvois « page N » du français sont remplacés par le nom de la section, car le PDF n’existe qu’en français. 

Édition arabe (rédigée le 22 novembre 2026, en ligne le 23) : `n02.ar.html`, servie sur `/magazine/n02/ar/`, de droite à gauche. Mêmes ancres que l’anglais. Relecteur désigné : Mohammed Ali Skiredj ; publication approuvée par Aziz Skiredj le 23 novembre 2026. Toute correction de langue reçue ensuite s’applique directement dans ce fichier. Conventions du N° 01 arabe : arabe standard, chiffres occidentaux, guillemets « », mois à la marocaine. Les fragments latins (identifiants, verdicts, noms de normes) sont entourés de `<span dir="ltr">` pour ne pas être réordonnés ; les milliers sont séparés par une espace insécable, sinon « 50 000 » s’affiche « 000 50 ». Les paroles d’agents arabes sortent de `crozwya/recits_ar.py` (dépôt `2-the-crozwya`).

Points à connaître :
- les « paroles d’agents » anglaises ne sont pas traduites à la main : elles sortent des mêmes carnets par les gabarits anglais du dépôt `2-the-crozwya` (`crozwya/recits_en.py`, sortie `out/recits.en.md`), sans nouvelle exécution ; les identifiants d’échange (X-SERVEURS, X-MAINTENANCE) restent tels que le noyau les a écrits ;
- les « paroles d’agents » sont extraites des carnets d’une exécution réelle d’une maquette (The Crozwya : agents scriptés, soldes simulés) ; les valeurs sont réelles, le ton est un gabarit écrit par la rédaction ;
- les illustrations photographiques sont générées par IA ; celle de la section « La membrane » contient du texte en anglais ;
- la source IETF citée (brouillon `draft-ietf-httpapi-idempotency-key-header-07`, octobre 2025) est à revérifier avant toute réimpression ;
- la page d’avis (`/magazine/avis/`) reste propre au N° 01 : le N° 02 n’y renvoie pas.
