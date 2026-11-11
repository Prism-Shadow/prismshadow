/**
 * Static prerendering entry (build time only, runs in Node).
 *
 * `npm run build` bundles this file with `vite build --ssr`, then
 * scripts/prerender.mjs calls `prerenderAll()` and writes one HTML file per
 * route into dist/, so GitHub Pages serves every URL directly (no SPA
 * rewrites needed) with its own <title>, description, canonical URL and
 * social tags, and with the page content already in the HTML.
 */
import { renderToString } from 'react-dom/server'
import App from './App'
import { blogPosts } from './content/blogPosts'
import { departmentOrder, industryOrder, productPaths } from './components/site/navigation'
import { loadPage } from './navigation/pages'
import { normalizePathname, resolveRoute } from './routes'
import { buildHeadMetadata, getRouteSeo, prerenderMetadata, type HeadMetadata } from './seo'

export type PrerenderedPage = {
  pathname: string
  html: string
  head: HeadMetadata
}

/** Every URL the site serves. */
export function allRoutes(): string[] {
  return [
    '/',
    '/platform',
    '/customers',
    '/people',
    ...Object.values(productPaths),
    '/solutions/departments',
    ...departmentOrder.map((id) => `/solutions/departments/${id}`),
    ...industryOrder.map((id) => `/solutions/industries/${id}`),
    '/industries/restaurant',
    '/resources/use-case-library',
    '/resources/agent-marketplace',
    '/blog',
    ...blogPosts.map((post) => normalizePathname(post.slug)),
    '/about',
    '/security',
    '/contact',
  ]
}

export async function prerender(pathname: string): Promise<PrerenderedPage> {
  await loadPage(resolveRoute(pathname))
  prerenderMetadata.reset()
  const html = renderToString(<App initialPathname={pathname} />)
  // Pages with dynamic metadata (department detail, blog post) record it while
  // rendering; everything else uses the route table.
  const metadata = prerenderMetadata.take() ?? getRouteSeo(pathname, 'en')
  return { pathname, html, head: buildHeadMetadata(metadata, pathname, 'en') }
}

export async function prerenderAll(): Promise<PrerenderedPage[]> {
  const pages: PrerenderedPage[] = []
  for (const pathname of allRoutes()) pages.push(await prerender(pathname))
  return pages
}
