import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const source = readFileSync(resolve(root, 'src/data/processRoles.ts'), 'utf8');
const fr = readFileSync(resolve(root, 'dist/processus-et-roles/index.html'), 'utf8');
const en = readFileSync(resolve(root, 'dist/en/processus-et-roles/index.html'), 'utf8');

const stages = [...new Set([...source.matchAll(/id:'(stage-\d+)'/g)].map((m) => m[1]))];
const roles = [...new Set([...source.matchAll(/id:'(role-\d+)'/g)].map((m) => m[1]))];
const instruments = [...source.matchAll(/\{id:'([^']+)',name:'([^']+)'\}/g)].map((m) => ({ id: m[1], name: m[2] }));
const expectedStages = ['stage-1','stage-2','stage-3','stage-4','stage-5','stage-6'];
const expectedRoles = ['role-1','role-2','role-3','role-4','role-5','role-6'];
const portfolioSource = readFileSync(resolve(root, 'src/data/portfolio.ts'), 'utf8');
const missing = [...new Set(instruments.map((item) => item.id))].filter((id) => !new RegExp(`^  ['"]?${id}['"]?:`, 'm').test(portfolioSource));
const failures = [];
if (JSON.stringify(stages) !== JSON.stringify(expectedStages)) failures.push(`stages=${stages.join(',')}`);
if (JSON.stringify(roles) !== JSON.stringify(expectedRoles)) failures.push(`roles=${roles.join(',')}`);
if (missing.length) failures.push(`missing portfolio ids=${missing.join(',')}`);
for (const [name, html] of [['FR', fr], ['EN', en]]) {
  for (const id of [...expectedStages, ...expectedRoles]) if (!html.includes(`id="${id}"`)) failures.push(`${name} missing #${id}`);
  if (!html.includes(name === 'FR' ? 'Voir les méthodes et leur statut' : 'See the related methods and their current status')) failures.push(`${name} missing fixed product sentence`);
}
if (failures.length) {
  console.error(`FAIL Process & Roles integrity: ${failures.join('; ')}`);
  process.exit(1);
}
console.log(`PASS Process & Roles integrity: ${stages.length} stages, ${roles.length} roles, ${new Set(instruments.map((item) => item.id)).size} instrument links, FR/EN anchors present.`);
