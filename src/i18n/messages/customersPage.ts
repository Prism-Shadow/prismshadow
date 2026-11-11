import type { Locale } from '../locales'

export type CustomersLink = { label: string; href: string }

export type CustomersProof = {
  value: string
  label: string
  /** Whose result it is, in mono. */
  source: string
  /** `signal` renders the value in the improvement colour. */
  tone: 'signal' | 'plain'
}

/** A named customer, given a full row with its schematic. */
export type FeaturedCase = {
  id: 'cobo' | 'subconscious'
  customer: string
  sector: string
  title: string
  body: string
  /** The PrismShadow capability behind the result. */
  capability: CustomersLink
}

/** Panel copy for Cobo Wallet: one cell per real office-agent scenario. */
export type CoboPanelCopy = {
  ariaLabel: string
  label: string
  value: string
  note: string
  count: string
  key: string
}

/** Panel copy for Subconscious.ai: the model lifecycle PrismShadow powers. */
export type SubconsciousPanelCopy = {
  ariaLabel: string
  label: string
  value: string
  note: string
  /** Exactly four stages; the middle two are PrismShadow's part. */
  stages: string[]
  role: string
  loop: string
}

/** An anonymous enterprise customer. Names stay private. */
export type EnterpriseCase = {
  id: 'semiconductor' | 'pharma' | 'health-screening'
  customer: string
  /** Headline figure or scope, set large. */
  value: string
  title: string
  body: string
  capability: CustomersLink
}

export type AudienceSegment = {
  id: 'knowledge' | 'security' | 'ai-native' | 'platforms'
  title: string
  /** Example industries, rendered as a mono line. */
  examples: string
  body: string
}

export type CustomersPageCopy = {
  hero: {
    eyebrow: string
    title: string
    /** Part of the title set in the accent color (must appear in `title`). */
    titleAccent: string
    lead: string
    primary: CustomersLink
    secondary: CustomersLink
    proofLabel: string
    /** Exactly three headline results. */
    proof: CustomersProof[]
  }
  featured: {
    eyebrow: string
    title: string
    lead: string
    capabilityLabel: string
    /** Exactly two: Cobo Wallet, Subconscious.ai. */
    cases: FeaturedCase[]
    cobo: CoboPanelCopy
    subconscious: SubconsciousPanelCopy
  }
  enterprise: {
    eyebrow: string
    title: string
    lead: string
    /** Exactly three anonymous customers. */
    cases: EnterpriseCase[]
  }
  audiences: {
    eyebrow: string
    title: string
    lead: string
    /** Exactly four customer profiles. */
    segments: AudienceSegment[]
  }
  explore: {
    eyebrow: string
    title: string
    lead: string
    industries: string
    departments: string
    allDepartments: string
  }
  cta: {
    title: string
    titleAccent: string
    body: string
    primary: CustomersLink
    secondary: CustomersLink
  }
}

