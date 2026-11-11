import { describe, expect, it } from 'vitest'
import { docsUrl, getDepartmentPath } from '../../components/site/navigation'
import { locales } from '../../i18n/locales'
import { productCommonCopy } from '../../i18n/messages/products/common'
import { llamaFactoryCopy } from '../../i18n/messages/products/llamaFactory'
import { panofyCopy } from '../../i18n/messages/products/panofy'
import { penguinHarnessCopy } from '../../i18n/messages/products/penguinHarness'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../test/pageChecks'
import { LlamaFactoryPage } from './LlamaFactoryPage'
import { PanofyPage } from './PanofyPage'
import { PenguinHarnessPage } from './PenguinHarnessPage'
import llamaCss from './llama-factory.css?raw'
import panofyCss from './panofy.css?raw'
import penguinCss from './penguin-harness.css?raw'
import kitCss from './shared/product-kit.css?raw'

/** Visible text of server-rendered HTML (tags stripped, entities decoded). */
const textOf = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replaceAll('&#x27;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')

const count = (html: string, needle: string) => html.split(needle).length - 1

const expectSections = (html: string, ids: string[]) => {
  for (const id of ids) {
    expect(html, `section #${id}`).toMatch(new RegExp(`<section[^>]*id="${id}"[^>]*aria-labelledby="${id}-title"`))
    expect(html, `heading #${id}-title`).toContain(`id="${id}-title"`)
  }
}

describe.each(locales)('PenguinHarness page (%s)', (locale) => {
  const t = penguinHarnessCopy[locale]
  const html = renderHtml(<PenguinHarnessPage locale={locale} />)
  const text = textOf(html)

  it('passes the page basics and renders every section', () => {
    expectPageBasics(html)
    expectSections(html, [
      'hero',
      'proof',
      'compare',
      'how-it-works',
      'benchmark',
      'features',
      'in-the-box',
      'production',
      'install',
      'more-products',
      'get-started',
    ])
  })

  it('links to download, GitHub, docs and the other products', () => {
    for (const href of [
      'https://penguin.ooo/download',
      'https://github.com/Prism-Shadow/penguin-harness',
      'https://penguin.ooo/docs/',
      'https://www.producthunt.com/products/penguinharness',
      '/product/panofy',
      '/product/llama-factory',
    ])
      expect(html).toContain(`href="${href}"`)
  })

  it('renders the hero, proof numbers, tabs and features', () => {
    expect(text).toContain(t.hero.title)
    expect(html).toContain(`/products/penguin-harness/chat-${locale}.webp`)
    for (const stat of t.proof.stats) expect(text).toContain(stat.value)
    expect(count(html, 'role="tabpanel"')).toBe(t.how.tabs.length + t.install.tabs.length)
    for (const tab of t.how.tabs) {
      expect(text).toContain(tab.label)
      expect(text).toContain(tab.title)
    }
    for (const item of t.features.items) expect(text).toContain(item.title)
    for (const group of t.inTheBox.plugins) for (const plugin of group.items) expect(text).toContain(plugin)
    for (const model of ['DeepSeek V4', 'Kimi K3', 'GLM 5.3', 'Claude 5', 'Inkling']) expect(text).toContain(model)
    for (const item of t.production.cases) expect(text).toContain(item.title)
  })

  it('rebuilds the benchmark from the real numbers', () => {
    for (const value of ['66.67%', '53.33%', '71.25%', '86.25%', '$0.55', '$38.48', '$19.41', '$3.81', '$146.97', '$220.08'])
      expect(text).toContain(value)
    // Rival cost as a multiple of PenguinHarness: 70× and 35× (data), 39× and 58× (coding).
    for (const multiple of ['70×', '35×', '39×', '58×']) expect(text).toContain(multiple)
    expect(text).toContain('DeepSeek V4 Pro')
  })

  it('shows the install commands', () => {
    expect(text).toContain('curl -fsSL https://penguin.ooo/install.sh | sh')
    expect(text).toContain('irm https://penguin.ooo/install.ps1 | iex')
    expect(text).toContain('npm install -g @prismshadow/penguin-cli')
    expect(text).toContain('hiyouga/penguinharness:latest')
  })
})

describe.each(locales)('Panofy page (%s)', (locale) => {
  const t = panofyCopy[locale]
  const html = renderHtml(<PanofyPage locale={locale} />)
  const text = textOf(html)

  it('passes the page basics and renders every section', () => {
    expectPageBasics(html)
    expectSections(html, [
      'hero',
      'product-focus',
      'capabilities',
      'training-loop',
      'department-fit',
      'more-products',
      'get-started',
    ])
  })

  it('keeps every piece of the old page content', () => {
    expect(text).toContain(t.hero.title)
    expect(text).toContain(t.hero.body)
    for (const signal of t.hero.signals) expect(text).toContain(signal)
    for (const s of [...t.workbench.sources, ...t.workbench.outputs, ...t.workbench.status]) expect(text).toContain(s)
    expect(text).toContain(t.value.title)
    for (const bullet of t.value.bullets) expect(text).toContain(bullet)
    expect(count(html, 'role="tab"')).toBe(4)
    for (const item of t.modules.items) {
      expect(text).toContain(item.label)
      expect(text).toContain(item.title)
      expect(text).toContain(item.body)
      for (const point of item.points) expect(text).toContain(point.title)
    }
    for (const s of [...t.visuals.knowledge.inputs, ...t.visuals.knowledge.outputs]) expect(text).toContain(s)
    for (const s of t.visuals.teaching.feedback) expect(text).toContain(s)
    for (const row of t.visuals.controls.rows) expect(text).toContain(row.body)
    for (const role of t.visuals.rollout.roles) expect(text).toContain(role.agent)
    for (const step of t.loop.steps) {
      expect(text).toContain(step.title)
      expect(text).toContain(step.body)
    }
    for (const fit of t.departments.fits) expect(text).toContain(fit.body)
    expect(text).toContain(t.cta.title)
  })

  it('links to Panofy, the docs, use cases and department pages', () => {
    for (const href of [
      'https://panofy.ai/',
      docsUrl,
      '/resources/use-case-library',
      '/product/penguin-harness',
      '/product/llama-factory',
      ...t.departments.fits.map((fit) => getDepartmentPath(fit.id)),
    ])
      expect(html).toContain(`href="${href}"`)
  })
})

