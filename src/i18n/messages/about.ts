import type { Locale } from '../locales'
import { founderPhotos } from './people'
import type { ProductId } from './shared'

export type AboutLink = { label: string; href: string }

export type AboutLoopStage = {
  name: string
  /** Short mono line under the stage name. */
  detail: string
}

export type AboutPillar = {
  title: string
  body: string
}

export type AboutTeamFounder = {
  name: string
  photo: string
}

export type AboutStat = {
  value: string
  label: string
}

export type AboutPageCopy = {
  hero: {
    eyebrow: string
    title: string
    /** Part of the title set in the accent color (must appear in `title`). */
    titleAccent: string
    lead: string
    primaryCta: AboutLink
    secondaryCta: AboutLink
  }
  /** Hero schematic: the platform loop. Exactly four stages, in loop order. */
  loop: {
    ariaLabel: string
    core: string
    coreDetail: string
    stages: AboutLoopStage[]
  }
  story: {
    eyebrow: string
    title: string
    paragraphs: string[]
    pillarsLabel: string
    /** Data production, model training, agent self-evolution. */
    pillars: AboutPillar[]
  }
  products: {
    eyebrow: string
    title: string
    lead: string
    openSourceLabel: string
    learnMore: string
    /** One-line enterprise summary per product; names come from the shared site copy. */
    summaries: Record<ProductId, string>
  }
  /** Compact team teaser; founders, bios and the open-source footprint live on /people. */
  team: {
    eyebrow: string
    title: string
    lead: string
    /** The three founders, shown as small avatars next to their names. */
    founders: AboutTeamFounder[]
    stat: AboutStat
    link: AboutLink
  }
  cta: {
    title: string
    titleAccent: string
    body: string
    primary: AboutLink
    secondary: AboutLink
  }
}

