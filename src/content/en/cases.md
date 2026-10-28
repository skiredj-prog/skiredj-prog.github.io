---
title: Documented cases and teaching scenarios
kicker: Read an incident as a chain of responsibility
description: Sourced cases showing how an AI promise becomes a decision, an effect and sometimes a responsibility that is hard to assign.
lede: A case is not only about naming a culprit. It reveals actors, sequence, impact and available evidence.
sources: Primary sources or published references are named per case; TENIR interpretations remain separate
---

## Replay the banking scenario
To learn the distinction between authorization, external effect and evidence, [replay the uncertain transfer event by event](/en/replay/payment/). This is a teaching scenario: no real banking settlement is demonstrated.

## How to read a case

```text
Market promise
      ↓
Purchase or integration
      ↓
Delegation
      ↓
Decision or action
      ↓
Incident
      ↓
Search for responsibility
      ↓
Evidence available or missing
```

## Case 1 — When an answer becomes a promise

An airline chatbot provided a customer with incorrect information about a refund possibility. The important question is not only whether the answer was wrong, but whether the organization could establish which rules, data and limits shaped it.

**Status:** documented case — a chatbot provided incorrect information; this was not an autonomous agent executing a transaction.

**Source:** [Civil Resolution Tribunal, *Moffatt v. Air Canada*, 2024 BCCRT 149](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html). The decision does not by itself establish the exact technology behind the assistant.

## Case 2 — When no one knows whether the operation was sent

**Status:** teaching scenario — no real banking settlement is demonstrated.

An instruction is sent and the provider’s response disappears. Treating silence as failure and repeating the operation can create a second effect.

This is an educational scenario, not proof of a real banking settlement. It illustrates why authorization is not proof of an external effect.

## A reading rule

> **What a case supports should remain narrower than what the market invites us to imagine.**

[See the players →](/en/actors/)