describe.each(locales)('LlamaFactory page (%s)', (locale) => {
  const t = llamaFactoryCopy[locale]
  const html = renderHtml(<LlamaFactoryPage locale={locale} />)
  const text = textOf(html)

  it('passes the page basics and renders every section', () => {
    expectPageBasics(html)
    expectSections(html, [
      'hero',
      'traction',
      'workflow',
      'capabilities',
      'methods',
      'models',
      'teams',
      'open-source',
      'more-products',
      'get-started',
    ])
  })

  it('uses the site-wide numbers and keeps the old content', () => {
    for (const value of ['70K+', '3M+', '500+', '13K+', '8K+', 'Apache-2.0']) expect(text).toContain(value)
    expect(text).not.toContain('100+')
    expect(text).toContain(t.hero.title)
    expect(text).toContain(t.proof.title)
    expect(count(html, 'role="tab"')).toBe(5)
    for (const step of t.workflow.steps) {
      expect(text).toContain(step.title)
      expect(text).toContain(step.body)
      expect(text).toContain(step.stack)
    }
    expect(text).toContain(t.workflow.stackLabel)
    for (const item of t.capabilities.items) expect(text).toContain(item.title)
    for (const item of t.teams.audience) expect(text).toContain(item.body)
    for (const card of t.open.cards) expect(text).toContain(card.title)
    for (const item of t.open.architectureItems) expect(text).toContain(item)
    expect(text).toContain(t.cta.title)
  })

  it('enriches the page with README facts', () => {
    // 8 training approaches × 6 tuning methods, all supported.
    expect(count(html, 'class="pg-llama__cell"')).toBe(48)
    expect(count(html, 'class="pg-llama__family"')).toBe(16)
    for (const fact of ['Qwen/Qwen3-4B-Instruct-2507', 'llamafactory-cli export', 'GaLore', 'FlashAttention-2', '120 GB', '6 GB'])
      expect(text).toContain(fact)
  })

  it('links to GitHub, the WebUI anchor and the other products', () => {
    for (const href of [
      'https://github.com/hiyouga/LlamaFactory',
      '#workflow',
      '#llama-webui',
      '/product/penguin-harness',
      '/product/panofy',
    ])
      expect(html).toContain(`href="${href}"`)
    expect(html).toContain('id="llama-webui"')
  })
})

describe('product page copy', () => {
  it.each([
    ['common', productCommonCopy],
    ['penguinHarness', penguinHarnessCopy],
    ['panofy', panofyCopy],
    ['llamaFactory', llamaFactoryCopy],
  ] as const)('%s: zh has the same shape as en and no empty strings', (_name, copy) => {
    expect(copyShape(copy.zh)).toEqual(copyShape(copy.en))
    for (const locale of locales)
      for (const [path, value] of collectStrings(copy[locale]))
        expect(value.trim(), `${locale}.${path}`).not.toBe('')
  })

  it('keeps every accent phrase inside its title', () => {
    for (const locale of locales) {
      const heads = [
        penguinHarnessCopy[locale].hero,
        penguinHarnessCopy[locale].compare,
        penguinHarnessCopy[locale].how,
        penguinHarnessCopy[locale].benchmark,
        penguinHarnessCopy[locale].features,
        penguinHarnessCopy[locale].inTheBox,
        penguinHarnessCopy[locale].production,
        penguinHarnessCopy[locale].install,
        penguinHarnessCopy[locale].cta,
        panofyCopy[locale].hero,
        panofyCopy[locale].value,
        panofyCopy[locale].modules,
        panofyCopy[locale].loop,
        panofyCopy[locale].departments,
        panofyCopy[locale].cta,
        llamaFactoryCopy[locale].hero,
        llamaFactoryCopy[locale].proof,
        llamaFactoryCopy[locale].workflow,
        llamaFactoryCopy[locale].capabilities,
        llamaFactoryCopy[locale].methods,
        llamaFactoryCopy[locale].models,
        llamaFactoryCopy[locale].teams,
        llamaFactoryCopy[locale].open,
        llamaFactoryCopy[locale].cta,
      ]
      for (const head of heads) expect(head.title, head.title).toContain(head.titleAccent)
    }
  })

  it('never uses bold type in the product stylesheets', () => {
    for (const css of [kitCss, penguinCss, panofyCss, llamaCss]) {
      expect(css).not.toMatch(/font-weight:\s*(600|700|800|900|bold)/)
    }
  })
})
