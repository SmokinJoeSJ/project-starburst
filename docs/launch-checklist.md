# PLM launch checklist — Project Starburst

Owner: Joe / Project Starburst. For a **future separately authorized launch**. Setup does not authorize a main merge, Production deployment/promotion, production domain assignment or DNS change. Record evidence, reviewer, date and release commit. Mark N/A only with a reason and owner agreement.

## Review and preservation

- [ ] Client/Joe approves staging sitemap, design, content, navigation and exact release commit.
- [ ] Resolve /event-list: implement or approve/test a relevant redirect.
- [ ] Verify every route in site-inventory.md, aliases and expired event detail.
- [ ] Approve hours (main pages versus Wix event footer conflict), staff/board, impact reporting period, sponsors, copyright and event wording.
- [ ] Preserve logo/fonts, partner marks, photos, testimonials, PDFs and usage rights.
- [ ] Save/export Wix submissions, contacts, events/members, transactions/recurring-gift settings, automations, analytics, redirects and verification records. Keep Wix access and an agreed rollback window.
- [ ] Record main SHA, approved staging SHA, hosting project/team, domain assignments, DNS records/TTLs and previous deployments.

## Donations, PayPal, forms and email

- [ ] Confirm the live Wix donation provider, including whether PayPal is used; repo absence is not proof.
- [ ] Approve Stripe replacement and real sandbox/test Payment Link. Test custom amount, limits/currency, success, decline, cancellation, mobile checkout and return behavior.
- [ ] If PayPal survives, test sandbox donation, cancellation, client/admin receipts and any webhook/IPN. Otherwise document approved retirement and recurring-payment handling.
- [ ] Reconcile recurring gifts and transaction history; preserve active payment arrangements.
- [ ] Configure live donation settings only during the authorized launch; preview must remain test-only afterward.
- [ ] Confirm donor/client receipt and organization/admin receipt arrive with correct sender, amount and support details.
- [ ] Verify contact required fields, errors, long inputs, keyboard use and clear success/failure states.
- [ ] Decide whether mailto is acceptable or implement a reviewed delivery service. A prepared draft is not a sent message.
- [ ] Prove client acknowledgment and admin/office receipt for direct submissions, including spam-folder and provider-error checks.
- [ ] Verify contact/help instructions, public phone/email and in-person intake. Do not imply an online help application exists.
- [ ] Ensure preview notifications cannot reach production recipients; record test inbox/provider mode without secrets.
- [ ] Keep Souper Supper registration closed unless a new event is separately approved.

## Resources, responsive behavior and accessibility

- [ ] Open both PDFs on mobile, tablet and desktop; verify content, readability and filenames.
- [ ] Verify permanent redirects from both original Wix PDF paths.
- [ ] Review phone, tablet, desktop, orientation, long text, overflow, mobile navigation and touch targets.
- [ ] Test direct loads, client navigation, Home, back/forward, event/anchor/sponsor links and directions.
- [ ] Check keyboard/focus, skip link, headings, labels, contrast, alt text, reduced motion and form announcements.
- [ ] Verify unknown paths return HTTP 404, including missing assets and obsolete URLs.
- [ ] Run npm run lint, npm run type-check, npm test, npm run build, npm run build:vercel and git diff --check.
- [ ] Complete actual Vercel Preview review; local static validation is not hosted acceptance.

## Domain, SSL, SEO and analytics

- [ ] Confirm preview.projectstarburst.org tracks redesign-2026 and feature previews work.
- [ ] Confirm stable/temporary Preview stays noindex after launch.
- [ ] Check main Production HTML is indexable: no accidental noindex header or preview canonical.
- [ ] Approve www/apex policy; existing canonical is www. Configure redirects deliberately without loops.
- [ ] Approve titles, descriptions, social previews and corrected structured data. Replace the stale Ephrata/PA address in Wix JSON-LD with verified organization details.
- [ ] Verify production sitemap includes all approved canonical routes, excludes aliases/previews and is referenced by robots.
- [ ] Map retired URLs, including old sitemap partitions; preserve inbound links and PDFs.
- [ ] Preserve Search Console verification; submit sitemap and inspect representative URLs after launch.
- [ ] Inspect Wix analytics, approve replacement, validate any consent behavior, and verify production traffic without counting previews.
- [ ] Joe authorizes the exact production domain/DNS changes copied from Vercel. Preserve MX, SPF, DKIM, DMARC, TXT and nameservers.
- [ ] Verify SSL, apex/www redirect, staging SSL, mixed content, propagation and email delivery after cutover.

## Release and rollback

- [ ] Open redesign-2026 → main PR; resolve all integration/content/SEO gaps and record explicit client/owner launch approval.
- [ ] Review enabling main deployment and Production-scoped launch guard. Do not use the flag to bypass review.
- [ ] Record who may deploy/promote, when DNS may change, who monitors donations/forms, and stop conditions.
- [ ] Build the selected artifact for Production with correct metadata/settings. Do not simply promote a noindex/test-mode Preview artifact.
- [ ] Retain a known-good Vercel production deployment when available and verify rollback access. Before first cutover, Wix is the live fallback.
- [ ] Prepare reviewed revert PRs; never reset/force-push shared history.
- [ ] For a failed first cutover, Joe can restore the exact recorded Wix DNS/domain configuration and verify Wix, SSL and email. This requires owner authorization.
- [ ] For later failures, Joe can select the known-good Vercel rollback deployment, verify domains/metadata, then reconcile code through a revert PR.
- [ ] Check forms and donations after rollback; code/DNS rollback does not undo payments or resend messages.
- [ ] Keep Wix available until Joe closes the rollback window after production is stable.
