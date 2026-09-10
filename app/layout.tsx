import { siteMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site-shell';
import './globals.css';
import './starburst.css';
import './actions.css';
import './brand-pages.css';
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
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer year={new Date().getUTCFullYear()} />
      </body>
    </html>
  );
}
