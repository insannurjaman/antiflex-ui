import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

export const registryRoot = path.resolve(import.meta.dirname, '../registry');
export function readRegistry() {
  return JSON.parse(fs.readFileSync(path.join(registryRoot, 'manifest.json'), 'utf8'));
}
function payload(file) {
  const registry = readRegistry();
  if (!Object.hasOwn(registry.integrity, file)) throw Error('Unknown registry file: ' + file);
  const content = fs.readFileSync(path.join(registryRoot, file), 'utf8');
  if (crypto.createHash('sha256').update(content).digest('hex') !== registry.integrity[file])
    throw Error('Registry integrity check failed: ' + file);
  return content;
}
export function relativePath(value) {
  if (typeof value !== 'string' || !value.trim() || value.includes('\0'))
    throw Error('Use a non-empty relative project path.');
  const input = value.replaceAll('\\', '/');
  if (
    path.posix.isAbsolute(input) ||
    path.win32.isAbsolute(value) ||
    /^[a-z]:/i.test(input) ||
    input.split('/').includes('..')
  )
    throw Error('Paths must stay inside the project: ' + value);
  return path.posix.normalize(input).replace(/^\.\//, '');
}
export function checkedPath(root, relative) {
  const normalized = relativePath(relative);
  const segments = normalized.split('/').filter((s) => s !== '.');
  let current = root;
  for (const [index, segment] of segments.entries()) {
    current = path.join(current, segment);
    try {
      const stat = fs.lstatSync(current);
      if (stat.isSymbolicLink()) throw Error('Refusing a symlink target: ' + normalized);
      if (index < segments.length - 1 && !stat.isDirectory())
        throw Error('Expected a directory: ' + current);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  return current;
}
function project(cwd) {
  const root = fs.realpathSync(path.resolve(cwd));
  const manifestPath = checkedPath(root, 'package.json');
  if (!fs.existsSync(manifestPath)) throw Error('Run antiflex inside an existing React project.');
  const original = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(original);
  if (!manifest.dependencies?.react && !manifest.devDependencies?.react)
    throw Error('The project must declare React before installing antiflex.');
  return { root, manifest, original };
}
function configFor(root) {
  const file = checkedPath(root, 'antiflex.json');
  if (!fs.existsSync(file))
    throw Error('Run antiflex init first to connect your stylesheet and tokens.');
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (config.version !== 1 || config.tailwind !== 4)
    throw Error('Unsupported antiflex configuration. This installer supports Tailwind CSS 4.');
  for (const name of ['css', 'componentsDir', 'stylesDir']) checkedPath(root, config[name]);
  return config;
}
function addWrite(plan, root, relative, content) {
  const target = checkedPath(root, relative);
  if (plan.some((write) => write.target === target))
    throw Error('Output paths overlap: ' + relative);
  const previous = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
  if (previous !== content) plan.push({ relative, target, content, previous });
}
function apply(plan, dryRun) {
  if (dryRun) return;
  const written = [];
  try {
    for (const write of plan) {
      // Recheck before writing in case a parent path changed after planning.
      const root = write.root;
      if (root) checkedPath(root, write.relative);
      if (
        (fs.existsSync(write.target) ? fs.readFileSync(write.target, 'utf8') : null) !==
        write.previous
      )
        throw Error('File changed during installation: ' + write.relative);
      fs.mkdirSync(path.dirname(write.target), { recursive: true });
      const temporary = write.target + '.antiflex-' + crypto.randomUUID();
      try {
        fs.writeFileSync(temporary, write.content);
        fs.renameSync(temporary, write.target);
      } finally {
        if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
      }
      written.push(write);
    }
  } catch (error) {
    for (const write of written.reverse()) {
      if (write.previous === null) fs.rmSync(write.target, { force: true });
      else fs.writeFileSync(write.target, write.previous);
    }
    throw error;
  }
}
function finish(root, plan, options, extra) {
  for (const write of plan) write.root = root;
  apply(plan, options.dryRun);
  return { dryRun: Boolean(options.dryRun), files: plan.map((write) => write.relative), ...extra };
}
function json(value, previous = '') {
  return JSON.stringify(value, null, previous.match(/\n([ \t]+)"/)?.[1] || '  ') + '\n';
}
function manager(manifest, root) {
  const declared = manifest.packageManager?.split('@')[0];
  if (['npm', 'pnpm', 'yarn', 'bun'].includes(declared)) return declared;
  const locks = [
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['bun.lock', 'bun'],
    ['bun.lockb', 'bun'],
    ['package-lock.json', 'npm'],
  ]
    .filter(([file]) => fs.existsSync(path.join(root, file)))
    .map(([, name]) => name);
  const unique = [...new Set(locks)];
  if (unique.length > 1)
    throw Error('Multiple package-manager lockfiles found. Set packageManager in package.json.');
  return unique[0] || 'npm';
}
export function initialize(cwd, options = {}) {
  const { root, manifest, original } = project(cwd);
  if (fs.existsSync(checkedPath(root, 'antiflex.json'))) {
    const config = configFor(root);
    for (const [option, key] of [
      ['css', 'css'],
      ['componentsDir', 'componentsDir'],
      ['stylesDir', 'stylesDir'],
    ])
      if (options[option] && relativePath(options[option]) !== config[key])
        throw Error(
          'antiflex is already configured. Edit antiflex.json deliberately to change paths.',
        );
    return { files: [], alreadyConfigured: true, config };
  }
  if (!manifest.dependencies?.tailwindcss && !manifest.devDependencies?.tailwindcss)
    throw Error('Install and configure Tailwind CSS 4 in your React app first.');
  const tailwind = manifest.dependencies?.tailwindcss || manifest.devDependencies?.tailwindcss;
  if (!/^(?:\^|~|>=|=)?4\./.test(tailwind))
    throw Error('This alpha supports Tailwind CSS 4. Use a version range starting with 4.');
  const cssCandidates =
    manifest.dependencies?.next || manifest.devDependencies?.next
      ? ['src/app/globals.css', 'app/globals.css']
      : ['src/index.css', 'src/styles.css', 'src/app.css', 'src/App.css'];
  const stylesheet =
    options.css || cssCandidates.find((candidate) => fs.existsSync(checkedPath(root, candidate)));
  if (!stylesheet)
    throw Error('No stylesheet found. Run antiflex init --css <your-existing-stylesheet>.');
  const css = relativePath(stylesheet);
  if (path.posix.extname(css) !== '.css') throw Error('Choose an existing .css stylesheet.');
  const cssFile = checkedPath(root, css);
  if (!fs.existsSync(cssFile) || !fs.statSync(cssFile).isFile())
    throw Error('Stylesheet does not exist: ' + css);
  const prefix = fs.existsSync(checkedPath(root, 'src')) ? 'src/' : '';
  const config = {
    version: 1,
    tailwind: 4,
    css,
    componentsDir: relativePath(options.componentsDir || prefix + 'components/antiflex'),
    stylesDir: relativePath(options.stylesDir || prefix + 'styles/antiflex'),
  };
  checkedPath(root, config.componentsDir);
  checkedPath(root, config.stylesDir);
  if (css === config.stylesDir || css.startsWith(config.stylesDir + '/'))
    throw Error('Your entry stylesheet must be outside the generated antiflex styles directory.');
  for (const directory of [config.componentsDir, config.stylesDir]) {
    const target = checkedPath(root, directory);
    if (fs.existsSync(target) && !fs.statSync(target).isDirectory())
      throw Error('Expected a directory: ' + directory);
  }
  const pm = manager(manifest, root);
  const plan = [];
  for (const file of Object.keys(readRegistry().integrity).filter((file) =>
    file.startsWith('styles/'),
  )) {
    const destination = config.stylesDir + '/' + file.slice('styles/'.length);
    const target = checkedPath(root, destination);
    const content = payload(file);
    if (fs.existsSync(target) && fs.readFileSync(target, 'utf8') !== content)
      throw Error(
        'Existing style would be replaced: ' + destination + '. Choose a different --styles-dir.',
      );
    addWrite(plan, root, destination, content);
  }
  let importPath = path
    .relative(path.dirname(cssFile), checkedPath(root, config.stylesDir + '/index.css'))
    .split(path.sep)
    .join('/');
  if (!importPath.startsWith('.')) importPath = './' + importPath;
  const originalCss = fs.readFileSync(cssFile, 'utf8');
  const directive = `@import '${importPath}';`;
  const alreadyImported =
    originalCss.includes(directive) || originalCss.includes(`@import "${importPath}";`);
  const charset = originalCss.match(/^\s*@charset\s+[^;]+;/);
  const nextCss = alreadyImported
    ? originalCss
    : charset
      ? charset[0] + '\n' + directive + '\n' + originalCss.slice(charset[0].length)
      : directive + '\n' + originalCss;
  addWrite(plan, root, css, nextCss);
  const dependencies = {};
  manifest.dependencies ||= {};
  for (const [name, version] of Object.entries(readRegistry().fonts))
    if (!manifest.dependencies[name] && !manifest.devDependencies?.[name]) {
      manifest.dependencies[name] = version;
      dependencies[name] = version;
    }
  if (Object.keys(dependencies).length)
    addWrite(plan, root, 'package.json', json(manifest, original));
  addWrite(plan, root, 'antiflex.json', json(config));
  const result = finish(root, plan, options, { config, dependencies, packageManager: pm });
  if (!options.dryRun && !options.skipInstall && Object.keys(dependencies).length) {
    const install = spawnSync(pm, ['install'], {
      cwd: root,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    if (install.error || install.status !== 0)
      throw Error(
        'antiflex files are ready, but dependency installation failed. Run ' +
          pm +
          ' install to finish.',
      );
  }
  return result;
}
export function addComponents(cwd, requested, options = {}) {
  const { root } = project(cwd);
  const config = configFor(root);
  const registry = readRegistry();
  const explicit = options.all ? Object.keys(registry.components) : [...new Set(requested)];
  if (!explicit.length) throw Error('Name a component, or use antiflex add --all.');
  for (const name of explicit)
    if (!Object.hasOwn(registry.components, name))
      throw Error('Unknown component: ' + name + '. Run antiflex list.');
  const ordered = [];
  const seen = new Set();
  function visit(name) {
    if (seen.has(name)) return;
    seen.add(name);
    for (const dependency of registry.components[name].dependencies) visit(dependency);
    ordered.push(name);
  }
  explicit.forEach(visit);
  const plan = [];
  const skipped = [];
  const preserved = [];
  let backup;
  for (const name of ordered) {
    const file = registry.components[name].file;
    const relative = config.componentsDir + '/' + path.basename(file);
    const target = checkedPath(root, relative);
    const content = payload(file);
    if (fs.existsSync(target)) {
      const previous = fs.readFileSync(target, 'utf8');
      if (previous === content) {
        skipped.push(name);
        continue;
      }
      if (!explicit.includes(name)) {
        preserved.push(name);
        continue;
      }
      if (!options.force)
        throw Error(
          'Your component has changes: ' + relative + '. Use --force to replace it with a backup.',
        );
      backup ||=
        '.antiflex/backups/' +
        new Date().toISOString().replaceAll(':', '-') +
        '-' +
        crypto.randomUUID().slice(0, 8);
      addWrite(plan, root, backup + '/' + relative, previous);
    }
    addWrite(plan, root, relative, content);
  }
  const utilities = new Set(ordered.flatMap((name) => registry.components[name].utilities || []));
  for (const file of utilities) {
    const relative = config.componentsDir + '/' + path.basename(file);
    if (!fs.existsSync(checkedPath(root, relative)))
      addWrite(plan, root, relative, payload('components/' + file));
  }
  const utils = config.componentsDir + '/utils.ts';
  if (!fs.existsSync(checkedPath(root, utils)))
    addWrite(plan, root, utils, payload('components/utils.ts'));
  return finish(root, plan, options, { components: ordered, skipped, preserved, backup });
}
