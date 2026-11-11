import type { Locale } from '../locales'
import type { ProductId } from './shared'

export type PlatformLink = { label: string; href: string }

export type PlatformCapabilityId = 'agents' | 'data' | 'deployment' | 'autoresearch'

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

export type PlatformCapability = {
  /** Anchor id of the capability block (deep links such as /platform#agents). */
  id: PlatformCapabilityId
  /** Short label shown in mono next to the index. */
  label: string
  /** Capability name, the block's h3. */
  name: string
  lead: string
  /** Three or four features. */
  features: PlatformFeature[]
  link?: PlatformLink
}

/**
 * Micro-labels drawn inside the inline-SVG diagrams in mono caps, so keep them
 * short. `ariaLabel` is the text alternative for the whole diagram.
 */
export type PlatformDiagramsCopy = {
  agents: {
    ariaLabel: string
    team: string
    models: string
    evaluate: string
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
  deployment: {
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
  autoresearch: {
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

export type PlatformLoopStep = {
  /** One-word stage name, rendered in mono. */
  label: string
  title: string
  body: string
  /** What this stage hands to the next one. */
  output: string
}

export type PlatformStat = {
  value: string
  label: string
  /** Where the number comes from, in mono. */
  source: string
}

export type PlatformPageCopy = {
  hero: {
    eyebrow: string
    title: string
    /** Part of the title set in the accent color (must appear in `title`). */
    titleAccent: string
    lead: string
    primary: PlatformLink
    secondary: PlatformLink
    specsLabel: string
    /** Exactly four headline specs. */
    specs: { value: string; label: string }[]
    stack: {
      ariaLabel: string
      /** Layer labels from the top of the stack to its base (exactly four). */
      layers: string[]
    }
  }
  capabilities: {
    eyebrow: string
    title: string
    lead: string
    /** Exactly four, in the owner's order: agents, data, deployment, AutoResearch. */
    items: PlatformCapability[]
    diagrams: PlatformDiagramsCopy
  }
  loop: {
    eyebrow: string
    title: string
    lead: string
    /** Exactly five steps: ingest, synthesize, train, deploy, evolve. */
    steps: PlatformLoopStep[]
    /** Screen-reader prefix for each step's output. */
    outputLabel: string
    diagram: {
      ariaLabel: string
      /** Mono label for the feedback arc. */
      feedback: string
    }
    loopNote: string
  }
  results: {
    eyebrow: string
    title: string
    lead: string
    statsLabel: string
    /** Exactly two benchmark results: accuracy, cost. */
    stats: PlatformStat[]
    chart: {
      title: string
      ariaLabel: string
      direction: string
      rows: {
        label: string
        /** Relative cost in PrismShadow units; one cell per unit. */
        value: number
        display: string
        emphasis: boolean
      }[]
      unitNote: string
      caption: string
    }
  }
  products: {
    eyebrow: string
    title: string
    lead: string
    /** One entry per product; names come from the shared site copy. */
    items: { id: ProductId; kicker: string; body: string; cta: string }[]
  }
}

export const platformPageCopy = {
  en: {
    hero: {
      eyebrow: 'The PrismShadow platform',
      title: 'From enterprise knowledge to self‑evolving agents.',
      titleAccent: 'self‑evolving agents',
      lead: 'PrismShadow unifies data distillation, model training, private deployment and agent self‑evolution on one stack. Enterprises build AI workflows and AutoResearch systems on it that keep improving after they ship.',
      primary: { label: 'Book a demo', href: '/contact' },
      secondary: { label: 'See the benchmark', href: '#results' },
      specsLabel: 'Platform at a glance',
      specs: [
        { value: '90%+', label: 'task accuracy' },
        { value: '1/30', label: 'model-call cost' },
        { value: '100+', label: 'models' },
        { value: '10+', label: 'RSI algorithms' },
      ],
      stack: {
        ariaLabel:
          'Diagram of the PrismShadow stack as four layers: private deployment and business tuning at the base, data distillation and environment synthesis above it, self-evolving Agent Teams above that, and AutoResearch systems at the top.',
        layers: ['AutoResearch', 'Self-evolving agents', 'Data & environments', 'Private deployment'],
      },
    },
    capabilities: {
      eyebrow: 'Capabilities',
      title: 'Four capabilities, one stack.',
      lead: 'Data, models, agents and research run on one stack, so what your company knows becomes agents that keep improving in production.',
      items: [
        {
          id: 'agents',
          label: 'Self-evolving agents',
          name: 'Self-Evolving Agent Platform',
          lead: 'Agent Teams run real enterprise workflows end to end. After deployment they keep optimizing themselves: every run is evaluated and fed back through recursive self‑improvement.',
          features: [
            {
              icon: 'loop',
              title: '10+ RSI algorithms',
              body: 'Recursive self-improvement keeps every Agent Team optimizing after it ships.',
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
              title: '1/30 model-call cost',
              body: 'Of Claude Code, on identical test tasks.',
            },
          ],
          link: { label: 'See the benchmark', href: '#results' },
        },
        {
          id: 'data',
          label: 'Data & environments',
          name: 'Data Distillation & Environment Synthesis',
          lead: 'Start from your enterprise documents and business rules. The platform generates the training tasks, eval data, scoring rubrics and executable environments that distillation, reinforcement learning and evaluation need.',
          features: [
            {
              icon: 'tasks',
              title: 'Training tasks',
              body: 'Generated automatically from documents and business rules.',
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
              title: 'Distillation · RL · eval',
              body: 'One pipeline for distilling, reinforcing and evaluating models and agents.',
            },
          ],
        },
        {
          id: 'deployment',
          label: 'Local deployment',
          name: 'Local Deployment & Business Tuning',
          lead: 'Deploy LLMs on-prem or in your private cloud, train and tune them on your enterprise data, and connect every model to the systems you already run through one unified API.',
          features: [
            {
              icon: 'server',
              title: 'On-prem & private cloud',
              body: 'Models run inside your own infrastructure.',
            },
            {
              icon: 'tune',
              title: 'Tuned on enterprise data',
              body: 'Train and tune each model on your business data.',
            },
            {
              icon: 'api',
              title: 'Unified multi-model API',
              body: 'One API connects every model to your existing systems.',
            },
          ],
          link: { label: 'Security & private deployment', href: '/security' },
        },
        {
          id: 'autoresearch',
          label: 'AutoResearch',
          name: 'AutoResearch Platform',
          lead: 'Model-driven research systems that work toward a research goal on their own: they explore algorithms, build the models each direction needs and execute the solution.',
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
          link: { label: 'See it in drug R&D', href: '/customers#enterprise' },
        },
      ],
      diagrams: {
        agents: {
          ariaLabel:
            'Diagram: an Agent Team routes work across 100+ models. Every run is evaluated, and 10+ RSI algorithms feed the results back to the team, so task accuracy climbs past 90%.',
          team: 'AGENT TEAM',
          models: 'MODELS · 100+',
          evaluate: 'EVALUATE EVERY RUN',
          rsi: 'RSI · 10+ ALGORITHMS',
          loop: 'RSI',
          accuracy: 'TASK ACCURACY',
          accuracyValue: '90%+',
        },
        data: {
          ariaLabel:
            'Diagram: enterprise documents and business rules flow into a synthesis engine, which outputs training tasks, eval data with scoring rubrics, and executable environments. These power distillation, reinforcement learning and evaluation.',
          docs: 'DOCS',
          rules: 'RULES',
          engine: 'SYNTHESIZE',
          outputs: ['TRAIN TASKS', 'EVAL + RUBRICS', 'ENVIRONMENTS'],
          usesLabel: 'POWERS',
          uses: ['distill', 'RL', 'eval'],
        },
        deployment: {
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
        autoresearch: {
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
    loop: {
      eyebrow: 'How it works',
      title: 'A closed loop that makes your AI better every day.',
      lead: 'PrismShadow turns what your company already knows into training signal, then lets deployed agents generate the next round of it themselves.',
      steps: [
        {
          label: 'Ingest',
          title: 'Documents & business rules',
          body: 'SOPs, policies, knowledge bases and historical cases.',
          output: 'knowledge corpus',
        },
        {
          label: 'Synthesize',
          title: 'Tasks, rubrics & environments',
          body: 'Training tasks, eval sets, scoring rubrics and executable sandboxes, generated automatically.',
          output: 'tasks · rubrics · envs',
        },
        {
          label: 'Train',
          title: 'Distill · RL · fine-tune',
          body: 'Specialize open models on your work, on your own hardware.',
          output: 'specialized models',
        },
        {
          label: 'Deploy',
          title: 'Agent Teams in production',
          body: 'Agents run real workflows through one unified multi-model API.',
          output: 'production traces',
        },
        {
          label: 'Evolve',
          title: 'Recursive self-improvement',
          body: '10+ RSI algorithms turn every run into the next improvement.',
          output: 'improvement signal',
        },
      ],
      outputLabel: 'Output',
      diagram: {
        ariaLabel:
          'Loop diagram: documents and business rules enter once. Synthesis, training, deployment and evolution then run as a cycle, and the feedback arc carries every production run back into the next round of synthesis.',
        feedback: 'feedback',
      },
      loopNote: 'Every run feeds the next round of synthesis and training.',
    },
    results: {
      eyebrow: 'Results',
      title: '90%+ accuracy, at\u00A0a\u00A0fraction of\u00A0the\u00A0cost.',
      lead: 'On specialized enterprise tasks, accuracy passes 90%. On identical test tasks, model-call cost is about 1/30 of Claude Code’s.',
      statsLabel: 'Benchmark results',
      stats: [
        {
          value: '90%+',
          label: 'accuracy on specialized enterprise tasks',
          source: 'Self-Evolving Agent Platform',
        },
        {
          value: '1/30',
          label: 'model-call cost of Claude Code on identical test tasks',
          source: 'Head-to-head benchmark',
        },
      ],
      chart: {
        title: 'Model-call cost on identical test tasks',
        ariaLabel:
          'On identical test tasks, Claude Code spends about 30 times as much on model calls as PrismShadow.',
        direction: 'Lower is better',
        rows: [
          { label: 'Claude Code', value: 30, display: '30×', emphasis: false },
          { label: 'PrismShadow', value: 1, display: '1×', emphasis: true },
        ],
        unitNote: '1 cell = PrismShadow’s cost',
        caption:
          'Both rows share one scale. To complete the same test tasks, Claude Code spends about 30 times as much on model calls.',
      },
    },
    products: {
      eyebrow: 'Products',
      title: 'The products that power it.',
      lead: 'Three products carry the platform into your stack: agents that build agents, expert agents trained on your team’s work, and zero-code fine-tuning for open models.',
      items: [
        {
          id: 'penguin-harness',
          kicker: 'Agent self-evolution engine',
          body: 'Open-source, local-first multi-agent app platform where agents build, evaluate, optimize and deploy agents.',
          cta: 'Explore PenguinHarness',
        },
        {
          id: 'panofy',
          kicker: 'Expert agents',
          body: 'Train expert agents from your team’s own work.',
          cta: 'Explore Panofy',
        },
        {
          id: 'llama-factory',
          kicker: 'Zero-code fine-tuning',
          body: 'Fine-tune and customize open models with zero code.',
          cta: 'Explore LlamaFactory',
        },
      ],
    },
  },
  zh: {
    hero: {
      eyebrow: 'PrismShadow 平台',
      title: '从企业知识，到自我进化的 Agent。',
      titleAccent: '自我进化的 Agent',
      lead: 'PrismShadow 把数据蒸馏、模型训练、私有部署与 Agent 自进化统一在同一套技术栈上。企业在此构建 AI 工作流与 AutoResearch 系统，上线之后仍在持续变强。',
      primary: { label: '预约演示', href: '/contact' },
      secondary: { label: '查看基准结果', href: '#results' },
      specsLabel: '平台概览',
      specs: [
        { value: '90%+', label: '任务准确率' },
        { value: '1/30', label: '模型调用成本' },
        { value: '100+', label: '兼容模型' },
        { value: '10+', label: 'RSI 算法' },
      ],
      stack: {
        ariaLabel:
          'PrismShadow 技术栈示意图，共四层：底层是本地部署与业务调优，其上是数据蒸馏与环境合成，再往上是自进化 Agent Team，顶层是 AutoResearch 自主研究系统。',
        layers: ['AutoResearch', '自进化 Agent', '数据与环境合成', '本地部署与调优'],
      },
    },
    capabilities: {
      eyebrow: '核心能力',
      title: '四大能力，同一套技术栈。',
      lead: '数据、模型、Agent 与研究运行在同一套技术栈上，让企业知识转化为在生产环境中持续进化的 Agent。',
      items: [
        {
          id: 'agents',
          label: '自进化 Agent',
          name: '企业级自进化 Agent 平台',
          lead: 'Agent Team 端到端执行真实的企业工作流。上线之后持续自主优化：每一次运行都会被评估，并通过递归自我改进回流到 Agent 本身。',
          features: [
            {
              icon: 'loop',
              title: '10+ 种 RSI 算法',
              body: '递归自我改进，让每个 Agent Team 上线后持续优化。',
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
              title: '1/30 模型调用成本',
              body: '相同测试任务下，约为 Claude Code 的 1/30。',
            },
          ],
          link: { label: '查看基准结果', href: '#results' },
        },
        {
          id: 'data',
          label: '数据与环境合成',
          name: '数据蒸馏与环境合成平台',
          lead: '以企业文档与业务规则为起点，自动生成训练任务、评估数据、评分标准与可执行环境，满足模型与 Agent 蒸馏、强化学习和评估的全部需要。',
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
              body: '一条数据管线，覆盖模型与 Agent 的蒸馏、强化学习与评估。',
            },
          ],
        },
        {
          id: 'deployment',
          label: '本地部署与调优',
          name: '模型本地部署与业务调优',
          lead: '在本地机房或私有云中部署大模型，用企业自有数据完成训练与调优，并通过一套统一 API 把所有模型接入现有业务系统。',
          features: [
            {
              icon: 'server',
              title: '本地及私有化部署',
              body: '模型运行在企业自有基础设施中。',
            },
            {
              icon: 'tune',
              title: '企业数据业务调优',
              body: '结合企业数据，完成每个模型的训练与调优。',
            },
            {
              icon: 'api',
              title: '统一多模型 API',
              body: '一套 API，把所有模型接入现有业务系统。',
            },
          ],
          link: { label: '了解安全与私有部署', href: '/security' },
        },
        {
          id: 'autoresearch',
          label: 'AutoResearch',
          name: 'AutoResearch 自主研究平台',
          lead: '由模型驱动的自主研究系统，围绕研究目标自主推进：探索算法、构建每个方向所需的模型，并执行最终方案。',
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
          link: { label: '查看药物研发案例', href: '/customers#enterprise' },
        },
      ],
      diagrams: {
        agents: {
          ariaLabel:
            '示意图：Agent Team 在 100+ 个模型之间调度任务。每次运行都会被评估，10+ 种 RSI 算法把结果回传给 Agent Team，任务准确率持续提升并突破 90%。',
          team: 'AGENT TEAM',
          models: '模型 · 100+',
          evaluate: '逐次评估',
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
        deployment: {
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
        autoresearch: {
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
    loop: {
      eyebrow: '工作原理',
      title: '一个让 AI 每天都在变强的闭环。',
      lead: 'PrismShadow 把企业已有的知识转化为训练信号，再让上线运行的 Agent 自己产出下一轮信号。',
      steps: [
        {
          label: '接入',
          title: '企业文档与业务规则',
          body: 'SOP、制度规范、知识库与历史案例。',
          output: '知识语料',
        },
        {
          label: '合成',
          title: '任务、评分标准与环境',
          body: '自动生成训练任务、评估集、评分标准与可执行沙箱。',
          output: '任务 · 评分标准 · 环境',
        },
        {
          label: '训练',
          title: '蒸馏 · 强化学习 · 微调',
          body: '在你自己的算力上，把开源模型训练成业务专家。',
          output: '专精模型',
        },
        {
          label: '部署',
          title: 'Agent Team 上线运行',
          body: 'Agent 通过统一多模型 API 执行真实业务工作流。',
          output: '生产运行轨迹',
        },
        {
          label: '进化',
          title: '递归自我改进',
          body: '10+ 种 RSI 算法，把每一次运行变成下一次提升。',
          output: '改进信号',
        },
      ],
      outputLabel: '输出',
      diagram: {
        ariaLabel:
          '闭环示意图：企业文档与业务规则一次性接入，随后合成、训练、部署与进化循环运行，反馈回路把每一次生产运行带回下一轮合成。',
        feedback: '反馈回路',
      },
      loopNote: '每一次运行，都会回流为下一轮合成与训练的数据。',
    },
    results: {
      eyebrow: '成果',
      title: '准确率 90%+，成本仅约 1/30。',
      lead: '企业专项任务准确率超过 90%；相同测试任务下，模型调用成本约为 Claude Code 的 1/30。',
      statsLabel: '基准成果',
      stats: [
        {
          value: '90%+',
          label: '企业专项任务准确率',
          source: '企业级自进化 Agent 平台',
        },
        {
          value: '1/30',
          label: '相同测试任务下，模型调用成本约为 Claude Code 的 1/30',
          source: '同任务对比测试',
        },
      ],
      chart: {
        title: '相同测试任务的模型调用成本',
        ariaLabel: '相同测试任务下，Claude Code 的模型调用成本约为 PrismShadow 的 30 倍。',
        direction: '越低越好',
        rows: [
          { label: 'Claude Code', value: 30, display: '30×', emphasis: false },
          { label: 'PrismShadow', value: 1, display: '1×', emphasis: true },
        ],
        unitNote: '1 格 = PrismShadow 的成本',
        caption: '两行使用同一刻度。完成相同的测试任务，Claude Code 的模型调用花费约为 PrismShadow 的 30 倍。',
      },
    },
    products: {
      eyebrow: '产品',
      title: '驱动平台的三款产品。',
      lead: '三款产品把平台能力带进你的技术栈：让 Agent 构建 Agent，用团队自己的工作训练专家级 Agent，以及零代码微调开源模型。',
      items: [
        {
          id: 'penguin-harness',
          kicker: 'Agent 自进化引擎',
          body: '开源、本地优先的多 Agent 应用平台，由 Agent 构建、评估、优化并部署 Agent。',
          cta: '了解 PenguinHarness',
        },
        {
          id: 'panofy',
          kicker: '专家级 Agent',
          body: '用团队自己的工作，训练专家级 Agent。',
          cta: '了解 Panofy',
        },
        {
          id: 'llama-factory',
          kicker: '零代码微调',
          body: '零代码微调与定制开源大模型。',
          cta: '了解 LlamaFactory',
        },
      ],
    },
  },
} satisfies Record<Locale, PlatformPageCopy>
