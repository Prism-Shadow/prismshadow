import type { Locale } from '../../locales'

/** The one-row team line; founders and the full story live on /people. */
export type TeamCopy = {
  title: string
  body: string
  /** Open-source credential, rendered in mono. */
  stat: string
  cta: string
}

export const teamCopy = {
  en: {
    title: 'Built by the team behind LlamaFactory.',
    body: 'Our founders led AI research at IBM, Baidu, Alibaba and ByteDance.',
    stat: '70K+ GitHub stars',
    cta: 'Meet the people',
  },
  zh: {
    title: '由 LlamaFactory 背后的团队打造。',
    body: '创始团队曾在 IBM、百度、阿里巴巴、字节跳动主导 AI 研究与工程。',
    stat: 'GitHub 70K+ 星标',
    cta: '认识团队',
  },
} satisfies Record<Locale, TeamCopy>
