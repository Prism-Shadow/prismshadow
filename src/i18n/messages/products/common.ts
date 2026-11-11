import type { Locale } from '../../locales'

export type ProductCommonCopy = {
  crossLinks: {
    eyebrow: string
    title: string
    explore: string
  }
  terminal: {
    copy: string
    copied: string
  }
  logoAlt: string
}

export const productCommonCopy = {
  en: {
    crossLinks: {
      eyebrow: 'Products',
      title: 'One stack, three products.',
      explore: 'Explore',
    },
    terminal: {
      copy: 'Copy commands',
      copied: 'Copied',
    },
    logoAlt: 'logo',
  },
  zh: {
    crossLinks: {
      eyebrow: '产品',
      title: '一套技术栈，三款产品。',
      explore: '了解产品',
    },
    terminal: {
      copy: '复制命令',
      copied: '已复制',
    },
    logoAlt: '标志',
  },
} satisfies Record<Locale, ProductCommonCopy>
