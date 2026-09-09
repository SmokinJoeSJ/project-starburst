# Project Starburst — PLM workflow

- Read README.md and docs/development-workflow.md before implementation.
- The live website remains on Wix. main is the repository's reserved production branch, not a snapshot of the Wix backend.
- Start normal work on feature/<focused-task> from the latest origin/redesign-2026. Inspect status and branches first; preserve newer work.
- Feature PRs target redesign-2026. Pass --base redesign-2026 to gh pr create.
- Never directly push feature changes to redesign-2026 when a review PR is practical.
- Do not edit main, merge into main, force-push, reset history, change production DNS, change production recipients/credentials, or deploy/promote production without a future explicit launch request.
- Do not deploy through Sites during this Vercel workflow unless explicitly requested. Preserve .openai/hosting.json and the existing build target.
- No redesign during workflow setup. Preserve public routes, assets, PDFs, content, navigation, and integrations.
- Run npm run lint, npm run type-check, npm test, npm run build, and npm run build:vercel for relevant implementation/configuration changes.
- Never expose environment values. Preview forms use draft-only behavior or an approved test inbox; payments use test links only.
- .github/workflows/quality.yml validates PR targets and builds. Repository files do not replace owner-managed GitHub rules or Vercel settings.
