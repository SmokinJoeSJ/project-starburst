import { ContentText } from '@/components/content/fields';
import { CtaLink } from '@/components/cta';
import { organization, reportedImpact } from '@/lib/organization';
import { PageHero, TextSection } from '@/components/page-parts';
import { FacebookBand } from '@/components/site-shell';
export default function Page() {
  return (
    <main id="main">
      <PageHero
        className="about-hero"
        title={
          <>
            <ContentText fieldId="about.about-hero.neighbors-helping" />
            <br />
            <ContentText fieldId="about.about-hero.neighbors-since-1971" />
          </>
        }
        image="/assets/11062b_f1a4368086de462db72b31ae85053474~mv2_d_5760_3840_s_4_2.jpg"
        alt="Neighbors and families gathered together"
        imageField="about.about-hero.image"
        altField="about.about-hero.image.alt"
      >
        <p>
          <ContentText fieldId="about.about-hero.project-starburst-is-dedicated-to-providin" />
        </p>
      </PageHero>
      <div className="quick-contact">
        <p>
          <ContentText fieldId="shared.address.full" />
        </p>
        <a href={organization.phone.href}>
          <ContentText fieldId="shared.phone.display" />
        </a>
        <p>
          <ContentText fieldId="shared.hours.days" /> |{' '}
          <ContentText fieldId="shared.hours.time" />
        </p>
        <a href={organization.emailHref}>
          <ContentText fieldId="shared.email" />
        </a>
      </div>
      <TextSection
        title={<ContentText fieldId="about.what-we-do.what-we-do" />}
      >
        <h3 className="large-subheading">
          <ContentText fieldId="about.what-we-do.monthly-grocery-program" />
        </h3>
        <p>
          <ContentText fieldId="about.what-we-do.we-provide-monthly-groceries-based-on" />
        </p>
        <div className="left-copy">
          <p>
            <ContentText fieldId="about.what-we-do.how-it-works" />
          </p>
          <p>
            <ContentText fieldId="about.what-we-do.1-fill-out-a-brief-intake" />
          </p>
          <p>
            <ContentText fieldId="about.what-we-do.2-volunteers-prepare-customized-grocery-pa" />
          </p>
          <p>
            <ContentText fieldId="about.what-we-do.3-pick-up-your-groceries-and" />
          </p>
        </div>
      </TextSection>
      <TextSection
        title={
          <ContentText fieldId="about.individual-case-management.individual-case-management" />
        }
      >
        <div className="left-copy">
          <p>
            <ContentText fieldId="about.individual-case-management.we-go-beyond-food-assistance-by" />
          </p>
          <p>
            <ContentText fieldId="about.individual-case-management.diaper-bank-for-qualified" />
          </p>
          <p>
            <ContentText fieldId="about.individual-case-management.call-ahead" />{' '}
            <a href={organization.phone.href}>
              <ContentText fieldId="shared.phone.display" />
            </a>
          </p>
          <br />
          <p>
            <ContentText fieldId="about.individual-case-management.referrals-to-local-agencies" />
          </p>
          <ul className="bullets">
            <li>
              <ContentText fieldId="about.individual-case-management.mid-michigan-community-action-center" />
            </li>
            <li>
              <ContentText fieldId="about.individual-case-management.michigan-works" />
            </li>
            <li>
              <ContentText fieldId="about.individual-case-management.michigan-department-of-health-human" />
            </li>
          </ul>
          <br />
          <p>
            <ContentText fieldId="about.individual-case-management.hygiene-items-assistance-donated" />
          </p>
        </div>
      </TextSection>
      <TextSection
        title={
          <ContentText fieldId="about.making-a-difference-in-our-community.making-a-difference-in-our-community" />
        }
        className="wide-heading"
      >
        <div className="left-copy">
          <p>
            <ContentText fieldId="about.making-a-difference-in-our-community.for-over-50-years-project-starburst" />
          </p>
          <p>
            🆕 {reportedImpact.clients}
            <ContentText fieldId="about.making-a-difference-in-our-community.clients" />
            <br />
            <ContentText fieldId="about.making-a-difference-in-our-community.copy" />
            {reportedImpact.individuals}
            <ContentText fieldId="about.making-a-difference-in-our-community.individuals-served" />
            <br />
            🍽️ {reportedImpact.families}
            <ContentText fieldId="about.making-a-difference-in-our-community.families-fed" />
            <br />🥫 {reportedImpact.meals}
            <ContentText fieldId="about.making-a-difference-in-our-community.total-meals-provided" />
          </p>
        </div>
      </TextSection>
      <TextSection
        title={<ContentText fieldId="about.our-values.our-values" />}
      >
        <div className="left-copy">
          <p>
            <ContentText fieldId="about.our-values.a-neighborly-resource-providing" />
          </p>
          <p>
            <ContentText fieldId="about.our-values.locally-funded-every-donation" />
          </p>
          <p>
            <ContentText fieldId="about.our-values.community-based-we-believe-in" />
          </p>
        </div>
      </TextSection>
      <TextSection
        title={<ContentText fieldId="about.meet-our-team.meet-our-team" />}
        className="team-section"
      >
        <p>
          <ContentText fieldId="about.meet-our-team.our-staff" />
        </p>
        <p>
          <ContentText fieldId="about.meet-our-team.connie-koepke-pantry-manager" />
          <br />
          <a href={organization.emailHref}>
            <ContentText fieldId="shared.email" />
          </a>
        </p>
        <p className="spaced">
          <ContentText fieldId="about.meet-our-team.allan-bauman-assistant-pantry-manager" />
        </p>
        <p className="spaced">
          <ContentText fieldId="about.meet-our-team.board-of-directors" />
        </p>
        <p>
          <ContentText
            fieldId="about.meet-our-team.alice-bandstra-president-russ-nehmer"
            breakClass=""
          />
        </p>
      </TextSection>
      <TextSection
        title={
          <ContentText fieldId="about.how-you-can-help.how-you-can-help" />
        }
      >
        <p>
          <ContentText
            fieldId="about.how-you-can-help.donate-every-dollar-goes"
            breakClass=""
          />
        </p>
        <div className="button-row">
          <CtaLink href="/donate">
            <ContentText fieldId="about.how-you-can-help.donate" />
          </CtaLink>
          <CtaLink href="/volunteer" variant="secondary">
            <ContentText fieldId="about.how-you-can-help.volunteer" />
          </CtaLink>
        </div>
      </TextSection>
      <TextSection
        title={
          <ContentText fieldId="about.non-discrimination-statement.non-discrimination-statement" />
        }
        className="wide-copy"
      >
        <p>
          <ContentText
            fieldId="about.non-discrimination-statement.we-re-committed-to-providing-equal-access"
            breakClass=""
          />
        </p>
        <CtaLink
          variant="secondary"
          icon="external"
          href="/documents/non-discrimination-statement.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <ContentText fieldId="about.non-discrimination-statement.read-non-discrimination-statement-pdf" />
          <span className="sr-only">
            <ContentText fieldId="about.non-discrimination-statement.opens-in-a-new-tab" />
          </span>
        </CtaLink>
      </TextSection>
      <FacebookBand />
    </main>
  );
}
