'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
export const navigation = [
  ['Get Help', '/get-help'],
  ['About Us', '/about-us'],
  ['Souper Supper', '/soupersupper'],
  ['Volunteer', '/volunteer'],
  ['Contact', '/contact'],
  ['Donate', '/donate'],
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
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
        {navigation.map(([name, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? 'page' : undefined}
          >
            {name}
          </Link>
        ))}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="mobile-menu" aria-label="Open navigation">
          <Menu size={28} />
        </SheetTrigger>
        <SheetContent className="mobile-panel">
          <SheetTitle>Project Starburst</SheetTitle>
          <SheetDescription>
            Neighbors helping neighbors since 1971.
          </SheetDescription>
          <nav aria-label="Mobile navigation">
            {navigation.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
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
          <a
            className="pill"
            href="https://www.facebook.com/ProjectStarburst"
            target="_blank"
            rel="noreferrer"
          >
            Follow Us
          </a>
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
          {navigation.map(([name, href]) => (
            <Link key={href} href={href}>
              {name}
            </Link>
          ))}
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
            <p>Hours: Monday- Wednesday- Friday, 10am - 4pm.</p>
            <p>
              Phone: <a href="tel:+12317965342">(231) 796-5342.</a>
            </p>
            <p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Project+Starburst+120+S+State+St+Big+Rapids+MI"
                target="_blank"
                rel="noreferrer"
              >
                Address: 120 S. State Street, P.O. Box 313, Big Rapids, MI
                49307.
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:br@projectstarburst.org">
                br@projectstarburst.org.
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