export const aboutPageCopy = {
  en: {
    hero: {
      eyebrow: 'About PrismShadow',
      title: 'We build self-evolving AI for the enterprise.',
      titleAccent: 'self-evolving AI',
      lead: 'PrismShadow provides an integrated platform for data production, model training and agent self-evolution. Enterprises use it to build and continuously optimize AI workflows and AutoResearch systems that cut labor costs and raise output.',
      primaryCta: { label: 'Book a demo', href: '/contact' },
      secondaryCta: { label: 'Meet the team', href: '/people' },
    },
    loop: {
      ariaLabel:
        'Diagram of the PrismShadow platform loop: data production creates training tasks, rubrics and environments; model training fine-tunes, distills and reinforces models; the agent runtime runs AI workflows and AutoResearch systems; and self-evolution feeds every outcome back into the next round.',
      core: 'PrismShadow',
      coreDetail: 'One integrated platform',
      stages: [
        { name: 'Data production', detail: 'Tasks · rubrics · environments' },
        { name: 'Model training', detail: 'Fine-tune · distill · RL' },
        { name: 'Agent runtime', detail: 'Workflows · AutoResearch' },
        { name: 'Self-evolution', detail: 'Outcomes → next round' },
      ],
    },
    story: {
      eyebrow: 'Founded 2025 · Singapore',
      title: 'We turn enterprise knowledge into AI that keeps learning.',
      paragraphs: [
        'PrismShadow connects private company context to daily execution. Documents, business rules, permissions, evaluations and workflow feedback become one trainable system: data is produced, models are trained, and agents improve with every run.',
        'Our agents do more than answer questions. They carry approved context, act inside boundaries, and get better from the outcomes real teams create every day, so the work they take on costs less and delivers more.',
      ],
      pillarsLabel: 'The three layers of the PrismShadow platform',
      pillars: [
        {
          title: 'Data production',
          body: 'Turn documents, business rules and expert work into training tasks, eval sets, scoring rubrics and executable environments. Private context stays governed and scoped.',
        },
        {
          title: 'Model training',
          body: 'Fine-tune, distill and reinforce models on your own data, then deploy them on-prem or in your private cloud with evaluation built in.',
        },
        {
          title: 'Agent self-evolution',
          body: 'Agent Teams run real workflows with permissions, evaluations and human review. Outcomes drive 10+ built-in self-improvement algorithms, so every run improves the next.',
        },
      ],
    },
    products: {
      eyebrow: 'Products',
      title: 'Three products, one platform.',
      lead: 'Start with any one of them. Together they cover the full loop, from data and training to agents that keep improving.',
      openSourceLabel: 'Open source',
      learnMore: 'Learn more',
      summaries: {
        'penguin-harness':
          'An open-source, local-first platform where agents build, evaluate, optimize and deploy agent apps.',
        panofy:
          'Turns trusted company knowledge, example work and feedback into reusable expert agents for high-stakes workflows.',
        'llama-factory':
          'Fine-tune and customize 500+ open models with zero code, from first experiment to inference.',
      },
    },
    team: {
      eyebrow: 'Team',
      title: 'Built by the team behind LlamaFactory.',
      lead: 'Our founders include the creator of LlamaFactory and EasyR1, and AI leaders from IBM Research, Baidu, Alibaba, JD and ByteDance.',
      founders: [
        { name: 'Buyue Qian', photo: founderPhotos.buyue },
        { name: 'Xuejun Wu', photo: founderPhotos.xuejun },
        { name: 'Yaowei Zheng', photo: founderPhotos.yaowei },
      ],
      stat: { value: '70K+', label: 'GitHub stars on LlamaFactory' },
      link: { label: 'Meet the people', href: '/people' },
    },
    cta: {
      title: 'Build AI that evolves with your organization.',
      titleAccent: 'evolves with your organization',
      body: 'Bring us one workflow. We’ll show you how PrismShadow turns your knowledge, workflows and feedback into AI that keeps getting better.',
      primary: { label: 'Contact sales', href: '/contact' },
      secondary: { label: 'How we handle security', href: '/security' },
    },
  },
  zh: {
    hero: {
      eyebrow: '关于 PrismShadow',
      // \u200B marks the only allowed break inside the phrase (zh headings use word-break: keep-all).
      title: '为企业打造\u200B自进化 AI。',
      titleAccent: '自进化 AI',
      lead: 'PrismShadow 提供一体化的数据生产、模型训练和 Agent 自进化平台，帮助企业构建并持续优化 AI 工作流与 AutoResearch 自主科研系统，降低人力成本，提高产出能力。',
      primaryCta: { label: '预约演示', href: '/contact' },
      secondaryCta: { label: '认识团队', href: '/people' },
    },
    loop: {
      ariaLabel:
        'PrismShadow 平台闭环示意图：数据生产生成训练任务、评分标准与可执行环境；模型训练完成微调、蒸馏与强化学习；Agent 运行时执行 AI 工作流与 AutoResearch 系统；自进化把每一次结果反馈到下一轮。',
      core: 'PrismShadow',
      coreDetail: '一体化平台',
      stages: [
        { name: '数据生产', detail: '任务 · 评分标准 · 环境' },
        { name: '模型训练', detail: '微调 · 蒸馏 · 强化学习' },
        { name: 'Agent 运行', detail: '工作流 · AutoResearch' },
        { name: '自进化', detail: '结果驱动下一轮' },
      ],
    },
    story: {
      eyebrow: '2025 年成立于新加坡',
      title: '把企业知识，变成持续学习的 AI。',
      paragraphs: [
        'PrismShadow 连接企业私有上下文与日常执行。文档、业务规则、权限、评估与工作流反馈，在这里组成一套可训练的系统：数据被生产出来，模型据此训练，Agent 在每一次运行中进步。',
        '我们的 Agent 不只会回答问题。它们携带已批准的上下文，在边界内行动，并从真实团队每天产生的结果中持续改进，让它们承担的工作成本更低、产出更高。',
      ],
      pillarsLabel: 'PrismShadow 平台的三层能力',
      pillars: [
        {
          title: '数据生产',
          body: '把文档、业务规则与专家经验转化为训练任务、评测集、评分标准和可执行环境。私有上下文始终受控，按范围使用。',
        },
        {
          title: '模型训练',
          body: '基于企业自有数据完成微调、蒸馏与强化学习，并内置评估，部署在本地或私有云中。',
        },
        {
          title: 'Agent 自进化',
          body: 'Agent Team 在权限、评估与人工审核之下执行真实工作流。运行结果驱动 10+ 种内置自进化算法，让每一次运行都比上一次更好。',
        },
      ],
    },
    products: {
      eyebrow: '产品',
      title: '三款产品，一个平台。',
      lead: '可以从任何一款开始。三者合在一起，覆盖从数据、训练到持续进化 Agent 的完整闭环。',
      openSourceLabel: '开源',
      learnMore: '了解更多',
      summaries: {
        'penguin-harness': '开源、本地优先的多 Agent 平台，让 Agent 自动构建、评测、优化并部署 Agent 应用。',
        panofy: '把企业可信知识、示例工作与反馈，训练成可复用的专家级 Agent，服务高要求的业务工作流。',
        'llama-factory': '零代码微调与定制 500+ 开源模型，从第一次实验一直到推理部署。',
      },
    },
    team: {
      eyebrow: '团队',
      title: '由 LlamaFactory 背后的团队创立。',
      lead: '创始团队包括 LlamaFactory 与 EasyR1 的作者，以及来自 IBM Research、百度、阿里巴巴、京东与字节跳动的 AI 领军者。',
      founders: [
        { name: 'Buyue Qian', photo: founderPhotos.buyue },
        { name: 'Xuejun Wu', photo: founderPhotos.xuejun },
        { name: 'Yaowei Zheng', photo: founderPhotos.yaowei },
      ],
      stat: { value: '70K+', label: 'LlamaFactory GitHub 星标' },
      link: { label: '认识团队', href: '/people' },
    },
    cta: {
      title: '让 AI 随组织一起进化。',
      titleAccent: '随组织一起进化',
      body: '带来一个工作流，我们演示 PrismShadow 如何把你的知识、工作流与反馈，变成持续变好的 AI。',
      primary: { label: '联系销售', href: '/contact' },
      secondary: { label: '了解安全体系', href: '/security' },
    },
  },
} satisfies Record<Locale, AboutPageCopy>
