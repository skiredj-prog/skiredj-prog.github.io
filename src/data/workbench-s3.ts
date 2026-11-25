// Documentary design for a continuity path. Not a runtime, not a control.
// Pinned to skiredj-prog/tenir_governance v5.7.6.

export const pin = {
  repo: "skiredj-prog/tenir_governance",
  tag: "v5.7.6",
  commit: "1881c90bb33a0cf1218df5381698c4e3c8dd4df2",
} as const;

const blob = (path: string) =>
  `https://github.com/${pin.repo}/blob/${pin.commit}/${path}`;

export interface Localized { fr: string; en: string }
export interface Citation { file: string; symbol: string; url: string }

export interface Continuity {
  /** Field that identifies the operation. Never a made-up record. */
  operationIdentity: string;
  registryState: string;
  evidenceOnRecord: string;
  recordExists: boolean;
}

export interface PathStep {
  id: string;
  title: Localized;
  verified: boolean;
  citation: Citation | null;
  reading: Localized;
  gap: Localized | null;
  continuity: Continuity;
}

export interface DelegateRow {
  responsibility: Localized;
  investigate: Localized;
  decide: Localized;
  runtimeExecutes: { symbol: string; text: Localized };
}

export interface ClosureLevel {
  id: "task" | "operational" | "external";
  verified: boolean;
  title: Localized;
  text: Localized;
}

export interface BoundaryItem {
  id: string;
  verified: boolean;
  text: Localized;
}

export interface EvpInput {
  name: string;
  verified: boolean;
  source: string | null;
  note: Localized;
}

const cite = (file: string, symbol: string): Citation => ({ file, symbol, url: blob(file) });

export const rules: Localized = {
  fr: "Déléguer la résolution d’une exception, jamais une autorité au-delà du mandat. Le Workbench coordonne. Le runtime gouverne.",
  en: "Delegate exception resolution, never authority beyond the mandate. The Workbench coordinates. The runtime governs.",
};

