import {
  contactRecipient,
  deploymentPolicy,
} from '@/lib/deployment-policy.mjs';
import { siteConfig } from '@/lib/site-config';
import { routeMetadata } from '@/lib/seo';
import { ContactForm } from '@/components/contact-form';
import { organization } from '@/lib/organization';
import { CtaLink } from '@/components/cta';
import { OrganizationAddress, SectionHeading } from '@/components/starburst';

export const metadata = {
  ...routeMetadata('/contact'),
  title: 'Contact',
  description:
    'Contact Project Starburst in Big Rapids about food assistance, donations, or volunteering. Find pantry hours, visiting and mailing addresses, and directions.',
};
export default function ContactPage() {
  return (
    <main id="main" className="starburst-page contact-page">
      <section
        className="contact-intro sb-shell"
        aria-labelledby="contact-title"
      >
        <p className="sb-eyebrow">CONTACT PROJECT STARBURST</p>
        <h1 id="contact-title">
          Let’s get you
          <br />
          to the right place.
        </h1>
        <p>
          Have a question about assistance, donations, or volunteering? We’re
          here to help you find your next step.
        </p>
      </section>
      <section
        className="contact-essentials sb-shell"
        aria-label="Contact information and public hours"
      >
        <div className="contact-direct">
          <div>
            <h2>Give us a call</h2>
            <CtaLink href={organization.phone.href} variant="text" icon="phone">
              {organization.phone.display}
            </CtaLink>
            <p>Call during public pantry hours.</p>
          </div>
          <div>
            <h2>Send an email</h2>
            <CtaLink href={organization.emailHref} variant="text" icon="email">
              {organization.email}
            </CtaLink>
          </div>
        </div>
        <div className="contact-hours">
          <h2>Public pantry hours</h2>
          <p>
            {organization.hours.days}
            <strong>{organization.hours.time}</strong>
          </p>
        </div>
      </section>
      <section
        id="visit"
        tabIndex={-1}
        className="contact-visit sb-shell"
        aria-label="Visiting and mailing addresses"
      >
        <div className="contact-addresses">
          <div className="contact-address">
            <h2>Visit the pantry</h2>
            <OrganizationAddress />
          </div>
          <div className="contact-address">
            <h2>Mailing address</h2>
            <OrganizationAddress mailing />
          </div>
        </div>
        <div className="contact-entry">
          <h2>When you arrive</h2>
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
        <details className="contact-map">
          <summary>Show map of the pantry</summary>
          <iframe
            title="Project Starburst at 120 S. State Street, Big Rapids"
            src={organization.mapEmbed}
            width="1160"
            height="300"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </details>
      </section>
      <nav
        className="contact-choice"
        aria-label="Find the information you need"
      >
        <div className="sb-shell">
          <div>
            <p>Need assistance?</p>
            <CtaLink href="/get-help" variant="text">
              Get Help
            </CtaLink>
          </div>
          <div>
            <p>Want to give?</p>
            <CtaLink href="/donate" variant="text">
              Donate
            </CtaLink>
          </div>
          <div>
            <p>Have time to share?</p>
            <CtaLink href="/volunteer" variant="text">
              Volunteer
            </CtaLink>
          </div>
        </div>
      </nav>
      <section
        className="contact-message sb-section sb-shell"
        aria-labelledby="message-title"
      >
        <div>
          <SectionHeading
            id="message-title"
            eyebrow="PUT YOUR QUESTION INTO WORDS"
            title="Start an email."
          >
            <p>
              Use this form to prepare your message. You’ll still need to send
              it from your email application.
            </p>
          </SectionHeading>
          <div className="contact-message-note">
            <p>
              For general questions only. Please leave out sensitive household
              information. Food assistance registration happens in person.
            </p>
            <CtaLink href="/get-help#how-it-works" variant="text">
              See How to Get Help
            </CtaLink>
          </div>
        </div>
        <ContactForm
          recipient={contactRecipient(process.env, siteConfig.email)}
          preview={!deploymentPolicy(process.env).isProduction}
        />
      </section>
    </main>
  );
}
