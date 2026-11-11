import type { CSSProperties } from 'react'
import type { SecurityBoundaryCopy } from '../../../i18n/messages/security'
import { CheckIcon, ShieldIcon } from '../icons'

/**
 * Hero mock: the runtime check an agent request passes before any action runs.
 *
 * Motion (security.css): when it enters view, the checks tick to "pass" one by
 * one and the policy result follows, then everything holds; the status dot
 * breathes while in view. On screen at first load, it simply shows the
 * finished check.
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
              <CheckIcon />
              {copy.pass}
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
