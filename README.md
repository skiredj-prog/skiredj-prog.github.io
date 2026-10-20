# TENIR

Site statique bilingue du cadre TENIR et du standard Runtime Execution Governance (REG). Le français est la langue de lecture. L’anglais est une traduction de travail, page à page.

Ce dépôt produit un rendu public simplifié. Il ne remplace pas la gouvernance amont, la source machine, les RFC, ni les dépôts de code, et il ne se présente pas comme loi canonique. La ligne de rendu suivie est KB3, instituée et active par la déclaration du propriétaire du 19 octobre 2026. Les fichiers fournis avec cette déclaration ne contiennent pas d’enregistrement signé. KB3 rend le sens ; il n’est pas une nouvelle constitution, et il n’est pas dans le code. Les services ou applications spécialisés l’enveloppent ou l’étendent sans le redéfinir. TENIR-Gov doit s’aligner sur KB3 ; il n’est pas KB3. KB2 (30 mars 2026) est la ligne de rendu antérieure, conservée pour la continuité, sans autorité active simultanée. Là où KB3 ne reformule pas une définition, le libellé est gardé depuis cette ligne et l’écart avec les RFC ou les dépôts reste visible. La maturité affichée est celle des arbres publics lus le 19 octobre 2026 : brouillons gelés, runtime bêta, harnais de laboratoire. Rien ici n’est une certification.

## Prérequis

Node.js 22.22 ou plus récent.

## Lancer le site

```bash
npm ci
npm run dev
```

Le serveur de développement écoute sur [http://127.0.0.1:4731](http://127.0.0.1:4731).

## Construire

```bash
npm run build
npm run check:links
npm run preview
```

`npm run build` écrit le site dans `dist/`. `npm run check:links` refuse la construction si un lien interne ou une ancre est cassé. `npm run preview` sert `dist/` sur le même port.

## Publier sur GitHub Pages

Le site public est [https://tenirlabs.cc](https://tenirlabs.cc). Le dépôt est `skiredj-prog/skiredj-prog.github.io`, servi depuis la racine (`base` égal à `/`).

Un push sur `main` lance `.github/workflows/deploy.yml` : `npm ci`, `npm run build`, puis `actions/configure-pages`, `actions/upload-pages-artifact` (`dist/`) et `actions/deploy-pages`. Dans les réglages GitHub Pages du dépôt, la source doit être **GitHub Actions**.

`public/CNAME` contient `tenirlabs.cc`. `public/.nojekyll` est recopié dans `dist/` pour que le dossier `_astro` soit servi. Les URL canoniques utilisent `https://tenirlabs.cc`.

## Où est le texte

| Chemin | Rôle |
| --- | --- |
| `src/content/fr/` | Pages françaises. `home.md` est l’accueil. |
| `src/content/en/` | Pages anglaises. |
| `src/data/site.ts` | Navigation et correspondance FR ↔ EN. |
| `src/layouts/Base.astro` | En-tête, thème, table des matières. |
| `src/styles/` | Typographie et mise en page. |

Chaque page a un frontmatter : `title`, `kicker`, `description`, `lede`, `sources`. Le corps commence au premier titre de niveau 2. La ligne `sources` dit sur quoi la page s’appuie.

Pages : accueil, origine, concepts, architecture, standard, versions, conformance, dépôts, statut, publications, contribuer, contact — et leurs équivalents anglais sous `/en/`.

## Sources, par ordre de lecture

La gouvernance (`00_GOVERNANCE`) et la source machine (`01_CANON_AND_SOURCE_OF_TRUTH/01_MACHINE_SOURCE_OF_TRUTH`) restent en amont. Elles ne sont pas reproduites dans ce dépôt. KB3 est en aval des deux.

1. KB3 — ligne de rendu doctrinale instituée et active, déclaration du propriétaire du 19 octobre 2026. Couche documentaire, hors du code. Règles de périmètre, note de normalisation du 14 avril 2026, note de migration KB2 → KB3. KB3 rend le sens ; il n’est pas une nouvelle constitution. Les fichiers fournis ne contiennent pas d’enregistrement signé sous `00_GOVERNANCE/04_DECISIONS_AND_RATIFICATIONS`.
2. TENIR Versioning, Namespace & Governed Extension Policy v2 (4 avril 2026). Versions, espaces de noms, extensions.
3. TENIR / REG — Architecture illustrative. Section architecture uniquement ; les schémas restent illustratifs.
4. Guide public *Beyond the Layers* (12 diapositives). Récit accessible, en anglais, de la page d’accueil.
5. Introduction TAU / TENIR, Casablanca 2026. Genèse, vocabulaire d’entrée. Récit historique, reclassé par la ligne antérieure.
6. Dépôts publics `skiredj-prog` lus le 19 octobre 2026 : `tenir_governance`, `reg-conformance`, `tenir-conformance-s1-g1`, `tenir-governance`, `tenir-gov`, `tenir-schemas`.
7. KB2 (30 mars 2026), document alors titré Source de Vérité v2.0. Ligne de rendu antérieure, continuité et lecture comparative seulement. Pas une seconde ligne active. Ce titre historique ne lui rend pas l’autorité.

Deux textes voisins sont cités seulement dans la page Contact, et ne font pas partie de TENIR : *Cercle Inverse — Document de Vision & Structure* v1.1, et *Architecture indépendante — Trajectoires de valeur et contrôle des passages* (spécification v2, 2 octobre 2026).

## English

French is the primary language. English pages live under `/en/`.

```bash
npm ci
npm run dev      # http://127.0.0.1:4731
npm run build    # writes dist/
npm run check:links
```

Pushing `main` deploys `dist/` to GitHub Pages for `skiredj-prog/skiredj-prog.github.io`, served at [https://tenirlabs.cc](https://tenirlabs.cc) (`public/CNAME`). `.nojekyll` is included so the `_astro` assets are served. Pages must use GitHub Actions as its source.

KB3 is the enacted, active doctrinal rendering line: the owner’s declaration of 19 October 2026. It is a document layer, outside the code, and not a new constitution. The files provided with that declaration contain no signed record. Specialized services wrap or extend KB3 and must not redefine it. TENIR-Gov should align to KB3; it is not KB3. KB2 (30 March 2026) is the prior rendering line, kept for continuity only. Definitions KB3 does not restate are carried from that line, and gaps with the RFCs or the repositories stay visible. The site reports the maturity of the public trees as read on 19 October 2026. It does not certify an implementation.
