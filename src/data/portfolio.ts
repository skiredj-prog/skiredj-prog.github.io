// Editorial portfolio pages prepared for review. Distinguish project declarations from verified releases.
// PR #24 is the governing catalogue; this is not a new product taxonomy.
export type PortfolioLocale = 'fr' | 'en';
export type PortfolioKind = 'product' | 'service' | 'demo' | 'foundation';
export interface PortfolioEntry {
  id: string;
  kind: PortfolioKind;
  title: string;
  tagline: string;
  status: string;
  pain: string;
  when: string;
  examines: string;
  inputs: string;
  output: string;
  relationships: string;
  maturity: string;
  limits: string;
  next: string;
  nextHref: string;
  nextLabel: string;
  related: string[];
  sources: { label: string; href: string }[];
}
export const portfolioOrder = ['diagnostic','prevent','prepare','discovery','xray','translation','gov','reg-arch','technical','experiences','control-tower'] as const;
export const portfolio: Record<PortfolioLocale, Record<string, PortfolioEntry>> = {
fr: {
  diagnostic: {
    id:'diagnostic',kind:'service',title:'Diagnostic accompagné de gouvernance',
    tagline:'Une question précise. Des éléments situés. Une décision à préparer.',
    status:'Offre proposée · périmètre et devis à convenir',
    pain:'Votre équipe doit décider quoi autoriser, retenir ou vérifier, mais les règles, les traces et les responsabilités ne disent pas toutes la même chose.',
    when:'Avant une mise en service, à l’occasion d’un changement sensible, ou après un résultat d’agent qui demeure incertain.',
    examines:'Une action, son autorité, ses conditions d’exécution, la preuve disponible et la prochaine décision humaine. Le diagnostic choisit les instruments adaptés : il n’impose pas un parcours unique.',
    inputs:'Question métier, personne responsable, descriptions du processus, exigences, architecture et traces accessibles selon le périmètre écrit. Aucun accès sensible n’est nécessaire au premier contact.',
    output:'Fiche sourcée, faits/affirmations distingués, inconnues, points de contrôle prioritaires et restitution humaine.',
    relationships:'Peut mobiliser REG Prevent, REG Prepare, Discovery, X-Ray ou Translation selon le problème. Un pilote TENIR-Gov est un engagement distinct.',
    maturity:'Offre commerciale décrite, sur devis après cadrage. Premières missions réelles et résultats clients non publiquement démontrés.',
    limits:'Ni certification, ni avis juridique, ni contrôle automatique en production, ni garantie d’obtenir une conclusion.',
    next:'Décrire une action et la décision à prendre ; convenir ensuite d’un périmètre, d’un accès autorisé et d’un livrable.',
    nextHref:'/contact/',nextLabel:'Parler d’un cas précis',related:['prevent','prepare','xray','gov'],
    sources:[{label:'Offre actuelle',href:'/offre/'},{label:'Exemple fictif',href:'/offre/exemple/'}]
  },
  prevent: {
    id:'prevent',kind:'product',title:'REG Prevent',
    tagline:'Avant de permettre une action, comprendre les conditions qui doivent tenir.',
    status:'Working Draft v0.1 · démarche pilote bornée',
    pain:'Une exigence existe, mais ses conséquences opérationnelles, les hypothèses implicites et les contrôles attendus restent flous.',
    when:'Lors d’une conception, d’un changement de politique ou de l’examen d’une action conséquente ; aussi lorsqu’un contrôle existant doit être réévalué.',
    examines:'Exigences → conditions d’autorité, réversibilité, doublons, incertitudes d’effet → contrôles candidats.',
    inputs:'Exigences ou politiques versionnées, contexte métier, périmètre de l’action, décisions concernées, personnes habilitées et hypothèses.',
    output:'Carte de contrôles candidats, hypothèses critiques, risques à examiner et vérifications prioritaires ; REG Prevention Brief proposé.',
    relationships:'Peut partir de REG Translation Studio ou de documents existants. Complémentaire à REG Prepare ; ni passage obligé ni préalable technique imposé.',
    maturity:'Cadrage REG v0.1 publié comme Working Draft ; workflow pilote en construction et en test, non validé comme produit de production.',
    limits:'Ne crée aucune propriété formellement admise ; ne délivre ni validation réglementaire ni permission d’exécuter.',
    next:'Examiner une exigence réelle avec son responsable, puis tester un contrôle candidat dans un périmètre convenu.',
    nextHref:'/contact/',nextLabel:'Cadrer un pilote Prevent',related:['translation','prepare','diagnostic','technical'],
    sources:[{label:'Spécification REG v0.1',href:'/publications/reg-v0.1/'},{label:'Produits REG existants',href:'/produits-et-services/'}]
  },
  prepare: {
    id:'prepare',kind:'product',title:'REG Prepare',
    tagline:'Savoir exactement ce que les preuves disponibles permettent de dire.',
    status:'Working Draft v0.1 · démarche pilote bornée',
    pain:'Des contrôles et procédures sont déclarés, mais il manque une chaîne fiable entre ce qui est affirmé, ce qui existe et ce qui a réellement été vérifié.',
    when:'Avant une revue, un lancement ou un audit ; après un incident ; ou au moment de préparer une décision qui dépend de preuves.',
    examines:'Responsabilités, sources, dates, configurations, journaux et tests ; couverture possible et lacunes de vérification.',
    inputs:'Question bornée, périmètre de systèmes, exigences, responsables, pièces et traces disponibles avec leur provenance.',
    output:'Dossier d’état des preuves, matrice des affirmations étayées ou non, registre des inconnues et plan de vérification.',
    relationships:'Peut fonctionner seul ou avec REG Prevent. Peut exploiter des traces d’un TENIR-Gov autorisé, sans leur attribuer une valeur non démontrée.',
    maturity:'Méthode en Working Draft ; Evidence Readiness Pack ciblé, à construire et éprouver dans des pilotes.',
    limits:'Un fichier, un hash ou un journal ne suffit pas à prouver la vérité, l’effet externe ou la conformité.',
    next:'Choisir une affirmation importante et inventorier ensemble les pièces qui peuvent réellement l’étayer.',
    nextHref:'/contact/',nextLabel:'Discuter la préparation des preuves',related:['prevent','diagnostic','gov','technical'],
    sources:[{label:'Spécification REG v0.1',href:'/publications/reg-v0.1/'},{label:'Exemple de diagnostic simulé',href:'/offre/exemple/'}]
  },
  discovery:{
    id:'discovery',kind:'product',title:'REG Discovery',tagline:'Mettre en lumière les hypothèses que personne n’avait formulées.',
    status:'Aperçu exploratoire · intégration web en PR #13',
    pain:'Le système semble couvert par les textes et les contrôles connus, mais les hypothèses comportementales adjacentes n’ont pas été mises à l’épreuve.',
    when:'Au démarrage d’un examen, lorsqu’un texte paraît trop évident ou quand il faut préparer des questions de vérification.',
    examines:'Un catalogue limité de sources et leurs hypothèses à interroger, sans prétendre analyser librement un système client.',
    inputs:'Sélection explicite de sources et hypothèses de contexte ; aucune donnée client requise pour l’aperçu présenté dans la PR.',
    output:'Questions exploratoires sourcées et rapport borné. L’intégration proposée comprend cinq cartes de sources et 31 combinaisons.',
    relationships:'Peut alimenter Prevent ou un diagnostic. N’est ni AI Exposure X-Ray, ni Translation Studio, ni le prototype mobile de prise de rendez-vous.',
    maturity:'PR #13 en brouillon, non fusionnée sur main ; intégration et publication non établies.',
    limits:'Pas d’audit d’implémentation, analyse juridique, certification ou contrôle d’exécution. Pas de promesse de rapport sur données libres.',
    next:'Lire l’intention de Discovery et demander une présentation exploratoire ; ne pas confondre la prévisualisation avec un service publié.',
    nextHref:'/contact/',nextLabel:'Demander une présentation',related:['prevent','translation','xray','diagnostic'],
    sources:[{label:'PR #13 · intégration exploratoire',href:'https://github.com/skiredj-prog/skiredj-prog.github.io/pull/13'},{label:'REG v0.1',href:'/publications/reg-v0.1/'}]
  },
  xray:{
    id:'xray',kind:'product',title:'AI Exposure X-Ray',tagline:'Où l’IA influence-t-elle déjà les opérations et les responsabilités ?',
    status:'Prototype · validation interne annoncée',
    pain:'L’IA peut être introduite par les logiciels du quotidien sans inventaire clair des usages, des données touchées et des décisions affectées.',
    when:'Avant de cadrer une politique IA, de lancer un diagnostic ou d’évaluer les zones d’exposition d’une activité.',
    examines:'Usages déclarés, exposition potentielle, rôles et contrôles connus ou incertains.',
    inputs:'Réponses attribuées, inventaire d’outils, processus, propriétaires métier et informations connues / inconnues.',
    output:'Carte exploratoire d’exposition et questions classées pour vérification.',
    relationships:'Peut aider à délimiter le Diagnostic ou REG Prevent/Prepare. Ne remplace pas REG Discovery.',
    maturity:'Validation interne rapportée dans les artefacts de projet ; dépôt canonique et déploiement public non confirmés.',
    limits:'Les réponses déclaratives ne prouvent ni l’usage effectif, ni son absence, ni la conformité ou la couverture de contrôle.',
    next:'Commencer par un processus ou un ensemble d’outils, puis vérifier les expositions prioritaires à partir des sources.',
    nextHref:'/contact/',nextLabel:'Examiner un périmètre',related:['diagnostic','discovery','prevent','prepare'],
    sources:[{label:'Cadrage REG v0.1',href:'/publications/reg-v0.1/'}]
  },
  translation:{
    id:'translation',kind:'product',title:'REG Translation Studio',tagline:'Passer de l’intention exprimée à des contraintes candidates et vérifiables.',
    status:'Prototype exploratoire · tests internes à préparer',
    pain:'La langue des politiques et des exigences ne correspond pas directement aux conditions qu’un système peut tester.',
    when:'Lorsqu’une exigence est ambiguë, doit devenir testable ou exige la séparation entre interprétation et admission.',
    examines:'Sources normatives, sens proposé, hypothèses d’applicabilité, contraintes candidates et lacunes de validation.',
    inputs:'Exigences versionnées, origine et applicabilité, responsabilité, contexte technique et critères de vérification.',
    output:'Contraintes candidates traçables et journal d’ambiguïtés, prêts pour discussion et validation indépendante.',
    relationships:'Alimente REG Prevent et le travail de spécification REG+ ; ne décide pas de l’admission formelle.',
    maturity:'Instrument exploratoire décrit par REG v0.1 ; version publique exécutable et validation client non confirmées.',
    limits:'La traduction ou l’appariement lexical ne vaut ni résolution normative, ni admission, ni règle appliquée en production.',
    next:'Choisir une exigence difficile et examiner sa traduction proposée avec ses autorités métier et techniques.',
    nextHref:'/contact/',nextLabel:'Proposer une exigence à examiner',related:['prevent','technical','discovery','diagnostic'],
    sources:[{label:'Working Draft REG v0.1',href:'/publications/reg-v0.1/'}]
  },
  gov:{
    id:'gov',kind:'product',title:'TENIR-Gov v5.7.0',tagline:'La frontière d’exécution entre ce qu’un agent propose et ce qui peut devenir réel.',
    status:'Logiciel open source publié · bêta · mono-hôte borné',
    pain:'Une proposition d’agent peut franchir la frontière d’une action conséquente sans contrôle explicite de l’autorité, du doublon, de l’incertitude ou de la reprise.',
    when:'Lorsqu’une équipe technique conçoit une intégration agentique avec effet externe et accepte de vérifier un contrat de déploiement précis.',
    examines:'Adjudication d’exécution, réservation ONCE, HOLD, dispatch gouverné, preuves de décision et rapprochement des résultats.',
    inputs:'Contrat d’action, règles/profils versionnés, identité et autorité, clé d’idempotence, fournisseur externe et manifeste du déploiement.',
    output:'Décisions et traces locales bornées, états de réservation/reprise et éléments de rapprochement ; pas une preuve automatique d’effet fournisseur.',
    relationships:'Route technique indépendante. Peut implémenter certains contrôles issus de Prevent ; Prepare peut qualifier ses traces ; conformance décrit les garanties limitées.',
    maturity:'Release GitHub v5.7.0 du 24 octobre 2026 ; PyPI publié ; bêta. Périmètre mono-hôte selon manifeste vérifié et registre durable. Déploiement client non démontré.',
    limits:'Aucune tolérance C3 multi-hôte revendiquée ; Raft multi-hôte de production bloqué (FM-20). Pas de garantie exactly-once de l’effet externe ni certification.',
    next:'Lire le tag et le contrat de déploiement ; discuter un essai mono-hôte borné, avec responsable technique identifié.',
    nextHref:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',nextLabel:'Examiner la release v5.7.0',related:['control-tower','technical','prepare','diagnostic'],
    sources:[{label:'Release v5.7.0',href:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0'},{label:'README source',href:'https://github.com/skiredj-prog/tenir_governance'},{label:'Statut du site',href:'/statut/'}]
  },
  'reg-arch':{
    id:'reg-arch',kind:'foundation',title:'REG-ARCH',tagline:'Relier ce qui est affirmé, ce qui est fait et ce qui peut être représenté.',
    status:'Fondation d’architecture · spécification de travail',
    pain:'Exigences, exécution et pièces de preuve évoluent en pistes séparées, sans transitions ou autorités clairement reliées.',
    when:'Quand des architectes doivent définir les états et les conditions de passage entre Claim, Action et Representation.',
    examines:'Objets, transitions, gates et relations entre les trois lanes Claim / Action / Representation.',
    inputs:'Exigences, états d’action, sources de preuves, responsabilités et hypothèses de liaison.',
    output:'Cartographie conceptuelle, transitions typées, points de contrôle à confronter à une spécification versionnée.',
    relationships:'Fondation de cohérence pour Prevent, Prepare, TENIR-Gov et les expériences ; pas une nouvelle offre.',
    maturity:'Référence REG-ARCH v0.4 signalée dans les artefacts du projet ; version normative publique et approbation formelle non vérifiées.',
    limits:'Une architecture présentée n’est ni une implémentation, ni un test réussi, ni une norme adoptée.',
    next:'Examiner le dessin illustratif puis demander la spécification et la version pertinentes avant toute décision technique.',
    nextHref:'/architecture/',nextLabel:'Lire l’architecture publiée',related:['technical','experiences','prevent','prepare'],
    sources:[{label:'Architecture illustrative',href:'/architecture/'},{label:'REG v0.1',href:'/publications/reg-v0.1/'}]
  },
  technical:{
    id:'technical',kind:'foundation',title:'REG+, RFC et conformance',tagline:'Des contrats examinables, pas des garanties proclamées.',
    status:'Spécifications, catalogue et harnais publics · périmètres distincts',
    pain:'Une affirmation sur l’exécution doit être reliée à un contrat précis, une configuration et des tests reproductibles.',
    when:'Pour examiner des invariants, un profil, un cas de test, une hypothèse de déploiement ou la portée d’une garantie.',
    examines:'RFC-0 à RFC-7, profils REG+, compatibilité de configurations, contrats de preuve et tests de conformité limités.',
    inputs:'Version du contrat, hypothèses, source/commit de l’implémentation, manifeste, jeux de tests et preuves disponibles.',
    output:'Références, profils candidats, résultats de vérification attribués et limites non résolues.',
    relationships:'Soutient Translation, Prevent, REG-ARCH et TENIR-Gov ; n’est ni produit autonome ni service commercial.',
    maturity:'Dépôts publics en évolution. Catalogue signalant 144 configurations dont 42 admissibles structurellement ; cela ne prouve aucune garantie effective.',
    limits:'Admissibilité structurelle ≠ conformité effective ; tests laboratoire ≠ certification ; dépendance au manifeste de déploiement.',
    next:'Vérifier les versions des RFC, profils et tests avant de conclure sur une implémentation particulière.',
    nextHref:'https://github.com/skiredj-prog/reg-conformance',nextLabel:'Lire reg-conformance',related:['gov','reg-arch','prepare','translation'],
    sources:[{label:'reg-conformance',href:'https://github.com/skiredj-prog/reg-conformance'},{label:'Site conformance',href:'/conformance/'},{label:'Standard REG',href:'/standard/'}]
  },
  experiences:{
    id:'experiences',kind:'demo',title:'Expériences TENIR Labs',tagline:'Une façon d’examiner ensemble plutôt que de croire sur parole.',
    status:'Expériences bornées · états de test distincts',
    pain:'Les mécanismes de décision, de reprise et de preuve restent abstraits même pour des équipes habituées à la gouvernance.',
    when:'Lors d’une découverte, d’un atelier ou pour préparer une conversation technique avec un exemple visible.',
    examines:'Decision Readiness, Execution Timeline, Lifecycle Workbench ; scénarios, transitions et limites rendus inspectables.',
    inputs:'Cas simulés et hypothèses explicites ; aucune donnée de production nécessaire.',
    output:'Parcours pédagogique, trace fictive et question à ramener à des sources ou à un pilote.',
    relationships:'Introduit Prevent, Prepare, REG-ARCH ou TENIR-Gov selon le scénario ; la Control Tower en est une expérience distincte.',
    maturity:'Artefacts de projet en développement et en test ; équivalence des versions publiques et déploiement des trois expériences non établis.',
    limits:'Une simulation n’est ni un résultat de production, ni une validation de contrat, ni une certification.',
    next:'Explorer une expérience déjà publiée sur le site, puis choisir un problème réel à examiner.',
    nextHref:'/architecture/demo/',nextLabel:'Essayer la démo existante',related:['control-tower','reg-arch','gov','diagnostic'],
    sources:[{label:'Démonstration existante',href:'/architecture/demo/'},{label:'Architecture interactive existante',href:'/architecture/interactive/'}]
  },
  'control-tower':{
    id:'control-tower',kind:'demo',title:'REG — Autonomy Control Tower v1.0',tagline:'L’agent propose. Que se passe-t-il à la frontière d’exécution ?',
    status:'Simulation interactive fournie · noyau non connecté',
    pain:'Difficile de distinguer une proposition de l’agent, une autorisation, un état appliqué, un effet externe et la preuve disponible.',
    when:'Pour comprendre les risques avant une discussion de diagnostic, de gouvernance technique ou de déploiement.',
    examines:'Quatre histoires : autorité manquante, action autorisée, confirmation perdue, tentative en double. Progression pas-à-pas, trace et dossier fictifs.',
    inputs:'Simple choix d’un scénario et rythme de lecture. Données fictives uniquement ; aucun compte ni réseau requis pour la simulation.',
    output:'Chronologie synthétique inspectable, lecture métier/risque/ingénierie et export JSON de scénario fictif.',
    relationships:'Expérience pédagogique associée à REG-ARCH ; mène au diagnostic ou à la documentation TENIR-Gov sans prétendre être son interface d’exécution.',
    maturity:'HTML v1.0 autonome reçu et reproduit dans cette branche de préparation. Interface anglaise ; récit d’accompagnement en français ici. Tests humains et validation d’intégration requis.',
    limits:'Ne contacte pas TENIR-Gov, ne démontre ni règlement fournisseur ni ledger vérifié, ni conformité ni protection juridique. Création d’Écart structurel encore provisoire (D-02).',
    next:'Choisir un scénario, commencer manuellement, puis lire les limites. Poursuivre avec une question réelle ou le code publié.',
    nextHref:'#control-tower-experience',nextLabel:'Lancer la simulation, à votre rythme',related:['gov','diagnostic','experiences','reg-arch'],
    sources:[{label:'REG-ARCH · architecture illustrative',href:'/architecture/'},{label:'Code TENIR-Gov',href:'https://github.com/skiredj-prog/tenir_governance'}]
  }
},
en: {
  diagnostic:{
    id:'diagnostic',kind:'service',title:'Guided Governance Diagnostic',tagline:'One consequential question. Source-linked findings. A human decision to prepare.',
    status:'Proposed client offer · scoped and quoted',
    pain:'A team needs to decide whether to proceed, hold or investigate, but rules, records and responsibilities do not tell a consistent story.',
    when:'Before go-live or a consequential change, or after an agent’s outcome remains uncertain.',
    examines:'One action and its authority, execution boundary, evidence and next human decision. Selects relevant instruments rather than imposing one funnel.',
    inputs:'Business question, responsible counterpart, process and system context, agreed policies and available traces under written scope. No sensitive access needed for initial contact.',
    output:'Sourced diagnostic brief, known facts and uncertainties, prioritized checks and human debrief.',
    relationships:'May draw on REG Prevent, Prepare, Discovery, X-Ray or Translation; TENIR-Gov integration is a separate engagement.',
    maturity:'Described and available for scoped discussion and quotation; completed customer outcomes have not been publicly demonstrated.',
    limits:'No certification, legal opinion, production enforcement or guaranteed conclusion.',
    next:'Describe one action and the decision required; then agree scope, authorized access and deliverables.',
    nextHref:'/en/contact/',nextLabel:'Discuss a bounded case',related:['prevent','prepare','xray','gov'],
    sources:[{label:'Existing offer',href:'/en/offer/'},{label:'Fictional example',href:'/en/offer/example/'}]
  },
  prevent:{
    id:'prevent',kind:'product',title:'REG Prevent',tagline:'Understand the conditions before a consequential action is allowed.',
    status:'Working Draft v0.1 · bounded pilot approach',
    pain:'A requirement exists, but the operational conditions, hidden assumptions and candidate controls remain unclear.',
    when:'During design, policy change or reassessment of an existing action boundary.',
    examines:'Requirements → authority, reversibility, duplicate actions and uncertain effects → candidate controls.',
    inputs:'Versioned policies/requirements, business context, action scope, responsible authorities and assumptions.',
    output:'Candidate control map, critical assumptions, risk questions and proposed REG Prevention Brief.',
    relationships:'Can start from Translation or original documents; complementary to Prepare, never a compulsory stage.',
    maturity:'REG v0.1 public working draft; bounded pilot workflow under development and testing, not a production-grade product.',
    limits:'Candidate controls are not formally admitted properties, regulatory findings or execution permissions.',
    next:'Review a real requirement with an accountable owner and test candidate controls within an agreed scope.',
    nextHref:'/en/contact/',nextLabel:'Explore a Prevent pilot',related:['translation','prepare','diagnostic','technical'],
    sources:[{label:'REG v0.1 specification',href:'/en/publications/reg-v0.1/'},{label:'Current REG overview',href:'/en/products-and-services/'}]
  },
  prepare:{
    id:'prepare',kind:'product',title:'REG Prepare',tagline:'Know exactly what your available evidence can support.',
    status:'Working Draft v0.1 · bounded pilot approach',
    pain:'Declared controls and processes lack a defensible trail from claim to observed evidence.',
    when:'Ahead of a review or launch decision, after an incident, or whenever an important claim needs evidentiary support.',
    examines:'Responsibilities, sources, dates, logs, tests, possible coverage and verification gaps.',
    inputs:'Defined question, system scope, control owners, requirements, available records and provenance.',
    output:'Evidence Readiness Pack, qualified claim matrix, unknowns and verification plan.',
    relationships:'Independent or alongside Prevent; TENIR-Gov traces are inputs only after their provenance and limits are assessed.',
    maturity:'Working-draft approach with pilot validation still to be demonstrated.',
    limits:'A record, file or hash alone does not prove the truth of a claim, an external effect or compliance.',
    next:'Select one claim and identify which records can actually support it.',
    nextHref:'/en/contact/',nextLabel:'Discuss evidence readiness',related:['prevent','diagnostic','gov','technical'],
    sources:[{label:'REG v0.1 specification',href:'/en/publications/reg-v0.1/'},{label:'Fictional diagnostic example',href:'/en/offer/example/'}]
  },
  discovery:{
    id:'discovery',kind:'product',title:'REG Discovery',tagline:'Surface the assumptions nobody thought to question.',
    status:'Exploratory preview · web integration in draft PR #13',
    pain:'Frameworks appear covered, but adjacent behavioral assumptions have never been challenged.',
    when:'At the start of an examination or when preparing test questions about seemingly obvious requirements.',
    examines:'A bounded catalogue of selected frameworks and candidate questions, not an unrestricted audit of a client system.',
    inputs:'Selected framework cards and context assumptions, no operational client telemetry for the preview.',
    output:'Sourced exploratory questions and a bounded report; proposal includes five source cards and 31 combinations.',
    relationships:'Can inform Prevent or a diagnostic; distinct from X-Ray, Translation and the mobile scheduling demo.',
    maturity:'Draft PR #13 unmerged; public-site main integration and external release not established.',
    limits:'No implementation audit, legal finding, certification, free-text system analysis or runtime enforcement.',
    next:'Read the exploratory brief or request a private walkthrough while the integration remains gated.',
    nextHref:'/en/contact/',nextLabel:'Request a walkthrough',related:['prevent','translation','xray','diagnostic'],
    sources:[{label:'Draft PR #13',href:'https://github.com/skiredj-prog/skiredj-prog.github.io/pull/13'},{label:'REG v0.1',href:'/en/publications/reg-v0.1/'}]
  },
  xray:{
    id:'xray',kind:'product',title:'AI Exposure X-Ray',tagline:'Where might AI already be influencing your operations?',
    status:'Prototype · reported internal validation',
    pain:'AI enters everyday software without a reliable account of usage, affected data and consequential decisions.',
    when:'Before establishing an AI inventory, a governance policy or the scope of a diagnostic.',
    examines:'Reported AI use, possible exposure, owners and unknown safeguards.',
    inputs:'Attributed interviews/surveys, tool inventory, processes, system owners and known unknowns.',
    output:'Exploratory exposure view and prioritized verification questions.',
    relationships:'Can frame a Diagnostic or Prevent/Prepare; not the same as REG Discovery.',
    maturity:'Internal validation reported in project artifacts; canonical source revision and public deployment not confirmed.',
    limits:'Self-reports do not prove actual use or its absence, compliance or control coverage.',
    next:'Select one process, then verify reported exposure against independent sources.',
    nextHref:'/en/contact/',nextLabel:'Explore an exposure review',related:['diagnostic','discovery','prevent','prepare'],
    sources:[{label:'REG v0.1 framing',href:'/en/publications/reg-v0.1/'}]
  },
  translation:{
    id:'translation',kind:'product',title:'REG Translation Studio',tagline:'From business intent to candidate constraints that can be tested.',
    status:'Exploratory prototype · preparing internal testing',
    pain:'The language of business and regulation rarely maps cleanly onto executable test conditions.',
    when:'When a requirement is ambiguous or must be made testable while interpretation remains distinct from admission.',
    examines:'Normative source, possible meaning, applicability assumptions, candidate constraints and validation gaps.',
    inputs:'Versioned requirements, provenance, authority scope, domain and system context.',
    output:'Traceable candidate constraints and ambiguity log for qualified review.',
    relationships:'Supports Prevent and REG+ specification; does not decide formal admission.',
    maturity:'Exploratory instrument in the REG v0.1 working draft; public executable build and client validation not confirmed.',
    limits:'Translation and lexical matching do not establish normative resolution, admission or production policy.',
    next:'Bring one difficult requirement to a qualified domain and engineering review.',
    nextHref:'/en/contact/',nextLabel:'Discuss a requirement',related:['prevent','technical','discovery','diagnostic'],
    sources:[{label:'REG v0.1 working draft',href:'/en/publications/reg-v0.1/'}]
  },
  gov:{
    id:'gov',kind:'product',title:'TENIR-Gov v5.7.0',tagline:'The execution boundary between what an agent proposes and what becomes real.',
    status:'Released open-source beta · bounded single-host',
    pain:'Agent intent can become consequential external action without explicit authority, duplicate, uncertainty and resumption controls.',
    when:'When a technical team designs an agent-to-provider integration and can validate a specific deployment contract.',
    examines:'Execution admission, ONCE reservation, HOLD, mediated dispatch, decision trace and reconciliation.',
    inputs:'Action schema, versioned profile, identity/authority, idempotency keys, external-provider contract and verified deployment manifest.',
    output:'Scoped local decisions, reservations and reconciliation records—not automatic proof of external provider effects.',
    relationships:'Independent technical route. May embody eligible Prevent controls; Prepare may assess evidence; conformance specifies bounded guarantees.',
    maturity:'GitHub v5.7.0 released 24 October 2026, PyPI published; beta. Bounded single-host deployment profile; customer production deployment not demonstrated.',
    limits:'No multi-host C3 claim; production multi-host Raft blocked (FM-20). No external exactly-once effect or independent certification.',
    next:'Inspect release source and manifest requirements; scope a separate, authorized single-host pilot.',
    nextHref:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',nextLabel:'Read v5.7.0 release',related:['control-tower','technical','prepare','diagnostic'],
    sources:[{label:'v5.7.0 release',href:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0'},{label:'Runtime source',href:'https://github.com/skiredj-prog/tenir_governance'},{label:'Status',href:'/en/status/'}]
  },
  'reg-arch':{
    id:'reg-arch',kind:'foundation',title:'REG-ARCH',tagline:'Connect what is claimed, what is done and what can be represented.',
    status:'Architecture foundation · working specification',
    pain:'Requirements, actions and evidence evolve separately, with no explicit linking of transition states or authorities.',
    when:'When architects need a common language for Claim, Action and Representation lifecycle boundaries.',
    examines:'Objects, transitions, gates and bindings across Claim / Action / Representation lanes.',
    inputs:'Requirements, action/effect states, representation artifacts, responsibilities and assumptions.',
    output:'Conceptual map and typed transition model to compare with versioned source specifications.',
    relationships:'Connects Prevent, Prepare, TENIR-Gov and explanatory experiences; not an additional client offer.',
    maturity:'REG-ARCH v0.4 referenced in project artifacts; authoritative public version and ratification not verified.',
    limits:'An architecture diagram is not an implementation, a successful test or an adopted standard.',
    next:'Inspect illustrative architecture, then verify the appropriate versioned specification with a qualified owner.',
    nextHref:'/en/architecture/',nextLabel:'Review site architecture',related:['technical','experiences','prevent','prepare'],
    sources:[{label:'Illustrative architecture',href:'/en/architecture/'},{label:'REG v0.1',href:'/en/publications/reg-v0.1/'}]
  },
  technical:{
    id:'technical',kind:'foundation',title:'REG+, RFCs & Conformance',tagline:'Inspectable contracts rather than proclaimed guarantees.',
    status:'Public specifications and test tools · scoped evidence',
    pain:'Claims about execution require explicit contracts, configuration hypotheses and reproducible tests.',
    when:'Examining an invariant, profile, test case, deployment assumption or guarantee scope.',
    examines:'RFC-0 to RFC-7, REG+ profiles, configuration compatibility, evidence contracts and scoped tests.',
    inputs:'Versioned contract, assumptions/profile, implementation commit, manifest and applicable test evidence.',
    output:'Specification and candidate profiles, attributable test outcomes and known gaps.',
    relationships:'Supports Translation, Prevent, REG-ARCH and TENIR-Gov; not a separate commercial service.',
    maturity:'Public active repositories; catalogue reports 144 configurations, 42 structurally admissible—not demonstrated effective guarantees.',
    limits:'Structural admissibility is not effective conformance; lab tests are not certification; deployments require manifests.',
    next:'Inspect versioned RFCs, profiles and test artifacts before drawing a conclusion.',
    nextHref:'https://github.com/skiredj-prog/reg-conformance',nextLabel:'Inspect reg-conformance',related:['gov','reg-arch','prepare','translation'],
    sources:[{label:'reg-conformance',href:'https://github.com/skiredj-prog/reg-conformance'},{label:'Conformance page',href:'/en/conformance/'},{label:'REG standard',href:'/en/standard/'}]
  },
  experiences:{
    id:'experiences',kind:'demo',title:'TENIR Labs Experiences',tagline:'Explore a bounded scenario instead of taking the claim on trust.',
    status:'Developing and tested bounded experiences',
    pain:'Decision, reconciliation and evidence concepts are hard to make tangible in a workshop.',
    when:'At first encounter or before discussing a concrete risk or engineering engagement.',
    examines:'Decision Readiness, Execution Timeline and Lifecycle Workbench: scenarios, transitions and limits.',
    inputs:'Explicit, generally fictional scenario assumptions; no production integration.',
    output:'Educational walkthrough, synthetic trace and a focused question to verify elsewhere.',
    relationships:'Illustrates Prevent, Prepare, REG-ARCH or TENIR-Gov; Control Tower is a distinct illustrative experience.',
    maturity:'Project artifacts in development/testing; public-source revisions and deployment of the three named experiences unverified.',
    limits:'No operating-system result, effective conformance demonstration or certification follows from a simulation.',
    next:'Explore an existing public illustrative demo, then inspect source or discuss a real bounded case.',
    nextHref:'/en/architecture/demo/',nextLabel:'Open existing demo',related:['control-tower','reg-arch','gov','diagnostic'],
    sources:[{label:'Existing control-plane demo',href:'/en/architecture/demo/'},{label:'Existing architecture walkthrough',href:'/en/architecture/interactive/'}]
  },
  'control-tower':{
    id:'control-tower',kind:'demo',title:'REG — Autonomy Control Tower v1.0',tagline:'The agent proposes. What happens at the execution boundary?',
    status:'Self-contained interactive simulation · no live kernel',
    pain:'People struggle to separate an agent proposal, authorization, applied local state, external effect and evidence.',
    when:'When exploring governance before discussing a diagnostic, technical pilot or source review.',
    examines:'Four stories: missing authority, authorized action, lost confirmation and a duplicate attempt. Guided trace and fictional dossier.',
    inputs:'Scenario and pace selection only. Fictional data; no login or live-system request.',
    output:'Inspectable synthetic chronology, executive/risk/engineering perspectives and fictional JSON dossier.',
    relationships:'REG-ARCH educational experience. Connects to the Diagnostic or TENIR-Gov documentation; not TENIR-Gov runtime UI.',
    maturity:'Standalone v1.0 HTML supplied and staged in this branch. English interactive labels; FR surrounding explanation. Human and embedding checks required.',
    limits:'No live governor, verified cryptographic ledger, provider settlement, regulatory certification or liability protection. Structural Écart creation remains provisional (D-02).',
    next:'Choose a scenario and start manually. Read its limits, then inspect a real question or the published code.',
    nextHref:'#control-tower-experience',nextLabel:'Start the guided simulation',related:['gov','diagnostic','experiences','reg-arch'],
    sources:[{label:'REG-ARCH architecture',href:'/en/architecture/'},{label:'TENIR-Gov source',href:'https://github.com/skiredj-prog/tenir_governance'}]
  }
}
};
export const portfolioHubs = {
 fr:{
  products:{title:'Produits et instruments',kicker:'TENIR Labs · Produits',description:'Plusieurs outils, une question : quelle frontière devons-nous examiner ?',lede:'Des instruments distincts pour découvrir les hypothèses, traduire des exigences, préparer des contrôles ou gouverner une exécution.',opening:'Quel problème faut-il clarifier ?',intro:'Commencez par un besoin, pas par une technologie. Chaque instrument indique ce qu’il examine, ce qu’il produit et ce qu’il ne démontre pas.',keys:['prevent','prepare','discovery','xray','translation','gov','reg-arch','technical'],linkLabel:'Découvrir cet instrument',spotlight:'Deux démarches REG complémentaires, jamais imposées dans le même ordre.'},
  services:{title:'Services et accompagnement',kicker:'TENIR Labs · Services',description:'Un accompagnement borné qui choisit le bon instrument sans entonnoir obligatoire.',lede:'Partir d’une décision réelle, réunir ce qui est disponible et convenir du prochain contrôle pertinent.',opening:'Une question précise mérite une réponse située.',intro:'Le Diagnostic accompagné est l’offre immédiate. Il sélectionne la démarche adaptée ; vous pouvez aussi explorer directement un produit ou une démonstration.',keys:['diagnostic','prevent','prepare','gov'],linkLabel:'Examiner cette approche',spotlight:'Le premier contact ne nécessite ni installation, ni remise de données sensibles.'},
  demos:{title:'Expériences et démonstrations',kicker:'TENIR Labs · Expériences',description:'Des scénarios interactifs pour comprendre les frontières de décision sans confondre illustration et preuve.',lede:'Regarder une décision, examiner ce qui change, reconnaître ce qui reste inconnu.',opening:'Une bonne démonstration donne envie de poser une meilleure question.',intro:'La Control Tower est mise en avant sans lancement automatique. Les autres expériences offrent des angles complémentaires, avec leur état de maturité visible.',keys:['control-tower','experiences','gov','reg-arch'],linkLabel:'Explorer l’expérience',spotlight:'Fictions, états locaux et dossiers synthétiques : aucune de ces expériences ne certifie un déploiement.'}
 },
 en:{
  products:{title:'Products & instruments',kicker:'TENIR Labs · Products',description:'Different instruments, one useful question: which boundary matters here?',lede:'Separate instruments to surface assumptions, translate requirements, prepare controls or govern execution.',opening:'Which problem needs clarification?',intro:'Start with a need, not a technology. Every instrument states what it examines, produces and does not establish.',keys:['prevent','prepare','discovery','xray','translation','gov','reg-arch','technical'],linkLabel:'Explore this instrument',spotlight:'Two complementary REG approaches, with no mandatory sequence.'},
  services:{title:'Services & guided work',kicker:'TENIR Labs · Services',description:'A bounded engagement that selects relevant instruments instead of forcing a generic funnel.',lede:'Start with a real decision, examine available materials and agree on a defensible next control.',opening:'A specific question deserves a situated answer.',intro:'The Guided Governance Diagnostic is the immediate offer. It selects the appropriate approach; products and demos also remain directly accessible.',keys:['diagnostic','prevent','prepare','gov'],linkLabel:'Explore this approach',spotlight:'Initial contact requires neither installation nor sensitive system access.'},
  demos:{title:'Interactive experiences',kicker:'TENIR Labs · Experiences',description:'Interactive scenarios showing decision boundaries without mistaking illustration for evidence.',lede:'See a decision, inspect what changes, and understand what remains unknown.',opening:'A good demo helps you ask a better question.',intro:'The Control Tower is prominent but never autoplayed. Other experiences provide complementary angles with explicit maturity status.',keys:['control-tower','experiences','gov','reg-arch'],linkLabel:'Explore the experience',spotlight:'Fictional events and synthetic dossiers do not certify a production deployment.'}
 }
} as const;
