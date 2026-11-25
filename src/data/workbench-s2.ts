// Documentary matrix for Workbench S2. Read from tenir_governance tag v5.7.6.
// Target, not a present claim: one governance runtime, one evidence backbone,
// several interpretations, no second authority. No gateway and no new chain.

export const pin = {
  repo: "skiredj-prog/tenir_governance",
  tag: "v5.7.6",
  commit: "1881c90bb33a0cf1218df5381698c4e3c8dd4df2",
} as const;

const blob = (path: string) =>
  `https://github.com/${pin.repo}/blob/${pin.commit}/${path}`;

export type Reading =
  | "demonstrated-guarantee"
  | "tested-behaviour"
  | "assumption"
  | "claim-not-demonstrated";

export type RegistryStatus =
  | "SPECIFIED"
  | "IMPLEMENTED"
  | "LAB_DEMONSTRATED"
  | "EXTERNAL_RERUN_REPORTED"
  | "NOT_QUALIFIED";

export type ExplorerLevel =
  | "scoped-demonstration"
  | "exploratory-experiment"
  | "published-reference"
  | "not-established";

export type RawEvidence = "in-entry" | "hash-only" | "absent" | "unverified";

export interface Localized {
  fr: string;
  en: string;
}

export interface SourceRef {
  path: string;
  url: string;
}

export interface EventReading {
  id: string;
  eventType: string;
  title: Localized;
  reading: Reading;
  registryStatus: RegistryStatus;
  explorerLevel: ExplorerLevel;
  /** False when this page could not confirm the sentence in the pinned tree. */
  verified: boolean;
  presentFields: string[];
  missingFields: string[];
  rawEvidence: RawEvidence;
  rawEvidenceNote: Localized;
  integrity: Localized;
  eventTruth: Localized;
  presentation: { operational: Localized; business: Localized; evidence: Localized };
  sources: SourceRef[];
}

export const registryLabel: Record<RegistryStatus, Localized> = {
  SPECIFIED: { fr: "Spécifié", en: "Specified" },
  IMPLEMENTED: { fr: "Implémentation publiée", en: "Published implementation" },
  LAB_DEMONSTRATED: { fr: "Observé en laboratoire", en: "Observed in laboratory" },
  EXTERNAL_RERUN_REPORTED: { fr: "Rejeu externe rapporté", en: "External rerun reported" },
  NOT_QUALIFIED: { fr: "Non qualifié", en: "Not qualified" },
};

export const explorerLabel: Record<ExplorerLevel, Localized> = {
  "scoped-demonstration": { fr: "Démontré dans le périmètre", en: "Demonstrated within scope" },
  "exploratory-experiment": { fr: "Expérience exploratoire", en: "Exploratory experiment" },
  "published-reference": { fr: "Référence publiée", en: "Published reference" },
  "not-established": { fr: "Non établi", en: "Not established" },
};

export const readingLabel: Record<Reading, Localized> = {
  "demonstrated-guarantee": { fr: "Garantie démontrée", en: "Demonstrated guarantee" },
  "tested-behaviour": { fr: "Comportement testé", en: "Tested behaviour" },
  assumption: { fr: "Hypothèse", en: "Assumption" },
  "claim-not-demonstrated": { fr: "Affirmation non démontrée", en: "Claim not demonstrated" },
};

export const architecture: Localized = {
  fr: "Cible, pas un état constaté : un seul runtime de gouvernance, une seule colonne vertébrale de preuves, plusieurs interprétations, aucune autorité dupliquée. R5 et la voie B ne sont pas unifiés aujourd’hui. Cette page n’ajoute ni passerelle, ni seconde chaîne.",
  en: "Target, not a state found in the tree: one governance runtime, one evidence backbone, multiple interpretations, no duplicated authority. R5 and Lane B are not unified today. This page adds neither a gateway nor a second chain.",
};

export const laneNote: Localized = {
  fr: "La voie B est la lecture publique de ce site (Workbench S1). R5 est le cockpit de laboratoire dans tenir_governance. Les deux lisent, ou liront, les mêmes événements. Aucun des deux n’est une seconde autorité.",
  en: "Lane B is this site’s public reading (Workbench S1). R5 is the laboratory cockpit in tenir_governance. The two read, or will read, the same events. Neither is a second authority.",
};

