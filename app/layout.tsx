import { approvedContent } from '@/lib/content/approved';
import { siteMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { SiteChrome } from '@/components/content/site-chrome';
import './globals.css';
import './actions.css';
import './editor-preview.css';
export const metadata: Metadata = {
  title: {
    default: 'Project Starburst | Food Pantry in Big Rapids, MI',
    template: '%s | Project Starburst',
  },
  description:
    'Project Starburst provides food, personal hygiene, and essential items to neighbors in Mecosta and Osceola counties with dignity, respect, and compassion.',
  icons: { icon: '/assets/logo.svg' },
  ...siteMetadata,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body data-content-revision={approvedContent.baseContentHash}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
