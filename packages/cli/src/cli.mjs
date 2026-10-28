#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { initialize, addComponents, readRegistry } from './installer.mjs';
const help = `antiflex/ui — original source installer\n\nUsage:\n  antiflex init [--css src/index.css] [--skip-install]\n  antiflex add button text-field\n  antiflex add --all\n  antiflex list\n\nOptions:\n  --cwd <path>             Target an existing React project\n  --components-dir <path>  Component location during init\n  --styles-dir <path>      Token and style location during init\n  --dry-run                Inspect planned changes without writing\n  --force                  Replace requested edited components with backups\n  --skip-install           Prepare files; install fonts yourself\n  --help                   Show this help\n  --version                Show the bundled release\n\nTailwind CSS 4 must already be configured. You own the copied source.\n`;
try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      cwd: { type: 'string' },
      css: { type: 'string' },
      'components-dir': { type: 'string' },
      'styles-dir': { type: 'string' },
      'dry-run': { type: 'boolean' },
      force: { type: 'boolean' },
      all: { type: 'boolean' },
      'skip-install': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
    },
  });
  if (values.version) {
    console.log(readRegistry().release);
  } else if (values.help || !positionals.length) {
    console.log(help);
  } else if (positionals[0] === 'list') {
    for (const [name, item] of Object.entries(readRegistry().components))
      console.log(
        name + (item.dependencies.length ? ' (includes ' + item.dependencies.join(', ') + ')' : ''),
      );
  } else {
    const options = {
      css: values.css,
      componentsDir: values['components-dir'],
      stylesDir: values['styles-dir'],
      dryRun: values['dry-run'],
      skipInstall: values['skip-install'],
      force: values.force,
      all: values.all,
    };
    const cwd = values.cwd || process.cwd();
    let result;
    if (positionals[0] === 'init') result = initialize(cwd, options);
    else if (positionals[0] === 'add') result = addComponents(cwd, positionals.slice(1), options);
    else throw Error('Unknown command: ' + positionals[0]);
    console.log(
      result.dryRun
        ? 'Dry run — no files changed.'
        : result.alreadyConfigured
          ? 'antiflex is already configured.'
          : 'antiflex is ready.',
    );
    for (const file of result.files)
      console.log((result.dryRun ? 'Would write: ' : 'Wrote: ') + file);
    if (result.preserved?.length)
      console.log('Kept your customized dependencies: ' + result.preserved.join(', '));
    if (result.backup) console.log('Original component backups: ' + result.backup);
    if (values['skip-install'] && Object.keys(result.dependencies || {}).length)
      console.log('Next: ' + result.packageManager + ' install');
  }
} catch (error) {
  console.error('antiflex: ' + error.message);
  process.exitCode = 1;
}
