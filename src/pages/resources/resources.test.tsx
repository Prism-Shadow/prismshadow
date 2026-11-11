import { describe, expect, it } from 'vitest'
import { locales } from '../../i18n'
import { agentMarketplacePageCopy } from '../../i18n/messages/agentMarketplace'
import { useCaseLibraryPageCopy, type BenchmarkCopy } from '../../i18n/messages/useCaseLibrary'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../test/pageChecks'
import { AgentMarketplacePage } from './AgentMarketplacePage'
import { benchmarkCharts } from './use-case-library/benchmarkCharts'
import { UseCaseLibraryPage } from './UseCaseLibraryPage'

const esc = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;')

const count = (html: string, pattern: RegExp) => html.match(pattern)?.length ?? 0
const formatted = (n: number) => new Intl.NumberFormat('en-US').format(n)

const expectParity = (copy: Record<string, unknown>) => {
  expect(copyShape(copy.zh)).toEqual(copyShape(copy.en))
  // zh headings may carry U+200B phrase-break markers; en never needs them.
  expect(JSON.stringify(copy.en)).not.toContain('\u200B')
  for (const locale of locales)
    for (const [path, value] of collectStrings(copy[locale]))
      expect(value.trim(), `${locale}.${path}`).not.toBe('')
}

/* ------------------------------------------------------------------ */
/* Use case library                                                    */
/* ------------------------------------------------------------------ */

describe('use case library copy', () => {
  it('zh has the same shape as en and no empty strings', () => {
    expectParity(useCaseLibraryPageCopy)
  })

  it.each(locales)('keeps every use case and benchmark (%s)', (locale) => {
    const t = useCaseLibraryPageCopy[locale]
    expect(t.verified.benchmarks).toHaveLength(2)
    expect(t.simulated.benchmarks).toHaveLength(6)
    expect(t.highlights.items).toHaveLength(4)
    expect(t.featuredCase.metrics).toHaveLength(6)
    expect(t.featuredCase.pipeline).toHaveLength(5)
    expect(t.featuredCase.scenarios).toHaveLength(2)
    for (const scenario of t.featuredCase.scenarios) expect(scenario.points).toHaveLength(4)
    expect(t.atlas.cards).toHaveLength(3)
    expect(t.atlas.metrics).toHaveLength(3)
    expect(t.learning.steps).toHaveLength(4)
    expect(t.workflowTypes.items).toHaveLength(4)
  })

  it('uses the same benchmark numbers in en and zh', () => {
    const values = (locale: (typeof locales)[number]) =>
      [...useCaseLibraryPageCopy[locale].verified.benchmarks, ...useCaseLibraryPageCopy[locale].simulated.benchmarks]
        .flatMap((b) => b.metrics.map((m) => m.value))
    expect(values('zh')).toEqual(values('en'))
  })

  it('charts every benchmark with numbers that match the copy', () => {
    const t = useCaseLibraryPageCopy.en
    for (const b of [...t.verified.benchmarks, ...t.simulated.benchmarks]) {
      const charts = benchmarkCharts[b.id]
      expect(charts, b.id).toBeDefined()
      expect(charts, b.id).toHaveLength(b.metrics.length)
      charts.forEach((chart, i) => {
        const metric = b.metrics[i]
        if (!chart) return
        if (chart.kind === 'percent' || chart.kind === 'ratio')
          expect(parseFloat(metric.value), `${b.id}[${i}]`).toBe(chart.value)
        if (chart.kind === 'tokens') {
          expect(metric.value).toBe(formatted(chart.panofy))
          expect(metric.label).toContain(formatted(chart.baseline))
        }
        if (chart.kind === 'pass') expect(metric.value).toBe(`${chart.passed}/${chart.total}`)
      })
    }
  })
})

describe.each(locales)('UseCaseLibraryPage (%s)', (locale) => {
  const t = useCaseLibraryPageCopy[locale]
  const html = renderHtml(<UseCaseLibraryPage locale={locale} />)
  const benchmarks: BenchmarkCopy[] = [...t.verified.benchmarks, ...t.simulated.benchmarks]

  it('passes the page basics', () => {
    expectPageBasics(html)
  })

  it('renders its sections', () => {
    for (const id of ['hero', 'results', 'featured-case', 'benchmarks', 'how-panofy-learns', 'workflow-types', 'get-started'])
      expect(html).toContain(`id="${id}"`)
  })

  it('lists every benchmark as a tab with a detail panel', () => {
    expect(count(html, /role="tab"/g)).toBe(benchmarks.length)
    expect(count(html, /role="tabpanel"/g)).toBe(benchmarks.length)
    for (const b of benchmarks) {
      expect(html).toContain(esc(b.title))
      expect(html).toContain(esc(b.task))
      for (const m of b.metrics) {
        expect(html).toContain(esc(m.value))
        expect(html).toContain(esc(m.label))
      }
      for (const item of [...b.learns, ...b.bestFor]) expect(html).toContain(esc(item))
      if (b.safety) expect(html).toContain(esc(b.safety))
    }
  })

  it('shows every headline number and the featured case', () => {
    for (const item of t.highlights.items) expect(html).toContain(esc(item.metric))
    for (const m of [...t.featuredCase.metrics, ...t.atlas.metrics]) expect(html).toContain(esc(m.value))
    for (const s of t.featuredCase.scenarios) for (const p of s.points) expect(html).toContain(esc(p))
    for (const step of t.featuredCase.pipeline) expect(html).toContain(esc(step))
    expect(html).toContain(esc(t.featuredCase.safety))
    expect(html).toContain(esc(t.disclaimer))
  })
})

/* ------------------------------------------------------------------ */
/* Agent marketplace                                                   */
/* ------------------------------------------------------------------ */

describe('agent marketplace copy', () => {
  it('zh has the same shape as en and no empty strings', () => {
    expectParity(agentMarketplacePageCopy)
  })

  it.each(locales)('keeps every listing (%s)', (locale) => {
    const t = agentMarketplacePageCopy[locale]
    expect(t.skills.items).toHaveLength(6)
    expect(t.visual.signals).toHaveLength(t.skills.items.length)
    expect(t.adoption.steps).toHaveLength(4)
    expect(t.benefits.items).toHaveLength(4)
    expect(t.intro.body).toHaveLength(2)
  })
})

describe.each(locales)('AgentMarketplacePage (%s)', (locale) => {
  const t = agentMarketplacePageCopy[locale]
  const html = renderHtml(<AgentMarketplacePage locale={locale} />)

  it('passes the page basics', () => {
    expectPageBasics(html)
  })

  it('renders its sections', () => {
    for (const id of ['hero', 'why-marketplace', 'marketplace-skills', 'marketplace-adoption', 'marketplace-benefits', 'get-started'])
      expect(html).toContain(`id="${id}"`)
  })

  it('renders the full catalogue with a filter per team', () => {
    expect(count(html, /class="pg-marketplace__skill"/g)).toBe(t.skills.items.length)
    expect(count(html, /class="pg-marketplace__filter"/g)).toBe(t.visual.signals.length + 1)
    expect(html).not.toMatch(/class="pg-marketplace__skill"[^>]*hidden/)
    for (const skill of t.skills.items) {
      expect(html).toContain(esc(skill.title))
      expect(html).toContain(esc(skill.body))
    }
  })

  it('renders the adoption path and benefits', () => {
    for (const item of [...t.adoption.steps, ...t.benefits.items]) {
      expect(html).toContain(esc(item.title))
      expect(html).toContain(esc(item.body))
    }
  })
})
