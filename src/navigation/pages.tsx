import type { ComponentType, ReactNode } from 'react'
import { HomePage } from '../components/home/HomePage'
import type { Locale } from '../i18n'
import type { Route } from '../routes'

/**
 * Page registry. Every page except home lives in its own chunk. Chunks are
 * loaded *before* a navigation commits (and prefetched on hover/focus), so a
 * route change can swap pages synchronously inside a view transition, with
 * no loading flash.
 */

// Page components take different props; the registry stores them loosely and
// `renderRoute` passes the right props for each route kind.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPage = ComponentType<any>

const loaders = {
  platform: () => import('../pages/platform/PlatformPage').then((m) => m.PlatformPage),
  customers: () => import('../pages/customers/CustomersPage').then((m) => m.CustomersPage),
  people: () => import('../pages/company/PeoplePage').then((m) => m.PeoplePage),
  'penguin-harness': () =>
    import('../pages/products/PenguinHarnessPage').then((m) => m.PenguinHarnessPage),
  panofy: () => import('../pages/products/PanofyPage').then((m) => m.PanofyPage),
  'llama-factory': () =>
    import('../pages/products/LlamaFactoryPage').then((m) => m.LlamaFactoryPage),
  departments: () =>
    import('../pages/solutions/DepartmentsPage').then((m) => m.DepartmentsPage),
  industry: () => import('../pages/solutions/IndustryPage').then((m) => m.IndustryPage),
  'use-case-library': () =>
    import('../pages/resources/UseCaseLibraryPage').then((m) => m.UseCaseLibraryPage),
  'agent-marketplace': () =>
    import('../pages/resources/AgentMarketplacePage').then((m) => m.AgentMarketplacePage),
  blog: () => import('../pages/blog/BlogIndexPage').then((m) => m.BlogIndexPage),
  'blog-post': () => import('../pages/blog/BlogPostPage').then((m) => m.BlogPostPage),
  about: () => import('../pages/company/AboutPage').then((m) => m.AboutPage),
  security: () => import('../pages/company/SecurityPage').then((m) => m.SecurityPage),
  contact: () => import('../pages/company/ContactPage').then((m) => m.ContactPage),
} satisfies Record<string, () => Promise<AnyPage>>

type PageKey = keyof typeof loaders | 'home'

const cache = new Map<PageKey, AnyPage>([['home', HomePage]])
const pending = new Map<PageKey, Promise<AnyPage>>()

export function pageKey(route: Route): PageKey {
  return route.kind === 'product' ? route.id : route.kind
}

/** The page component if its chunk is already loaded, otherwise undefined. */
export function getLoadedPage(route: Route): AnyPage | undefined {
  return cache.get(pageKey(route))
}

/** Load (once) and cache the chunk for a route. */
export function loadPage(route: Route): Promise<AnyPage> {
  const key = pageKey(route)
  const hit = cache.get(key)
  if (hit) return Promise.resolve(hit)
  const inflight = pending.get(key)
  if (inflight) return inflight
  const promise = loaders[key as keyof typeof loaders]()
    .then((page) => {
      cache.set(key, page)
      pending.delete(key)
      return page
    })
    .catch((error: unknown) => {
      pending.delete(key)
      throw error
    })
  pending.set(key, promise)
  return promise
}

export function renderRoute(
  route: Route,
  Page: AnyPage,
  locale: Locale,
  pathname: string,
): ReactNode {
  switch (route.kind) {
    case 'departments':
      return <Page locale={locale} departmentId={route.id} pathname={pathname} />
    case 'industry':
      return <Page locale={locale} industryId={route.id} />
    case 'blog-post':
      return <Page locale={locale} slug={route.slug} />
    default:
      return <Page locale={locale} />
  }
}
