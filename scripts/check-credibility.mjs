import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
for(const [locale,page,home,route,other] of [
  ['fr','dist/credibilite/index.html','dist/index.html','/credibilite/','/en/credibility/'],
  ['en','dist/en/credibility/index.html','dist/en/index.html','/en/credibility/','/credibilite/']
]){
  assert(existsSync(page),locale+': credibility journey page missing');
  const c=readFileSync(page,'utf8'),h=readFileSync(home,'utf8');
  for(const claim of ['1 286','81 / 81','282.08s','47ef67e3efc5f3008896a7d88bebf929fa0a98f0','0e0cbafda8c90735bf277d783d69ce91df36c5abcad26ac81de4a2d82fe7ff03','interactive-architecture-v5.7.0.html','pysyncobj']){
    assert(c.toLowerCase().includes(claim.toLowerCase()),locale+': credibility evidence missing '+claim);
  }
  assert(c.includes('hreflang="fr"')&&c.includes('hreflang="en"'),locale+': bilingual links missing');
  assert(c.includes(other),locale+': link to other language missing');
  assert(h.includes('href="'+route+'"'),locale+': credibility not discoverable on homepage');
  assert(c.includes(locale==='fr'?'Pas de production Raft multi-hôtes':'No production multi-host Raft'),locale+': important exclusion absent');
}
const artifact='dist/embeds/interactive-architecture-v5.7.0.html';
assert(existsSync(artifact),'v5.7.0 interactive architecture embed missing');
const s=readFileSync(artifact,'utf8');
for(const marker of ['id="release"','id="consensus"','id="evidence"','id="limits"','id="usecases"','id="finExecute"','id="cloudExecute"','id="procExecute"','81 / 81','282.08 seconds','1,286','FM-20','SQLite WAL','47ef67e3efc5f3008896a7d88bebf929fa0a98f0']){
 assert(s.includes(marker),'updated interactive architecture missing '+marker);
}
for(const stale of ['REG+ · v5.6.0','Version: 5.6.0 · 726 tests','C3 crash-stop</span>','reconcile_commit() I8 violation.']){
  assert(!s.includes(stale),'legacy 5.6 claim wrongly presented as 5.7.0: '+stale);
}
assert(existsSync('dist/embeds/interactive-architecture.html'),'historical 5.6 artifact removed');
console.log('PASS: bilingual v5.7.0 Credibility Journey, evidence provenance, caveats, updated interactive simulators, historical 5.6 archive');