export const steps: readonly PathStep[] = [
  {
    id: "unknown",
    title: { fr: "UNKNOWN", en: "UNKNOWN" },
    verified: true,
    citation: cite("tenir_governance/operations/registry.py", "OperationState.UNKNOWN"),
    reading: {
      fr: "OperationState.UNKNOWN vaut \"unknown\". resume_existing dit : résultat incertain, revue humaine, ne pas renvoyer. Un appel fournisseur ambigu ou expiré, dans dispatch_and_execute, passe à UNKNOWN.",
      en: "OperationState.UNKNOWN is \"unknown\". resume_existing says: outcome uncertain, human review, do not resend. An ambiguous or timed-out provider call, in dispatch_and_execute, moves to UNKNOWN.",
    },
    gap: {
      fr: "Le corps de la réponse fournisseur n’est pas un champ de l’enregistrement. Seul l’état UNKNOWN est là.",
      en: "The provider response body is not a field of the record. Only the UNKNOWN state is there.",
    },
    continuity: {
      operationIdentity: "idempotency_key",
      registryState: "UNKNOWN",
      evidenceOnRecord: "OperationRecord.state",
      recordExists: true,
    },
  },
  {
    id: "reconciliation",
    title: { fr: "Réconciliation", en: "Reconciliation" },
    verified: true,
    citation: cite("tenir_governance/composition/governor.py", "DualKernelGovernor.reconcile_unknown"),
    reading: {
      fr: "reconcile_unknown(idempotency_key) ne traite que UNKNOWN ou DISPATCHING. Sans fournisseur configuré, le résultat est reconciled=False et recommendation=\"human_review\". Avec un fournisseur, le code interroge sa réconciliation. Ce n’est pas une qualification d’E1.",
      en: "reconcile_unknown(idempotency_key) accepts only UNKNOWN or DISPATCHING. With no provider configured, the result is reconciled=False and recommendation=\"human_review\". With a provider, the code asks it to reconcile. That is not an E1 qualification.",
    },
    gap: {
      fr: "tenir-gov-scope.md exclut l’extériorité E1 (réconciliation fournisseur) du runtime de la voie B. Le contrat peut exister dans le gouverneur sans que cette exclusion soit levée.",
      en: "tenir-gov-scope.md excludes exteriority E1 (provider reconciliation) from the Lane B runtime. The contract can exist on the governor without that exclusion being lifted.",
    },
    continuity: {
      operationIdentity: "idempotency_key",
      registryState: "UNKNOWN | DISPATCHING",
      evidenceOnRecord: "provider reconcile() result only when a provider is configured; otherwise none",
      recordExists: true,
    },
  },
  {
    id: "assignment",
    title: { fr: "Affectation", en: "Assignment" },
    verified: false,
    citation: null,
    reading: {
      fr: "Aucune classe ni enregistrement durable nommé Assignment n’a été trouvé dans le commit épinglé. Non vérifié comme objet du runtime.",
      en: "No class or durable record named Assignment was found at the pinned commit. Not verified as a runtime object.",
    },
    gap: {
      fr: "Une affectation devrait s’attacher à un enregistrement déjà durable et vérifiable (la clé d’idempotence d’OperationRecord). Ce lien n’existe pas dans l’arbre lu.",
      en: "An assignment would have to attach to a record that is already durable and verifiable (an OperationRecord idempotency key). That link is not in the tree that was read.",
    },
    continuity: {
      operationIdentity: "idempotency_key",
      registryState: "not found",
      evidenceOnRecord: "not found",
      recordExists: false,
    },
  },
  {
    id: "evidence",
    title: { fr: "Pièce", en: "Evidence" },
    verified: true,
    citation: cite("tenir_governance/composition/governor.py", "DualKernelGovernor.resolve_hold"),
    reading: {
      fr: "resolve_hold rejoue l’adjudication d’une opération HOLD avec de nouvelles mesures (pression, capacité, option_space, et les autres arguments). Le passage et le payload doivent correspondre à l’enregistrement. Il n’y a pas, dans cette lecture, d’objet séparé « demande de pièce ».",
      en: "resolve_hold re-adjudicates a HOLD operation with new measures (pressure, capacity, option_space, and the other arguments). The passage and the payload must match the record. This reading found no separate “evidence request” object.",
    },
    gap: {
      fr: "La demande de pièce, comme enregistrement attaché, n’a pas été trouvée. Non vérifié.",
      en: "An evidence request, as an attached record, was not found. Not verified.",
    },
    continuity: {
      operationIdentity: "idempotency_key",
      registryState: "HOLD",
      evidenceOnRecord: "caller arguments of resolve_hold; no stored evidence-request record",
      recordExists: true,
    },
  },
  {
    id: "authorised-decision",
    title: { fr: "Décision autorisée", en: "Authorised decision" },
    verified: true,
    citation: cite("tenir_governance/operations/hold.py", "HoldManager.authorize_exit"),
    reading: {
      fr: "DualKernelGovernor.authorize_exit appelle HoldManager.authorize_exit. Le corps vérifié passe de ESCALATED à HOLD si approve est vrai (nouvelle adjudication ensuite), ou à FAILED si approve est faux, avec execution_record CONFIRMED_NONEXECUTION. La docstring du gouverneur qui dit RESERVED ne correspond pas à ce corps. Cette page ne rend aucun contrôle.",
      en: "DualKernelGovernor.authorize_exit calls HoldManager.authorize_exit. The verified body moves from ESCALATED to HOLD when approve is true (a fresh adjudication follows), or to FAILED when approve is false, with execution_record CONFIRMED_NONEXECUTION. The governor docstring that says RESERVED does not match that body. This page renders no control.",
    },
    gap: {
      fr: "La docstring de DualKernelGovernor.authorize_exit (approve vrai → RESERVED) et le corps de HoldManager.authorize_exit (approve vrai → HOLD) divergent. Non résolu.",
      en: "The DualKernelGovernor.authorize_exit docstring (approve true → RESERVED) and the HoldManager.authorize_exit body (approve true → HOLD) diverge. Not resolved.",
    },
    continuity: {
      operationIdentity: "idempotency_key",
      registryState: "ESCALATED",
      evidenceOnRecord: "ExitReceipt on the hold record",
      recordExists: true,
    },
  },
  {
    id: "closure",
    title: { fr: "Clôture", en: "Closure" },
    verified: true,
    citation: cite("tenir_governance/operations/registry.py", "OperationRecord.execution_record"),
    reading: {
      fr: "CONFIRMED et FAILED sont des états terminaux d’OperationState. execution_record peut valoir CONFIRMED_NONEXECUTION quand la tentative n’a pas été envoyée. Ce libellé ne dit pas qu’un effet externe est confirmé.",
      en: "CONFIRMED and FAILED are terminal OperationState values. execution_record may be CONFIRMED_NONEXECUTION when the attempt was not dispatched. That label does not say an external effect is confirmed.",
    },
    gap: {
      fr: "Une clôture administrative distincte de ces états n’a pas été trouvée. Non vérifié. Une clôture administrative n’est pas un effet externe confirmé.",
      en: "An administrative closure distinct from these states was not found. Not verified. An administrative closure is not a confirmed external effect.",
    },
    continuity: {
      operationIdentity: "idempotency_key",
      registryState: "CONFIRMED | FAILED",
      evidenceOnRecord: "OperationRecord.execution_record",
      recordExists: true,
    },
  },
];

