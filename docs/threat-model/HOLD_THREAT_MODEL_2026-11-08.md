# HOLD — Threat model note: three adversarial scenarios

**Document type:** threat model and design note. **Not a test report.**
**Classification:** internal
**Date:** 2026-11-08
**Code anchor:** `skiredj-prog/hold` @ `f3bb683`
**Reference context:** interactive prototype demo mission `op-demo-001` — hotel booking, Hôtel Atlas, €120, ceiling €150, authority "Responsable", effect state UNKNOWN, revocation STOP.

**Why this note lives in the website repository.** It is held here, not in
`skiredj-prog/hold`, so that the HOLD submission stays exactly as submitted
at `f3bb683`. Nothing in this note changes HOLD; it only reads it.

## Status of this document — read before citing

No attack described here was executed. No adversarial campaign was run, no
test was written for these scenarios, and no run, trace or artefact is
attached. This note reasons on paper about three attack vectors and about
what the current implementation does and does not answer.

**This note does not constitute red-team evidence.** In particular it does
not establish the anti-fragmentation claim that an earlier claims register
recorded as "Demonstrated (Red Teaming)" — that claim remains unsupported
until an adversarial campaign is actually run and its artefacts anchored to
a commit.

Each defence below is labelled:

- **IMPLEMENTED** — present in the code at the anchor commit, with the
  source location given, and in most cases exercised in E1-A6.
- **DESIGN INTENT** — described here as the intended answer, **not** present
  in the code at the anchor commit. These appear again in §5.

The design principle under test: *one authorized action, one controlled
effect, one proven success*. The claim being examined is not that HOLD is
unbreakable, but the narrower one that every failure mode degrades into a
human decision rather than a silent uncontrolled effect.

---

## 1. Attack 1 — Ceiling bypass via fragmentation

### 1.1 Threat

The agent holds an authorization scoped to Hôtel Atlas with a €150 ceiling
for a €120 booking. A compromised or prompt-injected agent splits the
booking into two sub-transactions of €80, each individually under the
ceiling, totalling €160.

| Step | Action | Intent |
|---|---|---|
| 1 | Booking request A: €80, Hôtel Atlas, night of D | Individually under ceiling |
| 2 | Booking request B: €80, same provider, night, beneficiary | Individually under ceiling |
| 3 | Correlate both confirmations into one effective stay | Bypass the €150 cap |

The attack targets any per-transaction validation model that ignores
correlation between operations.

### 1.2 What the implementation answers

**Cumulative envelope accounting — IMPLEMENTED.** Authorization is enforced
at the mission envelope, not per transaction. A request that would carry the
mission past its envelope is refused under rule `I4/ENVELOPE` before
dispatch (`hold/runtime.py`, the `I4/ENVELOPE` paths around lines 351–400).
Exercised in E1-A6: 6 envelope refusals (condition C-llama, scenario S11).

**Duplicate-effect refusal — IMPLEMENTED.** Re-reservation attempts against
an existing effect are refused under `I1`. Exercised in E1-A6: 19 refused
duplicate-booking attempts across 16 runs.

**Escalation rather than silent retry — IMPLEMENTED.** On envelope breach,
where the profile sets `envelope_breach = ask_authority` and an authority is
available, HOLD opens an `ENVELOPE_BREACH` request and returns `HELD` rather
than dispatching or retrying (`hold/runtime.py:351–363`). A one-shot
authority grant is recorded as `ENVELOPE_ONCE` and cannot be reused: a second
attempt under the same grant is refused (`hold/runtime.py:399–400`).

**Semantic correlation across decorrelated requests — DESIGN INTENT.** The
defence described in earlier drafts — flagging two requests as one logical
effect from provider, date range, amount proximity and mission ID, with a
configurable correlation window — is **not implemented at this commit**.
Cumulative accounting is keyed to the mission envelope. An attacker who
spreads requests across *separate missions* is not answered by envelope
accounting, and no correlation heuristic exists to catch that. See §5.1.

### 1.3 Outcome, within the implemented scope

Within one mission, request B is refused before dispatch; the provider is
not contacted for it; the effect state stays UNKNOWN; the mission is paused
pending the authority rather than revoked automatically. The authority can
grant a one-shot exception, or issue STOP.

