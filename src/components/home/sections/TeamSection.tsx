import { TextLink } from '../../site/ui'
import { GithubIcon } from '../../site/icons'
import { productLogos } from '../../site/navigation'
import type { TeamCopy } from '../../../i18n/messages/home'
import './team.css'

/** One row: who built this, the open-source credential, and a link to /people. */
export function TeamSection({ copy }: { copy: TeamCopy }) {
  return (
    <section id="team" className="ds-section ds-section--tight hp-team" aria-labelledby="team-title">
      <div className="ds-container hp-team__inner">
        <div className="hp-team__lead">
          <span className="hp-team__mark">
            <img src={productLogos['llama-factory']} alt="" loading="lazy" decoding="async" />
          </span>
          <div className="hp-team__copy">
            <h2 id="team-title" className="ds-h3">
              {copy.title}
            </h2>
            <p className="hp-team__body">{copy.body}</p>
          </div>
        </div>
        <div className="hp-team__meta">
          <p className="hp-team__stat">
            <GithubIcon />
            {copy.stat}
          </p>
          <TextLink href="/people">{copy.cta}</TextLink>
        </div>
      </div>
    </section>
  )
}
