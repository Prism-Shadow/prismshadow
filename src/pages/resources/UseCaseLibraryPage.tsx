import type { CSSProperties } from 'react'
import { ButtonLink, CtaBand, Eyebrow, PageHero, SectionHead } from '../../components/site/ui'
import { useCaseLibraryPageCopy } from '../../i18n/messages/useCaseLibrary'
import { FlowSchematic } from '../solutions/departments/FlowSchematic'
import { AccentPhrase, Phrases } from '../solutions/departments/Phrases'
import type { PageProps } from '../types'
import { BenchmarkExplorer } from './use-case-library/BenchmarkExplorer'
import './use-case-library/use-case-library.css'

export function UseCaseLibraryPage({ locale }: PageProps) {
  const t = useCaseLibraryPageCopy[locale]

  return (
    <div className="pg-usecases">
      <PageHero
        id="hero"
        eyebrow={t.hero.eyebrow}
        title={<AccentPhrase text={t.hero.title} accent={t.hero.titleAccent} />}
        lead={t.hero.body}
        actions={
          <>
            <ButtonLink href="/contact" arrow>
              {t.hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="#benchmarks" variant="secondary">
              {t.hero.secondaryCta}
            </ButtonLink>
          </>
        }
        media={<Atlas locale={locale} />}
      />

      <section id="results" className="ds-section" aria-labelledby="results-title">
        <div className="ds-container">
          <SectionHead
            eyebrow={t.highlights.eyebrow}
            title={<Phrases text={t.highlights.title} />}
            titleId="results-title"
            lead={t.highlights.body}
          />
          <ul className="ds-features ds-features--4 pg-usecases__highlights">
            {t.highlights.items.map((item) => (
              <li key={item.metric} className="ds-feature ds-stat">
                <span className="ds-stat__value">{item.metric}</span>
                <span className="ds-stat__label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeaturedCase locale={locale} />

      <section id="benchmarks" className="ds-section" aria-labelledby="benchmarks-title">
        <div className="ds-container">
          <div className="ds-section-head pg-usecases__bench-head">
            <div className="ds-section-head__main">
              <Eyebrow>{t.benchmarks.eyebrow}</Eyebrow>
              <h2 className="ds-h2" id="benchmarks-title">
                <Phrases text={t.benchmarks.title} />
              </h2>
            </div>
            <dl className="ds-section-head__aside pg-usecases__legend">
              <div>
                <dt>
                  <span className="pg-usecases__status-dot" data-kind="verified" aria-hidden="true" />
                  {t.verified.title}
                </dt>
                <dd>{t.verified.body}</dd>
              </div>
              <div>
                <dt>
                  <span className="pg-usecases__status-dot" data-kind="simulated" aria-hidden="true" />
                  {t.simulated.title}
                </dt>
                <dd>{t.simulated.body}</dd>
              </div>
            </dl>
          </div>
          <BenchmarkExplorer locale={locale} />
          <p className="pg-usecases__disclaimer">{t.disclaimer}</p>
        </div>
      </section>

      <section
        id="how-panofy-learns"
        className="ds-section ds-section--raised"
        aria-labelledby="how-panofy-learns-title"
      >
        <div className="ds-container">
          <SectionHead
            eyebrow={t.learning.eyebrow}
            title={<Phrases text={t.learning.title} />}
            titleId="how-panofy-learns-title"
            lead={t.learning.body}
          />
          <ol className="ds-features ds-features--4 pg-usecases__learn">
            {t.learning.steps.map((step, i) => (
              <li key={step.title} className="ds-feature">
                <span className="pg-usecases__index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ds-feature__title">{step.title}</h3>
                <p className="ds-feature__body">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="pg-usecases__message">{t.learning.message}</p>
        </div>
      </section>

      <section id="workflow-types" className="ds-section" aria-labelledby="workflow-types-title">
        <div className="ds-container">
          <SectionHead
            variant="stack"
            eyebrow={t.workflowTypes.eyebrow}
            title={<Phrases text={t.workflowTypes.title} />}
            titleId="workflow-types-title"
          />
          <ul className="pg-usecases__types">
            {t.workflowTypes.items.map((item) => (
              <li key={item.title} className="pg-usecases__type">
                <h3 className="ds-h4">{item.title}</h3>
                <p className="pg-usecases__type-body">{item.body}</p>
                <p className="pg-usecases__type-examples">{item.examples}</p>
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
          primary: { label: t.final.primaryCta, href: '/contact' },
          secondary: { label: t.final.secondaryCta, href: '/product/panofy' },
        }}
      />
    </div>
  )
}

function Atlas({ locale }: { locale: PageProps['locale'] }) {
  const a = useCaseLibraryPageCopy[locale].atlas

  return (
    <div className="ds-panel ds-panel--dots pg-usecases__atlas">
      <div className="pg-usecases__atlas-head">
        <span className="pg-usecases__label">{a.label}</span>
        <span className="pg-usecases__atlas-title">{a.title}</span>
      </div>
      <FlowSchematic
        variant="card"
        label={a.ariaLabel}
        inputTone="cyan"
        outputTone="green"
        inputs={a.cards.map((card) => (
          <>
            <span className="pg-usecases__atlas-kicker">{card.label}</span>
            <span className="pg-usecases__atlas-card-title">{card.title}</span>
            <span className="pg-usecases__atlas-metric">{card.metric}</span>
          </>
        ))}
        core={
          <>
            <span className="pg-usecases__atlas-kicker">{a.engine.label}</span>
            <span className="pg-usecases__atlas-core-title">{a.engine.title}</span>
            <span className="pg-usecases__atlas-core-body">{a.engine.body}</span>
          </>
        }
        outputs={a.metrics.map((metric) => (
          <>
            <span className="pg-usecases__atlas-value">{metric.value}</span>
            <span className="pg-usecases__atlas-metric">{metric.label}</span>
          </>
        ))}
      />
      <ul className="pg-usecases__atlas-foot">
        {a.footer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function FeaturedCase({ locale }: { locale: PageProps['locale'] }) {
  const f = useCaseLibraryPageCopy[locale].featuredCase

  return (
    <section id="featured-case" className="ds-section ds-section--raised" aria-labelledby="featured-case-title">
      <div className="ds-container">
        <SectionHead eyebrow={f.eyebrow} title={<Phrases text={f.title} />} titleId="featured-case-title" lead={f.subtitle} />

        <div className="pg-usecases__case">
          <div className="pg-usecases__case-copy">
            <span className="pg-usecases__label">{f.topline.label}</span>
            <h3 className="ds-h3">{f.topline.title}</h3>
            <p className="ds-small">{f.summary}</p>
            {/* Motion: a signal runs down the rail to the final step, which pings. */}
            <ol className="pg-usecases__pipeline" aria-label={f.pipelineLabel} data-animate="custom">
              {f.pipeline.map((step, i) => {
                const last = i === f.pipeline.length - 1
                return (
                  <li key={step} data-last={last || undefined} style={{ '--k': i } as CSSProperties}>
                    {step}
                    {last ? null : <span className="pg-usecases__spark" aria-hidden="true" />}
                  </li>
                )
              })}
            </ol>
          </div>
          <ul className="pg-usecases__case-metrics">
            {f.metrics.map((metric) => (
              <li key={metric.label} className="ds-stat">
                <span className="ds-stat__value">{metric.value}</span>
                <span className="ds-stat__label">{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pg-usecases__scenarios">
          {f.scenarios.map((scenario) => (
            <article key={scenario.title} className="pg-usecases__scenario">
              <span className="ds-tag ds-tag--neutral">{scenario.label}</span>
              <h3 className="ds-h3">{scenario.title}</h3>
              <p className="ds-small">{scenario.body}</p>
              <ul className="ds-list">
                {scenario.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="pg-usecases__safety">{f.safety}</p>
      </div>
    </section>
  )
}
