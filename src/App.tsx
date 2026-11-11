import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { initMotion, scanAnimations } from './components/site/motion'
import { SiteFooter } from './components/site/SiteFooter'
import { SiteHeader } from './components/site/SiteHeader'
import { defaultLocale, localeStorageKey, locales, siteText, type Locale } from './i18n'
import { classifyLinkClick, getPrefetchTarget } from './navigation/links'
import { getLoadedPage, loadPage, pageKey, renderRoute } from './navigation/pages'
import { hasDynamicSeo, normalizePathname, resolveRoute } from './routes'
import { applyDocumentMetadata, getRouteSeo } from './seo'

type Location = { pathname: string; hash: string }

// useLayoutEffect warns during server prerendering; it is a no-op there anyway.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
type HistoryState = { scrollY?: number } | null

const readLocation = (): Location =>
  typeof window === 'undefined'
    ? { pathname: '/', hash: '' }
    : { pathname: normalizePathname(window.location.pathname), hash: window.location.hash }

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale
  try {
    const stored = window.localStorage.getItem(localeStorageKey)
    if (stored && (locales as readonly string[]).includes(stored)) return stored as Locale
  } catch {
    // Storage can be unavailable (private mode); fall back to the default.
  }
  return defaultLocale
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown
}

const supportsViewTransitions = () =>
  typeof document !== 'undefined' && 'startViewTransition' in document

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Run a synchronous DOM update inside a view transition when available. */
function withViewTransition(update: () => void) {
  const doc = document as ViewTransitionDocument
  if (!doc.startViewTransition || prefersReducedMotion()) {
    update()
    return
  }
  doc.startViewTransition(update)
}

/** Scroll to a #hash target, or to a y offset, without smooth scrolling. */
function applyScroll(hash: string, y: number) {
  const id = hash ? decodeURIComponent(hash.slice(1)) : ''
  const target = id ? document.getElementById(id) : null
  if (target) {
    target.scrollIntoView({ block: 'start', behavior: 'instant' })
    return
  }
  window.scrollTo({ top: y, left: 0, behavior: 'instant' })
}

function saveScrollPosition() {
  const state = (window.history.state as HistoryState) ?? {}
  window.history.replaceState({ ...state, scrollY: window.scrollY }, '')
}

type AppProps = {
  /** Prerendering only: the route to render (there is no window.location). */
  initialPathname?: string
}

