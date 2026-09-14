# PLM integration review: first real heading edit

Status: repository adapter verified; real PLM connection still unconfigured. This is not evidence of an authenticated save/reload.

## Reviewed baseline and coverage

- Branch: feature/plm-editor-integration-review, based directly on origin/redesign-2026 at 4fc4a0b8af318bbfde5ed1b41076d7d229df60c9 after owner-merged PR #5. PR #4 (brand/trust) remains separate and unmerged; its page refactor will need reconciliation with these content bindings when reviewed.
- Trusted manifest: content/plm-manifest.json, version starburst-v1.
- Approved values: content/plm-content.json. Base-content hash: 9ad0f44afc09399c6f6a5da3b518d1ad83665d4dd706b62efcba1c414d4300ba.
- Renderer: starburst-renderer-v1. Route: /plm-preview.
- Pinned PLM implementation: 6888039604f718fcf488da3557ac9395fa6563fa; plm-content/1, plm-preview/1, plm-export/1. Contract and parent implementation unchanged on current PLM main at review time.
- Nine public routes: /, /about-us, /contact, /get-help, /donate, /volunteer, /soupersupper, /souper-supper, /event-details/souper-supper.
- 310 fields: 183 editable (171 visual, including 12 images and their alt fields, plus 12 SEO fields); 127 locked. Every editable visual field was changed in memory and observed in a real maintained page component. See [coverage](content-coverage.md) and [evidence](evidence/results.json).
- Protected: payment destinations/configuration; recipients and form behavior; URLs/navigation; downloads; legal/policy and unverified claims, people and event facts; environment/SEO indexing/canonical rules. Some maintained structural copy remains outside the editor, explicitly listed in [protected functions](protected-functions.md).

The model is complete for this declared adapter scope, not an unrestricted site builder. No design, approved copy, public assets, provider settings or public behavior changed in this follow-up.

## Required before the real heading check

| Requirement | Current evidence | Action / owner |
| --- | --- | --- |
| Existing canonical PLM Site UUID | siteId is null in all three checked-in binding files | Joe / authorized PLM staff supplies the actual existing Site UUID. Match editor-binding, manifest and approved document in a reviewed feature change. |
| Exact PLM parent origin | parentOrigins is empty; HTTP frame-ancestors is 'none' | Approve the exact HTTPS editor origin, then set the binding and both scoped Vercel CSP entries together. Never wildcard. |
| Working authenticated PLM backend | PLM PR #129 is merged; hosted migration/session/membership were not verified here | PLM task/owner verifies the approved isolated database migration, active Site membership and server-backed editor operations. Do not apply migrations from Starburst. |
| PLM site registration | No real registration tested | Authorized PLM staff uses configuration/configure with this manifest/baseline, matching versions, exact feature previewOrigin, /plm-preview, and the handoff's constrained repo/path settings. |
| Authorized hosted iframe | Vercel Deployment Protection previously redirected anonymous access to SSO | Confirm signed-in reviewer access works in the cross-origin frame and PLM frame-src permits its exact origin. Preserve protection; do not publish bypass secrets. |
| Image media | No authorized asset mapping/origin supplied | Not needed for the first heading-only test while original image values remain null. Before image review, approve exact storage origin and verified real Site asset IDs; follow the handoff. |

No new Starburst environment secret is needed. Site/origin configuration is public configuration, not authentication. Existing PLM_STRIPE_TEST_PAYMENT_LINK and PLM_PREVIEW_EMAIL are ordinary Preview options; neither enables this editor connection.

## First authenticated heading test

Use an authorized isolated PLM session and the actual feature deployment listed on this PR, never the local fixture. Obtain the full Site registration and frame access above first.

1. Record the exact Starburst deployed commit, PLM deployment, canonical Site ID, manifest/renderer versions, approved base hash, and initial server document version. Do not record tokens or private data in evidence.
2. Open PLM Studio → Project Starburst → Edit Website. Confirm the known home page and successful version handshake. Select the actual homepage H1: inspector field must be home.heading.
3. Change only home.heading to owner-approved test wording. Confirm the real Starburst heading updates with the existing design and no full-page remount. A visual update alone is not a save.
4. Wait for PLM's actual successful server save acknowledgment. Record the returned document version/revision ID and success state, not credentials or the full private response.
5. Reload the editor. Confirm a real authenticated load restores that same saved revision and heading. Browser memory/session recovery alone does not pass this step.
6. Open ordinary / outside the editor at the same feature deployment and stable redesign deployment. Both must still show the checked-in approved heading; verify base-content revision is unchanged. Saving must not create a content PR or publish anything.
7. Record pass/fail, timestamps, revision IDs and redacted screenshots for selection, confirmed save and reload. Leave submit/review/export/merge as separately authorized actions.

Do not claim this path passed until these steps run against real PLM. No email, donation, provider call, membership write, real publishing action or production change is part of the test.

## Later publishing boundary

The importer validates the actual PLM export and preserves unrelated files/assets; a synthetic imported snapshot passed a local static build and real RSC navigation. That is not a real approved staging publication. PLM still needs a reviewed Git provider and resolution of its content/plm-* branch name versus Starburst's feature/** policy. These are later publishing blockers, not reasons to simulate a server save or broaden preview permissions.

The PR's feature deployment contains this follow-up. The stable redesign-2026 URL updates only after owner review, merge and a successful integration deployment. This task does not merge, deploy/promote production, change DNS, modify main, or alter Wix.
