import { useEffect, useRef } from 'react'
import { departmentOrder, departmentsPath, getDepartmentPath } from '../../../components/site/navigation'
import { ButtonLink, CtaBand, Eyebrow, PageHero, SectionHead } from '../../../components/site/ui'
import type { Locale } from '../../../i18n'
import { departmentsPageCopy } from '../../../i18n/messages/departments'
import type { DepartmentId } from '../../../i18n/messages/shared'
import { createDepartmentSeo, usePageMetadata } from '../../../seo'
import { AgentSetup } from './AgentSetup'
import { DepartmentMock } from './DepartmentMock'
import { Phrases } from './Phrases'

export function DepartmentDetail({
  locale,
  id,
  pathname,
}: {
  locale: Locale
  id: DepartmentId
  pathname: string
}) {
  const t = departmentsPageCopy[locale]
  const s = t.solutions[id]

  usePageMetadata(
    createDepartmentSeo(
      { id, label: s.label, headline: s.headline.replaceAll('\u200B', ''), subtitle: s.subtitle },
      locale,
    ),
    pathname,
    locale,
  )

  return (
    <div className="pg-departments pg-departments--detail">
      <DepartmentNav locale={locale} current={id} />

      <PageHero
        id="hero"
        eyebrow={s.label}
        title={<Phrases text={s.headline} />}
        lead={s.subtitle}
        actions={
          <>
            <ButtonLink href="/contact" arrow>
              {t.detail.primaryCta}
            </ButtonLink>
            <ButtonLink href={departmentsPath} variant="secondary">
              {t.detail.secondaryCta}
            </ButtonLink>
          </>
        }
        media={<DepartmentMock id={id} locale={locale} className="pg-departments__hero-mock" />}
      />

      <section id="approach" className="ds-section ds-section--raised" aria-labelledby="approach-title">
        <div className="ds-container">
          <SectionHead
            variant="stack"
            eyebrow={t.detail.approachEyebrow}
            title={<Phrases text={t.detail.approachTitle.replace('{label}', s.label)} />}
            titleId="approach-title"
          />
          <ol className="pg-departments__rows">
            {s.sections.map((section, i) => (
              <li key={section.title} className="pg-departments__row">
                <div className="pg-departments__row-head">
                  <span className="pg-departments__row-index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="ds-h3">{section.title}</h3>
                </div>
                <p className="pg-departments__row-body">{section.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="agent" className="ds-section" aria-labelledby="agent-title">
        <div className="ds-container pg-departments__agent">
          <div className="pg-departments__agent-copy">
            <Eyebrow>{t.detail.agent.eyebrow}</Eyebrow>
            <h2 className="ds-h2" id="agent-title">
              {s.agent.role}
            </h2>
            <p className="ds-lead">{t.detail.agent.body}</p>
            <figure className="pg-departments__ask">
              <figcaption className="pg-departments__ask-label">{t.detail.agent.question}</figcaption>
              <blockquote>
                <p>
                  <Phrases text={s.agent.question} />
                </p>
              </blockquote>
            </figure>
          </div>
          <AgentSetup id={id} locale={locale} className="pg-departments__agent-panel" />
        </div>
      </section>

      <CtaBand locale={locale} />
    </div>
  )
}

/** Department switcher: real links, the current one marked, scrolls on narrow screens. */
function DepartmentNav({ locale, current }: { locale: Locale; current: DepartmentId }) {
  const t = departmentsPageCopy[locale]
  const scroller = useRef<HTMLDivElement>(null)

  // Keep the current department visible when the strip scrolls horizontally.
  useEffect(() => {
    const el = scroller.current
    const active = el?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!el || !active || el.scrollWidth <= el.clientWidth) return
    el.scrollLeft = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2
  }, [current])

  return (
    <nav className="pg-departments__nav" aria-label={t.detail.navLabel}>
      <div className="ds-container">
        <div className="pg-departments__nav-scroll" ref={scroller}>
          <a className="pg-departments__nav-link" href={departmentsPath}>
            {t.detail.overviewLabel}
          </a>
          <span className="pg-departments__nav-rule" aria-hidden="true" />
          {departmentOrder.map((id) => (
            <a
              key={id}
              className="pg-departments__nav-link"
              href={getDepartmentPath(id)}
              aria-current={id === current ? 'page' : undefined}
            >
              {t.solutions[id].label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
