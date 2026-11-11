import type { CSSProperties } from 'react'
import type { PlatformPageCopy } from '../../../i18n/messages/platformPage'

/*
 * Hero visual: the platform as four thin isometric plates, modal style.
 * Hairline edges, faces filled with the canvas so nearer plates hide farther
 * ones, a handful of coloured vertex dots, and one lit point: the small model
 * cube on the top plate. The base dissolves into the canvas.
 *
 * Motion (platform.css): on an in-app visit the plates settle in from the
 * base up (`--i` is the plate's level); then, on any visit, the lit point on
 * the model cube breathes slowly.
 */

const W = 600
const H = 400
const S = 37 // px per unit
const CX = 200
const CY = 280
const COS30 = Math.cos(Math.PI / 6)
const HALF = 2 // plates span -2…2 on x and y
const T = 0.1 // plate thickness
const GAP = 1.2 // vertical distance between plates
const LABEL_X = 396

type P3 = [number, number, number]

const pt = ([x, y, z]: P3): [number, number] => [
  Math.round((CX + (x - y) * COS30 * S) * 10) / 10,
  Math.round((CY + (x + y) * 0.5 * S - z * S) * 10) / 10,
]
const p = (point: P3) => pt(point).join(' ')

/** A box from `min` to `max`: filled silhouette plus its nine visible edges. */
function Slab({ min, max, edge = 'base' }: { min: P3; max: P3; edge?: 'base' | 'dash' | 'accent' }) {
  const [x0, y0, z0] = min
  const [x1, y1, z1] = max
  const silhouette = `M${p([x0, y0, z1])}L${p([x1, y0, z1])}L${p([x1, y0, z0])}L${p([x1, y1, z0])}L${p([x0, y1, z0])}L${p([x0, y1, z1])}Z`
  const edges =
    `M${p([x0, y0, z1])}L${p([x1, y0, z1])}L${p([x1, y1, z1])}L${p([x0, y1, z1])}Z` +
    `M${p([x1, y0, z1])}L${p([x1, y0, z0])}L${p([x1, y1, z0])}L${p([x0, y1, z0])}L${p([x0, y1, z1])}` +
    `M${p([x1, y1, z1])}L${p([x1, y1, z0])}`
  return (
    <g>
      <path className="pf-stack__face" d={silhouette} />
      <path className={`pf-stack__edge pf-stack__edge--${edge}`} d={edges} />
    </g>
  )
}

function Dot({ at, tone, r = 2.5 }: { at: P3; tone: 'cyan' | 'amber' | 'accent' | 'focus' | 'faint'; r?: number }) {
  const [x, y] = pt(at)
  return <circle className={`pf-stack__dot pf-stack__dot--${tone}`} cx={x} cy={y} r={r} />
}

/** Faint dots along the two front edges of a plate's top face. */
function Seam({ z }: { z: number }) {
  const inset = HALF - 0.4
  const steps = [-1.2, -0.6, 0, 0.6, 1.2]
  return (
    <g>
      {steps.map((s) => (
        <Dot key={`x${s}`} at={[inset, s, z]} tone="faint" r={1.1} />
      ))}
      {steps.map((s) => (
        <Dot key={`y${s}`} at={[s, inset, z]} tone="faint" r={1.1} />
      ))}
    </g>
  )
}

/** One plate's group, staggered by its level when the drawing plays its intro. */
const level = (i: number) => ({ '--i': i }) as CSSProperties

/** Dashed guides between two plates at the three visible corners. */
function Guides({ from, to }: { from: number; to: number }) {
  const corners: Array<[number, number]> = [
    [HALF, -HALF],
    [HALF, HALF],
    [-HALF, HALF],
  ]
  return (
    <path
      className="pf-stack__edge pf-stack__edge--guide"
      d={corners.map(([x, y]) => `M${p([x, y, from])}L${p([x, y, to])}`).join('')}
    />
  )
}

