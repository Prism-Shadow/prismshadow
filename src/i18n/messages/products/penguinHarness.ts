import type { Locale } from '../../locales'
import type {
  CtaCopy,
  FeatureCopy,
  SectionHeadCopy,
  StatCopy,
  TabCopy,
} from './types'

// Source: the public PenguinHarness README / README.zh and the penguin.ooo landing copy.

export type PenguinHarnessCopy = {
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    lead: string
    primaryCta: string
    secondaryCta: string
    docsCta: string
    metaLabel: string
    meta: string[]
    productHunt: string
    windowLabel: string
    imageAlt: string
  }
  proof: {
    title: string
    stats: StatCopy[]
  }
  compare: SectionHeadCopy & {
    sides: {
      name: string
      speed: string
      mode: string
      note: string
    }[]
  }
  how: SectionHeadCopy & {
    tabsLabel: string
    tabs: TabCopy[]
    visuals: {
      build: {
        promptLabel: string
        prompt: string
        cost: string
        imageAlt: string
      }
      evaluate: {
        title: string
        suitesLabel: string
        suites: { id: string; name: string }[]
        tasks: string
        traceLabel: string
        lanes: string[]
        legend: string[]
      }
      evolve: {
        ariaLabel: string
        nodes: { label: string; body: string }[]
        snapshot: string
        loop: string
      }
      deploy: {
        ariaLabel: string
        entries: { label: string; meta: string }[]
        rootLabel: string
        platforms: string
      }
    }
  }
  benchmark: SectionHeadCopy & {
    accuracy: string
    cost: string
    higher: string
    lower: string
    suites: {
      title: string
      meta: string
      summary: string
    }[]
    multipleNote: string
    footnote: string
    tableCaption: string
    colHarness: string
    colModel: string
  }
  features: SectionHeadCopy & {
    items: FeatureCopy[]
  }
  inTheBox: SectionHeadCopy & {
    pluginsTitle: string
    plugins: { category: string; items: string[] }[]
    modelsTitle: string
    colModel: string
    colProviders: string
    modelsNote: string
  }
  production: SectionHeadCopy & {
    cases: {
      sector: string
      title: string
      body: string
      stats: StatCopy[]
    }[]
  }
  install: SectionHeadCopy & {
    requirementsLabel: string
    requirements: { label: string; value: string }[]
    downloadCta: string
    dockerCta: string
    terminalLabel: string
    tabs: string[]
    comments: {
      start: string
      firstLogin: string
      oneShot: string
      repl: string
      headless: string
    }
  }
  cta: CtaCopy
}

