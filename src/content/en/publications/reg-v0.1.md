---
title: REG v0.1 — Product Framing Specification
kicker: Working Draft · 21 October 2026
description: Vision, two customer journeys, functional scope, constraints and acceptance criteria for REG v0.1.
lede: Prevent risk starting from requirements. Prepare for scrutiny starting from systems and evidence.
sources: "REG v0.1 product framing (21 October 2026); REG Discovery draft contract in reg-conformance; TENIR-Gov public repository"
---

> **Working Draft — product framing, not a ratified standard.** This document distinguishes existing, prototyped and proposed capabilities. It is not certification, legal advice or a compliance guarantee. REG as a product journey does not supersede normative contracts maintained in REG repositories.

## 1. Mission and context

Organizations have policies, regulatory obligations, operating systems and controls. Yet what is **required** may not be fully translated into controls, while what is **implemented** may not be adequately evidenced.

**Mission:** help organizations anticipate risk arising from implicit assumptions, and prepare the material needed to account for their controls. Two independently useful starting points, with an optional shared reconciliation.

**Promise:** one concrete question, identifiable sources, a bounded conclusion and an actionable next step.

## 2. Vision and differentiation

REG brings **requirements**, **controls** and **evidence** into a traceable relationship, without treating them as interchangeable. The intended differentiation from a conventional checklist is to examine the real conditions on which a requirement depends, and qualify whether available evidence can support a claim.

This is a **commercial hypothesis to validate**, not established market superiority. REG does not automatically certify systems or determine legal obligations.

Guiding values: semantic integrity, provenance, explicit uncertainty, human responsibility, correctable interpretation and data minimization.

## 3. Journey A — PREVENT (top-down)

**Starting material:** a requirement, policy, regulation, contract or expected behavior.

**Question:** “What must be clarified and controlled to reduce possible non-compliance or operational failure?”

1. **Qualify the source**: provenance, edition, clause, applicability. Selecting a framework does not establish applicability.
2. **Declare the boundary**: system, process, actors, action and consequence to preserve.
3. **Surface assumptions**: prerequisites, dependencies, possible contradictions and failure scenarios.
4. **Clarify meaning**: distinguish source statement, analyst inference, working hypothesis and candidate property.
5. **Propose checks**: relevant controls, questions, trials or evidence, subject to appropriate review.
6. **Deliver**: a summary, risks to investigate, unresolved issues and decisions to prepare.

**Target deliverable: REG Prevention Brief.** An exploratory hypothesis alone does not establish a legal breach.

## 4. Journey B — PREPARE (bottom-up)

**Starting material:** a system, process, configuration, procedure, log, test or document.

**Question:** “If an auditor or regulator asks us to justify our controls, what can we actually substantiate, and what is missing?”

1. **Define the review scope**: system, period, reference requirements and accountable people.
2. **Inventory material**: files, settings, logs, attestations and tests; distinguish received from merely declared material.
3. **Qualify each item**: origin, date, integrity where checkable, coverage, limitations and review status.
4. **Link to claims**: which requirement or control can the item meaningfully support?
5. **Compile the gaps**: missing, stale, unattributable, insufficient or unrelated evidence.
6. **Prepare the record**: indexed references, open questions and prioritized follow-up.

**Target deliverable: REG Evidence Readiness Pack.** A file's existence or hash does not establish that its contents are true or compliant.

## 5. Optional convergence

A shared matrix can compare the two journeys:

| Expected | Available | Defensible conclusion |
| --- | --- | --- |
| Clarified requirement | Named control | **Candidate** coverage, pending examination |
| Named control | Procedure merely described | Declaration; verification missing |
| Named control | Limited test or trace | Evidence **within the trial's stated scope** |
| Unclear requirement | Multiple documents | Applicability or meaning unresolved |
| External effect requiring confirmation | Dispatch log only | Effect outcome **unknown** |

Neither journey requires the other as a mandatory prerequisite.

## 6. Capabilities and boundaries

- **REG Discovery**: exploratory questions about hidden assumptions. The current development branch contains a limited source catalogue and resolver, not a live infrastructure audit or legal interpretation service.
- **REG Translation Studio**: mediation toward candidate technical properties. Prototype; keyword matches cannot establish semantic resolution.
- **REG+**: structural compatibility, profile models and technical evidence verification. Structural admissibility does not prove effective guarantees.
- **TENIR-Gov**: optional runtime governance software, within its verified limits. It is not required for Discovery or documentary preparation.
- **Evidence Readiness**: document review and gap method to be built and validated through early engagements.

