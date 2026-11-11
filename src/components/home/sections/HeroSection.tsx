import { ButtonLink, Eyebrow } from '../../site/ui'
import { renderAccent } from '../../site/utils'
import type { HeroCopy } from '../../../i18n/messages/home'
import { EvolutionFrontier } from './hero/EvolutionFrontier'
import './hero.css'

export function HeroSection({ copy }: { copy: HeroCopy }) {
  return (
    <section id="hero" className="hp-hero" aria-labelledby="hero-title">
      <div className="ds-container">
        <div className="hp-hero__copy">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="ds-display hp-hero__title" id="hero-title">
            {renderAccent(copy.title, copy.titleAccent)}
          </h1>
          <p className="ds-lead hp-hero__lead">{copy.body}</p>
          <div className="ds-actions hp-hero__actions">
            <ButtonLink href="/contact" variant="primary" size="lg" arrow>
              {copy.primaryCta}
            </ButtonLink>
            <ButtonLink href="#proof" variant="secondary" size="lg">
              {copy.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <EvolutionFrontier copy={copy.visual} />
      </div>
    </section>
  )
}
