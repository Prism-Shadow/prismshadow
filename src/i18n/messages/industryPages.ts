import type { Locale } from '../locales'
import type { IndustryId } from './shared'

/*
 * Industry solution pages: page-level copy (hero, section heads, closing CTA)
 * for the eight industries, plus the strings shared by the one template that
 * renders them all. Scenarios and the other per-industry lists live in
 * ./industryPageDetails.ts. Only the lazy IndustryPage chunk imports this file.
 */

export type IndustryLink = {
  label: string
  href: string
}

type IndustryHeadCopy = {
  title: string
  lead: string
}

export type IndustryPageCopy = {
  hero: {
    title: string
    /** Part of the title rendered in the accent color (must appear in title). */
    titleAccent: string
    lead: string
    primary: IndustryLink
    secondary: IndustryLink
  }
  /** Source systems that feed the agent team: hero schematic and the loop's Ingest step. */
  signals: string[]
  whyNow: IndustryHeadCopy
  scenarios: IndustryHeadCopy & {
    tabsLabel: string
    workspaceLabel: string
  }
  /** Why PrismShadow: how the platform fits this industry. */
  fit: IndustryHeadCopy
  resources: IndustryHeadCopy
  cta: {
    title: string
    titleAccent: string
    body: string
    primary: IndustryLink
    secondary?: IndustryLink
  }
}

export type IndustryTemplateCopy = {
  eyebrows: {
    whyNow: string
    scenarios: string
    fit: string
    resources: string
  }
  /** Hero schematic: signals → agent team → human review → action. */
  flow: {
    title: string
    /** `{n}` is replaced by the number of agents. */
    agents: string
    signals: string
    team: string
    output: string
    review: string
    act: string
    next: string
    /** Accessible description; `{signals}` and `{agents}` are replaced by lists. */
    label: string
  }
  /** Scenario workspace mock. */
  workspace: {
    /** Kind label above the insight the agent team hands over. */
    briefing: string
  }
  /** The platform loop applied to the industry. */
  loop: {
    title: string
    ingest: string
    synthesize: string
    train: string
    deploy: string
    evolve: string
    synthesizeBody: string
    trainBody: string
    evolveBody: string
    feedback: string
  }
}

export const industryTemplateCopy = {
  en: {
    eyebrows: {
      whyNow: 'Why now',
      scenarios: 'Core scenarios',
      fit: 'Why PrismShadow',
      resources: 'Resources',
    },
    flow: {
      title: 'Agent workflow',
      agents: '{n} agents',
      signals: 'Signals',
      team: 'Agent team',
      output: 'Output',
      review: 'Human review',
      act: 'Approved action',
      next: 'Next action',
      label:
        'Agent workflow: {signals} feed an agent team for {agents}. Every output passes human review before action.',
    },
    workspace: {
      briefing: 'Briefing',
    },
    loop: {
      title: 'The PrismShadow loop',
      ingest: 'Ingest',
      synthesize: 'Synthesize',
      train: 'Train',
      deploy: 'Deploy',
      evolve: 'Evolve',
      synthesizeBody: 'Training tasks, eval sets and scoring rubrics generated from your cases and rules.',
      trainBody: 'Open models specialized on your work, on your own infrastructure.',
      evolveBody: 'Reviewer corrections and outcomes become the next round of training signal.',
      feedback: 'Every run feeds the next round.',
    },
  },
  zh: {
    eyebrows: {
      whyNow: '为什么是现在',
      scenarios: '核心场景',
      fit: '为什么选择 PrismShadow',
      resources: '资源',
    },
    flow: {
      title: 'Agent 工作流',
      agents: '{n} 个 Agent',
      signals: '业务信号',
      team: 'Agent 团队',
      output: '输出',
      review: '人工审核',
      act: '执行',
      next: '下一步',
      label: 'Agent 工作流：{signals}汇入 Agent 团队，覆盖{agents}；所有输出经人工审核后执行。',
    },
    workspace: {
      briefing: '简报',
    },
    loop: {
      title: 'PrismShadow 闭环',
      ingest: '接入',
      synthesize: '合成',
      train: '训练',
      deploy: '部署',
      evolve: '进化',
      synthesizeBody: '基于你的案例与规则，自动生成训练任务、评估集与评分标准。',
      trainBody: '在你自己的基础设施上，把开源模型训练成业务专家。',
      evolveBody: '审核修正与业务结果，回流为下一轮训练信号。',
      feedback: '每一次运行，都回流为下一轮训练。',
    },
  },
} satisfies Record<Locale, IndustryTemplateCopy>

