import { describe, expect, it } from 'vitest'
import { resolveRoute } from '../routes'
import { classifyLinkClick, getPrefetchTarget, type AnchorLike, type ClickLike } from './links'
import { getLoadedPage, loadPage } from './pages'

const origin = 'https://prismshadow.com'
const current = { origin, pathname: '/platform' }

const click = (overrides: Partial<ClickLike> = {}): ClickLike => ({
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  defaultPrevented: false,
  ...overrides,
})

const anchor = (href: string, attrs: Record<string, string> = {}): AnchorLike => ({
  // Browsers resolve a relative href against the current page URL.
  href: new URL(href, origin + current.pathname).href,
  target: attrs.target ?? '',
  hasAttribute: (name) => name in attrs,
  getAttribute: (name) => (name === 'href' ? href : (attrs[name] ?? null)),
})

describe('classifyLinkClick', () => {
  it.each([
    ['/customers', 'page'],
    ['/product/penguin-harness', 'page'],
    ['/customers#cobo', 'page'],
    ['/', 'page'],
    ['#results', 'hash'],
    ['/platform#results', 'hash'],
  ])('%s → %s', (href, kind) => {
    expect(classifyLinkClick(click(), anchor(href), current)?.kind).toBe(kind)
  })

  it.each([
    ['external origin', anchor('https://github.com/hiyouga/LlamaFactory')],
    ['new tab', anchor('/customers', { target: '_blank' })],
    ['download', anchor('/customers', { download: '' })],
    ['rel=external', anchor('/customers', { rel: 'noopener external' })],
    ['file asset', anchor('/og-image.jpg')],
    ['serverless function', anchor('/api/contact')],
    ['mailto', anchor('mailto:hi@example.com')],
  ])('leaves %s to the browser', (_label, a) => {
    expect(classifyLinkClick(click(), a, current)).toBeNull()
  })

  it.each([
    ['middle click', { button: 1 }],
    ['cmd-click', { metaKey: true }],
    ['ctrl-click', { ctrlKey: true }],
    ['shift-click', { shiftKey: true }],
    ['already handled', { defaultPrevented: true }],
  ])('ignores %s', (_label, overrides) => {
    expect(classifyLinkClick(click(overrides), anchor('/customers'), current)).toBeNull()
  })

  it('prefetches other pages only', () => {
    expect(getPrefetchTarget(anchor('/people'), current)?.pathname).toBe('/people')
    expect(getPrefetchTarget(anchor('#results'), current)).toBeNull()
  })
})

describe('page registry', () => {
  it('serves home synchronously', () => {
    expect(getLoadedPage(resolveRoute('/'))).toBeTypeOf('function')
  })

  it.each([
    '/platform',
    '/customers',
    '/people',
    '/product/penguin-harness',
    '/product/panofy',
    '/product/llama-factory',
    '/solutions/departments',
    '/solutions/departments/sales',
    '/solutions/industries/retail',
    '/resources/use-case-library',
    '/resources/agent-marketplace',
    '/blog',
    '/blog/any-post',
    '/about',
    '/security',
    '/contact',
  ])('loads and caches the chunk for %s', async (path) => {
    const route = resolveRoute(path)
    const page = await loadPage(route)
    expect(page).toBeTypeOf('function')
    expect(getLoadedPage(route)).toBe(page)
  })
})
