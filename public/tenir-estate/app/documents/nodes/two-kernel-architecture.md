# Two-Kernel Architecture: Synergies, Tensions, and Revised Plan

## The Question

Instead of forcing the existing scoring kernel to evolve into the transition-system membrane, deploy both as complementary kernels. Would there be synergies?

**Yes — significant ones. The two kernels govern different dimensions, share infrastructure, and compose into a stronger product than either alone.**

---

## What Each Kernel Actually Does (from the real code)

### Kernel 1: Scoring Gate (`tenir_kernel/`, `tenir_governance/`)

**What it measures:** How stressed is the system right now, and where is it heading?

```
Input:  pressure, velocity, capacity (each in [0,1])
        + 12 constraint-geometry coordinates (authority, context_fit, evidence_quality, ...)
Compute: S = K / (P·V + ε)                    # scalar stability score
         dS/de, d²S/de²                       # trajectory derivatives
         projected_events_to_zero              # horizon: "collapse in N events"
Evaluate: 5 constraint-geometry facets         # half-space margins
Classify: CES state (COLLAPSE / SIGNAL_CONFLICT / TENSION / METABOLIZING / REST)
Decide:   PASS / FLAG / HARD_VETO
```

**What it catches:**
- System approaching collapse (S declining, horizon shrinking)
- Authority insufficient for the action's irreversibility (facet violation)
- Evidence quality below threshold
- Combined pressure×velocity exceeding capacity envelope
- Option space narrowing toward zero

**What it cannot catch:**
- Agent delegating to an untrusted agent (requires examining a *relationship*, not a score)
- Each payment valid but aggregate exceeds budget (requires examining a *resource state* across multiple *actions*)
- Each step safe but sequence violates temporal constraint (requires examining a *trajectory*, not a scalar)

**Speed:** O(1). Sub-millisecond. Scalar computation + 5 facet evaluations. Already deployed, tested (557 tests), and ledgered.

### Kernel 2: Transition-System Membrane (manuscript, not yet built)

**What it enforces:** Do specific invariants hold across specific governed objects?

```
Input:  transition τ: state → state'
        + governed objects (agent, passage, trajectory, relationship, resource, invariant)
Check:   I1 — at-most-once effect (|E_L| ≤ 1)
         I2 — permit single-use
         I3 — attempt terminality
         I4 — only dispatch produces effects
         I5 — FAILED implies no observed effect
         I6 — no admission under quarantine
         I7 — delegation integrity (delegatee ∈ trusted_set)       [new]
         I8 — aggregate budget (Σ authorized ≤ budget)              [new]
         I9 — trajectory temporal consistency (sequence ⊨ temporal) [new]
Decide:   PASS / FLAG / HOLD / HARD_VETO
```

**What it catches:**
- Exactly the discrete, relational violations the scoring kernel cannot
- Each invariant is a specific property over specific object types

**What it cannot catch:**
- System approaching collapse (no notion of trajectory risk or stress accumulation)
- Evidence quality degrading gradually (no scalar quality measurement)
- Option space narrowing (no option_space tracking)

**Speed:** O(subgraph). Requires assembling the relevant object subgraph, checking invariants over it. Slower — potentially 10-100ms depending on subgraph size and Neo4j query latency.

---

## The Seven Synergies

### 1. Fast pre-filter + precise enforcement (two-stage gate)

The scoring kernel is O(1). The transition-system kernel is O(subgraph). Use the scoring kernel as a fast pre-filter:

```
Action arrives
    → Scoring kernel evaluates (O(1), <1ms)
        → HARD_VETO? → Block immediately, skip transition-system kernel. Done.
        → PASS with margin? → If S > 2× alert_floor, skip transition-system kernel. Action proceeds.
        → FLAG or borderline PASS? → Invoke transition-system kernel for detailed invariant check.
            → Transition-system kernel evaluates (O(subgraph), 10-100ms)
                → HARD_VETO or HOLD? → Block.
                → PASS? → Allow (with FLAG from scoring kernel).
```

