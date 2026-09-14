import { ContentText, ContentImage } from '@/components/content/fields';
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
const goodsIcons = [ShoppingBasket, Droplets, Baby, Package];
export default function Page({
  link = '',
  preview = true,
}: {
  link?: string;
  preview?: boolean;
} = {}) {
  return (
    <main id="main" className="action-page action-donate">
      <ActionHero
        eyebrow={<ContentText fieldId="donate.hero.donate" />}
        title={
          <>
            <ContentText fieldId="donate.hero.help-keep-the" />
            <br />
            <ContentText fieldId="donate.hero.pantry-stocked" />
          </>
        }
        description={
          'Food, hygiene products, and everyday essentials. Your generosity helps neighbors in ' +
          organization.counties +
          ' get through difficult times.'
        }
        image="/assets/11062b_e2da2b9b2d074ff8ab9a452d009d5c7f~mv2.jpg"
        alt="Volunteers handing donated supplies to people at a collection table"
        caption={
          <ContentText fieldId="donate.hero.from-one-neighbor-to-another-every" />
        }
        imageField="donate.hero.image"
        altField="donate.hero.image.alt"
      >
        <CtaLink href="#donation">
          <ContentText fieldId="donate.hero.donate-online" />
        </CtaLink>
        <CtaLink href="#donate-goods" variant="secondary">
          <ContentText fieldId="donate.hero.donate-goods" />
        </CtaLink>
      </ActionHero>

      <section
        className="action-donation-layout action-container"
        aria-labelledby="giving-intro"
      >
        <div className="action-donation-intro">
          <p className="action-eyebrow">
            <ContentText fieldId="donate.action-donation-layout-action-container.give-close-to-home" />
          </p>
          <h2 id="giving-intro">
            <ContentText
              fieldId="donate.action-donation-layout-action-container.your-gift-your-community"
              breakClass=""
            />
          </h2>
          <p>
            <ContentText fieldId="donate.action-donation-layout-action-container.your-support-keeps-our-pantry-stocked" />
          </p>
          <p>
            <ContentText fieldId="shared.local-giving-statement" />
          </p>
          <ContentImage
            src="/assets/ffdbc4_8ae35597893b416c8dd1e74db2f2b23e~mv2.png"
            alt="From one neighbor to another — support your local food pantry"
            width="168"
            height="108"
            loading="lazy"
            imageField="donate.action-donation-layout-action-container.image"
            altField="donate.action-donation-layout-action-container.image.alt"
          />
        </div>
        <DonationForm link={link} preview={preview} />
      </section>

      <section
        id="donate-goods"
        tabIndex={-1}
        className="action-process"
        aria-labelledby="goods-title"
      >
        <div className="action-container">
          <div className="action-section-heading">
            <p className="action-eyebrow">
              <ContentText fieldId="donate.donate-goods.donate-goods" />
            </p>
            <h2 id="goods-title">
              <ContentText
                fieldId="donate.donate-goods.everyday-items-an-everyday-difference"
                breakClass=""
              />
            </h2>
            <p>
              <ContentText fieldId="donate.donate-goods.help-stock-the-pantry-with-non-perishable" />
            </p>
          </div>
          <ul className="action-goods-grid">
            {acceptedGoods.map((group, index) => {
              const Icon = goodsIcons[index];
              return (
                <li key={group.id}>
                  <Icon aria-hidden="true" />
                  <h3>
                    <ContentText fieldId={group.titleField} />
                  </h3>
                  <p>
                    <ContentText fieldId={group.itemsField} />
                  </p>
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
          <p className="action-eyebrow">
            <ContentText fieldId="donate.action-other-giving-action-container.other-ways-to-give" />
          </p>
          <h2 id="other-giving">
            <ContentText fieldId="donate.action-other-giving-action-container.make-your-support-go-further" />
          </h2>
        </div>
        <div className="action-service-grid">
          <article>
            <h3>
              <ContentText fieldId="donate.action-other-giving-action-container.employer-matching" />
            </h3>
            <p>
              <ContentText fieldId="donate.action-other-giving-action-container.check-whether-your-employer-will-match" />
            </p>
          </article>
          <article>
            <h3>
              <ContentText fieldId="donate.action-other-giving-action-container.fundraise-for-starburst" />
            </h3>
            <p>
              <ContentText fieldId="donate.action-other-giving-action-container.start-a-fundraiser-to-help-support" />
            </p>
          </article>
          <article>
            <h3>
              <ContentText fieldId="donate.action-other-giving-action-container.planned-giving" />
            </h3>
            <p>
              <ContentText fieldId="donate.action-other-giving-action-container.leave-a-lasting-impact-through-a" />
            </p>
          </article>
        </div>
        <CtaLink href="/contact" variant="text">
          <ContentText fieldId="donate.action-other-giving-action-container.contact-project-starburst" />
        </CtaLink>
      </section>

      <section className="action-impact-band" aria-labelledby="giving-impact">
        <div className="action-container">
          <div>
            <p className="action-eyebrow">
              <ContentText fieldId="donate.action-impact-band.your-support-in-action" />
            </p>
            <h2 id="giving-impact">
              <ContentText fieldId="donate.action-impact-band.neighbors-make-this-possible" />
            </h2>
            <p>
              <ContentText fieldId="donate.action-impact-band.thank-you-for-helping-provide-food" />
            </p>
          </div>
          <div>
            <dl className="action-reported-stats">
              <div>
                <dt>
                  <ContentText fieldId="donate.action-impact-band.total-meals-provided" />
                </dt>
                <dd>{reportedImpact.mealsWithPlus}</dd>
              </div>
              <div>
                <dt>
                  <ContentText fieldId="donate.action-impact-band.families-fed" />
                </dt>
                <dd>{reportedImpact.families}</dd>
              </div>
              <div>
                <dt>
                  <ContentText fieldId="donate.action-impact-band.clients-assisted" />
                </dt>
                <dd>{reportedImpact.clients}</dd>
              </div>
            </dl>
            <p className="action-caption">
              <ContentText fieldId="donate.action-impact-band.previously-reported-by-project-starburst-a" />
            </p>
          </div>
        </div>
      </section>
      <section
        className="action-tax-note action-container"
        aria-labelledby="organization-note"
      >
        <h2 id="organization-note">
          <ContentText fieldId="donate.action-tax-note-action-container.thank-you-for-your-support" />
        </h2>
        <p>
          <ContentText fieldId="shared.tax-statement" />
        </p>
      </section>
      <ActionClosing
        title={
          <ContentText fieldId="donate.have-a-question-about-giving.have-a-question-about-giving" />
        }
      >
        <p>
          <ContentText fieldId="donate.have-a-question-about-giving.we-d-be-glad-to-help-you" />
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
          <ContentText fieldId="donate.content.follow-project-starburst-on-facebook" />
          <span className="sr-only">
            <ContentText fieldId="donate.content.opens-in-a-new-tab" />
          </span>
        </CtaLink>
      </div>
    </main>
  );
}
