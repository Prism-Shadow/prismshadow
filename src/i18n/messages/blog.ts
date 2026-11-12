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
  /** "Papers and open source": the team's research list on the index. */
  works: {
    eyebrow: string
    title: string
    lead: string
    /** Accessible name of the list. */
    listLabel: string
    kinds: {
      paper: string
      code: string
      protocol: string
    }
    links: {
      arxiv: string
      github: string
      docs: string
      website: string
      post: string
    }
  }
  topics: {
    product: string
    research: string
  }
  meta: {
    readingTime: string
    /** Date pattern; `{month}` is taken from `months`. */
    date: string
    /** Month-and-year pattern for the research list. */
    monthYear: string
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
      title: 'Research, launches and field notes',
      titleAccent: 'Research',
      lead: 'Papers, open-source releases and product launches from the team behind LlamaFactory, and practical playbooks for putting AI agents to work in supply chain, healthcare, retail, travel and more.',
      featuredLabel: 'Featured',
      postsEyebrow: 'All posts',
      postsTitle: 'Launches and agents at work',
      postsLead:
        'Releases of PenguinHarness, AgentHub and Panofy, and how governed, memory-driven agents turn scattered signals into decision-ready workflows, industry by industry.',
      filterLabel: 'Filter posts by topic',
      filterAll: 'All',
      showing: 'Showing {n} posts',
    },
    works: {
      eyebrow: 'Research',
      title: 'Papers and open source',
      lead: 'Our work on recursive self-improvement: the papers we have published, and the framework and protocols you can run today.',
      listLabel: 'Papers, open-source projects and protocols',
      kinds: {
        paper: 'Paper',
        code: 'Open source',
        protocol: 'Protocol',
      },
      links: {
        arxiv: 'arXiv',
        github: 'GitHub',
        docs: 'Docs',
        website: 'Website',
        post: 'Read the post',
      },
    },
    topics: {
      product: 'Product Updates',
      research: 'Research',
    },
    meta: {
      readingTime: '{n} min read',
      date: '{month} {day}, {year}',
      monthYear: '{month} {year}',
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
      title: '研究、发布与一线笔记',
      titleAccent: '研究',
      lead: '来自 LlamaFactory 团队的论文、开源项目与产品发布，以及让 AI Agent 在供应链、医疗、零售、旅行等行业真正落地的实践指南。',
      featuredLabel: '精选',
      postsEyebrow: '全部文章',
      postsTitle: '产品发布与 Agent 落地实践',
      postsLead:
        'PenguinHarness、AgentHub 与 Panofy 的发布动态，以及受治理、具备长期记忆的 Agent 如何在各行各业把分散的信号变成可直接决策的工作流。',
      filterLabel: '按主题筛选文章',
      filterAll: '全部',
      showing: '共 {n} 篇文章',
    },
    works: {
      eyebrow: '研究',
      title: '论文与开源',
      lead: '我们在递归自我改进（RSI）方向的工作：已发表的论文，以及您现在就能运行的框架与协议。',
      listLabel: '论文、开源项目与协议',
      kinds: {
        paper: '论文',
        code: '开源项目',
        protocol: '协议',
      },
      links: {
        arxiv: 'arXiv',
        github: 'GitHub',
        docs: '文档',
        website: '官网',
        post: '阅读文章',
      },
    },
    topics: {
      product: '产品动态',
      research: '研究',
    },
    meta: {
      readingTime: '约 {n} 分钟阅读',
      date: '{year}年{month}{day}日',
      monthYear: '{year}年{month}',
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
