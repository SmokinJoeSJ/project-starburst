import { routeMetadata } from '@/lib/seo';
import {
  organization,
  acceptedGoods,
  reportedImpact,
} from '@/lib/organization';
import { CtaLink } from '@/components/cta';
import {
  ActionHero,
  PantryDetails,
  ActionClosing,
} from '@/components/action-page';
import { DonationForm } from '@/components/donation-form';
import { ShoppingBasket, Droplets, Baby, Package } from 'lucide-react';

export const metadata = {
  ...routeMetadata('/donate'),
  title: 'Donate',
  description:
    'Support Project Starburst with a donation of food, hygiene products, or funds. Find donation options and drop-off hours at our Big Rapids pantry.',
};
const goodsIcons = [ShoppingBasket, Droplets, Baby, Package];
export default function Page() {
  return (
    <main id="main" className="action-page action-donate">
      <ActionHero
        eyebrow="DONATE"
        title={
          <>
            Help keep the
            <br />
            pantry stocked.
          </>
        }
        description={
          'Food, hygiene products, and everyday essentials. Your generosity helps neighbors in ' +
          organization.counties +
          ' get through difficult times.'
        }
        image="/assets/11062b_e2da2b9b2d074ff8ab9a452d009d5c7f~mv2.jpg"
        alt="Volunteers handing donated supplies to people at a collection table"
        caption="From one neighbor to another. Every contribution matters."
      >
        <CtaLink href="#donation">Donate Online</CtaLink>
        <CtaLink href="#donate-goods" variant="secondary">
          Donate Goods
        </CtaLink>
      </ActionHero>

      <section
        className="action-donation-layout action-container"
        aria-labelledby="giving-intro"
      >
        <div className="action-donation-intro">
          <p className="action-eyebrow">GIVE CLOSE TO HOME</p>
          <h2 id="giving-intro">
            Your gift.
            <br />
            Your community.
          </h2>
          <p>
            Your support keeps our pantry stocked with food and essential
            supplies for families in need.
          </p>
          <p>{organization.localGivingStatement}</p>
          <img
            src="/assets/ffdbc4_8ae35597893b416c8dd1e74db2f2b23e~mv2.png"
            alt="From one neighbor to another — support your local food pantry"
            width="168"
            height="108"
            loading="lazy"
          />
        </div>
        <DonationForm />
      </section>

      <section
        id="donate-goods"
        tabIndex={-1}
        className="action-process"
        aria-labelledby="goods-title"
      >
        <div className="action-container">
          <div className="action-section-heading">
            <p className="action-eyebrow">DONATE GOODS</p>
            <h2 id="goods-title">
              Everyday items.
              <br />
              An everyday difference.
            </h2>
            <p>
              Help stock the pantry with non-perishable food and personal care
              items. These are the items we accept.
            </p>
          </div>
          <ul className="action-goods-grid">
            {acceptedGoods.map((group, index) => {
              const Icon = goodsIcons[index];
              return (
                <li key={group.title}>
                  <Icon aria-hidden="true" />
                  <h3>{group.title}</h3>
                  <p>{group.items}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <PantryDetails id="drop-off" title="Bring your donation by." dropOff />

      <section
        className="action-other-giving action-container"
        aria-labelledby="other-giving"
      >
        <div className="action-section-heading">
          <p className="action-eyebrow">OTHER WAYS TO GIVE</p>
          <h2 id="other-giving">Make your support go further.</h2>
        </div>
        <div className="action-service-grid">
          <article>
            <h3>Employer matching</h3>
            <p>Check whether your employer will match your donation.</p>
          </article>
          <article>
            <h3>Fundraise for Starburst</h3>
            <p>
              Start a fundraiser to help support the pantry and our neighbors.
            </p>
          </article>
          <article>
            <h3>Planned giving</h3>
            <p>Leave a lasting impact through a legacy gift.</p>
          </article>
        </div>
        <CtaLink href="/contact" variant="text">
          Contact Project Starburst
        </CtaLink>
      </section>

      <section className="action-impact-band" aria-labelledby="giving-impact">
        <div className="action-container">
          <div>
            <p className="action-eyebrow">YOUR SUPPORT IN ACTION</p>
            <h2 id="giving-impact">Neighbors make this possible.</h2>
            <p>Thank you for helping provide food and support close to home.</p>
          </div>
          <div>
            <dl className="action-reported-stats">
              <div>
                <dt>Total meals provided</dt>
                <dd>{reportedImpact.mealsWithPlus}</dd>
              </div>
              <div>
                <dt>Families fed</dt>
                <dd>{reportedImpact.families}</dd>
              </div>
              <div>
                <dt>Clients assisted</dt>
                <dd>{reportedImpact.clients}</dd>
              </div>
            </dl>
            <p className="action-caption">
              Previously reported by Project Starburst. A reporting year was not
              specified.
            </p>
          </div>
        </div>
      </section>
      <section
        className="action-tax-note action-container"
        aria-labelledby="organization-note"
      >
        <h2 id="organization-note">Thank you for your support.</h2>
        <p>{organization.taxStatement}</p>
      </section>
      <ActionClosing title="Have a question about giving?">
        <p>We’d be glad to help you find a way to support the pantry.</p>
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
      </div>
    </main>
  );
}
