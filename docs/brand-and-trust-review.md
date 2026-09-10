# Starburst brand and trust — review guide

Feature: `feature/starburst-brand-and-trust`  
Baseline: `origin/redesign-2026` at `21cd8e8bc3dfebbfad2cbe38373a738b9cad4a55` (the merged core-actions work).  
PR target: **redesign-2026**. This feature does not authorize a merge or launch.

## Delivered design

- One Starburst system: existing Souvenir/Arial pairing, original gold, warm white, charcoal, readable measures, shared CTA/form/focus states, and two restrained mark-inspired accents.
- About is an editorial introduction, documented founding story, concise services, staff/board directory, volunteer invitation, and original policy download.
- Contact puts phone, email, public hours, physical location, and mailing address first. Directions use the street address only. The optional map is titled and lazy-loaded inside a disclosure.
- The homepage leads with Get Help and Donate, followed by practical pantry information, a community story, distinct support options, published community stories, and existing partner marks. No undated counters or unverified event promotion.
- The existing action pages retain their structure. Shared typography, surfaces, widths and controls align them; unsupported public claims are replaced with useful neutral copy.
- Navigation preserves every destination and the existing mobile dialog/Escape/focus behavior. Footer copy is shorter, left-aligned, and separates visiting from mailing. No agency advertising was added.
- CTA, typography, form, navigation and footer styles now live in `app/starburst.css`; editorial layouts in `app/brand-pages.css`; core-action layouts remain in `app/actions.css`. Obsolete inherited page CSS was removed after checking its users. Event layout rules remain.
- New `components/starburst.tsx` supplies section headings, the small accent, address blocks, partner marks, visit summary and closing actions. `lib/organization.ts` centralizes shared facts, people, partner marks and selected photos.
- Donation amount input has an explicit ID to avoid an observed server/client generated-ID mismatch. Payment behavior did not change.

## Sources and owner decisions

