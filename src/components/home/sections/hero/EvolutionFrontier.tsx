import type { CSSProperties } from 'react'
import type { HeroVisualCopy } from '../../../../i18n/messages/home'

/*
 * The hero visual: a wide, low field of tiny dots, one per evaluation task.
 * The dots under the "evolution frontier" are solved; the frontier climbs with
 * every Agent Team generation and stops at the latest one, the single focal
 * point, set in full accent with its 90%+ label. Everything else stays quiet:
 * solved dots warm up gently from gen 1 to gen N, open dots are faint, and the
 * field dissolves at its edges. It is a schematic, not a chart: only the latest
 * generation carries a number (a published fact).
 *
 * Three layouts (wide, medium, compact) are rendered and swapped in CSS, so the markup is
 * identical on server and client. Geometry is computed once at module load.
 *
 * Motion (hero.css): on an in-app visit the frontier draws in and the solved
 * mass is uncovered band by band behind it. Then, on any visit, the field is
 * live: waves of solid accent climb through the solved mass toward the
 * frontier and out to gen N (where the latest point pings as each wave lands),
 * and open tasks just above the frontier keep turning solved. The live marks
 * are invisible or identical to the static dots at rest.
 */

type LayoutId = 'wide' | 'medium' | 'compact'

type Layout = {
  id: LayoutId
  w: number
  h: number
  /** Dot pitch and radius, in viewBox units. */
  pitch: number
  dot: number
  /** The frontier maps 0–100% onto `base` → `top`. */
  top: number
  base: number
  /** x of each generation, as a fraction of `w`. */
  gens: number[]
}

const LAYOUTS: Layout[] = [
  { id: 'wide', w: 1200, h: 256, pitch: 12, dot: 1.05, top: 30, base: 216, gens: [0.17, 0.35, 0.53, 0.71, 0.86] },
  { id: 'medium', w: 900, h: 256, pitch: 12, dot: 1.2, top: 40, base: 216, gens: [0.13, 0.32, 0.51, 0.7, 0.86] },
  { id: 'compact', w: 600, h: 320, pitch: 15, dot: 1.35, top: 72, base: 272, gens: [0.1, 0.29, 0.48, 0.67, 0.86] },
]

/** Frontier height at each generation, as a fraction of the field: diminishing returns. */
const LEVELS = [0.3, 0.5, 0.64, 0.75, 0.84]
/** Where the frontier enters from the left edge. */
const ENTRY = 0.22
/** Vertical bands the solved mass is uncovered in, left to right, during the draw-in. */
const BANDS = 8
/** Depth layers under the frontier (0 = the ridge) that the live wave climbs through. */
const LAYERS = 6
/** Rows above the frontier whose open tasks may flash solved, and the share that do. */
const SPARK_ROWS = 3
const SPARK_SHARE = 0.13
/**
 * The line draws with --ds-ease-in-out (hero.css). Mirroring that curve here
 * lets each band and mark wait for the moment the line's head reaches it.
 */
const DRAW_EASE = [0.65, 0, 0.35, 1] as const

const round = (n: number) => Math.round(n * 10) / 10
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/** Fritsch–Carlson monotone cubic: tangents that never overshoot the knots. */
function monotoneTangents(xs: number[], ys: number[]) {
  const n = xs.length
  const d = xs.slice(0, -1).map((x, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - x))
  const m = xs.map((_, i) => {
    if (i === 0) return d[0]
    if (i === n - 1) return d[n - 2]
    return d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2
  })
  d.forEach((di, i) => {
    if (di === 0) {
      m[i] = 0
      m[i + 1] = 0
      return
    }
    const a = m[i] / di
    const b = m[i + 1] / di
    const s = a * a + b * b
    if (s > 9) {
      const t = 3 / Math.sqrt(s)
      m[i] = t * a * di
      m[i + 1] = t * b * di
    }
  })
  return m
}

const bezier = (t: number, a: number, b: number) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3

/** The fraction of the draw's duration at which the eased draw has covered `progress` of the line. */
function drawTimeAt(progress: number) {
  const [x1, y1, x2, y2] = DRAW_EASE
  let lo = 0
  let hi = 1
  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2
    if (bezier(mid, y1, y2) < progress) lo = mid
    else hi = mid
  }
  return Math.round(bezier((lo + hi) / 2, x1, x2) * 100) / 100
}

