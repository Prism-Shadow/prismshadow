import type { Locale } from '../locales'
import type { DepartmentId } from './shared'

export type DepartmentTextCopy = {
  title: string
  body: string
}

export type DepartmentMockItemCopy = {
  label: string
  detail: string
  tag: string
}

export type DepartmentSolutionCopy = {
  label: string
  headline: string
  subtitle: string
  /** Why this team needs AI · What Panofy can do · How it works · Why Panofy */
  sections: DepartmentTextCopy[]
  /** The example agent (replaces the old photo + "New Agent" overlay). */
  agent: {
    role: string
    question: string
    files: string[]
    tasks: DepartmentTextCopy[]
  }
  /** Illustrative work surface shown as a flat UI mock. */
  mock: {
    title: string
    meta: string
    items: DepartmentMockItemCopy[]
    note: string
  }
}

/**
 * Headings may contain `\u200B` to mark where a Chinese heading should break
 * (rendered by `Phrases`); it is invisible everywhere else.
 */
export type DepartmentsPageCopy = {
  overview: {
    hero: {
      eyebrow: string
      title: string
      body: string
      visualLabel: string
      inputs: string[]
      core: string
      coreCaption: string
      browse: string
    }
    tabs: {
      eyebrow: string
      title: string
      body: string
      tablistLabel: string
      roleLabel: string
      questionLabel: string
      /** `{label}` is replaced with the department name. */
      explore: string
    }
    how: {
      eyebrow: string
      title: string
      body: string
      steps: DepartmentTextCopy[]
    }
  }
  detail: {
    navLabel: string
    overviewLabel: string
    primaryCta: string
    secondaryCta: string
    approachEyebrow: string
    /** `{label}` is replaced with the department name. */
    approachTitle: string
    agent: {
      eyebrow: string
      body: string
      newAgent: string
      question: string
      files: string
      tasks: string
      /** `{count}` is replaced with the number of steps. */
      steps: string
    }
    agentLabel: string
    /** `{label}` and `{title}` are replaced. */
    mockLabel: string
  }
  solutions: Record<DepartmentId, DepartmentSolutionCopy>
}

