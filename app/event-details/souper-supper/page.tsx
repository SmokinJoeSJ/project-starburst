import Link from 'next/link';
import { PageHero, TextSection } from '@/components/page-parts';
export const metadata = { title: 'Souper Supper — Event Details' };
export default function Page() {
  return (
    <main id="main">
      <PageHero
        title="Souper Supper"
        image="/assets/ffdbc4_f004ba0a544b4eb281308e182dfb9c7f~mv2.jpg"
        alt="A bowl of soup"
      >
        <p>Wed, Mar 25 | Three Girls Bakery</p>
      </PageHero>
      <TextSection title="Souper Supper">
        <p>
          This event is a fundraiser for Project Starburst. Your ticket includes
          a bowl of soup from the selection you choose at the event. Proceeds
          from ticket sales support Project Starburst and help further their
          mission of serving our community.
        </p>
        <p className="closed-event">Registration is closed</p>
      </TextSection>
      <div className="event-poster">
        <img
          src="/assets/ffdbc4_0d10ec1fcadd4c29927bd1aa8ffe672f~mv2.jpg"
          alt="Souper Supper 8th Annual event poster"
          width="700"
          height="599"
        />
      </div>
      <TextSection title="Time & Location">
        <p>Mar 25, 2026, 11:00 AM – 3:00 PM</p>
        <p>Three Girls Bakery, 106 N Michigan Ave, Big Rapids, MI 49307, USA</p>
      </TextSection>
      <TextSection title="Tickets">
        <h3>Souper Supper 8th Annual</h3>
        <p className="closed-event">Sale ended</p>
        <p>Ages 18+: $20.00 + $0.50 ticket service fee</p>
        <p>Ages 6 – 17: $10.00 + $0.25 ticket service fee</p>
        <Link className="pill" href="/soupersupper">
          Back to Souper Supper
        </Link>
      </TextSection>
    </main>
  );
}
