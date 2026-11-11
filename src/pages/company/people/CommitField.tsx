/**
 * Hero visual for the People page: a quiet, year-long field of tiny dots (52
 * weeks x 7 days, like a contribution graph) where a few days are lit and the
 * activity builds toward the present, ending in one full-strength mark.
 *
 * Purely decorative (aria-hidden); it makes no data claim. Deterministic, so
 * server and client render the same markup.
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

export function CommitField({ className }: { className?: string }) {
  const width = COLS * STEP
  const height = ROWS * STEP
  const lit = new Set(marks.map((m) => `${m.c}:${m.r}`))
  lit.add(`${FOCAL.c}:${FOCAL.r}`)

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
    >
      <path className="pg-people-field__dots" d={dots.join('')} />
      {marks.map((m) => (
        <rect
          key={`${m.c}:${m.r}`}
          className={`pg-people-field__mark pg-people-field__mark--${m.level}`}
          rx={1.5}
          {...square(m.c, m.r, MARK)}
        />
      ))}
      <rect className="pg-people-field__ring" rx={3} {...square(FOCAL.c, FOCAL.r, MARK + 6)} />
      <rect className="pg-people-field__focal" rx={1.5} {...square(FOCAL.c, FOCAL.r, MARK)} />
    </svg>
  )
}
