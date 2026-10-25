import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const cases=[
  {locale:'fr',home:'dist/index.html',offer:'dist/diagnostic-execution/index.html',
   route:'/diagnostic-execution/',other:'/en/diagnostic-execution/',
   mainCta:'Examiner un flux critique',specific:'Un flux. Une frontière. Une conclusion vérifiable.'},
  {locale:'en',home:'dist/en/index.html',offer:'dist/en/diagnostic-execution/index.html',
   route:'/en/diagnostic-execution/',other:'/diagnostic-execution/',
   mainCta:'Examine one critical flow',specific:'One flow. One execution boundary. A qualified conclusion.'}
];
const sitemap=readFileSync('dist/sitemap.xml','utf8');
for(const c of cases){
  assert(existsSync(c.offer),c.locale+': specialized offer route is not built');
  const home=readFileSync(c.home,'utf8'), offer=readFileSync(c.offer,'utf8');
  assert(home.includes('home-offer-map'),c.locale+': offer orientation not visible on homepage');
  assert(home.includes('home-offer-grid'),c.locale+': offer choice grid missing');
  assert((home.match(/class="home-offer-item"/g)||[]).length===4,c.locale+': exactly four front-door options required');
  assert(home.includes('>'+c.mainCta),c.locale+': service CTA missing');
  assert(home.includes('href="'+c.route+'"'),c.locale+': direct specialized offer navigation missing');
  assert(home.includes('href="/embeds/demonstration-bancaire.html"'),c.locale+': banking example not discoverable');
  assert(home.includes('<details class="reading-note"'),c.locale+': legacy long-form homepage explanation must remain in disclosure');
  assert(offer.includes(c.specific),c.locale+': one-flow scope missing');
  assert(offer.includes('UNKNOWN'),c.locale+': lost outcome boundary missing');
  assert(offer.includes('HOLD'),c.locale+': explicit holding decision missing');
  assert(offer.includes('/embeds/demonstration-bancaire.html'),c.locale+': synthetic banking scenario not linked');
  assert(offer.includes(c.other),c.locale+': opposite-language alternate missing');
  assert(offer.includes('<link rel="canonical"'),c.locale+': canonical tag missing');
  assert(offer.includes('https://tenirlabs.cc'+c.route),c.locale+': canonical URL incorrect');
  assert(sitemap.includes('https://tenirlabs.cc'+c.route),c.locale+': absent from generated sitemap');
  assert(!offer.includes('certifi&eacute;'),c.locale+': unintended certification HTML entity');
  assert(!offer.includes('Production-ready'),c.locale+': unjustified production claim');
  assert(offer.includes(c.locale==='fr'?'sur devis':'quoted after qualification'),c.locale+': no fixed price promise required');
  assert(!/1\s*[à-–]\s*3\s*(semaines|weeks)/.test(offer),c.locale+': estimated duration must not be published as a firm engagement');
  const generalOfferPath=c.locale==='fr'?'dist/offre/index.html':'dist/en/offer/index.html';
  const generalOffer=readFileSync(generalOfferPath,'utf8');
  assert(generalOffer.includes('href="'+c.route+'"'),c.locale+': general offer missing specialized diagnostic link');

}
for(const part of ['src/content/fr/diagnostic-execution.md','src/content/en/diagnostic-execution.md']){
  const text=readFileSync(part,'utf8');
  assert(!text.includes('skiredj-prog/tenir-reg-demo'),part+': do not refer to private demo repository');
  assert(!text.includes('G4-A'),part+': nonqualified laboratory maturity must not become customer offer');
}
console.log('PASS: FR/EN specialized commercial entry, correct canonical/hreflang, compact offer map, synthetic-only demo and no private release.');
