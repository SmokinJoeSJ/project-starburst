import { createRequire } from 'node:module';
import { createServer as httpServer } from 'node:http';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createServer } from 'vite';
import tailwindcss from '@tailwindcss/postcss';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLM_PLAYWRIGHT_MODULE || 'playwright');
const root = resolve('.');
const read = (path) => readFileSync(join(root, path));
const manifest = JSON.parse(read('content/plm-manifest.json'));
manifest.siteId = '11111111-1111-4111-8111-111111111111';
const approved = JSON.parse(read('content/plm-content.json'));
approved.siteId = manifest.siteId;
const out = 'outputs/editor-review';
mkdirSync(out, { recursive: true });
const parentHtml =
  '<!doctype html><html><head><meta charset="utf-8"></head><body><h1>PLM actual parent bridge — fixture only</h1><iframe title="Starburst renderer" id="preview" sandbox="allow-scripts allow-same-origin" src="http://127.0.0.1:43982/plm-preview" style="width:100%;height:850px;border:0"></iframe><script src="/contract.js"></script><script src="/parent.js"></script><script>window.events=[];window.addEventListener("message",e=>{if(e.data?.type==="site:error")events.push(e.data.payload.code)});window.selections=[];window.manifest=' +
  JSON.stringify(manifest) +
  ';window.draft=' +
  JSON.stringify(approved) +
  ';window.connection=new PlmEditorPreview.PreviewConnection({frame:document.querySelector("iframe"),origin:"http://127.0.0.1:43982",manifest,onSelect:field=>selections.push(field),onStatus:status=>events.push(status)});connection.update(draft,{},"desktop");connection.start();</script></body></html>';
