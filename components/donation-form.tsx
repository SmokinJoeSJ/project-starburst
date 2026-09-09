import {
  donationPaymentLink,
  deploymentPolicy,
} from '@/lib/deployment-policy.mjs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/site-config';
export function DonationForm() {
  // Amount selection belongs to Stripe's customer-chooses-amount checkout.
  // Keep the historical Wix form as an inactive visual reference until connected.
  const link = donationPaymentLink(process.env, siteConfig.stripePaymentLink);
  const preview = !deploymentPolicy(process.env).isProduction;
  return (
    <section id="donation" className="donation-form-wrap">
      <div className="site-form">
        <h2>Donate</h2>
        {link ? (
          <>
            <p>
              {preview
                ? 'Preview: Stripe test checkout only. No real donation will be processed.'
                : 'Choose your donation amount on our secure Stripe checkout.'}
            </p>
            <a className="pill" href={link} target="_blank" rel="noreferrer">
              Donate with Stripe
            </a>
          </>
        ) : (
          <>
            <fieldset disabled aria-describedby="donation-status">
              <legend>Donation*</legend>
              <div className="donation-amounts">
                {[25, 50, 100].map((n) => (
                  <span key={n}>${n}</span>
                ))}
              </div>
              <Input
                aria-label="Donation amount"
                type="number"
                placeholder="Enter an amount"
                min="1"
              />
              <label htmlFor="donation-comments">Comments*</label>
              <Textarea
                id="donation-comments"
                placeholder="Type comments..."
                rows={4}
              />
            </fieldset>
            <p className="form-note" id="donation-status">
              Online donations will be available soon. To give today, please
              call (231) 796-5342 or visit our pantry.
            </p>
            <div className="form-actions">
              <button type="button" className="pill" disabled>
                Online donations coming soon
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
