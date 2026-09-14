import { ContentText, ContentImage } from '@/components/content/fields';
import { CtaLink } from '@/components/cta';
import { reportedImpact } from '@/lib/organization';
import { FacebookBand } from '@/components/site-shell';
import { Testimonials } from '@/components/testimonials';
export default function Home() {
  return (
    <main id="main">
      <section className="hero home-hero">
        <ContentImage
          className="hero-image"
          src="/assets/family.jpg"
          alt="Family enjoying time together"
          fetchPriority="high"
          imageField="home.hero-home-hero.image"
          altField="home.hero-home-hero.image.alt"
        />
        <div className="hero-shade" />
        <div className="home-hero-content">
          <h1>
            <ContentText fieldId="home.heading" breakClass="desktop-break" />
          </h1>
          <p>
            <ContentText fieldId="home.hero-home-hero.project-starburst-provides-food-personal-h" />
          </p>
          <div className="action-cta-row">
            <CtaLink href="/get-help">
              <ContentText fieldId="home.hero-home-hero.get-help" />
            </CtaLink>
            <CtaLink href="/about-us" variant="secondary">
              <ContentText fieldId="home.hero-home-hero.about-project-starburst" />
            </CtaLink>
          </div>
        </div>
      </section>
      <section className="impact section">
        <h2>
          <ContentText
            fieldId="home.impact-section.making-a-difference-in-our-community"
            breakClass=""
          />
        </h2>
        <div className="impact-grid">
          <div>
            <img src="/assets/icon-9.svg" alt="" width="170" height="155" />
            <h3>
              <ContentText fieldId="home.impact-section.community-driven-support-since" />
            </h3>
            <p>
              <ContentText fieldId="shared.founded" />
            </p>
          </div>
          <div>
            <img src="/assets/icon-10.svg" alt="" width="170" height="155" />
            <h3>{reportedImpact.individuals}</h3>
            <p>
              <ContentText
                fieldId="home.impact-section.individuals-served-annually"
                breakClass=""
              />
            </p>
          </div>
          <div>
            <img src="/assets/icon-11.svg" alt="" width="170" height="155" />
            <h3>{reportedImpact.mealsWithPlus}</h3>
            <p>
              <ContentText
                fieldId="home.impact-section.total-meals-provided-annually"
                breakClass=""
              />
            </p>
          </div>
        </div>
      </section>
      <section className="section help-section">
        <h2>
          <ContentText fieldId="home.section-help-section.how-we-help" />
        </h2>
        <div className="help-list">
          {[
            [
              '12',
              'Food Assistance',
              'We provide fresh and non-perishable food items to families in need. No one should go hungry.',
            ],
            [
              '13',
              'Emergency Support',
              'Beyond food, we help connect individuals with critical resources for housing, utilities, and other essentials.',
            ],
            [
              '14',
              'Community Outreach',
              'We work with local partners and volunteers to provide education, assistance, and a network of care.',
            ],
          ].map(([icon, title, copy]) => (
            <article key={title}>
              <img
                src={'/assets/icon-' + icon + '.svg'}
                alt=""
                width="72"
                height="90"
              />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Testimonials />
      <section className="section join-section">
        <h2>
          <ContentText fieldId="home.section-join-section.join-us-in-making-a-difference" />
        </h2>
        <p>
          <ContentText fieldId="home.section-join-section.every-contribution-helps-us-provide-food" />
        </p>
        <div className="button-row">
          <CtaLink href="/get-help">
            <ContentText fieldId="home.section-join-section.get-help" />
          </CtaLink>
          <CtaLink href="/donate" variant="secondary">
            <ContentText fieldId="home.section-join-section.donate" />
          </CtaLink>
          <CtaLink href="/volunteer" variant="secondary">
            <ContentText fieldId="home.section-join-section.volunteer" />
          </CtaLink>
        </div>
      </section>
      <FacebookBand />
    </main>
  );
}
