import type { ReactNode } from 'react'

export type PixelTone = 'accent' | 'cyan' | 'amber' | 'coral' | 'green' | 'text'

export type PixelLit = {
  c: number
  r: number
  tone?: PixelTone
  /** Half-strength fill. */
  dim?: boolean
  /** Outlined instead of filled. */
  outline?: boolean
}


/** Deterministic pseudo-random lit cells (same output on server and client). */
export function scatterPixels(
  cols: number,
  rows: number,
  count: number,
  seed = 7,
  tones: PixelTone[] = ['accent'],
): PixelLit[] {
  let s = seed >>> 0
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  const seen = new Set<string>()
  const out: PixelLit[] = []
  let guard = 0
  while (out.length < Math.min(count, cols * rows) && guard < count * 20) {
    guard += 1
    const c = Math.floor(rand() * cols)
    const r = Math.floor(rand() * rows)
    const key = `${c}:${r}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ c, r, tone: tones[Math.floor(rand() * tones.length)], dim: rand() < 0.35 })
  }
  return out
}


/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/** Render `text` with `accent` (a substring) wrapped in the accent color. */
export function renderAccent(text: string, accent?: string): ReactNode {
  if (!accent) return text
  const i = text.indexOf(accent)
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="ds-accent-text">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  )
}
