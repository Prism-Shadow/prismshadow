import type { Locale } from '../locales'

export type SecurityLink = { label: string; href: string }

export type SecurityFeature = {
  title: string
  body: string
}

export type SecurityControlId = 'data' | 'actions' | 'memory' | 'audit'

export type SecurityControl = {
  /** Tab label (the old section eyebrow). */
  tab: string
  title: string
  body: string
  /** Exactly three controls per area. */
  features: SecurityFeature[]
}

/** Hero mock: the runtime check every agent action passes before it runs. */
export type SecurityBoundaryCopy = {
  ariaLabel: string
  label: string
  status: string
  command: {
    label: string
    title: string
    body: string
  }
  /** Exactly six checked layers. */
  layers: string[]
  pass: string
  result: {
    label: string
    title: string
  }
}

export type SecurityDeploymentDiagramCopy = {
  ariaLabel: string
  boundary: string
  data: string
  train: string
  models: string
  tuned: string
  api: string
  agents: string
  /** Exactly three business systems. */
  systems: string[]
  outside: string
  blocked: string
}

export type SecurityDataFlowVisualCopy = {
  ariaLabel: string
  title: string
  status: string
  /** Exactly four steps, in order. */
  steps: string[]
  /** One short mono note per step. */
  notes: string[]
}

export type SecurityActionPolicyVisualCopy = {
  ariaLabel: string
  title: string
  agent: string
  /** Allowed, requires approval, blocked. */
  groups: {
    label: string
    items: string[]
  }[]
  /** Footer row: an action waiting in the human-review queue. */
  queue: {
    label: string
    item: string
    status: string
  }
}

export type SecurityMemoryPolicyVisualCopy = {
  ariaLabel: string
  title: string
  subtitle: string
  storeLabel: string
  /** Exactly four policies, in the order the mock colours them. */
  policies: {
    label: string
    value: string
  }[]
}

export type SecurityAuditLogVisualCopy = {
  ariaLabel: string
  title: string
  subtitle: string
  filter: string
  /** Time, event, actor. */
  columns: string[]
  rows: {
    event: string
    actor: string
  }[]
}

export type SecurityPageCopy = {
  hero: {
    eyebrow: string
    title: string
    lead: string
    primaryCta: SecurityLink
    secondaryCta: SecurityLink
  }
  boundary: SecurityBoundaryCopy
  deployment: {
    eyebrow: string
    title: string
    /** Part of the title set in the accent color (must appear in `title`). */
    titleAccent: string
    lead: string
    features: SecurityFeature[]
    diagram: SecurityDeploymentDiagramCopy
  }
  controls: {
    eyebrow: string
    title: string
    lead: string
    tablistLabel: string
    items: Record<SecurityControlId, SecurityControl>
  }
  visuals: {
    dataFlow: SecurityDataFlowVisualCopy
    actionPolicy: SecurityActionPolicyVisualCopy
    memoryPolicy: SecurityMemoryPolicyVisualCopy
    auditLog: SecurityAuditLogVisualCopy
  }
  cta: {
    title: string
    titleAccent: string
    body: string
    primary: SecurityLink
    secondary: SecurityLink
  }
}

