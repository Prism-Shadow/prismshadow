import type { Locale } from '../i18n'
import { defaultSeoDescription, defaultSeoTitle } from './site'

export type SeoMetadata = {
  canonicalPath?: string
  description: string
  image?: string
  title: string
}

type LocalizedSeoMetadata = Record<Locale, SeoMetadata>

const localize = (
  en: SeoMetadata,
  zh: SeoMetadata = en,
): LocalizedSeoMetadata => ({ en, zh })

export const normalizeSeoPath = (pathname: string) =>
  pathname.replace(/\/+$/, '') || '/'

export const routeSeoMetadata = {
  '/': localize(
    {
      title: defaultSeoTitle,
      description: defaultSeoDescription,
    },
    {
      title: 'PrismShadow | 企业级自进化 AI 平台',
      description:
        'PrismShadow 提供一体化的数据生产、模型训练和 Agent 自进化平台，帮助企业构建并持续优化 AI 工作流与 AutoResearch 自主科研系统，降低人力成本，提高产出能力。',
    },
  ),
  '/platform': localize(
    {
      title: 'The PrismShadow Platform | Data, Training and Agent Self-Evolution',
      description:
        'One platform for data distillation and environment synthesis, model training and private deployment, self-evolving Agent Teams and AutoResearch: 90%+ accuracy on specialized tasks at about 1/30 the model-call cost of Claude Code.',
    },
    {
      title: 'PrismShadow 平台 | 数据生产、模型训练与 Agent 自进化',
      description:
        '一个平台覆盖数据蒸馏与环境合成、模型训练与本地部署、自进化 Agent Team 与 AutoResearch：专项任务准确率 90%+，模型调用成本约为 Claude Code 的 1/30。',
    },
  ),
  '/customers': localize(
    {
      title: 'Customers | PrismShadow in Production',
      description:
        'How Cobo Wallet, Subconscious.ai and enterprises in semiconductors, pharma and healthcare run PrismShadow in production: higher agent success, 70B and 14B models, AutoResearch for drug R&D.',
    },
    {
      title: '客户案例 | PrismShadow',
      description:
        'Cobo Wallet、Subconscious.ai 以及半导体、制药、健康体检企业如何在生产环境中使用 PrismShadow：更高的 Agent 成功率、70B 与 14B 模型、药物研发 AutoResearch。',
    },
  ),
  '/people': localize(
    {
      title: 'People | The Team Behind LlamaFactory | PrismShadow',
      description:
        'Meet the PrismShadow founders: the creators of LlamaFactory (70K+ GitHub stars) and EasyR1, with AI leadership from IBM Research, Baidu, Alibaba, JD and ByteDance.',
    },
    {
      title: '团队 | LlamaFactory 背后的团队 | PrismShadow',
      description:
        '认识 PrismShadow 创始团队：LlamaFactory（GitHub 70K+ 星标）与 EasyR1 的作者，来自 IBM Research、百度、阿里巴巴、京东与字节跳动的 AI 领军者。',
    },
  ),
  '/about': localize(
    {
      title: 'About PrismShadow | Self-Evolving AI for the Enterprise',
      description:
        'PrismShadow unifies data production, model training and agent self-evolution for enterprise AI. Founded in 2025 in Singapore by the team behind LlamaFactory.',
    },
    {
      title: '关于 PrismShadow | 企业级自进化 AI 平台',
      description:
        'PrismShadow 提供一体化的数据生产、模型训练和 Agent 自进化平台，帮助企业构建并持续优化 AI 工作流与 AutoResearch 系统。2025 年成立于新加坡。',
    },
  ),
  '/security': localize(
    {
      title: 'Security & Private Deployment for AI Agents | PrismShadow',
      description:
        'Deploy PrismShadow on-prem or in your private cloud. Controlled data access, governed memory, scoped agent actions and auditable workflows; your data never leaves your perimeter.',
    },
    {
      title: 'AI Agent 安全与私有化部署 | PrismShadow',
      description:
        'PrismShadow 支持本地与私有云部署，数据永不出域；以受控数据访问、治理化记忆、限定动作与可审计工作流保障企业 AI Agent 安全。',
    },
  ),
  '/contact': localize(
    {
      title: 'Contact PrismShadow | Book a Demo',
      description:
        "Tell us your goals and PrismShadow will put its complete platform to work for your company: data production, model training, private deployment and self-evolving agents, supported all the way to production.",
    },
    {
      title: '联系 PrismShadow | 预约演示',
      description:
        '告诉我们您的目标，PrismShadow 将把最完整的技术平台赋能给贵公司：数据生产、模型训练、私有化部署与自进化 Agent，全程支持直至落地。',
    },
  ),
  '/blog': localize(
    {
      title: 'Blog | PrismShadow',
      description:
        'Product launches and field notes from PrismShadow: AgentHub, Panofy and practical playbooks for AI agents in supply chain, healthcare, retail, travel and more.',
    },
    {
      title: '博客 | PrismShadow',
      description:
        'PrismShadow 产品发布与一线笔记：AgentHub、Panofy，以及 AI Agent 在供应链、医疗、零售、旅行等行业落地的实践指南。',
    },
  ),
  '/product/panofy': localize(
    {
      title: "Panofy | Train Expert AI Agents from Your Team's Work | PrismShadow",
      description:
        'Panofy trains reusable expert agents from company knowledge, expert examples and workflow feedback, with policy checks, source trails and human review built in.',
    },
    {
      title: 'Panofy | 用团队真实工作训练专家 Agent | PrismShadow',
      description:
        'Panofy 基于公司知识、专家示例与工作流反馈训练可复用的专家 Agent，内置政策检查、来源链路与人工审查。',
    },
  ),
  '/product/penguin-harness': localize(
    {
      title: 'PenguinHarness | Open-Source Multi-Agent App Development Platform',
      description:
        'PenguinHarness is an open-source, local-first platform where agents build, evaluate, optimize and deploy agent apps, at a fraction of the cost of closed agent harnesses.',
    },
    {
      title: 'PenguinHarness | 开源多 Agent 应用开发平台',
      description:
        'PenguinHarness 是开源、本地优先的多 Agent 应用开发平台，让 Agent 自动构建、评测、优化与部署 Agent 应用，成本仅为闭源方案的零头。',
    },
  ),
  '/product/llama-factory': localize(
    {
      title: 'LlamaFactory | Fine-Tune 500+ Open Models with Zero Code | PrismShadow',
      description:
        'The open-source fine-tuning framework with 70K+ GitHub stars: one WebUI and CLI for LoRA, QLoRA and full tuning, evaluation, export and inference across 500+ models.',
    },
    {
      title: 'LlamaFactory | 零代码微调 500+ 开源模型 | PrismShadow',
      description:
        '拥有 70K+ GitHub 星标的开源微调框架：一套 WebUI 与 CLI 覆盖 LoRA、QLoRA、全量微调、评估、导出与推理，支持 500+ 模型。',
    },
  ),
  '/solutions/departments': localize(
    {
      title: 'Department AI Agents | PrismShadow',
      description:
        "AI agents trained on each team's documents, workflows and policies for support, sales, marketing, data, HR, legal, engineering and operations.",
    },
    {
      title: '部门 AI Agent | PrismShadow',
      description:
        '基于每个团队的文档、工作流和政策训练 AI Agent，覆盖客服、销售、市场、数据、人力资源、法务、工程和运营。',
    },
  ),
  '/solutions/industries/b2b-saas': localize(
    {
      title: 'AI Agent Orchestration for B2B SaaS Teams | PrismShadow',
      description:
        'PrismShadow helps B2B SaaS teams turn scattered customer signals into governed AI agent workflows across product, GTM, sales, and customer success.',
    },
    {
      title: 'B2B SaaS AI Agent 编排 | PrismShadow',
      description:
        'PrismShadow 帮助 B2B SaaS 团队把分散的客户信号转化为覆盖产品、GTM、销售和客户成功的可治理 Agent 工作流。',
    },
  ),
  '/solutions/industries/financial-services': localize(
    {
      title: 'Trainable AI Agents for Private Financial Workflows | PrismShadow',
      description:
        'Train private AI agents on financial policies, documents, workflows, and domain knowledge, then deploy them locally with human-governed oversight.',
    },
    {
      title: '私有金融工作流 AI Agent | PrismShadow',
      description:
        '基于金融政策、文档、工作流和领域知识训练私有 AI Agent，并在人工治理下本地部署。',
    },
  ),
  '/solutions/industries/retail': localize(
    {
      title: 'Retail AI Agents for Next-Generation Retail | PrismShadow',
      description:
        'PrismShadow helps retailers turn fragmented product, customer, policy, and operational knowledge into AI agents for customer experience, service, intelligence, and operations.',
    },
    {
      title: '零售 AI Agent | PrismShadow',
      description:
        'PrismShadow 帮助零售企业把产品、客户、政策和运营知识转化为服务客户体验、客服、智能分析和运营的 AI Agent。',
    },
  ),
  '/solutions/industries/travel': localize(
    {
      title: 'Travel AI Agents for Connected Travel Experiences | PrismShadow',
      description:
        'PrismShadow helps travel companies build AI agents that understand travelers, bookings, policies, service workflows, and operational context.',
    },
    {
      title: '旅行行业 AI Agent | PrismShadow',
      description:
        'PrismShadow 帮助旅行企业构建能理解旅客、预订、政策、服务工作流和运营上下文的 AI Agent。',
    },
  ),
  '/solutions/industries/healthcare': localize(
    {
      title: 'Healthcare AI Agents for Trusted Workflows | PrismShadow',
      description:
        'PrismShadow helps healthcare teams build AI agents that support consumer health guidance, patient access, evidence-based communication, and operational intelligence.',
    },
    {
      title: '医疗健康 AI Agent | PrismShadow',
      description:
        'PrismShadow 帮助医疗健康团队构建支持消费者健康指引、患者准入、循证沟通和运营智能的 AI Agent。',
    },
  ),
  '/solutions/industries/supply-chain': localize(
    {
      title: 'Supply Chain AI Agents for Adaptive Operations | PrismShadow',
      description:
        'PrismShadow helps enterprises build supply chain AI agents that sense disruptions, reason across fragmented systems, recommend actions, and coordinate operational workflows.',
    },
    {
      title: '供应链 AI Agent | PrismShadow',
      description:
        'PrismShadow 帮助企业构建能感知扰动、跨系统推理、推荐行动并协同运营工作流的供应链 AI Agent。',
    },
  ),
  '/solutions/industries/restaurants': localize(
    {
      title: 'Restaurant AI Agents for Profit Operations | PrismShadow',
      description:
        'PrismShadow helps restaurant teams turn POS, delivery, social commerce, private orders, purchasing, labor, inventory, and store execution data into AI agents for profit operations.',
    },
    {
      title: '餐饮 AI Agent | PrismShadow',
      description:
        'PrismShadow 帮助餐饮团队把 POS、外卖、社交电商、私域订单、采购、用工、库存和门店执行数据转化为利润运营 Agent。',
    },
  ),
  '/industries/restaurant': localize(
    {
      canonicalPath: '/solutions/industries/restaurants',
      title: 'Restaurant AI Agents for Profit Operations | PrismShadow',
      description:
        'PrismShadow helps restaurant teams turn POS, delivery, social commerce, private orders, purchasing, labor, inventory, and store execution data into AI agents for profit operations.',
    },
    {
      canonicalPath: '/solutions/industries/restaurants',
      title: '餐饮 AI Agent | PrismShadow',
      description:
        'PrismShadow 帮助餐饮团队把 POS、外卖、社交电商、私域订单、采购、用工、库存和门店执行数据转化为利润运营 Agent。',
    },
  ),
  '/solutions/industries/auto-dealerships': localize(
    {
      title: 'Auto Dealership AI Agents for Dealer Workflows | PrismShadow',
      description:
        'PrismShadow helps auto dealerships turn customer, inventory, auction, sales, F&I, service, and marketing context into AI agents across the dealership lifecycle.',
    },
    {
      title: '汽车经销商 AI Agent | PrismShadow',
      description:
        'PrismShadow 帮助汽车经销商把客户、库存、拍卖、销售、F&I、售后和市场上下文转化为覆盖经销业务生命周期的 AI Agent。',
    },
  ),
  '/resources/agent-marketplace': localize(
    {
      title: 'Agent Marketplace: Approved Agent Skills | PrismShadow',
      description:
        'Explore reusable agent skills and workflow patterns that help teams start from proven business use cases.',
    },
    {
      title: 'Agent 市场：经过批准的 Agent 技能 | PrismShadow',
      description:
        '探索可复用的 Agent 技能和工作流模式，让团队从成熟业务用例开始落地。',
    },
  ),
  '/resources/use-case-library': localize(
    {
      title: 'Use Case Library | Panofy Agent Workflow Benchmarks',
      description:
        'Explore verified and simulated Panofy workflow benchmarks for repeatable expert workflows, reusable agent skills, and stable structured outputs.',
    },
    {
      title: '用例库 | Panofy Agent 工作流基准',
      description:
        '查看 Panofy 工作流基准，了解可复用专家工作流、Agent 技能和稳定结构化输出。',
    },
  ),
} as const satisfies Record<string, LocalizedSeoMetadata>

const routeSeoLookup = routeSeoMetadata as Record<string, LocalizedSeoMetadata>

export const getRouteSeo = (pathname: string, locale: Locale): SeoMetadata => {
  const route = routeSeoLookup[normalizeSeoPath(pathname)]

  return route?.[locale] ?? route?.en ?? routeSeoMetadata['/'][locale]
}

export const createDepartmentSeo = (
  department: {
    headline: string
    id: string
    label: string
    subtitle: string
  },
  locale: Locale,
): SeoMetadata => ({
  canonicalPath: `/solutions/departments/${department.id}`,
  title:
    locale === 'zh'
      ? `${department.label} AI Agent 解决方案 | PrismShadow`
      : `${department.label} AI Agent Solutions | PrismShadow`,
  description: department.subtitle,
})

export const createBlogSeo = (
  post: {
    excerpt: string
    metaDescription?: string
    seoTitle?: string
    slug: string
    title: string
  },
): SeoMetadata => ({
  canonicalPath: post.slug,
  title: `${post.seoTitle ?? post.title} | PrismShadow Blog`,
  description: post.metaDescription ?? post.excerpt,
})
