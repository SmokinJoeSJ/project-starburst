# Existing Starburst Site — binding review

This configuration-only repair follows merged adapter PRs #5 and #6. It does not add an editor, alter approved content, create a Site/client, or publish a content revision. Feature branch: `feature/plm-editor-site-binding`, based on `eac75d689e7c55252c9e1068faf2ebaf97197d57`; PR target: `redesign-2026`. Do not merge automatically.

## Exact binding

- Owner-supplied existing Site UUID: **518918e1-9cca-4144-bd1a-ff190bd221f1** (Project Starburst). Set identically in `content/editor-binding.json`, `content/plm-manifest.json`, `content/plm-content.json`.
- Contract: `plm-content/1`; manifest: `starburst-v1`; renderer: `starburst-renderer-v1`; bridge: `plm-preview/1`.
- Repository: `SmokinJoeSJ/project-starburst`; integration branch: `redesign-2026`; child route: `/plm-preview`.
- Approved PLM parent: `https://plm-website-git-fix-os-site-editor-entry-platinum-luxe-media.vercel.app` (PLM repair PR #130, deployment confirmed Preview/Ready by GitHub/Vercel).
- Public values, baseline hash and source commit are unchanged. A null image replacement continues to render the maintained original photo.

Only `/plm-preview` permits this exact parent in its HTML and RSC `frame-ancestors` policy. The existing worker header derives the same value from the binding. No wildcard, production PLM origin, global header override or Vercel protection setting was added. Ordinary public pages, main, Wix, DNS, domains, forms and payment settings are unchanged.

The PLM repair's OS link is `/studio-editor?site_id=518918e1-9cca-4144-bd1a-ff190bd221f1&from=os`. Existing server staff authority is independent of client Studio invitations; **Not invited** remains truthful. Normal client access must use an approved Site membership.

## Hosted registration still required

The supplied UUID is accepted from the owner's existing record, not fabricated. Browser control currently fails before navigation (`windows sandbox failed: helper_unknown_error: apply deny-read ACLs`). No authenticated hosted lookup, configuration upsert, media registration or draft save has been performed in this repair. The failure is not evidence that the authenticated PLM/Vercel session is invalid.

After this feature Preview is Ready, register its exact child origin in PLM's existing configuration UI, together with this branch's manifest and approved baseline. Read the existing configuration first; keep its version and revisions. Use the existing transactional configure upsert for this Site, never create a duplicate. PLM's reviewed migration must already be available in the approved test environment. Do not apply a production migration as a workaround.

`mediaOrigins` intentionally remains empty: no authenticated storage origin or safe Site-owned asset has been verified. Do not invent an asset UUID, signed URL or storage host. Heading/button/shared-text checks can proceed with maintained original images. Image replacement requires a separately verified Site-owned image and its exact storage origin.

## Real verification gate

1. Open the repair PLM Preview and this Starburst feature Preview using the existing authorized Vercel session.
2. OS → existing Project Starburst → Advanced Edit; confirm the exact Site name and internal-admin mode.
3. Confirm the real `/plm-preview` handshake and actual homepage H1 selection.
4. Save a temporary heading draft; reload the entire PLM editor and confirm it comes back from PLM's server.
5. Open the ordinary Starburst feature Preview homepage and confirm its approved heading remains unchanged.
6. Restore the original draft value, save and reload again. Do not submit a content PR or publish.

Local bridge tests and a Ready deployment do not satisfy this hosted gate. Vercel authentication/protection, iframe access, real Supabase persistence and real-device Safari remain unverified until the gate is completed. No client invitation is needed for authorized PLM staff. Use the existing invite/accept workflow only for a separately approved nonproduction client test account.