### 1.4 Residual risk

| Risk | Status |
|---|---|
| Requests spread across separate missions or sessions | **Open.** Envelope accounting is per mission; no cross-mission correlation exists at this commit. |
| Decorrelated beneficiary metadata within one mission | Partly covered: the envelope is consumed cumulatively regardless of metadata, so amount-based breach is still caught. |
| Ceiling checked only at dispatch | Covered for the dispatch path; confirmation-stage re-validation is not separately evidenced and should be read as unverified. |

**Rating: open pending §5.1.** The earlier rating of "Low" assumed a
correlation engine that does not exist yet.

---

## 2. Attack 2 — Exploitation of uncertainty (proof hallucination)

### 2.1 Threat

A compromised provider endpoint, or a MITM, returns a fabricated
acknowledgment to push the effect state from UNKNOWN to a success,
triggering payment or downstream action.

| Step | Action | Intent |
|---|---|---|
| 1 | Agent dispatches booking to Hôtel Atlas or a spoofed endpoint | Normal flow |
| 2 | Forged 200 OK with a fake booking reference returned | Force success |
| 3 | Agent logs "booking confirmed" and closes the mission | Payment on unverified proof |

### 2.2 What the implementation answers

**UNKNOWN as default state — IMPLEMENTED.** The transition out of UNKNOWN is
not driven by the agent's narration. In E1-A6, 10 unprovable success claims
were made by the model; none changed mission state. 25 of 33 missions closed
as `CLOSED_UNCONFIRMED` or `CLOSED_NO_EFFECT`, never as a false success.

**Correlated receipt required — IMPLEMENTED, with an important caveat.** A
provider response is an input, not a proof; closure as completed requires a
receipt correlated to the operation. **The receipt is a correlated receipt
from the synthetic provider, not a cryptographic one.** The independent audit
is explicit on this point. Any wording implying a signed or cryptographically
verifiable receipt overstates the current mechanism.

**No silent retry — IMPLEMENTED.** UNKNOWN does not trigger automatic
re-dispatch; re-execution requires explicit re-authorization.

**Verification through an independent channel — DESIGN INTENT.** A callback
or status poll against a provider-controlled endpoint, independent of the
original request path, is **not implemented**. In E1-A6 the provider is
synthetic and the authority simulated. See §5.2.

### 2.3 Residual risk

| Risk | Status |
|---|---|
| Provider compromise at the key level | Out of scope; no key management exists for provider receipts at this commit. |
| A receipt that is well-formed but not externally verifiable | **Open.** Correlation is internal; there is no second channel. See §5.2. |
| Approver conflates "authorize verification" with "confirm the effect" | Partly addressed in the prototype copy, which separates the two actions. Not measured. |

**Rating: medium, concentrated on the absence of an independent
verification channel.**

---

## 3. Attack 3 — Social engineering of the Authority

### 3.1 Threat

An attacker impersonates the Responsable — phishing, session hijack, or a
forged "lift STOP" message — to resume a revoked mission, approve a blocked
transaction, or force a success transition.

| Step | Action | Intent |
|---|---|---|
| 1 | Mission `op-demo-001` revoked with STOP by the legitimate authority | Normal authority action |
| 2 | Forged "resume mission" message spoofing that identity | Unauthorized revocation lift |
| 3 | Agent resumes execution | Uncontrolled effect |

### 3.2 What the implementation answers

**STOP is terminal — IMPLEMENTED.** `REVOKED` is a member of the terminal
`CLOSED` set (`hold/runtime.py:41`), and a revoked mission returns `REVOKED`
on any further action (`hold/runtime.py:329`). There is no lift path:
continuing requires a new mission with a new operation ID and a fresh
authorization. This removes the "lift STOP" vector as described.

**The agent is not an authority actor — IMPLEMENTED.** Authority decisions
enter through `Mission.answer()` and `Mission.revoke()`
(`hold/runtime.py:228`, `:712`, `:851`), not through the agent's tool path.

**Full audit trail — IMPLEMENTED.** Authority actions are appended to the
journal with actor, channel and cause (`hold/runtime.py:849`).

