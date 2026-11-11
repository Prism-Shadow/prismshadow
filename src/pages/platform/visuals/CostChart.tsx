import type { CSSProperties } from 'react'
import type { PlatformPageCopy } from '../../../i18n/messages/platformPage'

/*
 * Same-scale cost comparison. Every row is a track of unit cells; a row's
 * cost is drawn as outlined cells, so Claude Code reads as thirty quiet
 * outlines and PrismShadow as the one lit cell: honest, and calm.
 *
 * Motion (platform.css): as the chart scrolls in, both rows fill at the same
 * pace, one cell at a time (`--i`): PrismShadow stops after its first cell,
 * Claude Code runs on to thirty. Then the PrismShadow cell glints now and then.
 */

const CELL = 14
const STEP = 18

function Track({ value, max, emphasis }: { value: number; max: number; emphasis: boolean }) {
  const width = max * STEP - (STEP - CELL)
  return (
    <svg
      className="pf-cost__track"
      viewBox={`0 0 ${width} ${CELL}`}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      focusable="false"
      data-animate="custom"
    >
      {Array.from({ length: max }, (_, i) => {
        const state = i < value ? (emphasis ? 'ours' : 'ref') : 'empty'
        return (
          <rect
            key={i}
            className={`pf-cost__cell pf-cost__cell--${state}`}
            x={i * STEP + 0.5}
            y="0.5"
            width={CELL - 1}
            height={CELL - 1}
            rx="3"
            style={{ '--i': i } as CSSProperties}
          />
        )
      })}
      {/* A sheen over the lit cells, invisible at rest; it glints in the loop. */}
      {emphasis
        ? Array.from({ length: value }, (_, i) => (
            <rect
              key={`glint-${i}`}
              className="pf-cost__glint"
              x={i * STEP + 0.5}
              y="0.5"
              width={CELL - 1}
              height={CELL - 1}
              rx="3"
            />
          ))
        : null}
    </svg>
  )
}

export function CostChart({ chart }: { chart: PlatformPageCopy['results']['chart'] }) {
  const max = Math.max(...chart.rows.map((row) => row.value))

  return (
    <figure className="ds-panel pf-cost">
      <figcaption className="pf-cost__head">
        <span className="pf-cost__title">{chart.title}</span>
        <span className="pf-cost__direction">{chart.direction}</span>
      </figcaption>
      <div className="pf-cost__rows" role="img" aria-label={chart.ariaLabel}>
        {chart.rows.map((row) => (
          <div key={row.label} className={`pf-cost__row${row.emphasis ? ' pf-cost__row--ours' : ''}`}>
            <span className="pf-cost__label">{row.label}</span>
            <Track value={row.value} max={max} emphasis={row.emphasis} />
            <span className="pf-cost__value">{row.display}</span>
          </div>
        ))}
      </div>
      <div className="pf-cost__foot">
        <p className="pf-cost__unit">
          <span className="pf-cost__swatch" aria-hidden="true" />
          {chart.unitNote}
        </p>
        <p className="pf-cost__caption">{chart.caption}</p>
      </div>
    </figure>
  )
}
