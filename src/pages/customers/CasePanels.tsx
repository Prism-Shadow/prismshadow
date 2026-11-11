import type { CSSProperties } from 'react'
import type { CoboPanelCopy, SubconsciousPanelCopy } from '../../i18n/messages/customersPage'

/*
 * Panels beside the two featured cases. The customer's number is the focal
 * point; the schematic under it stays quiet: empty outlined cells for Cobo's
 * thirty scenarios, a hairline lifecycle for Subconscious.ai.
 *
 * Motion (customers.css): Cobo's thirty cells fill solid one by one, column
 * by column, hold, empty and run again; the lifecycle's active stage is a
 * solid fill stepping Develop → Train → Optimize → Iterate. The enterprise
 * meters below run their own small live patterns. Invisible at rest.
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
            return (
              <rect
                key={i}
                className="cu-grid__cell"
                x={col * STEP + 0.5}
                y={row * STEP + 0.5}
                width={CELL - 1}
                height={CELL - 1}
                rx="4"
                // Fill order: column by column, top cell first.
                style={{ '--i': col * ROWS + row } as CSSProperties}
              />
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
              <span className="cu-life__label">{stage}</span>
              {/* The same label in dark ink, shown only while the stage is solid. */}
              <span className="cu-life__label cu-life__label--on" aria-hidden="true">
                {stage}
              </span>
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

const METER_CELLS = 14
const METER_CELL = 10
const METER_STEP = 14

export type MeterPattern = 'queue' | 'trials' | 'scan'

/** Deterministic 0–1 noise, so the meter's timings match on server and client. */
const meterNoise = (i: number, seed: number) => {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453
  return x - Math.floor(x)
}

/**
 * A small live strip for an enterprise case: a queue of tasks that fills and
 * resets, experiments running in parallel, or a screening pass sweeping
 * across. Decorative (aria-hidden); outlined cells at rest.
 */
export function LiveMeter({ pattern }: { pattern: MeterPattern }) {
  const width = METER_CELLS * METER_STEP - (METER_STEP - METER_CELL)
  return (
    <svg
      className={`cu-meter cu-meter--${pattern}`}
      viewBox={`0 0 ${width} ${METER_CELL}`}
      width={width}
      height={METER_CELL}
      aria-hidden="true"
      focusable="false"
      data-animate="custom"
    >
      {Array.from({ length: METER_CELLS }, (_, i) => (
        <rect
          key={i}
          className="cu-meter__cell"
          x={i * METER_STEP + 0.5}
          y="0.5"
          width={METER_CELL - 1}
          height={METER_CELL - 1}
          rx="2"
          style={
            {
              '--i': i,
              '--t': `${(2.8 + meterNoise(i, 4) * 2.4).toFixed(2)}s`,
              '--d': `${(-meterNoise(i, 9) * 5).toFixed(2)}s`,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  )
}
