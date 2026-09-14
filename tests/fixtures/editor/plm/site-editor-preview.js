(function (root, factory) {
  const api = factory(typeof module === 'object' && module.exports ? require('./site-editor-contract') : root.PlmContentContract);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PlmEditorPreview = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (C) {
  'use strict';
  class PreviewConnection {
    constructor({ frame, origin, manifest, onSelect, onStatus, host = window, nonce = () => crypto.randomUUID(), timeout = 10000 }) {
      Object.assign(this, { frame, origin, manifest, onSelect, onStatus, host, nonce, timeout });
      this.listener = event => this.receive(event); this.reload = () => this.start();
      this.pageId = manifest.pages[0].id; this.pageEpoch = 0; this.seq = 0; this.ready = false;
      host.addEventListener('message', this.listener); frame.addEventListener('load', this.reload);
    }
    start() {
      clearTimeout(this.timer); this.channel = this.nonce(); this.ready = false; this.seq = 0; this.pageEpoch++;
      this.onStatus('connecting'); this.send('plm:hello', { manifestVersion: this.manifest.manifestVersion, rendererVersion: this.manifest.rendererVersion });
      this.timer = setTimeout(() => { this.ready = false; this.onStatus('timeout'); }, this.timeout);
    }
    send(type, payload) {
      this.frame.contentWindow?.postMessage({ protocol: C.BRIDGE, type, nonce: this.channel, siteId: this.manifest.siteId, pageId: this.pageId, pageEpoch: this.pageEpoch, seq: ++this.seq, payload }, this.origin);
    }
    receive(event) {
      const m = event.data;
      if (event.origin !== this.origin || event.source !== this.frame.contentWindow || !C.object(m)) return false;
      try { C.exact(m, ['protocol', 'type', 'nonce', 'siteId', 'pageId', 'pageEpoch', 'seq', 'payload']); } catch (_) { return false; }
      if (m.protocol !== C.BRIDGE || m.nonce !== this.channel || m.siteId !== this.manifest.siteId || m.pageId !== this.pageId || m.pageEpoch !== this.pageEpoch || !Number.isSafeInteger(m.seq) || m.seq !== this.seq || !C.object(m.payload)) return false;
      if (m.type === 'site:ready') {
        try { C.exact(m.payload, ['manifestVersion','rendererVersion','contractVersion']); } catch (_) { return false; }
        if (m.payload.manifestVersion !== this.manifest.manifestVersion || m.payload.rendererVersion !== this.manifest.rendererVersion || m.payload.contractVersion !== C.VERSION) { clearTimeout(this.timer); this.ready = false; this.onStatus('incompatible'); return false; }
        if (this.ready) return false;
        clearTimeout(this.timer); this.ready = true; this.onStatus('ready'); if (this.latest) this.update(...this.latest); return true;
      }
      if (!this.ready) return false;
      if (m.type === 'site:selected') {
        if (Object.keys(m.payload).length !== 1) return false;
        const key = m.payload.fieldId;
        const page = this.manifest.pages.find(p => p.id === this.pageId);
        if (!Object.hasOwn(this.manifest.fields, key) || !page.sections.some(s => s.fields.includes(key)) || this.mode === 'read-only') return false;
        this.onSelect(key); return true;
      }
      if (m.type === 'site:ack') { if (Object.keys(m.payload).length) return false; clearTimeout(this.timer); this.onStatus('ready'); return true; }
      if (m.type === 'site:error') { if (Object.keys(m.payload).length !== 1 || typeof m.payload.code !== 'string' || !/^[a-z_]{1,80}$/.test(m.payload.code)) return false; clearTimeout(this.timer); this.onStatus('error'); return true; }
      return false;
    }
    page(pageId) {
      if (!this.manifest.pages.some(page => page.id === pageId)) throw Error('unknown_page');
      this.pageId = pageId; this.pageEpoch++;
    }
    update(document, media, viewport, mode = 'edit', selected = null) {
      C.validateDocument(this.manifest, document);
      this.mode = mode; this.latest = [document, media, viewport, mode, selected];
      if (!this.ready) return;
      this.send('plm:apply', { document, media, viewport, mode, selected });
      clearTimeout(this.timer); this.timer = setTimeout(() => { this.onStatus('timeout'); }, this.timeout);
    }
    destroy() { clearTimeout(this.timer); this.ready = false; this.host.removeEventListener('message', this.listener); this.frame.removeEventListener('load', this.reload); this.channel = null; this.latest = null; }
  }
  return { PreviewConnection };
});
