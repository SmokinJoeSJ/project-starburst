# Hosted staging verification

Verified September 9, 2026 through the authenticated Vercel CLI, using the installed Vercel plugin's CLI/API guidance.

## Evidence

- Project: platinum-luxe-media / project-starburst.
- Existing setup: PR #1 merged into redesign-2026 at 4aab6995db4a70640fa5ef44098e6128dcfc1102.
- Git integration trigger: b885ec4543798aee72a2bf9c263c5029ffcc2e57, pushed successfully to redesign-2026; [GitHub Actions passed](https://github.com/SmokinJoeSJ/project-starburst/actions/runs/34341473647).
- The first integration Preview returned real HTML at /, but RSC navigation returned HTML instead of React data.
- Routing fix: 843865d584756d4d6c47e87ff3b1967aaa9d83cb on feature/vercel-rsc-routing, reviewed through [PR #2 into redesign-2026](https://github.com/SmokinJoeSJ/project-starburst/pull/2).
- Verified feature deployment: https://project-starburst-4t94umn5z-platinum-luxe-media.vercel.app.
- Build: npm ci, npm run build:vercel, output dist/client; Vercel status Ready, environment Preview.
- [Feature validation passed](https://github.com/SmokinJoeSJ/project-starburst/actions/runs/34343051201), including lint, type-check, nine tests, Cloudflare build, and Vercel export. The same checks passed locally.
- Integration review URL: https://project-starburst-git-redesign-2026-platinum-luxe-media.vercel.app. This alias follows redesign-2026, including the routing fix after PR #2 merges.

## Hosted results for the routing fix

| Check | Result |
| --- | --- |
| / | HTTP 200, real site content |
| Direct public pages | 9/9 HTTP 200 |
| RSC navigation with RSC: 1 and ?_rsc=plm-verification | 9/9 valid React payloads, text/x-component |
| Public files | 47/47 HTTP 200 and SHA-256 matches against the preserved inventory |
| Referenced JS/CSS bundles | 24/24 HTTP 200 |
| Preview HTML | noindex, follow and X-Robots-Tag: noindex; no canonical |
| robots.txt | HTTP 200; crawling allowed so noindex can be read |
| sitemap.xml | HTTP 200; no page URLs |
| Two legacy Wix PDF URLs | HTTP 308 to preserved local PDFs |
| Unknown route | HTTP 404 and the site's custom error page |
| Stable integration alias | HTTP 200 and real content |

Routes tested: /, /about-us, /contact, /donate, /get-help, /volunteer, /soupersupper, /souper-supper, /event-details/souper-supper.

The Vercel-only fix changes routing precedence and adds a regression check. High-level rewrites allowed existing HTML files to shadow RSC requests. Explicit routes now select the corresponding .rsc artifact before the filesystem, with content type, Vary, cache, and noindex headers attached to the response.

## Scope and remaining review

Checks used authorized deployment-protection access; anonymous reviewers may see Vercel sign-in. Browser interaction/viewport review and provider delivery/checkout tests remain separate owner review work. No test payment or email was sent. Stripe donations remain inactive and contact remains draft-only unless optional Preview settings are supplied.

No main changes, main deployments, production promotions, production DNS changes, or live Wix modifications were made. The existing production commit remains e428a2ea5062998168c160168d03051052c98566.

The custom staging domain is not configured. Account-wide protection of old main is still an owner action, because old main lacks the staging vercel.json. See [the current owner setup guide](vercel-setup.md) for the exact dashboard, Preview environment, DNS, access, and rollback steps.