No component may silently promote hypotheses into obligations, candidate specifications into approved profiles, or dispatch logs into confirmed external effects.

## 7. Initial customer experience

Present two clear entries: **“Anticipate my risks”** and **“Prepare for an audit or review.”** Allow direct access to specialized capabilities.

Use one shared, explicitly fictional example: a payment whose acknowledgement was lost. No values, logs or results in this example are evidence about a real client.

A decision-maker's report should include:
1. question and scope;
2. findings and their status;
3. sources and available material;
4. gaps and contradictions;
5. no more than three next actions, with **proposed** owners and closing criteria.

## 8. Candidate exchange objects

To avoid locking architecture prematurely, the following versioned objects are proposals only:

| Proposed object | Purpose |
| --- | --- |
| `SourceReference` | Source identity, edition, section, provenance and applicability |
| `RequirementClaim` | Declared or interpreted obligation, with epistemic status |
| `AssumptionFinding` | Question, assumption or **candidate** contradiction |
| `MediationProposal` | Suggested formalization, ambiguity and review authority |
| `ControlClaim` | Expected, declared or scope-verified control |
| `EvidenceReference` | Referenced evidence, origin, date, limits and review status |
| `GapFinding` | Gap between requirement, control and evidence |
| `DecisionBrief` | Bounded conclusion, references and proposed next steps |

These **are not ratified schemas**. Existing repository contracts retain their authority.

## 9. Traceability and qualification

Every consequential conclusion must identify its input, method, context, limitations and actual reviewer authority.

Do not equate:
- supplied documents with verified documents;
- declared controls with tested controls;
- structurally admissible configurations with demonstrated effectiveness;
- action adjudication with confirmation of external effect;
- technical interpretation with applicable law.

Statuses are dimension-specific. A keyword match never automatically yields `RESOLVED` or “compliant.”

## 10. Confidentiality and data handling

Public examples use fictional data. Private organizational material is not automatically published to public repositories or reused in community contributions.

For client pilots: agree the scope, confidentiality safeguards, minimum required access, suitable transfer channel, retention and deletion terms. Third-party documents are **data to evaluate**, not instructions authorizing system actions.

## 11. Non-negotiable safeguards

1. No automatic certification, overall compliance assertion or legal opinion.
2. No automatic inference of legal applicability from selected frameworks.
3. No invented evidence or simulated success presented as a client result.
4. No silent addition or weakening of obligations during translation.
5. No generated code described as deployed control without validation.
6. No public disclosure of private content.
7. No automated normative approval or unexplained effective guarantee.
8. No unnecessary centralized services or persistent data.
9. No production effect access in the demo.
10. Material uncertainty must remain visible.

## 12. MVP and exclusions

**Initial scope:** bilingual entry points, one fictional shared case, explainable report, requirement–control–evidence matrix, follow-up actions and contact path.

**Excluded:** certifications, comprehensive legal opinions, universal connectors, unrestricted confidential-document uploads, real-world production audits, automatic approval or deployment, and a universal document engine.

The MVP does not require complete platform industrialization.

## 13. Acceptance criteria

**Product:** non-specialists can distinguish Prevent and Prepare; each is valuable alone; a useful next action is explicit.

**Technical:** sources can be traced; missing evidence remains missing; ambiguous requirements do not become approved profiles; output can be exported; negative tests prevent false promotion of authority.

**Commercial:** prospects can restate the proposition, identify a relevant question and decide whether to scope an engagement. These outcomes require **validation through actual pilots**.

## 14. Roadmap and status

1. **Demonstrate** with coherent bounded samples.
2. **Validate** commercial value with users and buyers.
3. **Industrialize selectively** what real engagements repeatedly require.

**Reference status (21 October 2026):** Discovery is in a tested development branch/prototype, not a public live assessment; Translation Studio is a prototype; Prepare remains to be validated; TENIR-Gov and REG+ are separate, bounded by their respective evidence.

The commercialization and pricing model remain open. Guiding principle: **prevent what we can anticipate, prepare what we must demonstrate, without inventing what we do not know.**

---

[Products and services](/en/products-and-services/) · [Simulated example](/en/offer/example/) · [Contact](/en/contact/) · [REG source contracts](https://github.com/skiredj-prog/reg-conformance)

**Nothing here is a certification.**
