import { ContentText, ContentFrame } from '@/components/content/fields';
import { PageHero, TextSection } from '@/components/page-parts';
import { ContactForm } from '@/components/contact-form';
import { organization } from '@/lib/organization';
import { CtaLink } from '@/components/cta';
export default function Page({
  recipient = '',
  preview = true,
}: { recipient?: string; preview?: boolean } = {}) {
  return (
    <main id="main">
      <PageHero
        title={<ContentText fieldId="contact.contact-us.contact-us" />}
        image="/assets/11062b_841a038a35fe4e4da9c2871f63caed93~mv2.jpg"
        alt="Volunteers collecting donations"
        imageField="contact.contact-us.image"
        altField="contact.contact-us.image.alt"
      >
        <p>
          <ContentText fieldId="contact.contact-us.we-d-love-to-hear-from-you" />
        </p>
      </PageHero>
      <TextSection
        title={<ContentText fieldId="contact.our-location.our-location" />}
        className="location-section"
      >
        <p>
          <ContentText fieldId="shared.name" /> ·{' '}
          <ContentText fieldId="shared.address.full" />
        </p>
        <div className="location-card">
          <div>
            <p>
              <ContentText fieldId="shared.name" />
              <br />
              <ContentText fieldId="shared.address.street" />
              <br />
              <ContentText fieldId="shared.address.city" />,{' '}
              <ContentText fieldId="shared.address.state" />{' '}
              <ContentText fieldId="shared.address.zip" />
            </p>
            <p>
              <ContentText fieldId="shared.address.entry" />
            </p>
            <CtaLink
              variant="text"
              icon="external"
              href={organization.directions}
              target="_blank"
              rel="noreferrer"
            >
              <ContentText fieldId="contact.our-location.get-directions" />
              <span className="sr-only">
                <ContentText fieldId="contact.our-location.opens-in-a-new-tab" />
              </span>
            </CtaLink>
          </div>
          <ContentFrame
            title="Map showing Project Starburst at 120 S. State Street, Big Rapids"
            src={organization.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </TextSection>
      <TextSection title={<ContentText fieldId="contact.phone.phone" />}>
        <p>
          <CtaLink href={organization.phone.href} variant="text" icon="phone">
            <ContentText fieldId="shared.phone.display" />
          </CtaLink>
        </p>
        <p>
          <ContentText fieldId="contact.phone.if-you-have-questions-or-need" />
        </p>
      </TextSection>
      <TextSection title={<ContentText fieldId="contact.email.email" />}>
        <p>
          <CtaLink href={organization.emailHref} variant="text" icon="email">
            <ContentText fieldId="shared.email" />
          </CtaLink>
        </p>
        <p>
          <ContentText fieldId="contact.email.for-general-inquiries-or-to-reach" />
        </p>
      </TextSection>
      <TextSection
        title={
          <ContentText fieldId="contact.operating-hours.operating-hours" />
        }
      >
        <p>
          <ContentText fieldId="shared.hours.days" />
          <br />
          <ContentText fieldId="shared.hours.time" />
        </p>
      </TextSection>
      <ContactForm recipient={recipient} preview={preview} />
      <TextSection
        title={<ContentText fieldId="contact.follow-us.follow-us" />}
      >
        <p>
          <ContentText fieldId="contact.follow-us.stay-updated-and-connected-with-us" />
        </p>
        <a
          className="social-link"
          href={organization.facebook}
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
