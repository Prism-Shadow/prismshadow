# PrismShadow website

Source of [prismshadow.com](https://prismshadow.com): the website of PrismShadow, the self-evolving AI platform for enterprise. It is built with Vite, React 19 and TypeScript, in English and Chinese, and deployed to GitHub Pages.

## Requirements

- Node.js 22+ (CI uses Node 24)
- npm

## Develop

```bash
npm install
npm run dev        # local dev server
npm run lint
npm test           # vitest
npm run build      # type-check, build, prerender every route into dist/
npm run preview    # serve dist/
```

## How it is built

- **Static prerendering.** `npm run build` runs `vite build`, then bundles `src/prerender.tsx` for Node and runs `scripts/prerender.mjs`. That writes one HTML file per route (`dist/platform.html`, `dist/blog/<post>.html`, …), each with its own title, description, canonical URL, social tags and page content. GitHub Pages serves every URL directly, no SPA rewrites needed. `dist/404.html` is the app shell, used for unknown URLs.
- **In-app navigation.** After the first load, internal links swap pages client-side inside a View Transition. Page chunks are prefetched on hover and focus (`src/navigation/`).
- **Design system.** Tokens and primitives live in `src/index.css`, and shared components in `src/components/site/`. Each page lives in `src/pages/<area>/` with its own stylesheet. The homepage is in `src/components/home/`.
- **Copy.** Every string exists in English and Chinese, in `src/i18n/messages/`.
- **SEO.** Route metadata is in `src/seo/routes.ts`; `public/sitemap.xml` and `public/robots.txt` list the routes.

## Contact form

The site has no server. `/contact` renders each submission into an email (subject, plain-text body and a field table, with reply-to set to the visitor). It then delivers that email to **contact@prismshadow.com** through [FormSubmit](https://formsubmit.co)'s AJAX endpoint. If delivery fails, the visitor is offered the same email as a ready-to-send `mailto:` link. See `src/pages/company/contact/contactForm.ts`.

- **First use.** FormSubmit emails contact@prismshadow.com an activation link the first time the form is submitted. Click it once; until then, submissions are not delivered.
- **Optional.** After activation, FormSubmit provides a random alias for the address. Set it as the repository variable `CONTACT_ENDPOINT` (for example `https://formsubmit.co/ajax/<alias>`) to keep the address out of requests. Any endpoint that accepts the same JSON works.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which installs, lints, tests, builds and prerenders, then publishes `dist/` to GitHub Pages.

Custom domain: in **Settings → Pages**, set the custom domain to `prismshadow.com` and enable **Enforce HTTPS**. At your DNS provider, point the apex domain at GitHub Pages:

- `A` records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `AAAA` records: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
- optionally `www` as a `CNAME` to `prism-shadow.github.io`

The site is built for the root of its domain, so it is meant to be served from prismshadow.com, not from the `github.io/prismshadow/` project URL.

## License

[Apache-2.0](LICENSE)
