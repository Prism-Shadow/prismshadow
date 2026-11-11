import type { Locale } from '../../../i18n'
import { agentMarketplacePageCopy } from '../../../i18n/messages/agentMarketplace'

/** Lit cells per team row: how far each team has standardized on approved skills (visual only). */
const adoption = [6, 5, 4, 5, 3, 4]
const CELLS = 8

/**
 * Hero visual: a box of approved skills wired into the team workflow layer,
 * one row per team. Modal-style diagram boxes with mono labels and lit cells.
 */
export function SkillsLayer({ locale }: { locale: Locale }) {
  const v = agentMarketplacePageCopy[locale].visual

  return (
    <div className="ds-panel ds-panel--dots pg-marketplace__layer" role="img" aria-label={v.ariaLabel}>
      <div className="pg-marketplace__layer-inner">
        <div className="pg-marketplace__box pg-marketplace__box--skills">
          <span className="pg-marketplace__box-label">{v.coreLabel}</span>
          <span className="pg-marketplace__diamonds">
            {v.signals.map((team) => (
              <i key={team} />
            ))}
          </span>
        </div>

        <span className="pg-marketplace__wire" aria-hidden="true" />

        <div className="pg-marketplace__box pg-marketplace__box--teams">
          <span className="pg-marketplace__box-label">{v.coreTitle}</span>
          <ul className="pg-marketplace__teams">
            {v.signals.map((team, i) => (
              <li key={team}>
                <span className="pg-marketplace__team">{team}</span>
                <span className="pg-marketplace__cells">
                  {Array.from({ length: CELLS }, (_, c) => (
                    <i key={c} data-on={c < adoption[i] || undefined} />
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
