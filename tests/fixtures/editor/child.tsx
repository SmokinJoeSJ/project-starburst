import { installHelloMailbox } from '@/lib/content/bridge.mjs';
import { createRoot } from 'react-dom/client';
import { PreviewCanvas } from '@/components/content/preview-canvas';
import manifest from '@/content/plm-manifest.json';
import approved from '@/content/plm-content.json';
import fixtureBinding from './binding.json';
import '@/app/globals.css';
import '@/app/actions.css';
import '@/app/editor-preview.css';
// Synthetic ID and loopback allowlist exist only in this separately served test harness.
const siteId = fixtureBinding.siteId;
const registered = { ...manifest, siteId };
const baseline = { ...approved, siteId };
const policy = fixtureBinding;
Object.assign(window, { fixtureBaseline: baseline });
installHelloMailbox(window, window.parent, policy.parentOrigins);
createRoot(document.getElementById('root')!).render(
  <PreviewCanvas manifest={registered} approved={baseline} policy={policy} />,
);
