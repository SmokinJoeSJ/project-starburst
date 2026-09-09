import Link from 'next/link';
import { PageHero, TextSection } from '@/components/page-parts';
import { FacebookBand } from '@/components/site-shell';
export const metadata = { title: 'Volunteer' };
const ways = [
  [
    '📅 Monthly Food Truck',
    'The third Friday of each month, providing fresh food to families in need.',
  ],
  [
    '📦 Organize a Food Drive',
    'Bring your workplace, school, or community together by collecting non-perishable food and essential items.',
  ],
  [
    '👥 Group Volunteering',
    'Perfect for businesses, organizations, or student groups looking to make an impact.',
  ],
  [
    '⚖️ Court-Ordered Community Service',
    'Need to fulfill community service hours? We welcome individuals looking for meaningful ways to give back.',
  ],
  [
    '🚛 Unload & Organize Food Shipments',
    'Help us unload deliveries and organize supplies in our pantry.',
  ],
  [
    '🥫 Food Distribution',
    'Assist families in need by helping distribute food at our pantry.',
  ],
];
export default function Page() {
  return (
    <main id="main">
      <PageHero
        title={
          <>
            Volunteer with
            <br />
            Project
            <br />
            Starburst
          </>
        }
        image="/assets/1691a921dfec4d4f8637b1c7ffa2528a.jpg"
        alt="A group of community volunteers"
      />
      <TextSection
        title={
          <>
            Make a Difference in
            <br />
            Your Community
          </>
        }
      >
        <p>
          Your time and effort can change lives! Whether you’re helping
          distribute food, organizing donations, or assisting with events, your
          support ensures families in Mecosta and Osceola counties get the help
          they need.
        </p>
        <p>🤝 Join us in the fight against hunger!</p>
      </TextSection>
      <TextSection title="Ways to Get Involved">
        <div className="volunteer-ways">
          {ways.map(([title, copy]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </TextSection>
      <TextSection title="Sign Up to Volunteer">
        <p>
          Want to volunteer?
          <br />
          You can fill out our Volunteer Application Form by clicking the button
          below.
        </p>
        <p className="small-note">
          Note: If you're looking to complete community service, you must still
          apply in person.
        </p>
        <a
          className="pill"
          href="/documents/volunteer-application.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Download Volunteer Form
        </a>
        <p className="spaced">
          📞 Questions? Call us at <a href="tel:+12317965342">(231) 796-5342</a>
        </p>
      </TextSection>
      <TextSection title="Other Ways to Support">
        <p>
          💙 Donate Goods – Drop off food, hygiene products,
          <br />
          and essentials at our location.
        </p>
        <p className="spaced">
          💸 Make a Monetary Donation – Every dollar makes a difference.
        </p>
        <Link className="pill" href="/donate">
          Donate
        </Link>
        <p className="spaced">
          🙌 Thank you for your support! Together, we can build a stronger, more
          caring community.
        </p>
      </TextSection>
      <FacebookBand />
    </main>
  );
}
