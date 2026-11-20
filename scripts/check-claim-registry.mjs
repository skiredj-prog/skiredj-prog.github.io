import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {claimRecords,validateClaimRecords} from '../src/data/claim-registry.ts';

validateClaimRecords(claimRecords);
assert(claimRecords.length>=4,'claim registry unexpectedly empty');
assert(claimRecords.some(x=>x.status==='NOT_QUALIFIED'),'qualification gaps must remain visible');
assert(claimRecords.every(x=>x.independentlyRechecked===false),'do not imply external source re-verification without logs');

for(const path of ['dist/preuves/index.html','dist/en/evidence/index.html']){
  const html=readFileSync(path,'utf8');
  assert(html.includes('data-claim-registry'),'missing visible registry: '+path);
  for(const row of claimRecords){
    assert(html.includes('data-claim-id="'+row.id+'"'),'missing claim '+row.id+' in '+path);
    assert(html.includes('data-status="'+row.status+'"'),'missing claim status '+row.id+' in '+path);
  }
}
console.log('PASS: '+claimRecords.length+' bounded source-linked claims rendered in FR and EN; qualification limits preserved.');
