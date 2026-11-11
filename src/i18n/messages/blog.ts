import type { Locale } from '../locales'

/**
 * Blog UI chrome (index, article, not-found). Post content itself is
 * English-only and lives in src/content/blogPosts.ts. Industry topic labels
 * come from the shared `siteText.industries`; `{n}`, `{year}`, `{month}` and
 * `{day}` are placeholders filled in by the page.
 */
export type BlogPageCopy = {
  index: {
    eyebrow: string
    title: string
    titleAccent: string
    lead: string
    featuredLabel: string
    postsEyebrow: string
    postsTitle: string
    postsLead: string
    filterLabel: string
    filterAll: string
    /** Screen-reader status after filtering. */
    showing: string
  }
  topics: {
    product: string
  }
  meta: {
    readingTime: string
    /** Date pattern; `{month}` is taken from `months`. */
    date: string
    months: string[]
  }
  post: {
    breadcrumb: string
    breadcrumbLabel: string
    onThisPage: string
    figure: string
    workflow: string
    languageNote: string
    relatedEyebrow: string
    relatedTitle: string
    allPosts: string
  }
  notFound: {
    eyebrow: string
    title: string
    lead: string
    back: string
    latestEyebrow: string
    latestTitle: string
    metaTitle: string
  }
}

export const blogPageCopy = {
  en: {
    index: {
      eyebrow: 'Blog',
      title: 'Launches and field notes from PrismShadow',
      titleAccent: 'field notes',
      lead: 'Product releases from the team behind LlamaFactory, and practical playbooks for putting AI agents to work in supply chain, healthcare, retail, travel and more.',
      featuredLabel: 'Featured',
      postsEyebrow: 'Field notes',
      postsTitle: 'Agents at work, industry by industry',
      postsLead:
        'How governed, memory-driven agents turn scattered signals into decision-ready workflows, from the supply chain control tower to the restaurant owner’s morning briefing.',
      filterLabel: 'Filter posts by industry',
      filterAll: 'All',
      showing: 'Showing {n} posts',
    },
    topics: {
      product: 'Product Updates',
    },
    meta: {
      readingTime: '{n} min read',
      date: '{month} {day}, {year}',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    post: {
      breadcrumb: 'Blog',
      breadcrumbLabel: 'Breadcrumb',
      onThisPage: 'On this page',
      figure: 'Figure',
      workflow: 'Agent workflow',
      languageNote: 'Available in English only',
      relatedEyebrow: 'Keep reading',
      relatedTitle: 'Related posts',
      allPosts: 'All posts',
    },
    notFound: {
      eyebrow: 'Blog',
      title: 'We couldn’t find that post',
      lead: 'The link may be mistyped, or the post may have moved. Everything we have published is on the blog.',
      back: 'Back to the blog',
      latestEyebrow: 'Latest',
      latestTitle: 'Recent posts',
      metaTitle: 'Post not found | PrismShadow Blog',
    },
  },
  zh: {
    index: {
      eyebrow: '博客',
      title: '产品发布与一线笔记',
      titleAccent: '一线笔记',
      lead: '来自 LlamaFactory 团队的产品发布，以及让 AI Agent 在供应链、医疗、零售、旅行等行业真正落地的实践指南。',
      featuredLabel: '精选',
      postsEyebrow: '行业实践',
      postsTitle: '按行业看 Agent 如何落地',
      postsLead:
        '从供应链控制塔到餐厅老板的每日简报，看受治理、具备长期记忆的 Agent 如何把分散的信号变成可直接决策的工作流。',
      filterLabel: '按行业筛选文章',
      filterAll: '全部',
      showing: '共 {n} 篇文章',
    },
    topics: {
      product: '产品动态',
    },
    meta: {
      readingTime: '约 {n} 分钟阅读',
      date: '{year}年{month}{day}日',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
    post: {
      breadcrumb: '博客',
      breadcrumbLabel: '面包屑导航',
      onThisPage: '本页目录',
      figure: '图',
      workflow: 'Agent 工作流',
      languageNote: '本文暂仅提供英文版',
      relatedEyebrow: '继续阅读',
      relatedTitle: '相关文章',
      allPosts: '全部文章',
    },
    notFound: {
      eyebrow: '博客',
      title: '没有找到这篇文章',
      lead: '链接可能有误，或文章已经移动。我们发布的所有文章都可以在博客中找到。',
      back: '返回博客',
      latestEyebrow: '最新',
      latestTitle: '最新文章',
      metaTitle: '未找到文章 | PrismShadow 博客',
    },
  },
} satisfies Record<Locale, BlogPageCopy>
