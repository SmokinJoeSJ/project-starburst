import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import * as C from '../lib/content/plm-contract.mjs';
import { hash, validateApproved } from '../lib/content/validation.mjs';
import {
  ChildConnection,
  installHelloMailbox,
  validateDraft,
} from '../lib/content/bridge.mjs';
import {
  validateBundle,
  importBundle,
  webpSize,
} from '../lib/content/import.mjs';
const read = async (path) =>
  JSON.parse(await readFile(new URL('../' + path, import.meta.url), 'utf8'));
const rawManifest = await read('content/plm-manifest.json'),
  raw = await read('content/plm-content.json'),
  rawBinding = await read('content/editor-binding.json');
const siteId = '11111111-1111-4111-8111-111111111111',
  nonce = '22222222-2222-4222-8222-222222222222',
  revisionId = '33333333-3333-4333-8333-333333333333';
const manifest = { ...rawManifest, siteId },
  baseline = { ...raw, siteId },
  binding = { ...rawBinding, siteId };
const policy = {
  parentOrigins: ['https://studio.example.test'],
  mediaOrigins: ['https://media.example.test'],
  mediaPathPrefixes: ['/storage/v1/object/sign/plm-files/'],
};
const draft = () => ({
  document: structuredClone(baseline),
  media: {},
  viewport: 'desktop',
  mode: 'edit',
  selected: null,
});
const fail = (fn, code) => assert.throws(fn, (e) => e.code === code);
function harness() {
  const listeners = new Set(),
    applied = [],
    sent = [],
    errors = [],
    resets = [];
  const host = {
      addEventListener: (_type, fn) => listeners.add(fn),
      removeEventListener: (_type, fn) => listeners.delete(fn),
    },
    parent = {
      postMessage: (message, origin) => sent.push({ message, origin }),
    };
  const bridge = new ChildConnection({
    host,
    parent,
    manifest,
    baseline,
    policy,
    onApply: (state) => applied.push(state),
    onReset: () => resets.push(true),
    onError: (code) => errors.push(code),
  });
  const envelope = (type, payload, extra = {}) => ({
    protocol: C.BRIDGE,
    type,
    nonce,
    siteId,
    pageId: 'home',
    pageEpoch: 1,
    seq: type === 'plm:hello' ? 1 : 2,
    payload,
    ...extra,
  });
  const receive = (message, extra = {}) =>
    bridge.receive({
      origin: policy.parentOrigins[0],
      source: parent,
      data: message,
      ...extra,
    });
  const hello = () =>
    receive(
      envelope('plm:hello', {
        manifestVersion: manifest.manifestVersion,
        rendererVersion: manifest.rendererVersion,
      }),
    );
  return {
    bridge,
    listeners,
    host,
    parent,
    applied,
    sent,
    errors,
    resets,
    envelope,
    receive,
    hello,
  };
}
function bundle() {
  const document = structuredClone(baseline);
  document.values['home.heading'] = 'Approved fixture heading';
  document.baseContentHash = hash(document.values);
  return {
    exportVersion: 'plm-export/1',
    siteId,
    revisionId,
    repository: binding.repository,
    targetBranch: binding.targetBranch,
    featureBranch: 'content/plm-' + revisionId,
    expectedContentHash: hash(baseline),
    expectedBaseContentHash: baseline.baseContentHash,
    sourceCommit: baseline.sourceCommit,
    files: [{ path: binding.contentPath, content: document }],
    assets: [],
    changes: C.diff(manifest, baseline.values, document.values),
    productionChanged: false,
  };
}
await test('local unbound templates validate, but wire/import require a canonical Site binding', () => {
  assert.equal(validateApproved(rawManifest, raw, rawBinding).bound, false);
  fail(() => C.validateManifest(rawManifest), 'incompatible_schema');
  fail(
    () => validateBundle(rawManifest, raw, rawBinding, bundle()),
    'site_registration_required',
  );
  C.validateManifest(manifest);
  C.validateDocument(manifest, baseline);
});
await test('normative PLM validator accepts exactly the same registered schema and content', async () => {
  const context = { module: { exports: {} } };
  runInNewContext(
    await readFile(
      new URL('./fixtures/editor/plm/site-editor-contract.js', import.meta.url),
      'utf8',
    ),
    context,
  );
  const actual = context.module.exports;
  actual.validateManifest(manifest);
  actual.validateDocument(manifest, baseline);
  assert.equal(actual.VERSION, C.VERSION);
});
await test('approved content hash and version checks fail with field-specific validation', () => {
  const d = structuredClone(baseline);
  d.values['home.heading'] = '<script>unsafe</script>';
  assert.throws(
    () => validateApproved(manifest, d, binding),
    (e) => e.code === 'invalid_text' && e.fieldId === 'home.heading',
  );
  d.values['home.heading'] = 'changed';
  fail(
    () => validateApproved(manifest, d, binding),
    'base_content_hash_mismatch',
  );
});
await test('unknown, locked, control-character and oversized fields cannot be applied', () => {
  for (const [mutate, code] of [
    [
      (p) => {
        p.document.values['unknown.field'] = 'x';
      },
      'invalid_document',
    ],
    [
      (p) => {
        p.document.values['shared.phone.href'] = 'tel:123';
      },
      'locked_field',
    ],
    [
      (p) => {
        p.document.values['home.heading'] = 'x'.repeat(13000);
      },
      'invalid_text',
    ],
    [
      (p) => {
        p.document.values['home.heading'] = 'bad\u0000text';
      },
      'invalid_text',
    ],
  ]) {
    const p = draft();
    mutate(p);
    fail(() => validateDraft(manifest, baseline, p, policy), code);
  }
});
await test('empty optional values survive; required fields cannot be empty', () => {
  const optional = structuredClone(manifest);
  optional.fields['home.heading'].constraints.required = false;
  const p = draft();
  p.document.values['home.heading'] = '';
  assert.equal(
    validateDraft(optional, baseline, p, policy).document.values[
      'home.heading'
    ],
    '',
  );
  fail(() => validateDraft(manifest, baseline, p, policy), 'required');
});
await test('media references reject unsafe origins, missing assets, extra assets, SVG, and invented durable paths', () => {
  const key = 'home.hero-home-hero.image';
  for (const url of [
    'javascript:alert(1)',
    'https://evil.example/a.webp',
    'data:image/svg+xml,evil',
    'https://media.example.test/other/x.webp',
    'https://media.example.test/storage/v1/object/sign/plm-files/%2fescape',
  ]) {
    const p = draft();
    p.document.values[key] = { assetId: revisionId };
    p.media[revisionId] = url;
    fail(() => validateDraft(manifest, baseline, p, policy), 'unsafe_media');
  }
  const p = draft();
  p.document.values[key] = { assetId: revisionId };
  fail(() => validateDraft(manifest, baseline, p, policy), 'missing_media');
  p.media[revisionId] =
    'https://media.example.test/storage/v1/object/sign/plm-files/safe.webp?token=fixture';
  assert.equal(
    validateDraft(manifest, baseline, p, policy).media[revisionId],
    p.media[revisionId],
  );
  p.document.media[revisionId] = '/media/evil.webp';
  fail(
    () => validateDraft(manifest, baseline, p, policy),
    'untrusted_public_media',
  );
});
await test('URL rules reject javascript, traversal, protocol-relative and unapproved destinations', () => {
  for (const value of [
    'javascript:alert(1)',
    '//evil.test',
    '/../donate',
    'https://evil.test',
    'mailto:someone@test?subject=x',
  ])
    assert.equal(C.safeLink(value, { paths: ['/donate'] }), false);
  assert.equal(C.safeLink('/donate', { paths: ['/donate'] }), true);
});
await test('wrong origin, source, nonce, protocol and out-of-order messages are ignored', () => {
  const h = harness();
  const hello = h.envelope('plm:hello', {
    manifestVersion: manifest.manifestVersion,
    rendererVersion: manifest.rendererVersion,
  });
  assert.equal(h.receive(hello, { origin: 'https://evil.example' }), false);
  assert.equal(h.receive(hello, { source: {} }), false);
  assert.equal(h.receive({ ...hello, protocol: 'legacy' }), false);
  assert.equal(h.sent.length, 0);
  h.hello();
  assert.equal(h.sent[0].origin, policy.parentOrigins[0]);
  assert.equal(
    h.receive(h.envelope('plm:apply', draft(), { nonce: revisionId })),
    false,
  );
  assert.equal(h.receive(h.envelope('plm:apply', draft(), { seq: 3 })), false);
  assert.equal(h.receive(h.envelope('plm:apply', draft())), true);
  assert.equal(h.receive(h.envelope('plm:apply', draft())), false);
  assert.equal(h.applied.length, 1);
  h.bridge.destroy();
});
await test('hello version mismatch is explicit and no draft is accepted', () => {
  const h = harness();
  h.receive(
    h.envelope('plm:hello', {
      manifestVersion: 'wrong',
      rendererVersion: manifest.rendererVersion,
    }),
  );
  assert.equal(h.sent[0].message.type, 'site:error');
  assert.equal(h.receive(h.envelope('plm:apply', draft())), false);
  h.bridge.destroy();
});
await test('page epochs, inspector selection, acknowledgements, read-only state and reconnection', () => {
  const h = harness();
  h.hello();
  h.receive(h.envelope('plm:apply', draft()));
  h.bridge.acknowledge(2);
  assert.equal(h.sent.at(-1).message.type, 'site:ack');
  assert.equal(h.bridge.select('home.heading'), true);
  assert.equal(h.bridge.select('about.seo.title'), false);
  const p = draft();
  p.mode = 'read-only';
  h.receive(
    h.envelope('plm:apply', p, { pageId: 'help', pageEpoch: 2, seq: 3 }),
  );
  assert.equal(h.bridge.select('shared.hours.time'), false);
  assert.equal(h.receive(h.envelope('plm:apply', p, { seq: 4 })), false);
  h.receive(
    h.envelope(
      'plm:hello',
      {
        manifestVersion: manifest.manifestVersion,
        rendererVersion: manifest.rendererVersion,
      },
      { nonce: revisionId, pageEpoch: 3 },
    ),
  );
  assert.equal(h.resets.length, 2);
  assert.equal(h.bridge.select('home.heading'), false);
  h.bridge.destroy();
  assert.equal(h.listeners.size, 0);
  assert.equal(
    h.receive(
      h.envelope('plm:apply', p, { seq: 2, nonce: revisionId, pageEpoch: 3 }),
    ),
    false,
  );
});
await test('early bootstrap holds only trusted hello and removes its listener on connection', () => {
  const h = harness();
  h.bridge.destroy();
  installHelloMailbox(h.host, h.parent, policy.parentOrigins);
  const fire = (m) =>
    [...h.listeners].forEach((fn) =>
      fn({ source: h.parent, origin: policy.parentOrigins[0], data: m }),
    );
  fire(h.envelope('plm:apply', draft()));
  fire(
    h.envelope('plm:hello', {
      manifestVersion: manifest.manifestVersion,
      rendererVersion: manifest.rendererVersion,
    }),
  );
  const bridge = new ChildConnection({
    host: h.host,
    parent: h.parent,
    manifest,
    baseline,
    policy,
    onReset: () => {},
    onApply: () => {},
    onError: () => {},
  });
  assert.equal(h.listeners.size, 1);
  assert.equal(h.sent.at(-1).message.type, 'site:ready');
  bridge.destroy();
  assert.equal(h.listeners.size, 0);
});
await test('draft application copies data and never mutates approved source', () => {
  const p = draft();
  p.document.values['home.heading'] = 'memory only';
  const d = validateDraft(manifest, baseline, p, policy);
  p.document.values['home.heading'] = 'later';
  assert.equal(d.document.values['home.heading'], 'memory only');
  assert.equal(baseline.values['home.heading'], raw.values['home.heading']);
});
await test('base-content conflicts include source commit and full document identity', () => {
  for (const key of ['baseContentHash', 'sourceCommit']) {
    const p = draft();
    p.document[key] = '0'.repeat(key === 'sourceCommit' ? 40 : 64);
    fail(
      () => validateDraft(manifest, baseline, p, policy),
      'base_content_conflict',
    );
  }
  const b = bundle();
  b.expectedContentHash = '0'.repeat(64);
  fail(
    () => validateBundle(manifest, baseline, binding, b),
    'base_content_conflict',
  );
});
await test('constrained export validates exact paths, protected fields, versions and change summary', () => {
  assert.equal(
    validateBundle(manifest, baseline, binding, bundle()).changes.length,
    1,
  );
  for (const [change, code] of [
    [
      (b) => {
        b.files[0].path = 'content/../app/page.tsx';
      },
      'protected_path',
    ],
    [
      (b) => {
        b.targetBranch = 'main';
      },
      'publishing_boundary',
    ],
    [
      (b) => {
        b.files[0].content.values['shared.phone.href'] = 'tel:123';
      },
      'locked_field',
    ],
    [
      (b) => {
        b.files[0].content.rendererVersion = 'other';
      },
      'incompatible_document',
    ],
    [
      (b) => {
        b.changes = [];
      },
      'invalid_change_summary',
    ],
  ]) {
    const b = bundle();
    change(b);
    fail(() => validateBundle(manifest, baseline, binding, b), code);
  }
});
await test('import dry run and apply are deterministic, preserve unrelated files, and refuse a stale retry', async () => {
  const root = await mkdtemp(join(tmpdir(), 'starburst-content-'));
  await mkdir(join(root, 'content'));
  for (const [path, value] of [
    ['plm-manifest.json', manifest],
    ['plm-content.json', baseline],
    ['editor-binding.json', binding],
  ])
    await writeFile(
      join(root, 'content', path),
      JSON.stringify(value, null, 2) + '\n',
    );
  await writeFile(join(root, 'unrelated.txt'), 'keep me');
  const b = bundle();
  assert.equal((await importBundle({ root, bundle: b })).applied, false);
  assert.equal(
    JSON.parse(await readFile(join(root, binding.contentPath), 'utf8'))
      .baseContentHash,
    baseline.baseContentHash,
  );
  assert.equal(
    (await importBundle({ root, bundle: b, apply: true })).applied,
    true,
  );
  assert.equal(await readFile(join(root, 'unrelated.txt'), 'utf8'), 'keep me');
  assert.equal(
    JSON.parse(await readFile(join(root, binding.contentPath), 'utf8')).values[
      'home.heading'
    ],
    'Approved fixture heading',
  );
  await assert.rejects(
    importBundle({ root, bundle: b, apply: true }),
    (e) => e.code === 'base_content_conflict',
  );
});
await test('invalid and active image payloads cannot pass the WebP import gate', () => {
  for (const bytes of [
    Buffer.from('<svg onload="alert(1)"/>'),
    Buffer.alloc(40),
    Buffer.from('RIFFinvalidWEBP'),
  ])
    fail(() => webpSize(bytes), 'invalid_webp');
});

