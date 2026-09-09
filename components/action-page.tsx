import type { ReactNode } from 'react';
import { Clock3, MapPin, Phone } from 'lucide-react';
import { organization } from '@/lib/organization';
import { CtaLink } from '@/components/cta';

export function ActionHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  children,
  caption,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  alt: string;
  children: ReactNode;
  caption: string;
}) {
  return (
    <section
      className="action-hero action-container"
      aria-labelledby="action-title"
    >
      <div className="action-hero-copy">
        <p className="action-eyebrow">{eyebrow}</p>
        <h1 id="action-title">{title}</h1>
        <p className="action-lead">{description}</p>
        <div className="action-cta-row">{children}</div>
      </div>
      <figure className="action-hero-photo">
        <img
          src={image}
          alt={alt}
          width="960"
          height="640"
          fetchPriority="high"
        />
        <figcaption>{caption}</figcaption>
      </figure>
    </section>
  );
}

export function PantryDetails({
  id = 'hours-location',
  title = 'Hours & location',
  dropOff = false,
}: {
  id?: string;
  title?: string;
  dropOff?: boolean;
}) {
  return (
    <section
      id={id}
      tabIndex={-1}
      className="action-location action-container"
      aria-labelledby={id + '-title'}
    >
      <div className="action-location-intro">
        <p className="action-eyebrow">
          {dropOff ? 'BRING YOUR DONATION' : 'COME SEE US'}
        </p>
        <h2 id={id + '-title'}>{title}</h2>
        <p>{organization.address.entry}</p>
        <CtaLink
          href={organization.directions}
          variant="secondary"
          icon="external"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions<span className="sr-only"> (opens in a new tab)</span>
        </CtaLink>
      </div>
      <div className="action-location-facts">
        <div className="action-fact">
          <Clock3 size={24} aria-hidden="true" />
          <div>
            <h3>{dropOff ? 'Drop-off hours' : 'Pantry hours'}</h3>
            <p>
              {organization.hours.days}
              <br />
              <strong>{organization.hours.time}</strong>
            </p>
          </div>
        </div>
        <div className="action-fact">
          <MapPin size={24} aria-hidden="true" />
          <div>
            <h3>Find us in Big Rapids</h3>
            <address>
              {organization.address.street}
              <br />
              {organization.address.city}, {organization.address.state}{' '}
              {organization.address.zip}
            </address>
          </div>
        </div>
        <div className="action-fact">
          <Phone size={24} aria-hidden="true" />
          <div>
            <h3>Have a question?</h3>
            <CtaLink href={organization.phone.href} variant="text" icon="phone">
              {organization.phone.display}
            </CtaLink>
            <CtaLink href={organization.emailHref} variant="text" icon="email">
              {organization.email}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ActionClosing({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="action-closing action-container">
      <div>
        <p className="action-eyebrow">NEIGHBORS HELPING NEIGHBORS</p>
        <h2>{title}</h2>
        {children}
      </div>
      <div className="action-closing-links">
        <CtaLink href={organization.phone.href} icon="phone">
          Call {organization.phone.display}
        </CtaLink>
        <CtaLink href={organization.emailHref} variant="text" icon="email">
          Email Project Starburst
        </CtaLink>
      </div>
    </section>
  );
}
