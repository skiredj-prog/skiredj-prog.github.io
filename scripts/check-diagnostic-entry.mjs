import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

// One offer, one page (17 Nov. 2026): Leap Readiness replaces the guided diagnostic,
// the agent-controls diagnostic and the execution-boundary diagnostic.
const cases=[
  {locale:'fr',home:'dist/index.html',offer:'dist/offre/index.html',route:'/offre/',other:'/en/offer/',
   price:'5 000 EUR',week:'Une semaine',action:'Voir l’offre',
   tiers:['Défini','Observable','Contrôlé','Prouvé','Tenu','Coordonné'],
   limits:'Ni une certification, ni un avis juridique, ni un avis de conformité',
   old:['dist/diagnostic-execution/index.html','dist/portfolio/diagnostic/index.html']},
  {locale:'en',home:'dist/en/index.html',offer:'dist/en/offer/index.html',route:'/en/offer/',other:'/offre/',
   price:'EUR 5,000',week:'One week',action:'See the offer',
   tiers:['Defined','Observable','Controlled','Proven','Held','Coordinated'],
   limits:'Not a certification, not a legal opinion, not a compliance opinion',
   old:['dist/en/diagnostic-execution/index.html','dist/en/portfolio/diagnostic/index.html']}
];
const sitemap=readFileSync('dist/sitemap.xml','utf8');
const text=(html)=>html.replace(/&#39;|&#x27;|&rsquo;/g,'’').replace(/&amp;/g,'&');
for(const c of cases){
  assert(existsSync(c.offer),c.locale+': offer route is not built');
  const home=text(readFileSync(c.home,'utf8')), offer=text(readFileSync(c.offer,'utf8'));

  // Homepage: the offer comes first, then its method and its software.
  assert(home.includes('id="ml-offerings-title"'),c.locale+': offer section missing on the homepage');
  const cards=home.match(/<a class="ml-card" href="[^"]+"/g)||[];
  assert.equal(cards.length,3,c.locale+': the homepage shows the offer, its method and its software');
  assert(cards[0].includes('href="'+c.route+'"'),c.locale+': the first homepage card must open the offer');
  assert(home.includes('Leap Readiness'),c.locale+': offer name missing on the homepage');
  assert(home.includes(c.action),c.locale+': offer call to action missing on the homepage');
  assert(!home.includes('diagnostic-execution/'),c.locale+': homepage still links to the retired diagnostic page');
  assert(home.includes('<details class="reading-note"'),c.locale+': legacy long-form homepage explanation must remain in disclosure');

  // Offer page: name, price, duration, the six tiers, the limits and the next steps.
  assert(offer.includes('Leap Readiness'),c.locale+': offer name missing');
  assert(offer.includes(c.price),c.locale+': price must be shown');
  assert(offer.includes(c.week),c.locale+': duration must be shown');
  for(const t of c.tiers) assert(offer.includes(t),c.locale+': maturity tier missing: '+t);
  assert(offer.includes(c.limits),c.locale+': limits of the offer missing');
  assert(offer.includes('Enterprise Leap'),c.locale+': programme missing from the next steps');
  assert(!/dédui|déduction|deduct|forfeit|rembours|refund|paiement conditionnel|conditional payment|payé à la réception|paid on delivery/i.test(offer),c.locale+': commercial conditions belong in the contract, not on the page');
  assert(!offer.includes('Production-ready'),c.locale+': unjustified production claim');
  assert(offer.includes(c.other),c.locale+': opposite-language alternate missing');
  assert(offer.includes('<link rel="canonical"'),c.locale+': canonical tag missing');
  assert(offer.includes('https://tenirlabs.cc'+c.route),c.locale+': canonical URL incorrect');
  assert(sitemap.includes('https://tenirlabs.cc'+c.route),c.locale+': absent from generated sitemap');

  // The retired pages redirect to the offer.
  for(const old of c.old){
    assert(existsSync(old),c.locale+': retired page must keep a redirect: '+old);
    assert(readFileSync(old,'utf8').includes('url='+c.route),c.locale+': '+old+' must redirect to '+c.route);
  }
}
for(const part of ['src/content/fr/offre.md','src/content/en/offer.md']){
  const body=readFileSync(part,'utf8');
  assert(!body.includes('skiredj-prog/tenir-reg-demo'),part+': do not refer to private demo repository');
  assert(!body.includes('G4-A'),part+': nonqualified laboratory maturity must not become customer offer');
}
console.log('PASS: FR/EN single offer (Leap Readiness): homepage first card, price, duration, six tiers, limits, canonical/hreflang and redirects from the retired diagnostic pages.');
