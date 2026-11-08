/**
 * Registre d'affirmations — source unique de vérité pour le site tenirlabs.cc
 *
 * Ancres vérifiées :
 *   TENIR-Gov v5.7.0 → commit 092bb45  (skiredj-prog/tenir_governance, main)
 *   HOLD E1-A6       → commit f3bb683  (skiredj-prog/hold, main)
 *   Audit Harv       → 2026-11-03, ZIP docs/audit/harv-banning-2026-11-03/
 *   B1-HTTP-1        → branche expérimentale fix/b1-governor-uid-lab
 *                      (merge commits 905b759 + 310065c — PAS sur main)
 *
 * Règle de publication : une affirmation ne paraît sur le site que si
 * la colonne `publishable` est true. Les entrées expérimentales
 * (scope "experimental") restent dans ce fichier pour tracabilité mais
 * sont filtrées à l'affichage.
 *
 * Ne JAMAIS afficher une affirmation expérimentale sans avertissement explicite.
 */

export type ClaimStatus =
  | "supported"      // base vérifiée, portée correctement délimitée
  | "partial"        // vrai dans une portée restreinte, à nuancer
  | "withdrawn"      // explicitement retiré par les auteurs
  | "experimental";  // branche expérimentale, pas sur main

export type ClaimProduct = "tenir-gov" | "hold" | "hold-b1";

export interface Claim {
  id: string;
  product: ClaimProduct;
  status: ClaimStatus;
  /** Commit/release ancrant la base de preuve */
  anchor: string;
  /** Affirmation courte, FR / EN */
  statement: { fr: string; en: string };
  /** Ce que la preuve montre réellement */
  basis: { fr: string; en: string };
  /** Limites explicites à mentionner */
  limit: { fr: string; en: string };
  /** Vrai = peut apparaître sur le site public */
  publishable: boolean;
}

/** Ce que nous n'affirmons PAS — liste pour la section "limites" du site */
export interface NonClaim {
  id: string;
  product: ClaimProduct;
  statement: { fr: string; en: string };
  reason: { fr: string; en: string };
}

// ─────────────────────────────────────────────────────────────
// TENIR-Gov v5.7.0  (commit 092bb45)
// ─────────────────────────────────────────────────────────────

export const tenirGovClaims: Claim[] = [
  {
    id: "TG-1",
    product: "tenir-gov",
    status: "supported",
    anchor: "092bb45",
    statement: {
      fr: "TENIR-Gov conserve les budgets I8 sous concurrence (SQLite WAL, hôte unique).",
      en: "TENIR-Gov preserves I8 budgets under concurrency (SQLite WAL, single host).",
    },
    basis: {
      fr: "Suite de tests d'intégration ; RELEASE_v5.7.0_IMPACT.md, section I8.",
      en: "Integration test suite; RELEASE_v5.7.0_IMPACT.md, section I8.",
    },
    limit: {
      fr: "Hôte unique uniquement. Multi-hôte (FM-20 / Raft) : non évalué, loopback de développement seulement.",
      en: "Single host only. Multi-host (FM-20 / Raft): not evaluated, development loopback only.",
    },
    publishable: true,
  },
  {
    id: "TG-2",
    product: "tenir-gov",
    status: "supported",
    anchor: "092bb45",
    statement: {
      fr: "Un état UNKNOWN ne déclenche pas de nouvelle tentative automatique — il attend une décision.",
      en: "An UNKNOWN state does not trigger an automatic retry — it waits for a decision.",
    },
    basis: {
      fr: "README.md v5.7.0, section « State machine » ; tests unitaires Governor.",
      en: "README.md v5.7.0, 'State machine' section; Governor unit tests.",
    },
    limit: {
      fr: "Comportement de la version 5.7.0. Les versions antérieures peuvent différer.",
      en: "Behaviour of version 5.7.0. Earlier versions may differ.",
    },
    publishable: true,
  },
  {
    id: "TG-3",
    product: "tenir-gov",
    status: "supported",
    anchor: "092bb45",
    statement: {
      fr: "La charge utile signée lie la décision à la requête d'origine : toute altération casse la signature.",
      en: "The signed payload binds the decision to the originating request: any alteration breaks the signature.",
    },
    basis: {
      fr: "SECURITY.md v5.7.0 ; suite de tests de mutation de payload.",
      en: "SECURITY.md v5.7.0; payload mutation test suite.",
    },
    limit: {
      fr: "Ne protège pas contre la compromission de la clé de signature elle-même.",
      en: "Does not protect against compromise of the signing key itself.",
    },
    publishable: true,
  },
  {
    id: "TG-4",
    product: "tenir-gov",
    status: "withdrawn",
    anchor: "092bb45",
    statement: {
      fr: "Tolérance aux pannes inter-hôtes (C3).",
      en: "Cross-host fault tolerance (C3).",
    },
    basis: {
      fr: "Explicitement retiré dans RELEASE_v5.7.0_IMPACT.md : « C3 (cross-host fault tolerance) is withdrawn. »",
      en: "Explicitly withdrawn in RELEASE_v5.7.0_IMPACT.md: 'C3 (cross-host fault tolerance) is withdrawn.'",
    },
    limit: {
      fr: "Ne pas mentionner sans cette précision.",
      en: "Do not mention without this qualification.",
    },
    publishable: false,
  },
];

