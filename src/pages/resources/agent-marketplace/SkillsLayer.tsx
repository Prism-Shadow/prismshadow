import type { CSSProperties } from 'react'
import type { Locale } from '../../../i18n'
import { agentMarketplacePageCopy } from '../../../i18n/messages/agentMarketplace'

/** Lit cells per team row: how far each team has standardized on approved skills (visual only). */
const adoption = [6, 5, 4, 5, 3, 4]
const CELLS = 8

/**
 * Hero visual: a box of approved skills wired into the team workflow layer,
 * one row per team. Modal-style diagram boxes with mono labels and lit cells.
 *
 * Motion (agent-marketplace.css): every few seconds a signal crosses the wire
 * and each team's next cell glints in turn, as if a skill had just reached it.
 * On entering view (not on first load) the boxes fade in and the cells fill.
 */
export function SkillsLayer({ locale }: { locale: Locale }) {
  const v = agentMarketplacePageCopy[locale].visual

  return (
    <div
      className="ds-panel ds-panel--dots pg-marketplace__layer"
      role="img"
      aria-label={v.ariaLabel}
      data-animate="custom"
    >
      <div className="pg-marketplace__layer-inner">
        <div className="pg-marketplace__box pg-marketplace__box--skills">
          <span className="pg-marketplace__box-label">{v.coreLabel}</span>
          <span className="pg-marketplace__diamonds">
            {v.signals.map((team) => (
              <i key={team} />
            ))}
          </span>
        </div>

        <span className="pg-marketplace__wire" aria-hidden="true">
          <span className="pg-marketplace__spark" />
        </span>

        <div className="pg-marketplace__box pg-marketplace__box--teams">
          <span className="pg-marketplace__box-label">{v.coreTitle}</span>
          <ul className="pg-marketplace__teams">
            {v.signals.map((team, i) => (
              <li key={team} style={{ '--r': i } as CSSProperties}>
                <span className="pg-marketplace__team">{team}</span>
                <span className="pg-marketplace__cells">
                  {Array.from({ length: CELLS }, (_, c) => (
                    <i
                      key={c}
                      data-on={c < adoption[i] || undefined}
                      data-next={c === adoption[i] || undefined}
                      style={{ '--c': c } as CSSProperties}
                    />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
