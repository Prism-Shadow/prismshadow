import type { Locale } from '../../locales'
import type { ProductId } from '../shared'

export type HomeProduct = {
  id: ProductId
  /** Short mono line over the product name. */
  kicker: string
  body: string
  cta: string
}

export type ProductsCopy = {
  eyebrow: string
  title: string
  body: string
  /** Product order follows `productOrder`; names come from the shared site copy. */
  items: HomeProduct[]
}

export const productsCopy = {
  en: {
    eyebrow: 'Products',
    title: 'Start with the product that fits your team.',
    body: 'PenguinHarness lets agents build and evolve agents. Panofy trains expert agents on your team’s own work. LlamaFactory fine-tunes open models with zero code.',
    items: [
      {
        id: 'penguin-harness',
        kicker: 'Agent self-evolution engine',
        body: 'Open-source, local-first multi-agent app platform where agents build, evaluate, optimize and deploy agents.',
        cta: 'Explore PenguinHarness',
      },
      {
        id: 'panofy',
        kicker: 'Expert agents',
        body: 'Train expert agents from your team’s own work.',
        cta: 'Explore Panofy',
      },
      {
        id: 'llama-factory',
        kicker: 'Zero-code fine-tuning',
        body: 'Fine-tune and customize open models with zero code.',
        cta: 'Explore LlamaFactory',
      },
    ],
  },
  zh: {
    eyebrow: '产品',
    title: '从最适合您团队的产品开始。',
    body: 'PenguinHarness 让 Agent 构建并进化 Agent，Panofy 用您团队自己的工作训练专家级 Agent，LlamaFactory 零代码微调开源模型。',
    items: [
      {
        id: 'penguin-harness',
        kicker: 'Agent 自进化引擎',
        body: '开源、本地优先的多 Agent 应用平台，由 Agent 构建、评估、优化并部署 Agent。',
        cta: '了解 PenguinHarness',
      },
      {
        id: 'panofy',
        kicker: '专家级 Agent',
        body: '用团队自己的工作，训练专家级 Agent。',
        cta: '了解 Panofy',
      },
      {
        id: 'llama-factory',
        kicker: '零代码微调',
        body: '零代码微调与定制开源大模型。',
        cta: '了解 LlamaFactory',
      },
    ],
  },
} satisfies Record<Locale, ProductsCopy>
