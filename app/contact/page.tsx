import PageContent from '@/components/pages/contact';
import { contentMetadata } from '@/lib/content/metadata';
export const metadata = contentMetadata('contact', '/contact');
import {
  contactRecipient,
  deploymentPolicy,
} from '@/lib/deployment-policy.mjs';
import { siteConfig } from '@/lib/site-config';
export default function Page() {
  return (
    <PageContent
      recipient={contactRecipient(process.env, siteConfig.email)}
      preview={!deploymentPolicy(process.env).isProduction}
    />
  );
}
