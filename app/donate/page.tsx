import PageContent from '@/components/pages/donate';
import { contentMetadata } from '@/lib/content/metadata';
export const metadata = contentMetadata('donate', '/donate');
import {
  donationPaymentLink,
  deploymentPolicy,
} from '@/lib/deployment-policy.mjs';
import { siteConfig } from '@/lib/site-config';
export default function Page() {
  return (
    <PageContent
      link={donationPaymentLink(process.env, siteConfig.stripePaymentLink)}
      preview={!deploymentPolicy(process.env).isProduction}
    />
  );
}
