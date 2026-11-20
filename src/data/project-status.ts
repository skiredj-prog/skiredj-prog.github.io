// Public editorial snapshot, reviewed 2026-11-20.
// These are source-attributed statements, not machine-attested certification.
// Reconcile against each upstream before moving their status forward.
export type SiteLocale = 'fr' | 'en';
export const projectStatus = {
  reviewedAt: '2026-11-20',
  kb3: {
    status: 'enacted_doctrinal_rendering',
    source: '/versions/',
  },
  tenirGov: {
    published: {
      version: '5.7.0',
      date: '2026-10-24',
      commit: '47ef67e3efc5f3008896a7d88bebf929fa0a98f0',
      releaseUrl: 'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',
      pypiUrl: 'https://pypi.org/project/tenir-governance/5.7.0/',
      status: 'verified_published_baseline',
    },
    development: {
      version: '5.7.5',
      mergedAt: '2026-11-20',
      commit: '42513bff3c129996cfb73060ef99c842602634b1',
      sourceUrl: 'https://github.com/skiredj-prog/tenir_governance/commit/42513bff3c129996cfb73060ef99c842602634b1',
      limitsUrl: 'https://github.com/skiredj-prog/tenir_governance/blob/42513bff3c129996cfb73060ef99c842602634b1/CHANGELOG.md',
      status: 'merged_in_main_not_release_verified',
    },
    qualification: 'single_host_bounded_not_general_production_qualified',
  },
  reg: {
    sourceCommit: '574eb124721c6cc8833982721b30eeb94fd01fc0',
    sourceUrl: 'https://github.com/skiredj-prog/reg-conformance/commit/574eb124721c6cc8833982721b30eeb94fd01fc0',
    baseline: 'frozen_RFC_0_to_7',
    revision: 'RFC-4 v0.3 ratified by author 2026-11-19, outside frozen baseline',
    revisionUrl: 'https://github.com/skiredj-prog/reg-conformance/blob/main/revisions/rfc-4-v0.3-2026-11-19.md',
    catalogue: {
      normative: 64,
      exercised: 15,
      registeredUntested: 21,
      notRegistered: 28,
      proposedRegistered: 25,
    },
    resultScope: 'not_a_certification',
  },
} as const;

export const snapshotCopy: Record<SiteLocale, {
  title: string;
  published: string;
  merged: string;
  reg: string;
  scope: string;
  historic: string;
}> = {
  fr: {
    title: 'Point de situation vérifié · 20 novembre 2026',
    published: 'TENIR-Gov 5.7.0 : baseline publiée le 24 octobre, périmètre mono-hôte borné.',
    merged: 'TENIR-Gov 5.7.5 : code fusionné dans main le 20 novembre ; publication PyPI/GitHub non confirmée dans cet état de lecture.',
    reg: 'REG : RFC-0 à RFC-7 gelés ; révision RFC-4 v0.3 ratifiée par son auteur le 19 novembre hors baseline ; 15 propriétés normatives exercées sur 64 recensées, sans certification.',
    scope: 'Les résultats de tests et de laboratoire ne qualifient ni un déploiement client ni une production multi-hôte.',
    historic: 'Les tableaux et constats plus bas décrivent leur date de relevé ; ils ne sont pas tous des états courants.',
  },
  en: {
    title: 'Verified status snapshot · 20 November 2026',
    published: 'TENIR-Gov 5.7.0: published baseline from 24 October with a bounded single-host scope.',
    merged: 'TENIR-Gov 5.7.5: merged into main on 20 November; PyPI/GitHub publication not verified in this review.',
    reg: 'REG: RFC-0 to RFC-7 frozen; RFC-4 v0.3 author-ratified on 19 November outside the baseline; 15 of 64 normative properties exercised, no certification.',
    scope: 'Tests and laboratory results do not qualify a client deployment or multi-host production use.',
    historic: 'Tables and observations below remain dated snapshots; they are not all current states.',
  },
};
