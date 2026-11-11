import type { CSSProperties } from 'react'
import type { SecurityBoundaryCopy } from '../../../i18n/messages/security'
import { CheckIcon, ShieldIcon } from '../icons'

/**
 * Hero mock: the runtime check an agent request passes before any action runs.
 *
 * Motion (security.css): while in view the check re-runs on a loop. Each row
 * goes back to pending (its box empties, "pass" fades), then the rows pass
 * one by one: the box fills solid and the tick draws in. The policy result
 * dims while the check runs and returns when every row has passed. The loop
 * starts from the finished check, which is also the resting state, so the
 * first paint never changes.
 */
export function BoundaryMock({ copy }: { copy: SecurityBoundaryCopy }) {
  return (
    <div
      className="ds-panel pg-sec-window pg-sec-boundary"
      role="img"
      aria-label={copy.ariaLabel}
      data-animate=""
      style={{ '--checks': copy.layers.length } as CSSProperties}
    >
      <div className="pg-sec-window__bar">
        <span className="pg-sec-window__title">
          <ShieldIcon />
          {copy.label}
        </span>
        <span className="pg-sec-status">
          <span className="pg-sec-status__dot" />
          {copy.status}
        </span>
      </div>

      <div className="pg-sec-boundary__request">
        <span className="pg-sec-mono">{copy.command.label}</span>
        <span className="pg-sec-boundary__request-title">{copy.command.title}</span>
        <span className="pg-sec-boundary__request-body">{copy.command.body}</span>
      </div>

      <ol className="pg-sec-boundary__layers">
        {copy.layers.map((layer, index) => (
          <li key={layer} className="pg-sec-boundary__layer" style={{ '--i': index } as CSSProperties}>
            <span className="pg-sec-mono">{String(index + 1).padStart(2, '0')}</span>
            <span className="pg-sec-boundary__layer-name">{layer}</span>
            <span className="pg-sec-boundary__pass">
              <span className="pg-sec-boundary__box">
                <CheckIcon />
              </span>
              <span className="pg-sec-boundary__pass-label">{copy.pass}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="pg-sec-boundary__result">
        <span className="pg-sec-mono">{copy.result.label}</span>
        <span className="pg-sec-boundary__result-title">{copy.result.title}</span>
      </div>
    </div>
  )
}
