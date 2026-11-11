import { productLogos, productPaths } from '../../components/site/navigation'
import { ButtonLink, CtaBand, PageHero, SectionHead, TextLink } from '../../components/site/ui'
import { cx, renderAccent } from '../../components/site/utils'
import { platformPageCopy } from '../../i18n/messages/platformPage'
import { siteText } from '../../i18n/messages/shared'
import type { PageProps } from '../types'
import { FeatureIcon } from './icons'
import { CapabilityDiagram } from './visuals/CapabilityDiagram'
import { CostChart } from './visuals/CostChart'
import { LoopDiagram } from './visuals/LoopDiagram'
import { StackDrawing } from './visuals/StackDrawing'
import './platform.css'

const pad = (n: number) => String(n).padStart(2, '0')

export function PlatformPage({ locale }: PageProps) {
  const copy = platformPageCopy[locale]
  const { hero, capabilities, loop, results, products } = copy
  const productNames = siteText[locale].products

  return (
    <div className="pg-platform">
      <PageHero
        className="pf-hero"
        eyebrow={hero.eyebrow}
        title={renderAccent(hero.title, hero.titleAccent)}
        lead={hero.lead}
        actions={
          <>
            <ButtonLink href={hero.primary.href} size="lg" arrow>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">
              {hero.secondary.label}
            </ButtonLink>
          </>
        }
        meta={
          <dl className="pf-hero__specs" aria-label={hero.specsLabel}>
            {hero.specs.map((spec) => (
              <div key={spec.label} className="pf-hero__spec">
                <dt className="pf-hero__spec-label">{spec.label}</dt>
                <dd className="pf-hero__spec-value">{spec.value}</dd>
              </div>
            ))}
          </dl>
        }
        media={<StackDrawing copy={hero.stack} />}
      />

      {/* The four capabilities, each with room and its own schematic. */}
      <section id="capabilities" className="ds-section ds-section--raised pf-caps" aria-labelledby="capabilities-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={capabilities.eyebrow}
            title={capabilities.title}
            titleId="capabilities-title"
            lead={capabilities.lead}
          />
          <div className="pf-caps__list">
            {capabilities.items.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                className={cx('pf-cap', index % 2 === 1 && 'pf-cap--flip')}
                aria-labelledby={`${item.id}-title`}
              >
                <div className="pf-cap__copy">
                  <p className="pf-cap__index">
                    <span className="pf-cap__num">{pad(index + 1)}</span>
                    {item.label}
                  </p>
                  <h3 className="ds-h3 pf-cap__name" id={`${item.id}-title`}>
                    {item.name}
                  </h3>
                  <p className="pf-cap__lead">{item.lead}</p>
                  <ul className="pf-cap__features">
                    {item.features.map((feature) => (
                      <li key={feature.title} className="pf-cap__feature">
                        <p className="ds-feature__title">
                          <FeatureIcon name={feature.icon} />
                          {feature.title}
                        </p>
                        <p className="ds-feature__body">{feature.body}</p>
                      </li>
                    ))}
                  </ul>
                  {item.link ? (
                    <TextLink href={item.link.href} className="pf-cap__link">
                      {item.link.label}
                    </TextLink>
                  ) : null}
                </div>
                <div className="ds-panel pf-cap__visual">
                  <CapabilityDiagram id={item.id} copy={capabilities.diagrams} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works: the closed loop. */}
      <section
        id="how-it-works"
        className="ds-section pf-loop"
        aria-labelledby="how-it-works-title"
      >
        <div className="ds-container">
          <SectionHead eyebrow={loop.eyebrow} title={loop.title} titleId="how-it-works-title" lead={loop.lead} />
          <div className="pf-loop__body">
            <figure className="pf-loop__figure">
              <LoopDiagram steps={loop.steps} diagram={loop.diagram} />
              <figcaption className="pf-loop__note">{loop.loopNote}</figcaption>
            </figure>
            <ol className="pf-loop__steps">
              {loop.steps.map((step, index) => (
                <li key={step.label} className="pf-loop__step">
                  <p className="pf-loop__label">
                    <span className="pf-loop__num">{pad(index + 1)}</span>
                    {step.label}
                  </p>
                  <div className="pf-loop__text">
                    <h3 className="ds-h4">{step.title}</h3>
                    <p className="pf-loop__body-text">{step.body}</p>
                    <p className="pf-loop__out">
                      <span className="ds-sr-only">{loop.outputLabel}: </span>
                      <span aria-hidden="true">→ </span>
                      {step.output}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Results: the benchmark numbers and one same-scale cost chart. */}
      <section id="results" className="ds-section ds-section--raised pf-results" aria-labelledby="results-title">
        <div className="ds-container">
          <SectionHead eyebrow={results.eyebrow} title={results.title} titleId="results-title" lead={results.lead} />
          <div className="pf-results__body">
            <dl className="pf-results__stats" aria-label={results.statsLabel}>
              {results.stats.map((stat) => (
                <div key={stat.value} className="ds-stat pf-results__stat">
                  <dt className="ds-stat__label">{stat.label}</dt>
                  <dd className="ds-stat__value">{stat.value}</dd>
                  <dd className="pf-results__source">{stat.source}</dd>
                </div>
              ))}
            </dl>
            <CostChart chart={results.chart} />
          </div>
        </div>
      </section>

      {/* The products that power the platform. */}
      <section
        id="products"
        className="ds-section pf-products"
        aria-labelledby="products-title"
      >
        <div className="ds-container">
          <SectionHead
            eyebrow={products.eyebrow}
            title={products.title}
            titleId="products-title"
            lead={products.lead}
          />
          <ul className="pf-products__list">
            {products.items.map((item) => (
              <li key={item.id} className="pf-products__item">
                <span className={`pf-products__logo pf-products__logo--${item.id}`}>
                  <img src={productLogos[item.id]} alt="" width={40} height={40} loading="lazy" decoding="async" />
                </span>
                <p className="pf-products__kicker">{item.kicker}</p>
                <h3 className="ds-h3 pf-products__name">{productNames[item.id].name}</h3>
                <p className="pf-products__body">{item.body}</p>
                <TextLink href={productPaths[item.id]} className="pf-products__link">
                  {item.cta}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} />
    </div>
  )
}
