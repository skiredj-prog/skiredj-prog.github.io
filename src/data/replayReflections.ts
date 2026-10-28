import type { Locale } from './site';

export interface ReplayReflection {
  choices: { id: string; label: string; feedback: string }[];
}

export const replayReflections: Record<Locale, Partial<Record<string, ReplayReflection>>> = {
  fr: {
    authorization: { choices: [
      { id: 'permission', label: 'L’action est autorisée dans ce cadre.', feedback: 'C’est ce que permet de dire ALLOW ici : une permission, pour ce montant et ce bénéficiaire, à cet instant. L’envoi et le résultat sont encore à établir.' },
      { id: 'receipt', label: 'La banque a reçu la demande.', feedback: 'La décision locale ne dit pas encore ce que la banque a reçu. Il faut une trace du système externe pour établir la réception.' },
      { id: 'effect', label: 'Le bénéficiaire a été payé.', feedback: 'Une permission ne montre pas le mouvement d’argent. Pour parler de paiement réalisé, il faut établir l’effet externe de cette opération.' },
    ] },
    'lost-response': { choices: [
      { id: 'retry', label: 'Renvoyer immédiatement la commande.', feedback: 'Le premier envoi a peut-être déjà produit son effet. Une reprise sans vérification pourrait payer deux fois ; la référence V-042 permet de porter la recherche sur la même opération.' },
      { id: 'lookup', label: 'Chercher l’état de V-042 avant une reprise.', feedback: 'La recherche permet d’avancer sans transformer le silence en verdict. Dans ce scénario, HOLD suspend la reprise pendant que la responsable interroge la banque.' },
      { id: 'failure', label: 'Classer le virement comme échoué.', feedback: 'La confirmation manque, mais l’échec n’est pas établi. Il reste possible que la banque ait exécuté V-042 sans que sa réponse soit parvenue au service.' },
    ] },
    lookup: { choices: [
      { id: 'local-log', label: 'Le journal local indique « commande envoyée ».', feedback: 'Cette pièce décrit l’émission locale. Elle ne montre pas encore la réception ni le résultat enregistré à la banque.' },
      { id: 'bank-state', label: 'La banque fournit l’état de V-042, son montant, son bénéficiaire et son résultat.', feedback: 'Cette pièce permet de rapprocher l’état externe de la demande précise, si la source est fiable. Le résultat peut confirmer une exécution, une non-exécution ou un traitement encore en cours : la suite dépend de ce qu’il établit.' },
      { id: 'same-amount', label: 'Un relevé contient un débit du même montant.', feedback: 'Le montant seul peut correspondre à une autre opération. Il manque le lien avec V-042 et son bénéficiaire pour conclure sur cette demande.' },
    ] },
  },
  en: {
    authorization: { choices: [
      { id: 'permission', label: 'The action is authorized within this scope.', feedback: 'That is what ALLOW establishes here: permission for this amount and beneficiary at this time. Dispatch and the result still need to be established.' },
      { id: 'receipt', label: 'The bank has received the request.', feedback: 'The local decision does not yet tell us what the bank received. Evidence from the external system is needed to establish receipt.' },
      { id: 'effect', label: 'The beneficiary has been paid.', feedback: 'Permission does not show money moving. To describe a completed payment, the external effect of this operation must be established.' },
    ] },
    'lost-response': { choices: [
      { id: 'retry', label: 'Send the command again immediately.', feedback: 'The first dispatch may already have produced its effect. Retrying without checking could pay twice; reference V-042 lets the lookup concern the same operation.' },
      { id: 'lookup', label: 'Look up V-042 before retrying.', feedback: 'The lookup moves things forward without turning silence into a verdict. In this scenario, HOLD pauses retry while the treasury owner contacts the bank.' },
      { id: 'failure', label: 'Mark the transfer as failed.', feedback: 'Confirmation is missing, but failure is not established. The bank may have executed V-042 without its response reaching the service.' },
    ] },
    lookup: { choices: [
      { id: 'local-log', label: 'The local log says “command sent”.', feedback: 'This evidence describes local dispatch. It does not yet show receipt or the result recorded by the bank.' },
      { id: 'bank-state', label: 'The bank provides V-042’s state, amount, beneficiary and result.', feedback: 'This evidence links external state to the specific request, if the source is reliable. The result may establish execution, non-execution or ongoing processing: what happens next depends on what it establishes.' },
      { id: 'same-amount', label: 'A statement contains a debit for the same amount.', feedback: 'The amount alone could match another operation. The link to V-042 and its beneficiary is still needed to reach a conclusion about this request.' },
    ] },
  },
};