export const audienceNote: Localized = {
  fr: "Un sélecteur de public reste facultatif et n’est pas construit. Il ne changerait que la longueur de l’explication. Les chiffres, les décisions et les garanties ne dépendent pas du lecteur. S1 n’a pas ce sélecteur.",
  en: "An audience selector stays optional and is not built. It would change only how long the explanation is. Numbers, decisions and guarantees do not depend on the reader. S1 has no such selector.",
};

const src = (path: string): SourceRef => ({ path, url: blob(path) });

export const events: readonly EventReading[] = [
  {
    id: "observation",
    eventType: "observation",
    title: { fr: "Entrée observation", en: "Observation entry" },
    reading: "tested-behaviour",
    registryStatus: "NOT_QUALIFIED",
    explorerLevel: "not-established",
    verified: true,
    presentFields: [
      "type=observation",
      "event_id",
      "workflow_type",
      "operating_mode",
      "policy_version",
      "s_score",
      "ds_de",
      "d2s_de2",
      "decision",
      "ces_state",
      "rationale",
      "nsl_backend",
      "nsl_confidence",
      "previous_hash",
      "chain_hash",
      "timestamp",
    ],
    missingFields: [
      "pressure",
      "capacity",
      "option_space",
      "velocity",
      "provider response",
      "execution proof",
      "amount",
      "external system identifier",
    ],
    rawEvidence: "absent",
    rawEvidenceNote: {
      fr: "Le payload SDK garde la décision et des scores dérivés. Il ne garde ni la réponse du fournisseur, ni le texte source. L’original, s’il existe, n’est pas dans cette entrée : sa récupération n’est pas établie.",
      en: "The SDK payload keeps the decision and derived scores. It does not keep the provider response or the source text. The original, if it exists, is not in this entry: retrievability is not established.",
    },
    integrity: {
      fr: "previous_hash et chain_hash lient cette entrée à la précédente dans le journal en mémoire ou JSONL du client SDK. validate_chain vérifie cette liaison. Cela détecte une rupture de chaîne dans ce journal. Ce n’est pas l’arbre de Merkle.",
      en: "previous_hash and chain_hash link this entry to the previous one in the SDK client’s in-memory or JSONL log. validate_chain checks that link. That detects a break in this log. It is not the Merkle tree.",
    },
    eventTruth: {
      fr: "Une chaîne intacte ne prouve pas qu’un effet externe a eu lieu, ni que l’observation est complète. Le CHANGELOG 5.7.6 dit que le runtime n’observe pas le fournisseur.",
      en: "An intact chain does not prove that an external effect happened, or that the observation is complete. CHANGELOG 5.7.6 says the runtime does not observe the provider.",
    },
    presentation: {
      operational: {
        fr: "Opération suspendue. Aucun envoi n’est autorisé à ce stade.",
        en: "Operation suspended, no dispatch authorised at this stage.",
      },
      business: {
        fr: "Un engagement financier est retenu le temps de préserver la possibilité d’une réévaluation.",
        en: "A financial commitment is temporarily held to preserve the possibility of re-evaluation.",
      },
      evidence: {
        fr: "Décision HOLD, version de politique X, horodatage Y, empreinte Z. L’absence d’exécution reste à établir auprès du système concerné. X, Y et Z sont des noms de champs, pas des valeurs tirées d’un dossier.",
        en: "HOLD decision, policy version X, timestamp Y, hash Z. Absence of execution remains to be established with the system concerned. X, Y and Z are field names, not values taken from a dossier.",
      },
    },
    sources: [
      src("tenir_governance/sdk.py"),
      src("tenir_governance/nomenclature.py"),
      src("CHANGELOG.md"),
    ],
  },
  {
    id: "control-transition",
    eventType: "control_transition",
    title: { fr: "Entrée control_transition", en: "control_transition entry" },
    reading: "tested-behaviour",
    registryStatus: "NOT_QUALIFIED",
    explorerLevel: "not-established",
    verified: true,
    presentFields: [
      "type=control_transition",
      "from_mode",
      "to_mode",
      "operator_id",
      "reason",
      "policy_version",
      "previous_hash",
      "chain_hash",
      "timestamp",
    ],
    missingFields: [
      "oath text",
      "oath signature",
      "nonce",
      "personal key",
      "merkle root",
      "link to the observation that preceded the transition",
    ],
    rawEvidence: "absent",
    rawEvidenceNote: {
      fr: "Le serment et sa signature HMAC vivent dans KeyCeremony (secret de déploiement), pas dans ce payload. tests/ ne nomme pas KeyCeremony : le contrôle du secret partagé par la suite principale n’a pas été retrouvé.",
      en: "The oath and its HMAC signature live in KeyCeremony (a deployment secret), not in this payload. tests/ does not name KeyCeremony: a main-suite check of that shared secret was not found.",
    },
    integrity: {
      fr: "Même chaînage previous_hash que l’observation, dans le journal du SDK. L’intégrité porte sur les champs enregistrés, pas sur l’identité de la personne.",
      en: "The same previous_hash chaining as an observation, in the SDK log. Integrity covers the recorded fields, not the person’s identity.",
    },
    eventTruth: {
      fr: "operator_id est comparé à TENIR_OPERATOR_ID dans r5_server.py. C’est un secret partagé configuré, pas une identité personnelle. La transition de mode n’est pas un envoi vers un fournisseur.",
      en: "operator_id is compared with TENIR_OPERATOR_ID in r5_server.py. That is a configured shared secret, not a personal identity. A mode transition is not a dispatch to a provider.",
    },
    presentation: {
      operational: {
        fr: "Le mode enregistré passe de from_mode à to_mode, pour la raison écrite. Aucun envoi n’est décrit par cette entrée.",
        en: "The recorded mode moves from from_mode to to_mode, for the reason written down. This entry does not describe a dispatch.",
      },
      business: {
        fr: "Les conditions dans lesquelles une opération ultérieure peut partir ont changé. La conséquence métier dépend du mode ; cette entrée ne la calcule pas.",
        en: "The conditions under which a later operation may proceed have changed. The business consequence depends on the mode; this entry does not compute it.",
      },
      evidence: {
        fr: "control_transition, from_mode, to_mode, operator_id, reason, policy_version, timestamp, previous_hash, chain_hash. La signature de serment n’est pas dans l’entrée.",
        en: "control_transition, from_mode, to_mode, operator_id, reason, policy_version, timestamp, previous_hash, chain_hash. The oath signature is not in the entry.",
      },
    },
    sources: [
      src("tenir_governance/sdk.py"),
      src("tenir_governance/nomenclature.py"),
      src("r5_hardened/IRON_OMEGA_R5/r5_server.py"),
      src("r5_hardened/IRON_OMEGA_R5/r5_distributed_crypto/merkle/distributed_ledger.py"),
    ],
  },
  {
    id: "previous-hash",
    eventType: "previous_hash",
    title: { fr: "Chaînage previous_hash", en: "previous_hash chaining" },
    reading: "tested-behaviour",
    registryStatus: "NOT_QUALIFIED",
    explorerLevel: "not-established",
    verified: true,
    presentFields: ["previous_hash", "chain_hash", "GENESIS"],
    missingFields: [
      "a single chain shared by the SDK log and HashChainedLedger",
      "inclusion in a Merkle root",
    ],
    rawEvidence: "in-entry",
    rawEvidenceNote: {
      fr: "HashChainedLedger recopie dans l’entrée scoring_result et membrane_result. Ce sont des résultats structurés, pas le dossier d’origine du fournisseur. Le test test_tamper_detection altère decision et attend verify_chain() à faux.",
      en: "HashChainedLedger copies scoring_result and membrane_result into the entry. Those are structured results, not the provider’s original dossier. test_tamper_detection alters decision and expects verify_chain() to be false.",
    },
    integrity: {
      fr: "Deux chaînes distinctes existent au commit épinglé. Le SDK lie previous_hash au chain_hash précédent. HashChainedLedger (composition/lattice.py) recalcule SHA-256 du payload canonique et échoue si un champ couvert change. Les deux détectent une altération des enregistrements qu’elles couvrent.",
      en: "Two distinct chains exist at the pinned commit. The SDK links previous_hash to the previous chain_hash. HashChainedLedger (composition/lattice.py) recomputes the SHA-256 of the canonical payload and fails if a covered field changes. Both detect tampering of the records they cover.",
    },
    eventTruth: {
      fr: "Une chaîne valide ne dit pas que la décision correspond au monde. Elle dit que les enregistrements couverts n’ont pas été modifiés après coup, dans cette chaîne-là.",
      en: "A valid chain does not say the decision matches the world. It says the covered records were not changed afterwards, in that chain.",
    },
    presentation: {
      operational: {
        fr: "Le journal refuse une suite dont le maillon précédent ne correspond pas.",
        en: "The log rejects a continuation whose previous link does not match.",
      },
      business: {
        fr: "On peut montrer qu’un dossier couvert n’a pas été réécrit. On ne peut pas en conclure que l’engagement externe a eu lieu.",
        en: "One can show that a covered record was not rewritten. One cannot conclude that the external commitment happened.",
      },
      evidence: {
        fr: "previous_hash, chain_hash, et le résultat de verify_chain ou validate_chain. Tests : tests/test_composition.py (test_genesis_link, test_tamper_detection) et tests/test_sprints_9_10_11.py. La suite de 1 457 tests citée par le CHANGELOG n’a pas été relancée ici.",
        en: "previous_hash, chain_hash, and the result of verify_chain or validate_chain. Tests: tests/test_composition.py (test_genesis_link, test_tamper_detection) and tests/test_sprints_9_10_11.py. The 1,457 tests cited by the CHANGELOG were not re-run here.",
      },
    },
    sources: [
      src("tenir_governance/composition/lattice.py"),
      src("tenir_governance/sdk.py"),
      src("tests/test_composition.py"),
      src("tests/test_sprints_9_10_11.py"),
    ],
  },
  {
    id: "merkle",
    eventType: "merkle",
    title: { fr: "Merkle, là où il existe", en: "Merkle, where it exists" },
    reading: "claim-not-demonstrated",
    registryStatus: "NOT_QUALIFIED",
    explorerLevel: "not-established",
    verified: true,
    presentFields: [
      "DistributedLedgerEntry.previous_hash",
      "entry_hash",
      "nsl_ast_hash",
      "epoch",
      "sequence",
      "MerkleEpoch.merkle_root",
      "inclusion proof",
    ],
    missingFields: [
      "the NSL AST itself",
      "a test under tests/ that imports build_merkle_tree",
      "a statement that the 1,457 tests include this module",
    ],
    rawEvidence: "hash-only",
    rawEvidenceNote: {
      fr: "nsl_ast_hash est une empreinte SHA-256 de l’AST, pas l’AST. L’original doit rester récupérable ailleurs. Cette lecture n’a pas trouvé où il est conservé.",
      en: "nsl_ast_hash is a SHA-256 of the AST, not the AST. The original must stay retrievable elsewhere. This reading did not find where it is kept.",
    },
    integrity: {
      fr: "build_merkle_tree, merkle_proof et verify_merkle_proof sont dans le module R5. Un epoch de 100 entrées se scelle par une racine. Cela prouve l’inclusion d’une feuille dans cette racine, pas un effet externe.",
      en: "build_merkle_tree, merkle_proof and verify_merkle_proof are in the R5 module. An epoch of 100 entries is sealed by a root. That proves inclusion of a leaf in that root, not an external effect.",
    },
    eventTruth: {
      fr: "Aucune recherche sous tests/ n’importe build_merkle_tree. Le fichier r5_hardened/IRON_OMEGA_R5/test_r5_all.py importe ces fonctions. Qu’il fasse partie des 1 457 tests du CHANGELOG n’est pas vérifié.",
      en: "No search under tests/ imports build_merkle_tree. r5_hardened/IRON_OMEGA_R5/test_r5_all.py imports those functions. Whether that file is part of the CHANGELOG’s 1,457 tests is not verified.",
    },
    presentation: {
      operational: {
        fr: "Un paquet d’entrées peut recevoir une racine. Ce n’est pas le journal que la page S1 dessine.",
        en: "A batch of entries can receive a root. That is not the log the S1 page draws.",
      },
      business: {
        fr: "Une racine permet de contrôler qu’une entrée couverte n’a pas été échangée. Elle ne dit pas qu’un paiement ou un effet a eu lieu.",
        en: "A root lets someone check that a covered entry was not swapped. It does not say that a payment or an effect happened.",
      },
      evidence: {
        fr: "merkle_root, preuve d’inclusion, entry_hash, nsl_ast_hash. L’AST n’est pas dans l’entrée. Non vérifié : exécution de ces tests dans la suite citée.",
        en: "merkle_root, inclusion proof, entry_hash, nsl_ast_hash. The AST is not in the entry. Unverified: that these tests run in the cited suite.",
      },
    },
    sources: [
      src("r5_hardened/IRON_OMEGA_R5/r5_distributed_crypto/merkle/distributed_ledger.py"),
      src("r5_hardened/IRON_OMEGA_R5/test_r5_all.py"),
    ],
  },
];