/** Deterministic 0–1 noise per grid cell (independent of the jitter sequence). */
function cellNoise(c: number, r: number, seed: number) {
  let h = (Math.imul(c + 1, 73856093) ^ Math.imul(r + 1, 19349663) ^ Math.imul(seed, 83492791)) >>> 0
  h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0
  h = Math.imul(h ^ (h >>> 13), 3266489917) >>> 0
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

/** Deterministic jitter so the field reads as organic, identically on every render. */
function jitter(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296 - 0.5
  }
}

type Bucket = { opacity: number; d: string }

/** Solved dots of one reveal band; `t` is when the line reaches its left edge (fraction of the draw). */
type Band = { t: number; solved: Bucket[]; ridge: Bucket[] }

/** Live wave: the solved dots of one band × depth layer, redrawn solid (invisible at rest). */
type Wave = { band: number; layer: number; d: string }

/** An open task above the frontier that keeps flashing solved; at rest it is a plain open dot. */
type Spark = { x: number; y: number; opacity: number; delay: number; period: number }

type Geometry = {
  layout: Layout
  /** Dot paths grouped by tone and opacity (a few paths instead of a thousand nodes). */
  open: Bucket[]
  bands: Band[]
  waves: Wave[]
  sparks: Spark[]
  line: string
  lineEnd: number
  points: Array<{ x: number; y: number; t: number }>
}

function dotPath(x: number, y: number, r: number) {
  return `M${round(x - r)} ${round(y)}a${r} ${r} 0 1 0 ${round(2 * r)} 0a${r} ${r} 0 1 0 ${round(-2 * r)} 0`
}

function addTo(buckets: Map<number, string[]>, opacity: number, d: string) {
  const key = Math.round(opacity * 50) / 50
  const list = buckets.get(key)
  if (list) list.push(d)
  else buckets.set(key, [d])
}

const toBuckets = (buckets: Map<number, string[]>): Bucket[] =>
  [...buckets.entries()]
    .sort(([a], [b]) => a - b)
    .map(([opacity, parts]) => ({ opacity, d: parts.join('') }))

