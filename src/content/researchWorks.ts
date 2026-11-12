/*
 * The team's published research and open-source work, listed on the blog
 * index ("Papers and open source"). Titles stay in English in both locales;
 * the one-line summaries are localized. Dates are year-month: the arXiv
 * submission, the public launch, or the first npm release.
 */
import type { Locale } from '../i18n/locales'

export type ResearchWorkKind = 'paper' | 'code' | 'protocol'

/** External link kinds; labels come from the blog copy (`works.links`). */
export type ResearchLinkKind = 'arxiv' | 'github' | 'docs' | 'website'

export type ResearchWork = {
  id: string
  kind: ResearchWorkKind
  title: string
  /** YYYY-MM */
  date: string
  summary: Record<Locale, string>
  links: Array<{ kind: ResearchLinkKind; href: string }>
  /** Blog post that covers this work, when there is one. */
  post?: string
}

export const researchWorks: ResearchWork[] = [
  {
    id: 'rsi-survey',
    kind: 'paper',
    title: 'From Existing Methods to New Research Ideas: Two Perspectives on Recursive Self-Improvement',
    date: '2026-10',
    summary: {
      en: 'A survey of 140 RSI works: a taxonomy of nine design dimensions, and the deep-learning ideas that RSI methods map onto one to one.',
      zh: '梳理 140 篇 RSI 工作：九个设计维度的统一分类，并把 RSI 方法与深度学习中的概念一一对照。',
    },
    links: [
      { kind: 'arxiv', href: 'https://arxiv.org/abs/2610.14625' },
      { kind: 'github', href: 'https://github.com/Prism-Shadow/awesome-rsi' },
    ],
    post: '/blog/recursive-self-improvement-framework-survey-benchmark',
  },
  {
    id: 'gdpevo',
    kind: 'paper',
    title: 'GDPevo: Evaluating Agent Self-Evolution on Real Business Tasks',
    date: '2026-08',
    summary: {
      en: '240 enterprise tasks across six business domains, with held-out test tasks so that every gain can be traced to self-evolution.',
      zh: '覆盖 6 大企业场景的 240 个任务，以训练集与留出测试集划分，让每一分提升都可归因于自进化。',
    },
    links: [
      { kind: 'arxiv', href: 'https://arxiv.org/abs/2608.03764' },
      { kind: 'github', href: 'https://github.com/Prism-Shadow/GDPevo' },
    ],
    post: '/blog/recursive-self-improvement-framework-survey-benchmark',
  },
  {
    id: 'penguin-harness',
    kind: 'code',
    title: 'PenguinHarness',
    date: '2026-07',
    summary: {
      en: 'The open-source framework for agent self-evolution: every RSI algorithm and Benchmark is a plugin, on any model.',
      zh: '开源的 Agent 自进化框架：所有 RSI 算法与 Benchmark 都是插件，可搭配任意模型。',
    },
    links: [
      { kind: 'website', href: 'https://penguin.ooo/' },
      { kind: 'github', href: 'https://github.com/Prism-Shadow/penguin-harness' },
    ],
    post: '/blog/introducing-penguinharness',
  },
  {
    id: 'amsp',
    kind: 'protocol',
    title: 'AMSP: Agent Message Stream Protocol',
    date: '2026-10',
    summary: {
      en: 'One minimal protocol for agent Sessions: observe a run, resume a stream and connect any frontend, across models.',
      zh: '面向 Agent Session 的最小化统一协议：观测运行、恢复会话、连接前后端，并统一接入多种模型。',
    },
    links: [
      { kind: 'docs', href: 'https://penguin.ooo/amsp' },
      { kind: 'github', href: 'https://github.com/Prism-Shadow/penguin-harness/tree/main/packages/amsp' },
    ],
    post: '/blog/introducing-amsp-agent-message-stream-protocol',
  },
  {
    id: 'mmsp',
    kind: 'protocol',
    title: 'MMSP: Model Message Stream Protocol',
    date: '2026-09',
    summary: {
      en: 'One message format and one streaming grammar for every model provider, in Python and TypeScript.',
      zh: '一套消息格式与一套流式语法，接入所有模型厂商，提供 Python 与 TypeScript 实现。',
    },
    links: [
      { kind: 'docs', href: 'https://mmsp.penguin.ooo/' },
      { kind: 'github', href: 'https://github.com/Prism-Shadow/model-message-stream-protocol' },
    ],
    post: '/blog/introducing-amsp-agent-message-stream-protocol',
  },
]