function App({ initialPathname }: AppProps = {}) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const [location, setLocation] = useState<Location>(() =>
    initialPathname ? { pathname: normalizePathname(initialPathname), hash: '' } : readLocation(),
  )
  const [loading, setLoading] = useState(false)
  const [navCount, setNavCount] = useState(0)
  const [announcement, setAnnouncement] = useState('')
  const [, setChunkTick] = useState(0)
  const navToken = useRef(0)
  const locationRef = useRef(location)
  const restoredInitialScroll = useRef(false)

  const { pathname } = location
  const route = resolveRoute(pathname)
  const Page = getLoadedPage(route)
  const routeKey = pageKey(route)
  const dynamicSeo = hasDynamicSeo(route)

  useEffect(() => {
    locationRef.current = location
  }, [location])

  // Direct visits: load the first page's chunk, then render it.
  useEffect(() => {
    if (Page) return
    let alive = true
    loadPage(resolveRoute(locationRef.current.pathname))
      .then(() => {
        if (alive) setChunkTick((tick) => tick + 1)
      })
      .catch(() => window.location.reload())
    return () => {
      alive = false
    }
  }, [Page, routeKey])

  // Start the motion system once the first page is in the DOM, before paint,
  // so visuals already on screen never flash out and back in.
  useIsomorphicLayoutEffect(() => {
    if (Page) initMotion()
  }, [Page])

  // After the first page renders: honour a #hash or a saved scroll position.
  useEffect(() => {
    if (!Page || restoredInitialScroll.current) return
    restoredInitialScroll.current = true
    const savedY = (window.history.state as HistoryState)?.scrollY ?? 0
    if (locationRef.current.hash || savedY) {
      requestAnimationFrame(() => applyScroll(locationRef.current.hash, savedY))
    }
  }, [Page])

  /**
   * Navigate in-app: load the target chunk first (showing a thin progress bar
   * if that takes a moment), then swap pages inside a view transition.
   */
  const navigate = useCallback(
    async (target: Location, mode: 'push' | 'pop', href: string, scrollY = 0) => {
      const token = ++navToken.current
      const nextRoute = resolveRoute(target.pathname)
      const slow = window.setTimeout(() => setLoading(true), 120)
      try {
        await loadPage(nextRoute)
      } catch {
        // The chunk failed to load (offline, new deploy): fall back to a full load.
        window.clearTimeout(slow)
        if (mode === 'push') window.location.assign(href)
        else window.location.reload()
        return
      }
      window.clearTimeout(slow)
      if (token !== navToken.current) return // a newer navigation won

      withViewTransition(() => {
        flushSync(() => {
          setLocation(target)
          setLoading(false)
          setNavCount((count) => count + 1)
        })
        if (mode === 'push') window.history.pushState({ scrollY: 0 }, '', href)
        applyScroll(target.hash, scrollY)
        // The new page's visuals play their intros as part of the transition.
        scanAnimations('enter')
      })

      document.getElementById('main')?.focus({ preventScroll: true })
      window.setTimeout(() => setAnnouncement(document.title), 120)
    },
    [],
  )

  // Intercept internal link clicks, prefetch on intent, handle back/forward.
  useEffect(() => {
    window.history.scrollRestoration = 'manual'

    const current = () => ({ origin: window.location.origin, pathname: window.location.pathname })

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return
      const decision = classifyLinkClick(event, anchor, current())
      if (!decision) return
      event.preventDefault()
      const { url } = decision

      if (decision.kind === 'hash') {
        saveScrollPosition()
        window.history.pushState({ scrollY: 0 }, '', url.hash)
        const id = decodeURIComponent(url.hash.slice(1))
        const target = document.getElementById(id)
        target?.scrollIntoView({ block: 'start' })
        if (target?.hasAttribute('tabindex')) target.focus({ preventScroll: true })
        setLocation({ pathname: locationRef.current.pathname, hash: url.hash })
        return
      }

      const target = { pathname: normalizePathname(url.pathname), hash: url.hash }
      if (target.pathname === locationRef.current.pathname && !url.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      saveScrollPosition()
      void navigate(target, 'push', url.pathname + url.search + url.hash)
    }

    const onPopState = () => {
      const next = readLocation()
      const savedY = (window.history.state as HistoryState)?.scrollY ?? 0
      if (next.pathname === locationRef.current.pathname) {
        // Same page, only the #hash changed: scroll, no page transition.
        setLocation(next)
        if (next.hash) document.getElementById(decodeURIComponent(next.hash.slice(1)))?.scrollIntoView()
        else window.scrollTo({ top: savedY })
        return
      }
      void navigate(next, 'pop', next.pathname + next.hash, savedY)
    }

    const onIntent = (event: Event) => {
      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return
      const url = getPrefetchTarget(anchor, current())
      if (url) loadPage(resolveRoute(url.pathname)).catch(() => {})
    }

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPopState)
    window.addEventListener('pagehide', saveScrollPosition)
    document.addEventListener('pointerover', onIntent, { passive: true })
    document.addEventListener('touchstart', onIntent, { passive: true })
    document.addEventListener('focusin', onIntent)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('pagehide', saveScrollPosition)
      document.removeEventListener('pointerover', onIntent)
      document.removeEventListener('touchstart', onIntent)
      document.removeEventListener('focusin', onIntent)
    }
  }, [navigate])

  const toggleLocale = () =>
    withViewTransition(() => {
      flushSync(() => setLocale((current) => (current === 'en' ? 'zh' : 'en')))
    })

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    try {
      window.localStorage.setItem(localeStorageKey, locale)
    } catch {
      // Ignore storage failures; the toggle still works for this visit.
    }
  }, [locale])

  useEffect(() => {
    if (!dynamicSeo) applyDocumentMetadata(getRouteSeo(pathname, locale), pathname, locale)
  }, [dynamicSeo, locale, pathname])

  // Without view transitions, fade the new page in instead (never on first load).
  const fadeIn = navCount > 0 && !supportsViewTransitions()

  return (
    <>
      <div className="ds-progress" data-active={loading || undefined} aria-hidden="true" />
      <SiteHeader locale={locale} pathname={pathname} onToggleLocale={toggleLocale} />
      <main id="main" className="ds-main" tabIndex={-1}>
        <div className="ds-page" key={pathname} data-enter={fadeIn || undefined}>
          {Page ? (
            renderRoute(route, Page, locale, pathname)
          ) : (
            <PageFallback label={siteText[locale].status.loading} />
          )}
        </div>
      </main>
      <SiteFooter locale={locale} onToggleLocale={toggleLocale} />
      <div className="ds-sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
    </>
  )
}

function PageFallback({ label }: { label: string }) {
  return (
    <div className="ds-container" style={{ minHeight: '70svh' }} role="status" aria-live="polite">
      <span className="ds-sr-only">{label}</span>
    </div>
  )
}

export default App
