# GitHub, Vercel, and staging-domain setup

Inspected September 9, 2026. These are owner actions, not completed configuration. No production deployment, DNS mutation, or production domain assignment was performed.

## Observed state

- GitHub: SmokinJoeSJ/project-starburst. Default branch main. Initial remote main: e428a2ea5062998168c160168d03051052c98566.
- redesign-2026 was created and pushed at that baseline. Setup changes are on feature/plm-workflow-setup through a PR into redesign-2026; do not merge into main.
- Initially main was unprotected, no rulesets were returned, and no deployment/check records were present. Account protections still need configuration.
- No .vercel/project.json, Vercel CLI login, or Vercel account/project configuration was available. This does not prove no project exists in an owner's Vercel account.
- Existing .openai/hosting.json describes the prior Sites project. Preserve it and the previous private Sites review deployment.
- Public DNS still points to Wix: apex A records observed were 185.230.63.107, 185.230.63.171, 185.230.63.186; www CNAME was cdn3.wixdns.net. This is an observation, not a replacement DNS plan.
- No staging CNAME was returned. preview.projectstarburst.org has not been configured or verified by this task.

## 1. GitHub settings

1. Review this setup PR into redesign-2026. Merge it there only after checks and review; main stays unchanged.
2. In Settings → Rules → Rulesets, add branch rulesets targeting main and redesign-2026. Set enforcement Active, require pull requests, block force pushes and deletion, require resolved conversations, and require **Validate site** after its first successful workflow run.
3. Require another authorized review where practical and dismiss stale approvals. GitHub does not let an author approve their own PR; if Joe is the only reviewer, define an owner review/merge policy instead of assuming that requirement is satisfied.
4. Limit bypass permissions to named owners; code-based PR checks do not replace account authorization. Restrict repository write access.
5. Keep the explicit PR base redesign-2026. Optionally change GitHub's default branch to redesign-2026 during development so the UI suggests it; independently keep Vercel's Production Branch main. This task did not change the default branch.
6. After Vercel works, consider requiring its actual preview check on redesign PRs. Select the exact check name GitHub shows; none has been observed yet.

## 2. Vercel connection — avoid accidental first production deployment

Vercel documents that a **new project's first deployment is always Production**, even when starting from another branch. Importing the repository and clicking Deploy is not a preview-only operation. [Vercel environment behavior](https://vercel.com/docs/deployments/environments)

First inspect the owner's Vercel projects. If a suitable initialized project exists, verify its history, repository, production branch, domains, and environment scopes. Do not reuse a project serving another live site.

If a new project is needed, Joe must separately authorize its bootstrap plan. Preparing import settings is safe, but **stop before the first Deploy action** under this task's no-production-deployment requirement. Do not assign projectstarburst.org or www.projectstarburst.org. The build guard intentionally rejects Production builds from redesign/feature branches; do not work around it by pretending Production is Preview or setting a launch flag for staging.

Once an authorized initialized project is available, connect SmokinJoeSJ/project-starburst under Settings → Git:

| Setting                      | Required value                                        |
| ---------------------------- | ----------------------------------------------------- |
| Root Directory               | Repository root                                       |
| Framework Preset             | Other (not Next.js)                                   |
| Install Command              | npm ci                                                |
| Build Command                | npm run build:vercel                                  |
| Output Directory             | dist/client                                           |
| Node.js Version              | 22.x                                                  |
| Production Branch            | main                                                  |
| Preview branches             | Feature branches and redesign-2026 enabled            |
| System environment variables | Expose VERCEL_ENV and VERCEL_GIT_COMMIT_REF to builds |

vercel.json supplies settings for branches containing this setup. It does not protect old main: main still lacks the file. Keep main untouched and protected; do not trigger a main deployment during setup.

