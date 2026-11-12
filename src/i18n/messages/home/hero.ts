import type { Locale } from '../../locales'

/** Labels for the hero's evolution frontier. */
export type HeroVisualCopy = {
  /** Text alternative for the whole visual. */
  ariaLabel: string
  /** Exactly five generation labels; the last one is the latest generation. */
  generations: string[]
  /** The one number on the visual, at the latest generation. */
  result: string
  /** What the number measures, set quietly after it. */
  metric: string
}

export type HeroCopy = {
  /** Full headline; `titleAccent` is the part set in the accent color. */
  title: string
  titleAccent: string
  body: string
  primaryCta: string
  secondaryCta: string
  visual: HeroVisualCopy
}

export const heroCopy = {
  en: {
    title: 'Enterprise AI that gets better with every task',
    titleAccent: 'better with every task',
    body: 'PrismShadow brings data production, model training and agent self‑evolution together. The AI workflows and AutoResearch systems you build with us keep learning from real work, so labor costs fall and output rises.',
    primaryCta: 'Book a demo',
    secondaryCta: 'See the results',
    visual: {
      ariaLabel:
        'Illustration of agent self-evolution: a frontier of solved evaluation tasks rises with every generation of an Agent Team, from generation 1 to generation N, where accuracy passes 90%.',
      generations: ['gen 1', 'gen 2', 'gen 3', 'gen 4', 'gen N'],
      result: '90%+',
      metric: 'accuracy',
    },
  },
  zh: {
    title: '越用越聪明的\u200b企业\u00a0AI',
    titleAccent: '越用越聪明',
    body: 'PrismShadow 把数据生产、模型训练和 Agent 自进化整合在一起，帮您构建 AI 工作流与 AutoResearch 自主科研系统，并让它们在真实业务中持续优化，降低人力成本，提高产出能力。',
    primaryCta: '预约演示',
    secondaryCta: '查看客户成果',
    visual: {
      ariaLabel:
        'Agent 自进化示意：Agent Team 每进化一代，已解决的评估任务边界就向上推进一步，从第 1 代到第 N 代，准确率突破 90%。',
      generations: ['第 1 代', '第 2 代', '第 3 代', '第 4 代', '第 N 代'],
      result: '90%+',
      metric: '准确率',
    },
  },
} satisfies Record<Locale, HeroCopy>
