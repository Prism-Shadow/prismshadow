# Verification detail

Loaded from `SKILL.md`. It covers the checks that matter for this site, and the ways a check can pass
while proving nothing.

## The chain

```sh
npm ci
npm run lint
npm test
npm run build    # includes the SSR bundle and prerender; fails on SSR-unsafe code
```

CI runs the same chain in `.github/workflows/deploy.yml`. **Run tests on this machine** unless the
maintainer asks for another one. If they do, sync the tree there (excluding `node_modules`, `dist`,
`dist-prerender`, `.git`), run `npm ci` once, then the chain.

## Visual review is part of done

For any visible change, serve the build and look at screenshots with your own eyes:
- **Widths and locales:** en and zh at 1440 and 390, plus 1024 and 768 for layout changes.
- **Logs:** check for console errors and horizontal overflow
  (`documentElement.scrollWidth - innerWidth > 0`).
- **Owner's bar:** compare against modal.com on alignment, weight, density and elegance.

Serve the build the way production does:

```sh
npm run build
node .agents/skills/prismshadow-dev/scripts/pages-server.mjs dist 4173
```

`pages-server.mjs` emulates GitHub Pages:
- `/x` serves `x.html`; `/x/` serves `x/index.html`.
- A folder without a trailing slash gets a 301.
- Anything else gets `404.html` with status 404.

`vite preview` instead rewrites every path to `index.html`. That hides missing prerendered routes, so
never use it to sign off routing.

Useful checks against that server (Playwright, any Chromium):
- **Every route:** each route in `allRoutes()` returns 200, with its own `<title>`, canonical and a
  prerendered `<h1>` inside `#root`. An unknown URL returns 404 with the shell.
- **JS disabled:** the content is visible and every visual is complete.
- **Navigation:** internal links navigate without a full reload. A `window` marker survives, and the
  title updates. Back and forward restore scroll; cross-page `#hash` links land on their target.
- **Contact form:** mock `https://formsubmit.co/**` with Playwright `page.route`. Then assert the
  posted JSON (`_subject`, `_replyto`, fields), the success message, and the `mailto:` fallback on
  `{"success":"false"}`. **Never send real submissions from tests**: each one emails the company
  inbox.

## Motion checks

See `motion.md`:
- **Frames:** capture frames over a full loop, plus a 10s+ hold for charts.
- **First load:** capture from navigation start, using `page.goto(url, { waitUntil: 'commit' })` and
  then timed screenshots.
- **Reduced motion:** use `reducedMotion: 'reduce'` and expect no `data-motion` and nothing hidden.
- **Contract:** `motion.test.ts` must stay green.

## Two ways a check proves nothing

**CSS read through `?raw` is empty under vitest.** A test that imports `./x.css?raw` gets `''` and
passes whatever the CSS says. That happened twice here. Read stylesheets from disk with `node:fs`,
adding `/// <reference types="node" />` at the top of the test, and assert that the content is
non-empty first.

**Screenshots taken with smooth scrolling show blank visuals.** `:root` has
`scroll-behavior: smooth`, so a script's `window.scrollTo(0, y)` never arrives. Visuals below the
fold never enter view and stay hidden in the capture. Scroll with `behavior: 'instant'`.

## Known non-bugs

- `ERR_NETWORK_CHANGED` or font timeouts on a remote test machine are that machine's network, not
  the site. In particular, Google Fonts can hang behind restrictive networks, and a page with JS
  disabled then never fires `load`. Rerun before debugging.
- FormSubmit answering `This form needs Activation` means the one-time activation email to
  contact@prismshadow.com has not been clicked. It is not a code fault.
