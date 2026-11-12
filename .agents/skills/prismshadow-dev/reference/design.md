# Design system and layout principles

Loaded from `SKILL.md` for any visible change. modal.com is the **quality bar** (a dark technical
canvas, regular-weight type, exact alignment, sparse sections and code-built visuals that explain the
product), **not a template**: the owner rejected the site for looking and reading too much like it.

## Our own signatures (keep them; don't drift back to modal's)

- **Home hero (owner-fixed):** stacked and centered: the headline "The platform for self-evolving
  AI" / "让企业 AI 持续自我进化", then the lead and actions, then the evolution frontier full width.
  No eyebrow over the headline. Don't reword the headline or move it into a split layout.
- **Eyebrows:** Geist Mono, upper case, tracked, behind an 18px accent rule. No icon chip.
- **Controls:** buttons, chips, filters and nav items use `--ds-r-control` (6px). No pills.
- **Header:** nav left-aligned beside the logo; language and "Contact us" on the right.
- **Tabs:** a numbered row (`01`, `02` … in mono) with a hairline over each tab and an accent rule
  over the selected one, not a vertical icon list beside the panel.
- **Voice:** plain and human, "we/you" service voice. Outside the fixed hero headline, avoid
  modal's phrasing ("Trusted by the world's leading…", "Ship … in minutes").

## Tokens and primitives (read, don't fork)

`src/index.css` is the design system. Page CSS uses its tokens and never hard-codes a new grey or
accent.

- **Surfaces:** `--ds-bg`, `--ds-bg-raised` (the subtle alternate band), `--ds-panel*`, and the light
  band `.ds-section--paper`. Use paper once or twice per page at most.
- **Text:** `--ds-text`, `--ds-text-2`, `--ds-text-3`. Hairlines: `--ds-line`, `--ds-line-strong`.
- **Colour:**
  - `--ds-accent` (lavender) is the one accent: eyebrows, the accent phrase in a heading, lit marks,
    key lines.
  - `--ds-signal` (green) is only for improvement or pass data.
  - The spectrum (`--ds-cyan`, `--ds-amber`, `--ds-coral`) is only for small diagram highlights.
- **Type scale:** `.ds-display`, `.ds-h1`–`.ds-h4`, `.ds-lead`, `.ds-body`, `.ds-small`, `.ds-mono`.
  Do not invent heading sizes.
- **Layout:**
  - `.ds-container` is max 1312px with `--ds-gutter`; `.ds-grid` is 12 columns with `--ds-col-gap`.
  - `.ds-section` uses `--ds-section-y`.
  - `.ds-section-head` puts the title in 7 columns and the lead in 5, bottom-aligned. It also comes as
    `--stack` and `--center`.
- **Pieces:**
  - `.ds-eyebrow`: accent rule plus mono upper-case label.
  - `.ds-btn` (6px radius): `--primary`, `--secondary`, `--accent`, `--sm`, `--lg`.
  - `.ds-features`: hairline-separated columns.
  - Also `.ds-panel` (with `--cells`, `--dots`), `.ds-stat`, `.ds-tag` and `.ds-card`.
- **Components** in `src/components/site/ui.tsx`: `Eyebrow`, `ButtonLink`, `TextLink`,
  `SectionHead`, `PageHero`, `CtaBand` (the shared closing band) and `PixelField` (cell grids). The
  helpers `cx`, `renderAccent` and `scatterPixels` live in `utils.tsx`.

## Rules that came from rejected work

### Type
- Headings are weight 400. Labels, nav and buttons may use 500. **Nothing heavier, ever**, including
  big numbers; `styleGuard.test.ts` enforces it.
- Fonts are Geist, Geist Mono and Noto Sans SC, loaded without blocking first paint. Google Fonts can
  be slow from mainland China, and the system fallback must look fine.

### Alignment
- One grid. The eyebrow, heading, body, visual and card edges share the same left edge.
- Use grid spans, not ad-hoc `max-width` blocks or magic offsets.
- Rows of cards have equal heights and the same internal padding.
- Check alignment on every screenshot, at 1440, 1024, 768 and 390.

### Density
- One idea and one visual per section.
- **No cards inside cards.** Prefer hairline columns to boxes.
- Many items (scenarios, use cases, departments, benchmarks) get **tabs or list → detail**, never a
  wall of cards.
- Whitespace is a feature. The **homepage stays short**: hero, logos, platform tabs, products, one
  proof block, a team line, CTA. Depth moves to `/platform`, `/customers`, `/people` and the product
  pages.

### Visuals
- **Build visuals in code** so they explain the product: `PixelField` grids, line or isometric
  schematics in inline SVG, flat dark UI mocks, charts.
- Frame visuals in `.ds-panel`, or let them sit borderless with a fade.
- **Genuine product screenshots** and **genuine logos** are welcome.
- **Never use** photos of people (founder portraits excepted), stock imagery, glossy 3D renders, glow,
  glassmorphism, drop shadows on content, or decorative gradients.
- **Airy, not oppressive:**
  - Default marks are 1px outlines or 2–3px dots at low contrast. Solid fills are the exception.
  - Fade fields at the edges with `PixelField fade` or `mask-image`.
  - Use **one focal point** per visual, at full accent. Everything else is quieter.
  - A visual never becomes a wall: keep it short and wide in a hero, and never let it dominate the
    first screen.
- **Each visual is accessible:** `aria-hidden` on decoration, plus `role="img"` + `aria-label` or
  `.ds-sr-only` text when the visual carries meaning.

### Pages
- One `<h1>` per page.
- Every `<section>` has an `id` and `aria-labelledby`.
- Tabs follow the WAI-ARIA pattern (`tablist`/`tab`/`tabpanel`, arrow keys, Home and End).
- Polished at 1440, 1024, 768 and 390 with **zero horizontal overflow**.
- zh must look as good as en.

## CSS ownership

- Each page has its own stylesheet next to it.
- Its root class is `pg-<page>` (the homepage sections use `hp-<section>`), with BEM children.
- Every rule is scoped under the root. Only `src/index.css` styles bare elements, and only through
  zero-specificity `:where()`.
- Shared changes (tokens, primitives, header, footer, `CtaBand`) go in `src/index.css` and
  `src/components/site/`, never as page-level overrides of shared classes.
