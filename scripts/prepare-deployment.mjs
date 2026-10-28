import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '..');
const surface = process.argv[2] || 'docs';
if (!['docs', 'storybook'].includes(surface)) throw Error('Choose docs or storybook.');
const tracked = execFileSync('git', ['ls-files', '-co', '--exclude-standard', '-z'], { cwd: root })
  .toString()
  .split('\0')
  .filter(Boolean);
const allowed = (file) =>
  /^(package\.json|pnpm-lock\.yaml|pnpm-workspace\.yaml|tsconfig(?:\.base)?\.json|LICENSE)$/.test(
    file,
  ) ||
  file.startsWith('packages/') ||
  file.startsWith('apps/' + surface + '/') ||
  file === 'scripts/build-tokens.mjs';
const names = [...new Set(tracked.filter(allowed))]
  .filter((file) => fs.existsSync(path.join(root, file)))
  .sort();
if (
  names.some(
    (file) =>
      file.split('/').some((part) => part === 'node_modules' || part === '.vercel') ||
      /(^|\/)\.env/.test(file),
  )
)
  throw Error('Unexpected private or generated path in deployment.');
const files = names.map((file) => ({
  file,
  encoding: 'base64',
  data: fs.readFileSync(path.join(root, file)).toString('base64'),
}));
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root }).toString().trim();
const request = {
  name: surface === 'docs' ? 'antiflex-ui' : 'antiflex-storybook',
  files,
  target: 'preview',
  projectSettings: {
    rootDirectory: 'apps/' + surface,
    framework: surface === 'docs' ? 'nextjs' : null,
    nodeVersion: '24.x',
    sourceFilesOutsideRootDirectory: true,
    installCommand: 'pnpm install --frozen-lockfile',
    buildCommand: 'cd ../.. && pnpm ' + (surface === 'docs' ? 'build' : 'storybook:build'),
    ...(surface === 'storybook' ? { outputDirectory: 'storybook-static' } : {}),
  },
  meta: {
    sourceCommit: commit,
    sourceDirty: execFileSync('git', ['status', '--porcelain'], { cwd: root }).toString().trim()
      ? 'true'
      : 'false',
  },
};
fs.mkdirSync(path.join(root, 'artifacts'), { recursive: true });
fs.writeFileSync(path.join(root, `artifacts/vercel-${surface}.json`), JSON.stringify(request));
console.log(`Prepared ${files.length} source files for ${surface}. No deployment was performed.`);
