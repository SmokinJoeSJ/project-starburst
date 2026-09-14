/* oxlint-disable no-unused-vars, no-control-regex -- normative PLM validator, ESM packaging only */
// PLM commit 6888039604f718fcf488da3557ac9395fa6563fa. See docs/editor/plm-handoff.md.

  const VERSION = 'plm-content/1';
  const BRIDGE = 'plm-preview/1';
  const TYPES = new Set(['text', 'paragraph', 'image', 'alt', 'button', 'url', 'seo_title', 'seo_description']);
  const id = value => typeof value === 'string' && /^[a-z][a-z0-9_.-]{0,119}$/.test(value) && !['__proto__', 'constructor', 'prototype'].includes(value);
  const uuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  function fail(code, fieldId) { throw Object.assign(new Error(code), { code, status: 400, fieldId }); }
  function exact(value, keys) { if (!object(value) || Object.keys(value).some(key => !keys.includes(key))) fail('unknown_property'); }
  function path(value) { return typeof value === 'string' && /^\/(?!\/)[A-Za-z0-9/_-]*$/.test(value); }
  function outputPath(value) {
    return typeof value === 'string' && /^(content|public\/media)\/[A-Za-z0-9/_-]+\.(json|png|jpg|jpeg|webp)$/.test(value)
      && !value.split('/').some(part => !part || part === '.' || part === '..');
  }
  function safeLink(value, constraints = {}) {
    if (typeof value !== 'string' || /[\s\u0000-\u001f\u007f\\<>]/.test(value) || /%(?:00|0a|0d|5c)/i.test(value)) return false;
    if (value.startsWith('#')) return constraints.allowAnchors === true && /^#[A-Za-z][\w-]*$/.test(value);
    if (value.startsWith('/')) return !value.startsWith('//') && (constraints.paths || []).includes(value);
    try {
      const url = new URL(value);
      if (url.username || url.password) return false;
      if (url.protocol === 'https:') return (constraints.origins || []).includes(url.origin);
      if (url.protocol === 'mailto:') return constraints.allowMailto === true && /^mailto:[^?@]+@[^?@]+$/.test(value);
      if (url.protocol === 'tel:') return constraints.allowTel === true && /^tel:\+?[0-9()-]+$/.test(value);
    } catch (_) { return false; }
    return false;
  }
  function validateManifest(m) {
    exact(m, ['contractVersion', 'siteId', 'manifestVersion', 'rendererVersion', 'pages', 'fields', 'capabilities']);
    if (m.contractVersion !== VERSION || !uuid(m.siteId) || !id(m.manifestVersion) || !id(m.rendererVersion)) fail('incompatible_schema');
    if (!Array.isArray(m.pages) || !m.pages.length || m.pages.length > 80 || !object(m.fields) || Object.keys(m.fields).length > 1500) fail('invalid_manifest');
    const pages = new Set(), paths = new Set(), used = new Set();
    for (const page of m.pages) {
      exact(page, ['id', 'path', 'label', 'sections']);
      if (!id(page.id) || pages.has(page.id) || !path(page.path) || paths.has(page.path) || typeof page.label !== 'string' || !page.label.trim() || page.label.length > 100 || !Array.isArray(page.sections) || !page.sections.length || page.sections.length > 100) fail('invalid_page');
      pages.add(page.id); paths.add(page.path);
      const sections = new Set();
      for (const section of page.sections) {
        exact(section, ['id', 'label', 'fields']);
        if (!id(section.id) || sections.has(section.id) || typeof section.label !== 'string' || !section.label.trim() || section.label.length > 100 || !Array.isArray(section.fields) || !section.fields.length || new Set(section.fields).size !== section.fields.length) fail('invalid_section');
        sections.add(section.id);
        for (const key of section.fields) { if (!Object.hasOwn(m.fields, key)) fail('unknown_field', key); used.add(key); }
      }
    }
    for (const [key, field] of Object.entries(m.fields)) {
      exact(field, ['label', 'type', 'editable', 'shared', 'constraints', 'help']);
      if (!id(key) || !used.has(key) || !TYPES.has(field.type) || typeof field.editable !== 'boolean' || typeof field.label !== 'string' || field.label.length > 120) fail('invalid_field', key);
      const c = field.constraints;
      exact(c, ['required', 'maxLength', 'paths', 'origins', 'allowMailto', 'allowTel', 'allowAnchors', 'formats', 'maxBytes', 'maxWidth', 'maxHeight']);
      if ((field.shared !== undefined && typeof field.shared !== 'boolean') || (field.help !== undefined && (typeof field.help !== 'string' || field.help.length > 1500)) || ['required','allowMailto','allowTel','allowAnchors'].some(key => c[key] !== undefined && typeof c[key] !== 'boolean')) fail('invalid_constraints', key);
      if (field.type !== 'image' && (!Number.isInteger(c.maxLength) || c.maxLength < 1 || c.maxLength > 12000)) fail('invalid_constraints', key);
      if (c.origins && (!Array.isArray(c.origins) || c.origins.length > 50 || c.origins.some(origin => { try { const u = new URL(origin); return u.protocol !== 'https:' || u.origin !== origin; } catch (_) { return true; } }))) fail('invalid_origins', key);
      if (c.paths && (!Array.isArray(c.paths) || c.paths.some(p => !path(p)))) fail('invalid_paths', key);
      if (field.type === 'image' && (!Array.isArray(c.formats) || !c.formats.length || c.formats.some(f => !['jpeg', 'png', 'webp'].includes(f)) || !Number.isInteger(c.maxBytes) || c.maxBytes < 1 || c.maxBytes > 8388608 || !Number.isInteger(c.maxWidth) || !Number.isInteger(c.maxHeight) || c.maxWidth < 1 || c.maxHeight < 1 || c.maxWidth > 12000 || c.maxHeight > 12000)) fail('invalid_image_constraints', key);
    }
    exact(m.capabilities, ['selection', 'draftOverlay', 'readOnlyPreview', 'viewports']);
    if (m.capabilities.selection !== true || m.capabilities.draftOverlay !== true || m.capabilities.readOnlyPreview !== true || !Array.isArray(m.capabilities.viewports) || ['desktop','tablet','mobile'].some(v => !m.capabilities.viewports.includes(v)) || m.capabilities.viewports.length !== 3) fail('incompatible_capabilities');
    return m;
  }
  function validateValue(key, field, value) {
    const c = field.constraints;
    if (field.type === 'image') {
      if (value === null && c.required !== true) return;
      exact(value, ['assetId']);
      if (!uuid(value.assetId)) fail('invalid_asset', key);
      return;
    }
    if (typeof value !== 'string' || value.length > c.maxLength || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f<>]/.test(value)) fail('invalid_text', key);
    if (c.required === true && !value.trim()) fail('required', key);
    if (field.type === 'url' && value && !safeLink(value, c)) fail('unsafe_link', key);
  }
  function validateValues(m, values, baseline, { allowLocked = false } = {}) {
    if (!object(values) || Object.keys(values).length !== Object.keys(m.fields).length) fail('invalid_document');
    for (const [key, value] of Object.entries(values)) {
      const field = Object.hasOwn(m.fields, key) && m.fields[key];
      if (!field) fail('unknown_field', key);
      validateValue(key, field, value);
      if (!allowLocked && !field.editable && !same(value, baseline[key])) fail('locked_field', key);
    }
    return values;
  }
  function validateDocument(m, d) {
    exact(d, ['contractVersion', 'siteId', 'manifestVersion', 'rendererVersion', 'baseContentHash', 'sourceCommit', 'values', 'media']);
    if (d.media !== undefined && (!object(d.media) || Object.entries(d.media).some(([key,value]) => !uuid(key) || typeof value !== 'string' || !/^\/media\/[a-zA-Z0-9/_-]+\.webp$/.test(value)))) fail('invalid_public_media');
    if (d.contractVersion !== VERSION || d.siteId !== m.siteId || d.manifestVersion !== m.manifestVersion || d.rendererVersion !== m.rendererVersion || !/^[a-f0-9]{64}$/.test(d.baseContentHash) || !(d.sourceCommit === null || /^[a-f0-9]{40}$/.test(d.sourceCommit))) fail('incompatible_document');
    validateValues(m, d.values, d.values, { allowLocked: true });
    return d;
  }
  function diff(m, before, after) {
    return Object.keys(m.fields).filter(key => !same(before[key], after[key])).map(key => ({ fieldId: key, label: m.fields[key].label, type: m.fields[key].type, before: before[key], after: after[key] }));
  }

export { VERSION, BRIDGE, TYPES, uuid, id, object, exact, same, path, outputPath, safeLink, fail, validateManifest, validateDocument, validateValue, validateValues, diff };
