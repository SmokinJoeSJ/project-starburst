import { deploymentPolicy, PRODUCTION_ORIGIN } from './deployment-policy.mjs';
import { canonicalRoutes } from './routes.mjs';
/** @param {Record<string,string|undefined>} env */
export function sitemapEntries(env) {
  return deploymentPolicy(env).isProduction
    ? canonicalRoutes.map((path) => ({
        url: new URL(path, PRODUCTION_ORIGIN).href,
      }))
    : [];
}
/** @param {Record<string,string|undefined>} env */
export function robotsDefinition(env) {
  return {
    rules: { userAgent: '*', allow: '/' },
    ...(deploymentPolicy(env).isProduction
      ? { sitemap: PRODUCTION_ORIGIN + '/sitemap.xml' }
      : {}),
  };
}
/** @param {Record<string,string|undefined>} env */
export function staticSeoDocuments(env) {
  const robots = robotsDefinition(env);
  return {
    'robots.txt':
      'User-agent: *\nAllow: /\n' +
      (robots.sitemap ? '\nSitemap: ' + robots.sitemap + '\n' : ''),
    'sitemap.xml':
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      sitemapEntries(env)
        .map((entry) => '  <url><loc>' + entry.url + '</loc></url>\n')
        .join('') +
      '</urlset>\n',
  };
}
