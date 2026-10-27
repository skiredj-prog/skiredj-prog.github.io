# TENIR Labs — matrice de release et de convergence

**État :** revue de convergence PR #38 — aucune fusion automatique vers `main`
**Dernière vérification GitHub :** 27 octobre 2026
**Branche auditée :** `feat/responsibility-market-editorial-20261026`
**Référence de comparaison :** `main` / `4cb2970` — inclut la fusion de la PR #37
**HEAD de revue :** voir le tip de la PR #38 ; cette matrice est un instantané daté, pas une référence immuable

Cette matrice est la source de vérité opérationnelle pour relier le parcours public du site aux produits, versions, artefacts réellement distribuables et pull requests qui les gouvernent. Une CI verte ne vaut pas, à elle seule, autorisation de publication ni preuve d’équivalence avec le site visible.

## Règle de décision

Un élément peut être présenté comme **publié** uniquement si les quatre conditions suivantes sont réunies :

1. une source de vérité identifiée et accessible ;
2. un statut éditorial cohérent en français et en anglais ;
3. un artefact ou une route réellement distribuable ;
4. une PR mergeable, revue et explicitement autorisée.

Sinon, le site doit employer un statut borné : `Working Draft`, `Prototype`, `Preview`, `Staged`, `HOLD` ou `Non démontré`.

## Matrice canonique

