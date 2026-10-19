---
title: Contribuer
kicker: Recherche ouverte · Apache-2.0 là où il est déclaré
description: Comment proposer une correction aux dépôts TENIR-Gov et à la suite REG, sans confondre une contribution de code et un amendement du canon.
lede: Une contribution de plateforme améliore la reproductibilité, les tests ou la documentation. Elle ne renomme pas le canon et ne mime pas une version TENIR 2.x.
sources: CONTRIBUTING.md de tenir_governance ; vectors/CONTRIBUTING.md ; politique de namespaces v2 ; LICENSE Apache-2.0
---

<p>Le fichier <a href="https://github.com/skiredj-prog/tenir_governance/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a> présente TENIR-Gov comme un logiciel de recherche accompagnant un manuscrit. Il accueille surtout la reproductibilité, la documentation et la couverture de tests. Il pointe aujourd’hui les issues vers <code>skiredj-prog/tenir-gov</code>, dépôt antérieur. Pour l’arbre actif, les issues du dépôt <a href="https://github.com/skiredj-prog/tenir_governance/issues">tenir_governance</a> sont l’adresse cohérente. Le fichier n’a pas encore suivi le déplacement.</p>

<h2>Avant une proposition</h2>
<ol>
  <li>Partir de <code>main</code> sur le dépôt concerné. Pour <code>tenir-governance</code> à trait d’union, la branche par défaut lue est <code>master</code>.</li>
  <li>Dire si le changement touche le runtime, un vecteur de conformance, ou seulement la documentation.</li>
  <li>Ne pas présenter un profil, un module ou une extension comme une nouvelle version canonique.</li>
</ol>

<p>La commande de tests citée par CONTRIBUTING.md :</p>
<pre><code>pytest tests/ r4/tests/ \
  r5_hardened/IRON_OMEGA_R5/test_r5_all.py \
  r5_hardened/IRON_OMEGA_R5/test_institutional_hardening.py \
  r5_wired/test_r5_governance_integration.py \
  --cov=tenir_governance</code></pre>

<p>Le validateur de politique, pour un changement sous <code>tenir_governance/</code> :</p>
<pre><code>tenir-validate --policy default
tenir-validate --policy partner_a
tenir-validate --policy partner_b</code></pre>

<p>Invariants que le fichier demande de ne pas casser : les décisions de membrane passent par <code>PolicyEngine.evaluate_membrane()</code> ; l’expansion CAVE reste Control, Aim, Veto, Epistemics ; une empreinte de politique par défaut est donnée (<code>d083e0b82a16c04d</code>) et tout changement intentionnel doit la mettre à jour avec la version de politique. Python 3.10 ou plus.</p>

<h2>Vecteurs REG</h2>
<p>Le répertoire <a href="https://github.com/skiredj-prog/reg-conformance/blob/main/vectors/CONTRIBUTING.md">vectors/</a> sépare les vecteurs core, commit et extended, et les statuts valid, proposed, rejected, deprecated. Une proposition n’est pas une ratification. <code>compile.py</code> produit le JSON empaqueté à partir des YAML.</p>

<h2>Licence</h2>
<p>Apache-2.0 est le texte de licence de <code>tenir_governance</code>, <code>tenir-governance</code>, <code>tenir-gov</code> et <code>reg-conformance</code>. Contribuer à ces dépôts, selon leur CONTRIBUTING, place le travail sous cette licence. <code>tenir-conformance-s1-g1</code> et <code>tenir-schemas</code> n’avaient pas de fichier LICENSE dans les arbres clonés. Ne pas supposer la même licence sans la lire sur place.</p>

<p>KB3, la ligne antérieure et la politique de versions ne sont pas, dans les dépôts, des fichiers à patcher par une pull request. Un désaccord de définition se signale. Il ne se « corrige » pas dans le runtime pour faire coïncider les mots. Une modification qui toucherait la posture, la hiérarchie d’autorité, la logique déterminante, les sorties minimales ou les bornes de profil n’est pas un correctif de rendu : elle s’escalade. KB3 n’est pas institué par une édition de ce site.</p>
