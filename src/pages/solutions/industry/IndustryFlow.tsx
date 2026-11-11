import type { CSSProperties } from 'react'
import type { IndustryTemplateCopy } from '../../../i18n/messages/industryPages'
import { CheckIcon } from '../../../components/site/icons'

/** Spectrum used for the agent vertex dots (diagram highlights only). */
const agentTones = ['var(--ds-cyan)', 'var(--ds-accent)', 'var(--ds-amber)', 'var(--ds-green)', 'var(--ds-coral)']

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '')

/**
 * Hero schematic, built from the industry's data: the source systems on the
 * left feed one agent team (one agent per scenario), whose output passes human
 * review before it becomes an action. The whole figure is one image for
 * assistive tech, described by `copy.label`.
 *
 * Motion (industry.css): every few seconds a signal travels from the source
 * systems to the agent team, on to review, and the approved action lights up;
 * the console caret breathes. On entering view (not on first load) the figure
 * assembles left to right. The markup is the static final state.
 */
export function IndustryFlow({
  signals,
  agents,
  nextAction,
  copy,
  listSeparator,
}: {
  signals: string[]
  agents: string[]
  /** The first scenario's outcome, shown in the console footer. */
  nextAction: string
  copy: IndustryTemplateCopy['flow']
  listSeparator: string
}) {
  const n = signals.length
  const label = fill(copy.label, {
    signals: signals.join(listSeparator),
    agents: agents.join(listSeparator),
  })

  return (
    <figure
      className="ds-panel ds-panel--dots pg-industry-flow"
      role="img"
      aria-label={label}
      data-animate="custom"
    >
      <div className="pg-industry-flow__bar">
        <span className="pg-industry-flow__title">{copy.title}</span>
        <span className="ds-tag ds-tag--neutral">{fill(copy.agents, { n: String(agents.length) })}</span>
      </div>

      <div className="pg-industry-flow__body">
        <span className="pg-industry-flow__label pg-industry-flow__label--signals">{copy.signals}</span>
        <span className="pg-industry-flow__label pg-industry-flow__label--team">{copy.team}</span>
        <span className="pg-industry-flow__label pg-industry-flow__label--output">{copy.output}</span>

        <ul className="pg-industry-flow__signals" style={{ '--n': n } as CSSProperties}>
          {signals.map((signal, i) => (
            <li key={signal} style={{ '--k': i } as CSSProperties}>
              <span className="pg-industry-flow__chip">{signal}</span>
            </li>
          ))}
        </ul>

        <svg
          className="pg-industry-flow__wires"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {signals.map((signal, i) => {
            const y = ((i + 0.5) / n) * 100
            return (
              <path
                key={signal}
                d={`M0 ${y} C 55 ${y}, 45 50, 100 50`}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
          {/* One short signal dash per wire, parked before its start at rest. */}
          {signals.map((signal, i) => {
            const y = ((i + 0.5) / n) * 100
            return (
              <path
                key={`pulse-${signal}`}
                className="pg-industry-flow__pulse"
                d={`M0 ${y} C 55 ${y}, 45 50, 100 50`}
                vectorEffect="non-scaling-stroke"
                style={{ '--k': i } as CSSProperties}
              />
            )
          })}
        </svg>

        <ul className="pg-industry-flow__team">
          {agents.map((agent, i) => (
            <li key={agent} style={{ '--tone': agentTones[i % agentTones.length] } as CSSProperties}>
              <span className="pg-industry-flow__agent-dot" aria-hidden="true" />
              {agent}
            </li>
          ))}
        </ul>

        <span className="pg-industry-flow__link" aria-hidden="true">
          <span className="pg-industry-flow__spark" />
        </span>

        <div className="pg-industry-flow__output">
          <span className="pg-industry-flow__review">
            <CheckIcon />
            {copy.review}
          </span>
          <span className="pg-industry-flow__step" aria-hidden="true">
            <span className="pg-industry-flow__spark" />
          </span>
          <span className="pg-industry-flow__act">{copy.act}</span>
        </div>
      </div>

      <div className="pg-industry-flow__foot">
        <span className="pg-industry-flow__prompt">{copy.next}</span>
        <span className="pg-industry-flow__next">
          {nextAction}
          <span className="pg-industry-flow__caret" aria-hidden="true" />
        </span>
      </div>
    </figure>
  )
}
