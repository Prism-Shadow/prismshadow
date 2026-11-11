# Architecture and how to add a page

Loaded from `SKILL.md` when a change touches routes, files, the router, prerender or SEO.

## Map

| Path | What |
| --- | --- |
| `index.html` | the shell: fonts (non-blocking), SEO defaults, the motion boot script |
| `src/main.tsx` | loads the current page's chunk, **then** mounts. No hydration: React replaces the prerendered markup with identical content in one frame. |
| `src/App.tsx` | locale state, the in-app router (click interception, View Transitions, scroll restoration, focus and announcement), metadata, header, `<main>`, footer |
| `src/routes.ts` | pathname → `Route` |
| `src/navigation/pages.tsx` | page registry: one lazy chunk per page, `loadPage`, `renderRoute` |
| `src/navigation/links.ts` | which clicks become in-app navigations; prefetch targets |
| `src/prerender.tsx` + `scripts/prerender.mjs` | build-time render of every route into `dist/<route>.html`, with per-page head tags. `404.html` is the plain shell. |
| `src/seo/` | route metadata (`routes.ts`), `usePageMetadata` for dynamic pages, `buildHeadMetadata` |
| `src/index.css` | tokens, base, primitives, motion |
| `src/components/site/` | header, footer, shared UI, icons, navigation data, motion |
| `src/components/home/` | the homepage (sections under `sections/`) |
| `src/pages/<area>/` | every other page, each with its own CSS and tests |
| `src/i18n/messages/` | all copy, en + zh. Pages import their copy file directly, not through `src/i18n/index.ts`. |
| `src/test/pageChecks.ts` | `renderHtml`, `expectPageBasics`, `collectStrings`, `copyShape` |
| `public/` | assets, `sitemap.xml`, `robots.txt`, `og-image.jpg` |

## Adding a page

1. **Route.** Add a `Route` kind and its path in `src/routes.ts`.
2. **Registry.** Add a loader in `src/navigation/pages.tsx`, plus props in `renderRoute` if the page
   needs them.
3. **Page.** Create `src/pages/<area>/<Name>Page.tsx` with a named export. It renders **sections only**:
   no header, footer or `<main>`. The root class is `pg-<name>`, and the copy lives in
   `src/i18n/messages/<name>.ts` as `satisfies Record<Locale, …>`.
4. **Prerender.** Add the path to `allRoutes()` in `src/prerender.tsx`. **A route missing here 404s on
   GitHub Pages**: Pages has no SPA rewrites.
5. **SEO.** Add an en + zh entry in `src/seo/routes.ts`, and a `<url>` in `public/sitemap.xml`.
   Dynamic pages call `usePageMetadata`. During prerender it records the metadata for `<head>`.
6. **Navigation.** Add the link in `src/components/site/navigation.ts` (header menus, footer columns),
   with labels in `src/i18n/messages/shared.ts`.
7. **Tests.** Add a test next to the page. In both locales: `expectPageBasics`, key content and links,
   copy shape parity, no empty strings, and `data-animate` on key visuals.

## SSR safety (prerender)

Every page renders in Node at build time:
- No `window`, `document` or `localStorage` during render. Read them in effects only.
- Deterministic output only. Never use `Math.random()` or `Date.now()` in markup. Use the seeded
  helpers (`scatterPixels`, `PixelField seed`).
- `useLayoutEffect` is not allowed on the server; App uses an isomorphic wrapper.

## Links and navigation

- Use plain `<a href="/path">` for internal links. `App.tsx` intercepts left-clicks without modifier
  keys, preloads the target chunk and swaps pages in a View Transition.
- Prefetch happens on hover, focus and touch.
- Modified clicks, `target="_blank"`, `download`, `rel="external"`, files and `/api` go to the browser.
- Same-page `#hash` links scroll smoothly and get a history entry.
- Header menus close on navigation.
- Screenshot scripts must scroll with `behavior: 'instant'`. Because `:root` has
  `scroll-behavior: smooth`, a plain `scrollTo` never arrives.

## Assets

- Logos: monochrome light marks for the dark canvas, sized optically. Only real artwork.
- Product screenshots: WebP under ~250 KB each, with accurate alt text, and a zh variant when the
  product has a zh UI.
- Delete an asset only after `grep -rn` across `src`, `index.html` and `scripts` shows no reference,
  including template-string references such as `chat-${locale}.webp`.
