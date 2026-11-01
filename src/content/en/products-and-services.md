---
title: Products & Services
kicker: TENIR Labs · offerings and instruments
description: Distinguish the TENIR framework, REG standard, REG+ mediation, TENIR-Gov runtime and TENIR Labs services.
lede: "A rule to understand, an AI use to clarify or a review to prepare? A guided diagnostic can help establish the facts, the gaps and the next decision."
sources: REG v0.1 Working Draft — October 21, 2026
---

## From requirements to execution: distinct roles

## Start with a guided diagnostic

You have a business, compliance or design question. Start with a specific situation: understand what a requirement implies, locate the evidence supporting a control, or clarify how AI is used in a process.

**The deliverable, within the agreed scope:** a sourced summary of findings, unknowns and gaps, with prioritized next steps. It helps prepare a decision and makes its supporting information traceable.

| You bring | We examine together | You receive |
| --- | --- | --- |
| A rule or process, with the documents and evidence available | Requirements, reported controls, verifiable information and gaps | A summary with its sources and limits, followed by proposed checks or decisions |

The diagnostic is a **service to scope together**, rather than software to install. An initial remote conversation helps choose the question. A proposal then sets out scope, authorized access, confidentiality, deliverables and commercial terms. No technical access or sensitive document is required to make contact.

[Discuss a guided diagnostic →](/en/contact/)

The contact page helps prepare your message; you review it before sending it through your own email app.

## Five distinct roles, one question: what can be authorized and evidenced?

| Layer | Purpose | What it does not claim |
| --- | --- | --- |
| **TENIR** | Diagnostic framework for systems under pressure and the options they must preserve. | Not an API or a compliance product. |
| **[REG](/en/standard/)** | **Proposed** Runtime Execution Governance standard: standing, structure, commit, evidence and failure behavior. | A specification is not proof that an implementation conforms. |
| **[REG+](/en/architecture/)** | **Out-of-runtime** mediation of versioned normative intent, deployment assumptions and constraints, aiming at a candidate profile with invariants or an explicit rejection. | Not a shipped or certified autonomous admission engine; formalization and verification criteria remain incomplete. |
| **[TENIR-Gov](/en/portfolio/gov/)** | Software implementation of controls at the execution boundary, within a declared deployment scope. | The bounded single-host beta does not establish exactly-once external effects or universal compliance. |
| **Prevent / Prepare** | Two TENIR Labs service methods: requirements → candidate controls; systems → verifiable evidence. | Working approaches, **not another definition of REG**. |

**Core difference:** models and policies may propose an action; the authority to commit it and evidence that an external effect occurred are separate questions. A locally signed decision does not prove the provider's effect.

## Logical architecture and integration boundary

```text
Business requirement + testable assumptions + constraints
               │
        REG+ (out-of-runtime mediation)
               │ candidate profile / rejection / unknowns
               ▼
Agent or app ─────── versioned action intent
               │
               ▼
[REG controls at the execution boundary]
  1. Standing: authority, scope, expiry, revocation
  2. Structure: state, commitments, freshness, constraints
  3. Commit: action/grant/state binding, replay and race safety
               │ admissible and still-valid decision
               ▼
Authorized connector ─── external API / provider
               │ receipt or indeterminate outcome
               ▼
Reconciliation + decision and evidence ledger
```

**Minimum integration contract to agree:** agent identity and delegation; intent ID and idempotency key; canonical action and parameters; profile version and observed state; validity bounds; connector outcome; correlation and receipt provenance. Exact fields must be checked against the applicable RFCs and implementation version.

**Failure cases to test before ENFORCE:** concurrent commits, revocation between evaluation and commit, retry after lost response, stale telemetry, ledger unavailability, connector bypass and independent provider attestation. **UNKNOWN is neither success nor failure**; recovery is conditional.

This is a **target logical view**, not evidence of a live integration. Read the [detailed architecture](/en/architecture/), [published status](/en/status/) and [simulated demonstrations](/en/portfolio/demos/) to distinguish contracts, implementations and observed behavior.

## Two service methods: Prevent and Prepare

- [Products and their current status](/en/portfolio/products/) — capabilities, access and limits.
- [Services](/en/portfolio/services/) — scope, process and deliverables.
- [Demonstrations](/en/portfolio/demos/) — what you can explore and what each example lets you observe.

## After the diagnostic: optional next steps

When the question concerns AI, the review may cover its actual presence in tools, the data it processes, the decisions or actions it influences and the safeguards available. Reported use and observed use remain distinct.

A **non-blocking observation** pilot may be considered if integration is justified and authorized. It requires assessment of technical impact, data handling and responsibilities; it is not described as risk-free or ready for every client.

Blocking governance (**ENFORCE**) is a later step, subject to validation of invariants, failure modes and bounded guarantees. It is neither automatic nor included in the diagnostic.

## The problem

Two recurring gaps may arise in organizations:

**Upstream** : a rule is adopted, but its conditions, dependencies, and hidden assumptions stay unstated. Compliance is attempted without knowing what is truly required.

**Downstream** : systems run, procedures exist — but when accountability is needed, you cannot clearly show what is covered, partially verified, or missing.

These two service methods can examine both gaps independently or together.

## Track A — PREVENT

### From requirement to mastery

*« What does this rule actually imply for our systems, our decisions, our exposure ? »*

- **Extract** : preserve the distinction between original text and interpretation
- **Uncover** : surface hidden dependencies, edge cases, ambiguities
- **Formalize** : turn stated intent into candidate rules — flag what remains unclear
- **Map** : match controls to requirements, or identify the gap
- **Deliver** : a prevention brief listing critical assumptions, risks, and next verification steps

## Track B — PREPARE

### From systems to defensible evidence

*« If an auditor or regulator asks tomorrow, what can we actually demonstrate ? »*

- **Scope** : define what is included — and what is not
- **Inventory** : documents, configs, logs, tests — explicitly mark what is claimed but unavailable
- **Qualify** : origin, date, validity, linkage, confidence level
- **Cross-reference** : match what is expected against what is available
- **Build** : an exportable record with an explicit gap register
- **Act** : list what must be retrieved, verified, or created to complete the record

## Convergence : the gap matrix

When both tracks are populated, the method aligns:

| Expected              | Available          | Status                     |
| --------------------- | ------------------ | -------------------------- |
| Requirement clarified | Control identified | Candidate coverage — to verify |
| Requirement clarified | Control claimed ⚠️ | Needs verification         |
| Requirement clarified | Evidence missing ❌ | Gap — action required      |
| Assumption unresolved | —                  | Clarify before deciding    |
| Reference ambiguous   | —                  | Pending stable formulation |

**No cell becomes "compliant" through presence alone.** Every finding carries its source, its date, and its limits.

## Reading the findings

An available document, a statement and a verified control carry different statuses. A gap remains visible and explains which conclusions it prevents. The summary helps choose the next check; it is neither certification, legal advice nor production validation. This engagement does not claim real-time auditing of systems or manufacture evidence to fill gaps.

## Project status

Reference status as of **October 21, 2026**:

- **Version:** 0.1 — consolidated framing, Working Draft.
- **Available:** a public simulated example, with no client data.
- **In development:** Discovery tested on a development branch, in private preview; Translation Studio prototype; Readiness in progress.
- **To validate:** the value and format of the service through the first real engagements.

**REG v0.1 specification — Working Draft:** publication in preparation. The full text is not yet available on this site.
[See the simulated file — no client data →](/en/offer/example/)
[Contact us →](/en/contact/)
