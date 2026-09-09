# PLM setup completion report

Prepared September 9, 2026 on feature/plm-workflow-setup.

## Git

- Production branch: remote main, unchanged at e428a2ea5062998168c160168d03051052c98566.
- Staging branch: redesign-2026, created/pushed from that verified baseline; no newer branch existed.
- Setup changes stay on feature/plm-workflow-setup for PR review into redesign-2026.
- Normal work: feature/* → reviewed PR → redesign-2026. Final approved launch: redesign-2026 → main PR.
- No main merge, force push, reset, history rewrite or production branch edit.
- The repository baseline is the initial rebuild; the current production website still runs on Wix, whose backend is outside Git.

## Vercel and DNS

Added a separate static export build, deployment branch allowlist, production build guard, RSC navigation rewrites/headers, preview SEO protection and two original PDF redirects. Existing Cloudflare/Sites build/configuration is retained.

Vercel account/project linkage and actual Preview deployments were not available to verify. preview.projectstarburst.org remains pending owner configuration. Use the [exact setup guide](vercel-setup.md): Preview environment, Git branch redesign-2026, DNS CNAME host preview to the precise target displayed by Vercel. No DNS target was invented.

A new Vercel project's first deployment is Production; Joe must authorize a separate bootstrap plan before clicking Deploy if no initialized project exists. Do not point apex/www at Vercel during staging setup.

## Environment and integrations

Optional Preview names: PLM_PREVIEW_EMAIL, PLM_STRIPE_TEST_PAYMENT_LINK. Provider-managed names: VERCEL_ENV, VERCEL_GIT_COMMIT_REF. Future guard PLM_PRODUCTION_LAUNCH_APPROVED stays unset. See [all names and classifications](environment-safety.md).

Preview contact is draft-only unless a separate test inbox is supplied. Production recipient remains unchanged. Stripe is selected but unconfigured; Preview accepts test links only. No PayPal, email provider, Supabase, analytics, webhook or CMS backend is implemented. Owner must inspect Wix's actual provider settings and receipts.

## Inventory and preservation

- Nine implemented content routes and all 47 public files retained.
- Live /event-list discovered as a missing migration route; deliberately not redesigned during setup.
- Two PDF resources and original URL mappings documented.
- Navigation, help/intake instructions, public contact details, sponsor tiers, testimonials, images, fonts, nonprofit copy and closed event state preserved.
- Hours conflict and stale Wix structured address flagged for owner content review.
- [Site inventory](site-inventory.md), [asset inventory](asset-inventory.md), [checksum manifest](asset-inventory.json).

## Files

- README.md: PLM Development Workflow and actual package commands.
- AGENTS.md: focused branch/PR and production safety instructions.
- docs/development-workflow.md: branch and remote review procedure.
- docs/vercel-setup.md: exact owner GitHub, Vercel, staging DNS and hosted validation steps.
- docs/environment-safety.md: environment names, preview behavior and integration classifications.
- docs/site-inventory.md, asset-inventory.md/json: routes, copy, resources, assets, dependencies, SEO and gaps.
- docs/launch-checklist.md: approval, providers, receipts, responsive/SEO/domain checks and rollback.
- .github/PULL_REQUEST_TEMPLATE.md and workflows/quality.yml: review template and CI.
- vercel.json, next.config.ts, vite.config.ts, package.json: static build alongside existing target.
- lib/deployment-policy.mjs, seo.ts, seo-documents.mjs, routes.mjs, contact-draft.mjs, scripts and tests: safety behavior and verification.
- app metadata/robots/sitemap, contact/donation controls: environment-aware behavior.
- .env.example, .gitignore and .oxlintrc.json: public configuration example and documented quality scope.

## Local validation

| Check | Result |
| --- | --- |
| npm run lint | PASS for maintained code; existing generated UI catalog excluded, documented in README |
| npm run type-check | PASS, including generated UI |
| npm test | PASS — 8 safety tests |
| npm run build | PASS — original Cloudflare/Sites production build target |
| npm run build:vercel | PASS — static preview output |
| Local production-mode render/check | PASS — index/follow and existing www canonicals; no deployment |
| Static artifact checks | PASS — 9 pages, RSC payload/routing, 40 linked assets, 47 checksum matches, robots/sitemap, redirects and 404 artifact |
| Vercel configuration schema | Used fields validated against current official definitions; unused provider schema fields omitted due to upstream draft inconsistency |
| git diff --check | PASS |

Local production-mode checking used an isolated child-process environment only. No Vercel environment settings or deployments were changed. Final local static output is preview-safe. Actual hosted routing, SSL, viewport/browser review, provider checkout and email delivery tests are pending; no messages or payments were sent.

GitHub Actions will independently run npm ci, lint, type-check, tests and both builds when the feature branch/PR is pushed. Its result is visible on the PR; local results above do not imply an unobserved CI or hosted deployment passed.

## Manual action required

1. Review/merge setup PR into redesign-2026 only.
2. Configure GitHub branch rules, review policy, access, and required Validate site check.
3. Inspect/prepare the correct initialized Vercel project and Git integration; authorize a separate first-deployment bootstrap if needed.
4. Assign preview.projectstarburst.org to Preview/redesign-2026 and add only Vercel's displayed staging CNAME/TXT records.
5. Optionally supply a public test inbox and actual Stripe test Payment Link in Preview scope.
6. Complete hosted preview acceptance and later resolve inventory/integration gaps using the launch checklist.

**main was not modified. Production was not deployed. Production DNS was not changed. The live Project Starburst Wix website remains intact.**
