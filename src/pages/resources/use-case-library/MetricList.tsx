import type { CSSProperties } from 'react'
import type { UseCaseMetricCopy } from '../../../i18n/messages/useCaseLibrary'
import type { MetricChart } from './benchmarkCharts'

const numberFormat = new Intl.NumberFormat('en-US')
const width = (share: number) => ({ '--share': Math.max(0, Math.min(1, share)) }) as CSSProperties

/** Motion opt-in for one chart; `--i` staggers the charts of one benchmark. */
type ChartMotion = { 'data-animate': 'custom'; style: CSSProperties }

/**
 * Benchmark results: every metric as text (value + label), with a small
 * decorative chart under the ones that can be drawn honestly. Each chart is
 * its own `[data-animate]` visual: its bars grow once when they come into
 * view (use-case-library.css); the text never moves.
 */
export function MetricList({
  metrics,
  charts,
  labels,
}: {
  metrics: UseCaseMetricCopy[]
  charts: MetricChart[]
  labels: { baseline: string; panofy: string }
}) {
  return (
    <ul className="pg-usecases__metrics">
      {metrics.map((metric, i) => (
        <li key={metric.value + metric.label} className="pg-usecases__metric">
          <p className="pg-usecases__metric-head">
            <span className="pg-usecases__metric-value">{metric.value}</span>
            <span className="pg-usecases__metric-label">{metric.label}</span>
          </p>
          <MetricBar chart={charts[i] ?? null} labels={labels} index={i} />
        </li>
      ))}
    </ul>
  )
}

function MetricBar({
  chart,
  labels,
  index,
}: {
  chart: MetricChart
  labels: { baseline: string; panofy: string }
  index: number
}) {
  if (!chart) return null
  const motion: ChartMotion = { 'data-animate': 'custom', style: { '--i': index } as CSSProperties }

  switch (chart.kind) {
    case 'percent':
      return (
        <span className="pg-usecases__bar" aria-hidden="true" {...motion}>
          <span style={width(chart.value / 100)} />
        </span>
      )
    case 'ratio':
      return (
        <Compare
          motion={motion}
          rows={[
            { name: labels.baseline, share: 1 },
            { name: labels.panofy, share: 1 / chart.value, accent: true },
          ]}
        />
      )
    case 'tokens':
      return (
        <Compare
          motion={motion}
          rows={[
            { name: labels.baseline, share: 1, note: numberFormat.format(chart.baseline) },
            {
              name: labels.panofy,
              share: chart.panofy / chart.baseline,
              note: numberFormat.format(chart.panofy),
              accent: true,
            },
          ]}
        />
      )
    case 'pass':
      return (
        <span className="pg-usecases__pass" aria-hidden="true" {...motion}>
          {Array.from({ length: chart.total }, (_, i) => (
            <i key={i} data-on={i < chart.passed || undefined} style={{ '--c': i } as CSSProperties} />
          ))}
        </span>
      )
  }
}

function Compare({
  rows,
  motion,
}: {
  rows: { name: string; share: number; note?: string; accent?: boolean }[]
  motion: ChartMotion
}) {
  return (
    <span className="pg-usecases__compare" aria-hidden="true" {...motion}>
      {rows.map((row, r) => (
        <span
          key={row.name}
          className="pg-usecases__compare-row"
          data-accent={row.accent || undefined}
          style={{ '--r': r } as CSSProperties}
        >
          <span className="pg-usecases__compare-name">{row.name}</span>
          <span className="pg-usecases__compare-track">
            <span style={width(row.share)} />
          </span>
          {row.note ? <span className="pg-usecases__compare-note">{row.note}</span> : null}
        </span>
      ))}
    </span>
  )
}
