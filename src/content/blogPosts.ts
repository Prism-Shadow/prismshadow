/*
 * Blog posts. Post content is English-only; the blog UI chrome is localized in
 * src/i18n/messages/blog.ts. Rendered by src/pages/blog (index, article, cards).
 */
import type { IndustryId } from '../i18n/messages/shared'

export type BlogContentLink = {
  label: string
  href: string
}

export type BlogContentTable = {
  headers: string[]
  rows: string[][]
}

export type BlogContentImage = {
  src: string
  alt: string
  /** Intrinsic pixel size, so the browser reserves the space before load. */
  width: number
  height: number
  caption?: string
}

/** Motif drawn in the code-built cover of posts without a genuine image. */
export type BlogVisualPattern =
  | 'access'
  | 'briefing'
  | 'clinical'
  | 'commerce'
  | 'dealer'
  | 'evolution'
  | 'hybrid'
  | 'icp'
  | 'journey'
  | 'network'
  | 'orchestration'
  | 'planning'
  | 'profit'
  | 'questions'
  | 'radar'
  | 'simulation'
  | 'stream'
  | 'taxonomy'

/** Where a post visual is shown: index card, featured card, or article header. */
export type BlogVisualPlacement = 'article' | 'card' | 'featured'

/** Filterable topic: product news, research, or one of the site's industries. */
export type BlogTopic =
  | 'product'
  | 'research'
  | Extract<
      IndustryId,
      | 'supply-chain'
      | 'travel'
      | 'healthcare'
      | 'retail'
      | 'restaurants'
      | 'auto-dealerships'
      | 'b2b-saas'
    >

export type BlogContentBlock =
  | {
      type: 'paragraph'
      text: string
      /** Bold lead-in sentence rendered before `text`. */
      lead?: string
    }
  | {
      /** Sub-heading (h3) inside a section. */
      type: 'heading'
      text: string
    }
  | {
      type: 'quote'
      text: string
    }
  | {
      type: 'code'
      lines: string[]
    }
  | ({
      type: 'image'
    } & BlogContentImage)

export type BlogContentSection = {
  heading?: string
  /** 3 renders the heading as a sub-section (h3) of the previous section. */
  level?: 2 | 3
  /** Closing material (source list, disclaimer) set in a quieter style. */
  kind?: 'sources' | 'note'
  body?: string[]
  blocks?: BlogContentBlock[]
  bullets?: string[]
  table?: BlogContentTable
  links?: BlogContentLink[]
}

export type BlogPost = {
  /** Original editorial category (free text). */
  category: string
  topic: BlogTopic
  title: string
  seoTitle?: string
  date: string
  excerpt: string
  metaDescription?: string
  slug: string
  visualLabel: string
  visualImage?: BlogContentImage
  visualImageLayout?: 'wide'
  visualPattern?: BlogVisualPattern
  visualSteps?: string[]
  readingTime?: string
  author?: string
  tags?: string[]
  content: BlogContentSection[]
}

/**
 * The Chinese text of a post (src/content/blog-zh/). Same shape as the English:
 * every optional field the English has is present, every array has the same
 * length, and `content` mirrors the English section by section and block by
 * block, with the same image sources, link targets and code. Only the words
 * change. Enforced by blogZh.test.ts.
 */
export type BlogPostZh = {
  category: string
  title: string
  seoTitle?: string
  excerpt: string
  metaDescription?: string
  visualLabel: string
  visualSteps?: string[]
  /** Text of the cover image, when the post has one. */
  visualImage?: { alt: string; caption?: string }
  tags?: string[]
  content: BlogContentSection[]
}

