/**
 * Isometric line drawings for the three "how it works" steps, in the modal
 * style: 1px strokes, a few coloured vertex dots. Decorative (the step title
 * and body carry the meaning).
 */

type Pt = [number, number]

const iso =
  (cx: number, cy: number, k: number) =>
  (x: number, y: number, z = 0): Pt => [
    cx + (x - y) * 0.866 * k,
    cy + (x + y) * 0.5 * k - z * k,
  ]

const poly = (pts: Pt[]) => `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}Z`
const line = (a: Pt, b: Pt) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`

function square(p: ReturnType<typeof iso>, x0: number, y0: number, size: number, z: number) {
  return [p(x0, y0, z), p(x0 + size, y0, z), p(x0 + size, y0 + size, z), p(x0, y0 + size, z)]
}

function Dot({ at, tone }: { at: Pt; tone: string }) {
  return <circle cx={at[0]} cy={at[1]} r={2.6} fill={`var(--ds-${tone})`} />
}

/** Step 1: documents stacked as layers, the top one carrying lines of text. */
function UploadGlyph() {
  const p = iso(120, 58, 1.2)
  const layers = [0, 14, 28]
  const top = square(p, 0, 0, 64, 28)
  return (
    <>
      {layers.slice(0, 2).map((z) => (
        <path key={z} className="pg-glyph__line pg-glyph__line--dim" d={poly(square(p, 0, 0, 64, z))} />
      ))}
      <path className="pg-glyph__line" d={poly(top)} />
      {[16, 28, 40].map((y, i) => (
        <path key={y} className="pg-glyph__line pg-glyph__line--dim" d={line(p(12, y, 28), p(i === 1 ? 40 : 52, y, 28))} />
      ))}
      {top.map((pt, i) => (
        <Dot key={i} at={pt} tone="cyan" />
      ))}
    </>
  )
}

/** Step 2: a role (cube) defined on top of the team's material (slab). */
function RoleGlyph() {
  const p = iso(120, 37, 1.3)
  const base = square(p, 0, 0, 72, 0)
  const a = 22
  const b = 50
  const h = 28
  const topFace = square(p, a, a, b - a, h)
  return (
    <>
      <path className="pg-glyph__line pg-glyph__line--dashed" d={poly(base)} />
      <path className="pg-glyph__line" d={poly(topFace)} />
      <path className="pg-glyph__line" d={line(p(b, a, 0), p(b, a, h))} />
      <path className="pg-glyph__line" d={line(p(b, b, 0), p(b, b, h))} />
      <path className="pg-glyph__line" d={line(p(a, b, 0), p(a, b, h))} />
      <path className="pg-glyph__line" d={line(p(b, a, 0), p(b, b, 0))} />
      <path className="pg-glyph__line" d={line(p(b, b, 0), p(a, b, 0))} />
      {topFace.map((pt, i) => (
        <Dot key={i} at={pt} tone="amber" />
      ))}
    </>
  )
}

/** Step 3: tasks completed one after another, rising as the work progresses. */
function RunGlyph() {
  const p = iso(66, 49, 1.3)
  const tiles = [0, 1, 2, 3].map((i) => ({ x: i * 32, z: i * 8 }))
  const centres = tiles.map(({ x, z }) => p(x + 12, 12, z))
  return (
    <>
      {tiles.map(({ x, z }, i) => (
        <g key={i}>
          <path className="pg-glyph__line" d={poly(square(p, x, 0, 24, z))} />
        </g>
      ))}
      <path
        className="pg-glyph__line pg-glyph__line--dim"
        d={centres.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join('')}
      />
      {centres.map((pt, i) => (
        <Dot key={i} at={pt} tone={i < 3 ? 'green' : 'accent'} />
      ))}
    </>
  )
}

export function StepGlyph({ index }: { index: number }) {
  const step = index % 3
  return (
    <svg className="pg-glyph" viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      {step === 0 ? <UploadGlyph /> : step === 1 ? <RoleGlyph /> : <RunGlyph />}
    </svg>
  )
}
