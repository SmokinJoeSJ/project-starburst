# Project Starburst

First rebuild of the existing Wix website for PLM Studio, based on the public site captured September 8, 2026.

## Run locally

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
```

The project uses React, TypeScript, Vinext/Vite, and the Sites Cloudflare starter. Server output is in `dist/server` and public assets are in `dist/client`.

## Included pages

- Home
- Get Help
- About Us
- Souper Supper (`/soupersupper`, with `/souper-supper` as an alias)
- Souper Supper event details (registration is closed, as on the source site)
- Volunteer
- Contact
- Donate

Shared responsive navigation, footer, source photos, logo, Souvenir fonts, sponsor logos, community testimonials, and two public PDF forms are included. The source files are independent of Wix; the embedded Google map, Facebook links, and sponsor links remain external.

## Integrations still needed

- **Stripe:** The owner selected Stripe but does not have a Payment Link yet. Add a customer-chooses-amount public Stripe Payment Link in `lib/site-config.ts`. The donation controls explicitly show that online donations are not available until configured. No payment requests or charges are made by this build. The original amount/comments layout is retained as an inactive reference; the configured link delegates donation amount entry to Stripe.
- **Contact delivery:** The contact form validates input and opens a prefilled email to `br@projectstarburst.org`. It does not send or store messages automatically. Choose a delivery service before enabling direct submissions.
- **PLM Studio deployment:** Hosting requirements and production deployment credentials have not been supplied. A private Sites preview can be used for review. The Wix site and domain/DNS are untouched.
- **Production search indexing:** The rebuild has `noindex, nofollow` metadata to avoid indexing a duplicate. Set the final canonical origin and update indexing before the production cutover.

## Content fidelity

The initial version deliberately preserves the source site's wording, displayed impact figures, staff names, event date, and 2025 copyright. Review these as a separate content update before going live. The full donor/sponsor list is retained. Unlinked individual sponsors are displayed without a fake website link. The expired event has no purchasable tickets.

Assets in `public/assets` and `public/documents` were copied from the owner's existing public site for this migration. The website's existing assets and fonts are subject to their original rights and licenses. See `docs/migration-notes.md` for scope and validation notes.
