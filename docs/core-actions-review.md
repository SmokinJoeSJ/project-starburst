# Core action pages — review guide

Historical implementation record. The subsequent [brand-and-trust review](brand-and-trust-review.md) supersedes public statistics, giving-claim, Food Truck schedule, About/Contact/homepage, and shared-style descriptions below. Original source claims remain recorded for owner review.

This feature fully redesigns /get-help, /donate, and /volunteer on feature/core-actions, based on redesign-2026 at 7ec5c5d. The PR targets redesign-2026 and requires review before merge. This is a Preview feature, not a production launch.

## What changed

- A shared Starburst action system in components/cta.tsx: CtaLink and CtaButton, primary/secondary/text variants, consistent decorative SVG icons, keyboard focus, hover/press, native disabled/loading button states, comfortable touch targets, and reduced motion.
- Shared ActionHero, PantryDetails, and ActionClosing components in components/action-page.tsx. The new page styles live in app/actions.css and reuse the existing Souvenir font, logo, photography, and Starburst gold.
- Get Help: immediate hours/location and call actions, three confirmed service groups, the existing in-person registration / household groceries / wagon pickup process, entry directions, and phone/email support.
- Donate: a direct focus/scroll action to the original DonationForm, accepted goods, drop-off details, employer matching, fundraising, planned giving, previously published impact figures, and the unchanged tax statement.
- Volunteer: six existing opportunities, application instructions drawn from the original PDF, explicit in-person community-service application requirement, visible PDF download and separate view action, and contact details to confirm next steps.
- Homepage: Get Help and About Project Starburst in the hero, consistent Get Help / Donate / Volunteer actions later. Existing sections and photography remain. Two paragraph colors were darkened slightly to meet contrast requirements.
- Header/footer: Get Help and Donate priority, all existing destinations retained, a visible Get Help action beside the mobile menu, and centralized contact information.
- About and Contact: only shared contact data, published figure references, and clearer CTA labels; no page redesign. Other pages and public URLs remain intact.

## Content source and integrity

