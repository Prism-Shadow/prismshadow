import type { Locale } from '../locales'

export type UseCaseMetricCopy = {
  value: string
  label: string
}

type HighlightCopy = {
  metric: string
  label: string
}

export type BenchmarkCopy = {
  id: string
  status: string
  function: string
  workflowType: string
  title: string
  subtitle: string
  description: string
  task: string
  learns: string[]
  metrics: UseCaseMetricCopy[]
  bestFor: string[]
  /** Verified benchmarks: the three-step data flow. */
  visualSteps?: string[]
  /** Scope note shown under the benchmark. */
  safety?: string
}

type FeaturedIndustryCaseCopy = {
  eyebrow: string
  title: string
  subtitle: string
  topline: {
    label: string
    title: string
  }
  summary: string
  pipelineLabel: string
  pipeline: string[]
  metrics: UseCaseMetricCopy[]
  scenarios: {
    title: string
    label: string
    body: string
    points: string[]
  }[]
  safety: string
}

type TextCardCopy = {
  title: string
  body: string
}

/** Headings may contain `\u200B` to mark preferred zh line breaks (see `Phrases`). */
export type UseCaseLibraryPageCopy = {
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    body: string
    primaryCta: string
    secondaryCta: string
  }
  atlas: {
    ariaLabel: string
    label: string
    title: string
    cards: {
      label: string
      title: string
      metric: string
    }[]
    engine: {
      label: string
      title: string
      body: string
    }
    metrics: UseCaseMetricCopy[]
    footer: string[]
  }
  featuredCase: FeaturedIndustryCaseCopy
  highlights: {
    eyebrow: string
    title: string
    body: string
    items: HighlightCopy[]
  }
  labels: {
    task: string
    learns: string
    bestFor: string
    results: string
    baseline: string
    panofy: string
    listLabel: string
    filterLabel: string
    all: string
  }
  benchmarks: {
    eyebrow: string
    title: string
  }
  verified: {
    filter: string
    title: string
    body: string
    benchmarks: BenchmarkCopy[]
  }
  simulated: {
    filter: string
    title: string
    body: string
    benchmarks: BenchmarkCopy[]
  }
  learning: {
    eyebrow: string
    title: string
    body: string
    steps: TextCardCopy[]
    message: string
  }
  workflowTypes: {
    eyebrow: string
    title: string
    items: (TextCardCopy & { examples: string })[]
  }
  final: {
    title: string
    titleAccent: string
    body: string
    primaryCta: string
    secondaryCta: string
  }
  disclaimer: string
}

