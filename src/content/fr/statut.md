---
title: Statut
kicker: Maturité réelle · octobre 2026
description: Ce qui est rendu, ce qui est gelé comme brouillon, ce qui est testé en laboratoire, et ce qui n’est pas publié.
lede: KB3 est la ligne de rendu doctrinale instituée et active. L’institution est la déclaration du propriétaire du 19 octobre 2026 ; les fichiers fournis avec elle ne contiennent pas d’enregistrement signé. KB2 est la ligne antérieure. Le standard a des brouillons gelés. Le runtime a un arbre bêta dont la dernière entrée de journal n’est pas une release.
sources: KB3, note de normalisation du 14 avril 2026 ; KB2, ligne antérieure ; politique v2 ; architecture illustrative, sections 11 et 13 ; CHANGELOG 5.6.0 et 5.6.1 ; STATUS.md du harnais
---

## Où en est chaque espace

<table>
  <thead><tr><th>Espace</th><th>État assumé par les sources</th></tr></thead>
  <tbody>
    <tr><td>TENIR 2.0</td><td>Nom du cadre dans l’espace canon. Ce nom n’est pas, à lui seul, l’institution de KB3.</td></tr>
    <tr><td>KB3</td><td>Ligne de rendu doctrinale instituée et active, par la déclaration du propriétaire du 19 octobre 2026. Les fichiers fournis avec cette déclaration ne contiennent pas d’enregistrement signé sous <code>00_GOVERNANCE/04_DECISIONS_AND_RATIFICATIONS</code>. Couche documentaire, hors du code. KB3 rend le sens ; il ne crée pas de sens souverain et n’est pas une nouvelle constitution. Les services ou applications spécialisés peuvent l’envelopper ou l’étendre ; ils ne doivent pas le redéfinir. TENIR-Gov doit s’y aligner ; il n’est pas KB3.</td></tr>
    <tr><td>KB2</td><td>Ligne de rendu antérieure, continuité seulement. Pas d’autorité active simultanée avec KB3. Le build du 30 mars 2026 est conservé. La note qui l’a nommé actif à l’institution est un contexte historique, pas l’autorité actuelle. KB1.1 est historique. Rédigé et curé avec assistance, auteur Abdelaziz Skiredj.</td></tr>
    <tr><td>REG</td><td>RFC-0 à RFC-7 : Proposed Standard, brouillon gelé, 2–3 octobre 2026. Pas une norme adoptée par un organisme extérieur.</td></tr>
    <tr><td>TENIR-Gov</td><td>Classifieur « Development Status :: 4 - Beta ». Ligne IronOmega 5.0.0 en juin-juillet 2026, poursuivie jusqu’à l’arbre 5.6.1.</td></tr>
    <tr><td>5.6.1</td><td>Le journal la marque « Pending release » et interdit d’en inférer une publication PyPI.</td></tr>
    <tr><td>5.7.0</td><td>Objectif nommé par le document illustratif. Absente de l’arbre lu.</td></tr>
    <tr><td>Harnais S1</td><td>Validation de laboratoire sur des entrelacements testés. Non-certification écrite en tête de dépôt.</td></tr>
    <tr><td>Schémas v1</td><td>Faisceau publiable de février 2026, hôtes d’exemple, stubs assumés.</td></tr>
  </tbody>
</table>

## Audit de la 5.6.0, tel que le dessin le rapporte

<p>Le document illustratif dit la chaîne conceptuellement saine, et trois défauts ouverts sur la 5.6.0 :</p>
<ul>
  <li><strong>F-01, commit.</strong> <code>reconcile_commit()</code> pourrait forcer une mutation sans revérifier la capacité. Un état RELEASED pourrait devenir COMMITTED, en violation de I8.</li>
  <li><strong>F-02, normalisation.</strong> <code>register_resource()</code> réinitialiserait l’état. Après crash ou rechargement, un signal de ressource disponible pourrait devenir faux.</li>
  <li><strong>F-03, assessment.</strong> Le vérificateur de linéarisabilité serait invalide. Des preuves LIN pourraient contenir des faux positifs.</li>
</ul>

<p>Le journal 5.6.1, non publié, décrit des corrections : refuser <code>reconcile_commit()</code> hors réservation RESERVED, enregistrement de ressource non destructif, et d’autres corrections de sûreté « under review », dont le vérificateur de linéarisation. Le périmètre exclu y est explicite : tolérance byzantine, transport authentifié durci, attestation tierce, preuve d’effet externe exactly-once. Un essai Raft antérieur est rapporté : 46 tests passés sur le commit <code>8203705</code>, run GitHub <code>39205580977</code>, Python 3.11.17, localhost. Ce site ne rejoue pas ces tests. Il ne conclut pas que F-01, F-02 ou F-03 sont clos dans une version publiée.</p>

<p>Le même document gèle, dans sa section release, la communication publique et les artefacts marketing jusqu’à la 5.7.0 durcie. Cette page en rend compte. Elle ne les remplace pas par un argument de maturité.</p>

## Décomptes qui ne doivent pas être cités seuls

<p>Le journal 5.6.0 écrit 787 tests passants, somme qu’il détaille. Le README de <code>tenir_governance</code> parle encore de 733 tests et d’une v5.4.2. Le README de <code>tenir-governance</code> parle de 557 tests et de 96&nbsp;% de couverture pour la R5. Le README de <code>tenir-gov</code> parle de 313 tests. Ce sont des phrases de fichiers différents, pas une série unique. Aucune n’a été rejouée pour ce site.</p>

## Ce qui n’est pas établi

<ul>
  <li>Certification de production, audit indépendant, ou manifeste de déploiement liant les preuves à un hôte réel.</li>
  <li>Tolérance byzantine. Raft, dans les textes lus, est crash-only.</li>
  <li>Effet externe exactly-once. Le silence n’est pas une non-exécution. Le manuscrit le prend comme limite E1–E3, pas comme un théorème déployé.</li>
  <li>Rotation de clés et ancre de confiance signée dans le harnais S11.</li>
  <li>Adopteurs, contrats, ou résultats d’un programme UM6P. Les noms de profils <code>partner_a</code> et <code>partner_b</code> existent dans le code. Ils ne documentent pas un déploiement.</li>
  <li>Blueprint v4.4, cité par le code et par le manuscrit, absent des arbres clonés.</li>
</ul>

## Suite visible dans les sources, pas un calendrier

<p>La ligne antérieure demande que le châssis consomme un objet TENIR 2.0 complet au lieu de laisser l’implémentation définir la doctrine. KB3, sans créer un nouveau canon, demande en plus une seule ligne de rendu à la fois, la classe de conformité et le statut dégradé visibles, le contrat machine non renommé en silence, le mode d’exécution séparé de la posture, et la déclaration de ce qu’une surface publique simplifie. Le dessin 5.7.0 demande une réconciliation sûre, une persistance non destructive, un validateur de linéarisation fiable et un transport de consensus durci. Le README de conformance demande le <code>deployment.manifest</code> avant tout audit externe. STATUS.md du harnais demande de tenir la phrase de non-certification, et liste un reste documentaire hors dépôt. La politique de versions demande que chaque surface déclare l’autorité qu’elle n’a pas. Aucune de ces demandes n’est close par cette page.</p>
