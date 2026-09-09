import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { assertVercelBuildAllowed } from '../lib/deployment-policy.mjs';
import { staticSeoDocuments } from '../lib/seo-documents.mjs';
import { verifyExport } from './verify-export.mjs';

assertVercelBuildAllowed(process.env);
const result = spawnSync(
  process.execPath,
  ['node_modules/vinext/dist/cli.js', 'build'],
  {
    stdio: 'inherit',
    env: { ...process.env, PLM_BUILD_TARGET: 'vercel' },
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
// Vinext's current static export omits generated metadata routes.
for (const [name, content] of Object.entries(staticSeoDocuments(process.env))) {
  writeFileSync(join('dist/client', name), content);
}
verifyExport(process.env);
