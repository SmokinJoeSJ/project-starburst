import Link from 'next/link';
import { FacebookBand } from '@/components/site-shell';
import { Testimonials } from '@/components/testimonials';
export default function Home() {
  return (
    <main id="main">
      <section className="hero home-hero">
        <img
          className="hero-image"
          src="/assets/family.jpg"
          alt="Family enjoying time together"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="home-hero-content">
          <h1>
            Serving Our Neighbors in
            <br className="desktop-break" /> Mecosta and Osceola Counties
          </h1>
          <p>
            Project Starburst provides food, personal hygiene, and other
            essential items to residents of Mecosta and Osceola counties who are
            temporarily in need of assistance. Our mission is to serve the
            community with dignity, respect, and compassion.
          </p>
          <Link className="pill" href="/about-us">
            Read More
          </Link>
        </div>
      </section>
      <section className="impact section">
        <h2>
          Making a Difference in
          <br /> Our Community
        </h2>
        <div className="impact-grid">
          <div>
            <img src="/assets/icon-9.svg" alt="" width="170" height="155" />
            <h3>Community-driven support since</h3>
            <p>1971</p>
          </div>
          <div>
            <img src="/assets/icon-10.svg" alt="" width="170" height="155" />
            <h3>14,350</h3>
            <p>
              Individuals Served
              <br />
              Annually
            </p>
          </div>
          <div>
            <img src="/assets/icon-11.svg" alt="" width="170" height="155" />
            <h3>574,000 +</h3>
            <p>
              Total Meals Provided
              <br />
              Annually
            </p>
          </div>
        </div>
      </section>
      <section className="section help-section">
        <h2>How We Help</h2>
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
        <h2>Join Us in Making a Difference</h2>
        <p>
          Every contribution helps us provide food, resources, and support to
          families in need. Whether you donate, volunteer, or spread the word,
          you are part of the change.
        </p>
        <div className="button-row">
          <Link href="/donate" className="pill">
            Donate Now
          </Link>
          <Link href="/volunteer" className="pill">
            Volunteer
          </Link>
          <Link href="/get-help" className="pill">
            Get Help
          </Link>
        </div>
      </section>
      <FacebookBand />
    </main>
  );
}
