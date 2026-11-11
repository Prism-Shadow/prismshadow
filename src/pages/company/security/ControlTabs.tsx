import { useRef, useState, type ComponentType, type KeyboardEvent, type SVGProps } from 'react'
import type { SecurityControlId, SecurityPageCopy } from '../../../i18n/messages/security'
import { cx } from '../../../components/site/utils'
import {
  DatabaseIcon,
  EraseIcon,
  EyeIcon,
  GateIcon,
  HistoryIcon,
  LayersIcon,
  LockIcon,
  PersonCheckIcon,
  SearchKeyIcon,
  ServerIcon,
  SlidersIcon,
  ToolIcon,
  TraceIcon,
} from '../icons'
import { ActionPolicyMock, AuditLogMock, DataFlowMock, MemoryPolicyMock } from './mocks'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

const controlOrder: SecurityControlId[] = ['data', 'actions', 'memory', 'audit']

const featureIcons: Record<SecurityControlId, Icon[]> = {
  data: [LockIcon, SearchKeyIcon, ServerIcon],
  actions: [ToolIcon, GateIcon, PersonCheckIcon],
  memory: [LayersIcon, SlidersIcon, EraseIcon],
  audit: [HistoryIcon, TraceIcon, EyeIcon],
}

const tabIcons: Record<SecurityControlId, Icon> = {
  data: DatabaseIcon,
  actions: ToolIcon,
  memory: LayersIcon,
  audit: HistoryIcon,
}

function ControlVisual({ id, visuals }: { id: SecurityControlId; visuals: SecurityPageCopy['visuals'] }) {
  switch (id) {
    case 'data':
      return <DataFlowMock copy={visuals.dataFlow} />
    case 'actions':
      return <ActionPolicyMock copy={visuals.actionPolicy} />
    case 'memory':
      return <MemoryPolicyMock copy={visuals.memoryPolicy} />
    case 'audit':
      return <AuditLogMock copy={visuals.auditLog} />
  }
}

/**
 * Four control areas as WAI-ARIA tabs (hairline columns across the 12-column
 * grid). Every panel is rendered; inactive ones are `hidden`, so all copy is
 * in the markup.
 *
 * Each selection remounts that panel's mock (keyed by a per-tab run count), so
 * the motion system sees a new `[data-animate]` element and plays its intro.
 * The first render is identical on server and client (every count is 0).
 */
export function ControlTabs({
  controls,
  visuals,
}: {
  controls: SecurityPageCopy['controls']
  visuals: SecurityPageCopy['visuals']
}) {
  const [active, setActive] = useState<SecurityControlId>('data')
  const [runs, setRuns] = useState<Record<SecurityControlId, number>>({ data: 0, actions: 0, memory: 0, audit: 0 })
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activate = (id: SecurityControlId) => {
    if (id === active) return
    setActive(id)
    setRuns((current) => ({ ...current, [id]: current[id] + 1 }))
  }

  const select = (index: number) => {
    const count = controlOrder.length
    const next = (index + count) % count
    activate(controlOrder[next])
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        select(index + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        select(index - 1)
        break
      case 'Home':
        select(0)
        break
      case 'End':
        select(controlOrder.length - 1)
        break
      default:
        return
    }
    event.preventDefault()
  }

  return (
    <div className="pg-sec-tabs">
      <div className="pg-sec-tabs__list" role="tablist" aria-label={controls.tablistLabel}>
        {controlOrder.map((id, index) => {
          const selected = id === active
          const TabIcon = tabIcons[id]
          return (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              type="button"
              role="tab"
              id={`control-tab-${id}`}
              aria-controls={`control-panel-${id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={cx('pg-sec-tabs__tab', selected && 'is-active')}
              onClick={() => activate(id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className="pg-sec-tabs__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="pg-sec-tabs__label">
                <TabIcon />
                {controls.items[id].tab}
              </span>
            </button>
          )
        })}
      </div>

      {controlOrder.map((id) => {
        const item = controls.items[id]
        const icons = featureIcons[id]
        return (
          <div
            key={id}
            role="tabpanel"
            id={`control-panel-${id}`}
            aria-labelledby={`control-tab-${id}`}
            className="pg-sec-tabs__panel"
            hidden={id !== active}
            tabIndex={0}
          >
            <div className="pg-sec-tabs__copy">
              <h3 className="ds-h3">{item.title}</h3>
              <p className="ds-body">{item.body}</p>
              <ul className="pg-sec-tabs__features">
                {item.features.map((feature, index) => {
                  const FeatureIcon = icons[index] ?? LockIcon
                  return (
                    <li key={feature.title} className="pg-sec-tabs__feature">
                      <h4 className="ds-feature__title">
                        <FeatureIcon />
                        {feature.title}
                      </h4>
                      <p className="ds-feature__body">{feature.body}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="pg-sec-tabs__visual" key={runs[id]}>
              <ControlVisual id={id} visuals={visuals} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
