'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { CtaLink } from '@/components/cta';
import { organization } from '@/lib/organization';
import { OrganizationAddress, PartnerMarks } from '@/components/starburst';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

export const navigation = [
  ['Get Help', '/get-help'],
  ['Donate', '/donate'],
  ['Volunteer', '/volunteer'],
  ['About', '/about-us'],
  ['Contact', '/contact'],
  ['Souper Supper', '/soupersupper'],
] as const;

function NavigationLinks({
  pathname,
  close,
}: {
  pathname?: string;
  close?: () => void;
}) {
  return (
    <>
      {navigation.map(([name, href]) => {
        const current =
          pathname === href ||
          (href === '/soupersupper' &&
            (pathname === '/souper-supper' ||
              pathname?.startsWith('/event-details/')))
            ? 'page'
            : undefined;
        return name === 'Get Help' || name === 'Donate' ? (
          <CtaLink
            key={href}
            href={href}
            variant={name === 'Get Help' ? 'primary' : 'secondary'}
            icon="none"
            aria-current={current}
            onClick={close}
          >
            {name}
          </CtaLink>
        ) : (
          <Link key={href} href={href} aria-current={current} onClick={close}>
            {name}
          </Link>
        );
      })}
    </>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const light = [
    '/',
    '/about-us',
    '/contact',
    '/get-help',
    '/donate',
    '/volunteer',
  ].includes(pathname);
  return (
    <header className={'site-header' + (light ? ' site-header--light' : '')}>
      <Link href="/" aria-label="Project Starburst home">
        <img
          className="logo"
          src="/assets/logo.svg"
          alt="Project Starburst — food pantry plus"
          width="155"
          height="56"
        />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <NavigationLinks pathname={pathname} />
      </nav>
      <div className="header-controls">
        <CtaLink className="header-quick-help" href="/get-help" icon="none">
          Get Help
        </CtaLink>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="mobile-menu" aria-label="Open navigation">
            <Menu size={28} aria-hidden="true" />
          </SheetTrigger>
          <SheetContent className="mobile-panel">
            <SheetTitle>Project Starburst</SheetTitle>
            <SheetDescription>
              Neighbors helping neighbors since {organization.founded}.
            </SheetDescription>
            <nav aria-label="Mobile navigation">
              <NavigationLinks
                pathname={pathname}
                close={() => setOpen(false)}
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
export function FacebookBand() {
  return (
    <section className="facebook-band">
      <div className="facebook-card">
        <div>
          <h2>Follow Project Starburst on Facebook</h2>
          <p>Get updates on hours, events, and announcements.</p>
          <CtaLink
            href={organization.facebook}
            variant="secondary"
            icon="external"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on Facebook
            <span className="sr-only"> (opens in a new tab)</span>
          </CtaLink>
        </div>
        <img src="/assets/facebook.svg" alt="" width="125" height="125" />
      </div>
    </section>
  );
}
export function Footer({ year }: { year: number }) {
  return (
    <footer className="sb-footer">
      <div className="sb-footer-main sb-shell">
        <div className="sb-footer-brand">
          <Link href="/" aria-label="Project Starburst home">
            <img
              className="logo"
              src="/assets/logo.svg"
              alt="Project Starburst — food pantry plus"
              width="155"
              height="56"
            />
          </Link>
          <p>
            Food and basic needs, offered with dignity and care to our neighbors
            in {organization.counties}.
          </p>
          <CtaLink href={organization.phone.href} variant="text" icon="phone">
            {organization.phone.display}
          </CtaLink>
          <CtaLink href={organization.emailHref} variant="text" icon="email">
            {organization.email}
          </CtaLink>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Find your way</h2>
          {navigation.map(([name, href]) => (
            <Link href={href} key={href}>
              {name}
            </Link>
          ))}
        </nav>
        <div className="sb-footer-visit">
          <h2>Visit the pantry</h2>
          <OrganizationAddress />
          <CtaLink
            href={organization.directions}
            variant="text"
            icon="external"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions<span className="sr-only"> (opens in a new tab)</span>
          </CtaLink>
          <h2 className="sb-footer-hours-title">Public pantry hours</h2>
          <p>
            {organization.hours.days}
            <br />
            {organization.hours.time}
          </p>
        </div>
        <div className="sb-footer-mail">
          <h2>Mailing address</h2>
          <OrganizationAddress mailing />
          <CtaLink
            href={organization.facebook}
            variant="text"
            icon="external"
            target="_blank"
            rel="noopener noreferrer"
          >
            Updates on Facebook
            <span className="sr-only"> (opens in a new tab)</span>
          </CtaLink>
          <CtaLink
            href="/documents/non-discrimination-statement.pdf"
            variant="text"
            icon="external"
            target="_blank"
            rel="noopener noreferrer"
          >
            Non-Discrimination Statement (PDF)
            <span className="sr-only"> (opens in a new tab)</span>
          </CtaLink>
        </div>
      </div>
      <div className="sb-footer-bottom sb-shell">
        <div>
          <span className="sb-meta-label">Community partners</span>
          <PartnerMarks />
        </div>
        <p>
          © {year} Project Starburst. All rights reserved.
          <br />
          We are a 501(c)(3) nonprofit organization.
        </p>
      </div>
    </footer>
  );
}