function buildGeometry(layout: Layout): Geometry {
  const { w, pitch, dot, top, base, gens } = layout
  const yAt = (level: number) => base - level * (base - top)
  const xs = [0, ...gens.map((g) => g * w)]
  const ys = [yAt(ENTRY), ...LEVELS.map(yAt)]
  const m = monotoneTangents(xs, ys)
  const first = xs[1]
  const last = xs[xs.length - 1]

  const frontier = (x: number) => {
    let i = 0
    while (i < xs.length - 2 && x > xs[i + 1]) i += 1
    const h = xs[i + 1] - xs[i]
    const t = (x - xs[i]) / h
    const t2 = t * t
    const t3 = t2 * t
    return (
      (2 * t3 - 3 * t2 + 1) * ys[i] +
      (t3 - 2 * t2 + t) * h * m[i] +
      (-2 * t3 + 3 * t2) * ys[i + 1] +
      (t3 - t2) * h * m[i + 1]
    )
  }

  const line = xs
    .slice(0, -1)
    .map((x0, i) => {
      const x1 = xs[i + 1]
      const h = x1 - x0
      const c1 = `${round(x0 + h / 3)} ${round(ys[i] + (m[i] * h) / 3)}`
      const c2 = `${round(x1 - h / 3)} ${round(ys[i + 1] - (m[i + 1] * h) / 3)}`
      return `${i === 0 ? `M${round(x0)} ${round(ys[0])}` : ''}C${c1} ${c2} ${round(x1)} ${round(ys[i + 1])}`
    })
    .join('')

  // Arc length along the line, sampled every few units, to time the reveal to the draw.
  const SAMPLE = 4
  const lengths = [0]
  for (let x = SAMPLE; x - SAMPLE < last; x += SAMPLE) {
    const x0 = x - SAMPLE
    const x1 = Math.min(x, last)
    lengths.push(lengths[lengths.length - 1] + Math.hypot(x1 - x0, frontier(x1) - frontier(x0)))
  }
  const drawnAt = (x: number) =>
    drawTimeAt(lengths[Math.min(lengths.length - 1, Math.round(x / SAMPLE))] / lengths[lengths.length - 1])

  const open = new Map<number, string[]>()
  const solved = Array.from({ length: BANDS }, () => new Map<number, string[]>())
  const ridge = Array.from({ length: BANDS }, () => new Map<number, string[]>())
  const bandOf = (x: number) => Math.min(BANDS - 1, Math.floor((x / last) * BANDS))
  const waves = new Map<string, string[]>()
  const sparks: Spark[] = []
  const rand = jitter(layout.w + layout.pitch)
  const cols = Math.floor(w / pitch)
  const offset = (w - (cols - 1) * pitch) / 2

  for (let c = 0; c < cols; c += 1) {
    const x = offset + c * pitch
    const edge = x <= last ? frontier(x) : Infinity
    const growth = clamp01((x - first) / (last - first))
    // Solved dots glow most at the crest and dissolve toward the baseline;
    // the whole mass warms up from gen 1 to gen N.
    const glow = 0.2 + growth * 0.46
    for (let y = base - pitch / 2; y > 0; y -= pitch) {
      const noise = rand()
      const row = Math.round(y / pitch)
      if (y < edge) {
        const opacity = 0.11 + noise * 0.04
        const above = (edge - y) / pitch
        const spark = x <= last && above <= SPARK_ROWS && cellNoise(c, row, layout.w) < SPARK_SHARE
        if (spark) {
          const period = 3.4 + cellNoise(row, c, 5) * 2.8
          sparks.push({
            x: round(x),
            y: round(y),
            opacity: Math.round(opacity * 50) / 50,
            period: Math.round(period * 100) / 100,
            // Negative: every spark is already mid-cycle when the loop starts.
            delay: -Math.round(cellNoise(c + 11, row + 3, 9) * period * 100) / 100,
          })
        } else {
          addTo(open, opacity, dotPath(x, y, dot))
        }
        continue
      }
      const layer = Math.min(LAYERS - 1, Math.floor((y - edge) / pitch))
      const key = `${bandOf(x)}:${layer}`
      const live = dotPath(x, y, round(dot * 1.45))
      const list = waves.get(key)
      if (list) list.push(live)
      else waves.set(key, [live])
      if (y - pitch < edge) {
        addTo(ridge[bandOf(x)], 0.32 + growth * 0.44, dotPath(x, y, round(dot * 1.1)))
      } else {
        const depth = clamp01((y - edge) / (base - edge))
        addTo(solved[bandOf(x)], glow * (1 - 0.6 * depth) + noise * 0.05, dotPath(x, y, dot))
      }
    }
  }

  return {
    layout,
    open: toBuckets(open),
    bands: solved.map((buckets, i) => ({
      t: drawnAt((i / BANDS) * last),
      solved: toBuckets(buckets),
      ridge: toBuckets(ridge[i]),
    })),
    waves: [...waves.entries()].map(([key, parts]) => {
      const [band, layer] = key.split(':').map(Number)
      return { band, layer, d: parts.join('') }
    }),
    sparks,
    line,
    lineEnd: last,
    points: gens.map((g, i) => ({ x: g * w, y: ys[i + 1], t: drawnAt(g * w) })),
  }
}

const GEOMETRY = LAYOUTS.map(buildGeometry)

const pct = (value: number, of: number) => `${round((value / of) * 1000) / 10}%`

