import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cx } from '../../../components/site/utils'

/** Scale an absolute M/L/C path drawn in a `vw`×`vh` box by (sx, sy). */
function scalePath(d: string, sx: number, sy: number) {
  let axis = 0
  return d.replace(/-?\d*\.?\d+/g, (n) => {
    const v = Number(n) * (axis++ % 2 === 0 ? sx : sy)
    return String(Math.round(v * 100) / 100)
  })
}

/**
 * Connector hairlines drawn in a normalized box (absolute M/L/C commands only)
 * and stretched over their container, with solid packets travelling along them.
 *
 * Static (server, no JS, hidden, not yet measured): the hairlines alone,
 * stretched with preserveAspectRatio="none". Once measured, the viewBox matches
 * the real pixel size, so the packets (round, zero-length dashes) stay perfect
 * dots on any aspect ratio. Their motion is CSS under html[data-motion]
 * (`.pg-product__packet`, see product-kit.css); `--k` is the connector index
 * and `--p` the packet index on it.
 */
export function Connectors({
  paths,
  box = [100, 100],
  packets = 2,
  className,
  style,
}: {
  paths: string[]
  box?: [number, number]
  /** Packets travelling on each connector, evenly spaced in time. */
  packets?: number
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((current) => {
        if (width < 1 || height < 1) return null
        if (current && Math.abs(current.w - width) < 0.5 && Math.abs(current.h - height) < 0.5) return current
        return { w: width, h: height }
      })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const [vw, vh] = box
  const lines = size ? paths.map((d) => scalePath(d, size.w / vw, size.h / vh)) : paths

  return (
    <svg
      ref={ref}
      className={cx('pg-product__wires', className)}
      viewBox={size ? `0 0 ${size.w} ${size.h}` : `0 0 ${vw} ${vh}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      {lines.map((d, k) => (
        <path key={`w${k}`} className="pg-product__wire" d={d} />
      ))}
      {size
        ? lines.flatMap((d, k) =>
            Array.from({ length: packets }, (_, p) => (
              <path
                key={`p${k}-${p}`}
                className="pg-product__packet"
                d={d}
                pathLength={1}
                style={{ '--k': k, '--p': p / packets } as CSSProperties}
              />
            )),
          )
        : null}
    </svg>
  )
}
