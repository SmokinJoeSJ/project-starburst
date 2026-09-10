import { routeMetadata } from '@/lib/seo';
import { organization, starburstPhotos } from '@/lib/organization';
import { CtaLink } from '@/components/cta';
import {
  SectionHeading,
  StarburstAccent,
  VisitSummary,
  PartnerMarks,
  SupportClosing,
} from '@/components/starburst';
import { Testimonials } from '@/components/testimonials';

export const metadata = {
  ...routeMetadata('/'),
  description:
    'Food, personal care, and basic-needs support for neighbors in Mecosta and Osceola counties. Find help, donate, or volunteer with Project Starburst in Big Rapids.',
};
export default function Home() {
  return (
    <main id="main" className="starburst-page home-page">
      <section className="home-front sb-shell" aria-labelledby="home-title">
        <div className="home-front-copy">
          <p className="sb-eyebrow">PROJECT STARBURST · BIG RAPIDS, MICHIGAN</p>
          <h1 id="home-title">
            Food on the table.
            <br />
            Care close to home.
          </h1>
          <p>
            Food, personal care items, and essential support for neighbors in{' '}
            {organization.counties} going through a difficult time.
          </p>
          <div className="sb-cta-row">
            <CtaLink href="/get-help">Get Help</CtaLink>
            <CtaLink href="/donate" variant="secondary">
              Donate
            </CtaLink>
          </div>
        </div>
        <figure className="home-front-photo">
          <img
            className="sb-photo"
            src={starburstPhotos.giving.src}
            alt={starburstPhotos.giving.alt}
            width={1920}
            height={1280}
            fetchPriority="high"
          />
          <figcaption>
            <StarburstAccent />
            <span>
              Neighbors helping neighbors.
              <br />
              <strong>Since {organization.founded}.</strong>
            </span>
          </figcaption>
        </figure>
      </section>
      <VisitSummary />

      <section
        className="sb-section sb-shell home-help"
        aria-labelledby="home-help-title"
      >
        <div className="home-help-intro">
          <SectionHeading
            id="home-help-title"
            eyebrow="WHEN YOU NEED A LITTLE SUPPORT"
            title="You don’t have to figure it out alone."
          />
          <div>
            <p>
              Start with Project Starburst. We help individuals and families
              with food and basic needs, with care and respect.
            </p>
            <CtaLink href="/get-help" variant="text">
              See How to Get Help
            </CtaLink>
          </div>
        </div>
        <div className="home-services">
          <article>
            <h3>Food for your household</h3>
            <p>
              Monthly groceries prepared for your household size and dietary
              needs.
            </p>
          </article>
          <article>
            <h3>Everyday essentials</h3>
            <p>
              Personal hygiene items and basic-needs support, including a diaper
              bank for qualified children.
            </p>
          </article>
          <article>
            <h3>A connection to support</h3>
            <p>
              Individual case management and referrals to other local agencies.
            </p>
          </article>
        </div>
      </section>

      <section
        className="sb-section sb-section--paper"
        aria-labelledby="home-story-title"
      >
        <div className="sb-shell home-story">
          <img
            className="sb-photo"
            src={starburstPhotos.volunteer.src}
            alt={starburstPhotos.volunteer.alt}
            width={1920}
            height={1280}
            loading="lazy"
          />
          <div>
            <SectionHeading
              id="home-story-title"
              eyebrow="ROOTED IN COMMUNITY"
              title="A pantry with people at its heart."
            >
              <p>
                Since {organization.founded}, Project Starburst has been a
                neighborly resource for {organization.counties}.
              </p>
              <p>
                Our work brings staff, volunteers, donors, and community
                partners together around a shared purpose: helping people meet
                everyday needs with dignity.
              </p>
            </SectionHeading>
            <CtaLink href="/about-us" variant="text">
              About Project Starburst
            </CtaLink>
          </div>
        </div>
      </section>

      <section
        className="sb-section sb-shell home-support"
        aria-labelledby="home-support-title"
      >
        <SectionHeading
          id="home-support-title"
          eyebrow="LEND A HAND"
          title="There’s more than one way to give."
        >
          <p>Every kind of support has a place here.</p>
        </SectionHeading>
        <ol className="home-support-list">
          <li>
            <span aria-hidden="true">01</span>
            <div>
              <h3>Make a donation</h3>
              <p>
                Help provide food, hygiene products, and essentials for your
                neighbors.
              </p>
            </div>
            <CtaLink href="/donate" variant="text">
              Donate
            </CtaLink>
          </li>
          <li>
            <span aria-hidden="true">02</span>
            <div>
              <h3>Bring pantry essentials</h3>
              <p>
                Find accepted food, toiletries, baby supplies, and household
                items.
              </p>
            </div>
            <CtaLink href="/donate#donate-goods" variant="text">
              Donate Goods
            </CtaLink>
          </li>
          <li>
            <span aria-hidden="true">03</span>
            <div>
              <h3>Share your time</h3>
              <p>Explore ways to help and find the volunteer application.</p>
            </div>
            <CtaLink href="/volunteer" variant="text">
              Volunteer
            </CtaLink>
          </li>
        </ol>
      </section>

      <section
        className="home-proof sb-section sb-section--cream"
        aria-labelledby="community-voices"
      >
        <div className="sb-shell home-proof-grid">
          <Testimonials />
          <aside className="home-partners">
            <h3>Community connections</h3>
            <p>
              We’re grateful for the neighbors, volunteers, and partners who
              support this work.
            </p>
            <PartnerMarks />
          </aside>
        </div>
      </section>
      <SupportClosing />
    </main>
  );
}