export const tenirGovNonClaims: NonClaim[] = [
  {
    id: "TG-NC-1",
    product: "tenir-gov",
    statement: {
      fr: "TENIR-Gov ne prétend pas couvrir les déploiements multi-hôtes (FM-20 / Raft en production).",
      en: "TENIR-Gov does not claim to cover multi-host deployments (FM-20 / Raft in production).",
    },
    reason: {
      fr: "FM-20 est ouvert et non résolu ; Raft restreint au loopback de développement.",
      en: "FM-20 is open and unresolved; Raft restricted to development loopback.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// HOLD — Expérience E1-A6 (commit f3bb683 · 99 runs)
// ─────────────────────────────────────────────────────────────

/**
 * Données brutes de l'expérience, calculées à partir de run_counts.csv
 * (extrait de l'archive d'audit Harv Banning, 2026-11-03).
 *
 * Condition A  : 33 runs — 33 violations, 0 complétés
 * Condition B  : 33 runs —  3 violations, 0 complétés (30 autres états)
 * Condition C  : 33 runs —  0 violations, 8 CLOSED_COMPLETED,
 *                           22 CLOSED_UNCONFIRMED, 3 CLOSED_NO_EFFECT
 */
export const holdE1A6Stats = {
  totalRuns: 99,
  conditions: {
    A: { runs: 33, violations: 33, completed: 0 },
    B: { runs: 33, violations: 3,  completed: 0 },
    C: { runs: 33, violations: 0,  completed: 8, unconfirmed: 22, noEffect: 3 },
  },
  audit: {
    auditor: "Harv Banning",
    date: "2026-11-03",
    totalChecks: 21894,
    passed: 21872,
    failed: 22,
    failCategory: "source_fingerprint_raw (CRLF artifact)",
    eventHashesRecomputed: 1390,
    mutationControlsDetected: 6,
    verdict: "qualified support, not certification",
    aiAssisted: true,
    humanSigned: false,
  },
} as const;

export const holdClaims: Claim[] = [
  {
    id: "HOLD-H1",
    product: "hold",
    status: "partial",
    anchor: "f3bb683",
    statement: {
      fr: "HOLD préserve l'intégrité d'exécution dans la condition A (violation stricte) de l'expérience E1-A6.",
      en: "HOLD preserves execution integrity under condition A (strict violation) of experiment E1-A6.",
    },
    basis: {
      fr: "99 runs (11 scénarios × 3 rep. × 3 conditions). Condition A : 33/33 violations arrêtées. Hypothèse H1 acceptée pour E1-A6 uniquement.",
      en: "99 runs (11 scenarios × 3 reps × 3 conditions). Condition A: 33/33 violations stopped. Hypothesis H1 accepted for E1-A6 only.",
    },
    limit: {
      fr: "Résultat propre à E1-A6 (Llama 3.2 3B, hôtel synthétique). Non généralisable sans nouvelle expérience.",
      en: "Result specific to E1-A6 (Llama 3.2 3B, synthetic hotel). Not generalisable without a new experiment.",
    },
    publishable: true,
  },
  {
    id: "HOLD-H2",
    product: "hold",
    status: "supported",
    anchor: "f3bb683",
    statement: {
      fr: "Les complétions légitimes progressent normalement quand HOLD est actif (H2 — progression légitime).",
      en: "Legitimate completions proceed normally when HOLD is active (H2 — legitimate progress).",
    },
    basis: {
      fr: "Condition C : 8 CLOSED_COMPLETED, 22 CLOSED_UNCONFIRMED, 3 CLOSED_NO_EFFECT sur 33 runs. Hypothèse H2 acceptée.",
      en: "Condition C: 8 CLOSED_COMPLETED, 22 CLOSED_UNCONFIRMED, 3 CLOSED_NO_EFFECT over 33 runs. Hypothesis H2 accepted.",
    },
    limit: {
      fr: "Même périmètre E1-A6. CLOSED_UNCONFIRMED n'est pas un échec mais une issue distincte.",
      en: "Same E1-A6 scope. CLOSED_UNCONFIRMED is not a failure but a distinct outcome.",
    },
    publishable: true,
  },
  {
    id: "HOLD-H3",
    product: "hold",
    status: "partial",
    anchor: "f3bb683",
    statement: {
      fr: "H3 (discernement contextuel) — non évalué dans E1-A6.",
      en: "H3 (contextual discernment) — not evaluated in E1-A6.",
    },
    basis: {
      fr: "Registre de preuves HOLD docs/enterprise-fr/06-claims-evidence-register.md : statut NOT_EVALUATED.",
      en: "HOLD evidence register docs/enterprise-fr/06-claims-evidence-register.md: status NOT_EVALUATED.",
    },
    limit: {
      fr: "Ne pas présenter H3 comme validé.",
      en: "Do not present H3 as validated.",
    },
    publishable: true,
  },
  {
    id: "HOLD-AUDIT",
    product: "hold",
    status: "supported",
    anchor: "f3bb683",
    statement: {
      fr: "Un audit indépendant (Harv Banning, 3 nov. 2026) a repassé 21 894 contrôles sur les 99 traces E1-A6 : 21 872 réussis, 22 écarts CRLF (artefact de fin de ligne, non sémantique).",
      en: "An independent audit (Harv Banning, 3 Nov 2026) replayed 21,894 checks over the 99 E1-A6 traces: 21,872 passed, 22 CRLF gaps (line-ending artefact, non-semantic).",
    },
    basis: {
      fr: "Archive ZIP docs/audit/harv-banning-2026-11-03/ ; 1 390 hachages d'événements recalculés ; 6 contrôles de mutation détectés.",
      en: "ZIP archive docs/audit/harv-banning-2026-11-03/; 1,390 event hashes recomputed; 6 mutation controls detected.",
    },
    limit: {
      fr: "Audit assisté par IA (Codex), aucun relecteur humain signataire. Verdict : « qualified support, not certification ».",
      en: "AI-assisted audit (Codex), no human-signed reviewer. Verdict: 'qualified support, not certification'.",
    },
    publishable: true,
  },
];

export const holdNonClaims: NonClaim[] = [
  {
    id: "HOLD-NC-1",
    product: "hold",
    statement: {
      fr: "HOLD ne prétend pas que l'isolation Governor est complète dans le lot B1 (branche expérimentale).",
      en: "HOLD does not claim complete Governor isolation in the B1 lot (experimental branch).",
    },
    reason: {
      fr: "docs/B1_GOVERNOR_UID_LAB.md (PR #120, non mergée) documente un contournement connu : un worker avec une requête signée valide peut appeler le service directement, sans décision Governor. Test marqué XFAIL.",
      en: "docs/B1_GOVERNOR_UID_LAB.md (PR #120, not merged) documents a known bypass: a worker with a valid signed request can call the service directly without a Governor decision. Test marked XFAIL.",
    },
  },
  {
    id: "HOLD-NC-2",
    product: "hold",
    statement: {
      fr: "L'expérience E1-A6 n'établit pas l'unicité de l'effet HOLD (absence de groupe contrôle sans HOLD actif).",
      en: "The E1-A6 experiment does not establish uniqueness of the HOLD effect (no control group without active HOLD).",
    },
    reason: {
      fr: "Design expérimental : trois conditions avec HOLD actif à des niveaux différents — pas de bras sans HOLD.",
      en: "Experimental design: three conditions with HOLD active at different levels — no arm without HOLD.",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// HOLD B1 — Contrats HTTP/Stripe sur mocks (branche expérimentale)
// ─────────────────────────────────────────────────────────────

export const holdB1Claims: Claim[] = [
  {
    id: "B1-HTTP-1",
    product: "hold-b1",
    status: "experimental",
    anchor: "310065c", // merge tree = 5edfe6c ; branche fix/b1-governor-uid-lab, PAS sur main
    statement: {
      fr: "Les contrats HTTP et Stripe de HOLD passent sur mocks avec double-autorité Governor+approbateur dans l'environnement de test.",
      en: "HOLD's HTTP and Stripe contracts pass on mocks with dual Governor+approver authority in the test environment.",
    },
    basis: {
      fr: "36 tests HTTP + 31 tests Stripe reproduits localement (commit 5edfe6c). Conditions : TENIR_ENV=test|lab, HOST_SCOPE=single-host.",
      en: "36 HTTP tests + 31 Stripe tests reproduced locally (commit 5edfe6c). Conditions: TENIR_ENV=test|lab, HOST_SCOPE=single-host.",
    },
    limit: {
      fr: "Mocks uniquement. 13 anciens chemins W2 échouent encore. Branche expérimentale — pas sur main. Ne pas publier avant merge sur main et correction des W2.",
      en: "Mocks only. 13 legacy W2 paths still failing. Experimental branch — not on main. Do not publish until merged to main and W2 paths fixed.",
    },
    publishable: false, // expérimental — bloqué jusqu'à merge main + fix W2
  },
];

// ─────────────────────────────────────────────────────────────
// Exports groupés
// ─────────────────────────────────────────────────────────────

export const allClaims: Claim[] = [
  ...tenirGovClaims,
  ...holdClaims,
  ...holdB1Claims,
];

export const allNonClaims: NonClaim[] = [
  ...tenirGovNonClaims,
  ...holdNonClaims,
];

/** Claims publiables uniquement (filtre les expérimentales et retirées) */
export const publishableClaims = allClaims.filter((c) => c.publishable);
