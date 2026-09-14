import { createHash } from 'node:crypto';
import * as C from './plm-contract.mjs';
// Unbound templates are local source only. No unbound document is accepted over the bridge or importer.
const TEMPLATE_SCHEMA_ID = '00000000-0000-4000-8000-000000000000';
export function canonical(value) {
  return JSON.stringify(value, (_key, item) =>
    item && typeof item === 'object' && !Array.isArray(item)
      ? Object.fromEntries(
          Object.keys(item)
            .sort()
            .map((key) => [key, item[key]]),
        )
      : item,
  );
}
export function hash(value) {
  return createHash('sha256').update(canonical(value)).digest('hex');
}
export function validateApproved(manifest, document, binding) {
  C.exact(binding, [
    'siteId',
    'parentOrigins',
    'mediaOrigins',
    'mediaPathPrefixes',
    'repository',
    'targetBranch',
    'contentPath',
    'assetPath',
    'previewPath',
  ]);
  if (
    binding.repository !== 'SmokinJoeSJ/project-starburst' ||
    binding.targetBranch !== 'redesign-2026' ||
    binding.contentPath !== 'content/plm-content.json' ||
    binding.assetPath !== 'public/media/starburst' ||
    binding.previewPath !== '/plm-preview' ||
    !C.same(binding.mediaPathPrefixes, ['/storage/v1/object/sign/plm-files/'])
  )
    C.fail('invalid_site_binding');
  const unbound = binding.siteId === null;
  if (manifest.siteId !== binding.siteId || document.siteId !== binding.siteId)
    C.fail('site_binding_mismatch');
  const schema = unbound
    ? { ...manifest, siteId: TEMPLATE_SCHEMA_ID }
    : manifest;
  const source = unbound
    ? { ...document, siteId: TEMPLATE_SCHEMA_ID }
    : document;
  C.validateManifest(schema);
  C.validateDocument(schema, source);
  if (hash(document.values) !== document.baseContentHash)
    C.fail('base_content_hash_mismatch');
  for (const [key, value] of Object.entries(document.values))
    if (manifest.fields[key].type === 'image' && value !== null) {
      const asset = document.media?.[value.assetId];
      if (
        !asset ||
        !asset.startsWith('/media/starburst/') ||
        !/^\/media\/starburst\/[a-zA-Z0-9_-]+\.webp$/.test(asset)
      )
        C.fail('missing_durable_media', key);
    }
  for (const origins of [binding.parentOrigins, binding.mediaOrigins])
    if (
      !Array.isArray(origins) ||
      origins.some((origin) => {
        try {
          const u = new URL(origin);
          return (
            u.protocol !== 'https:' ||
            u.origin !== origin ||
            origin.includes('*')
          );
        } catch {
          return true;
        }
      })
    )
      C.fail('invalid_origin_configuration');
  if (unbound && binding.parentOrigins.length)
    C.fail('unbound_connection_must_stay_disabled');
  return {
    bound: !unbound,
    fields: Object.keys(manifest.fields).length,
    baseContentHash: document.baseContentHash,
  };
}