export const useCaseLibraryPageCopy = {
  en: {
    hero: {
      eyebrow: 'Use case library',
      title: 'Train agents, not prompts',
      titleAccent: 'not prompts',
      body: 'Panofy turns expert examples, execution traces and domain logic into reusable AI agent skills.',
      primaryCta: 'Train your agent',
      secondaryCta: 'Explore benchmarks',
    },
    atlas: {
      ariaLabel:
        'Healthcare (clinical support and BI, 90%+ core task accuracy), semiconductor (inspection and EDA, 65% less equipment downtime) and enterprise BI (ranking logic, 100% final business accuracy) workflows feed the Panofy trainable skill layer, which delivers 4x lower GPU memory spend, 12x lower token usage and 20% faster training throughput.',
      label: 'Use case library',
      title: 'Industry-trained workflows',
      cards: [
        { label: 'Healthcare', title: 'Clinical support + BI', metric: '90%+ core task accuracy' },
        { label: 'Semiconductor', title: 'Inspection + EDA', metric: '65% less equipment downtime' },
        { label: 'Enterprise BI', title: 'Ranking logic', metric: '100% final business accuracy' },
      ],
      engine: {
        label: 'Panofy',
        title: 'Trainable skill layer',
        body: 'Examples + traces + domain rules',
      },
      metrics: [
        { value: '4x', label: 'lower GPU memory spend' },
        { value: '12x', label: 'lower token usage' },
        { value: '20%', label: 'faster training throughput' },
      ],
      footer: ['Verified benchmarks', 'Illustrative cases', 'Human-reviewed deployment'],
    },
    featuredCase: {
      eyebrow: 'Featured industry case',
      title: 'AI model training platform for healthcare and semiconductor operations',
      subtitle:
        'Turn enterprise data, domain expertise and proven workflows into industry-specific AI models for high-complexity decisions.',
      topline: {
        label: 'AI model training platform',
        title: 'Enterprise knowledge into domain models',
      },
      summary:
        'Panofy trains private enterprise knowledge, business process traces and expert review standards into deployable domain models. It is built for teams that need reliable automation in regulated or operationally sensitive environments, not one-off prompt demos.',
      pipelineLabel: 'Training pipeline',
      pipeline: ['Enterprise data', 'Expert knowledge', 'Workflow traces', 'Domain model', 'Operational agent'],
      metrics: [
        { value: '90%+', label: 'accuracy on core medical support tasks' },
        { value: '1/3', label: 'lower comprehensive operating cost' },
        { value: '65%', label: 'less production-line downtime' },
        { value: '2x', label: 'manufacturing output improvement' },
        { value: '4x', label: 'lower GPU memory spend during training' },
        { value: '20%', label: 'faster model training throughput' },
      ],
      scenarios: [
        {
          title: 'Hospital clinical support and operations intelligence',
          label: 'Healthcare',
          body: 'A hospital deployment supports clinical reference, medical record quality control and natural-language BI for operations leaders.',
          points: [
            'Provides diagnostic reference from examination and lab indicators for physician review.',
            'Checks medical records and reports for omissions, logic errors and non-standard wording.',
            'Answers operational BI questions and reports on resource use, department load and service bottlenecks.',
            'A 14B domain model exceeded GPT performance in the customer medical benchmark.',
          ],
        },
        {
          title: 'Semiconductor inspection and EDA research acceleration',
          label: 'Manufacturing',
          body: 'A semiconductor manufacturer uses trained AI workflows to monitor production lines, surface failure risk and accelerate specialist engineering work.',
          points: [
            'Monitors equipment status in real time and detects faults, abnormal fluctuations and downtime risk.',
            'Triggers response workflows before failures become production interruptions.',
            'Assists EDA engineers with professional code generation, review and optimization.',
            'Reduces repetitive engineering work while improving training efficiency and deployment speed.',
          ],
        },
      ],
      safety:
        'Healthcare workflows are positioned as clinical and operational support for qualified staff, not autonomous diagnosis, prescribing or treatment decisions.',
    },
    highlights: {
      eyebrow: 'Result highlights',
      title: 'Verified benchmark gains, shown plainly',
      body: 'Panofy has been validated on complex drug development and enterprise BI benchmarks, with higher accuracy and far lower token usage than a few-shot baseline.',
      items: [
        { metric: '+15%', label: 'accuracy improvement in drug relation mining' },
        { metric: '12x', label: 'lower token usage in the drug development benchmark' },
        { metric: '100%', label: 'final business accuracy in enterprise BI testing' },
        { metric: '6.28%', label: 'token cost compared with the few-shot baseline' },
      ],
    },
    labels: {
      task: 'Task',
      learns: 'What Panofy learns',
      bestFor: 'Best for',
      results: 'Results',
      baseline: 'Baseline',
      panofy: 'Panofy',
      listLabel: 'Benchmarks',
      filterLabel: 'Filter benchmarks',
      all: 'All',
    },
    benchmarks: {
      eyebrow: 'Benchmark library',
      title: 'Browse eight expert workflows',
    },
    verified: {
      filter: 'Verified',
      title: 'Verified benchmarks',
      body: 'Panofy tested against a few-shot baseline on unseen cases with the same task input.',
      benchmarks: [
        {
          id: 'drug-development-agent',
          status: 'Verified benchmark',
          function: 'Research',
          workflowType: 'Extraction',
          title: 'Drug Development Agent',
          subtitle: 'Drug relation mining from experimental data',
          description:
            'Train agents to extract structured drug relationships from experimental datasets using multi-step reasoning, domain-specific understanding and consistent extraction logic.',
          task: 'Extract drug relationships from structured JSON containing drug entities, context and labels.',
          learns: [
            'Drug interaction patterns',
            'Relation classification logic',
            'Domain-specific extraction rules',
            'Consistent structured output behavior',
          ],
          metrics: [
            { value: '82.5%', label: 'accuracy' },
            { value: '+15 pts', label: 'vs. baseline' },
            { value: '12x', label: 'lower token usage' },
            { value: '35,441', label: 'tokens vs. 431,040 baseline tokens' },
          ],
          bestFor: [
            'Scientific data extraction',
            'Drug relation mining',
            'Biomedical literature analysis',
            'Structured research workflows',
          ],
          visualSteps: ['Experimental data', 'Relation extraction', 'Structured JSON'],
        },
        {
          id: 'enterprise-bi-agent',
          status: 'Verified benchmark',
          function: 'BI',
          workflowType: 'Structured output',
          title: 'Enterprise BI Agent',
          subtitle: 'Complex business ranking from multi-database inputs',
          description:
            'Train agents to learn business logic from examples and apply it to unseen cases with stable, structured outputs.',
          task: 'Given a minimal input such as { "month": 3 }, the agent processes two SQLite databases, adapts to schema changes, joins multiple tables, calculates metrics and returns a fixed ranking JSON.',
          learns: [
            'Cross-database reasoning',
            'Schema adaptation',
            'Business rule induction',
            'Multi-metric scoring logic',
            'Stable JSON formatting',
          ],
          metrics: [
            { value: '100%', label: 'final business accuracy' },
            { value: '5/5', label: 'unseen test cases passed' },
            { value: '6.28%', label: 'of baseline token cost' },
            { value: '1,691,562', label: 'tokens vs. 26,945,119 baseline tokens' },
          ],
          bestFor: [
            'Enterprise BI workflows',
            'Recurring business rankings',
            'Operations analytics',
            'Structured decision support',
          ],
          visualSteps: ['{ "month": 3 }', 'Schema discovery', 'Top 3 ranking JSON'],
        },
      ],
    },
    simulated: {
      filter: 'Simulated',
      title: 'Simulated workflow benchmarks',
      body: 'Illustrative workflows showing where Panofy-style agent training applies to repeatable expert tasks.',
      benchmarks: [
        {
          id: 'contract-review-agent',
          status: 'Simulated benchmark',
          function: 'Legal',
          workflowType: 'Classification',
          title: 'Contract Review Agent',
          subtitle: 'Clause extraction and risk classification',
          description:
            'Train agents to extract clauses, classify risks and generate structured contract summaries.',
          task: 'Review vendor or supplier agreements and identify key clauses, obligations, renewal terms, liability language and risk categories.',
          learns: [
            'Clause extraction patterns',
            'Risk classification logic',
            'Obligation mapping',
            'Structured review output',
          ],
          metrics: [
            { value: '91.4%', label: 'clause extraction F1' },
            { value: '86.7%', label: 'risk classification accuracy' },
            { value: '8.4x', label: 'lower token usage' },
          ],
          bestFor: ['Legal operations', 'Procurement review', 'Vendor contracts', 'Risk classification'],
        },
        {
          id: 'supply-chain-exception-agent',
          status: 'Simulated benchmark',
          function: 'Supply chain',
          workflowType: 'Operations',
          title: 'Supply Chain Exception Agent',
          subtitle: 'Supplier delay impact analysis',
          description:
            'Train agents to connect supplier delays with inventory, open orders, production plans and customer delivery risk.',
          task: 'Analyze delayed shipment notices and identify affected SKUs, open orders, inventory coverage and mitigation options.',
          learns: [
            'Supplier delay patterns',
            'Inventory impact logic',
            'Order risk matching',
            'Mitigation recommendation structure',
          ],
          metrics: [
            { value: '93.2%', label: 'affected-order match' },
            { value: '84.0%', label: 'action recommendation accuracy' },
            { value: '9.2x', label: 'lower token usage' },
          ],
          bestFor: [
            'Supplier delay analysis',
            'Inventory risk review',
            'Control tower workflows',
            'Exception management',
          ],
        },
        {
          id: 'patient-access-agent',
          status: 'Simulated benchmark',
          function: 'Healthcare',
          workflowType: 'Intake',
          title: 'Patient Access Agent',
          subtitle: 'Prior authorization intake',
          description:
            'Train agents to support eligibility, benefits verification, prior authorization intake and escalation preparation.',
          task: 'Review patient access requests, payer rules, coverage context and missing documentation requirements.',
          learns: [
            'Required information patterns',
            'Payer rule interpretation',
            'Missing documentation detection',
            'Staff-ready case summary format',
          ],
          metrics: [
            { value: '94.0%', label: 'missing-document detection' },
            { value: '90.7%', label: 'staff-ready summary pass rate' },
            { value: '6.4x', label: 'lower token usage' },
          ],
          bestFor: ['Patient access', 'Prior authorization', 'Benefits verification', 'Healthcare operations'],
          safety: 'Does not imply diagnosis, treatment, prescribing or automated clinical decisions.',
        },
        {
          id: 'restaurant-profit-agent',
          status: 'Simulated benchmark',
          function: 'Restaurant',
          workflowType: 'Decision support',
          title: 'Restaurant Profit Agent',
          subtitle: 'Cross-channel profit diagnosis',
          description:
            'Train agents to calculate true contribution profit across POS, delivery, food cost, labor, discounts and refunds.',
          task: 'Analyze daily restaurant performance and identify which channels, campaigns or menu items made money or leaked margin.',
          learns: [
            'Channel profit logic',
            'Food cost rules',
            'Campaign P&L patterns',
            'Daily action recommendation format',
          ],
          metrics: [
            { value: '88.9%', label: 'profit classification accuracy' },
            { value: '86.1%', label: 'anomaly detection F1' },
            { value: '7.8x', label: 'lower token usage' },
          ],
          bestFor: [
            'Restaurant profit control',
            'Daily owner briefings',
            'Menu margin analysis',
            'Store execution workflows',
          ],
        },
        {
          id: 'auto-dealership-inventory-agent',
          status: 'Simulated benchmark',
          function: 'Auto dealerships',
          workflowType: 'Decision support',
          title: 'Auto Dealership Inventory Agent',
          subtitle: 'Auction and inventory decision support',
          description:
            'Train agents to evaluate auction run lists, wholesale comps, vehicle history, condition reports, recon estimates and local demand.',
          task: 'Review upcoming auction vehicles and surface acquisition opportunities, risks and staff-review recommendations.',
          learns: [
            'Auction opportunity patterns',
            'Bid-policy logic',
            'Recon-risk classification',
            'Inventory decision support format',
          ],
          metrics: [
            { value: '81.0%', label: 'bid-policy match' },
            { value: '85.0%', label: 'recon-risk F1' },
            { value: '5.9x', label: 'lower token usage' },
          ],
          bestFor: ['Used-car acquisition', 'Auction intelligence', 'Inventory planning', 'Recon risk review'],
          safety: 'Does not claim guaranteed profit, bid accuracy, sales conversion or auction outcomes.',
        },
        {
          id: 'travel-booking-agent',
          status: 'Simulated benchmark',
          function: 'Travel',
          workflowType: 'Intake',
          title: 'Travel Booking Agent',
          subtitle: 'Fare rules and booking record assistance',
          description:
            'Train agents to understand traveler emails, booking records, fare rules and missing trip details.',
          task: 'Read traveler requests, review booking records, interpret fare rules, identify missing details and prepare a response for human review.',
          learns: [
            'Fare rule interpretation',
            'Booking record summarization',
            'Missing-detail detection',
            'Response drafting patterns',
          ],
          metrics: [
            { value: '88.0%', label: 'fare-rule accuracy' },
            { value: '91.0%', label: 'missing-detail detection' },
            { value: '7.1x', label: 'lower token usage' },
          ],
          bestFor: ['Booking operations', 'Fare rule assistance', 'PNR review', 'Traveler email intake'],
        },
      ],
    },
    learning: {
      eyebrow: 'How Panofy learns',
      title: 'From examples to reusable agent skills',
      body: 'Panofy turns task experience into reusable agent capabilities instead of forcing agents to reason from scratch every time.',
      steps: [
        {
          title: 'Learn from examples',
          body: 'Panofy studies training cases to understand the task pattern, expected output and domain-specific logic.',
        },
        {
          title: 'Learn from execution traces',
          body: 'Panofy analyzes intermediate results, detects recurring errors and reflects on what should improve.',
        },
        {
          title: 'Consolidate agent skills',
          body: 'Learned context becomes reusable skills: reasoning strategies, task-specific heuristics and structured output patterns.',
        },
        {
          title: 'Reuse on new cases',
          body: 'Once trained, agents apply learned logic to unseen inputs without re-solving the full task from scratch.',
        },
      ],
      message: 'Prompting solves the task once. Panofy trains the agent to perform the workflow again and again.',
    },
    workflowTypes: {
      eyebrow: 'Best-fit workflow types',
      title: 'Where Panofy works best',
      items: [
        {
          title: 'Complex data extraction',
          body: 'Workflows that require structured extraction from domain-specific documents, data or records.',
          examples: 'Scientific relation mining, contract extraction, claims extraction, policy parsing',
        },
        {
          title: 'Business rule induction',
          body: 'Tasks where the rules are learned from examples instead of fully written out.',
          examples: 'Scoring logic, ranking logic, eligibility checks, operational classification',
        },
        {
          title: 'Recurring BI functions',
          body: 'Business questions that look simple but require repeatable multi-step logic.',
          examples: 'Department ranking, margin analysis, risk scoring, KPI breakdowns',
        },
        {
          title: 'Stable structured outputs',
          body: 'Workflows that must return reliable JSON, tables, rankings, labels or downstream-ready results.',
          examples: 'Ranking JSON, relation labels, audit summaries, formatted reports',
        },
      ],
    },
    final: {
      title: 'Build agents that learn your workflows',
      titleAccent: 'learn your workflows',
      body: 'Turn repeatable expert tasks into trained AI agents that remember patterns, reuse business logic and improve over time.',
      primaryCta: 'Train your agent',
      secondaryCta: 'Explore Panofy',
    },
    disclaimer:
      'Verified benchmarks are based on internal experiments. Simulated workflow benchmarks are illustrative examples and should be validated with customer-specific datasets before production use.',
  },
  zh: {
    hero: {
      eyebrow: '用例库',
      title: '训练 Agent，而不是写提示词',
      titleAccent: '而不是写提示词',
      body: 'Panofy 将专家示例、执行轨迹和领域逻辑转化为可复用的 AI Agent 技能。',
      primaryCta: '训练你的 Agent',
      secondaryCta: '查看基准',
    },
    atlas: {
      ariaLabel:
        '医疗健康（临床支持与 BI，核心任务准确率 90%+）、半导体（检测与 EDA，设备停机减少 65%）和企业 BI（排序逻辑，最终业务准确率 100%）工作流进入 Panofy 可训练技能层，带来 GPU 显存消耗降低 4 倍、token 使用量降低 12 倍、训练吞吐提升 20%。',
      label: '用例库',
      title: '面向行业训练的工作流',
      cards: [
        { label: '医疗健康', title: '临床支持 + BI', metric: '核心任务准确率 90%+' },
        { label: '半导体', title: '检测 + EDA', metric: '设备停机减少 65%' },
        { label: '企业 BI', title: '排序逻辑', metric: '最终业务准确率 100%' },
      ],
      engine: {
        label: 'Panofy',
        title: '可训练技能层',
        body: '示例 + 轨迹 + 领域规则',
      },
      metrics: [
        { value: '4x', label: 'GPU 显存消耗降低' },
        { value: '12x', label: 'token 使用量降低' },
        { value: '20%', label: '训练吞吐提升' },
      ],
      footer: ['已验证基准', '示例案例', '人工审核部署'],
    },
    featuredCase: {
      eyebrow: '精选行业案例',
      title: '面向医疗健康\u200B与半导体运营的\u200BAI 模型训练平台',
      subtitle: '把企业数据、领域专业知识和成熟工作流，转化为面向复杂决策的行业 AI 模型。',
      topline: {
        label: 'AI 模型训练平台',
        title: '把企业知识训练成领域模型',
      },
      summary:
        'Panofy 将企业私有知识、业务流程轨迹和专家审核标准训练进可部署的领域模型。平台面向需要在强监管或运营敏感环境中获得可靠自动化的团队，而不是一次性的提示词演示。',
      pipelineLabel: '训练流程',
      pipeline: ['企业数据', '专家知识', '工作流轨迹', '领域模型', '运营 Agent'],
      metrics: [
        { value: '90%+', label: '核心医疗支持任务准确率' },
        { value: '1/3', label: '综合运营成本降低' },
        { value: '65%', label: '生产线停机减少' },
        { value: '2x', label: '制造产出提升' },
        { value: '4x', label: '训练期间 GPU 显存消耗降低' },
        { value: '20%', label: '模型训练吞吐提升' },
      ],
      scenarios: [
        {
          title: '医院临床支持与运营智能',
          label: '医疗健康',
          body: '医院部署支持临床参考、病历质量控制，以及面向运营负责人的自然语言 BI。',
          points: [
            '基于检查和检验指标提供诊断参考，供医生审核。',
            '检查病历和报告中的遗漏、逻辑错误和不规范表述。',
            '回答运营 BI 问题，生成资源使用、科室负载和服务瓶颈报告。',
            '14B 领域模型在客户医疗基准中超越 GPT 表现。',
          ],
        },
        {
          title: '半导体检测与 EDA 研发加速',
          label: '制造',
          body: '半导体制造商使用训练后的 AI 工作流监控产线、暴露故障风险，并加速专业工程工作。',
          points: [
            '实时监控设备状态，检测故障、异常波动和停机风险。',
            '在故障演变为生产中断之前触发响应工作流。',
            '辅助 EDA 工程师进行专业代码生成、审阅和优化。',
            '减少重复性工程工作，同时提升训练效率和部署速度。',
          ],
        },
      ],
      safety: '医疗健康工作流定位为对合格专业人员的临床与运营支持，不代表自主诊断、开具处方或治疗决策。',
    },
    highlights: {
      eyebrow: '结果亮点',
      title: '清晰呈现\u200B已验证的基准收益',
      body: 'Panofy 已在复杂药物研发和企业 BI 基准中完成验证，相比 few-shot 基线，准确率更高，token 使用量显著更低。',
      items: [
        { metric: '+15%', label: '药物关系挖掘准确率提升' },
        { metric: '12x', label: '药物研发基准中的 token 使用量降低' },
        { metric: '100%', label: '企业 BI 测试中的最终业务准确率' },
        { metric: '6.28%', label: '相对 few-shot 基线的 token 成本' },
      ],
    },
    labels: {
      task: '任务',
      learns: 'Panofy 学到什么',
      bestFor: '适用场景',
      results: '结果',
      baseline: '基线',
      panofy: 'Panofy',
      listLabel: '基准列表',
      filterLabel: '筛选基准',
      all: '全部',
    },
    benchmarks: {
      eyebrow: '基准库',
      title: '浏览八个专家工作流',
    },
    verified: {
      filter: '已验证',
      title: '已验证基准',
      body: '在未见过的案例上使用相同任务输入，将 Panofy 与 few-shot 基线对比测试。',
      benchmarks: [
        {
          id: 'drug-development-agent',
          status: '已验证基准',
          function: '研究',
          workflowType: '抽取',
          title: '药物研发 Agent',
          subtitle: '从实验数据中挖掘药物关系',
          description: '训练 Agent 借助多步推理、领域理解和一致的抽取逻辑，从实验数据集中抽取结构化的药物关系。',
          task: '从包含药物实体、上下文和标签的结构化 JSON 中抽取药物关系。',
          learns: ['药物相互作用模式', '关系分类逻辑', '领域抽取规则', '一致的结构化输出行为'],
          metrics: [
            { value: '82.5%', label: '准确率' },
            { value: '+15 pts', label: '相对基线' },
            { value: '12x', label: 'token 使用量降低' },
            { value: '35,441', label: 'tokens（基线为 431,040 tokens）' },
          ],
          bestFor: ['科学数据抽取', '药物关系挖掘', '生物医学文献分析', '结构化研究工作流'],
          visualSteps: ['实验数据', '关系抽取', '结构化 JSON'],
        },
        {
          id: 'enterprise-bi-agent',
          status: '已验证基准',
          function: 'BI',
          workflowType: '结构化输出',
          title: '企业 BI Agent',
          subtitle: '基于多数据库输入的复杂业务排序',
          description: '训练 Agent 从示例中学习业务逻辑，并在未见案例上稳定输出结构化结果。',
          task: '给定 { "month": 3 } 这样的最小输入，Agent 处理两个 SQLite 数据库，适配 schema 变化，关联多张表，计算指标，并返回固定格式的排序 JSON。',
          learns: ['跨数据库推理', 'Schema 适配', '业务规则归纳', '多指标评分逻辑', '稳定的 JSON 格式'],
          metrics: [
            { value: '100%', label: '最终业务准确率' },
            { value: '5/5', label: '未见测试案例全部通过' },
            { value: '6.28%', label: '仅为基线 token 成本' },
            { value: '1,691,562', label: 'tokens（基线为 26,945,119 tokens）' },
          ],
          bestFor: ['企业 BI 工作流', '周期性业务排序', '运营分析', '结构化决策支持'],
          visualSteps: ['{ "month": 3 }', 'Schema 发现', 'Top 3 排序 JSON'],
        },
      ],
    },
    simulated: {
      filter: '模拟',
      title: '模拟工作流基准',
      body: '示例工作流，展示 Panofy 式的 Agent 训练如何应用于可重复的专家任务。',
      benchmarks: [
        {
          id: 'contract-review-agent',
          status: '模拟基准',
          function: '法务',
          workflowType: '分类',
          title: '合同审阅 Agent',
          subtitle: '条款抽取与风险分类',
          description: '训练 Agent 抽取条款、分类风险，并生成结构化的合同摘要。',
          task: '审阅供应商协议，识别关键条款、义务、续约条款、责任条款和风险类别。',
          learns: ['条款抽取模式', '风险分类逻辑', '义务映射', '结构化审阅输出'],
          metrics: [
            { value: '91.4%', label: '条款抽取 F1' },
            { value: '86.7%', label: '风险分类准确率' },
            { value: '8.4x', label: 'token 使用量降低' },
          ],
          bestFor: ['法务运营', '采购审阅', '供应商合同', '风险分类'],
        },
        {
          id: 'supply-chain-exception-agent',
          status: '模拟基准',
          function: '供应链',
          workflowType: '运营',
          title: '供应链异常 Agent',
          subtitle: '供应商延误影响分析',
          description: '训练 Agent 把供应商延误与库存、未完成订单、生产计划和客户交付风险关联起来。',
          task: '分析延迟发货通知，识别受影响的 SKU、未完成订单、库存覆盖情况和缓解方案。',
          learns: ['供应商延误模式', '库存影响逻辑', '订单风险匹配', '缓解建议结构'],
          metrics: [
            { value: '93.2%', label: '受影响订单匹配率' },
            { value: '84.0%', label: '行动建议准确率' },
            { value: '9.2x', label: 'token 使用量降低' },
          ],
          bestFor: ['供应商延误分析', '库存风险审阅', '控制塔工作流', '异常管理'],
        },
        {
          id: 'patient-access-agent',
          status: '模拟基准',
          function: '医疗健康',
          workflowType: '准入',
          title: '患者准入 Agent',
          subtitle: '预授权受理',
          description: '训练 Agent 支持资格审核、权益核验、预授权受理和升级准备。',
          task: '审阅患者准入请求、支付方规则、承保背景和缺失的材料要求。',
          learns: ['必要信息模式', '支付方规则解读', '缺失材料检测', '面向工作人员的病例摘要格式'],
          metrics: [
            { value: '94.0%', label: '缺失材料检出率' },
            { value: '90.7%', label: '可直接使用的摘要通过率' },
            { value: '6.4x', label: 'token 使用量降低' },
          ],
          bestFor: ['患者准入', '预授权', '权益核验', '医疗健康运营'],
          safety: '不代表诊断、治疗、开具处方或自动化临床决策。',
        },
        {
          id: 'restaurant-profit-agent',
          status: '模拟基准',
          function: '餐饮',
          workflowType: '决策支持',
          title: '餐饮利润 Agent',
          subtitle: '跨渠道利润诊断',
          description: '训练 Agent 跨 POS、外卖、食材成本、人工、折扣和退款计算真实的贡献利润。',
          task: '分析餐厅每日经营表现，识别哪些渠道、活动或菜品在赚钱，哪些在流失利润。',
          learns: ['渠道利润逻辑', '食材成本规则', '活动损益模式', '每日行动建议格式'],
          metrics: [
            { value: '88.9%', label: '利润分类准确率' },
            { value: '86.1%', label: '异常检测 F1' },
            { value: '7.8x', label: 'token 使用量降低' },
          ],
          bestFor: ['餐饮利润管控', '每日经营简报', '菜单毛利分析', '门店执行工作流'],
        },
        {
          id: 'auto-dealership-inventory-agent',
          status: '模拟基准',
          function: '汽车经销商',
          workflowType: '决策支持',
          title: '汽车经销库存 Agent',
          subtitle: '拍卖与库存决策支持',
          description: '训练 Agent 评估拍卖清单、批发可比价、车辆历史、车况报告、整备估算和本地需求。',
          task: '审阅即将拍卖的车辆，找出收购机会、风险，并给出供员工复核的建议。',
          learns: ['拍卖机会模式', '出价策略逻辑', '整备风险分类', '库存决策支持格式'],
          metrics: [
            { value: '81.0%', label: '出价策略匹配率' },
            { value: '85.0%', label: '整备风险 F1' },
            { value: '5.9x', label: 'token 使用量降低' },
          ],
          bestFor: ['二手车收购', '拍卖情报', '库存规划', '整备风险审阅'],
          safety: '不承诺利润、出价准确率、销售转化或拍卖结果。',
        },
        {
          id: 'travel-booking-agent',
          status: '模拟基准',
          function: '旅行',
          workflowType: '准入',
          title: '旅行预订 Agent',
          subtitle: '票价规则与预订记录辅助',
          description: '训练 Agent 理解旅客邮件、预订记录、票价规则和缺失的行程信息。',
          task: '读取旅客请求，审阅预订记录，解读票价规则，识别缺失信息，并准备供人工审核的回复。',
          learns: ['票价规则解读', '预订记录摘要', '缺失信息检测', '回复起草模式'],
          metrics: [
            { value: '88.0%', label: '票价规则准确率' },
            { value: '91.0%', label: '缺失信息检出率' },
            { value: '7.1x', label: 'token 使用量降低' },
          ],
          bestFor: ['预订运营', '票价规则辅助', 'PNR 审阅', '旅客邮件受理'],
        },
      ],
    },
    learning: {
      eyebrow: 'Panofy 如何学习',
      title: '从示例到\u200B可复用的 Agent 技能',
      body: 'Panofy 将任务经验转化为可复用的 Agent 能力，而不是让 Agent 每次都从零推理。',
      steps: [
        { title: '从示例中学习', body: 'Panofy 研究训练案例，理解任务模式、预期输出和领域逻辑。' },
        { title: '从执行轨迹中学习', body: 'Panofy 分析中间结果，发现反复出现的错误，并反思应如何改进。' },
        { title: '沉淀 Agent 技能', body: '学到的上下文沉淀为可复用技能：推理策略、任务启发式和结构化输出模式。' },
        { title: '复用于新案例', body: '训练完成后，Agent 把学到的逻辑应用到未见过的输入上，无需从头解决整个任务。' },
      ],
      message: '提示词只能解决一次任务。Panofy 训练 Agent 一次又一次地完成同一类工作流。',
    },
    workflowTypes: {
      eyebrow: '最适合的工作流类型',
      title: 'Panofy 最擅长的场景',
      items: [
        {
          title: '复杂数据抽取',
          body: '需要从领域文档、数据或记录中进行结构化抽取的工作流。',
          examples: '科学关系挖掘、合同抽取、理赔抽取、政策解析',
        },
        {
          title: '业务规则归纳',
          body: '规则需要从示例中学习，而无法完整写出的任务。',
          examples: '评分逻辑、排序逻辑、资格检查、运营分类',
        },
        {
          title: '周期性 BI 分析',
          body: '看似简单、实则需要可重复多步逻辑的业务问题。',
          examples: '部门排名、利润分析、风险评分、KPI 拆解',
        },
        {
          title: '稳定的结构化输出',
          body: '必须返回可靠 JSON、表格、排序、标签或可直接供下游使用结果的工作流。',
          examples: '排序 JSON、关系标签、审计摘要、格式化报告',
        },
      ],
    },
    final: {
      title: '构建能学会你工作流的 Agent',
      titleAccent: '学会你工作流',
      body: '把可重复的专家任务转化为训练好的 AI Agent，让它记住模式、复用业务逻辑并持续改进。',
      primaryCta: '训练你的 Agent',
      secondaryCta: '了解 Panofy',
    },
    disclaimer:
      '已验证基准基于内部实验。模拟工作流基准为示例说明，投入生产前应结合客户自身数据集进行验证。',
  },
} satisfies Record<Locale, UseCaseLibraryPageCopy>