export interface Gap {
  id: string;
  title: Localized;
  work: Localized;
  verified: boolean;
}

export const gaps: readonly Gap[] = [
  {
    id: "three-shapes",
    title: { fr: "Trois formes de journal", en: "Three ledger shapes" },
    work: {
      fr: "Le SDK, HashChainedLedger et le journal Merkle R5 ne sont pas la même chaîne. Le travail technique est de lire les entrées existantes, pas d’en créer une quatrième ni une passerelle.",
      en: "The SDK log, HashChainedLedger and the R5 Merkle ledger are not the same chain. The technical work is to read the entries that exist, not to create a fourth one or a gateway.",
    },
    verified: true,
  },
  {
    id: "type-field",
    title: { fr: "Le type d’entrée n’est pas commun", en: "The entry type is not shared" },
    work: {
      fr: "observation et control_transition sont des chaînes du SDK. HashChainedLedger n’a pas ce champ type. Un lecteur unique doit nommer ce manque, pas le combler par un nouveau schéma dans le site.",
      en: "observation and control_transition are SDK strings. HashChainedLedger has no such type field. A single reader has to name that gap, not fill it with a new schema on this site.",
    },
    verified: true,
  },
  {
    id: "lane-b-reader",
    title: { fr: "La voie B ne lit pas encore le journal", en: "Lane B does not read the log yet" },
    work: {
      fr: "S1 calcule ses chiffres dans le navigateur. Brancher ces curseurs sur une entrée exigerait un lecteur des champs déjà écrits. Ce n’est pas une nouvelle architecture métier.",
      en: "S1 computes its figures in the browser. Connecting those sliders to an entry would require a reader of fields that are already written. That is not a new business architecture.",
    },
    verified: true,
  },
  {
    id: "slider-fields",
    title: { fr: "Pression, capacité, options absentes de l’observation SDK", en: "Pressure, capacity and options are absent from the SDK observation" },
    work: {
      fr: "Le schéma 1.2 borne pressure, capacity et option_space à [0, 1] (tenir_kernel/schemas/tenir_1_2.schema.json). Ces trois nombres ne sont pas dans le payload observation du SDK. La variance environnementale de S1 n’a pas de champ de ce nom : correspondance non vérifiée.",
      en: "Schema 1.2 bounds pressure, capacity and option_space to [0, 1] (tenir_kernel/schemas/tenir_1_2.schema.json). Those three numbers are not in the SDK observation payload. S1’s environmental variance has no field of that name: the mapping is not verified.",
    },
    verified: true,
  },
];

