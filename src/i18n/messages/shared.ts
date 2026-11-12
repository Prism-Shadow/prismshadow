import type { Locale } from '../locales'

export type IndustryId =
  | 'b2b-saas'
  | 'financial-services'
  | 'retail'
  | 'travel'
  | 'healthcare'
  | 'supply-chain'
  | 'restaurants'
  | 'auto-dealerships'

export type DepartmentId =
  | 'customer-support'
  | 'sales'
  | 'marketing'
  | 'data'
  | 'hr'
  | 'legal'
  | 'engineering'
  | 'operations'

export type ProductId = 'penguin-harness' | 'panofy' | 'llama-factory'

type MenuEntry = { name: string; description: string }

export type SharedMessages = {
  brandName: string
  a11y: {
    home: string
    primaryNav: string
    openMenu: string
    closeMenu: string
    skipToContent: string
    footer: string
    footerNav: string
    social: string
    switchLanguage: string
  }
  nav: {
    products: string
    solutions: string
    customers: string
    resources: string
    company: string
    about: string
    people: string
    security: string
    contact: string
    /** Label of the language toggle: the language you switch TO. */
    otherLanguage: string
    byDepartment: string
    byIndustry: string
    allDepartments: string
    platformOverview: string
    platformOverviewBody: string
  }
  products: Record<ProductId, MenuEntry>
  resources: {
    blog: MenuEntry
    useCaseLibrary: MenuEntry
    agentMarketplace: MenuEntry
    docs: MenuEntry
  }
  company: {
    about: MenuEntry
    people: MenuEntry
    customers: MenuEntry
    security: MenuEntry
    contact: MenuEntry
  }
  departments: Record<DepartmentId, string>
  industries: Record<IndustryId, string>
  footer: {
    tagline: string
    platform: string
    products: string
    departments: string
    industries: string
    resources: string
    company: string
    contact: string
    copyright: string
  }
  cta: {
    title: string
    titleAccent?: string
    body?: string
    primary: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
  status: {
    loading: string
  }
}

export const siteText = {
  en: {
    brandName: 'PrismShadow',
    a11y: {
      home: 'PrismShadow home',
      primaryNav: 'Primary',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      skipToContent: 'Skip to content',
      footer: 'Site footer',
      footerNav: 'Footer navigation',
      social: 'PrismShadow on social media',
      switchLanguage: 'Switch language to Chinese',
    },
    nav: {
      products: 'Products',
      solutions: 'Solutions',
      customers: 'Customers',
      resources: 'Resources',
      company: 'Company',
      about: 'About',
      people: 'People',
      security: 'Security',
      contact: 'Contact us',
      otherLanguage: '中文',
      byDepartment: 'By department',
      byIndustry: 'By industry',
      allDepartments: 'All departments',
      platformOverview: 'The PrismShadow platform',
      platformOverviewBody:
        'Data production, model training and agent self-evolution in one stack.',
    },
    products: {
      'penguin-harness': {
        name: 'PenguinHarness',
        description: 'Open-source platform where agents build and evolve agents.',
      },
      panofy: {
        name: 'Panofy',
        description: 'Train expert agents from your team’s own work.',
      },
      'llama-factory': {
        name: 'LlamaFactory',
        description: 'Fine-tune and customize open models with zero code.',
      },
    },
    resources: {
      blog: { name: 'Blog', description: 'Research, launches and field notes.' },
      useCaseLibrary: {
        name: 'Use case library',
        description: 'Agent workflows by team and industry.',
      },
      agentMarketplace: {
        name: 'Agent marketplace',
        description: 'Ready-to-train agents for common jobs.',
      },
      docs: { name: 'Documentation', description: 'Get started with Panofy.' },
    },
    company: {
      about: { name: 'About', description: 'Our mission and how we build.' },
      people: { name: 'People', description: 'The team behind LlamaFactory.' },
      customers: { name: 'Customers', description: 'Results in production.' },
      security: { name: 'Security', description: 'Private deployment and controls.' },
      contact: { name: 'Contact', description: 'Book a demo or ask a question.' },
    },
    departments: {
      'customer-support': 'Customer Support',
      sales: 'Sales',
      marketing: 'Marketing',
      data: 'Data',
      hr: 'HR',
      legal: 'Legal',
      engineering: 'Engineering',
      operations: 'Operations',
    },
    industries: {
      'b2b-saas': 'B2B SaaS',
      'financial-services': 'Financial Services',
      retail: 'Retail',
      travel: 'Travel',
      healthcare: 'Healthcare',
      'supply-chain': 'Supply Chain',
      restaurants: 'Restaurants',
      'auto-dealerships': 'Auto Dealerships',
    },
    footer: {
      tagline: 'The self-evolving AI platform for enterprise.',
      platform: 'Platform',
      products: 'Products',
      departments: 'Departments',
      industries: 'Industries',
      resources: 'Resources',
      company: 'Company',
      contact: 'Contact',
      copyright: '© 2026 PrismShadow. All rights reserved.',
    },
    cta: {
      title: 'Start with one workflow.',
      titleAccent: 'one workflow',
      body: 'Tell us where your team spends the most time. We’ll build the agents with you, take them to production and keep improving them there.',
      primary: { label: 'Book a demo', href: '/contact' },
      secondary: { label: 'Explore PenguinHarness', href: '/product/penguin-harness' },
    },
    status: {
      loading: 'Loading',
    },
  },
  zh: {
    brandName: 'PrismShadow',
    a11y: {
      home: 'PrismShadow 首页',
      primaryNav: '主导航',
      openMenu: '打开菜单',
      closeMenu: '关闭菜单',
      skipToContent: '跳到正文',
      footer: '网站页脚',
      footerNav: '页脚导航',
      social: 'PrismShadow 社交媒体',
      switchLanguage: 'Switch language to English',
    },
    nav: {
      products: '产品',
      solutions: '解决方案',
      customers: '客户',
      resources: '资源',
      company: '公司',
      about: '关于我们',
      people: '团队',
      security: '安全',
      contact: '联系我们',
      otherLanguage: 'EN',
      byDepartment: '按部门',
      byIndustry: '按行业',
      allDepartments: '全部部门',
      platformOverview: 'PrismShadow 平台',
      platformOverviewBody: '数据生产、模型训练与 Agent 自进化，一套技术栈。',
    },
    products: {
      'penguin-harness': {
        name: 'PenguinHarness',
        description: '开源多 Agent 开发平台，让 Agent 构建并进化 Agent。',
      },
      panofy: {
        name: 'Panofy',
        description: '用团队自己的工作，训练专家级 Agent。',
      },
      'llama-factory': {
        name: 'LlamaFactory',
        description: '零代码微调与定制开源大模型。',
      },
    },
    resources: {
      blog: { name: '博客', description: '研究、发布与一线实践。' },
      useCaseLibrary: { name: '用例库', description: '按部门与行业浏览 Agent 工作流。' },
      agentMarketplace: { name: 'Agent 市场', description: '常见岗位的即训即用 Agent。' },
      docs: { name: '文档', description: 'Panofy 快速上手。' },
    },
    company: {
      about: { name: '关于我们', description: '使命与做事方式。' },
      people: { name: '团队', description: 'LlamaFactory 背后的团队。' },
      customers: { name: '客户', description: '生产环境中的真实成果。' },
      security: { name: '安全', description: '私有部署与安全管控。' },
      contact: { name: '联系我们', description: '预约演示或咨询问题。' },
    },
    departments: {
      'customer-support': '客户支持',
      sales: '销售',
      marketing: '市场',
      data: '数据',
      hr: '人力资源',
      legal: '法务',
      engineering: '工程',
      operations: '运营',
    },
    industries: {
      'b2b-saas': 'B2B SaaS',
      'financial-services': '金融服务',
      retail: '零售',
      travel: '旅行',
      healthcare: '医疗健康',
      'supply-chain': '供应链',
      restaurants: '餐饮',
      'auto-dealerships': '汽车经销商',
    },
    footer: {
      tagline: '企业级自进化 AI 平台。',
      platform: '平台',
      products: '产品',
      departments: '部门',
      industries: '行业',
      resources: '资源',
      company: '公司',
      contact: '联系我们',
      copyright: '© 2026 PrismShadow 保留所有权利。',
    },
    cta: {
      title: '从一个工作流开始。',
      titleAccent: '一个工作流',
      body: '告诉我们您的团队在哪里花的时间最多。我们和您一起构建 Agent，陪您上线，并在生产环境中持续优化。',
      primary: { label: '预约演示', href: '/contact' },
      secondary: { label: '了解 PenguinHarness', href: '/product/penguin-harness' },
    },
    status: {
      loading: '加载中',
    },
  },
} as const satisfies Record<Locale, SharedMessages>
