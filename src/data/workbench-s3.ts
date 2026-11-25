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

export interface PathStep {
  id: string;
  title: Localized;
  verified: boolean;
  citation: Citation | null;
  reading: Localized;
  gap: Localized | null;
}

export interface DelegateRow {
  responsibility: Localized;
  delegate: Localized;
  limit: Localized;
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
    gap: null,
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
  },
];

export const delegates: readonly DelegateRow[] = [
  {
    responsibility: { fr: "Proposer une piste de réconciliation", en: "Propose a reconciliation lead" },
    delegate: { fr: "Agent automatisé", en: "Automated agent" },
    limit: { fr: "Aucune autorité au-delà du mandat. Pas de transition d’état.", en: "No authority beyond the mandate. No state transition." },
  },
  {
    responsibility: { fr: "Revue humaine quand aucun fournisseur n’est configuré", en: "Human review when no provider is configured" },
    delegate: { fr: "Opérateur", en: "Operator" },
    limit: { fr: "reconcile_unknown renvoie recommendation human_review. L’opérateur ne devient pas le runtime.", en: "reconcile_unknown returns recommendation human_review. The operator does not become the runtime." },
  },
  {
    responsibility: { fr: "Lire un engagement dont la réponse fournisseur manque", en: "Read a commitment whose provider response is missing" },
    delegate: { fr: "Finance", en: "Finance" },
    limit: { fr: "Peut qualifier la conséquence métier. Ne peut pas autoriser un envoi.", en: "May qualify the business consequence. Cannot authorise a dispatch." },
  },
  {
    responsibility: { fr: "Sortie d’un état ESCALATED", en: "Exit from ESCALATED" },
    delegate: { fr: "Propriétaire habilité", en: "Authorised owner" },
    limit: { fr: "authorize_exit exige authorized_by, scope et authorization. Le corps vérifié ne dispense pas d’une nouvelle adjudication si approve est vrai.", en: "authorize_exit requires authorized_by, scope and authorization. The verified body does not skip a fresh adjudication when approve is true." },
  },
  {
    responsibility: { fr: "Tenir l’état absorbant jusqu’à une sortie autorisée", en: "Hold the absorbing state until an authorised exit" },
    delegate: { fr: "Fonction de contrôle", en: "Control function" },
    limit: { fr: "ESCALATED reste absorbant. Une sortie par le temps est refusée : l’expiration de τ_K produit UNKNOWN, pas une résolution.", en: "ESCALATED stays absorbing. A time-based exit is rejected: τ_K expiry produces UNKNOWN, not a resolution." },
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
