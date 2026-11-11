import { GithubIcon } from '../../components/site/icons'
import { ButtonLink, CtaBand, Eyebrow, TextLink } from '../../components/site/ui'
import { cx, renderAccent } from '../../components/site/utils'
import { productCommonCopy } from '../../i18n/messages/products/common'
import { penguinHarnessCopy } from '../../i18n/messages/products/penguinHarness'
import { siteText } from '../../i18n/messages/shared'
import type { PageProps } from '../types'
import { installSnippets, penguinLinks } from './penguin/data'
import { ScreenGallery } from './penguin/gallery'
import {
  BenchmarkChart,
  BuildVisual,
  CompareVisual,
  DeployVisual,
  EvaluateVisual,
  EvolveVisual,
  HeroShot,
  ModelTable,
  PluginList,
} from './penguin/visuals'
import { FeatureGrid } from './shared/Blocks'
import { CrossLinks } from './shared/CrossLinks'
import {
  BookIcon,
  BranchIcon,
  ChartIcon,
  ChatIcon,
  ClockIcon,
  GaugeIcon,
  LoopIcon,
  ServerIcon,
  SparkIcon,
  TraceIcon,
  TrophyIcon,
  UsersIcon,
  CubeIcon,
} from './shared/icons'
import { ProductHero, ProofRow } from './shared/ProductHero'
import { ProductPage, ProductSection } from './shared/ProductPage'
import { ProductTabs } from './shared/ProductTabs'
import { Terminal } from './shared/Terminal'
import './penguin-harness.css'

const tabIcons = [<SparkIcon key="b" />, <GaugeIcon key="e" />, <LoopIcon key="v" />, <ServerIcon key="d" />]

const featureIcons = [
  <ChatIcon key="chat" />,
  <CubeIcon key="hub" />,
  <BookIcon key="skills" />,
  <ClockIcon key="cron" />,
  <BranchIcon key="sub" />,
  <ChartIcon key="cost" />,
  <TraceIcon key="trace" />,
  <TrophyIcon key="eval" />,
  <UsersIcon key="users" />,
]

// Which production stats are improvements (signal) versus the manual baseline.
const productionSignal = [
  [true, false],
  [true, true],
]

