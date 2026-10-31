---
title: Statut
kicker: Maturité réelle · octobre 2026
description: Statuts du canon, des brouillons REG et du runtime TENIR-Gov v5.7.0 publié, avec périmètres et limites explicites.
lede: KB3 est la ligne de rendu doctrinale active ; les RFC REG restent des brouillons proposés. TENIR-Gov v5.7.0 est publié depuis le 24 octobre 2026, avec un périmètre mono-hôte borné, sans revendication C3 multi-hôte ni certification de production.
sources: KB3 et politique v2 ; RFC REG ; TENIR-Gov release v5.7.0 (24 octobre 2026), README et pyproject.toml ; anciens journaux 5.6.x à titre historique ; STATUS.md du harnais
---

## À retenir avant de lire le détail

- **Le cadre et le standard ne sont pas le logiciel :** KB3 et REG décrivent des lignes de sens ou des règles proposées.
- **Le logiciel existe en bêta :** TENIR-Gov v5.7.0 est publié, mais son périmètre annoncé reste mono-hôte et borné.
- **Publié ne veut pas dire certifié :** aucune ligne de cette page ne prouve un déploiement client, une tolérance multi-hôte ou un effet externe exactement une fois.

## Où en est chaque espace

<table>
  <thead><tr><th>Espace</th><th>État assumé par les sources</th></tr></thead>
  <tbody>
    <tr><td>TENIR 2.0</td><td>Nom du cadre dans l’espace canon. Ce nom n’est pas, à lui seul, l’institution de KB3.</td></tr>
    <tr><td>KB3</td><td>Ligne de rendu doctrinale instituée et active, par la déclaration du propriétaire du 19 octobre 2026. Les fichiers fournis avec cette déclaration ne contiennent pas d’enregistrement signé sous <code>00_GOVERNANCE/04_DECISIONS_AND_RATIFICATIONS</code>. Couche documentaire, hors du code. KB3 rend le sens ; il ne crée pas de sens souverain et n’est pas une nouvelle constitution. Les services ou applications spécialisés peuvent l’envelopper ou l’étendre ; ils ne doivent pas le redéfinir. TENIR-Gov doit s’y aligner ; il n’est pas KB3.</td></tr>
    <tr><td>KB2</td><td>Ligne de rendu antérieure, continuité seulement. Pas d’autorité active simultanée avec KB3. Le build du 30 mars 2026 est conservé. La note qui l’a nommé actif à l’institution est un contexte historique, pas l’autorité actuelle. KB1.1 est historique. Rédigé et curé avec assistance, auteur Abdelaziz Skiredj.</td></tr>
    <tr><td>REG</td><td>RFC-0 à RFC-7 : Proposed Standard, brouillon gelé, 2–3 octobre 2026. Pas une norme adoptée par un organisme extérieur.</td></tr>
    <tr><td>TENIR-Gov</td><td>Logiciel open source bêta (« Development Status :: 4 - Beta »). Release <a href="https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0">v5.7.0</a> publiée le 24 octobre 2026 ; source identifiée par le tag et le commit <code>47ef67e3efc5f3008896a7d88bebf929fa0a98f0</code>. Publication ne signifie pas qualification d’un déploiement client.</td></tr>
    <tr><td>5.6.1</td><td>Ancien état documentaire : le journal consulté au 19 octobre portait « Pending release ». Cette mention n’est plus une information sur la dernière release publiée.</td></tr>
    <tr><td>5.7.0</td><td>Release GitHub et paquet PyPI <a href="https://pypi.org/project/tenir-governance/5.7.0/">5.7.0</a>, publiés le 24 octobre 2026. Périmètre de déploiement annoncé : mono-hôte, avec manifeste de production vérifié et registre durable configuré ; multi-hôte Raft de production bloqué (FM-20), aucune tolérance C3 multi-hôte ni exactly-once externe revendiquée.</td></tr>
    <tr><td>Harnais S1</td><td>Validation de laboratoire sur des entrelacements testés. Non-certification écrite en tête de dépôt.</td></tr>
    <tr><td>Schémas v1</td><td>Faisceau publiable de février 2026, hôtes d’exemple, stubs assumés.</td></tr>
  </tbody>
</table>


## Frontière de déploiement publiée — TENIR-Gov v5.7.0

<p>La <a href="https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0">release du 24 octobre 2026</a> et son <a href="https://github.com/skiredj-prog/tenir_governance/blob/v5.7.0/README.md">README associé</a> distinguent explicitement publication, réussite de la CI et qualification d’un déploiement. Le périmètre annoncé est <strong>mono-hôte borné</strong>, sous manifeste de production vérifié et configuration de registre durable. La publication ne démontre ni qu’un client a installé le logiciel, ni un effet externe exactement une fois, ni la tolérance C3 multi-hôte. Les tests doivent être attribués à leur commit, environnement et sélection, sans transformer une couverture historique en garantie de cette release.</p>

