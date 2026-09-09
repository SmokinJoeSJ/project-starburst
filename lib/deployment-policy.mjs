export const PRODUCTION_ORIGIN = 'https://www.projectstarburst.org';
export const STAGING_ORIGIN = 'https://preview.projectstarburst.org';

/** @param {Record<string, string | undefined>} env */
export function deploymentPolicy(env = {}) {
  const isProduction =
    env.VERCEL_ENV === 'production' && env.VERCEL_GIT_COMMIT_REF === 'main';
  return {
    isProduction,
    noindex: !isProduction,
    canonicalOrigin: PRODUCTION_ORIGIN,
  };
}

/** This guard builds files only; it never deploys.
 * @param {Record<string, string | undefined>} env */
export function assertVercelBuildAllowed(env) {
  if (
    env.VERCEL_ENV === 'production' &&
    (env.VERCEL_GIT_COMMIT_REF !== 'main' ||
      env.PLM_PRODUCTION_LAUNCH_APPROVED !== 'true')
  ) {
    throw new Error(
      'Production build blocked: only an explicitly approved main launch may build in the Vercel Production environment. Use Preview for redesign review.',
    );
  }
}

/** @param {string | undefined} link @param {boolean} test */
export function isStripePaymentLink(link, test) {
  if (!link) return false;
  try {
    const url = new URL(link);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'buy.stripe.com' &&
      !url.username &&
      !url.password &&
      !url.port &&
      url.pathname.length > 1 &&
      url.pathname.startsWith('/test_') === test
    );
  } catch {
    return false;
  }
}

/** @param {Record<string, string | undefined>} env @param {string} productionLink */
export function donationPaymentLink(env, productionLink = '') {
  const production = deploymentPolicy(env).isProduction;
  const link = production ? productionLink : env.PLM_STRIPE_TEST_PAYMENT_LINK;
  if (!link) return '';
  if (!isStripePaymentLink(link, !production)) {
    throw new Error(
      production
        ? 'The production donation link must be a live Stripe Payment Link.'
        : 'Preview donations require a Stripe test Payment Link.',
    );
  }
  return link;
}

/** @param {Record<string, string | undefined>} env @param {string} productionRecipient */
export function contactRecipient(env, productionRecipient) {
  if (deploymentPolicy(env).isProduction) return productionRecipient;
  const recipient = env.PLM_PREVIEW_EMAIL?.trim() ?? '';
  if (!recipient) return '';
  if (!/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(recipient)) {
    throw new Error('PLM_PREVIEW_EMAIL must be one test inbox address.');
  }
  if (recipient.toLowerCase() === productionRecipient.toLowerCase()) {
    throw new Error(
      'The preview test inbox must not be the production form recipient.',
    );
  }
  return recipient;
}