export function PenguinHarnessPage({ locale }: PageProps) {
  const t = penguinHarnessCopy[locale]
  const common = productCommonCopy[locale]
  const name = siteText[locale].products['penguin-harness'].name
  const v = t.how.visuals

  const tabVisuals = [
    <BuildVisual key="build" locale={locale} copy={v.build} />,
    <EvaluateVisual key="evaluate" copy={v.evaluate} />,
    <EvolveVisual key="evolve" copy={v.evolve} />,
    <DeployVisual key="deploy" copy={v.deploy} />,
  ]

  return (
    <ProductPage className="pg-penguin">
      <ProductHero
        product="penguin-harness"
        productName={name}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        titleAccent={t.hero.titleAccent}
        lead={t.hero.lead}
        actions={
          <>
            <ButtonLink href={penguinLinks.download} variant="primary" size="lg" external>
              {t.hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={penguinLinks.github} variant="secondary" size="lg" external>
              <GithubIcon />
              {t.hero.secondaryCta}
            </ButtonLink>
            <TextLink href={penguinLinks.docs} external className="pg-penguin__docs-link">
              {t.hero.docsCta}
            </TextLink>
          </>
        }
        metaLabel={t.hero.metaLabel}
        meta={[
          ...t.hero.meta,
          <a key="ph" href={penguinLinks.productHunt} target="_blank" rel="noreferrer">
            {t.hero.productHunt}
          </a>,
        ]}
        media={<HeroShot locale={locale} label={t.hero.windowLabel} alt={t.hero.imageAlt} />}
      />

      <section
        id="proof"
        className="ds-section ds-section--tight pg-product__proof"
        aria-labelledby="proof-title"
      >
        <div className="ds-container">
          <h2 id="proof-title" className="ds-sr-only">
            {t.proof.title}
          </h2>
          <ProofRow stats={t.proof.stats} />
        </div>
      </section>

      <ProductSection id="compare" head={t.compare}>
        <CompareVisual sides={t.compare.sides} />
      </ProductSection>

      <ProductSection id="how-it-works" head={t.how} tone="raised">
        <ProductTabs
          idBase="ph-how"
          label={t.how.tabsLabel}
          items={t.how.tabs.map((tab, i) => ({ ...tab, icon: tabIcons[i], visual: tabVisuals[i] }))}
        />
      </ProductSection>

      <ProductSection id="benchmark" head={t.benchmark}>
        <BenchmarkChart copy={t.benchmark} />
      </ProductSection>

      <ProductSection id="features" head={t.features} tone="raised">
        <ScreenGallery locale={locale} copy={t.features.gallery} />
        <FeatureGrid items={t.features.items.map((item, i) => ({ ...item, icon: featureIcons[i] }))} />
      </ProductSection>

      <ProductSection id="in-the-box" head={t.inTheBox}>
        <div className="ds-grid pg-penguin__in-box">
          <PluginList title={t.inTheBox.pluginsTitle} plugins={t.inTheBox.plugins} />
          <ModelTable copy={t.inTheBox} />
        </div>
      </ProductSection>

      <ProductSection id="production" head={t.production} tone="paper">
        <ul className="pg-penguin__cases">
          {t.production.cases.map((item, c) => (
            <li key={item.title} className="pg-penguin__case">
              <span className="pg-penguin__case-sector">{item.sector}</span>
              <h3 className="ds-h3">{item.title}</h3>
              <dl className="pg-penguin__case-stats">
                {item.stats.map((stat, s) => (
                  <div key={stat.label} className="pg-penguin__case-stat">
                    <dt className={cx('pg-penguin__case-value', productionSignal[c]?.[s] && 'is-signal')}>
                      {stat.value}
                    </dt>
                    <dd className="pg-penguin__case-label">{stat.label}</dd>
                  </div>
                ))}
              </dl>
              <p className="pg-penguin__case-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </ProductSection>

      <section id="install" className="ds-section" aria-labelledby="install-title">
        <div className="ds-container ds-grid pg-penguin__install">
          <div className="pg-penguin__install-copy">
            <Eyebrow>{t.install.eyebrow}</Eyebrow>
            <h2 id="install-title" className="ds-h2">
              {renderAccent(t.install.title, t.install.titleAccent)}
            </h2>
            <p className="ds-lead">{t.install.lead}</p>
            <h3 className="ds-sr-only">{t.install.requirementsLabel}</h3>
            <dl className="pg-penguin__reqs">
              {t.install.requirements.map((req) => (
                <div key={req.label} className="pg-penguin__req">
                  <dt>{req.label}</dt>
                  <dd>{req.value}</dd>
                </div>
              ))}
            </dl>
            <div className="ds-actions">
              <ButtonLink href={penguinLinks.download} variant="primary" external>
                {t.install.downloadCta}
              </ButtonLink>
              <ButtonLink href={penguinLinks.docker} variant="secondary" external>
                {t.install.dockerCta}
              </ButtonLink>
            </div>
          </div>
          <Terminal
            idBase="ph-install"
            className="pg-penguin__install-terminal"
            label={t.install.terminalLabel}
            copyLabel={common.terminal.copy}
            copiedLabel={common.terminal.copied}
            tabs={installSnippets.map((lines, i) => ({
              id: `t${i}`,
              label: t.install.tabs[i],
              lines: lines.map((line) => ({
                cmd: line.cmd,
                comment: line.comment ? t.install.comments[line.comment] : undefined,
              })),
            }))}
          />
        </div>
      </section>

      <CrossLinks locale={locale} current="penguin-harness" />

      <CtaBand locale={locale} copy={t.cta} />
    </ProductPage>
  )
}
