// S3 — Source-bound public claim ledger. This is an editorial index, not certification.
// Every record is tied to a fixed source revision and declares what it does not prove.
export type EvidenceStatus =
  | 'SPECIFIED'
  | 'IMPLEMENTED'
  | 'LAB_DEMONSTRATED'
  | 'EXTERNAL_RERUN_REPORTED'
  | 'NOT_QUALIFIED';

export interface ClaimRecord {
  id: string;
  subject: string;
  subjectRevision: string;
  subjectUrl: string;
  status: EvidenceStatus;
  checkedOn: '2026-11-20';
  environment: {fr:string;en:string};
  claim: {fr:string;en:string};
  limitations: {fr:string;en:string};
  evidenceLabel: string;
  evidenceUrl: string;
  independentlyRechecked: boolean;
}

export const claimRecords: readonly ClaimRecord[] = [
  {
    id:'tenir-gov-570-published',
    subject:'TENIR-Gov',
    subjectRevision:'v5.7.0 · 47ef67e3efc5f3008896a7d88bebf929fa0a98f0',
    subjectUrl:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',
    status:'IMPLEMENTED',
    checkedOn:'2026-11-20',
    environment:{fr:'Release logicielle identifiée · profil mono-hôte borné',en:'Identified software release · bounded single-host profile'},
    claim:{fr:'Une version de TENIR-Gov est publiée avec code et périmètre de déploiement documentés.',en:'An identified TENIR-Gov release provides code and documented deployment scope.'},
    limitations:{fr:'Une release n’établit ni le comportement d’un client, ni le multi-hôte de production, ni une certification REG.',en:'A release does not establish client behavior, production multi-host deployment or REG certification.'},
    evidenceLabel:'TENIR-Gov GitHub release v5.7.0',
    evidenceUrl:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',
    independentlyRechecked:false,
  },
  {
    id:'tenir-gov-575-boundaries',
    subject:'TENIR-Gov',
    subjectRevision:'5.7.5 main · 42513bff3c129996cfb73060ef99c842602634b1',
    subjectUrl:'https://github.com/skiredj-prog/tenir_governance/commit/42513bff3c129996cfb73060ef99c842602634b1',
    status:'NOT_QUALIFIED',
    checkedOn:'2026-11-20',
    environment:{fr:'Code fusionné sur main · non assimilé à une release publiée',en:'Merged source on main · not equated with a published release'},
    claim:{fr:'Le durcissement 5.7.5 documente des limites non résolues et un résultat REG NOT_CERTIFIABLE.',en:'The 5.7.5 hardening documents unresolved limitations and a REG NOT_CERTIFIABLE result.'},
    limitations:{fr:'Le commit ne démontre ni une release PyPI/GitHub 5.7.5, ni un pilote accepté, ni une révocation garantie jusqu’au dispatch.',en:'The commit does not prove a 5.7.5 PyPI/GitHub release, accepted pilot, or guaranteed revocation up to dispatch.'},
    evidenceLabel:'CHANGELOG 5.7.5 · commit épinglé',
    evidenceUrl:'https://github.com/skiredj-prog/tenir_governance/blob/42513bff3c129996cfb73060ef99c842602634b1/CHANGELOG.md',
    independentlyRechecked:false,
  },
  {
    id:'reg-normative-inventory',
    subject:'REG Conformance',
    subjectRevision:'574eb124721c6cc8833982721b30eeb94fd01fc0',
    subjectUrl:'https://github.com/skiredj-prog/reg-conformance/commit/574eb124721c6cc8833982721b30eeb94fd01fc0',
    status:'SPECIFIED',
    checkedOn:'2026-11-20',
    environment:{fr:'Inventaire de propriétés normatives du standard · 64 propriétés, dont 15 exercées',en:'Normative standard property inventory · 64 properties, of which 15 are exercised'},
    claim:{fr:'Le dépôt distingue baseline gelée, révision RFC-4 v0.3 ratifiée hors baseline, et couverture de tests du runner.',en:'The repository distinguishes its frozen baseline, the separately ratified RFC-4 v0.3 revision, and runner test coverage.'},
    limitations:{fr:'La présence d’un vecteur ou son exécution ne qualifie pas un runtime de production. 21 propriétés restent enregistrées non testées, 28 non enregistrées.',en:'A listed or executed vector does not qualify a production runtime. 21 properties remain registered but untested, 28 unregistered.'},
    evidenceLabel:'REG Conformance README · commit épinglé',
    evidenceUrl:'https://github.com/skiredj-prog/reg-conformance/blob/574eb124721c6cc8833982721b30eeb94fd01fc0/README.md',
    independentlyRechecked:false,
  },
  {
    id:'ten-ir-raft-review-reported',
    subject:'TENIR-Gov · Raft',
    subjectRevision:'v5.7.0 · 47ef67e3efc5f3008896a7d88bebf929fa0a98f0',
    subjectUrl:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',
    status:'EXTERNAL_RERUN_REPORTED',
    checkedOn:'2026-11-20',
    environment:{fr:'81 tests Raft en loopback sur macOS, résultat communiqué le 26 octobre 2026',en:'81 Raft loopback tests on macOS, result reported on 26 October 2026'},
    claim:{fr:'Une reproduction externe de 81 tests PASS est rapportée dans le parcours Crédibilité.',en:'An external re-run reporting 81 passing tests is described in the Credibility Journey.'},
    limitations:{fr:'Journal brut et empreinte non revérifiés ici ; information attribuée au rapport, sans attestation indépendante de notre revue. Ne couvre pas le multi-hôte physique.',en:'Raw log and hash not reverified here; this is attributed to the reported re-run, not independently attested by this review. Physical multi-host is out of scope.'},
    evidenceLabel:'Parcours Crédibilité · statut du rapport',
    evidenceUrl:'https://tenirlabs.cc/credibilite/',
    independentlyRechecked:false,
  },
] as const;

export function validateClaimRecords(records: readonly ClaimRecord[]): void {
  const known = new Set<string>();
  for(const record of records) {
    if(known.has(record.id)) throw new Error('Duplicate claim ID: '+record.id);
    known.add(record.id);
    if(!/^https:\/\//.test(record.subjectUrl)||!/^https:\/\//.test(record.evidenceUrl)) throw new Error('Missing HTTPS source: '+record.id);
    if(!record.subjectRevision||!record.environment.fr||!record.environment.en||!record.limitations.fr||!record.limitations.en) throw new Error('Missing scope: '+record.id);
    if(record.status==='EXTERNAL_RERUN_REPORTED' && record.independentlyRechecked) throw new Error('Reported rerun cannot be marked independently rechecked: '+record.id);
    if(record.status==='NOT_QUALIFIED'&&!record.limitations.en) throw new Error('Unqualified claim without limit: '+record.id);
  }
}
validateClaimRecords(claimRecords);
