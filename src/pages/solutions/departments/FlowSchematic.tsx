import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../../components/site/utils'
import './flow.css'

export type FlowTone = 'accent' | 'cyan' | 'amber' | 'coral' | 'green'

/**
 * Inputs → core → outputs, drawn with HTML nodes and hairline SVG wires
 * (non-scaling strokes, so the wires stay 1px at any size). Below ~520px of
 * container width it reflows into a vertical stack. The whole figure is one
 * image for assistive tech; pass a `label` that says what it shows.
 *
 * Motion (flow.css), a diagram so it loops: solid packets run each input wire
 * into the core (each input fills as it sends), then fan out down the output
 * wires (each output fills as its packet lands). On entering view (also at
 * first load) the nodes fade in from left to right. The markup is the static
 * resting state.
 */
export function FlowSchematic({
  inputs,
  core,
  outputs,
  label,
  inputTone = 'cyan',
  outputTone = 'accent',
  variant = 'chip',
  className,
}: {
  inputs: ReactNode[]
  core: ReactNode
  outputs: ReactNode[]
  label: string
  inputTone?: FlowTone
  outputTone?: FlowTone
  /** chip: one-line labels · card: multi-line blocks */
  variant?: 'chip' | 'card'
  className?: string
}) {
  const style = {
    '--flow-in': inputs.length,
    '--flow-out': outputs.length,
  } as CSSProperties

  return (
    <div className={cx('pg-flow-wrap', className)}>
      <div
        className={cx('pg-flow', `pg-flow--${variant}`)}
        role="img"
        aria-label={label}
        style={style}
        data-animate="custom"
      >
        <ul className="pg-flow__col pg-flow__col--in">
          {inputs.map((node, i) => (
            <li key={i} className="pg-flow__node pg-flow__node--in" data-tone={inputTone} style={order(i)}>
              <span className="pg-flow__box">{node}</span>
            </li>
          ))}
        </ul>
        <Wires count={inputs.length} side="in" />
        <div className="pg-flow__core">{core}</div>
        <Wires count={outputs.length} side="out" />
        <ul className="pg-flow__col pg-flow__col--out">
          {outputs.map((node, i) => (
            <li key={i} className="pg-flow__node pg-flow__node--out" data-tone={outputTone} style={order(i)}>
              <span className="pg-flow__box">{node}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Position of a node or wire in the motion stagger. */
const order = (k: number) => ({ '--k': k }) as CSSProperties

function Wires({ count, side }: { count: number; side: 'in' | 'out' }) {
  const paths = Array.from({ length: count }, (_, i) => {
    const y = ((i + 0.5) / count) * 100
    return side === 'in' ? `M0 ${y} C 55 ${y}, 45 50, 100 50` : `M0 50 C 55 50, 45 ${y}, 100 ${y}`
  })
  return (
    <svg
      className={cx('pg-flow__wire', `pg-flow__wire--${side}`)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
      {/* One short dash per wire, parked before the wire's start at rest. */}
      {paths.map((d, k) => (
        <path key={`pulse-${d}`} className="pg-flow__pulse" d={d} style={order(k)} />
      ))}
    </svg>
  )
}