await test('approved WebP import preserves bytes and durable references', async () => {
  const root = await mkdtemp(join(tmpdir(), 'starburst-media-'));
  await mkdir(join(root, 'content'));
  const assets = join(root, 'transfer');
  await mkdir(assets);
  for (const [path, value] of [
    ['plm-manifest.json', manifest],
    ['plm-content.json', baseline],
    ['editor-binding.json', binding],
  ])
    await writeFile(
      join(root, 'content', path),
      JSON.stringify(value, null, 2) + '\n',
    );
  const bytes = await readFile(
    new URL('./fixtures/editor/image.webp', import.meta.url),
  );
  assert.deepEqual(webpSize(bytes), { width: 16, height: 16 });
  const b = bundle(),
    originalHash = hash('authorized fixture original'),
    assetId = '44444444-4444-4444-8444-444444444444';
  const outputPath = binding.assetPath + '/' + originalHash + '.webp';
  b.assets = [
    {
      assetId,
      originalHash,
      outputPath,
      delivery: 'private_derivative_requires_authorized_copy',
    },
  ];
  const d = b.files[0].content;
  d.values['home.hero-home-hero.image'] = { assetId };
  d.values['home.hero-home-hero.image.alt'] = 'Approved fixture swatch';
  d.media = { [assetId]: outputPath.replace(/^public/, '') };
  d.baseContentHash = hash(d.values);
  b.changes = C.diff(manifest, baseline.values, d.values);
  await writeFile(join(assets, originalHash + '.webp'), bytes);
  await importBundle({ root, bundle: b, assetDirectory: assets, apply: true });
  assert.deepEqual(await readFile(join(root, outputPath)), bytes);
  const result = JSON.parse(
    await readFile(join(root, binding.contentPath), 'utf8'),
  );
  assert.equal(
    result.media[assetId],
    '/media/starburst/' + originalHash + '.webp',
  );
  assert.equal(
    result.values['home.hero-home-hero.image.alt'],
    'Approved fixture swatch',
  );
});

await test('JSONB key order does not break media validation or deterministic imports', () => {
  const b = bundle(),
    doc = b.files[0].content;
  doc.values['home.seo.title'] = 'Changed title';
  doc.baseContentHash = hash(doc.values);
  b.changes = C.diff(manifest, baseline.values, doc.values).reverse();
  doc.values = Object.fromEntries(Object.entries(doc.values).reverse());
  const plan = validateBundle(manifest, baseline, binding, b);
  assert.deepEqual(
    Object.keys(plan.document.values),
    Object.keys(manifest.fields),
  );
  const ids = [
    '44444444-4444-4444-8444-444444444444',
    '55555555-5555-4555-8555-555555555555',
  ];
  const base = structuredClone(baseline);
  base.media = {
    [ids[0]]: '/media/starburst/a.webp',
    [ids[1]]: '/media/starburst/b.webp',
  };
  const p = draft();
  p.document.media = Object.fromEntries(Object.entries(base.media).reverse());
  assert.ok(validateDraft(manifest, base, p, policy));
});