## Audit historique de la 5.6.0 (ne décrit pas le statut de la v5.7.0)

<p>Le document illustratif antérieur citait trois constats sur la v5.6.0. Leur présence ici documente l’historique ; elle ne signifie ni qu’ils persistent ni qu’ils sont corrigés dans chaque configuration de v5.7.0 :</p>
<ul>
  <li><strong>F-01, commit.</strong> <code>reconcile_commit()</code> pourrait forcer une mutation sans revérifier la capacité. Un état RELEASED pourrait devenir COMMITTED, en violation de I8.</li>
  <li><strong>F-02, normalisation.</strong> <code>register_resource()</code> réinitialiserait l’état. Après crash ou rechargement, un signal de ressource disponible pourrait devenir faux.</li>
  <li><strong>F-03, assessment.</strong> Le vérificateur de linéarisabilité serait invalide. Des preuves LIN pourraient contenir des faux positifs.</li>
</ul>

<p>Le journal 5.6.1, alors non publié, décrivait des corrections : refuser <code>reconcile_commit()</code> hors réservation RESERVED, enregistrement de ressource non destructif, et d’autres corrections de sûreté « under review », dont le vérificateur de linéarisation. Le périmètre exclu y est explicite : tolérance byzantine, transport authentifié durci, attestation tierce, preuve d’effet externe exactly-once. Un essai Raft antérieur est rapporté : 46 tests passés sur le commit <code>8203705</code>, run GitHub <code>39205580977</code>, Python 3.11.17, localhost. Ce site ne rejoue pas ces tests. Pour conclure sur la v5.7.0, consulter le tag, les résultats CI et un manifeste de déploiement correspondant.</p>

<p>Le gel de communication mentionné dans ce document illustratif était une condition historique préalable à la v5.7.0. La release a été publiée depuis ; sa publication ne transforme pas les tests en certification ni en déploiement prêt à l’emploi pour tout environnement.</p>

<p>Le paquet publié identifié est <a href="https://pypi.org/project/tenir-governance/5.7.0/">tenir-governance 5.7.0</a> (ligne bêta). Deux working papers SSRN sont enregistrés sur la page <a href="/publications/">Publications</a> : <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7291620">7291620</a> et <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7197218">7197218</a>. Ils ne certifient pas le runtime, et ils ne sont pas KB3.</p>

## Décomptes historiques qui ne doivent pas être cités comme résultats v5.7.0

<p>Les anciennes sources R5/R4 montrent des périmètres de test différents : le journal 5.6.0 écrivait 787 tests ; un ancien README de <code>tenir_governance</code> indiquait 733 tests et la v5.4.2. Le README de <code>tenir-governance</code> parle de 557 tests et de 96&nbsp;% de couverture pour la R5. Le README de <code>tenir-gov</code> parle de 313 tests. Ce sont des phrases historiques de fichiers différents, pas une série unique ni des mesures v5.7.0. Les suites Raft et générales de la release se chevauchent : ne pas additionner leurs décomptes. Aucun test n’a été rejoué pour ce site.</p>

## Ce qui n’est pas établi

<ul>
  <li>Certification de production, audit indépendant, ou preuve qu’un déploiement client dispose du manifeste validé liant les tests à son hôte réel.</li>
  <li>Tolérance byzantine ou tolérance aux pannes <strong>C3 multi-hôte</strong> : non revendiquées pour la v5.7.0. Le Raft de production multi-hôte reste bloqué par FM-20.</li>
  <li>Effet externe exactly-once. Le silence n’est pas une non-exécution. Le manuscrit le prend comme limite E1–E3, pas comme un théorème déployé.</li>
  <li>Rotation de clés et ancre de confiance signée dans le harnais S11.</li>
  <li>Adopteurs, contrats, ou résultats d’un programme UM6P. Les noms de profils <code>partner_a</code> et <code>partner_b</code> existent dans le code. Ils ne documentent pas un déploiement.</li>
  <li>Blueprint v4.4, cité par le code et par le manuscrit, absent des arbres clonés.</li>
</ul>

## Suite visible dans les sources, pas un calendrier

<p>La ligne antérieure demande que le châssis consomme un objet TENIR 2.0 complet au lieu de laisser l’implémentation définir la doctrine. KB3, sans créer un nouveau canon, demande en plus une seule ligne de rendu à la fois, la classe de conformité et le statut dégradé visibles, le contrat machine non renommé en silence, le mode d’exécution séparé de la posture, et la déclaration de ce qu’une surface publique simplifie. Le dessin 5.7.0 demande une réconciliation sûre, une persistance non destructive, un validateur de linéarisation fiable et un transport de consensus durci. Le README de conformance demande le <code>deployment.manifest</code> avant tout audit externe. STATUS.md du harnais demande de tenir la phrase de non-certification, et liste un reste documentaire hors dépôt. La politique de versions demande que chaque surface déclare l’autorité qu’elle n’a pas. Aucune de ces demandes n’est close par cette page.</p>
