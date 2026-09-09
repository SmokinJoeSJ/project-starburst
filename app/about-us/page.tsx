import { routeMetadata } from '@/lib/seo';
import { CtaLink } from '@/components/cta';
import { organization, reportedImpact } from '@/lib/organization';
import { PageHero, TextSection } from '@/components/page-parts';
import { FacebookBand } from '@/components/site-shell';
export const metadata = { ...routeMetadata('/about-us'), title: 'About Us' };
export default function Page() {
  return (
    <main id="main">
      <PageHero
        className="about-hero"
        title={
          <>
            Neighbors Helping
            <br />
            Neighbors Since 1971
          </>
        }
        image="/assets/11062b_f1a4368086de462db72b31ae85053474~mv2_d_5760_3840_s_4_2.jpg"
        alt="Neighbors and families gathered together"
      >
        <p>
          Project Starburst is dedicated to providing food, hygiene products,
          and essential services to residents of Mecosta and Osceola counties.
          By fostering a sense of community, we ensure that individuals and
          families facing hardship receive the support they need with dignity
          and respect.
        </p>
      </PageHero>
      <div className="quick-contact">
        <p>{organization.address.full}</p>
        <a href={organization.phone.href}>{organization.phone.display}</a>
        <p>
          {organization.hours.days} | {organization.hours.time}
        </p>
        <a href={organization.emailHref}>{organization.email}</a>
      </div>
      <TextSection title="What We Do">
        <h3 className="large-subheading">📦 Monthly Grocery Program</h3>
        <p>
          We provide monthly groceries based on family size and dietary
          restrictions.
        </p>
        <div className="left-copy">
          <p>🔹 How It Works:</p>
          <p>1️⃣ Fill out a brief intake form to assess your needs.</p>
          <p>2️⃣ Volunteers prepare customized grocery packages.</p>
          <p>
            3️⃣ Pick up your groceries and receive additional support if needed.
          </p>
        </div>
      </TextSection>
      <TextSection title="👥 Individual Case Management">
        <div className="left-copy">
          <p>
            We go beyond food assistance by offering essential support services,
            including:
          </p>
          <p>✅ Diaper Bank – For qualified children</p>
          <p>
            📞 Call ahead:{' '}
            <a href={organization.phone.href}>{organization.phone.display}</a>
          </p>
          <br />
          <p>✅ Referrals to Local Agencies:</p>
          <ul className="bullets">
            <li>Mid Michigan Community Action Center</li>
            <li>Michigan Works</li>
            <li>Michigan Department of Health &amp; Human Services</li>
          </ul>
          <br />
          <p>✅ Hygiene Items Assistance – donated Bombas socks.</p>
        </div>
      </TextSection>
      <TextSection
        title="Making a Difference in Our Community"
        className="wide-heading"
      >
        <div className="left-copy">
          <p>
            For over 50 years, Project Starburst has expanded to meet the
            growing needs of those living in poverty. Thanks to our donors,
            volunteers, and partners, we have helped:
          </p>
          <p>
            🆕 {reportedImpact.clients} Clients
            <br />
            👨‍👩‍👧‍👦 {reportedImpact.individuals} Individuals Served
            <br />
            🍽️ {reportedImpact.families} Families Fed
            <br />🥫 {reportedImpact.meals} Total Meals Provided
          </p>
        </div>
      </TextSection>
      <TextSection title="Our Values">
        <div className="left-copy">
          <p>
            🏡 A Neighborly Resource – Providing food and basic needs with care.
          </p>
          <p>
            💰 Locally Funded – Every donation directly supports your local food
            bank.
          </p>
          <p>🤝 Community-Based – We believe in neighbors helping neighbors.</p>
        </div>
      </TextSection>
      <TextSection title="Meet Our Team" className="team-section">
        <p>Our Staff</p>
        <p>
          Connie Koepke- Pantry Manager
          <br />
          <a href={organization.emailHref}>{organization.email}</a>
        </p>
        <p className="spaced">Allan Bauman- Assistant Pantry Manager</p>
        <p className="spaced">Board of Directors</p>
        <p>
          Alice Bandstra – President
          <br />
          Russ Nehmer – Vice President
          <br />
          Dee Van Horn – Secretary
          <br />
          Dave Scott – Treasurer
          <br />
          Felicia Bielecki
          <br />
          Laura Veersma
          <br />
          Joie Cole
          <br />
          Steve Cole
        </p>
      </TextSection>
      <TextSection title="How You Can Help">
        <p>
          💙 Donate – Every dollar goes directly to food and essential services.
          <br />🤝 Volunteer – Give your time and make a direct impact.
          <br />📣 Spread the Word – Follow us on social media and support our
          cause.
        </p>
        <div className="button-row">
          <CtaLink href="/donate">Donate</CtaLink>
          <CtaLink href="/volunteer" variant="secondary">
            Volunteer
          </CtaLink>
        </div>
      </TextSection>
      <TextSection title="Non Discrimination Statement" className="wide-copy">
        <p>
          We’re committed to providing equal access and opportunity for all.
          <br />
          Read our full Non-Discrimination Statement to learn more about our
          policies and practices.
        </p>
        <CtaLink
          variant="secondary"
          icon="external"
          href="/documents/non-discrimination-statement.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Read Non-Discrimination Statement (PDF)
          <span className="sr-only"> (opens in a new tab)</span>
        </CtaLink>
      </TextSection>
      <FacebookBand />
    </main>
  );
}
