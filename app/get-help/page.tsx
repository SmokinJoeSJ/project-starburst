import { routeMetadata } from '@/lib/seo';
import { organization } from '@/lib/organization';
import { CtaLink } from '@/components/cta';
import {
  ActionHero,
  PantryDetails,
  ActionClosing,
} from '@/components/action-page';
import { ShoppingBasket, HandHeart, MessagesSquare } from 'lucide-react';

export const metadata = {
  ...routeMetadata('/get-help'),
  title: 'Get Help',
  description:
    'Find food and basic-needs support in Mecosta and Osceola counties. See Project Starburst’s Big Rapids pantry hours, location, and in-person grocery process.',
};

export default function Page() {
  return (
    <main id="main" className="action-page action-help">
      <ActionHero
        eyebrow="GET HELP"
        title={
          <>
            A little help.
            <br />A caring neighbor.
          </>
        }
        description={
          'If you’re going through a difficult time, you don’t have to face it alone. Project Starburst provides food, personal hygiene items, and essential support to neighbors in ' +
          organization.counties +
          '.'
        }
        image="/assets/11062b_5cd7c9c0244b499b99410156d56c7d4f~mv2.jpg"
        alt="A box of groceries being handed to a neighbor"
        caption="Here for our neighbors. With dignity, respect, and compassion."
      >
        <CtaLink href="#hours-location">View Hours &amp; Location</CtaLink>
        <CtaLink href={organization.phone.href} variant="text" icon="phone">
          Call {organization.phone.display}
        </CtaLink>
      </ActionHero>

      <div className="action-visit-strip">
        <div className="action-container">
          <p>
            <strong>Visit the pantry</strong>
            <span>{organization.address.full}</span>
          </p>
          <p>
            <strong>{organization.hours.days}</strong>
            <span>{organization.hours.time}</span>
          </p>
        </div>
      </div>

      <section
        className="action-section action-container"
        aria-labelledby="help-available"
      >
        <div className="action-section-heading">
          <p className="action-eyebrow">SUPPORT CLOSE TO HOME</p>
          <h2 id="help-available">Help with the essentials.</h2>
          <p>
            Food on the table. Everyday necessities. A place to turn when you
            need support.
          </p>
        </div>
        <div className="action-service-grid">
          <article>
            <ShoppingBasket aria-hidden="true" />
            <h3>Monthly groceries</h3>
            <p>
              Groceries for families and individuals, packed for your household
              size and dietary needs after a brief intake form.
            </p>
          </article>
          <article>
            <HandHeart aria-hidden="true" />
            <h3>Hygiene &amp; basic needs</h3>
            <p>
              Personal hygiene items, donated Bombas socks, and a diaper bank
              for qualified children. Please call ahead about the diaper bank.
            </p>
          </article>
          <article>
            <MessagesSquare aria-hidden="true" />
            <h3>A connection to support</h3>
            <p>
              Individual case management and referrals to local agencies,
              including Mid Michigan Community Action Center, Michigan Works,
              and Michigan Department of Health &amp; Human Services.
            </p>
          </article>
        </div>
      </section>

      <section
        id="how-it-works"
        tabIndex={-1}
        className="action-process"
        aria-labelledby="help-process"
      >
        <div className="action-container">
          <div className="action-section-heading">
            <p className="action-eyebrow">YOUR FIRST VISIT</p>
            <h2 id="help-process">Start by coming in.</h2>
            <p>
              Registration happens in person. Our team will help you through the
              next steps.
            </p>
          </div>
          <ol className="action-steps">
            <li>
              <span className="action-step-number" aria-hidden="true">
                01
              </span>
              <h3>Register in person</h3>
              <p>
                Visit the pantry and fill out an intake form. Our team enters
                your information into our computer system so we can meet your
                needs.
              </p>
            </li>
            <li>
              <span className="action-step-number" aria-hidden="true">
                02
              </span>
              <h3>Groceries for your household</h3>
              <p>
                Once you’re registered, volunteers pack your groceries based on
                your family size and dietary needs.
              </p>
            </li>
            <li>
              <span className="action-step-number" aria-hidden="true">
                03
              </span>
              <h3>Pick up &amp; head home</h3>
              <p>
                Your groceries are placed in a wagon to take to your vehicle.
                After unloading, please return the wagon inside for the next
                family.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <PantryDetails />
      <ActionClosing title="Not sure where to start?">
        <p>
          Call during pantry hours or send us an email. We’re here to answer
          your questions.
        </p>
      </ActionClosing>
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
