import type { CSSProperties } from 'react'

/**
 * Hero visual for the People page: a quiet, year-long field of tiny dots (52
 * weeks x 7 days, like a contribution graph) where a few days are lit and the
 * activity builds toward the present, ending in one full-strength mark.
 *
 * Purely decorative (aria-hidden); it makes no data claim. Deterministic, so
 * server and client render the same markup.
 *
 * Motion (people.css): the field works like a live contribution graph. Waves
 * of activity sweep from the past toward "now", filling days solid as they
 * pass (each day's intensity differs, like a heat map); a few days flicker on
 * their own rhythm between waves; the focal mark answers each wave with a
 * ring. Live days are invisible at rest (zero fill), so without motion the
 * field is exactly the static graph.
 */

const COLS = 52
const ROWS = 7
const STEP = 16
const DOT_R = 1
const MARK = 7

/** The one full-strength mark: "now", near the right edge. */
const FOCAL = { c: 48, r: 3 }

type Mark = { c: number; r: number; level: 1 | 2 | 3 }

function buildMarks(): Mark[] {
  let seed = 20250101
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  const marks: Mark[] = []
  for (let c = 0; c < COLS; c += 1) {
    // Lit probability ramps from ~1% at the left edge to ~17% near the focal column.
    const t = c / (COLS - 1)
    const p = 0.01 + 0.16 * t * t
    for (let r = 0; r < ROWS; r += 1) {
      if (c === FOCAL.c && r === FOCAL.r) continue
      if (c > FOCAL.c) continue
      const roll = rand()
      if (roll < p) {
        const level = roll < p * 0.18 ? 3 : roll < p * 0.5 ? 2 : 1
        marks.push({ c, r, level })
      }
    }
  }
  return marks
}

const marks = buildMarks()

/** Deterministic 0–1 noise per day, independent of the marks' sequence. */
function noise(c: number, r: number, salt: number) {
  let h = (Math.imul(c + 11, 73856093) ^ Math.imul(r + 5, 19349663) ^ Math.imul(salt, 83492791)) >>> 0
  h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0
  h = Math.imul(h ^ (h >>> 13), 3266489917) >>> 0
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

/** When the wave reaches a day (seconds into the cycle): left to right from the visible weeks, rows slightly staggered. */
const waveAt = (c: number, r: number) =>
  Math.max(0.1, 0.3 + ((c - 10) / (FOCAL.c - 10)) * 3 + r * 0.08 + noise(c, r, 3) * 0.35)

/** Live days: empty at rest; they fill as waves pass, or flicker on their own. */
type LiveDay = { c: number; r: number; style: CSSProperties; flicker: boolean }

function buildLiveDays(taken: Set<string>): LiveDay[] {
  const days: LiveDay[] = []
  for (let c = 10; c <= FOCAL.c; c += 1) {
    // More activity toward the present.
    const t = (c - 10) / (FOCAL.c - 10)
    const share = 0.14 + 0.4 * t * t
    for (let r = 0; r < ROWS; r += 1) {
      if (taken.has(`${c}:${r}`) || noise(c, r, 1) >= share) continue
      const flicker = noise(c, r, 2) < 0.28
      const peak = [0.35, 0.6, 0.9][Math.floor(noise(c, r, 4) * 3)]
      days.push({
        c,
        r,
        flicker,
        style: (flicker
          ? { '--k': peak, '--fd': `${(noise(c, r, 5) * 2.5).toFixed(2)}s`, '--ft': `${(3 + noise(c, r, 6) * 3).toFixed(2)}s` }
          : { '--k': peak, '--wd': `${waveAt(c, r).toFixed(2)}s` }) as Record<string, string | number> as CSSProperties,
      })
    }
  }
  return days
}

export function CommitField({ className }: { className?: string }) {
  const width = COLS * STEP
  const height = ROWS * STEP
  const lit = new Set(marks.map((m) => `${m.c}:${m.r}`))
  lit.add(`${FOCAL.c}:${FOCAL.r}`)
  const live = buildLiveDays(lit)

  // Every unlit day is a tiny dot; all of them share one path.
  const dot = (c: number, r: number) => {
    const x = c * STEP + STEP / 2 - DOT_R
    const y = r * STEP + STEP / 2
    return `M${x} ${y}a${DOT_R} ${DOT_R} 0 1 0 ${DOT_R * 2} 0a${DOT_R} ${DOT_R} 0 1 0 ${-DOT_R * 2} 0`
  }
  const dots: string[] = []
  for (let c = 0; c < COLS; c += 1)
    for (let r = 0; r < ROWS; r += 1) if (!lit.has(`${c}:${r}`)) dots.push(dot(c, r))

  const square = (c: number, r: number, size: number) => ({
    x: c * STEP + (STEP - size) / 2,
    y: r * STEP + (STEP - size) / 2,
    width: size,
    height: size,
  })

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      focusable="false"
      data-animate="custom"
    >
      <path className="pg-people-field__dots" d={dots.join('')} />
      {live.map((day) => (
        <rect
          key={`live-${day.c}:${day.r}`}
          className={`pg-people-field__live pg-people-field__live--${day.flicker ? 'flicker' : 'wave'}`}
          rx={1.5}
          style={day.style}
          {...square(day.c, day.r, MARK)}
        />
      ))}
      {marks.map((m) => (
        <rect
          key={`${m.c}:${m.r}`}
          className={`pg-people-field__mark pg-people-field__mark--${m.level}`}
          rx={1.5}
          style={{ '--wd': `${waveAt(m.c, m.r).toFixed(2)}s` } as CSSProperties}
          {...square(m.c, m.r, MARK)}
        />
      ))}
      <rect className="pg-people-field__ring" rx={3} {...square(FOCAL.c, FOCAL.r, MARK + 6)} />
      <rect className="pg-people-field__ping" rx={3} {...square(FOCAL.c, FOCAL.r, MARK + 6)} />
      <rect className="pg-people-field__focal" rx={1.5} {...square(FOCAL.c, FOCAL.r, MARK)} />
    </svg>
  )
}
