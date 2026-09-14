import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { publicRoutes } from '../lib/routes.mjs';
const { chromium } = createRequire(import.meta.url)(
  process.env.PLM_PLAYWRIGHT_MODULE || 'playwright',
);
const root = resolve('dist/client'),
  out = 'outputs/editor-review/public';
mkdirSync(out, { recursive: true });
const binding = JSON.parse(readFileSync('content/editor-binding.json'));
const config = JSON.parse(readFileSync('vercel.json')),
  approved = JSON.parse(readFileSync('content/plm-content.json'));
const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let path = url.pathname;
  const redirect = config.redirects.find((r) => r.source === path);
  if (redirect) {
    res.writeHead(308, { Location: redirect.destination });
    return res.end();
  }
  if (path === '/plm-preview') {
    for (const header of config.headers.find((r) => r.source === path).headers)
      res.setHeader(header.key, header.value);
  }
  if (req.headers.rsc === '1')
    path = path === '/' ? '/index.rsc' : path + '.rsc';
  else
    path =
      path === '/' ? '/index.html' : !extname(path) ? path + '.html' : path;
  let file = resolve(root, '.' + path);
  if (!file.startsWith(root + sep) || !existsSync(file)) {
    res.statusCode = 404;
    file = resolve(root, '404.html');
  }
  res.setHeader(
    'Content-Type',
    {
      '.html': 'text/html; charset=utf-8',
      '.rsc': 'text/x-component',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
      '.pdf': 'application/pdf',
    }[extname(file)] || 'application/octet-stream',
  );
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({
  channel: process.env.PLM_BROWSER_CHANNEL || 'msedge',
  headless: true,
});
const page = await browser.newPage({ reducedMotion: 'reduce' }),
  errors = [],
  results = [],
  checks = [];
