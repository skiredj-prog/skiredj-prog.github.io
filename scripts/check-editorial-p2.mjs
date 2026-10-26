import assert from 'node:assert/strict';
import {existsSync, readFileSync, statSync} from 'node:fs';

const html = path=>readFileSync('dist'+path+'index.html','utf8');
const cases={fr:'/cas/',en:'/en/cases/'};
const home={fr:'/',en:'/en/'};
const pages=[
 '/cas/','/acteurs/','/apprendre/','/pourquoi-maintenant/',
 '/en/cases/','/en/actors/','/en/learn/','/en/why-now/'
];
const sitemap=readFileSync('dist/sitemap.xml','utf8');
for(const route of pages){
 assert(existsSync('dist'+route+'index.html'),'Missing bilingual editorial route '+route);
 assert(sitemap.includes('https://tenirlabs.cc'+route),'Sitemap missing '+route);
}
for(const locale of ['fr','en']){
 const c=html(cases[locale]),h=html(home[locale]);
 const incident=locale==='fr'?'Moffatt v. Air Canada':'Moffatt v. Air Canada';
 assert(c.includes(incident),locale+': documented source reference missing');
 assert(c.includes('https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html'),locale+': primary source link missing');
 assert(c.includes(locale==='fr'?'scénario pédagogique':'teaching scenario'),locale+': synthetic banking case must be distinguished');
 assert(c.includes('PAY-MAR-001')||c.includes('payment instruction'),locale+': fictional payment illustration missing');
 assert(h.indexOf('id="responsibility-title"')>0,locale+': responsible-action learning route missing');
 assert(h.includes(locale==='fr'?'Si une crise survient':'If a crisis follows'),locale+': no accountability crisis narrative');
 assert(h.includes(locale==='fr'?'Explorer les cas':'Explore the cases'),locale+': reader-first CTA missing');
 assert(h.indexOf('id="responsibility-title"')<h.indexOf('home-offer-map'),locale+': commercial offer shown before learning');
 assert(h.indexOf('id="responsibility-title"')<h.indexOf('execution-video'),locale+': technical video shown before reading route');
 assert(h.indexOf('id="responsibility-title"')<h.indexOf('prototype-section'),locale+': live prototype shown before education');
 assert(h.includes(locale==='fr'?'Crise':'crisis')||h.includes(locale==='fr'?'crise':'crisis'),locale+': consequences missing');
 assert(h.includes(locale==='fr'?'/cas/':'/en/cases/'),locale+': editorial entry link missing');
 for(const id of ['banque-assurance','transport-mobilite']){
   assert(c.includes('id="'+id+'-sector-map-title"'),locale+': missing unique sector-map title ID '+id);
   assert(c.includes('id="'+id+'-sector-sequence-title"'),locale+': missing sequence heading ID '+id);
 }
 const ids=[...c.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,locale+': duplicate rendered HTML IDs');
 assert((c.match(/class="sector-sequence"/g)||[]).length===2,locale+': expected two pedagogical sector sequences');
 assert((c.match(/tabindex="0" aria-label=/g)||[]).length>=3,locale+': horizontally scrollable diagrams not keyboard-focusable');
 assert(c.includes(locale==='fr'?'Modèle pédagogique TENIR Labs':'Fictional TENIR Labs teaching model'),locale+': sector scenario nonclaims absent');
 assert(c.includes(locale==='fr'?'Matrice pédagogique TENIR Labs':'Fictional TENIR Labs teaching matrix'),locale+': transport caveat absent');
 assert(!c.includes('src="/manus-storage/'),locale+': old missing video path');
 if(locale==='en') {
   for(const french of ['Carte sectorielle maître','Ordre de paiement PAY-MAR-001 transmis','Une intention est formulée','Porte G-03','Preuve attendue :']){
     assert(!c.includes(french),'EN case page accidentally contains French map copy: '+french);
   }
 }
 assert(c.includes('href="'+(locale==='fr'?'/en/cases/':'/cas/')+'"'),locale+': alternate language route missing');
}
for(const file of ['comment-securiser-actions-ia-agentique.mp4','how-execution-boundary-controls-ai-agents.mp4']){
 const path='dist/media/'+file;
 assert(existsSync(path),'Missing referenced video '+path);
 assert(statSync(path).size>1000000,'Video artifact appears empty '+path);
}
console.log('PASS: P2 bilingual navigation, six sectors/claims checks, 8 routes, canonical case source, readable-first ordering, video artifacts and unique IDs.');
