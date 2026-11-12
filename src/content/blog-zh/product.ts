import type { BlogPostZh } from '../blogPosts'

export const productZh: Record<string, BlogPostZh> = {
  '/blog/introducing-agenthub-the-ultimate-model-sdk-for-building-high-precision-agents': {
    category: '产品动态',
    title: 'AgentHub 正式发布：构建高精度 Agent 的终极模型 SDK',
    excerpt:
      'AgentHub 是一款开源的 Python 与 TypeScript SDK，帮助您将模型接入 Agent 应用。它为每个模型版本提供专属的代码路径，透明且高精度。',
    visualLabel: 'AgentHub',
    visualImage: {
      alt: 'AgentHub 发布主视觉，标语为“一个 SDK，连接所有 SOTA LLM”。',
    },
    content: [
      {
        heading: '我们为什么要做 AgentHub',
        blocks: [
          {
            type: 'paragraph',
            text: '过去几个月，OpenClaw、HermesAgent、Pi Agent 等一批开源 Agent 相继走红。我们注意到一个共同点：这些项目都各自实现了一套定制的适配层，用来支持多家模型提供商。我们在构建自己的 Agent 时，也遇到了同样的需求。',
          },
          {
            type: 'paragraph',
            text: '在这个过程中，我们发现了两个根本性的、无法回避的挑战。',
          },
          {
            type: 'paragraph',
            lead: '模型版本之间不向后兼容。',
            text: '没有哪一套代码能够无缝支持同一模型的多个版本，哪怕是很小的更新，也可能让现有逻辑失效。例如，Claude Opus 4.7 新增了“adaptive thinking”（自适应思考）参数，同时不再支持“thinking budget”（思考预算）参数。',
          },
          {
            type: 'image',
            src: '/blog-assets/agenthub-claude-opus-thinking.png',
            alt: 'Claude API Docs 截图，显示扩展思考预算已被移除。',
            width: 2310,
            height: 934,
            caption: 'Claude API Docs：Claude Opus 4.7 移除了扩展思考预算，改用自适应思考。',
          },
          {
            type: 'paragraph',
            lead: '黑盒抽象可能损害可靠性。',
            text: '统一接口可能以牺牲稳定性为代价。例如，我们发现 OpenRouter 对 token 用量的统计并不一致：完全相同的调用，得出的结果可能相差悬殊。',
          },
          {
            type: 'image',
            src: '/blog-assets/agenthub-openrouter-token-usage.png',
            alt: '代码与终端截图，显示 OpenRouter 的 token 用量统计前后不一致。',
            width: 1440,
            height: 2698,
            caption:
              '同一个 OpenRouter 调用运行两次：推理 token 数超过了补全 token 数，两次的缓存 token 数也不相同。',
          },
          {
            type: 'paragraph',
            text: '正是这些挑战，促使我们打造了 AgentHub：一款透明、高精度的 SDK，帮助您将模型接入自己的 Agent 应用。',
          },
          {
            type: 'paragraph',
            text: 'AgentHub 是一个开源项目，同时提供 Python 和 TypeScript 两种语言的模型 API，帮助开发者在适配不同模型时节省大量时间和精力。',
          },
        ],
        links: [
          {
            label: '在 GitHub 查看 AgentHub',
            href: 'https://github.com/Prism-Shadow/AgentHub',
          },
        ],
      },
      {
        heading: '我们的设计原则',
        blocks: [
          {
            type: 'paragraph',
            lead: '简洁易用是第一位的。',
            text: 'OpenResponses 等现有方案提供了标准化接口，但学习曲线往往很陡（文档多达 10,000+ 个单词）。相比之下，AgentHub 的文档不到 1,000 个单词。它提供统一的异步流式接口，开放模型的各项前沿能力，包括结合工具调用的推理、图像理解、图像生成和语音生成。',
          },
          {
            type: 'image',
            src: '/blog-assets/agenthub-sdk-architecture.png',
            alt: 'AgentHub SDK 架构图，展示统一的配置、消息与事件。',
            width: 1500,
            height: 780,
            caption:
              '一个异步流式接口，适用于所有已支持的模型：输入 UniConfig 和 UniMessage，输出 UniEvent 事件流。',
          },
          {
            type: 'paragraph',
            lead: '准确性不容妥协。',
            text: '哪怕是思考等级这样细微的参数差异，也可能显著影响模型表现。因此，AgentHub 的每个代码文件只支持一个模型版本，不同版本分别由完全独立的代码路径实现。这样做虽然限制了可支持的版本数量，但相比覆盖面，我们更看重正确性和性能。',
          },
          {
            type: 'paragraph',
            lead: '为长时间运行的 Agent 提供轻量级可观测性。',
            text: 'AgentHub 内置追踪器（tracer），可记录长程 Agent 任务的每一步，并提供详细的成本追踪。开发者无需依赖重量级数据库，就能快速定位任务失败的根本原因。在 Agent 时代，它可以作为 Langfuse 等工具的轻量级替代方案。',
          },
          {
            type: 'image',
            src: '/blog-assets/agenthub-trace-ui.png',
            alt: 'AgentHub 追踪界面截图，展示模型的工具调用与 token 明细。',
            width: 2046,
            height: 1768,
            caption:
              '内置追踪器记录每一轮的请求、每一次工具调用、耗时，以及提示词、思考和回复的 token 数。',
          },
        ],
      },
      {
        heading: '实际成效',
        body: [
          'AgentHub 显著提升了我们内部的开发效率。如今，团队里的每一款 Agent 产品都以 AgentHub 为起点。',
        ],
        bullets: [
          '模型接入时间从数天缩短到几乎为零，同时免去了持续的维护开销。',
          '避免了因细微实现错误而导致的灾难性性能下降。',
          '可在几分钟内完成对数百万条执行追踪记录的根因分析，大幅加快迭代节奏。',
        ],
      },
      {
        heading: '加入讨论',
        body: [
          '如果您对 AgentHub 的开发细节或未来路线图感兴趣，欢迎加入我们的 Discord 社区参与讨论。',
          '祝您构建 Agent 愉快！🚀',
        ],
        links: [
          {
            label: '加入 PrismShadow Discord 社区',
            href: 'https://discord.gg/g5tFcYxkG2',
          },
        ],
      },
    ],
  },
  '/blog/meet-panofy-the-worlds-first-agent-training-platform': {
    category: '产品动态',
    title: '认识 Panofy：全球首个 Agent 训练平台',
    excerpt:
      'Panofy 帮助您创建、训练和管理 AI Agent，让它们理解您的上下文、遵循您的标准，并自然融入您的工作流。',
    visualLabel: 'Panofy',
    visualImage: {
      alt: '“隆重推出 Panofy”标题图。',
    },
    content: [
      {
        heading: '为什么需要 Panofy',
        body: [
          '您用 AI 已经有几个月了。可无论它听起来多么出色，它的行为依然难以掌控：它并不真正理解您的标准、您的工作流程，也不清楚您希望事情怎样完成。',
          '您是否想要这样一个 AI：不必再浪费时间反复修改输出，就能更快把事情做完？',
          '这正是 Panofy 要解决的问题。',
        ],
      },
      {
        heading: 'Panofy 是什么',
        blocks: [
          {
            type: 'paragraph',
            text: 'Panofy 是全球首个 Agent 训练平台，帮助您创建、训练和管理 AI Agent，让它们成为您业务的“第二大脑”，而且既不需要专业知识，也不需要专用硬件。Panofy 专为高合规要求的场景设计，让您可以组建一支个性化的 Agent 团队：它们理解您的上下文，遵循您的标准，并自然融入您的工作流。只需几分钟，您就能部署好 Agent，获得更一致、更可靠、值得信赖的输出。',
          },
          {
            type: 'paragraph',
            text: '我们希望帮助您跳出一次性的问答，尽可能降低模型侧的不确定性，让 AI 成为您工作流中可靠的一环。',
          },
          {
            type: 'image',
            src: '/blog-assets/panofy-stop-prompting-start-training.png',
            alt: 'Panofy 对比图：反复编写提示词与一次性训练 Agent。',
            width: 1280,
            height: 720,
            caption:
              '告别反复提示，转向一次训练：只需训练一次 Panofy Agent，无需每次都重新向通用助手编写提示词。',
          },
        ],
      },
      {
        heading: 'Panofy 如何帮您实现这一目标',
        body: [
          '借助 Panofy 的 Agent 训练功能，您可以定义 Agent 的角色、职责范围、语气和输出风格，再上传 SOP、规范指南、Wiki、知识库、参考资料等文件。训练完成后，Agent 会掌握您的个人偏好，您不必在每次会话中从头开始。Panofy 让 Agent 训练变得简单，同时帮助您降低沟通成本和 token 消耗。',
          '长期记忆让您的 Agent 随时间保持连贯。它会把真正重要的上下文延续下去，包括您的标准、偏好和工作方式。因此，Agent 用得越久，就越个性化、越一致，也越有价值。',
          '对企业而言，单个 AI 助手往往不够用。真实的工作流涉及多个角色、并行任务和跨职能团队，这正是 Panofy Agent 集群（Agent Swarm）的用武之地。借助 Agent 集群，您可以在同一个平台上构建和管理多个 Agent，每个 Agent 都可以拥有自己的角色、记忆和知识库，覆盖从写作、研究到报告、支持等各类工作。您不必再依赖一个通用助手，而是可以把工作分派给为特定任务打造的专业 Agent。',
        ],
      },
      {
        heading: '无缝协作',
        body: [
          'Panofy 为协作而生。您可以邀请同事加入平台，安全地共享训练好的 Agent，让整个团队的工作保持一致。借助共享任务历史、回放模式和灵活的权限控制，每个人都能用上按您的标准训练出的 Agent，无需从头重建上下文。Panofy 正是以这种方式，把个人的专业经验转化为整个组织共享、随时可用的资源。',
        ],
      },
      {
        heading: '应用场景',
        body: [
          'Panofy 面向对精准度和领域可靠性有严格要求的用户与团队，而这恰恰是通用 AI 常常力有不逮的地方。常见场景包括自动化工作流、企业知识问答和私有知识研究。',
          '在医疗健康领域，经 Panofy 训练的 Agent 在患者筛查中达到了专家级水平，响应速度提升 70%，并带来 3 倍的收入增长。在旅行行业，团队借助 Panofy 实现了营销活动生成、多渠道分发和实时优化的自动化，将运营成本降至原来的八分之一，同时获客量提升 160%。',
          '这只是其中两个例子。无论您身处金融、法律、教育还是运营领域，只要您的工作需要准确性、一致性和领域知识，Panofy 就是为您打造的。',
        ],
      },
      {
        heading: '为什么选择 Panofy',
        blocks: [
          {
            type: 'heading',
            text: 'Panofy vs. 通用 Agent',
          },
          {
            type: 'paragraph',
            text: '通用 AI 工具擅长处理宽泛的任务，但缺乏领域专长、经常产生幻觉、工具能力有限，推理也往往流于表面。Panofy Agent 基于您的知识训练而成，具备长期记忆，能够交付一致、可靠的结果。',
          },
          {
            type: 'heading',
            text: 'Panofy vs. OpenClaw',
          },
          {
            type: 'paragraph',
            text: 'OpenClaw 这类系统足够灵活，但配置复杂、运行成本更高、缺少安全沙箱，还难以应对上下文爆炸。Panofy 运行在安全的云端环境中：无需配置，成本更低，开箱即用。',
          },
          {
            type: 'image',
            src: '/blog-assets/panofy-comparison.png',
            alt: '通用 Agent、Panofy 与 OpenClaw 的对比图。',
            width: 1280,
            height: 609,
            caption:
              'Panofy 与通用 Agent、OpenClaw 对比：一键训练、持续学习、安全的云端环境，以及高效的上下文压缩。',
          },
        ],
      },
      {
        heading: '开始使用 Panofy',
        body: [
          'Panofy 现已上线。您可以先免费试用 7 天，几分钟内就能训练出第一个 Agent。',
          '升级到 Panofy Pro，即可解锁高级功能、更高的用量上限和优先支持。',
        ],
        links: [
          {
            label: '免费试用 Panofy',
            href: 'https://panofy.ai/',
          },
        ],
      },
      {
        heading: '关于我们',
        body: [
          '我们是 PrismShadow，一家由 LlamaFactory 背后团队带领的年轻创业公司。LlamaFactory 是 GitHub 上最受欢迎的开源 LLM 训练框架之一，已收获近 70,000 个星标。我们的平台仍在快速迭代，我们会持续打磨产品，更好地适应快速变化的用户需求。如果您在使用中遇到任何问题或有任何反馈，欢迎通过我们的官方社交渠道联系我们，或加入我们的 Discord 社区。感谢您的支持。',
        ],
        links: [
          {
            label: '加入 PrismShadow Discord 社区',
            href: 'https://discord.gg/g5tFcYxkG2',
          },
        ],
      },
    ],
  },
}
