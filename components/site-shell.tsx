'use client';
import { ContentText } from '@/components/content/fields';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { CtaLink } from '@/components/cta';
import { organization } from '@/lib/organization';
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
        const current = pathname === href ? 'page' : undefined;
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
export function Header({
  pathnameOverride,
}: { pathnameOverride?: string } = {}) {
  const actualPathname = usePathname();
  const pathname = pathnameOverride ?? actualPathname;
  const [open, setOpen] = useState(false);
  const light = ['/get-help', '/donate', '/volunteer'].includes(pathname);
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
          <h2>
            <ContentText fieldId="shared.facebook.heading" />
          </h2>
          <p>
            <ContentText fieldId="shared.facebook.description" />
          </p>
          <CtaLink
            href={organization.facebook}
            variant="secondary"
            icon="external"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContentText fieldId="shared.facebook.action" />
            <span className="sr-only"> (opens in a new tab)</span>
          </CtaLink>
        </div>
        <img src="/assets/facebook.svg" alt="" width="125" height="125" />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" aria-label="Project Starburst home">
          <img
            className="logo"
            src="/assets/logo.svg"
            alt="Project Starburst"
            width="155"
            height="56"
          />
        </Link>
        <nav aria-label="Footer navigation">
          <NavigationLinks />
        </nav>
      </div>
      <div className="footer-grid">
        <div>
          <p>
            Project Starburst&apos;s mission is to provide food and basic needs
            in a dignified manner for our neighbors in Mecosta and Osceola
            Counties. We are primarily a food and hygiene need pantry but offer
            other services as well.
          </p>
          <address>
            <p>
              Hours: <ContentText fieldId="shared.hours.days" />,{' '}
              <ContentText fieldId="shared.hours.time" />.
            </p>
            <p>
              Phone:{' '}
              <a href={organization.phone.href}>
                <ContentText fieldId="shared.phone.display" />
              </a>
            </p>
            <p>
              <a
                href={organization.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                Address: {organization.address.street},{' '}
                {organization.address.mailingBox}, {organization.address.city},{' '}
                {organization.address.state} {organization.address.zip}
                <span className="sr-only"> (map opens in a new tab)</span>
              </a>
            </p>
            <p>
              Email:{' '}
              <a href={organization.emailHref}>
                <ContentText fieldId="shared.email" />
              </a>
            </p>
          </address>
        </div>
        <p>
          Copyright ©2025 Project Starburst. All rights reserved. We are a 501c3
          non-profit agency.
        </p>
        <div className="partners">
          <img
            src="/assets/united-way.jpg"
            alt="United Way"
            width="124"
            height="55"
          />
          <img
            src="/assets/fremont-area.jpg"
            alt="Fremont Area Community Foundation"
            width="124"
            height="55"
          />
        </div>
      </div>
    </footer>
  );
}
