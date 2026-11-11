import type { CSSProperties, ReactElement } from 'react'
import { docsUrl, getDepartmentPath } from '../../components/site/navigation'
import { ButtonLink, CtaBand, TextLink } from '../../components/site/ui'
import { panofyCopy, type PanofyVisualKind } from '../../i18n/messages/products/panofy'
import { siteText } from '../../i18n/messages/shared'
import type { PageProps } from '../types'
import {
  ControlsVisual,
  KnowledgeVisual,
  RolloutVisual,
  TeachingVisual,
  Workbench,
} from './panofy/visuals'
import { FeatureGrid } from './shared/Blocks'
import { CrossLinks } from './shared/CrossLinks'
import { BookIcon, LayersIcon, ShieldIcon, UsersIcon } from './shared/icons'
import { ProductHero } from './shared/ProductHero'
import { ProductPage, ProductSection } from './shared/ProductPage'
import { ProductTabs } from './shared/ProductTabs'
import './panofy.css'

const PANOFY_APP = 'https://panofy.ai/'

const moduleIcons: Record<PanofyVisualKind, ReactElement> = {
  knowledge: <BookIcon />,
  teaching: <LayersIcon />,
  controls: <ShieldIcon />,
  rollout: <UsersIcon />,
}

export function PanofyPage({ locale }: PageProps) {
  const t = panofyCopy[locale]
  const name = siteText[locale].products.panofy.name

  const visualFor = (kind: PanofyVisualKind) => {
    if (kind === 'knowledge') return <KnowledgeVisual copy={t.visuals.knowledge} />
    if (kind === 'teaching') return <TeachingVisual copy={t.visuals.teaching} />
    if (kind === 'controls') return <ControlsVisual copy={t.visuals.controls} />
    return <RolloutVisual copy={t.visuals.rollout} />
  }

  return (
    <ProductPage className="pg-panofy">
      <ProductHero
        product="panofy"
        productName={name}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        titleAccent={t.hero.titleAccent}
        lead={t.hero.body}
        actionsLabel={t.hero.actionsLabel}
        actions={
          <>
            <ButtonLink href={PANOFY_APP} variant="primary" size="lg" external>
              {t.hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="/resources/use-case-library" variant="secondary" size="lg">
              {t.hero.secondaryCta}
            </ButtonLink>
            <TextLink href={docsUrl} external className="pg-panofy__docs-link">
              {t.hero.docsCta}
            </TextLink>
          </>
        }
        metaLabel={t.hero.signalsLabel}
        meta={t.hero.signals}
        media={<Workbench copy={t.workbench} />}
      />

      <ProductSection id="product-focus" head={t.value} className="pg-panofy__value">
        <ol className="ds-features pg-panofy__bullets">
          {t.value.bullets.map((bullet, i) => (
            <li key={bullet} className="ds-feature">
              <span className="pg-product__feature-label">{String(i + 1).padStart(2, '0')}</span>
              <p className="pg-panofy__bullet">{bullet}</p>
            </li>
          ))}
        </ol>
      </ProductSection>

      <ProductSection id="capabilities" head={t.modules} tone="raised">
        <ProductTabs
          idBase="pf-modules"
          label={t.modules.tabsLabel}
          items={t.modules.items.map((item) => ({
            ...item,
            icon: moduleIcons[item.visual],
            visual: visualFor(item.visual),
          }))}
        />
      </ProductSection>

      <ProductSection id="training-loop" head={t.loop}>
        <ol className="pg-panofy__loop">
          {t.loop.steps.map((step, i) => (
            <li key={step.label} className="pg-panofy__step">
              {/* Only the timeline moves (the copy beside it stays still). */}
              <span
                className="pg-panofy__step-node"
                aria-hidden="true"
                data-animate="custom"
                style={{ '--i': i } as CSSProperties}
              >
                <span className="pg-panofy__step-dot" />
                <span className="pg-panofy__step-packet" />
              </span>
              <span className="pg-product__mono pg-panofy__step-label">
                {String(i + 1).padStart(2, '0')} · {step.label}
              </span>
              <h3 className="ds-h4">{step.title}</h3>
              <p className="pg-panofy__step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </ProductSection>

      <ProductSection id="department-fit" head={t.departments} tone="raised">
        <FeatureGrid
          cols={4}
          items={t.departments.fits.map((fit) => ({
            title: fit.team,
            body: fit.body,
            footer: <TextLink href={getDepartmentPath(fit.id)}>{fit.link}</TextLink>,
          }))}
        />
      </ProductSection>

      <CrossLinks locale={locale} current="panofy" />

      <CtaBand locale={locale} copy={t.cta} />
    </ProductPage>
  )
}
