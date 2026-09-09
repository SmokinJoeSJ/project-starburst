import { routeMetadata } from '@/lib/seo';
import { PageHero, TextSection, ContactLines } from '@/components/page-parts';
import { FacebookBand } from '@/components/site-shell';
export const metadata = { ...routeMetadata('/get-help'), title: 'Get Help' };
export default function Page() {
  return (
    <main id="main">
      <PageHero
        title={
          <>
            Get Help from
            <br />
            Project Starburst
          </>
        }
        image="/assets/11062b_5cd7c9c0244b499b99410156d56c7d4f~mv2.jpg"
        alt="Volunteers sharing a box of food"
      />
      <TextSection title="We're Here for You">
        <p>
          If you or someone you know is experiencing temporary hardship, Project
          Starburst is here to offer support. We provide food, personal hygiene,
          and essential services to families and individuals in Mecosta and
          Osceola counties.
        </p>
        <p>
          We believe in neighbors supporting neighbors, and we want to ensure no
          one goes without the essentials they need to thrive.
        </p>
      </TextSection>
      <TextSection title="Our Services">
        <div className="service-box">
          <h3>🍞 Monthly Grocery Program</h3>
          <p>
            We provide monthly groceries to families and individuals.
            <br />
            Groceries are packed based on family size and any dietary
            restrictions you may have.
          </p>
          <p>
            How it works: Fill out a brief intake form, and our volunteers will
            pack your groceries to meet your needs.
          </p>
        </div>
      </TextSection>
      <TextSection title="How to Get Help">
        <ol className="steps">
          <li>
            <strong>Step 1: In-Person Registration</strong>
            <p>
              To begin receiving help, visit us in person to fill out an intake
              form. Our team will enter your information into our computer
              system to ensure we meet your specific needs.
            </p>
          </li>
          <li>
            <strong>Step 2: Receive Your Groceries</strong>
            <p>
              Once registered, our volunteers will package your groceries based
              on your family size and dietary needs.
            </p>
          </li>
          <li>
            <strong>Step 3: Pickup &amp; Assistance</strong>
            <p>
              Your groceries will be placed in a wagon for you to take to your
              vehicle. After unloading, please return the wagon inside for the
              next family.
            </p>
          </li>
        </ol>
      </TextSection>
      <TextSection title="Contact Us for Help">
        <p>
          We’re here to answer your questions and provide support. Feel free to
          reach out!
        </p>
        <ContactLines />
      </TextSection>
      <FacebookBand />
    </main>
  );
}
