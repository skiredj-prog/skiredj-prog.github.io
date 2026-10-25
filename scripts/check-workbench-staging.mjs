import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
for (const lang of ['fr','en']) {
  const path = lang === 'fr' ? 'dist/portfolio/workbench/index.html' : 'dist/en/portfolio/workbench/index.html';
  const html = readFileSync(path, 'utf8');
  assert(html.includes('TENIR/REG'), lang + ': missing Workbench identity');
  assert(html.includes('pf-root'), lang + ': existing style extension missing');
  assert(html.includes('https://') || html.includes('/portfolio/'), lang + ': no navigation');
  assert(html.includes('UNKNOWN'), lang + ': missing unresolved case');
  assert(html.includes('5.7.0'), lang + ': TENIR-Gov reference caveat missing');
  assert(!html.includes('href="/downloads/TENIR-REG-public-consultation.zip"'), lang + ': premature release link');
  assert(!html.includes('src="/workbench/output/'), lang + ': unreviewed source embedded');
  for (const route of ['demos','experiences']) {
    const hub = readFileSync(lang === 'fr' ? 'dist/portfolio/'+route+'/index.html' : 'dist/en/portfolio/'+route+'/index.html','utf8');
    assert(hub.includes(lang === 'fr' ? '/portfolio/workbench/' : '/en/portfolio/workbench/'), lang + ': Workbench not discoverable from '+route);
  }
}
console.log('PASS: FR/EN Workbench experience staged and linked from demos without exposing private assets or advertising a nonexistent ZIP.');
