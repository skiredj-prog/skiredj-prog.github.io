import type { Locale } from './site';

export interface ReplayEvent {
  id: string;
  label: string;
  action: string;
  status: string;
  state: 'known' | 'unknown';
  knowledge: string;
  actors: string[];
  owner: string;
  pieces: string[];
  impact: string;
  question: string;
  answer: string;
}

// Fictional teaching scenario, not telemetry from a running payment system.
export const replayEvents: Record<Locale, ReplayEvent[]> = {
  fr: [
    {
      id: 'intent', label: 'Intention', status: 'INTENTION', state: 'known',
      action: 'Régler une facture de 1 200 € à Atelier Nord.',
      knowledge: 'L’objectif, le montant et le bénéficiaire sont précisés. Aucun virement n’a encore été envoyé dans ce scénario.',
      actors: ['Agent IA', 'Responsable trésorerie'], owner: 'La responsable trésorerie précise le mandat de l’agent.',
      pieces: ['Facture fictive', 'Montant : 1 200 €', 'Bénéficiaire : Atelier Nord'],
      impact: 'Une intention compréhensible permet d’examiner l’action envisagée.',
      question: 'Une demande claire suffit-elle pour agir ?',
      answer: 'Il faut encore vérifier qui autorise le paiement, sur quel compte et dans quelles limites.',
    },
    {
      id: 'authorization', label: 'Autorisation', status: 'ALLOW', state: 'known',
      action: 'Le paiement est admis dans le périmètre convenu.',
      knowledge: 'La règle du scénario admet ce montant et ce bénéficiaire à cet instant. Elle ne prouve aucun transfert d’argent.',
      actors: ['Responsable trésorerie', 'Moteur de politique'], owner: 'La responsable trésorerie porte le mandat ; le moteur applique la règle configurée.',
      pieces: ['Mandat actif', 'Périmètre autorisé', 'Décision ALLOW datée'],
      impact: 'L’action peut être préparée. Son résultat reste à établir après l’envoi.',
      question: 'Que prouve ALLOW ?',
      answer: 'Une autorisation située dans un contexte. Elle ne prouve ni la réception par la banque ni l’effet du virement.',
    },
    {
      id: 'reservation', label: 'Réservation', status: 'RÉSERVÉ', state: 'known',
      action: 'La tentative reçoit la référence V-042.',
      knowledge: 'Le système local réserve cette référence et la relie à la facture. La banque n’a encore rien confirmé.',
      actors: ['Frontière TENIR', 'Service de paiement'], owner: 'Le service de paiement conserve le lien entre la demande et cette tentative.',
      pieces: ['Référence : V-042', 'Réservation locale', 'Lien avec la facture'],
      impact: 'Les vérifications suivantes peuvent porter sur la même opération.',
      question: 'Une référence empêche-t-elle tous les doublons ?',
      answer: 'Son existence locale ne suffit pas. La protection dépend aussi de la façon dont le système externe reconnaît et traite cette référence.',
    },
    {
      id: 'dispatch', label: 'Commande envoyée', status: 'ENVOYÉ', state: 'known',
      action: 'Le service envoie la commande V-042 à la banque.',
      knowledge: 'Le journal local atteste l’émission. Il n’établit encore ni la réception ni le débit du compte.',
      actors: ['Service de paiement', 'Banque'], owner: 'Le service de paiement suit la demande et attend la réponse de la banque.',
      pieces: ['Commande V-042', 'Heure d’envoi', 'Journal local'],
      impact: 'Une action a quitté le système local ; son effet dépend maintenant du système externe.',
      question: 'Le journal local prouve-t-il que le bénéficiaire est payé ?',
      answer: 'Il prouve l’envoi décrit ici. Il faut une information externe reliée à la même opération pour établir son effet.',
    },
    {
      id: 'lost-response', label: 'Réponse perdue', status: 'UNKNOWN', state: 'unknown',
      action: 'Le délai expire sans confirmation de la banque.',
      knowledge: 'Le service ne sait pas si la commande a été reçue ou exécutée. Le silence ne permet pas de conclure à un échec.',
      actors: ['Banque', 'Service de paiement'], owner: 'Le service de paiement signale l’incertitude à la responsable trésorerie.',
      pieces: ['Commande V-042', 'Délai dépassé', 'Confirmation absente'],
      impact: 'Renvoyer la commande sans vérifier pourrait provoquer un second virement.',
      question: 'Faut-il simplement réessayer ?',
      answer: 'Une nouvelle tentative pourrait répéter un effet déjà produit. La priorité est de rechercher l’état de V-042.',
    },
    {
      id: 'hold', label: 'HOLD', status: 'HOLD', state: 'unknown',
      action: 'La reprise automatique est suspendue.',
      knowledge: 'La décision de suspension est enregistrée. L’effet bancaire reste inconnu : HOLD n’annule pas le premier envoi.',
      actors: ['Frontière TENIR', 'Responsable trésorerie'], owner: 'La responsable trésorerie porte la suite et fixe la prochaine vérification.',
      pieces: ['Décision HOLD', 'Responsable désignée', 'Vérification à 10 h 30'],
      impact: 'Dans ce scénario, aucune seconde commande ne part pendant la recherche.',
      question: 'Qu’est-ce que HOLD protège ici ?',
      answer: 'Il suspend la reprise à cette frontière. Il ne prouve pas que le premier virement a échoué et ne contrôle pas les actions lancées ailleurs.',
    },
    {
      id: 'lookup', label: 'Vérification externe', status: 'RECHERCHE', state: 'unknown',
      action: 'La banque est interrogée sur V-042.',
      knowledge: 'Le premier retour est incomplet : il ne permet pas encore de relier un débit à cette référence.',
      actors: ['Responsable trésorerie', 'Banque'], owner: 'La banque doit préciser l’état externe ; la responsable trésorerie suit la demande.',
      pieces: ['Demande sur V-042', 'Retour bancaire incomplet', 'Trace de recherche'],
      impact: 'Un montant similaire dans un relevé ne suffit pas à confirmer cette opération.',
      question: 'Quelle information ferait avancer la décision ?',
      answer: 'Un état bancaire fiable, relié à V-042, avec le montant, le bénéficiaire et le résultat de l’opération.',
    },
    {
      id: 'reconciliation', label: 'Réconciliation', status: 'HOLD', state: 'unknown',
      action: 'Les traces sont rapprochées ; l’incertitude est documentée.',
      knowledge: 'Les pièces disponibles restent insuffisantes pour établir l’effet. La responsable maintient HOLD et organise la suite de la recherche.',
      actors: ['Responsable trésorerie', 'Banque', 'Bénéficiaire'], owner: 'La responsable trésorerie documente la décision et informe le bénéficiaire du paiement non confirmé.',
      pieces: ['Dossier V-042', 'Effet non démontré', 'Décision de maintien du HOLD'],
      impact: 'La séquence se termine avec une décision attribuée, sans inventer une confirmation bancaire.',
      question: 'Que décider si la preuve arrive plus tard ?',
      answer: 'Rapprocher cette preuve du dossier. Un effet confirmé évite un nouvel envoi ; une absence d’exécution établie permet d’examiner une reprise, avec une autorisation encore valide.',
    },
  ],
  en: [
    {
      id: 'intent', label: 'Intent', status: 'INTENT', state: 'known',
      action: 'Pay a €1,200 invoice to Atelier Nord.',
      knowledge: 'The goal, amount and beneficiary are specified. No transfer has been sent yet in this scenario.',
      actors: ['AI agent', 'Treasury owner'], owner: 'The treasury owner defines the agent’s mandate.',
      pieces: ['Fictional invoice', 'Amount: €1,200', 'Beneficiary: Atelier Nord'],
      impact: 'A clear intent makes the proposed action possible to examine.',
      question: 'Is a clear request enough to act?',
      answer: 'Who authorizes the payment, from which account and within which limits still needs to be checked.',
    },
    {
      id: 'authorization', label: 'Authorization', status: 'ALLOW', state: 'known',
      action: 'The payment is admitted within the agreed scope.',
      knowledge: 'The scenario’s policy admits this amount and beneficiary at this time. It proves no movement of money.',
      actors: ['Treasury owner', 'Policy engine'], owner: 'The treasury owner holds the mandate; the engine applies the configured policy.',
      pieces: ['Active mandate', 'Authorized scope', 'Dated ALLOW decision'],
      impact: 'The action can be prepared. Its result must still be established after dispatch.',
      question: 'What does ALLOW prove?',
      answer: 'Authorization within a particular context. It proves neither receipt by the bank nor the transfer’s effect.',
    },
    {
      id: 'reservation', label: 'Reservation', status: 'RESERVED', state: 'known',
      action: 'The attempt receives reference V-042.',
      knowledge: 'The local system reserves this reference and links it to the invoice. The bank has confirmed nothing yet.',
      actors: ['TENIR boundary', 'Payment service'], owner: 'The payment service keeps the link between the request and this attempt.',
      pieces: ['Reference: V-042', 'Local reservation', 'Invoice link'],
      impact: 'Later checks can refer to the same operation.',
      question: 'Does a reference prevent every duplicate?',
      answer: 'A local reference alone is insufficient. Protection also depends on how the external system recognizes and handles that reference.',
    },
    {
      id: 'dispatch', label: 'Command sent', status: 'SENT', state: 'known',
      action: 'The service sends command V-042 to the bank.',
      knowledge: 'The local log records dispatch. It does not yet establish receipt or a debit to the account.',
      actors: ['Payment service', 'Bank'], owner: 'The payment service tracks the request and awaits the bank’s response.',
      pieces: ['Command V-042', 'Dispatch time', 'Local log'],
      impact: 'An action has left the local system; its effect now depends on the external system.',
      question: 'Does the local log prove the beneficiary has been paid?',
      answer: 'It proves the dispatch described here. External information linked to the same operation is needed to establish its effect.',
    },
    {
      id: 'lost-response', label: 'Lost response', status: 'UNKNOWN', state: 'unknown',
      action: 'The timeout expires without bank confirmation.',
      knowledge: 'The service does not know whether the command was received or executed. Silence does not establish failure.',
      actors: ['Bank', 'Payment service'], owner: 'The payment service reports the uncertainty to the treasury owner.',
      pieces: ['Command V-042', 'Timeout exceeded', 'Missing confirmation'],
      impact: 'Sending the command again without checking could cause a second transfer.',
      question: 'Should it simply retry?',
      answer: 'Another attempt could repeat an effect that already happened. The priority is to look up V-042’s state.',
    },
    {
      id: 'hold', label: 'HOLD', status: 'HOLD', state: 'unknown',
      action: 'Automatic retry is paused.',
      knowledge: 'The pause decision is recorded. The banking effect remains unknown: HOLD does not cancel the first dispatch.',
      actors: ['TENIR boundary', 'Treasury owner'], owner: 'The treasury owner owns the next step and sets the next check.',
      pieces: ['HOLD decision', 'Named owner', 'Check at 10:30'],
      impact: 'In this scenario, no second command is sent during the lookup.',
      question: 'What does HOLD protect here?',
      answer: 'It pauses retries at this boundary. It does not prove the first transfer failed or control actions launched elsewhere.',
    },
    {
      id: 'lookup', label: 'External lookup', status: 'LOOKUP', state: 'unknown',
      action: 'The bank is asked about V-042.',
      knowledge: 'The first response is incomplete: it does not yet link a debit to this reference.',
      actors: ['Treasury owner', 'Bank'], owner: 'The bank must clarify external state; the treasury owner follows up.',
      pieces: ['V-042 inquiry', 'Incomplete bank response', 'Lookup trace'],
      impact: 'A similar amount on a statement is insufficient to confirm this operation.',
      question: 'Which information would move the decision forward?',
      answer: 'A reliable bank state linked to V-042, with the amount, beneficiary and operation result.',
    },
    {
      id: 'reconciliation', label: 'Reconciliation', status: 'HOLD', state: 'unknown',
      action: 'The traces are compared and uncertainty is documented.',
      knowledge: 'The available evidence still does not establish the effect. The owner keeps HOLD in place and arranges further checks.',
      actors: ['Treasury owner', 'Bank', 'Beneficiary'], owner: 'The treasury owner records the decision and tells the beneficiary the payment remains unconfirmed.',
      pieces: ['V-042 record', 'Effect not demonstrated', 'Decision to maintain HOLD'],
      impact: 'The sequence ends with an owned decision, without inventing bank confirmation.',
      question: 'What if evidence arrives later?',
      answer: 'Reconcile it with the record. A confirmed effect avoids another dispatch; established non-execution allows a retry to be considered, with authorization that is still valid.',
    },
  ],
};
