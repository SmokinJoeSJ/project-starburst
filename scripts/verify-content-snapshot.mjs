import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { extname, sep } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import {
  readFile,
  writeFile,
  mkdir,
  copyFile,
  symlink,
} from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { hash } from '../lib/content/validation.mjs';
import { diff } from '../lib/content/plm-contract.mjs';
import { importBundle } from '../lib/content/import.mjs';
const root = resolve('outputs/content-snapshot-' + Date.now());
await mkdir(root, { recursive: true });
const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  { encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean);
for (const file of files) {
  const target = join(root, file);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(file, target);
}
await symlink(resolve('node_modules'), join(root, 'node_modules'), 'junction');
const read = async (path) =>
  JSON.parse(await readFile(join(root, path), 'utf8'));
const write = async (path, value) =>
  writeFile(join(root, path), JSON.stringify(value, null, 2) + '\n');
const manifest = await read('content/plm-manifest.json'),
  baseline = await read('content/plm-content.json'),
  binding = await read('content/editor-binding.json');
manifest.siteId =
  baseline.siteId =
  binding.siteId =
    '11111111-1111-4111-8111-111111111111';
await write('content/plm-manifest.json', manifest);
await write('content/plm-content.json', baseline);
await write('content/editor-binding.json', binding);
const document = structuredClone(baseline),
  assetId = '44444444-4444-4444-8444-444444444444',
  revisionId = '33333333-3333-4333-8333-333333333333',
  originalHash = hash('authorized fixture original');
document.values['home.heading'] = 'Approved fixture heading';
document.values['home.seo.title'] = 'Approved fixture title';
document.values['home.seo.description'] = 'Approved fixture description';
document.values['home.hero-home-hero.image'] = { assetId };
document.values['home.hero-home-hero.image.alt'] = 'Approved fixture swatch';
document.media = { [assetId]: '/media/starburst/' + originalHash + '.webp' };
document.baseContentHash = hash(document.values);
const assetDirectory = join(root, 'outputs/transfer');
await mkdir(assetDirectory, { recursive: true });
await copyFile(
  'tests/fixtures/editor/image.webp',
  join(assetDirectory, originalHash + '.webp'),
);
const bundle = {
  exportVersion: 'plm-export/1',
  siteId: manifest.siteId,
  revisionId,
  repository: binding.repository,
  targetBranch: binding.targetBranch,
  featureBranch: 'content/plm-' + revisionId,
  expectedContentHash: hash(baseline),
  expectedBaseContentHash: baseline.baseContentHash,
  sourceCommit: baseline.sourceCommit,
  files: [{ path: binding.contentPath, content: document }],
  assets: [
    {
      assetId,
      originalHash,
      outputPath: binding.assetPath + '/' + originalHash + '.webp',
      delivery: 'private_derivative_requires_authorized_copy',
    },
  ],
  changes: diff(manifest, baseline.values, document.values),
  productionChanged: false,
};
await importBundle({ root, bundle, assetDirectory, apply: true });
execFileSync(process.execPath, ['scripts/validate-content.mjs'], {
  cwd: root,
  stdio: 'inherit',
});
execFileSync(process.execPath, ['scripts/build-vercel.mjs'], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    VERCEL_ENV: 'preview',
    VERCEL_GIT_COMMIT_REF: 'feature/fixture-content-import',
  },
});
const html = await readFile(join(root, 'dist/client/index.html'), 'utf8'),
  rsc = await readFile(join(root, 'dist/client/index.rsc'), 'utf8');
for (const value of [
  'Approved fixture heading',
  'Approved fixture title',
  'Approved fixture description',
  'Approved fixture swatch',
  document.baseContentHash,
])
  if (!html.includes(value))
    throw Error('Imported snapshot missing from HTML/RSC: ' + value);
if (
  !rsc.includes(document.baseContentHash) ||
  !rsc.includes('home.heading') ||
  !rsc.includes('Approved fixture title')
)
  throw Error('RSC snapshot identity or metadata mismatch');
await readFile(
  join(root, 'dist/client/media/starburst/' + originalHash + '.webp'),
);
const publicRoot = join(root, 'dist/client');
const server = createServer((req, res) => {
  let path = new URL(req.url, 'http://localhost').pathname;
  path =
    req.headers.rsc === '1'
      ? path === '/'
        ? '/index.rsc'
        : path + '.rsc'
      : path === '/'
        ? '/index.html'
        : !extname(path)
          ? path + '.html'
          : path;
  const file = resolve(publicRoot, '.' + path);
  if (!file.startsWith(publicRoot + sep) || !existsSync(file)) {
    res.statusCode = 404;
    return res.end();
  }
  res.setHeader(
    'Content-Type',
    {
      '.html': 'text/html; charset=utf-8',
      '.rsc': 'text/x-component',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.jpg': 'image/jpeg',
      '.woff2': 'font/woff2',
    }[extname(file)] || 'application/octet-stream',
  );
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const { chromium } = createRequire(import.meta.url)(
  process.env.PLM_PLAYWRIGHT_MODULE || 'playwright',
);
const browser = await chromium.launch({
  channel: process.env.PLM_BROWSER_CHANNEL || 'msedge',
  headless: true,
});
try {
  const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    }),
    url = 'http://127.0.0.1:' + server.address().port;
  await page.goto(url, { waitUntil: 'networkidle' });
  if ((await page.locator('h1').innerText()) !== 'Approved fixture heading')
    throw Error('Rendered imported heading mismatch');
  if ((await page.title()) !== 'Approved fixture title')
    throw Error('Rendered imported title mismatch');
  if (
    !(await page
      .locator('img[alt="Approved fixture swatch"]')
      .evaluate((i) => i.complete && i.naturalWidth === 16))
  )
    throw Error('Imported image does not decode');
  await page.locator('header nav a[href="/about-us"]').click();
  await page.waitForURL(url + '/about-us');
  await page.locator('header a[href="/"]').click();
  await page.waitForURL(url + '/');
  if ((await page.locator('h1').innerText()) !== 'Approved fixture heading')
    throw Error('RSC navigation lost imported content');
  await page.screenshot({
    path: 'outputs/editor-review/approved-snapshot.jpg',
    quality: 80,
  });
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
const current = JSON.parse(await readFile('content/plm-content.json', 'utf8'));
if (
  current.siteId !== null ||
  current.values['home.heading'] === 'Approved fixture heading'
)
  throw Error('Fixture escaped into working content');
const result = {
  kind: 'isolated imported snapshot build only',
  root,
  baseContentHash: document.baseContentHash,
  htmlAndRsc: true,
  metadata: true,
  durableWebp: true,
  realStagingPublish: false,
};
await writeFile(
  'outputs/editor-review/imported-snapshot.json',
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result));
