import { PageHero, TextSection } from '@/components/page-parts';
import { ContactForm } from '@/components/contact-form';
export const metadata = { title: 'Contact' };
export default function Page() {
  return (
    <main id="main">
      <PageHero
        title="Contact Us"
        image="/assets/11062b_841a038a35fe4e4da9c2871f63caed93~mv2.jpg"
        alt="Volunteers collecting donations"
      >
        <p>
          We'd love to hear from you! Whether you have a question, suggestion,
          or need assistance, we're here to help. Get in touch with us using the
          information below.
        </p>
      </PageHero>
      <TextSection title="Our Location" className="location-section">
        <p>📍 Project Starburst 120 S. State Street Big Rapids, MI 49307</p>
        <div className="location-card">
          <div>
            <p>
              Project Starburst
              <br />
              120 S. State Street
              <br />
              Big Rapids, MI 49307
            </p>
            <p>
              Located in the United Church of Big Rapids. Please use the parking
              lot door and take the elevator to the bottom floor.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Project+Starburst+120+S+State+St+Big+Rapids+MI"
              target="_blank"
              rel="noreferrer"
            >
              Get directions ↗
            </a>
          </div>
          <iframe
            title="Map showing Project Starburst at 120 S. State Street, Big Rapids"
            src="https://maps.google.com/maps?q=Project%20Starburst%20120%20S%20State%20Street%20Big%20Rapids%20MI&t=m&z=16&output=embed&iwloc=near"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </TextSection>
      <TextSection title="Phone">
        <p>
          <a href="tel:+12317965342">(231) 796-5342</a>
        </p>
        <p>
          If you have questions or need more information about our services,
          feel free to call us during our operating hours.
        </p>
      </TextSection>
      <TextSection title="Email">
        <p>
          <a href="mailto:br@projectstarburst.org">br@projectstarburst.org</a>
        </p>
        <p>
          For general inquiries or to reach a specific department, send us an
          email, and we'll get back to you as soon as possible.
        </p>
      </TextSection>
      <TextSection title="Operating Hours">
        <p>
          Monday- Wednesday- Friday
          <br />
          10 AM – 4 PM
        </p>
      </TextSection>
      <ContactForm />
      <TextSection title="Follow Us">
        <p>Stay updated and connected with us on our social media channels!</p>
        <a
          className="social-link"
          href="https://www.facebook.com/ProjectStarburst"
          target="_blank"
          rel="noreferrer"
          aria-label="Project Starburst on Facebook"
        >
          <img src="/assets/facebook.svg" alt="" width="42" height="42" />
        </a>
      </TextSection>
    </main>
  );
}
