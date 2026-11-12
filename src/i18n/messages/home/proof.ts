import type { Locale } from '../../locales'

/** One headline result. */
export type ProofStat = {
  value: string
  label: string
  /** Who or what the number comes from, rendered in mono. */
  source: string
}

/** One customer in the quiet name strip. */
export type ProofCustomer = {
  name: string
  /** What PrismShadow does for them, in a few words. */
  detail: string
}

export type ProofCopy = {
  eyebrow: string
  title: string
  body: string
  statsLabel: string
  /** Exactly four headline results. */
  stats: ProofStat[]
  customersLabel: string
  /** All five customers. */
  customers: ProofCustomer[]
  cta: string
}

export const proofCopy = {
  en: {
    eyebrow: 'Results',
    title: 'Results you can put a number on.',
    body: 'Higher accuracy, lower cost and models running in production, in finance, research, manufacturing, pharma and healthcare.',
    statsLabel: 'Headline results',
    stats: [
      {
        value: '90%+',
        label: 'accuracy on specialized enterprise tasks',
        source: 'Self-Evolving Agent Platform',
      },
      {
        value: '~1/30',
        label: 'of Claude Code’s model-call cost on identical test tasks',
        source: 'Head-to-head benchmark',
      },
      {
        value: '+8.2%',
        label: 'composite agent success score across 30 real office-agent scenarios, at lower cost',
        source: 'Cobo Wallet',
      },
      {
        value: '70B',
        label: 'parameter social causal-reasoning LLM, trained and optimized with PrismShadow',
        source: 'Subconscious.ai',
      },
    ],
    customersLabel: 'Customers',
    customers: [
      { name: 'Cobo Wallet', detail: 'Self-evolving office agents' },
      { name: 'Subconscious.ai', detail: '70B LLM training and optimization' },
      { name: 'Semiconductor manufacturer', detail: 'Office and R&D test automation' },
      { name: 'Pharmaceutical company', detail: 'AutoResearch for drug R&D' },
      { name: 'Health-screening company', detail: '14B medical model, on-prem' },
    ],
    cta: 'See customer stories',
  },
  zh: {
    eyebrow: '成果',
    title: '成果，用数字说话。',
    body: '更高的准确率、更低的成本、在生产环境中运行的模型，覆盖金融、科研、制造、制药与医疗。',
    statsLabel: '核心成果',
    stats: [
      {
        value: '90%+',
        label: '企业专项任务准确率',
        source: '企业级自进化 Agent 平台',
      },
      {
        value: '~1/30',
        label: '相同测试任务下，相对 Claude Code 的模型调用成本',
        source: '同任务对比测试',
      },
      {
        value: '+8.2%',
        label: '30 个真实办公 Agent 场景中，Agent 成功率综合评分提升，成本更低',
        source: 'Cobo Wallet',
      },
      {
        value: '70B',
        label: '参数社会因果推理 LLM，由 PrismShadow 提供训练与优化',
        source: 'Subconscious.ai',
      },
    ],
    customersLabel: '客户',
    customers: [
      { name: 'Cobo Wallet', detail: '自进化办公 Agent' },
      { name: 'Subconscious.ai', detail: '70B 大模型训练与优化' },
      { name: '某半导体制造企业', detail: '办公与研发测试自动化' },
      { name: '某制药企业', detail: '药物研发 AutoResearch' },
      { name: '某健康体检企业', detail: '14B 医学模型本地部署' },
    ],
    cta: '查看客户案例',
  },
} satisfies Record<Locale, ProofCopy>
