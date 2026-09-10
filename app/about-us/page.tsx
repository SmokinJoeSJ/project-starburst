import { routeMetadata } from '@/lib/seo';
import { organization, people, starburstPhotos } from '@/lib/organization';
import { CtaLink } from '@/components/cta';
import {
  SectionHeading,
  StarburstAccent,
  SupportClosing,
} from '@/components/starburst';

export const metadata = {
  ...routeMetadata('/about-us'),
  title: 'About Project Starburst',
  description:
    'Meet Project Starburst, a community food and basic-needs pantry serving Mecosta and Osceola counties from Big Rapids since 1971.',
};
export default function AboutPage() {
  const photo = starburstPhotos.community;
  return (
    <main id="main" className="starburst-page about-page">
      <section className="about-intro sb-shell" aria-labelledby="about-title">
        <div>
          <p className="sb-eyebrow">ABOUT PROJECT STARBURST</p>
          <h1 id="about-title">
            Neighbors
            <br />
            helping neighbors.
          </h1>
        </div>
        <div className="about-intro-copy">
          <p>
            Food, everyday essentials, and a little support when life gets
            difficult. Project Starburst is here for people in{' '}
            {organization.counties}.
          </p>
          <div className="sb-cta-row">
            <CtaLink href="/get-help">Get Help</CtaLink>
            <CtaLink href="/donate" variant="text">
              Donate
            </CtaLink>
          </div>
        </div>
      </section>
      <div className="about-photo sb-shell">
        <img
          className="sb-photo"
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
        />
      </div>

      <section
        className="sb-section sb-shell about-story"
        aria-labelledby="story-title"
      >
        <div className="about-since">
          <StarburstAccent />
          <span>HERE FOR OUR NEIGHBORS SINCE</span>
          <strong>{organization.founded}</strong>
        </div>
        <div>
          <SectionHeading
            id="story-title"
            eyebrow="OUR STORY"
            title={
              <>
                A local pantry.
                <br />A shared purpose.
              </>
            }
          >
            <p>
              Project Starburst began in {organization.founded} with a purpose
              that still guides our work: helping neighbors meet their food and
              basic needs with dignity and respect.
            </p>
            <p>
              Based in Big Rapids, we bring together donors, volunteers, and
              community partners to support individuals and families facing
              hardship. It’s practical help, offered with care.
            </p>
          </SectionHeading>
          <CtaLink href="/contact" variant="text">
            Contact Project Starburst
          </CtaLink>
        </div>
      </section>

      <section
        className="sb-section sb-section--paper"
        aria-labelledby="about-services"
      >
        <div className="sb-shell about-services">
          <div>
            <SectionHeading
              id="about-services"
              eyebrow="WHAT WE DO"
              title="Support for everyday life."
            >
              <p>
                Food is the starting point. Our work also includes personal care
                items and connections to other local support.
              </p>
            </SectionHeading>
            <CtaLink href="/get-help" variant="secondary">
              See How to Get Help
            </CtaLink>
          </div>
          <dl className="sb-service-list">
            <div>
              <dt>Monthly groceries</dt>
              <dd>Food prepared for a household’s size and dietary needs.</dd>
            </div>
            <div>
              <dt>Hygiene &amp; basic needs</dt>
              <dd>
                Personal care items, donated Bombas socks, and a diaper bank for
                qualified children. Please call ahead about the diaper bank.
              </dd>
            </div>
            <div>
              <dt>Connections to support</dt>
              <dd>
                Individual case management and referrals to local agencies. Find
                the practical details on our Get Help page.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="sb-section sb-shell about-people"
        aria-labelledby="people-title"
      >
        <SectionHeading
          id="people-title"
          eyebrow="THE PEOPLE BEHIND THE PANTRY"
          title="A community effort."
        >
          <p>
            Our staff, board, and volunteers work together to keep this
            neighborly resource here for the community.
          </p>
        </SectionHeading>
        <div className="about-people-grid">
          <div>
            <h3>Our staff</h3>
            <ul className="sb-people-list sb-staff-list">
              {people.staff.map((person) => (
                <li key={person.name}>
                  <strong>{person.name}</strong>
                  <span>{person.title}</span>
                </li>
              ))}
            </ul>
            <CtaLink href={organization.emailHref} variant="text" icon="email">
              Email the Pantry
            </CtaLink>
          </div>
          <div>
            <h3>Board of directors</h3>
            <ul className="sb-people-list sb-board-list">
              {people.board.map((person) => (
                <li key={person.name}>
                  <strong>{person.name}</strong>
                  {person.title && <span>{person.title}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="about-volunteer-note">
          <p>There’s a place for your time and care, too.</p>
          <CtaLink href="/volunteer" variant="text">
            Explore Volunteering
          </CtaLink>
        </div>
      </section>

      <section className="sb-policy sb-shell" aria-labelledby="policy-title">
        <div>
          <h2 id="policy-title">Everyone deserves dignity.</h2>
          <p>
            We’re committed to providing equal access and opportunity for all.
          </p>
        </div>
        <CtaLink
          href="/documents/non-discrimination-statement.pdf"
          variant="text"
          icon="external"
          target="_blank"
          rel="noopener noreferrer"
        >
          Non-Discrimination Statement (PDF)
          <span className="sr-only"> (opens in a new tab)</span>
        </CtaLink>
      </section>
      <SupportClosing />
    </main>
  );
}
