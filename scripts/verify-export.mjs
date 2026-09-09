import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import {
  deploymentPolicy,
  PRODUCTION_ORIGIN,
} from '../lib/deployment-policy.mjs';
import { publicRoutes } from '../lib/routes.mjs';

/** @param {Record<string, string | undefined>} env */
export function verifyExport(env = process.env) {
  const root = 'dist/client';
  const { isProduction } = deploymentPolicy(env);
  const assets = new Set();
  const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const manifest = JSON.parse(
    readFileSync('docs/asset-inventory.json', 'utf8'),
  );
  for (const route of publicRoutes) {
    const file = join(
      root,
      route === '/' ? 'index.html' : route.slice(1) + '.html',
    );
    const html = readFileSync(file, 'utf8');
    const rscPath = route === '/' ? '/index.rsc' : route + '.rsc';
    const rewrite = config.rewrites.find((entry) => entry.source === route);
    if (
      rewrite?.destination !== rscPath ||
      rewrite?.has?.[0]?.key !== 'rsc' ||
      rewrite?.has?.[0]?.value !== '1'
    ) {
      throw new Error('Missing RSC routing: ' + route);
    }
    const rsc = readFileSync(join(root, rscPath.slice(1)), 'utf8');
    if (rsc.startsWith('<!DOCTYPE') || !rsc.includes('main'))
      throw new Error('Invalid navigation payload: ' + route);
    if (!html.includes('id="main"'))
      throw new Error('Missing page content: ' + route);
    const robots =
      html.match(/<meta\s+name="robots"[^>]*content="([^"]+)"/i)?.[1] ?? '';
    if (
      !robots ||
      (isProduction ? /noindex/i.test(robots) : !/noindex/i.test(robots))
    ) {
      throw new Error('Incorrect indexing policy: ' + route);
    }
    const canonical = html.match(
      /<link\s+rel="canonical"[^>]*href="([^"]+)"/i,
    )?.[1];
    const canonicalPath = route === '/souper-supper' ? '/soupersupper' : route;
    if (
      isProduction
        ? !canonical ||
          new URL(canonical).href !==
            new URL(canonicalPath, PRODUCTION_ORIGIN).href
        : !!canonical
    ) {
      throw new Error('Incorrect canonical: ' + route);
    }
    for (const match of html.matchAll(
      /(?:src|href)="(\/(?:assets|documents)\/[^"?#]+)"/g,
    ))
      assets.add(match[1]);
  }
  for (const asset of assets)
    if (!existsSync(join(root, asset.slice(1)))) {
      throw new Error('Missing public asset: ' + asset);
    }
  for (const asset of manifest.assets) {
    const bytes = readFileSync(join(root, asset.path.slice('public/'.length)));
    if (createHash('sha256').update(bytes).digest('hex') !== asset.sha256) {
      throw new Error('Preserved asset changed: ' + asset.path);
    }
  }
  for (const redirect of config.redirects) {
    if (
      !redirect.permanent ||
      !existsSync(join(root, redirect.destination.slice(1)))
    ) {
      throw new Error('Broken legacy resource redirect: ' + redirect.source);
    }
  }
  const notFound = readFileSync(join(root, '404.html'), 'utf8');
  if (!notFound.includes('Page not found'))
    throw new Error('Missing custom 404 page.');
  const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
  if (!isProduction && sitemap.includes('<loc>'))
    throw new Error('Preview sitemap must be empty.');
  if (isProduction && !sitemap.includes(PRODUCTION_ORIGIN))
    throw new Error('Production sitemap missing.');
  if (!existsSync(join(root, 'robots.txt')))
    throw new Error('Missing robots.txt.');
  console.log(
    'Verified ' +
      publicRoutes.length +
      ' static pages, ' +
      assets.size +
      ' linked assets, ' +
      manifest.assets.length +
      ' preserved public files, RSC routing, SEO, sitemap, robots, redirects, and 404.',
  );
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  verifyExport();
