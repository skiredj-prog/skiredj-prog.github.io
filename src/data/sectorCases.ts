export interface SectorCase {
  id: string;
  locale: 'fr' | 'en';
  title: string;
  kicker: string;
  description: string;
  lede: string;
  sourceNote: string;
  scenario: string;
  affected: string[];
  sequence: { step: string; label: string; detail: string; risk: string }[];
  players: { role: string; responsibility: string; evidence: string }[];
  invariants: { id: string; title: string; rule: string; failure: string }[];
  layers: { label: string; detail: string }[];
  verdicts: { label: string; meaning: string }[];
}

export const sectorCases: Record<string, SectorCase> = {
  'banque-assurance': {
    id: 'banque-assurance',
    locale: 'fr',
    title: 'Banque & assurance',
    kicker: 'Carte sectorielle maître · gouvernance d’un virement ambigu',
    description: 'Modèle de carte sectorielle pour reconstituer les responsabilités, les transitions et les preuves autour d’un flux bancaire critique.',
    lede: 'Un virement peut être autorisé sans que son effet externe soit confirmé. C’est dans cet intervalle que la responsabilité doit tenir.',
    sourceNote: 'Modèle pédagogique TENIR Labs · DORA / EU AI Act à qualifier selon le périmètre · aucun règlement bancaire réel démontré.',
    scenario: 'Ordre de paiement PAY-MAR-001 transmis à un fournisseur externe ; une interruption réseau empêche le retour de confirmation.',
    affected: ['Client / titulaire du compte', 'Bénéficiaire', 'Banque ou fintech', 'Équipe opérations', 'Risque et conformité', 'Fournisseur de règlement'],
    sequence: [
      { step: '01', label: 'Cadrage', detail: 'Périmètre, sources et propriétaires métier / technique.', risk: 'Une question trop large produit une preuve inutilisable.' },
      { step: '02', label: 'Intention', detail: 'L’agent prépare ou propose le virement.', risk: 'Intention légitime ≠ autorisation de toute méthode.' },
      { step: '03', label: 'Admission', detail: 'Le moteur de contrôle applique les règles d’admission.', risk: 'Autorisation ≠ sûreté ni effet externe.' },
      { step: '04', label: 'Commande', detail: 'La demande est envoyée au système de règlement.', risk: 'La frontière entre décision et effet est franchie.' },
      { step: '05', label: 'Réponse perdue', detail: 'Le fournisseur peut avoir reçu la demande ; le canal de retour est interrompu.', risk: 'Le résultat devient UNKNOWN.' },
      { step: '06', label: 'HOLD', detail: 'La réémission automatique est bloquée.', risk: 'Un timeout ne doit jamais autoriser une reprise par défaut.' },
      { step: '07', label: 'Réconciliation', detail: 'L’état externe est recherché avant toute suite.', risk: 'Sans preuve suffisante, l’effet reste non démontré.' },
    ],
    players: [
      { role: 'Agent IA', responsibility: 'Prépare ou propose la trajectoire.', evidence: 'Intention, version, contexte et outils sollicités.' },
      { role: 'Moteur de contrôle', responsibility: 'Applique les règles d’admission.', evidence: 'Politique active, autorité, epoch et décision.' },
      { role: 'Système de règlement', responsibility: 'Représente le fournisseur externe.', evidence: 'Réception, état de l’opération et identifiant externe.' },
      { role: 'Opérateur', responsibility: 'Intervient quand l’état reste ambigu.', evidence: 'Responsable, échéance, décision et motif d’escalade.' },
      { role: 'Banque / fintech', responsibility: 'Porte le cadre organisationnel et la réponse au client.', evidence: 'Mandat, procédures, réconciliation et réparation.' },
      { role: 'Personne impactée', responsibility: 'Subit, conteste ou attend l’effet.', evidence: 'Information compréhensible, voie de recours et réponse traçable.' },
    ],
    invariants: [
      { id: 'INV-BANK-01', title: 'Reprise sous incertitude', rule: 'Aucune nouvelle tentative susceptible de reproduire l’effet sans preuve de non-exécution ou idempotence qualifiée.', failure: 'Double règlement pour une seule intention.' },
      { id: 'INV-BANK-02', title: 'Traçabilité du HOLD', rule: 'Conserver opération, tentative, cause, responsable, échéance et transitions.', failure: 'Une suspension sans propriétaire devient une dette invisible.' },
      { id: 'INV-BANK-03', title: 'Autorité d’exécution', rule: 'L’effet doit être lié à une autorité active, son epoch et ses conditions de consommation.', failure: 'Un reçu de décision est pris pour une preuve d’effet externe.' },
    ],
    layers: [
      { label: '1 · Légitimité', detail: 'Cadre, mandat, règles métier et périmètre réglementaire.' },
      { label: '2 · Gouvernance', detail: 'Rôles, permissions, propriétaires et politique d’escalade.' },
      { label: '3 · Protection runtime', detail: 'Interception, idempotence, séparation et statut HOLD.' },
      { label: '4 · Réconciliation', detail: 'Vérification factuelle auprès du système tiers.' },
      { label: '5 · Preuve & réparation', detail: 'Dossier, recours, responsabilité et correction de l’effet.' },
    ],
    verdicts: [
      { label: '[ACCEPT]', meaning: 'Fonctionnement démontré dans le périmètre de test défini.' },
      { label: '[HOLD]', meaning: 'Ambiguïté d’état : arrêt et réconciliation obligatoires.' },
      { label: '[NON DÉMONTRÉ]', meaning: 'La preuve disponible ne permet pas de conclure sur la non-répétition ou l’effet externe.' },
    ],
  },
  'transport-mobilite': {
    id: 'transport-mobilite',
    locale: 'fr',
    title: 'Transport & mobilité critique',
    kicker: 'Carte sectorielle · gouvernance d’une décision de trajectoire',
    description: 'Déclinaison du modèle de frontière d’exécution pour le transport aérien, la régulation ferroviaire et la gestion de flotte autonome.',
    lede: 'Dans un système de transport critique, une réponse absente ne constitue jamais une preuve d’absence d’effet.',
    sourceNote: 'Matrice pédagogique TENIR Labs · domaines aérien, ferroviaire et flotte autonome à qualifier selon le système concerné · ne constitue pas une certification de sûreté.',
    scenario: 'Une perturbation météo, un retard en chaîne ou un encombrement pousse un agent à modifier un plan de vol, réallouer un slot ou réordonner une séquence d’aiguillage.',
    affected: ['Passagers et usagers', 'Équipage et opérateur', 'Contrôleur ou aiguilleur', 'Gestionnaire d’infrastructure', 'Système de trafic', 'Régulateur de sûreté'],
    sequence: [
      { step: '01', label: 'Intention', detail: 'L’agent identifie une perturbation et propose une modification.', risk: 'Une intention naturelle n’est pas encore un ordre physique.' },
      { step: '02', label: 'Admission', detail: 'Autorité active, règles d’exploitation et marges de sécurité.', risk: 'Une action utile peut dépasser les habilitations ou les séparations minimales.' },
      { step: '03', label: 'Commande', detail: 'API de régulation ou ordre de modification avec clé unique.', risk: 'Une clé absente ouvre la voie aux ordres contradictoires.' },
      { step: '04', label: 'Système critique', detail: 'ATC, signalisation, gestionnaire de flotte ou infrastructure.', risk: 'L’effet modifie l’ordonnancement physique réel.' },
      { step: '05', label: 'Réponse ambiguë', detail: 'ACK perdu via ACARS, GSM-R, 5G-V2X ou réseau sol.', risk: 'Le rejeu aveugle peut créer un conflit de trajectoire.' },
      { step: '06', label: 'HOLD', detail: 'Gel de la décision sous statut UNKNOWN STATE.', risk: 'Le timeout ne peut pas être interprété comme un échec.' },
      { step: '07', label: 'Réconciliation', detail: 'Capteurs, radar, télémétrie ou registre d’infrastructure.', risk: 'Sans attestation de l’état réel, la reprise reste interdite.' },
      { step: '08', label: 'Sortie', detail: 'ACCEPT, RETRY contrôlé, déviation ou arrêt.', risk: 'L’ambiguïté persistante impose l’escalade humaine.' },
    ],
    players: [
      { role: 'Agent IA', responsibility: 'Détecte une perturbation et propose une trajectoire.', evidence: 'Contexte, intention, modèle, outils et clé d’exécution.' },
      { role: 'Porte G-03', responsibility: 'Vérifie l’autorité et les contraintes de sécurité.', evidence: 'Habilitation, zone, marges de séparation et politique active.' },
      { role: 'Porte G-06 ONCE', responsibility: 'Associe la commande à une exécution unique.', evidence: 'Identifiant immuable et contrat d’idempotence.' },
      { role: 'Système critique', responsibility: 'Reçoit ou applique l’ordre sur l’infrastructure.', evidence: 'Accusé de réception, état inscrit et journal système.' },
      { role: 'Opérateur humain', responsibility: 'Décide en procédure dégradée si l’état reste ambigu.', evidence: 'Escalade, décision, heure, motif et sortie de HOLD.' },
      { role: 'Usager impacté', responsibility: 'Subit le retard, la déviation ou la décision de sécurité.', evidence: 'Information, continuité de service et voie de recours.' },
    ],
    invariants: [
      { id: 'INV-TRANS-01', title: 'Reprise sous incertitude', rule: 'Aucune nouvelle commande sans attestation de l’état réel de l’infrastructure.', failure: 'Deux ordres contradictoires ou une trajectoire incohérente.' },
      { id: 'INV-TRANS-02', title: 'Traçabilité du HOLD', rule: 'L’agent ne peut pas déduire l’échec ni réémettre aveuglément une commande ambiguë.', failure: 'Le système repart sans savoir ce qui s’est produit.' },
      { id: 'INV-TRANS-03', title: 'Escalade de sûreté', rule: 'Une ambiguïté persistante déclenche une procédure dégradée et un opérateur habilité.', failure: 'La décision critique reste dans une boucle autonome sans sortie sûre.' },
    ],
    layers: [
      { label: '1 · Sûreté', detail: 'Contraintes d’exploitation, séparation et habilitations.' },
      { label: '2 · Admission', detail: 'Autorité active, zone, fenêtre et politique de décision.' },
      { label: '3 · Exécution unique', detail: 'Clé immuable, idempotence et contrôle runtime.' },
      { label: '4 · État réel', detail: 'Radar, capteur, télémétrie ou registre d’infrastructure.' },
      { label: '5 · Dégradé', detail: 'Déviation, arrêt, contrôleur humain et réparation.' },
    ],
    verdicts: [
      { label: '[ACCEPT]', meaning: 'L’ordre est confirmé comme appliqué et l’état local est mis à jour.' },
      { label: '[RETRY]', meaning: 'La non-réception est démontrée et la même clé d’exécution protège la reprise.' },
      { label: '[DEVIATION / ARRÊT]', meaning: 'L’ambiguïté persiste : procédure dégradée et escalade immédiate.' },
    ],
  },
};


