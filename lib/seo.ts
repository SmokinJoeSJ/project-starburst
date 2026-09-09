import type { Metadata } from 'next';
import { deploymentPolicy, PRODUCTION_ORIGIN } from './deployment-policy.mjs';
export const deployment = deploymentPolicy(process.env);
export const siteMetadata: Metadata = {
  metadataBase: new URL(PRODUCTION_ORIGIN),
  robots: { index: !deployment.noindex, follow: true },
};
export function routeMetadata(path: string): Metadata {
  return {
    alternates: deployment.isProduction
      ? { canonical: new URL(path, PRODUCTION_ORIGIN).href }
      : undefined,
  };
}