function Stage({ geo, copy }: { geo: Geometry; copy: HeroVisualCopy }) {
  const { id, w, h, base } = geo.layout
  const lastIndex = geo.points.length - 1
  const final = geo.points[lastIndex]
  const gradient = (name: string) => `hp-fr-${id}-${name}`

  return (
    <div className={`hp-fr__stage hp-fr__stage--${id}`} style={{ aspectRatio: `${w} / ${h}` }}>
      {/* Open tasks: a faint field that dissolves toward every edge. */}
      <svg className="hp-fr__field hp-fr__field--open" viewBox={`0 0 ${w} ${h}`} focusable="false">
        {geo.open.map((b) => (
          <path key={`o${b.opacity}`} className="hp-fr__dots hp-fr__dots--open" d={b.d} opacity={b.opacity} />
        ))}
        {/* Open tasks at the frontier that keep getting solved (plain open dots at rest). */}
        {geo.sparks.map((spark) => (
          <circle
            key={`${spark.x}:${spark.y}`}
            className="hp-fr__spark"
            cx={spark.x}
            cy={spark.y}
            r={geo.layout.dot}
            opacity={spark.opacity}
            style={{ '--o': spark.opacity, '--d': `${spark.delay}s`, '--t': `${spark.period}s` } as CSSProperties}
          />
        ))}
      </svg>

      {/* Solved tasks: the one quiet object, fading in from the left only. */}
      <svg className="hp-fr__field hp-fr__field--solved" viewBox={`0 0 ${w} ${h}`} focusable="false">
        {geo.bands.map((band, i) => (
          <g key={i} className="hp-fr__band" style={{ '--hp-fr-t': band.t } as CSSProperties}>
            {band.solved.map((b) => (
              <path key={`s${b.opacity}`} className="hp-fr__dots hp-fr__dots--solved" d={b.d} opacity={b.opacity} />
            ))}
            {band.ridge.map((b) => (
              <path key={`r${b.opacity}`} className="hp-fr__dots hp-fr__dots--ridge" d={b.d} opacity={b.opacity} />
            ))}
          </g>
        ))}
        {/* The live wave: solid copies of the solved dots, one group per band × depth (invisible at rest). */}
        {geo.waves.map((wave) => (
          <path
            key={`w${wave.band}:${wave.layer}`}
            className="hp-fr__wave"
            d={wave.d}
            style={{ '--b': wave.band, '--l': wave.layer } as CSSProperties}
          />
        ))}
      </svg>

      <svg className="hp-fr__plot" viewBox={`0 0 ${w} ${h}`} focusable="false">
        <defs>
          <linearGradient id={gradient('base')} x1="0" x2={w} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop className="hp-fr__stop" offset="0" stopOpacity="0" />
            <stop className="hp-fr__stop" offset="0.25" stopOpacity="0.14" />
            <stop className="hp-fr__stop" offset="0.9" stopOpacity="0.14" />
            <stop className="hp-fr__stop" offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id={gradient('line')}
            x1="0"
            x2={geo.lineEnd}
            y1="0"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop className="hp-fr__stop hp-fr__stop--accent" offset="0" stopOpacity="0" />
            <stop
              className="hp-fr__stop hp-fr__stop--accent"
              offset={Math.round((geo.points[0].x / geo.lineEnd) * 100) / 100}
              stopOpacity="0.3"
            />
            <stop className="hp-fr__stop hp-fr__stop--accent" offset="1" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <rect className="hp-fr__base" x="0" y={base} width={w} height="1" fill={`url(#${gradient('base')})`} />

        <path className="hp-fr__line" d={geo.line} pathLength={1} stroke={`url(#${gradient('line')})`} />

        {geo.points.map((p, i) => {
          const latest = i === lastIndex
          return (
            <g
              key={p.x}
              className={`hp-fr__mark${latest ? ' hp-fr__mark--latest' : ''}`}
              style={{ '--hp-fr-t': p.t } as CSSProperties}
            >
              <path className="hp-fr__stem" d={`M${round(p.x)} ${base}V${round(p.y + (latest ? 12 : 7))}`} />
              {latest ? <circle className="hp-fr__halo" cx={round(p.x)} cy={round(p.y)} r="9" /> : null}
              {/* The one ambient loop: a faint ring that leaves the halo now and then. */}
              {latest ? <circle className="hp-fr__ping" cx={round(p.x)} cy={round(p.y)} r="9" /> : null}
              <circle
                className="hp-fr__point"
                cx={round(p.x)}
                cy={round(p.y)}
                r={latest ? 3.6 : 2.4}
                opacity={latest ? 1 : round(3.2 + i * 1.4) / 10}
              />
            </g>
          )
        })}
      </svg>

      {copy.generations.map((label, i) => (
        <span
          key={label}
          className={`hp-fr__gen${i === lastIndex ? ' is-latest' : ''}`}
          style={{ left: pct(geo.points[i].x, w), top: pct(base + 12, h) }}
        >
          {label}
        </span>
      ))}

      <span
        className="hp-fr__result hp-fr__mark hp-fr__mark--latest"
        style={{ left: pct(final.x, w), top: pct(final.y, h), '--hp-fr-t': final.t } as CSSProperties}
      >
        <span className="hp-fr__value">{copy.result}</span>
        <span className="hp-fr__metric">{copy.metric}</span>
      </span>
    </div>
  )
}

export function EvolutionFrontier({ copy }: { copy: HeroVisualCopy }) {
  return (
    <figure className="hp-fr" role="img" aria-label={copy.ariaLabel} data-animate="custom">
      {GEOMETRY.map((geo) => (
        <Stage key={geo.layout.id} geo={geo} copy={copy} />
      ))}
    </figure>
  )
}