const demo = { en: { label: 'Book a demo', href: '/contact' }, zh: { label: '预约演示', href: '/contact' } }

export const industryPagesCopy = {
  en: {
    'b2b-saas': {
      hero: {
        title: 'AI agent orchestration for B2B SaaS teams',
        titleAccent: 'B2B SaaS teams',
        lead: 'Turn scattered customer signals into faster product, GTM, sales, and customer success decisions.',
        primary: demo.en,
        secondary: { label: 'Explore use cases', href: '#scenarios' },
      },
      signals: ['CRM', 'Product usage', 'Support tickets', 'Sales calls', 'Customer feedback'],
      whyNow: {
        title: 'B2B SaaS has moved beyond AI tools',
        lead: 'AI adoption is no longer the advantage. The next advantage belongs to teams that can orchestrate AI agents across real business workflows.',
      },
      scenarios: {
        title: 'AI agents across the SaaS customer lifecycle',
        lead: 'Explore how PrismShadow agents connect product usage, CRM context, sales conversations, support tickets, and customer feedback into repeatable revenue and product workflows.',
        tabsLabel: 'B2B SaaS scenarios',
        workspaceLabel: 'SaaS agent workspace',
      },
      fit: {
        title: 'Why SaaS teams need an agent layer built around customer context',
        lead: 'PrismShadow helps SaaS teams connect customer feedback, product usage, sales conversations, and market signals into governed AI agent workflows.',
      },
      resources: {
        title: 'Learn more about B2B SaaS AI agents',
        lead: 'Explore how AI agents are reshaping customer intelligence, product validation, GTM execution, account workflows, and SaaS operations.',
      },
      cta: {
        title: 'Ready to build your B2B SaaS agent layer?',
        titleAccent: 'B2B SaaS agent layer',
        body: 'Start with your top recurring SaaS questions and turn them into governed AI workflows across product, GTM, sales, and customer success.',
        primary: demo.en,
        secondary: { label: 'Map your first agent workflow', href: '#scenarios' },
      },
    },
    'financial-services': {
      hero: {
        title: 'Trainable AI agents for private financial workflows',
        titleAccent: 'private financial workflows',
        lead: "Train agents on your institution's policies, documents, workflows, and domain knowledge. Deploy them locally so sensitive financial data stays inside your environment.",
        primary: demo.en,
        secondary: { label: 'Read the financial AI guide', href: '/blog' },
      },
      signals: ['Policies', 'Client files', 'Risk playbooks', 'Case notes', 'Approval rules'],
      whyNow: {
        title: 'Financial AI needs private context and reviewable workflows',
        lead: 'Financial services teams operate in high-context, high-trust environments. AI agents need institutional knowledge, local controls, review paths, and traceability before they can support meaningful work.',
      },
      scenarios: {
        title: 'AI agents across private financial workflows',
        lead: 'Explore how PrismShadow agents help financial teams connect policies, client context, risk playbooks, evidence, and approval paths into controlled workflows.',
        tabsLabel: 'Financial services scenarios',
        workspaceLabel: 'Financial agent workspace',
      },
      fit: {
        title: 'Why financial services need a governed agent layer',
        lead: 'Turn fragmented financial knowledge, risk policies, client files, case notes, research, and approval rules into AI agents that prepare review-ready work while keeping humans in control.',
      },
      resources: {
        title: 'Learn more about financial AI agents',
        lead: 'Explore how AI agents can support private financial workflows across risk, compliance, underwriting, fraud, AML, research, and client preparation.',
      },
      cta: {
        title: 'Build your local financial agent layer',
        titleAccent: 'local financial agent layer',
        body: "Train agents on your institution's knowledge. Deploy them in your environment. Keep financial AI private, contextual, and controlled.",
        primary: demo.en,
      },
    },
    retail: {
      hero: {
        title: 'AI agents for the next-generation retail experience',
        titleAccent: 'next-generation retail experience',
        lead: 'PrismShadow helps retailers turn fragmented product, customer, policy, and operational knowledge into AI agents that work across customer experience, service, intelligence, and operations.',
        primary: demo.en,
        secondary: {
          label: 'Read the retail AI guide',
          href: '/blog/how-ai-agents-improve-next-generation-retail-experience',
        },
      },
      signals: ['Product catalog', 'Orders', 'Inventory', 'Policies', 'Support tickets'],
      whyNow: {
        title: 'Retail is moving faster than static systems can handle',
        lead: 'Customer journeys, fulfillment models, support expectations, and retail operations are changing faster than traditional workflows can adapt.',
      },
      scenarios: {
        title: 'AI agents across the retail business',
        lead: 'Explore how PrismShadow agents support customer experience, service, intelligence, and operations with long-term business context.',
        tabsLabel: 'Retail scenarios',
        workspaceLabel: 'Retail agent workspace',
      },
      fit: {
        title: 'Why retailers need an agent layer built around their business',
        lead: 'Built for retail teams that need agents to remember context, adapt to change, and act across real business workflows.',
      },
      resources: {
        title: 'Learn more about retail AI agents',
        lead: 'Go deeper into the pain points, implementation patterns, and strategy behind AI agents for modern retail.',
      },
      cta: {
        title: 'Build AI agents around the way your retail business works',
        titleAccent: 'your retail business',
        body: 'PrismShadow helps retailers create AI agents that connect customer experience, service, intelligence, and operations with long-term business context.',
        primary: demo.en,
      },
    },
    travel: {
      hero: {
        title: 'AI agents for connected travel experiences',
        titleAccent: 'connected travel experiences',
        lead: 'PrismShadow helps travel companies build AI agents that understand travelers, bookings, policies, service workflows, and operational context.',
        primary: demo.en,
        secondary: { label: 'Read the travel AI guide', href: '/blog/travel-ai-agents-context' },
      },
      signals: ['Bookings & PNRs', 'Fare rules', 'Hotel policies', 'Loyalty data', 'Live operations'],
      whyNow: {
        title: 'Travel is too dynamic for static workflows',
        lead: 'Travel journeys are complex, rules change by context, and disruptions happen in real time. Travel companies need AI agents that can understand fragmented information, reason across systems, and support action across the full journey.',
      },
      scenarios: {
        title: 'AI agents across the travel business',
        lead: 'Explore how PrismShadow agents support traveler experience, booking operations, passenger service, and travel intelligence with long-term business context.',
        tabsLabel: 'Travel scenarios',
        workspaceLabel: 'Travel agent workspace',
      },
      fit: {
        title: 'Why travel companies need an agent layer built around the journey',
        lead: 'From trip planning to booking operations, passenger service, and travel intelligence, PrismShadow turns fragmented travel knowledge into agents that remember context, adapt to change, and help teams act faster.',
      },
      resources: {
        title: 'Learn more about travel AI agents',
        lead: 'Explore how AI agents can help travel companies connect journey context, automate service workflows, and improve operational efficiency.',
      },
      cta: {
        title: 'Build AI agents around the way travel actually works',
        titleAccent: 'travel actually works',
        body: 'PrismShadow helps travel companies create AI agents that understand journeys, bookings, policies, service workflows, and operational context.',
        primary: demo.en,
      },
    },
    healthcare: {
      hero: {
        title: 'AI agents for trusted healthcare workflows',
        titleAccent: 'trusted healthcare workflows',
        lead: 'PrismShadow helps healthcare teams build AI agents that support consumer health guidance, patient access, evidence-based communication, and operational intelligence.',
        primary: demo.en,
        secondary: { label: 'Read the healthcare AI guide', href: '/blog/healthcare-ai-guardrails-not-prompts' },
      },
      signals: ['Product evidence', 'Payer rules', 'Policies & SOPs', 'Patient interactions', 'Support cases'],
      whyNow: {
        title: 'Healthcare needs AI agents built for trust',
        lead: 'Healthcare workflows are complex, sensitive, and highly regulated. AI agents need trusted context, clear guardrails, and human oversight, not just better chatbot responses.',
      },
      scenarios: {
        title: 'AI agents across healthcare workflows',
        lead: 'Explore how PrismShadow agents support healthcare journeys where context, evidence, safety, and trust matter most.',
        tabsLabel: 'Healthcare scenarios',
        workspaceLabel: 'Healthcare agent workspace',
      },
      fit: {
        title: 'Why healthcare needs an agent layer built for trust',
        lead: 'Turn fragmented healthcare knowledge, patient interactions, product evidence, payer rules, policies, SOPs, and support cases into AI agents that preserve context, follow guardrails, and help teams act with confidence.',
      },
      resources: {
        title: 'Learn more about healthcare AI agents',
        lead: 'Explore how AI agents can support safer, more trusted healthcare workflows across consumer health, patient access, evidence operations, and healthcare intelligence.',
      },
      cta: {
        title: 'Build healthcare AI agents that people can trust',
        titleAccent: 'people can trust',
        body: 'PrismShadow helps healthcare teams create AI agents that understand context, follow guardrails, support human review, and turn fragmented healthcare knowledge into trusted workflows.',
        primary: demo.en,
      },
    },
    'supply-chain': {
      hero: {
        title: 'AI agents for adaptive supply chain operations',
        titleAccent: 'adaptive supply chain operations',
        lead: 'PrismShadow helps enterprises build AI agents that sense disruptions, reason across fragmented systems, recommend actions, and coordinate workflows across planning, sourcing, inventory, logistics, and fulfillment.',
        primary: demo.en,
        secondary: { label: 'Read the supply chain AI guide', href: '/blog/agentic-supply-chain-control-towers' },
      },
      signals: ['ERP', 'WMS · TMS', 'MES', 'Supplier data', 'Contracts & SOPs'],
      whyNow: {
        title: 'Supply chains are too dynamic for static workflows',
        lead: 'Supply chains run across systems, teams, suppliers, logistics partners, and customer commitments. When conditions change, teams need agents that can understand context, reason through trade-offs, and prepare action.',
      },
      scenarios: {
        title: 'AI agents across supply chain operations',
        lead: 'Explore how PrismShadow agents support control tower visibility, planning, procurement, logistics, and fulfillment with connected operational context.',
        tabsLabel: 'Supply chain scenarios',
        workspaceLabel: 'Supply chain agent workspace',
      },
      fit: {
        title: 'Why supply chains need an agent layer built around operations',
        lead: 'Turn supply chain context from ERP, WMS, TMS, MES, procurement, supplier, inventory, order, contract, SOP, and risk data into AI agents that help teams act faster with long-term operational memory.',
      },
      resources: {
        title: 'Learn more about supply chain AI agents',
        lead: 'Explore how AI agents can help supply chain teams connect fragmented context, monitor disruptions, simulate responses, and coordinate action across planning, sourcing, logistics, and fulfillment.',
      },
      cta: {
        title: 'Build AI agents around the way your supply chain actually works',
        titleAccent: 'your supply chain',
        body: 'PrismShadow helps supply chain teams connect planning, procurement, inventory, logistics, fulfillment, and operational data into AI workflows that sense change, recommend action, and preserve long-term business context.',
        primary: demo.en,
      },
    },
    restaurants: {
      hero: {
        title: 'AI agents for restaurant profit operations',
        titleAccent: 'restaurant profit operations',
        lead: 'PrismShadow helps restaurant teams turn POS, delivery, social commerce, private orders, purchasing, labor, inventory, and store execution data into AI agents that protect profit across the whole business.',
        primary: demo.en,
        secondary: { label: 'Read the restaurant AI guide', href: '/blog/restaurant-ai-contribution-profit' },
      },
      signals: ['POS', 'Delivery platforms', 'Social deals', 'Purchasing', 'Labor & inventory'],
      whyNow: {
        title: 'Restaurants need more than platform reports',
        lead: 'Restaurant operators already have reports from POS systems, delivery platforms, payment tools, and marketing channels. The problem is that sales data does not show true profit, and insights rarely turn into store-level action.',
      },
      scenarios: {
        title: 'AI agents across restaurant operations',
        lead: 'Explore how PrismShadow agents help restaurant teams connect revenue, margin, costs, inventory, and execution into one operating workflow.',
        tabsLabel: 'Restaurant scenarios',
        workspaceLabel: 'Restaurant profit agent workspace',
      },
      fit: {
        title: 'Why restaurants need an agent layer built around profit',
        lead: 'Not just sales reports. PrismShadow helps restaurant operators understand what actually made money, where margin leaked, and what each store should do next.',
      },
      resources: {
        title: 'Learn more about restaurant AI agents',
        lead: 'Explore how AI agents can help restaurant operators move from sales reports to profit operations.',
      },
      cta: {
        title: 'Build AI agents around the way restaurants actually make money',
        titleAccent: 'actually make money',
        body: 'PrismShadow helps restaurant teams connect channel revenue, menu margin, food cost, labor, inventory, and store execution into AI workflows that protect profit and drive daily action.',
        primary: demo.en,
      },
    },
    'auto-dealerships': {
      hero: {
        title: 'AI agents for modern auto dealership operations',
        titleAccent: 'modern auto dealership operations',
        lead: 'PrismShadow helps auto dealerships turn fragmented customer, inventory, auction, sales, F&I, service, and marketing context into AI agents that work across the full dealership lifecycle.',
        primary: demo.en,
        secondary: { label: 'Read the auto dealership AI guide', href: '/blog/used-car-margins-before-the-lot' },
      },
      signals: ['CRM & DMS', 'Inventory', 'Auction run lists', 'Service records', 'F&I'],
      whyNow: {
        title: 'Auto dealerships are moving from records to action',
        lead: 'Auto dealerships run on data, but the information that drives customer relationships, vehicle acquisition, pricing, financing, service, and retention is often fragmented across disconnected systems.',
      },
      scenarios: {
        title: 'AI agents across the auto dealership lifecycle',
        lead: 'Explore how PrismShadow agents support customer lifecycle, auction and inventory, deal operations, and service retention with long-term dealership context.',
        tabsLabel: 'Auto dealership scenarios',
        workspaceLabel: 'Dealership agent workspace',
      },
      fit: {
        title: 'Why auto dealerships need an agent layer built around their business',
        lead: 'From lead handling to auction intelligence, deal support, service retention, and dealership operations, PrismShadow helps auto dealership teams move from systems of record to systems of action.',
      },
      resources: {
        title: 'Learn more about AI agents for auto dealerships',
        lead: 'Explore how AI agents can help auto dealerships connect data, improve used-car acquisition, streamline deal workflows, and build agentic dealership operations.',
      },
      cta: {
        title: 'Build AI agents around the way auto dealerships actually work',
        titleAccent: 'auto dealerships actually work',
        body: 'PrismShadow helps auto dealership teams connect customer lifecycle, auction intelligence, deal operations, service retention, and dealership data into AI workflows that move from record keeping to action.',
        primary: demo.en,
      },
    },
  },
  zh: {
    'b2b-saas': {
      hero: {
        title: '面向 B2B SaaS 团队的 AI Agent 编排',
        titleAccent: 'B2B SaaS 团队',
        lead: '把分散的客户信号，转化为更快的产品、GTM、销售与客户成功决策。',
        primary: demo.zh,
        secondary: { label: '探索用例', href: '#scenarios' },
      },
      signals: ['CRM', '产品使用数据', '支持工单', '销售通话', '客户反馈'],
      whyNow: {
        title: 'B2B SaaS 已经超越 AI 工具阶段',
        lead: '采用 AI 本身已不再是优势。下一个优势属于能在真实业务工作流中编排 AI Agent 的团队。',
      },
      scenarios: {
        title: '覆盖 SaaS 客户生命周期的 AI Agent',
        lead: '了解 PrismShadow Agent 如何连接产品使用、CRM 上下文、销售对话、支持工单和客户反馈，形成可重复的收入与产品工作流。',
        tabsLabel: 'B2B SaaS 场景',
        workspaceLabel: 'SaaS Agent 工作台',
      },
      fit: {
        title: '为什么 SaaS 团队需要围绕客户上下文构建的 Agent 层',
        lead: 'PrismShadow 帮助 SaaS 团队把客户反馈、产品使用、销售对话和市场信号连接成可治理的 AI Agent 工作流。',
      },
      resources: {
        title: '深入了解 B2B SaaS AI Agent',
        lead: '了解 AI Agent 如何重塑客户智能、产品验证、GTM 执行、账户工作流和 SaaS 运营。',
      },
      cta: {
        title: '准备好构建你的 B2B SaaS Agent 层了吗？',
        titleAccent: 'B2B SaaS Agent 层',
        body: '从团队最常反复提出的 SaaS 问题开始，把它们转化为覆盖产品、GTM、销售和客户成功的可治理 AI 工作流。',
        primary: demo.zh,
        secondary: { label: '规划第一个 Agent 工作流', href: '#scenarios' },
      },
    },
    'financial-services': {
      hero: {
        title: '面向私有金融工作流的可训练 AI Agent',
        titleAccent: '私有金融工作流',
        lead: '基于机构自己的政策、文档、工作流和领域知识训练 Agent，并在本地部署，让敏感金融数据始终留在你的环境内。',
        primary: demo.zh,
        secondary: { label: '阅读金融 AI 指南', href: '/blog' },
      },
      signals: ['政策制度', '客户档案', '风险手册', '案例备注', '审批规则'],
      whyNow: {
        title: '金融 AI 需要私有上下文与可审查的工作流',
        lead: '金融服务团队身处高上下文、高信任的环境。AI Agent 需要机构知识、本地控制、审查路径和可追溯性，才能承担有意义的工作。',
      },
      scenarios: {
        title: '覆盖私有金融工作流的 AI Agent',
        lead: '了解 PrismShadow Agent 如何帮助金融团队连接政策、客户上下文、风险手册、证据和审批路径，形成受控工作流。',
        tabsLabel: '金融服务场景',
        workspaceLabel: '金融 Agent 工作台',
      },
      fit: {
        title: '为什么金融服务需要可治理的 Agent 层',
        lead: '将碎片化的金融知识、风险政策、客户档案、案例备注、研究和审批规则，转化为能准备待审查工作、同时让人始终掌控的 AI Agent。',
      },
      resources: {
        title: '深入了解金融 AI Agent',
        lead: '了解 AI Agent 如何在风险、合规、承保、欺诈、AML、研究和客户准备等私有金融工作流中提供支持。',
      },
      cta: {
        title: '构建你的本地金融 Agent 层',
        titleAccent: '本地金融 Agent 层',
        body: '用机构知识训练 Agent，部署在你自己的环境中，让金融 AI 保持私有、有上下文且可控。',
        primary: demo.zh,
      },
    },
    retail: {
      hero: {
        title: '面向下一代零售体验的 AI Agent',
        titleAccent: '下一代零售体验',
        lead: 'PrismShadow 帮助零售商把碎片化的产品、客户、政策和运营知识，转化为贯穿客户体验、服务、智能分析和运营的 AI Agent。',
        primary: demo.zh,
        secondary: {
          label: '阅读零售 AI 指南',
          href: '/blog/how-ai-agents-improve-next-generation-retail-experience',
        },
      },
      signals: ['商品目录', '订单', '库存', '政策规则', '支持工单'],
      whyNow: {
        title: '零售的变化速度，已超出静态系统的承载能力',
        lead: '客户旅程、履约模式、服务预期和零售运营的变化速度，都已超出传统工作流的适应能力。',
      },
      scenarios: {
        title: '覆盖零售业务的 AI Agent',
        lead: '了解 PrismShadow Agent 如何以长期业务上下文支持客户体验、服务、智能分析和运营。',
        tabsLabel: '零售场景',
        workspaceLabel: '零售 Agent 工作台',
      },
      fit: {
        title: '为什么零售商需要围绕自身业务构建的 Agent 层',
        lead: '为需要 Agent 记住上下文、适应变化，并在真实业务工作流中行动的零售团队而构建。',
      },
      resources: {
        title: '深入了解零售 AI Agent',
        lead: '深入了解现代零售 AI Agent 背后的痛点、落地模式和策略。',
      },
      cta: {
        title: '让 AI Agent 贴合零售业务的真实运作',
        titleAccent: '零售业务的真实运作',
        body: 'PrismShadow 帮助零售商构建连接客户体验、服务、智能分析和运营，并具备长期业务上下文的 AI Agent。',
        primary: demo.zh,
      },
    },
    travel: {
      hero: {
        title: '面向连贯旅行体验的 AI Agent',
        titleAccent: '连贯旅行体验',
        lead: 'PrismShadow 帮助旅行企业构建理解旅客、预订、政策、服务工作流和运营上下文的 AI Agent。',
        primary: demo.zh,
        secondary: { label: '阅读旅行 AI 指南', href: '/blog/travel-ai-agents-context' },
      },
      signals: ['预订与 PNR', '票价规则', '酒店政策', '会员数据', '实时运营动态'],
      whyNow: {
        title: '旅行业务变化太快，静态工作流跟不上',
        lead: '旅程复杂，规则随情境变化，中断实时发生。旅行企业需要能理解碎片信息、跨系统推理，并支撑全旅程行动的 AI Agent。',
      },
      scenarios: {
        title: '覆盖旅行业务的 AI Agent',
        lead: '了解 PrismShadow Agent 如何以长期业务上下文支持旅客体验、预订运营、乘客服务和旅行智能分析。',
        tabsLabel: '旅行场景',
        workspaceLabel: '旅行 Agent 工作台',
      },
      fit: {
        title: '为什么旅行企业需要围绕旅程构建的 Agent 层',
        lead: '从行程规划到预订运营、乘客服务和旅行智能分析，PrismShadow 把碎片化的旅行知识转化为能记住上下文、适应变化、帮助团队更快行动的 Agent。',
      },
      resources: {
        title: '深入了解旅行 AI Agent',
        lead: '了解 AI Agent 如何帮助旅行企业连接旅程上下文、自动化服务工作流并提升运营效率。',
      },
      cta: {
        title: '让 AI Agent 贴合旅行业务的真实运作',
        titleAccent: '旅行业务的真实运作',
        body: 'PrismShadow 帮助旅行企业构建理解旅程、预订、政策、服务工作流和运营上下文的 AI Agent。',
        primary: demo.zh,
      },
    },
    healthcare: {
      hero: {
        title: '面向可信医疗健康工作流的 AI Agent',
        titleAccent: '可信医疗健康工作流',
        lead: 'PrismShadow 帮助医疗健康团队构建支持消费者健康指导、患者准入、循证沟通和运营智能的 AI Agent。',
        primary: demo.zh,
        secondary: { label: '阅读医疗健康 AI 指南', href: '/blog/healthcare-ai-guardrails-not-prompts' },
      },
      signals: ['产品证据', '支付方规则', '政策与 SOP', '患者互动', '支持案例'],
      whyNow: {
        title: '医疗健康需要值得信赖的 AI Agent',
        lead: '医疗健康工作流复杂、敏感且受到严格监管。AI Agent 需要的不只是更好的聊天回复，还有可信的上下文、清晰的护栏和人工监督。',
      },
      scenarios: {
        title: '覆盖医疗健康工作流的 AI Agent',
        lead: '了解 PrismShadow Agent 如何支持最需要上下文、证据、安全与信任的医疗健康旅程。',
        tabsLabel: '医疗健康场景',
        workspaceLabel: '医疗健康 Agent 工作台',
      },
      fit: {
        title: '为什么医疗健康需要围绕信任构建的 Agent 层',
        lead: '将碎片化的医疗知识、患者互动、产品证据、支付方规则、政策、SOP 和支持案例，转化为能保留上下文、遵守护栏、帮助团队放心行动的 AI Agent。',
      },
      resources: {
        title: '深入了解医疗健康 AI Agent',
        lead: '了解 AI Agent 如何在消费者健康、患者准入、证据运营和医疗健康智能中支撑更安全、更可信的工作流。',
      },
      cta: {
        title: '构建值得信赖的医疗健康 AI Agent',
        titleAccent: '值得信赖',
        body: 'PrismShadow 帮助医疗健康团队构建理解上下文、遵守护栏、支持人工审核的 AI Agent，把碎片化的医疗知识转化为可信工作流。',
        primary: demo.zh,
      },
    },
    'supply-chain': {
      hero: {
        title: '面向自适应供应链运营的 AI Agent',
        titleAccent: '自适应供应链运营',
        lead: 'PrismShadow 帮助企业构建 AI Agent：感知中断、跨碎片化系统推理、建议行动，并协调计划、寻源、库存、物流和履约工作流。',
        primary: demo.zh,
        secondary: { label: '阅读供应链 AI 指南', href: '/blog/agentic-supply-chain-control-towers' },
      },
      signals: ['ERP', 'WMS · TMS', 'MES', '供应商数据', '合同与 SOP'],
      whyNow: {
        title: '供应链变化太快，静态工作流跟不上',
        lead: '供应链横跨系统、团队、供应商、物流伙伴和客户承诺。条件一旦变化，团队需要能理解上下文、权衡取舍并准备行动的 Agent。',
      },
      scenarios: {
        title: '覆盖供应链运营的 AI Agent',
        lead: '了解 PrismShadow Agent 如何用连通的运营上下文，支持控制塔可视化、计划、采购、物流和履约。',
        tabsLabel: '供应链场景',
        workspaceLabel: '供应链 Agent 工作台',
      },
      fit: {
        title: '为什么供应链需要围绕运营构建的 Agent 层',
        lead: '把 ERP、WMS、TMS、MES、采购、供应商、库存、订单、合同、SOP 和风险数据中的供应链上下文，转化为具备长期运营记忆、帮助团队更快行动的 AI Agent。',
      },
      resources: {
        title: '深入了解供应链 AI Agent',
        lead: '了解 AI Agent 如何帮助供应链团队连接碎片化上下文、监控中断、模拟响应，并在计划、寻源、物流和履约之间协调行动。',
      },
      cta: {
        title: '让 AI Agent 贴合供应链的真实运作',
        titleAccent: '供应链的真实运作',
        body: 'PrismShadow 帮助供应链团队把计划、采购、库存、物流、履约和运营数据，连接成能感知变化、建议行动并保留长期业务上下文的 AI 工作流。',
        primary: demo.zh,
      },
    },
    restaurants: {
      hero: {
        title: '面向餐饮利润运营的 AI Agent',
        titleAccent: '餐饮利润运营',
        lead: 'PrismShadow 帮助餐饮团队把 POS、外卖、社交电商、私域订单、采购、人工、库存和门店执行数据，转化为守护整体利润的 AI Agent。',
        primary: demo.zh,
        secondary: { label: '阅读餐饮 AI 指南', href: '/blog/restaurant-ai-contribution-profit' },
      },
      signals: ['POS', '外卖平台', '社交团购', '采购', '人工与库存'],
      whyNow: {
        title: '餐饮需要的不只是平台报表',
        lead: '餐饮经营者早已拥有来自 POS、外卖平台、支付工具和营销渠道的报表。问题在于销售数据看不出真实利润，洞察也很少落到门店级行动。',
      },
      scenarios: {
        title: '覆盖餐饮运营的 AI Agent',
        lead: '了解 PrismShadow Agent 如何帮助餐饮团队连接收入、毛利、成本、库存和执行，形成统一的运营工作流。',
        tabsLabel: '餐饮场景',
        workspaceLabel: '餐饮利润 Agent 工作台',
      },
      fit: {
        title: '为什么餐饮需要围绕利润构建的 Agent 层',
        lead: '不只是销售报表。PrismShadow 帮助餐饮经营者看清真正赚钱的地方、利润流失的环节，以及每家门店下一步该做什么。',
      },
      resources: {
        title: '深入了解餐饮 AI Agent',
        lead: '了解 AI Agent 如何帮助餐饮经营者从销售报表走向利润运营。',
      },
      cta: {
        title: '让 AI Agent 紧盯餐饮真正的利润来源',
        titleAccent: '餐饮真正的利润来源',
        body: 'PrismShadow 帮助餐饮团队把渠道收入、菜品毛利、食材成本、人工、库存和门店执行，连接成守护利润、推动每日行动的 AI 工作流。',
        primary: demo.zh,
      },
    },
    'auto-dealerships': {
      hero: {
        title: '面向现代汽车经销运营的 AI Agent',
        titleAccent: '现代汽车经销运营',
        lead: 'PrismShadow 帮助汽车经销商把分散的客户、库存、拍卖、销售、F&I、服务和营销上下文，转化为覆盖完整经销生命周期的 AI Agent。',
        primary: demo.zh,
        secondary: { label: '阅读汽车经销商 AI 指南', href: '/blog/used-car-margins-before-the-lot' },
      },
      signals: ['CRM 与 DMS', '库存', '拍卖清单', '维修记录', 'F&I'],
      whyNow: {
        title: '汽车经销商正在从记录走向行动',
        lead: '汽车经销商依靠数据运营，但驱动客户关系、车辆采购、定价、金融、服务和留存的信息，常常分散在彼此割裂的系统中。',
      },
      scenarios: {
        title: '覆盖汽车经销生命周期的 AI Agent',
        lead: '了解 PrismShadow Agent 如何以长期经销商上下文，支持客户生命周期、拍卖与库存、交易运营和售后留存。',
        tabsLabel: '汽车经销商场景',
        workspaceLabel: '经销商 Agent 工作台',
      },
      fit: {
        title: '为什么汽车经销商需要围绕自身业务构建的 Agent 层',
        lead: '从线索处理、拍卖情报、交易支持、售后留存到经销运营，PrismShadow 帮助汽车经销团队从记录系统走向行动系统。',
      },
      resources: {
        title: '深入了解汽车经销商 AI Agent',
        lead: '了解 AI Agent 如何帮助汽车经销商连接数据、改进二手车采购、简化交易工作流，并构建 Agent 化的经销运营。',
      },
      cta: {
        title: '让 AI Agent 贴合汽车经销商的真实运作',
        titleAccent: '汽车经销商的真实运作',
        body: 'PrismShadow 帮助汽车经销团队把客户生命周期、拍卖情报、交易运营、售后留存和经销数据，连接成从记录走向行动的 AI 工作流。',
        primary: demo.zh,
      },
    },
  },
} satisfies Record<Locale, Record<IndustryId, IndustryPageCopy>>