Sources are the existing integration-branch pages and original public files, cross-checked against the current Wix [Get Help](https://www.projectstarburst.org/get-help), [Donate](https://www.projectstarburst.org/donate), and [Volunteer](https://www.projectstarburst.org/volunteer) pages during implementation. The About page confirms the diaper bank, hygiene support, donated Bombas socks, and referrals.

lib/organization.ts now owns the repeated address, building entry directions, phone, email, public hours, counties, founding year, social/map links, nonprofit statement, local-giving statement, accepted goods, volunteer opportunities, application details, and previously published impact values. lib/site-config.ts references the same contact data. No provider settings, organization facts, staff/board lists, event copy, photos, or PDF contents were replaced.

The original 47-file asset inventory remains the integrity baseline. The volunteer application remains the same one-page, 187 KB PDF, including its signature, background-check and photo-consent statements. It has no interactive form fields. The download action saves the original bytes; the view action retains the original new-tab behavior.

## Owner fact review before launch

| Item                            | Preserved source and review needed                                                                                                                                                                                                                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Public hours versus application | Website: Monday, Wednesday & Friday, 10 AM–4 PM. The Volunteer/Intern PDF, updated August 9, 2024, says Monday–Friday, 10 AM–4 PM. The PDF is unchanged; the page asks visitors to call about volunteer availability. Confirm whether the PDF should be updated in a separate approved task.                                         |
| Application return and shifts   | No confirmed online submission endpoint, return method, or required schedule exists in repository content. The page directs applicants to call/email to confirm availability and how to return it. Confirm the intended process. Community-service applicants still must apply in person.                                            |
| Impact reporting                | Existing values: 14,350 individuals, 574,000 / 574,000+ meals, 3,561 families, and 705 clients. A reporting year is not documented. The original homepage annual labels remain; Donate identifies its figures as previously reported. Verify reporting period and the About/Donate difference in the 705-client label before launch. |
| Local-giving claim              | The existing “100% of your donation” statement is preserved verbatim and centralized. Owner confirmation is still needed before launch.                                                                                                                                                                                              |
| Volunteer schedule              | The existing Monthly Food Truck description says the third Friday of each month. Confirm that schedule; it was not silently changed.                                                                                                                                                                                                 |
| Tax statement                   | Existing approved 501(c)(3) / tax-deductibility wording is unchanged. Do not alter its legal meaning as part of a visual review.                                                                                                                                                                                                     |

## Integration behavior preserved

- DonationForm still uses donationPaymentLink and the existing environment policy. Preview accepts only PLM_STRIPE_TEST_PAYMENT_LINK in Stripe test-link format; production selection remains unchanged.
- No Payment Link has been supplied. The original $25 / $50 / $100 reference amounts, minimum amount, comments field, and unavailable state remain disabled. There is no simulated success, payment submission, or new provider. A clear telephone alternative is present.
- When an approved test link is configured, the existing Stripe-hosted, customer-chooses-amount checkout remains the action. Provider checkout success/failure cannot be certified without that test configuration.
- There is no PayPal SDK, webhook, payment server, volunteer submission API, or email delivery service in this repository.
- ContactForm still validates input and prepares a draft. Preview defaults to an on-page draft with no email sent; optional PLM_PREVIEW_EMAIL uses the approved test inbox. Production recipient and existing mailto behavior are unchanged.
- Public tel/mailto links, directions, and Facebook remain real external actions. Automated review verifies their destinations without calling, sending email, or submitting data to external services.
- No new environment variable is required. Do not configure a live payment link or production form recipient in Preview.

## Vercel navigation compatibility

The feature exposed a compiled-navigation failure: direct HTML and RSC requests succeeded, but a Link click failed because the dynamic navigation import had lost its named exports when bundled into the client entry. The Vercel-only client build now uses preserveEntrySignatures: strict. This preserves the router namespace while keeping code splitting and the existing RSC routes. The Cloudflare target, provider settings, dependency versions, production guards, and domains are unchanged. See [Rolldown’s entry-signature behavior](https://rolldown.rs/reference/InputOptions.preserveEntrySignatures).

The corrected static output was served locally and exercised in a real browser: homepage Get Help and header Donate, Volunteer, About, and Contact all navigated with valid RSC responses and no console/page errors. This catches a failure that a dev-server check or HTTP-only export check would miss.

## Validation completed

- npm run lint and npm run type-check: passed.
- npm test: all 9 safety/deployment tests passed.
- npm run build: existing Cloudflare target passed; local build only.
- npm run build:vercel: static export passed for all 9 public routes, 40 linked assets, all 47 preserved public files, RSC routing, preview SEO, sitemap/robots, legacy PDF redirects, and custom 404.
- Real Chromium/Edge browser checks at 375, 390, 430, 768, 1024, and 1440 px: the three action pages load with one H1, no horizontal overflow, and visible comfortable primary actions. Enlarged text at 200% was also checked at 390 px.
- Axe-core WCAG A/AA checks: no violations on the three action pages, homepage, About, or Contact at 390 and 1440 px; the open mobile menu also passed. Automated audits supplement, rather than replace, assistive-technology and owner review.
- Keyboard checks: in-page CTA focus transfer, reduced-motion behavior, menu focus trapping/Escape/return focus, menu route navigation, disabled donation fields, and validated on-page contact drafts passed.
- The browser downloaded the volunteer PDF and its SHA-256 matched the original file. Screenshots were visually reviewed for mobile, tablet, desktop, and the location/form/application details.
- No real payment, phone call, email delivery, or external form submission was attempted. Stripe end-to-end testing awaits an owner-supplied test Payment Link. Viewport tests use browser emulation, not physical phones.

## Preview review

Open the feature Preview from the PR; use its owner-enabled share link when reviewing without a Vercel account. Test the hero actions, in-page focus targets, phone/email links, donation availability message, application download, and mobile navigation. A provider test checkout is a separate check once Joe supplies the Stripe test Payment Link.

Review at 375, 390, and 430 px, plus tablet and desktop. Use keyboard-only navigation, Escape to close the mobile menu, reduced motion, and enlarged text. The visual design is ready for owner feedback; the rest of the site's visual redesign is intentionally outside this feature.

The standard [launch checklist](launch-checklist.md) and [rollback procedure](launch-checklist.md#release-and-rollback) remain in force. No feature preview or successful build authorizes merging, production deployment, DNS changes, or changes to the live Wix site.
