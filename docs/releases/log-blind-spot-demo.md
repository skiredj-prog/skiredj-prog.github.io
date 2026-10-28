# Démonstration — Ce que le journal ne voit pas

## Expérience

Routes : `/demonstrations/journal/` et `/en/demos/log/`.

Deux demandes apparaissent dans un journal interne fictif. Le visiteur peut ouvrir une comparaison avec un registre d’envoi distinct, qui en contient trois. La différence calculée fait apparaître D-042, absente du journal. Cette observation ne prouve ni la cause de l’omission ni l’effet d’un remboursement.

Un second volet permet d’examiner le cas sans registre d’envoi disponible : la complétude reste non démontrée. Les volets natifs sont indépendants et fonctionnent sans JavaScript. La page précise avant la comparaison que les sources sont fictives, puis que leur indépendance et leur couverture sont des hypothèses du scénario.

L’expérience est accessible depuis Essayer, le catalogue des démonstrations, REG Prepare et le replay. Elle propose de poursuivre vers REG Prepare, le replay ou les autres démonstrations. Les libellés et les correspondances de langue sont définis dans le site.

## Référence utilisée et frontière

Source de conception : `capture-boundary-testbench------.zip`, archive locale fournie par l’utilisateur, datée du 26 octobre 2026. Fichiers examinés : `capture-boundary-testbench/README.md`, `campaign-status.md`, `adapter-contract.md`, `oracles.py`, `run_sut.py`, `g4a-posix-campaign-protocol.md` et `prepare-prevent-g4a-impact-map.md`.

Le principe utilisé est celui de CB-T01 : comparer un ensemble observé à une source indépendante pour rechercher une omission ; sans témoin, ne pas conclure à l’exhaustivité. La page est une traduction pédagogique de ce principe, pas un adaptateur de banc d’essai.

L’archive indique que ses auto-tests de classification passent et qu’aucune campagne indépendante CB n’a été exécutée contre G4-A. Aucun de ses programmes n’est exécuté ni distribué par cette démonstration. Aucun verdict de production, de conformité, de qualification fournisseur ou de capture exhaustive n’est déduit de cette page.

Les usages PREPARE/PREVENT présents dans les documents de recherche et les fiches du portefeuille ne sont pas renommés ni assimilés. La passerelle vers REG Prepare se limite à sa présentation existante : organiser les affirmations, les pièces et les vérifications dans un périmètre convenu, en Working Draft.

## Vérification

`scripts/check-capture-log-demo.mjs` contrôle FR/EN à 320/390/1280 pixels, les deux lignes initiales, la comparaison à trois lignes, l’unique omission, le cas sans témoin, les limites explicites, le clavier, les liens de langue, les sorties, le fonctionnement sans JavaScript et les accès depuis les pages connexes. Le workflow du replay exécute ce contrôle en complément des régressions existantes.

Le tableau à trois colonnes est dimensionné pour rester intégralement visible sur mobile, malgré les dimensions minimales des tableaux documentaires du site. Le contrôle vérifie aussi l’absence de débordement interne qui pourrait cacher la colonne du journal.

Validation locale : build de 105 routes ; 110 pages vérifiées sans lien interne cassé ; contrôles du portefeuille et de ses références réussis. Les six parcours de la démonstration FR/EN à 320/390/1280 pixels, les deux parcours sans JavaScript, les passerelles et les six parcours du replay existant passent. Les captures de la comparaison ont été inspectées à 390 et 1280 pixels.
