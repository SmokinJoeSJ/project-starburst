# Project Starburst → PLM Studio adapter handoff

## Status and boundaries

Original adapter PR #5 is merged. This integration-review follow-up uses feature/plm-editor-integration-review from the latest verified origin/redesign-2026 baseline 4fc4a0b8af318bbfde5ed1b41076d7d229df60c9. Its PR targets redesign-2026 and must not merge automatically. The content extraction provenance remains 21cd8e8bc3dfebbfad2cbe38373a738b9cad4a55. See [integration review](integration-review.md) for the next real heading-edit check; the follow-up PR records its exact commit and deployment evidence. main and the live Wix implementation are separate; neither was changed. No production deployment, DNS/domain assignment, provider credentials, recipients, PLM migration or membership change is part of this work.

Implemented a static content adapter, not an editor/dashboard. Public pages and the isolated editor surface share components/pages/* and the existing Starburst components/styles. ContentText and ContentImage bind explicit field IDs; the context defaults to checked-in approved values during SSR. The public site does not fetch drafts or require PLM account credentials. HTML and RSC carry data-content-revision; metadata comes from the same snapshot. Editor drafts exist only in the frame's memory.

## Exact upstream contract

Read-only PLM checkout: feature/studio-connected-content-editor. Pinned PLM commit: **6888039604f718fcf488da3557ac9395fa6563fa** (PLM PR #129, now merged). On this review, the contract and parent files still match that commit byte-for-byte; the latest PLM main is 94647eda1a4fb023d92834fd79d97151d70a0460. The task initially inspected working changes on f4d2166; after PLM committed, the final validators and browser fixture were updated and retested against 6888039.

- assets/js/site-editor-contract.js SHA-256: ec7ce760e5f4850d0ad3e434881588884d4525b13ebb6645611cbba5a07bafa7
- assets/js/site-editor-preview.js SHA-256: 445624658775b5d115088bf531dc9cf2efacef551ae3665deeb3a1f621c9a0c1
- lib/site-editor-export.js SHA-256: 44f713c381a9bee9b2fd385cbc401809284e1b06afcaa7ca78ba4fc5db7569a5
- lib/site-editor-service.js SHA-256: d09c12e8b84ffda1889bcd2906c65f860a77a9e9e95d2a4faf9c050f94793670

The two unmodified upstream browser files are in tests/fixtures/editor/plm. lib/content/plm-contract.mjs changes packaging to ESM only. Do not casually diverge from this validator. PLM documentation read: docs/site-editor-contract-v1.md, docs/studio-editor-integration.md, docs/project-starburst-editor-handoff.md. The media implementation and constrained exporter were also inspected.

Contract: plm-content/1; bridge: plm-preview/1; export: plm-export/1. Manifest version starburst-v1; renderer version starburst-renderer-v1. Approved base hash is in content/plm-content.json; hash is SHA-256 of recursively key-sorted JSON values, UTF-8. sourceCommit is the extraction baseline, provenance only—not an authorization token or proof of deployment.

## Files and coverage

- content/plm-manifest.json: trusted field definitions, permissions and constraints.
- content/plm-content.json: approved values and durable media mapping.
- content/editor-binding.json: non-secret, owner-reviewed Site/origin/repository binding.
- components/content/fields.tsx: narrow reactive text/image bindings, shared context and protected map.
- components/content/preview-canvas.tsx and lib/content/bridge.mjs: actual pages, selection overlay and child connection.
- lib/content/validation.mjs and import.mjs: approved snapshot/export validation and constrained file import.
- scripts/validate-content.mjs runs before both builds. scripts/verify-export.mjs checks route export, HTML/RSC revision, SEO and assets.
- content-coverage.md / coverage.json: 310 field entries across nine public routes. protected-functions.md records code-maintained fields/functions outside the editor schema.

Stable item IDs cover goods, volunteer opportunities and testimonials. Line breaks are plain newline values rendered as explicit br elements; no HTML is accepted. An allowed empty value stays empty. Layout classes, styles, structural links, transactions, policy documents and scripts are never exported as content.

## Registration is intentionally pending

No canonical Starburst Site UUID or approved PLM parent/media origins were supplied. siteId:null is an explicitly **unbound local template**, not a wire-compatible PLM registration. Local validation checks its shape using an internal schema-only sentinel; the real bridge and importer reject an unbound registration. The sentinel is not a Site and is never sent to PLM. Do not upload/register these null-ID templates as if setup were complete.

Owner/authorized PLM staff must:

1. Supply the existing canonical Site UUID from PLM OS. Set the same UUID in editor-binding.json, plm-manifest.json and plm-content.json in a reviewed feature PR. Do not create another Site or invent a UUID.
2. Add only the exact approved HTTPS PLM editor origin(s) to parentOrigins. Add the exact existing Supabase Storage origin to mediaOrigins. Keep mediaPathPrefixes at /storage/v1/object/sign/plm-files/. These are public allowlist values, not credentials.
3. Set BOTH /plm-preview HTTP Content-Security-Policy entries in vercel.json (HTML and RSC route) to frame-ancestors followed by those exact origins. next.config.ts derives the same scoped worker header. validate:content rejects mismatches. Current default is frame-ancestors 'none'. Do not broaden ordinary routes or trust *.vercel.app.
4. Register approved existing images through PLM's site-scoped file service. No UUIDs have been fabricated. A null replacement preserves the maintained original photo; choosing a registered asset uses its real UUID. Approved exports use durable /media/starburst/*.webp files; no signed URL is checked in. Focal points/removal are unsupported in v1.
5. Register the manifest and approved baseline with the existing PLM configuration action, after the owner's isolated-environment migration/authorization checks. Set adapterType static-content-v1, contractVersion plm-content/1, manifestSource content/plm-manifest.json, previewPath /plm-preview, repository SmokinJoeSJ/project-starburst, stagingBranch redesign-2026, contentPath content/plm-content.json, assetPath public/media/starburst, allowedPaths [content/plm-content.json, public/media/starburst/*], reviewPolicy plm-review-staging-pr, targetLabel Redesign. previewOrigin must be the actual verified Starburst Preview origin. Set enabled/adapterReady only within the owner-approved isolated test registration; keep production registration unenabled until real end-to-end verification.
6. PLM must permit that exact Starburst origin in its frame-src policy. Verify signed-in Vercel access inside the cross-origin iframe, especially Safari. Preserve Deployment Protection. If it blocks embedding, arrange approved reviewer access / the smallest reviewed protection setting; do not share bypass secrets or disable protection across the project.

No new Starburst runtime secret or environment variable is required. Existing ordinary Preview settings remain PLM_STRIPE_TEST_PAYMENT_LINK (only an approved Stripe test link) and optional PLM_PREVIEW_EMAIL (test inbox). The editor surface always supplies an empty payment link and empty recipient and blocks side effects in both modes, regardless of ordinary Preview configuration.

## Child connection and behavior

Exact route /plm-preview, excluded from public navigation and sitemap, always noindex/nofollow, no canonical. No query string enables editing or authorizes drafts. Before connection it shows an intentional waiting/unconfigured state. The URL contains no nonce, draft, account token or credential.

The child implements the exact hello/ready, apply/ack, selected and error envelopes. Checks include exact parent origin and window source, UUID nonce and Site, known page, contract/renderer/manifest versions, integer sequence, page epoch, full document validation, locked fields and baseline/sourceCommit match. A tiny early mailbox captures one strictly checked, non-private hello because iframe load may precede React hydration. It never captures drafts. Connection listeners are removed at teardown. New frame load requires a fresh nonce; stale and out-of-order updates are rejected.

Acknowledgement follows React application. Selection echoes the latest channel sequence. Hover/selected/locked outlines do not affect layout; scrolling, resizing, font/image loads update geometry. Keyboard Enter/Space and touch select fields. Parent controls page, viewport and inspector selection without arbitrary URLs/selectors. Switching pages uses the same real components; changing text does not remount the page. Public/shared repeated values use the same field key.

Both editing and read-only draft modes block link activation, downloads, tel/mailto, form submission, payment actions, middle-click/context-menu navigation and embedded-map interaction. Read-only removes selection outlines; it does not restore transactional side effects. No new login or privileged API is implemented here.

The v1 ready payload does not define a base hash/revision field. We preserve its exact shape; baseContentHash and sourceCommit are checked on every apply. PLM document-version/revision concurrency remains parent/server-owned. Do not claim the nonce authenticates a user.

## Approved import / publishing boundary

Dry run: npm run content:import -- path/to/plm-export.json

Apply on a reviewed feature/* branch only: npm run content:import -- path/to/plm-export.json --asset-dir=path/to/authorized-derivatives --apply

The importer never creates a branch, pushes, calls PLM, downloads media or merges. It verifies exact Site/repo/staging binding, schema versions, full expectedContentHash, expectedBaseContentHash, sourceCommit, protected fields, declared changes and writable paths. Only the exact content JSON and validated WebP asset paths are writable. It rejects traversal, symlink outputs, existing-asset conflicts and stale content, preserves unrelated files and old assets, writes deterministic field order, and installs content after assets. JSONB object ordering does not change semantic validation/diffs. Run lint/type/test and both builds, inspect the diff, then open a feature PR into redesign-2026. Re-register the approved baseline after the reviewed staging change succeeds.

PLM's downloaded bundle contains asset references, not derivative bytes. Use only an authorized local copy of the already sanitized PLM derivative. Starburst verifies the WebP container/dimensions/size; it is not a second full image sanitizer. originalHash hashes the original upload, not the derivative bytes, so we do not falsely compare it to the WebP hash. The current PLM server-only exportDerivative handles privileged byte transfer for a future provider; no remote provider is wired to the HTTP export operation.

**Compatibility decision still needed:** upstream export names branches content/plm-<revision UUID>; Starburst's approved Git/Vercel workflow permits feature/**. The importer validates the upstream bundle name but applies it only on a locally selected feature branch and performs no Git publication. Before automatic publishing, PLM should adopt feature/plm-content-<revision UUID> in a reviewed contract/provider change, or Joe must explicitly approve a narrow content/plm-* deployment/rules exception. This task does neither silently.

## Evidence and limits

See validation.md and its linked local screenshots. Unit tests exercise the actual upstream validator; browser fixtures load the actual PLM parent PreviewConnection and the real Starburst page components on separate loopback origins. The fixture checks are not authenticated PLM access or durable save/reload. No fake PLM API response is used. Reload restores only parent memory in that test.

A synthetic approved export was imported into an isolated copy and built. Its heading, title/description, image/alt, HTML revision and real RSC navigation were verified in a browser. That proves the local approved-snapshot path, not a real PLM approval or hosted staging publication.

Still required: canonical Site/allowed origins/media registration; owner-approved PLM isolated migration and real permissions; authorized hosted iframe access; real server save/reload; immutable submit/review; real approved export transfer; reviewed staging PR merge/deployment; baseline reconciliation. PR creation, Vercel READY, an iframe and a mock handshake are distinct from these outcomes. No claim of full connection is made.
