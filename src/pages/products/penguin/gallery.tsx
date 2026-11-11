import { useRef, useState, type KeyboardEvent } from 'react'
import type { Locale } from '../../../i18n/locales'
import type { PenguinHarnessCopy } from '../../../i18n/messages/products/penguinHarness'
import { MockWindow } from '../shared/Blocks'
import { appScreens, screenSize, screenSrc } from './data'

type GalleryCopy = PenguinHarnessCopy['features']['gallery']

/**
 * A short tour of the web app: a list of screens and one big screenshot.
 * WAI-ARIA tabs with automatic activation (arrows, Home, End). Every panel is
 * server-rendered and inactive ones are `hidden`, so their lazy images load only
 * once shown. The screenshot is a motion visual, re-keyed per selection so it
 * fades up again.
 */
export function ScreenGallery({
  locale,
  copy,
  idBase = 'ph-screens',
}: {
  locale: Locale
  copy: GalleryCopy
  idBase?: string
}) {
  const [active, setActive] = useState(0)
  const [round, setRound] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const count = appScreens.length

  const activate = (index: number) => {
    if (index === active) return
    setActive(index)
    setRound((value) => value + 1)
  }

  const select = (index: number) => {
    const next = (index + count) % count
    activate(next)
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
        select(count - 1)
        break
      default:
        return
    }
    event.preventDefault()
  }

  return (
    <div className="pg-penguin__gallery">
      <div className="pg-penguin__gallery-tabs" role="tablist" aria-label={copy.label} aria-orientation="vertical">
        {appScreens.map((screen, index) => (
          <button
            key={screen.file}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${screen.file}`}
            aria-controls={`${idBase}-panel-${screen.file}`}
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            className="pg-penguin__gallery-tab"
            onClick={() => activate(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span>{copy.screens[index].label}</span>
            <span className="pg-penguin__gallery-path" aria-hidden="true">
              {screen.path}
            </span>
          </button>
        ))}
      </div>
      {appScreens.map((screen, index) => {
        const t = copy.screens[index]
        return (
          <div
            key={screen.file}
            role="tabpanel"
            id={`${idBase}-panel-${screen.file}`}
            aria-labelledby={`${idBase}-tab-${screen.file}`}
            hidden={index !== active}
            tabIndex={0}
            className="pg-penguin__gallery-panel"
          >
            <figure
              className="pg-penguin__gallery-figure"
              data-animate=""
              key={index === active ? `on-${round}` : 'off'}
            >
              <MockWindow label={t.label} meta={`127.0.0.1:7364${screen.path}`}>
                <img
                  className="pg-penguin__gallery-img"
                  src={screenSrc(screen.file, locale)}
                  alt={t.alt}
                  width={screenSize.width}
                  height={screenSize.height}
                  loading="lazy"
                  decoding="async"
                />
              </MockWindow>
              <figcaption className="pg-penguin__gallery-caption">{t.caption}</figcaption>
            </figure>
          </div>
        )
      })}
    </div>
  )
}