export const closureLevels: readonly ClosureLevel[] = [
  {
    id: "task",
    verified: false,
    title: { fr: "Clôture de tâche", en: "Task closure" },
    text: {
      fr: "Aucune clôture de tâche administrative n’a été trouvée, attachée à idempotency_key. Écart. Elle ne serait pas, même si elle existait, un effet externe.",
      en: "No administrative task closure was found, attached to idempotency_key. Gap. It would not, even if it existed, be an external effect.",
    },
  },
  {
    id: "operational",
    verified: true,
    title: { fr: "Résolution d’état opérationnel", en: "Operational state resolution" },
    text: {
      fr: "Le registre change l’état de l’opération : HOLD, UNKNOWN, DISPATCHING, ESCALATED, CONFIRMED ou FAILED. C’est une transition d’OperationState. CONFIRMED_NONEXECUTION dit qu’une tentative n’a pas été envoyée. Ce n’est pas la confirmation de l’effet chez le fournisseur.",
      en: "The registry changes the operation’s state: HOLD, UNKNOWN, DISPATCHING, ESCALATED, CONFIRMED or FAILED. That is an OperationState transition. CONFIRMED_NONEXECUTION says an attempt was not dispatched. It is not confirmation of the effect at the provider.",
    },
  },
  {
    id: "external",
    verified: true,
    title: { fr: "Confirmation de l’effet externe", en: "External effect confirmation" },
    text: {
      fr: "E1, la réconciliation fournisseur, est hors du runtime de la voie B (tenir-gov-scope.md). G-07 HOLD est une porte de ce runtime : une issue indéterminée vers une issue qualifiée, refusée si les éléments de réconciliation manquent. G-07 n’est pas E1.",
      en: "E1, provider reconciliation, is outside the Lane B runtime (tenir-gov-scope.md). G-07 HOLD is a gate of that runtime: an indeterminate outcome toward a qualified outcome, refused when the elements for reconciliation are insufficient. G-07 is not E1.",
    },
  },
];

