import { ButtonLink, CtaBand, PageHero, SectionHead } from '../../components/site/ui'
import { renderAccent } from '../../components/site/utils'
import { securityPageCopy } from '../../i18n/messages/security'
import type { PageProps } from '../types'
import { ApiIcon, DatabaseIcon, ServerIcon } from './icons'
import { BoundaryMock } from './security/BoundaryMock'
import { ControlTabs } from './security/ControlTabs'
import { PerimeterDiagram } from './security/PerimeterDiagram'
import './security.css'

const deploymentIcons = [ServerIcon, DatabaseIcon, ApiIcon]

export function SecurityPage({ locale }: PageProps) {
  const copy = securityPageCopy[locale]

  return (
    <div className="pg-security">
      <PageHero
        className="pg-sec-hero"
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lead={copy.hero.lead}
        actions={
          <>
            <ButtonLink href={copy.hero.primaryCta.href} size="lg" arrow>
              {copy.hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={copy.hero.secondaryCta.href} variant="secondary" size="lg">
              {copy.hero.secondaryCta.label}
            </ButtonLink>
          </>
        }
        media={<BoundaryMock copy={copy.boundary} />}
      />

      {/* Private deployment: the core message. */}
      <section
        id="private-deployment"
        className="ds-section ds-section--raised pg-sec-deployment"
        aria-labelledby="private-deployment-title"
      >
        <div className="ds-container">
          <SectionHead
            eyebrow={copy.deployment.eyebrow}
            title={renderAccent(copy.deployment.title, copy.deployment.titleAccent)}
            titleId="private-deployment-title"
            lead={copy.deployment.lead}
          />
          <PerimeterDiagram copy={copy.deployment.diagram} />
          <ul className="ds-features pg-sec-deployment__features">
            {copy.deployment.features.map((feature, index) => {
              const Icon = deploymentIcons[index] ?? ServerIcon
              return (
                <li key={feature.title} className="ds-feature">
                  <h3 className="ds-feature__title">
                    <Icon />
                    {feature.title}
                  </h3>
                  <p className="ds-feature__body">{feature.body}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Controls: data, actions, memory and audit as tabs. */}
      <section id="controls" className="ds-section pg-sec-controls" aria-labelledby="controls-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={copy.controls.eyebrow}
            title={copy.controls.title}
            titleId="controls-title"
            lead={copy.controls.lead}
          />
          <ControlTabs controls={copy.controls} visuals={copy.visuals} />
        </div>
      </section>

      <CtaBand locale={locale} copy={copy.cta} />
    </div>
  )
}