export const departmentsPageCopy = {
  en: {
    overview: {
      hero: {
        eyebrow: 'Departments',
        title: "AI agents trained for every department's real work",
        body: "PrismShadow turns each team's documents, workflows, policies, examples and operating context into specialized agents for repeatable business execution.",
        visualLabel:
          'Team documents, workflows, policies, examples and operating context flow into Panofy, which trains one agent for each of eight departments.',
        inputs: ['Documents', 'Workflows', 'Policies', 'Examples', 'Operating context'],
        core: 'Panofy',
        coreCaption: 'One agent per team',
        browse: 'Browse departments',
      },
      tabs: {
        eyebrow: 'Department solutions',
        title: 'Eight departments, one way to train them',
        body: "Panofy turns each team's documents, workflows and operating context into specialized AI agents that understand how the work actually gets done.",
        tablistLabel: 'Departments',
        roleLabel: 'Agent role',
        questionLabel: 'Ask it',
        explore: 'Explore {label}',
      },
      how: {
        eyebrow: 'How it works',
        title: 'From team knowledge to a trained agent',
        body: "Every department agent is trained the same way: on that team's own material, for that team's own work.",
        steps: [
          {
            title: "Upload the team's knowledge",
            body: 'Documents, ticket exports, playbooks, SOPs and reports go into Panofy as training material.',
          },
          {
            title: "Define the agent's role",
            body: 'Name the job, such as Customer support copilot or Contract risk reviewer. Panofy turns the material into a reusable agent for it, without complex fine-tuning or engineering setup.',
          },
          {
            title: 'Put it to work on real tasks',
            body: "The agent reviews, classifies, drafts and summarizes inside the team's workflow, while people keep control of final decisions.",
          },
        ],
      },
    },
    detail: {
      navLabel: 'Departments',
      overviewLabel: 'Overview',
      primaryCta: 'Book a demo',
      secondaryCta: 'All departments',
      approachEyebrow: 'The approach',
      approachTitle: 'How Panofy works for {label} teams',
      agent: {
        eyebrow: 'Example agent',
        body: "Trained on the team's own files, it turns one question into a reviewable plan of work.",
        newAgent: 'New agent',
        question: 'Question',
        files: 'Training files',
        tasks: 'Task list',
        steps: '{count} steps',
      },
      agentLabel: 'Agent',
      mockLabel: 'Illustrative {label} workspace: {title}',
    },
    solutions: {
      'customer-support': {
        label: 'Customer Support',
        headline: 'Resolve more tickets with less back-and-forth',
        subtitle:
          'Train agents on your help center, ticket history, policies and escalation playbooks so support teams respond faster and stay consistent.',
        sections: [
          {
            title: 'Why this team needs AI',
            body: 'Support teams handle large volumes of repetitive questions, policy requests, product issues and escalations every day. As companies grow, support knowledge scatters across help centers, SOPs, release notes, refund policies and past tickets, making it hard to respond quickly and consistently.',
          },
          {
            title: 'What Panofy can do',
            body: 'Panofy trains support agents on ticket history, help center articles, refund policies, escalation SOPs and product documentation. They draft replies, summarize conversations, classify issues, recommend next actions and cut repeat tickets, while keeping every response aligned with company policy.',
          },
          {
            title: 'How it works',
            body: 'Upload support documents, ticket exports, FAQ files and internal SOPs. Define a role such as Customer support copilot, and Panofy turns that knowledge into a reusable agent that reviews tickets, finds recurring issues, suggests response macros and prepares team-ready summaries.',
          },
          {
            title: 'Why Panofy',
            body: "Unlike a generic chatbot, Panofy trains agents on your company's actual support knowledge, workflows and response standards. Teams move from manual ticket handling to consistent, policy-aware, AI-assisted resolution without complex fine-tuning or engineering setup.",
          },
        ],
        agent: {
          role: 'Customer support copilot',
          question:
            'Which support issues are driving the most repeat tickets this week, and how should the team respond faster?',
          files: [
            'ticket_history.csv',
            'help_center_faq.pdf',
            'refund_policy.docx',
            'escalation_sop.pdf',
            'product_release_notes.pdf',
          ],
          tasks: [
            { title: 'Load tickets', body: 'Review recent ticket volume and issue categories.' },
            { title: 'Cluster themes', body: 'Identify recurring complaints and repeat contacts.' },
            {
              title: 'Find root causes',
              body: 'Link issues to product gaps, policy confusion or workflow delays.',
            },
            {
              title: 'Recommend actions',
              body: 'Suggest response improvements, macros and escalation rules.',
            },
            { title: 'Report', body: 'Draft a team-ready support improvement summary.' },
          ],
        },
        mock: {
          title: 'Ticket queue',
          meta: 'Today',
          items: [
            { label: 'Refund not received after return', detail: '#4821 · Refund', tag: 'Reply drafted' },
            { label: 'Export button missing after update', detail: '#4822 · Product issue', tag: 'Reply drafted' },
            { label: 'Charged twice for the annual plan', detail: '#4823 · Billing', tag: 'Escalated' },
            { label: 'Third contact about a login loop', detail: '#4824 · Repeat contact', tag: 'Root cause linked' },
          ],
          note: 'Replies cite refund_policy.docx and escalation_sop.pdf',
        },
      },
      sales: {
        label: 'Sales',
        headline: 'Know which deals to move next',
        subtitle:
          'Turn CRM data, call notes and sales playbooks into agents that help reps prioritize accounts, personalize outreach and prepare stronger proposals.',
        sections: [
          {
            title: 'Why this team needs AI',
            body: 'Sales teams spend too much time searching CRM notes, reviewing meeting transcripts, preparing follow-ups and deciding which accounts deserve attention. As pipelines grow, it gets harder to spot high-intent opportunities, personalize outreach and tie every sales action to the right customer context.',
          },
          {
            title: 'What Panofy can do',
            body: 'Panofy trains sales agents on CRM data, account notes, pricing playbooks, meeting transcripts and proposal templates. They score accounts, summarize buyer needs, surface risks and objections, recommend outreach messages and prepare proposal directions for reps.',
          },
          {
            title: 'How it works',
            body: 'Upload pipeline data, customer notes, pricing documents and meeting records. Create a role such as Sales pipeline copilot, and the agent reviews opportunities, identifies likely conversions, extracts account context and suggests next-touch actions for the team.',
          },
          {
            title: 'Why Panofy',
            body: 'Panofy gives sales teams reusable agents that understand their deal process, pricing logic, customer segments and communication style. Instead of asking a generic AI for one-off emails, reps rely on trained agents that support the full pipeline, from account analysis to proposal preparation.',
          },
        ],
        agent: {
          role: 'Sales pipeline copilot',
          question:
            'Which accounts are most likely to convert this quarter, and what outreach should the sales team prioritize?',
          files: [
            'crm_pipeline.csv',
            'account_notes.docx',
            'meeting_transcripts.pdf',
            'pricing_playbook.pdf',
            'proposal_templates.pptx',
          ],
          tasks: [
            { title: 'Load pipeline', body: 'Import and validate pipeline data.' },
            { title: 'Score accounts', body: 'Identify high-potential opportunities.' },
            { title: 'Summarize context', body: 'Pull key account insights and history.' },
            { title: 'Draft outreach', body: 'Create personalized outreach and next steps.' },
            { title: 'Prepare proposal', body: 'Recommend a solution and pricing.' },
          ],
        },
        mock: {
          title: 'Pipeline',
          meta: 'This quarter',
          items: [
            { label: 'Atlas Freight', detail: 'Qualified', tag: 'Book discovery call' },
            { label: 'Cobalt Labs', detail: 'Qualified', tag: 'Confirm budget owner' },
            { label: 'Orbit Retail', detail: 'Proposal', tag: 'Answer security review' },
            { label: 'Lumen Health', detail: 'Proposal', tag: 'Share case study' },
            { label: 'Kestrel Bank', detail: 'Negotiation', tag: 'Send pricing follow-up' },
            { label: 'Vela Insurance', detail: 'Negotiation', tag: 'Loop in legal review' },
          ],
          note: 'Next touches drafted from account_notes.docx',
        },
      },
      marketing: {
        label: 'Marketing',
        headline: 'Create on-brand campaigns faster',
        subtitle:
          'Train agents on your brand guidelines, campaign briefs, audience personas and performance data to turn strategy into content your team can actually use.',
        sections: [
          {
            title: 'Why this team needs AI',
            body: 'Marketing teams manage brand guidelines, campaign briefs, audience personas, performance reports and content calendars across many channels. Without AI support, too much time goes into turning scattered information into campaign angles, content plans and channel-specific deliverables.',
          },
          {
            title: 'What Panofy can do',
            body: 'Panofy trains marketing agents on brand guidelines, campaign briefs, audience research, content calendars and performance data. They recommend campaign themes, analyze past performance, generate content directions, draft campaign plans and keep every output in the brand voice.',
          },
          {
            title: 'How it works',
            body: 'Upload brand documents, campaign briefs, audience personas and performance reports. Define a role such as Campaign content strategist, and the agent reviews goals, compares past performance, recommends content pillars and produces a structured go-to-market content plan.',
          },
          {
            title: 'Why Panofy',
            body: 'Panofy preserves brand standards, campaign context and reusable creative logic. Instead of prompting from scratch every time, teams train agents that understand the brand, audience, tone and campaign workflow, so content production gets faster and more consistent.',
          },
        ],
        agent: {
          role: 'Campaign content strategist',
          question:
            'Which campaign angles should we prioritize for the next launch, and what content should marketing create first?',
          files: [
            'brand_guidelines.pdf',
            'campaign_brief.docx',
            'audience_personas.xlsx',
            'content_calendar.csv',
            'performance_report.pdf',
          ],
          tasks: [
            { title: 'Review briefs', body: 'Understand goals, audience and key messages.' },
            { title: 'Analyze performance', body: 'Identify top-performing angles and gaps.' },
            { title: 'Recommend themes', body: 'Prioritize the angles with the highest potential.' },
            { title: 'Draft content plan', body: 'Outline content ideas and channel mix.' },
            { title: 'Report', body: 'Deliver a prioritized plan with rationale and next steps.' },
          ],
        },
        mock: {
          title: 'Launch content plan',
          meta: 'Weeks 1–4',
          items: [
            { label: 'Blog', detail: 'Product story', tag: 'On brand' },
            { label: 'Email', detail: 'Customer proof', tag: 'On brand' },
            { label: 'Social', detail: 'How-to', tag: 'Tone flagged' },
            { label: 'Webinar', detail: 'Product story', tag: 'On brand' },
          ],
          note: 'Angles ranked against performance_report.pdf',
        },
      },
      data: {
        label: 'Data',
        headline: 'Turn scattered metrics into clear next steps',
        subtitle:
          'Help teams understand what changed, why it happened and what to do next, with agents trained on your dashboards, reports and business data.',
        sections: [
          {
            title: 'Why this team needs AI',
            body: 'Business teams need faster insight, but data is spread across dashboards, CSV files, reports, product usage logs and monthly summaries. Analysts spend much of their time cleaning, comparing, explaining and reporting metrics instead of interpreting them.',
          },
          {
            title: 'What Panofy can do',
            body: 'Panofy trains data agents on KPI dashboards, revenue reports, churn metrics, product usage data and executive summaries. They detect metric changes, flag anomalies, explain likely drivers, summarize trends and draft stakeholder-ready insight reports.',
          },
          {
            title: 'How it works',
            body: 'Upload structured data, dashboard exports and recurring business reports. Create a role such as Data insights analyst, and the agent reviews key metrics, compares performance over time, identifies warning signals and writes concise explanations for business teams.',
          },
          {
            title: 'Why Panofy',
            body: 'Panofy makes data analysis accessible to non-technical teams while grounding every output in company files and business context. Companies train agents that understand their own KPIs, reporting structure and decision priorities instead of relying on generic answers.',
          },
        ],
        agent: {
          role: 'Data insights analyst',
          question: 'What changed in our KPIs this month, and which metrics need immediate attention?',
          files: [
            'kpi_dashboard.csv',
            'revenue_report.xlsx',
            'churn_metrics.csv',
            'product_usage.csv',
            'monthly_summary.pdf',
          ],
          tasks: [
            { title: 'Load data', body: 'Ingest KPI and operational datasets.' },
            { title: 'Detect trends', body: 'Identify significant month-over-month changes.' },
            { title: 'Flag anomalies', body: 'Surface metrics outside normal ranges.' },
            { title: 'Explain drivers', body: 'Determine the root causes of key changes.' },
            { title: 'Report', body: 'Deliver insights and recommendations.' },
          ],
        },
        mock: {
          title: 'KPI monitor',
          meta: 'Month over month',
          items: [
            { label: 'Revenue', detail: 'Rising', tag: 'In range' },
            { label: 'Active accounts', detail: 'Stable', tag: 'In range' },
            { label: 'Churn', detail: 'Spiking', tag: 'Out of range' },
            { label: 'Product usage', detail: 'Flat', tag: 'In range' },
          ],
          note: 'Driver analysis drafted from churn_metrics.csv',
        },
      },
      hr: {
        label: 'HR',
        headline: 'Support people decisions with better context',
        subtitle:
          'Train agents on policies, hiring data, engagement surveys and onboarding materials to help HR teams answer questions and spot workforce risks earlier.',
        sections: [
          {
            title: 'Why this team needs AI',
            body: 'HR teams manage employee policies, hiring pipelines, engagement surveys, onboarding materials and retention data. As organizations grow, they need faster ways to answer employee questions, identify workforce risks, support managers and improve the employee experience.',
          },
          {
            title: 'What Panofy can do',
            body: 'Panofy trains HR agents on policy documents, attrition data, hiring pipelines, engagement surveys and onboarding checklists. They answer internal policy questions, analyze attrition risk, summarize survey results, prepare onboarding guidance and recommend retention actions.',
          },
          {
            title: 'How it works',
            body: 'Upload HR datasets, policy documents, survey results and onboarding materials. Define a role such as HR attrition analyst, and the agent compares risk by team, role, tenure and workload, then drafts manager-ready retention recommendations.',
          },
          {
            title: 'Why Panofy',
            body: 'Panofy turns people-operations knowledge into reliable, reusable agents. HR moves beyond manual document search and spreadsheet review to faster policy support, better workforce insight and more consistent manager guidance.',
          },
        ],
        agent: {
          role: 'HR attrition analyst',
          question:
            'Which teams have the highest attrition risk this quarter, and what retention actions should HR prioritize?',
          files: [
            'employee_attrition.csv',
            'hiring_pipeline.xlsx',
            'people_policy.docx',
            'engagement_survey.pdf',
            'onboarding_checklist.pdf',
          ],
          tasks: [
            { title: 'Load data', body: 'Import HRIS, engagement and performance data.' },
            { title: 'Analyze drivers', body: 'Identify the key factors contributing to attrition.' },
            { title: 'Predict risk', body: 'Score teams and roles by attrition probability.' },
            {
              title: 'Recommend actions',
              body: 'Prioritize retention initiatives by impact and feasibility.',
            },
            { title: 'Report', body: 'Deliver an executive summary with insights and actions.' },
          ],
        },
        mock: {
          title: 'Attrition risk by team',
          meta: 'This quarter',
          items: [
            { label: 'Support', detail: 'Workload', tag: 'High' },
            { label: 'Sales', detail: 'Tenure under a year', tag: 'Medium' },
            { label: 'Engineering', detail: 'Engagement survey', tag: 'Low' },
            { label: 'Operations', detail: 'Shift coverage', tag: 'Medium' },
          ],
          note: 'Retention actions drafted for each manager',
        },
      },
      legal: {
        label: 'Legal',
        headline: 'Review agreements with more confidence',
        subtitle:
          'Use agents trained on contracts, compliance policies, clause libraries and fallback language to surface risks and prepare cleaner legal reviews.',
        sections: [
          {
            title: 'Why this team needs AI',
            body: 'Legal teams review contracts, compliance policies, vendor agreements, fallback clauses and security addendums under tight timelines. Much of this work means careful comparison against internal standards, and manual review is slow, repetitive and hard to scale.',
          },
          {
            title: 'What Panofy can do',
            body: 'Panofy trains legal agents on contract drafts, policy documents, clause libraries, compliance rules and internal legal standards. They flag risky terms, compare clauses against company policy, summarize contract risk and suggest revision priorities for review.',
          },
          {
            title: 'How it works',
            body: 'Upload agreements, compliance policies, legal playbooks and fallback clauses. Create a role such as Contract risk reviewer, and the agent reviews draft agreements, identifies liability or termination risks, checks policy alignment and prepares a structured risk summary.',
          },
          {
            title: 'Why Panofy',
            body: 'Panofy does not replace legal judgment; it helps legal teams review documents faster and more consistently. Trained on company-specific standards and approved language, its agents support safer contract review while humans stay in control of final decisions.',
          },
        ],
        agent: {
          role: 'Contract risk reviewer',
          question:
            'Which contract terms create the highest risk in this vendor agreement, and what revisions should legal prioritize?',
          files: [
            'msa_draft.docx',
            'vendor_agreement.pdf',
            'security_addendum.pdf',
            'compliance_policy.pdf',
            'fallback_clauses.docx',
          ],
          tasks: [
            { title: 'Load documents', body: 'Ingest the vendor agreement and related materials.' },
            { title: 'Flag risk terms', body: 'Identify high-risk clauses and deviations.' },
            { title: 'Compare policy', body: 'Check against the playbook and standards.' },
            { title: 'Recommend edits', body: 'Suggest redlines and alternatives.' },
            { title: 'Report', body: 'Summarize risks and recommended actions.' },
          ],
        },
        mock: {
          title: 'vendor_agreement.pdf',
          meta: 'In review',
          items: [
            { label: '§4 Payment terms', detail: 'Matches the playbook', tag: 'Aligned' },
            { label: '§9 Limitation of liability', detail: 'Cap below policy minimum', tag: 'High risk' },
            { label: '§12 Termination', detail: 'Fallback clause available', tag: 'Revise' },
            { label: '§15 Security addendum', detail: 'Retention term missing', tag: 'Revise' },
          ],
          note: 'Risk summary ready for legal review',
        },
      },
      engineering: {
        label: 'Engineering',
        headline: 'Turn engineering knowledge into faster action',
        subtitle:
          'Train agents on technical docs, incident logs, sprint data and postmortems to help teams understand blockers, assign owners and prioritize fixes.',
        sections: [
          {
            title: 'Why this team needs AI',
            body: 'Engineering teams work across codebases, incident logs, sprint boards, architecture documents, API references and postmortem notes. As systems grow more complex, engineers need faster ways to understand incidents, map dependencies, onboard new teammates and prioritize technical work.',
          },
          {
            title: 'What Panofy can do',
            body: 'Panofy trains engineering agents on incident logs, API docs, architecture files, sprint exports and postmortem notes. They summarize blockers, map impacted systems, recommend next actions, support onboarding and prioritize fixes by severity and customer impact.',
          },
          {
            title: 'How it works',
            body: 'Upload technical documentation, incident records, sprint data and architecture references. Define a role such as Engineering incident copilot, and the agent reviews blockers, identifies owners, connects issues to systems and drafts engineering action summaries.',
          },
          {
            title: 'Why Panofy',
            body: 'Panofy preserves technical knowledge and cuts the time spent searching scattered documentation. Instead of relying on individual memory or manual triage, teams train agents that understand their systems, workflows and incident response standards.',
          },
        ],
        agent: {
          role: 'Engineering incident copilot',
          question:
            'Which incidents are blocking this sprint, and what fixes or owners should engineering prioritize?',
          files: [
            'incident_log.csv',
            'sprint_board_export.xlsx',
            'system_architecture.pdf',
            'api_docs.docx',
            'postmortem_notes.pdf',
          ],
          tasks: [
            { title: 'Load incidents', body: 'Ingest recent incidents and related metadata.' },
            { title: 'Map dependencies', body: 'Identify affected services and teams.' },
            { title: 'Prioritize fixes', body: 'Score by impact, urgency and effort.' },
            { title: 'Recommend actions', body: 'Suggest fixes and assign owners.' },
            { title: 'Report', body: 'Generate a sprint-ready summary for engineering.' },
          ],
        },
        mock: {
          title: 'Sprint blockers',
          meta: 'Sprint 24',
          items: [
            { label: 'Checkout API timeouts', detail: 'payments-api · Payments', tag: 'SEV 1' },
            { label: 'Search index lag', detail: 'search-indexer · Platform', tag: 'SEV 2' },
            { label: 'Webhook retries failing', detail: 'notifications · Integrations', tag: 'SEV 2' },
            { label: 'Flaky deploy pipeline', detail: 'ci-runner · Developer experience', tag: 'SEV 3' },
          ],
          note: 'Owners suggested from system_architecture.pdf',
        },
      },
      operations: {
        label: 'Operations',
        headline: 'Find bottlenecks before they slow the business down',
        subtitle:
          'Train agents on SOPs, vendor records, exception logs and process metrics to identify delays, recommend fixes and keep operations moving.',
        sections: [
          {
            title: 'Why this team needs AI',
            body: 'Operations teams manage SOPs, vendor status, fulfillment metrics, exception logs and process reports across many workflows. Bottlenecks hide in scattered systems, making it hard to spot repeated issues, quantify their impact and decide which improvements matter most.',
          },
          {
            title: 'What Panofy can do',
            body: 'Panofy trains operations agents on SOP libraries, fulfillment data, vendor records, exception logs and weekly reports. They detect bottlenecks, identify repeated process failures, analyze operational impact, recommend improvements and draft action plans.',
          },
          {
            title: 'How it works',
            body: 'Upload SOPs, process metrics, vendor files and exception logs. Create a role such as Operations workflow optimizer, and the agent reviews workflows, identifies delays, quantifies cost or service impact and suggests operational improvements.',
          },
          {
            title: 'Why Panofy',
            body: 'Panofy turns process knowledge into practical, reusable agents. Teams diagnose workflows faster, execute SOPs better and improve processes more consistently, without building complex automation systems from scratch.',
          },
        ],
        agent: {
          role: 'Operations workflow optimizer',
          question:
            'Where are our biggest process bottlenecks this month, and which operational improvements should we prioritize?',
          files: [
            'sop_library.pdf',
            'fulfillment_metrics.csv',
            'vendor_status.xlsx',
            'exception_log.csv',
            'weekly_ops_report.pdf',
          ],
          tasks: [
            {
              title: 'Review workflows',
              body: 'Analyze current operational workflows and data sources.',
            },
            {
              title: 'Detect bottlenecks',
              body: 'Identify the delays, handoffs and constraints causing the most impact.',
            },
            {
              title: 'Analyze impact',
              body: 'Quantify the effect on cycle time, throughput, cost and customer experience.',
            },
            {
              title: 'Recommend actions',
              body: 'Prioritize operational improvements by impact and effort.',
            },
            { title: 'Report', body: 'Deliver a clear summary with insights and next steps.' },
          ],
        },
        mock: {
          title: 'Order fulfillment',
          meta: 'This month',
          items: [
            { label: 'Order intake', detail: 'Automated', tag: 'Flowing' },
            { label: 'Vendor confirmation', detail: 'Waiting on vendor', tag: 'Bottleneck' },
            { label: 'Picking', detail: 'Within SLA', tag: 'Flowing' },
            { label: 'Shipping', detail: 'Within SLA', tag: 'Flowing' },
          ],
          note: 'Fix proposed from sop_library.pdf',
        },
      },
    },
  },
  zh: {
    overview: {
      hero: {
        eyebrow: '部门',
        title: '为每个部门的真实\u200B工作训练 AI Agent',
        body: 'PrismShadow 把每个团队的文档、工作流、政策、示例和运营上下文训练成专用 Agent，支撑可重复的业务执行。',
        visualLabel:
          '团队的文档、工作流、政策、示例和运营上下文进入 Panofy，由 Panofy 为八个部门分别训练专属 Agent。',
        inputs: ['文档', '工作流', '政策', '示例', '运营上下文'],
        core: 'Panofy',
        coreCaption: '每个团队一个 Agent',
        browse: '浏览部门',
      },
      tabs: {
        eyebrow: '部门解决方案',
        title: '八个部门，\u200B同一种训练方式',
        body: 'Panofy 将每个团队的文档、工作流和运营上下文转化为专用 AI Agent，让 Agent 真正理解工作是如何完成的。',
        tablistLabel: '部门',
        roleLabel: 'Agent 角色',
        questionLabel: '可以这样问',
        explore: '查看{label}方案',
      },
      how: {
        eyebrow: '工作方式',
        title: '从团队知识\u200B到训练好的 Agent',
        body: '每个部门 Agent 都以同样的方式训练：用团队自己的材料，完成团队自己的工作。',
        steps: [
          {
            title: '上传团队知识',
            body: '文档、工单导出、业务手册、SOP 和报告，都会作为训练材料进入 Panofy。',
          },
          {
            title: '定义 Agent 角色',
            body: '为岗位命名，例如“客户支持 Copilot”或“合同风险审阅员”。Panofy 把材料训练成可复用的 Agent，无需复杂微调或工程搭建。',
          },
          {
            title: '投入真实任务',
            body: 'Agent 在团队工作流中审阅、分类、起草和总结，最终决策始终由人掌控。',
          },
        ],
      },
    },
    detail: {
      navLabel: '部门',
      overviewLabel: '概览',
      primaryCta: '预约演示',
      secondaryCta: '全部部门',
      approachEyebrow: '方法',
      approachTitle: 'Panofy 如何服务\u200B{label}团队',
      agent: {
        eyebrow: 'Agent 示例',
        body: '基于团队文件训练，把一个问题拆成可审阅的计划。',
        newAgent: '新建 Agent',
        question: '提问',
        files: '训练文件',
        tasks: '任务清单',
        steps: '{count} 个步骤',
      },
      agentLabel: 'Agent',
      mockLabel: '{label}工作台示意：{title}',
    },
    solutions: {
      'customer-support': {
        label: '客户支持',
        headline: '减少来回沟通，\u200B更快解决工单',
        subtitle: '基于帮助中心、历史工单、政策和升级流程训练 Agent，让客服团队响应更快、口径一致。',
        sections: [
          {
            title: '为什么这个团队需要 AI',
            body: '客户支持团队每天要处理大量重复问题、政策咨询、产品问题和升级案例。随着公司增长，支持知识分散在帮助中心、SOP、发布说明、退款政策和历史工单中，一线团队很难快速且一致地回复客户。',
          },
          {
            title: 'Panofy 可以做什么',
            body: 'Panofy 基于工单历史、帮助中心文章、退款政策、升级 SOP 和产品文档训练客服 Agent。Agent 可以起草回复、总结客户对话、分类问题、推荐下一步行动，在减少重复工单的同时，让每条回复都符合公司政策。',
          },
          {
            title: '如何工作',
            body: '把支持文档、工单导出、FAQ 文件和内部 SOP 上传到 Panofy，定义“客户支持 Copilot”这样的角色，Panofy 就会把这些知识转化为可复用的支持 Agent，用于审阅工单、识别重复问题、建议回复模板并准备团队可用的摘要。',
          },
          {
            title: '为什么选择 Panofy',
            body: '不同于通用聊天机器人，Panofy 围绕公司真实的支持知识、工作流和回复标准训练 Agent。客服团队可以从手工处理工单，转向一致、合规、AI 辅助的解决流程，而无需复杂微调或工程搭建。',
          },
        ],
        agent: {
          role: '客户支持 Copilot',
          question: '本周哪些支持问题带来了最多重复工单？\u200B团队应该如何更快响应？',
          files: [
            'ticket_history.csv',
            'help_center_faq.pdf',
            'refund_policy.docx',
            'escalation_sop.pdf',
            'product_release_notes.pdf',
          ],
          tasks: [
            { title: '加载工单', body: '查看近期工单量与问题类别。' },
            { title: '聚类主题', body: '识别反复出现的投诉与重复联系。' },
            { title: '定位根因', body: '把问题关联到产品缺口、政策误解或流程延误。' },
            { title: '推荐行动', body: '建议回复改进、回复模板和升级规则。' },
            { title: '生成报告', body: '起草团队可直接使用的支持改进摘要。' },
          ],
        },
        mock: {
          title: '工单队列',
          meta: '今日',
          items: [
            { label: '退货后未收到退款', detail: '#4821 · 退款', tag: '已起草回复' },
            { label: '更新后导出按钮消失', detail: '#4822 · 产品问题', tag: '已起草回复' },
            { label: '年度套餐被重复扣费', detail: '#4823 · 账单', tag: '已升级' },
            { label: '第三次反馈登录循环', detail: '#4824 · 重复联系', tag: '已关联根因' },
          ],
          note: '回复引用 refund_policy.docx 与 escalation_sop.pdf',
        },
      },
      sales: {
        label: '销售',
        headline: '知道下一步\u200B该推进哪些交易',
        subtitle: '把 CRM 数据、通话记录和销售手册转化为 Agent，帮助销售优先跟进重点账户、个性化触达，并准备更有说服力的方案。',
        sections: [
          {
            title: '为什么这个团队需要 AI',
            body: '销售团队花了太多时间查找 CRM 记录、回看会议纪要、准备跟进内容，以及判断哪些账户最值得投入。管线越大，越难识别高意向机会、做好个性化沟通，并让每个销售动作都对应正确的客户上下文。',
          },
          {
            title: 'Panofy 可以做什么',
            body: 'Panofy 基于 CRM 数据、账户记录、定价手册、会议转写和方案模板训练销售 Agent。Agent 可以给账户评分、总结买方需求、暴露风险与异议、推荐触达话术，并为销售准备方案方向。',
          },
          {
            title: '如何工作',
            body: '把销售管线数据、客户记录、定价文档和会议记录上传到 Panofy，创建“销售管线 Copilot”这样的角色，Agent 就能审阅商机、识别可能转化的账户、提取账户上下文，并为销售团队建议下一次触达。',
          },
          {
            title: '为什么选择 Panofy',
            body: 'Panofy 为销售团队提供理解交易流程、定价逻辑、客户分层和沟通风格的可复用 Agent。销售不再依赖通用 AI 一次次写邮件，而是借助训练好的 Agent 支撑从账户分析到方案准备的完整管线。',
          },
        ],
        agent: {
          role: '销售管线 Copilot',
          question: '本季度哪些账户最可能转化？\u200B销售团队应优先开展哪些触达？',
          files: [
            'crm_pipeline.csv',
            'account_notes.docx',
            'meeting_transcripts.pdf',
            'pricing_playbook.pdf',
            'proposal_templates.pptx',
          ],
          tasks: [
            { title: '加载管线', body: '导入并校验管线数据。' },
            { title: '账户评分', body: '识别高潜力商机。' },
            { title: '总结上下文', body: '提取关键账户洞察与历史。' },
            { title: '起草触达', body: '生成个性化触达内容与下一步。' },
            { title: '准备方案', body: '推荐解决方案与定价。' },
          ],
        },
        mock: {
          title: '销售管线',
          meta: '本季度',
          items: [
            { label: 'Atlas Freight', detail: '已确认', tag: '预约需求沟通' },
            { label: 'Cobalt Labs', detail: '已确认', tag: '确认预算负责人' },
            { label: 'Orbit Retail', detail: '方案', tag: '回应安全评估' },
            { label: 'Lumen Health', detail: '方案', tag: '分享客户案例' },
            { label: 'Kestrel Bank', detail: '谈判', tag: '发送定价跟进' },
            { label: 'Vela Insurance', detail: '谈判', tag: '同步法务审阅' },
          ],
          note: '已根据 account_notes.docx 起草下一次触达',
        },
      },
      marketing: {
        label: '市场',
        headline: '营销活动更快上线，\u200B始终符合品牌',
        subtitle: '基于品牌规范、活动简报、受众画像和效果数据训练 Agent，把策略转化为团队真正可用的内容。',
        sections: [
          {
            title: '为什么这个团队需要 AI',
            body: '市场团队要跨渠道管理品牌规范、活动简报、受众画像、效果报告和内容日历。缺少 AI 支持时，大量时间都耗在把分散的信息整理成活动角度、内容计划和各渠道物料上。',
          },
          {
            title: 'Panofy 可以做什么',
            body: 'Panofy 基于品牌规范、活动简报、受众研究、内容日历和效果数据训练市场 Agent。Agent 可以推荐活动主题、分析历史表现、生成内容方向、起草活动计划，并让每份输出都保持品牌语气。',
          },
          {
            title: '如何工作',
            body: '把品牌文档、活动简报、受众画像和效果报告上传到 Panofy，定义“活动内容策略师”这样的角色，Agent 就能审阅目标、比较历史效果、推荐内容支柱，并生成结构化的上市内容计划。',
          },
          {
            title: '为什么选择 Panofy',
            body: 'Panofy 能沉淀品牌标准、活动上下文和可复用的创意逻辑。团队不必每次从零写提示词，而是训练理解品牌、受众、语气和活动流程的 Agent，让内容生产更快、更一致。',
          },
        ],
        agent: {
          role: '活动内容策略师',
          question: '下一次发布应优先采用哪些活动角度？\u200B市场团队应先制作哪些内容？',
          files: [
            'brand_guidelines.pdf',
            'campaign_brief.docx',
            'audience_personas.xlsx',
            'content_calendar.csv',
            'performance_report.pdf',
          ],
          tasks: [
            { title: '审阅简报', body: '理解目标、受众和核心信息。' },
            { title: '分析效果', body: '找出表现最好的角度与缺口。' },
            { title: '推荐主题', body: '优先排序潜力最高的角度。' },
            { title: '起草内容计划', body: '列出内容创意与渠道组合。' },
            { title: '生成报告', body: '交付附带理由和下一步的优先级计划。' },
          ],
        },
        mock: {
          title: '发布内容计划',
          meta: '第 1–4 周',
          items: [
            { label: '博客', detail: '产品故事', tag: '符合品牌' },
            { label: '邮件', detail: '客户证言', tag: '符合品牌' },
            { label: '社交媒体', detail: '使用指南', tag: '语气待调整' },
            { label: '线上研讨会', detail: '产品故事', tag: '符合品牌' },
          ],
          note: '已对照 performance_report.pdf 排序内容角度',
        },
      },
      data: {
        label: '数据',
        headline: '把分散的指标\u200B变成清晰的下一步',
        subtitle: '用基于仪表盘、报告和业务数据训练的 Agent，帮助团队理解发生了什么、为什么发生、接下来该做什么。',
        sections: [
          {
            title: '为什么这个团队需要 AI',
            body: '业务团队需要更快获得洞察，但数据往往分散在仪表盘、CSV、报告、产品使用日志和月度总结中。分析师把大量时间花在清洗、比较、解释和汇报指标上，而不是专注于战略判断。',
          },
          {
            title: 'Panofy 可以做什么',
            body: 'Panofy 基于 KPI 仪表盘、收入报告、流失指标、产品使用数据和高管摘要训练数据 Agent。Agent 可以发现指标变化、标记异常、解释可能的驱动因素、总结趋势，并起草面向相关方的洞察报告。',
          },
          {
            title: '如何工作',
            body: '把结构化数据、仪表盘导出和周期性业务报告上传到 Panofy，创建“数据洞察分析师”这样的角色，Agent 就能审阅关键指标、比较不同时期的表现、识别预警信号，并为业务团队生成简洁的解释。',
          },
          {
            title: '为什么选择 Panofy',
            body: 'Panofy 让非技术团队也能轻松使用数据分析，同时让每份输出都扎根于公司文件和业务上下文。企业可以训练理解自身 KPI、报告结构和决策优先级的 Agent，而不是依赖通用回答。',
          },
        ],
        agent: {
          role: '数据洞察分析师',
          question: '本月 KPI 发生了哪些变化？\u200B哪些指标需要立即关注？',
          files: [
            'kpi_dashboard.csv',
            'revenue_report.xlsx',
            'churn_metrics.csv',
            'product_usage.csv',
            'monthly_summary.pdf',
          ],
          tasks: [
            { title: '加载数据', body: '导入 KPI 与运营数据集。' },
            { title: '发现趋势', body: '识别显著的环比变化。' },
            { title: '标记异常', body: '找出超出正常范围的指标。' },
            { title: '解释驱动因素', body: '判断关键变化的根本原因。' },
            { title: '生成报告', body: '交付洞察与建议。' },
          ],
        },
        mock: {
          title: 'KPI 监控',
          meta: '环比',
          items: [
            { label: '收入', detail: '上升', tag: '正常' },
            { label: '活跃账户', detail: '平稳', tag: '正常' },
            { label: '流失率', detail: '骤升', tag: '超出范围' },
            { label: '产品使用', detail: '持平', tag: '正常' },
          ],
          note: '已根据 churn_metrics.csv 起草驱动因素分析',
        },
      },
      hr: {
        label: '人力资源',
        headline: '用更完整的上下文\u200B支持人员决策',
        subtitle: '基于政策、招聘数据、敬业度调查和入职材料训练 Agent，帮助 HR 团队解答员工问题，更早发现人员风险。',
        sections: [
          {
            title: '为什么这个团队需要 AI',
            body: 'HR 团队管理员工政策、招聘管线、敬业度调查、入职材料和留任数据。组织规模扩大后，HR 需要更快地解答员工问题、识别人员风险、支持管理者并改善员工体验。',
          },
          {
            title: 'Panofy 可以做什么',
            body: 'Panofy 基于员工政策文档、流失数据、招聘管线、敬业度调查和入职清单训练 HR Agent。Agent 可以解答内部政策问题、分析流失风险、总结调查结果、准备入职指引，并推荐留任行动。',
          },
          {
            title: '如何工作',
            body: '把 HR 数据集、政策文档、调查结果和入职材料上传到 Panofy，定义“HR 流失风险分析师”这样的角色，Agent 就能按团队、岗位、任期和工作负载比较风险，并起草给管理者的留任建议。',
          },
          {
            title: '为什么选择 Panofy',
            body: 'Panofy 让 HR 团队把人员运营知识转化为可靠、可复用的 Agent，摆脱手工查文档、翻表格，更快支持政策问答，获得更好的人员洞察，并为管理者提供更一致的指导。',
          },
        ],
        agent: {
          role: 'HR 流失风险分析师',
          question: '本季度哪些团队流失风险最高？\u200BHR 应优先采取哪些留任行动？',
          files: [
            'employee_attrition.csv',
            'hiring_pipeline.xlsx',
            'people_policy.docx',
            'engagement_survey.pdf',
            'onboarding_checklist.pdf',
          ],
          tasks: [
            { title: '加载数据', body: '导入 HRIS、敬业度和绩效数据。' },
            { title: '分析驱动因素', body: '识别导致流失的关键因素。' },
            { title: '预测风险', body: '按流失概率为团队和岗位评分。' },
            { title: '推荐行动', body: '按影响和可行性排序留任举措。' },
            { title: '生成报告', body: '交付包含洞察与行动的高管摘要。' },
          ],
        },
        mock: {
          title: '各团队流失风险',
          meta: '本季度',
          items: [
            { label: '客服', detail: '工作负载', tag: '高' },
            { label: '销售', detail: '任期不足一年', tag: '中' },
            { label: '工程', detail: '敬业度调查', tag: '低' },
            { label: '运营', detail: '排班覆盖', tag: '中' },
          ],
          note: '已为每位管理者起草留任行动',
        },
      },
      legal: {
        label: '法务',
        headline: '更有把握地审阅协议',
        subtitle: '使用基于合同、合规政策、条款库和备用条款训练的 Agent，发现风险，准备更清晰的法务审阅。',
        sections: [
          {
            title: '为什么这个团队需要 AI',
            body: '法务团队需要在紧张的时间内审阅合同、合规政策、供应商协议、备用条款和安全附录。这些工作大多需要与内部标准逐条比对，而手工审阅缓慢、重复，难以扩展。',
          },
          {
            title: 'Panofy 可以做什么',
            body: 'Panofy 基于合同草案、政策文档、条款库、合规规则和内部法律标准训练法务 Agent。Agent 可以标记风险条款、对照公司政策比较条款、总结合同风险，并为法务审阅建议修改优先级。',
          },
          {
            title: '如何工作',
            body: '把协议、合规政策、法务手册和备用条款上传到 Panofy，创建“合同风险审阅员”这样的角色，Agent 就能审阅合同草案、识别责任或终止风险、检查政策一致性，并准备结构化的风险摘要。',
          },
          {
            title: '为什么选择 Panofy',
            body: 'Panofy 不替代法律判断，而是帮助法务团队更快、更一致地审阅文档。基于公司法律标准和已批准语言训练的 Agent，让合同审阅更安全，最终决策始终由人掌控。',
          },
        ],
        agent: {
          role: '合同风险审阅员',
          question: '这份供应商协议中哪些条款风险最高？\u200B法务应优先修改哪些内容？',
          files: [
            'msa_draft.docx',
            'vendor_agreement.pdf',
            'security_addendum.pdf',
            'compliance_policy.pdf',
            'fallback_clauses.docx',
          ],
          tasks: [
            { title: '加载文档', body: '导入供应商协议及相关材料。' },
            { title: '标记风险条款', body: '识别高风险条款与偏离。' },
            { title: '对照政策', body: '对照法务手册与内部标准检查。' },
            { title: '建议修改', body: '提出修订意见与替代条款。' },
            { title: '生成报告', body: '总结风险与建议行动。' },
          ],
        },
        mock: {
          title: 'vendor_agreement.pdf',
          meta: '审阅中',
          items: [
            { label: '§4 付款条款', detail: '与法务手册一致', tag: '一致' },
            { label: '§9 责任限制', detail: '赔偿上限低于政策底线', tag: '高风险' },
            { label: '§12 终止', detail: '可使用备用条款', tag: '建议修改' },
            { label: '§15 安全附录', detail: '缺少数据保留条款', tag: '建议修改' },
          ],
          note: '风险摘要已就绪，等待法务审阅',
        },
      },
      engineering: {
        label: '工程',
        headline: '把工程知识\u200B转化为更快的行动',
        subtitle: '基于技术文档、事故记录、迭代数据和复盘材料训练 Agent，帮助团队理解阻塞、指派负责人并确定修复优先级。',
        sections: [
          {
            title: '为什么这个团队需要 AI',
            body: '工程团队要面对代码库、事故记录、迭代看板、架构文档、API 参考和复盘笔记。系统越复杂，工程师越需要更快地理解事故、梳理依赖、帮助新人上手，并排好技术工作的优先级。',
          },
          {
            title: 'Panofy 可以做什么',
            body: 'Panofy 基于事故记录、API 文档、系统架构文件、迭代导出和复盘笔记训练工程 Agent。Agent 可以总结阻塞、梳理受影响的系统、推荐下一步行动、支持新人入职，并按严重程度和客户影响排序修复。',
          },
          {
            title: '如何工作',
            body: '把技术文档、事故记录、迭代数据和架构参考上传到 Panofy，定义“工程事故 Copilot”这样的角色，Agent 就能审阅阻塞、识别负责人、把问题与系统关联起来，并起草工程行动摘要。',
          },
          {
            title: '为什么选择 Panofy',
            body: 'Panofy 帮助工程团队沉淀技术知识，减少在分散文档中搜索的时间。团队不再只依赖个人记忆或手工分诊，而是训练理解自身系统、工作流和事故响应标准的 Agent。',
          },
        ],
        agent: {
          role: '工程事故 Copilot',
          question: '哪些事故正在阻塞本次迭代？\u200B工程团队应优先推进哪些修复、指派哪些负责人？',
          files: [
            'incident_log.csv',
            'sprint_board_export.xlsx',
            'system_architecture.pdf',
            'api_docs.docx',
            'postmortem_notes.pdf',
          ],
          tasks: [
            { title: '加载事故', body: '导入近期事故及相关元数据。' },
            { title: '梳理依赖', body: '识别受影响的服务与团队。' },
            { title: '排序修复', body: '按影响、紧急程度和工作量评分。' },
            { title: '推荐行动', body: '建议修复方案并指派负责人。' },
            { title: '生成报告', body: '为工程团队生成可直接用于迭代的摘要。' },
          ],
        },
        mock: {
          title: '迭代阻塞项',
          meta: '第 24 迭代',
          items: [
            { label: '结账 API 超时', detail: 'payments-api · 支付', tag: 'SEV 1' },
            { label: '搜索索引延迟', detail: 'search-indexer · 平台', tag: 'SEV 2' },
            { label: 'Webhook 重试失败', detail: 'notifications · 集成', tag: 'SEV 2' },
            { label: '部署流水线不稳定', detail: 'ci-runner · 研发效能', tag: 'SEV 3' },
          ],
          note: '已根据 system_architecture.pdf 建议负责人',
        },
      },
      operations: {
        label: '运营',
        headline: '在瓶颈拖慢业务\u200B之前发现它',
        subtitle: '基于 SOP、供应商记录、异常日志和流程指标训练 Agent，识别延误、推荐修复，让运营持续顺畅。',
        sections: [
          {
            title: '为什么这个团队需要 AI',
            body: '运营团队要跨多个工作流管理 SOP、供应商状态、履约指标、异常日志和流程报告。瓶颈往往藏在分散的系统里，团队很难快速识别重复问题、量化影响，并判断哪些流程改进最重要。',
          },
          {
            title: 'Panofy 可以做什么',
            body: 'Panofy 基于 SOP 库、履约数据、供应商记录、异常日志和周报训练运营 Agent。Agent 可以发现瓶颈、识别反复出现的流程故障、分析运营影响、推荐改进，并为团队起草行动计划。',
          },
          {
            title: '如何工作',
            body: '把 SOP、流程指标、供应商文件和异常日志上传到 Panofy，创建“运营工作流优化师”这样的角色，Agent 就能审阅工作流、识别延误、量化成本或服务影响，并提出运营改进建议。',
          },
          {
            title: '为什么选择 Panofy',
            body: 'Panofy 帮助运营团队把流程知识转化为实用、可复用的 Agent，更快诊断工作流、更好地执行 SOP、更一致地推进流程改进，而无需从零构建复杂的自动化系统。',
          },
        ],
        agent: {
          role: '运营工作流优化师',
          question: '本月最大的流程瓶颈在哪里？\u200B应优先推进哪些运营改进？',
          files: [
            'sop_library.pdf',
            'fulfillment_metrics.csv',
            'vendor_status.xlsx',
            'exception_log.csv',
            'weekly_ops_report.pdf',
          ],
          tasks: [
            { title: '审阅工作流', body: '分析当前的运营工作流与数据来源。' },
            { title: '发现瓶颈', body: '识别影响最大的延误、交接与约束。' },
            { title: '分析影响', body: '量化对周期、吞吐、成本和客户体验的影响。' },
            { title: '推荐行动', body: '按影响和工作量排序运营改进。' },
            { title: '生成报告', body: '交付包含洞察与下一步的清晰摘要。' },
          ],
        },
        mock: {
          title: '订单履约',
          meta: '本月',
          items: [
            { label: '订单接收', detail: '自动处理', tag: '顺畅' },
            { label: '供应商确认', detail: '等待供应商', tag: '瓶颈' },
            { label: '拣货', detail: '符合 SLA', tag: '顺畅' },
            { label: '发货', detail: '符合 SLA', tag: '顺畅' },
          ],
          note: '已根据 sop_library.pdf 提出改进方案',
        },
      },
    },
  },
} satisfies Record<Locale, DepartmentsPageCopy>