const parent = httpServer((req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.url === '/contract.js' || req.url === '/parent.js') {
    res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    res.end(
      read(
        'tests/fixtures/editor/plm/' +
          (req.url === '/contract.js'
            ? 'site-editor-contract.js'
            : 'site-editor-preview.js'),
      ),
    );
  } else {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(parentHtml);
  }
});
await new Promise((r) => parent.listen(43981, '127.0.0.1', r));
const child = await createServer({
  configFile: false,
  root: join(root, 'tests/fixtures/editor'),
  publicDir: join(root, 'public'),
  resolve: {
    alias: [
      { find: '@', replacement: root },
      {
        find: 'next/link',
        replacement: join(root, 'tests/fixtures/editor/router.tsx'),
      },
      {
        find: 'next/navigation',
        replacement: join(root, 'tests/fixtures/editor/router.tsx'),
      },
    ],
  },
  css: { postcss: { plugins: [tailwindcss()] } },
  server: {
    port: 43982,
    host: '127.0.0.1',
    strictPort: true,
    fs: { allow: [root] },
  },
});
await child.listen();
const browser = await chromium.launch({
  channel: process.env.PLM_BROWSER_CHANNEL || 'msedge',
  headless: true,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1100 },
  reducedMotion: 'reduce',
});
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.setDefaultTimeout(10000);
const checks = [];
function check(value, name) {
  if (!value) throw Error(name);
  checks.push(name);
}
try {
  await page.route('https://maps.google.com/**', (r) => r.abort());
  await page.route('https://fixture.supabase.co/**', (r) =>
    r.fulfill({
      contentType: 'image/webp',
      body: read('tests/fixtures/editor/image.webp'),
    }),
  );
  await page.goto('http://127.0.0.1:43981', { waitUntil: 'networkidle' });
  const frame = page.frames().find((f) => f.url().includes('43982'));
  if (!frame) throw Error('Missing fixture frame');
  await frame.locator('h1 [data-plm-field="home.heading"]').waitFor();
  const heading = frame.locator('[data-plm-field="home.heading"]');
  await heading.click();
  await page.waitForFunction(() => window.selections.includes('home.heading'));
  check(true, 'Actual PLM parent receives homepage heading selection');
  await page.evaluate(() => {
    window.draft.values['home.heading'] =
      'A fixture heading, in the real Starburst design';
    window.connection.update(
      window.draft,
      {},
      'desktop',
      'edit',
      'home.heading',
    );
  });
  await heading.filter({ hasText: 'A fixture heading' }).waitFor();
  check(true, 'Parent-to-child text update');
  await frame.evaluate(() => scrollTo(0, 600));
  const scroll = await frame.evaluate(() => scrollY);
  await page.evaluate(() => {
    window.draft.values['home.heading'] = 'A second fixture heading';
    window.connection.update(
      window.draft,
      {},
      'desktop',
      'edit',
      'home.heading',
    );
  });
  await heading.filter({ hasText: 'A second fixture' }).waitFor();
  check(
    (await frame.evaluate(() => scrollY)) === scroll,
    'Editing preserves scroll position',
  );
  await page.evaluate(() => {
    window.draft.values['home.hero-home-hero.get-help'] = 'Find assistance';
    window.draft.values['home.seo.title'] = 'Fixture page title';
    window.draft.values['shared.hours.time'] = 'Fixture hours';
    window.draft.values['home.hero-home-hero.image'] = {
      assetId: '22222222-2222-4222-8222-222222222222',
    };
    window.draft.values['home.hero-home-hero.image.alt'] =
      'Fixture replacement image';
    window.media = {
      '22222222-2222-4222-8222-222222222222':
        'https://fixture.supabase.co/storage/v1/object/sign/plm-files/fixture.webp?token=fixture-only',
    };
    window.connection.update(
      window.draft,
      window.media,
      'desktop',
      'edit',
      'home.hero-home-hero.image.alt',
    );
  });
  await frame.locator('img[alt="Fixture replacement image"]').waitFor();
  check(
    await frame
      .locator('img[alt="Fixture replacement image"]')
      .evaluate((e) => e.complete && e.naturalWidth > 0),
    'Authorized media replacement with alt text',
  );
  check(
    (await frame.getByText('Find assistance', { exact: true }).count()) === 1,
    'Permitted button label',
  );
  await page.evaluate(() => {
    window.connection.page('help');
    window.connection.update(
      window.draft,
      window.media,
      'desktop',
      'edit',
      'shared.hours.time',
    );
  });
  await frame.locator('[data-preview-page="help"]').waitFor();
  check(
    (await frame.getByText('Fixture hours', { exact: true }).count()) >= 2,
    'Shared field updates all displayed instances',
  );
  await page.evaluate(() => {
    window.connection.page('home');
    window.connection.update(
      window.draft,
      window.media,
      'desktop',
      'edit',
      'home.heading',
    );
  });
  await frame.locator('[data-preview-page="home"]').waitFor();
  check(
    (await heading.textContent()) === 'A second fixture heading',
    'Second page and navigation back preserve draft',
  );
  await frame.evaluate(() => scrollTo(0, 0));
  await heading.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(
    () => window.selections.filter((x) => x === 'home.heading').length >= 2,
  );
  check(
    (await page.evaluate(() => window.selections)).filter(
      (x) => x === 'home.heading',
    ).length >= 2,
    'Keyboard field selection',
  );
  await frame.locator('.plm-field-outline.is-selected').first().waitFor();
  check(
    (await frame.locator('.plm-field-outline.is-selected').count()) > 0,
    'Inspector selection highlights actual field',
  );
  await page.screenshot({
    path: out + '/connected-desktop.jpg',
    fullPage: true,
    quality: 80,
  });
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate((width) => {
      document.querySelector('iframe').style.width = width - 16 + 'px';
      window.connection.update(
        window.draft,
        window.media,
        width < 600 ? 'mobile' : width < 1000 ? 'tablet' : 'desktop',
        'read-only',
        null,
      );
    }, width);
    await frame.locator('[data-preview-mode="read-only"]').waitFor();
    check(
      await frame.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      'No horizontal overflow at ' + width,
    );
    const before = frame.url();
    await frame.getByText('Find assistance', { exact: true }).click();
    check(frame.url() === before, 'Read-only CTA cannot navigate at ' + width);
    await page.screenshot({
      path: out + '/connected-' + width + '.jpg',
      fullPage: true,
      quality: 80,
    });
  }
  await page.evaluate(() => {
    window.connection.page('contact');
    window.connection.update(
      window.draft,
      window.media,
      'desktop',
      'read-only',
      null,
    );
  });
  await frame.locator('[data-preview-page="contact"]').waitFor();
  const results = await frame
    .locator('form')
    .evaluateAll((forms) =>
      forms.map(
        (form) =>
          !form.dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true }),
          ),
      ),
    );
  check(
    results.length > 0 && results.every(Boolean),
    'Contact submission blocked',
  );
  await page.evaluate(() => {
    window.connection.page('donate');
    window.connection.update(
      window.draft,
      window.media,
      'desktop',
      'read-only',
      null,
    );
  });
  await frame.locator('[data-preview-page="donate"]').waitFor();
  check(
    (await frame.locator('a[href*="stripe.com"]').count()) === 0,
    'No payment destination in draft renderer',
  );
  check(
    await frame.evaluate(
      () => localStorage.length === 0 && sessionStorage.length === 0,
    ),
    'Draft never stored in browser storage',
  );
  await page.evaluate(() => {
    document.querySelector('iframe').src = 'http://127.0.0.1:43982/plm-preview';
  });
  await page.waitForTimeout(700);
  await frame.locator('[data-preview-page="donate"]').waitFor();
  check(true, 'Frame reload negotiates a new nonce and restores parent memory');
  await page.evaluate(() => {
    window.connection.page('home');
    window.connection.update(
      window.draft,
      window.media,
      'desktop',
      'edit',
      'home.heading',
    );
  });
  await frame.locator('[data-preview-page="home"]').waitFor();
  const stableHeading = await heading.textContent();
  await page.evaluate(() => {
    const bad = structuredClone(window.draft);
    bad.values['home.heading'] = 'ATTACK';
    window.connection.frame.contentWindow.postMessage(
      {
        protocol: 'plm-preview/1',
        type: 'plm:apply',
        siteId: manifest.siteId,
        nonce: '99999999-9999-4999-8999-999999999999',
        pageId: connection.pageId,
        pageEpoch: connection.pageEpoch,
        seq: connection.seq + 1,
        payload: {
          document: bad,
          media: window.media,
          viewport: 'desktop',
          mode: 'edit',
          selected: null,
        },
      },
      'http://127.0.0.1:43982',
    );
  });
  await page.waitForTimeout(50);
  check(
    (await heading.textContent()) === stableHeading,
    'Browser rejects an incorrect session nonce',
  );
  await frame.evaluate(() =>
    window.postMessage(
      { protocol: 'plm-preview/1', type: 'plm:apply' },
      location.origin,
    ),
  );
  await page.waitForTimeout(50);
  check(
    (await heading.textContent()) === stableHeading,
    'Browser rejects self-origin/self-source messages',
  );
  await page.route('https://fixture.supabase.co/**/expired.webp*', (r) =>
    r.fulfill({ status: 403, body: '' }),
  );
  await page.evaluate(() => {
    window.media['22222222-2222-4222-8222-222222222222'] =
      'https://fixture.supabase.co/storage/v1/object/sign/plm-files/expired.webp';
    window.connection.update(
      window.draft,
      window.media,
      'desktop',
      'edit',
      null,
    );
  });
  await frame
    .getByText('This draft image could not load.', { exact: false })
    .waitFor();
  check(true, 'Expired media has an honest error state');
  await page.screenshot({ path: out + '/image-error.jpg', quality: 80 });
  const touchContext = await browser.newContext({
    viewport: { width: 390, height: 900 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  });
  const touchPage = await touchContext.newPage();
  await touchPage.goto('http://127.0.0.1:43981', { waitUntil: 'networkidle' });
  const touchFrame = touchPage.frames().find((f) => f.url().includes('43982'));
  await touchFrame.locator('[data-plm-field="home.heading"]').tap();
  await touchPage.waitForFunction(() =>
    window.selections.includes('home.heading'),
  );
  check(true, 'Touch selection works without hover');
  await touchContext.close();
  // Exercise every editable visual field through the real parent and React renderer.
  // SEO fields intentionally do not change the frame document head; approved-build tests cover them.
  const coverageDraft = structuredClone(approved);
  const coverageAsset = '33333333-3333-4333-8333-333333333333';
  const expectedValues = {};
  let fieldIndex = 0;
  for (const [id, field] of Object.entries(manifest.fields)) {
    if (!field.editable || field.type.startsWith('seo_')) continue;
    const value =
      field.type === 'image'
        ? { assetId: coverageAsset }
        : 'Field ' + ++fieldIndex;
    coverageDraft.values[id] = value;
    expectedValues[id] = value;
  }
  const coverageMedia = {
    [coverageAsset]:
      'https://fixture.supabase.co/storage/v1/object/sign/plm-files/coverage.webp',
  };
  const observed = new Set();
  const pageCoverage = [];
  for (const target of manifest.pages) {
    await page.evaluate(
      ({ document, media, pageId }) => {
        window.connection.page(pageId);
        window.connection.update(document, media, 'desktop', 'edit', null);
      },
      { document: coverageDraft, media: coverageMedia, pageId: target.id },
    );
    await frame.locator('[data-preview-page="' + target.id + '"]').waitFor();
    const fields = await frame
      .locator('[data-plm-field]')
      .evaluateAll((nodes) =>
        nodes.flatMap((node) => {
          const result = [
            {
              id: node.dataset.plmField,
              value:
                node.tagName === 'IMG'
                  ? node.getAttribute('src')
                  : node.textContent,
            },
          ];
          if (node.dataset.plmAltField)
            result.push({
              id: node.dataset.plmAltField,
              value: node.getAttribute('alt'),
            });
          return result;
        }),
      );
    for (const { id, value } of fields) {
      check(
        Object.hasOwn(manifest.fields, id),
        'Known rendered field: ' + target.id + '/' + id,
      );
      if (!Object.hasOwn(expectedValues, id)) continue;
      const expected =
        manifest.fields[id].type === 'image'
          ? coverageMedia[coverageAsset]
          : expectedValues[id];
      check(value === expected, 'Live binding: ' + target.id + '/' + id);
      observed.add(id);
    }
    pageCoverage.push({
      pageId: target.id,
      boundFields: [...new Set(fields.map((f) => f.id))].sort((a, b) =>
        a.localeCompare(b),
      ),
    });
  }
  const missing = Object.keys(expectedValues).filter((id) => !observed.has(id));
  check(
    missing.length === 0,
    'Every editable visual field renders its draft value: ' +
      missing.join(', '),
  );
  check(errors.length === 0, 'No browser exceptions');
  writeFileSync(
    out + '/fixture-results.json',
    JSON.stringify(
      {
        kind: 'actual-parent-contract-fixture-only',
        editableVisualFieldsVerified: observed.size,
        pageCoverage,
        checks,
        errors,
        serverSaveReloadVerified: false,
        realPlmAuthenticationVerified: false,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify({ checks: checks.length, errors, output: out }));
} catch (error) {
  console.error(
    JSON.stringify({
      errors,
      events: await page.evaluate(() => window.events),
      differences: await page
        .frames()
        .find((f) => f.url().includes('43982'))
        ?.evaluate(
          (d) =>
            Object.keys(d.values)
              .filter(
                (k) =>
                  JSON.stringify(d.values[k]) !==
                  JSON.stringify(window.fixtureBaseline.values[k]),
              )
              .map((k) => [k, d.values[k], window.fixtureBaseline.values[k]]),
          approved,
        ),
      frame: await page
        .frames()
        .find((f) => f.url().includes('43982'))
        ?.locator('body')
        .innerText(),
    }),
  );
  throw error;
} finally {
  await browser.close();
  await child.close();
  await new Promise((r) => parent.close(r));
}
