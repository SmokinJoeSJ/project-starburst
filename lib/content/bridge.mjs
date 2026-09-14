import * as C from './plm-contract.mjs';
const mailboxes = new WeakMap();
// The parent's load event can precede React hydration. Buffer only one public hello,
// never a draft, with the same exact-origin/source gates as the live connection.
export function installHelloMailbox(host, parent, origins) {
  if (host === parent || mailboxes.has(host)) return;
  const box = {
    event: null,
    listener: (event) => {
      if (event.source !== parent || !origins.includes(event.origin)) return;
      try {
        const m = event.data;
        C.exact(m, [
          'protocol',
          'type',
          'nonce',
          'siteId',
          'pageId',
          'pageEpoch',
          'seq',
          'payload',
        ]);
        C.exact(m.payload, ['manifestVersion', 'rendererVersion']);
        if (
          m.protocol === C.BRIDGE &&
          m.type === 'plm:hello' &&
          C.uuid(m.nonce) &&
          C.uuid(m.siteId) &&
          C.id(m.pageId) &&
          C.id(m.payload.manifestVersion) &&
          C.id(m.payload.rendererVersion) &&
          m.seq === 1 &&
          Number.isSafeInteger(m.pageEpoch) &&
          m.pageEpoch > 0
        )
          box.event = event;
      } catch {
        /* Ignore unrelated messages without logging their contents. */
      }
    },
  };
  mailboxes.set(host, box);
  host.addEventListener('message', box.listener);
}
function takeHello(host) {
  const box = mailboxes.get(host);
  if (!box) return null;
  host.removeEventListener('message', box.listener);
  mailboxes.delete(host);
  return box.event;
}
export function validateDraft(manifest, baseline, payload, policy) {
  C.exact(payload, ['document', 'media', 'viewport', 'mode', 'selected']);
  C.validateDocument(manifest, payload.document);
  const d = payload.document;
  if (
    d.baseContentHash !== baseline.baseContentHash ||
    d.sourceCommit !== baseline.sourceCommit
  )
    C.fail('base_content_conflict');
  C.validateValues(manifest, d.values, baseline.values);
  const incomingMedia = d.media ?? {},
    approvedMedia = baseline.media ?? {};
  if (
    Object.keys(incomingMedia).length !== Object.keys(approvedMedia).length ||
    Object.entries(incomingMedia).some(
      ([key, value]) => approvedMedia[key] !== value,
    )
  )
    C.fail('untrusted_public_media');
  if (
    !manifest.capabilities.viewports.includes(payload.viewport) ||
    !['edit', 'read-only'].includes(payload.mode)
  )
    C.fail('invalid_preview_mode');
  if (
    payload.selected !== null &&
    !Object.hasOwn(manifest.fields, payload.selected)
  )
    C.fail('unknown_field', payload.selected);
  if (!C.object(payload.media)) C.fail('invalid_media');
  const used = new Set(
    Object.entries(d.values)
      .filter(
        ([key, value]) =>
          manifest.fields[key].type === 'image' && value !== null,
      )
      .map(([, value]) => value.assetId),
  );
  for (const [assetId, value] of Object.entries(payload.media)) {
    if (
      !C.uuid(assetId) ||
      !used.has(assetId) ||
      typeof value !== 'string' ||
      value.length > 8192
    )
      C.fail('invalid_media');
    let url;
    try {
      url = new URL(value);
    } catch {
      C.fail('unsafe_media');
    }
    if (
      !url.pathname.endsWith('.webp') ||
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.hash ||
      !policy.mediaOrigins.includes(url.origin) ||
      !policy.mediaPathPrefixes.some((prefix) =>
        url.pathname.startsWith(prefix),
      ) ||
      /%2e|%2f|%5c/i.test(url.pathname)
    )
      C.fail('unsafe_media');
  }
  for (const assetId of used)
    if (
      !Object.hasOwn(payload.media, assetId) &&
      !Object.hasOwn(baseline.media ?? {}, assetId)
    )
      C.fail('missing_media');
  return structuredClone(payload);
}
// No fetching, authentication, persistence, navigation or provider calls belong here.
export class ChildConnection {
  constructor({
    host,
    parent,
    manifest,
    baseline,
    policy,
    onReset,
    onApply,
    onError,
  }) {
    C.validateManifest(manifest);
    C.validateDocument(manifest, baseline);
    Object.assign(this, {
      host,
      parent,
      manifest,
      baseline,
      policy,
      onReset,
      onApply,
      onError,
    });
    this.channel = null;
    this.usedNonces = new Set();
    this.listener = (event) => this.receive(event);
    host.addEventListener('message', this.listener);
    const earlyHello = takeHello(host);
    if (earlyHello) this.receive(earlyHello);
  }
  reply(type, payload, message = this.channel) {
    if (!message || this.destroyed) return;
    this.parent.postMessage(
      {
        protocol: C.BRIDGE,
        type,
        nonce: message.nonce,
        siteId: this.manifest.siteId,
        pageId: message.pageId,
        pageEpoch: message.pageEpoch,
        seq: message.seq,
        payload,
      },
      this.origin,
    );
  }
  receive(event) {
    if (
      this.destroyed ||
      event.source !== this.parent ||
      this.parent === this.host ||
      !this.policy.parentOrigins.includes(event.origin)
    )
      return false;
    const m = event.data;
    try {
      C.exact(m, [
        'protocol',
        'type',
        'nonce',
        'siteId',
        'pageId',
        'pageEpoch',
        'seq',
        'payload',
      ]);
      if (
        m.protocol !== C.BRIDGE ||
        !C.uuid(m.nonce) ||
        m.siteId !== this.manifest.siteId ||
        !this.manifest.pages.some((p) => p.id === m.pageId) ||
        !Number.isSafeInteger(m.pageEpoch) ||
        m.pageEpoch < 1 ||
        !Number.isSafeInteger(m.seq) ||
        m.seq < 1 ||
        !C.object(m.payload)
      )
        return false;
      if (m.type === 'plm:hello') {
        C.exact(m.payload, ['manifestVersion', 'rendererVersion']);
        if (m.seq !== 1 || this.usedNonces.has(m.nonce)) return false;
        if (this.usedNonces.size >= 100) return false; // Reload required after excessive session resets.
        this.origin = event.origin;
        this.channel = structuredClone(m);
        this.usedNonces.add(m.nonce);
        this.mode = null;
        this.appliedSeq = null;
        this.onReset();
        if (
          m.payload.manifestVersion !== this.manifest.manifestVersion ||
          m.payload.rendererVersion !== this.manifest.rendererVersion
        ) {
          this.onError('incompatible_schema');
          this.reply('site:error', { code: 'incompatible_schema' });
          this.channel = null;
          return false;
        }
        this.reply('site:ready', {
          contractVersion: C.VERSION,
          manifestVersion: this.manifest.manifestVersion,
          rendererVersion: this.manifest.rendererVersion,
        });
        return true;
      }
      if (
        m.type !== 'plm:apply' ||
        !this.channel ||
        event.origin !== this.origin ||
        m.nonce !== this.channel.nonce ||
        m.seq !== this.channel.seq + 1 ||
        m.pageEpoch < this.channel.pageEpoch ||
        m.pageEpoch > this.channel.pageEpoch + 1 ||
        (m.pageId !== this.channel.pageId &&
          m.pageEpoch !== this.channel.pageEpoch + 1)
      )
        return false;
      // Consume the sequence even when payload validation fails; later valid revisions can recover.
      this.channel = structuredClone(m);
      const payload = validateDraft(
        this.manifest,
        this.baseline,
        m.payload,
        this.policy,
      );
      const page = this.manifest.pages.find((p) => p.id === m.pageId);
      if (
        payload.selected !== null &&
        !page.sections.some((s) => s.fields.includes(payload.selected))
      )
        C.fail('field_not_on_page');
      this.mode = payload.mode;
      this.onApply({
        ...payload,
        pageId: m.pageId,
        pageEpoch: m.pageEpoch,
        seq: m.seq,
      });
      return true;
    } catch (error) {
      if (this.channel && m?.nonce === this.channel.nonce) {
        this.mode = null;
        this.onError(error.code ?? 'invalid_message');
        this.reply('site:error', { code: error.code ?? 'invalid_message' });
      }
      return false;
    }
  }
  acknowledge(seq) {
    if (this.channel?.seq === seq) { this.appliedSeq = seq; this.reply('site:ack', {}); }
  }
  select(fieldId) {
    const page = this.manifest.pages.find((p) => p.id === this.channel?.pageId);
    if (
      this.mode !== 'edit' ||
      this.appliedSeq !== this.channel?.seq ||
      !Object.hasOwn(this.manifest.fields, fieldId) ||
      !page?.sections.some((s) => s.fields.includes(fieldId))
    )
      return false;
    this.reply('site:selected', { fieldId });
    return true;
  }
  destroy() {
    this.host.removeEventListener('message', this.listener);
    this.destroyed = true;
    this.channel = null;
    this.mode = null;
    this.usedNonces.clear();
    this.onReset();
  }
}
