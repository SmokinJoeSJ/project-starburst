import {
  readFile,
  lstat,
  realpath,
  mkdir,
  writeFile,
  rename,
} from 'node:fs/promises';
import {
  resolve,
  dirname,
  relative,
  isAbsolute,
  sep,
  basename,
} from 'node:path';
import * as C from './plm-contract.mjs';
import { hash, canonical, validateApproved } from './validation.mjs';
export function validateBundle(manifest, baseline, binding, bundle) {
  if (!C.uuid(binding.siteId)) C.fail('site_registration_required');
  validateApproved(manifest, baseline, binding);
  C.exact(bundle, [
    'exportVersion',
    'siteId',
    'revisionId',
    'repository',
    'targetBranch',
    'featureBranch',
    'expectedContentHash',
    'expectedBaseContentHash',
    'sourceCommit',
    'files',
    'assets',
    'changes',
    'productionChanged',
  ]);
  if (
    bundle.exportVersion !== 'plm-export/1' ||
    bundle.siteId !== binding.siteId ||
    !C.uuid(bundle.revisionId)
  )
    C.fail('incompatible_export');
  if (
    bundle.repository !== binding.repository ||
    bundle.targetBranch !== 'redesign-2026' ||
    bundle.targetBranch !== binding.targetBranch ||
    bundle.featureBranch !== 'content/plm-' + bundle.revisionId ||
    bundle.productionChanged !== false
  )
    C.fail('publishing_boundary');
  if (
    bundle.expectedContentHash !== hash(baseline) ||
    bundle.expectedBaseContentHash !== baseline.baseContentHash ||
    bundle.sourceCommit !== baseline.sourceCommit
  )
    C.fail('base_content_conflict');
  if (!Array.isArray(bundle.files) || bundle.files.length !== 1)
    C.fail('invalid_export_files');
  const file = bundle.files[0];
  C.exact(file, ['path', 'content']);
  if (
    file.path !== binding.contentPath ||
    file.path !== 'content/plm-content.json'
  )
    C.fail('protected_path');
  const document = file.content;
  C.validateDocument(manifest, document);
  C.validateValues(manifest, document.values, baseline.values);
  if (
    document.sourceCommit !== baseline.sourceCommit ||
    document.baseContentHash !== hash(document.values)
  )
    C.fail('snapshot_hash_mismatch');
  if (
    !Array.isArray(bundle.assets) ||
    bundle.assets.length > Object.keys(manifest.fields).length
  )
    C.fail('invalid_assets');
  const assets = new Map(),
    paths = new Set();
  for (const asset of bundle.assets) {
    C.exact(asset, ['assetId', 'originalHash', 'outputPath', 'delivery']);
    if (
      !C.uuid(asset.assetId) ||
      assets.has(asset.assetId) ||
      !/^[a-f0-9]{64}$/.test(asset.originalHash) ||
      asset.delivery !== 'private_derivative_requires_authorized_copy' ||
      asset.outputPath !==
        binding.assetPath + '/' + asset.originalHash + '.webp' ||
      !C.outputPath(asset.outputPath)
    )
      C.fail('invalid_asset_export');
    assets.set(asset.assetId, asset);
    paths.add(asset.outputPath);
  }
  const referenced = new Set();
  for (const [key, value] of Object.entries(document.values))
    if (manifest.fields[key].type === 'image' && value !== null) {
      const asset = assets.get(value.assetId);
      referenced.add(value.assetId);
      if (
        !asset ||
        document.media?.[value.assetId] !==
          asset.outputPath.replace(/^public/, '')
      )
        C.fail('missing_export_asset', key);
    }
  if (
    assets.size !== referenced.size ||
    Object.keys(document.media ?? {}).length !== referenced.size
  )
    C.fail('unused_export_asset');
  const changes = C.diff(manifest, baseline.values, document.values);
  const ordered = (items) =>
    [...items].sort((a, b) =>
      String(a.fieldId).localeCompare(String(b.fieldId)),
    );
  if (
    !Array.isArray(bundle.changes) ||
    canonical(ordered(changes)) !== canonical(ordered(bundle.changes))
  )
    C.fail('invalid_change_summary');
  const normalized = {
    contractVersion: document.contractVersion,
    siteId: document.siteId,
    manifestVersion: document.manifestVersion,
    rendererVersion: document.rendererVersion,
    baseContentHash: document.baseContentHash,
    sourceCommit: document.sourceCommit,
    values: Object.fromEntries(
      Object.keys(manifest.fields).map((key) => [
        key,
        structuredClone(document.values[key]),
      ]),
    ),
    media: Object.fromEntries(
      Object.entries(document.media ?? {}).sort(([a], [b]) =>
        a.localeCompare(b),
      ),
    ),
  };
  return {
    document: normalized,
    assets: [...assets.values()],
    changes,
    paths: [file.path, ...paths],
  };
}
// This verifies a static WebP container. PLM remains responsible for complete decoding/sanitizing and authorized transfer.
export function webpSize(bytes) {
  if (
    bytes.length < 30 ||
    bytes.length > 8388608 ||
    bytes.toString('ascii', 0, 4) !== 'RIFF' ||
    bytes.toString('ascii', 8, 12) !== 'WEBP' ||
    bytes.readUInt32LE(4) + 8 !== bytes.length
  )
    C.fail('invalid_webp');
  let dimensions;
  let image = false;
  for (let at = 12; at < bytes.length;) {
    if (at + 8 > bytes.length) C.fail('invalid_webp');
    const type = bytes.toString('ascii', at, at + 4),
      length = bytes.readUInt32LE(at + 4),
      start = at + 8;
    if (
      start + length > bytes.length ||
      ['ANIM', 'ANMF', 'EXIF', 'XMP '].includes(type)
    )
      C.fail('invalid_webp');
    if (type === 'VP8X') {
      if (length !== 10 || bytes[start] & 2) C.fail('invalid_webp');
      dimensions = {
        width: bytes.readUIntLE(start + 4, 3) + 1,
        height: bytes.readUIntLE(start + 7, 3) + 1,
      };
    }
    if (type === 'VP8 ') {
      if (
        length < 10 ||
        bytes.toString('hex', start + 3, start + 6) !== '9d012a'
      )
        C.fail('invalid_webp');
      dimensions ??= {
        width: bytes.readUInt16LE(start + 6) & 16383,
        height: bytes.readUInt16LE(start + 8) & 16383,
      };
      image = true;
    }
    if (type === 'VP8L') {
      if (length < 5 || bytes[start] !== 47) C.fail('invalid_webp');
      const bits = bytes.readUInt32LE(start + 1);
      dimensions ??= {
        width: (bits & 16383) + 1,
        height: ((bits >>> 14) & 16383) + 1,
      };
      image = true;
    }
    at = start + length + (length % 2);
    if (at > bytes.length) C.fail('invalid_webp');
  }
  if (
    !image ||
    !dimensions ||
    !dimensions.width ||
    !dimensions.height ||
    dimensions.width > 12000 ||
    dimensions.height > 12000
  )
    C.fail('invalid_webp');
  return dimensions;
}
async function safePath(root, path) {
  const absolute = resolve(root, path),
    rel = relative(root, absolute);
  if (
    !rel ||
    isAbsolute(rel) ||
    rel.startsWith('..' + sep) ||
    rel === '..' ||
    resolve(absolute) === root
  )
    C.fail('unsafe_output_path');
  let current = root;
  for (const part of rel.split(sep)) {
    current = resolve(current, part);
    try {
      if ((await lstat(current)).isSymbolicLink()) C.fail('symlink_output');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  return absolute;
}
export async function importBundle({
  root,
  bundle,
  assetDirectory,
  apply = false,
}) {
  root = await realpath(root);
  const read = async (path) =>
    JSON.parse(await readFile(await safePath(root, path), 'utf8'));
  const [manifest, baseline, binding] = await Promise.all(
    [
      'content/plm-manifest.json',
      'content/plm-content.json',
      'content/editor-binding.json',
    ].map(read),
  );
  const plan = validateBundle(manifest, baseline, binding, bundle),
    staged = [];
  for (const asset of plan.assets) {
    if (!assetDirectory) C.fail('authorized_derivative_copy_required');
    const sourceRoot = await realpath(assetDirectory),
      source = await safePath(sourceRoot, basename(asset.outputPath));
    const bytes = await readFile(source),
      dimensions = webpSize(bytes);
    for (const [key, value] of Object.entries(plan.document.values))
      if (
        manifest.fields[key].type === 'image' &&
        value?.assetId === asset.assetId
      ) {
        const c = manifest.fields[key].constraints;
        if (
          bytes.length > c.maxBytes ||
          dimensions.width > c.maxWidth ||
          dimensions.height > c.maxHeight
        )
          C.fail('image_constraints_failed', key);
      }
    const dest = await safePath(root, asset.outputPath);
    try {
      const existing = await readFile(dest);
      if (!existing.equals(bytes)) C.fail('existing_asset_conflict');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    staged.push({ dest, bytes });
  }
  if (apply) {
    // Recheck immediately before writing; never overwrite a newer content revision.
    if (hash(await read(binding.contentPath)) !== hash(baseline))
      C.fail('base_content_conflict');
    for (const { dest, bytes } of staged) {
      await mkdir(dirname(dest), { recursive: true });
      try {
        await writeFile(dest, bytes, { flag: 'wx' });
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
        const existing = await readFile(dest);
        if (!existing.equals(bytes)) C.fail('existing_asset_conflict');
      }
    }
    const dest = await safePath(root, binding.contentPath),
      temp = await safePath(
        root,
        binding.contentPath.replace('.json', '.import.json'),
      );
    await writeFile(temp, JSON.stringify(plan.document, null, 2) + '\n', {
      flag: 'wx',
    });
    if (hash(await read(binding.contentPath)) !== hash(baseline))
      C.fail('base_content_conflict');
    await rename(temp, dest);
  }
  return {
    applied: apply,
    changedFields: plan.changes.map((c) => c.fieldId),
    writablePaths: plan.paths,
    baseContentHash: plan.document.baseContentHash,
  };
}
