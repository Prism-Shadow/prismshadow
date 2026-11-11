import { describe, expect, it } from 'vitest'
import {
  departmentOrder,
  departmentsPath,
  getDepartmentPath,
  getIndustryPath,
  industryOrder,
} from '../../components/site/navigation'
import { locales } from '../../i18n/locales'
import { customersPageCopy } from '../../i18n/messages/customersPage'
import { siteText } from '../../i18n/messages/shared'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../test/pageChecks'
import { CustomersPage } from './CustomersPage'

/** Match how React escapes text content in server-rendered HTML. */
const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;')

const count = (html: string, needle: string) => html.split(needle).length - 1

/** Opening tags that opt into the motion system, and how many carry `className`. */
const animated = (html: string, className: string) =>
  [...html.matchAll(/<[a-z]+\b[^>]*\bdata-animate="[^"]*"[^>]*>/g)].filter(([tag]) =>
    new RegExp(`\\bclass="(?:[^"]* )?${className}(?: [^"]*)?"`).test(tag),
  ).length

const sectionIds = ['hero', 'case-studies', 'enterprise', 'audiences', 'explore', 'get-started']

/** Owner-supplied customer facts that must appear in both languages. */
const facts = ['Cobo Wallet', 'Subconscious.ai', '+8.2%', '70B', '14B', '30']

describe('customers page copy', () => {
  it('keeps the zh copy structurally identical to en', () => {
    expect(copyShape(customersPageCopy.zh)).toEqual(copyShape(customersPageCopy.en))
  })

  it('has no empty strings', () => {
    for (const locale of locales) {
      for (const [path, value] of collectStrings(customersPageCopy[locale])) {
        expect(value.trim(), `${locale}.${path}`).not.toBe('')
      }
    }
  })

  it('names only the two public customers; the three enterprises stay anonymous', () => {
    for (const locale of locales) {
      const copy = customersPageCopy[locale]
      expect(copy.featured.cases.map((item) => item.customer)).toEqual(['Cobo Wallet', 'Subconscious.ai'])
      expect(copy.enterprise.cases.map((item) => item.id)).toEqual(['semiconductor', 'pharma', 'health-screening'])
      for (const item of copy.enterprise.cases) {
        expect(item.customer, item.id).toMatch(locale === 'zh' ? /^某.+企业$/ : /(manufacturer|company)$/)
      }
      expect(copy.audiences.segments.map((segment) => segment.id)).toEqual([
        'knowledge',
        'security',
        'ai-native',
        'platforms',
      ])
    }
  })

  it('writes LlamaFactory as one word', () => {
    for (const locale of locales) {
      for (const [path, value] of collectStrings(customersPageCopy[locale])) {
        expect(value, `${locale}.${path}`).not.toMatch(/LLaMA[\s-]?Factory/)
      }
    }
  })
})

describe.each(locales)('CustomersPage (%s)', (locale) => {
  const copy = customersPageCopy[locale]
  const html = renderHtml(<CustomersPage locale={locale} />)
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

  it('leads with the claim and the three headline results', () => {
    has(copy.hero.titleAccent)
    has(copy.hero.lead)
    for (const item of copy.hero.proof) {
      has(item.value)
      has(item.label)
      has(item.source)
    }
  })

  it('shows every owner fact', () => {
    for (const fact of facts) has(fact)
  })

  it('gives both featured cases a full row with their panel', () => {
    for (const item of copy.featured.cases) {
      expect(count(html, `id="${item.id}"`), `#${item.id}`).toBe(1)
      has(item.customer)
      has(item.sector)
      has(item.title)
      has(item.body)
      expect(html).toContain(`href="${item.capability.href}"`)
    }
    expect(count(html, 'class="cu-grid__cell"')).toBe(30)
    for (const stage of copy.featured.subconscious.stages) has(stage)
    has(copy.featured.cobo.key)
  })

  it('renders the three enterprise cases', () => {
    expect(count(html, 'class="cu-enterprise__item"')).toBe(3)
    for (const item of copy.enterprise.cases) {
      has(item.customer)
      has(item.value)
      has(item.title)
      has(item.body)
      expect(html).toContain(`href="${item.capability.href}"`)
    }
  })

  it('marks every visual for the motion system (data-animate)', () => {
    expect(animated(html, 'cu-grid'), 'Cobo scenario cells').toBe(1)
    expect(animated(html, 'cu-life'), 'Subconscious.ai lifecycle').toBe(1)
    expect(animated(html, 'cu-enterprise__list'), 'enterprise columns').toBe(1)
    expect(animated(html, 'cu-meter'), 'enterprise live meters').toBe(copy.enterprise.cases.length)
  })

  it('orders the motion: each Cobo cell has a fill slot, each stage a solid slot, each case a meter', () => {
    const order = [...html.matchAll(/class="cu-grid__cell"[^>]*style="--i:(\d+)"/g)].map(([, i]) => Number(i))
    expect([...order].sort((a, b) => a - b)).toEqual(Array.from({ length: 30 }, (_, i) => i))
    expect(html.match(/class="cu-life__stage(?: is-ours)?"/g)).toHaveLength(copy.featured.subconscious.stages.length)
    for (let i = 0; i < copy.featured.subconscious.stages.length; i += 1) {
      expect(html).toMatch(new RegExp(`class="cu-life__stage[^"]*" style="--i:${i}"`))
    }
    // The dark twin label (shown on the solid fill) is hidden from assistive tech.
    expect(count(html, 'class="cu-life__label cu-life__label--on" aria-hidden="true"')).toBe(
      copy.featured.subconscious.stages.length,
    )
    for (const pattern of ['queue', 'trials', 'scan']) expect(html).toContain(`cu-meter cu-meter--${pattern}`)
  })

  it('renders the four customer profiles', () => {
    expect(count(html, 'cu-audiences__item')).toBe(4)
    for (const segment of copy.audiences.segments) {
      has(segment.title)
      has(segment.examples)
      has(segment.body)
    }
  })

  it('cross-links every industry and department', () => {
    for (const id of industryOrder) {
      expect(html, id).toContain(`href="${getIndustryPath(id)}"`)
      has(siteText[locale].industries[id])
    }
    for (const id of departmentOrder) {
      expect(html, id).toContain(`href="${getDepartmentPath(id)}"`)
    }
    expect(html).toContain(`href="${departmentsPath}"`)
  })

  it('closes with its own CTA', () => {
    has(copy.cta.titleAccent)
    expect(html).toContain(`href="${copy.cta.primary.href}"`)
  })
})
