export type Locale = 'fr' | 'en';
export type EvidenceLevel = 'scoped-demonstration' | 'exploratory-experiment' | 'published-reference' | 'not-established';
export type EvidenceObject = 'tenir-gov' | 'hold' | 'reg' | 'ai-safe2' | 'research';

export interface EvidenceCard {
  id: string;
  object: EvidenceObject;
  title: string;
  claim: string;
  level: EvidenceLevel;
  environment: string;
  observed: string[];
  notEstablished: string[];
  sourceLabel: string;
  sourceHref: string;
  versionOrCommit?: string;
  dateChecked: string;
}

const shared: Record<Locale, EvidenceCard[]> = {
  fr: [
    {
      id: 'tenir-gov-v570', object: 'tenir-gov', title: 'TENIR-Gov v5.7.0',
      claim: 'Une frontière d’exécution peut évaluer une action proposée sous une politique configurée avant son dispatch.',
      level: 'scoped-demonstration', environment: 'Code public · mono-hôte · scénario borné',
      observed: ['Décisions déterministes dans le périmètre configuré.', 'États ALLOW, HOLD et HARD VETO dans le scénario publié.', 'Le résultat UNKNOWN n’est pas traité comme une permission de relancer.'],
      notEstablished: ['Aucune sécurité universelle.', 'Aucune validation de production bancaire.', 'Aucune preuve multi-hôte ou d’infrastructure critique.'],
      sourceLabel: 'Dépôt TENIR-Gov · release v5.7.0', sourceHref: 'https://github.com/skiredj-prog/tenir_governance', versionOrCommit: 'v5.7.0', dateChecked: '10 novembre 2026'
    },
    {
      id: 'hold-llama-e1', object: 'hold', title: 'HOLD · expérience Llama 3.2 3B',
      claim: 'Dans une campagne synthétique exploratoire, le plancher HOLD a refusé les violations définies par le protocole dans la condition protégée.',
      level: 'exploratory-experiment', environment: '33 runs · fournisseur synthétique · protocole figé',
      observed: ['164 propositions d’effet ont atteint le plancher.', '8 missions ont été complétées avec preuve.', '0 violation détectée dans la condition HOLD ; 66 pour le modèle seul selon la convention publiée.'],
      notEstablished: ['Ce résultat ne couvre pas un fournisseur réel.', 'Un seul modèle et une seule famille de scénarios sont observés.', 'Le résultat ne constitue pas une garantie générale ni une certification.'],
      sourceLabel: 'Dépôt HOLD · README et audit Harv Banning', sourceHref: 'https://github.com/skiredj-prog/hold', versionOrCommit: 'Campagne E1 · Llama 3.2 3B', dateChecked: '10 novembre 2026'
    },
    {
      id: 'reg-conformance-v061', object: 'reg', title: 'REG Conformance v0.6.1',
      claim: 'Un profil de conformance peut tester des contrôles déclarés dans un périmètre technique explicite.',
      level: 'scoped-demonstration', environment: 'Profil Raft loopback · mono-hôte',
      observed: ['Le score 46/46 est rattaché à REG v0.6.1 et TENIR-Gov v5.6.1.', 'Le périmètre publié est un profil mono-hôte loopback.'],
      notEstablished: ['Ce score ne vaut pas pour toutes les installations.', 'Il ne constitue pas une certification réglementaire.', 'Il ne prouve pas l’efficacité d’un déploiement différent.'],
      sourceLabel: 'REG Conformance v0.6.1', sourceHref: 'https://github.com/skiredj-prog/reg-conformance/releases/tag/v0.6.1', versionOrCommit: 'REG v0.6.1 · TENIR-Gov v5.6.1', dateChecked: '10 novembre 2026'
    },
    {
      id: 'ai-safe2-v31', object: 'ai-safe2', title: 'AI SAFE² v3.1',
      claim: 'Un framework externe peut fournir une grille de questions pour examiner les contrôles d’un système agentique.',
      level: 'published-reference', environment: 'Framework public · 161 contrôles · Challenge 001',
      observed: ['Le framework publie des contrôles et des profils de test.', 'Il distingue les plans d’enforcement et leurs limites.'],
      notEstablished: ['AI SAFE² n’est pas une preuve de TENIR.', 'La présence d’un contrôle dans le framework ne valide pas une implémentation.', 'Le framework n’est pas présenté ici comme une certification.'],
      sourceLabel: 'Cyber Strategy Institute · AI SAFE²', sourceHref: 'https://cyberstrategyinstitute.com/ai-safe2/', versionOrCommit: 'v3.1', dateChecked: '10 novembre 2026'
    },
    {
      id: 'ssrn-7291620', object: 'research', title: 'Working paper SSRN 7291620',
      claim: 'Le préprint décrit une architecture de membrane constitutionnelle et rapporte des mesures sur la révision R5.0.0.',
      level: 'published-reference', environment: 'Préprint · 44 pages · non évalué par les pairs',
      observed: ['Les chiffres 557 tests, 96 % et 12,4 ms sont rattachés exclusivement à R5.0.0.', 'L’abstract précise que l’efficacité de gouvernance reste une question ouverte.'],
      notEstablished: ['Le préprint n’est pas une revue par les pairs.', 'Les mesures R5.0.0 ne sont pas le tag v5.7.0.', 'Ces chiffres ne constituent pas une validation terrain.'],
      sourceLabel: 'SSRN 7291620', sourceHref: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7291620', versionOrCommit: 'R5.0.0 · publié le 15 août 2026', dateChecked: '10 novembre 2026'
    }
  ],
  en: []
};
shared.en = shared.fr.map((card) => ({ ...card,
  title: ({'tenir-gov':'TENIR-Gov v5.7.0','hold':'HOLD · Llama 3.2 3B experiment','reg':'REG Conformance v0.6.1','ai-safe2':'AI SAFE² v3.1','research':'SSRN 7291620 working paper'} as Record<EvidenceObject,string>)[card.object],
  claim: ({'tenir-gov':'An execution boundary can evaluate a proposed action under a configured policy before dispatch.','hold':'In an exploratory synthetic campaign, the HOLD floor refused protocol-defined violations in the protected condition.','reg':'A conformance profile can test declared controls within an explicit technical scope.','ai-safe2':'An external framework can provide a question set for examining agentic-system controls.','research':'The preprint describes a constitutional membrane architecture and reports measurements for revision R5.0.0.'} as Record<EvidenceObject,string>)[card.object],
  environment: card.environment.replace('Code public · mono-hôte · scénario borné','Public code · single host · bounded scenario').replace('fournisseur synthétique · protocole figé','synthetic provider · frozen protocol').replace('Profil Raft loopback · mono-hôte','Raft loopback profile · single host').replace('Framework public · 161 contrôles · Challenge 001','Public framework · 161 controls · Challenge 001').replace('Préprint · 44 pages · non évalué par les pairs','Preprint · 44 pages · not peer reviewed'),
  observed: card.observed.map((x) => x.replace('Décisions déterministes dans le périmètre configuré.','Deterministic decisions within the configured scope.').replace('États ALLOW, HOLD et HARD VETO dans le scénario publié.','ALLOW, HOLD and HARD VETO states in the published scenario.').replace('Le résultat UNKNOWN n’est pas traité comme une permission de relancer.','UNKNOWN is not treated as permission to retry.')),
  notEstablished: card.notEstablished.map((x) => x.replace('Aucune sécurité universelle.','No universal safety.').replace('Aucune validation de production bancaire.','No banking-production validation.').replace('Aucune preuve multi-hôte ou d’infrastructure critique.','No multi-host or critical-infrastructure evidence.').replace('Ce résultat ne couvre pas un fournisseur réel.','This does not cover a real provider.').replace('Un seul modèle et une seule famille de scénarios sont observés.','Only one model and one scenario family are observed.').replace('Le résultat ne constitue pas une garantie générale ni une certification.','The result is not a general guarantee or certification.')),
  sourceLabel: card.sourceLabel.replace('Dépôt','Repository').replace('et audit','and audit').replace('préprint','preprint'),
  dateChecked: '10 November 2026'
}));

