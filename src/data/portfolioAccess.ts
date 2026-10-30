// Bilingual public *access points*, separate from the P1 product taxonomy.
// An access point is a verified public route or release; it is not evidence of production fitness.
// Absent IDs have NO public runnable link. Never infer a URL from a product name.
export type PortfolioAccess = { href: string; label: string; scope: string; kind: 'demo'|'documentation'|'release'|'example' };
export const portfolioAccess: Record<'fr'|'en', Record<string, PortfolioAccess>> = {
  fr: {
    diagnostic:{href:'/offre/exemple/',label:'Lire un exemple fictif',scope:'Exemple rédigé, pas un dossier client',kind:'example'},
    prevent:{href:'/publications/reg-v0.1/',label:'Lire le cadrage v0.1',scope:'Working Draft, pas un pilote déployé',kind:'documentation'},
    prepare:{href:'/publications/reg-v0.1/',label:'Lire le cadrage v0.1',scope:'Working Draft, pas un audit réel',kind:'documentation'},
    xray:{href:'/portfolio/xray/#explorer',label:'Explorer trois exemples',scope:'Exemples éditoriaux, pas moteur X-Ray v0.2',kind:'example'},
    translation:{href:'/publications/reg-v0.1/',label:'Lire les principes REG',scope:'Référence de cadrage, pas prototype exécutable',kind:'documentation'},
    gov:{href:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',label:'Release TENIR-Gov v5.7.0',scope:'Bêta mono-hôte bornée, sans C3',kind:'release'},
    conformance:{href:'https://github.com/skiredj-prog/reg-conformance/releases/tag/v0.6.1',label:'Release REG Conformance v0.6.1',scope:'46/46 PASS sur profil Raft loopback mono-hôte seulement',kind:'release'},
    'reg-arch':{href:'/architecture/interactive/',label:'Voir l’architecture interactive',scope:'Schéma pédagogique',kind:'demo'},
    technical:{href:'/standard/',label:'Consulter le standard REG',scope:'Références et contrats, non une validation',kind:'documentation'},
    'reg-demo':{href:'/diagnostic-execution/',label:'Voir son rôle dans le diagnostic',scope:'Instrument interne, sans exécution client ni téléchargement public',kind:'documentation'},
    experiences:{href:'/embeds/demonstration-bancaire.html',label:'Ouvrir le scénario bancaire',scope:'Simulation synthétique PAY-MAR-001',kind:'demo'},
    'control-tower':{href:'/embeds/reg-autonomy-control-tower-v1.0.html',label:'Ouvrir la Control Tower v1.0',scope:'Simulation autonome en anglais ; v1.1 FR/EN non déployée',kind:'demo'},
  },
  en: {
    diagnostic:{href:'/en/offer/example/',label:'Read fictional example',scope:'Written illustration, not customer evidence',kind:'example'},
    prevent:{href:'/en/publications/reg-v0.1/',label:'Read v0.1 working draft',scope:'Working Draft, not a deployed pilot',kind:'documentation'},
    prepare:{href:'/en/publications/reg-v0.1/',label:'Read v0.1 working draft',scope:'Working Draft, not an actual audit',kind:'documentation'},
    xray:{href:'/en/portfolio/xray/#explorer',label:'Explore three examples',scope:'Editorial examples, not the X-Ray v0.2 engine',kind:'example'},
    translation:{href:'/en/publications/reg-v0.1/',label:'Read REG principles',scope:'Framing reference, not executable prototype',kind:'documentation'},
    gov:{href:'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',label:'TENIR-Gov v5.7.0 release',scope:'Bounded single-host beta, no C3',kind:'release'},
    conformance:{href:'https://github.com/skiredj-prog/reg-conformance/releases/tag/v0.6.1',label:'REG Conformance v0.6.1 release',scope:'46/46 PASS for single-host loopback Raft profile only',kind:'release'},
    'reg-arch':{href:'/en/architecture/interactive/',label:'View interactive architecture',scope:'Illustrative diagram',kind:'demo'},
    technical:{href:'/en/standard/',label:'Read the REG standard',scope:'Reference contracts, not deployment conformance',kind:'documentation'},
    'reg-demo':{href:'/en/diagnostic-execution/',label:'See its role in the diagnostic',scope:'Internal instrument, no client execution or public download',kind:'documentation'},
    experiences:{href:'/embeds/demonstration-bancaire.html',label:'Open banking scenario',scope:'Synthetic PAY-MAR-001 simulation (French)',kind:'demo'},
    'control-tower':{href:'/embeds/reg-autonomy-control-tower-v1.0.html',label:'Open Control Tower v1.0',scope:'English standalone simulation; FR/EN v1.1 not yet deployed',kind:'demo'},
  }
};
