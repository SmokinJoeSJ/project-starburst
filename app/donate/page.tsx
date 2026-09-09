import Link from 'next/link';
import { PageHero, TextSection, ContactLines } from '@/components/page-parts';
import { DonationForm } from '@/components/donation-form';
export const metadata = { title: 'Donate' };
export default function Page() {
  return (
    <main id="main">
      <PageHero
        title={
          <>
            Donate to
            <br />
            Project
            <br />
            Starburst
          </>
        }
        image="/assets/11062b_e2da2b9b2d074ff8ab9a452d009d5c7f~mv2.jpg"
        alt="Neighbors donating essential supplies"
      />
      <div className="donation-badge">
        <img
          src="/assets/ffdbc4_8ae35597893b416c8dd1e74db2f2b23e~mv2.png"
          alt="Support your local food pantry"
          width="155"
          height="155"
        />
      </div>
      <DonationForm />
      <TextSection title="Make a Difference Today" className="wide-heading">
        <p>
          Your support directly helps families in need by keeping our pantry
          stocked with food and essential supplies. Because we are
          community-based and locally funded, 100% of your donation goes toward
          feeding and assisting neighbors in Mecosta and Osceola counties.
        </p>
        <p>💙 Every donation makes an impact. Thank you for your generosity!</p>
      </TextSection>
      <TextSection title="Ways to Give">
        <h3 className="body-heading">💳 Donate Online</h3>
        <p>
          Make a secure online donation to support our mission. Every dollar
          helps provide food, hygiene items, and assistance to those in need.
        </p>
        <a className="pill" href="#donation">
          Donate Now
        </a>
      </TextSection>
      <TextSection title="📦 Donate Goods">
        <p>
          Help stock our pantry by donating non-perishable food and personal
          care items.
        </p>
        <p>✅ We Accept:</p>
        <ul className="plain-list">
          <li>Canned &amp; dry food items</li>
          <li>Toiletries (soap, shampoo, toothpaste, etc.)</li>
          <li>Baby supplies (diapers, wipes, formula)</li>
          <li>Household essentials (cleaning products, paper goods)</li>
        </ul>
        <p>
          📍 Drop-Off Location:
          <br />
          120 S. State Street, Big Rapids, MI 49307
          <br />
          (Located inside the United Church of Big Rapids – Use the parking lot
          door &amp; take the elevator to the bottom floor.)
        </p>
        <p>
          🕒 Drop-Off Hours:
          <br />
          Monday, Wednesday &amp; Friday | 10 AM – 4 PM
        </p>
        <p>
          📞 Questions? Call us at <a href="tel:+12317965342">(231) 796-5342</a>
        </p>
      </TextSection>
      <TextSection title="🤝 Other Ways to Help">
        <p>
          💡 Employer Matching – Check if your
          <br />
          employer will match your donation!
        </p>
        <p className="spaced">
          📢 Fundraise for Us – Start a fundraiser to help support our mission.
        </p>
        <p className="spaced">
          🎁 Planned Giving – Leave a lasting impact with a legacy gift.
        </p>
        <p>Interested in alternative ways to give?</p>
        <Link className="pill" href="/contact">
          Contact Us Here
        </Link>
      </TextSection>
      <TextSection title="Your Support in Action">
        <p>Thanks to generous donors like you, we’ve helped:</p>
        <p>
          🥫 574,000+ Total Meals Provided
          <br />
          👨‍👩‍👧‍👦 3,561 Families Fed
          <br />👶 705 Clients Assisted
        </p>
        <p>💙 Join us in the fight against hunger. Every donation counts!</p>
      </TextSection>
      <TextSection
        title={
          <>
            Thank You for Your
            <br />
            Support!
          </>
        }
      >
        <p>
          Project Starburst is a 501(c)(3) nonprofit organization. Your
          donations are tax-deductible to the fullest extent of the law.
        </p>
        <ContactLines />
        <p className="spaced">
          <a
            href="https://www.facebook.com/ProjectStarburst"
            target="_blank"
            rel="noreferrer"
          >
            Follow Us on Social Media
          </a>
        </p>
      </TextSection>
    </main>
  );
}
