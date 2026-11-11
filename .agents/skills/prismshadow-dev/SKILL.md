---
name: prismshadow-dev
description: Use when changing the PrismShadow website (prismshadow.com) in this repo — any page, section, visual, animation, copy, route, SEO entry, the header/footer, the contact form or the GitHub Pages deploy. Covers the repo and deploy contract, the brand and content facts that must never drift, the owner's design bar (modal.com-style dark, regular-weight type, exact alignment, airy visuals), the motion contract (charts grow once, diagrams loop), how to add a page, and how to verify a change before it ships.
---

# Developing the PrismShadow website

This repo is the source of prismshadow.com. It is a Vite + React 19 + TypeScript single-page app in
English and Chinese, **prerendered to static HTML per route** and deployed to **GitHub Pages**. There
is no server of our own.

This page holds what applies to every change. Read the reference files when the task reaches them:

| Read | When |
| --- | --- |
| `reference/content.md` | Writing or editing any copy, numbers, product names, customers, links |
| `reference/design.md` | Adding or restyling a section, a visual, a layout; anything visible |
| `reference/motion.md` | Adding or changing any animation, or touching `motion.ts` |
| `reference/architecture.md` | Adding a page or route, moving files, touching the router, prerender or SEO |
| `reference/verification.md` | Verifying a change, or when a check passes suspiciously or fails oddly |

## Repo and deploy contract

- The repo is **public**. Never commit secrets, private hostnames or personal data. When importing
  code from elsewhere, copy the current tree, not its history.
- `main` is protected by a ruleset: **no direct pushes; open a PR and squash-merge** (no approvals
  required). Branches: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`.
- Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci` → lint → test → build +
  prerender → publish `dist/` to GitHub Pages. **Merging a PR is a production deploy.** Do it only
  when the owner has asked for the change to go live.
- The site is built for the **root of prismshadow.com** (absolute asset paths). The
  `github.io/prismshadow/` project URL redirects to the custom domain; do not add a base path.
- Independent changes run in parallel in their own git worktrees under
  `../prismshadow-wt/<topic>/`, one branch each, merged back one by one.

## The owner's bar (learned from review — do not re-learn it)

Each of these came from the owner rejecting something. Treat them as requirements:

1. **Scope.** A redesign request means the **whole site**: every page, the header and the footer, not
   only the page named. Existing content is **inherited**, never silently dropped.
2. **Look.** modal.com is the reference: dark technical canvas, one lavender accent, flat.
   - **Type is regular weight.** Headings 400, at most 500 anywhere. "字体太粗" was a rejection.
   - **Everything aligns** to the 12-column `.ds-container` grid: shared left edges, equal-height
     rows, consistent gaps. "很多不对齐" was a rejection.
   - **Sparse, not messy.** One idea and one visual per section. Many items go into tabs or a
     list → detail pattern, never a wall of cards.
3. **Homepage is short** (about modal's length). Depth lives on `/platform`, `/customers`, `/people`
   and the product pages. "主页内容太多了" was a rejection.
4. **Visuals are airy and elegant.** Outline-first marks, tiny dots, soft fades and one focal point.
   Dense grids of bright filled blocks read as "压迫感太强".
5. **Motion is clearly alive, not timid.** Fills change: cells go outline → solid → outline in
   waves, the active state steps as a solid block, and solid packets travel on connectors. "太克制"
   was a rejection. Stay airy: about 10–25% of marks solid at any instant.
6. **Statistical charts grow once; framework diagrams may loop.** Curves, bars, counts and
   comparisons grow when they enter view and then rest. Architecture diagrams, flows and UI mocks
   loop. The home chart grows from scratch on **every** load. A bar chart that regrows on a loop
   "很奇怪".
7. **Facts are exact.** Product names are **LlamaFactory**, **PenguinHarness** and **Panofy**.
   Numbers, customers and links come from `reference/content.md`. Never invent a metric, a quote or
   a customer.
8. **Copy for prospects is warm and service-first,** in both languages. The zh copy addresses the
   reader as 您.
9. **Product imagery is current.** Use the newest real product UI (e.g. PenguinHarness from
   penguin.ooo/gallery), never stale screenshots or invented mockups presented as product UI.
10. **Navigation feels smooth.** Internal links swap pages in a View Transition with chunk
    prefetch. Keep links as plain `<a href>`; the router intercepts them.

## Verify what you changed

Use Node ≥ 22 (CI uses 24), then `npm ci`.

```sh
npm run lint
npm test          # vitest, all suites (~1s)
npm run build     # tsc -b + vite build + SSR build + prerender of every route
```

All three are cheap. Run all three before every push. **The guard tests must stay green.** Never
weaken them to pass:
- `src/components/site/motion.test.ts`: every animation is gated on `html[data-motion]`.
- `src/components/site/styleGuard.test.ts`: no font weight above 500.
- the per-page tests: one `<h1>`, alt text, zh/en copy parity, no empty strings, key content.

Any visible change also needs **eyes on screenshots**: en and zh at 1440 and 390, with no console
errors and no horizontal overflow. Motion needs **frame captures over a full loop**. See
`reference/verification.md`, which also covers the GitHub Pages emulator in `scripts/`.

## Contact form

There is no backend. `src/pages/company/contact/contactForm.ts` renders each submission into an email
(subject, plain-text body, field table, reply-to set to the visitor) and posts it to FormSubmit for
**contact@prismshadow.com**. If delivery fails, the visitor gets the same email as a `mailto:` link.

- FormSubmit only delivers after its one-time activation link (emailed to contact@) has been clicked.
  A response of `{"success":"false","message":"This form needs Activation…"}` means exactly that, not
  a code bug.
- Keep the field names (`name`, `email`, `message`) and the `_honey` honeypot.
- The repository variable `CONTACT_ENDPOINT` can override the endpoint at build time.
