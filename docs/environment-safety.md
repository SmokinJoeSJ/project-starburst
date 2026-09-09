# Environment and integration safety

Inspected September 9, 2026. Environment files, relevant process variables, source, dependencies, and hosting files were inspected without displaying secret values. No existing application credential variables or .env files were found. Provider dashboards were not available.

## Names and scopes

| Name                           | Scope / purpose                              | Current setup                                         |
| ------------------------------ | -------------------------------------------- | ----------------------------------------------------- |
| VERCEL_ENV                     | Vercel-managed environment identity          | Required at build time; absence defaults safely       |
| VERCEL_GIT_COMMIT_REF          | Vercel-managed branch identity               | main plus Production required for production behavior |
| PLM_PREVIEW_EMAIL              | Optional Preview-only public test inbox      | Unset; on-page draft                                  |
| PLM_STRIPE_TEST_PAYMENT_LINK   | Optional Preview-only public Stripe test URL | Unset; donation inactive                              |
| PLM_PRODUCTION_LAUNCH_APPROVED | Future Production-only build approval guard  | Not set; leave unset during redesign                  |
| PLM_BUILD_TARGET               | Internal static build switch                 | Set by build script                                   |
| CODEX_SANDBOX                  | Existing local development polling           | Tooling only                                          |
| WRANGLER_WRITE_LOGS            | Existing Cloudflare logging behavior         | Tooling only                                          |
| WRANGLER_LOG_PATH              | Existing local Cloudflare log directory      | Tooling only                                          |
| MINIFLARE_REGISTRY_PATH        | Existing local emulator registry directory   | Tooling only                                          |

.env.example contains blank optional public settings. Do not commit .env.local or credentials. Vercel values are baked into static output; changes require a new preview build. Test inbox addresses/public links are visible to site visitors.

## Classification

| Integration / behavior                                      | Classification             | Preview behavior and remaining action                                                  |
| ----------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| Static content, images/fonts, navigation, 404               | SAFE IN PREVIEW            | No backend mutation                                                                    |
| Blank volunteer application and nondiscrimination PDFs      | SAFE IN PREVIEW            | Local files; no completed application stored                                           |
| Contact form without test inbox                             | SAFE IN PREVIEW            | Validates and displays draft; no submission or mailto navigation                       |
| Contact form with test inbox                                | PREVIEW TEST MODE REQUIRED | Labeled draft to that inbox; visitor must still send                                   |
| Production form recipient                                   | PRODUCTION ONLY            | Original recipient retained for main Production                                        |
| Stripe donation checkout                                    | PREVIEW TEST MODE REQUIRED | Only buy.stripe.com/test_… links accepted; absent link inactive                        |
| Live Payment Link                                           | PRODUCTION ONLY            | Empty lib/site-config.ts setting unchanged; provider/launch work pending               |
| PayPal                                                      | MANUAL REVIEW REQUIRED     | No SDK, button, credentials, IPN/webhook or API in repo; inspect Wix provider settings |
| Direct public mailto/tel links                              | MANUAL REVIEW REQUIRED     | Published information retained; clicking can contact the real organization             |
| Google Maps iframe/directions                               | MANUAL REVIEW REQUIRED     | Loads Google with normal browser/network data; no repo API key                         |
| Facebook and sponsor links                                  | MANUAL REVIEW REQUIRED     | Real external sites; no posting/account API                                            |
| Expired Souper Supper tickets                               | SAFE IN PREVIEW            | Registration closed, sale ended; no checkout                                           |
| Wix events, members, submissions, admin/CMS                 | MANUAL REVIEW REQUIRED     | Not migrated; private state outside Git                                                |
| Client email receipt and admin notification                 | MANUAL REVIEW REQUIRED     | No delivery provider/automatic receipts; draft is not delivery                         |
| Analytics, pixels, Search Console verification              | MANUAL REVIEW REQUIRED     | None in repo; owner must inspect Wix and choose preservation plan                      |
| Production analytics/live webhooks, if added                | PRODUCTION ONLY            | None exists now; never copy live settings into Preview                                 |
| Supabase, external data APIs, actions, application webhooks | MANUAL REVIEW REQUIRED     | None implemented; future use needs a fresh audit                                       |

No fake credentials, test accounts, transactions, messages or webhooks were created. Production environment values and recipients were not altered.

## Preview safeguards

- Default/unknown/local environments are preview-safe.
- Indexable output requires VERCEL_ENV=production and VERCEL_GIT_COMMIT_REF=main. The static build also requires the future launch guard.
- Preview donations never fall back to production. Invalid hosts or wrong-mode Stripe links fail the build.
- Preview contact never falls back to production. Invalid inboxes or the same address as production fail validation.
- Production contact retains the email-draft behavior; no new sending backend is implied.
- Preview HTML: noindex, follow, no canonical. robots allows crawling to read noindex; sitemap has no URLs. Production: existing www origin, index/follow and canonical sitemap. The event alias canonicalizes to /soupersupper.
- RSC payloads are noindex data representations.
- Build-time guards do not provide authentication. Configure Vercel deployment protection for confidential review.

## Provider preparation

In Stripe, use the intended sandbox/test environment and create a Payment Link with customer-chosen donation amount. Supply only its public test link for Preview. Confirm checkout visibly indicates test mode. No live link exists yet; leave the production placeholder unchanged. [Stripe Payment Link setup](https://docs.stripe.com/payment-links/create)

Choose a contact delivery service when direct submissions are requested. Define a test inbox, real office/admin inbox, client acknowledgment, spam handling, errors and retention. Draft preparation is not a receipt test.

Inspect Wix for actual donation providers (including PayPal if used), receipts, subscriptions/recurring gifts, transaction history, events, contacts, automations, analytics and verification tags. Public HTML and this repository cannot prove those dashboard settings.

The stable preview host also receives an explicit host-scoped X-Robots-Tag: noindex header for every file, including PDFs. This rule never matches the production domain. Temporary Vercel previews retain provider preview indexing protection in addition to page metadata; verify headers on the actual host.