**Benefit:** 90%+ of actions are decided in <1ms by the scoring kernel alone. Only borderline or high-risk actions invoke the expensive transition-system kernel. This is the same pattern as CPU branch prediction or database query optimization — fast path for the common case, slow path for the hard case.

### 2. System posture feeds object-level decisions

The scoring kernel's CES classification is exactly the `context` field the transition-system kernel's policy schema needs:

| CES state | What it means | How transition-system kernel uses it |
|---|---|---|
| REST | System stable, high option space | Use baseline thresholds for delegation and budget gates |
| METABOLIZING | System absorbing pressure, still stable | Use baseline thresholds, but log heightened activity |
| TENSION | Structural stress, S declining | Tighten delegation threshold (require higher trust score) |
| SIGNAL_CONFLICT | Contradictory pressures, multiple incompatible paths | Block all delegations (system is confused, don't add authority transfers) |
| COLLAPSE | Identity-threatening breach | Hard-block everything (system must recover before any action) |

**Benefit:** The transition-system kernel doesn't need its own system-level monitoring. It inherits the scoring kernel's real-time situational awareness. A delegation that's safe when the system is in REST becomes blocked when the system is in TENSION.

### 3. Different governed scopes = no overlap, full coverage

| Violation type | Scoring kernel catches it? | Transition-system kernel catches it? |
|---|---|---|
| System approaching collapse | ✅ (trajectory derivatives, horizon) | ❌ |
| Authority insufficient for irreversibility | ✅ (facet: irreversibility-authority-boundary) | ✅ (but less nuanced — binary check, not margin) |
| Evidence quality degrading | ✅ (facet: evidence-quality-floor) | ❌ |
| Option space narrowing | ✅ (option_space_alert_floor) | ❌ |
| Agent delegates to untrusted agent | ❌ | ✅ (I7) |
| Aggregate budget exceeded | ❌ | ✅ (I8) |
| Trajectory violates temporal constraint | ❌ | ✅ (I9) |
| Payment executed twice | ❌ | ✅ (I1) |
| Permit reused | ❌ | ✅ (I2) |
| Attempt outcome rewritten | ❌ | ✅ (I3) |

**No overlap on the hard cases.** Each kernel catches a class of violations the other fundamentally cannot. Together they cover both continuous (approaching danger) and discrete (specific violation) failure modes.

### 4. Composition semantics are simple

Both kernels return the same decision vocabulary: PASS / FLAG / HOLD / HARD_VETO.

```
compose(scoring_decision, transition_decision):

    if scoring_decision == HARD_VETO or transition_decision == HARD_VETO:
        return HARD_VETO          # either kernel can block

    if transition_decision == HOLD:
        return HOLD               # transition-system wants to pause for more evidence

    if scoring_decision == FLAG or transition_decision == FLAG:
        return FLAG               # either kernel can flag

    return PASS                   # both must pass for the action to proceed
```

**Most-restrictive wins.** No ambiguity, no conflict resolution logic, no priority ordering. The composition is a single function — ~10 lines of code.

### 5. Shared infrastructure (the real cost saving)

Both kernels share the same infrastructure, which already exists and is tested:

| Infrastructure | Lines | Shared? | Extension needed |
|---|---|---|---|
| Merkle ledger (`distributed_ledger.py`) | 1,009 | ✅ | Add `kernel` field to payload (scoring vs transition) |
| PolicyEngine (`policy_engine.py`) | 354 | ✅ | Add transition-system thresholds as new policy fields |
| Validator (`validator.py`) | 467 | ✅ | Add invariant checks for I7–I9 |
| FastAPI server (`r5_server.py`) | 776 | ✅ | Add `/adjudicate/transition` endpoint |
| Neo4j graph (`neo4j_graph.py`) | 549 | ✅ | Extend schema for governed objects and relationships |
| CI pipeline (6-gate) | — | ✅ | Add transition-system test suite |
| Docker + deployment | — | ✅ | None |
| 557 tests | — | ✅ | Add new tests, existing tests still pass |

**The two-kernel architecture adds a new module, not a new system.** The infrastructure cost is incremental, not multiplicative.

### 6. Product tiering (direct revenue implication)

| Tier | What's included | Target customer | Price point |
|---|---|---|---|
| **Tier 1: Guard** | Scoring kernel only | High-frequency, low-complexity agent deployments (chatbot gating, content moderation) | Low SaaS / open-core |
| **Tier 2: Membrane** | Transition-system kernel only | Compliance-focused, low-frequency, high-value actions (financial transactions, delegated authority) | Medium SaaS |
| **Tier 3: Sovereign** | Both kernels + composition | Enterprise, multi-agent, high-stakes (finance, healthcare, defense) | Enterprise license |

**The two-kernel architecture creates a natural product ladder.** A customer starts with Tier 1 (cheap, fast, covers the common case), discovers they need relational governance, upgrades to Tier 3. This is a stronger revenue model than a single product with feature flags.

### 7. Stronger IP and manuscript story

The manuscript can present two complementary governance mechanisms:

> "We identify two orthogonal dimensions of governance failure: **approaching danger** (the system is trending toward an unsafe state) and **specific violation** (a discrete invariant is breached). No single mechanism captures both. We present two complementary kernels: a **scoring kernel** that measures system stress in real-time using constraint geometry and trajectory analysis, and a **transition-system kernel** that enforces discrete invariants across governed objects. We define a composition semantics under which the two kernels combine with most-restrictive-wins semantics, and prove that each kernel preserves its respective invariants under stated assumptions."

This is a more defensible and more interesting contribution than either kernel alone. It also maps to the snippet's vision more naturally — the scoring kernel is the "context and state model" function, the transition-system kernel is the "decision and enforcement" function, and together they cover the snippet's five separable functions.

---

## Tensions and How to Resolve Them

### Tension 1: Decision conflict
**Problem:** Scoring kernel says PASS, transition-system says HARD_VETO (or vice versa).
**Resolution:** Most-restrictive wins. Either kernel can block; both must pass for the action to proceed. This is the same semantics as defense-in-depth — multiple independent checks, any one can block. No conflict resolution needed.

### Tension 2: Latency
**Problem:** Two kernels = two evaluations.
**Resolution:** The scoring kernel is O(1) (<1ms). The transition-system kernel is the expensive one (O(subgraph), 10-100ms). Running both adds <1ms overhead to the transition-system kernel. And the fast pre-filter (Synergy 1) means the transition-system kernel is only invoked for borderline cases — so total latency is dominated by whichever kernel runs, not by running both. In the common case (scoring kernel alone), latency is <1ms.

### Tension 3: Complexity
**Problem:** Two kernels are more complex to maintain than one.
**Resolution:** The alternative — forcing the scoring kernel to do discrete invariant checking — is *more* complex because you'd be expressing relational constraints through scalar thresholds, which is the wrong abstraction. Two kernels with clean separation of concerns is simpler than one kernel doing two incompatible jobs. Each kernel has a single responsibility: the scoring kernel measures stress; the transition-system kernel enforces invariants.

### Tension 4: Ledger consistency
**Problem:** Both kernels write to the same Merkle ledger.
**Resolution:** Extend the ledger payload with a `kernel` field (`"scoring"` or `"transition"`). Each decision is recorded with which kernel made it. The composition result is recorded as a third entry type (`"composed"`). The existing hash-chain logic is unchanged — it hashes the payload, which now includes the kernel field.

---

## Revised Architecture

```
                         TENIR-Gov
                 THE EXECUTION CONTROL PLANE
                              │
             ┌────────────────┴────────────────┐
             │                                 │
             ▼                                 ▼
    SCORING KERNEL                    TRANSITION-SYSTEM KERNEL
   (existing, deployed)               (new module)
             │                                 │
   S = K/(P·V+ε)                    Guards + Invariants I1–I9
   Constraint geometry               Object subgraph evaluation
   CES classification                Delegation, budget, trajectory
   Trajectory derivatives            At-most-once effect
             │                                 │
             ▼                                 ▼
   PASS / FLAG / HARD_VETO         PASS / FLAG / HOLD / HARD_VETO
             │                                 │
             └────────────┬────────────────────┘
                          ▼
                   COMPOSITION LAYER
              (most-restrictive wins)
                          │
                          ▼
              PASS / FLAG / HOLD / HARD_VETO
                          │
                          ▼
                   MERKLE LEDGER
           (records both decisions + composition)
                          │
                          ▼
                  EXECUTION GATE
```

### Module structure

```
tenir_governance/
├── objects/              # Shared object model (both kernels reference)
│   ├── agent.py
│   ├── passage.py
│   ├── trajectory.py
│   ├── relationship.py
│   ├── resource.py
│   └── invariant.py
├── scoring/              # Kernel 1 (refactored from existing code, not rewritten)
│   ├── kernel.py         # ← existing tenir_kernel/kernel.py
│   ├── geometry.py       # ← existing tenir_kernel/geometry.py
│   ├── policy.py         # ← existing policy_engine.py (scoring thresholds)
│   └── ces.py            # ← existing classify_ces()
├── membrane/             # Kernel 2 (new)
│   ├── transition_system.py
│   ├── guards.py          # Guards for I1–I9
│   ├── invariants.py      # I1–I9 definitions
│   ├── gates/
│   │   ├── delegation.py       # I7
│   │   ├── resource_budget.py  # I8
│   │   └── trajectory.py       # I9
│   └── policy.py         # Transition-system thresholds
├── composition.py        # Compose(scoring_decision, transition_decision)
├── sdk.py                # ← existing SDK, extended to invoke both kernels
├── ledger.py             # ← existing Merkle ledger, extended with kernel field
└── validator.py          # ← existing validator, extended with I7–I9 checks
```

---

## Revised Effort Estimate

### What changes from the single-kernel plan

| Task | Single-kernel plan | Two-kernel plan | Difference |
|---|---|---|---|
| Object model (6 types) | 17 days | 17 days | Same — needed either way |
| Refactor scoring kernel into `scoring/` | 0 (not planned) | 3 days | +3 (move existing code, don't rewrite) |
| Build transition-system kernel | 0 (embedded in refactoring) | 12 days | +12 (new module, but designed for purpose) |
| Composition layer | 0 (not planned) | 3 days | +3 (simple — most-restrictive wins) |
| Delegation + budget gates | 18 days | 18 days | Same — same work, now in `membrane/gates/` |
| Trajectory gate + cross-object | 16 days | 16 days | Same |
| Formal model + verification | 27 days | 27 days | Same — now covers both kernels |
| Manuscript + demo | 13 days | 13 days | Same — stronger story |
| **Total** | **91 days** | **109 days** | **+18 days (~3.5 weeks)** |

### Why the extra 18 days is worth it

1. **No refactoring risk.** The existing scoring kernel (557 tests, 96% coverage, deployed) stays untouched. You're not risking breaking working code to add new features. The transition-system kernel is built fresh, alongside, not inside.

2. **The product is immediately better.** From day 1 of the transition-system kernel's existence, it composes with the scoring kernel. You don't lose the scoring kernel's capabilities (trajectory analysis, CES states, horizon projection) — you keep them and add the transition-system's capabilities on top.

3. **Product tiering from day 1.** You can sell Tier 1 (scoring only) immediately — it already exists. You can sell Tier 3 (both kernels) as soon as the transition-system kernel is built. No need to wait for the scoring kernel to be "evolved."

4. **The manuscript story is stronger.** "Two complementary governance kernels with composition semantics" is a more interesting and defensible contribution than "we extended a scoring gate to do invariant checking."

5. **The 18 days is engineering, not research.** The composition layer is 3 days. The refactoring is 3 days (moving files, not rewriting). The 12 days for the transition-system kernel is the same work you'd do anyway — you're just putting it in its own module instead of cramming it into the scoring kernel.

---

## Revised Plan (Two-Kernel)

### Sprint 1 (Weeks 1-3): Object Model + Refactor Scoring Kernel → v8.0

**Goal:** Shared object model exists. Scoring kernel is refactored into `scoring/` module (moved, not rewritten). Existing tests still pass.

- Create `objects/` with 6 dataclasses — 3 days
- Move `kernel.py`, `geometry.py`, scoring thresholds from `policy_engine.py` into `scoring/` — 3 days
- Verify all 557 tests still pass — 1 day
- Extend `GovernanceEvent` to accept object references — 2 days
- Write tests for object model — 3 days
- Tag `v8.0` — 12 days total

### Sprint 2 (Weeks 3-5.5): Transition-System Kernel + Composition → v8.1

**Goal:** Transition-system kernel exists as a new module. Composition layer runs both kernels. The system can block actions via either kernel.

- Build `membrane/transition_system.py` (state, guards, transitions) — 4 days
- Build `membrane/invariants.py` (I1–I6 from manuscript, I7–I9 new) — 3 days
- Build `composition.py` (most-restrictive wins) — 3 days
- Wire composition into `sdk.py` (invoke both, compose, ledger) — 2 days
- Write tests for transition-system kernel and composition — 3 days
- Tag `v8.1` — 15 days total

### Sprint 3 (Weeks 5.5-9): Delegation + Budget + Trajectory Gates → v8.2

**Goal:** All 9 invariants are enforced. Cross-object evaluation works.

- `gates/delegation.py` (I7) — 4 days
- `gates/resource_budget.py` (I8) — 5 days
- `gates/trajectory.py` (I9) — 4 days
- `policy/cross_object.py` (subgraph evaluation) — 5 days
- Scenarios S7–S12 — 4 days
- Tests — 3 days
- Tag `v8.2` — 25 days total

### Sprint 4 (Weeks 9-14.5): Formal Model + Verification → v9.0-rc

**Goal:** Theorems, verification, baseline comparison. Same as single-kernel plan but covers both kernels.

- Formalize transition system for I7–I9 — 5 days
- Theorems 2–4 + composition theorem — 12 days
- Bounded exhaustive verification harness — 5 days
- Run verification, collect results — 2 days
- Baseline comparison — 3 days
- Tag `v9.0-rc` — 27 days total

### Sprint 5 (Weeks 14.5-17): Manuscript + Demo → v9.0

**Goal:** Manuscript and demo ready. Stronger story: two complementary kernels.

- Write manuscript (15-20 pages) — 7 days
- Build `make demo` (shows both kernels catching different fault classes) — 3 days
- Examples, README, reproduction pack — 3 days
- Tag `v9.0` — 13 days total

### Total: 92 days (~18.5 weeks)

With Sprints 4-5 overlapping: **~15 weeks to v9.0.**

### Aggressive path (cut formal verification depth, skip I9 to v9.1): **~10 weeks.**

---

## The Demo That Sells It

`make demo` runs 4 scenarios in 10 minutes:

**Scenario 1 — Scoring kernel catches approaching danger:**
An agent's actions show rising pressure, accelerating velocity, narrowing option space. The scoring kernel's trajectory derivatives detect dS/de < 0 and projects collapse in 3 events. HARD_VETO. The transition-system kernel alone would have PASSed each individual action — no invariant violated — but the system was heading toward collapse.

**Scenario 2 — Transition-system kernel catches discrete violation:**
An authorized agent delegates authority to an untrusted agent. Each agent individually has valid authority. The scoring kernel PASSes (pressure, velocity, capacity all fine). But the transition-system kernel's delegation gate (I7) detects the untrusted delegatee and blocks. HARD_VETO.

**Scenario 3 — Both kernels catch the same action from different angles:**
A high-value payment under time pressure. The scoring kernel FLAGs it (high pressure, declining option space). The transition-system kernel checks the budget gate (I8) and finds aggregate spending is near the limit. Composition: FLAG + near-limit → HOLD (pause for human review). Neither kernel alone would have caught both the stress and the budget risk.

**Scenario 4 — The ledger tells the full story:**
The Merkle ledger shows, for each decision, which kernel decided, what context was considered, and what the composition result was. An auditor can verify the full decision chain without accessing the system.

This demo tells a story no single-kernel product can: "We catch both the storms you're heading into and the specific violations you're committing right now."