export const qualification: Localized = {
  fr: "Verdict écrit dans le CHANGELOG 5.7.6 : la conformance REG n’est pas démontrée. Le harnais n’a pas été relancé. Le dernier résultat cité est NOT_CERTIFIABLE (brouillon non fusionné reg-conformance#81 ; REG v0.7.0 est la référence normative). INCOMPLETE est le mot de la page S1, pas un statut du changelog. Périmètre couvert par le même texte : un hôte contrôlé, un processus gouverneur, Raft non exercé, FM-20 ouvert. 5.7.7 n’est pas une version déclarée dans cet arbre. La formule « client de monitoring SDK non testé par la suite principale » n’est pas écrite : le plus proche vérifié est DD-575-05, statut OPEN, dans docs/V5.7.5_HARDENING_BACKLOG.md, et l’absence de TenirMonitor sous tests/. La formule « connecteurs de noyau insuffisamment exercés » n’est pas écrite : aucun test sous tests/ ne nomme HTTPConnector ou PythonConnector ; docs/release-v5.7.0-qualification.md dit que la vérification indépendante du connecteur de la campagne 5.7.0 reste ouverte. Ce n’est pas un audit des connecteurs daté de 5.7.6.",
  en: "Verdict written in CHANGELOG 5.7.6: REG conformance is not demonstrated. The harness was not re-run. The last cited result is NOT_CERTIFIABLE (unmerged draft reg-conformance#81; REG v0.7.0 is the normative reference). INCOMPLETE is the S1 page’s word, not a changelog status. Scope covered by the same text: one controlled host, one governor process, Raft not exercised, FM-20 open. 5.7.7 is not a declared version in this tree. The phrase “SDK monitoring client untested by the main suite” is not written: the nearest verified item is DD-575-05, status OPEN, in docs/V5.7.5_HARDENING_BACKLOG.md, and the absence of TenirMonitor under tests/. The phrase “kernel connectors insufficiently exercised” is not written: no test under tests/ names HTTPConnector or PythonConnector; docs/release-v5.7.0-qualification.md says independent connector verification for the 5.7.0 campaign remains outstanding. That is not a 5.7.6 connector audit.",
};
