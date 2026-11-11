/*
 * Word-boundary line breaks for Chinese headings.
 *
 * Browsers break Chinese text between any two characters, so a balanced
 * heading can split a word ("围/绕"). Headings that pass through `cjkBreaks`
 * get a zero-width space at each word boundary (from Intl.Segmenter) and are
 * styled with `word-break: keep-all`, so lines only break between words. A
 * lone character stays glued to its word (信赖的, 可训练, Agent 层), so it is
 * never orphaned on a line of its own. Text without Han characters is returned
 * unchanged, and so is everything when Intl.Segmenter is unavailable.
 */

const ZWSP = '\u200b'
const NBSP = '\u00a0'
const han = /\p{Script=Han}/u
const space = /^\s+$/

const isLoneHan = (segment: string) => han.test(segment) && Array.from(segment).length === 1

// Single characters that lead the word after them (可训练, 不只是, 全旅程);
// every other lone character trails the word before it (信赖的, Agent 层).
const prefixes = new Set(Array.from('可不非超再被将把向从对为在以让使更最很也都就才自各每全总无未已'))
const isPrefix = (segment: string) => isLoneHan(segment) && prefixes.has(segment)
const isSuffix = (segment: string) => isLoneHan(segment) && !prefixes.has(segment)

type Plan = {
  /** Insert a zero-width space before these indices. */
  breaks: Set<number>
  /** Replace the space at these indices with a no-break space. */
  glue: Set<number>
}

function plan(text: string): Plan {
  const breaks = new Set<number>()
  const glue = new Set<number>()
  const segments = Array.from(new Intl.Segmenter('zh', { granularity: 'word' }).segment(text))

  for (let i = 1; i < segments.length; i += 1) {
    const { segment, index, isWordLike } = segments[i]
    const prev = segments[i - 1]

    if (space.test(segment)) {
      const next = segments[i + 1]
      if (next && isSuffix(next.segment)) glue.add(index)
      continue
    }
    if (!isWordLike || !prev.isWordLike || isSuffix(segment) || isPrefix(prev.segment)) continue
    if (!han.test(segment) && !han.test(prev.segment)) continue
    breaks.add(index)
  }

  return { breaks, glue }
}

function render(text: string, from: number, to: number, { breaks, glue }: Plan) {
  let out = ''
  for (let i = from; i < to; i += 1) {
    if (i > from && breaks.has(i)) out += ZWSP
    out += glue.has(i) ? NBSP : text[i]
  }
  return out
}

/**
 * Returns `text` with word-boundary break hints. When `accent` (a substring of
 * `text`) is given, the returned accent is the matching substring of the
 * returned text, so `renderAccent(result.text, result.accent)` still works.
 */
export function cjkBreaks(text: string, accent?: string): { text: string; accent?: string } {
  if (!han.test(text) || typeof Intl === 'undefined' || typeof Intl.Segmenter !== 'function') {
    return { text, accent }
  }
  const p = plan(text)
  const start = accent ? text.indexOf(accent) : -1
  if (!accent || start < 0) return { text: render(text, 0, text.length, p), accent }

  const end = start + accent.length
  const before = render(text, 0, start, p) + (start > 0 && p.breaks.has(start) ? ZWSP : '')
  const middle = render(text, start, end, p)
  const after = (end < text.length && p.breaks.has(end) ? ZWSP : '') + render(text, end, text.length, p)
  return { text: before + middle + after, accent: middle }
}