export const blogPosts: BlogPost[] = [
  {
    category: 'Research',
    topic: 'research',
    title: 'Awesome RSI: a map of recursive self-improvement, and where new ideas come from',
    seoTitle: 'Awesome RSI and Our Survey of Recursive Self-Improvement',
    date: '2026-11-12',
    excerpt:
      'We read and organized 140 recent works on recursive self-improvement. The result is awesome-rsi, an open index of the field, and a survey that looks at it two ways: as one shared design space, and through the deep-learning ideas RSI methods correspond to.',
    metaDescription:
      'awesome-rsi is an open index of recursive self-improvement (RSI) methods, benchmarks and systems. Our survey of 140 works maps RSI onto a nine-dimension design space and onto the history of deep learning.',
    slug: '/blog/awesome-rsi-survey-recursive-self-improvement',
    visualLabel: 'Awesome RSI',
    visualPattern: 'taxonomy',
    visualSteps: [
      'Perform tasks',
      'Collect trajectories',
      'Learn from feedback',
      'Update its own state',
      'Reuse the new state',
    ],
    author: 'PrismShadow',
    tags: ['Recursive Self-Improvement', 'awesome-rsi', 'Survey', 'Agent Self-Evolution', 'Research'],
    content: [
      {
        body: [
          'LlamaFactory, our open-source framework for fine-tuning language models, has passed 70,000 GitHub stars. We are now building its counterpart for recursive self-improvement (RSI): one unified, efficient, stable and flexible framework for agent self-evolution. Before building it, we wanted to understand the field properly.',
          'So we read and organized 140 recent works on RSI. Two things came out of it: awesome-rsi, an open index of RSI research that anyone can browse and filter, and a survey paper, From Existing Methods to New Research Ideas: Two Perspectives on Recursive Self-Improvement.',
        ],
      },
      {
        blocks: [
          {
            type: 'image',
            src: '/blog-assets/paper-rsi-survey-first-page.webp',
            alt: 'The first page of the survey: its title, the authors from PrismShadow, Peking University, Zhejiang University and New York University, and the abstract.',
            width: 1380,
            height: 1120,
            caption: 'The first page of the survey, arXiv:2610.14625.',
          },
        ],
        links: [{ label: 'Read the survey on arXiv', href: 'https://arxiv.org/abs/2610.14625' }],
      },
      {
        heading: 'What counts as RSI',
        body: [
          'We follow one loop: an agent performs tasks, learns from its trajectories and feedback, updates its own state, and uses that updated state in later work. The state can be the model’s parameters, the harness code, the context, memory or skills.',
          'The collection covers both explicit self-modification and experience-driven improvement during long-running tasks. Methods and systems are grouped by what the agent improves: model parameters on the parametric side; harness code, context, memory, skills and other artifacts on the non-parametric side.',
        ],
      },
      {
        heading: 'An open index of the field',
        body: [
          'awesome-rsi collects benchmarks, methods and systems for RSI, and it keeps growing as new work appears. Its website, in English and Chinese, is built for finding the paper you need:',
        ],
        bullets: [
          'Methods and systems you can filter by artifact, topology, feedback and more, combining tags across dimensions: for example, methods that update Skills, run online and learn from environment feedback.',
          'Benchmarks you can compare by artifact and by protocol: online, offline or hybrid.',
          'Citation graphs for methods and for benchmarks: search for a paper, then drag and zoom through its neighborhood.',
          'Understanding RSI, an illustrated guide to the field.',
        ],
        links: [
          { label: 'Explore the awesome-rsi website', href: 'https://prism-shadow.github.io/awesome-rsi/' },
          { label: 'Understanding RSI', href: 'https://prism-shadow.github.io/awesome-rsi/blog/understanding-rsi/' },
          { label: 'awesome-rsi on GitHub', href: 'https://github.com/Prism-Shadow/awesome-rsi' },
        ],
      },
      {
        heading: 'Perspective one: a shared design space',
        body: [
          'The survey first introduces a unified taxonomy of nine design dimensions, organized into four groups: update targets, update organization, update schedule and scope, and feedback and selection.',
          'The taxonomy places existing methods in one shared design space. Looking at a single dimension, or at how two dimensions interact, shows which combinations have been tried and which have not, and that is where new research ideas start.',
        ],
      },
      {
        heading: 'Perspective two: deep learning has been here before',
        body: [
          'The second perspective lines RSI up against traditional deep learning, and many concepts correspond one to one. Existing RSI methods already draw on optimization, regularization, data augmentation, continual learning and adversarial learning; the difference is that what learns is now an agent.',
          'The survey then develops further ideas from more specific learning mechanisms, and from evolutionary computation. When deep learning has already met a problem that RSI faces now, its answer is a good place to start.',
        ],
      },
      {
        heading: 'How self-improvement is measured',
        body: [
          'Finally, the survey reviews how existing benchmarks assess self-improvement in three settings. Online, experience accumulates during the task stream and later work can use it. Offline, evolution happens first and a separate held-out evaluation follows. Offline-to-online, an artifact built offline keeps evolving in use.',
          'Measuring self-improvement fairly on real business work is the problem our own benchmark, GDPevo, takes on.',
        ],
      },
      {
        heading: 'Read it, use it, add to it',
        body: [
          'The survey maps the methods, GDPevo measures them, and PenguinHarness runs them as plugins. If you work on self-evolving agents, we would like to hear from you, whether it is a paper we missed or a new idea the design space suggests.',
        ],
        links: [
          { label: 'Read the survey on arXiv', href: 'https://arxiv.org/abs/2610.14625' },
          { label: 'awesome-rsi on GitHub', href: 'https://github.com/Prism-Shadow/awesome-rsi' },
          { label: 'GDPevo: measuring agent self-evolution', href: '/blog/gdpevo-benchmark-agent-self-evolution' },
          { label: 'PenguinHarness: every RSI algorithm in one framework', href: '/blog/introducing-penguinharness' },
        ],
      },
    ],
  },
  {
    category: 'Research',
    topic: 'research',
    title: 'GDPevo: measuring agent self-evolution on real business tasks',
    seoTitle: 'GDPevo: A Benchmark for Agent Self-Evolution on Real Business Tasks',
    date: '2026-11-12',
    excerpt:
      'Can an agent learn a business’s rules from a few examples and apply them to cases it has never seen? GDPevo measures exactly that: 240 enterprise tasks with held-out tests, rule-based grading, and cost recorded next to accuracy.',
    metaDescription:
      'GDPevo is an open benchmark for agent self-evolution on GDP-related enterprise work: 240 tasks in six domains, rule hybridization for attributable gains, rule-based grading, and results for leading agents.',
    slug: '/blog/gdpevo-benchmark-agent-self-evolution',
    visualLabel: 'GDPevo',
    visualPattern: 'hybrid',
    visualSteps: [
      'Seed scenario',
      'Atomic rules',
      '5 training tasks',
      '5 held-out tests',
      'Rule-based grading',
      'Accuracy and cost',
    ],
    author: 'PrismShadow',
    tags: ['GDPevo', 'Benchmark', 'Agent Self-Evolution', 'Recursive Self-Improvement', 'Enterprise AI'],
    content: [
      {
        body: [
          'Agent self-evolution means an agent updates its persistent state from prior experience and reuses it to solve related tasks better: an agent that gets better at your work the longer it does it. To build better self-evolution methods, we first have to measure it, and that turns out to be hard.',
          'Existing benchmarks cover few economically valuable domains. They rarely design training and test tasks so that a gain on the test can be attributed to what the agent learned in training, and they are exposed to data contamination. GDPevo is our answer: an evolution-native benchmark grounded in GDP-related enterprise workflows, together with the fully automated pipeline that generates it.',
        ],
      },
      {
        blocks: [
          {
            type: 'image',
            src: '/blog-assets/paper-gdpevo-first-page.webp',
            alt: 'The first page of the GDPevo paper: its title, the authors from PrismShadow and New York University, the abstract and the start of the introduction.',
            width: 1275,
            height: 1650,
            caption: 'The first page of the GDPevo paper, arXiv:2608.03764.',
          },
        ],
        links: [{ label: 'Read the GDPevo paper on arXiv', href: 'https://arxiv.org/abs/2608.03764' }],
      },
      {
        heading: 'Rule hybridization: gains you can attribute',
        body: [
          'The core mechanism borrows from crossover in genetic algorithms. Each enterprise workflow is broken into atomic business rules. Subsets of those rules are scattered across five training tasks, so each training task shows only part of them. The five held-out test tasks then recombine the rules in new ways.',
          'In a CRM group, for example, the training tasks hide a priority order for sponsor status and a blacklist policy, and a test task triggers both at once. In an ERP group, they hide vendor risk-control rules and the response each one calls for. An agent that only memorizes training answers gains nothing on the test set; an agent that learns the rules does. That is what makes the gain attributable to self-evolution.',
        ],
      },
      {
        heading: 'Built end to end by agents',
        body: [
          'People design the workflow once, and agents run it. That keeps the benchmark ahead of contamination, because it can produce new tasks faster than models can memorize leaked answers, and it lets the suite grow without more human labor.',
        ],
        bullets: [
          'Seed scenarios come from public real-business benchmarks: GDPval, SOP-Bench and JobBench.',
          'Agents turn each scenario into a task group: one shared business environment, five training tasks and five test tasks, each with a rule-based grading script.',
          'A calibration agent keeps only the groups where an agent’s score after evolution clearly exceeds its score before.',
          'Six independent reviewer agents audit every group, checking that the files are complete and the hidden rules are really planted. A group is adopted only with at least five passing votes.',
        ],
      },
      {
        body: [
          'The first release had 120 tasks in 12 groups. Because the pipeline is fully automated, it grew the suite to 240 tasks in 24 groups within two days.',
        ],
      },
      {
        heading: 'Six domains, 240 tasks',
        body: [
          'GDPevo spans six domains of everyday enterprise work: CRM, ERP and finance, plus legal (reviewing contracts when one company acquires another), healthcare (getting a patient’s records ready before a hospital transfer) and data processing (cleaning up a messy dataset before it can be analyzed). Every group has one shared environment, five training tasks and five held-out test tasks.',
        ],
      },
      {
        heading: 'Reproducible scores, and cost next to accuracy',
        body: [
          'GDPevo grades with deterministic rules, not an LLM judge. Every score is made of several scoring points, so the same answer always earns the same score, and every failure shows exactly which rule was missed. That turns the benchmark into a diagnostic tool: read the agent’s trace back from a lost point, and you know what to improve next.',
          'Accuracy is not the only thing that matters. A good self-evolution strategy should also make the agent cheaper to run, the way a person gets faster as well as better with practice. Every run records tokens, cost and turn count next to accuracy.',
        ],
      },
      {
        heading: 'Four ways to evolve',
        body: ['Each agent, a model running in a harness, is evaluated in four modes:'],
        bullets: [
          'base: run the test tasks directly, with no evolution step.',
          'self: evolve its own working strategy from the training inputs and the environment, without the training answers.',
          'fewshot: learn from the training inputs plus gold answers as demonstrations.',
          'reflect-3: iterate with feedback from a training-only judge, then consolidate the evolved workflow.',
        ],
      },
      {
        heading: 'What we found',
        body: [
          'The paper evaluates four agents in these four modes on all 24 task groups, with three runs per experiment. Held-out test accuracy, as the mean of three runs:',
        ],
        table: {
          headers: ['Harness', 'Model', 'base', 'self', 'fewshot', 'reflect-3'],
          rows: [
            ['Codex', 'GPT-5.5 (xhigh)', '49.37%', '55.80%', '64.51%', '57.82%'],
            ['Claude Code', 'Opus 4.8 (xhigh)', '50.63%', '55.05%', '67.07%', '59.27%'],
            ['Claude Code', 'GLM-5.2 (max)', '46.12%', '50.96%', '60.09%', '55.49%'],
            ['Claude Code', 'DeepSeek V4 Pro Preview (max)', '43.58%', '46.17%', '48.79%', '47.15%'],
          ],
        },
      },
      {
        body: [
          'Self-evolution improves held-out accuracy for every agent, by up to 16.44 percentage points (Claude Code with Opus 4.8, in fewshot mode). Yet the best evolved agents remain far below the fully informed ceiling of 91.6%. Today’s agents can learn from experience, but their ability to self-evolve is still far from fully realized, and that gap is the opportunity.',
          'The project leaderboard keeps growing. It now tracks six agents, with per-group breakdowns, skill-transfer heatmaps and radar views.',
        ],
      },
      {
        heading: 'Run it on your agent',
        body: [
          'The pipeline, the benchmark and the full evaluation results are open. Bring your own agent, or your own business scenario. GDPevo Essential’s six scenarios also ship as built-in Train and Test Benchmarks in PenguinHarness, so you can evolve an agent against them with any RSI algorithm.',
        ],
        links: [
          { label: 'Read the GDPevo paper on arXiv', href: 'https://arxiv.org/abs/2608.03764' },
          { label: 'GDPevo on GitHub', href: 'https://github.com/Prism-Shadow/GDPevo' },
          { label: 'Leaderboard and project site', href: 'https://prism-shadow.github.io/GDPevo/' },
          { label: 'PenguinHarness: every RSI algorithm in one framework', href: '/blog/introducing-penguinharness' },
        ],
      },
    ],
  },
  {
    category: 'Research',
    topic: 'research',
    title: 'PenguinHarness: every RSI algorithm in one open framework',
    seoTitle: 'PenguinHarness: An Open-Source Framework for Agent Self-Evolution',
    date: '2026-11-12',
    excerpt:
      'PenguinHarness brings every RSI algorithm and Benchmark into one open-source framework, as plugins, on any model. Agents build agents from one sentence, then evolve them round by round, at a fraction of the usual cost.',
    metaDescription:
      'PenguinHarness is the open-source framework for agent self-evolution from the team behind LlamaFactory: nine RSI algorithms and seventeen Benchmarks as plugins, 1000+ models, a desktop app, and the best data-analysis accuracy at 1/70 of Claude Code’s cost.',
    slug: '/blog/introducing-penguinharness',
    visualLabel: 'PenguinHarness',
    visualPattern: 'evolution',
    visualSteps: [
      'Pick an algorithm',
      'Pick a Benchmark',
      'Evaluators score it',
      'Find lost points',
      'Snapshot',
      'Version N+1',
    ],
    author: 'PrismShadow',
    tags: ['PenguinHarness', 'Recursive Self-Improvement', 'Agent Self-Evolution', 'Open Source', 'Agent Harness'],
    content: [
      {
        blocks: [
          {
            type: 'paragraph',
            text: 'LlamaFactory put the data, models, algorithms and evaluation of fine-tuning into one open-source framework, and it has passed 70,000 GitHub stars. PenguinHarness does the same for recursive self-improvement (RSI). It is an open-source (Apache 2.0) multi-agent framework for agent self-evolution, and it has passed 3,000 GitHub stars. The idea behind it fits in one line:',
          },
          {
            type: 'quote',
            text: 'With LangChain, you build agents by hand — at 1× speed. With PenguinHarness, agents build agents — at 100×.',
          },
          {
            type: 'paragraph',
            text: 'The model stays fixed; the harness evolves: prompts, Skills, tools and hooks. PenguinHarness runs on your own computer or server as a desktop app, a Web App, a CLI and an SDK, connected to 1000+ models.',
          },
        ],
      },
      {
        heading: 'Why we built it',
        body: [
          'Before PenguinHarness, our team built the GDPevo benchmark, and with it we verified one thing systematically: agents can self-evolve. An agent can score its own performance, find where it lost points, rewrite its own prompts and Skills, and score higher with each version.',
          'Self-evolution should not stay a curve in a paper. It should be infrastructure that works out of the box for every developer and every enterprise, and researchers need one place to run and compare RSI methods instead of re-implementing each one. PenguinHarness is built to be both.',
        ],
        links: [{ label: 'GDPevo: measuring agent self-evolution', href: '/blog/gdpevo-benchmark-agent-self-evolution' }],
      },
      {
        heading: 'Every algorithm is a plugin',
        body: [
          'PenguinHarness follows one rule: everything is a plugin. Every RSI algorithm and every Benchmark is a plugin, decoupled from the rest, so you can pick any algorithm and use it to evolve any agent on any model. Nine algorithms ship today, all on the same Benchmarks, scoreboard and snapshots:',
        ],
        table: {
          headers: ['Toolkit', 'Algorithm'],
          rows: [
            ['default-rsi-toolkit', 'Trial, reflect, improve: one hypothesis and one change per round'],
            ['opro-rsi-toolkit', 'OPRO: new instructions from the history of scored ones'],
            ['ape-rsi-toolkit', 'APE: candidate instructions induced from examples'],
            ['ace-rsi-toolkit', 'ACE: lessons from Traces curated into a playbook'],
            ['awm-rsi-toolkit', 'AWM: workflows induced from successful runs'],
            ['skilladam-rsi-toolkit', 'SkillAdam: an evolving issue tracker and an adaptive Skill edit budget'],
            ['skillopt-rsi-toolkit', 'SkillOpt: bounded Skill edits, score-based selection and cross-epoch reflection'],
            ['openskill-rsi-toolkit', 'OpenSkill: external research and independent virtual tests before frozen-State evaluation'],
            ['trace-rsi-toolkit', 'TRACE: skill-bank evolution from contrasting trajectories, with consistency measurement'],
          ],
        },
      },
      {
        body: [
          'Every new Project includes seventeen Benchmarks, run as Harbor tasks in Docker: PenguinHarness Benchmark Sec A to Sec E, built from rag-bench-essential, DeepSWE, AutomationBench, Terminal-Bench-Science and Terminal-Bench, plus a Train and Test pair for each of GDPevo Essential’s six scenarios. Our goal is to grow the algorithms and Benchmarks past 100.',
        ],
      },
      {
        heading: 'Self-evolution, round by round',
        body: [
          'Pick an algorithm and a Benchmark, and one agent improves another, round by round. Every candidate is a new version, snapshotted before it changes, and every score lands in the Evaluation Center. In each round:',
        ],
        bullets: [
          'The Optimizer runs several Evaluators in parallel to score the agent.',
          'It uses the scores and the run Traces to find where points were lost.',
          'It upgrades the agent from version N to N+1.',
        ],
      },
      {
        body: [
          'In one demo, a decision agent is evaluated, revises its working method once and is retested on the same model. Its score goes from 84 to 100, with the cost of every run on screen, and every request can be replayed on the Trajectory page.',
        ],
      },
      {
        heading: 'Better on complex tasks, at lower cost',
        blocks: [
          {
            type: 'paragraph',
            text: 'PenguinHarness uses a deliberately minimal toolset over clean low-level interfaces, so it makes fewer tool calls and spends fewer Tokens. It is tuned in depth for open models such as DeepSeek.',
          },
          {
            type: 'paragraph',
            text: 'We compared it head to head with Claude Code and OpenAI Codex on two suites, first published with PenguinHarness 0.1.0. Each harness runs the model it is normally paired with, so the comparison shows the products as people actually use them.',
          },
          {
            type: 'image',
            src: '/blog-assets/penguinharness-benchmark.svg',
            alt: 'Benchmark results: PenguinHarness leads the data-analysis suite and ties OpenAI Codex on coding, at a small fraction of either rival’s cost.',
            width: 920,
            height: 368,
            caption:
              'Accuracy and total cost on both suites. PenguinHarness runs on DeepSeek V4 Pro, Claude Code on Claude Opus 4.8 and OpenAI Codex on GPT-5.5.',
          },
        ],
      },
      {
        heading: 'Complex data analysis',
        level: 3,
        body: ['15 tasks, one run each. PenguinHarness and OpenAI Codex ran at thinking level xhigh, Claude Code at max.'],
        table: {
          headers: ['Framework', 'Model', 'Accuracy (%)', 'Tokens (M)', 'Cost ($)'],
          rows: [
            ['PenguinHarness', 'DeepSeek V4 Pro', '66.67', '18.04', '0.55'],
            ['Claude Code', 'Claude Opus 4.8', '53.33', '22.20', '38.48'],
            ['OpenAI Codex', 'GPT-5.5', '53.33', '13.72', '19.41'],
          ],
        },
      },
      {
        heading: 'Coding',
        level: 3,
        body: ['40 tasks × 2 runs; accuracy is over all 80 outcomes.'],
        table: {
          headers: ['Framework', 'Model', 'Accuracy (%)', 'Tokens (M)', 'Cost ($)'],
          rows: [
            ['PenguinHarness', 'DeepSeek V4 Pro', '71.25', '200.00', '3.81'],
            ['Claude Code', 'Claude Opus 4.8', '86.25', '151.61', '146.97'],
            ['OpenAI Codex', 'GPT-5.5', '71.25', '251.20', '220.08'],
          ],
        },
      },
      {
        level: 3,
        body: [
          'Tokens and cost are totals for the whole suite, not per-run means. On data analysis, PenguinHarness has the highest accuracy of the three, 66.67% against 53.33% for both others, while spending 1/35 of what Codex spent and 1/70 of what Claude Code spent. On coding, it ties Codex at 71.25% and trails Claude Code’s 86.25%, but the whole suite cost $3.81, against $220.08 for Codex and $146.97 for Claude Code. The work is comparable, and the bills are one to two orders of magnitude apart.',
        ],
      },
      {
        heading: 'Build an agent app from one sentence',
        blocks: [
          {
            type: 'paragraph',
            text: 'Type one sentence, and an agent builds the complete agent application for you, end to end: scaffold, code and run instructions. For example:',
          },
          {
            type: 'code',
            lines: [
              'Collect the docs from https://github.com/ericbuess/claude-code-docs',
              'and build a RAG app that answers Claude Code questions as a',
              'configuration expert, citing its sources.',
            ],
          },
          {
            type: 'paragraph',
            text: 'The finished product is a docs expert with retrieval, cited sources that link to the original files, and built-in example questions:',
          },
          {
            type: 'image',
            src: '/blog-assets/penguinharness-rag-app.webp',
            alt: 'The generated RAG app: a Claude Code docs expert answering a question about MCP servers with cited, clickable sources and example questions.',
            width: 1920,
            height: 1140,
            caption: 'The RAG app PenguinHarness generated from that one sentence.',
          },
          {
            type: 'paragraph',
            text: 'Generating the entire RAG app used $0.02 (¥0.2) of Tokens on DeepSeek V4 Pro.',
          },
        ],
      },
      {
        heading: 'Evolution within bounds, security first',
        body: [
          'The biggest worry about self-evolution is losing control. PenguinHarness answers it with a contract, CONTRACT.md:',
        ],
        bullets: [
          'Evolution is strictly confined to the Workspace and Skills. The harness core, which is the security boundary, is never modified.',
          'Tool calls require approval first, and every approval leaves an audit record.',
          'A version snapshot is taken before any risky change, so any round of evolution can be rolled back.',
          'PenguinHarness is fully open source and deployed locally, so your data stays on your machine, apart from the requests sent to the model provider you configure. This meets enterprise data-security requirements.',
        ],
      },
      {
        heading: 'Get started',
        blocks: [
          {
            type: 'paragraph',
            text: 'Download the desktop app for macOS, Windows or Linux from the website. It opens signed in and needs no terminal. Or install the CLI and start the Web App:',
          },
          {
            type: 'code',
            lines: ['curl -fsSL https://penguin.ooo/install.sh | sh', 'penguin web        # opens http://127.0.0.1:7364'],
          },
          {
            type: 'paragraph',
            text: 'On Windows, install from PowerShell instead:',
          },
          {
            type: 'code',
            lines: ['irm https://penguin.ooo/install.ps1 | iex'],
          },
          {
            type: 'paragraph',
            text: 'Open the Models page, add an API key for a provider and set one of its models as the default. Then give the agent its first task, or open a Benchmark and start evolving.',
          },
        ],
        links: [{ label: 'Download the desktop app', href: 'https://penguin.ooo/download' }],
      },
      {
        heading: 'Join the community',
        body: [
          'A self-improving harness needs a community that improves with it. Come discuss, request features and contribute; opening your first issue is a good way to start.',
        ],
        links: [
          { label: 'Discord: chat with us and other developers', href: 'https://discord.gg/eFHKqqcU3D' },
          { label: 'X (Twitter): the latest updates', href: 'https://x.com/code_hiyouga' },
          {
            label: 'WeChat group: the Chinese community',
            href: 'https://github.com/Prism-Shadow/penguin-harness-community/blob/main/assets/wechat/penguin.jpg',
          },
          { label: 'GitHub: stars, issues and pull requests', href: 'https://github.com/Prism-Shadow/penguin-harness' },
        ],
      },
      {
        heading: 'Links',
        kind: 'sources',
        links: [
          { label: 'PenguinHarness website', href: 'https://penguin.ooo/' },
          { label: 'PenguinHarness on GitHub', href: 'https://github.com/Prism-Shadow/penguin-harness' },
          { label: 'Documentation', href: 'https://penguin.ooo/docs/' },
          { label: 'The 0.1.0 launch post on penguin.ooo', href: 'https://penguin.ooo/blog/introducing-penguinharness' },
          { label: 'penguin-harness-benchmark', href: 'https://github.com/Prism-Shadow/penguin-harness-benchmark' },
        ],
      },
    ],
  },
  {
    category: 'Agent Infrastructure',
    topic: 'research',
    title: 'AMSP and MMSP: one message protocol, from a model call to an agent Session',
    seoTitle: 'AMSP and MMSP: Message Stream Protocols for Models and Agents',
    date: '2026-11-12',
    excerpt:
      'Every model API streams its own way, and every agent harness records Sessions its own way. MMSP gives every model call one shape. AMSP, built on it, gives every agent Session one minimal protocol: observe it, resume it and stream it to any frontend.',
    metaDescription:
      'MMSP, the Model Message Stream Protocol, gives every model provider one message format and one streaming grammar. AMSP, the Agent Message Stream Protocol, builds on it to stream, store and resume agent Sessions in PenguinHarness.',
    slug: '/blog/amsp-mmsp-message-stream-protocols',
    visualLabel: 'AMSP · MMSP',
    visualPattern: 'stream',
    visualSteps: ['UniConfig', 'UniMessage', 'UniEvent', 'task_begin', 'request_begin', 'task_end'],
    author: 'PrismShadow',
    tags: ['AMSP', 'MMSP', 'Agent Infrastructure', 'Protocol', 'PenguinHarness'],
    content: [
      {
        body: [
          'Two protocols sit underneath PenguinHarness. MMSP, the Model Message Stream Protocol, gives every model call one shape, whichever provider serves it. AMSP, the Agent Message Stream Protocol, builds on MMSP to give a whole agent Session one minimal format: watch it while it runs, resume it after a dropped connection, connect frontend and backend, and reach many models through one interface. Both are open source.',
        ],
      },
      {
        heading: 'Stop paying a tax on differences',
        body: [
          'Neither model APIs nor agent Session records share a format. Anthropic streams content blocks, OpenAI streams output items, Gemini streams steps, and every harness writes its own transcript. Change the model or the harness and you adapt your code again, paying a tax on the differences every time.',
          'The cost goes beyond engineering time. It also gets in the way of self-evolution: when an agent mines past trajectories to improve itself, it wants one clean, uniform format, so that one piece of code reads every Trajectory and the format adds nothing to what the agent has to keep in mind.',
        ],
      },
      {
        heading: 'MMSP: one shape for every model call',
        body: [
          'Model APIs agree on the building blocks: messages, thinking, tool calls, streaming. They disagree on the encoding: Chat Completions, for one, streams chunks that name nothing. MMSP reads each provider on its own terms and hands your code one shape, from a Python package and a TypeScript package that behave the same way. Everything you send and receive is one of three plain objects:',
        ],
        bullets: [
          'UniConfig: the options of a request, such as tools, thinking level and system prompt.',
          'UniMessage: one message of the conversation, from the user or the assistant, holding complete content items.',
          'UniEvent: one event of a streamed response. A stream is delta events closed by exactly one stop event, which carries the token usage and the finish reason.',
        ],
      },
      {
        blocks: [
          {
            type: 'paragraph',
            text: 'Whatever a provider sends that your code does not need but the provider wants back, such as a thinking signature, travels with the item as fidelity. The stateful call keeps the history in the client, so the thinking and tool calls of earlier turns go back to the model exactly as they arrived, which is what an agent loop needs:',
          },
          {
            type: 'code',
            lines: [
              'import { AutoLLMClient } from "@prismshadow/mmsp";',
              '',
              'const client = new AutoLLMClient({ model: "claude-opus-5-5" });',
              '',
              'for await (const event of client.streamingResponseStateful({',
              '  message: {',
              '    role: "user",',
              '    content_items: [{ type: "text.done", text: "What\'s the weather in Paris?" }],',
              '  },',
              '  config: { tools: [getWeather] },',
              '})) {',
              '  console.log(event);',
              '}',
            ],
          },
          {
            type: 'paragraph',
            text: 'Change the model id and the same code prints the same shapes.',
          },
        ],
        links: [
          { label: 'MMSP documentation', href: 'https://mmsp.penguin.ooo/' },
          { label: 'MMSP quickstart', href: 'https://mmsp.penguin.ooo/docs/quickstart/' },
          { label: 'MMSP on GitHub', href: 'https://github.com/Prism-Shadow/model-message-stream-protocol' },
        ],
      },
      {
        heading: 'AMSP: one protocol for the whole Session',
        body: [
          'MMSP covers one model call; AMSP covers an agent’s whole Session, with its many model calls, the tools they run, approvals, compaction and subagents. We refined it again and again while building a harness from scratch. It scales to hundreds of models, and every Session in PenguinHarness runs on it today.',
        ],
      },
      {
        heading: 'How a Session streams',
        body: [
          'A run nests three spans, longest first: the Task, which is one prompt’s run; each Request to the model; and the messages that fill each Request. task_begin and task_end bracket a Task, and request_begin and request_end bracket each Request.',
        ],
        bullets: [
          'The stream is the Trace, plus fragments. Every record is one line of the Session’s Trace, byte for byte; nothing is translated on the way.',
          'A message streams as partial_* fragments (start, delta, stop), then its complete record follows and replaces them. Only the fragments are live-only.',
          'There are three kinds of record: session_meta opens a model context; model_msg carries text, thinking, tool calls and their outputs; event_msg marks Tasks, Requests, token usage, approvals, hooks, compaction and aborts.',
          'A client ignores a record type or a field it does not know, so the protocol can grow without breaking readers.',
        ],
      },
      {
        heading: 'Observe, resume, connect',
        body: [
          'Records travel as server-sent events, each with an id. To resume after a dropped connection, a client sends the last id it saw as Last-Event-ID, and the server replays what came after. A ping arrives every 20 seconds and data: [DONE] closes a run, so a reader always knows whether a run reached its end.',
          'Tool calls that wait for approval are a resource the caller lists and answers over HTTP, and every call the engine runs gets an approval_decision record. Because AMSP records are exactly the lines of the Session’s Trace, whatever an agent did can be watched live, read back from the history later and mined for self-evolution with one parser.',
        ],
      },
      {
        heading: 'Try it',
        blocks: [
          {
            type: 'paragraph',
            text: 'In PenguinHarness, open an agent’s API tab, switch on API access and create a key. Then install the SDK, which has no dependencies and runs on Node 24 and in browsers:',
          },
          {
            type: 'code',
            lines: ['npm install @prismshadow/amsp'],
          },
          {
            type: 'paragraph',
            text: 'Stream a run, then continue the same Session with the same context:',
          },
          {
            type: 'code',
            lines: [
              'import { AgentClient } from "@prismshadow/amsp";',
              '',
              'const client = new AgentClient({',
              '  baseUrl: "http://localhost:7364/api/amsp/v1",',
              '  agent: "demo/coder",',
              '  apiKey: process.env.PENGUIN_AGENT_KEY,',
              '});',
              '',
              'const run = client.stream({ input: "What time is it now?" });',
              'for await (const record of run) {',
              '  if (record.type === "model_msg" && record.payload.type === "partial_text") {',
              '    process.stdout.write(record.payload.text);',
              '  }',
              '}',
              'const { sessionId } = await run.result();',
              '',
              '// Same Session, same context',
              'await client.run({ sessionId, input: "Now say it in French." });',
            ],
          },
        ],
      },
      {
        heading: 'Bring AMSP to more harnesses',
        body: [
          'AMSP runs stably inside PenguinHarness today, and we want it to be useful well beyond one harness. If you build agents or agent tooling, come and explore with us how to bring AMSP to more harnesses. The protocol, the SDK and the source are open under the Apache-2.0 license.',
        ],
        links: [
          { label: 'AMSP overview', href: 'https://penguin.ooo/amsp' },
          { label: 'AMSP reference', href: 'https://penguin.ooo/docs/amsp/' },
          { label: 'Agent API guide', href: 'https://penguin.ooo/docs/agent-api/' },
          { label: '@prismshadow/amsp on npm', href: 'https://www.npmjs.com/package/@prismshadow/amsp' },
          {
            label: 'AMSP source on GitHub',
            href: 'https://github.com/Prism-Shadow/penguin-harness/tree/main/packages/amsp',
          },
        ],
      },
    ],
  },
  {
    category: 'Supply Chain',
    topic: 'supply-chain',
    title: 'From Control Towers to Agentic Supply Chain Operations',
    seoTitle: 'Supply Chain AI Agents: From Control Towers to Action',
    date: '2026-06-26',
    excerpt:
      'Supply chain teams do not need another dashboard. They need AI agents that connect disruption signals, operational context, trade-offs, and next actions.',
    metaDescription:
      'Learn how supply chain AI agents can help teams move from visibility dashboards to decision-ready workflows across disruption monitoring, inventory, logistics, and fulfillment.',
    slug: '/blog/agentic-supply-chain-control-towers',
    visualLabel: 'Supply Chain Ops',
    visualPattern: 'network',
    visualSteps: [
      'Disruption signal',
      'Supplier context',
      'Inventory position',
      'Customer impact',
      'Mitigation options',
      'Human approval',
    ],
    author: 'PrismShadow',
    tags: [
      'Supply Chain AI Agents',
      'Control Tower',
      'Disruption Management',
      'Logistics',
      'Operational Intelligence',
    ],
    content: [
      {
        heading: 'Visibility Is Not the Same as Action',
        body: [
          'Supply chain teams have spent years building visibility: control towers, dashboards, alerts, supplier portals, tracking feeds, planning tools, warehouse systems, transportation systems, and spreadsheets. The problem is that visibility does not automatically become action.',
          'A planner may see a supplier delay. A logistics lead may see a port exception. A customer team may see a service-level risk. Finance may see margin exposure. Each view is useful, but the business still has to connect the facts, understand the trade-offs, and decide what to do next.',
          'That is where AI agents matter. The opportunity is not to replace the control tower. It is to turn control tower signals into decision-ready workflows.',
        ],
      },
      {
        heading: 'Why Supply Chain Work Stalls',
        body: [
          'Recent industry research keeps pointing to the same pattern: supply chains are operating in a world of recurring disruption, fragmented data, and rising pressure to respond faster. McKinsey has written about supply chains remaining vulnerable even after years of resilience investments. The World Economic Forum has described volatility as a persistent condition rather than a temporary exception.',
          'Inside the business, that volatility lands as messy operational work. A late shipment is not just a late shipment. It may affect production, inventory coverage, warehouse labor, customer commitments, revenue timing, and supplier performance. A dashboard can show the alert, but it rarely explains the operational pathway from signal to decision.',
          'Teams lose time because the context lives across ERP, WMS, TMS, procurement tools, supplier messages, contracts, SOPs, and email threads.',
        ],
      },
      {
        heading: 'What an Agentic Layer Does',
        body: [
          'A useful supply chain agent starts where the alert appears, then gathers the surrounding context. What orders are affected? Which customers matter most? Is there alternate inventory? Which lanes are constrained? What supplier history is relevant? Which playbooks worked before?',
          'The agent should not make high-impact decisions alone. It should prepare the work: summarize the exception, identify affected orders, compare mitigation options, explain trade-offs, and route the recommended next step to the right owner.',
          'A strong agent also keeps the recommendation grounded in the company’s operating language. It should know whether a premium customer requires protection, whether a SKU is margin-sensitive, whether a supplier has a history of short shipments, and whether a mitigation path needs finance, quality, or regional approval.',
          'That turns supply chain AI from a generic assistant into operational infrastructure. The agent does not just answer, “What happened?” It helps teams understand “What does it affect, what can we do, and who needs to approve it?”',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow is built for this kind of context-heavy workflow. Supply chain teams can train agents around their own suppliers, SKUs, lanes, warehouses, customer tiers, contracts, policies, escalation paths, and operational playbooks.',
          'Permanent memory matters because supply chain exceptions repeat with variation. Every disruption teaches the organization something about supplier reliability, recovery options, inventory buffers, transportation risk, and customer sensitivity. PrismShadow helps that learning compound instead of disappearing into one-off chats.',
          'Over time, the system can preserve which mitigation paths actually worked, which ones created hidden downstream cost, and which approvals slowed response. That turns supply chain knowledge into a reusable operating asset rather than a set of disconnected incident notes.',
          'The goal is not more alerts. It is a governed agent layer that turns fragmented signals into action-ready decisions while keeping humans in control.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'McKinsey - Supply chains remain vulnerable',
            href: 'https://www.mckinsey.com/capabilities/operations/our-insights/supply-chain-risk-survey-2024',
          },
          {
            label: 'World Economic Forum - Supply chain resilience',
            href: 'https://www.weforum.org/stories/2025/01/supply-chain-disruption-digital-winners-losers/',
          },
          {
            label: 'Deloitte - Resilient by design: The agentic supply chain',
            href: 'https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/agentic-supply-chain-artificial-intelligence-manufacturing.html',
          },
        ],
      },
    ],
  },
  {
    category: 'Supply Chain',
    topic: 'supply-chain',
    title: 'Why Supply Chain AI Needs Human-Governed Scenario Simulation',
    seoTitle: 'Supply Chain AI Agents for Human-Governed Scenario Simulation',
    date: '2026-06-26',
    excerpt:
      'Supply chain AI becomes useful when it compares mitigation options, explains trade-offs, and routes high-impact decisions for human review.',
    metaDescription:
      'See how supply chain AI agents can support scenario simulation while preserving human approval, traceability, and business context.',
    slug: '/blog/supply-chain-ai-human-governed-simulation',
    visualLabel: 'Scenario Simulation',
    visualPattern: 'simulation',
    visualSteps: [
      'Exception detected',
      'Impact modeled',
      'Options compared',
      'Trade-offs explained',
      'Risk reviewed',
      'Action approved',
    ],
    author: 'PrismShadow',
    tags: [
      'Supply Chain AI Agents',
      'Scenario Simulation',
      'Human Review',
      'Planning',
      'Risk Management',
    ],
    content: [
      {
        heading: 'Simulation Is Where Supply Chain AI Gets Serious',
        body: [
          'Many supply chain questions are not simple lookups. They are trade-off decisions. Should the team expedite freight or reallocate inventory? Should production be resequenced? Should a customer commitment be protected at higher cost? Should an alternate supplier be used even if quality risk is higher?',
          'These questions are exactly where generic AI can become dangerous if it acts with too much confidence. The business needs simulation, but it also needs governance. A useful agent should compare options, not silently choose the answer.',
          'That is why human-governed scenario simulation is one of the most practical use cases for supply chain AI agents.',
        ],
      },
      {
        heading: 'The Data Is There, but the Decision Is Cross-Functional',
        body: [
          'Industry reports from organizations such as MHI and Deloitte have pointed to artificial intelligence as a major force shaping future supply chains. The reason is clear: supply chain teams are surrounded by operational data, but the decision itself usually cuts across functions.',
          'A mitigation plan may affect procurement, planning, logistics, finance, warehouse capacity, production schedules, and customer service. One team may optimize cost while another protects service level. One option may preserve revenue but increase working capital. Another may lower cost but increase customer risk.',
          'If an agent cannot explain those trade-offs, it is not ready for supply chain work.',
        ],
      },
      {
        heading: 'What a Scenario Agent Should Do',
        body: [
          'A scenario agent should start by clarifying the exception: what changed, where it happened, which orders or customers are affected, and what time window matters. It should then assemble context from planning, inventory, logistics, supplier, customer, and policy sources.',
          'From there, the agent can compare mitigation options. Expedite shipment. Split the order. Use alternate inventory. Adjust replenishment. Switch suppliers. Resequence production. Hold the action for review. Each option should include evidence, assumptions, expected impact, and a reason it may or may not be appropriate.',
          'The best scenario workflow is transparent enough for operators to challenge it. If the agent assumes a warehouse can absorb volume, it should show the capacity signal. If it recommends air freight, it should show the customer or revenue risk that justifies the premium.',
          'The final step should be human approval. Supply chain decisions can affect cost, service, compliance, safety stock, and customer trust. The agent prepares the decision; the business owns it.',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow helps teams train agents around their own operating model: supplier constraints, inventory policies, customer tiers, lane history, approval rules, and recovery playbooks. That context is what makes scenario simulation practical instead of generic.',
          'Permanent memory also gives scenario work a feedback loop. If an expedited shipment solved the issue but hurt margin, that outcome can inform future recommendations. If a supplier repeatedly creates the same exception, the agent can surface that pattern earlier. If a mitigation playbook works well for one customer tier but not another, the system can preserve that learning.',
          'This is also where PrismShadow’s governed workflow model matters. Teams can define which actions stay advisory, which require manager review, and which require formal approval before the agent triggers a workflow. The result is faster preparation without losing accountability.',
          'Good supply chain AI should not be autonomous for the sake of autonomy. It should make human decisions better prepared, faster to review, and easier to improve over time.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'MHI and Deloitte - Annual Industry Report',
            href: 'https://www.mhi.org/annual-industry-reports',
          },
          {
            label: 'Deloitte - Managing supply chain complexity with AI',
            href: 'https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/agentic-supply-chain-artificial-intelligence-manufacturing.html',
          },
          {
            label: 'World Economic Forum - Supply chain resilience',
            href: 'https://www.weforum.org/stories/2025/01/supply-chain-disruption-digital-winners-losers/',
          },
        ],
      },
    ],
  },
  {
    category: 'Supply Chain',
    topic: 'supply-chain',
    title: 'Demand and Inventory Planning Need an Agent Layer',
    seoTitle: 'Supply Chain AI Agents for Demand and Inventory Planning',
    date: '2026-06-26',
    excerpt:
      'Forecasts matter, but supply chain teams also need agents that connect demand signals, inventory coverage, replenishment rules, service risk, and review workflows.',
    metaDescription:
      'Learn how supply chain AI agents can support demand planning, replenishment, inventory rebalancing, and service-level decisions with governed operational context.',
    slug: '/blog/supply-chain-demand-inventory-agent-layer',
    visualLabel: 'Planning Agent',
    visualPattern: 'planning',
    visualSteps: [
      'Demand signal',
      'Inventory coverage',
      'Service-level risk',
      'Replenishment option',
      'Trade-off review',
      'Planner approval',
    ],
    author: 'PrismShadow',
    tags: [
      'Supply Chain AI Agents',
      'Demand Planning',
      'Inventory Management',
      'Replenishment',
      'Planning Operations',
    ],
    content: [
      {
        heading: 'Forecasts Are Only the Starting Point',
        body: [
          'Demand planning teams have no shortage of signals. Sales history, open orders, promotions, forecast overrides, customer commitments, channel shifts, seasonality, and external events all change what the business should produce, buy, move, and protect. The challenge is that better forecasting alone does not close the loop.',
          'A forecast may show rising demand for a SKU. Inventory may be available in the wrong region. A warehouse may already be constrained. A supplier may have a longer lead time than usual. A premium customer may have a service commitment that changes the priority. Planning work becomes difficult because every demand signal turns into a cross-functional decision.',
          'That is why demand and inventory planning need an agent layer, not just another analytics view.',
        ],
      },
      {
        heading: 'Why Planning Decisions Still Stall',
        body: [
          'McKinsey has described how AI can support distribution operations across planning, warehousing, transportation, and talent, including inventory and fill-rate improvements when AI is connected to operational workflows. IBM also frames AI in supply chain around forecasting, inventory, logistics, and decision support rather than isolated prediction.',
          'The practical lesson is simple: AI creates value when it helps teams act. A planner does not only need to know that demand changed. The planner needs to know which orders are exposed, which inventory pools are usable, whether a transfer is possible, whether replenishment rules allow an exception, and which business owner must approve the trade-off.',
          'When that context lives across ERP, WMS, planning tools, spreadsheets, emails, and policy documents, teams lose time translating insight into action.',
        ],
      },
      {
        heading: 'What a Planning Agent Should Do',
        body: [
          'A planning agent should begin by turning a signal into a decision brief. What changed? Which SKUs, regions, customers, or orders are affected? What is the current inventory position? What is the expected service-level risk? What replenishment, transfer, substitution, or allocation options are available?',
          'The agent should also make assumptions visible. If it recommends an inventory transfer, it should show warehouse coverage and transportation impact. If it recommends a replenishment change, it should show lead time, safety stock policy, and demand confidence. If it recommends protecting one customer order over another, it should show the service, revenue, or contract reason.',
          'It should also separate routine recommendations from decisions that need review. A low-risk reorder may only need a planner confirmation. A customer allocation change, regional transfer, or safety-stock override may need manager approval, finance visibility, or a customer-facing communication plan.',
          'That makes the planner faster without making the decision invisible.',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow is useful because planning work depends on company-specific context. Teams can train agents around customer tiers, SKU rules, replenishment logic, warehouse constraints, supplier lead times, approval paths, and service-level definitions.',
          'Permanent memory turns planning into a learning loop. If a transfer solved a shortage but created downstream warehouse pressure, that outcome can inform the next recommendation. If a promotion repeatedly creates regional imbalance, the agent can surface that pattern earlier. If a planner corrects an assumption, the system can preserve that feedback for future workflows.',
          'That memory is valuable because planning quality depends on local operating judgment. Two companies can use the same forecast and still make different decisions because their customer promises, margin profile, fulfillment network, and supplier constraints are different.',
          'The goal is not to automate every replenishment decision. The goal is to make planning decisions better prepared, easier to review, and more consistent across teams.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'McKinsey - Harnessing AI in distribution operations',
            href: 'https://www.mckinsey.com/industries/industrials/our-insights/distribution-blog/harnessing-the-power-of-ai-in-distribution-operations',
          },
          {
            label: 'IBM - AI in supply chain',
            href: 'https://www.ibm.com/think/topics/ai-supply-chain',
          },
          {
            label: 'IBM - AI demand forecasting',
            href: 'https://www.ibm.com/think/topics/ai-demand-forecasting',
          },
        ],
      },
    ],
  },
  {
    category: 'Supply Chain',
    topic: 'supply-chain',
    title: 'Supplier Risk Becomes Useful When It Reaches the Workflow',
    seoTitle: 'Supplier Risk AI Agents for Procurement Workflows',
    date: '2026-06-26',
    excerpt:
      'Supplier risk scores are not enough. Procurement teams need agents that connect risk signals, contracts, open orders, alternate sources, compliance rules, and next actions.',
    metaDescription:
      'See how supply chain AI agents can help procurement teams turn supplier risk, contract context, open purchase orders, and sourcing options into governed workflows.',
    slug: '/blog/supply-chain-supplier-risk-workflow',
    visualLabel: 'Supplier Risk',
    visualPattern: 'radar',
    visualSteps: [
      'Supplier signal',
      'Contract context',
      'Open PO impact',
      'Alternate source',
      'Compliance check',
      'Procurement review',
    ],
    author: 'PrismShadow',
    tags: [
      'Supply Chain AI Agents',
      'Supplier Risk',
      'Procurement Intelligence',
      'Sourcing',
      'Governance',
    ],
    content: [
      {
        heading: 'Supplier Risk Is an Operating Signal',
        body: [
          'Supplier risk often appears first as a score, alert, delayed shipment, quality issue, compliance gap, or geopolitical signal. Those indicators are useful, but procurement teams still have to answer a harder question: what does this risk change today?',
          'A supplier delay may affect open purchase orders, dependent production schedules, customer commitments, inventory coverage, and contract obligations. A compliance issue may require documentation, legal review, alternate sourcing, or a pause before the next order. A financial risk signal may be low urgency for one category and critical for another.',
          'Risk becomes valuable only when it reaches the workflow where people make decisions.',
        ],
      },
      {
        heading: 'The Problem Is Context, Not Another Scorecard',
        body: [
          'NIST guidance on cyber supply chain risk management emphasizes supplier due diligence, controls, governance, and continuous monitoring. Deloitte has also written about supplier delivery pressure and the need for resilient supply chains as lead times and disruption risk remain elevated.',
          'In daily procurement work, the context is scattered. Supplier performance may live in scorecards. Contract terms may live in a repository. Purchase orders may live in ERP. Qualification rules may live in policy documents. Supplier messages may live in email. Logistics status may live in a transportation system.',
          'A risk dashboard can point to the problem, but it rarely prepares the action.',
        ],
      },
      {
        heading: 'What a Supplier Risk Agent Should Prepare',
        body: [
          'A useful supplier risk agent should turn the signal into an operational brief. Which supplier changed? Which materials, POs, customers, plants, or shipments are exposed? What are the contract terms, SLA obligations, penalties, or compliance requirements? Are alternate suppliers approved? What qualification or documentation steps are required before substitution?',
          'The agent should compare options rather than hide complexity. Escalate the supplier. Split volume. Shift to an approved alternate source. Hold the order. Request updated documentation. Prepare a legal or quality review. Each option should show evidence, assumptions, operational impact, and the approval path.',
          'It should also know when not to act. Some risks should only trigger monitoring. Some require procurement review. Some touch compliance, quality, finance, or legal teams before a buyer can change the source of supply. The workflow boundary matters as much as the recommendation.',
          'This keeps procurement work fast without making it uncontrolled.',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow helps teams train agents around supplier-specific and category-specific knowledge: approved supplier lists, sourcing constraints, contract clauses, risk thresholds, escalation rules, compliance checklists, quality requirements, and procurement playbooks.',
          'Permanent memory is especially useful in supplier workflows because supplier behavior repeats. If one supplier repeatedly misses the same lane, the agent can surface that history. If an alternate source solved a previous shortage but created quality rework, that outcome can shape the next recommendation. If procurement rejects a proposed action, the correction can become reusable context.',
          'This makes the agent less like a generic supplier chatbot and more like an operating layer for procurement work. It can preserve why a decision was made, which sources were used, who reviewed the action, and what happened afterward.',
          'That matters when procurement teams need speed, but also need traceability.',
          'The result is not a black-box procurement agent. It is a governed workflow layer that turns supplier risk into reviewed, traceable, context-rich decisions.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'NIST - Cyber supply chain risk management',
            href: 'https://csrc.nist.gov/projects/cyber-supply-chain-risk-management',
          },
          {
            label: 'Deloitte - Supply chain resilience amid disruptions',
            href: 'https://www.deloitte.com/us/en/insights/industry/manufacturing-industrial-products/global-supply-chain-resilience-amid-disruptions.html',
          },
          {
            label: 'NIST - SP 800-161 Rev. 1',
            href: 'https://csrc.nist.gov/pubs/sp/800/161/r1/final',
          },
        ],
      },
    ],
  },
  {
    category: 'Travel',
    topic: 'travel',
    title: 'Travel’s Real Problem Isn’t Search. It’s Context.',
    seoTitle: 'Travel AI Agents: Why Context Matters More Than Search',
    date: '2026-06-26',
    excerpt:
      'Travelers ask simple questions. Travel systems make them complicated. AI agents connect bookings, policies, live events, and traveler history so teams can move from questions to next actions.',
    metaDescription:
      'Travel companies do not need another search box. They need AI agents that understand bookings, policies, live events, traveler history, and the next best action.',
    slug: '/blog/travel-ai-agents-context',
    visualLabel: 'Travel Context',
    visualPattern: 'journey',
    visualSteps: [
      'Traveler request',
      'Booking record',
      'Fare rules',
      'Hotel policy',
      'Live event',
      'Recommended next action',
    ],
    author: 'PrismShadow',
    tags: [
      'Travel AI Agents',
      'Agentic AI',
      'Booking Operations',
      'Passenger Service',
      'Travel Intelligence',
    ],
    content: [
      {
        blocks: [
          {
            type: 'paragraph',
            text: 'A traveler asks a simple question:',
          },
          {
            type: 'quote',
            text: 'Can I change my return flight and keep my hotel?',
          },
          {
            type: 'paragraph',
            text: 'That sounds like one request.',
          },
          {
            type: 'paragraph',
            text: 'Inside a travel company, it is not one request at all. It may touch the booking record, fare rules, hotel policy, refund conditions, loyalty status, payment terms, availability, service history, and maybe even a live disruption already happening in the background.',
          },
          {
            type: 'paragraph',
            text: 'The traveler sees one trip.',
          },
          {
            type: 'paragraph',
            text: 'The business sees ten systems.',
          },
          {
            type: 'paragraph',
            text: 'That is the real problem with travel today. It is not that travelers cannot search. It is that travel companies often cannot connect the context fast enough to give the right answer, at the right moment, through the right workflow.',
          },
          {
            type: 'paragraph',
            text: 'For years, travel technology has focused on better search: more filters, more results, more comparison tools, more self-service options. But travelers do not really want more results. They want confidence. They want someone, or something, to understand what they are trying to do and help them move forward.',
          },
          {
            type: 'paragraph',
            text: 'A chatbot can answer a question.',
          },
          {
            type: 'paragraph',
            text: 'An AI agent can work through the problem.',
          },
          {
            type: 'paragraph',
            text: 'A chatbot might say:',
          },
          {
            type: 'quote',
            text: 'Please check your airline’s change policy.',
          },
          {
            type: 'paragraph',
            text: 'An AI agent should be able to say:',
          },
          {
            type: 'quote',
            text: 'This fare allows a change with a fee. The hotel booking can remain unchanged. Two return flight options are available. I’ve prepared the next step for review.',
          },
          {
            type: 'paragraph',
            text: 'That difference matters.',
          },
          {
            type: 'paragraph',
            text: 'Travel is full of moments where simple questions hide complicated workflows. Fare rules vary by airline, fare class, ticket type, distribution channel, and change date. Booking records can be long, cryptic, and difficult to interpret. Disruptions move quickly across flights, bags, hotels, ground transport, claims, and customer service. Revenue and operations teams often rely on dashboards and spreadsheets that explain what happened after the moment to act has already passed.',
          },
          {
            type: 'paragraph',
            text: 'This is why travel is such a strong fit for AI agents.',
          },
          {
            type: 'paragraph',
            text: 'A useful travel agent does not just generate a nice answer. It retrieves trusted information, reasons across rules, summarizes messy records, prepares options, and helps teams take the next step. Sometimes that next step is a draft response. Sometimes it is a rebooking option. Sometimes it is a refund workflow, an escalation note, or an operational briefing.',
          },
          {
            type: 'paragraph',
            text: 'The best travel AI agents are not replacing human travel teams. They are removing the repetitive digging, decoding, checking, and drafting that slows those teams down.',
          },
          {
            type: 'paragraph',
            text: 'They help advisors answer fare questions faster.',
          },
          {
            type: 'paragraph',
            text: 'They turn booking records into readable summaries.',
          },
          {
            type: 'paragraph',
            text: 'They connect disruption signals before travelers have to explain the problem twice.',
          },
          {
            type: 'paragraph',
            text: 'They help analysts ask business questions without waiting on another report.',
          },
          {
            type: 'paragraph',
            text: 'Travel companies do not need another search box. They need a context layer.',
          },
          {
            type: 'paragraph',
            text: 'That is where PrismShadow fits.',
          },
          {
            type: 'paragraph',
            text: 'PrismShadow helps travel companies build AI agents around their own journeys, booking workflows, policies, service processes, and operational knowledge. Agents can preserve useful journey context, work with fragmented travel knowledge, support event-aware workflows, and route sensitive decisions to human teams when needed.',
          },
          {
            type: 'paragraph',
            text: 'The future of travel AI is not “ask a chatbot.”',
          },
          {
            type: 'paragraph',
            text: 'It is:',
          },
          {
            type: 'code',
            lines: [
              'Traveler asks',
              '→ Agent retrieves context',
              '→ Agent checks rules',
              '→ Agent explains options',
              '→ Agent prepares next action',
              '→ Human reviews when needed',
            ],
          },
        ],
      },
    ],
  },
  {
    category: 'Healthcare',
    topic: 'healthcare',
    title: 'Building Trustworthy Healthcare AI Agent Workflows',
    seoTitle: 'Trustworthy Healthcare AI Agent Workflows',
    date: '2026-06-26',
    excerpt:
      'Healthcare teams do not need more fluent AI answers. They need agent workflows that use approved context, clear escalation paths, human review, and auditability.',
    metaDescription:
      'Learn why healthcare AI agents need approved sources, controlled workflows, human review, traceability, and governance to support trusted healthcare operations.',
    slug: '/blog/healthcare-ai-guardrails-not-prompts',
    visualLabel: 'Healthcare Guardrails',
    visualPattern: 'clinical',
    visualSteps: [
      'Approved sources',
      'Policy boundary',
      'Risk signal',
      'Human review',
      'Audit trail',
      'Feedback loop',
    ],
    author: 'PrismShadow',
    tags: [
      'Healthcare AI Agents',
      'AI Governance',
      'Human Review',
      'Healthcare Operations',
      'Trust and Safety',
    ],
    content: [
      {
        heading: 'The Problem Is Not Fluency',
        body: [
          'Healthcare AI fails when teams treat a polished answer as the goal. In healthcare, the harder question is not whether an agent can respond naturally. It is whether the agent knows what it is allowed to use, what it must not say, when it should escalate, and how the organization can review what happened later.',
          'A consumer might ask whether a symptom is serious. A patient access team might ask what documentation is missing. A care operations leader might ask why a workflow is delayed. Those look like simple questions, but they often touch clinical guidance, payer rules, approved language, patient history, operational policy, and risk thresholds.',
          'A better prompt does not solve that. Healthcare needs controlled agent workflows.',
        ],
      },
      {
        heading: 'Guardrails Are Operational Design',
        body: [
          'WHO guidance on AI for health emphasizes autonomy, safety, transparency, explainability, responsibility, inclusiveness, and sustainability. FDA materials on AI-enabled medical software also point toward transparency, user context, real-world performance, and ongoing oversight.',
          'For healthcare teams, that translates into practical design requirements. Agents should ground responses in approved sources. They should distinguish general service guidance from clinical judgment. They should surface uncertainty instead of hiding it. They should route sensitive cases to humans. They should preserve enough traceability for audit, quality review, and workflow improvement.',
          'The important shift is from “let the model answer” to “let the system manage the workflow.”',
        ],
      },
      {
        heading: 'What PrismShadow Adds',
        body: [
          'PrismShadow fits this problem because it is built around agents that work with business-specific context, not generic internet knowledge. A healthcare organization can shape agents around approved evidence, labels, policies, SOPs, patient access scripts, service workflows, and internal review rules.',
          'That matters when healthcare knowledge is fragmented. The answer may live across a policy document, a payer requirement, a support note, a product evidence file, and a staff escalation rule. PrismShadow helps turn that scattered material into agent-ready context while keeping human teams in control of sensitive decisions.',
          'Permanent memory is also useful only when it is governed. Agents can learn from recurring questions, review outcomes, corrections, and workflow feedback, but healthcare teams still need boundaries around what is remembered, how it is used, and when it should be reviewed or removed.',
        ],
      },
      {
        heading: 'Where Guardrails Show Up',
        body: [
          'In practice, guardrails should appear before, during, and after the agent responds. Before the response, the agent needs access to the right source set and permission boundary. During the response, it needs approved language, risk checks, and confidence signals. After the response, the organization needs a record of sources used, action prepared, escalation path, and human feedback.',
          'That is especially important for consumer health, patient access, evidence operations, and healthcare intelligence. These workflows can be useful without pretending the agent is a clinician. The agent can prepare context, summarize options, flag missing information, and route the work to the right person.',
        ],
      },
      {
        heading: 'The Takeaway',
        body: [
          'The future of healthcare AI is not a more confident chatbot. It is a controlled agent layer that can retrieve trusted context, prepare staff-ready summaries, route edge cases, and leave a clear record behind.',
          'In healthcare, trust is not a tone of voice. Trust is a workflow.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'WHO - Ethics and governance of artificial intelligence for health',
            href: 'https://www.who.int/publications/i/item/9789240029200',
          },
          {
            label:
              'FDA - Transparency for machine learning-enabled medical devices',
            href: 'https://www.fda.gov/medical-devices/software-medical-device-samd/transparency-machine-learning-enabled-medical-devices-guiding-principles',
          },
          {
            label:
              'FDA - Good Machine Learning Practice for medical device development',
            href: 'https://www.fda.gov/medical-devices/software-medical-device-samd/good-machine-learning-practice-medical-device-development-guiding-principles',
          },
        ],
      },
    ],
  },
  {
    category: 'Healthcare',
    topic: 'healthcare',
    title: 'How AI Agents Can Improve Patient Access Operations',
    seoTitle: 'Healthcare AI Agents for Patient Access Operations',
    date: '2026-06-26',
    excerpt:
      'Patient access work breaks when eligibility, benefits, prior authorization, documentation, and patient communication live in different systems.',
    metaDescription:
      'See how healthcare AI agents can support patient access teams by connecting eligibility, benefits, prior authorization, documentation, service context, and next actions.',
    slug: '/blog/healthcare-ai-patient-access-operations',
    visualLabel: 'Patient Access',
    visualPattern: 'access',
    visualSteps: [
      'Patient request',
      'Eligibility context',
      'Benefit rules',
      'Authorization need',
      'Missing documents',
      'Next action',
    ],
    author: 'PrismShadow',
    tags: [
      'Healthcare AI Agents',
      'Patient Access',
      'Prior Authorization',
      'Healthcare Operations',
      'Service Workflows',
    ],
    content: [
      {
        heading: 'Patient Access Is a Context Problem',
        body: [
          'Patient access teams sit at the front door of healthcare operations. They help people schedule care, understand coverage, complete documentation, resolve authorization steps, and get routed to the right next action.',
          'The work sounds administrative, but it is rarely simple. A single request can touch eligibility, benefits, payer rules, referral status, prior authorization requirements, provider availability, patient history, missing forms, and internal service policies.',
          'When that context is split across systems, patients wait and staff repeat the same search-and-check work all day.',
        ],
      },
      {
        heading: 'Why This Is Urgent',
        body: [
          'CMS has been pushing interoperability and prior authorization reform through rules that emphasize electronic data exchange, prior authorization APIs, provider access, and payer-to-payer data sharing. The direction is clear: patient access workflows need to become more connected and more machine-readable.',
          'At the same time, AMA prior authorization research continues to show the operational burden physicians and staff experience when authorization processes are slow, manual, or unclear. Even when the final decision belongs to a payer or clinician, the surrounding workflow can consume hours of staff time and create delays for patients.',
          'AI agents are useful here because the problem is not just answering a question. It is assembling the right packet of context.',
        ],
      },
      {
        heading: 'What a Patient Access Agent Can Do',
        body: [
          'A patient access agent should not make clinical decisions. It should help teams move through repeatable operational work with more clarity.',
          'It can summarize what the patient is asking, identify which information is already available, check whether documentation appears complete, surface payer-specific requirements, draft a staff-ready status update, and route unclear or sensitive cases for human review.',
          'For example, instead of asking a coordinator to manually inspect several systems, the agent can prepare a concise brief: coverage context, missing documents, authorization status, policy notes, and the recommended next operational step. The human still decides what to do, but the digging work is reduced.',
        ],
      },
      {
        heading: 'Where Agents Help First',
        body: [
          'The best starting points are the repetitive handoffs that already have rules but still require manual search. Eligibility questions, benefits checks, referral intake, authorization packet review, missing-document follow-up, and patient status updates all fit that pattern.',
          'These workflows do not require the agent to invent a new answer. They require the agent to collect the right facts, compare them against known rules, explain what is missing, and prepare a next step that staff can approve. That is where AI becomes operational infrastructure instead of another chat window.',
          'The result is not less oversight. It is better prepared oversight.',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow helps healthcare organizations create agents around their own access workflows, policies, scripts, payer rules, documents, and review paths. That is important because patient access is local to the organization. One provider network, service line, payer mix, or escalation policy may be very different from another.',
          'The platform is also useful when teams need memory and governance together. Agents can preserve recurring context, learn from corrections, and improve workflow summaries over time, while still staying inside approved data boundaries and human review rules.',
          'Patient access will not be fixed by another generic chatbot. It needs agents that understand the operational pathway from request to next action.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label:
              'CMS - Interoperability and Prior Authorization Final Rule',
            href: 'https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f',
          },
          {
            label: 'CMS - Prior Authorization API',
            href: 'https://www.cms.gov/priorities/burden-reduction/overview/interoperability/frequently-asked-questions/prior-authorization-api',
          },
          {
            label:
              'AMA - Prior authorization research and reports',
            href: 'https://www.ama-assn.org/practice-management/prior-authorization/prior-authorization-research-reports',
          },
        ],
      },
    ],
  },
  {
    category: 'Retail',
    topic: 'retail',
    title: 'How AI Agents Improve the Next-Generation Retail Experience',
    date: '2026-06-25',
    excerpt:
      'Retail is no longer just about optimizing pages. AI agents help retailers understand intent, answer purchase questions, support checkout, improve service, and connect customer experience with operations.',
    metaDescription:
      'Retailers are moving from static ecommerce journeys to AI-powered experiences that understand intent, remember context, and connect customer-facing moments with operations. Learn how PrismShadow helps retailers build AI agents for discovery, checkout, support, returns, and retail intelligence.',
    slug: '/blog/how-ai-agents-improve-next-generation-retail-experience',
    visualLabel: 'Retail Agents',
    visualPattern: 'commerce',
    visualSteps: [
      'Shopper intent',
      'Product context',
      'Inventory signal',
      'Policy check',
      'Service handoff',
      'Operations loop',
    ],
    readingTime: '6 min read',
    author: 'PrismShadow',
    tags: [
      'AI Agents',
      'Retail',
      'Ecommerce',
      'Customer Experience',
      'Retail Operations',
    ],
    content: [
      {
        heading: 'The Shopper Does Not Think in SKUs',
        body: [
          'Imagine a shopper lands on your site and types: "I need a lightweight jacket for a rainy business trip, under $150, that can arrive before Friday."',
          'This is a normal shopping request. But for most ecommerce systems, it is a messy query.',
          'It includes a use case, weather context, price limit, delivery deadline, product attributes, and implied trust questions. The shopper is not asking for a category. They are asking for a decision.',
          'Traditional ecommerce asks the customer to do the work:',
        ],
        bullets: [
          'Search "jacket."',
          'Filter by size.',
          'Filter by color.',
          'Open five product pages.',
          'Check shipping.',
          'Read reviews.',
          'Compare return policy.',
          'Hope the product is right.',
        ],
      },
      {
        heading: 'From Static Retail to Agentic Retail',
        body: [
          'An AI agent changes the flow.',
          'Instead of forcing the shopper to translate intent into filters, the agent can understand the goal, retrieve the right product context, check policies, compare options, and guide the customer toward the next best step.',
          'That is the difference between a static retail experience and an agentic retail experience.',
        ],
      },
      {
        heading: 'Why Retail Needs Agents Now',
        body: [
          'Retailers have already invested heavily in ecommerce, personalization, search, checkout, support, and analytics. But the customer journey still breaks in familiar places.',
          "Search is still fragile. Baymard's ecommerce search benchmark found that 56% of ecommerce sites fail to adequately support users' search needs.",
          'Checkout is still leaky. Baymard tracks the average ecommerce cart abandonment rate at 70.19%, with common reasons including extra costs, slow delivery, lack of trust, forced account creation, and complicated checkout.',
          'Returns are still expensive. NRF estimates that 19.3% of online sales will be returned in 2025, and 82% of consumers say free returns are important when shopping online.',
          'And now, AI is becoming part of how shoppers discover products. Adobe reported that traffic from AI sources to U.S. retail sites grew 393% year over year in Q1 2026.',
          'The message is clear: retail is no longer just about optimizing pages. It is about creating systems that can understand intent, connect knowledge, and support action.',
          'Retailers need AI agents because static workflows struggle when shopping patterns, inventory, fulfillment, policies, and customer expectations change.',
        ],
      },
      {
        heading: 'What AI Agents Actually Do in Retail',
        body: [
          'A chatbot answers a question. An AI agent works through a situation.',
          'When a shopper asks for the rainy business trip jacket, a retail AI agent can:',
        ],
        bullets: [
          'Understand the intent.',
          'Find relevant products.',
          'Check delivery cutoff.',
          'Compare return rules.',
          'Summarize product differences.',
          'Recommend the best option.',
          'Remember what the shopper cared about.',
        ],
      },
      {
        heading: '1. Product Discovery Becomes a Conversation',
        body: [
          'Most shoppers do not think in product taxonomies. They think in needs.',
          'AI agents can turn vague requests into structured product logic. They can ask follow-up questions, compare products, explain tradeoffs, and guide customers toward relevant options.',
          'This makes discovery feel closer to an in-store associate than a keyword search box.',
          'For PrismShadow, this is where customizable agents matter. A retailer can train agents around its own catalog, brand voice, product rules, and recommendation logic instead of relying on generic retail knowledge.',
        ],
        bullets: [
          'I need something for sensitive skin.',
          'I want a gift for someone who travels a lot.',
          'Which laptop is good for design work?',
          'What is similar but cheaper?',
          'Which one will arrive before Friday?',
        ],
      },
      {
        heading: '2. Product Pages Become Interactive Advisors',
        body: [
          'A product page can only say so much. Customers still wonder:',
        ],
        bullets: [
          'Will this fit?',
          'Is this material durable?',
          'Does this work with my device?',
          'Is this safe for my use case?',
          'Can I return it if it does not work?',
          'Why is this more expensive than the other option?',
        ],
      },
      {
        heading: 'Product Advisors Reduce Doubt',
        level: 3,
        body: [
          'An AI agent can answer those questions directly, using product data, reviews, FAQs, policies, and internal knowledge.',
          'This matters because many retail decisions fail not because the product is wrong, but because the customer is unsure.',
          'A good product advisor agent does not push harder. It reduces doubt.',
        ],
      },
      {
        heading: '3. Checkout Gets a Last-Mile Confidence Layer',
        body: [
          'Checkout abandonment often happens because a customer suddenly feels uncertain.',
          'The product is in the cart, but now the customer asks:',
        ],
        bullets: [
          'Will it arrive on time?',
          'Why is shipping so expensive?',
          'Can I return it?',
          'Why did my coupon fail?',
          'Do I need an account?',
          'Is this payment method supported?',
        ],
      },
      {
        heading: 'Conversion Protection at the Moment of Doubt',
        level: 3,
        body: [
          'A checkout agent can answer these questions at the exact moment they matter.',
          'This is not just customer support. It is conversion protection.',
          'The agent can explain shipping rules, return windows, discounts, delivery estimates, and payment options before uncertainty becomes abandonment.',
        ],
      },
      {
        heading: '4. Support Becomes Context-Aware',
        body: [
          'Retail support teams live inside repetitive questions:',
        ],
        bullets: [
          'Where is my order?',
          'How do I return this?',
          'When will I get my refund?',
          'Can I exchange this size?',
          'Why did my discount not apply?',
        ],
      },
      {
        heading: 'Support Becomes a Learning System',
        level: 3,
        body: [
          'AI agents can classify requests, retrieve policy context, summarize customer history, draft responses, and route complex cases to human agents.',
          'But the real improvement is memory.',
          'With permanent memory, PrismShadow agents can retain useful context across interactions: what customers keep asking, which products cause confusion, which policies trigger escalations, and which support patterns keep repeating.',
          'That turns support from a cost center into a learning system.',
        ],
      },
      {
        heading: '5. Returns Become a Feedback Loop',
        body: [
          'Returns are not just a post-purchase problem. Many returns begin before checkout.',
        ],
        bullets: [
          'The customer chose the wrong size.',
          'The product page was unclear.',
          'The recommendation was too generic.',
          'The return policy was misunderstood.',
          'The delivery expectation was wrong.',
        ],
      },
      {
        heading: 'Retail Agents Connect Returns Back to Operations',
        level: 3,
        body: [
          'AI agents can help reduce return friction in two ways.',
          'Before purchase, they improve product confidence. After purchase, they guide the customer through eligibility, exchanges, refunds, and next steps.',
          'For internal teams, agents can summarize return reasons and connect them back to products, pages, campaigns, and support issues.',
          'That is where retail agents become operationally valuable.',
        ],
      },
      {
        heading: '6. Retail Teams Get an Operating Brain',
        body: [
          'The next-generation retail experience is not only what customers see. It depends on what internal teams know.',
          'Product data, inventory, promotions, return policies, support tickets, customer feedback, fulfillment constraints, and campaign details often live in different tools.',
          'When that knowledge is fragmented, customers feel it as friction.',
          'A retail operations agent can help teams ask better questions:',
        ],
        bullets: [
          'Which SKUs are driving returns this week?',
          'Which product pages create the most support tickets?',
          'Which promotion increased revenue but reduced margin?',
          'Which products are low in stock but still being recommended?',
          'Which support issues should merchandising fix?',
        ],
      },
      {
        heading: 'PrismShadow Connects Retail Context',
        level: 3,
        body: [
          "This is where PrismShadow's localized deployment and long-term memory become especially useful. Retailers can build agents around their own data environment, policies, and workflows while preserving context over time.",
        ],
      },
      {
        heading: 'A Simulated Retail Agent Benchmark',
        body: [
          'To make this more concrete, here is an illustrative benchmark format for a trained retail agent.',
          'This is not a production claim. It is a simulated workflow example showing how retailers could evaluate agent training on repeatable ecommerce tasks.',
        ],
        table: {
          headers: ['Retail Task', 'Few-Shot Agent', 'Panofy-Trained Agent'],
          rows: [
            ['Product Q&A accuracy', '72.4%', '89.6%'],
            ['Return policy classification', '76.8%', '92.1%'],
            ['Checkout issue routing', '69.5%', '87.3%'],
            ['Product comparison JSON validity', '81.2%', '96.4%'],
            ['Average token usage per case', '18,400', '3,150'],
          ],
        },
      },
      {
        heading: 'Retail Agents Should Not Start from Scratch',
        body: [
          'In this simulated workflow, the trained agent improves average task accuracy from 74.9% to 91.4% and reduces average token usage by 82.9%.',
          'The point is not that every retailer will see these exact numbers. The point is the pattern: retail agents should not start from scratch every time.',
          'They should learn repeatable retail logic: product attributes, policy rules, checkout exceptions, support categories, return patterns, and customer preferences.',
          'That is exactly the type of workflow PrismShadow is designed to support.',
        ],
      },
      {
        heading: 'Why PrismShadow Fits the Next-Generation Retail Experience',
        body: [
          'Retail AI agents need four things.',
          'First, they need customization. Every retailer has different products, policies, customers, inventory logic, and brand voice.',
          'Second, they need memory. Retail is not one conversation. It is a long customer journey across discovery, purchase, support, return, and reorder.',
          'Third, they need to evolve. Products launch, campaigns change, policies update, and customer questions shift.',
          'Fourth, they need data control. Retailers are dealing with sensitive product, pricing, customer, supplier, and operational information.',
          'PrismShadow brings these pieces together through customizable AI agents, self-evolving workflows, localized deployment, and permanent memory.',
          'That means retailers can build agents that are not just "good at retail" in general. They can build agents that understand their retail business.',
        ],
      },
      {
        heading: 'The New Retail Experience',
        body: [
          'The next-generation retail experience will not feel like browsing a website.',
          'It will feel more like having a smart associate, support specialist, merchandiser, and operations analyst working together.',
        ],
        bullets: [
          'A shopper says what they need.',
          'The agent finds the right products.',
          'The agent explains the tradeoffs.',
          'The agent checks shipping and returns.',
          'The agent supports the customer after purchase.',
          'The agent summarizes patterns for the retail team.',
          'The system remembers and improves.',
        ],
      },
      {
        heading: 'Final Takeaway',
        body: [
          'Retailers do not need more disconnected tools.',
          'They need AI agents that can connect product knowledge, customer intent, policies, support history, and operational context.',
          'PrismShadow helps retailers build that agent layer: customizable, memory-driven, locally deployable, and designed to improve over time.',
          'The future of retail is not just digital. It is agentic.',
        ],
      },
      {
        heading: 'Disclaimer',
        kind: 'note',
        body: [
          'The retail benchmark above is a simulated workflow example designed to illustrate potential agent training patterns. Results should be validated with retailer-specific data before production use.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'Baymard Institute - Ecommerce Search UX benchmark',
            href: 'https://baymard.com/blog/ecommerce-search-query-types',
          },
          {
            label:
              'Baymard Institute - Checkout usability and cart abandonment research',
            href: 'https://baymard.com/research/checkout-usability',
          },
          {
            label: 'NRF - 2025 Retail Returns Landscape',
            href: 'https://nrf.com/research/2025-retail-returns-landscape',
          },
          {
            label: 'Adobe - AI traffic surge to retail sites',
            href: 'https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable',
          },
        ],
      },
    ],
  },
  {
    category: 'Restaurant',
    topic: 'restaurants',
    title: 'Restaurant AI Should Start with Contribution Profit',
    seoTitle: 'Restaurant AI Agents for Contribution Profit Operations',
    date: '2026-06-26',
    excerpt:
      'Restaurant operators do not need another sales dashboard. They need agents that connect channels, fees, discounts, food cost, labor, refunds, and store execution into profit-ready decisions.',
    metaDescription:
      'Learn how restaurant AI agents can help operators move beyond GMV and revenue reports by connecting channel sales, platform fees, food cost, labor, discounts, and contribution profit.',
    slug: '/blog/restaurant-ai-contribution-profit',
    visualLabel: 'Profit Agent',
    visualPattern: 'profit',
    visualSteps: [
      'Channel revenue',
      'Platform fees',
      'Food cost',
      'Labor context',
      'Margin leakage',
      'Owner action',
    ],
    author: 'PrismShadow',
    tags: [
      'Restaurant AI Agents',
      'Restaurant Profit',
      'Contribution Margin',
      'Food Cost',
      'Operations',
    ],
    content: [
      {
        heading: 'Revenue Can Hide the Problem',
        body: [
          'Restaurant operators already have reports. POS systems show sales. Delivery platforms show orders. Social deals show campaign volume. Private ordering tools show direct demand. Accounting systems show what happened later. The problem is not a lack of numbers.',
          'The problem is that revenue can look healthy while profit is leaking underneath. A delivery campaign may raise GMV but lose money after commission, discounts, packaging, refunds, and labor. A best-selling menu item may be popular but weak after ingredient cost and prep time. A busy shift may feel successful while overtime and waste erase the benefit.',
          'The signal has to reach the owner in business language.',
          'That is why restaurant AI should start with contribution profit, not sales volume.',
        ],
      },
      {
        heading: 'Why GMV Is Not Enough',
        body: [
          'The National Restaurant Association has continued to emphasize that restaurant operators face pressure from food costs, labor, occupancy, and changing consumer behavior. Restaurant365 and Toast both frame profitability around understanding margin, prime cost, food cost, labor cost, and operating expenses rather than looking only at top-line sales.',
          'For an operator, that means the useful question is not simply, "Which channel sold more?" It is, "Which channel improved contribution profit after fees, discounts, food cost, labor, refunds, and execution burden?"',
          'A platform report usually optimizes for the platform view. A restaurant owner needs a neutral operating view. That view has to connect channel performance, menu economics, campaign design, staffing, purchasing, inventory, and store execution.',
        ],
      },
      {
        heading: 'What a Profit Agent Should Do',
        body: [
          'A restaurant profit agent should turn fragmented operating data into a practical briefing. It should compare dine-in, delivery, social deals, memberships, private traffic, and online ordering by contribution profit. It should explain whether a promotion created profitable demand or discounted away margin. It should identify food cost anomalies, refund spikes, low-margin bundles, supplier price changes, and labor pressure.',
          'The agent should also make the next step clear. Pause a weak campaign for review. Adjust prep on an item with waste risk. Check a supplier price change. Rework a bundle. Review labor scheduling for the dinner shift. Escalate a pricing change to the owner. The recommendation should show evidence, not just a sentence that sounds confident.',
          'It should also separate daily noise from true margin risk. A one-day spike may only need monitoring. A repeating pattern across one channel, one menu item, or one store needs action. The agent should explain that difference before asking people to change operations.',
          'This is where AI becomes an operating layer instead of another dashboard.',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow helps restaurant teams train agents around their own data and operating rules: POS categories, delivery platforms, recipe costs, labor rules, store roles, campaign logic, supplier terms, approval paths, and margin thresholds.',
          'Permanent memory matters because restaurant profit problems repeat. If a coupon repeatedly drives orders but weakens margin, the system should remember. If one ingredient cost keeps breaking a menu item, that history should surface earlier. If a manager fixes a problem and the metric improves, the result should feed the next recommendation.',
          'Restaurant operators do not need AI that celebrates revenue. They need agents that help protect profit, assign action, and learn from every shift.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'National Restaurant Association - State of the Restaurant Industry',
            href: 'https://restaurant.org/research-and-media/research/research-reports/state-of-the-industry/',
          },
          {
            label: 'meez - Food cost percentage vs. contribution margin',
            href: 'https://www.getmeez.com/blog/food-cost-percentage-vs-contribution-margin',
          },
          {
            label: 'Restaurant365 - Prime cost in restaurants',
            href: 'https://www.restaurant365.com/blog/giving-your-business-a-restaurant-prime-cost-tune-up/',
          },
        ],
      },
    ],
  },
  {
    category: 'Restaurant',
    topic: 'restaurants',
    title: 'The Daily Owner Briefing Is the Restaurant Agent to Build First',
    seoTitle: 'Restaurant AI Agents for Daily Owner Briefings',
    date: '2026-06-26',
    excerpt:
      'The most useful restaurant AI agent may be the daily briefing: what happened yesterday, why it happened, what needs action today, and what should be checked tomorrow.',
    metaDescription:
      'See how restaurant AI agents can turn POS, delivery, labor, food cost, inventory, refunds, and manager notes into a daily owner briefing and execution loop.',
    slug: '/blog/restaurant-daily-owner-briefing-agent',
    visualLabel: 'Owner Briefing',
    visualPattern: 'briefing',
    visualSteps: [
      'Yesterday close',
      'Anomaly check',
      'Root cause context',
      'Top actions',
      'Task owner',
      'Follow-up review',
    ],
    author: 'PrismShadow',
    tags: [
      'Restaurant AI Agents',
      'Daily Briefing',
      'Store Operations',
      'Restaurant Management',
      'Execution Loop',
    ],
    content: [
      {
        heading: 'Restaurant Work Resets Every Day',
        body: [
          'Restaurants operate in daily cycles. Yesterday may have had weak dinner traffic, a delivery promotion that looked strong but lost margin, a food cost spike, a prep mistake, too many refunds, or a labor schedule that did not match demand. By the next morning, the team needs to know what matters before service begins again.',
          'Most restaurant systems are not designed around that rhythm. They store transactions, timecards, orders, inventory, invoices, reviews, and campaign results, but they rarely turn those signals into a concise operating plan.',
          'That gap is where small issues become repeated habits.',
          'Owners need the brief before the next service window starts.',
          'That is why the daily owner briefing is one of the best first restaurant AI agents to build.',
        ],
      },
      {
        heading: 'The Briefing Is Not a Report',
        body: [
          'A report lists metrics. A briefing explains what changed, why it matters, and what to do next. Square has written about restaurants adopting more technology across ordering, payments, loyalty, and operations. The opportunity is not just more software. It is a better operating layer on top of the tools restaurants already use.',
          'A daily briefing agent should connect POS data, delivery orders, food cost, labor, inventory, refunds, customer feedback, manager notes, and campaign performance. It should then separate noise from action: what happened yesterday, what is unusual, what likely caused it, and which three actions should happen today.',
          'The operator should not have to open five dashboards before breakfast.',
        ],
      },
      {
        heading: 'What the Agent Should Prepare',
        body: [
          'A useful daily briefing starts with the close. Revenue by channel. Contribution profit. Food cost movement. Labor ratio. Refunds. Voids. Average ticket. Top-selling items. Weak items. Inventory warnings. Supplier cost changes. Staff notes. Customer complaints. The agent should compare those signals against the restaurant’s own baseline, not a generic benchmark.',
          'Then it should prepare actions. Review beef yield before lunch prep. Adjust tonight’s labor after 9 PM. Pause a low-margin coupon. Check a delivery platform fee change. Ask the kitchen lead to upload waste notes. Follow up on a refund pattern. Each action should have an owner, deadline, evidence requirement, and target metric.',
          'The best version also closes the loop the next day. If the kitchen uploaded yield notes, did food cost improve? If labor was adjusted, did service suffer? If the coupon was paused, did contribution profit recover? A briefing agent should not only recommend; it should remember what happened after the recommendation.',
          'That turns insight into execution.',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow is a strong fit because restaurant execution depends on local context. A chain, independent restaurant, delivery-heavy brand, or multi-store operator may define profit, waste, labor pressure, and approval rules differently.',
          'With PrismShadow, agents can be trained around store roles, recipes, supplier terms, campaign rules, labor policies, escalation paths, and owner preferences. Permanent memory makes the briefing improve over time. If a task fixed the problem, the system can learn. If a manager ignored a recommendation and the metric worsened, that result can inform the next briefing.',
          'The daily briefing should not be a prettier dashboard. It should be the start of a loop: detect, explain, assign, verify, and improve.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'Square - Future of Restaurants report',
            href: 'https://squareup.com/us/en/the-bottom-line/series/foc/future-of-restaurants',
          },
          {
            label: 'Restaurant365 - Restaurant prime cost',
            href: 'https://www.restaurant365.com/blog/controlling-restaurant-prime-cost-by-empowering-your-store-level-managers/',
          },
          {
            label: 'National Restaurant Association - Technology investment',
            href: 'https://restaurant.org/education-and-resources/resource-library/where-operators-plan-to-invest-in-tech/',
          },
        ],
      },
    ],
  },
  {
    category: 'Auto Dealerships',
    topic: 'auto-dealerships',
    title: 'Why Used-Car Margins Are Won Before the Vehicle Hits the Lot',
    seoTitle: 'Auto Dealership AI Agents for Used-Car Acquisition Margins',
    date: '2026-06-26',
    excerpt:
      'Used-car profit is shaped before acquisition: auction price, wholesale comps, condition, recon, transport, local demand, pricing, and days-to-turn all matter.',
    metaDescription:
      'Learn how auto dealership AI agents can help teams evaluate used-car acquisition decisions before vehicles hit the lot by connecting auction, wholesale, recon, transport, demand, and pricing context.',
    slug: '/blog/used-car-margins-before-the-lot',
    visualLabel: 'Acquisition Margin',
    visualPattern: 'dealer',
    visualSteps: [
      'Auction match',
      'Wholesale comps',
      'Condition report',
      'Recon estimate',
      'Local demand',
      'Bid review',
    ],
    author: 'PrismShadow',
    tags: [
      'Auto Dealership AI Agents',
      'Used-Car Inventory',
      'Auction Intelligence',
      'Recon Risk',
      'Dealer Operations',
    ],
    content: [
      {
        heading: 'Margin Starts Before the Vehicle Arrives',
        body: [
          'Used-car profit is often decided before the vehicle ever reaches the lot. The auction price is only one part of the decision. The real margin picture also includes wholesale comps, local retail demand, condition report risk, recon cost, transport, merchandising speed, pricing strategy, and how quickly the unit is likely to turn.',
          'A vehicle can look attractive in the lane and still become a margin problem. A small miss on recon, a slower-than-expected retail market, a transport delay, or an overconfident bid can turn a good acquisition into aged inventory. For independent and franchise dealers alike, the buying moment is where many downstream problems begin.',
          'That is why used-car margin work needs agent support before acquisition, not only after the car is listed.',
        ],
      },
      {
        heading: 'The Buying Decision Has Too Much Context',
        body: [
          'NADA Data tracks dealership performance across new vehicles, used vehicles, service, parts, employees, inventory, and other operating measures. Cox Automotive and Manheim track wholesale market movement through the Manheim Used Vehicle Value Index. For a dealership team, those market signals are useful, but the final decision is still local.',
          'A buyer has to ask: does this unit fit our current inventory gaps? Is local demand strong enough? Are similar vehicles already aging? Does the condition report hide recon risk? Is transport practical? What is the retail price path? What is the real bid ceiling after all costs?',
          'Most of that context lives across auction tools, valuation tools, DMS, inventory systems, CRM signals, service notes, spreadsheets, and buyer experience.',
        ],
      },
      {
        heading: 'What an Acquisition Agent Should Prepare',
        body: [
          'A useful acquisition agent should turn each candidate vehicle into a buying brief. It should summarize auction details, comparable wholesale sales, local retail supply, customer demand signals, current inventory gaps, estimated recon, transport, title or condition risks, target listing price, and expected speed-to-market.',
          'The agent should not blindly tell a dealer to buy. It should prepare a recommendation with assumptions, evidence, and a review path. Buy below this ceiling. Pass because recon risk is too high. Watch if price drops. Send to manager review because the vehicle matches strong local demand but has condition uncertainty.',
          'It should also flag when the timing is wrong: the vehicle may be right, but the current inventory mix, cash position, or recon capacity may make the deal weaker this week.',
          'This keeps the buyer fast while preserving judgment. The goal is not a black-box bid engine. It is better prepared decisions before money is committed.',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow helps dealerships train agents around their own acquisition strategy: target models, local demand patterns, aged inventory rules, recon thresholds, transport assumptions, pricing policy, manager approval paths, and past buying outcomes.',
          'Permanent memory matters because acquisition learning compounds. If a model repeatedly takes longer to turn in the local market, the agent should remember. If a certain condition pattern leads to expensive recon, that history should surface before the bid. If a manager overrides a recommendation and the outcome is strong or weak, that feedback should improve future buying briefs.',
          'Used-car margin is not won by looking at one number. It is won by connecting the right context before the vehicle hits the lot.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'NADA - NADA Data',
            href: 'https://www.nada.org/nada/research-data/nada-data',
          },
          {
            label: 'Cox Automotive - Manheim Used Vehicle Value Index',
            href: 'https://www.coxautoinc.com/insights/manheim-used-vehicle-value-index/',
          },
          {
            label: 'Cox Automotive - Full-Throttle Inventory Management',
            href: 'https://www.coxautoinc.com/insights/full-throttle-inventory-management/',
          },
        ],
      },
    ],
  },
  {
    category: 'Auto Dealerships',
    topic: 'auto-dealerships',
    title: 'Turning Dealer and Auction Data into Agent-Ready Context',
    seoTitle: 'Auto Dealership AI Agents for Dealer and Auction Data Context',
    date: '2026-06-26',
    excerpt:
      'Dealership AI becomes useful when customer, inventory, auction, pricing, service, marketing, and finance context can be assembled into workflow-ready briefs.',
    metaDescription:
      'See how auto dealership AI agents can connect CRM, DMS, inventory, auction, pricing, service, marketing, and F&I data into agent-ready context for dealership workflows.',
    slug: '/blog/dealer-auction-data-agent-ready-context',
    visualLabel: 'Dealer Context',
    visualPattern: 'dealer',
    visualSteps: [
      'CRM signal',
      'Inventory context',
      'Auction data',
      'Pricing comps',
      'Service history',
      'Next action',
    ],
    author: 'PrismShadow',
    tags: [
      'Auto Dealership AI Agents',
      'Dealer Data',
      'Auction Data',
      'CRM',
      'Agent Workflows',
    ],
    content: [
      {
        heading: 'Dealership Data Is Useful Only When It Connects',
        body: [
          'Auto dealerships already have data. CRM systems hold leads and follow-up history. DMS systems hold deals, repair orders, customers, and accounting context. Inventory tools hold pricing, photos, days-in-stock, and merchandising status. Auction platforms hold run lists, condition reports, seller notes, and market movement. Service systems hold maintenance history and retention signals.',
          'The problem is that these systems rarely meet in the moment when a team needs to act. A salesperson may not see the service history that makes a trade-in conversation timely. A buyer may not see CRM demand before reviewing auction matches. A manager may not see recon, pricing, and customer interest in one place.',
          'Agent-ready context is the layer that connects those fragments into a usable workflow.',
        ],
      },
      {
        heading: 'Why Raw Data Is Not Enough',
        body: [
          'NADA Data shows how broad dealership operations are, spanning vehicle sales, service, parts, employees, and inventory. Cox Automotive market research shows how quickly used-vehicle values and inventory conditions can move. Those signals matter, but raw data does not automatically become a decision.',
          'A dealership needs answers in workflow language. Which auction units match our local demand and inventory gaps? Which aged vehicles need pricing review? Which leads match units arriving soon? Which service customers may be ready for retention outreach? Which deal needs F&I preparation before the appointment?',
          'Those are not dashboard questions. They are operational questions that require context from multiple systems.',
        ],
      },
      {
        heading: 'What Agent-Ready Context Looks Like',
        body: [
          'Agent-ready context starts with a clean brief. For an auction workflow, that brief might include the run list, bid ceiling, condition risk, recon estimate, transport note, retail comps, local demand, and manager review status. For a customer workflow, it might include lead source, saved vehicles, service history, trade-in timing, appointment status, budget signal, and the next best follow-up.',
          'The agent should also preserve boundaries. Customer data, finance context, deal notes, and service history can be sensitive. A useful dealership agent should retrieve only the context it is allowed to use, show why it used that context, and route high-impact recommendations for human review.',
          'It should be able to create different briefs for different roles. A buyer needs acquisition risk. A sales manager needs customer demand and inventory fit. A service manager needs repair order and retention context. An F&I manager needs a clean handoff, not every note in the system.',
          'That is the difference between a chatbot over dealership data and an operating layer for dealership work.',
        ],
      },
      {
        heading: 'How PrismShadow Fits',
        body: [
          'PrismShadow helps dealerships build agents around their own systems, roles, workflows, and approval rules. A store can train agents around CRM follow-up logic, inventory strategy, auction buying rules, pricing reviews, service retention playbooks, F&I handoffs, and manager escalation paths.',
          'Permanent memory makes the layer more valuable over time. If a certain auction source produces higher recon risk, the agent can remember. If a follow-up script works well for trade-in customers, that can inform future outreach. If a manager rejects a recommendation, the correction can become reusable operating knowledge.',
          'The goal is not to replace dealership judgment. It is to give each team a better-prepared context brief before the next action.',
        ],
      },
      {
        heading: 'Sources',
        kind: 'sources',
        body: [],
        links: [
          {
            label: 'NADA - NADA Data',
            href: 'https://www.nada.org/nada/research-data/nada-data',
          },
          {
            label: 'Cox Automotive - Manheim Used Vehicle Value Index',
            href: 'https://www.coxautoinc.com/insights/manheim-used-vehicle-value-index/',
          },
          {
            label: 'Cox Automotive - Full-Throttle Inventory Management',
            href: 'https://www.coxautoinc.com/insights/full-throttle-inventory-management/',
          },
        ],
      },
    ],
  },
  {
    category: 'Product Updates',
    topic: 'product',
    title:
      'Introducing AgentHub: The Ultimate Model SDK for Building High-Precision Agents',
    date: '2026-04-30',
    excerpt:
      'AgentHub is an open-source Python and TypeScript SDK for integrating models into agent apps with transparent, high-precision model-version-specific code paths.',
    slug: '/blog/introducing-agenthub-the-ultimate-model-sdk-for-building-high-precision-agents',
    visualLabel: 'AgentHub',
    visualImage: {
      src: '/blog-assets/agenthub-hero.png',
      alt: 'AgentHub launch visual reading the one SDK to all SOTA LLMs.',
      width: 3000,
      height: 1000,
    },
    visualImageLayout: 'wide',
    content: [
      {
        heading: 'Why We Built AgentHub',
        blocks: [
          {
            type: 'paragraph',
            text: "Over the past months, we've witnessed the rise of several popular open-source agents, such as OpenClaw, HermesAgent, and Pi Agent. One pattern stood out: each of these projects implemented its own custom layer to support multiple model providers. We encountered the same need while building our own agents.",
          },
          {
            type: 'paragraph',
            text: 'In doing so, we uncovered two fundamental and inevitable challenges.',
          },
          {
            type: 'paragraph',
            lead: 'Model versions are not backward compatible.',
            text: 'There is no single codebase that can seamlessly support multiple versions of a model. Even minor updates can break existing logic. For example, Claude Opus 4.7 introduced a new "adaptive thinking" parameter while removing support for the "thinking budget" parameter.',
          },
          {
            type: 'image',
            src: '/blog-assets/agenthub-claude-opus-thinking.png',
            alt: 'Claude API Docs screenshot showing extended thinking budgets removed.',
            width: 2310,
            height: 934,
            caption:
              'Claude API Docs: extended thinking budgets are removed in Claude Opus 4.7, replaced by adaptive thinking.',
          },
          {
            type: 'paragraph',
            lead: 'Black-box abstractions can compromise reliability.',
            text: 'Unified interfaces may come at the cost of stability. For instance, we observed that OpenRouter produces inconsistent token usage calculations—identical calls can yield significantly different results.',
          },
          {
            type: 'image',
            src: '/blog-assets/agenthub-openrouter-token-usage.png',
            alt: 'Code and terminal screenshot showing inconsistent OpenRouter token usage calculations.',
            width: 1440,
            height: 2698,
            caption:
              'The same OpenRouter call, run twice: reasoning tokens exceed completion tokens, and cached token counts differ.',
          },
          {
            type: 'paragraph',
            text: 'These challenges led us to build AgentHub—a transparent, high-precision SDK for integrating models into your agent apps.',
          },
          {
            type: 'paragraph',
            text: 'AgentHub is an open-source project that provides model APIs in both Python and TypeScript, saving developers significant time and effort when adapting to different models.',
          },
        ],
        links: [
          {
            label: 'AgentHub on GitHub',
            href: 'https://github.com/Prism-Shadow/AgentHub',
          },
        ],
      },
      {
        heading: 'Our Design Principles',
        blocks: [
          {
            type: 'paragraph',
            lead: 'Simplicity and usability come first.',
            text: "Existing solutions like OpenResponses offer standardized interfaces, but often come with a steep learning curve (10,000+ words of documentation). In contrast, AgentHub's documentation is under 1,000 words. It provides a unified asynchronous streaming interface that exposes cutting-edge model capabilities, including reasoning with tool-use, image understanding, image generation, and speech generation.",
          },
          {
            type: 'image',
            src: '/blog-assets/agenthub-sdk-architecture.png',
            alt: 'AgentHub SDK architecture visual showing unified configuration, messages, and events.',
            width: 1500,
            height: 780,
            caption:
              'One asynchronous streaming interface: UniConfig and UniMessage in, a stream of UniEvent out, for every supported model.',
          },
          {
            type: 'paragraph',
            lead: 'Accuracy is non-negotiable.',
            text: 'Even small parameter differences, such as thinking levels, can significantly impact model performance. Therefore, each code file in AgentHub supports only a single model version. Different versions are implemented as entirely separate code paths. While this limits the number of supported versions, we prioritize correctness and performance over coverage.',
          },
          {
            type: 'paragraph',
            lead: 'Lightweight observability for long-running agents.',
            text: 'AgentHub includes a built-in tracer that logs every step of long-horizon agent tasks, along with detailed cost tracking. This enables developers to quickly identify root causes of failures—without relying on heavy databases. It can serve as a lightweight alternative to tools like Langfuse in the agent era.',
          },
          {
            type: 'image',
            src: '/blog-assets/agenthub-trace-ui.png',
            alt: 'AgentHub trace interface screenshot showing model tool calls and token details.',
            width: 2046,
            height: 1768,
            caption:
              'The built-in tracer records each round: the request, every tool call, timing, and prompt, thought and response tokens.',
          },
        ],
      },
      {
        heading: 'Impact',
        body: [
          'AgentHub has significantly improved our internal development efficiency. Every agent product in our team now starts with AgentHub.',
        ],
        bullets: [
          'Reduced model integration time from days to near zero, while eliminating ongoing maintenance overhead.',
          'Prevented catastrophic performance degradation caused by subtle implementation errors.',
          'Enabled root cause analysis across millions of execution traces within minutes, dramatically accelerating iteration cycles.',
        ],
      },
      {
        heading: 'Join the Discussion',
        body: [
          "If you're interested in the development details or future roadmap of AgentHub, feel free to join our Discord community and join the discussion.",
          'Happy building agents! 🚀',
        ],
        links: [
          {
            label: 'Join the PrismShadow Discord',
            href: 'https://discord.gg/g5tFcYxkG2',
          },
        ],
      },
    ],
  },
  {
    category: 'Product Updates',
    topic: 'product',
    title: "Meet Panofy: The World's First Agent Training Platform",
    date: '2026-04-08',
    excerpt:
      'Panofy helps you create, train, and manage AI agents that understand your context, follow your standards, and fit naturally into your workflows.',
    slug: '/blog/meet-panofy-the-worlds-first-agent-training-platform',
    visualLabel: 'Panofy',
    visualImage: {
      src: '/blog-assets/panofy-introducing.png',
      alt: 'Introducing Panofy title visual.',
      width: 1280,
      height: 720,
    },
    content: [
      {
        heading: 'Why Panofy Exists',
        body: [
          "You've been using AI for months. But no matter how impressive it sounds, its behavior is still hard to control. It doesn't truly understand your standards, your workflow, or how you want work to be done.",
          'Do you want an AI that lets you stop wasting time tweaking outputs and get things done faster?',
          "That's the problem Panofy was built to solve.",
        ],
      },
      {
        heading: 'What is Panofy',
        blocks: [
          {
            type: 'paragraph',
            text: "Panofy is the world's first agent training platform, built to help you create, train, and manage AI agents that function like a second brain for your business — without requiring specialized expertise or dedicated hardware. Designed for high-compliance use cases, it enables you to build a team of personalized agents that understand your context, follow your standards, and fit naturally into your workflows. In just minutes, you can deploy agents that produce more consistent, reliable outputs you can count on.",
          },
          {
            type: 'paragraph',
            text: 'We aim to help you move beyond one-off answers, minimize model-side uncertainty, and build AI that becomes a dependable part of your workflow.',
          },
          {
            type: 'image',
            src: '/blog-assets/panofy-stop-prompting-start-training.png',
            alt: 'Panofy visual comparing repeated prompting with training an agent once.',
            width: 1280,
            height: 720,
            caption:
              'Stop prompting, start training: train a Panofy agent once instead of re-prompting a general assistant every time.',
          },
        ],
      },
      {
        heading: 'How Panofy Helps You Get There',
        body: [
          "With Panofy's agent training, you can define your agent's role, scope, tone, and output style, then upload files such as SOPs, guidelines, wikis, knowledge bases, and reference materials. Once trained, your agent learns your personal preferences, so you don't have to start from scratch in every session. Panofy makes agent training easy while helping you cut communication costs and token consumption.",
          'Long-term memory gives your agent continuity over time. It carries forward the context that matters — including your standards, preferences, and ways of working. As a result, your agent becomes more personalized, more consistent, and more valuable with continued use.',
          "For enterprises, a single AI assistant is rarely enough. Real workflows involve multiple roles, parallel tasks, and cross-functional teams. That's where Panofy's agent swarm comes in. Through agent swarm, you can build and manage multiple agents on one platform. Each agent can have its own role, memory, and knowledge base — from writing and research to reporting and support. Instead of relying on one general assistant, you can assign work to specialized agents built for specific jobs.",
        ],
      },
      {
        heading: 'Collaborate Without Friction',
        body: [
          "Panofy is built for collaboration. Invite teammates into the platform, share trained agents securely, and keep work aligned across your team. With shared task history, replay mode, and flexible access controls, everyone can benefit from agents trained to your standards, without rebuilding context from scratch. That's how Panofy helps turn individual expertise into a shared, always-on resource for the whole organization.",
        ],
      },
      {
        heading: 'Use Cases',
        body: [
          'Panofy is built for users and teams who demand precision and domain-specific reliability — where general-purpose AI often falls short. Common use cases include automated workflows, enterprise knowledge Q&A, and private knowledge research.',
          'In healthcare, Panofy-trained agents have achieved expert-level performance in patient screening, delivering 70% faster response times and driving 3x revenue growth. In travel, teams have used Panofy to automate campaign generation, multi-channel distribution, and real-time optimization — cutting operating costs to one-eighth of previous levels while improving customer acquisition by 160%.',
          "These are just two examples. Whether you're in finance, legal, education, or operations, if your work demands accuracy, consistency, and domain knowledge, Panofy is built for you.",
        ],
      },
      {
        heading: 'Why Choose Panofy',
        blocks: [
          {
            type: 'heading',
            text: 'Panofy vs. General Agents',
          },
          {
            type: 'paragraph',
            text: 'General AI tools are great for broad tasks, but they lack domain expertise, hallucinate often, offer limited tool capabilities, and tend toward shallow reasoning. Panofy agents are trained on your knowledge, remember over time, and deliver consistent, reliable results.',
          },
          {
            type: 'heading',
            text: 'Panofy vs. OpenClaw',
          },
          {
            type: 'paragraph',
            text: 'Systems like OpenClaw offer flexibility, but require complex setup, cost more to run, lack secure sandboxing, and struggle with context explosion. Panofy runs in a secure cloud environment — no setup, lower cost, ready to go.',
          },
          {
            type: 'image',
            src: '/blog-assets/panofy-comparison.png',
            alt: 'Comparison visual showing general agents, Panofy, and OpenClaw.',
            width: 1280,
            height: 609,
            caption:
              'General agents and OpenClaw compared with Panofy: one-click training, continuous learning, a secure cloud environment and efficient context compression.',
          },
        ],
      },
      {
        heading: 'Get Started with Panofy',
        body: [
          'Panofy is available now. Start with a 7-day free trial and train your first agent in minutes.',
          'Upgrade to Panofy Pro for advanced features, higher usage limits, and priority support.',
        ],
        links: [
          {
            label: 'Try Panofy for free',
            href: 'https://panofy.ai/',
          },
        ],
      },
      {
        heading: 'About Us',
        body: [
          "We're PrismShadow, a young startup led by the team behind LlamaFactory — one of GitHub's most popular open-source LLM training frameworks, with nearly 70,000 stars. Our platform is still evolving rapidly, and we'll continue refining the product to better adapt to the fast-changing user demands. If you run into any issues or have feedback, feel free to reach out through our official social channels or join our Discord community. Thank you for your support.",
        ],
        links: [
          {
            label: 'Join the PrismShadow Discord',
            href: 'https://discord.gg/g5tFcYxkG2',
          },
        ],
      },
    ],
  },
  {
    category: 'Strategy / AI Agents / SaaS Growth',
    topic: 'b2b-saas',
    title:
      "B2B SaaS Doesn't Need More AI Tools. It Needs Agent Orchestration.",
    date: '2026-06-12',
    excerpt:
      'SaaS teams are under pressure to grow more efficiently, retain customers, and prove ROI. The answer is not another disconnected AI tool - it is a governed agent layer that connects customer signals to product, GTM, sales, and customer success workflows.',
    slug: '/blog/b2b-saas-ai-agent-orchestration',
    visualLabel: 'SaaS Agents',
    visualPattern: 'orchestration',
    visualSteps: [
      'CRM notes',
      'Support tickets',
      'Usage signals',
      'GTM workflow',
      'CS review',
      'Product loop',
    ],
    readingTime: '6 min read',
    content: [
      {
        heading: 'The tool sprawl problem',
        body: [
          'Most B2B SaaS teams already have access to AI tools. The harder problem is that those tools often sit outside the systems where customer context actually lives: CRM notes, support tickets, sales calls, product analytics, research notes, and customer success workflows.',
          'When AI stays disconnected, teams get isolated outputs instead of repeatable decisions. Product, GTM, sales, and customer success still have to reconcile the same scattered signals manually.',
        ],
      },
      {
        heading: 'Why orchestration matters',
        body: [
          'Agent orchestration gives teams a governed layer for turning customer signals into workflows. Instead of asking every function to prompt from scratch, the organization can define approved workflows for recurring questions and decisions.',
          'That layer can connect sources, route tasks, preserve context, and keep humans in control through approvals, permissions, source traceability, and audit logs.',
        ],
      },
      {
        heading: 'From signals to decisions',
        body: [
          'The goal is not more AI activity. The goal is faster product validation, sharper GTM messaging, stronger sales preparation, and earlier churn-risk detection from the customer signals teams already collect.',
        ],
      },
    ],
  },
  {
    category: 'Playbook / Implementation',
    topic: 'b2b-saas',
    title: 'Start with Your Top 20 SaaS Questions',
    date: '2026-06-12',
    excerpt:
      'The fastest way to deploy AI agents is not to automate everything. Start with the recurring questions your SaaS teams already ask every week, then turn them into repeatable, governed workflows.',
    slug: '/blog/top-20-saas-questions-ai-agent-workflows',
    visualLabel: 'Playbook',
    visualPattern: 'questions',
    visualSteps: [
      'Recurring question',
      'Trusted input',
      'Expected output',
      'Owner review',
      'Workflow reuse',
      'Team rollout',
    ],
    readingTime: '5 min read',
    content: [
      {
        heading: 'Start where the work repeats',
        body: [
          'A practical AI agent rollout starts with the questions teams already ask every week. Which customers are at risk? What feedback is recurring? Which objections are appearing in sales calls? Which feature requests are tied to expansion potential?',
          'These repeated questions are good candidates for governed agent workflows because they have clear inputs, expected outputs, and business owners.',
        ],
      },
      {
        heading: 'Turn questions into workflows',
        body: [
          'For each question, define the sources, the approval path, the required evidence, and the output format. That turns one-off prompting into a repeatable operating pattern that teams can inspect and improve.',
          'The result is not a giant automation program. It is a focused set of workflows that help teams answer high-value questions faster and more consistently.',
        ],
      },
      {
        heading: 'Build trust before scale',
        body: [
          'Once a workflow works for one team, it can be adapted across adjacent teams with shared governance, shared context, and clear ownership.',
        ],
      },
    ],
  },
  {
    category: 'GTM / Product Validation / Synthetic Data',
    topic: 'b2b-saas',
    title: 'Synthetic ICP Testing for SaaS Product and GTM Teams',
    date: '2026-06-12',
    excerpt:
      'Before committing roadmap or campaign budget, SaaS teams can use synthetic ICP profiles to test messaging, pricing, feature concepts, and positioning assumptions - then validate high-stakes decisions with real customers.',
    slug: '/blog/synthetic-icp-testing-saas-product-gtm',
    visualLabel: 'ICP Testing',
    visualPattern: 'icp',
    visualSteps: [
      'ICP profile',
      'Scenario prompt',
      'Objection map',
      'Message test',
      'Risk signal',
      'Human validation',
    ],
    readingTime: '6 min read',
    content: [
      {
        heading: 'A faster way to pressure-test assumptions',
        body: [
          'Product and GTM teams often need to test positioning, pricing, feature ideas, and ICP resonance before they have enough real-world feedback. Synthetic ICP testing can help teams explore assumptions earlier while still reserving high-stakes validation for real customers.',
          'The value is speed and structure: teams can compare narratives, objections, and likely buyer questions before committing roadmap or campaign budget.',
        ],
      },
      {
        heading: 'Connect testing to customer context',
        body: [
          'Synthetic testing works best when it is grounded in actual customer signals. CRM notes, sales calls, support tickets, interviews, and product usage can shape the profiles, scenarios, and evaluation criteria.',
          'That grounding keeps the workflow focused on realistic SaaS decisions instead of generic persona theater.',
        ],
      },
      {
        heading: 'Use it as a decision aid',
        body: [
          'Synthetic ICP testing should support better human judgment, not replace it. The strongest teams use it to narrow options, surface risks, and prepare sharper real-customer validation.',
        ],
      },
    ],
  },
]
