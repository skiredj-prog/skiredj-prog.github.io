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
};
