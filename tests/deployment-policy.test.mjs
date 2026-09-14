import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  deploymentPolicy,
  assertVercelBuildAllowed,
  donationPaymentLink,
  contactRecipient,
  PRODUCTION_ORIGIN,
} from '../lib/deployment-policy.mjs';
import { createContactDraft } from '../lib/contact-draft.mjs';
import { validatePrTarget } from '../scripts/pr-policy.mjs';
import { verifyVercelRouting } from '../scripts/verify-export.mjs';

const production = { VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'main' };
const preview = {
  VERCEL_ENV: 'preview',
  VERCEL_GIT_COMMIT_REF: 'redesign-2026',
};

await test('only Production on main is indexable; unknown and branch previews stay noindex', () => {
  for (const env of [
    {},
    preview,
    { ...production, VERCEL_GIT_COMMIT_REF: 'feature/homepage' },
    { VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'main' },
  ]) {
    assert.equal(deploymentPolicy(env).noindex, true);
  }
  assert.equal(deploymentPolicy(production).noindex, false);
  assert.equal(deploymentPolicy(production).canonicalOrigin, PRODUCTION_ORIGIN);
  assert.equal(new URL(PRODUCTION_ORIGIN).hostname, 'www.projectstarburst.org');
});

await test('production builds need main and the explicit launch flag', () => {
  assert.doesNotThrow(() => assertVercelBuildAllowed({}));
  assert.doesNotThrow(() => assertVercelBuildAllowed(preview));
  assert.throws(() => assertVercelBuildAllowed(production), /blocked/);
  assert.throws(
    () =>
      assertVercelBuildAllowed({
        ...production,
        VERCEL_GIT_COMMIT_REF: 'redesign-2026',
        PLM_PRODUCTION_LAUNCH_APPROVED: 'true',
      }),
    /blocked/,
  );
  assert.doesNotThrow(() =>
    assertVercelBuildAllowed({
      ...production,
      PLM_PRODUCTION_LAUNCH_APPROVED: 'true',
    }),
  );
});

// These are synthetic URL fixtures, not credentials or working payment links.
await test('previews cannot fall back to live donations and reject non-test links', () => {
  const live = 'https://buy.stripe.com/example';
  const sandbox = 'https://buy.stripe.com/test_example';
  assert.equal(donationPaymentLink(preview, live), '');
  assert.equal(
    donationPaymentLink(
      { ...preview, PLM_STRIPE_TEST_PAYMENT_LINK: sandbox },
      live,
    ),
    sandbox,
  );
  for (const bad of [
    live,
    'https://buy.stripe.com.evil.invalid/test_example',
    'javascript:alert(1)',
    'https://user@buy.stripe.com/test_example',
  ]) {
    assert.throws(() =>
      donationPaymentLink(
        { ...preview, PLM_STRIPE_TEST_PAYMENT_LINK: bad },
        live,
      ),
    );
  }
  assert.equal(donationPaymentLink(production, live), live);
  assert.equal(donationPaymentLink(production, ''), '');
  assert.throws(() => donationPaymentLink(production, sandbox));
});

await test('preview email requires a separate valid test inbox; production is preserved', () => {
  const real = 'office@example.org';
  assert.equal(contactRecipient(preview, real), '');
  assert.equal(
    contactRecipient({ ...preview, PLM_PREVIEW_EMAIL: 'qa@example.org' }, real),
    'qa@example.org',
  );
  assert.equal(contactRecipient(production, real), real);
  for (const invalid of [
    real,
    'OFFICE@example.org',
    'a@example.org,b@example.org',
    'qa@example.org\r\nbcc:x@example.org',
  ]) {
    assert.throws(() =>
      contactRecipient({ ...preview, PLM_PREVIEW_EMAIL: invalid }, real),
    );
  }
});

await test('draft-only preview never creates a mailto, and test email is labeled and encoded', () => {
  const fields = {
    firstName: 'A',
    lastName: 'B',
    email: 'visitor@example.org',
    phone: '',
    message: 'Help & questions?\nSecond line',
  };
  const draft = createContactDraft(fields, '', true);
  assert.equal(draft.mailto, '');
  assert.match(draft.body, /Help & questions/);
  const sample = createContactDraft(fields, 'qa@example.org', true);
  assert.equal(
    new URL(sample.mailto).searchParams.get('subject'),
    '[PREVIEW TEST] Project Starburst website inquiry',
  );
  assert.equal(new URL(sample.mailto).searchParams.get('body'), draft.body);
  assert.match(sample.mailto, /^mailto:qa@example.org\?/);
  assert.equal(
    new URL(
      createContactDraft(fields, 'office@example.org', false).mailto,
    ).searchParams.get('subject'),
    'Project Starburst website inquiry',
  );
});

