import type { Locale } from '../../locales'
import type { DepartmentId } from '../shared'
import type { CtaCopy, FeatureCopy, SectionHeadCopy, TabCopy } from './types'

export type PanofyVisualKind = 'knowledge' | 'teaching' | 'controls' | 'rollout'

export type PanofyCopy = {
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    body: string
    actionsLabel: string
    primaryCta: string
    secondaryCta: string
    docsCta: string
    signalsLabel: string
    signals: string[]
  }
  workbench: {
    ariaLabel: string
    topLabel: string
    brand: string
    sources: string[]
    coreLabel: string
    coreTitle: string
    outputs: string[]
    status: string[]
  }
  value: SectionHeadCopy & {
    bullets: string[]
  }
  modules: SectionHeadCopy & {
    tabsLabel: string
    items: (TabCopy & { visual: PanofyVisualKind })[]
  }
  visuals: {
    knowledge: {
      ariaLabel: string
      inputs: string[]
      coreLabel: string
      coreTitle: string
      outputs: string[]
    }
    teaching: {
      ariaLabel: string
      exampleLabel: string
      exampleTitle: string
      exampleBody: string
      feedback: string[]
    }
    controls: {
      ariaLabel: string
      header: string
      rows: FeatureCopy[]
    }
    rollout: {
      ariaLabel: string
      roles: { team: string; agent: string }[]
    }
  }
  loop: SectionHeadCopy & {
    steps: (FeatureCopy & { label: string })[]
  }
  departments: SectionHeadCopy & {
    fits: { id: DepartmentId; team: string; body: string; link: string }[]
  }
  cta: CtaCopy
}

