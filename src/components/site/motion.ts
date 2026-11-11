import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'

/**
 * Site-wide motion contract (see the "Motion" section in src/index.css).
 *
 * - Mark an animated visual with `data-animate` (or `data-animate="custom"`
 *   to skip the default fade-up and only use your own keyframes).
 * - When JS runs and motion is allowed, <html> gets `data-motion` before first
 *   paint (inline boot script in index.html). Marked elements stay hidden
 *   until they are about 20% in view, then get `data-inview="enter"` and play
 *   their intro once, including on screen at first load, so e.g. the home
 *   chart grows on every visit.
 * - Statistical charts (curves, bars, counts) grow once and then rest; only
 *   framework diagrams, flows and UI mocks may loop.
 * - Elements inserted later (an in-app navigation, a newly selected tab
 *   panel) are picked up automatically.
 * - No JS, reduced motion or prerendered HTML: no `data-motion`, so nothing
 *   is hidden and nothing animates. The resting CSS is the final state.
 */

const SELECTOR = '[data-animate]'

let observer: IntersectionObserver | null = null
let mutations: MutationObserver | null = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

function reveal(el: Element, mode: 'initial' | 'enter') {
  el.setAttribute('data-inview', mode)
}

function inViewport(el: Element) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.top < vh * 0.92 && rect.bottom > 0 && rect.width + rect.height > 0
}

function track(el: Element, mode: 'initial' | 'enter') {
  if (el.hasAttribute('data-inview')) return
  if (inViewport(el)) reveal(el, mode)
  else observer?.observe(el)
}

/** Mark every pending `[data-animate]` element: on screen now → `mode`, else observe. */
export function scanAnimations(mode: 'initial' | 'enter', root: ParentNode = document) {
  if (typeof window === 'undefined') return
  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    document.documentElement.removeAttribute('data-motion')
    root.querySelectorAll(SELECTOR).forEach((el) => reveal(el, 'initial'))
    return
  }
  root.querySelectorAll(SELECTOR).forEach((el) => track(el, mode))
}

/**
 * Start the motion system once, right after the first page has rendered
 * (before paint). Safe to call more than once.
 */
export function initMotion() {
  if (typeof window === 'undefined' || observer) return
  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    // scanAnimations removes the boot script's data-motion mark here.
    scanAnimations('initial')
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        reveal(entry.target, 'enter')
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  )

  // Visuals on screen at first load were held in their pre-intro state since
  // first paint (boot script), so they grow in now like everything else.
  document.documentElement.setAttribute('data-motion', '')
  ;(window as Window & { __psMotion?: boolean }).__psMotion = true
  scanAnimations('enter')

  // Anything mounted later (navigation, tab switch) plays its intro.
  mutations = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return
        if (node.matches(SELECTOR)) track(node, 'enter')
        node.querySelectorAll(SELECTOR).forEach((el) => track(el, 'enter'))
      })
    }
  })
  mutations.observe(document.body, { childList: true, subtree: true })
}

/* ------------------------------------------------------------------ */
/* Hooks for state-driven motion (cycling highlights, live counters)   */
/* ------------------------------------------------------------------ */

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
  query?.addEventListener('change', onChange)
  return () => query?.removeEventListener('change', onChange)
}

/** True when the visitor prefers reduced motion (and on the server). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => true)
}

/** Whether `ref` is currently on screen (false on the server). */
export function useInView<T extends Element>(ref: RefObject<T | null>, threshold = 0.2): boolean {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return inView
}

/**
 * Step through `length` items every `intervalMs` while `active` (pass
 * `useInView(ref) && !useReducedMotion()`), pausing while the tab is hidden.
 * Returns the current index (0 on the server and when inactive from the start).
 */
export function useCycle(length: number, intervalMs: number, active: boolean): number {
  const [index, setIndex] = useState(0)
  const lengthRef = useRef(length)
  useEffect(() => {
    lengthRef.current = length
  }, [length])
  useEffect(() => {
    if (!active || length < 2) return
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'hidden') return
      setIndex((current) => (current + 1) % lengthRef.current)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [active, intervalMs, length])
  return index
}
