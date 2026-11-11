/**
 * Decide how a click on a link is handled:
 * - `page`: an in-app page navigation (chunk preload + view transition)
 * - `hash`: an anchor on the current page (smooth scroll, history entry)
 * - `null`: leave it to the browser (new tab, download, external, file…)
 */

export type ClickLike = {
  button: number
  metaKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
  altKey: boolean
  defaultPrevented: boolean
}

export type AnchorLike = {
  href: string
  target: string
  hasAttribute(name: string): boolean
  getAttribute(name: string): string | null
}

export type LinkDecision = { kind: 'page' | 'hash'; url: URL }

type Current = { origin: string; pathname: string }

/** Paths served as files or serverless functions, never as app pages. */
const nonPagePath = /^\/api(\/|$)|\.[a-z0-9]{2,5}$/i

const normalize = (pathname: string) => pathname.replace(/\/+$/, '') || '/'

export function classifyLinkClick(
  event: ClickLike,
  anchor: AnchorLike,
  current: Current,
): LinkDecision | null {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  if (anchor.target && anchor.target !== '_self') return null
  if (anchor.hasAttribute('download')) return null
  if ((anchor.getAttribute('rel') ?? '').split(/\s+/).includes('external')) return null

  const raw = anchor.getAttribute('href')
  if (!raw || /^(mailto|tel|javascript):/i.test(raw)) return null

  let url: URL
  try {
    url = new URL(anchor.href)
  } catch {
    return null
  }
  if (url.origin !== current.origin) return null
  if (nonPagePath.test(url.pathname)) return null

  const samePath = normalize(url.pathname) === normalize(current.pathname)
  if (samePath && url.hash && url.hash !== '#') return { kind: 'hash', url }
  return { kind: 'page', url }
}

/** Prefetch candidate on hover/focus/touch: an internal link to another page. */
export function getPrefetchTarget(anchor: AnchorLike, current: Current): URL | null {
  const decision = classifyLinkClick(
    { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, defaultPrevented: false },
    anchor,
    current,
  )
  return decision?.kind === 'page' ? decision.url : null
}
