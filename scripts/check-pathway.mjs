import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const routes=[
  {locale:'fr',page:'dist/parcours-ia/index.html',url:'/parcours-ia/',alternate:'/en/ai-readiness/',home:'dist/index.html'},
  {locale:'en',page:'dist/en/ai-readiness/index.html',url:'/en/ai-readiness/',alternate:'/parcours-ia/',home:'dist/en/index.html'},
];

for(const r of routes){
  assert(existsSync(r.page),r.locale+': pathway report route not built');
  const page=readFileSync(r.page,'utf8'),home=readFileSync(r.home,'utf8');
  for(const marker of ['data-pathway-app','id="pa-start"','id="pa-question"','id="pa-report"','id="pa-priorities"','id="pa-dimensions"','id="pa-download"','id="pa-print"','id="pa-copy"','/pathway.js']){
    assert(page.includes(marker),r.locale+': missing pathway widget '+marker);
  }
  assert(page.includes('hreflang="fr"')&&page.includes('hreflang="en"'),r.locale+': language alternatives missing');
  assert(page.includes(r.alternate),r.locale+': alternate pathway not linked');
  assert(page.includes('href="https://tenirlabs.cc'+r.url+'"'),r.locale+': canonical route missing');
  assert(home.includes('href="'+r.url+'"'),r.locale+': free report not exposed from homepage');
  assert(page.includes(r.locale==='fr'?'Sans compte':'No account'),r.locale+': ungated entry missing');
  assert(page.includes(r.locale==='fr'?'Aucun compte, aucun envoi automatique':'No account and no automatic submission'),r.locale+': explicit privacy statement missing');
}
const js=readFileSync('dist/pathway.js','utf8');
assert.equal((js.match(/^    Q\(/gm)||[]).length,10,'Expected exactly ten user questions');
for(const term of ["id:'purpose'","id:'accountability'","id:'visibility'","id:'control'","id:'evidence'","id:'adaptability'"]){
  assert(js.includes(term),'Missing scoring dimension '+term);
}
for(const term of ['reportText()','downloadReport()','copyReport()','window.print()','navigator.clipboard','mailto:','URL.createObjectURL']){
  assert(js.includes(term),'Missing report ownership/export feature '+term);
}
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage.setItem','sessionStorage.setItem','window.claude','db.collection']){
  assert(!js.includes(forbidden),'Unexpected network dependency or storage in questionnaire: '+forbidden);
}
assert(js.includes('Self-reported assessment')&&js.includes('Auto-évaluation déclarative'),'Report must label itself self-reported');
assert(!/,url:'portfolio\\//.test(js),'Advisory priority steps must not silently carry unused commercial destinations');
assert(!js.includes('main.title.toLowerCase()'),'Do not inadvertently lowercase proper nouns in future recommendation titles');

console.log('PASS: FR/EN pathway routes, 10 questions, six dimensions, local-only results, user-initiated sharing.');