export const panofyCopy = {
  en: {
    hero: {
      eyebrow: 'Expert agent training',
      title: "Train expert agents from your team's work.",
      titleAccent: 'expert agents',
      body: 'Panofy turns trusted company knowledge, example work, and feedback into reusable AI agents for high-stakes business workflows.',
      actionsLabel: 'Panofy actions',
      primaryCta: 'Start with Panofy',
      secondaryCta: 'View use cases',
      docsCta: 'Read the docs',
      signalsLabel: 'Panofy training inputs',
      signals: ['Company knowledge', 'Expert examples', 'Workflow feedback'],
    },
    workbench: {
      ariaLabel:
        'Panofy training workspace: policies, playbooks and case history become workflow-trained agent memory that drafts review briefs, responses and risk summaries',
      topLabel: 'Training workspace',
      brand: 'Panofy',
      sources: ['Policies', 'Playbooks', 'Case history'],
      coreLabel: 'Agent skill memory',
      coreTitle: 'Workflow-trained context',
      outputs: ['Review brief', 'Draft response', 'Risk summary'],
      status: ['Sources linked', 'Examples learned', 'Feedback ready'],
    },
    value: {
      eyebrow: 'Product focus',
      title: 'The platform layer for repeatable expert work.',
      titleAccent: 'repeatable expert work',
      lead: 'Generic assistants answer from a prompt. Panofy trains agents from the knowledge, standards, examples, and outcomes that make your company different.',
      bullets: [
        'Build agents around business context, not empty chat.',
        'Keep quality high with review logic and source grounding.',
        'Reuse training across teams instead of repeating prompts.',
      ],
    },
    modules: {
      eyebrow: 'Capabilities',
      title: 'Trained on your material, held to your standard.',
      titleAccent: 'held to your standard',
      lead: 'Four layers take an agent from trusted knowledge to department-ready work.',
      tabsLabel: 'Panofy product values',
      items: [
        {
          id: 'knowledge',
          label: 'Knowledge intake',
          title: 'Give agents the material your team already trusts',
          body: 'Bring policies, playbooks, tickets, research, SOPs, and past work into one training base. Panofy keeps the agent grounded in the context your team actually uses.',
          visual: 'knowledge',
          points: [
            {
              title: 'Source-aware context',
              body: 'Every answer stays tied to the material it came from.',
            },
            {
              title: 'Reusable team memory',
              body: 'One training base serves every agent the team trains.',
            },
          ],
        },
        {
          id: 'teaching',
          label: 'Expert teaching',
          title: 'Teach agents from expert examples',
          body: 'Use corrections, preferred outputs, and review notes to teach agents how your team thinks through the work.',
          visual: 'teaching',
          points: [
            {
              title: 'Learns from examples',
              body: 'Preferred outputs become the pattern for the next draft.',
            },
            {
              title: 'Captures review logic',
              body: 'Corrections and review notes turn into agent behavior.',
            },
          ],
        },
        {
          id: 'controls',
          label: 'Governed output',
          title: 'Keep output inside your standard',
          body: 'Use policy checks, source references, review steps, and handoff rules so teams can move faster without losing quality control.',
          visual: 'controls',
          points: [
            {
              title: 'Policy-fit checks',
              body: 'Answers are checked against internal standards before they ship.',
            },
            {
              title: 'Human review paths',
              body: 'Sensitive work routes to the right owner.',
            },
          ],
        },
        {
          id: 'rollout',
          label: 'Role deployment',
          title: 'Launch specialized agents for real department work',
          body: 'Start with one workflow, then train role-specific agents for support, sales, legal, HR, operations, and data work. Each agent carries the right context for its job.',
          visual: 'rollout',
          points: [
            {
              title: 'Department-ready agents',
              body: 'Support, sales, legal, HR, operations and data.',
            },
            {
              title: 'Workflow-level specialization',
              body: 'Each agent is trained for the job it does.',
            },
          ],
        },
      ],
    },
    visuals: {
      knowledge: {
        ariaLabel: 'Panofy knowledge intake map',
        inputs: ['Policies', 'Playbooks', 'Tickets'],
        coreLabel: 'Training base',
        coreTitle: 'Trusted context',
        outputs: ['Examples', 'Research', 'SOPs'],
      },
      teaching: {
        ariaLabel: 'Panofy expert teaching board',
        exampleLabel: 'Expert example',
        exampleTitle: 'Correct response pattern',
        exampleBody:
          'Use the same reasoning path, tone, source standard, and review logic next time.',
        feedback: ['Correction', 'Preferred output', 'Review note'],
      },
      controls: {
        ariaLabel: 'Panofy governed output controls',
        header: 'Output checks',
        rows: [
          { title: 'Policy fit', body: 'Check the answer against internal standards' },
          { title: 'Source trail', body: 'Attach the context that shaped the response' },
          { title: 'Human handoff', body: 'Route sensitive work to the right owner' },
        ],
      },
      rollout: {
        ariaLabel: 'Panofy role-specific agent rollout',
        roles: [
          { team: 'Support', agent: 'Case response agent' },
          { team: 'Sales', agent: 'Pipeline research agent' },
          { team: 'Legal', agent: 'Contract review agent' },
          { team: 'Operations', agent: 'SOP improvement agent' },
        ],
      },
    },
    loop: {
      eyebrow: 'Training loop',
      title: 'Panofy improves the agent while the work keeps moving.',
      titleAccent: 'while the work keeps moving',
      lead: 'Teams can start with one workflow, prove value, then keep teaching the agent with the decisions and corrections that already happen during review.',
      steps: [
        {
          label: 'Collect',
          title: 'Add trusted material',
          body: 'Start from the files, examples, and workflow evidence your team already relies on.',
        },
        {
          label: 'Teach',
          title: 'Show expert judgment',
          body: 'Turn preferred outputs, corrections, and review notes into agent behavior.',
        },
        {
          label: 'Run',
          title: 'Use agents in workflow',
          body: 'Deploy trained agents to draft, summarize, review, classify, and guide work.',
        },
        {
          label: 'Improve',
          title: 'Feed outcomes back',
          body: 'Use new decisions and feedback to keep the agent aligned as the business changes.',
        },
      ],
    },
    departments: {
      eyebrow: 'Department fit',
      title: 'Start where expertise is expensive to repeat.',
      titleAccent: 'expensive to repeat',
      lead: 'Each department has judgment that is hard to scale. Panofy turns it into an agent.',
      fits: [
        {
          id: 'customer-support',
          team: 'Support',
          body: 'Ticket replies, escalation summaries, help center alignment',
          link: 'Support agents',
        },
        {
          id: 'sales',
          team: 'Sales',
          body: 'Account research, follow-up drafts, proposal direction',
          link: 'Sales agents',
        },
        {
          id: 'legal',
          team: 'Legal',
          body: 'Clause review, policy comparison, risk summaries',
          link: 'Legal agents',
        },
        {
          id: 'operations',
          team: 'Operations',
          body: 'SOP checks, exception reviews, weekly action briefs',
          link: 'Operations agents',
        },
      ],
    },
    cta: {
      title: 'Train the agent your team wishes it already had.',
      titleAccent: 'your team wishes it already had',
      body: 'Pick a workflow with repeated judgment, scattered context, and review pressure. Panofy gives that work a trainable agent layer.',
      primary: { label: 'Try Panofy', href: 'https://panofy.ai/' },
      secondary: { label: 'Book a demo', href: '/contact' },
    },
  },
  zh: {
    hero: {
      eyebrow: '专家 Agent 训练',
      title: '从团队真实工作中训练专家 Agent。',
      titleAccent: '专家 Agent',
      body: 'Panofy 将可信的公司知识、示例工作和反馈转化为可复用的 AI Agent，服务高风险的业务工作流。',
      actionsLabel: 'Panofy 操作',
      primaryCta: '开始使用 Panofy',
      secondaryCta: '查看用例',
      docsCta: '阅读文档',
      signalsLabel: 'Panofy 训练输入',
      signals: ['公司知识', '专家示例', '工作流反馈'],
    },
    workbench: {
      ariaLabel:
        'Panofy 训练工作台：政策、操作手册与案例历史沉淀为由工作流训练的 Agent 记忆，用于生成审查简报、回复草稿与风险摘要',
      topLabel: '训练工作台',
      brand: 'Panofy',
      sources: ['政策', '操作手册', '案例历史'],
      coreLabel: 'Agent 技能记忆',
      coreTitle: '由工作流训练的上下文',
      outputs: ['审查简报', '回复草稿', '风险摘要'],
      status: ['来源已关联', '示例已学习', '反馈已就绪'],
    },
    value: {
      eyebrow: '产品重点',
      title: '面向可重复专家工作的平台层。',
      titleAccent: '可重复专家工作',
      lead: '通用助手只根据提示词作答。Panofy 从知识、标准、示例和结果中训练 Agent，让它理解公司真正与众不同的地方。',
      bullets: [
        '围绕业务上下文构建 Agent，而不是空白聊天。',
        '用审查逻辑和来源依据保持高质量。',
        '跨团队复用训练成果，而不是反复编写提示词。',
      ],
    },
    modules: {
      eyebrow: '核心能力',
      title: '用你的材料训练，按你的标准交付。',
      titleAccent: '按你的标准交付',
      lead: '四层能力，让 Agent 从可信知识走到部门级的真实工作。',
      tabsLabel: 'Panofy 产品价值',
      items: [
        {
          id: 'knowledge',
          label: '知识接入',
          title: '把团队已经信任的材料交给 Agent',
          body: '将政策、操作手册、工单、研究、SOP 和过往工作汇入同一个训练基础。Panofy 让 Agent 始终基于团队实际使用的上下文。',
          visual: 'knowledge',
          points: [
            {
              title: '带来源意识的上下文',
              body: '每个回答都能追溯到它所依据的材料。',
            },
            {
              title: '可复用的团队记忆',
              body: '同一个训练基础服务团队训练的每个 Agent。',
            },
          ],
        },
        {
          id: 'teaching',
          label: '专家教学',
          title: '用专家示例训练 Agent',
          body: '通过修正、偏好输出和审查备注，教会 Agent 团队如何思考和完成工作。',
          visual: 'teaching',
          points: [
            {
              title: '从示例中学习',
              body: '偏好输出成为下一次起草的范式。',
            },
            {
              title: '捕捉审查逻辑',
              body: '修正与审查备注转化为 Agent 行为。',
            },
          ],
        },
        {
          id: 'controls',
          label: '可治理输出',
          title: '让输出保持在团队标准之内',
          body: '通过政策检查、来源引用、审查步骤和交接规则，让团队提速的同时不丢失质量控制。',
          visual: 'controls',
          points: [
            {
              title: '政策适配检查',
              body: '输出前对照内部标准检查答案。',
            },
            {
              title: '人工审查路径',
              body: '敏感工作路由给合适的负责人。',
            },
          ],
        },
        {
          id: 'rollout',
          label: '角色部署',
          title: '为真实的部门工作发布专属 Agent',
          body: '从一个工作流开始，再为支持、销售、法务、HR、运营和数据工作训练角色专属 Agent。每个 Agent 都携带完成其工作所需的上下文。',
          visual: 'rollout',
          points: [
            {
              title: '部门可用的 Agent',
              body: '覆盖支持、销售、法务、HR、运营和数据。',
            },
            {
              title: '工作流级专业化',
              body: '每个 Agent 都为它承担的工作而训练。',
            },
          ],
        },
      ],
    },
    visuals: {
      knowledge: {
        ariaLabel: 'Panofy 知识接入图',
        inputs: ['政策', '操作手册', '工单'],
        coreLabel: '训练基础',
        coreTitle: '可信上下文',
        outputs: ['示例', '研究', 'SOP'],
      },
      teaching: {
        ariaLabel: 'Panofy 专家教学面板',
        exampleLabel: '专家示例',
        exampleTitle: '正确的回应模式',
        exampleBody: '下次沿用相同的推理路径、语气、来源标准和审查逻辑。',
        feedback: ['修正', '偏好输出', '审查备注'],
      },
      controls: {
        ariaLabel: 'Panofy 可治理输出控制',
        header: '输出检查',
        rows: [
          { title: '政策适配', body: '对照内部标准检查答案' },
          { title: '来源链路', body: '附上塑造回应的上下文' },
          { title: '人工交接', body: '将敏感工作路由给合适的负责人' },
        ],
      },
      rollout: {
        ariaLabel: 'Panofy 角色专属 Agent 发布',
        roles: [
          { team: '支持', agent: '案例回复 Agent' },
          { team: '销售', agent: '商机研究 Agent' },
          { team: '法务', agent: '合同审查 Agent' },
          { team: '运营', agent: 'SOP 改进 Agent' },
        ],
      },
    },
    loop: {
      eyebrow: '训练闭环',
      title: 'Panofy 让 Agent 在工作中持续进步。',
      titleAccent: '在工作中持续进步',
      lead: '团队可以从一个工作流开始验证价值，再用审查中本来就会产生的决策和修正继续训练 Agent。',
      steps: [
        {
          label: '收集',
          title: '加入可信材料',
          body: '从团队已经依赖的文件、示例和工作流证据开始。',
        },
        {
          label: '教学',
          title: '展示专家判断',
          body: '把偏好输出、修正和审查备注转化为 Agent 行为。',
        },
        {
          label: '运行',
          title: '在工作流中使用 Agent',
          body: '部署训练后的 Agent，用于起草、总结、审查、分类和指导工作。',
        },
        {
          label: '改进',
          title: '将结果反馈回来',
          body: '用新的决策和反馈，让 Agent 随业务变化保持对齐。',
        },
      ],
    },
    departments: {
      eyebrow: '部门适配',
      title: '从专家经验昂贵、难以复制的地方开始。',
      titleAccent: '难以复制',
      lead: '把各部门难以规模化的专业判断，训练成 Agent。',
      fits: [
        {
          id: 'customer-support',
          team: '支持',
          body: '工单回复、升级摘要、帮助中心对齐',
          link: '支持 Agent',
        },
        {
          id: 'sales',
          team: '销售',
          body: '客户研究、跟进草稿、提案方向',
          link: '销售 Agent',
        },
        {
          id: 'legal',
          team: '法务',
          body: '条款审查、政策对比、风险摘要',
          link: '法务 Agent',
        },
        {
          id: 'operations',
          team: '运营',
          body: 'SOP 检查、异常审查、每周行动简报',
          link: '运营 Agent',
        },
      ],
    },
    cta: {
      title: '训练团队一直想要的 Agent。',
      titleAccent: '一直想要的 Agent',
      body: '选择一个需要重复判断、上下文分散且有审查压力的工作流。Panofy 为这类工作提供可训练的 Agent 层。',
      primary: { label: '试用 Panofy', href: 'https://panofy.ai/' },
      secondary: { label: '预约演示', href: '/contact' },
    },
  },
} satisfies Record<Locale, PanofyCopy>
