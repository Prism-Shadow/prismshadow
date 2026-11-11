import { ArrowRightIcon } from '../../components/site/icons'
import { ButtonLink, CtaBand, PageHero, SectionHead } from '../../components/site/ui'
import { renderAccent } from '../../components/site/utils'
import {
  industryPageDetailsCopy,
  type IndustryDetailsCopy,
} from '../../i18n/messages/industryPageDetails'
import {
  industryPagesCopy,
  industryTemplateCopy,
  type IndustryPageCopy,
  type IndustryTemplateCopy,
} from '../../i18n/messages/industryPages'
import { siteText, type IndustryId } from '../../i18n/messages/shared'
import type { PageProps } from '../types'
import { cjkBreaks } from './industry/cjkBreaks'
import { IndustryFlow } from './industry/IndustryFlow'
import { IndustryLoop } from './industry/IndustryLoop'
import { ScenarioExplorer } from './industry/ScenarioExplorer'
import './industry/industry.css'

/** Heading text with zh word-boundary break hints (see cjkBreaks). */
const br = (text: string) => cjkBreaks(text).text

/**
 * One data-driven template for all eight industry solution pages:
 * hero (agent workflow schematic) → why now → scenario explorer →
 * why PrismShadow (platform loop + reasons) → resources → closing CTA.
 */
export function IndustryPage({ locale, industryId }: PageProps & { industryId: IndustryId }) {
  const page: IndustryPageCopy = industryPagesCopy[locale][industryId]
  const details: IndustryDetailsCopy = industryPageDetailsCopy[locale][industryId]
  const t: IndustryTemplateCopy = industryTemplateCopy[locale]
  const site = siteText[locale]
  const agents = details.scenarios.map((scenario) => scenario.label)
  const firstTrace = details.scenarios[0].trace
  const nextAction = firstTrace[firstTrace.length - 1][1]
  const heroTitle = cjkBreaks(page.hero.title, page.hero.titleAccent)
  const ctaTitle = cjkBreaks(page.cta.title, page.cta.titleAccent)

  return (
    <div className="pg-industry">
      <PageHero
        className="pg-industry__hero"
        eyebrow={`${site.footer.industries} · ${site.industries[industryId]}`}
        title={renderAccent(heroTitle.text, heroTitle.accent)}
        lead={page.hero.lead}
        actions={
          <>
            <ButtonLink href={page.hero.primary.href} variant="primary" arrow>
              {page.hero.primary.label}
            </ButtonLink>
            <ButtonLink href={page.hero.secondary.href} variant="secondary">
              {page.hero.secondary.label}
            </ButtonLink>
          </>
        }
        media={
          <IndustryFlow
            signals={page.signals}
            agents={agents}
            nextAction={nextAction}
            copy={t.flow}
            listSeparator={locale === 'zh' ? '、' : ', '}
          />
        }
      />

      <section id="why-now" className="ds-section pg-industry__why" aria-labelledby="why-now-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={t.eyebrows.whyNow}
            title={br(page.whyNow.title)}
            titleId="why-now-title"
            lead={page.whyNow.lead}
          />
          <ol className="ds-features pg-industry__points">
            {details.whyNow.map((point, i) => (
              <li className="ds-feature pg-industry__point" key={point.title}>
                <span className="pg-industry__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="ds-feature__title">{br(point.title)}</h3>
                <p className="ds-feature__body">{point.body}</p>
                {point.note ? (
                  <p className="pg-industry__note">
                    <ArrowRightIcon />
                    {point.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="scenarios"
        className="ds-section ds-section--raised pg-industry__scenarios"
        aria-labelledby="scenarios-title"
      >
        <div className="ds-container">
          <SectionHead
            eyebrow={t.eyebrows.scenarios}
            title={br(page.scenarios.title)}
            titleId="scenarios-title"
            lead={page.scenarios.lead}
          />
          <ScenarioExplorer
            key={industryId}
            scenarios={details.scenarios}
            tabsLabel={page.scenarios.tabsLabel}
            workspaceLabel={page.scenarios.workspaceLabel}
            copy={t.workspace}
          />
        </div>
      </section>

      <section id="how-it-fits" className="ds-section pg-industry__fit" aria-labelledby="how-it-fits-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={t.eyebrows.fit}
            title={br(page.fit.title)}
            titleId="how-it-fits-title"
            lead={page.fit.lead}
          />
          <div className="pg-industry-fit">
            <ul className="pg-industry-fit__reasons">
              {details.reasons.map((reason) => (
                <li key={reason.title}>
                  <h3 className="pg-industry-fit__title">{br(reason.title)}</h3>
                  <p className="pg-industry-fit__body">{reason.body}</p>
                </li>
              ))}
            </ul>
            <div className="pg-industry-fit__visual">
              <IndustryLoop copy={t.loop} signals={page.signals} agents={agents} />
            </div>
          </div>
        </div>
      </section>

      <section
        id="resources"
        className="ds-section ds-section--paper pg-industry__resources"
        aria-labelledby="resources-title"
      >
        <div className="ds-container">
          <SectionHead
            eyebrow={t.eyebrows.resources}
            title={br(page.resources.title)}
            titleId="resources-title"
            lead={page.resources.lead}
          />
          <ul className="pg-industry-resources">
            {details.resources.map((resource) => (
              <li key={resource.title}>
                <a className="pg-industry-resource" href={resource.href}>
                  <span className="pg-industry-resource__meta">
                    <span>{resource.category}</span>
                    {resource.readingTime ? <span>{resource.readingTime}</span> : null}
                  </span>
                  <h3 className="pg-industry-resource__title">{br(resource.title)}</h3>
                  <span className="pg-industry-resource__aside">
                    <span className="pg-industry-resource__body">{resource.body}</span>
                    <span className="ds-link pg-industry-resource__cta">
                      {resource.cta}
                      <ArrowRightIcon />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} copy={{ ...page.cta, title: ctaTitle.text, titleAccent: ctaTitle.accent }} />
    </div>
  )
}
