/**
 * Fail-closed release lock for the frozen TENIR/REG offline candidate.
 * Status PUBLISHED is admissible only with the exact binary's known digest.
 * A non-public stage MUST NOT ship a guessable public/downloads URL.
 * This checks binary identity; private CI separately validated its signed dossier.
 */
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';

const PINNED = Object.freeze({
  schema: 'tenir-labs-workbench-publication/v1',
  version: 'v0.1.0',
  filename: 'TENIR-REG-public-consultation.zip',
  sha256: '86b246dbfcdd57577dbec20f268f344c51220186336bfada32626c9a8d83f671',
  bytes: 180527,
  zip_entries: 15,
  signed_receipt_sha256: '679ea50f34a51d5103c8afda589bfa1cfc15fce177fca8209b04204836b2c355',
});
const META_PATH = 'data/workbench-publication.v1.json';
const downloadRoot = 'public/downloads';
const finalRoot = 'dist/downloads';
const digest = buf => createHash('sha256').update(buf).digest('hex');
const expectedPath = dir => dir + '/' + PINNED.filename;

function validate(meta, archive = null, finalArchive = null, names = []) {
  const problems=[];
  const bad=m=>problems.push(m);
  for(const field of ['schema','version','filename','sha256','bytes','zip_entries','signed_receipt_sha256']) {
    if(meta[field]!==PINNED[field])bad('frozen release identity changed: '+field);
  }
  if(meta.public_path!=='/downloads/'+PINNED.filename)bad('release public route changed');
  if(meta.public_url!==null && meta.public_url!=='https://tenirlabs.cc'+meta.public_path)
    bad('public URL is inconsistent');
  if(!meta.policy?.requires_exact_sha256||!meta.policy?.requires_signed_dossier_verification||!meta.policy?.requires_public_binary_uploaded_with_review||
    !meta.policy?.requires_owner_release_approval||!meta.policy?.no_certification||!meta.policy?.no_live_runtime)
    bad('release approval/nonclaims policy weakened');
  if(!['STAGED_PENDING_BINARY','PUBLISHED'].includes(meta.status))bad('unknown release state');
  if(names.some(n=>n!==PINNED.filename && n!=='.gitkeep'))bad('unreviewed extra downloadable file');
  if(meta.status==='STAGED_PENDING_BINARY') {
    if(archive!==null||finalArchive!==null)bad('private candidate accidentally shipped while gated');
    if(meta.public_url!==null)bad('unapproved public download URL advertised');
  }
  if(meta.status==='PUBLISHED'){
    if(!archive)bad('PUBLISHED but binary not committed to public/downloads');
    if(archive && (archive.length!==PINNED.bytes||digest(archive)!==PINNED.sha256))
      bad('uploaded binary byte count/SHA-256 differs from frozen candidate');
    if(finalArchive && (finalArchive.length!==PINNED.bytes||digest(finalArchive)!==PINNED.sha256))
      bad('dist binary differs from frozen candidate');
    if(meta.public_url!=='https://tenirlabs.cc'+meta.public_path)
      bad('published state without correct direct URL');
    if(meta.manual_approval_reference?.length<6)
      bad('missing exact-byte owner release authorization reference');
  }
  return problems;
}

const meta=JSON.parse(readFileSync(META_PATH,'utf8'));
const inName=expectedPath(downloadRoot);
const outName=expectedPath(finalRoot);
const inBytes=existsSync(inName)?readFileSync(inName):null;
const isPost=process.argv.includes('--dist');
const outBytes=isPost && existsSync(outName)?readFileSync(outName):null;
const names=existsSync(downloadRoot)?readdirSync(downloadRoot).filter(name=>statSync(downloadRoot+'/'+name).isFile()):[];
if(process.argv.includes('--self-test')){
  const staging={...meta,status:'STAGED_PENDING_BINARY',public_url:null};
  assert.deepEqual(validate(staging,null,null,[]),[],'known safe staging baseline');
  const mock=Buffer.from('tampered bytes');
  assert(validate({...meta,status:'PUBLISHED',public_url:'https://tenirlabs.cc'+meta.public_path,manual_approval_reference:'owner-approval'},mock,mock,[meta.filename]).some(x=>x.includes('differs')),'reject modified archive');
  assert(validate(staging,mock,null,[meta.filename]).some(x=>x.includes('accidentally shipped')),'reject premature download');
  assert(validate({...meta,sha256:'0'.repeat(64)},null,null,[]).some(x=>x.includes('identity changed')),'reject unapproved digest');
  assert(validate({...meta,status:'PUBLISHED'},null,null,[]).some(x=>x.includes('binary not committed')),'reject missing published artifact');
  console.log('PASS: four adversarial checks fail closed (tampering, premature shipping, digest drift, missing binary).');
  process.exit(0);
}
const errors=validate(meta,inBytes,outBytes,names);
if(isPost&&meta.status==='PUBLISHED'&&!outBytes)errors.push('release is marked published but dist artifact is absent');
if(errors.length){
  for(const problem of errors)console.error('WORKBENCH RELEASE HOLD: '+problem);
  process.exitCode=1;
} else console.log('PASS Workbench distribution gate: '+meta.status+
    (meta.status==='PUBLISHED'?' verified '+PINNED.bytes+' byte SHA-256: '+PINNED.sha256:
      ' / NO DOWNLOAD EXPOSED')+(isPost?' (post-build checked)':''));
