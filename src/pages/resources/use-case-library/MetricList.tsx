import type { CSSProperties } from 'react'
import type { UseCaseMetricCopy } from '../../../i18n/messages/useCaseLibrary'
import type { MetricChart } from './benchmarkCharts'

const numberFormat = new Intl.NumberFormat('en-US')
const width = (share: number) => ({ '--share': Math.max(0, Math.min(1, share)) }) as CSSProperties

/**
 * Benchmark results: every metric as text (value + label), with a small
 * decorative chart under the ones that can be drawn honestly.
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
          <MetricBar chart={charts[i] ?? null} labels={labels} />
        </li>
      ))}
    </ul>
  )
}

function MetricBar({ chart, labels }: { chart: MetricChart; labels: { baseline: string; panofy: string } }) {
  if (!chart) return null

  switch (chart.kind) {
    case 'percent':
      return (
        <span className="pg-usecases__bar" aria-hidden="true">
          <span style={width(chart.value / 100)} />
        </span>
      )
    case 'ratio':
      return (
        <Compare
          rows={[
            { name: labels.baseline, share: 1 },
            { name: labels.panofy, share: 1 / chart.value, accent: true },
          ]}
        />
      )
    case 'tokens':
      return (
        <Compare
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
        <span className="pg-usecases__pass" aria-hidden="true">
          {Array.from({ length: chart.total }, (_, i) => (
            <i key={i} data-on={i < chart.passed || undefined} />
          ))}
        </span>
      )
  }
}

function Compare({
  rows,
}: {
  rows: { name: string; share: number; note?: string; accent?: boolean }[]
}) {
  return (
    <span className="pg-usecases__compare" aria-hidden="true">
      {rows.map((row) => (
        <span key={row.name} className="pg-usecases__compare-row" data-accent={row.accent || undefined}>
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