await test('feature PRs target staging; main accepts only the same-repository integration branch', () => {
  assert.doesNotThrow(() =>
    validatePrTarget({
      base: 'redesign-2026',
      head: 'feature/homepage',
      sameRepository: true,
    }),
  );
  assert.doesNotThrow(() =>
    validatePrTarget({
      base: 'main',
      head: 'redesign-2026',
      sameRepository: true,
    }),
  );
  assert.throws(() =>
    validatePrTarget({
      base: 'main',
      head: 'feature/homepage',
      sameRepository: true,
    }),
  );
  assert.throws(() =>
    validatePrTarget({
      base: 'main',
      head: 'redesign-2026',
      sameRepository: false,
    }),
  );
  assert.throws(() =>
    validatePrTarget({
      base: 'redesign-2026',
      head: 'main',
      sameRepository: true,
    }),
  );
});

await test('Vercel config keeps the production guard and a static output target', () => {
  const config = JSON.parse(
    readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'),
  );
  assert.equal(config.git.deploymentEnabled.main, false);
  assert.equal(config.git.deploymentEnabled['**'], false);
  assert.equal(config.git.deploymentEnabled['feature/**'], true);
  assert.equal(config.git.deploymentEnabled['redesign-2026'], true);
  assert.equal(config.buildCommand, 'npm run build:vercel');
  assert.equal(config.outputDirectory, 'dist/client');
  const stagingHeaders = config.headers.find((entry) =>
    entry.has?.some(
      (condition) =>
        condition.type === 'host' &&
        condition.value === 'preview.projectstarburst.org',
    ),
  );
  assert.ok(
    stagingHeaders?.headers.some(
      (header) => header.key === 'X-Robots-Tag' && header.value === 'noindex',
    ),
  );
  assert.ok(
    !config.headers.some(
      (entry) =>
        !entry.has &&
        entry.source === '/:path*' &&
        entry.headers.some((header) => header.key === 'X-Robots-Tag'),
    ),
  );
});

await test('SEO documents exclude previews and include only canonical production routes', async () => {
  const { staticSeoDocuments } = await import('../lib/seo-documents.mjs');
  const staging = staticSeoDocuments(preview);
  assert.doesNotMatch(staging['sitemap.xml'], /<loc>/);
  assert.doesNotMatch(staging['robots.txt'], /Sitemap:/);
  assert.match(staging['robots.txt'], /Allow: \//);
  const live = staticSeoDocuments(production);
  assert.equal((live['sitemap.xml'].match(/<loc>/g) ?? []).length, 8);
  assert.doesNotMatch(live['sitemap.xml'], /preview\.projectstarburst/);
  assert.equal(
    live['sitemap.xml'].includes(
      '<loc>' + PRODUCTION_ORIGIN + '/souper-supper</loc>',
    ),
    false,
  );
  assert.match(live['robots.txt'], /www\.projectstarburst\.org\/sitemap\.xml/);
});

await test('RSC navigation cannot be shadowed by exported HTML or lose its response headers', () => {
  const config = JSON.parse(
    readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'),
  );
  assert.doesNotThrow(() => verifyVercelRouting(config));

  // Regression: all files existed and the old export checks passed, but Vercel
  // resolved HTML before these high-level rewrites on the actual hosted site.
  const shadowed = structuredClone(config);
  shadowed.rewrites = shadowed.routes.map(({ src, dest, has }) => ({
    source: src.slice(1, -1),
    destination: dest,
    has,
  }));
  delete shadowed.routes;
  assert.throws(() => verifyVercelRouting(shadowed), /before the filesystem/);

  const late = structuredClone(config);
  late.routes.unshift({ handle: 'filesystem' });
  assert.throws(() => verifyVercelRouting(late), /before the filesystem/);

  const unsafe = structuredClone(config);
  delete unsafe.routes[0].headers['Cache-Control'];
  assert.throws(() => verifyVercelRouting(unsafe), /safe headers/);
});
