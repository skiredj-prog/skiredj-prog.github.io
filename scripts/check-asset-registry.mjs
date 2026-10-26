import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { portfolioOrder, portfolio } from '../src/data/portfolio.ts';
import { portfolioAccess } from '../src/data/portfolioAccess.ts';

const REGISTRY_PATH = 'data/asset-registry.v1.json';
const data = JSON.parse(readFileSync(REGISTRY_PATH,'utf8'));
const allowedGates = new Set([
  'offered_scoped','working_draft','ready_with_conditions','experimental_draft',
  'experimental_unadmitted','experimental_unpublished','released_scoped_software',
  'reference_only','deployed_simulation'
]);
const idPattern = /^[a-z][a-z0-9-]*$/;
const shaPattern = /^[a-f0-9]{40}$/;
const fullShaPattern = /^[a-f0-9]{64}$/;
const entryRoute = (lang,id) => (lang==='fr' ? '/portfolio/' : '/en/portfolio/') + id + '/';
const siteFile = route => path.posix.join('dist',route.replace(/^\//,''),'index.html');

function validate(registry, { built = true } = {}) {
  const problems = [];
  const bad = message => problems.push(message);
  if (registry.schema_version !== 'tenir-labs-asset-registry/v1') bad('unsupported registry schema');
  if (!fullShaPattern.test(registry.historical_input?.sha256||'')) bad('historical archive SHA-256 missing');
  if (registry.historical_input?.manifest_files_verified !== 13) bad('historical manifest count changed without revalidation');
  if (registry.dependency_semantics !== 'dependencies are navigation/context references only, NOT runtime or build-time prerequisites') bad('dependency semantics changed');
  if (!Array.isArray(registry.assets)) return ['canonical assets missing'];

  const actualIds = registry.assets.map(a=>a.asset_id);
  const expectedIds = [...portfolioOrder];
  if (actualIds.length !== new Set(actualIds).size) bad('duplicate canonical asset_id');
  if (actualIds.slice().sort().join('|') !== expectedIds.slice().sort().join('|')) bad('canonical assets do not match portfolioOrder');
  const allIds = new Set(expectedIds);

  for (const a of registry.assets) {
    const id = a.asset_id;
    if (!idPattern.test(id)) bad(id+': invalid asset ID');
    if (!allIds.has(id)) { bad(id+': unknown canonical asset'); continue; }
    if (a.kind !== portfolio.fr[id].kind || a.kind !== portfolio.en[id].kind) bad(id+': category drift');
    if (!idPattern.test(a.lineage || '')) bad(id+': invalid lineage');
    if (!allowedGates.has(a.release_gate?.state)) bad(id+': unknown release gate');
    if (!Array.isArray(a.release_gate?.conditions)) bad(id+': missing explicit release conditions');
    if (!Array.isArray(a.claims_scope)||!a.claims_scope.length) bad(id+': claims_scope missing');
    if (!Array.isArray(a.non_claims)||!a.non_claims.length) bad(id+': non_claims missing');
    if (!Array.isArray(a.dependencies) || a.dependencies.some(d=>!allIds.has(d))) bad(id+': invalid dependency references');
    if (a.dependencies?.includes(id)) bad(id+': self dependency');

    for (const lang of ['fr','en']) {
      const expected = portfolio[lang][id];
      const site = a.site?.[lang];
      if (site?.route !== entryRoute(lang,id)) bad(id+': '+lang+' route drift');
      if (site?.title !== expected.title) bad(id+': '+lang+' public title drift');
      if (site?.status !== expected.status) bad(id+': '+lang+' published maturity/status drift');
      const access = portfolioAccess[lang][id];
      if ((a.public_access??null) !== (access?.kind??null)) bad(id+': '+lang+' public access kind drift');
      if (a.public_access && (!access?.href || !access?.label || !access?.scope)) bad(id+': '+lang+' missing public link details');
      if (a.site?.claimed_version && ![expected.title,expected.status,expected.maturity].some(x=>String(x).includes(a.site.claimed_version))) {
        bad(id+': '+lang+' displayed version not present in portfolio');
      }

      if (built) {
        const output = siteFile(entryRoute(lang,id));
        if (!existsSync(output)) bad(id+': '+lang+' built portfolio route missing');
        else {
          const html=readFileSync(output,'utf8');
          if (!html.includes(expected.title.replaceAll('&','&amp;'))) bad(id+': '+lang+' rendered title missing');
          if (!html.includes(expected.status)) bad(id+': '+lang+' rendered status missing');
          if (access && !html.includes(access.href)) bad(id+': '+lang+' resource link missing in rendered page');
        }
      }
    }

    if (a.release_gate?.state === 'released_scoped_software') {
      if (a.public_access !== 'release') bad(id+': published software needs release access');
      if (!a.public_artifact_url?.startsWith('https://github.com/')) bad(id+': published release URL missing');
      if (a.public_artifact_url !== a.source_ref?.url) bad(id+': release/source URL mismatch');
      if (a.source_ref?.kind !== 'release_tag') bad(id+': tag-backed release source required');
      if (!shaPattern.test(a.source_ref?.commit_sha||'')) bad(id+': immutable tag target SHA missing');
      if (a.build_ref?.ref !== a.source_ref?.ref) bad(id+': source/build tag mismatch');
      if (a.site?.claimed_version !== a.source_ref?.ref) bad(id+': displayed version differs from release tag');
      if (!a.test_ref?.url) bad(id+': testing evidence reference missing');
    }
    if (a.release_gate?.state === 'deployed_simulation') {
      if (a.public_access !== 'demo') bad(id+': deployed demo must be linked as demo');
      if (a.source_ref?.kind !== 'site_file' || !shaPattern.test(a.source_ref?.ref||'')) bad(id+': demo source commit is not pinned');
      if (!a.build_ref?.path?.startsWith('public/embeds/')) bad(id+': demo build source path missing');
      if (!a.public_artifact_url?.startsWith('https://tenirlabs.cc/embeds/')) bad(id+': demo artifact URL invalid');
      const shipped = a.build_ref?.path?.replace(/^public\//,'dist/');
      if (built && (!shipped || !existsSync(shipped))) bad(id+': demo artifact missing from build');
      if (a.version_embedded && built && shipped && existsSync(shipped) &&
          !readFileSync(shipped,'utf8').includes(a.version_embedded)) bad(id+': embedded demo version disappeared');
    }
    if (['ready_with_conditions','experimental_unadmitted','experimental_unpublished'].includes(a.release_gate?.state) &&
        a.public_artifact_url !== null) bad(id+': unpublished prototype gained an unqualified artifact URL');
    if (a.public_artifact_url) {
      if (a.public_access !== 'release' && a.public_access !== 'demo') bad(id+': artifact URL cannot be assigned to documentation/example');
      if (a.public_artifact_url.startsWith('https://tenirlabs.cc')) {
        const suffix = a.public_artifact_url.replace('https://tenirlabs.cc','');
        if (portfolioAccess.fr[id]?.href!==suffix || portfolioAccess.en[id]?.href!==suffix) bad(id+': direct artifact URL does not match FR/EN visitor access');
      } else if (portfolioAccess.fr[id]?.href!==a.public_artifact_url || portfolioAccess.en[id]?.href!==a.public_artifact_url) {
        bad(id+': published release does not match FR/EN visitor access');
      }
    } else if (a.release_gate?.state === 'released_scoped_software' || a.release_gate?.state === 'deployed_simulation') {
      bad(id+': released/deployed status without artifact URL');
    }
  }

  const history=registry.historical_or_staged_assets;
  if (!Array.isArray(history) || history.length < 4) bad('legacy and unpublished staging history missing');
  const historyIds = new Set((history||[]).map(h=>h.asset_id));
  for (const h of history||[]) {
    if (h.public_url !== null) bad(h.asset_id+': historical/unreleased asset must not advertise public URL');
    if (!h.release_gate || !h.claims_scope) bad(h.asset_id+': history missing bounded claims');
    if(h.asset_id==='workbench-private-candidate'){
      const p=h.editorial_page;
      if(!p||p.fr!=='/portfolio/workbench/'||p.en!=='/en/portfolio/workbench/')
        bad('workbench: missing bilingual public editorial routes');
      if(p?.classification!=='public_information_only'||p?.has_runnable_embedded_kit!==false)
        bad('workbench: public explanatory page must not imply a released runnable kit');
      if(h.release_gate!=='private_candidate_awaiting_release'||h.public_url!==null)
        bad('workbench: private candidate release gate must remain closed');
      if(built){
        for(const locale of ['fr','en']){
          const path=siteFile(p?.[locale]||'/missing-workbench/');
          if(!existsSync(path))bad('workbench: '+locale+' editorial HTML missing');
          else {
            const text=readFileSync(path,'utf8');
            if(!text.includes('5.7.0')||!text.includes('UNKNOWN'))
              bad('workbench: '+locale+' historical/simulation boundary not visible');
            if(text.includes('TENIR-REG-public-consultation.zip')||text.includes('https://github.com/skiredj-prog/tenir-reg-demo'))
              bad('workbench: '+locale+' unqualified private kit or repo link leaked');
          }
        }
        if(existsSync('dist/downloads/TENIR-REG-public-consultation.zip'))
          bad('workbench: candidate ZIP must never be copied into the public site without release authorization');
      }
    }
  }
  const discrepancies=registry.open_discrepancies;
  const issueIds=new Set((discrepancies||[]).map(d=>d.id));
  for (const required of ['XRAY-LINEAGE','EXPLORER-PIN','PONR-VERSION','LEGACY-UX-VERSION','REG-ARCH-TEMPORAL']) {
    if (!issueIds.has(required)) bad('unresolved lineage exception missing: '+required);
  }
  for (const issue of discrepancies||[]) {
    if (!issue.finding || !issue.close_when || !['OPEN','RESOLVED'].includes(issue.status)) bad('incomplete issue: '+issue.id);
    if (issue.canonical_asset_id && !allIds.has(issue.canonical_asset_id)) bad('issue references missing product: '+issue.id);
    if (issue.historic_asset_id && !historyIds.has(issue.historic_asset_id)) bad('issue references missing history: '+issue.id);
  }
  const xray = registry.assets.find(a=>a.asset_id==='xray');
  const oldXray=history?.find(a=>a.asset_id==='xray-archive-v0.5.1');
  if (xray?.site?.claimed_version!==oldXray?.embedded_version &&
      discrepancies?.find(d=>d.id==='XRAY-LINEAGE')?.status!=='OPEN') bad('X-Ray version conflict silently suppressed');
  const ponr=history?.find(a=>a.asset_id==='point-of-no-return-archive');
  if (ponr?.filename_version!==ponr?.embedded_version &&
      discrepancies?.find(d=>d.id==='PONR-VERSION')?.status!=='OPEN') bad('Point of No Return version mismatch silently suppressed');

  if (built) {
    if (!existsSync('dist/sitemap.xml')) bad('published sitemap missing');
    else {
      const sitemap=readFileSync('dist/sitemap.xml','utf8');
      for(const id of expectedIds)for(const lang of ['fr','en'])
        if (!sitemap.includes('https://tenirlabs.cc'+entryRoute(lang,id))) bad(id+': '+lang+' not crawled in sitemap');
    }
  }
  return problems;
}

async function validateRemote(registry) {
  // No checkout, build or deployment is performed. Only public release-tag refs are read.
  const problems=[];
  for (const asset of registry.assets.filter(a=>a.source_ref?.kind==='release_tag')) {
    const src=asset.source_ref;
    const api='https://api.github.com/repos/'+src.repository+'/git/ref/tags/'+encodeURIComponent(src.ref);
    let response;
    try {
      response=await fetch(api,{headers:{'Accept':'application/vnd.github+json','User-Agent':'TENIR-Labs-PMO-registry-ci', ...(process.env.GITHUB_TOKEN?{Authorization:'Bearer '+process.env.GITHUB_TOKEN}:{})}});
      if (!response.ok) { problems.push(asset.asset_id+': tag read failed HTTP '+response.status); continue; }
      const body=await response.json();
      if (body?.object?.sha!==src.commit_sha) problems.push(asset.asset_id+': published tag target drift from pinned commit');
      if (body?.object?.type!=='commit') problems.push(asset.asset_id+': annotated tag requires an explicit peeled commit pin');
    } catch(error) { problems.push(asset.asset_id+': tag verification network error ('+error.name+')'); }
  }
  return problems;
}

function selfTest(){
  assert.deepEqual(validate(data,{built:false}),[],'baseline should validate independently of build');
  const changedVersion=structuredClone(data);
  changedVersion.assets.find(a=>a.asset_id==='conformance').site.claimed_version='v9.9.9';
  assert(validate(changedVersion,{built:false}).some(x=>x.includes('version')), 'must detect advertised release drift');
  const changedGate=structuredClone(data);
  changedGate.assets.find(a=>a.asset_id==='explorer').release_gate.state='released_scoped_software';
  assert(validate(changedGate,{built:false}).some(x=>x.includes('release')), 'must not auto-promote unpublished prototype');
  const injectedUrl=structuredClone(data);
  injectedUrl.assets.find(a=>a.asset_id==='xray').public_artifact_url='https://tenirlabs.cc/embeds/unreviewed.html';
  assert(validate(injectedUrl,{built:false}).some(x=>x.includes('unqualified')), 'must reject fictitious public deployment');
  const hiddenConflict=structuredClone(data);
  hiddenConflict.open_discrepancies.find(d=>d.id==='XRAY-LINEAGE').status='RESOLVED';
  assert(validate(hiddenConflict,{built:false}).some(x=>x.includes('silently')), 'must surface unresolved version lineage');
  console.log('PASS: baseline and four adversarial mutations (release version, invalid promotion, URL, lineage).');
}

if(process.argv.includes('--self-test')) {
  selfTest();
} else {
  const errors=validate(data,{built:!process.argv.includes('--no-dist')});
  if (process.argv.includes('--remote')) errors.push(...await validateRemote(data));
  if (errors.length) {
    for (const error of errors) console.error('REGISTRY DRIFT: '+error);
    process.exitCode=1;
  } else {
    const unresolved=data.open_discrepancies.filter(issue=>issue.status==='OPEN');
    const missingPin=data.assets.filter(a=>!a.source_ref);
    console.log('PASS: '+data.assets.length+' canonical FR/EN assets, '+data.historical_or_staged_assets.length+
      ' historical/staged assets, '+unresolved.length+' documented open discrepancies; '+missingPin.length+
      ' code-source pins unknown/undeclared (never inferred).');
    if(process.argv.includes('--remote'))console.log('PASS: both release tag references match pinned immutable Git commits.');
    if(unresolved.length)console.log('MAINTENANCE HOLD (documented, not CI failure): '+unresolved.map(x=>x.id).join(', '));
  }
}
