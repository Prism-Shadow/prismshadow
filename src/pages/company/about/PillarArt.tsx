import type { CSSProperties } from 'react'

/**
 * Isometric line drawings for the three platform layers (modal-style: 1px
 * strokes, coloured vertex dots). Decorative: the column text carries the
 * meaning, so every drawing is aria-hidden.
 *
 * Motion (about.css): when a drawing enters view its solid lines draw in
 * (`data-draw` + pathLength 1), then the dashed parts, lit cell and vertex
 * dots fade in; while in view, one vertex glints now and then.
 */

/** A solid line that draws in on view. */
const draw = { 'data-draw': '', pathLength: 1 } as const

type Pt = [number, number]

const pts = (list: Pt[]) => list.map(([x, y]) => `${x} ${y}`).join(' ')

/** Vertices of a pointy-top hexagon. */
const hexagon = (cx: number, cy: number, r: number): Pt[] =>
  [-90, -30, 30, 90, 150, 210].map((deg): Pt => {
    const a = (deg * Math.PI) / 180
    return [round(cx + r * Math.cos(a)), round(cy + r * Math.sin(a))]
  })

const round = (n: number) => Math.round(n * 100) / 100

/** A wireframe cube seen from above: its hexagon outline plus the three inner edges. */
function Cube({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const h = hexagon(cx, cy, r)
  return (
    <g>
      <polygon className="pg-about-art__fill" points={pts(h)} {...draw} />
      <path
        d={`M${cx} ${cy}L${h[5][0]} ${h[5][1]}M${cx} ${cy}L${h[1][0]} ${h[1][1]}M${cx} ${cy}L${h[3][0]} ${h[3][1]}`}
        {...draw}
      />
    </g>
  )
}

/** A ring around one vertex dot that glints now and then (motion only; invisible at rest). */
function Glint({ cx, cy, tone }: { cx: number; cy: number; tone: 'cyan' | 'amber' | 'accent' }) {
  return <circle className="pg-about-art__glint" data-tone={tone} cx={cx} cy={cy} r="6" />
}

/* ---------- 1 · Data production: stacked data plates ---------- */

const W = 72
const H = 41.5
const T = 8

function Plate({ cy, ghost = false }: { cy: number; ghost?: boolean }) {
  const top: Pt[] = [
    [120, cy - H],
    [120 + W, cy],
    [120, cy + H],
    [120 - W, cy],
  ]
  const line = ghost ? {} : draw
  return (
    <g className={ghost ? 'pg-about-art__ghost' : undefined}>
      <path
        className="pg-about-art__fill"
        d={`M${120 - W} ${cy}V${cy + T}L120 ${cy + H + T}L${120 + W} ${cy + T}V${cy}Z`}
        {...line}
      />
      <polygon className="pg-about-art__fill" points={pts(top)} {...line} />
      <path d={`M120 ${cy + H}V${cy + H + T}`} {...line} />
    </g>
  )
}

function DataArt() {
  // Top plate face P(u, v) = T + u·(R − T) + v·(L − T); grid lines at thirds.
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" focusable="false">
      <Plate cy={114} ghost />
      <Plate cy={86} />
      <Plate cy={58} />
      <g className="pg-about-art__faint">
        <path d="M144 30.33L72 71.83M168 44.17L96 85.67M96 30.33L168 71.83M72 44.17L144 85.67" {...draw} />
      </g>
      <polygon className="pg-about-art__cell" data-tone="cyan" points="144 30.33 168 44.17 144 58 120 44.17" />
      <g className="pg-about-art__dots" data-tone="cyan">
        <circle cx="120" cy="16.5" r="3" />
        <circle cx="192" cy="58" r="3" />
        <circle cx="48" cy="58" r="3" />
        <circle cx="120" cy="127.5" r="3" />
      </g>
      <Glint cx={192} cy={58} tone="cyan" />
    </svg>
  )
}

/* ---------- 2 · Model training: many signals converging on one model ---------- */

function TrainingArt() {
  const ring = hexagon(120, 90, 70)
  const core = hexagon(120, 90, 30)
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" focusable="false">
      {/* The outer ring as two arcs from the top: draws clockwise, and path length is exact. */}
      <path d="M120 20A70 70 0 1 1 120 160A70 70 0 1 1 120 20" {...draw} />
      <g className="pg-about-art__faint pg-about-art__dashed">
        {ring.map(([x, y], i) => (
          <path key={i} d={`M${x} ${y}L${core[i][0]} ${core[i][1]}`} />
        ))}
        <circle cx="120" cy="90" r="48" />
      </g>
      <Cube cx={120} cy={90} r={30} />
      <g className="pg-about-art__dots" data-tone="amber">
        {ring.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" />
        ))}
      </g>
      <Glint cx={ring[0][0]} cy={ring[0][1]} tone="amber" />
    </svg>
  )
}

/* ---------- 3 · Agent self-evolution: generations expanding around the agent ---------- */

function EvolutionArt() {
  const outer = hexagon(120, 90, 72)
  const mid = hexagon(120, 90, 48)
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" focusable="false">
      <polygon points={pts(outer)} {...draw} />
      <g className="pg-about-art__faint">
        {outer.map(([x, y], i) => (
          <path key={i} d={`M${x} ${y}L${mid[i][0]} ${mid[i][1]}`} {...draw} />
        ))}
      </g>
      <polygon className="pg-about-art__faint pg-about-art__dashed" points={pts(mid)} />
      <Cube cx={120} cy={90} r={22} />
      <g className="pg-about-art__dots" data-tone="accent">
        {outer.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" />
        ))}
      </g>
      <Glint cx={outer[1][0]} cy={outer[1][1]} tone="accent" />
    </svg>
  )
}

const arts = [DataArt, TrainingArt, EvolutionArt]

export function PillarArt({ index }: { index: number }) {
  const Art = arts[index] ?? DataArt
  return (
    <div className="pg-about-art" data-animate="custom" style={{ '--art-i': index } as CSSProperties}>
      <Art />
    </div>
  )
}
