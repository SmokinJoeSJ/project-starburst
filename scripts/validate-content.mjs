import { readFile, access } from 'node:fs/promises';
import { validateApproved } from '../lib/content/validation.mjs';
const read = async (path) =>
  JSON.parse(await readFile(new URL('../' + path, import.meta.url), 'utf8'));
try {
  const [manifest, document, binding] = await Promise.all(
    [
      'content/plm-manifest.json',
      'content/plm-content.json',
      'content/editor-binding.json',
    ].map(read),
  );
  const result = validateApproved(manifest, document, binding);
  const vercel = await read('vercel.json');
  const expected =
    'frame-ancestors ' +
    (binding.parentOrigins.length ? binding.parentOrigins.join(' ') : "'none'");
  const frameHeader = vercel.headers
    .find((rule) => rule.source === '/plm-preview')
    ?.headers.find((header) => header.key === 'Content-Security-Policy')?.value;
  const rscHeader = vercel.routes.find((rule) => rule.src === '^/plm-preview$')
    ?.headers?.['Content-Security-Policy'];
  if (frameHeader !== expected || rscHeader !== expected)
    throw Error(
      'Preview HTTP frame-ancestors must exactly match editor-binding parentOrigins',
    );
  for (const path of Object.values(document.media ?? {}))
    await access(new URL('../public' + path, import.meta.url));
  console.log(
    'Approved content valid: ' +
      result.fields +
      ' fields; ' +
      (result.bound ? 'Site bound' : 'unbound; editor connection disabled') +
      '; ' +
      result.baseContentHash,
  );
} catch (error) {
  console.error(
    'Content validation: ' +
      error.message +
      (error.fieldId ? ' — ' + error.fieldId : ''),
  );
  process.exitCode = 1;
}