export const delegates: readonly DelegateRow[] = [
  {
    responsibility: { fr: "Réponse fournisseur perdue", en: "Lost provider response" },
    investigate: { fr: "L’agent automatisé peut proposer une piste. L’opérateur instruit la revue.", en: "An automated agent may propose a lead. The operator investigates the review." },
    decide: { fr: "Ni l’agent ni l’opérateur ne décide l’état. Sans fournisseur, la recommandation est human_review.", en: "Neither the agent nor the operator decides the state. With no provider, the recommendation is human_review." },
    runtimeExecutes: {
      symbol: "DualKernelGovernor.reconcile_unknown",
      text: { fr: "Seul le runtime interroge le fournisseur ou laisse UNKNOWN.", en: "Only the runtime asks the provider or leaves UNKNOWN." },
    },
  },
  {
    responsibility: { fr: "Lecture d’un engagement sans réponse", en: "Reading a commitment with no response" },
    investigate: { fr: "La finance instruit la conséquence métier.", en: "Finance investigates the business consequence." },
    decide: { fr: "La finance ne décide pas l’envoi.", en: "Finance does not decide dispatch." },
    runtimeExecutes: {
      symbol: "DualKernelGovernor.dispatch_and_execute",
      text: { fr: "Seul le runtime a écrit UNKNOWN. Il ne reçoit pas d’ordre d’envoi depuis cette page.", en: "Only the runtime wrote UNKNOWN. It receives no dispatch order from this page." },
    },
  },
  {
    responsibility: { fr: "Mesures nouvelles sur un HOLD", en: "New measures on a HOLD" },
    investigate: { fr: "Celui qui apporte les mesures instruit le dossier.", en: "Whoever brings the measures investigates the case." },
    decide: { fr: "La décision reste celle de l’adjudication, pas celle du porteur des mesures.", en: "The decision stays the adjudication’s, not the measure-bearer’s." },
    runtimeExecutes: {
      symbol: "DualKernelGovernor.resolve_hold",
      text: { fr: "Seul le runtime rejoue l’adjudication et change l’état.", en: "Only the runtime re-adjudicates and changes the state." },
    },
  },
  {
    responsibility: { fr: "Sortie de ESCALATED", en: "Exit from ESCALATED" },
    investigate: { fr: "La fonction de contrôle instruit. Le propriétaire habilité signe scope et authorization.", en: "The control function investigates. The authorised owner signs scope and authorization." },
    decide: { fr: "approve vrai ou faux est la décision portée au runtime. Elle ne dépasse pas le mandat.", en: "approve true or false is the decision carried to the runtime. It does not exceed the mandate." },
    runtimeExecutes: {
      symbol: "HoldManager.authorize_exit",
      text: { fr: "Seul le runtime exécute la transition ESCALATED → HOLD ou FAILED.", en: "Only the runtime executes the transition ESCALATED → HOLD or FAILED." },
    },
  },
];

export const financialExample: Localized = {
  fr: "Exemple pédagogique, pas un dossier. Une réponse fournisseur perdue après un envoi laisse l’opération en UNKNOWN (dispatch_and_execute). reconcile_unknown interroge le fournisseur s’il est configuré, sinon il recommande une revue humaine et n’autorise pas un renvoi. Le montant n’est pas établi par cet état. L’effet du paiement reste à établir auprès du système concerné.",
  en: "A teaching example, not a dossier. A lost provider response after dispatch leaves the operation UNKNOWN (dispatch_and_execute). reconcile_unknown asks the provider when one is configured, otherwise it recommends human review and does not authorise a resend. The amount is not established by that state. The payment’s effect remains to be established with the system concerned.",
};

