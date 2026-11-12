import type { Locale } from '../../locales'

export type PlatformModuleId = 'agents' | 'data' | 'deploy' | 'research'

export type PlatformFeatureIcon =
  | 'loop'
  | 'models'
  | 'target'
  | 'cost'
  | 'tasks'
  | 'rubric'
  | 'terminal'
  | 'branch'
  | 'server'
  | 'tune'
  | 'api'
  | 'compass'
  | 'cube'
  | 'play'

export type PlatformFeature = {
  icon: PlatformFeatureIcon
  title: string
  body: string
}

export type PlatformModule = {
  id: PlatformModuleId
  /** Short label for the vertical tab list. */
  tab: string
  /** Capability name, the tab panel's heading. */
  name: string
  lead: string
  /** Two to four features. */
  features: PlatformFeature[]
}

/**
 * Micro-labels for the four capability panels. They are drawn inside inline
 * SVG in mono caps, so keep them short. `ariaLabel` describes the whole panel.
 */
export type PlatformDiagramsCopy = {
  agents: {
    ariaLabel: string
    team: string
    models: string
    evaluate: string
    evaluateValue: string
    rsi: string
    loop: string
    accuracy: string
    accuracyValue: string
  }
  data: {
    ariaLabel: string
    docs: string
    rules: string
    engine: string
    /** Exactly three outputs: tasks, eval + rubrics, environments. */
    outputs: string[]
    usesLabel: string
    /** Exactly three uses. */
    uses: string[]
  }
  deploy: {
    ariaLabel: string
    boundary: string
    data: string
    tune: string
    /** Exactly three model nodes; the first two are tuned on your data. */
    models: string[]
    tuned: string
    api: string
    /** Exactly three business systems. */
    systems: string[]
  }
  research: {
    ariaLabel: string
    goal: string
    hypotheses: string
    experiments: string
    solution: string
    executed: string
    /** Legend: winning path, pruned branch. */
    legend: string[]
  }
}

export type PlatformCopy = {
  eyebrow: string
  title: string
  body: string
  tabsLabel: string
  /** Link to the full /platform page. */
  cta: string
  modules: PlatformModule[]
  diagrams: PlatformDiagramsCopy
}

