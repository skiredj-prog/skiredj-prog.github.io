---
title: "REG Execution Boundary Diagnostic"
kicker: "Specialized engagement · one critical flow"
description: "Scoped analysis of autonomous-agent execution boundaries: duplicates, interruption, unknown outcomes and reconciliation."
lede: "An agent may initiate an action. Can we establish its outcome before permitting another command?"
sources: "TENIR Labs commercial proposal, 25 October 2026 · scope subject to qualification, not certification"
---

## One flow. One execution boundary. A qualified conclusion.

A refund request was dispatched. Confirmation does not arrive. Should you retry, wait or request a check? This fictional scenario introduces the question without making a real payment.

The **REG Execution Boundary Diagnostic** examines **one critical flow**, its state transitions, hidden assumptions and what the available evidence can genuinely establish.

**Deliverables:** a transition map, control and scenario matrices, a register of assumptions and unknowns, and a report distinguishing **acceptable within the tested scope**, **HOLD**, and **not demonstrated**. "Not demonstrated" is an acceptable result.

To run this work in a workshop, TENIR Labs may use **REG DEMO**, a local instrument for reading scenarios and evidence. It does not connect to the client system: it helps separate authorization, dispatch, outcome and evidence before defining the next control.

[Explore the fictional replay →](/en/replay/) · [Discuss one flow to examine →](/en/contact/)

The replay is an educational illustration. For a real case, scope, available records, deliverables and commercial terms are agreed together before the engagement.

## Who it is for

Banks, insurers, fintechs, AI/cloud integrators, architecture, risk, security and compliance teams considering agent-triggered actions with an **identifiable external effect**: a payment, case change, resource allocation or command to a provider.

The work is **not a model-quality evaluation**. It examines execution authority, retries, interruptions and the evidence required to establish outcomes.

## Questions examined

| Scenario | What needs to be established |
| --- | --- |
| Normal operation | Who admitted the command, how attempts and effects are identified, and what final state is confirmed? |
| Duplicate | Can the same operation, or the same intention under a new identifier, cause a second effect? |
| Missing response | Does the system preserve an **UNKNOWN** outcome instead of assuming failure? |
| Recovery/reconciliation | What authority and evidence are required before retry, closure or human escalation? |

An admission **PASS** is not proof of an external effect. A successful synthetic demo is not proof of a client's deployed system.

## Five proposed steps

1. **Scope**: identify business and technical owners, one flow, destination system, consequences to protect and acceptance criteria.
2. **Map transitions**: represent states, commands, reservations, writes and reconciliation points.
3. **Expose assumptions**: operation identity, privileged writers, provider finality and recovery after failure.
4. **Bounded tests, if expressly agreed**: observe normal, duplicate, interrupted, missing-response and reconciliation scenarios in an authorized environment. **Without a qualified test environment, this remains a document-based assessment and proposed test plan**, not a completed test campaign.
5. **Report**: identify observed outcomes, evidence gaps, necessary protections and decision conditions.

## Engagement boundaries

**One critical flow for the first engagement.** Minimal access, synthetic data and a test environment are preferred. Confidentiality, responsibilities, input records and exclusions are agreed in writing before the work begins.

**Schedule and fees are quoted after qualification** of the flow, the systems involved, the available evidence and the tests expressly agreed. Neither client-environment testing nor a delivery deadline is assumed before written approval.

Code changes, real provider integration, governor deployment and any production enforcement are separately scoped.

## What this diagnostic does not promise

- No compliance certification or legal opinion.
- No blanket guarantee of duplicate-free production execution.
- No proof of real bank settlement unless that external provider was actually tested.
- No automatic deployment of **TENIR-Gov**; a separate runtime boundary may be considered only where the diagnostic justifies one.
- No required positive outcome: **HOLD** and **not demonstrated** remain valid conclusions.

## Starting the discussion

Describe **the action**, its **external effect**, **the cost of duplication or unnecessary blocking**, and **what happens when confirmation is lost**. Please do not send passwords, named financial records or confidential operational documents in your initial message.

[Discuss one flow to examine →](/en/contact/) · [Read the general guided diagnostic offer →](/en/offer/) · [Inspect a fictional report →](/en/offer/example/)

## For a closer technical explanation

The [TENIR/REG Diagnostic & Evidence Workbench](/en/portfolio/workbench/) explains how a configurator and synthetic signed records distinguish authorization from an external effect. **This is currently an overview only: the offline kit is not downloadable from this website.** [REG DEMO](/en/portfolio/reg-demo/) is the internal instrument used when a diagnostic needs a scenario-based walkthrough. The [banking demonstration](/embeds/demonstration-bancaire.html) is separate and fictional, in French.
