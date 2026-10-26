import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const registry=JSON.parse(readFileSync('data/asset-registry.v1.json','utf8'));
const publication=JSON.parse(readFileSync('data/workbench-publication.v1.json','utf8'));
const released=publication.status==='PUBLISHED';
const wb=registry.historical_or_staged_assets.find(a=>a.asset_id==='workbench-private-candidate');
assert(wb, 'PMO staged Workbench entry missing');
assert.equal(wb.public_url,null, 'Private Workbench kit must not gain public artifact URL');
assert.equal(wb.release_gate,'private_candidate_awaiting_release');
assert.equal(wb.editorial_page?.classification,'public_information_only');
assert.equal(wb.editorial_page?.has_runnable_embedded_kit,false);
assert.equal(registry.assets.length,14,'Workbench overview must not add a fifteenth product');

const sitemap=readFileSync('dist/sitemap.xml','utf8');
for(const locale of ['fr','en']){
 const pref=locale==='fr'?'':'/en';
 const route=pref+'/portfolio/workbench/';
 const path='dist'+route+'index.html';
 assert(existsSync(path),locale+': no Workbench editorial page');
 const html=readFileSync(path,'utf8');
 const other=(locale==='fr'?'/en':'')+'/portfolio/workbench/';
 assert.equal(wb.editorial_page[locale],route,'PMO editorial route mismatch');
 assert(html.includes('https://tenirlabs.cc'+route),locale+': incorrect canonical');
 assert(html.includes(other),locale+': missing locale alternate');
 assert(html.includes('TENIR/REG'),locale+': missing Workbench identity');
 assert(html.includes('UNKNOWN'),locale+': missing unknown outcome lesson');
 assert(html.includes('5.7.0'),locale+': omitted reference runtime caveat');
 if(released){
   assert(html.includes('href="'+publication.public_path+'"'),locale+': approved ZIP download button missing');
   assert(html.includes(publication.sha256),locale+': SHA-256 verification information missing');
   assert(html.includes(locale==='fr'?'Archive autonome disponible':'Standalone archive available'),locale+': deployed-state copy missing');
 } else {
   assert(html.includes(locale==='fr'?'distribution publique encore en préparation':'public distribution is still gated'),
     locale+': pending distribution disclaimer missing');
   assert(!html.includes('href="'+publication.public_path+'"'),locale+': premature ZIP download link');
 }
 assert(!html.includes('/workbench/output/'),locale+': unapproved embed of private dossier');
 assert(!html.includes('https://github.com/skiredj-prog/tenir-reg-demo'),locale+': private repo link leaked');
 assert(sitemap.includes('https://tenirlabs.cc'+route),locale+': editorial route absent from sitemap');

 const demo=readFileSync('dist'+pref+'/portfolio/demos/index.html','utf8');
 const experience=readFileSync('dist'+pref+'/portfolio/experiences/index.html','utf8');
 const offer=readFileSync('dist'+pref+'/diagnostic-execution/index.html','utf8');
 for(const [name,content] of [['demos',demo],['experiences',experience],['diagnostic',offer]]){
   assert(content.includes('href="'+route+'"'),locale+': missing Workbench link from '+name);
 }
 for(const name of ['demos','experiences','diagnostic']){
   const html2={demos:demo,experiences:experience,diagnostic:offer}[name];
   assert(!html2.includes('href="/downloads/TENIR-REG-public-consultation.zip"'),locale+': premature kit link from '+name);
 }
}
if(released) assert(existsSync('dist/downloads/TENIR-REG-public-consultation.zip'),'PUBLISHED archive absent from dist');
else assert(!existsSync('dist/downloads/TENIR-REG-public-consultation.zip'),'Site unexpectedly packages private Workbench candidate');
console.log('PASS: FR/EN Workbench routes, PMO and distribution state '+publication.status+' validated without unapproved binary or false release claim.');
