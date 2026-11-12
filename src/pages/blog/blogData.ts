import { blogPosts, type BlogPost, type BlogTopic, type BlogVisualPattern } from '../../content/blogPosts'
import type { Locale } from '../../i18n'
import type { BlogPageCopy } from '../../i18n/messages/blog'
import { siteText } from '../../i18n/messages/shared'
import type { PixelLit, PixelTone } from '../../components/site/utils'

/* ------------------------------------------------------------------ */
/* Posts                                                               */
/* ------------------------------------------------------------------ */

/** Shown first on the index, in this order. */
export const featuredSlugs = [
  '/blog/recursive-self-improvement-framework-survey-benchmark',
  '/blog/introducing-amsp-agent-message-stream-protocol',
]

/** Every post, newest first (stable: same-day posts keep their authored order). */
export const postsByDate: BlogPost[] = blogPosts
  .map((post, index) => ({ post, index }))
  .sort((a, b) => b.post.date.localeCompare(a.post.date) || a.index - b.index)
  .map(({ post }) => post)

export const featuredPosts: BlogPost[] = featuredSlugs
  .map((slug) => blogPosts.find((post) => post.slug === slug))
  .filter((post): post is BlogPost => Boolean(post))

export const gridPosts: BlogPost[] = postsByDate.filter((post) => !featuredSlugs.includes(post.slug))

export const normalizeSlug = (slug: string) => slug.replace(/\/+$/, '') || '/'

export const findPost = (slug: string) => {
  const target = normalizeSlug(slug)
  return blogPosts.find((post) => post.slug === target)
}

/** Newest posts, at most one per topic until every topic is used. */
export function variedPosts(posts: BlogPost[], count: number, used = new Set<string>()): BlogPost[] {
  const picked: BlogPost[] = []
  for (const post of posts) {
    if (picked.length === count) break
    if (used.has(post.topic)) continue
    used.add(post.topic)
    picked.push(post)
  }
  for (const post of posts) {
    if (picked.length === count) break
    if (!picked.includes(post)) picked.push(post)
  }
  return picked
}

/** Same topic first, then the newest posts from other topics. */
export function relatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const others = postsByDate.filter((p) => p.slug !== post.slug)
  const sameTopic = others.filter((p) => p.topic === post.topic).slice(0, count)
  const rest = others.filter((p) => !sameTopic.includes(p))
  return [...sameTopic, ...variedPosts(rest, count - sameTopic.length, new Set([post.topic]))]
}

export const defaultAuthor = 'PrismShadow'

/** Post content is English; mark it as such inside the Chinese UI. */
export const contentLang = (locale: Locale) => (locale === 'en' ? undefined : 'en')

/* ------------------------------------------------------------------ */
/* Topics                                                              */
/* ------------------------------------------------------------------ */

export const topicOrder: BlogTopic[] = [
  'product',
  'research',
  'supply-chain',
  'healthcare',
  'retail',
  'travel',
  'restaurants',
  'auto-dealerships',
  'b2b-saas',
]

/** One small spectrum highlight per topic: tag tint and lit cover cells. */
export const topicTone: Record<BlogTopic, PixelTone> = {
  product: 'accent',
  research: 'accent',
  'supply-chain': 'cyan',
  healthcare: 'green',
  retail: 'coral',
  travel: 'amber',
  restaurants: 'amber',
  'auto-dealerships': 'cyan',
  'b2b-saas': 'accent',
}

export const topicLabel = (topic: BlogTopic, locale: Locale, copy: BlogPageCopy) =>
  topic === 'product' || topic === 'research' ? copy.topics[topic] : siteText[locale].industries[topic]

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''))

/** Deterministic date formatting (identical on server and client). */
export function formatDate(date: string, copy: BlogPageCopy) {
  const [year, month, day] = date.split('-').map(Number)
  return fill(copy.meta.date, { year, month: copy.meta.months[month - 1], day })
}

/** Year-month formatting for the research list (`YYYY-MM`). */
export function formatMonth(date: string, copy: BlogPageCopy) {
  const [year, month] = date.split('-').map(Number)
  return fill(copy.meta.monthYear, { year, month: copy.meta.months[month - 1] })
}

function postText(post: BlogPost): string {
  const parts: string[] = [post.title, post.excerpt]
  for (const section of post.content) {
    if (section.heading) parts.push(section.heading)
    parts.push(...(section.body ?? []), ...(section.bullets ?? []))
    for (const block of section.blocks ?? []) {
      if (block.type === 'code') parts.push(...block.lines)
      else if (block.type === 'image') parts.push(block.caption ?? '')
      else parts.push(block.type === 'paragraph' ? `${block.lead ?? ''} ${block.text}` : block.text)
    }
    if (section.table) parts.push(...section.table.headers, ...section.table.rows.flat())
  }
  return parts.join(' ')
}