export const penguinHarnessCopy = {
  en: {
    hero: {
      eyebrow: 'Open-source agent platform',
      title: 'Let agents build better agents.',
      titleAccent: 'better agents',
      lead: 'PenguinHarness is an open-source, local-first multi-agent app development platform. It fully automates building, optimizing and deploying AI apps, on your computer or your own server.',
      primaryCta: 'Download desktop app',
      secondaryCta: 'GitHub',
      docsCta: 'Read the docs',
      metaLabel: 'PenguinHarness at a glance',
      meta: ['1000+ models', 'Linux · macOS · Windows', 'Apache 2.0', 'Agent self-evolution'],
      productHunt: 'Featured on Product Hunt',
      windowLabel: 'penguin web',
      imageAlt:
        'PenguinHarness building a Claude Code docs expert from a one-sentence request, on DeepSeek V4 Pro',
    },
    proof: {
      title: 'PenguinHarness in numbers',
      stats: [
        {
          value: '1/70',
          label: 'of Claude Code’s cost, with the best accuracy on the data-analysis suite',
        },
        {
          value: '$0.02',
          label: 'of tokens to generate a complete RAG app on DeepSeek V4 Pro',
        },
        {
          value: '1000+',
          label: 'online and local models, through presets or any OpenAI-protocol endpoint',
        },
        {
          value: '100%',
          label: 'open source under Apache 2.0, running on your own machine',
        },
      ],
    },
    compare: {
      eyebrow: 'vs. LangChain',
      title: 'Agents build agents, at 100×.',
      titleAccent: 'at 100×',
      lead: 'With LangChain, you build agents by hand, at 1× speed. With PenguinHarness, agents build agents, at 100×.',
      sides: [
        {
          name: 'LangChain',
          speed: '1×',
          mode: 'Agents built by hand',
          note: 'Chains, tools and prompts written line by line. Every app starts from zero.',
        },
        {
          name: 'PenguinHarness',
          speed: '100×',
          mode: 'Agents built by agents',
          note: 'One sentence in. An agent delivers scaffold, code and run instructions end to end.',
        },
      ],
    },
    how: {
      eyebrow: 'How it works',
      title: 'The whole agent lifecycle, automated.',
      titleAccent: 'automated',
      lead: 'PenguinHarness runs on your computer or server and automates the agent app lifecycle, from creation and evaluation to optimization and deployment.',
      tabsLabel: 'PenguinHarness lifecycle',
      tabs: [
        {
          id: 'build',
          label: 'Build',
          title: 'One sentence generates a runnable agent app',
          body: 'Describe what you need in one sentence. PenguinHarness builds the complete agent application, scaffold, code and run instructions, end to end.',
          points: [
            {
              title: '$0.02 per app',
              body: 'A full RAG app with retrieval and clickable cited sources, built on DeepSeek V4 Pro.',
            },
            {
              title: 'Simplest is best',
              body: 'A minimal toolset over clean low-level interfaces: fewer tool calls, fewer tokens.',
            },
            {
              title: 'Skills that grow',
              body: 'Agents write and optimize their own skills as they work.',
            },
          ],
        },
        {
          id: 'evaluate',
          label: 'Evaluate',
          title: 'Every run scored, every request traced',
          body: 'The Evaluation Center ships built-in benchmark suites and scoreboards. The Trace view replays every model request and tool call, with token breakdown and timing.',
          points: [
            {
              title: 'Built-in benchmarks',
              body: 'Five suites and 50 tasks, each run in Docker by the Harbor framework.',
            },
            {
              title: 'Full tracing',
              body: 'Tokens, time and failures for every call, replayable line by line.',
            },
            {
              title: 'Approvals and audit',
              body: 'Tool calls pass approval first, and every decision is recorded.',
            },
          ],
        },
        {
          id: 'evolve',
          label: 'Evolve',
          title: 'A native self-evolution engine',
          body: 'An agent evaluates and optimizes itself: run the benchmark, find the lost points, ship version N+1. Score keeps rising while cost and time keep falling.',
          points: [
            {
              title: 'Parallel evaluators',
              body: 'The Optimizer scores the target agent with many Evaluators at once.',
            },
            {
              title: 'A snapshot every round',
              body: 'Agent state is saved before each round. Restore any version in one step.',
            },
            {
              title: 'Bounded evolution',
              body: 'Changes stay inside Workspace and Skills. The harness core never moves.',
            },
          ],
        },
        {
          id: 'deploy',
          label: 'Deploy',
          title: 'Local-first, from laptop to server',
          body: 'Start with the desktop app, or install the CLI on a workstation or server. Both share the same ~/.penguin/data root, and a server is one docker run away.',
          points: [
            {
              title: 'Desktop app',
              body: 'Embeds the server and opens already signed in. No terminal needed.',
            },
            {
              title: 'Server and Docker',
              body: 'penguin web serves the full Web UI. Images for linux/amd64 and arm64.',
            },
            {
              title: 'Data stays local',
              body: 'An auditable open-source kernel, with data kept in local directories.',
            },
          ],
        },
      ],
      visuals: {
        build: {
          promptLabel: 'Prompt',
          prompt:
            'Collect the docs from github.com/ericbuess/claude-code-docs and build a RAG app that answers Claude Code questions as a configuration expert, citing its sources.',
          cost: '$0.02 of tokens · DeepSeek V4 Pro',
          imageAlt:
            'The generated RAG app: a Claude Code docs expert answering with cited, clickable sources',
        },
        evaluate: {
          title: 'Evaluation Center',
          suitesLabel: 'Built-in benchmarks',
          suites: [
            { id: 'Sec A', name: 'Data analysis' },
            { id: 'Sec B', name: 'DeepSWE' },
            { id: 'Sec C', name: 'AutomationBench' },
            { id: 'Sec D', name: 'Terminal-Bench-Science' },
            { id: 'Sec E', name: 'Terminal-Bench' },
          ],
          tasks: '10 tasks',
          traceLabel: 'Trace · execution timeline',
          lanes: ['Model', 'exec_command'],
          legend: ['Thinking', 'Model reply', 'Tool call', 'Approval', 'Tool exec'],
        },
        evolve: {
          ariaLabel:
            'Self-evolution loop: the Optimizer runs Evaluators in parallel, scores and traces show the lost points, and the agent ships as version N+1',
          nodes: [
            { label: 'Optimizer', body: 'Plans the round' },
            { label: 'Evaluator × N', body: 'Run benchmarks in parallel' },
            { label: 'Scores & traces', body: 'Find the lost points' },
            { label: 'Agent vN+1', body: 'Updated prompts and skills' },
          ],
          snapshot: 'snapshot',
          loop: 'next round',
        },
        deploy: {
          ariaLabel:
            'The desktop app, the CLI and Docker all run the same server on one shared data root',
          entries: [
            { label: 'Desktop app', meta: 'dmg · exe · AppImage' },
            { label: 'CLI', meta: 'penguin web' },
            { label: 'Docker', meta: 'amd64 · arm64' },
          ],
          rootLabel: 'One shared data root',
          platforms: 'Linux · macOS · Windows 10+ · x64 · arm64',
        },
      },
    },
    benchmark: {
      eyebrow: 'Benchmark',
      title: 'Best accuracy at 1/70 of the cost.',
      titleAccent: '1/70 of the cost',
      lead: 'Each harness runs the model it is normally paired with, head-to-head on the same tasks. Comparable accuracy, tens of times the difference in spend.',
      accuracy: 'Accuracy',
      cost: 'Total cost',
      higher: 'higher is better',
      lower: 'lower is better',
      suites: [
        {
          title: 'Data analysis',
          meta: '15 tasks · single run',
          summary:
            'Best accuracy of the three, at 1/70 of Claude Code’s cost and 1/35 of OpenAI Codex’s.',
        },
        {
          title: 'Coding',
          meta: '40 tasks × 2 runs',
          summary:
            'Ties OpenAI Codex on accuracy and trails Claude Code, at 1/58 and 1/39 of their cost.',
        },
      ],
      multipleNote: 'Tags show each rival’s cost as a multiple of PenguinHarness’s.',
      footnote:
        'PenguinHarness on DeepSeek V4 Pro, Claude Code on Claude Opus 4.8, OpenAI Codex on GPT-5.5. Tokens and cost are suite totals, estimated at official pricing.',
      tableCaption: 'Benchmark results by suite',
      colHarness: 'Harness',
      colModel: 'Model',
    },
    features: {
      eyebrow: 'Features',
      title: 'The full capability set, one desktop-grade UI.',
      titleAccent: 'one desktop-grade UI',
      lead: 'Every capability lives in the web interface itself. Installed means ready.',
      items: [
        {
          title: 'Multi-session chat',
          body: 'Any number of sessions per agent, with streaming output, tool approvals and image paste.',
        },
        {
          title: 'Agent hub',
          body: 'Create and manage agents in one click. Names, descriptions and prompts stay editable.',
        },
        {
          title: 'Skill library',
          body: 'Browse, install and quick-invoke skills. Agents can write and optimize their own.',
        },
        {
          title: 'Scheduled tasks',
          body: 'Cron-style schedules run agents on time, fully traced and unattended.',
        },
        {
          title: 'Subagents',
          body: 'Delegate work to parallel subagents, independent and isolated from each other.',
        },
        {
          title: 'Cost center',
          body: 'Daily trends for tokens, requests and cost, with per-model success rates.',
        },
        {
          title: 'Trace view',
          body: 'Replay every request and tool call round by round, with token breakdown and timing.',
        },
        {
          title: 'Agent evaluation',
          body: 'Built-in benchmark suites and scoreboards. Scores climb as agents evolve.',
        },
        {
          title: 'Multi-user management',
          body: 'Admins provision users. Each gets an independent Project with isolated data.',
        },
      ],
    },
    inTheBox: {
      eyebrow: 'In the box',
      title: 'Plugins and models, built in.',
      titleAccent: 'built in',
      lead: 'Four plugin categories ship with every install, and agents can write and optimize their own skills. Pick a model preset, or point any OpenAI-protocol endpoint at 1000+ online and local models.',
      pluginsTitle: 'Built-in plugins',
      plugins: [
        {
          category: 'Office productivity',
          items: [
            'data-analysis',
            'use-firecrawl',
            'use-bento-slides',
            'humanizer',
            'goal',
            'continual-learning',
          ],
        },
        {
          category: 'Software development',
          items: ['software-development', 'use-claude-code'],
        },
        {
          category: 'AI app development',
          items: ['agent-development', 'model-development', 'skill-porting', 'agent-tuning'],
        },
        {
          category: 'Agent company',
          items: ['agent-company'],
        },
      ],
      modelsTitle: 'Supported models',
      colModel: 'Model',
      colProviders: 'Providers',
      modelsNote: 'Latest generation of each family. The in-app Models page lists every preset.',
    },
    production: {
      eyebrow: 'In production',
      title: 'From screening centers to factory floors.',
      titleAccent: 'factory floors',
      lead: 'Teams use PenguinHarness to build agents automatically and deploy them to production.',
      cases: [
        {
          sector: 'Healthcare',
          title: 'Screening-report QC',
          body: 'A health-screening group had PenguinHarness build a report-QC agent and deployed it on a local Qwen3 14B, so data never leaves the facility. Findings match medical experts, at several times the review capacity.',
          stats: [
            { value: '30/min', label: 'reports checked by the agent' },
            { value: '30 min', label: 'for one review round by hand, before' },
          ],
        },
        {
          sector: 'Manufacturing',
          title: 'Production-line inspection',
          body: 'A manufacturer had PenguinHarness build a line-inspection agent and deployed it across multiple live lines. It watches equipment around the clock and tries automated recovery first.',
          stats: [
            { value: '−65%', label: 'downtime after deployment' },
            { value: '~2×', label: 'output, roughly doubled' },
          ],
        },
      ],
    },
    install: {
      eyebrow: 'Quick start',
      title: 'Up and running in one line.',
      titleAccent: 'one line',
      lead: 'Start with the desktop app, or install the CLI on a workstation or server. Both use the same ~/.penguin/data root and can be mixed freely.',
      requirementsLabel: 'Requirements',
      requirements: [
        { label: 'OS', value: 'Linux, macOS, Windows 10+' },
        { label: 'Architecture', value: 'x64, arm64' },
        { label: 'Runtime', value: 'Bundled by the one-line installer' },
        { label: 'Model', value: 'An API key for at least one model' },
      ],
      downloadCta: 'Download desktop app',
      dockerCta: 'Docker quickstart',
      terminalLabel: 'Install PenguinHarness',
      tabs: ['macOS / Linux', 'Windows', 'npm', 'Docker', 'For agents'],
      comments: {
        start: 'start the service and open http://127.0.0.1:7364',
        firstLogin: 'prints the first-login link',
        oneShot: 'one-shot task',
        repl: 'interactive REPL',
        headless: 'headless service, same API as the Web App',
      },
    },
    cta: {
      title: 'Complex AI development, made ever simpler.',
      titleAccent: 'ever simpler',
      body: 'Through continuous evolution, PenguinHarness gives you a more efficient, more reliable, lower-hallucination and lower-cost agent productivity engine.',
      primary: { label: 'Download desktop app', href: 'https://penguin.ooo/download' },
      secondary: { label: 'Book a demo', href: '/contact' },
    },
  },
  zh: {
    hero: {
      eyebrow: '开源多 Agent 开发平台',
      title: '让 Agent 构建更好的 Agent。',
      titleAccent: '更好的 Agent',
      lead: 'PenguinHarness 是开源、本地的多 Agent 应用自动开发平台，全自动创建、优化、部署 AI 应用，运行在你的电脑或服务器上。',
      primaryCta: '下载桌面端',
      secondaryCta: 'GitHub',
      docsCta: '阅读文档',
      metaLabel: 'PenguinHarness 概览',
      meta: ['1000+ 模型', 'Linux · macOS · Windows', 'Apache 2.0 开源', 'Agent 自进化'],
      productHunt: 'Product Hunt 精选',
      windowLabel: 'penguin web',
      imageAlt: 'PenguinHarness 用一句话需求构建 Claude Code 文档专家，使用 DeepSeek V4 Pro 模型',
    },
    proof: {
      title: 'PenguinHarness 关键数据',
      stats: [
        {
          value: '1/70',
          label: '仅为 Claude Code 成本的七十分之一，数据分析准确率居首',
        },
        {
          value: '$0.02',
          label: '生成整个 RAG 应用的 token 花费（约 0.2 元，DeepSeek V4 Pro）',
        },
        {
          value: '1000+',
          label: '在线与本地模型，选择预置或接入任意 OpenAI 协议端点',
        },
        {
          value: '100%',
          label: '基于 Apache 2.0 协议开源，运行在你自己的机器上',
        },
      ],
    },
    compare: {
      eyebrow: '对比 LangChain',
      title: '用 Agent 构建 Agent，100 倍速。',
      titleAccent: '100 倍速',
      lead: '使用 LangChain，以 1 倍速度人工构建 Agent；使用 PenguinHarness，以 100 倍速度用 Agent 构建 Agent。',
      sides: [
        {
          name: 'LangChain',
          speed: '1×',
          mode: '人工构建 Agent',
          note: '逐行编写链路、工具与提示词，每个应用都从零开始。',
        },
        {
          name: 'PenguinHarness',
          speed: '100×',
          mode: 'Agent 构建 Agent',
          note: '一句话需求，Agent 端到端交付脚手架、代码与运行说明。',
        },
      ],
    },
    how: {
      eyebrow: '工作方式',
      title: 'Agent 应用全生命周期，全自动。',
      titleAccent: '全自动',
      lead: 'PenguinHarness 运行在你的电脑或服务器上，自动串联 Agent 应用的创建、评测、优化与部署。',
      tabsLabel: 'PenguinHarness 生命周期',
      tabs: [
        {
          id: 'build',
          label: '创建',
          title: '一句话生成可运行的 Agent 应用',
          body: '用一句话描述需求，PenguinHarness 自动构建完整的 Agent 应用：脚手架、代码、运行说明，一步到位。',
          points: [
            {
              title: '每个应用 $0.02',
              body: '检索增强、引用可点击直达原文的完整 RAG 应用，基于 DeepSeek V4 Pro。',
            },
            {
              title: '至简即最优',
              body: '最小化工具集与简洁的底层接口，更少的工具调用，更少的 Token。',
            },
            {
              title: '技能持续生长',
              body: 'Agent 在工作中编写并优化自己的 Skill。',
            },
          ],
        },
        {
          id: 'evaluate',
          label: '评测',
          title: '每次运行都打分，每个请求都留痕',
          body: '评估中心内置 Benchmark 题库与记分板；轨迹观测逐轮回放每次模型请求与工具调用，Token 细分与耗时全量可查。',
          points: [
            {
              title: '内置 Benchmark',
              body: '五套题库、50 道任务，均由 Harbor 框架在 Docker 中运行。',
            },
            {
              title: '全量追踪',
              body: '每次调用的 Token、耗时与失败原因，事后逐条回放。',
            },
            {
              title: '权限审批与审计',
              body: '工具调用先经审批再执行，每次决定都留有记录。',
            },
          ],
        },
        {
          id: 'evolve',
          label: '进化',
          title: '原生 Agent 自进化引擎',
          body: 'Agent 自己评估、自己优化：跑 Benchmark、找失分点、发布 N+1 版。分数不断上升，成本与耗时不断下降。',
          points: [
            {
              title: '并行评测',
              body: 'Optimizer 组织多个 Evaluator 同时为目标 Agent 打分。',
            },
            {
              title: '每轮自动快照',
              body: '每轮优化前保存 Agent 状态，一步恢复任意历史版本。',
            },
            {
              title: '进化不越界',
              body: '改动只发生在 Workspace 与 Skill 之内，Harness 内核始终不变。',
            },
          ],
        },
        {
          id: 'deploy',
          label: '部署',
          title: '本地优先，从笔记本到服务器',
          body: '优先使用桌面端，也可以在本地电脑或服务器上安装命令行。两者共用 ~/.penguin/data 目录，服务端也可以一条 docker run 起来。',
          points: [
            {
              title: '桌面端应用',
              body: '内嵌服务端，打开即已登录，全程无需终端。',
            },
            {
              title: '服务器与 Docker',
              body: 'penguin web 提供完整 Web 界面，镜像支持 linux/amd64 与 arm64。',
            },
            {
              title: '数据不出域',
              body: '内核完全开源可审计，数据保存在本地目录。',
            },
          ],
        },
      ],
      visuals: {
        build: {
          promptLabel: '需求',
          prompt:
            '收集 github.com/ericbuess/claude-code-docs 的文档，做一个化身 Claude Code 配置专家、回答带来源引用的 RAG 问答应用。',
          cost: '$0.02 token 花费 · DeepSeek V4 Pro',
          imageAlt: '生成的 RAG 应用成品：Claude Code 配置专家，回答带可点击的来源引用',
        },
        evaluate: {
          title: '评估中心',
          suitesLabel: '内置 Benchmark',
          suites: [
            { id: 'Sec A', name: '数据分析' },
            { id: 'Sec B', name: 'DeepSWE' },
            { id: 'Sec C', name: 'AutomationBench' },
            { id: 'Sec D', name: 'Terminal-Bench-Science' },
            { id: 'Sec E', name: 'Terminal-Bench' },
          ],
          tasks: '10 道任务',
          traceLabel: '轨迹 · 执行时间线',
          lanes: ['Model', 'exec_command'],
          legend: ['思考', '模型回复', '工具调用', '审批等待', '工具执行'],
        },
        evolve: {
          ariaLabel:
            '自进化循环：Optimizer 组织 Evaluator 并行评测，依据分数与轨迹定位失分点，Agent 升级为 N+1 版',
          nodes: [
            { label: 'Optimizer', body: '规划本轮优化' },
            { label: 'Evaluator × N', body: '并行运行 Benchmark' },
            { label: '分数与轨迹', body: '定位失分原因' },
            { label: 'Agent vN+1', body: '更新提示词与 Skill' },
          ],
          snapshot: '快照',
          loop: '下一轮',
        },
        deploy: {
          ariaLabel: '桌面端、命令行与 Docker 运行同一个服务端，共用一个数据目录',
          entries: [
            { label: '桌面端', meta: 'dmg · exe · AppImage' },
            { label: '命令行', meta: 'penguin web' },
            { label: 'Docker', meta: 'amd64 · arm64' },
          ],
          rootLabel: '共用一个数据目录',
          platforms: 'Linux · macOS · Windows 10+ · x64 · arm64',
        },
      },
    },
    benchmark: {
      eyebrow: 'Benchmark',
      title: '准确率最高，成本仅 1/70。',
      titleAccent: '成本仅 1/70',
      lead: '每个产品搭配它常用的模型，在同一批任务上正面对比：准确率同级，花的钱差出几十倍。',
      accuracy: '准确率',
      cost: '总成本',
      higher: '越高越好',
      lower: '越低越好',
      suites: [
        {
          title: '复杂数据分析',
          meta: '15 道任务 · 单次运行',
          summary: '三者中准确率最高，成本只有 Claude Code 的 1/70、OpenAI Codex 的 1/35。',
        },
        {
          title: '代码任务',
          meta: '40 道任务 × 2 次运行',
          summary:
            '准确率与 OpenAI Codex 持平、低于 Claude Code，成本只有前者的 1/58、后者的 1/39。',
        },
      ],
      multipleNote: '标签为对手成本相对 PenguinHarness 的倍数。',
      footnote:
        'PenguinHarness 使用 DeepSeek V4 Pro，Claude Code 使用 Claude Opus 4.8，OpenAI Codex 使用 GPT-5.5。Token 与成本为全套题目合计，按官方计价估算。',
      tableCaption: '各题库 Benchmark 结果',
      colHarness: '实验框架',
      colModel: '模型',
    },
    features: {
      eyebrow: '主要功能',
      title: '桌面级界面里的完整能力。',
      titleAccent: '完整能力',
      lead: '每一项都在 Web 界面里，装好即用。',
      items: [
        {
          title: '多 Session 会话',
          body: '每个 Agent 可开任意多个会话，流式输出、工具审批与图片粘贴开箱即用。',
        },
        {
          title: '智能体仓库',
          body: '一键创建与管理多个 Agent，名称、描述与提示词随时可改。',
        },
        {
          title: '技能库',
          body: '浏览、安装、快捷调用 Skill，Agent 也能编写并优化自己的技能。',
        },
        {
          title: '定时任务',
          body: '计划调度让 Agent 到点自动执行，全程留痕，无人值守。',
        },
        {
          title: '子 Agent',
          body: '任务可委派给 Subagent 并行协作，各自独立、互不干扰。',
        },
        {
          title: '成本中心',
          body: 'Token、请求与成本逐日趋势，各模型成功率一目了然。',
        },
        {
          title: '轨迹观测',
          body: '逐轮回放每次请求与工具调用，Token 细分与耗时全量可查。',
        },
        {
          title: 'Agent 评估',
          body: '内建 Benchmark 题库与记分板，分数随进化持续上升。',
        },
        {
          title: '多用户管理',
          body: '管理员创建用户，各自拥有独立 Project，数据相互隔离。',
        },
      ],
    },
    inTheBox: {
      eyebrow: '开箱即用',
      title: '内置插件与模型，装好即用。',
      titleAccent: '装好即用',
      lead: '四类插件开箱内置，Agent 也能编写并优化自己的 Skill。选择模型预置，或用 OpenAI 协议端点连接 1000+ 在线与本地模型。',
      pluginsTitle: '内置插件库',
      plugins: [
        {
          category: '办公效率',
          items: [
            'data-analysis',
            'use-firecrawl',
            'use-bento-slides',
            'humanizer',
            'goal',
            'continual-learning',
          ],
        },
        {
          category: '软件开发',
          items: ['software-development', 'use-claude-code'],
        },
        {
          category: 'AI 应用开发',
          items: ['agent-development', 'model-development', 'skill-porting', 'agent-tuning'],
        },
        {
          category: 'Agent 公司',
          items: ['agent-company'],
        },
      ],
      modelsTitle: '支持的模型',
      colModel: '模型',
      colProviders: '可用供应商',
      modelsNote: '每个系列只列最新一代，完整预置清单请在应用的模型页查看。',
    },
    production: {
      eyebrow: '应用场景',
      title: '从体检中心到工厂车间。',
      titleAccent: '工厂车间',
      lead: '企业使用 PenguinHarness 自动开发 Agent，并部署到生产环境。',
      cases: [
        {
          sector: '医疗健康',
          title: '体检报告质控',
          body: '一家体检机构使用 PenguinHarness 自动开发了报告质控 Agent，部署到院内生产环境并接入本地 Qwen3 14B，数据不出机房。结论与医学专家基本一致，审核产能提升数倍。',
          stats: [
            { value: '30 份/分钟', label: 'Agent 自动核查报告' },
            { value: '30 分钟', label: '过去人工复核一轮的耗时' },
          ],
        },
        {
          sector: '制造',
          title: '产线设备巡检',
          body: '一家制造企业使用 PenguinHarness 自动开发了产线巡检 Agent，部署到多条流水线的生产环境。Agent 全天候监测设备状态，发现异常后优先尝试自动恢复。',
          stats: [
            { value: '−65%', label: '上线后的停机时间' },
            { value: '约 2×', label: '产出提升' },
          ],
        },
      ],
    },
    install: {
      eyebrow: '快速开始',
      title: '一行命令，即刻运行。',
      titleAccent: '即刻运行',
      lead: '优先使用桌面端，也可以在本地电脑或服务器上安装命令行。两种方式共用 ~/.penguin/data 目录，可自由混用。',
      requirementsLabel: '系统需求',
      requirements: [
        { label: '操作系统', value: 'Linux、macOS、Windows 10+' },
        { label: '架构', value: 'x64、arm64' },
        { label: '运行时', value: '一行安装器自带' },
        { label: '模型', value: '至少一个模型的 API key' },
      ],
      downloadCta: '下载桌面端',
      dockerCta: 'Docker 快速开始',
      terminalLabel: '安装 PenguinHarness',
      tabs: ['macOS / Linux', 'Windows', 'npm', 'Docker', '面向 Agent'],
      comments: {
        start: '启动服务并打开 http://127.0.0.1:7364',
        firstLogin: '打印首次登录链接',
        oneShot: '单次任务',
        repl: '交互式对话',
        headless: '无界面服务，与 Web 应用同一套 API',
      },
    },
    cta: {
      title: '让复杂的 AI 开发越来越简单。',
      titleAccent: '越来越简单',
      body: '通过不断进化，PenguinHarness 为你提供更高效、更可靠、更低幻觉、更低成本的 Agent 生产力引擎。',
      primary: { label: '下载桌面端', href: 'https://penguin.ooo/download' },
      secondary: { label: '预约演示', href: '/contact' },
    },
  },
} satisfies Record<Locale, PenguinHarnessCopy>
