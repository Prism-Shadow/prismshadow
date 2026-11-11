import type { Locale } from '../locales'

type MarketplaceTextCardCopy = {
  title: string
  body: string
}

/** Headings may contain `\u200B` to mark preferred zh line breaks (see `Phrases`). */
export type AgentMarketplacePageCopy = {
  hero: {
    eyebrow: string
    title: string
    body: string
    primaryCta: string
    secondaryCta: string
  }
  visual: {
    ariaLabel: string
    coreLabel: string
    coreTitle: string
    /** Teams, in the same order as `skills.items`. */
    signals: string[]
  }
  intro: {
    eyebrow: string
    title: string
    body: string[]
  }
  skills: {
    eyebrow: string
    title: string
    filterLabel: string
    all: string
    approved: string
    items: MarketplaceTextCardCopy[]
  }
  adoption: {
    eyebrow: string
    title: string
    steps: MarketplaceTextCardCopy[]
  }
  benefits: {
    eyebrow: string
    title: string
    items: MarketplaceTextCardCopy[]
  }
  final: {
    title: string
    titleAccent: string
    body: string
    cta: string
    secondaryCta: string
  }
}

export const agentMarketplacePageCopy = {
  en: {
    hero: {
      eyebrow: 'Agent marketplace',
      title: 'Enterprise agent skills your teams can deploy with confidence',
      body: 'PrismShadow Agent Marketplace gives companies approved, reusable agent skills for repeatable business workflows. Start from trusted skill templates, standardize execution across departments, and evolve ready-made skills into agents grounded in company knowledge.',
      primaryCta: 'Explore reusable skills',
      secondaryCta: 'See the adoption path',
    },
    visual: {
      ariaLabel:
        'Approved skills flow into a team workflow layer shared by Support, Sales, Operations, Finance, Compliance and HR.',
      coreLabel: 'Approved skills',
      coreTitle: 'Team workflow layer',
      signals: ['Support', 'Sales', 'Operations', 'Finance', 'Compliance', 'HR'],
    },
    intro: {
      eyebrow: 'Enterprise adoption',
      title: 'Stop asking every employee to reinvent agent workflows from scratch.',
      body: [
        'Enterprise AI adoption stalls when each team member has to design their own agent, write their own prompts and decide their own process. The result is uneven quality, hard-to-review outputs and limited repeatability.',
        'Agent Marketplace gives organizations a governed starting point: pre-trained business skills that can be deployed into common tasks, shared across departments, and adapted into company-specific agents as workflows mature.',
      ],
    },
    skills: {
      eyebrow: 'Reusable business skills',
      title: 'Approved starting points for repeatable work',
      filterLabel: 'Filter skills by team',
      all: 'All teams',
      approved: 'Approved',
      items: [
        {
          title: 'Customer support triage',
          body: 'Classify inbound requests, summarize context, suggest next actions and route issues using approved support playbooks.',
        },
        {
          title: 'Sales follow-up preparation',
          body: 'Turn account notes, meeting context, buyer signals and proposal standards into repeatable next-step workflows for revenue teams.',
        },
        {
          title: 'Operations exception handling',
          body: 'Help teams review exceptions, collect required context, apply SOPs and prepare review-ready handoffs for operational work.',
        },
        {
          title: 'Finance and reporting support',
          body: 'Standardize recurring analysis, variance summaries, reporting checks and stakeholder-ready explanations from trusted inputs.',
        },
        {
          title: 'Policy and compliance review',
          body: 'Give teams approved starting points for checking documents, identifying missing evidence and escalating sensitive cases.',
        },
        {
          title: 'Employee onboarding guidance',
          body: 'Help new team members follow role-specific procedures, internal standards and common workflow patterns from day one.',
        },
      ],
    },
    adoption: {
      eyebrow: 'Adoption path',
      title: 'From ready-made skills to company-specific agents',
      steps: [
        {
          title: 'Choose an approved skill',
          body: 'Start from a vetted business skill designed for a common workflow, not a blank prompt or an ungoverned one-off workflow.',
        },
        {
          title: 'Deploy it into a team process',
          body: 'Attach the skill to the documents, systems, review rules and handoff points that already shape how the team works.',
        },
        {
          title: 'Standardize usage across the department',
          body: 'Give every employee the same approved starting point so work becomes more consistent across roles, shifts and locations.',
        },
        {
          title: 'Evolve into company-specific agents',
          body: 'As the workflow matures, adapt the skill with internal knowledge, policies, examples and decision patterns for deeper automation.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Why it matters',
      title: 'Built for operational efficiency, consistency and team enablement',
      items: [
        {
          title: 'Faster enterprise rollout',
          body: 'Move departments from AI interest to operational use with ready-made skills that reduce setup time and ambiguity.',
        },
        {
          title: 'Less prompt sprawl',
          body: 'Replace one-off personal prompts with reusable workflow assets that teams can inspect, improve and standardize.',
        },
        {
          title: 'More consistent execution',
          body: 'Align common tasks around approved language, escalation rules, source material and output expectations.',
        },
        {
          title: 'A practical adoption path',
          body: 'Start with marketplace skills, then grow them into trained agents grounded in company-specific knowledge.',
        },
      ],
    },
    final: {
      title: 'Give every department an approved way to start using agents',
      titleAccent: 'an approved way',
      body: 'PrismShadow helps companies turn ready-made agent skills into repeatable workflows, then grow those skills into trained agents shaped by internal knowledge, policies and operating standards.',
      cta: 'Explore reusable skills',
      secondaryCta: 'Contact us',
    },
  },
  zh: {
    hero: {
      eyebrow: 'Agent 市场',
      title: '企业级 Agent 技能，\u200B团队可放心部署',
      body: 'PrismShadow Agent 市场为企业提供经过批准、可复用的 Agent 技能，覆盖重复性的业务工作流。团队可以从可信的技能模板起步，统一跨部门的执行方式，并把现成技能逐步演进为扎根公司知识的 Agent。',
      primaryCta: '探索可复用技能',
      secondaryCta: '查看采用路径',
    },
    visual: {
      ariaLabel: '已批准的技能进入团队工作流层，由支持、销售、运营、财务、合规和人力资源团队共享。',
      coreLabel: '已批准技能',
      coreTitle: '团队工作流层',
      signals: ['支持', '销售', '运营', '财务', '合规', '人力资源'],
    },
    intro: {
      eyebrow: '企业采用',
      title: '别再让每位员工\u200B从零发明 Agent 工作流。',
      body: [
        '当每个团队成员都必须自己设计 Agent、编写提示词、决定流程时，企业的 AI 采用就会停滞。结果往往是质量参差、输出难以审查、流程难以复用。',
        'Agent 市场为组织提供可治理的起点：预训练的业务技能可以部署到常见任务中，在部门之间共享，并随着工作流成熟，逐步适配为公司专属的 Agent。',
      ],
    },
    skills: {
      eyebrow: '可复用业务技能',
      title: '面向重复性工作的\u200B已批准起点',
      filterLabel: '按团队筛选技能',
      all: '全部团队',
      approved: '已批准',
      items: [
        {
          title: '客户支持分诊',
          body: '依据已批准的支持手册，对进线请求分类、总结上下文、建议下一步动作并路由问题。',
        },
        {
          title: '销售跟进准备',
          body: '把账户笔记、会议上下文、买方信号和方案标准，转化为收入团队可复用的下一步工作流。',
        },
        {
          title: '运营异常处理',
          body: '帮助团队审查异常、收集必要上下文、执行 SOP，并准备可供审查的运营交接。',
        },
        {
          title: '财务与报告支持',
          body: '基于可信输入，标准化周期性分析、差异摘要、报告检查和面向相关方的解释。',
        },
        {
          title: '政策与合规审查',
          body: '为团队提供已批准的起点，用于检查文档、识别缺失证据，并升级敏感案例。',
        },
        {
          title: '员工入职指导',
          body: '帮助新成员从第一天起遵循岗位流程、内部标准和常见的工作模式。',
        },
      ],
    },
    adoption: {
      eyebrow: '采用路径',
      title: '从现成技能\u200B到公司专属 Agent',
      steps: [
        {
          title: '选择已批准的技能',
          body: '从经过审核、面向常见工作流设计的业务技能起步，而不是从空白提示词或不受治理的一次性流程开始。',
        },
        {
          title: '部署到团队流程中',
          body: '把技能连接到文档、系统、审查规则和交接节点，贴合团队已有的工作方式。',
        },
        {
          title: '在部门内统一使用',
          body: '让每位员工拥有同一个已批准的起点，使不同岗位、班次和地点的工作更加一致。',
        },
        {
          title: '演进为公司专属 Agent',
          body: '随着工作流成熟，用内部知识、政策、示例和决策模式适配技能，实现更深入的自动化。',
        },
      ],
    },
    benefits: {
      eyebrow: '为什么重要',
      title: '为运营效率、一致性\u200B和团队赋能而构建',
      items: [
        {
          title: '更快的企业落地',
          body: '现成技能降低了设置时间和不确定性，让部门更快从对 AI 的兴趣走向实际运营使用。',
        },
        {
          title: '减少提示词蔓延',
          body: '用团队可检查、可改进、可标准化的工作流资产，替代一次性的个人提示词。',
        },
        {
          title: '更一致的执行',
          body: '围绕已批准的措辞、升级规则、来源材料和输出要求，统一常见任务的做法。',
        },
        {
          title: '务实的采用路径',
          body: '先从市场技能开始，再把它们培养成基于公司专属知识训练的 Agent。',
        },
      ],
    },
    final: {
      title: '为每个部门提供经过批准的 Agent 起点',
      titleAccent: '经过批准',
      body: 'PrismShadow 帮助企业把现成的 Agent 技能转化为可复用的工作流，再把这些技能培养成由内部知识、政策和运营标准塑造的训练型 Agent。',
      cta: '探索可复用技能',
      secondaryCta: '联系我们',
    },
  },
} satisfies Record<Locale, AgentMarketplacePageCopy>
