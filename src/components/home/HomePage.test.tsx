import { describe, expect, it } from 'vitest'
import { locales } from '../../i18n/locales'
import { homePageCopy } from '../../i18n/messages/home'
import { siteText } from '../../i18n/messages/shared'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../test/pageChecks'
import { platformPath, productPaths } from '../site/navigation'
import { HomePage } from './HomePage'

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

/** The short homepage, in order. */
const sectionIds = ['hero', 'partners', 'platform', 'products', 'proof', 'team', 'get-started']

/** Sections that moved to /platform, /customers and /people. */
const removedIds = ['how-it-works', 'results', 'customers', 'audiences']

/** Owner-supplied facts that must appear on the page in both languages. */
const facts = ['90%+', '1/30', '100+', '10+', '+8.2%', '70B', '14B', '70K+']

/** The logo strip, in the owner's order. */
const stripLogos = ['NVIDIA', 'AWS', 'AMD', 'Cobo Wallet', 'Subconscious.ai']

describe('homepage copy', () => {
  it('keeps the zh copy structurally identical to en', () => {
    expect(copyShape(homePageCopy.zh)).toEqual(copyShape(homePageCopy.en))
  })

  it('has no empty strings', () => {
    for (const locale of locales) {
      for (const [path, value] of collectStrings(homePageCopy[locale])) {
        expect(value.trim(), `${locale}.${path}`).not.toBe('')
      }
    }
  })

  it('never writes "LLaMA Factory"', () => {
    for (const locale of locales) {
      for (const [path, value] of collectStrings(homePageCopy[locale])) {
        expect(value, `${locale}.${path}`).not.toMatch(/LLaMA Factory/i)
      }
    }
  })

  it('shows exactly the five strip logos, each as a wordmark', () => {
    for (const locale of locales) {
      const logos = homePageCopy[locale].logos.logos
      expect(logos.map((logo) => logo.name)).toEqual(stripLogos)
      for (const logo of logos) {
        expect(logo.src, logo.name).toMatch(/^\/home\/partners\/[\w-]+\.svg$/)
        // A wide mark carries its own name; a square glyph needs the typeset name.
        expect(logo.ratio > 1.4 || Boolean(logo.wordmark), logo.name).toBe(true)
      }
    }
  })

  it('keeps the hero visual and proof copy to their fixed counts', () => {
    for (const locale of locales) {
      const copy = homePageCopy[locale]
      expect(copy.hero.visual.generations).toHaveLength(5)
      expect(copy.proof.stats).toHaveLength(4)
      expect(copy.proof.customers).toHaveLength(5)
    }
  })
})

describe.each(locales)('HomePage (%s)', (locale) => {
  const copy = homePageCopy[locale]
  const html = renderHtml(<HomePage locale={locale} />)
  const has = (text: string) => expect(html, text).toContain(escapeHtml(text))

  it('passes the page basics (one h1, alt text, no leaked values)', () => {
    expectPageBasics(html)
  })

  it('renders every section exactly once, in order, each labelled by its heading', () => {
    let last = -1
    for (const id of sectionIds) {
      expect(count(html, `id="${id}"`), `#${id}`).toBe(1)
      expect(html, `#${id} heading`).toMatch(new RegExp(`aria-labelledby="${id}-title"`))
      expect(count(html, `id="${id}-title"`), `#${id}-title`).toBe(1)
      const at = html.indexOf(`id="${id}"`)
      expect(at, `#${id} order`).toBeGreaterThan(last)
      last = at
    }
    expect(count(html, '<section'), 'section count').toBe(sectionIds.length)
  })

  it('no longer renders the sections that moved to their own pages', () => {
    for (const id of removedIds) expect(html, `#${id}`).not.toContain(`id="${id}"`)
    expect(html, 'founder photos').not.toContain('/about/founders/')
  })

  it('renders the headline, positioning and the evolution frontier', () => {
    has(copy.hero.titleAccent)
    has(copy.hero.body)
    expect(html).toContain(`aria-label="${escapeHtml(copy.hero.visual.ariaLabel)}"`)
    for (const label of copy.hero.visual.generations) has(label)
    has(copy.hero.visual.result)
  })

  it('renders every owner fact', () => {
    for (const fact of facts) has(fact)
  })

  it('renders the logo strip as a seamless marquee with one real set', () => {
    const set = '<ul class="hp-logos__set"'
    expect(count(html, set), 'logo sets').toBeGreaterThan(1)
    expect(count(html, `${set}>`), 'real (announced) sets').toBe(1)
    expect(count(html, `${set} aria-hidden="true">`), 'hidden copies').toBe(count(html, set) - 1)
    for (const logo of copy.logos.logos) {
      expect(count(html, `alt="${escapeHtml(logo.name)}"`), `${logo.name} alt`).toBe(1)
    }
    has(copy.logos.title)
  })

  it('renders the four capabilities as accessible tabs', () => {
    expect(count(html, 'role="tablist"')).toBe(1)
    expect(count(html, 'role="tab"')).toBe(4)
    expect(count(html, 'role="tabpanel"')).toBe(4)
    expect(count(html, 'aria-selected="true"')).toBe(1)
    for (const module of copy.platform.modules) {
      has(module.tab)
      has(module.name)
      has(module.lead)
      for (const feature of module.features) has(feature.title)
    }
  })

  it('renders the headline results and all five customers', () => {
    for (const stat of copy.proof.stats) {
      has(stat.value)
      has(stat.label)
    }
    for (const customer of copy.proof.customers) {
      has(customer.name)
      has(customer.detail)
    }
    has(copy.team.title)
    has(copy.team.stat)
  })

  it('marks every visual for the motion system (data-animate)', () => {
    expect(animated(html, 'hp-fr'), 'hero frontier').toBe(1)
    expect(animated(html, 'hp-logos__viewport'), 'logo marquee').toBe(1)
    expect(animated(html, 'hp-dg'), 'platform tab diagrams').toBe(copy.platform.modules.length)
    expect(animated(html, 'hp-iso'), 'product drawings').toBe(3)
    expect(animated(html, 'hp-proof__stats'), 'proof numbers').toBe(1)
  })

  it('renders each visual complete at rest, with its loop marks hidden until motion runs', () => {
    // One ping ring per frontier layout, one signal per tab diagram.
    expect(count(html, 'class="hp-fr__ping"')).toBe(3)
    expect(count(html, 'class="hp-dg__signal"')).toBe(copy.platform.modules.length)
    // The solved mass is grouped into reveal bands, but every band is in the markup.
    expect(count(html, 'class="hp-fr__band"')).toBeGreaterThanOrEqual(3 * 8)
    // Product vertex dots and proof stats carry their stagger order.
    expect(html).toMatch(/class="hp-iso__dot[^"]*"[^>]*style="--i:0"/)
    expect(count(html, 'class="ds-stat hp-proof__stat" style="--i:')).toBe(4)
  })

  it('links to contact, platform, customers, people and every product page', () => {
    for (const href of ['/contact', platformPath, '/customers', '/people']) {
      expect(html, href).toContain(`href="${href}"`)
    }
    has(copy.platform.cta)
    has(copy.proof.cta)
    has(copy.team.cta)
    for (const path of Object.values(productPaths)) expect(html).toContain(`href="${path}"`)
    for (const item of copy.products.items) {
      has(siteText[locale].products[item.id].name)
      has(item.body)
    }
  })
})
