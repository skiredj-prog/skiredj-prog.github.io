import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const cases = [
  { locale: 'FR', page: 'dist/statut/index.html', published: '24 octobre 2026', scope: 'mono-hôte', guarantee: 'C3 multi-hôte', obsolete: 'Le paquet publié est la 5.6.0.' },
  { locale: 'EN', page: 'dist/en/status/index.html', published: '24 October 2026', scope: 'single-host', guarantee: 'multi-host C3', obsolete: 'The published package is 5.6.0.' },
];

for (const c of cases) {
  const html = readFileSync(c.page, 'utf8');
  for (const [name, value] of Object.entries({
    'v5.7.0 release link': 'https://github.com/skiredj-prog/tenir_governance/releases/tag/v5.7.0',
    'publication date': c.published,
    'bounded deployment': c.scope,
    'excluded C3 claim': c.guarantee,
    'published package source': 'https://pypi.org/project/tenir-governance/5.7.0/',
  })) {
    assert(html.includes(value), `${c.locale}: missing ${name}: ${value}`);
  }
  assert(!html.includes(c.obsolete), `${c.locale}: obsolete published 5.6.0 claim remains`);
}
console.log('TENIR-Gov v5.7.0 FR/EN release status, bounded scope and non-claims verified.');
