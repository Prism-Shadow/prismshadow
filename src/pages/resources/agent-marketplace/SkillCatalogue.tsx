import { useState } from 'react'
import type { Locale } from '../../../i18n'
import { agentMarketplacePageCopy } from '../../../i18n/messages/agentMarketplace'
import type { DepartmentId } from '../../../i18n/messages/shared'
import { DepartmentIcon } from '../../solutions/departments/DepartmentIcon'

/** Icon per team, in the order of `visual.signals` / `skills.items`. */
const teamIcons: DepartmentId[] = ['customer-support', 'sales', 'operations', 'data', 'legal', 'hr']

/**
 * The skill catalogue: a hairline grid with a team filter. Every listing is in
 * the server HTML; filtering only hides cells.
 */
export function SkillCatalogue({ locale }: { locale: Locale }) {
  const t = agentMarketplacePageCopy[locale]
  const teams = t.visual.signals
  const [team, setTeam] = useState<number | null>(null)

  return (
    <>
      <div className="pg-marketplace__filters" role="group" aria-label={t.skills.filterLabel}>
        <button
          type="button"
          className="pg-marketplace__filter"
          aria-pressed={team === null}
          onClick={() => setTeam(null)}
        >
          {t.skills.all}
        </button>
        {teams.map((name, i) => (
          <button
            key={name}
            type="button"
            className="pg-marketplace__filter"
            aria-pressed={team === i}
            onClick={() => setTeam(i)}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="pg-marketplace__skills" aria-live="polite">
        {t.skills.items.map((skill, i) => (
          <li key={skill.title} className="pg-marketplace__skill" hidden={team !== null && team !== i}>
            <span className="pg-marketplace__skill-meta">
              <span className="pg-marketplace__skill-team">
                <DepartmentIcon id={teamIcons[i] ?? 'operations'} />
                {teams[i]}
              </span>
              <span className="ds-tag">{t.skills.approved}</span>
            </span>
            <h3 className="ds-h3">{skill.title}</h3>
            <p className="ds-small">{skill.body}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