export function validateEvidenceCard(card: EvidenceCard): void {
  if (!card.notEstablished.length) throw new Error(`Evidence card ${card.id} must state its limits.`);
  if (!card.sourceHref || !card.sourceLabel) throw new Error(`Evidence card ${card.id} must include a verified source.`);
  if (card.object === 'research' && !card.versionOrCommit?.includes('R5.0.0')) throw new Error('Research performance claims must be scoped to R5.0.0.');
  if (card.object === 'reg' && !card.versionOrCommit?.includes('REG v0.6.1')) throw new Error('REG 46/46 must be scoped to REG v0.6.1.');
}

export function evidenceFor(locale: Locale): EvidenceCard[] {
  const cards = shared[locale];
  cards.forEach(validateEvidenceCard);
  return cards;
}

export const evidenceLabels = {
  fr: { title: 'Le socle de preuves', intro: 'Ce qui a été observé, dans quel périmètre, et ce que cela ne permet pas de conclure.', object: 'Objet', environment: 'Environnement', level: 'Niveau de preuve', all: 'Tout afficher', source: 'Lire la source et le périmètre', limits: 'Limites explicites', observed: 'Ce qui a été observé', scoped: 'Démontré dans le périmètre', exploratory: 'Expérience exploratoire', reference: 'Référence publiée', notEstablished: 'Non établi' },
  en: { title: 'The evidence base', intro: 'What was observed, within which scope, and what it does not allow us to conclude.', object: 'Object', environment: 'Environment', level: 'Evidence level', all: 'Show all', source: 'Read source and scope', limits: 'Explicit limits', observed: 'What was observed', scoped: 'Demonstrated within scope', exploratory: 'Exploratory experiment', reference: 'Published reference', notEstablished: 'Not established' }
} as const;