Published pages were cross-checked on September 10, 2026: [Home](https://www.projectstarburst.org/), [About](https://www.projectstarburst.org/about-us), [Contact](https://www.projectstarburst.org/contact). The merged [core-action review](core-actions-review.md) records Get Help, Donate and Volunteer sources. A published source establishes provenance, not that every fact is current.

| Content item                                                                                                                                                              | Existing source                                       | Verification status                                                                         | Owner decision needed                                                                                             | Current placement                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Founded in 1971; Mecosta and Osceola service area                                                                                                                         | Published Wix Home/About and integration content      | Matches published material                                                                  | Confirm continued approved wording                                                                                | Home, About, shared data                                                                           |
| Phone, public email, M/W/F 10 AM–4 PM hours                                                                                                                               | Wix Contact and core pages                            | Matches published material                                                                  | Confirm current public and donation drop-off hours                                                                | Contact, footer, help/donation pages                                                               |
| 120 S. State Street; P.O. Box 313; Big Rapids MI 49307; parking-lot door/elevator                                                                                         | Wix Contact and integration content                   | Preserved; physical and mailing destinations separated                                      | Confirm entry/access instructions remain accurate                                                                 | Contact, footer, PantryDetails                                                                     |
| Connie Koepke — Pantry Manager; Allan Bauman — Assistant Pantry Manager                                                                                                   | Published Wix About                                   | Names/titles match published list                                                           | Approve current appointments and spelling before launch                                                           | About; centralized people data                                                                     |
| Board: Alice Bandstra (President), Russ Nehmer (Vice President), Dee Van Horn (Secretary), Dave Scott (Treasurer), Felicia Bielecki, Laura Veersma, Joie Cole, Steve Cole | Published Wix About                                   | Names/titles match published list; no biographies inferred                                  | Approve current roster and titles                                                                                 | About; centralized people data                                                                     |
| Monthly groceries, hygiene/Bombas socks, diaper bank for qualified children, case management/referrals                                                                    | Existing About/Get Help and prior review              | Preserved without adding eligibility or service guarantees                                  | Confirm current programs                                                                                          | About, Home, Get Help                                                                              |
| Impact figures and reporting periods                                                                                                                                      | Previous Home/About/Donate; original values below     | Reporting year and label differences unresolved                                             | Supply approved period, definitions and current figures before restoring                                          | Internal notes only; removed from public marketing                                                 |
| “100% of your donation” claim                                                                                                                                             | Previous Donate; original wording below               | No allocation evidence supplied                                                             | Approve substantiation or retire claim                                                                            | Internal notes only                                                                                |
| Public hours versus application hours                                                                                                                                     | Original Volunteer/Intern PDF, updated August 9, 2024 | PDF says Mon–Fri 10 AM–4 PM; public site says M/W/F                                         | Decide whether original PDF needs a separately approved update                                                    | PDF unchanged; web says call to confirm volunteer availability                                     |
| Application return method and volunteer shifts                                                                                                                            | PDF and original Volunteer page                       | No confirmed online submission or required schedule                                         | Confirm how applicants should return forms and arrange shifts                                                     | Volunteer directs applicants to call/email; community service still requires in-person application |
| Monthly Food Truck / third Friday schedule                                                                                                                                | Previous Volunteer copy                               | Current schedule unverified                                                                 | Confirm upcoming opportunities and any recurring schedule                                                         | Opportunity remains as “Food Truck Support”; visitors contact pantry for timing                    |
| Nonprofit/tax statement and non-discrimination policy                                                                                                                     | Existing approved copy and original PDF               | Wording/files unchanged                                                                     | Existing legal/launch approval remains required                                                                   | Donate, footer, About policy link                                                                  |
| Testimonials: Ruth, Kelly (two stories), Dawn, Ivory, Karla, Renee                                                                                                        | Existing homepage component and published Wix stories | Original words/attribution preserved; no added identities or portraits                      | Confirm continued permission/current suitability                                                                  | Home: one visible story; remaining stories in native disclosure                                    |
| United Way / Fremont Area Community Foundation marks                                                                                                                      | Existing site footer assets                           | Original marks retained                                                                     | Confirm current relationships and logo permissions                                                                | Home, footer                                                                                       |
| Selected photography                                                                                                                                                      | Original Wix asset collection, unchanged bytes        | Existing marketing imagery; subjects are not verified Starburst staff/volunteers/recipients | Prefer approved photos of the real pantry entrance, packing/distribution and community work; confirm usage rights | Home/About/action pages; neutral descriptions do not identify subjects as Starburst people         |
| Donations                                                                                                                                                                 | Existing Stripe selection/policy, empty public link   | Online giving unavailable until configured                                                  | Supply approved test Payment Link; complete payment/receipt checks separately                                     | Donate honest unavailable state; phone alternative                                                 |
| Contact delivery                                                                                                                                                          | Existing email-draft workflow                         | No backend or automatic receipt                                                             | Decide whether draft-based contact is acceptable for launch                                                       | Contact explicitly says Prepare Email and requires sending from the email application              |

### Archived claims for review, not publication

- 14,350 individuals; 574,000 meals (previous homepage used an annual label).
- 574,000+ meals; 3,561 families; 705 clients. About described the 705 as new clients; Donate used clients assisted. No reporting period is documented.
- Original giving claim: “Because we are community-based and locally funded, 100% of your donation goes toward feeding and assisting neighbors in Mecosta and Osceola counties.”
- Original Food Truck text: “Help provide fresh food to families on the third Friday of each month.”

No replacement metrics, financial percentages, biographies, testimonials, or schedules were invented.

## Functionality and launch gates

- DonationForm, Stripe provider selection, amount references, minimum amount and unavailable controls remain. Preview cannot fall back to live payments. The only code change inside DonationForm is a stable input ID.
- **No new environment variables required.** Optional Preview names remain **PLM_STRIPE_TEST_PAYMENT_LINK** and **PLM_PREVIEW_EMAIL**. Use a Stripe test Payment Link and an approved test inbox only.
- Contact validates email/message, identifies errors, focuses the first invalid field, preserves entered values and announces only draft preparation. No submission endpoint or email provider was added. Initial HTML safely disables draft controls until hydration; direct phone/email links remain usable without JavaScript.
- Default Preview produces an on-page draft without opening or sending email. A configured test inbox can open a mailto draft; the visitor must send it manually. Production recipient selection remains unchanged.
- Original volunteer and non-discrimination PDFs, legacy document redirects, all nine public routes, and all 47 inventoried original files remain intact. No policy/application text was rewritten.
- Souper Supper content, sponsors, aliases and closed registration remain unchanged. It is not promoted as an upcoming event.
- Existing Vercel build/export configuration, RSC navigation, production launch guard and Preview SEO policy remain. Preview is noindex with no production canonical; robots permits reading the noindex directive. Future approved Production on main remains indexable under the existing policy.
- Follow the [launch/rollback checklist](launch-checklist.md). Wix remains the live fallback independently of this repository’s main branch.

## Validation and remote review

See the PR for the verified commit, actual feature Preview, final check results and screenshots. Screenshots and browser results are recorded in `.reference/brand-trust/` locally; selected review images are included below after validation.

Local builds and checks do not by themselves certify a hosted Preview. Feature work becomes visible on the stable redesign-2026 review URL only after owner-approved PR merge and a successful integration deployment.

Payment success, decline/cancellation and donor/admin receipts require an approved sandbox link and a separate end-to-end check. No real donation, email to staff, personal-data submission or production record is part of this review. Responsive checks use browser emulation; physical-device and screen-reader review remain useful before launch.

## Factual portfolio notes

The design translates Starburst’s existing gold, typography and mark into a consistent public-service website. The work prioritizes assistance, separates practical contact information from organization storytelling, clarifies email-draft limitations, preserves existing applications and payment safeguards, and replaces unverified promotional claims with sourced, restrained copy. Shared components and centralized facts reduce competing implementations. Browser, accessibility and static-export checks document delivered behavior.

No conversion uplift, performance gain, visitor outcome or client endorsement has been measured or claimed. These notes are source material for a future approved PLM case study, not a case-study page or advertisement on this client site.

### Completed local validation

- `npm run lint`, `npm run type-check`, `npm test`: passed (9 tests).
- `npm run build`: existing Cloudflare target passed. `npm run build:vercel`: passed; 9 pages, 32 linked assets, all 47 original public files, RSC routing, SEO, sitemap, robots, document redirects and custom 404 verified.
- Compiled static output rendered in Chromium/Edge at **375, 390, 430, 768, 1024, 1440 and 1920 px**: all 63 route/width combinations returned 200, with one H1 and no horizontal overflow.
- Six primary pages at 390/1440 px passed axe-core WCAG A/AA checks. Contact draft/error states and the open mobile menu also passed. No page/console errors or broken images remained.
- Real compiled client navigation and refresh passed across all header destinations with valid RSC responses. Mobile menu open/close, Escape, focus return/trapping, CTA hash positioning, phone/email/directions links and the optional map were checked.
- Volunteer PDF downloaded in the browser and matched the original SHA-256. The unchanged non-discrimination PDF loaded.
- Empty/malformed email errors retained entries and focused the invalid field. The Preview prepared a draft only. Donation controls remained disabled without a test link.
- All six primary pages reflowed at **200% text at 390 and 768 px**. Reduced motion and no-JavaScript content/direct contact fallbacks passed.
- Souper Supper and its alias/detail route were checked at every width for shared-style regressions. Their content and registration status were not redesigned.

### Review screenshots

Captured from locally compiled Vercel output. Desktop captures use a 1440 px viewport and are reduced to 960 px for this documentation; mobile captures use 375 px (menu/form states: 390 px). Full-resolution originals remain in `.reference/brand-trust/`.

| Page     | Desktop                                                 | Mobile                                                 |
| -------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Homepage | [Screenshot](reviews/brand-and-trust/home-1440.jpg)     | [Screenshot](reviews/brand-and-trust/home-375.jpg)     |
| About    | [Screenshot](reviews/brand-and-trust/about-us-1440.jpg) | [Screenshot](reviews/brand-and-trust/about-us-375.jpg) |
| Contact  | [Screenshot](reviews/brand-and-trust/contact-1440.jpg)  | [Screenshot](reviews/brand-and-trust/contact-375.jpg)  |

[Mobile navigation](reviews/brand-and-trust/mobile-navigation-390.jpg) · [Form errors](reviews/brand-and-trust/contact-errors-390.jpg) · [Prepared draft](reviews/brand-and-trust/contact-draft-390.jpg)

No physical-device, screen-reader, email delivery or provider checkout certification is implied by these automated/browser checks.
