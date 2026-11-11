import type { DepartmentId, IndustryId, ProductId } from './i18n/messages/shared'
import { departmentOrder, industryOrder } from './components/site/navigation'

export type Route =
  | { kind: 'home' }
  | { kind: 'platform' }
  | { kind: 'customers' }
  | { kind: 'people' }
  | { kind: 'product'; id: ProductId }
  | { kind: 'departments'; id: DepartmentId | null }
  | { kind: 'industry'; id: IndustryId }
  | { kind: 'use-case-library' }
  | { kind: 'agent-marketplace' }
  | { kind: 'blog' }
  | { kind: 'blog-post'; slug: string }
  | { kind: 'about' }
  | { kind: 'security' }
  | { kind: 'contact' }

export const normalizePathname = (pathname: string) => pathname.replace(/\/+$/, '') || '/'

const productRoutes: Record<string, ProductId> = {
  '/product/penguin-harness': 'penguin-harness',
  '/product/panofy': 'panofy',
  '/product/llama-factory': 'llama-factory',
}

const staticRoutes: Record<string, Route> = {
  '/': { kind: 'home' },
  '/platform': { kind: 'platform' },
  '/customers': { kind: 'customers' },
  '/people': { kind: 'people' },
  '/about': { kind: 'about' },
  '/security': { kind: 'security' },
  '/contact': { kind: 'contact' },
  '/blog': { kind: 'blog' },
  '/resources/use-case-library': { kind: 'use-case-library' },
  '/resources/agent-marketplace': { kind: 'agent-marketplace' },
  '/solutions/departments': { kind: 'departments', id: null },
  // Legacy alias kept for old links.
  '/industries/restaurant': { kind: 'industry', id: 'restaurants' },
}

export function resolveRoute(rawPathname: string): Route {
  const pathname = normalizePathname(rawPathname)

  if (staticRoutes[pathname]) return staticRoutes[pathname]
  if (productRoutes[pathname]) return { kind: 'product', id: productRoutes[pathname] }

  const department = pathname.match(/^\/solutions\/departments\/([^/]+)$/)?.[1]
  if (department && (departmentOrder as string[]).includes(department)) {
    return { kind: 'departments', id: department as DepartmentId }
  }

  const industry = pathname.match(/^\/solutions\/industries\/([^/]+)$/)?.[1]
  if (industry && (industryOrder as string[]).includes(industry)) {
    return { kind: 'industry', id: industry as IndustryId }
  }

  if (pathname.startsWith('/blog/')) return { kind: 'blog-post', slug: pathname }

  return { kind: 'home' }
}

/** Routes whose page component sets its own metadata via `usePageMetadata`. */
export const hasDynamicSeo = (route: Route) =>
  route.kind === 'blog-post' || (route.kind === 'departments' && route.id !== null)
