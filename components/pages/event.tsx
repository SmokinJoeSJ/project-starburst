import { ContentText, ContentImage } from '@/components/content/fields';
import Link from 'next/link';
import { PageHero, TextSection } from '@/components/page-parts';
export default function Page() {
  return (
    <main id="main">
      <PageHero
        title={<ContentText fieldId="event.souper-supper.souper-supper" />}
        image="/assets/ffdbc4_f004ba0a544b4eb281308e182dfb9c7f~mv2.jpg"
        alt="A bowl of soup"
        imageField="event.souper-supper.image"
        altField="event.souper-supper.image.alt"
      >
        <p>
          <ContentText fieldId="event.souper-supper.wed-mar-25-three-girls" />
        </p>
      </PageHero>
      <TextSection
        title={<ContentText fieldId="event.souper-supper.souper-supper-2" />}
      >
        <p>
          <ContentText fieldId="event.souper-supper.this-event-is-a-fundraiser-for" />
        </p>
        <p className="closed-event">
          <ContentText fieldId="event.souper-supper.registration-is-closed" />
        </p>
      </TextSection>
      <div className="event-poster">
        <ContentImage
          src="/assets/ffdbc4_0d10ec1fcadd4c29927bd1aa8ffe672f~mv2.jpg"
          alt="Souper Supper 8th Annual event poster"
          width="700"
          height="599"
          imageField="event.content.image"
          altField="event.content.image.alt"
        />
      </div>
      <TextSection
        title={<ContentText fieldId="event.time-location.time-location" />}
      >
        <p>
          <ContentText fieldId="event.time-location.mar-25-2026-11-00-am" />
        </p>
        <p>
          <ContentText fieldId="event.time-location.three-girls-bakery-106-n-michigan" />
        </p>
      </TextSection>
      <TextSection title={<ContentText fieldId="event.tickets.tickets" />}>
        <h3>
          <ContentText fieldId="event.tickets.souper-supper-8th-annual" />
        </h3>
        <p className="closed-event">
          <ContentText fieldId="event.tickets.sale-ended" />
        </p>
        <p>
          <ContentText fieldId="event.tickets.ages-18-20-00-0-50-ticket" />
        </p>
        <p>
          <ContentText fieldId="event.tickets.ages-6-17-10-00" />
        </p>
        <Link className="pill" href="/soupersupper">
          <ContentText fieldId="event.tickets.back-to-souper-supper" />
        </Link>
      </TextSection>
    </main>
  );
}
