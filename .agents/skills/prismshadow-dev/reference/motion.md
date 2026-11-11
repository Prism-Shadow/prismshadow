# Motion contract and style

Loaded from `SKILL.md` for any animation work. The mechanics live in
`src/components/site/motion.ts` and the "Motion" section of `src/index.css`.

## The contract (mechanics)

1. **The boot script sets the gate.** An inline script in `index.html` sets `html[data-motion]`
   before first paint, when JS runs and reduced motion is off. If the app has not started within 5s,
   it removes the attribute again, so every visual shows complete. `initMotion()` sets
   `window.__psMotion`.
2. **Every animation lives under `html[data-motion]`.** The resting CSS is the complete final frame.
   That frame is what no-JS visitors, reduced motion, print and the prerendered HTML show.
   `motion.test.ts` reads every stylesheet from disk and fails the build otherwise.
3. **Visuals reveal as they enter view.** Mark a visual with `data-animate`. Use
   `data-animate="custom"` to skip the default fade-up and keep only your own keyframes.
   - Until the visual is about 20% in view it stays hidden.
   - It then gets `data-inview="enter"` and plays its intro once.
   - This also happens on screen at first load, so intros play on every visit.
   - Elements mounted later (an in-app navigation, a newly selected tab panel keyed by tab) are
     picked up automatically.
4. **Selectors:**
   - Intros: `html[data-motion] [data-inview='enter'] .x { animation: … both; }`
   - Loops: `html[data-motion] [data-inview] .x { animation: … infinite; }`
5. **Driving motion from React state** (a stepping selection, a streaming log): use `useInView`,
   `useReducedMotion` and `useCycle` from `motion.ts`.
   - Start nothing during render. The server and the first render must equal the static final state.
   - Run only while in view and while motion is allowed.
   - Pause while the tab is hidden; `useCycle` does this.
6. **Shared keyframes** in `index.css`: `ds-reveal`, `ds-fade-in`, `ds-fade-up`, `ds-draw`,
   `ds-grow-x`, `ds-grow-y`, `ds-pulse`, `ds-ping`, `ds-flow`, `ds-glint`, `ds-fill-cycle`,
   `ds-climb`, `ds-twinkle`, `ds-solid`, `ds-caret`.
   - `ds-draw` needs `pathLength="1"` and `stroke-dasharray: 1`.
   - `ds-pulse` and `ds-ping` on SVG need `transform-box: fill-box; transform-origin: center`.
   - Timing tokens: `--ds-motion-*`, `--ds-ease-out`, `--ds-ease-in-out`.
7. **`PixelField`** takes `animate` (`data-animate="custom"`), `live` and `seed`.
   - `live` (0–1): a share of background cells that fill and empty on their own rhythm, deterministic
     per cell, so server and client match.
   - `seed`: varies which cells twinkle and when.
   - Lit cells carry `--i` (their order) and `data-lit`.
   - Outlined lit cells keep their colour at `fill-opacity: 0`, so CSS can turn them solid.
   - The shared CTA field is the reference implementation: the staircase climbs, the background
     twinkles.

## What may loop and what may not

This is the rule the owner set. It is not a style preference.

| Kind | Examples | Motion |
| --- | --- | --- |
| **Statistical chart** — encodes a quantity | the home accuracy curve, loss curves, bar charts, the cost comparison, benchmark bars, the Cobo 30-scenario grid, pass/fail cells, KPI lines, meters next to numbers, the LlamaFactory methods matrix | **Grows once** on entering view (and again on a fresh visit or tab selection), then rests. No regrow, redraw, refill, ping or wave afterwards. |
| **Framework diagram / flow / UI mock** | architecture and loop diagrams, connectors with packets, agent teams, ticket queues, audit logs, pipelines, the model picker, workbench mocks, decorative pixel art, the CTA staircase | **May loop**, and should feel alive. |

- Charts inside a diagram are still charts: the diagram loops, the embedded score line draws once.
- The home chart grows from scratch on every load. The boot script makes that possible without a
  flash of the finished chart.

## Style: alive, but airy

- **Noticeable within ~2s.** Loops are the main event in diagrams; intros are secondary. Periods run
  2.5–7s, staggered so the visual never moves in lockstep.
- **Fills change.**
  - Cells, blocks, chips and bars move between outline, soft and solid accent.
  - Waves of solid sweep across grids.
  - The active item steps as a solid block.
  - Queues fill and reset.
- **Packets on connectors are solid dots** (2–5px, full accent), not faint dashes. On non-scaling
  hairlines, draw packets as separate elements or measure the path (see
  `src/pages/products/shared/Connectors.tsx`). Do not stretch dashes.
- **Contrast:** active elements at 0.8–0.95 opacity, inactive ones as outlines. About **10–25% of the
  marks solid at any instant**, so the visual stays airy.
- **Amplitude limits:**
  - Movement up to ~16px; scale up to 1.15 for blocks; a ping ring up to 2×.
  - No bouncing, spinning, shaking, strobing, or rainbow colour cycling.
- **Never move text people read**; it may only fade. Never shift layout.
- Animate only `opacity`, `transform`, `fill`/`fill-opacity`, `stroke-dashoffset`, and
  `background-color` on small cells.

## Verifying motion

Static screenshots show only the final state. Motion needs frames:
- **Loops:** 6–10 frames across one full loop.
- **Charts:** a capture held for 10+ seconds. The frames after the intro must be pixel-identical.
- **First load:** capture from navigation start. Visuals must start hidden and grow in. The finished
  state must never flash first, and nothing may stay hidden.
- **Reduced motion and JS off:** both must be static and complete.

See `verification.md` for the tooling.
