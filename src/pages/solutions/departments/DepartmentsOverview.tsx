import { departmentOrder, getDepartmentPath } from '../../../components/site/navigation'
import { ButtonLink, CtaBand, PageHero, SectionHead } from '../../../components/site/ui'
import type { Locale } from '../../../i18n'
import { departmentsPageCopy } from '../../../i18n/messages/departments'
import { AgentQuote } from './AgentQuote'
import { DepartmentIcon } from './DepartmentIcon'
import { DepartmentMock } from './DepartmentMock'
import { Phrases } from './Phrases'
import { FlowSchematic } from './FlowSchematic'
import { StepGlyph } from './StepGlyph'
import { useTabList } from './useTabList'

export function DepartmentsOverview({ locale }: { locale: Locale }) {
  const t = departmentsPageCopy[locale]
  const hero = t.overview.hero

  return (
    <div className="pg-departments">
      <PageHero
        id="hero"
        eyebrow={hero.eyebrow}
        title={<Phrases text={hero.title} />}
        lead={hero.body}
        actions={
          <>
            <ButtonLink href="/contact" arrow>
              {t.detail.primaryCta}
            </ButtonLink>
            <ButtonLink href="#departments" variant="secondary">
              {hero.browse}
            </ButtonLink>
          </>
        }
        media={
          <div className="ds-panel ds-panel--dots pg-departments__schematic">
            <FlowSchematic
              label={hero.visualLabel}
              inputs={hero.inputs}
              core={
                <>
                  <span className="pg-departments__core-name">{hero.core}</span>
                  <span className="pg-departments__core-caption">{hero.coreCaption}</span>
                </>
              }
              outputs={departmentOrder.map((id) => (
                <>
                  <DepartmentIcon id={id} />
                  {t.solutions[id].label}
                </>
              ))}
            />
          </div>
        }
      />
      <DepartmentTabs locale={locale} />
      <HowItWorks locale={locale} />
      <CtaBand locale={locale} />
    </div>
  )
}

function DepartmentTabs({ locale }: { locale: Locale }) {
  const t = departmentsPageCopy[locale]
  const copy = t.overview.tabs
  const { tabProps, panelProps } = useTabList('departments', departmentOrder.length)

  return (
    <section
      id="departments"
      className="ds-section ds-section--raised pg-departments__explorer"
      aria-labelledby="departments-title"
    >
      <div className="ds-container">
        <SectionHead eyebrow={copy.eyebrow} title={<Phrases text={copy.title} />} titleId="departments-title" lead={copy.body} />

        <div className="pg-departments__tabs">
          <div
            className="pg-departments__tablist"
            role="tablist"
            aria-label={copy.tablistLabel}
            aria-orientation="vertical"
          >
            {departmentOrder.map((id, i) => (
              <button key={id} className="pg-departments__tab" {...tabProps(i)}>
                <DepartmentIcon id={id} />
                <span>{t.solutions[id].label}</span>
              </button>
            ))}
          </div>

          {departmentOrder.map((id, i) => {
            const s = t.solutions[id]
            return (
              <div key={id} className="pg-departments__panel" {...panelProps(i)}>
                <div className="pg-departments__panel-copy">
                  <h3 className="ds-h3">
                    <Phrases text={s.headline} />
                  </h3>
                  <p className="ds-small">{s.subtitle}</p>
                  <AgentQuote
                    roleLabel={copy.roleLabel}
                    role={s.agent.role}
                    questionLabel={copy.questionLabel}
                    question={s.agent.question}
                  />
                  <ButtonLink href={getDepartmentPath(id)} size="sm" arrow>
                    {copy.explore.replace('{label}', s.label)}
                  </ButtonLink>
                </div>
                <DepartmentMock id={id} locale={locale} className="pg-departments__panel-media" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItWorks({ locale }: { locale: Locale }) {
  const how = departmentsPageCopy[locale].overview.how

  return (
    <section id="how-it-works" className="ds-section" aria-labelledby="how-it-works-title">
      <div className="ds-container">
        <SectionHead eyebrow={how.eyebrow} title={<Phrases text={how.title} />} titleId="how-it-works-title" lead={how.body} />
        <ol className="ds-features pg-departments__steps">
          {how.steps.map((step, i) => (
            <li key={step.title} className="ds-feature pg-departments__step">
              <span className="pg-departments__step-index">{i + 1}</span>
              <StepGlyph index={i} />
              <h3 className="ds-feature__title">{step.title}</h3>
              <p className="ds-feature__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
