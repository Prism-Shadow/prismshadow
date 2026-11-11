import type { CSSProperties } from 'react'
import { ArrowRightIcon, ArrowUpRightIcon, DiamondIcon, GithubIcon } from '../../components/site/icons'
import { ButtonLink, CtaBand, Eyebrow, SectionHead } from '../../components/site/ui'
import { renderAccent } from '../../components/site/utils'
import { peoplePageCopy } from '../../i18n/messages/people'
import type { PageProps } from '../types'
import { CubeIcon, DownloadIcon, ForkIcon, StarIcon } from './icons'
import { CommitField } from './people/CommitField'
import { Emphasis } from './people/Emphasis'
import { founderPhotoFrames } from './people/founderPhotos'
import './people.css'

const statIcons = [StarIcon, DownloadIcon, CubeIcon, ForkIcon]

/** Stagger order for an item's intro (people.css reads `--i`). */
const order = (index: number) => ({ '--i': index }) as CSSProperties

export function PeoplePage({ locale }: PageProps) {
  const copy = peoplePageCopy[locale]
  const newTab = <span className="ds-sr-only"> ({copy.newTabLabel})</span>

  return (
    <div className="pg-people">
      {/* Hero: who built PrismShadow, over a quiet year-long activity field. */}
      <section id="hero" className="ds-page-hero ds-page-hero--left pg-people-hero" aria-labelledby="hero-title">
        <div className="ds-container ds-page-hero__inner">
          <div className="ds-page-hero__copy">
            <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
            <h1 className="ds-h1 ds-page-hero__title" id="hero-title">
              {renderAccent(copy.hero.title, copy.hero.titleAccent)}
            </h1>
            <p className="ds-lead ds-page-hero__lead">{copy.hero.lead}</p>
            <div className="ds-actions ds-page-hero__actions">
              <ButtonLink href={copy.hero.primaryCta.href} size="lg" arrow>
                {copy.hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={copy.hero.secondaryCta.href} variant="secondary" size="lg" external>
                {copy.hero.secondaryCta.label}
                {newTab}
              </ButtonLink>
            </div>
          </div>
          <CommitField className="pg-people-field" />
        </div>
      </section>

      {/* Founders: one row each, portrait left, credentials right. */}
      <section
        id="founders"
        className="ds-section ds-section--raised pg-people-founders"
        aria-labelledby="founders-title"
      >
        <div className="ds-container">
          <h2 id="founders-title" className="ds-eyebrow pg-people-founders__title">
            <span className="ds-eyebrow__chip" aria-hidden="true">
              <DiamondIcon />
            </span>
            {copy.founders.title}
          </h2>
          <ol className="pg-people-founders__list">
            {copy.founders.people.map((founder, index) => (
              <li key={founder.name} className="pg-people-founder">
                <div className="ds-panel pg-people-founder__photo" data-animate="">
                  <span className="pg-people-founder__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    decoding="async"
                    loading={index === 0 ? undefined : 'lazy'}
                    style={founderPhotoFrames[founder.photo]}
                  />
                </div>
                <div className="pg-people-founder__body">
                  <div className="pg-people-founder__ident">
                    <h3 className="ds-h2 pg-people-founder__name">{founder.name}</h3>
                    <p className="pg-people-founder__role">{founder.role}</p>
                  </div>
                  <ul className="pg-people-founder__highlights">
                    {founder.highlights.map((line) => (
                      <li key={line}>
                        <Emphasis text={line} />
                      </li>
                    ))}
                  </ul>
                  <p className="pg-people-founder__from">{founder.affiliations.join(' · ')}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Open source: LlamaFactory's footprint and the team's open projects. */}
      <section id="open-source" className="ds-section pg-people-oss" aria-labelledby="open-source-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={copy.openSource.eyebrow}
            title={copy.openSource.title}
            titleId="open-source-title"
            lead={copy.openSource.lead}
          />

          <div className="pg-people-repo">
            <p className="pg-people-repo__bar">
              <span className="pg-people-repo__id">
                <GithubIcon className="pg-people-repo__icon" />
                <span className="pg-people-repo__name">{copy.openSource.repo.name}</span>
                <a className="pg-people-repo__link" href={copy.openSource.repo.href} target="_blank" rel="noreferrer">
                  {copy.openSource.repo.display}
                  <ArrowUpRightIcon />
                  {newTab}
                </a>
              </span>
              <span className="pg-people-repo__label">{copy.openSource.footprintLabel}</span>
            </p>
            <dl className="pg-people-repo__stats" data-animate="custom">
              {copy.openSource.stats.map((stat, index) => {
                const Icon = statIcons[index] ?? StarIcon
                return (
                  <div key={stat.label} className="pg-people-repo__stat" style={order(index)}>
                    <dt className="pg-people-repo__stat-label">
                      <Icon />
                      {stat.label}
                    </dt>
                    <dd className="ds-stat__value">{stat.value}</dd>
                  </div>
                )
              })}
            </dl>
          </div>

          <ul className="ds-features pg-people-projects" aria-label={copy.openSource.projectsLabel}>
            {copy.openSource.projects.map((project) => (
              <li key={project.name} className="ds-feature pg-people-project">
                <h3 className="ds-h4">{project.name}</h3>
                <p className="ds-feature__body">{project.body}</p>
                <p className="pg-people-project__links">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      className="ds-link"
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {link.label}
                      {link.external ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
                      {link.external ? newTab : null}
                    </a>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Backgrounds: where the founders built AI before (genuine logos, paper band). */}
      <section
        id="backgrounds"
        className="ds-section ds-section--paper ds-section--tight pg-people-backgrounds"
        aria-labelledby="backgrounds-title"
      >
        <div className="ds-container pg-people-backgrounds__inner">
          <h2 id="backgrounds-title" className="pg-people-backgrounds__title">
            {copy.backgrounds.title}
          </h2>
          <ul className="pg-people-backgrounds__logos" data-animate="custom">
            {copy.backgrounds.logos.map((logo, index) => (
              <li key={logo.name} className="pg-people-backgrounds__logo" style={order(index)}>
                {logo.src ? <img src={logo.src} alt="" loading="lazy" decoding="async" /> : null}
                <span>{logo.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} copy={copy.cta} />
    </div>
  )
}
