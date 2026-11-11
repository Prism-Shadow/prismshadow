import type { Locale } from '../locales'

export type PeopleLink = { label: string; href: string }

export type PeopleFounder = {
  name: string
  role: string
  photo: string
  /** Former employers, institutions and projects, shown as one mono line. */
  affiliations: string[]
  /** One credential per line. Wrap the key credential in `**…**` to set it in full-strength ink. */
  highlights: string[]
}

export type PeopleStat = {
  value: string
  label: string
}

export type PeopleProjectLink = PeopleLink & { external: boolean }

export type PeopleProject = {
  name: string
  body: string
  links: PeopleProjectLink[]
}

export type PeopleBackgroundLogo = {
  name: string
  /** Monochrome logo file; logos without one render as a wordmark. */
  src?: string
}

export type PeoplePageCopy = {
  hero: {
    eyebrow: string
    title: string
    /** Part of the title set in the accent color (must appear in `title`). */
    titleAccent: string
    lead: string
    primaryCta: PeopleLink
    secondaryCta: PeopleLink
  }
  founders: {
    title: string
    /** Exactly three founders, in this order: CEO, CPO, CTO. */
    people: PeopleFounder[]
  }
  openSource: {
    eyebrow: string
    title: string
    lead: string
    repo: { name: string; href: string; display: string }
    footprintLabel: string
    /** Exactly four LlamaFactory numbers: stars, downloads, models supported, models built. */
    stats: PeopleStat[]
    projectsLabel: string
    projects: PeopleProject[]
  }
  backgrounds: {
    title: string
    logos: PeopleBackgroundLogo[]
  }
  /** Screen-reader hint for links that open in a new tab. */
  newTabLabel: string
  cta: {
    title: string
    titleAccent: string
    body: string
    primary: PeopleLink
    secondary: PeopleLink
  }
}

export const founderPhotos = {
  buyue: '/about/founders/buyue.png',
  xuejun: '/about/founders/xuejun.png',
  yaowei: '/about/founders/yaowei.png',
}

const logoFiles = {
  ibm: '/about/logos/ibm.svg',
  yahoo: '/about/logos/yahoo.svg',
  fudan: '/about/logos/fudan-university.svg',
  baidu: '/about/logos/baidu.svg',
  alibaba: '/about/logos/alibaba.svg',
  bytedance: '/about/logos/bytedance.svg',
}

const repo = {
  name: 'LlamaFactory',
  href: 'https://github.com/hiyouga/LlamaFactory',
  display: 'github.com/hiyouga/LlamaFactory',
}

const easyR1Href = 'https://github.com/hiyouga/EasyR1'
const penguinHarnessHref = 'https://github.com/Prism-Shadow/penguin-harness'