export const securityPageCopy = {
  en: {
    hero: {
      eyebrow: 'Security',
      title: 'Security for AI agents that remember, reason and act.',
      lead: 'AI agents access knowledge, remember context, call tools and run business workflows. PrismShadow keeps them inside your enterprise boundary with controlled data access, governed memory, scoped actions and auditable workflows, deployed on your own infrastructure.',
      primaryCta: { label: 'Request a security review', href: '/contact' },
      secondaryCta: { label: 'Private deployment', href: '#private-deployment' },
    },
    boundary: {
      ariaLabel:
        'Runtime check mock: before an agent resolves an enterprise workflow request, enterprise data, access policy, agent memory, tool permissions, human review and the audit log are all evaluated. Policy result: approved response with a scoped next step.',
      label: 'Agent boundary',
      status: 'Enforced',
      command: {
        label: 'Runtime check',
        title: 'Resolve enterprise workflow request',
        body: 'Context, memory, tools, review and audit are evaluated before action.',
      },
      layers: [
        'Enterprise data',
        'Access policy',
        'Agent memory',
        'Tool permissions',
        'Human review',
        'Audit log',
      ],
      pass: 'pass',
      result: {
        label: 'Policy result',
        title: 'Approved response with scoped next step',
      },
    },
    deployment: {
      eyebrow: 'Private deployment',
      title: 'Deploy inside your perimeter. Your data never leaves it.',
      titleAccent: 'Your data never leaves it.',
      lead: 'Run PrismShadow on-prem or in your private cloud, configured around your infrastructure, data environment and security requirements.',
      features: [
        {
          title: 'On-prem or private cloud',
          body: 'Deploy, run and optimize the whole platform inside your own data center or VPC.',
        },
        {
          title: 'Trained in place',
          body: 'Models are trained and tuned on enterprise data without that data ever leaving your environment.',
        },
        {
          title: 'One API to your systems',
          body: 'Every model connects to your existing business systems through one unified multi-model API.',
        },
      ],
      diagram: {
        ariaLabel:
          'Diagram: inside your VPC or on-prem perimeter, enterprise data trains and tunes private models, which serve an agent layer through one unified API connected to business systems such as CRM, ERP and OA. The path to the public internet is blocked: no data egress.',
        boundary: 'Your VPC / on-prem',
        data: 'Enterprise data',
        train: 'train · tune',
        models: 'Private models',
        tuned: 'tuned on your data',
        api: 'unified API',
        agents: 'Agent layer',
        systems: ['CRM', 'ERP', 'OA'],
        outside: 'Public internet',
        blocked: 'No data egress',
      },
    },
    controls: {
      eyebrow: 'Controls',
      title: 'Control what agents know, do, remember and record.',
      lead: 'PrismShadow helps enterprises use AI agents safely across sensitive knowledge, long-term memory and business workflows.',
      tablistLabel: 'Security control areas',
      items: {
        data: {
          tab: 'Data boundaries',
          title: 'Protect enterprise data',
          body: 'Keep sensitive business knowledge under control. Agents only reach the data your policies allow.',
          features: [
            {
              title: 'Controlled data access',
              body: 'Agents work within defined data boundaries.',
            },
            {
              title: 'Permission-aware retrieval',
              body: 'Agents only use the knowledge they are allowed to access.',
            },
            {
              title: 'Localized deployment',
              body: 'Deploy around your enterprise environment and governance needs.',
            },
          ],
        },
        actions: {
          tab: 'Action governance',
          title: 'Govern agent actions',
          body: 'Secure not only what agents know, but what they can do: which tools they reach, which workflows they call and which actions they recommend.',
          features: [
            {
              title: 'Scoped tool access',
              body: 'Control which tools, systems and workflows each agent can use.',
            },
            {
              title: 'Action boundaries',
              body: 'Define what agents can do, what requires approval and what must be escalated.',
            },
            {
              title: 'Human review',
              body: 'Keep people in control of sensitive or high-impact actions.',
            },
          ],
        },
        memory: {
          tab: 'Memory control',
          title: 'Control agent memory',
          body: 'Long-term memory should be useful, and governed. Manage what agents remember, how context is used, and when memory is updated or removed.',
          features: [
            {
              title: 'Memory scope',
              body: 'Decide what information agents can retain.',
            },
            {
              title: 'Context control',
              body: 'Keep long-term context aligned with enterprise policy.',
            },
            {
              title: 'Review and removal',
              body: 'Support updates, corrections and deletion when needed.',
            },
          ],
        },
        audit: {
          tab: 'Operational visibility',
          title: 'Monitor and audit',
          body: 'Make agent behavior visible. Review agent activity, understand decisions and trace workflows over time.',
          features: [
            {
              title: 'Activity history',
              body: 'Track conversations, recommendations, tool calls and workflow actions.',
            },
            {
              title: 'Traceable context',
              body: 'Understand what knowledge supported an agent response.',
            },
            {
              title: 'Operational visibility',
              body: 'Support security review, investigation and governance workflows.',
            },
          ],
        },
      },
    },
    visuals: {
      dataFlow: {
        ariaLabel:
          'Enterprise data access flow: enterprise data passes through access policies, so the PrismShadow agent layer only receives permitted sources and returns an approved response.',
        title: 'Data access flow',
        status: 'Policy enforced',
        steps: [
          'Enterprise data',
          'Access policies',
          'PrismShadow agent layer',
          'Approved response',
        ],
        notes: ['all sources', 'permission check', 'permitted only', 'delivered'],
      },
      actionPolicy: {
        ariaLabel:
          'Agent action policy for a procurement assistant. Allowed: read contracts, summarize suppliers, draft emails. Requires approval: send supplier email, update purchase request. Blocked: change payment terms, approve vendor. In the approval queue, the supplier email is awaiting a reviewer.',
        title: 'Agent action policy',
        agent: 'Procurement Assistant',
        groups: [
          {
            label: 'Allowed',
            items: ['Read contracts', 'Summarize suppliers', 'Draft emails'],
          },
          {
            label: 'Requires approval',
            items: ['Send supplier email', 'Update purchase request'],
          },
          {
            label: 'Blocked',
            items: ['Change payment terms', 'Approve vendor'],
          },
        ],
        queue: {
          label: 'Approval queue',
          item: 'Send supplier email',
          status: 'awaiting reviewer',
        },
      },
      memoryPolicy: {
        ariaLabel:
          'Memory policy for context governance: customer context is retained, sensitive data is restricted, expired context requires review, and admins can update or remove memory.',
        title: 'Memory policy',
        subtitle: 'Context governance',
        storeLabel: 'Agent memory',
        policies: [
          { label: 'Customer context', value: 'retained' },
          { label: 'Sensitive data', value: 'restricted' },
          { label: 'Expired context', value: 'review required' },
          { label: 'Admin action', value: 'update or remove' },
        ],
      },
      auditLog: {
        ariaLabel:
          'Agent audit log, workflow trace: agent accessed approved knowledge source; agent drafted workflow recommendation; human approved action; tool call completed; memory updated.',
        title: 'Audit log',
        subtitle: 'Workflow trace',
        filter: 'Filter by event, actor or source…',
        columns: ['Time', 'Event', 'Actor'],
        rows: [
          { event: 'Agent accessed approved knowledge source', actor: 'agent' },
          { event: 'Agent drafted workflow recommendation', actor: 'agent' },
          { event: 'Human approved action', actor: 'reviewer' },
          { event: 'Tool call completed', actor: 'agent' },
          { event: 'Memory updated', actor: 'agent' },
        ],
      },
    },
    cta: {
      title: 'Build AI agents with enterprise control.',
      titleAccent: 'enterprise control',
      body: 'Controlled access. Governed memory. Scoped actions. Auditable workflows.',
      primary: { label: 'Talk to security', href: '/contact' },
      secondary: { label: 'About PrismShadow', href: '/about' },
    },
  },
  zh: {
    hero: {
      eyebrow: '安全',
      // zh headings use word-break: keep-all; \u00A0 keeps "AI Agent" on one line.
      title: '为会记忆、会推理、会行动的 AI\u00A0Agent 构建安全体系。',
      lead: 'AI Agent 会访问知识、记住上下文、调用工具并执行业务工作流。PrismShadow 以受控数据访问、治理化记忆、限定动作与可审计工作流，把它们约束在企业边界之内，并部署在你自己的基础设施上。',
      primaryCta: { label: '申请安全评审', href: '/contact' },
      secondaryCta: { label: '了解私有化部署', href: '#private-deployment' },
    },
    boundary: {
      ariaLabel:
        '运行时检查示意：Agent 处理企业工作流请求前，会依次评估企业数据、访问策略、Agent 记忆、工具权限、人工审核与审计日志。策略结果：批准带有范围限制的下一步响应。',
      label: 'Agent 边界',
      status: '已启用',
      command: {
        label: '运行时检查',
        title: '处理企业工作流请求',
        body: '行动前评估上下文、记忆、工具、审核与审计。',
      },
      layers: ['企业数据', '访问策略', 'Agent 记忆', '工具权限', '人工审核', '审计日志'],
      pass: '通过',
      result: {
        label: '策略结果',
        title: '批准带有范围限制的下一步响应',
      },
    },
    deployment: {
      eyebrow: '私有化部署',
      title: '部署在企业边界之内，数据永不出域。',
      titleAccent: '数据永不出域。',
      lead: 'PrismShadow 可部署在本地数据中心或私有云中，围绕企业基础设施、数据环境与安全要求进行配置。',
      features: [
        {
          title: '本地或私有云',
          body: '在你自己的数据中心或 VPC 内部署、运行并优化整个平台。',
        },
        {
          title: '就地训练',
          body: '模型基于企业数据完成训练与调优，数据始终不离开企业环境。',
        },
        {
          title: '统一 API 接入',
          body: '所有模型通过统一的多模型 API 接入现有业务系统。',
        },
      ],
      diagram: {
        ariaLabel:
          '示意图：在你的 VPC 或本地机房边界之内，企业数据训练并调优私有模型，私有模型通过统一 API 为 Agent 层提供服务，并接入 CRM、ERP、OA 等业务系统。通往公网的路径被阻断：数据不出域。',
        boundary: '你的 VPC / 本地机房',
        data: '企业数据',
        train: '训练 · 调优',
        models: '私有模型',
        tuned: '基于你的数据调优',
        api: '统一 API',
        agents: 'Agent 层',
        systems: ['CRM', 'ERP', 'OA'],
        outside: '公网',
        blocked: '数据不出域',
      },
    },
    controls: {
      eyebrow: '安全控制',
      title: '管住 Agent 知道什么、做什么、记住什么、留下什么。',
      lead: 'PrismShadow 帮助企业在敏感知识、长期记忆与业务工作流中安全地使用 AI Agent。',
      tablistLabel: '安全控制领域',
      items: {
        data: {
          tab: '数据边界',
          title: '保护企业数据',
          body: '让敏感业务知识保持受控。Agent 只能触达策略允许的数据。',
          features: [
            {
              title: '受控数据访问',
              body: 'Agent 在定义好的数据边界内工作。',
            },
            {
              title: '感知权限的检索',
              body: 'Agent 只使用被允许访问的知识。',
            },
            {
              title: '本地化部署',
              body: '围绕企业环境与治理需求进行部署。',
            },
          ],
        },
        actions: {
          tab: '动作治理',
          title: '治理 Agent 动作',
          body: '不仅要保护 Agent 知道什么，也要控制 Agent 能做什么：能使用哪些工具、调用哪些工作流、推荐哪些行动。',
          features: [
            {
              title: '限定工具访问',
              body: '控制每个 Agent 可以使用哪些工具、系统与工作流。',
            },
            {
              title: '动作边界',
              body: '定义 Agent 能做什么、什么需要批准、什么必须升级处理。',
            },
            {
              title: '人工审核',
              body: '敏感或高影响的动作，始终由人掌控。',
            },
          ],
        },
        memory: {
          tab: '记忆控制',
          title: '控制 Agent 记忆',
          body: '长期记忆应当有用，也必须可治理。管理 Agent 记住什么、上下文如何使用，以及何时更新或移除记忆。',
          features: [
            {
              title: '记忆范围',
              body: '决定 Agent 可以保留哪些信息。',
            },
            {
              title: '上下文控制',
              body: '让长期上下文与企业政策保持一致。',
            },
            {
              title: '审核与移除',
              body: '在需要时支持更新、修正与删除。',
            },
          ],
        },
        audit: {
          tab: '运营可见性',
          title: '监控与审计',
          body: '让 Agent 行为可见。审阅 Agent 活动、理解决策依据，并持续追踪工作流。',
          features: [
            {
              title: '活动历史',
              body: '追踪对话、建议、工具调用与工作流动作。',
            },
            {
              title: '可追溯上下文',
              body: '了解是哪些知识支撑了 Agent 的响应。',
            },
            {
              title: '运营可见性',
              body: '支持安全评审、调查与治理工作流。',
            },
          ],
        },
      },
    },
    visuals: {
      dataFlow: {
        ariaLabel:
          '企业数据访问流程：企业数据经过访问策略过滤，PrismShadow Agent 层只获得被允许的数据源，并返回经过批准的响应。',
        title: '数据访问流程',
        status: '策略生效',
        steps: ['企业数据', '访问策略', 'PrismShadow Agent 层', '批准响应'],
        notes: ['全部数据源', '权限校验', '仅限已授权', '已交付'],
      },
      actionPolicy: {
        ariaLabel:
          '采购助手的 Agent 动作策略。允许：读取合同、总结供应商、起草邮件。需要批准：发送供应商邮件、更新采购请求。禁止：修改付款条款、批准供应商。审批队列中，供应商邮件正在等待审核人。',
        title: 'Agent 动作策略',
        agent: '采购助手',
        groups: [
          {
            label: '允许',
            items: ['读取合同', '总结供应商', '起草邮件'],
          },
          {
            label: '需要批准',
            items: ['发送供应商邮件', '更新采购请求'],
          },
          {
            label: '禁止',
            items: ['修改付款条款', '批准供应商'],
          },
        ],
        queue: {
          label: '审批队列',
          item: '发送供应商邮件',
          status: '等待审核人',
        },
      },
      memoryPolicy: {
        ariaLabel:
          '上下文治理的记忆策略：客户上下文保留，敏感数据受限，过期上下文需要审核，管理员可以更新或移除记忆。',
        title: '记忆策略',
        subtitle: '上下文治理',
        storeLabel: 'Agent 记忆',
        policies: [
          { label: '客户上下文', value: '保留' },
          { label: '敏感数据', value: '受限' },
          { label: '过期上下文', value: '需要审核' },
          { label: '管理员操作', value: '更新或移除' },
        ],
      },
      auditLog: {
        ariaLabel:
          'Agent 审计日志，工作流追踪：Agent 访问已批准知识源；Agent 起草工作流建议；人工批准动作；工具调用完成；记忆已更新。',
        title: '审计日志',
        subtitle: '工作流追踪',
        filter: '按事件、执行者或来源筛选…',
        columns: ['时间', '事件', '执行者'],
        rows: [
          { event: 'Agent 访问已批准知识源', actor: 'Agent' },
          { event: 'Agent 起草工作流建议', actor: 'Agent' },
          { event: '人工批准动作', actor: '审核人' },
          { event: '工具调用完成', actor: 'Agent' },
          { event: '记忆已更新', actor: 'Agent' },
        ],
      },
    },
    cta: {
      title: '以企业级控制，构建 AI\u00A0Agent。',
      titleAccent: '企业级控制',
      body: '受控访问，治理化记忆，限定动作，可审计工作流。',
      primary: { label: '联系安全团队', href: '/contact' },
      secondary: { label: '关于 PrismShadow', href: '/about' },
    },
  },
} satisfies Record<Locale, SecurityPageCopy>
