import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { importBundle } from '../lib/content/import.mjs';
const args = process.argv.slice(2);
const file = args.find((arg) => !arg.startsWith('--'));
try {
  if (!file)
    throw Error(
      'Usage: npm run content:import -- bundle.json [--asset-dir=local-directory] [--apply]',
    );
  const apply = args.includes('--apply');
  if (apply) {
    const branch = execFileSync('git', ['branch', '--show-current'], {
      encoding: 'utf8',
    }).trim();
    if (!branch.startsWith('feature/'))
      throw Error(
        'Apply only on a feature/* branch. Open a PR into redesign-2026.',
      );
  }
  const bundle = JSON.parse(await readFile(resolve(file), 'utf8'));
  const result = await importBundle({
    root: process.cwd(),
    bundle,
    apply,
    assetDirectory: args.find((a) => a.startsWith('--asset-dir='))?.slice(12),
  });
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(
    'Content import: ' +
      error.message +
      (error.fieldId ? ' — ' + error.fieldId : ''),
  );
  process.exitCode = 1;
}
