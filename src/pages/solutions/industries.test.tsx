import { describe, expect, it } from 'vitest'
import { industryOrder } from '../../components/site/navigation'
import { locales } from '../../i18n'
import { industryPageDetailsCopy } from '../../i18n/messages/industryPageDetails'
import { industryPagesCopy, industryTemplateCopy } from '../../i18n/messages/industryPages'
import { resolveRoute } from '../../routes'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../test/pageChecks'
import { cjkBreaks } from './industry/cjkBreaks'
import { IndustryPage } from './IndustryPage'

const sectionIds = ['hero', 'why-now', 'scenarios', 'how-it-fits', 'resources', 'get-started']

/** Match how React escapes text content in server-rendered HTML. */
const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;')

describe('industry copy', () => {
  it('zh has the same shape as en and no empty strings', () => {
    const copies = {
      pages: industryPagesCopy,
      details: industryPageDetailsCopy,
      template: industryTemplateCopy,
    }
    for (const [name, copy] of Object.entries(copies)) {
      expect(copyShape(copy.zh), name).toEqual(copyShape(copy.en))
      for (const locale of locales)
        for (const [path, value] of collectStrings(copy[locale]))
          expect(value.trim(), `${name}.${locale}.${path}`).not.toBe('')
    }
  })

  it('covers every industry in the navigation', () => {
    for (const locale of locales) {
      expect(Object.keys(industryPagesCopy[locale]).sort()).toEqual([...industryOrder].sort())
      expect(Object.keys(industryPageDetailsCopy[locale]).sort()).toEqual([...industryOrder].sort())
    }
  })

  it('keeps accent phrases inside their titles and uses the old brand spelling nowhere', () => {
    for (const locale of locales)
      for (const id of industryOrder) {
        const page = industryPagesCopy[locale][id]
        expect(page.hero.title, `${locale}.${id}.hero`).toContain(page.hero.titleAccent)
        expect(page.cta.title, `${locale}.${id}.cta`).toContain(page.cta.titleAccent)
        const all = [
          ...collectStrings(page),
          ...collectStrings(industryPageDetailsCopy[locale][id]),
        ]
        for (const [path, value] of all) expect(value, `${locale}.${id}.${path}`).not.toContain('Prism Shadow')
      }
  })

  it('keeps scenario ids unique and every trace long enough to show input and outcome', () => {
    for (const locale of locales)
      for (const id of industryOrder) {
        const { scenarios } = industryPageDetailsCopy[locale][id]
        expect(new Set(scenarios.map((s) => s.id)).size).toBe(scenarios.length)
        for (const scenario of scenarios) {
          expect(scenario.useCases.length, `${locale}.${id}.${scenario.id}`).toBeGreaterThan(0)
          expect(scenario.trace.length, `${locale}.${id}.${scenario.id}`).toBeGreaterThanOrEqual(3)
        }
      }
  })

  it('breaks zh headings only between words and keeps accents intact', () => {
    const { text, accent } = cjkBreaks('为什么医疗健康需要围绕信任构建的 Agent 层', '围绕信任')
    expect(text.replaceAll('\u200b', '').replaceAll('\u00a0', ' ')).toBe(
      '为什么医疗健康需要围绕信任构建的 Agent 层',
    )
    expect(text).toContain('\u200b')
    expect(text).not.toMatch(/围\u200b绕|医\u200b疗|的\u200b|\u200b的/)
    expect(text.endsWith('Agent\u00a0层')).toBe(true)
    expect(accent && text.includes(accent)).toBe(true)
    // A lone prefix stays with the word after it; a lone particle with the word before it.
    expect(cjkBreaks('面向私有金融工作流的可训练 AI Agent').text).not.toMatch(/可\u200b训|\u200b的/)
    expect(cjkBreaks('AI agents for retail', 'retail')).toEqual({ text: 'AI agents for retail', accent: 'retail' })
  })

  it('resolves the legacy restaurant alias to the restaurants page', () => {
    expect(resolveRoute('/industries/restaurant')).toEqual({ kind: 'industry', id: 'restaurants' })
  })
})

describe.each(locales)('IndustryPage (%s)', (locale) => {
  it.each(industryOrder)('%s renders every section and all of its copy', (id) => {
    // Drop the zh heading break hints so copy can be matched verbatim.
    const html = renderHtml(<IndustryPage locale={locale} industryId={id} />)
      .replaceAll('\u200b', '')
      .replaceAll('\u00a0', ' ')
    const page = industryPagesCopy[locale][id]
    const details = industryPageDetailsCopy[locale][id]

    expectPageBasics(html)

    for (const sectionId of sectionIds) expect(html, sectionId).toContain(`id="${sectionId}"`)
    expect(html.match(/<section\b/g)?.length).toBe(sectionIds.length)
    expect(html.match(/<h2[\s>]/g)?.length).toBe(sectionIds.length - 1)

    // One tab and one panel per scenario.
    expect(html.match(/role="tab"/g)?.length, 'tabs').toBe(details.scenarios.length)
    expect(html.match(/role="tabpanel"/g)?.length, 'panels').toBe(details.scenarios.length)
    expect(html.match(/aria-selected="true"/g)?.length, 'selected tabs').toBe(1)

    // Every scenario, use case, trace row and insight is in the markup.
    for (const scenario of details.scenarios) {
      expect(html).toContain(escapeHtml(scenario.title))
      expect(html).toContain(escapeHtml(scenario.insight.body))
      for (const useCase of scenario.useCases) expect(html).toContain(escapeHtml(useCase.body))
      for (const [label, value] of scenario.trace) {
        expect(html).toContain(escapeHtml(label))
        expect(html).toContain(escapeHtml(value))
      }
    }

    for (const point of [...details.whyNow, ...details.reasons]) expect(html).toContain(escapeHtml(point.body))
    for (const signal of page.signals) expect(html).toContain(escapeHtml(signal))
    for (const resource of details.resources) expect(html).toContain(`href="${resource.href}"`)
    expect(html).toContain(escapeHtml(page.cta.body))
    expect(html).toContain(`href="${page.hero.secondary.href}"`)
    expect(html).not.toMatch(/<img\b/)
  })
})