export const boundaries: readonly BoundaryItem[] = [
  {
    id: "e1",
    verified: true,
    text: {
      fr: "tenir-gov-scope.md, statut normatif pour v5.7.0 : TENIR-Gov est un runtime de la voie B. Il n’implémente pas l’extériorité E1 (réconciliation fournisseur). L’existence d’un appel reconcile_unknown n’est pas une qualification de ce périmètre.",
      en: "tenir-gov-scope.md, normative for v5.7.0: TENIR-Gov is a Lane B runtime. It does not implement exteriority E1 (provider reconciliation). The existence of a reconcile_unknown call is not a qualification of that scope.",
    },
  },
  {
    id: "journals",
    verified: true,
    text: {
      fr: "Trois formes de journal coexistent au commit épinglé (SDK, HashChainedLedger, Merkle R5). Leur convergence est une cible, pas un état. validate_chain() ne recalcule pas le contenu. verify_chain() le recalcule sur un autre journal.",
      en: "Three journal forms coexist at the pinned commit (SDK, HashChainedLedger, R5 Merkle). Their convergence is a target, not a state. validate_chain() does not recompute content. verify_chain() recomputes it on another log.",
    },
  },
  {
    id: "attach",
    verified: false,
    text: {
      fr: "Affectations, demandes de pièces et clôtures administratives devraient s’attacher à un enregistrement durable déjà vérifiable. Ces objets n’ont pas été trouvés. Écart listé, non comblé.",
      en: "Assignments, evidence requests and administrative closures should attach to a durable record that is already verifiable. Those objects were not found. The gap is listed, not filled.",
    },
  },
  {
    id: "closure",
    verified: true,
    text: {
      fr: "Une clôture administrative n’est pas un effet externe confirmé. CONFIRMED_NONEXECUTION dit qu’une tentative n’a pas été envoyée. Ce n’est pas la preuve que le fournisseur a produit l’effet.",
      en: "An administrative closure is not a confirmed external effect. CONFIRMED_NONEXECUTION says an attempt was not dispatched. It is not proof that the provider produced the effect.",
    },
  },
];

export const evpInputs: readonly EvpInput[] = [
  {
    name: "hold_delay_cost",
    verified: true,
    source: "tenir_governance/assessment/evp.py · FrictionCost.hold_delay_cost",
    note: {
      fr: "Entrée de coût de friction : durée de HOLD. Ce n’est pas une valeur démontrée de ce parcours.",
      en: "A friction-cost input: HOLD duration. It is not a demonstrated value of this path.",
    },
  },
  {
    name: "reconciliation_effort",
    verified: true,
    source: "tenir_governance/assessment/evp.py · FrictionCost.reconciliation_effort",
    note: {
      fr: "Entrée : effort de réconciliation des opérations UNKNOWN. Rapportée à part. Non soustraite d’EVP Net, selon le module.",
      en: "Input: effort to reconcile UNKNOWN operations. Reported separately. Not subtracted from EVP Net, according to the module.",
    },
  },
  {
    name: "escalation_overhead",
    verified: true,
    source: "tenir_governance/assessment/evp.py · FrictionCost.escalation_overhead",
    note: {
      fr: "Entrée : coût d’escalade. Pas un résultat de valeur de cette page.",
      en: "Input: escalation cost. Not a value result of this page.",
    },
  },
  {
    name: "realized_value / execution_loss",
    verified: true,
    source: "tenir_governance/assessment/evp.py · EVPNet",
    note: {
      fr: "Entrées d’un résultat confirmé ou perdu à l’exécution. EVP Net = realized_value − execution_loss. Aucun chiffre de ce parcours n’est calculé ici.",
      en: "Inputs for a confirmed or lost execution outcome. EVP Net = realized_value − execution_loss. No figure for this path is computed here.",
    },
  },
  {
    name: "friction total",
    verified: true,
    source: "tenir_governance/assessment/evp.py · FrictionCost.total",
    note: {
      fr: "Somme des coûts de friction, entrée du rapport EVP. tests/test_evp.py exerce les équations. Il n’évalue pas ce parcours de réconciliation.",
      en: "Sum of friction costs, an EVP report input. tests/test_evp.py exercises the equations. It does not value this reconciliation path.",
    },
  },
];

export const states = ["HOLD", "ESCALATED", "DISPATCHING", "UNKNOWN", "CONFIRMED", "FAILED"] as const;
