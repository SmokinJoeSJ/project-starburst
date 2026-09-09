import {
  contactRecipient,
  deploymentPolicy,
} from '@/lib/deployment-policy.mjs';
import { siteConfig } from '@/lib/site-config';
import { routeMetadata } from '@/lib/seo';
import { PageHero, TextSection } from '@/components/page-parts';
import { ContactForm } from '@/components/contact-form';
import { organization } from '@/lib/organization';
import { CtaLink } from '@/components/cta';
export const metadata = { ...routeMetadata('/contact'), title: 'Contact' };
export default function Page() {
  return (
    <main id="main">
      <PageHero
        title="Contact Us"
        image="/assets/11062b_841a038a35fe4e4da9c2871f63caed93~mv2.jpg"
        alt="Volunteers collecting donations"
      >
        <p>
          We&apos;d love to hear from you! Whether you have a question,
          suggestion, or need assistance, we&apos;re here to help. Get in touch
          with us using the information below.
        </p>
      </PageHero>
      <TextSection title="Our Location" className="location-section">
        <p>
          {organization.name} · {organization.address.full}
        </p>
        <div className="location-card">
          <div>
            <p>
              {organization.name}
              <br />
              {organization.address.street}
              <br />
              {organization.address.city}, {organization.address.state}{' '}
              {organization.address.zip}
            </p>
            <p>{organization.address.entry}</p>
            <CtaLink
              variant="text"
              icon="external"
              href={organization.directions}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
              <span className="sr-only"> (opens in a new tab)</span>
            </CtaLink>
          </div>
          <iframe
            title="Map showing Project Starburst at 120 S. State Street, Big Rapids"
            src={organization.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </TextSection>
      <TextSection title="Phone">
        <p>
          <CtaLink href={organization.phone.href} variant="text" icon="phone">
            {organization.phone.display}
          </CtaLink>
        </p>
        <p>
          If you have questions or need more information about our services,
          feel free to call us during our operating hours.
        </p>
      </TextSection>
      <TextSection title="Email">
        <p>
          <CtaLink href={organization.emailHref} variant="text" icon="email">
            {organization.email}
          </CtaLink>
        </p>
        <p>
          For general inquiries or to reach a specific department, send us an
          email, and we&apos;ll get back to you as soon as possible.
        </p>
      </TextSection>
      <TextSection title="Operating Hours">
        <p>
          {organization.hours.days}
          <br />
          {organization.hours.time}
        </p>
      </TextSection>
      <ContactForm
        recipient={contactRecipient(process.env, siteConfig.email)}
        preview={!deploymentPolicy(process.env).isProduction}
      />
      <TextSection title="Follow Us">
        <p>Stay updated and connected with us on our social media channels!</p>
        <a
          className="social-link"
          href={organization.facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Project Starburst on Facebook"
        >
          <img src="/assets/facebook.svg" alt="" width="42" height="42" />
        </a>
      </TextSection>
    </main>
  );
}
