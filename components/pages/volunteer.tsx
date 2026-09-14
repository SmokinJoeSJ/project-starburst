import { ContentText } from '@/components/content/fields';
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
        eyebrow={<ContentText fieldId="volunteer.hero.volunteer" />}
        title={
          <>
            <ContentText fieldId="volunteer.hero.give-your-time" />
            <br />
            <ContentText fieldId="volunteer.hero.help-your-neighbors" />
          </>
        }
        description={
          'Distribute food, organize donations, or help with events. Your time helps families in ' +
          organization.counties +
          ' get the support they need.'
        }
        image="/assets/1691a921dfec4d4f8637b1c7ffa2528a.jpg"
        alt="Volunteers working together to sort donated food"
        caption={
          <ContentText fieldId="volunteer.hero.there-s-more-than-one-way-to" />
        }
        imageField="volunteer.hero.image"
        altField="volunteer.hero.image.alt"
      >
        <CtaLink
          href={organization.volunteerApplication.href}
          icon="download"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ContentText fieldId="volunteer.hero.apply-to-volunteer" />
          <span className="sr-only">
            <ContentText fieldId="volunteer.hero.pdf-opens-in-a-new" />
          </span>
        </CtaLink>
        <CtaLink href="/contact" variant="secondary">
          <ContentText fieldId="volunteer.hero.contact-us" />
        </CtaLink>
      </ActionHero>

      <section
        className="action-section action-container action-volunteer-roles"
        aria-labelledby="volunteer-roles"
      >
        <div className="action-section-heading">
          <p className="action-eyebrow">
            <ContentText fieldId="volunteer.action-section-action-container-action-vol.find-your-way-to-help" />
          </p>
          <h2 id="volunteer-roles">
            <ContentText
              fieldId="volunteer.action-section-action-container-action-vol.good-people-meaningful-work"
              breakClass=""
            />
          </h2>
          <p>
            <ContentText fieldId="volunteer.action-section-action-container-action-vol.whether-you-re-coming-on-your-own" />
          </p>
        </div>
        <div className="action-role-grid">
          {volunteerOpportunities.map((role) => {
            const Icon = roleIcons[role.icon];
            return (
              <article key={role.id}>
                <Icon aria-hidden="true" />
                <h3>
                  <ContentText fieldId={role.titleField} />
                </h3>
                <p>
                  <ContentText fieldId={role.descriptionField} />
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="action-process" aria-labelledby="volunteer-expect">
        <div className="action-container action-expect-layout">
          <div>
            <p className="action-eyebrow">
              <ContentText fieldId="volunteer.action-process.what-to-expect" />
            </p>
            <h2 id="volunteer-expect">
              <ContentText fieldId="volunteer.action-process.let-s-get-you-started" />
            </h2>
            <p>
              <ContentText fieldId="volunteer.action-process.our-pantry-is-at" />
              <ContentText fieldId="shared.address.full" />.{' '}
              <ContentText fieldId="shared.address.entry" />
            </p>
            <p>
              <strong>
                <ContentText fieldId="volunteer.action-process.public-pantry-hours" />
              </strong>
              <br />
              <ContentText fieldId="shared.hours.days" />,{' '}
              <ContentText fieldId="shared.hours.time" />.
            </p>
            <CtaLink
              href={organization.directions}
              variant="text"
              icon="external"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContentText fieldId="volunteer.action-process.get-directions" />
              <span className="sr-only">
                <ContentText fieldId="volunteer.action-process.opens-in-a-new-tab" />
              </span>
            </CtaLink>
          </div>
          <ol className="action-application-steps">
            <li>
              <span aria-hidden="true">01</span>
              <div>
                <h3>
                  <ContentText fieldId="volunteer.action-process.get-the-application" />
                </h3>
                <p>
                  <ContentText fieldId="volunteer.action-process.download-the-one-page-volunteer-intern-for" />
                </p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div>
                <h3>
                  <ContentText fieldId="volunteer.action-process.tell-us-about-yourself" />
                </h3>
                <p>
                  <ContentText fieldId="volunteer.action-process.the-form-asks-for-your-contact" />
                </p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div>
                <h3>
                  <ContentText fieldId="volunteer.action-process.arrange-your-next-steps" />
                </h3>
                <p>
                  <ContentText fieldId="volunteer.action-process.call-or-email-project-starburst-to" />
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
            <p className="action-eyebrow">
              <ContentText fieldId="volunteer.application.volunteer-application" />
            </p>
            <h2 id="application-title">
              <ContentText fieldId="volunteer.application.your-first-step-is-right-here" />
            </h2>
            <p>
              <ContentText fieldId="volunteer.application.download-the-original-volunteer-intern-for" />
            </p>
            <p className="action-caption">
              <ContentText fieldId="volunteer.application.1-page-pdf" />
              <ContentText fieldId="shared.volunteer-application.size" />
            </p>
            <div className="action-cta-row">
              <CtaLink
                href={organization.volunteerApplication.href}
                icon="download"
                download
              >
                <ContentText fieldId="volunteer.application.download-application-pdf" />
              </CtaLink>
              <CtaLink
                href={organization.volunteerApplication.href}
                variant="text"
                icon="external"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ContentText fieldId="volunteer.application.view-application" />
                <span className="sr-only">
                  <ContentText fieldId="volunteer.application.pdf-opens-in-a-new-tab" />
                </span>
              </CtaLink>
            </div>
          </div>
        </div>
        <div className="action-application-notes">
          <p>
            <strong>
              <ContentText fieldId="volunteer.application.community-service" />
            </strong>{' '}
            <ContentText fieldId="shared.volunteer-application.community-service" />
          </p>
          <p>
            <strong>
              <ContentText fieldId="volunteer.application.before-you-plan-your-visit" />
            </strong>
            <ContentText fieldId="volunteer.application.the-application-lists-monday-friday-hours-" />
            <ContentText fieldId="shared.hours.days" />,{' '}
            <ContentText fieldId="shared.hours.time" />.
          </p>
        </div>
      </section>

      <ActionClosing
        title={
          <ContentText fieldId="volunteer.have-a-question-before-volunteering.have-a-question-before-volunteering" />
        }
      >
        <p>
          <ContentText fieldId="volunteer.have-a-question-before-volunteering.give-us-a-call-or-send" />
        </p>
      </ActionClosing>
      <section
        className="action-other-support action-container"
        aria-labelledby="other-support"
      >
        <div>
          <p className="action-eyebrow">
            <ContentText fieldId="volunteer.action-other-support-action-container.other-ways-to-support" />
          </p>
          <h2 id="other-support">
            <ContentText fieldId="volunteer.action-other-support-action-container.give-in-a-way-that-works" />
          </h2>
          <p>
            <ContentText fieldId="volunteer.action-other-support-action-container.food-hygiene-products-essentials-and-finan" />
          </p>
        </div>
        <div className="action-cta-row">
          <CtaLink href="/donate" variant="secondary">
            <ContentText fieldId="volunteer.action-other-support-action-container.donate" />
          </CtaLink>
          <CtaLink href="/donate#donate-goods" variant="text">
            <ContentText fieldId="volunteer.action-other-support-action-container.donate-goods" />
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
          <ContentText fieldId="volunteer.content.follow-project-starburst-on-facebook" />
          <span className="sr-only">
            <ContentText fieldId="volunteer.content.opens-in-a-new-tab" />
          </span>
        </CtaLink>
        <p>
          <ContentText fieldId="volunteer.content.updates-on-hours-events-and-announcements" />
        </p>
      </div>
    </main>
  );
}