export function StackDrawing({ copy }: { copy: PlatformPageCopy['hero']['stack'] }) {
  // Plates from the base up: deployment, data, agents, AutoResearch.
  const levels = [0, 1, 2, 3].map((i) => i * GAP)
  const top = levels[3] + T
  const grid = [-1.4, -0.7, 0, 0.7, 1.4]
  const cube = 0.5
  const cubeTop = top + 0.9
  // Labels run top → base, matching `copy.layers`.
  const labels = [...levels].reverse().map((z) => pt([HALF, -HALF, z + T])[1])

  return (
    <svg className="pf-stack" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={copy.ariaLabel} data-animate="custom">
      <defs>
        <linearGradient id="pf-stack-fade-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.62" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        <mask id="pf-stack-fade" maskContentUnits="userSpaceOnUse">
          <rect x="0" y="0" width={W} height={H} fill="url(#pf-stack-fade-g)" />
        </mask>
      </defs>

      <g mask="url(#pf-stack-fade)">
        {/* Base: private deployment, drawn as a dashed perimeter. */}
        <g className="pf-stack__plate" style={level(0)}>
          <Slab min={[-HALF, -HALF, levels[0]]} max={[HALF, HALF, levels[0] + T]} edge="dash" />
          <Dot at={[HALF, HALF, levels[0] + T]} tone="amber" />
          <Dot at={[-HALF, HALF, levels[0] + T]} tone="amber" />
          <Guides from={levels[0] + T} to={levels[1]} />
        </g>

        {/* Data & environments */}
        <g className="pf-stack__plate" style={level(1)}>
          <Slab min={[-HALF, -HALF, levels[1]]} max={[HALF, HALF, levels[1] + T]} />
          <Seam z={levels[1] + T} />
          <Dot at={[HALF, HALF, levels[1] + T]} tone="cyan" />
          <Guides from={levels[1] + T} to={levels[2]} />
        </g>

        {/* Self-evolving agents */}
        <g className="pf-stack__plate" style={level(2)}>
          <Slab min={[-HALF, -HALF, levels[2]]} max={[HALF, HALF, levels[2] + T]} />
          <Seam z={levels[2] + T} />
          <Dot at={[HALF, -HALF, levels[2] + T]} tone="accent" />
          <Dot at={[-HALF, HALF, levels[2] + T]} tone="accent" />
          <Guides from={levels[2] + T} to={levels[3]} />
        </g>

        {/* AutoResearch: the top plate with its dot grid and model cube. */}
        <g className="pf-stack__plate" style={level(3)}>
          <Slab min={[-HALF, -HALF, levels[3]]} max={[HALF, HALF, top]} />
          {grid.flatMap((x) =>
            grid.map((y) =>
              Math.abs(x) <= cube + 0.2 && Math.abs(y) <= cube + 0.2 ? null : (
                <Dot key={`${x}:${y}`} at={[x, y, top]} tone="faint" r={1.1} />
              ),
            ),
          )}
          <Slab min={[-cube, -cube, top]} max={[cube, cube, cubeTop]} edge="accent" />
          <circle className="pf-stack__halo" cx={pt([cube, cube, cubeTop])[0]} cy={pt([cube, cube, cubeTop])[1]} r={8} />
          <Dot at={[cube, cube, cubeTop]} tone="focus" r={3.5} />
        </g>
      </g>

      {/* Layer labels with hairline leaders from each plate's right corner. */}
      {labels.map((y, i) => (
        <g key={copy.layers[i]} className="pf-stack__layer" style={level(labels.length - 1 - i)}>
          <path className="pf-stack__leader" d={`M${pt([HALF, -HALF, 0])[0] + 12} ${y}H${LABEL_X - 12}`} />
          <text className={`pf-stack__label${i === 0 ? ' pf-stack__label--top' : ''}`} x={LABEL_X} y={y + 4}>
            {copy.layers[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}