**Cryptographically signed authority decisions — DESIGN INTENT, NOT
IMPLEMENTED.** This is the most important correction in this note. Earlier
drafts stated that every authority action "must carry a cryptographic
signature bound to the authenticated identity of the Responsable" and that
an unsigned instruction "is rejected at the protocol level". At this commit
that is not the case:

- `Mission.answer(question_id, code, *, channel, evidence)` and
  `Mission.revoke(*, by, channel)` take the actor as a **plain string**.
  There is no signature parameter and no verification step.
- Signing exists for **profiles only** (`hold/profile.py`: `sign`,
  `signature_valid`, `load_profile(..., require_signature=False)`), and
  `require_signature` **defaults to False** (`hold/profile.py:264`,
  `hold/runtime.py:109`).
- The independent audit of the E1-A6 package records that the profiles in
  that package are **unsigned**.
- In E1-A6 the authority was simulated. The authenticated-identity layer the
  scenario depends on was not exercised at all.

Consequently the stated outcome — "the forged lift instruction is rejected
(invalid or absent signature)" — **does not hold at this commit**. What does
hold is that STOP is terminal, so the specific "lift STOP" vector fails for
a different and weaker reason: there is no lift path to forge against. A
forged *first* revocation, or a forged envelope approval on a live mission,
is not currently defended by signature verification.

### 3.3 Residual risk

| Risk | Status |
|---|---|
| Forged authority decision on a live mission | **Open.** No signature verification on authority actions. See §5.3. |
| Genuinely compromised authority credentials | Out of scope; no MFA or session model exists at this commit. |
| Insider threat; a legitimate but malicious authority | Open. No separation of duties or dual authorization. |
| Social engineering of a real authority under time pressure | Open and unmeasured. The prototype copy separates verification from confirmation; this has not been tested with users. |

**Rating: open.** The earlier rating of "Medium, concentrated on the human"
assumed a signature layer that does not exist.

---

## 4. Cross-attack synthesis

| Attack | Target | Implemented answer | Not yet implemented | Failure mode today |
|---|---|---|---|---|
| 1 — Fragmentation | Authorization ceiling | Cumulative mission envelope (`I4/ENVELOPE`), duplicate refusal (`I1`), one-shot grants | Cross-mission semantic correlation | Human escalation **within a mission**; undefended across missions |
| 2 — Proof hallucination | Effect state integrity | UNKNOWN by default, correlated receipt, no silent retry | Independent verification channel; cryptographic receipts | Human verification or STOP |
| 3 — Authority impersonation | Human decision channel | STOP terminal, agent cannot act as authority, audit trail | Signed authority decisions, authenticated identity | Audit trail records it; **it is not rejected** |

The pattern the note set out to show — that no attack produces a silent
uncontrolled effect — holds for attacks 1 and 2 within one mission, and
holds for attack 3 only in the narrow "lift STOP" variant. It is **not**
established for cross-mission fragmentation or for a forged authority
decision on a live mission.

---

## 5. What must be built before these defences can be claimed

1. **Correlation engine (Attack 1).** Define explicit correlation rules —
   provider, date range, amount proximity, mission ID, time window — decide
   whether they apply across missions, and test them against deliberate
   decorrelation.
2. **Receipt specification (Attack 2).** Define what counts as a verifiable
   receipt: required fields, signature scheme, correlation protocol, and a
   verification channel independent of the request path.
3. **Signature scheme for authority decisions (Attack 3).** Specify key
   management, signature format, verification at `answer()` and `revoke()`,
   and revocation of compromised keys. Decide whether `require_signature`
   should default to True.
4. **Duress signal.** Consider a silent duress flag freezing pending
   missions, and a decision-latency threshold that pauses high-value
   missions automatically.
5. **Run the exercise.** Until the three scenarios are executed against the
   implementation — with artefacts anchored to a commit — this note stays a
   threat model, and no claim in the public register may cite it as
   evidence.

---

## Disclaimer

This is a threat model built on the illustrative prototype scenario
`op-demo-001`. The data, providers and workflows are fictional. No real
model, provider or webhook is invoked, and no attack was executed. The
revocation mechanism stops the mission; it does not cancel an external
effect already produced — a limitation by design that any production
deployment must account for.
