import { useRef, useState, type KeyboardEvent } from 'react'
import { SectionHead, TextLink } from '../../site/ui'
import { platformPath } from '../../site/navigation'
import type { PlatformCopy } from '../../../i18n/messages/home'
import { FeatureIcon } from '../icons'
import { PlatformDiagram } from './platform/PlatformDiagram'
import './platform.css'

const NEXT_KEYS = ['ArrowDown', 'ArrowRight']
const PREV_KEYS = ['ArrowUp', 'ArrowLeft']

/** The four capabilities as a numbered tab row (WAI-ARIA tabs, automatic activation). */
export function PlatformSection({ copy }: { copy: PlatformCopy }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const count = copy.modules.length

  const select = (index: number) => {
    setActive(index)
    tabs.current[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (NEXT_KEYS.includes(event.key)) select((index + 1) % count)
    else if (PREV_KEYS.includes(event.key)) select((index - 1 + count) % count)
    else if (event.key === 'Home') select(0)
    else if (event.key === 'End') select(count - 1)
    else return
    event.preventDefault()
  }

  return (
    <section id="platform" className="ds-section hp-platform" aria-labelledby="platform-title">
      <div className="ds-container">
        <SectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="platform-title"
          lead={copy.body}
          actions={<TextLink href={platformPath}>{copy.cta}</TextLink>}
        />

        <div className="hp-platform__body">
          <div
            className="hp-platform__tabs"
            role="tablist"
            aria-label={copy.tabsLabel}
          >
            {copy.modules.map((module, index) => (
              <button
                key={module.id}
                ref={(node) => {
                  tabs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`platform-tab-${module.id}`}
                className="hp-platform__tab"
                aria-selected={index === active}
                aria-controls={`platform-panel-${module.id}`}
                tabIndex={index === active ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="hp-platform__tab-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{module.tab}</span>
              </button>
            ))}
          </div>

          {copy.modules.map((module, index) => (
            <div
              key={module.id}
              className="hp-platform__panel"
              role="tabpanel"
              id={`platform-panel-${module.id}`}
              aria-labelledby={`platform-tab-${module.id}`}
              tabIndex={0}
              hidden={index !== active}
            >
              <div className="hp-platform__copy">
                <h3 className="ds-h4 hp-platform__name">{module.name}</h3>
                <p className="hp-platform__lead">{module.lead}</p>
                <ul className="hp-platform__features">
                  {module.features.map((feature) => (
                    <li key={feature.title} className="hp-platform__feature">
                      <p className="ds-feature__title">
                        <FeatureIcon name={feature.icon} />
                        {feature.title}
                      </p>
                      <p className="ds-feature__body">{feature.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ds-panel hp-platform__visual">
                {/* Remounted on selection, so the newly shown diagram plays its draw-in. */}
                <PlatformDiagram key={index === active ? 'shown' : 'idle'} id={module.id} copy={copy.diagrams} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
