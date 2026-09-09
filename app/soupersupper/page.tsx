import { routeMetadata } from '@/lib/seo';
import Link from 'next/link';
import { PageHero, TextSection } from '@/components/page-parts';
import { FacebookBand } from '@/components/site-shell';
import { sponsorGroups } from '@/lib/sponsors';
export const metadata = {
  ...routeMetadata('/soupersupper'),
  title: 'Souper Supper',
};
export default function Page() {
  return (
    <main id="main" className="souper-page">
      <PageHero
        className="souper-hero"
        title={
          <>
            Souper
            <br />
            Supper
          </>
        }
        image="/assets/ffdbc4_f004ba0a544b4eb281308e182dfb9c7f~mv2.jpg"
        alt="A warm bowl of soup"
      >
        <p className="annual">8th Annual</p>
        <p className="warm-hearts">Warm Hearts ❤️ Warm Bowls</p>
      </PageHero>
      <section className="sponsor-section title-sponsor">
        <h2>Title Sponsor</h2>
        <p>
          Proudly supporting the Souper Supper and our mission to serve the
          community.
        </p>
        <a
          className="title-sponsor-card"
          href="https://northlandglobalmethodist.org/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/assets/ffdbc4_ca8960ef9fb6400ebc9ac020c9216faf~mv2.png"
            alt="Northland Global Methodist"
            width="318"
            height="90"
          />
          <span>Visit Northland Global Ministries →</span>
        </a>
      </section>
      <article className="event-card">
        <img
          src="/assets/ffdbc4_0d10ec1fcadd4c29927bd1aa8ffe672f~mv2.jpg"
          alt="8th Annual Project Starburst Souper Supper"
          width="582"
          height="498"
        />
        <div>
          <h2>Souper Supper</h2>
          <p>Mar 25, 2026, 11:00 AM – 3:00 PM</p>
          <p>
            Three Girls Bakery, 106 N Michigan Ave, Big Rapids, MI 49307, USA
          </p>
          <p className="spaced">
            This event is a fundraiser for Project Starburst. Your ticket
            includes a bowl of soup from the selection you choose at the event.
            Proceeds from ticket sales support Project Starburst and help
            further their mission of serving our community.
          </p>
          <Link className="pill" href="/event-details/souper-supper">
            Details
          </Link>
        </div>
      </article>
      <TextSection title="About the Souper Supper" className="event-about">
        <p>
          The 8th Annual Souper Supper – Warm Bowls, Warm Hearts is Project
          Starburst’s signature community fundraiser, bringing neighbors
          together over a warm meal to support individuals and families facing
          food insecurity and other essential needs. The event takes place on
          Wednesday, March 25, 2026, from 11:00 a.m. to 3:00 p.m. at Three Girls
          Bakery, 106 N. Michigan Avenue in downtown Big Rapids. All proceeds
          directly benefit Project Starburst programs serving Mecosta and
          Osceola counties. Tickets can be purchased online or in person
          starting February 9, 2026, at Three Girls Bakery (106 N. Michigan
          Ave.) or Project Starburst (120 S. State Street, Big Rapids).
        </p>
      </TextSection>
      {sponsorGroups.map((group) => (
        <section
          key={group.title}
          className={
            'sponsor-section ' +
            (group.title === 'Donor Sponsor' ? 'donor-sponsors' : '')
          }
        >
          <h2>{group.title}</h2>
          <p>
            Proudly supporting the Souper Supper and our mission to serve the
            community.
          </p>
          <div className="sponsor-grid">
            {group.sponsors.map((s) => (
              <article className="sponsor-card" key={s.name}>
                <div className="sponsor-image">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    width="170"
                    height="155"
                  />
                </div>
                <h3>{s.name}</h3>
                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={'Visit ' + s.name}
                  >
                    Visit Sponsor →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
      <FacebookBand />
    </main>
  );
}
