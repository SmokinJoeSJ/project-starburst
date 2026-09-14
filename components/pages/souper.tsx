import { ContentText, ContentImage } from '@/components/content/fields';
import Link from 'next/link';
import { PageHero, TextSection } from '@/components/page-parts';
import { FacebookBand } from '@/components/site-shell';
import { sponsorGroups } from '@/lib/sponsors';
export default function Page() {
  return (
    <main id="main" className="souper-page">
      <PageHero
        className="souper-hero"
        title={
          <>
            <ContentText fieldId="souper.souper-hero.souper" />
            <br />
            <ContentText fieldId="souper.souper-hero.supper" />
          </>
        }
        image="/assets/ffdbc4_f004ba0a544b4eb281308e182dfb9c7f~mv2.jpg"
        alt="A warm bowl of soup"
        imageField="souper.souper-hero.image"
        altField="souper.souper-hero.image.alt"
      >
        <p className="annual">
          <ContentText fieldId="souper.souper-hero.8th-annual" />
        </p>
        <p className="warm-hearts">
          <ContentText fieldId="souper.souper-hero.warm-hearts-warm-bowls" />
        </p>
      </PageHero>
      <section className="sponsor-section title-sponsor">
        <h2>
          <ContentText fieldId="souper.sponsor-section-title-sponsor.title-sponsor" />
        </h2>
        <p>
          <ContentText fieldId="souper.sponsor-section-title-sponsor.proudly-supporting-the-souper-supper-and" />
        </p>
        <a
          className="title-sponsor-card"
          href="https://northlandglobalmethodist.org/"
          target="_blank"
          rel="noreferrer"
        >
          <ContentImage
            src="/assets/ffdbc4_ca8960ef9fb6400ebc9ac020c9216faf~mv2.png"
            alt="Northland Global Methodist"
            width="318"
            height="90"
            imageField="souper.sponsor-section-title-sponsor.image"
            altField="souper.sponsor-section-title-sponsor.image.alt"
          />
          <span>
            <ContentText fieldId="souper.sponsor-section-title-sponsor.visit-northland-global-ministries" />
          </span>
        </a>
      </section>
      <article className="event-card">
        <ContentImage
          src="/assets/ffdbc4_0d10ec1fcadd4c29927bd1aa8ffe672f~mv2.jpg"
          alt="8th Annual Project Starburst Souper Supper"
          width="582"
          height="498"
          imageField="souper.content.image"
          altField="souper.content.image.alt"
        />
        <div>
          <h2>
            <ContentText fieldId="souper.content.souper-supper" />
          </h2>
          <p>
            <ContentText fieldId="souper.content.mar-25-2026-11-00-am" />
          </p>
          <p>
            <ContentText fieldId="souper.content.three-girls-bakery-106-n-michigan" />
          </p>
          <p className="spaced">
            <ContentText fieldId="souper.content.this-event-is-a-fundraiser-for" />
          </p>
          <Link className="pill" href="/event-details/souper-supper">
            <ContentText fieldId="souper.content.details" />
          </Link>
        </div>
      </article>
      <TextSection
        title={
          <ContentText fieldId="souper.about-the-souper-supper.about-the-souper-supper" />
        }
        className="event-about"
      >
        <p>
          <ContentText fieldId="souper.about-the-souper-supper.the-8th-annual-souper-supper" />
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
            <ContentText fieldId="souper.content.proudly-supporting-the-souper-supper-and" />
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
                    <ContentText fieldId="souper.content.visit-sponsor" />
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