export const peoplePageCopy = {
  en: {
    hero: {
      eyebrow: 'People',
      title: 'Built by the team behind LlamaFactory.',
      titleAccent: 'LlamaFactory',
      lead: 'Our founders built one of the world’s most widely used open-source LLM training frameworks, led AI research and engineering at IBM, Baidu, Alibaba and ByteDance, and scaled an AI business past $40M in annual revenue.',
      primaryCta: { label: 'Talk to the team', href: '/contact' },
      secondaryCta: { label: 'LlamaFactory on GitHub', href: repo.href },
    },
    founders: {
      title: 'Founders',
      people: [
        {
          name: 'Buyue Qian',
          role: 'Founder & CEO',
          photo: founderPhotos.buyue,
          affiliations: ['IBM Research', 'Fudan University', 'Yahoo'],
          highlights: [
            '**15+ years** building enterprise AI solutions',
            'Former technical lead at **IBM T.J. Watson Research**',
            'Former professor at **Fudan University**',
            'Former CEO of Chaoqian Limited, a healthcare AI company with **$40M+ ARR**',
          ],
        },
        {
          name: 'Xuejun Wu',
          role: 'Founder & CPO',
          photo: founderPhotos.xuejun,
          affiliations: ['Baidu', 'Alibaba', 'JD Digits'],
          highlights: [
            '**Founding scientist at Baidu NLP**, where he led the speech team',
            'Former senior director at **Alibaba**',
            'Former vice president at **JD Digits**',
            '**15+ years** across speech, recommendation systems, big data and digital marketing',
          ],
        },
        {
          name: 'Yaowei Zheng',
          role: 'Founder & CTO',
          photo: founderPhotos.yaowei,
          affiliations: ['ByteDance', 'LlamaFactory', 'EasyR1'],
          highlights: [
            'Creator of **LlamaFactory**: **70K+ GitHub stars** and 500+ supported models',
            'Creator of **EasyR1**, an open agent reinforcement-learning framework',
            'Former **ByteDance** researcher who led the **VeOmni** distributed-training framework',
          ],
        },
      ],
    },
    openSource: {
      eyebrow: 'Open source',
      title: 'Open-source work used around the world.',
      lead: 'LlamaFactory is the open-source foundation behind production model training for teams everywhere. We keep shipping open tools for training and agents.',
      repo,
      footprintLabel: 'Open-source footprint',
      stats: [
        { value: '70K+', label: 'GitHub stars' },
        { value: '3M+', label: 'Downloads' },
        { value: '500+', label: 'Models supported' },
        { value: '13K+', label: 'Models built with it' },
      ],
      projectsLabel: 'Open-source projects from our team',
      projects: [
        {
          name: 'LlamaFactory',
          body: 'Easy and efficient fine-tuning for 500+ open LLMs, and one of the most widely used training frameworks in open source.',
          links: [
            { label: 'GitHub', href: repo.href, external: true },
            { label: 'Product page', href: '/product/llama-factory', external: false },
          ],
        },
        {
          name: 'EasyR1',
          body: 'An efficient, scalable open framework for agent reinforcement learning.',
          links: [{ label: 'GitHub', href: easyR1Href, external: true }],
        },
        {
          name: 'PenguinHarness',
          body: 'An open-source multi-agent platform where agents build, evaluate and evolve other agents.',
          links: [
            { label: 'GitHub', href: penguinHarnessHref, external: true },
            { label: 'Product page', href: '/product/penguin-harness', external: false },
          ],
        },
      ],
    },
    backgrounds: {
      title: 'Our founders previously built AI at',
      logos: [
        { name: 'IBM Research', src: logoFiles.ibm },
        { name: 'Fudan University', src: logoFiles.fudan },
        { name: 'Yahoo', src: logoFiles.yahoo },
        { name: 'Baidu', src: logoFiles.baidu },
        { name: 'Alibaba', src: logoFiles.alibaba },
        { name: 'JD Group' },
        { name: 'ByteDance', src: logoFiles.bytedance },
      ],
    },
    newTabLabel: 'opens in a new tab',
    cta: {
      title: 'Build with the team behind LlamaFactory.',
      titleAccent: 'the team behind LlamaFactory',
      body: 'Bring us one workflow. We’ll show you how PrismShadow turns your knowledge, workflows and feedback into AI that keeps getting better.',
      primary: { label: 'Talk to the team', href: '/contact' },
      secondary: { label: 'About PrismShadow', href: '/about' },
    },
  },
  zh: {
    hero: {
      eyebrow: '团队',
      // zh headings use word-break: keep-all, so this title breaks only at its spaces.
      title: '由 LlamaFactory 背后的团队打造。',
      titleAccent: 'LlamaFactory',
      lead: '创始团队打造了全球使用最广泛的开源大模型训练框架之一，曾在 IBM、百度、阿里巴巴、字节跳动主导 AI 研究与工程，并将 AI 业务做到年收入超 4000 万美元。',
      primaryCta: { label: '联系团队', href: '/contact' },
      secondaryCta: { label: '在 GitHub 查看 LlamaFactory', href: repo.href },
    },
    founders: {
      title: '创始团队',
      people: [
        {
          name: 'Buyue Qian',
          role: '创始人 & CEO',
          photo: founderPhotos.buyue,
          affiliations: ['IBM Research', '复旦大学', 'Yahoo'],
          highlights: [
            '**15 年以上**企业级 AI 解决方案经验',
            '前 **IBM T.J. Watson 研究院**技术负责人',
            '前**复旦大学**教授',
            '曾任医疗 AI 公司 Chaoqian Limited CEO，公司 ARR 超过 **4000 万美元**',
          ],
        },
        {
          name: 'Xuejun Wu',
          role: '创始人 & CPO',
          photo: founderPhotos.xuejun,
          affiliations: ['百度', '阿里巴巴', '京东数科'],
          highlights: [
            '**百度 NLP 创始科学家**，曾带领语音团队',
            '前**阿里巴巴**高级总监',
            '前**京东数科**副总裁',
            '**15 年以上**语音、推荐系统、大数据与数字营销经验',
          ],
        },
        {
          name: 'Yaowei Zheng',
          role: '创始人 & CTO',
          photo: founderPhotos.yaowei,
          affiliations: ['字节跳动', 'LlamaFactory', 'EasyR1'],
          highlights: [
            '**LlamaFactory** 作者：**GitHub 70K+ 星标**，支持 500+ 模型',
            '**EasyR1** 开源 Agent 强化学习框架作者',
            '前**字节跳动**研究员，主导 **VeOmni** 分布式训练框架',
          ],
        },
      ],
    },
    openSource: {
      eyebrow: '开源',
      title: '被全球开发者使用的\u200B开源成果。',
      lead: 'LlamaFactory 是全球众多团队生产级模型训练背后的开源基础。我们持续发布面向训练与 Agent 的开源工具。',
      repo,
      footprintLabel: '开源影响力',
      stats: [
        { value: '70K+', label: 'GitHub 星标' },
        { value: '3M+', label: '下载量' },
        { value: '500+', label: '支持模型' },
        { value: '13K+', label: '基于其训练的模型' },
      ],
      projectsLabel: '团队的开源项目',
      projects: [
        {
          name: 'LlamaFactory',
          body: '简单高效地微调 500+ 开源大模型，是开源社区使用最广泛的训练框架之一。',
          links: [
            { label: 'GitHub', href: repo.href, external: true },
            { label: '产品介绍', href: '/product/llama-factory', external: false },
          ],
        },
        {
          name: 'EasyR1',
          body: '高效、可扩展的开源 Agent 强化学习框架。',
          links: [{ label: 'GitHub', href: easyR1Href, external: true }],
        },
        {
          name: 'PenguinHarness',
          body: '开源多 Agent 开发平台，让 Agent 构建、评测并进化其他 Agent。',
          links: [
            { label: 'GitHub', href: penguinHarnessHref, external: true },
            { label: '产品介绍', href: '/product/penguin-harness', external: false },
          ],
        },
      ],
    },
    backgrounds: {
      title: '创始团队曾在这些机构打造 AI',
      logos: [
        { name: 'IBM Research', src: logoFiles.ibm },
        { name: '复旦大学', src: logoFiles.fudan },
        { name: 'Yahoo', src: logoFiles.yahoo },
        { name: '百度', src: logoFiles.baidu },
        { name: '阿里巴巴', src: logoFiles.alibaba },
        { name: '京东集团' },
        { name: '字节跳动', src: logoFiles.bytedance },
      ],
    },
    newTabLabel: '在新标签页打开',
    cta: {
      title: '与 LlamaFactory 背后的团队\u200B一起构建。',
      titleAccent: '一起构建',
      body: '带来一个工作流，我们演示 PrismShadow 如何把你的知识、工作流与反馈，变成持续变好的 AI。',
      primary: { label: '联系团队', href: '/contact' },
      secondary: { label: '关于 PrismShadow', href: '/about' },
    },
  },
} satisfies Record<Locale, PeoplePageCopy>
