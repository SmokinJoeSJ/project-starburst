# Wix rebuild baseline

Reference: https://www.projectstarburst.org/
Repository: https://github.com/SmokinJoeSJ/project-starburst
Captured: September 8, 2026 (America/New_York)

## Preserved

- Yellow original logo; the existing medium and bold Souvenir font files.
- Full-width darkened photo heroes, white pages, gray rounded information cards, blue pill buttons.
- Existing public page paths including /soupersupper.
- Seven homepage testimonials and scroll navigation.
- Help procedures, services, staff/board roster, operating hours, contact information.
- Souper Supper sponsor tiers, names, logos, links, event description and expired-event details.
- Volunteer application and nondiscrimination statement PDFs stored locally.
- Phone, email, directions, Facebook, and sponsor links.

## Intentional functional differences

- Stripe checkout is pending a public Payment Link supplied by the owner. Inactive controls cannot submit a donation.
- Contact messages open in the visitor's own email app. There is no backend inbox or automatic submission.
- Expired event remains closed; Wix account login and private guest list are not recreated.
- Accessible mobile navigation, keyboard focus styles, reduced-motion support, and responsive content are implemented.
- Original site is unchanged. Domain cutover and PLM Studio hosting remain a separate step.
- Source photographs and fonts are local assets. External map and sponsor websites need an internet connection.
- No WebMCP surface was added: the primary journey is reading content and navigating, and checkout is not configured.

## Review notes

The visual reference was inspected directly, but browser interaction testing of the new site was not requested. Production build and route/asset checks are used for this first baseline. Exact pixel parity and final integrations should be reviewed before the Wix cutover.

Validation completed: production build and TypeScript pass; all 9 routes respond successfully; all 40 referenced local assets/PDFs load; missing routes return 404. Original large photos were resized to at most 1920px and compressed from approximately 55.5 MB to 1.6 MB total.
