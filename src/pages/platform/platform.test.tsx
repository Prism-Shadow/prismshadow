import { describe, expect, it } from 'vitest'
import { productLogos, productOrder, productPaths } from '../../components/site/navigation'
import { locales } from '../../i18n/locales'
import { platformPageCopy } from '../../i18n/messages/platformPage'
import { siteText } from '../../i18n/messages/shared'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../test/pageChecks'
import { PlatformPage } from './PlatformPage'

/** Match how React escapes text content in server-rendered HTML. */
const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;')

const count = (html: string, needle: string) => html.split(needle).length - 1

const sectionIds = ['hero', 'capabilities', 'how-it-works', 'results', 'products', 'get-started']

/** Owner-supplied platform facts that must appear in both languages. */
const facts = ['90%+', '1/30', '100+', '10+']

describe('platform page copy', () => {
  it('keeps the zh copy structurally identical to en', () => {
    expect(copyShape(platformPageCopy.zh)).toEqual(copyShape(platformPageCopy.en))
  })

  it('has no empty strings', () => {
    for (const locale of locales) {
      for (const [path, value] of collectStrings(platformPageCopy[locale])) {
        expect(value.trim(), `${locale}.${path}`).not.toBe('')
      }
    }
  })

  it('lists the four capabilities in the owner’s order', () => {
    for (const locale of locales) {
      expect(platformPageCopy[locale].capabilities.items.map((item) => item.id)).toEqual([
        'agents',
        'data',
        'deployment',
        'autoresearch',
      ])
      expect(platformPageCopy[locale].loop.steps).toHaveLength(5)
      expect(platformPageCopy[locale].hero.stack.layers).toHaveLength(4)
    }
  })

  it('writes LlamaFactory as one word', () => {
    for (const locale of locales) {
      for (const [path, value] of collectStrings(platformPageCopy[locale])) {
        expect(value, `${locale}.${path}`).not.toMatch(/LLaMA[\s-]?Factory/)
      }
    }
  })

  it('compares cost on one honest scale', () => {
    for (const locale of locales) {
      const rows = platformPageCopy[locale].results.chart.rows
      expect(rows.map((row) => [row.value, row.display])).toEqual([
        [30, '30×'],
        [1, '1×'],
      ])
    }
  })
})

describe.each(locales)('PlatformPage (%s)', (locale) => {
  const copy = platformPageCopy[locale]
  const html = renderHtml(<PlatformPage locale={locale} />)
  const has = (text: string) => expect(html, text).toContain(escapeHtml(text))

  it('passes the page basics (one h1, alt text, no leaked values)', () => {
    expectPageBasics(html)
  })

  it('renders every section once, each labelled by its heading', () => {
    for (const id of sectionIds) {
      expect(count(html, `id="${id}"`), `#${id}`).toBe(1)
      expect(html, `#${id} labelled`).toContain(`aria-labelledby="${id}-title"`)
      expect(count(html, `id="${id}-title"`), `#${id}-title`).toBe(1)
    }
  })

  it('renders the hero claim, specs and the stack drawing', () => {
    has(copy.hero.titleAccent)
    has(copy.hero.lead)
    for (const spec of copy.hero.specs) {
      has(spec.value)
      has(spec.label)
    }
    has(copy.hero.stack.ariaLabel)
    for (const layer of copy.hero.stack.layers) has(layer)
  })

  it('gives each capability its own block, features and schematic', () => {
    for (const item of copy.capabilities.items) {
      expect(count(html, `id="${item.id}"`), `#${item.id}`).toBe(1)
      expect(html).toContain(`aria-labelledby="${item.id}-title"`)
      has(item.name)
      has(item.lead)
      for (const feature of item.features) {
        has(feature.title)
        has(feature.body)
      }
    }
    expect(count(html, 'class="pf-dg"')).toBe(4)
    for (const diagram of Object.values(copy.capabilities.diagrams)) has(diagram.ariaLabel)
  })

  it('shows every owner fact', () => {
    for (const fact of facts) has(fact)
    has('Claude Code')
  })

  it('links local deployment to the security page', () => {
    expect(html).toContain('href="/security"')
  })

  it('renders the closed loop: five steps and the feedback path', () => {
    for (const step of copy.loop.steps) {
      has(step.label)
      has(step.title)
      has(step.output)
    }
    has(copy.loop.diagram.feedback)
    has(copy.loop.loopNote)
    expect(count(html, 'class="pf-loop__step"')).toBe(5)
  })

  it('draws the cost chart on one scale: thirty reference cells, one lit cell', () => {
    has(copy.results.chart.title)
    has(copy.results.chart.caption)
    expect(count(html, 'pf-cost__cell--ref')).toBe(30)
    expect(count(html, 'pf-cost__cell--ours')).toBe(1)
    for (const stat of copy.results.stats) {
      has(stat.value)
      has(stat.label)
    }
  })

  it('links all three products with their marks', () => {
    for (const id of productOrder) {
      expect(html, id).toContain(`href="${productPaths[id]}"`)
      expect(html, id).toContain(`src="${productLogos[id]}"`)
      has(siteText[locale].products[id].name)
    }
    has('LlamaFactory')
    expect(html).not.toMatch(/LLaMA[\s-]?Factory/)
  })
})