/** Authored reading time when present, otherwise ~230 words per minute. */
export function readingMinutes(post: BlogPost): number {
  const authored = post.readingTime?.match(/\d+/)?.[0]
  if (authored) return Number(authored)
  const words = postText(post).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 230))
}

/** URL-safe anchor ids for section headings, unique within a post. */
export function headingIds(post: BlogPost): Array<string | undefined> {
  const seen = new Map<string, number>()
  return post.content.map((section) => {
    if (!section.heading) return undefined
    const base =
      section.heading
        .toLowerCase()
        .replace(/[’']/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'section'
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    return n ? `${base}-${n + 1}` : base
  })
}

/** Figure numbers of in-article images, keyed `section:block`. */
export function figureNumbers(post: BlogPost): Map<string, number> {
  const numbers = new Map<string, number>()
  post.content.forEach((section, s) =>
    section.blocks?.forEach((block, b) => {
      if (block.type === 'image') numbers.set(`${s}:${b}`, numbers.size + 1)
    }),
  )
  return numbers
}

/* ------------------------------------------------------------------ */
/* Code-built covers                                                   */
/* ------------------------------------------------------------------ */

/** Size of a motif in cells; covers place it on the right of the field. */
export const MOTIF_W = 14
export const MOTIF_H = 12

type Cell = [number, number]

const hashString = (value: string) => {
  let h = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const makeRandom = (seed: number) => {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** Cells on a straight line (Bresenham), endpoints included. */
function line([x0, y0]: Cell, [x1, y1]: Cell): Cell[] {
  const out: Cell[] = []
  const dx = Math.abs(x1 - x0)
  const dy = -Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx + dy
  let x = x0
  let y = y0
  for (;;) {
    out.push([x, y])
    if (x === x1 && y === y1) break
    const e2 = 2 * err
    if (e2 >= dy) {
      err += dy
      x += sx
    }
    if (e2 <= dx) {
      err += dx
      y += sy
    }
  }
  return out
}

/** Orthogonal path through the given points (horizontal, then vertical). */
function path(points: Cell[]): Cell[] {
  const out: Cell[] = []
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x0, y0] = points[i]
    const [x1, y1] = points[i + 1]
    out.push(...line([x0, y0], [x1, y0]), ...line([x1, y0], [x1, y1]))
  }
  return out
}

const rect = (x: number, y: number, w: number, h: number): Cell[] => {
  const out: Cell[] = []
  for (let j = 0; j < h; j += 1) for (let i = 0; i < w; i += 1) out.push([x + i, y + j])
  return out
}

type Style = Omit<PixelLit, 'c' | 'r'>
type Paint = (cells: Cell[], style: Style) => void

/**
 * Pixel motifs, one per `visualPattern`, drawn on a MOTIF_W × MOTIF_H grid.
 * Each sketches the idea of the post (a network of nodes, scenario branches,
 * inventory bars, a radar sweep…). `t` is the topic tone.
 */
const motifs: Record<BlogVisualPattern, (paint: Paint, t: PixelTone, rand: () => number) => void> = {
  network(paint, t) {
    const hubs: Cell[] = [[1, 1], [8, 0], [12, 4], [6, 6], [1, 10], [11, 10]]
    const edges: Array<[number, number]> = [[0, 3], [1, 3], [3, 2], [3, 4], [3, 5], [0, 4], [2, 5]]
    for (const [a, b] of edges) paint(path([hubs[a], hubs[b]]), { tone: t, dim: true })
    paint(hubs, { tone: t })
    paint([hubs[3]], { tone: 'text' })
  },
  simulation(paint, t) {
    paint(line([1, 6], [4, 6]), { tone: t, dim: true })
    const ends: Cell[] = [[13, 1], [13, 6], [13, 11]]
    for (const [x, y] of ends) {
      const mid: Cell = [8, y]
      paint([...line([4, 6], mid), ...line(mid, [x - 1, y])], { tone: t, dim: true })
    }
    paint([ends[0], ends[2]], { tone: t, outline: true })
    paint([ends[1]], { tone: t })
    paint([[0, 6]], { tone: 'text' })
  },
  planning(paint, t) {
    const heights = [5, 7, 6, 9, 8, 11, 7]
    heights.forEach((h, i) => {
      const x = 1 + i * 2
      paint(rect(x, 12 - h, 1, h - 1), { tone: t, dim: true })
      paint([[x, 11 - h + 1]], { tone: i === 5 ? 'text' : t })
    })
    paint([0, 2, 4, 6, 8, 10, 12].map((x): Cell => [x, 4]), { tone: t, outline: true })
  },
  radar(paint, t) {
    const cx = 6.5
    const cy = 5.5
    const ring: Cell[] = []
    const inner: Cell[] = []
    for (let y = 0; y < MOTIF_H; y += 1)
      for (let x = 0; x < MOTIF_W; x += 1) {
        const d = Math.hypot(x - cx, y - cy)
        if (Math.abs(d - 5.4) < 0.5) ring.push([x, y])
        else if (Math.abs(d - 2.9) < 0.45) inner.push([x, y])
      }
    paint(ring, { tone: t, dim: true })
    paint(inner, { tone: t, outline: true })
    paint(line([7, 6], [11, 2]), { tone: t, dim: true })
    paint([[6, 5], [7, 5], [6, 6], [7, 6]], { tone: 'text' })
    paint([[11, 2]], { tone: t })
    paint([[3, 9]], { tone: t })
  },
  journey(paint, t) {
    const stops: Cell[] = [[0, 10], [3, 10], [3, 6], [7, 6], [7, 2], [11, 2], [11, 8], [13, 8]]
    paint(path(stops), { tone: t, dim: true })
    paint(stops.slice(0, -1), { tone: t })
    paint([stops[stops.length - 1]], { tone: 'text' })
  },
  clinical(paint, t) {
    paint([...rect(2, 2, 2, 8), ...rect(0, 5, 6, 2)], { tone: t })
    const checklist = [2, 5, 8]
    checklist.forEach((y, i) => {
      paint([[8, y]], i < 2 ? { tone: 'text' } : { tone: t, outline: true })
      paint(rect(10, y, i === 1 ? 3 : 4, 1), { tone: t, dim: true })
    })
  },
  access(paint, t, rand) {
    for (const y of [2, 5, 8]) {
      const lane: Cell[] = []
      for (let x = 0; x < 9; x += 1) if (rand() < 0.55) lane.push([x, y])
      paint(lane, { tone: t, dim: true })
    }
    paint(rect(10, 1, 1, 9), { tone: t, outline: true })
    paint(rect(11, 5, 2, 1), { tone: t })
    paint([[13, 5]], { tone: 'text' })
  },
  commerce(paint, t) {
    for (const y of [0, 4, 8]) for (const x of [1, 5, 9]) paint(rect(x, y, 3, 3), { tone: t, dim: true })
    paint(rect(5, 4, 3, 3), { tone: t })
    paint(rect(9, 0, 3, 3), { tone: t, outline: true })
    paint([[6, 5]], { tone: 'text' })
  },
  profit(paint, t) {
    paint(rect(0, 1, 2, 10), { tone: t })
    paint(rect(3, 1, 2, 2), { tone: t, dim: true })
    paint(rect(6, 3, 2, 3), { tone: t, dim: true })
    paint(rect(9, 6, 2, 1), { tone: t, dim: true })
    paint(rect(12, 7, 2, 4), { tone: 'text' })
    paint([2, 5, 8, 11].map((x): Cell => [x, 11]), { tone: t, outline: true })
  },
  briefing(paint, t) {
    paint(rect(0, 1, 6, 1), { tone: t })
    const lengths = [12, 10, 12, 7]
    lengths.forEach((len, i) => {
      const y = 4 + i * 2
      paint([[0, y]], i < 2 ? { tone: 'text' } : { tone: t, outline: true })
      paint(rect(2, y, len, 1), { tone: t, dim: true })
    })
  },
  dealer(paint, t, rand) {
    const points: Cell[] = []
    for (let x = 0; x < MOTIF_W; x += 1) {
      const y = Math.round(10 - x * 0.62 + (rand() - 0.5) * 3)
      points.push([x, Math.min(MOTIF_H - 1, Math.max(0, y))])
    }
    paint(points, { tone: t, dim: true })
    paint([points[4], points[9]], { tone: t })
    paint([points[11]], { tone: 'text' })
    paint([1, 4, 7, 10, 13].map((x): Cell => [x, 11]), { tone: t, outline: true })
  },
  orchestration(paint, t) {
    const center: Cell = [6, 5]
    const satellites: Cell[] = [[1, 1], [12, 1], [0, 6], [13, 6], [2, 11], [11, 11]]
    for (const s of satellites) paint(line(center, s).slice(1, -1), { tone: t, dim: true })
    paint(satellites, { tone: t })
    paint([[6, 5], [7, 5], [6, 6], [7, 6]], { tone: 'text' })
  },
  questions(paint, t, rand) {
    for (let j = 0; j < 4; j += 1)
      for (let i = 0; i < 5; i += 1) {
        const cell: Cell = [1 + i * 3, j * 3 + 1]
        const roll = rand()
        paint([cell], roll < 0.4 ? { tone: t } : roll < 0.6 ? { tone: t, outline: true } : { tone: t, dim: true })
      }
    paint([[7, 4]], { tone: 'text' })
  },
  evolution(paint, t) {
    // Agent versions climbing one step per round, with the feedback loop dotted
    // along the floor: evaluate, find lost points, ship version N+1.
    const versions: Cell[] = [[1, 9], [4, 7], [7, 5], [10, 3], [13, 1]]
    paint(path(versions), { tone: t, dim: true })
    paint([1, 3, 5, 7, 9, 11, 13].map((x): Cell => [x, 11]), { tone: t, outline: true })
    paint([[13, 10], [1, 10]], { tone: t, dim: true })
    paint(versions.slice(0, 2), { tone: t, outline: true })
    paint(versions.slice(2, 4), { tone: t })
    paint([versions[4]], { tone: 'text' })
  },
  taxonomy(paint, t) {
    // A survey's tree: one root, four groups, nine design dimensions.
    paint([...line([1, 6], [3, 6]), ...line([3, 1], [3, 10])], { tone: t, dim: true })
    const groups: Array<[number, number[]]> = [
      [1, [0, 1, 2]],
      [4, [4, 5]],
      [7, [7, 8]],
      [10, [10, 11]],
    ]
    const bars = [3, 2, 3, 2, 3, 2, 2, 3, 1]
    let leaf = 0
    for (const [y, leaves] of groups) {
      paint([[4, y], ...line([6, y], [7, y]), ...line([8, leaves[0]], [8, leaves[leaves.length - 1]])], {
        tone: t,
        dim: true,
      })
      paint([[5, y]], { tone: t })
      for (const ly of leaves) {
        paint([[9, ly]], leaf === 6 ? { tone: t } : { tone: t, outline: true })
        paint(rect(11, ly, bars[leaf], 1), { tone: t, dim: true })
        leaf += 1
      }
    }
    paint([[0, 6]], { tone: 'text' })
  },
  stream(paint, t) {
    // A Session as nested spans: the Task, its Requests, the messages inside.
    paint([[0, 1]], { tone: t })
    paint(line([1, 1], [12, 1]), { tone: t, dim: true })
    paint([[13, 1]], { tone: 'text' })
    for (const [x0, x1] of [[1, 5], [7, 12]]) {
      paint([[x0, 4], [x1, 4]], { tone: t, outline: true })
      paint(line([x0 + 1, 4], [x1 - 1, 4]), { tone: t, dim: true })
    }
    paint([...line([1, 7], [2, 7]), ...line([7, 7], [8, 7]), ...line([5, 10], [8, 10])], { tone: t, dim: true })
    paint([[3, 8], ...line([9, 8], [11, 8])], { tone: t })
    paint([[4, 9], [12, 9]], { tone: t, outline: true })
  },
  icp(paint, t, rand) {
    // Three persona clusters feeding one synthetic test profile.
    const hub: Cell = [7, 6]
    const clusters: Cell[] = [[1, 1], [10, 1], [2, 8]]
    clusters.forEach(([x, y], k) => {
      paint(line([x + 1, y + 1], hub).slice(2, -1), { tone: t, dim: true })
      const cells = rect(x, y, 3, 3).filter(() => rand() > 0.22)
      paint(cells, k === 0 ? { tone: t } : k === 1 ? { tone: t, dim: true } : { tone: t, outline: true })
    })
    paint([hub], { tone: 'text' })
  },
}

export type CoverGeometry = {
  cols: number
  rows: number
  /** Top-left cell of the motif. */
  motif: Cell
  /** Areas kept clear for the overlaid label and brand line: [c0, r0, c1, r1]. */
  clear: Array<[number, number, number, number]>
}

export const coverGeometry: Record<'compact' | 'wide', CoverGeometry> = {
  // 16:9 card cover.
  compact: { cols: 32, rows: 18, motif: [16, 3], clear: [[0, 9, 17, 18], [0, 0, 10, 3]] },
  // ~3.2:1 article header cover.
  wide: { cols: 48, rows: 15, motif: [31, 2], clear: [[0, 7, 26, 15], [0, 0, 12, 3]] },
}

/** Share of a cover's free background cells that fill and clear on their own (motion only). */
const COVER_LIVE = 0.045

export type CoverMotion = {
  /** Where the solid wave reaches each lit cell, 0–1 (`c:r` → position). */
  wave: Map<string, number>
  /** Background cells that fill solid and clear on their own rhythm. */
  live: Array<{ c: number; r: number; peak: number; delay: number; period: number }>
  /** Seconds for one wave cycle, and a 0–1 offset so covers never move in step. */
  period: number
  phase: number
}

/**
 * Motion plan for a code-built cover, varied per post (seeded by its slug):
 * a solid wave sweeps the motif along one of three axes (across, down, or out
 * from the centre, either way round), and a few free background cells fill
 * and clear on their own. Deterministic, so server and client agree; nothing
 * here changes the resting picture.
 */
export function coverMotion(post: BlogPost, geometry: CoverGeometry, cells: PixelLit[]): CoverMotion {
  const seed = hashString(`${post.slug}#motion`)
  const rand = makeRandom(seed)
  const [mx, my] = geometry.motif
  const axis = seed % 3
  const reverse = (seed >>> 3) % 2 === 1
  const maxRadius = Math.hypot(MOTIF_W / 2, MOTIF_H / 2)
  const wave = new Map<string, number>()
  for (const cell of cells) {
    const x = Math.min(1, Math.max(0, (cell.c - mx) / (MOTIF_W - 1)))
    const y = Math.min(1, Math.max(0, (cell.r - my) / (MOTIF_H - 1)))
    const radial = Math.min(1, Math.hypot(cell.c - mx - MOTIF_W / 2, cell.r - my - MOTIF_H / 2) / maxRadius)
    const w = axis === 0 ? x : axis === 1 ? y : radial
    wave.set(`${cell.c}:${cell.r}`, Math.round((reverse ? 1 - w : w) * 100) / 100)
  }

  const taken = new Set(cells.map((cell) => `${cell.c}:${cell.r}`))
  const calm = (c: number, r: number) =>
    geometry.clear.some(([c0, r0, c1, r1]) => c >= c0 && c < c1 && r >= r0 && r < r1)
  const live: CoverMotion['live'] = []
  for (let r = 0; r < geometry.rows; r += 1)
    for (let c = 0; c < geometry.cols; c += 1) {
      const roll = rand()
      if (roll >= COVER_LIVE || taken.has(`${c}:${r}`) || calm(c, r)) continue
      live.push({
        c,
        r,
        peak: 0.55 + Math.round(rand() * 30) / 100,
        delay: Math.round(rand() * 400) / 100,
        period: 3 + Math.round(rand() * 300) / 100,
      })
    }

  return { wave, live, period: 5 + (seed % 15) / 10, phase: (seed % 997) / 997 }
}

/** Lit cells of a post cover: its motif plus a light seeded scatter. */
export function coverCells(post: BlogPost, geometry: CoverGeometry): PixelLit[] {
  const tone = topicTone[post.topic]
  const rand = makeRandom(hashString(post.slug))
  const lit = new Map<string, PixelLit>()
  const [mx, my] = geometry.motif

  const paint: Paint = (cells, style) => {
    for (const [x, y] of cells) {
      if (x < 0 || y < 0 || x >= MOTIF_W || y >= MOTIF_H) continue
      const c = mx + x
      const r = my + y
      lit.set(`${c}:${r}`, { c, r, ...style })
    }
  }
  motifs[post.visualPattern ?? 'orchestration'](paint, tone, rand)

  const blocked = (c: number, r: number) =>
    (c >= mx - 1 && c <= mx + MOTIF_W && r >= my - 1 && r <= my + MOTIF_H) ||
    geometry.clear.some(([c0, r0, c1, r1]) => c >= c0 && c < c1 && r >= r0 && r < r1)

  let placed = 0
  for (let guard = 0; placed < 11 && guard < 400; guard += 1) {
    const c = Math.floor(rand() * geometry.cols)
    const r = Math.floor(rand() * geometry.rows)
    if (blocked(c, r) || lit.has(`${c}:${r}`)) continue
    lit.set(`${c}:${r}`, { c, r, tone: rand() < 0.3 ? 'text' : tone, dim: true })
    placed += 1
  }

  return [...lit.values()]
}
