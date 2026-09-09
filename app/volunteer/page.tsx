import { routeMetadata } from '@/lib/seo';
import { organization, volunteerOpportunities } from '@/lib/organization';
import { CtaLink } from '@/components/cta';
import { ActionHero, ActionClosing } from '@/components/action-page';
import {
  Truck,
  ShoppingBasket,
  Users,
  HandHeart,
  Package,
  HeartHandshake,
  FileText,
} from 'lucide-react';

export const metadata = {
  ...routeMetadata('/volunteer'),
  title: 'Volunteer',
  description:
    'Give your time at Project Starburst in Big Rapids. Explore volunteer opportunities, download the application, and contact the pantry to get started.',
};
const roleIcons = {
  truck: Truck,
  basket: ShoppingBasket,
  people: Users,
  hands: HandHeart,
  box: Package,
  heart: HeartHandshake,
};
export default function Page() {
  return (
    <main id="main" className="action-page action-volunteer">
      <ActionHero
        eyebrow="VOLUNTEER"
        title={
          <>
            Give your time.
            <br />
            Help your neighbors.
          </>
        }
        description={
          'Distribute food, organize donations, or help with events. Your time helps families in ' +
          organization.counties +
          ' get the support they need.'
        }
        image="/assets/1691a921dfec4d4f8637b1c7ffa2528a.jpg"
        alt="Volunteers working together to sort donated food"
        caption="There’s more than one way to make a difference."
      >
        <CtaLink
          href={organization.volunteerApplication.href}
          icon="download"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply to Volunteer
          <span className="sr-only"> — PDF, opens in a new tab</span>
        </CtaLink>
        <CtaLink href="/contact" variant="secondary">
          Contact Us
        </CtaLink>
      </ActionHero>

      <section
        className="action-section action-container action-volunteer-roles"
        aria-labelledby="volunteer-roles"
      >
        <div className="action-section-heading">
          <p className="action-eyebrow">FIND YOUR WAY TO HELP</p>
          <h2 id="volunteer-roles">
            Good people.
            <br />
            Meaningful work.
          </h2>
          <p>
            Whether you’re coming on your own or with a group, there are several
            ways to support the pantry.
          </p>
        </div>
        <div className="action-role-grid">
          {volunteerOpportunities.map((role) => {
            const Icon = roleIcons[role.icon];
            return (
              <article key={role.title}>
                <Icon aria-hidden="true" />
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="action-process" aria-labelledby="volunteer-expect">
        <div className="action-container action-expect-layout">
          <div>
            <p className="action-eyebrow">WHAT TO EXPECT</p>
            <h2 id="volunteer-expect">Let’s get you started.</h2>
            <p>
              Our pantry is at {organization.address.full}.{' '}
              {organization.address.entry}
            </p>
            <p>
              <strong>Public pantry hours:</strong>
              <br />
              {organization.hours.days}, {organization.hours.time}.
            </p>
            <CtaLink
              href={organization.directions}
              variant="text"
              icon="external"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <span className="sr-only"> (opens in a new tab)</span>
            </CtaLink>
          </div>
          <ol className="action-application-steps">
            <li>
              <span aria-hidden="true">01</span>
              <div>
                <h3>Get the application</h3>
                <p>Download the one-page Volunteer/Intern Form below.</p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div>
                <h3>Tell us about yourself</h3>
                <p>
                  The form asks for your contact details, availability,
                  emergency contact, and signature. Read its background-check
                  and photo-consent statements before signing.
                </p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div>
                <h3>Arrange your next steps</h3>
                <p>
                  Call or email Project Starburst to confirm volunteer
                  availability and how to return your application.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section
        id="application"
        tabIndex={-1}
        className="action-application action-container"
        aria-labelledby="application-title"
      >
        <div className="action-application-card">
          <div className="action-document-icon">
            <FileText size={40} strokeWidth={1.4} aria-hidden="true" />
            <span>PDF</span>
          </div>
          <div>
            <p className="action-eyebrow">VOLUNTEER APPLICATION</p>
            <h2 id="application-title">Your first step is right here.</h2>
            <p>Download the original Volunteer/Intern Form to complete.</p>
            <p className="action-caption">
              1 page · PDF · {organization.volunteerApplication.size}
            </p>
            <div className="action-cta-row">
              <CtaLink
                href={organization.volunteerApplication.href}
                icon="download"
                download
              >
                Download Application (PDF)
              </CtaLink>
              <CtaLink
                href={organization.volunteerApplication.href}
                variant="text"
                icon="external"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Application
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </CtaLink>
            </div>
          </div>
        </div>
        <div className="action-application-notes">
          <p>
            <strong>Community service:</strong>{' '}
            {organization.volunteerApplication.communityService}
          </p>
          <p>
            <strong>Before you plan your visit:</strong> The application lists
            Monday–Friday hours. Please call to confirm volunteer availability;
            public pantry hours are {organization.hours.days},{' '}
            {organization.hours.time}.
          </p>
        </div>
      </section>

      <ActionClosing title="Have a question before volunteering?">
        <p>
          Give us a call or send an email. Thank you for helping build a
          stronger, more caring community.
        </p>
      </ActionClosing>
      <section
        className="action-other-support action-container"
        aria-labelledby="other-support"
      >
        <div>
          <p className="action-eyebrow">OTHER WAYS TO SUPPORT</p>
          <h2 id="other-support">Give in a way that works for you.</h2>
          <p>
            Food, hygiene products, essentials, and financial gifts all help
            support our neighbors.
          </p>
        </div>
        <div className="action-cta-row">
          <CtaLink href="/donate" variant="secondary">
            Donate
          </CtaLink>
          <CtaLink href="/donate#donate-goods" variant="text">
            Donate Goods
          </CtaLink>
        </div>
      </section>
      <div className="action-follow action-container">
        <CtaLink
          href={organization.facebook}
          variant="text"
          icon="external"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow Project Starburst on Facebook
          <span className="sr-only"> (opens in a new tab)</span>
        </CtaLink>
        <p>Updates on hours, events, and announcements.</p>
      </div>
    </main>
  );
}
