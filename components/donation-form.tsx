import { ContentText } from '@/components/content/fields';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { organization } from '@/lib/organization';
import { CtaButton, CtaLink } from '@/components/cta';
export function DonationForm({
  link = '',
  preview = true,
}: { link?: string; preview?: boolean } = {}) {
  // Amount selection belongs to Stripe's customer-chooses-amount checkout.
  // Keep the historical Wix form as an inactive visual reference until connected.
  return (
    <section
      id="donation"
      tabIndex={-1}
      aria-labelledby="donation-title"
      className="donation-form-wrap"
    >
      <div className="site-form action-donation-form">
        <h2 id="donation-title">Donate online</h2>
        {link ? (
          <>
            <p>
              {preview
                ? 'Preview: Stripe test checkout only. No real donation will be processed.'
                : 'Choose your donation amount on our secure Stripe checkout.'}
            </p>
            <CtaLink
              href={link}
              icon="external"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate with Stripe
              <span className="sr-only"> (opens in a new tab)</span>
            </CtaLink>
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
              call <ContentText fieldId="shared.phone.display" /> or visit our
              pantry.
            </p>
            <div className="form-actions">
              <CtaButton type="button" icon="none" disabled>
                Online donations coming soon
              </CtaButton>
            </div>
            <CtaLink href={organization.phone.href} variant="text" icon="phone">
              Call to discuss your donation
            </CtaLink>
          </>
        )}
      </div>
    </section>
  );
}
