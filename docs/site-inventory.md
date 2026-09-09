# Current Project Starburst implementation inventory

Sources: repository baseline e428a2ea5062998168c160168d03051052c98566; public Wix captures September 8; live robots, all sitemap partitions and /event-list inspected September 9, 2026. Live Wix remains authoritative during redesign. Private Wix/admin settings are not captured in Git.

## Public routes

The live [page sitemap](https://www.projectstarburst.org/pages-sitemap.xml) lists eight pages; the [event sitemap](https://www.projectstarburst.org/event-pages-sitemap.xml) adds the event detail. The member-profile sitemap is empty. These are all public content routes found; undisclosed Wix app/member endpoints cannot be exhaustively enumerated from public navigation.

| Route                        | Repository implementation                | Content / behavior                                                                                                         |
| ---------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| /                            | app/page.tsx                             | Mission, impact, ways to help, testimonials                                                                                |
| /about-us                    | app/about-us/page.tsx                    | Services, values, team, equal-access PDF                                                                                   |
| /get-help                    | app/get-help/page.tsx                    | In-person intake, groceries, dietary/family needs                                                                          |
| /donate                      | app/donate/page.tsx                      | Online donation placeholder, goods, matching/fundraising/planned giving                                                    |
| /volunteer                   | app/volunteer/page.tsx                   | Six opportunities, application PDF, community-service exception                                                            |
| /contact                     | app/contact/page.tsx                     | Form, public details, map/directions, hours, Facebook                                                                      |
| /soupersupper                | app/soupersupper/page.tsx                | Event, sponsor tiers/logos/links                                                                                           |
| /event-details/souper-supper | app/event-details/souper-supper/page.tsx | March 25 event, prices, registration closed/sale ended                                                                     |
| /event-list                  | **Missing from repository baseline**     | Live Wix “Upcoming Events”, Souper Supper card/Details, Wix Log In. Implement or approve a relevant redirect before launch |
| /souper-supper               | app/souper-supper/page.tsx               | Existing repository alias of /soupersupper, not in live sitemap                                                            |

New infrastructure: /robots.txt and /sitemap.xml. app/not-found.tsx supplies unknown-route handling; Vercel export includes 404.html. No SPA catch-all conceals missing routes.

Live /sitemap.xml indexes /pages-sitemap.xml, /event-pages-sitemap.xml and /member-profiles_p_first-chunk-sitemap.xml. The new canonical sitemap can replace that index after approved launch; evaluate old sitemap partition redirects and update Search Console then.

Two published resource URLs receive permanent Vercel redirects:

| Old path                                                | Preserved resource                          |
| ------------------------------------------------------- | ------------------------------------------- |
| /_files/ugd/ffdbc4_b7f37e5672f54b16a7713675a68249fd.pdf | /documents/non-discrimination-statement.pdf |
| /_files/ugd/ffdbc4_9c90c2418eef4d0da44f142484523681.pdf | /documents/volunteer-application.pdf        |

Repository configuration only; live routing is unchanged. No /event-list page or speculative event redirect was added during setup.

## Content that must survive

- Mission: food/basic needs with dignity for neighbors in Mecosta and Osceola counties; food/hygiene pantry plus other support.
- Established 1971, locally funded and community-based. Baseline: 14,350 individuals, 3,561 families, 574,000+ meals, 705 clients. Confirm reporting period and accuracy before editorial updates.
- Monthly groceries customized for family size/dietary needs. In-person first registration; volunteers package food and provide a wagon that clients return.
- Diaper Bank qualifications/call-ahead; referrals to Mid Michigan Community Action Center, Michigan Works, Michigan Department of Health & Human Services; hygiene/Bombas socks.
- 120 S. State Street, Big Rapids, MI 49307; P.O. Box 313. United Church of Big Rapids, parking lot door, elevator to bottom floor. Phone (231) 796-5342; br@projectstarburst.org.
- Main-page hours: Monday/Wednesday/Friday 10 AM–4 PM. Wix event-list footer says Monday–Friday: **owner must resolve this inconsistency**.
- Staff: Connie Koepke, Pantry Manager; Allan Bauman, Assistant Pantry Manager. Board: Alice Bandstra (President), Russ Nehmer (Vice President), Dee Van Horn (Secretary), Dave Scott (Treasurer), Felicia Bielecki, Laura Veersma, Joie Cole, Steve Cole.
- Volunteer: third-Friday food truck, food drives, groups, court-ordered service, unloading/organizing, distribution. Community-service applicants must apply in person.
- Goods: canned/dry foods, toiletries, baby supplies, household essentials. Preserve matching, fundraising, planned giving, nonprofit/tax wording for owner review.
- Seven testimonials in components/testimonials.tsx, including two Kelly entries; preserve attribution and wording until editorial review.
- 8th Annual Souper Supper, March 25, 2026, 11 AM–3 PM, Three Girls Bakery, 106 N. Michigan Ave. Ages 18+ $20 + $0.50 fee; ages 6–17 $10 + $0.25. **Expired: do not reopen sales.** Historical February 9 ticket copy needs editorial review.
- Title sponsor Northland Global Methodist. lib/sponsors.ts: 22 entries, Partner (4), Neighbor (1), Friend (6), Supporter (3), Donor (8). Preserve names, tiers, logos, links and intentionally unlinked individual donors.
- Copyright 2025, nonprofit status, equal-access statement, United Way and Fremont Area Community Foundation marks.

Setup changes metadata and preview controls, with small lint/markup corrections. It does not revise design, roster, figures, dates or the above copy.

## Assets and project media

[All 47 public files](asset-inventory.md) have sizes; the [manifest](asset-inventory.json) includes SHA-256 checksums and recorded source URLs.

Original yellow logo.svg; Souvenir medium/bold WOFF2; Facebook mark; food/community/volunteer heroes; donation badge; soup photo and event poster; sponsor/partner marks and source variants; volunteer and nondiscrimination PDFs. No local video/audio found. Original rights/licenses remain applicable; first-rebuild photo optimization did not change ownership.

Shared design locations already exist: app/globals.css (tokens, typography, responsive rules), components/site-shell.tsx (navigation/footer), components/page-parts.tsx (sections), components/ui (control catalog). No extra design-system directory is needed.

## Functionality and dependencies

| Area         | Repository behavior                                                    | Migration/owner dependency                                   |
| ------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| Navigation   | Desktop/mobile header, footer, links, skip link, testimonial scrolling | Keyboard, viewport and hosted routing review                 |
| Contact      | Validated draft; production mailto; preview on-page/test inbox         | No storage, spam processing, sending provider or receipts    |
| Help/support | Instructions and phone/email                                           | Intake/computer system outside this app                      |
| Volunteer    | Blank PDF download                                                     | Submission and community-service intake outside app          |
| Donations    | Inactive; Stripe selected, link absent                                 | Account, sandbox, receipts, confirmation, approval           |
| PayPal       | No credentials/SDK/API/webhook found                                   | Inspect Wix before calling it unused in production           |
| Events       | Static sponsors/closed detail; no checkout                             | Wix events, member/login/guest records not migrated          |
| Email        | Public mailto links only                                               | Mailbox ownership, office/client/admin delivery confirmation |
| Resources    | Two PDFs, legacy redirects                                             | Approve versions and test real-device downloads              |
| External     | Google map/directions, Facebook, sponsors                              | Real external pages; no application API credentials          |
| Admin/CMS    | TSX and lib/sponsors.ts, no admin/backend                              | Wix data/editorial workflow requires future decision         |

## SEO and deployment

Repository baseline: shared title/description, per-page titles, logo favicon, unconditional noindex/nofollow; no canonical, sitemap, robots route, JSON-LD or redirects. Shared description remains unchanged; route descriptions/social cards are later SEO work.

Live Wix: www canonical host, robots allowing normal crawling plus Wix-specific bot rules, sitemap index, open-graph metadata, LocalBusiness and WebSite JSON-LD. **Home LocalBusiness JSON-LD incorrectly says Ephrata, PA 17522**, while visible contact copy says Big Rapids, MI 49307. Correct/approve structured data instead of copying that stale address.

Setup: environment-aware indexing/canonicals; empty preview sitemap; Production sitemap has eight implemented canonical pages; /souper-supper canonicalizes to /soupersupper; RSC data noindex; two PDF redirects. Missing /event-list and structured/social metadata parity remain launch requirements.

Hosting: existing Cloudflare/Sites build and marker, separate static Vercel target. No Supabase/D1/R2 binding, analytics, email SDK, payment SDK, external application API, webhook, middleware, server action or application API route found. GitHub Actions validates; it does not deploy. Vercel connection and staging DNS remain owner work.

Before cutover, preserve Wix provider configurations, submissions, transactions/recurring payments, contacts, event/member data, DNS, redirects, verification records and rollback access. Git history alone does not preserve those systems.