| Domaine public | Route / surface | Statut publiable actuel | Source de vérité | Artefact / preuve | PR ou gate | Décision |
|---|---|---|---|---|---|---|
| Éditorial responsabilité du marché | `/pourquoi-maintenant/`, `/acteurs/`, `/cas/`, `/apprendre/` et équivalents EN | Fusionné dans `main` via PR #37 ; contrôles P2 conservés | `main` / `4cb2970` | Build Astro, liens, assets, contrôles P2 responsive/éditorial | [PR #37](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/37) | **GO borné** — équivalence publique encore à vérifier |
| Navigation FR/EN | Menus `Vos besoins / Your needs` et liens produits | Correction proposée dans PR #38 | PR #38, basée sur `main` / `4cb2970` | Destination directe `/portfolio/products/` et état actif portefeuille | [PR #38](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/38) | **Revue requise** — ne pas considérer comme fusionnée |
| Carte du portefeuille | Pages Products & Services / Portfolio FR/EN | Baseline P1 historique ; catalogue rendu séparé | `docs/p1/` + `src/data/portfolio.ts` | 11 entrées de classification vs 14 profils rendus + 3 hubs ; mapping d’identité encore absent | [PR #24](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/24) / [PR #38](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/38) | **Requalifié** — aucun document ne se présente comme registre canonique unique |
| TENIR-Gov runtime | `/statut/` et `/en/status/` | Catalogue rendu : release externe v5.7.0 ; pages statut historiques mentionnent encore 5.6.x / arbre lu | Release GitHub `tenir_governance v5.7.0` + pages statut à corriger | Scope mono-hôte borné ; pas de C3 ; pas d’effet externe exactly-once revendiqué | [PR #25](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/25) | **HOLD éditorial** — réconcilier la version affichée avant de déclarer convergence |
| REG Discovery | Preview d’exploration bilingue | Preview / Working Draft | PR #13 sur `codex/ux-journey-redesign` | `site-and-discovery: SUCCESS` ; aucune release publique exécutable établie | [PR #13](https://github.com/skiredj-prog/skiredj-prog.github.io/pull/13) | **HOLD / AMEND** — rebase, pin upstream, gate de release explicite |
| Workbench v0.1.0 | `/portfolio/workbench/` et `/en/portfolio/workbench/` | `STAGED_PENDING_BINARY` | `data/workbench-publication.v1.json` + release gate | ZIP exact attendu : `TENIR-REG-public-consultation.zip`, 180 527 octets, SHA-256 `86b246dbfcdd57577dbec20f268f344c51220186336bfada32626c9a8d83f671` | PR #36 / gate Workbench | **HOLD STRICT** — ZIP absent ; ne pas contourner le gate |
| Conformance | `/conformance/` et carte portefeuille | Release v0.6.1 bornée | Release `reg-conformance v0.6.1` | 46/46 PASS uniquement pour profil Raft loopback mono-hôte | `portfolio.ts` / release externe | **GO borné** — conserver les non-claims |
| Démos et scénarios | `/embeds/`, cartes bancaires et transport | Simulation / scénario pédagogique | Dépôt du site et données sectorielles | Aucun effet externe démontré ; sources et limites affichées | Branche éditoriale | **GO pédagogique** — ne pas présenter comme cas réel |

## État des PR vérifiées

| PR | Titre abrégé | Draft | Merge state | Checks observés | Décision |
|---|---|---:|---|---|---|
| #13 | REG Discovery web integration | Oui | `CLEAN` sur une branche de base UX, pas `main` | 2 × `site-and-discovery: SUCCESS` | Amend / preview |
| #23 | Navigation Products & Services FR/EN | Oui | Historique / superseded par #38 | ancien check vert | Ne pas fusionner séparément |
| #24 | P1 portfolio classification baseline | Oui | Historique / documentation | baseline, pas registre runtime | Requalifié par #38 |
| #25 | TENIR-Gov v5.7.0 status | Oui | `CLEAN` | `build-links-and-claims: SUCCESS` | Revue humaine puis autorisation |
| #36 | Workbench exact ZIP gate | Oui | `UNSTABLE` | 2 checks `FAILURE` | HOLD strict |

## Gate Workbench — décision non négociable

Le fichier attendu n’est pas présent dans `public/downloads/`. Le manifeste reste donc :

```json
{
  "status": "STAGED_PENDING_BINARY",
  "public_url": null,
  "filename": "TENIR-REG-public-consultation.zip",
  "bytes": 180527,
  "sha256": "86b246dbfcdd57577dbec20f268f344c51220186336bfada32626c9a8d83f671"
}
```

Il est interdit de :

- publier un bouton de téléchargement avant la présence du ZIP exact ;
- marquer le manifeste `PUBLISHED` avant le dépôt vérifié du binaire ;
- fusionner un commit ZIP-only séparé de la mise à jour du manifeste ;
- remplacer le ZIP par une archive GitHub Actions ou une reconstruction locale ;
- interpréter une CI verte comme preuve que l’URL publique fonctionne.

Après dépôt autorisé, il faudra encore : re-hasher le fichier téléchargé depuis l’URL publique, vérifier sa taille et enregistrer l’état `PUBLIC_AVAILABLE` séparément de `PUBLISHED`.

## Hiérarchie des sources de vérité

1. **Artefact public vérifié** — fichier récupérable, hashé et re-hashé après publication.
2. **Release/tag du produit** — version, scope, limites et preuves attachées.
3. **Manifeste du site** — statut et chemin, sans pouvoir créer à lui seul une disponibilité.
4. **Catalogue portfolio** — description commerciale bornée, jamais preuve de production.
5. **PR et CI** — éléments de revue et de contrôle, pas autorisation implicite.
6. **Preview / documentation** — utile pour apprendre, non équivalente à une release.

## Prochaines actions autorisées

1. **Conserver** la PR #24 comme baseline historique de classification, sans l’appeler registre canonique runtime.
2. **Revoir** la PR #25 contre la release v5.7.0 et ses non-claims bilingues.
3. **Résoudre** la mergeabilité de la PR #23 avant toute fusion navigation.
4. **Amender** la PR #13 sans la présenter comme une release Discovery.
5. **Maintenir** la PR #36 en HOLD strict jusqu’à réception et revue du ZIP exact.
6. **Ne fusionner aucune de ces PR automatiquement** depuis cette matrice.

## Verdict P2

**Consolidation PR #38 : revue requise après corrections.**
**Fusion vers `main` : HOLD jusqu’à convergence navigation + catalogue + statut runtime.**
**Workbench : HOLD strict jusqu’au binaire exact.**
