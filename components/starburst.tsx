import type { ReactNode } from 'react';
import { CtaLink } from '@/components/cta';
import { organization, communityPartners } from '@/lib/organization';

export function StarburstAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      className={'sb-burst ' + className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="9" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M40 7v12"
          transform={'rotate(' + angle + ' 40 40)'}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="sb-section-heading">
      {eyebrow && <p className="sb-eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {children && <div className="sb-heading-copy">{children}</div>}
    </div>
  );
}
export function OrganizationAddress({
  mailing = false,
}: {
  mailing?: boolean;
}) {
  return (
    <address>
      {mailing ? organization.address.mailingBox : organization.address.street}
      <br />
      {organization.address.city}, {organization.address.state}{' '}
      {organization.address.zip}
    </address>
  );
}
export function VisitSummary() {
  return (
    <aside className="sb-visit-summary" aria-label="Pantry hours and location">
      <div className="sb-shell">
        <div>
          <span className="sb-meta-label">Find us in Big Rapids</span>
          <p>
            {organization.address.street}
            <br className="sb-mobile-break" />{' '}
            <span>
              {organization.address.city}, {organization.address.state}
            </span>
          </p>
        </div>
        <div>
          <span className="sb-meta-label">Public pantry hours</span>
          <p>
            {organization.hours.days}
            <br />
            {organization.hours.time}
          </p>
        </div>
        <CtaLink href="/get-help#hours-location" variant="text">
          View Hours &amp; Location
        </CtaLink>
      </div>
    </aside>
  );
}
export function PartnerMarks() {
  return (
    <ul className="sb-partner-marks" aria-label="Community partners">
      {communityPartners.map((partner) => (
        <li key={partner.name}>
          <img
            src={partner.image}
            alt={partner.name}
            width={124}
            height={55}
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}
export function SupportClosing() {
  return (
    <section
      className="sb-support-closing sb-shell"
      aria-labelledby="support-closing-title"
    >
      <div>
        <p className="sb-eyebrow">THERE’S A PLACE FOR YOU HERE</p>
        <h2 id="support-closing-title">
          Good neighbors.
          <br />A stronger community.
        </h2>
      </div>
      <div>
        <p>
          A donation, a few pantry essentials, or your time. Find a way to
          support your neighbors.
        </p>
        <div className="sb-cta-row">
          <CtaLink href="/donate">Donate</CtaLink>
          <CtaLink href="/volunteer" variant="secondary">
            Volunteer
          </CtaLink>
        </div>
        <CtaLink href="/get-help" variant="text">
          Looking for assistance? Get Help
        </CtaLink>
      </div>
    </section>
  );
}
