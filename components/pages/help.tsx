import { ContentText } from '@/components/content/fields';
import { organization } from '@/lib/organization';
import { CtaLink } from '@/components/cta';
import {
  ActionHero,
  PantryDetails,
  ActionClosing,
} from '@/components/action-page';
import { ShoppingBasket, HandHeart, MessagesSquare } from 'lucide-react';
export default function Page() {
  return (
    <main id="main" className="action-page action-help">
      <ActionHero
        eyebrow={<ContentText fieldId="help.hero.get-help" />}
        title={
          <>
            <ContentText fieldId="help.hero.a-little-help" />
            <br />
            <ContentText fieldId="help.hero.a-caring-neighbor" />
          </>
        }
        description={
          'If you’re going through a difficult time, you don’t have to face it alone. Project Starburst provides food, personal hygiene items, and essential support to neighbors in ' +
          organization.counties +
          '.'
        }
        image="/assets/11062b_5cd7c9c0244b499b99410156d56c7d4f~mv2.jpg"
        alt="A box of groceries being handed to a neighbor"
        caption={
          <ContentText fieldId="help.hero.here-for-our-neighbors-with-dignity" />
        }
        imageField="help.hero.image"
        altField="help.hero.image.alt"
      >
        <CtaLink href="#hours-location">
          <ContentText fieldId="help.hero.view-hours-location" />
        </CtaLink>
        <CtaLink href={organization.phone.href} variant="text" icon="phone">
          <ContentText fieldId="help.hero.call" />
          <ContentText fieldId="shared.phone.display" />
        </CtaLink>
      </ActionHero>

      <div className="action-visit-strip">
        <div className="action-container">
          <p>
            <strong>
              <ContentText fieldId="help.content.visit-the-pantry" />
            </strong>
            <span>
              <ContentText fieldId="shared.address.full" />
            </span>
          </p>
          <p>
            <strong>
              <ContentText fieldId="shared.hours.days" />
            </strong>
            <span>
              <ContentText fieldId="shared.hours.time" />
            </span>
          </p>
        </div>
      </div>

      <section
        className="action-section action-container"
        aria-labelledby="help-available"
      >
        <div className="action-section-heading">
          <p className="action-eyebrow">
            <ContentText fieldId="help.action-section-action-container.support-close-to-home" />
          </p>
          <h2 id="help-available">
            <ContentText fieldId="help.action-section-action-container.help-with-the-essentials" />
          </h2>
          <p>
            <ContentText fieldId="help.action-section-action-container.food-on-the-table-everyday-necessities" />
          </p>
        </div>
        <div className="action-service-grid">
          <article>
            <ShoppingBasket aria-hidden="true" />
            <h3>
              <ContentText fieldId="help.action-section-action-container.monthly-groceries" />
            </h3>
            <p>
              <ContentText fieldId="help.action-section-action-container.groceries-for-families-and-individuals-pac" />
            </p>
          </article>
          <article>
            <HandHeart aria-hidden="true" />
            <h3>
              <ContentText fieldId="help.action-section-action-container.hygiene-basic-needs" />
            </h3>
            <p>
              <ContentText fieldId="help.action-section-action-container.personal-hygiene-items-donated-bombas-sock" />
            </p>
          </article>
          <article>
            <MessagesSquare aria-hidden="true" />
            <h3>
              <ContentText fieldId="help.action-section-action-container.a-connection-to-support" />
            </h3>
            <p>
              <ContentText fieldId="help.action-section-action-container.individual-case-management-and-referrals-t" />
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
            <p className="action-eyebrow">
              <ContentText fieldId="help.how-it-works.your-first-visit" />
            </p>
            <h2 id="help-process">
              <ContentText fieldId="help.how-it-works.start-by-coming-in" />
            </h2>
            <p>
              <ContentText fieldId="help.how-it-works.registration-happens-in-person-our-team" />
            </p>
          </div>
          <ol className="action-steps">
            <li>
              <span className="action-step-number" aria-hidden="true">
                01
              </span>
              <h3>
                <ContentText fieldId="help.how-it-works.register-in-person" />
              </h3>
              <p>
                <ContentText fieldId="help.how-it-works.visit-the-pantry-and-fill-out" />
              </p>
            </li>
            <li>
              <span className="action-step-number" aria-hidden="true">
                02
              </span>
              <h3>
                <ContentText fieldId="help.how-it-works.groceries-for-your-household" />
              </h3>
              <p>
                <ContentText fieldId="help.how-it-works.once-you-re-registered-volunteers-pack-you" />
              </p>
            </li>
            <li>
              <span className="action-step-number" aria-hidden="true">
                03
              </span>
              <h3>
                <ContentText fieldId="help.how-it-works.pick-up-head-home" />
              </h3>
              <p>
                <ContentText fieldId="help.how-it-works.your-groceries-are-placed-in-a" />
              </p>
            </li>
          </ol>
        </div>
      </section>

      <PantryDetails />
      <ActionClosing
        title={
          <ContentText fieldId="help.not-sure-where-to-start.not-sure-where-to-start" />
        }
      >
        <p>
          <ContentText fieldId="help.not-sure-where-to-start.call-during-pantry-hours-or-send" />
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
          <ContentText fieldId="help.content.follow-project-starburst-on-facebook" />
          <span className="sr-only">
            <ContentText fieldId="help.content.opens-in-a-new-tab" />
          </span>
        </CtaLink>
        <p>
          <ContentText fieldId="help.content.updates-on-hours-events-and-announcements" />
        </p>
      </div>
    </main>
  );
}
