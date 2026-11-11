import type { CSSProperties } from 'react'
import { ArrowRightIcon } from '../../components/site/icons'
import {
  departmentOrder,
  departmentsPath,
  getDepartmentPath,
  getIndustryPath,
  industryOrder,
} from '../../components/site/navigation'
import { ButtonLink, CtaBand, Eyebrow, SectionHead, TextLink } from '../../components/site/ui'
import { cx, renderAccent } from '../../components/site/utils'
import { customersPageCopy } from '../../i18n/messages/customersPage'
import { siteText } from '../../i18n/messages/shared'
import type { PageProps } from '../types'
import { CoboPanel, LifecyclePanel, LiveMeter, type MeterPattern } from './CasePanels'
import { AudienceIcon } from './icons'
import './customers.css'

/** Each enterprise case's live strip: a test queue, parallel experiments, a screening sweep. */
const meterPatterns: Record<string, MeterPattern> = {
  semiconductor: 'queue',
  pharma: 'trials',
  'health-screening': 'scan',
}

export function CustomersPage({ locale }: PageProps) {
  const copy = customersPageCopy[locale]
  const { hero, featured, enterprise, audiences, explore } = copy
  const site = siteText[locale]

  return (
    <div className="pg-customers">
      {/* Hero: the claim and the three headline results. */}
      <section id="hero" className="cu-hero" aria-labelledby="hero-title">
        <div className="ds-container cu-hero__inner">
          <div className="cu-hero__copy">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="ds-h1 cu-hero__title" id="hero-title">
              {renderAccent(hero.title, hero.titleAccent)}
            </h1>
            <p className="ds-lead cu-hero__lead">{hero.lead}</p>
            <div className="ds-actions cu-hero__actions">
              <ButtonLink href={hero.primary.href} size="lg" arrow>
                {hero.primary.label}
              </ButtonLink>
              <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">
                {hero.secondary.label}
              </ButtonLink>
            </div>
          </div>
          <dl className="cu-hero__proof" aria-label={hero.proofLabel}>
            {hero.proof.map((item) => (
              <div key={item.value} className="ds-stat cu-hero__stat">
                <dt className="ds-stat__label">{item.label}</dt>
                <dd className={cx('ds-stat__value', item.tone === 'signal' && 'cu-value--signal')}>
                  {item.value}
                </dd>
                <dd className="cu-hero__source">{item.source}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured case studies: the two named customers, each given a full row. */}
      <section id="case-studies" className="ds-section ds-section--raised cu-featured" aria-labelledby="case-studies-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={featured.eyebrow}
            title={featured.title}
            titleId="case-studies-title"
            lead={featured.lead}
          />
          <div className="cu-featured__list">
            {featured.cases.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                className={cx('cu-case', index % 2 === 1 && 'cu-case--flip')}
                aria-labelledby={`${item.id}-title`}
              >
                <div className="cu-case__copy">
                  <p className="cu-case__sector">{item.sector}</p>
                  <h3 className="ds-h2 cu-case__name" id={`${item.id}-title`}>
                    {item.customer}
                  </h3>
                  <p className="cu-case__title">{item.title}</p>
                  <p className="cu-case__body">{item.body}</p>
                  <div className="cu-case__cap">
                    <span className="cu-case__cap-label">{featured.capabilityLabel}</span>
                    <TextLink href={item.capability.href}>{item.capability.label}</TextLink>
                  </div>
                </div>
                <div className="cu-case__visual">
                  {item.id === 'cobo' ? (
                    <CoboPanel copy={featured.cobo} />
                  ) : (
                    <LifecyclePanel copy={featured.subconscious} />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise deployments: three anonymous customers on the paper band. */}
      <section
        id="enterprise"
        className="ds-section ds-section--paper cu-enterprise"
        aria-labelledby="enterprise-title"
      >
        <div className="ds-container">
          <SectionHead
            eyebrow={enterprise.eyebrow}
            title={enterprise.title}
            titleId="enterprise-title"
            lead={enterprise.lead}
          />
          {/* Motion (customers.css): the three columns fade up in turn, once. */}
          <ul className="cu-enterprise__list" data-animate="custom">
            {enterprise.cases.map((item, index) => (
              <li key={item.id} className="cu-enterprise__item" style={{ '--i': index } as CSSProperties}>
                <p className="cu-enterprise__customer">{item.customer}</p>
                <p className="cu-enterprise__value">{item.value}</p>
                <LiveMeter pattern={meterPatterns[item.id] ?? 'queue'} />
                <h3 className="ds-h4 cu-enterprise__title">{item.title}</h3>
                <p className="cu-enterprise__body">{item.body}</p>
                <TextLink href={item.capability.href} className="cu-enterprise__link">
                  {item.capability.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's for: the four customer profiles. */}
      <section id="audiences" className="ds-section cu-audiences" aria-labelledby="audiences-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={audiences.eyebrow}
            title={audiences.title}
            titleId="audiences-title"
            lead={audiences.lead}
          />
          <ul className="ds-features ds-features--4 cu-audiences__list">
            {audiences.segments.map((segment) => (
              <li key={segment.id} className="ds-feature cu-audiences__item">
                <AudienceIcon name={segment.id} className="cu-audiences__icon" />
                <h3 className="ds-h4">{segment.title}</h3>
                <p className="cu-audiences__examples">{segment.examples}</p>
                <p className="ds-feature__body">{segment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cross-links into the industry and department solutions. */}
      <section id="explore" className="ds-section ds-section--raised cu-explore" aria-labelledby="explore-title">
        <div className="ds-container">
          <SectionHead eyebrow={explore.eyebrow} title={explore.title} titleId="explore-title" lead={explore.lead} />
          <div className="cu-explore__grid">
            <nav className="cu-explore__group" aria-labelledby="explore-industries">
              <h3 className="ds-h4 cu-explore__heading" id="explore-industries">
                {explore.industries}
              </h3>
              <ul className="cu-explore__links">
                {industryOrder.map((id) => (
                  <li key={id}>
                    <a className="cu-explore__link" href={getIndustryPath(id)}>
                      {site.industries[id]}
                      <ArrowRightIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="cu-explore__group" aria-labelledby="explore-departments">
              <h3 className="ds-h4 cu-explore__heading" id="explore-departments">
                {explore.departments}
              </h3>
              <ul className="cu-explore__links">
                {departmentOrder.map((id) => (
                  <li key={id}>
                    <a className="cu-explore__link" href={getDepartmentPath(id)}>
                      {site.departments[id]}
                      <ArrowRightIcon />
                    </a>
                  </li>
                ))}
              </ul>
              <TextLink href={departmentsPath} className="cu-explore__all">
                {explore.allDepartments}
              </TextLink>
            </nav>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} copy={copy.cta} />
    </div>
  )
}
