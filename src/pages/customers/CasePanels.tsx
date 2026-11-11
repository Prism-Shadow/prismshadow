import type { CSSProperties } from 'react'
import type { CoboPanelCopy, SubconsciousPanelCopy } from '../../i18n/messages/customersPage'

/*
 * Panels beside the two featured cases. The customer's number is the focal
 * point; the schematic under it stays quiet: empty outlined cells for Cobo's
 * thirty scenarios, a hairline lifecycle for Subconscious.ai.
 *
 * Motion (customers.css): Cobo's thirty cells light up one after another,
 * column by column, then hold; the lifecycle's highlight steps through
 * Develop → Train → Optimize → Iterate, a few seconds per stage.
 */

const COLS = 15
const ROWS = 2
const CELL = 22
const STEP = 30

/** Cobo Wallet: one outlined cell per real office-agent scenario. */
export function CoboPanel({ copy }: { copy: CoboPanelCopy }) {
  const width = COLS * STEP - (STEP - CELL)
  const height = ROWS * STEP - (STEP - CELL)
  return (
    <figure className="ds-panel cu-panel" aria-label={copy.ariaLabel}>
      <div className="cu-panel__metric">
        <p className="cu-panel__label">{copy.label}</p>
        <p className="ds-stat__value cu-panel__value cu-panel__value--signal">{copy.value}</p>
        <p className="cu-panel__note">{copy.note}</p>
      </div>
      <div className="cu-panel__figure">
        <svg
          className="cu-grid"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMinYMid meet"
          aria-hidden="true"
          focusable="false"
          data-animate="custom"
        >
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const col = i % COLS
            const row = Math.floor(i / COLS)
            const cell = {
              x: col * STEP + 0.5,
              y: row * STEP + 0.5,
              width: CELL - 1,
              height: CELL - 1,
              rx: 4,
              // Lighting order: column by column, top cell first.
              style: { '--i': col * ROWS + row } as CSSProperties,
            }
            return (
              <g key={i}>
                <rect className="cu-grid__cell" {...cell} />
                <rect className="cu-grid__flash" {...cell} />
              </g>
            )
          })}
        </svg>
        <p className="cu-panel__key">
          <span>{copy.key}</span>
          <span className="cu-panel__count">{copy.count}</span>
        </p>
      </div>
    </figure>
  )
}

/** Subconscious.ai: develop → train → optimize → iterate, with PrismShadow's part bracketed. */
export function LifecyclePanel({ copy }: { copy: SubconsciousPanelCopy }) {
  return (
    <figure className="ds-panel cu-panel" aria-label={copy.ariaLabel}>
      <div className="cu-panel__metric">
        <p className="cu-panel__label">{copy.label}</p>
        <p className="ds-stat__value cu-panel__value">{copy.value}</p>
        <p className="cu-panel__note">{copy.note}</p>
      </div>
      <div className="cu-panel__figure cu-life" data-animate="custom">
        <p className="cu-life__role">
          <span>{copy.role}</span>
        </p>
        <ol className="cu-life__stages">
          {copy.stages.map((stage, index) => (
            <li
              key={stage}
              className={index === 1 || index === 2 ? 'cu-life__stage is-ours' : 'cu-life__stage'}
              style={{ '--i': index } as CSSProperties}
            >
              {stage}
            </li>
          ))}
        </ol>
        <p className="cu-life__loop">
          <span>
            <span aria-hidden="true">↺ </span>
            {copy.loop}
          </span>
        </p>
      </div>
    </figure>
  )
}
