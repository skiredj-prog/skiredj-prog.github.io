import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// Guard against reintroducing a retired contact address in the public site.
// Split the retired address to avoid matching this guard's own source code.
const retired = ['skiredj', 'tenirlabs.cc'].join('@').toLowerCase();
const replacement = 'skiredj@gmail.com';
const roots = ['src', 'public', 'scripts', 'dist'];
const offenders = [];
let renderedReplacementCount = 0;
let checkedFiles = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(filename);
    } else if (entry.isFile()) {
      const bytes = await readFile(filename);
      const body = bytes.toString('utf8').toLowerCase();
      checkedFiles += 1;
      if (body.includes(retired)) offenders.push(filename);
      if (dir === 'dist' || filename.startsWith('dist' + path.sep)) {
        renderedReplacementCount += body.split(replacement).length - 1;
      }
    }
  }
}

for (const root of roots) await walk(root);
if (offenders.length) {
  console.error('FAIL: retired contact address in:', offenders.join(', '));
  process.exitCode = 1;
} else if (renderedReplacementCount === 0) {
  console.error('FAIL: replacement contact address missing from rendered site');
  process.exitCode = 1;
} else {
  console.log('PASS: retired contact address absent from ' + checkedFiles + ' source and build files; current contact address present in rendered output.');
}