/**
 * English editorial counterparts. The original maps are FR source objects;
 * rendering those in an English article would mix languages and mislead readers.
 * These remain FICTIONAL sector models, not descriptions of deployed systems.
 */
export const sectorCasesEn: Record<string, SectorCase> = {
  'banque-assurance': {
    ...sectorCases['banque-assurance'],
    locale: 'en',
    title: 'Banking & insurance',
    kicker: 'Illustrative sector map · uncertain payment settlement',
    description: 'A teaching model for responsibilities, transitions and evidence around a consequential payment.',
    lede: 'A transfer may be authorized without its external effect being confirmed. Accountability must remain clear during that uncertainty.',
    sourceNote: 'Fictional TENIR Labs teaching model · DORA/EU AI Act applicability depends on the particular system · no real settlement or banking integration demonstrated.',
    scenario: 'Fictional PAY-MAR-001 payment instruction sent to an external provider; a network interruption prevents confirmation.',
    affected: ['Account holder','Beneficiary','Bank or fintech','Operations team','Risk and compliance','Payment provider'],
    sequence: [
      {step:'01',label:'Scope',detail:'Define boundaries, information sources, and business/technical owners.',risk:'An overly broad question cannot produce usable evidence.'},
      {step:'02',label:'Intention',detail:'The AI agent prepares or proposes the transfer.',risk:'A legitimate goal does not authorize every available method.'},
      {step:'03',label:'Admission',detail:'A policy service evaluates applicable rules.',risk:'Admission is neither a guarantee of safety nor confirmation of effect.'},
      {step:'04',label:'Command',detail:'The request reaches the external payment service.',risk:'The decision crosses into the world of external effects.'},
      {step:'05',label:'Lost response',detail:'The provider may have received the command; its acknowledgement is lost.',risk:'The result is UNKNOWN.'},
      {step:'06',label:'HOLD',detail:'A blind automatic retry is paused.',risk:'A timeout is not proof that the first attempt failed.'},
      {step:'07',label:'Reconciliation',detail:'Seek the provider’s actual recorded state before further action.',risk:'Without sufficient evidence, the effect remains unconfirmed.'},
    ],
    players: [
      {role:'AI agent',responsibility:'Prepares or proposes an action.',evidence:'Intent, version, context and requested tools.'},
      {role:'Control service',responsibility:'Evaluates applicable admission rules.',evidence:'Active policy, authority, epoch and verdict.'},
      {role:'Payment provider',responsibility:'Receives or processes an external request.',evidence:'Receipt, transaction status and external identifier.'},
      {role:'Human operator',responsibility:'Intervenes when the state remains ambiguous.',evidence:'Named owner, deadline, decision and escalation basis.'},
      {role:'Bank / fintech',responsibility:'Owns the organizational response to the customer.',evidence:'Mandate, procedures, reconciliation and remediation.'},
      {role:'Affected person',responsibility:'Experiences, challenges or waits for the effect.',evidence:'Clear information, complaint channel and attributable response.'},
    ],
    invariants: [
      {id:'INV-BANK-01',title:'Retry under uncertainty',rule:'No action that can repeat the effect without proven non-execution or qualified idempotence.',failure:'Two settlements for one intention.'},
      {id:'INV-BANK-02',title:'Accountable HOLD',rule:'Preserve operation, attempt, cause, owner, deadline and transitions.',failure:'An ownerless pause becomes invisible operational debt.'},
      {id:'INV-BANK-03',title:'Execution authority',rule:'Tie the action to an active authority, epoch and consumption rules.',failure:'A decision receipt is mistaken for an external effect receipt.'},
    ],
    layers: [
      {label:'1 · Legitimacy',detail:'Mandate, business rules and applicable regulatory scope.'},
      {label:'2 · Governance',detail:'Permissions, accountable owners and escalation rules.'},
      {label:'3 · Runtime safeguards',detail:'Interception, idempotence and HOLD state.'},
      {label:'4 · Reconciliation',detail:'Evidence about the third-party system’s actual state.'},
      {label:'5 · Evidence & remedy',detail:'Records, complaints, accountability and remediation.'},
    ],
    verdicts: [
      {label:'[ACCEPT]',meaning:'Behavior demonstrated only within the defined test scope.'},
      {label:'[HOLD]',meaning:'Ambiguous state: pause and reconcile before a new attempt.'},
      {label:'[NOT DEMONSTRATED]',meaning:'Available evidence cannot establish non-repetition or external effect.'},
    ],
  },
  'transport-mobilite': {
    ...sectorCases['transport-mobilite'],
    locale: 'en',
    title: 'Transport & critical mobility',
    kicker: 'Illustrative sector map · schedule or trajectory changes',
    description: 'Teaching model for aviation, rail control and autonomous fleets; their real authorization systems differ.',
    lede: 'Within a critical transport system, missing acknowledgement does not prove an action had no effect.',
    sourceNote: 'Fictional TENIR Labs teaching matrix. Aviation, rail and fleet scenarios require distinct expert qualification; NOT a deployed controller, safety certification, or claim of aviation system access.',
    scenario: 'A weather disruption, cascading delay or traffic bottleneck motivates a proposed change to a schedule or routing plan in a hypothetical system.',
    affected: ['Passengers','Crew and operator','Controller or dispatcher','Infrastructure owner','Traffic system','Safety authority'],
    sequence: [
      {step:'01',label:'Intention',detail:'The agent detects an issue and proposes a revised plan.',risk:'A useful suggestion is not yet a physical-world command.'},
      {step:'02',label:'Admission',detail:'The responsible system checks authority and operational margins.',risk:'A useful change may still exceed a permission or safety limit.'},
      {step:'03',label:'Command',detail:'An authorized system issues a uniquely identified instruction.',risk:'Poor identity management can create conflicting commands.'},
      {step:'04',label:'Critical system',detail:'An infrastructure or scheduling system processes the instruction.',risk:'Consequences may reach real operational schedules or routes.'},
      {step:'05',label:'Ambiguous response',detail:'Network disruption obscures the confirmation of the instruction.',risk:'A blind replay may conflict with an existing command.'},
      {step:'06',label:'HOLD',detail:'New automated attempts stop while the state is UNKNOWN.',risk:'A timeout must not be treated as proof of failure.'},
      {step:'07',label:'Reconciliation',detail:'Authorized operators consult state from appropriate systems.',risk:'Without credible state evidence, a retry remains unsafe.'},
      {step:'08',label:'Resolution',detail:'Proceed, safely recover or escalate to an authorized human.',risk:'Persistent ambiguity requires a qualified fallback procedure.'},
    ],
    players: [
      {role:'AI agent',responsibility:'Detects a disruption and suggests a revised plan.',evidence:'Context, version, intention and tools requested.'},
      {role:'Authorization layer',responsibility:'Checks operating authority and safety margins.',evidence:'Permissions, geographic scope, conditions and active policy.'},
      {role:'Once-only control',responsibility:'Correlates a command with a unique operation identity.',evidence:'Stable operation identifier and idempotence assumptions.'},
      {role:'Critical system',responsibility:'Receives or carries out a command.',evidence:'Acknowledgement, recorded state and operational log.'},
      {role:'Qualified human operator',responsibility:'Handles degraded operation when the state remains unclear.',evidence:'Escalation path, timestamp, decision and reason.'},
      {role:'Affected traveler',responsibility:'Faces a delay, rerouting or safety decision.',evidence:'Service information, continuity and avenues for redress.'},
    ],
    invariants: [
      {id:'INV-TRANS-01',title:'Retry under uncertainty',rule:'No new operational instruction without a credible account of the current state.',failure:'Conflicting commands or inconsistent routing.'},
      {id:'INV-TRANS-02',title:'Accountable HOLD',rule:'Do not infer failure or resend while completion remains ambiguous.',failure:'A system resumes without knowing what already happened.'},
      {id:'INV-TRANS-03',title:'Safety escalation',rule:'Persistent uncertainty leads to a qualified degraded-mode procedure.',failure:'Critical activity remains trapped in an uncontrolled autonomous loop.'},
    ],
    layers: [
      {label:'1 · Safety',detail:'Operating constraints, margins and qualified permissions.'},
      {label:'2 · Admission',detail:'Current authority, scope, time window and active policy.'},
      {label:'3 · Single operation',detail:'Stable identity, idempotence and runtime checks.'},
      {label:'4 · Actual state',detail:'Reliable infrastructure and operational evidence.'},
      {label:'5 · Degraded operation',detail:'Fallback, qualified human control and repair.'},
    ],
    verdicts: [
      {label:'[ACCEPT]',meaning:'Instruction and external state demonstrably aligned within the test scope.'},
      {label:'[RETRY]',meaning:'Non-receipt established and a controlled retry authorized.'},
      {label:'[DEVIATE / STOP]',meaning:'Uncertainty persists: apply fallback procedure and escalate.'},
    ],
  },
};
