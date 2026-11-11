import { useRef } from 'react'
import { useCycle, useInView, useReducedMotion } from '../../../components/site/motion'

/**
 * A ticking counter for state-driven mock activity (a stepping highlight, a
 * streaming log). It counts up every `intervalMs` only while `ref` is on
 * screen and motion is allowed, and pauses while the tab is hidden
 * (`useCycle`). On the server, without JS and under reduced motion it stays
 * at 0 and `live` is false, so the first render is the static picture.
 */
export function useLiveTick<T extends Element>(intervalMs: number, period = 100000) {
  const ref = useRef<T>(null)
  const inView = useInView(ref)
  const reduced = useReducedMotion()
  const live = inView && !reduced
  const tick = useCycle(period, intervalMs, live)
  return { ref, tick, live }
}
