import { execFileSync } from 'node:child_process';

const base = process.env.GITHUB_BASE_REF || process.argv[2] || 'main';
try {
  execFileSync('git', ['fetch', 'origin', `${base}:refs/remotes/origin/${base}`, '--depth=1'], { stdio: 'inherit' });
} catch {
  // The ref may already be available locally; continue to the actual comparison.
}

const ref = `origin/${base}`;
let comparison = `${ref}...HEAD`;
try {
  execFileSync('git', ['merge-base', ref, 'HEAD'], { stdio: 'ignore' });
} catch {
  comparison = `${ref}..HEAD`;
  console.warn(`WARN no merge base found locally; using ${comparison}`);
}
try {
  execFileSync('git', ['diff', '--check', comparison], { stdio: 'inherit' });
  console.log(`PASS branch whitespace check: ${comparison}`);
} catch (error) {
  console.error(`FAIL branch whitespace check: ${comparison}`);
  process.exit(error.status || 1);
}
