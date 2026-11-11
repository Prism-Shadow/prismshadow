import { ButtonLink, CtaBand, Eyebrow, PageHero, SectionHead } from '../../components/site/ui'
import { agentMarketplacePageCopy } from '../../i18n/messages/agentMarketplace'
import { Phrases } from '../solutions/departments/Phrases'
import type { PageProps } from '../types'
import { BenefitIcon } from './agent-marketplace/BenefitIcon'
import { SkillCatalogue } from './agent-marketplace/SkillCatalogue'
import { SkillsLayer } from './agent-marketplace/SkillsLayer'
import './agent-marketplace/agent-marketplace.css'

export function AgentMarketplacePage({ locale }: PageProps) {
  const t = agentMarketplacePageCopy[locale]

  return (
    <div className="pg-marketplace">
      <PageHero
        id="hero"
        eyebrow={t.hero.eyebrow}
        title={<Phrases text={t.hero.title} />}
        lead={t.hero.body}
        actions={
          <>
            <ButtonLink href="#marketplace-skills" arrow>
              {t.hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="#marketplace-adoption" variant="secondary">
              {t.hero.secondaryCta}
            </ButtonLink>
          </>
        }
        media={<SkillsLayer locale={locale} />}
      />

      <section id="why-marketplace" className="ds-section ds-section--raised" aria-labelledby="why-marketplace-title">
        <div className="ds-container pg-marketplace__intro">
          <div className="pg-marketplace__intro-head">
            <Eyebrow>{t.intro.eyebrow}</Eyebrow>
            <h2 className="ds-h2" id="why-marketplace-title">
              <Phrases text={t.intro.title} />
            </h2>
          </div>
          <div className="pg-marketplace__intro-body">
            {t.intro.body.map((paragraph) => (
              <p key={paragraph} className="ds-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        id="marketplace-skills"
        className="ds-section ds-section--paper"
        aria-labelledby="marketplace-skills-title"
      >
        <div className="ds-container">
          <SectionHead
            variant="stack"
            eyebrow={t.skills.eyebrow}
            title={<Phrases text={t.skills.title} />}
            titleId="marketplace-skills-title"
            className="pg-marketplace__skills-head"
          />
          <SkillCatalogue locale={locale} />
        </div>
      </section>

      <section id="marketplace-adoption" className="ds-section" aria-labelledby="marketplace-adoption-title">
        <div className="ds-container">
          <SectionHead
            variant="stack"
            eyebrow={t.adoption.eyebrow}
            title={<Phrases text={t.adoption.title} />}
            titleId="marketplace-adoption-title"
          />
          <div className="pg-marketplace__track-wrap">
            {/* The connecting line, drawn in once when it comes into view. */}
            <span className="pg-marketplace__track-line" aria-hidden="true" data-animate="custom" />
            <ol className="pg-marketplace__track">
              {t.adoption.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="pg-marketplace__step"
                  data-last={i === t.adoption.steps.length - 1 || undefined}
                >
                  <span className="pg-marketplace__node">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="ds-h4">{step.title}</h3>
                  <p className="ds-small">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="marketplace-benefits"
        className="ds-section ds-section--raised"
        aria-labelledby="marketplace-benefits-title"
      >
        <div className="ds-container pg-marketplace__benefits">
          <div className="pg-marketplace__benefits-head">
            <Eyebrow>{t.benefits.eyebrow}</Eyebrow>
            <h2 className="ds-h2" id="marketplace-benefits-title">
              <Phrases text={t.benefits.title} />
            </h2>
          </div>
          <ul className="ds-features ds-features--2 pg-marketplace__benefit-list">
            {t.benefits.items.map((item, i) => (
              <li key={item.title} className="ds-feature">
                <h3 className="ds-feature__title">
                  <BenefitIcon index={i} />
                  {item.title}
                </h3>
                <p className="ds-feature__body">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        locale={locale}
        copy={{
          title: t.final.title,
          titleAccent: t.final.titleAccent,
          body: t.final.body,
          primary: { label: t.final.cta, href: '#marketplace-skills' },
          secondary: { label: t.final.secondaryCta, href: '/contact' },
        }}
      />
    </div>
  )
}
