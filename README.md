# TENIR

Site statique bilingue du cadre TENIR et du standard Runtime Execution Governance (REG). Le français est la langue de lecture. L’anglais est une traduction de travail, page à page.

Ce dépôt produit un rendu public. Il ne remplace pas la Knowledge Base 2, les RFC, ni les dépôts de code. Quand ces sources se contredisent, les définitions suivent KB2 (30 mars 2026). La maturité affichée est celle des arbres publics lus le 19 octobre 2026 : brouillons gelés, runtime bêta, harnais de laboratoire. Rien ici n’est une certification.

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

Pages : accueil, origine, concepts, architecture, standard, versions, conformance, dépôts, statut, contribuer, contact — et leurs équivalents anglais sous `/en/`.

## Sources, par ordre d’autorité

1. TENIR / KB2 — Source de Vérité v2.0 (30 mars 2026). Définitions et affirmations.
2. TENIR Versioning, Namespace & Governed Extension Policy v2 (4 avril 2026). Versions, espaces de noms, extensions.
3. TENIR / REG — Architecture illustrative. Section architecture uniquement ; les schémas restent illustratifs.
4. Guide public *Beyond the Layers* (12 diapositives). Récit accessible, en anglais, de la page d’accueil.
5. Introduction TAU / TENIR, Casablanca 2026. Genèse, vocabulaire d’entrée. Reclassée par KB2 comme récit historique.
6. Dépôts publics `skiredj-prog` lus le 19 octobre 2026 : `tenir_governance`, `reg-conformance`, `tenir-conformance-s1-g1`, `tenir-governance`, `tenir-gov`, `tenir-schemas`.

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

Definitions follow Knowledge Base 2 (30 March 2026) when sources disagree. The site reports the maturity of the public trees as read on 19 October 2026. It does not certify an implementation.
