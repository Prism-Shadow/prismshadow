import { ArrowRightIcon } from '../../components/site/icons'
import { productOrder, productPaths } from '../../components/site/navigation'
import { ButtonLink, CtaBand, Eyebrow, PageHero, SectionHead, TextLink } from '../../components/site/ui'
import { renderAccent } from '../../components/site/utils'
import { aboutPageCopy } from '../../i18n/messages/about'
import { siteText } from '../../i18n/messages/shared'
import type { PageProps } from '../types'
import { PillarArt } from './about/PillarArt'
import { PlatformLoop } from './about/PlatformLoop'
import { StarIcon } from './icons'
import { founderAvatarFrames } from './people/founderPhotos'
import './about.css'

const openSourceProducts = new Set(['penguin-harness', 'llama-factory'])

export function AboutPage({ locale }: PageProps) {
  const copy = aboutPageCopy[locale]
  const products = siteText[locale].products

  return (
    <div className="pg-about">
      <PageHero
        className="pg-about-hero"
        eyebrow={copy.hero.eyebrow}
        title={renderAccent(copy.hero.title, copy.hero.titleAccent)}
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
        media={<PlatformLoop copy={copy.loop} />}
      />

      {/* Story: who we are and the three layers of the platform. */}
      <section
        id="story"
        className="ds-section ds-section--raised pg-about-story"
        aria-labelledby="story-title"
      >
        <div className="ds-container">
          <div className="pg-about-story__head">
            <Eyebrow className="pg-about-story__eyebrow">{copy.story.eyebrow}</Eyebrow>
            <h2 id="story-title" className="ds-h2 pg-about-story__title">
              {copy.story.title}
            </h2>
            <div className="pg-about-story__body">
              {copy.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="ds-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <ol className="ds-features pg-about-pillars" aria-label={copy.story.pillarsLabel}>
            {copy.story.pillars.map((pillar, index) => (
              <li key={pillar.title} className="ds-feature pg-about-pillar">
                <span className="pg-about-pillar__index">{index + 1}</span>
                <PillarArt index={index} />
                <h3 className="ds-h4 pg-about-pillar__title">{pillar.title}</h3>
                <p className="ds-feature__body">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Products: the three product pages. */}
      <section id="products" className="ds-section pg-about-products" aria-labelledby="products-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={copy.products.eyebrow}
            title={copy.products.title}
            titleId="products-title"
            lead={copy.products.lead}
          />
          <ul className="pg-about-products__list">
            {productOrder.map((id, index) => (
              <li key={id}>
                <a className="pg-about-product" href={productPaths[id]}>
                  <div className="pg-about-product__name">
                    <span className="pg-about-product__index">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="ds-h3">{products[id].name}</h3>
                    {openSourceProducts.has(id) ? (
                      <span className="ds-tag ds-tag--neutral">{copy.products.openSourceLabel}</span>
                    ) : null}
                  </div>
                  <p className="pg-about-product__body">{copy.products.summaries[id]}</p>
                  <span className="pg-about-product__cta">
                    <span className="ds-sr-only">{copy.products.learnMore}</span>
                    <ArrowRightIcon />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team teaser: the full story lives on /people. */}
      <section id="team" className="ds-section ds-section--raised pg-about-team" aria-labelledby="team-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={copy.team.eyebrow}
            title={copy.team.title}
            titleId="team-title"
            lead={copy.team.lead}
            actions={<TextLink href={copy.team.link.href}>{copy.team.link.label}</TextLink>}
          />
          <div className="pg-about-team__strip">
            <div className="pg-about-team__founders">
              <ul className="pg-about-team__avatars" aria-hidden="true" data-animate="">
                {copy.team.founders.map((founder) => (
                  <li key={founder.name} className="pg-about-team__avatar">
                    <img
                      src={founder.photo}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={founderAvatarFrames[founder.photo]}
                    />
                  </li>
                ))}
              </ul>
              <p className="pg-about-team__names">{copy.team.founders.map((f) => f.name).join(' · ')}</p>
            </div>
            <p className="pg-about-team__stat">
              <StarIcon />
              <span className="pg-about-team__stat-value">{copy.team.stat.value}</span>{' '}
              {copy.team.stat.label}
            </p>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} copy={copy.cta} />
    </div>
  )
}
