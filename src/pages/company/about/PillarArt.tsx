import type { CSSProperties } from 'react'

/**
 * Isometric line drawings for the three platform layers (modal-style: 1px
 * strokes, coloured vertex dots). Decorative: the column text carries the
 * meaning, so every drawing is aria-hidden.
 *
 * Motion (about.css): when a drawing enters view its solid lines draw in
 * (`data-draw` + pathLength 1), then the dashed parts, lit cell and vertex
 * dots fade in. While in view each drawing keeps working:
 * - data production: the cells of the top plate fill solid in a wave;
 * - model training: signals run in along the spokes and the model's faces
 *   fill in turn;
 * - agent self-evolution: the agent's faces fill in turn while a new
 *   generation ring expands outward.
 * Every moving part is invisible at rest (zero fill or zero opacity), so the
 * static drawing is exactly the resting picture.
 */

/** A solid line that draws in on view. */
const draw = { 'data-draw': '', pathLength: 1 } as const

type Pt = [number, number]
type Tone = 'cyan' | 'amber' | 'accent'

const pts = (list: Pt[]) => list.map(([x, y]) => `${x} ${y}`).join(' ')

/** Vertices of a pointy-top hexagon (top, upper right, lower right, bottom, lower left, upper left). */
const hexagon = (cx: number, cy: number, r: number): Pt[] =>
  [-90, -30, 30, 90, 150, 210].map((deg): Pt => {
    const a = (deg * Math.PI) / 180
    return [round(cx + r * Math.cos(a)), round(cy + r * Math.sin(a))]
  })

const round = (n: number) => Math.round(n * 100) / 100

const order = (values: Record<string, number | string>) => values as CSSProperties

/**
 * A wireframe cube seen from above: its hexagon outline plus the three inner
 * edges. Its three faces sit under the edges with zero fill; motion fills
 * them in turn (top, right, left).
 */
function Cube({ cx, cy, r, tone }: { cx: number; cy: number; r: number; tone: Tone }) {
  const h = hexagon(cx, cy, r)
  const c: Pt = [cx, cy]
  const faces: Pt[][] = [
    [c, h[5], h[0], h[1]],
    [c, h[1], h[2], h[3]],
    [c, h[3], h[4], h[5]],
  ]
  return (
    <g data-tone={tone}>
      <polygon className="pg-about-art__fill" points={pts(h)} {...draw} />
      {faces.map((face, i) => (
        <polygon key={i} className="pg-about-art__face" points={pts(face)} style={order({ '--i': i })} />
      ))}
      <path
        d={`M${cx} ${cy}L${h[5][0]} ${h[5][1]}M${cx} ${cy}L${h[1][0]} ${h[1][1]}M${cx} ${cy}L${h[3][0]} ${h[3][1]}`}
        {...draw}
      />
    </g>
  )
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

/** The top plate's 3 × 3 cells: P(u, v) = T + u·(R − T) + v·(L − T), from the top vertex. */
const plateTop: Pt = [120, 16.5]
const plateU: Pt = [W, H]
const plateV: Pt = [-W, H]
const platePoint = (u: number, v: number): Pt => [
  round(plateTop[0] + u * plateU[0] + v * plateV[0]),
  round(plateTop[1] + u * plateU[1] + v * plateV[1]),
]
const plateCells = Array.from({ length: 9 }, (_, k) => {
  const i = k % 3
  const j = Math.floor(k / 3)
  const corners = [platePoint(i / 3, j / 3), platePoint((i + 1) / 3, j / 3), platePoint((i + 1) / 3, (j + 1) / 3), platePoint(i / 3, (j + 1) / 3)]
  return { i, j, points: pts(corners) }
})

function DataArt() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" focusable="false">
      <Plate cy={114} ghost />
      <Plate cy={86} />
      <Plate cy={58} />
      {/* Live cells sit under the grid lines; the lit cell (1, 0), the resting highlight, sits on top. */}
      <g data-tone="cyan">
        {plateCells
          .filter(({ i, j }) => !(i === 1 && j === 0))
          .map(({ i, j, points }) => (
            <polygon key={`${i}:${j}`} className="pg-about-art__live" points={points} style={order({ '--w': i + j })} />
          ))}
      </g>
      <g className="pg-about-art__faint">
        <path d="M144 30.33L72 71.83M168 44.17L96 85.67M96 30.33L168 71.83M72 44.17L144 85.67" {...draw} />
      </g>
      <polygon
        className="pg-about-art__cell"
        data-tone="cyan"
        points={plateCells[1].points}
        style={order({ '--w': 1 })}
      />
      <g className="pg-about-art__dots" data-tone="cyan">
        <circle cx="120" cy="16.5" r="3" />
        <circle cx="192" cy="58" r="3" />
        <circle cx="48" cy="58" r="3" />
        <circle cx="120" cy="127.5" r="3" />
      </g>
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
      {/* Signals: one packet per spoke, running from the ring into the model. */}
      <g data-tone="amber">
        {ring.map(([x, y], i) => (
          <circle
            key={i}
            className="pg-about-art__packet"
            cx={x}
            cy={y}
            r="2.2"
            style={order({ '--i': i, '--dx': `${round(core[i][0] - x)}px`, '--dy': `${round(core[i][1] - y)}px` })}
          />
        ))}
      </g>
      <Cube cx={120} cy={90} r={30} tone="amber" />
      <g className="pg-about-art__dots" data-tone="amber">
        {ring.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" />
        ))}
      </g>
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
      {/* A new generation: a ring that grows from the middle hexagon toward the outer one. */}
      <polygon className="pg-about-art__wave" data-tone="accent" points={pts(mid)} />
      <Cube cx={120} cy={90} r={22} tone="accent" />
      <g className="pg-about-art__dots" data-tone="accent">
        {outer.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" />
        ))}
      </g>
    </svg>
  )
}

const arts = [DataArt, TrainingArt, EvolutionArt]

export function PillarArt({ index }: { index: number }) {
  const Art = arts[index] ?? DataArt
  return (
    <div className="pg-about-art" data-animate="custom" style={order({ '--art-i': index })}>
      <Art />
    </div>
  )
}