export const platformCopy = {
  en: {
    eyebrow: 'Platform',
    title: 'Data, training, deployment and self‑evolution on one stack.',
    body: 'We produce the data, train the models, deploy them inside your walls and keep every agent improving. Each workflow you hand over gets better the longer it runs.',
    tabsLabel: 'Platform capabilities',
    cta: 'Explore the platform',
    modules: [
      {
        id: 'agents',
        tab: 'Self-evolving agents',
        name: 'Self-Evolving Agent Platform',
        lead: 'Agent Teams run real enterprise workflows and keep optimizing themselves after deployment.',
        features: [
          {
            icon: 'loop',
            title: '10+ RSI algorithms',
            body: 'Recursive self-improvement keeps every Agent Team optimizing in production.',
          },
          {
            icon: 'models',
            title: '100+ models',
            body: 'Build each Agent Team on the models that fit its work.',
          },
          {
            icon: 'target',
            title: '90%+ accuracy',
            body: 'On specialized enterprise tasks.',
          },
          {
            icon: 'cost',
            title: '~1/30 model-call cost',
            body: 'Compared with Claude Code on identical test tasks.',
          },
        ],
      },
      {
        id: 'data',
        tab: 'Data & environments',
        name: 'Data Distillation & Environment Synthesis',
        lead: 'Turn enterprise documents and business rules into training data, rubrics and live environments.',
        features: [
          {
            icon: 'tasks',
            title: 'Training tasks',
            body: 'Generated automatically from your documents and business rules.',
          },
          {
            icon: 'rubric',
            title: 'Eval data & rubrics',
            body: 'Evaluation sets with scoring rubrics for every model and agent.',
          },
          {
            icon: 'terminal',
            title: 'Executable environments',
            body: 'Runnable environments where agents are trained and evaluated.',
          },
          {
            icon: 'branch',
            title: 'Distillation · RL · Eval',
            body: 'Powers distillation, reinforcement learning and evaluation of models and agents.',
          },
        ],
      },
      {
        id: 'deploy',
        tab: 'Local deployment',
        name: 'Local Deployment & Business Tuning',
        lead: 'Your models, on your infrastructure, tuned on your business.',
        features: [
          {
            icon: 'server',
            title: 'On-prem & private cloud',
            body: 'Deploy LLMs inside your own infrastructure.',
          },
          {
            icon: 'tune',
            title: 'Tuned on enterprise data',
            body: 'Train and tune every model on your business data.',
          },
          {
            icon: 'api',
            title: 'Unified multi-model API',
            body: 'Connect every model to existing systems through one API.',
          },
        ],
      },
      {
        id: 'research',
        tab: 'AutoResearch',
        name: 'AutoResearch Platform',
        lead: 'Model-driven research systems that pursue a research goal on their own.',
        features: [
          {
            icon: 'compass',
            title: 'Goal-driven exploration',
            body: 'Explores algorithms around your research goal.',
          },
          {
            icon: 'cube',
            title: 'Autonomous model building',
            body: 'Builds the models each research direction needs.',
          },
          {
            icon: 'play',
            title: 'End-to-end execution',
            body: 'Carries the winning solution through to execution.',
          },
        ],
      },
    ],
    diagrams: {
      agents: {
        ariaLabel:
          'Diagram: an Agent Team routes work across 100+ models. Every run is evaluated and rewarded, and 10+ RSI algorithms feed improved prompts, policies and weights back to the team, so task accuracy climbs from generation 1 to generation N and passes 90%.',
        team: 'AGENT TEAM',
        models: 'MODELS · 100+',
        evaluate: 'EVAL · REWARD',
        evaluateValue: '90%+',
        rsi: 'RSI · 10+ ALGORITHMS',
        loop: 'RSI',
        accuracy: 'TASK ACCURACY',
        accuracyValue: '90%+',
      },
      data: {
        ariaLabel:
          'Diagram: enterprise documents and business rules flow into a synthesis engine, which outputs training tasks, eval data with scoring rubrics, and executable environments. These outputs power distillation, reinforcement learning and evaluation.',
        docs: 'DOCS',
        rules: 'RULES',
        engine: 'SYNTHESIZE',
        outputs: ['TRAIN TASKS', 'EVAL + RUBRICS', 'ENVIRONMENTS'],
        usesLabel: 'POWERS',
        uses: ['distill', 'RL', 'eval'],
      },
      deploy: {
        ariaLabel:
          'Diagram: inside your VPC or on-prem data center, enterprise data tunes your models. Every model is served through one unified multi-model API that connects to business systems such as CRM, ERP and OA.',
        boundary: 'YOUR VPC / ON-PREM',
        data: 'YOUR DATA',
        tune: 'TUNE',
        models: ['LLM · 70B', 'LLM · 14B', 'EMBED'],
        tuned: 'tuned',
        api: 'UNIFIED API',
        systems: ['CRM', 'ERP', 'OA'],
      },
      research: {
        ariaLabel:
          'Diagram: a research goal branches into hypotheses and experiments. Weak branches are pruned, and the winning path leads to a solution that the system executes.',
        goal: 'GOAL',
        hypotheses: 'HYPOTHESES',
        experiments: 'EXPERIMENTS',
        solution: 'SOLUTION',
        executed: 'EXECUTED',
        legend: ['winning path', 'pruned'],
      },
    },
  },
  zh: {
    eyebrow: '平台能力',
    title: '数据、训练、部署、自进化，一套平台全部覆盖。',
    body: '我们负责数据生产、模型训练和私有化部署，并让每个 Agent 持续自我优化。您交给它的每个工作流，运行越久越好用。',
    tabsLabel: '平台能力',
    cta: '了解平台',
    modules: [
      {
        id: 'agents',
        tab: '自进化 Agent',
        name: '企业级自进化 Agent 平台',
        lead: 'Agent Team 自主执行真实企业工作流，部署后持续自主优化。',
        features: [
          {
            icon: 'loop',
            title: '10+ 种 RSI 算法',
            body: '递归自我改进，让每个 Agent Team 在生产环境中持续优化。',
          },
          {
            icon: 'models',
            title: '100+ 个模型',
            body: '为每个 Agent Team 选用最适合其任务的模型。',
          },
          {
            icon: 'target',
            title: '90%+ 准确率',
            body: '企业专项任务准确率。',
          },
          {
            icon: 'cost',
            title: '约 1/30 模型调用成本',
            body: '相同测试任务下，仅为 Claude Code 的约 1/30。',
          },
        ],
      },
      {
        id: 'data',
        tab: '数据与环境合成',
        name: '数据蒸馏与环境合成平台',
        lead: '把企业文档与业务规则，自动变成训练数据、评分标准与可执行环境。',
        features: [
          {
            icon: 'tasks',
            title: '训练任务',
            body: '基于企业文档与业务规则自动生成。',
          },
          {
            icon: 'rubric',
            title: '评估数据与评分标准',
            body: '为每个模型与 Agent 提供评估集和评分标准。',
          },
          {
            icon: 'terminal',
            title: '可执行环境',
            body: '供 Agent 训练与评估的可运行环境。',
          },
          {
            icon: 'branch',
            title: '蒸馏 · 强化学习 · 评估',
            body: '支持模型与 Agent 的蒸馏、强化学习及评估。',
          },
        ],
      },
      {
        id: 'deploy',
        tab: '本地部署与调优',
        name: '模型本地部署与业务调优',
        lead: '模型跑在你的环境里，用你的业务数据训练调优。',
        features: [
          {
            icon: 'server',
            title: '本地及私有化部署',
            body: '在企业自有基础设施中部署 LLM。',
          },
          {
            icon: 'tune',
            title: '企业数据业务调优',
            body: '结合企业数据开展业务训练与调优。',
          },
          {
            icon: 'api',
            title: '统一多模型 API',
            body: '通过一套 API 把所有模型接入现有业务系统。',
          },
        ],
      },
      {
        id: 'research',
        tab: 'AutoResearch',
        name: 'AutoResearch 自主研究平台',
        lead: '由模型驱动的自主研究系统，围绕研究目标自主推进。',
        features: [
          {
            icon: 'compass',
            title: '目标驱动的自主探索',
            body: '围绕研究目标自主探索算法。',
          },
          {
            icon: 'cube',
            title: '自主模型构建',
            body: '为每个研究方向构建所需的模型。',
          },
          {
            icon: 'play',
            title: '端到端方案执行',
            body: '把胜出的方案一直推进到执行落地。',
          },
        ],
      },
    ],
    diagrams: {
      agents: {
        ariaLabel:
          '示意图：Agent Team 在 100+ 个模型之间调度任务。每次运行都会被评估与奖励，10+ 种 RSI 算法把改进后的提示词、策略与权重回传给 Agent Team，任务准确率从第 1 代持续提升到第 N 代，突破 90%。',
        team: 'AGENT TEAM',
        models: '模型 · 100+',
        evaluate: '评估 · 奖励',
        evaluateValue: '90%+',
        rsi: 'RSI · 10+ 种算法',
        loop: 'RSI',
        accuracy: '任务准确率',
        accuracyValue: '90%+',
      },
      data: {
        ariaLabel:
          '示意图：企业文档与业务规则进入合成引擎，自动产出训练任务、评估数据与评分标准，以及可执行环境，用于模型与 Agent 的蒸馏、强化学习和评估。',
        docs: '企业文档',
        rules: '业务规则',
        engine: '合成引擎',
        outputs: ['训练任务', '评估与评分标准', '可执行环境'],
        usesLabel: '用于',
        uses: ['蒸馏', '强化学习', '评估'],
      },
      deploy: {
        ariaLabel:
          '示意图：在私有云或本地机房内，企业数据用于调优模型；所有模型通过统一多模型 API 提供服务，接入 CRM、ERP、OA 等业务系统。',
        boundary: '私有云 / 本地机房',
        data: '企业数据',
        tune: '调优',
        models: ['LLM · 70B', 'LLM · 14B', 'EMBED'],
        tuned: '已调优',
        api: '统一 API',
        systems: ['CRM', 'ERP', 'OA'],
      },
      research: {
        ariaLabel:
          '示意图：研究目标分解为多个假设与实验，较弱的分支被剪除，胜出路径通向被自动执行的最终方案。',
        goal: '研究目标',
        hypotheses: '假设',
        experiments: '实验',
        solution: '方案',
        executed: '已执行',
        legend: ['胜出路径', '已剪枝'],
      },
    },
  },
} satisfies Record<Locale, PlatformCopy>
