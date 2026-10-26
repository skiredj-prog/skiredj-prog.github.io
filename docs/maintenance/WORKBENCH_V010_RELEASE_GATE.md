# Workbench v0.1.0 — exact-byte publication gate

This is a **release runbook**, not proof of a deployed archive. The active public file remains a staged offline kit in `data/workbench-publication.v1.json`.

## Candidate identity

- Artifact: `TENIR-REG-public-consultation.zip`
- Exact size: **180,527 bytes**
- Exact SHA-256: `86b246dbfcdd57577dbec20f268f344c51220186336bfada32626c9a8d83f671`
- Private source candidate: `tenir-reg-demo` PR #4, head `b3993c9d64e9401ceb27052f200ff3908c2d817f`
- Original private CI: `40199134077` (cryptographic dossier verification, packaging, privacy audit and Chromium).
- On-site editorial pages: `/portfolio/workbench/` and `/en/portfolio/workbench/`.

## Controlled upload protocol

1. Obtain the original candidate ZIP, NOT the GitHub Actions wrapping ZIP. Locally run `sha256sum TENIR-REG-public-consultation.zip`. Verify the exact size and SHA-256 above.
2. Create a **new GitHub branch/PR** on `skiredj-prog.github.io`. Upload the original ZIP as `public/downloads/TENIR-REG-public-consultation.zip`. Do not upload the private development repository or unreviewed source reference directories.
3. **In the same release PR**, edit `data/workbench-publication.v1.json`: set `status` to `PUBLISHED`, `public_url` to `https://tenirlabs.cc/downloads/TENIR-REG-public-consultation.zip`, and `manual_approval_reference` to an actual, recorded approval of **this exact hash**. Update the `workbench-private-candidate.distribution_control` entry in `data/asset-registry.v1.json` to `state=PUBLISHED`, `binary_public=true` **without changing the historical private candidate's `public_url=null`**.
4. CI `npm run build` checks the release file **before and after** Astro generation; it FAILS on wrong or absent bytes, unauthorized public ZIP, extra downloads, or premature `PUBLISHED` state. `npm run check:assets` checks the PMO mirror and bilingual site wording.
5. Obtain explicit PR review of archive rights, SHA, data privacy, owner authorization and exact destination. After approval, merge. GitHub Pages deploy must be GREEN and the public HTTP response must be checked independently.
6. Download the actual published URL and **rehash the received bytes**. Only then may the release be recorded as `PUBLIC_AVAILABLE` in operational PMO communication. GitHub Actions success by itself does not prove a third party can retrieve the exact ZIP.

## Before release

The user may locally download the candidate for private review from the chat artifact. This is not a public-site URL. Do not link `sandbox:` assets in the official site.

## Boundaries

The archive is self-contained and bilingual but **synthetic and offline**. It does not dispatch or observe real provider effects or call TENIR-Gov v5.7.0. PASS is distinct from external confirmation and UNKNOWN is not a retry authorization. REG structural admissibility does not imply effective conformance. The signed dossier/receipt preserve a relative key-bound integrity claim, **not independent signer identity**.

The release notes at `docs/releases/workbench-v0.1.0.md` are an unsigned **sidecar**. They are not injected into the frozen 15-entry ZIP because any binary repackaging invalidates its approved SHA.

## CI status states

| Metadata | Binary in `public/downloads` | Build |
| --- | --- | --- |
| STAGED_PENDING_BINARY | Absent | PASS; no download button |
| STAGED_PENDING_BINARY | Present | **FAIL CLOSED** |
| PUBLISHED | Absent | **FAIL CLOSED** |
| PUBLISHED | Present but wrong SHA/size | **FAIL CLOSED** |
| PUBLISHED | Exact 180,527-byte frozen candidate | PASS, gated download visible |

**Do not merge a ZIP-only commit to `main` and do not mark the metadata published without the ZIP.** Both changes must be reviewed together.
