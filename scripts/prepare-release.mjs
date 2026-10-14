import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'packages/cli/package.json'), 'utf8'));
function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.error || result.status !== 0) throw Error(command + ' failed');
}
run('pnpm', ['installer:pack']);
const artifacts = path.join(root, 'artifacts');
const tarball = `${pkg.name.replace('@', '').replace('/', '-')}-${pkg.version}.tgz`;
const sha256 = crypto
  .createHash('sha256')
  .update(fs.readFileSync(path.join(artifacts, tarball)))
  .digest('hex');
fs.writeFileSync(path.join(artifacts, 'SHA256SUMS'), `${sha256}  ${tarball}\n`);
const notes = fs.readFileSync(path.join(root, 'docs/releases/0.1.0-alpha.1.md'), 'utf8');
fs.writeFileSync(path.join(artifacts, 'RELEASE_NOTES.md'), notes);
console.log(`Prepared ${tarball}, SHA256SUMS, and RELEASE_NOTES.md. No publish was performed.`);