page.on('pageerror', (error) => errors.push(error.message));
const check = (value, name) => {
  if (!value) throw Error(name);
  checks.push(name);
};
try {
  await page.route('https://maps.google.com/**', (r) => r.abort());
  for (const width of [375, 390, 430, 768, 1024, 1440, 1920])
    for (const route of publicRoutes) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(origin + route, {
        waitUntil: 'networkidle',
      });
      check(response.status() === 200, 'Direct 200 ' + route + ' @' + width);
      await page.evaluate(() => document.fonts.ready);
      for (const img of await page.locator('img[loading=lazy]').all())
        await img.scrollIntoViewIfNeeded();
      await page.waitForTimeout(50);
      await page.evaluate(() => scrollTo(0, 0));
      const result = await page.evaluate(() => ({
        text: document.body.innerText,
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll('h1').length,
        missingImages: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.getAttribute('src')),
        elements: [...document.querySelectorAll('h1,h2,h3,p,img')].map((e) => ({
          tag: e.tagName,
          text: e.tagName === 'IMG' ? e.getAttribute('src') : e.textContent,
          rect: {
            x: e.getBoundingClientRect().x,
            y: e.getBoundingClientRect().y,
            w: e.getBoundingClientRect().width,
            h: e.getBoundingClientRect().height,
          },
        })),
      }));
      check(
        !result.overflow && result.h1 === 1 && !result.missingImages.length,
        'Layout, headings and assets ' + route + ' @' + width,
      );
      check(
        (await page.locator('body').getAttribute('data-content-revision')) ===
          approved.baseContentHash,
        'HTML approved revision ' + route + ' @' + width,
      );
      check(
        (
          await page.locator('meta[name="robots"]').getAttribute('content')
        ).includes('noindex'),
        'Preview SEO ' + route + ' @' + width,
      );
      results.push({ width, route, ...result });
      if (
        [375, 768, 1440].includes(width) &&
        ['/', '/about-us', '/contact', '/get-help'].includes(route)
      )
        await page.screenshot({
          path:
            out +
            '/' +
            (route === '/' ? 'home' : route.slice(1)) +
            '-' +
            width +
            '.jpg',
          fullPage: true,
          quality: 80,
        });
    }
  const baselinePath = '.reference/editor-baseline/rendered.json';
  let comparisons = [];
  if (existsSync(baselinePath)) {
    const baseline = JSON.parse(readFileSync(baselinePath));
    comparisons = baseline.map((before) => {
      const after = results.find(
        (r) => r.route === before.route && r.width === before.width,
      );
      return {
        route: before.route,
        width: before.width,
        sameText: before.text === after.text,
        sameElements:
          JSON.stringify(before.elements) === JSON.stringify(after.elements),
      };
    });
    check(
      comparisons.every((r) => r.sameText && r.sameElements),
      'All 27 baseline text and element-position comparisons match',
    );
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin, { waitUntil: 'networkidle' });
  for (const route of [
    '/get-help',
    '/donate',
    '/volunteer',
    '/about-us',
    '/contact',
    '/soupersupper',
  ]) {
    await page
      .locator('header nav.desktop-nav a[href="' + route + '"]')
      .click();
    await page.waitForURL(origin + route);
    check(
      (await page.locator('h1').count()) === 1,
      'Real RSC navigation ' + route,
    );
    check(
      (await page.locator('body').getAttribute('data-content-revision')) ===
        approved.baseContentHash,
      'RSC revision ' + route,
    );
  }
  await page.goto(origin + '/get-help');
  await page.getByText('View Hours & Location', { exact: true }).click();
  check(
    (await page.evaluate(() => document.activeElement?.id)) ===
      'hours-location',
    'Hash focus target preserved',
  );
  await page.setViewportSize({ width: 390, height: 900 });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.screenshot({
    path: out + '/mobile-menu.jpg',
    fullPage: true,
    quality: 80,
  });
  await page.keyboard.press('Escape');
  check(
    await page
      .getByRole('button', { name: 'Open navigation' })
      .evaluate((el) => el === document.activeElement),
    'Mobile menu Escape returns focus',
  );
  await page.goto(origin + '/contact');
  await page.locator('#email').fill('fixture@example.test');
  await page.locator('#message').fill('Local draft test only.');
  await page.locator('form button[type="submit"]').click();
  check(
    (await page
      .getByText('Preview draft prepared below. No email was sent.', {
        exact: true,
      })
      .count()) === 1,
    'Original contact draft-only behavior',
  );
  await page.screenshot({
    path: out + '/contact-draft.jpg',
    fullPage: true,
    quality: 80,
  });
  await page.goto(origin + '/volunteer');
  check(
    (await page
      .locator('a[href="/documents/volunteer-application.pdf"]')
      .count()) >= 2,
    'Original PDF actions present',
  );
  for (const redirect of config.redirects) {
    const response = await page.request.get(origin + redirect.source);
    check(
      response.status() === 200 &&
        response.headers()['content-type'] === 'application/pdf',
      'Legacy PDF redirect ' + redirect.source,
    );
  }
  const response = await page.goto(origin + '/plm-preview');
  check(
    response.status() === 200 &&
      response.headers()['content-security-policy'] ===
        'frame-ancestors ' +
          (binding.parentOrigins.length
            ? binding.parentOrigins.join(' ')
            : "'none'"),
    'Preview HTTP framing matches the exact configured allowlist',
  );
  check(
    (await page.locator('header').count()) === 0,
    'Preview isolated from public chrome',
  );
  check(
    (await page
      .getByText(
        binding.siteId && binding.parentOrigins.length
          ? 'Waiting for an authorized PLM Studio connection.'
          : 'This preview is not connected.',
        { exact: false },
      )
      .count()) === 1,
    'Honest unconnected state',
  );
  await page.screenshot({ path: out + '/unconnected.jpg', quality: 80 });
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const nojsPage = await nojs.newPage();
  await nojsPage.goto(origin);
  check(
    (await nojsPage.locator('h1').innerText()).replace(/\s+/g, ' ').trim() ===
      approved.values['home.heading'].replace(/\s+/g, ' ').trim(),
    'Approved heading usable without JavaScript',
  );
  await nojs.close();
  check(errors.length === 0, 'No public browser exceptions');
  writeFileSync(
    out + '/results.json',
    JSON.stringify({ checks, errors, comparisons, rendered: results }, null, 2),
  );
  console.log(
    JSON.stringify({
      checks: checks.length,
      baselineComparisons: comparisons.length,
      errors,
      output: out,
    }),
  );
} catch (error) {
  writeFileSync(
    out + '/failure.json',
    JSON.stringify({ message: error.message, errors, results }, null, 2),
  );
  throw error;
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