The Git allowlist enables feature/** and redesign-2026 and disables main and unspecified branches. This is a redesign-phase guard, deliberately stricter than the final launch model. PR previews require Vercel's Git integration and permissions; fork contributions may require owner approval. Verify the actual result before sharing. [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration)

## 3. Preview environment variables

In Settings → Environment Variables, select **Preview only**:

- PLM_PREVIEW_EMAIL: optional dedicated public test inbox. Leave unset for an on-page draft without opening an email app.
- PLM_STRIPE_TEST_PAYMENT_LINK: optional real Stripe test/sandbox Payment Link. Leave unset to keep donations inactive.

Neither value is a secret API credential; both can appear in public HTML. Never use a private inbox or secret key. Branch-specific Preview overrides can target redesign-2026. Rebuild after changing values because this is static output.

Leave PLM_PRODUCTION_LAUNCH_APPROVED unset throughout redesign. VERCEL_ENV and VERCEL_GIT_COMMIT_REF are provider-managed; do not forge them. PLM_BUILD_TARGET is internal.

Do not change production recipients, live payment settings, or existing production environment variables here. See [environment safety](environment-safety.md).

## 4. One stable staging domain

Use only **preview.projectstarburst.org**.

1. In the intended Vercel project, open Settings → Domains and add preview.projectstarburst.org.
2. Edit the domain: connect it to **Preview**, with Git Branch **redesign-2026**. Confirm the saved assignment.
3. Copy the precise DNS record Vercel displays. At the authoritative DNS provider add a CNAME, host/name **preview** (or full preview.projectstarburst.org if that UI requires it), targeting **the exact CNAME value shown by this Vercel project**. Use the normal/default TTL unless Vercel instructs otherwise.
4. The CNAME target is unknown from this repository. Do not use a guessed generic hostname or IP.
5. If ownership verification is requested, add only the exact TXT name/value Vercel displays; preserve unrelated TXT records.
6. Leave apex, www, nameservers, MX, SPF, DKIM, DMARC and all production records unchanged. Resolve any existing preview record conflict before replacing it.
7. Wait for valid configuration and SSL. Create/redeploy a **Preview** of redesign-2026 and verify the domain follows that branch.
8. Test access as a logged-out reviewer. Configure client access through Vercel deployment protection; noindex does not make a preview private.

[Assign a domain to a Git branch](https://vercel.com/docs/domains/working-with-domains/assign-domain-to-a-git-branch) · [Add a domain and use its displayed DNS record](https://vercel.com/docs/domains/working-with-domains/add-a-domain)

## 5. Acceptance on the actual host

- Push a real feature task branch; confirm the environment is Preview and its unique URL/check appears on the PR.
- Verify all routes on refresh and through navigation, including Home, back/forward, mobile menu, and closed event.
- Inspect RSC navigation: RSC: 1 must return text/x-component from its matching .rsc artifact; ordinary requests must return HTML. Conditional rewrites/headers keep these representations separate.
- Confirm noindex on feature/staging pages, no preview canonicals, empty preview sitemap, legacy PDF redirects, and HTTP 404 for unknown paths.
- Check contact draft/test inbox and Stripe test mode before any test checkout.
- Merge a reviewed feature PR into redesign-2026; confirm the stable domain updates without changing Wix or main.
- Record the verified Vercel project/team, working review URL, access procedure, and check names here after setup.

Static export/configuration was validated locally. Vercel routing, Git automation, TLS, and domain assignment remain unverified until hosted checks pass. [Vercel routing configuration](https://vercel.com/docs/project-configuration/vercel-json)

## Future launch only

Follow the [launch checklist](launch-checklist.md). A future launch PR must deliberately review enabling main in vercel.json and the Production-scoped PLM_PRODUCTION_LAUNCH_APPROVED guard. That flag alone is not client approval. Domain assignment, DNS cutover, live provider settings, and production deployment/promotion require a future explicit request.

Feature → temporary Preview; reviewed integration merge → stable Preview; separately approved final main merge and deployment → production. No automatic launch is part of setup.
