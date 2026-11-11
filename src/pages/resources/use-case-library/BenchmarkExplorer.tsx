import { useState, type CSSProperties } from 'react'
import { cx } from '../../../components/site/utils'
import type { Locale } from '../../../i18n'
import { useCaseLibraryPageCopy, type BenchmarkCopy } from '../../../i18n/messages/useCaseLibrary'
import { useTabList } from '../../solutions/departments/useTabList'
import { benchmarkCharts } from './benchmarkCharts'
import { MetricList } from './MetricList'

type Kind = 'verified' | 'simulated'
type Filter = 'all' | Kind
type Entry = BenchmarkCopy & { kind: Kind }

/**
 * List → detail browser for every benchmark. A status filter narrows the
 * list; the list is a WAI-ARIA tablist and the detail is its tabpanel.
 */
export function BenchmarkExplorer({ locale }: { locale: Locale }) {
  const t = useCaseLibraryPageCopy[locale]
  const entries: Entry[] = [
    ...t.verified.benchmarks.map((b) => ({ ...b, kind: 'verified' as const })),
    ...t.simulated.benchmarks.map((b) => ({ ...b, kind: 'simulated' as const })),
  ]
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? entries : entries.filter((entry) => entry.kind === filter)
  const { tabProps, panelProps, select } = useTabList('benchmarks', visible.length)

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: t.labels.all, count: entries.length },
    { id: 'verified', label: t.verified.filter, count: t.verified.benchmarks.length },
    { id: 'simulated', label: t.simulated.filter, count: t.simulated.benchmarks.length },
  ]

  return (
    <div className="pg-usecases__browser">
      <div className="pg-usecases__filters" role="group" aria-label={t.labels.filterLabel}>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="pg-usecases__filter"
            aria-pressed={filter === f.id}
            onClick={() => {
              setFilter(f.id)
              select(0)
            }}
          >
            {f.label}
            <span className="pg-usecases__filter-count">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="pg-usecases__explorer">
        <div
          className="pg-usecases__list"
          role="tablist"
          aria-label={t.labels.listLabel}
          aria-orientation="vertical"
        >
          {visible.map((entry, i) => (
            <button key={entry.id} className="pg-usecases__item" {...tabProps(i)}>
              <span className="pg-usecases__item-meta">
                <span className="pg-usecases__status-dot" data-kind={entry.kind} aria-hidden="true" />
                {entry.function}
              </span>
              <span className="pg-usecases__item-title">{entry.title}</span>
              <span className="pg-usecases__item-metric">
                {entry.metrics[0].value} <span>{entry.metrics[0].label}</span>
              </span>
            </button>
          ))}
        </div>

        {visible.map((entry, i) => (
          <div key={entry.id} className="pg-usecases__detail" {...panelProps(i)}>
            <div className="pg-usecases__detail-head">
              <p className="pg-usecases__tags">
                <span className={cx('ds-tag', entry.kind === 'simulated' && 'ds-tag--neutral')}>{entry.status}</span>
                <span className="ds-tag ds-tag--neutral">{entry.workflowType}</span>
              </p>
              <h3 className="ds-h3">{entry.title}</h3>
              <p className="pg-usecases__subtitle">{entry.subtitle}</p>
              <p className="ds-small">{entry.description}</p>
            </div>

            <div className="pg-usecases__detail-copy">
              <div className="pg-usecases__task">
                <h4 className="pg-usecases__label">{t.labels.task}</h4>
                <p>{entry.task}</p>
              </div>
              <div className="pg-usecases__lists">
                <div>
                  <h4 className="pg-usecases__label">{t.labels.learns}</h4>
                  <ul className="ds-list">
                    {entry.learns.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="pg-usecases__label">{t.labels.bestFor}</h4>
                  <ul className="ds-list">
                    {entry.bestFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {entry.safety ? <p className="pg-usecases__safety">{entry.safety}</p> : null}
            </div>

            <div className="ds-panel pg-usecases__results">
              {entry.visualSteps ? (
                <ol className="pg-usecases__steps">
                  {entry.visualSteps.map((step, i) => (
                    <li key={step} style={{ '--i': i } as CSSProperties}>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : null}
              <h4 className="pg-usecases__label">{t.labels.results}</h4>
              <MetricList
                metrics={entry.metrics}
                charts={benchmarkCharts[entry.id] ?? []}
                labels={{ baseline: t.labels.baseline, panofy: t.labels.panofy }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
