import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { cx } from '../../../components/site/utils'
import type { IndustryScenarioCopy } from '../../../i18n/messages/industryPageDetails'
import type { IndustryTemplateCopy } from '../../../i18n/messages/industryPages'
import { cjkBreaks } from './cjkBreaks'

/**
 * Modal-style product tabs for an industry's scenarios: a vertical tab list on
 * the left; each panel pairs the scenario copy and use cases with a flat agent
 * workspace mock built from the scenario's trace. All panels are rendered and
 * stacked in one grid cell so the section keeps the height of the tallest one
 * and nothing below jumps when the tab changes; inactive panels are hidden
 * with `visibility`, which also removes them from the accessibility tree.
 */
export function ScenarioExplorer({
  scenarios,
  tabsLabel,
  workspaceLabel,
  copy,
}: {
  scenarios: IndustryScenarioCopy[]
  tabsLabel: string
  workspaceLabel: string
  copy: IndustryTemplateCopy['workspace']
}) {
  const [active, setActive] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])

  const select = (index: number, focus = false) => {
    setActive(index)
    if (focus) tabs.current[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = scenarios.length - 1
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1
    if (next < 0) return
    event.preventDefault()
    select(next, true)
  }

  return (
    <div className="pg-industry-explorer">
      <div className="pg-industry-explorer__tabs" role="tablist" aria-label={tabsLabel} aria-orientation="vertical">
        {scenarios.map((scenario, i) => (
          <button
            key={scenario.id}
            ref={(node) => {
              tabs.current[i] = node
            }}
            id={`scenario-tab-${scenario.id}`}
            className="pg-industry-explorer__tab"
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`scenario-panel-${scenario.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(event) => onKeyDown(event, i)}
          >
            <span className="pg-industry-explorer__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {scenario.label}
          </button>
        ))}
      </div>

      <div className="pg-industry-explorer__panels">
        {scenarios.map((scenario, i) => {
          const last = scenario.trace.length - 1
          return (
            <div
              key={scenario.id}
              id={`scenario-panel-${scenario.id}`}
              className={cx('pg-industry-explorer__panel', i === active && 'is-active')}
              role="tabpanel"
              aria-labelledby={`scenario-tab-${scenario.id}`}
              tabIndex={i === active ? 0 : -1}
            >
              <div className="pg-industry-explorer__copy">
                <h3 className="ds-h3">{cjkBreaks(scenario.title).text}</h3>
                <p className="pg-industry-explorer__description">{scenario.description}</p>
                <ul className="pg-industry-explorer__uses">
                  {scenario.useCases.map((useCase) => (
                    <li key={useCase.title}>
                      <span className="pg-industry-explorer__use-title">{useCase.title}</span>
                      <p className="pg-industry-explorer__use-body">{useCase.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ds-panel pg-industry-workspace">
                <div className="pg-industry-workspace__bar">
                  <span className="pg-industry-workspace__title">{workspaceLabel}</span>
                  <span className="ds-tag">{scenario.badge}</span>
                </div>
                <ol className="pg-industry-workspace__trace">
                  {scenario.trace.map(([label, value], step) => (
                    <li
                      key={label}
                      className={cx(
                        'pg-industry-workspace__step',
                        step === 0 && 'pg-industry-workspace__step--input',
                        step === last && 'pg-industry-workspace__step--output',
                      )}
                      style={{ '--i': step } as CSSProperties}
                    >
                      <span className="pg-industry-workspace__rail" aria-hidden="true" />
                      <span className="pg-industry-workspace__key">{label}</span>
                      <span className="pg-industry-workspace__value">{value}</span>
                    </li>
                  ))}
                </ol>
                <div className="pg-industry-workspace__insight">
                  <p className="pg-industry-workspace__insight-title">
                    <span className="pg-industry-workspace__insight-kind">{copy.briefing}</span>
                    {scenario.insight.title}
                  </p>
                  <p className="pg-industry-workspace__insight-body">{scenario.insight.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
