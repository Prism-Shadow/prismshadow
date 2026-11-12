import type { BlogPostZh } from '../blogPosts'

export const researchZh: Record<string, BlogPostZh> = {
  '/blog/awesome-rsi-survey-recursive-self-improvement': {
    category: '研究',
    title: 'Awesome RSI：一张\u200b递归自我改进\u200b全景图，以及新想法从何而来',
    seoTitle: 'Awesome RSI 与我们的递归自我改进综述',
    excerpt:
      '我们阅读并整理了 140 篇递归自我改进（RSI）方向的近期工作，成果有二：一是 awesome-rsi，一份开放的领域索引；二是一篇综述，从两个视角审视这一领域：把它看作一个共享的设计空间，以及对照 RSI 方法所对应的深度学习思想。',
    metaDescription:
      'awesome-rsi 是一份开放索引，收录递归自我改进（RSI）领域的方法、基准与系统。我们的综述梳理了 140 篇工作，将 RSI 映射到一个由九个设计维度构成的设计空间，并置于深度学习的发展脉络中加以审视。',
    visualLabel: 'Awesome RSI',
    visualSteps: ['执行任务', '收集轨迹', '从反馈中学习', '更新自身状态', '复用新状态'],
    tags: ['递归自我改进', 'awesome-rsi', '综述', 'Agent 自进化', '研究'],
    content: [
      {
        body: [
          'LlamaFactory 是我们开源的语言模型微调框架，GitHub 星标数已突破 70,000。现在，我们正在为递归自我改进（RSI）打造与之对应的框架：一个统一、高效、稳定且灵活的 Agent 自进化框架。动手之前，我们希望先把这个领域真正弄清楚。',
          '于是，我们阅读并整理了 140 篇 RSI 方向的近期工作，并由此产出两项成果：一是 awesome-rsi，一份任何人都可以浏览和筛选的 RSI 研究开放索引；二是一篇综述论文《From Existing Methods to New Research Ideas: Two Perspectives on Recursive Self-Improvement》（从现有方法到新研究思路：递归自我改进的两种视角）。',
        ],
      },
      {
        blocks: [
          {
            type: 'image',
            src: '/blog-assets/paper-rsi-survey-first-page.webp',
            alt: '综述首页：论文标题，来自 PrismShadow、北京大学、浙江大学和纽约大学的作者，以及摘要。',
            width: 1380,
            height: 1120,
            caption: '综述首页，arXiv:2610.14625。',
          },
        ],
        links: [{ label: '在 arXiv 阅读综述', href: 'https://arxiv.org/abs/2610.14625' }],
      },
      {
        heading: '什么算作 RSI',
        body: [
          '我们用这样一个循环来界定 RSI：Agent 执行任务，从轨迹和反馈中学习，更新自身状态，并在后续工作中使用更新后的状态。这里的状态可以是模型参数、harness 代码、上下文、记忆或 Skills。',
          '收录范围既包括显式的自我修改，也包括长时任务中由经验驱动的改进。方法与系统按 Agent 改进的对象分组：参数化一侧是模型参数；非参数化一侧是 harness 代码、上下文、记忆、Skills 及其他产物。',
        ],
      },
      {
        heading: '一份开放的领域索引',
        body: [
          'awesome-rsi 收录了 RSI 相关的基准、方法与系统，并随着新工作的出现持续扩充。它的网站提供中英双语版本，专为帮您找到所需论文而打造：',
        ],
        bullets: [
          '方法与系统：可按产物、拓扑、反馈等维度筛选，并跨维度组合标签，例如筛选出更新 Skills、在线运行并从环境反馈中学习的方法。',
          '基准：可按产物和评测协议（在线、离线或混合）进行比较。',
          '方法与基准的引用关系图：搜索一篇论文，即可拖拽、缩放，浏览与它相邻的工作。',
          '“理解 RSI”（Understanding RSI）：一份图文并茂的领域导读。',
        ],
        links: [
          { label: '浏览 awesome-rsi 网站', href: 'https://prism-shadow.github.io/awesome-rsi/' },
          { label: '理解 RSI', href: 'https://prism-shadow.github.io/awesome-rsi/blog/understanding-rsi/' },
          { label: '在 GitHub 查看 awesome-rsi', href: 'https://github.com/Prism-Shadow/awesome-rsi' },
        ],
      },
      {
        heading: '视角一：共享的设计空间',
        body: [
          '综述首先提出一个统一的分类体系，包含九个设计维度，分为四组：更新对象、更新组织、更新调度与范围，以及反馈与选择。',
          '这一分类体系把现有方法放进同一个设计空间。单独审视某一个维度，或考察两个维度之间如何相互作用，就能看出哪些组合已经有人尝试过、哪些还无人涉足，而新的研究思路正是从这里开始的。',
        ],
      },
      {
        heading: '视角二：深度学习早已走过这条路',
        body: [
          '第二个视角把 RSI 与传统深度学习对照来看，许多概念都能一一对应。现有的 RSI 方法已经借鉴了优化、正则化、数据增强、持续学习和对抗学习等思想；不同之处在于，如今学习的主体变成了 Agent。',
          '在此基础上，综述又从更具体的学习机制以及演化计算中，引申出更多新想法。如果 RSI 当下面临的某个问题，深度学习早已遇到过，那么深度学习给出的答案就是一个很好的起点。',
        ],
      },
      {
        heading: '如何衡量自我改进',
        body: [
          '最后，综述回顾了现有基准如何在三种设定下评估自我改进。在线设定下，经验在任务流中不断积累，供后续工作使用；离线设定下，先完成进化，再进行独立的留出评估；离线到在线设定下，离线构建的产物在实际使用中继续进化。',
          '如何在真实业务工作中公平地衡量自我改进，正是我们自己的基准 GDPevo 要解决的问题。',
        ],
      },
      {
        heading: '阅读、使用、共建',
        body: [
          '综述为这些方法绘制了地图，GDPevo 负责衡量它们，PenguinHarness 则以插件形式运行它们。如果您正在研究自进化 Agent，欢迎与我们联系：无论是我们遗漏的论文，还是这个设计空间启发您想到的新点子，我们都很想听到。',
        ],
        links: [
          { label: '在 arXiv 阅读综述', href: 'https://arxiv.org/abs/2610.14625' },
          { label: '在 GitHub 查看 awesome-rsi', href: 'https://github.com/Prism-Shadow/awesome-rsi' },
          { label: 'GDPevo：衡量 Agent 自进化', href: '/blog/gdpevo-benchmark-agent-self-evolution' },
          { label: 'PenguinHarness：所有 RSI 算法，尽在一个框架', href: '/blog/introducing-penguinharness' },
        ],
      },
    ],
  },
  '/blog/gdpevo-benchmark-agent-self-evolution': {
    category: '研究',
    title: 'GDPevo：在真实业务任务上\u200b衡量 Agent 自进化',
    seoTitle: 'GDPevo：面向真实业务任务的 Agent 自进化基准',
    excerpt:
      'Agent 能否从少量示例中学会一家企业的业务规则，并把它们用到从未见过的案例上？GDPevo 衡量的正是这一点：240 个企业任务，配有留出测试和基于规则的评分，并在记录准确率的同时记录成本。',
    metaDescription:
      'GDPevo 是一个开放的 Agent 自进化基准，聚焦与 GDP 相关的企业工作：覆盖六大领域的 240 个任务，以规则杂交（rule hybridization）确保提升可归因，采用基于规则的评分，并给出主流 Agent 的评测结果。',
    visualLabel: 'GDPevo',
    visualSteps: ['种子场景', '原子规则', '5 个训练任务', '5 个留出测试', '基于规则的评分', '准确率与成本'],
    tags: ['GDPevo', '基准测试', 'Agent 自进化', '递归自我改进', '企业 AI'],
    content: [
      {
        body: [
          'Agent 自进化，是指 Agent 根据过往经验更新自身的持久状态，并复用这些状态，把相关任务做得更好。换句话说，Agent 做您的工作越久，就做得越好。要构建更好的自进化方法，首先得能衡量自进化，而这件事其实并不容易。',
          '现有基准覆盖的高经济价值领域很少；它们在设计训练任务和测试任务时，也很少确保测试上的提升能归因于 Agent 在训练中学到的东西；此外，它们还面临数据污染的风险。GDPevo 是我们给出的答案：一个原生面向进化的基准，立足于与 GDP 相关的企业工作流，并配有一条全自动生成它的流水线。',
        ],
      },
      {
        blocks: [
          {
            type: 'image',
            src: '/blog-assets/paper-gdpevo-first-page.webp',
            alt: 'GDPevo 论文首页：论文标题，来自 PrismShadow 和纽约大学的作者，摘要，以及引言的开头部分。',
            width: 1275,
            height: 1650,
            caption: 'GDPevo 论文首页，arXiv:2608.03764。',
          },
        ],
        links: [{ label: '在 arXiv 阅读 GDPevo 论文', href: 'https://arxiv.org/abs/2608.03764' }],
      },
      {
        heading: '规则杂交：让提升可以归因',
        body: [
          '规则杂交（rule hybridization）是 GDPevo 的核心机制，它借鉴了遗传算法中的交叉操作。每个企业工作流都被拆解为若干原子业务规则，这些规则的不同子集分散在五个训练任务中，每个训练任务只呈现其中一部分；五个留出测试任务则以新的方式重新组合这些规则。',
          '例如，在一个 CRM 任务组中，训练任务里暗藏了赞助方状态的优先级顺序和一条黑名单策略，而某个测试任务会同时触发这两条规则。在一个 ERP 任务组中，训练任务暗藏的是供应商风控规则，以及每条规则对应的处置方式。只会记住训练答案的 Agent，在测试集上毫无收获；真正学会规则的 Agent，才能有所提升。正因如此，这部分提升才能归因于自进化。',
        ],
      },
      {
        heading: '由 Agent 端到端构建',
        body: [
          '人只需设计一次流程，之后由 Agent 来执行。这让基准始终跑在数据污染前面：它产出新任务的速度，快过模型记住泄露答案的速度；同时，任务集也能在不增加人力的情况下持续扩充。',
        ],
        bullets: [
          '种子场景来自公开的真实业务基准：GDPval、SOP-Bench 和 JobBench。',
          'Agent 把每个场景转化为一个任务组：一个共享的业务环境、五个训练任务和五个测试任务，每个任务都配有基于规则的评分脚本。',
          '校准 Agent 只保留那些 Agent 进化后得分明显高于进化前的任务组。',
          '六个相互独立的审核 Agent 会逐一审查每个任务组，检查文件是否完整、隐藏规则是否真正埋入。一个任务组至少获得五票通过，才会被采纳。',
        ],
      },
      {
        body: [
          '首个版本包含 12 个任务组、共 120 个任务。由于流水线完全自动化，它在两天内就把任务集扩充到了 24 个任务组、共 240 个任务。',
        ],
      },
      {
        heading: '六大领域，240 个任务',
        body: [
          'GDPevo 覆盖企业日常工作的六大领域：CRM、ERP 和财务，以及法务（企业并购时审查合同）、医疗（患者转院前准备好病历资料）和数据处理（在分析之前清洗杂乱的数据集）。每个任务组都包含一个共享环境、五个训练任务和五个留出测试任务。',
        ],
      },
      {
        heading: '分数可复现，成本与准确率并列',
        body: [
          'GDPevo 使用确定性规则评分，而不是 LLM 评审。每个分数都由若干得分点构成，因此同一份答案总能得到相同的分数，每一次失分也都能准确指出漏掉了哪条规则。这让基准变成了一个诊断工具：从失分点出发回溯 Agent 的 Trace，您就知道下一步该改进什么。',
          '准确率并不是唯一重要的指标。好的自进化策略还应让 Agent 的运行成本更低，就像人通过练习不仅做得更好，也做得更快。每次运行都会在记录准确率的同时，记录 token 用量、成本和轮次数。',
        ],
      },
      {
        heading: '四种进化方式',
        body: ['每个 Agent（即运行在某个 harness 中的模型）都在四种模式下接受评测：'],
        bullets: [
          'base：直接运行测试任务，不经过任何进化步骤。',
          'self：在没有训练答案的情况下，仅根据训练输入和环境，自行进化工作策略。',
          'fewshot：以训练输入及其标准答案作为示范进行学习。',
          'reflect-3：依据一个仅用于训练任务的评审所给出的反馈反复迭代，再把进化出的工作流固化下来。',
        ],
      },
      {
        heading: '我们的发现',
        body: [
          '论文在全部 24 个任务组上，以这四种模式评测了四个 Agent，每组实验运行三次。下表为留出测试准确率（三次运行的平均值）：',
        ],
        table: {
          headers: ['Harness', '模型', 'base', 'self', 'fewshot', 'reflect-3'],
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
          '自进化提升了每个 Agent 的留出测试准确率，最高提升 16.44 个百分点（Claude Code 搭配 Opus 4.8，fewshot 模式）。然而，即便是进化后表现最好的 Agent，也仍远低于信息完全情况下 91.6% 的上限。如今的 Agent 已经能够从经验中学习，但它们的自进化能力还远未充分释放，而这道差距正是机会所在。',
          '项目排行榜仍在持续扩充，目前已收录六个 Agent，并提供分任务组明细、技能迁移热力图和雷达图。',
        ],
      },
      {
        heading: '用它评测您的 Agent',
        body: [
          '流水线、基准和完整的评测结果均已开放。欢迎带上您自己的 Agent，或您自己的业务场景。GDPevo Essential 的六个场景也已作为内置的 Train 与 Test Benchmark 集成在 PenguinHarness 中，您可以用任意 RSI 算法，在这些 Benchmark 上进化 Agent。',
        ],
        links: [
          { label: '在 arXiv 阅读 GDPevo 论文', href: 'https://arxiv.org/abs/2608.03764' },
          { label: '在 GitHub 查看 GDPevo', href: 'https://github.com/Prism-Shadow/GDPevo' },
          { label: '排行榜与项目网站', href: 'https://prism-shadow.github.io/GDPevo/' },
          { label: 'PenguinHarness：所有 RSI 算法，尽在一个框架', href: '/blog/introducing-penguinharness' },
        ],
      },
    ],
  },
  '/blog/introducing-penguinharness': {
    category: '研究',
    title: 'PenguinHarness：所有 RSI 算法，尽在一个开源框架',
    seoTitle: 'PenguinHarness：开源的 Agent 自进化框架',
    excerpt:
      'PenguinHarness 以插件形式，将所有 RSI 算法和 Benchmark 汇集到同一个开源框架中，可运行在任意模型上。只需一句话，Agent 就能构建 Agent，并逐轮进化它们，而成本只是通常的一小部分。',
    metaDescription:
      'PenguinHarness 是 LlamaFactory 背后团队打造的开源 Agent 自进化框架：九种 RSI 算法和十七个 Benchmark 均以插件形式提供，支持 1000+ 模型，配有桌面应用，并以 Claude Code 1/70 的成本取得了最高的数据分析准确率。',
    visualLabel: 'PenguinHarness',
    visualSteps: ['选择算法', '选择 Benchmark', 'Evaluators 评分', '定位失分点', '打快照', '版本 N+1'],
    tags: ['PenguinHarness', '递归自我改进', 'Agent 自进化', '开源', 'Agent Harness'],
    content: [
      {
        blocks: [
          {
            type: 'paragraph',
            text: 'LlamaFactory 把微调所需的数据、模型、算法和评测整合进一个开源框架，GitHub 星标数已突破 70,000。PenguinHarness 要为递归自我改进（RSI）做同样的事。它是一个开源（Apache 2.0）的多 Agent 框架，专为 Agent 自进化而生，GitHub 星标数已突破 3,000。它背后的理念，一句话就能说清：',
          },
          {
            type: 'quote',
            text: '用 LangChain，您得亲手构建 Agent，速度是 1×；用 PenguinHarness，由 Agent 来构建 Agent，速度是 100×。',
          },
          {
            type: 'paragraph',
            text: '模型保持不变，进化的是 harness：提示词、Skills、工具和 hooks。PenguinHarness 以桌面应用、Web App、CLI 和 SDK 的形式运行在您自己的电脑或服务器上，可接入 1000+ 模型。',
          },
        ],
      },
      {
        heading: '我们为什么要做 PenguinHarness',
        body: [
          '在 PenguinHarness 之前，我们团队打造了 GDPevo 基准，并借助它系统地验证了一件事：Agent 能够自进化。Agent 可以给自己的表现打分，找出失分之处，改写自己的提示词和 Skills，并让每个新版本的得分都更高。',
          '自进化不应只是论文里的一条曲线，而应成为每位开发者、每家企业都能开箱即用的基础设施；研究者也需要一个统一的平台来运行和比较各种 RSI 方法，而不必逐一重新实现。PenguinHarness 正是为同时满足这两点而打造的。',
        ],
        links: [{ label: 'GDPevo：衡量 Agent 自进化', href: '/blog/gdpevo-benchmark-agent-self-evolution' }],
      },
      {
        heading: '每个算法都是插件',
        body: [
          'PenguinHarness 遵循一条原则：一切皆插件。每个 RSI 算法、每个 Benchmark 都是与其他部分解耦的插件，因此您可以任选一种算法，用它进化运行在任意模型上的任意 Agent。目前已内置九种算法，它们共用同一套 Benchmark、记分板和快照：',
        ],
        table: {
          headers: ['工具包', '算法'],
          rows: [
            ['default-rsi-toolkit', '试验、反思、改进：每轮只提出一个假设、做一处改动'],
            ['opro-rsi-toolkit', 'OPRO：基于历史指令及其得分生成新指令'],
            ['ape-rsi-toolkit', 'APE：从示例中归纳出候选指令'],
            ['ace-rsi-toolkit', 'ACE：从 Traces 中提炼经验，整理成一本操作手册'],
            ['awm-rsi-toolkit', 'AWM：从成功的运行中归纳出工作流'],
            ['skilladam-rsi-toolkit', 'SkillAdam：持续演进的问题追踪表，以及自适应的 Skill 编辑预算'],
            ['skillopt-rsi-toolkit', 'SkillOpt：有界的 Skill 编辑、基于得分的选择，以及跨 epoch 的反思'],
            ['openskill-rsi-toolkit', 'OpenSkill：在冻结 State 进行评测之前，先做外部调研和独立的虚拟测试'],
            ['trace-rsi-toolkit', 'TRACE：基于对比轨迹进化技能库，并度量一致性'],
          ],
        },
      },
      {
        body: [
          '每个新建的 Project 都内置十七个 Benchmark，以 Harbor 任务的形式在 Docker 中运行：其中 PenguinHarness Benchmark Sec A 至 Sec E 基于 rag-bench-essential、DeepSWE、AutomationBench、Terminal-Bench-Science 和 Terminal-Bench 构建；此外，GDPevo Essential 的六个场景各有一对 Train 与 Test Benchmark。我们的目标是让算法和 Benchmark 的数量突破 100 个。',
        ],
      },
      {
        heading: '逐轮自进化',
        body: [
          '选定一种算法和一个 Benchmark，一个 Agent 就会逐轮改进另一个 Agent。每个候选都是一个新版本，改动之前会先打快照，每一次得分都会汇入 Evaluation Center。每一轮中：',
        ],
        bullets: [
          'Optimizer 并行运行多个 Evaluators，为 Agent 打分。',
          'Optimizer 根据得分和运行 Traces，找出失分之处。',
          'Optimizer 把 Agent 从版本 N 升级到版本 N+1。',
        ],
      },
      {
        body: [
          '在一个演示中，一个决策 Agent 先接受评测，修订一次工作方法后，在同一模型上重新测试，得分从 84 分提升到 100 分。每次运行的成本都显示在屏幕上，每个请求都可以在 Trajectory 页面上回放。',
        ],
      },
      {
        heading: '复杂任务表现更好，成本更低',
        blocks: [
          {
            type: 'paragraph',
            text: 'PenguinHarness 刻意采用极简的工具集，构建在简洁的底层接口之上，因此工具调用更少，Token 消耗也更少。它还针对 DeepSeek 等开源模型做了深度调优。',
          },
          {
            type: 'paragraph',
            text: '我们在两套测试集上将它与 Claude Code 和 OpenAI Codex 正面对比，这两套测试集最早随 PenguinHarness 0.1.0 一同发布。每个 harness 都搭配其通常使用的模型运行，因此对比反映的是用户实际使用这些产品时的情况。',
          },
          {
            type: 'image',
            src: '/blog-assets/penguinharness-benchmark.svg',
            alt: '基准测试结果：PenguinHarness 在数据分析测试集上领先，在编程测试集上与 OpenAI Codex 持平，而成本仅为两个对手的一小部分。',
            width: 920,
            height: 368,
            caption:
              '两套测试集上的准确率与总成本。PenguinHarness 使用 DeepSeek V4 Pro，Claude Code 使用 Claude Opus 4.8，OpenAI Codex 使用 GPT-5.5。',
          },
        ],
      },
      {
        heading: '复杂数据分析',
        level: 3,
        body: ['共 15 个任务，每个任务运行一次。PenguinHarness 和 OpenAI Codex 的思考等级为 xhigh，Claude Code 为 max。'],
        table: {
          headers: ['框架', '模型', '准确率（%）', 'Token（M）', '成本（$）'],
          rows: [
            ['PenguinHarness', 'DeepSeek V4 Pro', '66.67', '18.04', '0.55'],
            ['Claude Code', 'Claude Opus 4.8', '53.33', '22.20', '38.48'],
            ['OpenAI Codex', 'GPT-5.5', '53.33', '13.72', '19.41'],
          ],
        },
      },
      {
        heading: '编程',
        level: 3,
        body: ['40 个任务 × 2 次运行；准确率按全部 80 个结果计算。'],
        table: {
          headers: ['框架', '模型', '准确率（%）', 'Token（M）', '成本（$）'],
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
          'Token 和成本均为整套测试集的总计，而非单次运行的平均值。在数据分析上，PenguinHarness 的准确率是三者中最高的，达到 66.67%，另外两者均为 53.33%；而它的花费仅为 Codex 的 1/35、Claude Code 的 1/70。在编程上，它以 71.25% 与 Codex 持平，落后于 Claude Code 的 86.25%，但跑完整套测试集只花了 $3.81，而 Codex 花了 $220.08，Claude Code 花了 $146.97。完成的工作相当，账单却相差一到两个数量级。',
        ],
      },
      {
        heading: '一句话构建 Agent 应用',
        blocks: [
          {
            type: 'paragraph',
            text: '只需输入一句话，Agent 就会端到端地为您构建完整的 Agent 应用：脚手架、代码和运行说明一应俱全。例如：',
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
            text: '最终成品是一个文档专家：具备检索能力，引用的来源可直接链接到原始文件，还内置了示例问题：',
          },
          {
            type: 'image',
            src: '/blog-assets/penguinharness-rag-app.webp',
            alt: '生成的 RAG 应用：一个 Claude Code 文档专家正在回答关于 MCP 服务器的问题，附有可点击的引用来源和示例问题。',
            width: 1920,
            height: 1140,
            caption: 'PenguinHarness 根据这一句话生成的 RAG 应用。',
          },
          {
            type: 'paragraph',
            text: '在 DeepSeek V4 Pro 上，生成整个 RAG 应用共消耗了 $0.02（¥0.2）的 Token。',
          },
        ],
      },
      {
        heading: '进化有边界，安全第一',
        body: ['人们对自进化最大的担忧是失控。PenguinHarness 用一份契约来回应这一担忧，即 CONTRACT.md：'],
        bullets: [
          '进化严格限定在 Workspace 和 Skills 范围内。harness 核心作为安全边界，永远不会被修改。',
          '工具调用须先经过审批，每次审批都会留下审计记录。',
          '任何有风险的改动之前都会先打版本快照，因此任何一轮进化都可以回滚。',
          'PenguinHarness 完全开源并在本地部署，除了发送给您所配置的模型服务商的请求之外，您的数据始终留在您自己的机器上，满足企业的数据安全要求。',
        ],
      },
      {
        heading: '开始使用',
        blocks: [
          {
            type: 'paragraph',
            text: '您可以从官网下载 macOS、Windows 或 Linux 版桌面应用，打开即已登录，无需使用终端。也可以安装 CLI，然后启动 Web App：',
          },
          {
            type: 'code',
            lines: ['curl -fsSL https://penguin.ooo/install.sh | sh', 'penguin web        # opens http://127.0.0.1:7364'],
          },
          {
            type: 'paragraph',
            text: '在 Windows 上，请改用 PowerShell 安装：',
          },
          {
            type: 'code',
            lines: ['irm https://penguin.ooo/install.ps1 | iex'],
          },
          {
            type: 'paragraph',
            text: '打开 Models 页面，为某个模型服务商添加 API 密钥，并将其中一个模型设为默认模型。然后，给 Agent 布置第一个任务，或者打开一个 Benchmark，开始进化。',
          },
        ],
        links: [{ label: '下载桌面应用', href: 'https://penguin.ooo/download' }],
      },
      {
        heading: '加入社区',
        body: [
          '一个能自我改进的 harness，需要一个与它共同成长的社区。欢迎参与讨论、提出功能需求、参与贡献；提交您的第一个 issue，就是一个很好的开始。',
        ],
        links: [
          { label: 'Discord：与我们和其他开发者交流', href: 'https://discord.gg/eFHKqqcU3D' },
          { label: 'X（Twitter）：获取最新动态', href: 'https://x.com/code_hiyouga' },
          {
            label: '微信群：中文社区',
            href: 'https://github.com/Prism-Shadow/penguin-harness-community/blob/main/assets/wechat/penguin.jpg',
          },
          { label: 'GitHub：点 Star、提 Issue、发 Pull Request', href: 'https://github.com/Prism-Shadow/penguin-harness' },
        ],
      },
      {
        heading: '相关链接',
        kind: 'sources',
        links: [
          { label: 'PenguinHarness 官网', href: 'https://penguin.ooo/' },
          { label: 'PenguinHarness GitHub 仓库', href: 'https://github.com/Prism-Shadow/penguin-harness' },
          { label: '文档', href: 'https://penguin.ooo/docs/' },
          { label: 'penguin.ooo 上的 0.1.0 版本发布博文', href: 'https://penguin.ooo/blog/introducing-penguinharness' },
          { label: 'penguin-harness-benchmark 仓库', href: 'https://github.com/Prism-Shadow/penguin-harness-benchmark' },
        ],
      },
    ],
  },
  '/blog/amsp-mmsp-message-stream-protocols': {
    category: 'Agent 基础设施',
    title: 'AMSP 与 MMSP：一套消息协议，贯通模型调用与 Agent Session',
    seoTitle: 'AMSP 与 MMSP：面向模型与 Agent 的消息流协议',
    excerpt:
      '每家模型 API 都有自己的流式输出方式，每个 Agent harness 也都有自己记录 Session 的方式。MMSP 让每一次模型调用都具有统一的形态；构建于其上的 AMSP，则为每个 Agent Session 提供一套极简协议：可观测、可恢复，并能流式传输到任意前端。',
    metaDescription:
      'MMSP（Model Message Stream Protocol，模型消息流协议）为所有模型服务商提供统一的消息格式和流式语法。AMSP（Agent Message Stream Protocol，Agent 消息流协议）在此基础上，负责在 PenguinHarness 中流式传输、存储和恢复 Agent Session。',
    visualLabel: 'AMSP · MMSP',
    visualSteps: ['UniConfig', 'UniMessage', 'UniEvent', 'task_begin', 'request_begin', 'task_end'],
    tags: ['AMSP', 'MMSP', 'Agent 基础设施', '协议', 'PenguinHarness'],
    content: [
      {
        body: [
          'PenguinHarness 的底层有两套协议。MMSP（Model Message Stream Protocol，模型消息流协议）让每一次模型调用都具有统一的形态，无论背后是哪家服务商。AMSP（Agent Message Stream Protocol，Agent 消息流协议）构建在 MMSP 之上，为整个 Agent Session 提供一种极简格式：运行时可实时观察，连接断开后可恢复，能够打通前端与后端，并通过同一个接口调用众多模型。两套协议均已开源。',
        ],
      },
      {
        heading: '别再为差异交“税”',
        body: [
          '无论是模型 API，还是 Agent Session 记录，都没有统一的格式。Anthropic 流式输出的是 content block，OpenAI 是 output item，Gemini 是 step，而每个 harness 都会写出自己的运行记录。一旦更换模型或 harness，您就得重新适配代码，每次都在为这些差异交“税”。',
          '代价也不只是工程时间，它还会妨碍自进化：当 Agent 挖掘过往轨迹来改进自身时，它需要一种干净、统一的格式，这样一段代码就能读取所有 Trajectory，格式本身也不会给 Agent 增添任何需要额外记住的东西。',
        ],
      },
      {
        heading: 'MMSP：所有模型调用，统一形态',
        body: [
          '各家模型 API 在基本构件上是一致的：消息、思考、工具调用、流式输出。分歧在于编码方式：以 Chat Completions 为例，它流式返回的 chunk 并不标明自己属于什么。MMSP 按照每家服务商自己的规则来解析，再以统一的形态交给您的代码；它提供行为一致的 Python 包和 TypeScript 包。您收发的所有内容，都是以下三种普通对象之一：',
        ],
        bullets: [
          'UniConfig：一次请求的配置项，例如工具、思考等级和系统提示词。',
          'UniMessage：对话中的一条消息，来自用户或助手，包含完整的内容项。',
          'UniEvent：流式响应中的一个事件。一个流由若干增量（delta）事件组成，并以恰好一个 stop 事件结束，stop 事件携带 token 用量和结束原因。',
        ],
      },
      {
        blocks: [
          {
            type: 'paragraph',
            text: '对于服务商发来、您的代码用不上、但服务商要求原样传回的内容（例如思考签名），MMSP 会将其作为 fidelity 随内容项一并携带。有状态调用把历史记录保存在客户端，因此前几轮的思考和工具调用会按原样回传给模型，这正是 Agent 循环所需要的：',
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
            text: '只需更换模型 id，同一段代码就会打印出相同形态的结果。',
          },
        ],
        links: [
          { label: 'MMSP 文档', href: 'https://mmsp.penguin.ooo/' },
          { label: 'MMSP 快速上手', href: 'https://mmsp.penguin.ooo/docs/quickstart/' },
          { label: '在 GitHub 查看 MMSP', href: 'https://github.com/Prism-Shadow/model-message-stream-protocol' },
        ],
      },
      {
        heading: 'AMSP：一套协议，覆盖整个 Session',
        body: [
          'MMSP 覆盖单次模型调用；AMSP 则覆盖 Agent 的整个 Session，包括其中的多次模型调用、这些调用所运行的工具、审批、上下文压缩和子 Agent。我们在从零构建 harness 的过程中，对它进行了一轮又一轮的打磨。它可以扩展到数百个模型，如今 PenguinHarness 中的每个 Session 都运行在它之上。',
        ],
      },
      {
        heading: 'Session 如何流式传输',
        body: [
          '一次运行嵌套着三层跨度，从长到短依次是：Task，即一条提示词的完整运行；发往模型的每个 Request；以及填充每个 Request 的消息。task_begin 和 task_end 包裹一个 Task，request_begin 和 request_end 包裹每个 Request。',
        ],
        bullets: [
          '流就是 Trace，再加上片段。每条记录都与 Session 的 Trace 中的一行逐字节一致，传输途中不做任何转换。',
          '一条消息先以 partial_* 片段（start、delta、stop）的形式流式传输，随后完整记录到达并取代这些片段。只有这些片段仅存在于实时流中。',
          '记录共有三种：session_meta 开启一个模型上下文；model_msg 承载文本、思考、工具调用及其输出；event_msg 标记 Task、Request、token 用量、审批、hooks、上下文压缩和中止。',
          '客户端会忽略自己不认识的记录类型或字段，因此协议可以持续扩展，而不会破坏现有的读取方。',
        ],
      },
      {
        heading: '观测、恢复、连接',
        body: [
          '记录以 server-sent events 的形式传输，每条都带有一个 id。连接断开后，客户端只需把最后收到的 id 作为 Last-Event-ID 发送，服务端就会重放此后的内容。每 20 秒会收到一次 ping，一次运行以 data: [DONE] 结束，因此读取方始终能知道一次运行是否已经走完。',
          '等待审批的工具调用是一种资源，调用方可以通过 HTTP 列出并答复；引擎执行的每一次调用都会生成一条 approval_decision 记录。由于 AMSP 记录就是 Session 的 Trace 中的原样行，Agent 做过的一切，都可以用同一个解析器实时观看、事后从历史记录中回读，并挖掘用于自进化。',
        ],
      },
      {
        heading: '动手试试',
        blocks: [
          {
            type: 'paragraph',
            text: '在 PenguinHarness 中，打开某个 Agent 的 API 标签页，开启 API 访问并创建密钥。然后安装 SDK，它没有任何依赖，可运行在 Node 24 和浏览器中：',
          },
          {
            type: 'code',
            lines: ['npm install @prismshadow/amsp'],
          },
          {
            type: 'paragraph',
            text: '流式运行一次，然后在同一个 Session 中沿用相同的上下文继续对话：',
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
        heading: '让 AMSP 走进更多 harness',
        body: [
          '如今，AMSP 已在 PenguinHarness 中稳定运行，我们希望它的价值远不止于一个 harness。如果您正在构建 Agent 或 Agent 工具，欢迎和我们一起探索如何把 AMSP 带到更多 harness 中。协议、SDK 和源代码均以 Apache-2.0 许可证开源。',
        ],
        links: [
          { label: 'AMSP 概览', href: 'https://penguin.ooo/amsp' },
          { label: 'AMSP 参考文档', href: 'https://penguin.ooo/docs/amsp/' },
          { label: 'Agent API 指南', href: 'https://penguin.ooo/docs/agent-api/' },
          { label: 'npm 上的 @prismshadow/amsp', href: 'https://www.npmjs.com/package/@prismshadow/amsp' },
          {
            label: 'GitHub 上的 AMSP 源代码',
            href: 'https://github.com/Prism-Shadow/penguin-harness/tree/main/packages/amsp',
          },
        ],
      },
    ],
  },
}
