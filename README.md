# Project Starburst

PLM's first client-site workflow, built from the existing [Project Starburst Wix site](https://www.projectstarburst.org/). The repository supports reviewed feature development and Vercel staging while the existing Wix website stays live.

**The live website is still on Wix.** The repository's main branch contains the initial rebuild, not Wix's backend or payment/submission history. Production DNS and the existing live implementation stay unchanged until Joe approves a separate launch.

## PLM Development Workflow

| Purpose                      | Branch        | Domain / review destination                                |
| ---------------------------- | ------------- | ---------------------------------------------------------- |
| Production (reserved in Git) | main          | projectstarburst.org; currently Wix, with www as canonical |
| Staging                      | redesign-2026 | preview.projectstarburst.org once configured               |
| Feature work                 | feature/*     | Unique Vercel Preview deployment                           |

During redesign: _*feature/* → PR → redesign-2026_*. Use `gh pr create --base redesign-2026`. Review before merging; do not routinely push straight to the integration branch.

Final launch: separately approved **redesign-2026 → main PR**. Setup includes guards against automatic main deployment. Ordinary feature review does not authorize production deployment, domain reassignment, or DNS cutover.

Joe can review from a phone, tablet, or browser without running the project locally. Send clients the stable staging URL after configuration; use a feature preview only when intentionally reviewing that feature. Follow the [remote workflow](docs/development-workflow.md) and [owner setup guide](docs/vercel-setup.md).

## Core action page redesign

The current feature redesigns Get Help, Donate, and Volunteer and establishes shared Starburst CTAs. The homepage receives a CTA-only pass; About and Contact receive shared data/action updates. See the [feature review guide](docs/core-actions-review.md) for implementation scope, content sources, preserved payment/application behavior, and facts requiring owner review. Review its feature Preview before merging into redesign-2026.

## Commands

Use Node.js 22 (at least 22.13) and the committed npm lockfile.

| Task                                               | Command                |
| -------------------------------------------------- | ---------------------- |
| Install                                            | `npm ci`               |
| Development server                                 | `npm run dev`          |
| Lint                                               | `npm run lint`         |
| Type-check                                         | `npm run type-check`   |
| Tests                                              | `npm test`             |
| Existing production build target: Cloudflare/Sites | `npm run build`        |
| Vercel static production build output              | `npm run build:vercel` |
| Serve existing Cloudflare build locally            | `npm start`            |
| Formatter                                          | `npm run format`       |

Build commands create local artifacts only; they do not deploy. A local Vercel build defaults to preview-safe output. Indexable output requires Vercel Production on main, with a separately approved launch flag. Both targets use dist; rebuild the Cloudflare target before npm start if the last build was for Vercel.

## Framework and deployment

React 19, TypeScript, Vinext on Vite, Tailwind, and the existing Sites/Cloudflare starter. This is **not a standard Next.js Vercel project** despite its App Router layout and next/* compatibility imports.

The existing build and .openai/hosting.json remain intact. The additional static export uses vercel.json, npm run build:vercel, and dist/client. It includes HTML and RSC navigation routing, generated robots/sitemap, and legacy PDF redirects. Adding server APIs, actions, authentication, or a CMS will require a reviewed hosting change.

The Vercel project project-starburst is connected under platinum-luxe-media. Git-triggered feature and integration Previews are verified. Use the [stable redesign branch preview](https://project-starburst-git-redesign-2026-platinum-luxe-media.vercel.app) with authorized Vercel access until preview.projectstarburst.org is configured. See [hosted verification](docs/staging-verification.md) and [remaining owner actions](docs/vercel-setup.md), including the dashboard guard for old main.

## Integrations and review boundaries

- Stripe is selected, but no Payment Link exists yet. The production setting in lib/site-config.ts remains empty. Previews accept only an explicitly supplied Stripe test Payment Link.
- Contact is an email-draft flow, not a delivery service. Previews default to an on-page draft; an optional test inbox can open a test email draft. Production retains the original mailto recipient.
- No PayPal SDK, Supabase, analytics, email provider, webhook, or admin/CMS integration is implemented. Live Wix dashboard/provider settings need owner inspection.
- Preview pages are noindex with no canonical; approved main Production output is indexable and uses the existing www production origin. Preview sitemaps contain no URLs.
- Original copy, dates, figures, sponsor lists, assets, and PDFs are preserved. /event-list was discovered on the live Wix sitemap and is a documented migration gap.

See the [environment audit](docs/environment-safety.md), [site inventory](docs/site-inventory.md), [asset inventory](docs/asset-inventory.md), and [launch checklist](docs/launch-checklist.md).

## Quality scope

GitHub Actions validates PR targets, lint, TypeScript, safety tests, and both build targets. Static export verification checks implemented routes, linked assets, SEO, navigation payloads, and 404 output.

Lint covers maintained site and workflow code. The pre-existing generated components/ui catalog and hooks/use-mobile.ts are excluded from lint because their baseline includes compiler and accessibility wrapper diagnostics; TypeScript still checks them. The Next Image recommendation is disabled because this build serves locally optimized static images. No dependency versions or public assets were changed.

The [original migration notes](docs/migration-notes.md) describe the first rebuild. The current workflow and safety audit supersede their deployment assumptions. Hosted HTTP routes, React navigation, assets, and SEO have been checked. Viewport/interaction review and provider delivery tests remain owner review steps.

## PLM Studio content adapter

The site now has a versioned approved-content model and an isolated `/plm-preview` renderer. The real editor connection remains disabled until the canonical PLM Site and exact origins are registered. Start with [the integration handoff](docs/editor/plm-handoff.md), [coverage matrix](docs/editor/content-coverage.md), and [validation evidence](docs/editor/validation.md). Drafts, authentication, review and publishing stay in PLM. Ordinary content exports use reviewed feature PRs into `redesign-2026`; no production launch is implied.

`npm run validate:content` runs before both builds. `npm run content:import -- bundle.json` validates an authorized PLM export without writing; see the handoff for constrained application and media transfer.
