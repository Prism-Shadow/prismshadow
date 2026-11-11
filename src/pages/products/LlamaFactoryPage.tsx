import type { ReactElement } from 'react'
import { GithubIcon } from '../../components/site/icons'
import { ButtonLink, CtaBand, Eyebrow } from '../../components/site/ui'
import { renderAccent } from '../../components/site/utils'
import { productCommonCopy } from '../../i18n/messages/products/common'
import { llamaFactoryCopy, type LlamaStepId } from '../../i18n/messages/products/llamaFactory'
import { siteText } from '../../i18n/messages/shared'
import type { PageProps } from '../types'
import { llamaLinks, modelFamilies } from './llama/data'
import {
  Architecture,
  DatasetVisual,
  EvaluationVisual,
  ExportVisual,
  LlamaBoard,
  MethodsMatrix,
  MethodVisual,
  ModelVisual,
} from './llama/visuals'
import { FeatureGrid } from './shared/Blocks'
import { CrossLinks } from './shared/CrossLinks'
import {
  ChartIcon,
  CubeIcon,
  DatabaseIcon,
  GaugeIcon,
  LayersIcon,
  PlugIcon,
  SlidersIcon,
  SparkIcon,
  TerminalIcon,
  UploadIcon,
  UsersIcon,
  BranchIcon,
  ServerIcon,
  BookIcon,
} from './shared/icons'
import { ProductHero, ProofRow } from './shared/ProductHero'
import { ProductPage, ProductSection } from './shared/ProductPage'
import { ProductTabs } from './shared/ProductTabs'
import './llama-factory.css'

const stepIcons: Record<LlamaStepId, ReactElement> = {
  model: <CubeIcon />,
  dataset: <DatabaseIcon />,
  method: <SlidersIcon />,
  evaluation: <ChartIcon />,
  export: <UploadIcon />,
}

const capabilityIcons = [
  <TerminalIcon key="ui" />,
  <SparkIcon key="eff" />,
  <DatabaseIcon key="data" />,
  <GaugeIcon key="eval" />,
  <PlugIcon key="open" />,
  <ServerIcon key="infer" />,
]

const teamIcons = [<CubeIcon key="eng" />, <BookIcon key="res" />, <LayersIcon key="app" />, <UsersIcon key="plat" />]

const openIcons = [<BookIcon key="lic" />, <UsersIcon key="com" />, <BranchIcon key="dev" />, <PlugIcon key="ext" />]

export function LlamaFactoryPage({ locale }: PageProps) {
  const t = llamaFactoryCopy[locale]
  const common = productCommonCopy[locale]
  const name = siteText[locale].products['llama-factory'].name
  const workflow = t.workflow

  const visualFor = (step: (typeof workflow.steps)[number]) => {
    switch (step.id) {
      case 'model':
        return <ModelVisual workflow={workflow} step={step} />
      case 'dataset':
        return <DatasetVisual workflow={workflow} step={step} />
      case 'method':
        return <MethodVisual workflow={workflow} step={step} />
      case 'evaluation':
        return <EvaluationVisual workflow={workflow} step={step} />
      default:
        return (
          <ExportVisual
            workflow={workflow}
            step={step}
            copyLabel={common.terminal.copy}
            copiedLabel={common.terminal.copied}
          />
        )
    }
  }

  return (
    <ProductPage className="pg-llama">
      <ProductHero
        product="llama-factory"
        productName={name}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        titleAccent={t.hero.titleAccent}
        lead={t.hero.body}
        actions={
          <>
            <ButtonLink href={llamaLinks.github} variant="primary" size="lg" external>
              <GithubIcon />
              {t.hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="#workflow" variant="secondary" size="lg">
              {t.hero.secondaryCta}
            </ButtonLink>
          </>
        }
        metaLabel={t.hero.metaLabel}
        meta={t.hero.meta}
        mediaId="llama-webui"
        media={<LlamaBoard copy={t.hero.board} />}
      />

      <ProductSection id="traction" head={t.proof} className="pg-product__proof">
        <ProofRow stats={t.proof.stats} note={t.proof.usedBy} />
      </ProductSection>

      <ProductSection id="workflow" head={workflow} tone="raised">
        <ProductTabs
          idBase="lf-workflow"
          label={workflow.tabsLabel}
          items={workflow.steps.map((step) => ({
            ...step,
            icon: stepIcons[step.id],
            visual: visualFor(step),
          }))}
        />
      </ProductSection>

      <ProductSection id="capabilities" head={t.capabilities}>
        <FeatureGrid items={t.capabilities.items.map((item, i) => ({ ...item, icon: capabilityIcons[i] }))} />
      </ProductSection>

      <ProductSection id="methods" head={t.methods} tone="raised">
        <div className="ds-grid pg-llama__methods">
          <div className="pg-llama__methods-side">
            <div>
              <h3 className="pg-product__subhead">{t.methods.tricksTitle}</h3>
              <ul className="pg-llama__names">
                {t.methods.tricks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="pg-product__subhead">{t.methods.algorithmsTitle}</h3>
              <ul className="pg-llama__names">
                {t.methods.algorithms.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <MethodsMatrix copy={t.methods} />
        </div>
      </ProductSection>

      <ProductSection id="models" head={t.models} tone="paper">
        <ul className="pg-llama__families" aria-label={t.models.familiesLabel}>
          {modelFamilies.map((family) => (
            <li key={family.name} className="pg-llama__family">
              <span className="pg-llama__family-name">{family.name}</span>
              <span className="pg-llama__family-sizes">{family.sizes}</span>
            </li>
          ))}
        </ul>
        <div className="pg-llama__dayn">
          <p>{t.models.dayZero}</p>
          <p>{t.models.dayOne}</p>
        </div>
      </ProductSection>

      <ProductSection id="teams" head={t.teams}>
        <FeatureGrid cols={4} items={t.teams.audience.map((item, i) => ({ ...item, icon: teamIcons[i] }))} />
      </ProductSection>

      <section id="open-source" className="ds-section ds-section--raised" aria-labelledby="open-source-title">
        <div className="ds-container ds-grid pg-llama__open">
          <div className="pg-llama__open-copy">
            <Eyebrow>{t.open.eyebrow}</Eyebrow>
            <h2 id="open-source-title" className="ds-h2">
              {renderAccent(t.open.title, t.open.titleAccent)}
            </h2>
            <p className="ds-lead">{t.open.lead}</p>
            <FeatureGrid
              cols={2}
              className="pg-llama__open-cards"
              items={t.open.cards.map((card, i) => ({ ...card, icon: openIcons[i] }))}
            />
          </div>
          <div className="pg-llama__open-visual">
            <Architecture copy={t.open} />
          </div>
        </div>
      </section>

      <CrossLinks locale={locale} current="llama-factory" />

      <CtaBand locale={locale} copy={t.cta} />
    </ProductPage>
  )
}
