import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export type ProductTabItem = {
  id: string
  label: string
  icon?: ReactNode
  title: string
  body: string
  points: { title: string; body: string }[]
  visual: ReactNode
}

/**
 * Modal-style product tabs: a vertical tab list, the active tab's copy and one big
 * media panel. WAI-ARIA tabs with automatic activation (arrows, Home, End).
 * Every panel is server-rendered; inactive ones are `hidden`.
 */
export function ProductTabs({
  idBase,
  label,
  items,
}: {
  idBase: string
  label: string
  items: ProductTabItem[]
}) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const select = (index: number) => {
    const next = (index + items.length) % items.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        select(index + 1)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        select(index - 1)
        break
      case 'Home':
        select(0)
        break
      case 'End':
        select(items.length - 1)
        break
      default:
        return
    }
    event.preventDefault()
  }

  return (
    <div className="pg-product__tabs">
      <div className="pg-product__tablist" role="tablist" aria-label={label} aria-orientation="vertical">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${item.id}`}
            aria-controls={`${idBase}-panel-${item.id}`}
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            className="pg-product__tab"
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${idBase}-panel-${item.id}`}
          aria-labelledby={`${idBase}-tab-${item.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="pg-product__tabpanel"
        >
          <div className="pg-product__tab-copy">
            <h3 className="ds-h3 pg-product__tab-title">{item.title}</h3>
            <p className="ds-body pg-product__tab-body">{item.body}</p>
            <ul className="pg-product__points">
              {item.points.map((point) => (
                <li className="pg-product__point" key={point.title}>
                  <h4 className="pg-product__point-title">{point.title}</h4>
                  <p className="pg-product__point-body">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="pg-product__tab-visual">{item.visual}</div>
        </div>
      ))}
    </div>
  )
}
