import type { CSSProperties } from 'react'
import type { IndustryTemplateCopy } from '../../../i18n/messages/industryPages'

const stepTones = ['var(--ds-cyan)', 'var(--ds-accent)', 'var(--ds-amber)', 'var(--ds-coral)', 'var(--ds-green)']

// List separator: the dot stays at the end of a line, never starts one.
const NBSP_DOT = '\u00a0· '

// Node x-positions on the schematic rail (viewBox 480 wide).
const nodeX = [24, 132, 240, 348, 456]

const LoopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M13 8a5 5 0 1 1-1.5-3.6" />
    <path d="M13 2.5v2.5h-2.5" />
  </svg>
)

/**
 * The PrismShadow platform loop applied to one industry: Ingest lists the
 * industry's own source systems and Deploy lists its scenario agents, so the
 * generic loop reads as this industry's loop.
 *
 * Motion (industry.css): on entering view the rail draws and the five nodes
 * land in order. Loop: a solid packet runs along the rail, each stage lights
 * as it passes, then the packet rides the return arc back to Ingest while the
 * arc's dashes flow.
 */
export function IndustryLoop({
  copy,
  signals,
  agents,
}: {
  copy: IndustryTemplateCopy['loop']
  signals: string[]
  agents: string[]
}) {
  const list = (items: string[]) =>
    items.map((item, i) => (
      <span key={item}>
        {i > 0 ? NBSP_DOT : null}
        <span className="pg-industry-loop__item">{item}</span>
      </span>
    ))
  const steps = [
    { label: copy.ingest, body: list(signals) },
    { label: copy.synthesize, body: copy.synthesizeBody },
    { label: copy.train, body: copy.trainBody },
    { label: copy.deploy, body: list(agents) },
    { label: copy.evolve, body: copy.evolveBody },
  ]

  return (
    <div className="ds-panel pg-industry-loop">
      <p className="pg-industry-loop__title">{copy.title}</p>

      <svg
        className="pg-industry-loop__schematic"
        viewBox="0 0 480 76"
        aria-hidden="true"
        focusable="false"
        data-animate="custom"
      >
        <path className="pg-industry-loop__return" d="M456 56 C 456 6, 24 6, 24 46" />
        <path className="pg-industry-loop__arrow" d="M19.5 41.5 L24 47 L28.5 41.5" />
        <line className="pg-industry-loop__rail" x1="24" y1="62" x2="456" y2="62" pathLength={1} />
        {/* Loop packets (one dash each), parked off their paths at rest. */}
        <line className="pg-industry-loop__packet" x1="24" y1="62" x2="456" y2="62" pathLength={1} />
        <path
          className="pg-industry-loop__packet pg-industry-loop__packet--return"
          d="M456 56 C 456 6, 24 6, 24 46"
          pathLength={1}
        />
        {/* Rings that ping as the packet passes each stage (invisible at rest). */}
        {nodeX.map((x, i) => (
          <rect
            key={`ring-${x}`}
            className="pg-industry-loop__ring"
            x={x - 5}
            y={57}
            width={10}
            height={10}
            rx={2}
            style={{ stroke: stepTones[i], '--i': i } as CSSProperties}
          />
        ))}
        {nodeX.map((x, i) => (
          <rect
            key={x}
            className="pg-industry-loop__node"
            x={x - 5}
            y={57}
            width={10}
            height={10}
            rx={2}
            style={{ fill: stepTones[i], stroke: stepTones[i], '--i': i } as CSSProperties}
          />
        ))}
      </svg>

      <ol className="pg-industry-loop__steps" aria-label={copy.title}>
        {steps.map((step, i) => (
          <li key={step.label} style={{ '--tone': stepTones[i], '--i': i } as CSSProperties}>
            <span className="pg-industry-loop__name">
              <span className="pg-industry-loop__dot" aria-hidden="true" />
              <span className="pg-industry-loop__index">{String(i + 1).padStart(2, '0')}</span>
              {step.label}
            </span>
            <p className="pg-industry-loop__body">{step.body}</p>
          </li>
        ))}
      </ol>

      <p className="pg-industry-loop__feedback">
        <LoopIcon />
        {copy.feedback}
      </p>
    </div>
  )
}