export const customersPageCopy = {
  en: {
    hero: {
      eyebrow: 'Customers',
      title: 'Chosen where AI has to deliver.',
      titleAccent: 'has to deliver',
      lead: 'From digital financial infrastructure to drug R&D, PrismShadow runs in production wherever accuracy, cost and data control are non‑negotiable.',
      primary: { label: 'Book a demo', href: '/contact' },
      secondary: { label: 'Explore the platform', href: '/platform' },
      proofLabel: 'Customer results',
      proof: [
        {
          value: '+8.2%',
          label: 'composite agent success score across 30 real office-agent scenarios, at lower cost',
          source: 'Cobo Wallet',
          tone: 'signal',
        },
        {
          value: '70B',
          label: 'parameter social causal-reasoning LLM, trained and optimized with PrismShadow',
          source: 'Subconscious.ai',
          tone: 'plain',
        },
        {
          value: '14B',
          label: 'medical model tuned and deployed in the customer’s own environment',
          source: 'Health-screening company',
          tone: 'plain',
        },
      ],
    },
    featured: {
      eyebrow: 'Case studies',
      title: 'From office agents to a 70B model.',
      lead: 'Self-evolving agents across 30 real office scenarios at Cobo Wallet, and the training behind a 70B-parameter causal-reasoning LLM at Subconscious.ai.',
      capabilityLabel: 'Capability',
      cases: [
        {
          id: 'cobo',
          customer: 'Cobo Wallet',
          sector: 'Digital financial infrastructure',
          title: 'Self-evolving agents across 30 real office workflows.',
          body: 'Across 30 real office-agent scenarios, PrismShadow lifted Cobo Wallet’s composite agent success score by 8.2% while lowering cost.',
          capability: { label: 'Self-Evolving Agent Platform', href: '/platform#agents' },
        },
        {
          id: 'subconscious',
          customer: 'Subconscious.ai',
          sector: 'Social causal-reasoning AI',
          title: 'The training behind a 70B causal‑reasoning LLM.',
          body: 'PrismShadow provides the model training and optimization behind Subconscious.ai’s 70B-parameter social causal-reasoning LLM, through development and iteration.',
          capability: { label: 'Model training & optimization', href: '/platform' },
        },
      ],
      cobo: {
        ariaLabel:
          'Cobo Wallet: composite agent success score up 8.2% at lower cost, measured across 30 real office-agent scenarios, shown as one cell per scenario.',
        label: 'Composite agent success score',
        value: '+8.2%',
        note: 'at lower cost',
        count: '30',
        key: '1 cell = 1 real office-agent scenario',
      },
      subconscious: {
        ariaLabel:
          'Subconscious.ai: a 70B-parameter social causal-reasoning LLM. Its lifecycle runs develop, train, optimize and iterate in a continuous loop; PrismShadow provides the training and optimization.',
        label: 'Social causal-reasoning LLM',
        value: '70B',
        note: 'parameters',
        stages: ['Develop', 'Train', 'Optimize', 'Iterate'],
        role: 'PrismShadow',
        loop: 'continuous iteration',
      },
    },
    enterprise: {
      eyebrow: 'Enterprise deployments',
      title: 'Inside manufacturing, pharma and healthcare.',
      lead: 'An agent platform, an AutoResearch system and a private medical model, each built for one enterprise’s own work.',
      cases: [
        {
          id: 'semiconductor',
          customer: 'Semiconductor manufacturer',
          value: 'Office + R&D',
          title: 'One agent platform for office work and R&D testing',
          body: 'An enterprise agent platform that runs internal office processes and automates R&D testing.',
          capability: { label: 'Self-Evolving Agent Platform', href: '/platform#agents' },
        },
        {
          id: 'pharma',
          customer: 'Pharmaceutical company',
          value: 'Drug R&D',
          title: 'AutoResearch for the research team',
          body: 'An AutoResearch system that helps the research team execute drug R&D tasks.',
          capability: { label: 'AutoResearch', href: '/platform#autoresearch' },
        },
        {
          id: 'health-screening',
          customer: 'Health-screening company',
          value: '14B',
          title: 'A medical model, tuned and deployed on-prem',
          body: 'A 14B-parameter medical model, tuned and deployed in the customer’s own environment for automated disease screening and analysis.',
          capability: { label: 'Local deployment & tuning', href: '/platform#deployment' },
        },
      ],
    },
    audiences: {
      eyebrow: 'Who it’s for',
      title: 'Built for enterprises that run on expertise and data.',
      lead: 'If your edge lives in specialist knowledge, sensitive data, or the AI you ship to customers, PrismShadow turns it into agents that compound.',
      segments: [
        {
          id: 'knowledge',
          title: 'Knowledge‑intensive & professional services',
          examples: 'Insurance · Legal · Research labs',
          body: 'Run the workflows that depend on expert knowledge and business rules automatically, end to end.',
        },
        {
          id: 'security',
          title: 'Security‑first enterprises',
          examples: 'Finance · Healthcare · IP-sensitive industries',
          body: 'Deploy, run and optimize AI entirely on-prem or in your private cloud. Data and models never leave your perimeter.',
        },
        {
          id: 'ai-native',
          title: 'AI‑transforming & AI‑native companies',
          examples: 'Enterprise AI programs · AI product teams',
          body: 'Put AI into real operations, or keep pushing product quality up while driving model and serving costs down.',
        },
        {
          id: 'platforms',
          title: 'SaaS & cloud platforms',
          examples: 'SaaS vendors · Cloud providers',
          body: 'Embed model training, agent runtime and continuous optimization into your product, and deliver AI services to your own customers.',
        },
      ],
    },
    explore: {
      eyebrow: 'Solutions',
      title: 'Find your industry and your team.',
      lead: 'Agent workflows organized by industry and by department.',
      industries: 'By industry',
      departments: 'By department',
      allDepartments: 'All departments',
    },
    cta: {
      title: 'Bring us the workflow that has to work.',
      titleAccent: 'has to work',
      body: 'We’ll show you how PrismShadow trains, deploys and keeps improving the agents that run it.',
      primary: { label: 'Book a demo', href: '/contact' },
      secondary: { label: 'Explore the platform', href: '/platform' },
    },
  },
  zh: {
    hero: {
      eyebrow: '客户',
      title: '在 AI 必须见效的\u200B地方，客户选择 PrismShadow。',
      titleAccent: '必须见效',
      lead: '从线上金融基础设施到药物研发，PrismShadow 运行在对准确率、成本与数据安全要求最严苛的生产环境中。',
      primary: { label: '预约演示', href: '/contact' },
      secondary: { label: '了解平台', href: '/platform' },
      proofLabel: '客户成果',
      proof: [
        {
          value: '+8.2%',
          label: '30 个真实办公 Agent 场景中，Agent 成功率综合评分提升，成本更低',
          source: 'Cobo Wallet',
          tone: 'signal',
        },
        {
          value: '70B',
          label: '参数社会因果推理大模型，由 PrismShadow 提供训练与优化',
          source: 'Subconscious.ai',
          tone: 'plain',
        },
        {
          value: '14B',
          label: '医学垂域模型，在客户本地环境中完成调优与部署',
          source: '某健康体检企业',
          tone: 'plain',
        },
      ],
    },
    featured: {
      eyebrow: '客户案例',
      title: '从办公 Agent，到 70B 大模型。',
      lead: '在 Cobo Wallet，自进化 Agent 覆盖 30 个真实办公场景；在 Subconscious.ai，PrismShadow 支撑 70B 参数因果推理大模型的训练。',
      capabilityLabel: '所用能力',
      cases: [
        {
          id: 'cobo',
          customer: 'Cobo Wallet',
          sector: '线上金融基础设施平台',
          title: '自进化 Agent，落地 30 个真实办公场景。',
          body: '在 30 个真实办公 Agent 场景中，PrismShadow 将 Cobo Wallet 的 Agent 成功率综合评分提高 8.2%，同时降低了成本。',
          capability: { label: '企业级自进化 Agent 平台', href: '/platform#agents' },
        },
        {
          id: 'subconscious',
          customer: 'Subconscious.ai',
          sector: '社会因果推理 AI',
          title: '支撑 70B 因果推理大模型的训练与优化。',
          body: 'PrismShadow 为 Subconscious.ai 提供模型训练与优化能力，支持其 70B 参数社会因果推理大模型的开发与迭代。',
          capability: { label: '模型训练与优化', href: '/platform' },
        },
      ],
      cobo: {
        ariaLabel:
          'Cobo Wallet：在 30 个真实办公 Agent 场景中，Agent 成功率综合评分提升 8.2%，成本更低；图中每格代表一个场景。',
        label: 'Agent 成功率综合评分',
        value: '+8.2%',
        note: '成本更低',
        count: '30',
        key: '1 格 = 1 个真实办公 Agent 场景',
      },
      subconscious: {
        ariaLabel:
          'Subconscious.ai：70B 参数社会因果推理大模型，生命周期按开发、训练、优化、迭代循环推进，PrismShadow 提供其中的训练与优化。',
        label: '社会因果推理大模型',
        value: '70B',
        note: '参数',
        stages: ['开发', '训练', '优化', '迭代'],
        role: 'PrismShadow',
        loop: '持续迭代',
      },
    },
    enterprise: {
      eyebrow: '企业案例',
      title: '深入制造、制药与医疗一线。',
      lead: '一个 Agent 平台、一套 AutoResearch 系统、一个私有化医学模型，各自服务于一家企业的实际业务。',
      cases: [
        {
          id: 'semiconductor',
          customer: '某半导体制造企业',
          value: '办公 + 研发',
          title: '一个 Agent 平台，覆盖内部办公与研发测试',
          body: '提供企业级 Agent 平台，支持内部办公流程与研发测试自动化。',
          capability: { label: '企业级自进化 Agent 平台', href: '/platform#agents' },
        },
        {
          id: 'pharma',
          customer: '某制药企业',
          value: '药物研发',
          title: '为科研团队打造的 AutoResearch 系统',
          body: '提供面向药物研发的 AutoResearch 系统，辅助科研团队执行研发任务。',
          capability: { label: 'AutoResearch', href: '/platform#autoresearch' },
        },
        {
          id: 'health-screening',
          customer: '某健康体检企业',
          value: '14B',
          title: '医学垂域模型，本地调优与部署',
          body: '在客户本地环境中调优并部署 14B 参数医学垂域模型，支持自动疾病筛查与分析。',
          capability: { label: '本地部署与业务调优', href: '/platform#deployment' },
        },
      ],
    },
    audiences: {
      eyebrow: '适用客户',
      title: '为依赖专业知识与数据的企业而生。',
      lead: '无论你的核心优势在于专业知识、敏感数据，还是交付给客户的 AI 产品，PrismShadow 都能把它变成持续复利的 Agent。',
      segments: [
        {
          id: 'knowledge',
          title: '知识密集型与专业服务企业',
          examples: '保险 · 法律服务 · 研究实验室',
          body: '让依赖专业知识和业务规则的工作流，端到端自动运行。',
        },
        {
          id: 'security',
          title: '重视数据安全的企业',
          examples: '金融 · 医疗 · 拥有核心机密的企业',
          body: '在本地或私有环境中部署、运行和优化 AI，数据与模型始终不出企业边界。',
        },
        {
          id: 'ai-native',
          title: 'AI 转型企业与 AI 原生公司',
          examples: '企业 AI 转型 · AI 产品团队',
          body: '将 AI 融入实际业务，或持续提升 AI 产品能力、优化模型效果与服务成本。',
        },
        {
          id: 'platforms',
          title: 'SaaS 与云平台企业',
          examples: 'SaaS 厂商 · 云服务商',
          body: '将模型训练、Agent 运行和持续优化能力集成到现有产品，为你的客户提供 AI 服务。',
        },
      ],
    },
    explore: {
      eyebrow: '解决方案',
      title: '找到你的行业与团队。',
      lead: '按行业、按部门浏览对应的 Agent 工作流。',
      industries: '按行业',
      departments: '按部门',
      allDepartments: '全部部门',
    },
    cta: {
      title: '必须见效的工作流，交给我们。',
      titleAccent: '必须见效',
      body: '我们现场演示 PrismShadow 如何训练、部署并持续优化执行它的 Agent。',
      primary: { label: '预约演示', href: '/contact' },
      secondary: { label: '了解平台', href: '/platform' },
    },
  },
} satisfies Record<Locale, CustomersPageCopy>
