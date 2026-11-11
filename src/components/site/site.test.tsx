import { describe, expect, it } from 'vitest'
import { locales } from '../../i18n'
import { siteText } from '../../i18n/messages/shared'
import { resolveRoute } from '../../routes'
import { collectStrings, copyShape, renderHtml } from '../../test/pageChecks'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { CtaBand } from './ui'

describe('shared site copy', () => {
  it('zh has the same shape as en and no empty strings', () => {
    expect(copyShape(siteText.zh)).toEqual(copyShape(siteText.en))
    for (const locale of locales)
      for (const [path, value] of collectStrings(siteText[locale]))
        expect(value.trim(), `${locale}.${path}`).not.toBe('')
  })
})

describe('routes', () => {
  it.each([
    ['/', 'home'],
    ['/platform', 'platform'],
    ['/customers', 'customers'],
    ['/people', 'people'],
    ['/product/penguin-harness', 'product'],
    ['/product/panofy/', 'product'],
    ['/product/llama-factory', 'product'],
    ['/solutions/departments', 'departments'],
    ['/solutions/departments/sales', 'departments'],
    ['/solutions/industries/retail', 'industry'],
    ['/industries/restaurant', 'industry'],
    ['/resources/use-case-library', 'use-case-library'],
    ['/resources/agent-marketplace', 'agent-marketplace'],
    ['/blog', 'blog'],
    ['/blog/some-post', 'blog-post'],
    ['/about', 'about'],
    ['/security', 'security'],
    ['/contact', 'contact'],
    ['/does-not-exist', 'home'],
  ])('%s → %s', (path, kind) => {
    expect(resolveRoute(path).kind).toBe(kind)
  })
})

describe.each(locales)('site chrome (%s)', (locale) => {
  it('header links every product, department, industry and resource', () => {
    const html = renderHtml(<SiteHeader locale={locale} pathname="/" onToggleLocale={() => {}} />)
    for (const href of [
      '/product/penguin-harness',
      '/product/panofy',
      '/product/llama-factory',
      '/solutions/departments/sales',
      '/solutions/industries/healthcare',
      '/resources/use-case-library',
      '/resources/agent-marketplace',
      '/blog',
      '/platform',
      '/customers',
      '/about',
      '/people',
      '/security',
      '/contact',
    ])
      expect(html).toContain(`href="${href}"`)
    expect(html).not.toMatch(/<h1[\s>]/)
  })

  it('footer and CTA render', () => {
    const footer = renderHtml(<SiteFooter locale={locale} onToggleLocale={() => {}} />)
    expect(footer).toContain(siteText[locale].footer.tagline)
    const cta = renderHtml(<CtaBand locale={locale} />)
    expect(cta).toContain('href="/contact"')
  })
})
