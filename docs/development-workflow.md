# PLM Development Workflow

## Branches and the current baseline

| Purpose              | Branch         | Domain                                                                         |
| -------------------- | -------------- | ------------------------------------------------------------------------------ |
| Reserved production  | main           | projectstarburst.org (currently still Wix; www is the existing canonical host) |
| Redesign integration | redesign-2026  | preview.projectstarburst.org once the owner configures it                      |
| Focused work         | feature/<task> | Temporary Vercel Preview URL after Vercel setup                                |

The verified baseline is commit e428a2ea5062998168c160168d03051052c98566. It is the first repository rebuild, not an export of Wix's backend, submissions, payments, or dashboard settings. main and redesign-2026 started at that same commit. Keep the live Wix site running throughout review.

Normal feature PRs target **redesign-2026**. Only an explicitly approved final launch PR targets main. Creating an integration branch is a one-time bootstrap; ordinary changes reach it through reviewed PRs.

## Start a focused task

Inspect the working tree first; do not discard unrelated or newer work.

```sh
git status
git fetch origin
git switch -c feature/homepage origin/redesign-2026
git config branch.feature/homepage.gh-merge-base redesign-2026
npm ci
npm run dev
```

Use a different focused branch name for each task. Existing work should resume on its own branch. Check the base explicitly even if GitHub suggests main.

```sh
npm run lint
npm run type-check
npm test
npm run build
npm run build:vercel
git diff --check
git add <reviewed-files>
git commit -m "Describe the focused change"
git push -u origin feature/homepage
gh pr create --base redesign-2026 --head feature/homepage
```

The command with <reviewed-files> is a placeholder: stage only the files belonging to the task. Do not paste the brackets into a shell. build validates the existing Cloudflare/Sites target; build:vercel creates and verifies static Vercel output. Neither build deploys. npm start serves the Cloudflare output, so run npm run build before using it after a Vercel build.

## Remote review

1. Open the Project Starburst Codex project.
2. Give Codex one focused task and keep the existing live site unchanged.
3. Work on feature/<task> from the latest origin/redesign-2026.
4. Push the feature branch.
5. After Vercel is configured, its Git integration creates a temporary Preview URL.
6. Joe reviews that URL from a phone, tablet, or desktop browser.
7. Joe sends changes to Codex in the same task.
8. Codex updates and pushes the same branch; Vercel rebuilds its preview.
9. Create or complete the PR into redesign-2026 and fill in the review template.
10. Merge into redesign-2026 only after review and required checks pass.
11. Vercel updates preview.projectstarburst.org to that integration branch.

Ordinary review does not require local development. Send clients only the stable staging URL unless a specific feature preview is intentionally needed. Do not send a pending/unconfigured staging URL as if it were working. Confirm the reviewer can access it, including Vercel deployment protection.

## Review and launch boundaries

The quality workflow checks feature PR targets and both build targets. GitHub branch rules and Vercel access/deployment settings are still owner-managed: see [Vercel and GitHub setup](vercel-setup.md). A green build is not launch approval.

A launch is a separately approved redesign-2026 → main PR using the [launch checklist](launch-checklist.md). This setup blocks automatic main deployments in its Vercel configuration and requires an explicit production build flag. Those guards must be deliberately reviewed during the future launch task. They do not protect older commits that lack these files, and they are not substitutes for account permissions.

Use reviewed revert PRs to undo code changes; keep Git history. Do not reset or force-push shared branches. Production rollback requires Joe's authorization and a known previous deployment/domain configuration. Keep Wix available until the cutover and rollback window are complete.
