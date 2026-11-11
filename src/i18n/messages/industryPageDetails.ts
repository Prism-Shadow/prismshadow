import type { Locale } from '../locales'
import type { IndustryId } from './shared'

/*
 * Industry page details: why-now points, scenarios, PrismShadow fit reasons and
 * resources for the eight industry solution pages. Only the lazy IndustryPage
 * chunk imports this file. Page-level copy (hero, section heads, CTA) lives in
 * ./industryPages.ts.
 */

export type IndustryPointCopy = {
  title: string
  body: string
  /** One-line takeaway under the body. */
  note?: string
}

export type IndustryUseCaseCopy = {
  title: string
  body: string
}

export type IndustryScenarioCopy = {
  id: string
  /** Tab label in the scenario explorer. */
  label: string
  title: string
  description: string
  useCases: IndustryUseCaseCopy[]
  /** The briefing the agent team hands over, shown at the foot of the workspace mock. */
  insight: { title: string; body: string }
  /** Agent trace in the workspace mock as [label, value]: first row is the trigger, last row the outcome. */
  trace: [string, string][]
  /** Status chip in the workspace mock header. */
  badge: string
}

export type IndustryResourceCopy = {
  category: string
  title: string
  body: string
  cta: string
  href: string
  readingTime?: string
}

export type IndustryDetailsCopy = {
  whyNow: IndustryPointCopy[]
  scenarios: IndustryScenarioCopy[]
  /** Why PrismShadow: reasons the industry needs an agent layer. */
  reasons: IndustryPointCopy[]
  resources: IndustryResourceCopy[]
}

export const industryPageDetailsCopy = {
  en: {
    'b2b-saas': {
      whyNow: [
        {
          title: 'From AI tools to agent workflows',
          body: 'Move beyond isolated assistants and standardize how teams use AI across recurring customer and GTM decisions.',
        },
        {
          title: 'From scattered customer data to decision-ready insight',
          body: 'Connect the signals teams already collect into workflows that produce clearer recommendations and next steps.',
        },
        {
          title: 'From manual analysis to governed automation',
          body: 'Keep teams in control with repeatable workflows, approvals, source traceability, and auditable outputs.',
        },
      ],
      scenarios: [
        {
          id: 'customer-health',
          label: 'Customer health',
          title: 'Customer health & renewal risk',
          description: 'Help revenue teams understand which accounts need attention, what changed, and which action should happen next.',
          useCases: [
            {
              title: 'Churn risk detection',
              body: 'Connect usage drop-off, support escalations, renewal timing, stakeholder activity, and customer sentiment.',
            },
            {
              title: 'Account brief preparation',
              body: 'Prepare concise briefs for CSMs, sales leaders, product teams, and executives before renewal reviews.',
            },
            {
              title: 'Expansion signal review',
              body: 'Surface product adoption patterns, active champions, feature interest, and buying-team signals.',
            },
            {
              title: 'Human follow-up routing',
              body: 'Route risk and opportunity signals to the right owner with evidence, context, and recommended next steps.',
            },
          ],
          insight: {
            title: 'Account action briefing',
            body: 'Turn fragmented customer signals into renewal risk summaries, owner workflows, and review-ready next actions.',
          },
          trace: [
            ['Customer signal', 'Usage declined while renewal is approaching'],
            ['CRM context', 'Owner, ARR, stage, renewal motion'],
            ['Product usage', 'Seat activity and adoption change surfaced'],
            ['Support context', 'Open escalations and unresolved requests'],
            ['Revenue impact', 'Priority accounts ranked for review'],
            ['Recommended action', 'Prepare account brief and route to owner'],
          ],
          badge: 'Revenue review',
        },
        {
          id: 'gtm-validation',
          label: 'GTM validation',
          title: 'GTM, ICP & messaging intelligence',
          description: 'Help GTM teams test market assumptions, understand buying signals, and turn customer evidence into sharper campaigns.',
          useCases: [
            {
              title: 'ICP signal analysis',
              body: 'Compare won, lost, active, and high-fit accounts by pain point, segment, industry, role, and use case.',
            },
            {
              title: 'Messaging validation',
              body: 'Evaluate launch narratives, objection themes, competitor mentions, pricing concerns, and buyer language.',
            },
            {
              title: 'Synthetic ICP testing',
              body: 'Use grounded customer profiles to test ideas before committing roadmap, campaign, or sales resources.',
            },
            {
              title: 'Campaign briefing',
              body: 'Prepare segment-specific campaign notes, proof points, positioning angles, and risk flags.',
            },
          ],
          insight: {
            title: 'GTM evidence briefing',
            body: 'Connect customer voice, sales calls, CRM notes, and product signals before high-stakes GTM decisions.',
          },
          trace: [
            ['Team question', 'Which ICP segment is reacting strongest?'],
            ['Sales calls', 'Objection and value themes extracted'],
            ['CRM notes', 'Win-loss context matched by segment'],
            ['Product signal', 'Feature adoption by account profile'],
            ['Messaging risk', 'Claims needing stronger proof surfaced'],
            ['Recommended action', 'Prepare GTM brief for review'],
          ],
          badge: 'GTM workspace',
        },
        {
          id: 'product-feedback',
          label: 'Product feedback',
          title: 'Product feedback & roadmap intelligence',
          description: 'Help product teams separate loud feedback from repeated customer evidence and make roadmap discussions easier to review.',
          useCases: [
            {
              title: 'Feedback clustering',
              body: 'Group customer requests, support themes, sales notes, interviews, and roadmap feedback by problem pattern.',
            },
            {
              title: 'Segment impact review',
              body: 'Connect feedback to ARR, usage, account tier, ICP fit, industry, adoption, and churn risk.',
            },
            {
              title: 'Evidence-backed prioritization',
              body: 'Prepare product briefs with source trails, supporting accounts, trade-offs, and confidence signals.',
            },
            {
              title: 'Launch feedback loop',
              body: 'Feed post-launch adoption, support reaction, and sales feedback back into the next product cycle.',
            },
          ],
          insight: {
            title: 'Roadmap evidence briefing',
            body: 'Turn scattered feedback into product decisions with source context, business impact, and reusable learning.',
          },
          trace: [
            ['Feedback theme', 'Workflow automation requested by enterprise accounts'],
            ['Source bundle', 'Calls, tickets, interviews, and notes attached'],
            ['Segment impact', 'Enterprise ARR and adoption context surfaced'],
            ['Roadmap trade-off', 'Effort, urgency, and opportunity compared'],
            ['Launch signal', 'Post-release adoption feedback retained'],
            ['Recommended action', 'Prepare roadmap review summary'],
          ],
          badge: 'Product review',
        },
        {
          id: 'sales-workflows',
          label: 'Sales workflows',
          title: 'Sales & account workflow automation',
          description: 'Help sales teams prepare better account work without losing the context behind the recommendation.',
          useCases: [
            {
              title: 'Account research',
              body: 'Assemble company context, buyer role, recent interaction history, product usage, and active opportunity notes.',
            },
            {
              title: 'Meeting preparation',
              body: 'Generate call briefs, stakeholder maps, open questions, risk notes, and suggested next steps.',
            },
            {
              title: 'Objection handling',
              body: 'Prepare grounded responses using proof points, customer examples, competitive notes, and approved language.',
            },
            {
              title: 'Follow-up drafting',
              body: 'Turn call notes, action items, product context, and buyer priorities into consistent follow-up workflows.',
            },
          ],
          insight: {
            title: 'Sales workflow briefing',
            body: 'Connect CRM, calls, product usage, and playbooks so reps can act quickly with context attached.',
          },
          trace: [
            ['Deal question', 'What should the rep do before the next call?'],
            ['CRM activity', 'Recent notes and opportunity stage reviewed'],
            ['Buyer context', 'Stakeholders and objections surfaced'],
            ['Usage signal', 'Adoption proof points prepared'],
            ['Approved language', 'Message aligned with playbook'],
            ['Recommended action', 'Draft follow-up and assign next step'],
          ],
          badge: 'Sales briefing',
        },
      ],
      reasons: [
        {
          title: 'Customer signal intelligence',
          body: 'Unify feedback from CRM, calls, tickets, interviews, and product usage.',
        },
        {
          title: 'Research & GTM agents',
          body: 'Automate recurring questions around ICP, messaging, pricing, feature demand, and churn risk.',
        },
        {
          title: 'Governed agent workflows',
          body: 'Keep teams in control with approvals, permissions, source traceability, and audit logs.',
        },
      ],
      resources: [
        {
          category: 'Strategy / AI agents / SaaS growth',
          title: "B2B SaaS doesn't need more AI tools. It needs agent orchestration.",
          body: 'SaaS teams are under pressure to grow more efficiently, retain customers, and prove ROI. The answer is not another disconnected AI tool - it is a governed agent layer that connects customer signals to product, GTM, sales, and customer success workflows.',
          cta: 'Read the article',
          href: '/blog/b2b-saas-ai-agent-orchestration',
          readingTime: '6 min read',
        },
        {
          category: 'Playbook / Implementation',
          title: 'Start with your top 20 SaaS questions',
          body: 'The fastest way to deploy AI agents is not to automate everything. Start with the recurring questions your SaaS teams already ask every week, then turn them into repeatable, governed workflows.',
          cta: 'Read the playbook',
          href: '/blog/top-20-saas-questions-ai-agent-workflows',
          readingTime: '5 min read',
        },
        {
          category: 'GTM / Product validation / Synthetic data',
          title: 'Synthetic ICP testing for SaaS product and GTM teams',
          body: 'Before committing roadmap or campaign budget, SaaS teams can use synthetic ICP profiles to test messaging, pricing, feature concepts, and positioning assumptions - then validate high-stakes decisions with real customers.',
          cta: 'Explore synthetic testing',
          href: '/blog/synthetic-icp-testing-saas-product-gtm',
          readingTime: '6 min read',
        },
      ],
    },
    'financial-services': {
      whyNow: [
        {
          title: 'Financial context is fragmented by design',
          body: 'Policies, client files, risk playbooks, transaction history, research, case notes, and approval rules often live across separated systems.',
        },
        {
          title: 'Private data cannot become generic context',
          body: 'Sensitive financial workflows need local deployment, permission boundaries, source control, and institution-specific knowledge.',
        },
        {
          title: 'Every recommendation needs a review trail',
          body: 'Risk, compliance, underwriting, AML, and client-facing work require evidence, approvals, escalation paths, and audit-ready records.',
        },
      ],
      scenarios: [
        {
          id: 'risk-compliance',
          label: 'Risk & compliance',
          title: 'Risk, compliance & policy review',
          description: 'Help teams connect policies, control requirements, case context, and review paths before decisions move forward.',
          useCases: [
            {
              title: 'Policy Q&A and interpretation',
              body: 'Ground answers in approved policy documents, risk playbooks, control language, and internal review rules.',
            },
            {
              title: 'Regulatory review preparation',
              body: 'Summarize relevant rules, required evidence, gaps, and review status for compliance teams.',
            },
            {
              title: 'Audit evidence summaries',
              body: 'Prepare source trails showing which documents, cases, decisions, and approvals supported an outcome.',
            },
            {
              title: 'Escalation routing',
              body: 'Route ambiguous, high-risk, or policy-sensitive cases to the right owner with context attached.',
            },
          ],
          insight: {
            title: 'Controlled risk briefing',
            body: 'Turn policy, controls, source documents, and case details into review-ready decisions with audit context.',
          },
          trace: [
            ['Policy question', 'Can this exception be approved?'],
            ['Approved source', 'Policy, procedure, and control set matched'],
            ['Case context', 'Client file, notes, and exposure surfaced'],
            ['Risk threshold', 'High-impact review path triggered'],
            ['Evidence trail', 'Sources and assumptions captured'],
            ['Recommended action', 'Route to risk operations for approval'],
          ],
          badge: 'Risk review',
        },
        {
          id: 'credit-underwriting',
          label: 'Credit & underwriting',
          title: 'Credit, underwriting & decision support',
          description: 'Help analysts prepare faster, more consistent credit and underwriting work without removing human judgment.',
          useCases: [
            {
              title: 'Application review',
              body: 'Extract borrower, business, collateral, financial, policy, and exception context from submitted materials.',
            },
            {
              title: 'Risk memo drafting',
              body: 'Prepare structured memos with source citations, assumptions, policy alignment, and review questions.',
            },
            {
              title: 'Policy-based screening',
              body: 'Compare cases against underwriting rules, approval thresholds, documentation requirements, and exception paths.',
            },
            {
              title: 'Committee briefings',
              body: 'Summarize open issues, exposure, mitigants, and decision points for human review.',
            },
          ],
          insight: {
            title: 'Underwriting brief',
            body: 'Connect policy, evidence, financials, and exception logic into a consistent review package.',
          },
          trace: [
            ['Application file', 'Borrower package and financials ingested'],
            ['Policy screen', 'Eligibility and exception rules checked'],
            ['Exposure summary', 'Key risk factors and mitigants surfaced'],
            ['Missing evidence', 'Required documents flagged'],
            ['Memo draft', 'Decision package prepared'],
            ['Recommended action', 'Send to underwriter review'],
          ],
          badge: 'Credit workflow',
        },
        {
          id: 'fraud-aml',
          label: 'Fraud & AML',
          title: 'Fraud, AML & investigation workflows',
          description: 'Help investigation teams triage alerts, explain anomalies, and prepare human-readable case summaries.',
          useCases: [
            {
              title: 'Alert triage',
              body: 'Combine transaction signals, customer profile, case history, behavior changes, and rule triggers.',
            },
            {
              title: 'Anomaly explanation',
              body: 'Prepare explanations that connect signal changes to historical behavior, peer patterns, and policy rules.',
            },
            {
              title: 'Investigation summaries',
              body: 'Summarize case history, evidence, suspicious activity indicators, and recommended next steps.',
            },
            {
              title: 'Human review queueing',
              body: 'Prioritize cases for analyst review while preserving evidence and escalation boundaries.',
            },
          ],
          insight: {
            title: 'Investigation packet',
            body: 'Move from isolated alerts to case-ready context, source trails, and analyst review paths.',
          },
          trace: [
            ['Alert signal', 'Unusual transaction pattern detected'],
            ['Customer profile', 'Historical behavior and account context matched'],
            ['Rule trigger', 'AML threshold and exception notes reviewed'],
            ['Case history', 'Prior activity and analyst notes attached'],
            ['Evidence packet', 'Relevant records grouped'],
            ['Recommended action', 'Escalate for analyst decision'],
          ],
          badge: 'AML triage',
        },
        {
          id: 'wealth-research',
          label: 'Wealth & research',
          title: 'Wealth, research & client preparation',
          description: 'Help advisors and research teams prepare grounded client work with approved sources, product context, and institution rules.',
          useCases: [
            {
              title: 'Research digests',
              body: 'Summarize market notes, internal research, approved product materials, and client-relevant developments.',
            },
            {
              title: 'Product comparison',
              body: 'Compare approved products, risk profiles, fee structures, suitability rules, and client constraints.',
            },
            {
              title: 'Client meeting preparation',
              body: 'Prepare advisor briefs using portfolio context, recent questions, approved language, and next-step options.',
            },
            {
              title: 'Service follow-up',
              body: 'Turn meeting notes, open tasks, and review requirements into consistent follow-up workflows.',
            },
          ],
          insight: {
            title: 'Advisor-ready briefing',
            body: 'Bring research, client history, product rules, and approved language into one prepared workspace.',
          },
          trace: [
            ['Client question', 'How should we review this portfolio change?'],
            ['Research note', 'Approved market context summarized'],
            ['Product policy', 'Suitability and disclosure rules checked'],
            ['Portfolio context', 'Recent allocation and preferences surfaced'],
            ['Meeting brief', 'Talking points and open questions prepared'],
            ['Recommended action', 'Prepare advisor review package'],
          ],
          badge: 'Advisor workspace',
        },
      ],
      reasons: [
        {
          title: 'Financial agents need institution-trained knowledge',
          body: 'Generic answers are not enough for financial workflows. Agents need policies, procedures, approval rules, product constraints, and business context from the institution.',
        },
        {
          title: 'Financial data needs local-first control',
          body: 'PrismShadow supports agent workflows designed around private deployment, permission boundaries, and sensitive internal knowledge.',
        },
        {
          title: 'Financial decisions need human oversight',
          body: 'Agents can retrieve, summarize, draft, classify, and recommend, while risk-bearing actions remain routed to the right human reviewers.',
        },
        {
          title: 'Financial teams need evidence, not just output',
          body: 'Source trails, assumptions, review status, and approval history help teams understand why a recommendation was prepared.',
        },
        {
          title: 'Financial knowledge should improve over time',
          body: 'Reusable feedback, reviewer corrections, repeated exceptions, and decision outcomes can become long-term operating memory.',
        },
      ],
      resources: [
        {
          category: 'Financial AI agents',
          title: 'Private financial AI needs more than a chat interface',
          body: 'See how agent workflows can connect policies, review paths, private context, and human oversight for financial services teams.',
          cta: 'Read the guide',
          href: '/blog',
        },
        {
          category: 'Risk & compliance',
          title: 'From policy documents to review-ready risk workflows',
          body: 'Learn how PrismShadow can help financial teams turn fragmented institutional knowledge into controlled agent workflows.',
          cta: 'Explore resources',
          href: '/blog',
        },
      ],
    },
    retail: {
      whyNow: [
        {
          title: 'Customer journeys are no longer linear',
          body: 'Customers move between discovery, comparison, checkout, support, returns, and repeat purchase. Retailers need agents that can carry context across the full journey.',
        },
        {
          title: 'Retail knowledge is scattered',
          body: 'Product data, policies, promotions, inventory, order information, customer history, support tickets, and SOPs often live in different systems.',
        },
        {
          title: 'Retail conditions change every day',
          body: 'New products launch. Campaigns change. Inventory moves. Policies update. Customer questions shift. Retailers need AI workflows that keep up.',
        },
      ],
      scenarios: [
        {
          id: 'customer-experience',
          label: 'Customer experience',
          title: 'Customer experience orchestration',
          description: 'Create connected customer experiences across discovery, purchase, and post-purchase moments.',
          useCases: [
            {
              title: 'Intent & preference understanding',
              body: 'Understand customer needs, budget, occasion, preferences, constraints, and shopping context from natural conversation.',
            },
            {
              title: 'Product & policy guidance',
              body: 'Answer questions about product details, fit, compatibility, delivery, returns, warranty, and usage with business-aware context.',
            },
            {
              title: 'Cross-channel continuity',
              body: 'Keep answers consistent across website, support, store teams, internal tools, and post-purchase interactions.',
            },
            {
              title: 'Checkout confidence',
              body: 'Resolve questions about shipping, discounts, payment, delivery timing, availability, and return rules before customers drop off.',
            },
          ],
          insight: {
            title: 'Journey memory briefing',
            body: 'Preserve shopper context across product questions, checkout concerns, support requests, and return conversations.',
          },
          trace: [
            ['Customer question', 'I need a travel-friendly gift under $100.'],
            ['Product context', 'Portable, durable, in-stock options'],
            ['Policy context', 'Gift receipt, warranty, return window'],
            ['Recommended action', 'Suggest 3 options and confirm shipping date'],
          ],
          badge: 'Context retained',
        },
        {
          id: 'service-returns',
          label: 'Service & returns',
          title: 'Customer service & returns',
          description: 'Resolve high-volume retail support while preserving business context.',
          useCases: [
            {
              title: 'Ticket triage',
              body: 'Classify support requests by issue type, urgency, policy category, order status, and next step.',
            },
            {
              title: 'Order support',
              body: 'Handle questions about order status, delivery updates, address changes, invoices, delays, cancellations, and stock issues.',
            },
            {
              title: 'Returns & exchanges',
              body: 'Explain return eligibility, refund status, exchange options, return windows, policy exceptions, and required actions.',
            },
            {
              title: 'Agent assist',
              body: 'Summarize customer history, draft replies, surface relevant policies, and prepare escalation notes for human teams.',
            },
          ],
          insight: {
            title: 'Support workflow briefing',
            body: 'Summarize open tickets, repeated issues, return reasons, and recommended next steps for support teams.',
          },
          trace: [
            ['Support inbox', 'Return request, order delayed, invoice issue'],
            ['Classified ticket', 'Return eligibility - medium urgency'],
            ['Order card', 'Delivered 6 days ago, item unopened'],
            ['Draft response', 'Eligible return with prepaid label instructions'],
          ],
          badge: 'Policy matched',
        },
        {
          id: 'retail-intelligence',
          label: 'Retail intelligence',
          title: 'Retail intelligence & analysis',
          description: 'Turn retail data and feedback into faster business decisions.',
          useCases: [
            {
              title: 'Self-service data Q&A',
              body: 'Ask questions about sales, orders, conversion, returns, inventory, campaigns, support volume, and customer behavior.',
            },
            {
              title: 'Sales & demand trends',
              body: 'Analyze SKU performance, category movement, regional demand, channel trends, and seasonal changes.',
            },
            {
              title: 'Customer feedback analysis',
              body: 'Summarize reviews, support conversations, return reasons, complaints, and product feedback to identify friction points.',
            },
            {
              title: 'Market & competitor monitoring',
              body: 'Track competitor activity, price changes, promotions, industry news, and market signals that may affect retail decisions.',
            },
          ],
          insight: {
            title: 'Daily retail intelligence',
            body: 'Send personalized briefings with sales trends, return spikes, inventory signals, customer feedback, and competitor moves.',
          },
          trace: [
            ['Analytics query', 'Why did returns spike in outerwear this week?'],
            ['Trend signal', 'Returns +18%, size-related mentions rising'],
            ['Feedback summary', 'Fit runs small in two top SKUs'],
            ['Recommended action', 'Update size guidance and review product page copy'],
          ],
          badge: 'Daily briefing',
        },
        {
          id: 'operations',
          label: 'Operations',
          title: 'Retail operations & fulfillment',
          description: 'Help teams coordinate inventory, fulfillment, policies, and daily retail execution.',
          useCases: [
            {
              title: 'Inventory & replenishment support',
              body: 'Help teams understand stock status, replenishment rules, low-stock risk, assortment questions, and inventory movement.',
            },
            {
              title: 'Fulfillment exception handling',
              body: 'Support questions around delayed shipments, delivery exceptions, warehouse constraints, store pickup, and order routing.',
            },
            {
              title: 'Promotion & policy execution',
              body: 'Clarify campaign rules, discount eligibility, product exclusions, channel messaging, return conditions, and customer-facing policy language.',
            },
            {
              title: 'Operational knowledge assistant',
              body: 'Help employees search SOPs, product docs, training materials, brand guidelines, internal policies, and workflow instructions.',
            },
          ],
          insight: {
            title: 'Operations action briefing',
            body: 'Surface fulfillment exceptions, inventory risks, promotion rules, and policy updates before they create customer friction.',
          },
          trace: [
            ['Inventory status', 'Low-stock risk in West region'],
            ['Fulfillment exception', 'Carrier delay affecting 184 orders'],
            ['Promotion rule', 'Bundle discount excludes clearance items'],
            ['Operational action', 'Route affected orders and notify support'],
          ],
          badge: 'Action prepared',
        },
      ],
      reasons: [
        {
          title: 'Retail context changes constantly',
          body: 'Products, promotions, policies, inventory, fulfillment rules, and customer questions change fast. PrismShadow helps keep agent workflows aligned with current retail reality.',
        },
        {
          title: 'Retail knowledge is spread across many systems',
          body: 'Catalogs, orders, support tickets, inventory data, policies, customer history, and internal documents often sit apart. PrismShadow helps turn that scattered knowledge into agent-ready context.',
        },
        {
          title: 'Retail service depends on continuity',
          body: 'A customer may ask about a product today, order tomorrow, and request a return next week. PrismShadow helps preserve context across the full customer journey.',
        },
        {
          title: 'Retail teams need control over sensitive data',
          body: "Customer history, pricing, inventory, supplier information, and internal policies are business-critical. PrismShadow can be deployed around the retailer's data environment and governance needs.",
        },
      ],
      resources: [
        {
          category: 'Retail AI',
          title: 'How AI agents improve the next-generation retail experience',
          body: 'Explore how agents support customer journeys, service, operations, and decision-making in modern retail.',
          cta: 'Read the retail AI guide',
          href: '/blog/how-ai-agents-improve-next-generation-retail-experience',
        },
        {
          category: 'Retail AI',
          title: 'From fragmented retail knowledge to agent-ready context',
          body: 'Learn how retailers can connect product, policy, order, support, and operations knowledge for AI workflows.',
          cta: 'Read the retail AI guide',
          href: '/blog',
        },
        {
          category: 'Retail AI',
          title: 'Why static retail workflows break in fast-changing markets',
          body: 'Understand why fixed scripts and traditional systems struggle with changing products, policies, demand, and fulfillment.',
          cta: 'Read the retail AI guide',
          href: '/blog',
        },
      ],
    },
    travel: {
      whyNow: [
        {
          title: 'Traveler journeys are context-heavy',
          body: 'A trip is not one transaction. Travelers move from planning to booking, check-in, disruption handling, support, and post-trip service.',
        },
        {
          title: 'Travel knowledge is fragmented',
          body: 'Bookings, PNRs, fare rules, hotel policies, loyalty data, refund conditions, support tickets, and operational updates often live apart.',
        },
        {
          title: 'Travel conditions change in real time',
          body: 'Flights are delayed. Bags go missing. Prices change. Hotel availability shifts. Teams need agents that can respond to live context.',
        },
      ],
      scenarios: [
        {
          id: 'traveler-experience',
          label: 'Traveler experience',
          title: 'Traveler experience orchestration',
          description: 'Create connected traveler experiences across planning, booking, trip changes, and post-trip support.',
          useCases: [
            {
              title: 'Trip intent understanding',
              body: 'Understand goals, budget, destination preferences, timing constraints, loyalty status, travel purpose, and personal context.',
            },
            {
              title: 'Personalized trip guidance',
              body: 'Recommend flights, hotels, routes, activities, upgrades, ancillaries, and options based on traveler context and business rules.',
            },
            {
              title: 'Policy-aware recommendations',
              body: 'Guide travelers with fare rules, refund conditions, baggage policies, visa requirements, corporate policies, and eligibility constraints.',
            },
            {
              title: 'Journey memory',
              body: 'Preserve preferences, previous questions, booking context, and support history across the full journey.',
            },
          ],
          insight: {
            title: 'Journey memory briefing',
            body: 'Keep traveler context available from planning to booking, disruption handling, and post-trip support.',
          },
          trace: [
            ['Traveler request', 'Can I move my return flight and keep my hotel?'],
            ['Booking record', 'Round trip, hotel attached, loyalty member'],
            ['Fare rules', 'Change window open, fare difference applies'],
            ['Hotel policy', 'No penalty before local cutoff'],
            ['Traveler preference', 'Evening return, aisle seat, same hotel'],
            ['Recommended next action', 'Offer two return options and keep hotel intact'],
          ],
          badge: 'Journey context retained',
        },
        {
          id: 'booking-operations',
          label: 'Booking operations',
          title: 'Booking operations automation',
          description: 'Help travel teams handle complex booking rules, customer requests, and repetitive operational tasks faster.',
          useCases: [
            {
              title: 'Fare rules expert',
              body: 'Answer questions about change fees, cancellation conditions, refund eligibility, fare class restrictions, and provider-specific rules.',
            },
            {
              title: 'Booking record assistant',
              body: 'Summarize PNRs, booking history, traveler entitlements, previous changes, missing details, and agent actions.',
            },
            {
              title: 'Inbox request intake',
              body: 'Read traveler emails, detect intent, identify missing information, draft replies, and prepare next-step actions for review.',
            },
            {
              title: 'Offer monitoring',
              body: 'Track price changes, upgrade opportunities, alternative options, hotel availability, and ancillary services.',
            },
          ],
          insight: {
            title: 'Booking workflow briefing',
            body: 'Surface fare rules, booking history, missing traveler details, and next steps before agents search manually.',
          },
          trace: [
            ['Incoming email', 'Need to change outbound flight and add a hotel night'],
            ['PNR summary', 'Two passengers, one prior change, meal preference saved'],
            ['Fare rule result', 'Change permitted with fare difference'],
            ['Missing details', 'Confirm new departure window'],
            ['Draft reply', 'Prepared for human review'],
            ['Recommended offer', 'Earlier flight plus hotel extension'],
          ],
          badge: 'Booking brief ready',
        },
        {
          id: 'passenger-service',
          label: 'Passenger service',
          title: 'Passenger service & disruption support',
          description: 'Support travelers faster when plans change, service issues arise, or human teams need context.',
          useCases: [
            {
              title: 'Passenger support automation',
              body: 'Handle questions about baggage, check-in, booking changes, cancellations, refunds, claims, and travel policies.',
            },
            {
              title: 'Disruption response',
              body: 'Help teams respond to delays, cancellations, missed connections, weather events, overbooking, and schedule changes.',
            },
            {
              title: 'Rebooking & claims assistance',
              body: 'Assess eligibility, gather required information, recommend rebooking options, and prepare refund or claim workflows.',
            },
            {
              title: 'Contact center agent assist',
              body: 'Summarize traveler history, identify issue type, draft responses, surface policy context, and prepare escalation notes.',
            },
          ],
          insight: {
            title: 'Disruption action briefing',
            body: 'When travel plans break, agents help teams understand the traveler, the booking, the policy, and the next best resolution.',
          },
          trace: [
            ['Delay alert', 'Weather delay on connecting route'],
            ['Affected travelers', '42 high-priority itineraries'],
            ['Booking context', 'Missed connection risk, hotel required'],
            ['Rebooking options', 'Three eligible alternatives found'],
            ['Claim eligibility', 'Compensation review prepared'],
            ['Support draft', 'Traveler update ready for approval'],
          ],
          badge: 'Disruption action prepared',
        },
        {
          id: 'travel-intelligence',
          label: 'Travel intelligence',
          title: 'Travel intelligence & analysis',
          description: 'Give travel teams natural-language access to operational, commercial, and customer insights.',
          useCases: [
            {
              title: 'Self-service travel analytics',
              body: 'Ask questions about bookings, demand, revenue, routes, occupancy, passenger flow, support volume, and performance.',
            },
            {
              title: 'Revenue & demand insights',
              body: 'Analyze route performance, fare families, hotel demand, occupancy trends, agency performance, and seasonal changes.',
            },
            {
              title: 'Operational event monitoring',
              body: 'Track disruption signals, baggage events, passenger processing times, airport capacity, resource constraints, and anomalies.',
            },
            {
              title: 'Executive briefings',
              body: 'Generate briefings with demand changes, operational risks, traveler feedback, revenue opportunities, and recommended actions.',
            },
          ],
          insight: {
            title: 'Daily travel intelligence',
            body: 'Send teams a concise briefing on demand shifts, service issues, operational bottlenecks, and commercial opportunities.',
          },
          trace: [
            ['Natural-language query', 'Which routes are underperforming this week?'],
            ['Trend chart', 'Bookings down 12% on two business routes'],
            ['Demand signal', 'Weekend leisure demand rising'],
            ['Operational issue', 'Support volume up around baggage events'],
            ['Recommended action', 'Adjust offer mix and prepare service briefing'],
            ['Executive brief', 'Daily summary ready'],
          ],
          badge: 'Intelligence briefing',
        },
      ],
      reasons: [
        {
          title: 'Travel depends on continuity',
          body: 'A traveler may plan today, book tomorrow, change flights next week, and request help during the trip. PrismShadow helps preserve context across the journey.',
        },
        {
          title: 'Travel rules are complex and contextual',
          body: 'Fare rules, refund conditions, baggage policies, loyalty status, corporate policies, and partner rules vary by provider, route, timing, and traveler.',
        },
        {
          title: 'Travel operations are event-driven',
          body: 'Delays, cancellations, missed connections, baggage events, weather, airport congestion, and availability changes require fast decisions.',
        },
        {
          title: 'Travel data spans many systems and partners',
          body: 'Bookings, PNRs, CRM, contact centers, airport systems, hotel systems, loyalty platforms, policy documents, and partner data are often disconnected.',
        },
        {
          title: 'Travel teams need human-in-the-loop control',
          body: 'Many travel workflows affect safety, compliance, customer trust, and financial outcomes. Agents assist, recommend, summarize, and prepare actions while teams stay in control.',
        },
      ],
      resources: [
        {
          category: 'Travel AI agents',
          title: 'Travel’s real problem isn’t search. It’s context.',
          body: 'Travelers ask simple questions. Travel systems make them complicated. See how AI agents connect bookings, policies, live events, and traveler history into next actions.',
          cta: 'Read the article',
          href: '/blog/travel-ai-agents-context',
        },
      ],
    },
    healthcare: {
      whyNow: [
        {
          title: 'Health journeys are becoming continuous',
          body: 'Consumers and patients need support across products, benefits, appointments, follow-ups, and changing health needs.',
        },
        {
          title: 'Healthcare knowledge is evidence-heavy and fragmented',
          body: 'Evidence, labels, payer rules, SOPs, support records, and context often live across disconnected systems.',
        },
        {
          title: 'Trust cannot be added later',
          body: 'Healthcare AI needs controlled responses, clear escalation rules, human review, and traceable recommendations from the start.',
        },
      ],
      scenarios: [
        {
          id: 'consumer-health',
          label: 'Consumer health',
          title: 'Consumer health guidance',
          description: 'Help consumers move from vague health needs to evidence-informed, explainable next steps.',
          useCases: [
            {
              title: 'Need & signal understanding',
              body: 'Understand consumer goals, stated concerns, preferences, purchase history, wearable signals, lifestyle context, and support needs.',
            },
            {
              title: 'Evidence-based product guidance',
              body: 'Compare OTC products, supplements, wellness options, labels, ingredients, evidence, safety information, and preferences.',
            },
            {
              title: 'Risk & interaction checks',
              body: 'Surface possible interactions, contraindications, dosage concerns, age restrictions, or situations that require professional guidance.',
            },
            {
              title: 'Follow-up & health journey memory',
              body: 'Preserve context across check-ins, previous questions, product experiences, preferences, and ongoing health goals.',
            },
          ],
          insight: {
            title: 'Need-led health briefing',
            body: 'Turn consumer context, product evidence, safety checks, and preferences into explainable guidance with escalation when needed.',
          },
          trace: [
            ['Consumer question', 'Help me choose a magnesium supplement for sleep.'],
            ['Sleep concern', 'Rest quality, routine, stated goals'],
            ['Product label', 'Ingredients, serving size, warnings'],
            ['Evidence summary', 'Approved information and source notes'],
            ['Safety check', 'Interaction and handoff criteria reviewed'],
            ['Recommended next step', 'Share options and route questions for review'],
          ],
          badge: 'Guidance with handoff',
        },
        {
          id: 'patient-access',
          label: 'Patient access',
          title: 'Patient access & support',
          description: 'Help healthcare teams simplify high-volume access, coverage, authorization, and service workflows.',
          useCases: [
            {
              title: 'Eligibility & benefits support',
              body: 'Help teams verify coverage context, benefits details, plan rules, copays, deductibles, and required next steps.',
            },
            {
              title: 'Prior authorization intake',
              body: 'Collect required information, identify missing documents, summarize case context, and prepare authorization workflows.',
            },
            {
              title: 'Appointment & care navigation',
              body: 'Guide patients through scheduling, referrals, preparation instructions, follow-up requirements, and service options.',
            },
            {
              title: 'Billing & claims assistance',
              body: 'Support questions around claims status, payment responsibility, missing information, denial reasons, and escalation paths.',
            },
          ],
          insight: {
            title: 'Access workflow briefing',
            body: 'Collect required details, surface payer rules, identify missing information, and prepare next actions for staff review.',
          },
          trace: [
            ['Patient request', 'Why was my medication delayed?'],
            ['Coverage status', 'Benefit context and plan details surfaced'],
            ['Authorization rule', 'Prior authorization step required'],
            ['Missing documents', 'Provider form and supporting notes needed'],
            ['Response draft', 'Staff-ready explanation prepared'],
            ['Escalation path', 'Route to access team for review'],
          ],
          badge: 'Staff review ready',
        },
        {
          id: 'evidence-compliance',
          label: 'Evidence & compliance',
          title: 'Evidence, trust & compliance operations',
          description: 'Help healthcare organizations create AI workflows that are grounded, explainable, and controlled.',
          useCases: [
            {
              title: 'Evidence dossier readiness',
              body: 'Structure product data, evidence summaries, safety information, claims, and supporting documentation for AI workflows.',
            },
            {
              title: 'Controlled response guardrails',
              body: 'Limit responses to approved actions, compliant language, verified sources, and defined escalation rules.',
            },
            {
              title: 'Recommendation & interaction logs',
              body: 'Track what information was used, what recommendation was prepared, and when human review or escalation occurred.',
            },
            {
              title: 'Human-in-the-loop review',
              body: 'Route complex, high-risk, ambiguous, or regulated cases to clinicians, pharmacists, compliance teams, or operators.',
            },
          ],
          insight: {
            title: 'Trust-by-design briefing',
            body: 'Connect every answer to evidence, policy, source, guardrail, and review path.',
          },
          trace: [
            ['Agent prepares recommendation', 'Draft guidance assembled for review'],
            ['Approved evidence', 'Verified source bundle attached'],
            ['Policy rule', 'Permitted language and action limits'],
            ['Risk category', 'Escalation threshold checked'],
            ['Audit log', 'Source, action, and review path captured'],
            ['Human review status', 'Routed before final communication'],
          ],
          badge: 'Traceable workflow',
        },
        {
          id: 'healthcare-intelligence',
          label: 'Healthcare intelligence',
          title: 'Healthcare intelligence & operations',
          description: 'Give healthcare teams faster access to operational insight, service trends, quality signals, and improvement opportunities.',
          useCases: [
            {
              title: 'Self-service healthcare analytics',
              body: 'Ask natural-language questions about patient access, support volume, authorization delays, claims, service quality, and performance.',
            },
            {
              title: 'Patient & provider feedback analysis',
              body: 'Summarize calls, tickets, reviews, complaints, surveys, and support transcripts to identify recurring friction.',
            },
            {
              title: 'Workflow bottleneck detection',
              body: 'Find delays caused by missing documentation, payer rules, authorization steps, call handoffs, staffing gaps, or process variation.',
            },
            {
              title: 'Quality review & case monitoring',
              body: 'Review conversations, flag contradictions, check SOP adherence, identify high-risk cases, and support continuous improvement.',
            },
          ],
          insight: {
            title: 'Operations intelligence briefing',
            body: 'Surface repeated delays, policy gaps, service risks, and quality issues before they become larger patient experience problems.',
          },
          trace: [
            ['Team question', 'Which authorization requests are delaying access this week?'],
            ['Case volume chart', 'Volume up 18% across two service lines'],
            ['Missing documents', 'Forms absent in 31% of delayed cases'],
            ['Payer rule', 'Common requirement mismatch detected'],
            ['Quality review flag', 'Escalation language needs review'],
            ['Recommended workflow action', 'Prepare briefing and update intake checklist'],
          ],
          badge: 'Operations briefing',
        },
      ],
      reasons: [
        {
          title: 'Healthcare answers must be controlled',
          body: 'Free-form AI is risky in healthcare. Agents need approved language, verified sources, defined workflows, and clear escalation boundaries.',
        },
        {
          title: 'Healthcare knowledge changes constantly',
          body: 'Policies, payer rules, product evidence, safety information, guidance, SOPs, and expectations are always evolving.',
        },
        {
          title: 'Healthcare context is sensitive and fragmented',
          body: 'Patient interactions, benefits information, product evidence, support cases, claims data, and internal policies often sit across separate systems.',
        },
        {
          title: 'Healthcare trust requires traceability',
          body: 'Teams need to know why an answer was prepared, what information supported it, and when a human should review it.',
        },
        {
          title: 'Healthcare automation still needs human oversight',
          body: 'Many workflows affect safety, compliance, access, cost, and trust. PrismShadow assists, prepares, summarizes, routes, and recommends while people stay in control.',
        },
      ],
      resources: [
        {
          category: 'Healthcare AI agents',
          title: 'Building trustworthy healthcare AI agent workflows',
          body: 'Healthcare teams do not need more fluent AI answers. They need approved context, escalation paths, human review, and auditability.',
          cta: 'Read the article',
          href: '/blog/healthcare-ai-guardrails-not-prompts',
        },
        {
          category: 'Patient access',
          title: 'How AI agents can improve patient access operations',
          body: 'See how agents can connect eligibility, benefits, prior authorization, documentation, and patient communication into next actions.',
          cta: 'Read the article',
          href: '/blog/healthcare-ai-patient-access-operations',
        },
      ],
    },
    'supply-chain': {
      whyNow: [
        {
          title: 'Disruptions happen continuously',
          body: 'Supplier delays, demand spikes, port congestion, weather events, material shortages, production constraints, and shipment exceptions can change the plan at any moment.',
        },
        {
          title: 'Supply chain knowledge is fragmented',
          body: 'ERP, WMS, TMS, MES, procurement tools, supplier portals, contracts, SOPs, spreadsheets, and emails often hold different parts of the same decision.',
        },
        {
          title: 'Trade-offs cross functions',
          body: 'A single decision can affect cost, service level, inventory, capacity, working capital, revenue, and customer commitments.',
        },
      ],
      scenarios: [
        {
          id: 'control-tower',
          label: 'Control tower',
          title: 'End-to-end supply chain control tower',
          description: 'Sense disruptions, understand business impact, and coordinate action across supply chain teams.',
          useCases: [
            {
              title: 'Disruption monitoring',
              body: 'Monitor supplier delays, material shortages, shipment exceptions, demand spikes, order risks, weather events, port congestion, and external risk signals.',
            },
            {
              title: 'Root cause analysis',
              body: 'Trace exceptions back to suppliers, inventory gaps, production constraints, warehouse bottlenecks, carrier delays, BOM dependencies, or order changes.',
            },
            {
              title: 'Scenario simulation',
              body: 'Compare mitigation options such as expediting shipments, reallocating inventory, using alternate suppliers, resequencing production, or splitting orders.',
            },
            {
              title: 'Executive action briefings',
              body: 'Summarize impacted customers, orders, revenue, service levels, risks, and recommended next actions for leadership review.',
            },
          ],
          insight: {
            title: 'Disruption action briefing',
            body: 'Surface what changed, what it affects, and which mitigation options require human approval.',
          },
          trace: [
            ['Disruption alert', 'Supplier shipment delayed by 5 days'],
            ['Impacted orders', 'Top-priority orders at risk this week'],
            ['Inventory coverage', 'Critical SKU coverage below target'],
            ['Supplier status', 'Alternate source under review'],
            ['Customer priority', 'Revenue and service impact surfaced'],
            ['Recommended mitigation', 'Review reallocation and expedited option'],
          ],
          badge: 'Control tower briefing',
        },
        {
          id: 'planning-inventory',
          label: 'Planning & inventory',
          title: 'Demand, replenishment & inventory orchestration',
          description: 'Help planning teams align demand signals, inventory coverage, replenishment actions, and service-level risk.',
          useCases: [
            {
              title: 'Demand signal monitoring',
              body: 'Track sales, forecasts, open orders, promotions, seasonality, customer behavior, and external demand signals to identify changes early.',
            },
            {
              title: 'Inventory rebalancing',
              body: 'Identify overstocks, shortages, slow-moving inventory, stockout risk, and transfer opportunities across warehouses, plants, stores, regions, or channels.',
            },
            {
              title: 'Replenishment recommendations',
              body: 'Prepare reorder priorities, safety stock adjustments, purchase signals, production signals, and replenishment actions based on business rules.',
            },
            {
              title: 'Service level risk alerts',
              body: 'Flag SKUs, customers, regions, plants, or orders that may miss service commitments due to inventory or supply constraints.',
            },
          ],
          insight: {
            title: 'Inventory risk briefing',
            body: 'Connect demand, supply, inventory, and service-level context so planners can act before shortages become customer issues.',
          },
          trace: [
            ['Demand signal', 'SKU demand increased 18% this week'],
            ['Inventory coverage', 'East DC: 4 days, West DC: 21 days'],
            ['Warehouse imbalance', 'Transfer opportunity surfaced'],
            ['Replenishment priority', 'Safety stock review prepared'],
            ['Service-level risk', 'High risk for top 3 customers'],
            ['Recommended action', 'Prepare transfer and replenishment plan'],
          ],
          badge: 'Planning workspace',
        },
        {
          id: 'supplier-procurement',
          label: 'Supplier & procurement',
          title: 'Supplier risk & procurement intelligence',
          description: 'Help procurement teams monitor supplier risk, compare sourcing options, and prepare procurement workflows.',
          useCases: [
            {
              title: 'Supplier risk monitoring',
              body: 'Monitor supplier performance, delivery delays, quality issues, capacity constraints, compliance signals, weather events, geopolitical risk, and financial risk indicators.',
            },
            {
              title: 'Quote & contract intelligence',
              body: 'Summarize RFQs, supplier quotes, lead times, pricing terms, contract clauses, SLA commitments, penalties, and renewal conditions.',
            },
            {
              title: 'Alternative sourcing',
              body: 'Surface approved substitutes, alternate suppliers, secondary sources, material alternatives, and qualification constraints when supply risk appears.',
            },
            {
              title: 'Compliance & SLA checks',
              body: 'Identify documentation gaps, supplier obligations, policy conflicts, compliance requirements, and approvals needed before procurement action.',
            },
          ],
          insight: {
            title: 'Supplier risk briefing',
            body: 'Bring supplier performance, contract terms, risk signals, and sourcing options into one decision-ready view.',
          },
          trace: [
            ['Supplier risk', 'Supplier A delayed two shipments this month'],
            ['Contract terms', 'SLA and penalty context surfaced'],
            ['Open POs', 'Three dependent orders reviewed'],
            ['Alternate suppliers', 'Supplier B ready for partial substitution'],
            ['Compliance checklist', 'Documentation gaps flagged'],
            ['Recommended action', 'Prepare escalation note for procurement review'],
          ],
          badge: 'Procurement review',
        },
        {
          id: 'logistics-fulfillment',
          label: 'Logistics & fulfillment',
          title: 'Logistics & fulfillment execution',
          description: 'Help logistics and fulfillment teams manage shipment exceptions, carrier options, warehouse bottlenecks, and customer delivery risk.',
          useCases: [
            {
              title: 'Shipment exception management',
              body: 'Monitor delayed shipments, held loads, customs issues, missing documents, damaged goods, late ASNs, missing PODs, and delivery exceptions.',
            },
            {
              title: 'Carrier & route evaluation',
              body: 'Compare carrier performance, route options, transit time, cost, capacity, service levels, and delivery risk before recommending next steps.',
            },
            {
              title: 'Warehouse fulfillment support',
              body: 'Surface picking delays, packing bottlenecks, labor constraints, slotting issues, backlog risk, and fulfillment exceptions across facilities.',
            },
            {
              title: 'Customer delivery risk briefings',
              body: 'Prepare customer- or account-level summaries showing impacted orders, delivery risk, mitigation options, and communication drafts.',
            },
          ],
          insight: {
            title: 'Delivery risk briefing',
            body: 'Connect shipment, warehouse, carrier, order, and customer context before delivery issues become escalations.',
          },
          trace: [
            ['Shipment exception', 'Carrier delay on Lane 42'],
            ['Affected orders', 'Priority orders tied to delivery promise'],
            ['Carrier options', 'Carrier B available for reroute review'],
            ['Warehouse backlog', 'Picking delay and labor note surfaced'],
            ['Customer update', 'Communication draft prepared'],
            ['Recommended action', 'Review reroute for priority orders'],
          ],
          badge: 'Execution support',
        },
      ],
      reasons: [
        {
          title: 'Supply chain decisions depend on connected context',
          body: 'Demand, inventory, suppliers, production, logistics, costs, service levels, and customer commitments all affect the same decision. PrismShadow helps turn fragmented operational data into agent-ready context.',
        },
        {
          title: 'Supply chain conditions change continuously',
          body: 'Orders shift, suppliers delay, inventory moves, weather changes, ports congest, and capacity tightens. PrismShadow helps agents monitor changing context and surface risks early.',
        },
        {
          title: 'Supply chain trade-offs cross functions',
          body: 'The best action for inventory may not be the best action for cost, customer service, production, or working capital. PrismShadow helps teams compare options before acting.',
        },
        {
          title: 'Supply chain teams need explainable recommendations',
          body: 'High-impact decisions cannot be black boxes. PrismShadow helps agents present context, assumptions, trade-offs, and recommended next steps for review.',
        },
        {
          title: 'Supply chain knowledge should compound over time',
          body: 'Every exception teaches the business something about suppliers, lanes, customers, SKUs, warehouses, and recovery playbooks. PrismShadow helps future workflows start smarter.',
        },
      ],
      resources: [
        {
          category: 'Supply chain AI agents',
          title: 'From control towers to agentic supply chain operations',
          body: 'Supply chain teams do not need another dashboard. They need agents that connect disruption signals, operational context, trade-offs, and next actions.',
          cta: 'Read the article',
          href: '/blog/agentic-supply-chain-control-towers',
        },
        {
          category: 'Scenario simulation',
          title: 'Why supply chain AI needs human-governed scenario simulation',
          body: 'See how agents can compare mitigation options, explain trade-offs, and route high-impact supply chain decisions for human review.',
          cta: 'Read the article',
          href: '/blog/supply-chain-ai-human-governed-simulation',
        },
        {
          category: 'Planning & inventory',
          title: 'Demand and inventory planning need an agent layer',
          body: 'Forecasts matter, but planners also need agents that connect demand, inventory coverage, replenishment rules, service risk, and approvals.',
          cta: 'Read the article',
          href: '/blog/supply-chain-demand-inventory-agent-layer',
        },
        {
          category: 'Supplier risk',
          title: 'Supplier risk becomes useful when it reaches the workflow',
          body: 'Supplier risk scores are only the beginning. See how agents connect supplier signals, contracts, open POs, sourcing options, and review paths.',
          cta: 'Read the article',
          href: '/blog/supply-chain-supplier-risk-workflow',
        },
      ],
    },
    restaurants: {
      whyNow: [
        {
          title: 'Revenue is spread across channels',
          body: 'Restaurants now sell through dine-in, delivery, social deals, private traffic, memberships, and online ordering. Each channel has different fees, discounts, customer behavior, and margin impact.',
          note: 'Operators need one view of true channel profitability.',
        },
        {
          title: 'GMV does not equal profit',
          body: 'A campaign can drive orders and still lose money after discounts, platform fees, packaging, food cost, labor, and refunds.',
          note: 'Restaurants need agents that calculate contribution profit, not just sales volume.',
        },
        {
          title: 'Insights fail without execution',
          body: 'Finding a problem is not enough. Store managers, kitchen leads, and operators need clear tasks, owners, evidence, and follow-up.',
          note: 'Restaurants need an execution loop from insight to action.',
        },
      ],
      scenarios: [
        {
          id: 'profit-control',
          label: 'Profit control',
          title: 'Cross-channel profit control',
          description: 'See which channels, campaigns, stores, and menu items actually make money after fees, discounts, labor, and food costs.',
          useCases: [
            {
              title: 'Unified channel view',
              body: 'Combine dine-in POS, delivery, social deals, private orders, memberships, payments, and refunds into one operating view.',
            },
            {
              title: 'Net profit by channel',
              body: 'Compare channels by contribution profit, not just GMV, order volume, or traffic.',
            },
            {
              title: 'Campaign P&L',
              body: 'Calculate whether discounts, bundles, coupons, and platform campaigns are driving profit or creating loss.',
            },
            {
              title: 'Store profit comparison',
              body: 'Compare stores by revenue, margin, labor cost, food cost, campaign performance, and execution quality.',
            },
          ],
          insight: {
            title: 'Profit briefing',
            body: 'Turn sales, fees, discounts, food cost, and labor into a clear answer: what made money, what leaked margin, and what to do next.',
          },
          trace: [
            ['Yesterday revenue', 'Dine-in: $4,820; Delivery: $3,460; Social Deals: $1,900; Private Orders: $740'],
            ['Agent checks', 'Platform fees, discount cost, food cost, labor cost, refunds'],
            ['Result', 'Delivery GMV up, contribution margin down'],
            ['Recommended action', 'Pause low-margin campaign for review'],
          ],
          badge: 'Profit briefing',
        },
        {
          id: 'daily-briefing',
          label: 'Daily briefing',
          title: 'Daily owner briefing',
          description: "Turn yesterday's performance into a clear daily action plan before the next service.",
          useCases: [
            {
              title: 'Daily close summary',
              body: 'Summarize revenue, orders, average ticket, gross margin, labor ratio, food cost, and abnormal changes.',
            },
            {
              title: 'Anomaly diagnosis',
              body: 'Detect unusual drops in sales, margin leakage, food cost spikes, low labor productivity, refund changes, or weak add-on sales.',
            },
            {
              title: 'Top 3 actions',
              body: 'Generate the most important actions for today, ranked by business impact and urgency.',
            },
            {
              title: 'Follow-up review',
              body: "Compare yesterday's tasks with today's results to see whether the store actually improved.",
            },
          ],
          insight: {
            title: "Today's operating plan",
            body: 'Give owners a one-page view of what happened, why it happened, and which actions should happen today.',
          },
          trace: [
            ['Daily briefing', 'Yesterday performance ready for owner review'],
            ['Yesterday', 'Revenue down 7.8%; dinner average ticket down 12%; beef cost abnormal'],
            ["Today's actions", 'Review beef yield; adjust 9PM labor; pause low-margin coupon'],
            ['Follow-up', 'Check task outcome after evening close'],
          ],
          badge: 'Owner briefing',
        },
        {
          id: 'store-execution',
          label: 'Store execution',
          title: 'Store execution loop',
          description: 'Convert AI recommendations into tasks for store managers, kitchen leads, operations, finance, and procurement teams.',
          useCases: [
            {
              title: 'Task generation',
              body: 'Turn detected issues into clear tasks with owner, deadline, priority, and expected outcome.',
            },
            {
              title: 'Role-based assignment',
              body: 'Assign actions to store managers, kitchen leads, front-of-house teams, operations, or finance.',
            },
            {
              title: 'Evidence collection',
              body: 'Request photos, screenshots, shift records, inventory counts, or notes to verify task completion.',
            },
            {
              title: 'Impact review',
              body: 'Check whether completed tasks improved the target metric the next day or week.',
            },
          ],
          insight: {
            title: 'Execution briefing',
            body: 'Close the loop from AI found a problem to the store fixed it with task tracking, evidence, and results.',
          },
          trace: [
            ['Task', 'Check beef cost anomaly'],
            ['Owner', 'Kitchen Lead'],
            ['Due', 'Today 2:00 PM'],
            ['Evidence', 'Upload prep sheet + actual yield'],
            ['Review metric', 'Beef item margin returns above target'],
          ],
          badge: 'Execution loop',
        },
        {
          id: 'cost-inventory',
          label: 'Cost & inventory',
          title: 'Menu, cost & inventory intelligence',
          description: 'Connect recipes, purchasing, stock, waste, labor, and sales to protect margin at the item and store level.',
          useCases: [
            {
              title: 'Menu margin analysis',
              body: 'Identify high-sales but low-margin dishes, profitable items, weak bundles, and menu pricing opportunities.',
            },
            {
              title: 'Food cost anomaly detection',
              body: 'Compare theoretical food cost from recipes with actual purchasing, stock usage, waste, and sales.',
            },
            {
              title: 'Inventory & prep recommendations',
              body: 'Support daily prep, replenishment, stock risk, expiring ingredients, and expected demand by store.',
            },
            {
              title: 'Supplier & purchase review',
              body: 'Track supplier price changes, abnormal purchase cost, delivery issues, and ingredient-level margin pressure.',
            },
          ],
          insight: {
            title: 'Margin leakage briefing',
            body: 'Detect where profit is leaking through recipes, waste, supplier cost, stock usage, or campaign design.',
          },
          trace: [
            ['Menu item', 'Beef Rice Bowl'],
            ['Theoretical food cost', '32%'],
            ['Actual food cost', '41%'],
            ['Agent checks', 'Recipe BOM, purchase price, stock movement, waste log, sales volume'],
            ['Recommended action', 'Review yield and supplier price for human approval'],
          ],
          badge: 'Margin leakage',
        },
      ],
      reasons: [
        {
          title: 'Restaurant profit lives outside one platform',
          body: 'Delivery platforms, POS systems, social deals, private traffic, procurement, labor, and inventory only show part of the picture. PrismShadow helps restaurant teams connect those fragments into profit-ready context.',
        },
        {
          title: 'Restaurant operators need neutral channel analysis',
          body: "One platform may optimize for orders, but the owner needs to know which channel actually improves profit. PrismShadow helps compare channels from the restaurant's point of view.",
        },
        {
          title: 'Restaurant margins change every shift',
          body: 'Food cost, labor, waste, discounts, refunds, and customer mix can change daily. PrismShadow agents help surface margin risks before they become recurring losses.',
        },
        {
          title: 'Store execution is the real bottleneck',
          body: 'Recommendations only matter when stores act. PrismShadow helps turn insights into assigned tasks, required evidence, and measurable follow-up.',
        },
        {
          title: 'Sensitive profit data should stay under control',
          body: "Real restaurant profit involves purchasing, payroll, rent, supplier terms, margin, and cash flow. PrismShadow can support localized deployment around the operator's data environment and governance needs.",
        },
      ],
      resources: [
        {
          category: 'Restaurant profit',
          title: 'Restaurant AI should start with contribution profit',
          body: 'Revenue reports can hide margin leakage across channels, campaigns, labor, food cost, refunds, and platform fees.',
          cta: 'Read the article',
          href: '/blog/restaurant-ai-contribution-profit',
        },
        {
          category: 'Daily operations',
          title: 'The daily owner briefing is the restaurant agent to build first',
          body: "Turn yesterday's close, anomalies, food cost, labor, and manager notes into today's most important actions.",
          cta: 'Read the article',
          href: '/blog/restaurant-daily-owner-briefing-agent',
        },
      ],
    },
    'auto-dealerships': {
      whyNow: [
        {
          title: 'Dealership data is fragmented',
          body: 'Customer history, leads, service records, inventory, pricing, marketing, auction signals, and communication history often live in separate tools.',
        },
        {
          title: 'Used-car margins are won upstream',
          body: 'Auction price, condition reports, recon cost, transport, local demand, and days-to-turn all shape whether a vehicle is worth pursuing.',
        },
        {
          title: 'Dealer workflows need action',
          body: 'CRM and DMS systems store important information, but dealership teams need agents that can monitor opportunities and prepare next steps.',
        },
      ],
      scenarios: [
        {
          id: 'customer-lifecycle',
          label: 'Customer lifecycle',
          title: 'Customer lifecycle orchestration',
          description: 'Connect leads, showroom interactions, purchases, service history, trade-in timing, and retention moments into one continuous customer journey.',
          useCases: [
            {
              title: 'Lead qualification & prioritization',
              body: 'Score and route leads based on intent, vehicle interest, budget signals, engagement history, and dealership priorities.',
            },
            {
              title: 'Personalized follow-up',
              body: 'Generate timely email, SMS, or staff-ready follow-up suggestions based on customer history, vehicle interest, and next best action.',
            },
            {
              title: 'Customer journey memory',
              body: 'Preserve context across lead capture, showroom visit, purchase, service, trade-in, and loyalty workflows.',
            },
            {
              title: 'Trade-in & equity signals',
              body: 'Surface customers who may be ready for trade-in, upgrade, lease-end, or retention outreach based on ownership and service context.',
            },
          ],
          insight: {
            title: 'Full-cycle customer briefing',
            body: 'Bring lead activity, vehicle interest, service history, and trade-in signals into one agent-ready customer context.',
          },
          trace: [
            ['New lead', 'Looking for used SUV under $28k'],
            ['CRM history', 'Two prior visits and finance question'],
            ['Current vehicle', '2019 Honda CR-V'],
            ['Service history', 'Regular maintenance on record'],
            ['Trade-in signal', 'Equity and upgrade timing surfaced'],
            ['Recommended follow-up', 'Send personalized upgrade outreach'],
          ],
          badge: 'Lifecycle briefing',
        },
        {
          id: 'auction-inventory',
          label: 'Auction & inventory',
          title: 'Auction & inventory intelligence',
          description: 'Help used-car dealerships identify the right vehicles, evaluate auction opportunities, and make faster acquisition decisions with wholesale and retail context.',
          useCases: [
            {
              title: 'Auction run list monitoring',
              body: 'Monitor auction inventory, run lists, digital marketplaces, and saved searches to surface vehicles that match the buying strategy.',
            },
            {
              title: 'Wholesale valuation & bid guidance',
              body: 'Use wholesale comps, market pricing, vehicle history, local retail demand, and inventory goals to recommend bid ceilings.',
            },
            {
              title: 'Condition & recon risk review',
              body: 'Analyze condition reports, photos, seller notes, vehicle history, recon estimates, title status, and transport considerations.',
            },
            {
              title: 'Post-sale speed-to-market',
              body: 'Prepare transportation, inspection, recon, pricing, merchandising, and listing next steps so vehicles become frontline-ready faster.',
            },
          ],
          insight: {
            title: 'Auction briefing',
            body: 'Surface the vehicles worth pursuing, the risks to review, and a suggested bid ceiling before the lane moves on.',
          },
          trace: [
            ['Upcoming auction match', '2022 Toyota Camry SE'],
            ['Auction run list', 'Lane timing and saved search match'],
            ['Wholesale comps', 'Recent comparable sales reviewed'],
            ['Local demand', 'Strong retail demand in local market'],
            ['Recon and transport', 'Medium recon risk with transport estimate'],
            ['Recommended action', 'Review bid up to $18,400'],
          ],
          badge: 'Auction intelligence',
        },
        {
          id: 'deal-fi-operations',
          label: 'Deal & F&I operations',
          title: 'Deal & F&I operations',
          description: 'Help dealership teams support vehicle inquiries, financing questions, protection packages, deal readiness, and manager review workflows.',
          useCases: [
            {
              title: 'Vehicle inquiry assistant',
              body: 'Answer questions about availability, features, mileage, trim, history, incentives, alternatives, and next steps using approved context.',
            },
            {
              title: 'Financing option support',
              body: 'Explain financing, lease, down payment, payment range, and affordability questions in staff-ready language.',
            },
            {
              title: 'F&I pre-qualification workflow',
              body: 'Collect required details, identify missing information, summarize buyer context, and prepare handoff notes for F&I staff.',
            },
            {
              title: 'Deal desk support',
              body: 'Surface deal context, customer history, vehicle details, trade-in notes, finance status, and manager review requirements.',
            },
          ],
          insight: {
            title: 'Deal readiness briefing',
            body: 'Prepare the customer, vehicle, finance, and trade-in context teams need before the deal reaches the desk.',
          },
          trace: [
            ['Customer asks', 'What would payments look like on this model?'],
            ['Vehicle availability', 'Preferred trim available for appointment'],
            ['Budget signal', 'Payment range and down payment noted'],
            ['Trade-in note', 'Current vehicle details captured'],
            ['F&I checklist', 'Missing documents prepared for review'],
            ['Recommended action', 'Prepare F&I handoff summary'],
          ],
          badge: 'Staff review ready',
        },
        {
          id: 'service-retention',
          label: 'Service & retention',
          title: 'Service & retention intelligence',
          description: 'Help dealerships turn service history, maintenance needs, repair status, and loyalty signals into proactive customer retention workflows.',
          useCases: [
            {
              title: 'Service scheduling & reminders',
              body: 'Help customers schedule service, understand maintenance needs, confirm appointments, and receive timely reminders.',
            },
            {
              title: 'Repair status support',
              body: 'Summarize repair order status, parts availability, technician notes, estimated completion, and customer communication needs.',
            },
            {
              title: 'Maintenance & recall outreach',
              body: 'Surface customers due for service, inspections, recalls, warranty work, or recommended maintenance based on service history.',
            },
            {
              title: 'Loyalty & retention outreach',
              body: 'Identify customers at risk of churn, approaching trade-in timing, or eligible for targeted retention offers based on lifecycle context.',
            },
          ],
          insight: {
            title: 'Retention briefing',
            body: 'Turn service events, ownership history, repair status, and trade-in signals into timely retention actions.',
          },
          trace: [
            ['Open repair order', 'Parts status: waiting on part'],
            ['Service history', 'Regular visits with recent advisor note'],
            ['Maintenance signal', '60k service due'],
            ['Recall notice', 'Available recall outreach prepared'],
            ['Retention opportunity', 'Upgrade conversation timing surfaced'],
            ['Recommended outreach', 'Send service update and retention follow-up'],
          ],
          badge: 'Retention workflow',
        },
      ],
      reasons: [
        {
          title: 'Dealer decisions depend on live market context',
          body: 'Used-car pricing, auction supply, retail demand, inventory age, and vehicle velocity change constantly. PrismShadow helps agents work with current dealership context instead of stale reports.',
        },
        {
          title: 'Auction opportunities move fast',
          body: 'The right vehicle may appear in a run list, digital auction, marketplace, or trade network. PrismShadow helps turn fragmented sourcing signals into agent-ready intelligence.',
        },
        {
          title: 'Inventory profit is decided before the car hits the lot',
          body: 'Bid price, condition, recon cost, transport, retail demand, and days-to-turn all affect profit. PrismShadow helps agents evaluate acquisition decisions before they become inventory problems.',
        },
        {
          title: 'Dealership workflows cross many systems',
          body: 'DMS, CRM, inventory tools, auction data, finance, service, marketing, and communication tools all shape dealership performance. PrismShadow helps connect these workflows into an agent layer.',
        },
        {
          title: 'Independent dealerships need leverage',
          body: 'Smaller teams often lack time to monitor every auction, marketplace, customer signal, and service opportunity. PrismShadow agents can help teams source, sell, and retain smarter.',
        },
      ],
      resources: [
        {
          category: 'Used-car margin',
          title: 'Why used-car margins are won before the vehicle hits the lot',
          body: 'Explore how auction intelligence, wholesale comps, condition reports, recon estimates, and local demand shape acquisition decisions.',
          cta: 'Read the article',
          href: '/blog/used-car-margins-before-the-lot',
        },
        {
          category: 'Dealer context',
          title: 'Turning dealer and auction data into agent-ready context',
          body: 'Learn how auto dealerships can connect customer, inventory, auction, pricing, service, and marketing data for AI workflows.',
          cta: 'Read the article',
          href: '/blog/dealer-auction-data-agent-ready-context',
        },
      ],
    },
  },
  zh: {
    'b2b-saas': {
      whyNow: [
        {
          title: '从 AI 工具走向 Agent 工作流',
          body: '超越孤立助手，标准化团队在重复客户和 GTM 决策中使用 AI 的方式。',
        },
        {
          title: '从分散的客户数据，走向可直接决策的洞察',
          body: '连接团队已经收集的信号，让工作流产出更清晰的建议和下一步。',
        },
        {
          title: '从人工分析，走向受治理的自动化',
          body: '用可重复工作流、审批、来源可追踪和可审计输出，让团队保持控制。',
        },
      ],
      scenarios: [
        {
          id: 'customer-health',
          label: '客户健康度',
          title: '客户健康度与续约风险',
          description: '帮助收入团队理解哪些账户需要关注、发生了什么变化，以及下一步应该做什么。',
          useCases: [
            {
              title: '流失风险检测',
              body: '连接使用下降、支持升级、续约时间、利益相关方活动和客户情绪。',
            },
            {
              title: '账户简报准备',
              body: '在续约复盘前，为 CSM、销售负责人、产品团队和高管准备精炼简报。',
            },
            {
              title: '扩张信号复核',
              body: '浮现产品采用模式、活跃拥护者、功能兴趣和购买团队信号。',
            },
            {
              title: '人工跟进路由',
              body: '把风险和机会信号连同证据、上下文和推荐下一步路由给正确负责人。',
            },
          ],
          insight: {
            title: '账户行动简报',
            body: '把分散客户信号转成续约风险摘要、负责人工作流和复核就绪下一步。',
          },
          trace: [
            ['客户信号', '使用量下降且续约临近'],
            ['CRM 上下文', '负责人、ARR、阶段、续约动作'],
            ['产品使用', '席位活跃度和采用变化已浮现'],
            ['支持上下文', '未结升级和未解决请求'],
            ['收入影响', '优先账户已排序待复核'],
            ['推荐行动', '准备账户简报并路由给负责人'],
          ],
          badge: '收入复核',
        },
        {
          id: 'gtm-validation',
          label: 'GTM 验证',
          title: 'GTM、ICP 与话术洞察',
          description: '帮助 GTM 团队测试市场假设、理解购买信号，并把客户证据转化为更精准的活动。',
          useCases: [
            {
              title: 'ICP 信号分析',
              body: '按痛点、细分、行业、角色和用例比较赢单、丢单、活跃和高契合账户。',
            },
            {
              title: '消息验证',
              body: '评估发布叙事、异议主题、竞品提及、价格顾虑和买家语言。',
            },
            {
              title: '合成 ICP 测试',
              body: '在投入路线图、活动或销售资源前，用有依据的客户画像测试想法。',
            },
            {
              title: '活动简报',
              body: '准备面向特定细分的活动备注、证据点、定位角度和风险标记。',
            },
          ],
          insight: {
            title: 'GTM 证据简报',
            body: '在高风险 GTM 决策前，连接客户声音、销售通话、CRM 备注和产品信号。',
          },
          trace: [
            ['团队问题', '哪个 ICP 细分反应最强？'],
            ['销售通话', '异议和价值主题已提取'],
            ['CRM 备注', '按细分匹配赢丢单上下文'],
            ['产品信号', '按账户画像查看功能采用'],
            ['消息风险', '需要更强证据的主张已浮现'],
            ['推荐行动', '准备 GTM 简报供复核'],
          ],
          badge: 'GTM 工作台',
        },
        {
          id: 'product-feedback',
          label: '产品反馈',
          title: '产品反馈与路线图智能',
          description: '帮助产品团队把响亮反馈和重复客户证据区分开，让路线图讨论更容易复核。',
          useCases: [
            {
              title: '反馈聚类',
              body: '按问题模式聚合客户请求、支持主题、销售备注、访谈和路线图反馈。',
            },
            {
              title: '细分影响复核',
              body: '把反馈连接到 ARR、使用、账户层级、ICP 契合度、行业、采用和流失风险。',
            },
            {
              title: '证据支持的优先级',
              body: '准备带来源链路、支持账户、权衡和置信信号的产品简报。',
            },
            {
              title: '发布反馈循环',
              body: '把发布后的采用、支持反应和销售反馈带回下一轮产品周期。',
            },
          ],
          insight: {
            title: '路线图证据简报',
            body: '把分散反馈转化为带来源上下文、业务影响和可复用学习的产品决策。',
          },
          trace: [
            ['反馈主题', '企业账户请求工作流自动化'],
            ['来源包', '通话、工单、访谈和备注已附加'],
            ['细分影响', '企业 ARR 和采用上下文已浮现'],
            ['路线图权衡', '工作量、紧急度和机会已比较'],
            ['发布信号', '发布后采用反馈已保留'],
            ['推荐行动', '准备路线图复盘摘要'],
          ],
          badge: '产品复核',
        },
        {
          id: 'sales-workflows',
          label: '销售工作流',
          title: '销售与账户工作流自动化',
          description: '帮助销售团队准备更好的账户工作，同时不丢失建议背后的上下文。',
          useCases: [
            {
              title: '账户研究',
              body: '组装公司上下文、买家角色、近期互动历史、产品使用和活跃商机备注。',
            },
            {
              title: '会议准备',
              body: '生成通话简报、利益相关方地图、开放问题、风险备注和建议下一步。',
            },
            {
              title: '异议处理',
              body: '使用证据点、客户案例、竞品备注和已批准语言准备有依据的回复。',
            },
            {
              title: '跟进起草',
              body: '把通话备注、行动项、产品上下文和买家优先级转成一致的跟进工作流。',
            },
          ],
          insight: {
            title: '销售工作流简报',
            body: '连接 CRM、通话、产品使用和打法手册，让销售代表能带着上下文快速行动。',
          },
          trace: [
            ['交易问题', '下次通话前销售代表应该做什么？'],
            ['CRM 活动', '近期备注和商机阶段已复核'],
            ['买家上下文', '利益相关方和异议已浮现'],
            ['使用信号', '采用证据点已准备'],
            ['已批准语言', '消息与打法手册一致'],
            ['推荐行动', '起草跟进并分配下一步'],
          ],
          badge: '销售简报',
        },
      ],
      reasons: [
        {
          title: '客户信号智能',
          body: '统一来自 CRM、通话、工单、访谈和产品使用的反馈。',
        },
        {
          title: '研究与 GTM Agent',
          body: '自动化围绕 ICP、消息、定价、功能需求和流失风险的重复问题。',
        },
        {
          title: '受治理 Agent 工作流',
          body: '用审批、权限、来源可追踪和审计日志让团队保持控制。',
        },
      ],
      resources: [
        {
          category: '策略 / AI Agent / SaaS 增长',
          title: 'B2B SaaS 不需要更多 AI 工具，而需要 Agent 编排',
          body: 'SaaS 团队面临更高效增长、留住客户和证明 ROI 的压力。答案不是另一个割裂的 AI 工具，而是能把客户信号连接到产品、GTM、销售和客户成功工作流的受治理 Agent 层。',
          cta: '阅读文章',
          href: '/blog/b2b-saas-ai-agent-orchestration',
          readingTime: '6 分钟阅读',
        },
        {
          category: '打法 / 实施',
          title: '从你的前 20 个 SaaS 问题开始',
          body: '部署 AI Agent 最快的方式不是自动化一切。先从 SaaS 团队每周反复提出的问题开始，再把它们变成可重复、受治理的工作流。',
          cta: '阅读打法',
          href: '/blog/top-20-saas-questions-ai-agent-workflows',
          readingTime: '5 分钟阅读',
        },
        {
          category: 'GTM / 产品验证 / 合成数据',
          title: '面向 SaaS 产品与 GTM 团队的合成 ICP 测试',
          body: '在投入路线图或活动预算前，SaaS 团队可以用合成 ICP 画像测试消息、定价、功能概念和定位假设，再用真实客户验证高风险决策。',
          cta: '探索合成测试',
          href: '/blog/synthetic-icp-testing-saas-product-gtm',
          readingTime: '6 分钟阅读',
        },
      ],
    },
    'financial-services': {
      whyNow: [
        {
          title: '金融上下文天然分散',
          body: '政策、客户文件、风险手册、交易历史、研究、案例备注和审批规则往往分布在隔离系统中。',
        },
        {
          title: '私有数据不能变成通用上下文',
          body: '敏感金融工作流需要本地部署、权限边界、来源控制和机构特定知识。',
        },
        {
          title: '每条建议都需要复核链路',
          body: '风险、合规、承保、AML 和客户面对面工作都需要证据、审批、升级路径和审计就绪记录。',
        },
      ],
      scenarios: [
        {
          id: 'risk-compliance',
          label: '风险与合规',
          title: '风险、合规与政策复核',
          description: '在决策推进前，帮助团队连接政策、控制要求、案例上下文和复核路径。',
          useCases: [
            {
              title: '政策问答与解释',
              body: '把回答建立在已批准政策文件、风险手册、控制语言和内部复核规则上。',
            },
            {
              title: '监管复核准备',
              body: '为合规团队总结相关规则、所需证据、缺口和复核状态。',
            },
            {
              title: '审计证据摘要',
              body: '准备来源链路，展示哪些文件、案例、决策和审批支持了结果。',
            },
            {
              title: '升级路由',
              body: '把模糊、高风险或政策敏感案例连同上下文路由给正确负责人。',
            },
          ],
          insight: {
            title: '受控风险简报',
            body: '把政策、控制、来源文件和案例细节转成带审计上下文的复核就绪决策。',
          },
          trace: [
            ['政策问题', '这个例外可以批准吗？'],
            ['已批准来源', '政策、流程和控制集已匹配'],
            ['案例上下文', '客户文件、备注和敞口已浮现'],
            ['风险阈值', '高影响复核路径已触发'],
            ['证据链路', '来源和假设已捕获'],
            ['推荐行动', '路由给风险运营审批'],
          ],
          badge: '风险复核',
        },
        {
          id: 'credit-underwriting',
          label: '授信与承保',
          title: '授信、承保与决策支持',
          description: '帮助分析师更快、更一致地准备授信和承保工作，同时不移除人工判断。',
          useCases: [
            {
              title: '申请复核',
              body: '从提交材料中提取借款人、业务、抵押物、财务、政策和例外上下文。',
            },
            {
              title: '风险备忘录起草',
              body: '准备结构化备忘录，包含来源引用、假设、政策匹配和复核问题。',
            },
            {
              title: '基于政策的筛查',
              body: '对照承保规则、审批阈值、文档要求和例外路径比较案例。',
            },
            {
              title: '委员会简报',
              body: '为人工复核总结未结问题、敞口、缓释因素和决策点。',
            },
          ],
          insight: {
            title: '承保简报',
            body: '把政策、证据、财务和例外逻辑连接成一致的复核包。',
          },
          trace: [
            ['申请文件', '借款人材料和财务已摄取'],
            ['政策筛查', '资格和例外规则已检查'],
            ['敞口摘要', '关键风险因素和缓释因素已浮现'],
            ['缺失证据', '所需文件已标记'],
            ['备忘录草稿', '决策包已准备'],
            ['推荐行动', '发送给承保人复核'],
          ],
          badge: '授信工作流',
        },
        {
          id: 'fraud-aml',
          label: '欺诈与 AML',
          title: '欺诈、AML 与调查工作流',
          description: '帮助调查团队分流警报、解释异常，并准备人类可读的案例摘要。',
          useCases: [
            {
              title: '警报分流',
              body: '组合交易信号、客户画像、案例历史、行为变化和规则触发。',
            },
            {
              title: '异常解释',
              body: '准备能把信号变化连接到历史行为、同类模式和政策规则的解释。',
            },
            {
              title: '调查摘要',
              body: '总结案例历史、证据、可疑活动指标和推荐下一步。',
            },
            {
              title: '人工复核排队',
              body: '在保留证据和升级边界的同时，为分析师复核排列案例优先级。',
            },
          ],
          insight: {
            title: '调查包',
            body: '从孤立警报走向案例就绪上下文、来源链路和分析师复核路径。',
          },
          trace: [
            ['警报信号', '检测到异常交易模式'],
            ['客户画像', '历史行为和账户上下文已匹配'],
            ['规则触发', 'AML 阈值和例外备注已复核'],
            ['案例历史', '既往活动和分析师备注已附加'],
            ['证据包', '相关记录已分组'],
            ['推荐行动', '升级给分析师决策'],
          ],
          badge: 'AML 分流',
        },
        {
          id: 'wealth-research',
          label: '财富与研究',
          title: '财富、研究与客户准备',
          description: '帮助顾问和研究团队用已批准来源、产品上下文和机构规则准备扎实的客户工作。',
          useCases: [
            {
              title: '研究摘要',
              body: '总结市场备注、内部研究、已批准产品材料和客户相关动态。',
            },
            {
              title: '产品比较',
              body: '比较已批准产品、风险画像、费用结构、适当性规则和客户约束。',
            },
            {
              title: '客户会议准备',
              body: '用组合上下文、近期问题、已批准语言和下一步选项准备顾问简报。',
            },
            {
              title: '服务跟进',
              body: '把会议备注、未结任务和复核要求转成一致的跟进工作流。',
            },
          ],
          insight: {
            title: '顾问就绪简报',
            body: '把研究、客户历史、产品规则和已批准语言带入一个准备好的工作台。',
          },
          trace: [
            ['客户问题', '我们应该如何复核这次组合变化？'],
            ['研究备注', '已批准市场上下文已总结'],
            ['产品政策', '适当性和披露规则已检查'],
            ['组合上下文', '近期配置和偏好已浮现'],
            ['会议简报', '谈话要点和开放问题已准备'],
            ['推荐行动', '准备顾问复核包'],
          ],
          badge: '顾问工作台',
        },
      ],
      reasons: [
        {
          title: '金融 Agent 需要机构训练的知识',
          body: '通用回答不足以支持金融工作流。Agent 需要来自机构的政策、流程、审批规则、产品约束和业务上下文。',
        },
        {
          title: '金融数据需要本地优先控制',
          body: 'PrismShadow 支持围绕私有部署、权限边界和敏感内部知识设计的 Agent 工作流。',
        },
        {
          title: '金融决策需要人工监督',
          body: 'Agent 可以检索、总结、起草、分类和建议，而承担风险的动作仍路由给正确的人工复核人。',
        },
        {
          title: '金融团队需要证据，而不只是输出',
          body: '来源链路、假设、复核状态和审批历史帮助团队理解为什么准备了某个建议。',
        },
        {
          title: '金融知识应随时间持续沉淀',
          body: '可复用反馈、复核人修正、重复例外和决策结果可以变成长期运营记忆。',
        },
      ],
      resources: [
        {
          category: '金融 AI Agent',
          title: '私有金融 AI 不只需要聊天界面',
          body: '了解 Agent 工作流如何连接政策、复核路径、私有上下文和人工监督，服务金融团队。',
          cta: '阅读指南',
          href: '/blog',
        },
        {
          category: '风险与合规',
          title: '从政策文件到复核就绪风险工作流',
          body: '了解 PrismShadow 如何帮助金融团队把分散机构知识转成受控 Agent 工作流。',
          cta: '探索资源',
          href: '/blog',
        },
      ],
    },
    retail: {
      whyNow: [
        {
          title: '客户旅程不再线性',
          body: '客户在发现、比较、结账、支持、退货和复购之间流动。零售商需要能在完整旅程中承载上下文的 Agent。',
        },
        {
          title: '零售知识高度分散',
          body: '产品数据、政策、促销、库存、订单信息、客户历史、支持工单和 SOP 往往分布在不同系统中。',
        },
        {
          title: '零售环境每天都在变化',
          body: '新品上线、活动变化、库存流动、政策更新、客户问题转移。零售商需要能跟上变化的 AI 工作流。',
        },
      ],
      scenarios: [
        {
          id: 'customer-experience',
          label: '客户体验',
          title: '客户体验编排',
          description: '在发现、购买和购后节点之间创建连接的客户体验。',
          useCases: [
            {
              title: '意图与偏好理解',
              body: '从自然对话中理解客户需求、预算、场景、偏好、约束和购物上下文。',
            },
            {
              title: '产品与政策指导',
              body: '以业务上下文回答产品细节、尺码、兼容性、配送、退货、保修和使用问题。',
            },
            {
              title: '跨渠道连续性',
              body: '让网站、支持、门店团队、内部工具和购后互动保持回答一致。',
            },
            {
              title: '结账信心',
              body: '在客户流失前解决物流、折扣、支付、配送时间、可用性和退货规则问题。',
            },
          ],
          insight: {
            title: '旅程记忆简报',
            body: '在产品问题、结账顾虑、支持请求和退货对话之间保留购物者上下文。',
          },
          trace: [
            ['客户问题', '我需要一个 100 美元以内、适合旅行的礼物。'],
            ['产品上下文', '便携、耐用、有库存选项'],
            ['政策上下文', '礼品小票、保修、退货窗口'],
            ['推荐行动', '推荐 3 个选项并确认配送日期'],
          ],
          badge: '上下文已保留',
        },
        {
          id: 'service-returns',
          label: '服务与退货',
          title: '客户服务与退货',
          description: '在保留业务上下文的同时处理高频零售支持。',
          useCases: [
            {
              title: '工单分流',
              body: '按问题类型、紧急度、政策类别、订单状态和下一步对支持请求分类。',
            },
            {
              title: '订单支持',
              body: '处理订单状态、配送更新、地址变更、发票、延误、取消和缺货问题。',
            },
            {
              title: '退货与换货',
              body: '解释退货资格、退款状态、换货选项、退货窗口、政策例外和所需动作。',
            },
            {
              title: '坐席辅助',
              body: '总结客户历史、起草回复、浮现相关政策，并为人工团队准备升级备注。',
            },
          ],
          insight: {
            title: '支持工作流简报',
            body: '为支持团队总结未结工单、重复问题、退货原因和推荐下一步。',
          },
          trace: [
            ['支持收件箱', '退货请求、订单延迟、发票问题'],
            ['已分类工单', '退货资格 - 中等紧急度'],
            ['订单卡片', '6 天前已送达，商品未拆封'],
            ['回复草稿', '符合退货资格，含预付标签说明'],
          ],
          badge: '政策已匹配',
        },
        {
          id: 'retail-intelligence',
          label: '零售智能',
          title: '零售智能与分析',
          description: '把零售数据和反馈转化为更快的业务决策。',
          useCases: [
            {
              title: '自助数据问答',
              body: '询问销售、订单、转化、退货、库存、活动、支持量和客户行为。',
            },
            {
              title: '销售与需求趋势',
              body: '分析 SKU 表现、品类变化、区域需求、渠道趋势和季节变化。',
            },
            {
              title: '客户反馈分析',
              body: '总结评价、支持对话、退货原因、投诉和产品反馈，识别摩擦点。',
            },
            {
              title: '市场与竞品监控',
              body: '跟踪竞品动作、价格变化、促销、行业新闻和可能影响零售决策的市场信号。',
            },
          ],
          insight: {
            title: '每日零售智能',
            body: '发送个性化简报，包含销售趋势、退货高峰、库存信号、客户反馈和竞品动作。',
          },
          trace: [
            ['分析问题', '为什么本周外套退货激增？'],
            ['趋势信号', '退货 +18%，尺码相关提及上升'],
            ['反馈摘要', '两款头部 SKU 被反馈偏小'],
            ['推荐行动', '更新尺码说明并复核商品页文案'],
          ],
          badge: '每日简报',
        },
        {
          id: 'operations',
          label: '运营',
          title: '零售运营与履约',
          description: '帮助团队协调库存、履约、政策和日常零售执行。',
          useCases: [
            {
              title: '库存与补货支持',
              body: '帮助团队理解库存状态、补货规则、低库存风险、选品问题和库存流动。',
            },
            {
              title: '履约异常处理',
              body: '支持延迟发货、配送异常、仓库约束、门店自提和订单路由问题。',
            },
            {
              title: '活动与政策执行',
              body: '澄清活动规则、折扣资格、产品排除、渠道信息、退货条件和客户可见政策语言。',
            },
            {
              title: '运营知识助手',
              body: '帮助员工搜索 SOP、产品文档、培训材料、品牌指南、内部政策和工作流说明。',
            },
          ],
          insight: {
            title: '运营行动简报',
            body: '在履约异常、库存风险、活动规则和政策更新造成客户摩擦前浮现它们。',
          },
          trace: [
            ['库存状态', '西部区域低库存风险'],
            ['履约异常', '承运商延误影响 184 个订单'],
            ['活动规则', '套餐折扣不含清仓商品'],
            ['运营行动', '路由受影响订单并通知支持团队'],
          ],
          badge: '行动已准备',
        },
      ],
      reasons: [
        {
          title: '零售上下文变化很快',
          body: '产品、促销、政策、库存、履约规则和客户问题快速变化。PrismShadow 帮助 Agent 工作流与当前零售现实保持一致。',
        },
        {
          title: '零售知识分布在许多系统中',
          body: '目录、订单、支持工单、库存数据、政策、客户历史和内部文档往往彼此分离。PrismShadow 帮助把这些分散知识转成 Agent 就绪上下文。',
        },
        {
          title: '零售服务依赖连续性',
          body: '客户今天可能询问产品，明天下单，下周退货。PrismShadow 帮助在完整客户旅程中保留上下文。',
        },
        {
          title: '零售团队需要控制敏感数据',
          body: '客户历史、定价、库存、供应商信息和内部政策都是关键业务资产。PrismShadow 可以围绕零售商的数据环境和治理需求部署。',
        },
      ],
      resources: [
        {
          category: '零售 AI',
          title: 'AI Agent 如何改善下一代零售体验',
          body: '了解 Agent 如何支持现代零售中的客户旅程、服务、运营和决策。',
          cta: '阅读零售 AI 指南',
          href: '/blog/how-ai-agents-improve-next-generation-retail-experience',
        },
        {
          category: '零售 AI',
          title: '从分散零售知识到 Agent 就绪上下文',
          body: '了解零售商如何连接产品、政策、订单、支持和运营知识来支持 AI 工作流。',
          cta: '阅读零售 AI 指南',
          href: '/blog',
        },
        {
          category: '零售 AI',
          title: '为什么静态零售工作流会在快速变化的市场中失效',
          body: '理解固定脚本和传统系统为何难以应对变化中的产品、政策、需求和履约。',
          cta: '阅读零售 AI 指南',
          href: '/blog',
        },
      ],
    },
    travel: {
      whyNow: [
        {
          title: '旅客旅程高度依赖上下文',
          body: '一次旅行不是一笔交易。旅客会经历规划、预订、值机、中断处理、支持和旅后服务。',
        },
        {
          title: '旅行知识高度分散',
          body: '订单、PNR、票价规则、酒店政策、会员数据、退款条件、支持工单和运营更新常常分布在不同系统中。',
        },
        {
          title: '旅行状况实时变化',
          body: '航班延误、行李丢失、价格变化、酒店库存波动。团队需要能响应实时上下文的 Agent。',
        },
      ],
      scenarios: [
        {
          id: 'traveler-experience',
          label: '旅客体验',
          title: '旅客体验编排',
          description: '在规划、预订、行程变更和旅后支持之间创造连接的旅客体验。',
          useCases: [
            {
              title: '旅行意图理解',
              body: '理解目标、预算、目的地偏好、时间限制、会员状态、旅行目的和个人上下文。',
            },
            {
              title: '个性化行程指导',
              body: '基于旅客上下文和业务规则推荐航班、酒店、路线、活动、升舱、附加服务和选项。',
            },
            {
              title: '政策感知推荐',
              body: '用票价规则、退款条件、行李政策、签证要求、公司差旅政策和资格约束指导旅客。',
            },
            {
              title: '旅程记忆',
              body: '在完整旅程中保留偏好、历史问题、预订上下文和支持历史。',
            },
          ],
          insight: {
            title: '旅程记忆简报',
            body: '从规划到预订、中断处理和旅后支持，让旅客上下文持续可用。',
          },
          trace: [
            ['旅客请求', '我能改返程航班并保留酒店吗？'],
            ['预订记录', '往返行程，附带酒店，会员旅客'],
            ['票价规则', '变更窗口开放，需补差价'],
            ['酒店政策', '当地截止时间前无罚金'],
            ['旅客偏好', '晚间返程、靠过道、同一酒店'],
            ['推荐下一步', '提供两个返程选项并保留酒店'],
          ],
          badge: '旅程上下文已保留',
        },
        {
          id: 'booking-operations',
          label: '预订运营',
          title: '预订运营自动化',
          description: '帮助旅行团队更快处理复杂预订规则、客户请求和重复运营任务。',
          useCases: [
            {
              title: '票价规则专家',
              body: '回答改签费、取消条件、退款资格、舱位限制和供应商特定规则相关问题。',
            },
            {
              title: '预订记录助手',
              body: '总结 PNR、预订历史、旅客权益、历史变更、缺失详情和代理动作。',
            },
            {
              title: '收件箱请求受理',
              body: '读取旅客邮件、识别意图、发现缺失信息、起草回复并准备下一步供复核。',
            },
            {
              title: '报价监控',
              body: '跟踪价格变化、升舱机会、替代选项、酒店可用性和附加服务。',
            },
          ],
          insight: {
            title: '预订工作流简报',
            body: '在客服手动搜索前，浮现票价规则、预订历史、缺失旅客信息和下一步。',
          },
          trace: [
            ['来信', '需要改出发航班并增加一晚酒店'],
            ['PNR 摘要', '两名旅客，一次历史变更，已保存餐食偏好'],
            ['票价规则结果', '允许变更，需补差价'],
            ['缺失详情', '确认新出发时间窗口'],
            ['回复草稿', '已准备供人工复核'],
            ['推荐报价', '更早航班加酒店续住'],
          ],
          badge: '预订简报就绪',
        },
        {
          id: 'passenger-service',
          label: '旅客服务',
          title: '旅客服务与中断支持',
          description: '当计划变化、服务问题出现或人工团队需要上下文时，更快支持旅客。',
          useCases: [
            {
              title: '旅客支持自动化',
              body: '处理行李、值机、预订变更、取消、退款、理赔和旅行政策相关问题。',
            },
            {
              title: '中断响应',
              body: '帮助团队响应延误、取消、误机、天气事件、超售和航班计划变化。',
            },
            {
              title: '改签与理赔协助',
              body: '评估资格、收集必要信息、推荐改签选项，并准备退款或理赔工作流。',
            },
            {
              title: '联络中心坐席辅助',
              body: '总结旅客历史、识别问题类型、起草回复、浮现政策上下文并准备升级备注。',
            },
          ],
          insight: {
            title: '中断行动简报',
            body: '当旅行计划出问题时，Agent 帮助团队理解旅客、预订、政策和最佳解决下一步。',
          },
          trace: [
            ['延误提醒', '连接路线受天气延误影响'],
            ['受影响旅客', '42 个高优先级行程'],
            ['预订上下文', '存在误机风险，需要酒店'],
            ['改签选项', '找到三个符合资格的替代方案'],
            ['理赔资格', '赔付复核已准备'],
            ['支持草稿', '旅客更新待批准'],
          ],
          badge: '中断行动已准备',
        },
        {
          id: 'travel-intelligence',
          label: '旅行智能',
          title: '旅行智能与分析',
          description: '让旅行团队用自然语言访问运营、商业和客户洞察。',
          useCases: [
            {
              title: '自助旅行分析',
              body: '询问预订、需求、收入、航线、入住率、客流、支持量和表现。',
            },
            {
              title: '收入与需求洞察',
              body: '分析航线表现、票价族、酒店需求、入住趋势、代理表现和季节变化。',
            },
            {
              title: '运营事件监控',
              body: '跟踪中断信号、行李事件、旅客处理时间、机场容量、资源约束和异常。',
            },
            {
              title: '高管简报',
              body: '生成包含需求变化、运营风险、旅客反馈、收入机会和推荐行动的简报。',
            },
          ],
          insight: {
            title: '每日旅行智能',
            body: '给团队发送关于需求变化、服务问题、运营瓶颈和商业机会的精炼简报。',
          },
          trace: [
            ['自然语言查询', '本周哪些航线表现不佳？'],
            ['趋势图', '两条商务航线预订下降 12%'],
            ['需求信号', '周末休闲需求上升'],
            ['运营问题', '行李事件相关支持量上升'],
            ['推荐行动', '调整报价组合并准备服务简报'],
            ['高管简报', '每日摘要已准备'],
          ],
          badge: '智能简报',
        },
      ],
      reasons: [
        {
          title: '旅行依赖连续性',
          body: '旅客今天可能规划，明天预订，下周改签，并在旅途中请求帮助。PrismShadow 帮助跨旅程保留上下文。',
        },
        {
          title: '旅行规则复杂且依赖上下文',
          body: '票价规则、退款条件、行李政策、会员状态、公司政策和伙伴规则会随供应商、路线、时间和旅客变化。',
        },
        {
          title: '旅行运营由事件驱动',
          body: '延误、取消、误机、行李事件、天气、机场拥堵和可用性变化都需要快速决策。',
        },
        {
          title: '旅行数据跨越许多系统和伙伴',
          body: '预订、PNR、CRM、联络中心、机场系统、酒店系统、会员平台、政策文件和伙伴数据常常断开。',
        },
        {
          title: '旅行团队需要人工在环控制',
          body: '许多旅行工作流影响安全、合规、客户信任和财务结果。Agent 辅助、推荐、总结和准备行动，同时团队保持控制。',
        },
      ],
      resources: [
        {
          category: '旅行 AI Agent',
          title: '旅行真正的问题不是搜索，而是上下文',
          body: '旅客提出简单问题，旅行系统却让问题复杂化。了解 AI Agent 如何把预订、政策、实时事件和旅客历史连接为下一步行动。',
          cta: '阅读文章',
          href: '/blog/travel-ai-agents-context',
        },
      ],
    },
    healthcare: {
      whyNow: [
        {
          title: '健康旅程正在变得连续',
          body: '消费者和患者需要覆盖产品、权益、预约、随访和不断变化健康需求的支持。',
        },
        {
          title: '医疗健康知识证据密集且分散',
          body: '证据、标签、支付方规则、SOP、支持记录和上下文常常分布在断开的系统中。',
        },
        {
          title: '信任不能事后补上',
          body: '医疗健康 AI 从一开始就需要受控响应、清晰升级规则、人工复核和可追踪建议。',
        },
      ],
      scenarios: [
        {
          id: 'consumer-health',
          label: '消费者健康',
          title: '消费者健康指导',
          description: '帮助消费者从模糊健康需求走向有证据支持、可解释的下一步。',
          useCases: [
            {
              title: '需求与信号理解',
              body: '从自然对话中理解消费者目标、表述问题、偏好、购买历史、可穿戴信号、生活方式上下文和支持需求。',
            },
            {
              title: '基于证据的产品指导',
              body: '比较 OTC 产品、补剂、健康选项、标签、成分、证据、安全信息和偏好。',
            },
            {
              title: '风险与相互作用检查',
              body: '浮现可能的相互作用、禁忌、剂量顾虑、年龄限制或需要专业指导的情况。',
            },
            {
              title: '随访与健康旅程记忆',
              body: '在回访、历史问题、产品体验、偏好和长期健康目标之间保留上下文。',
            },
          ],
          insight: {
            title: '需求导向健康简报',
            body: '把消费者上下文、产品证据、安全检查和偏好转成可解释指导，并在需要时升级。',
          },
          trace: [
            ['消费者问题', '帮我选择一款用于睡眠的镁补充剂。'],
            ['睡眠关注', '休息质量、作息、已表达目标'],
            ['产品标签', '成分、用量、警示'],
            ['证据摘要', '已批准信息和来源备注'],
            ['安全检查', '相互作用和转人工标准已复核'],
            ['推荐下一步', '分享选项并把问题交给复核'],
          ],
          badge: '带交接的指导',
        },
        {
          id: 'patient-access',
          label: '患者准入',
          title: '患者准入与支持',
          description: '帮助医疗团队简化高频准入、保障、授权和服务工作流。',
          useCases: [
            {
              title: '资格与权益支持',
              body: '帮助团队核验保障上下文、权益详情、计划规则、共付、免赔额和必要下一步。',
            },
            {
              title: '预授权受理',
              body: '收集必要信息、识别缺失文件、总结案例上下文并准备授权工作流。',
            },
            {
              title: '预约与照护导航',
              body: '引导患者完成排期、转诊、准备说明、随访要求和服务选项。',
            },
            {
              title: '账单与理赔协助',
              body: '支持理赔状态、付款责任、缺失信息、拒付原因和升级路径相关问题。',
            },
          ],
          insight: {
            title: '准入工作流简报',
            body: '收集必要详情、浮现支付方规则、识别缺失信息，并为员工复核准备下一步。',
          },
          trace: [
            ['患者请求', '为什么我的药被延迟了？'],
            ['保障状态', '权益上下文和计划详情已浮现'],
            ['授权规则', '需要预授权步骤'],
            ['缺失文件', '需要提供方表格和支持备注'],
            ['回复草稿', '员工可用解释已准备'],
            ['升级路径', '转给准入团队复核'],
          ],
          badge: '员工复核就绪',
        },
        {
          id: 'evidence-compliance',
          label: '证据与合规',
          title: '证据、信任与合规运营',
          description: '帮助医疗健康组织创建有依据、可解释且受控的 AI 工作流。',
          useCases: [
            {
              title: '证据档案准备',
              body: '为 AI 工作流结构化产品数据、证据摘要、安全信息、宣称和支持文件。',
            },
            {
              title: '受控响应护栏',
              body: '将响应限制在已批准动作、合规语言、已验证来源和已定义升级规则内。',
            },
            {
              title: '建议与交互日志',
              body: '跟踪使用了哪些信息、准备了什么建议，以及何时发生人工复核或升级。',
            },
            {
              title: '人工在环复核',
              body: '把复杂、高风险、模糊或受监管案例路由给临床、药师、合规或运营团队。',
            },
          ],
          insight: {
            title: '信任内建简报',
            body: '把每个回答连接到证据、政策、来源、护栏和复核路径。',
          },
          trace: [
            ['Agent 准备建议', '已组装待复核指导草稿'],
            ['已批准证据', '已附验证来源包'],
            ['政策规则', '允许语言和行动边界'],
            ['风险类别', '升级阈值已检查'],
            ['审计日志', '来源、行动和复核路径已捕获'],
            ['人工复核状态', '最终沟通前已路由'],
          ],
          badge: '可追踪工作流',
        },
        {
          id: 'healthcare-intelligence',
          label: '医疗健康智能',
          title: '医疗健康智能与运营',
          description: '让医疗健康团队更快获取运营洞察、服务趋势、质量信号和改进机会。',
          useCases: [
            {
              title: '自助医疗健康分析',
              body: '用自然语言询问患者准入、支持量、授权延迟、理赔、服务质量和绩效。',
            },
            {
              title: '患者与提供方反馈分析',
              body: '总结电话、工单、评价、投诉、问卷和支持转录，识别反复出现的摩擦。',
            },
            {
              title: '工作流瓶颈检测',
              body: '发现由缺失文件、支付方规则、授权步骤、电话交接、人手缺口或流程差异造成的延迟。',
            },
            {
              title: '质量复核与案例监控',
              body: '复核对话、标记矛盾、检查 SOP 遵循、识别高风险案例并支持持续改进。',
            },
          ],
          insight: {
            title: '运营智能简报',
            body: '在问题扩大为患者体验风险前，浮现重复延迟、政策缺口、服务风险和质量问题。',
          },
          trace: [
            ['团队问题', '本周哪些授权请求正在延迟准入？'],
            ['案例量图表', '两个服务线案例量上升 18%'],
            ['缺失文件', '31% 的延迟案例缺少表格'],
            ['支付方规则', '常见要求不匹配已检测'],
            ['质量复核标记', '升级语言需要复核'],
            ['推荐工作流行动', '准备简报并更新受理清单'],
          ],
          badge: '运营简报',
        },
      ],
      reasons: [
        {
          title: '医疗健康回答必须受控',
          body: '自由发挥的 AI 在医疗健康场景中风险很高。Agent 需要已批准语言、验证来源、定义好的工作流和清晰升级边界。',
        },
        {
          title: '医疗健康知识持续变化',
          body: '政策、支付方规则、产品证据、安全信息、指南、SOP 和预期都在持续演进。',
        },
        {
          title: '医疗健康上下文敏感且分散',
          body: '患者互动、权益信息、产品证据、支持案例、理赔数据和内部政策常常分布在独立系统中。',
        },
        {
          title: '医疗健康信任需要可追踪性',
          body: '团队需要知道为什么准备了某个回答、哪些信息支持它，以及何时应该由人工复核。',
        },
        {
          title: '医疗健康自动化仍需要人工监督',
          body: '许多工作流影响安全、合规、准入、成本和信任。PrismShadow 辅助、准备、总结、路由和建议，同时让人保持控制。',
        },
      ],
      resources: [
        {
          category: '医疗健康 AI Agent',
          title: '构建可信的医疗健康 AI Agent 工作流',
          body: '医疗健康团队不需要更多流畅回答。他们需要已批准上下文、升级路径、人工复核和可审计性。',
          cta: '阅读文章',
          href: '/blog/healthcare-ai-guardrails-not-prompts',
        },
        {
          category: '患者准入',
          title: 'AI Agent 如何改善患者准入运营',
          body: '了解 Agent 如何连接资格、权益、预授权、文件和患者沟通，并转化为下一步行动。',
          cta: '阅读文章',
          href: '/blog/healthcare-ai-patient-access-operations',
        },
      ],
    },
    'supply-chain': {
      whyNow: [
        {
          title: '中断持续发生',
          body: '供应商延误、需求激增、港口拥堵、天气事件、物料短缺、生产约束和运输异常随时会改变计划。',
        },
        {
          title: '供应链知识高度分散',
          body: 'ERP、WMS、TMS、MES、采购工具、供应商门户、合同、SOP、表格和邮件往往持有同一决策的不同部分。',
        },
        {
          title: '每一次权衡都牵动多个职能',
          body: '一个决策可能同时影响成本、服务水平、库存、产能、营运资本、收入和客户承诺。',
        },
      ],
      scenarios: [
        {
          id: 'control-tower',
          label: '控制塔',
          title: '端到端供应链控制塔',
          description: '感知中断、理解业务影响，并在供应链团队之间协调行动。',
          useCases: [
            {
              title: '中断监控',
              body: '监控供应商延误、物料短缺、运输异常、需求激增、订单风险、天气事件、港口拥堵和外部风险信号。',
            },
            {
              title: '根因分析',
              body: '把异常追溯到供应商、库存缺口、生产约束、仓库瓶颈、承运商延误、BOM 依赖或订单变化。',
            },
            {
              title: '场景模拟',
              body: '比较加急运输、重新分配库存、启用替代供应商、调整生产顺序或拆单等缓解方案。',
            },
            {
              title: '高管行动简报',
              body: '总结受影响客户、订单、收入、服务水平、风险和建议下一步，供管理层复核。',
            },
          ],
          insight: {
            title: '中断行动简报',
            body: '呈现发生了什么、影响什么，以及哪些缓解选项需要人工审批。',
          },
          trace: [
            ['中断预警', '供应商发货延迟 5 天'],
            ['受影响订单', '本周高优先级订单存在风险'],
            ['库存覆盖', '关键 SKU 覆盖低于目标'],
            ['供应商状态', '替代来源正在复核'],
            ['客户优先级', '收入与服务影响已浮现'],
            ['推荐缓解', '复核调拨和加急选项'],
          ],
          badge: '控制塔简报',
        },
        {
          id: 'planning-inventory',
          label: '计划与库存',
          title: '需求、补货与库存编排',
          description: '帮助计划团队对齐需求信号、库存覆盖、补货动作和服务水平风险。',
          useCases: [
            {
              title: '需求信号监控',
              body: '跟踪销售、预测、未结订单、促销、季节性、客户行为和外部需求信号，及早发现变化。',
            },
            {
              title: '库存再平衡',
              body: '识别积压、短缺、慢动库存、缺货风险，以及跨仓、工厂、门店、区域或渠道的调拨机会。',
            },
            {
              title: '补货建议',
              body: '基于业务规则准备补货优先级、安全库存调整、采购信号、生产信号和补货行动。',
            },
            {
              title: '服务水平风险提醒',
              body: '标记可能因库存或供应限制而错过服务承诺的 SKU、客户、区域、工厂或订单。',
            },
          ],
          insight: {
            title: '库存风险简报',
            body: '连接需求、供应、库存和服务水平上下文，让计划人员在短缺变成客户问题前行动。',
          },
          trace: [
            ['需求信号', 'SKU 本周需求增加 18%'],
            ['库存覆盖', '东部 DC：4 天；西部 DC：21 天'],
            ['仓库不平衡', '调拨机会已浮现'],
            ['补货优先级', '安全库存复核已准备'],
            ['服务水平风险', '前三大客户风险较高'],
            ['推荐行动', '准备调拨与补货计划'],
          ],
          badge: '计划工作台',
        },
        {
          id: 'supplier-procurement',
          label: '供应商与采购',
          title: '供应商风险与采购智能',
          description: '帮助采购团队监控供应商风险、比较寻源选项，并准备采购工作流。',
          useCases: [
            {
              title: '供应商风险监控',
              body: '监控供应商绩效、交付延误、质量问题、产能约束、合规信号、天气事件、地缘风险和财务风险指标。',
            },
            {
              title: '报价与合同智能',
              body: '总结 RFQ、供应商报价、交期、价格条款、合同条款、SLA 承诺、违约金和续约条件。',
            },
            {
              title: '替代寻源',
              body: '当供应风险出现时，浮现已批准替代品、替代供应商、第二来源、替代物料和认证约束。',
            },
            {
              title: '合规与 SLA 检查',
              body: '识别文档缺口、供应商义务、政策冲突、合规要求，以及采购行动前需要的审批。',
            },
          ],
          insight: {
            title: '供应商风险简报',
            body: '把供应商绩效、合同条款、风险信号和寻源选项放进一张决策就绪视图。',
          },
          trace: [
            ['供应商风险', '供应商 A 本月两次发货延误'],
            ['合同条款', 'SLA 与违约金上下文已浮现'],
            ['未结 PO', '三个依赖订单已复核'],
            ['替代供应商', '供应商 B 可进行部分替代'],
            ['合规清单', '文档缺口已标记'],
            ['推荐行动', '准备采购复核的升级备注'],
          ],
          badge: '采购复核',
        },
        {
          id: 'logistics-fulfillment',
          label: '物流与履约',
          title: '物流与履约执行',
          description: '帮助物流和履约团队管理运输异常、承运商选项、仓库瓶颈和客户交付风险。',
          useCases: [
            {
              title: '运输异常管理',
              body: '监控延迟运输、扣留货载、清关问题、缺失文件、货损、ASN 延迟、POD 缺失和交付异常。',
            },
            {
              title: '承运商与路线评估',
              body: '在建议下一步前比较承运商表现、路线选项、运输时间、成本、运力、服务水平和交付风险。',
            },
            {
              title: '仓库履约支持',
              body: '浮现拣货延迟、打包瓶颈、人力约束、库位问题、积压风险和各设施履约异常。',
            },
            {
              title: '客户交付风险简报',
              body: '准备客户或账户级摘要，展示受影响订单、交付风险、缓解选项和沟通草稿。',
            },
          ],
          insight: {
            title: '交付风险简报',
            body: '在交付问题升级前，连接运输、仓库、承运商、订单和客户上下文。',
          },
          trace: [
            ['运输异常', 'Lane 42 承运商延误'],
            ['受影响订单', '与交付承诺绑定的优先订单'],
            ['承运商选项', '承运商 B 可复核改道'],
            ['仓库积压', '拣货延迟和人力备注已浮现'],
            ['客户更新', '沟通草稿已准备'],
            ['推荐行动', '复核优先订单改道'],
          ],
          badge: '执行支持',
        },
      ],
      reasons: [
        {
          title: '供应链决策依赖互联的上下文',
          body: '需求、库存、供应商、生产、物流、成本、服务水平和客户承诺都会影响同一决策。PrismShadow 帮助把分散运营数据转成 Agent 就绪上下文。',
        },
        {
          title: '供应链条件持续变化',
          body: '订单变化、供应商延误、库存流动、天气变化、港口拥堵和产能收紧持续发生。PrismShadow 帮助 Agent 监控变化中的上下文并及早浮现风险。',
        },
        {
          title: '供应链权衡跨越多个职能',
          body: '对库存最好的行动未必对成本、客户服务、生产或营运资本最好。PrismShadow 帮助团队在行动前比较选项。',
        },
        {
          title: '供应链团队需要可解释建议',
          body: '高影响决策不能是黑箱。PrismShadow 帮助 Agent 呈现上下文、假设、权衡和建议下一步，供人工复核。',
        },
        {
          title: '供应链知识应持续积累、不断复用',
          body: '每次异常都会教会业务关于供应商、路线、客户、SKU、仓库和恢复手册的新经验。PrismShadow 帮助未来工作流从更聪明的位置开始。',
        },
      ],
      resources: [
        {
          category: '供应链 AI Agent',
          title: '从控制塔到 Agent 化供应链运营',
          body: '供应链团队不需要另一个仪表盘。他们需要能连接中断信号、运营上下文、权衡和下一步行动的 Agent。',
          cta: '阅读文章',
          href: '/blog/agentic-supply-chain-control-towers',
        },
        {
          category: '场景模拟',
          title: '为什么供应链 AI 需要人工治理的场景模拟',
          body: '了解 Agent 如何比较缓解方案、解释权衡，并把高影响供应链决策交给人工复核。',
          cta: '阅读文章',
          href: '/blog/supply-chain-ai-human-governed-simulation',
        },
        {
          category: '计划与库存',
          title: '需求与库存计划需要 Agent 层',
          body: '预测很重要，但计划人员还需要连接需求、库存覆盖、补货规则、服务风险和审批的 Agent。',
          cta: '阅读文章',
          href: '/blog/supply-chain-demand-inventory-agent-layer',
        },
        {
          category: '供应商风险',
          title: '供应商风险进入工作流才有价值',
          body: '供应商风险评分只是开始。了解 Agent 如何连接供应商信号、合同、未结 PO、寻源选项和复核路径。',
          cta: '阅读文章',
          href: '/blog/supply-chain-supplier-risk-workflow',
        },
      ],
    },
    restaurants: {
      whyNow: [
        {
          title: '收入分散在多个渠道',
          body: '餐厅现在通过堂食、外卖、社交团购、私域、会员和在线点单销售。每个渠道都有不同费率、折扣、客群行为和利润影响。',
          note: '经营者需要一张真实渠道盈利能力视图。',
        },
        {
          title: 'GMV 不等于利润',
          body: '一场活动可能带来订单，但扣除折扣、平台费、包装、食材成本、人工和退款后仍然亏钱。',
          note: '餐厅需要能计算贡献利润的 Agent，而不只是销售额。',
        },
        {
          title: '洞察不执行就没有价值',
          body: '发现问题还不够。店长、后厨负责人和运营人员需要清晰任务、负责人、证据和跟进。',
          note: '餐厅需要从洞察到行动的执行闭环。',
        },
      ],
      scenarios: [
        {
          id: 'profit-control',
          label: '利润控制',
          title: '跨渠道利润控制',
          description: '看清哪些渠道、活动、门店和菜品在扣除费用、折扣、人工和食材成本后真正赚钱。',
          useCases: [
            {
              title: '统一渠道视图',
              body: '把堂食 POS、外卖、社交团购、私域订单、会员、支付和退款合并成一张运营视图。',
            },
            {
              title: '按渠道看净利润',
              body: '按贡献利润比较渠道，而不是只看 GMV、订单量或流量。',
            },
            {
              title: '活动损益',
              body: '计算折扣、套餐、优惠券和平台活动到底是在创造利润还是造成亏损。',
            },
            {
              title: '门店利润对比',
              body: '按收入、毛利、人工、食材成本、活动表现和执行质量比较门店。',
            },
          ],
          insight: {
            title: '利润简报',
            body: '把销售额、费用、折扣、食材成本和人工转化为清晰答案：哪里赚钱、哪里漏利、下一步做什么。',
          },
          trace: [
            ['昨日收入', '堂食：$4,820；外卖：$3,460；社交团购：$1,900；私域订单：$740'],
            ['Agent 检查', '平台费、折扣成本、食材成本、人工成本、退款'],
            ['结果', '外卖 GMV 上升，但贡献毛利下降'],
            ['推荐行动', '暂停低毛利活动并复核'],
          ],
          badge: '利润简报',
        },
        {
          id: 'daily-briefing',
          label: '每日简报',
          title: '每日老板简报',
          description: '在下一餐服务开始前，把昨日表现转成清晰的每日行动计划。',
          useCases: [
            {
              title: '每日打烊总结',
              body: '总结收入、订单、客单价、毛利、人工占比、食材成本和异常变化。',
            },
            {
              title: '异常诊断',
              body: '发现销售下滑、毛利泄漏、食材成本异常、人工效率低、退款变化或加购疲软。',
            },
            {
              title: '前三项行动',
              body: '按业务影响和紧急度生成当天最重要的行动。',
            },
            {
              title: '跟进复盘',
              body: '把昨日任务和今日结果对照，看门店是否真的改善。',
            },
          ],
          insight: {
            title: '今日经营计划',
            body: '给经营者一页纸看清发生了什么、为什么发生、今天应该做哪些动作。',
          },
          trace: [
            ['每日简报', '昨日表现已准备供老板复核'],
            ['昨日', '收入下降 7.8%；晚餐客单价下降 12%；牛肉成本异常'],
            ['今日行动', '复核牛肉出成；调整晚 9 点排班；暂停低毛利优惠券'],
            ['跟进', '晚市打烊后检查任务结果'],
          ],
          badge: '老板简报',
        },
        {
          id: 'store-execution',
          label: '门店执行',
          title: '门店执行闭环',
          description: '把 AI 建议转化为店长、后厨负责人、运营、财务和采购团队的任务。',
          useCases: [
            {
              title: '任务生成',
              body: '把检测到的问题变成带负责人、截止时间、优先级和预期结果的清晰任务。',
            },
            {
              title: '按角色分派',
              body: '把行动分配给店长、后厨负责人、前厅团队、运营或财务。',
            },
            {
              title: '证据收集',
              body: '要求上传照片、截图、班次记录、库存盘点或备注来验证任务完成。',
            },
            {
              title: '影响复盘',
              body: '检查完成的任务是否在次日或下周改善了目标指标。',
            },
          ],
          insight: {
            title: '执行简报',
            body: '用任务跟踪、证据和结果复盘，闭合从 AI 发现问题到门店修复问题的链路。',
          },
          trace: [
            ['任务', '检查牛肉成本异常'],
            ['负责人', '后厨负责人'],
            ['截止', '今天 2:00 PM'],
            ['证据', '上传备菜表和实际出成'],
            ['复盘指标', '牛肉菜品毛利回到目标以上'],
          ],
          badge: '执行闭环',
        },
        {
          id: 'cost-inventory',
          label: '成本与库存',
          title: '菜单、成本与库存智能',
          description: '连接配方、采购、库存、损耗、人工和销售，在菜品和门店层面保护利润。',
          useCases: [
            {
              title: '菜单毛利分析',
              body: '识别高销量低毛利菜品、利润菜、弱套餐和菜单定价机会。',
            },
            {
              title: '食材成本异常检测',
              body: '把配方理论成本与实际采购、库存消耗、损耗和销售进行对比。',
            },
            {
              title: '库存与备货建议',
              body: '按门店支持每日备货、补货、缺货风险、临期食材和预期需求。',
            },
            {
              title: '供应商与采购复核',
              body: '跟踪供应商涨价、异常采购成本、到货问题和食材级毛利压力。',
            },
          ],
          insight: {
            title: '毛利泄漏简报',
            body: '发现利润从配方、损耗、供应商成本、库存消耗或活动设计中流失的位置。',
          },
          trace: [
            ['菜品', '牛肉饭'],
            ['理论食材成本', '32%'],
            ['实际食材成本', '41%'],
            ['Agent 检查', '配方 BOM、采购价、库存流动、损耗记录、销量'],
            ['推荐行动', '人工复核出成和供应商价格'],
          ],
          badge: '毛利泄漏',
        },
      ],
      reasons: [
        {
          title: '餐厅利润不在单一平台里',
          body: '外卖平台、POS、社交团购、私域、采购、人工和库存都只显示局部。PrismShadow 帮助餐厅团队把这些碎片连接成利润就绪上下文。',
        },
        {
          title: '餐厅经营者需要中立的渠道分析',
          body: '平台可能优化订单量，但老板需要知道哪个渠道真正改善利润。PrismShadow 帮助从餐厅自身视角比较渠道。',
        },
        {
          title: '餐厅毛利每个班次都在变化',
          body: '食材成本、人工、损耗、折扣、退款和客群结构每天都可能变化。PrismShadow Agent 帮助在风险变成长期亏损前浮现毛利问题。',
        },
        {
          title: '门店执行才是真正瓶颈',
          body: '建议只有被门店执行才有意义。PrismShadow 帮助把洞察转成分派任务、所需证据和可衡量跟进。',
        },
        {
          title: '敏感利润数据应保持可控',
          body: '真实餐厅利润涉及采购、工资、租金、供应商条款、毛利和现金流。PrismShadow 可以围绕经营者的数据环境和治理需求支持本地化部署。',
        },
      ],
      resources: [
        {
          category: '餐厅利润',
          title: '餐厅 AI 应从贡献利润开始',
          body: '收入报表可能掩盖渠道、活动、人工、食材成本、退款和平台费带来的毛利泄漏。',
          cta: '阅读文章',
          href: '/blog/restaurant-ai-contribution-profit',
        },
        {
          category: '日常运营',
          title: '每日老板简报是餐厅最先该构建的 Agent',
          body: '把昨日打烊、异常、食材成本、人工和店长备注转成今天最重要的行动。',
          cta: '阅读文章',
          href: '/blog/restaurant-daily-owner-briefing-agent',
        },
      ],
    },
    'auto-dealerships': {
      whyNow: [
        {
          title: '经销商数据天然分散',
          body: '客户历史、线索、维修记录、库存、定价、营销、拍卖信号和沟通记录往往分布在不同工具中。',
        },
        {
          title: '二手车利润在上游决定',
          body: '拍卖价格、车况报告、整备成本、运输、本地需求和周转天数共同决定一辆车是否值得拿下。',
        },
        {
          title: '经销商工作流需要行动能力',
          body: 'CRM 和 DMS 保存了重要信息，但经销商团队还需要能监控机会并准备下一步行动的 Agent。',
        },
      ],
      scenarios: [
        {
          id: 'customer-lifecycle',
          label: '客户生命周期',
          title: '客户生命周期编排',
          description: '把线索、展厅互动、购车、维修历史、置换时机和留存节点连接成连续的客户旅程。',
          useCases: [
            {
              title: '线索资格判断与优先级',
              body: '根据意向、车型兴趣、预算信号、互动历史和经销商优先级对线索评分并分配。',
            },
            {
              title: '个性化跟进',
              body: '基于客户历史、车型兴趣和下一步最佳行动生成邮件、短信或员工可直接使用的跟进建议。',
            },
            {
              title: '客户旅程记忆',
              body: '在留资、到店、购车、维修、置换和忠诚度流程之间保留上下文。',
            },
            {
              title: '置换与权益信号',
              body: '基于持有周期和维修上下文，发现可能适合置换、升级、租约到期或留存触达的客户。',
            },
          ],
          insight: {
            title: '全周期客户简报',
            body: '把线索活动、车型兴趣、维修历史和置换信号放进一个 Agent 可用的客户上下文。',
          },
          trace: [
            ['新线索', '寻找 2.8 万美元以内的二手 SUV'],
            ['CRM 历史', '两次到店记录和一个金融问题'],
            ['当前车辆', '2019 Honda CR-V'],
            ['维修历史', '有规律保养记录'],
            ['置换信号', '权益和升级时机已浮现'],
            ['推荐跟进', '发送个性化升级触达'],
          ],
          badge: '生命周期简报',
        },
        {
          id: 'auction-inventory',
          label: '拍卖与库存',
          title: '拍卖与库存智能',
          description: '帮助二手车经销商识别合适车辆、评估拍卖机会，并结合批发与零售上下文更快做出采购判断。',
          useCases: [
            {
              title: '拍卖清单监控',
              body: '监控拍卖库存、车道清单、数字市场和已保存搜索，发现符合采购策略的车辆。',
            },
            {
              title: '批发估值与出价建议',
              body: '结合批发可比成交、市场价格、车辆历史、本地零售需求和库存目标，建议出价上限。',
            },
            {
              title: '车况与整备风险评估',
              body: '分析车况报告、照片、卖家备注、车辆历史、整备预估、产权状态和运输因素。',
            },
            {
              title: '成交后加速上架',
              body: '准备运输、检查、整备、定价、商品化和上架下一步，让车辆更快进入前线销售。',
            },
          ],
          insight: {
            title: '拍卖简报',
            body: '在车道机会转瞬即逝前，呈现值得追逐的车辆、需要复核的风险和建议出价上限。',
          },
          trace: [
            ['即将拍卖匹配', '2022 Toyota Camry SE'],
            ['拍卖清单', '车道时间与保存搜索命中'],
            ['批发可比', '近期可比成交已复核'],
            ['本地需求', '本地零售需求较强'],
            ['整备与运输', '中等整备风险，含运输预估'],
            ['推荐行动', '复核最高 18,400 美元出价'],
          ],
          badge: '拍卖智能',
        },
        {
          id: 'deal-fi-operations',
          label: '交易与 F&I',
          title: '交易与 F&I 运营',
          description: '帮助经销商团队支持车辆咨询、金融问题、保障产品、交易准备和经理复核流程。',
          useCases: [
            {
              title: '车辆咨询助手',
              body: '基于已批准上下文回答可售状态、配置、里程、版本、历史、激励、替代选择和下一步问题。',
            },
            {
              title: '金融方案支持',
              body: '用员工可用的话术解释贷款、租赁、首付、月供区间和可负担性问题。',
            },
            {
              title: 'F&I 预审工作流',
              body: '收集必要信息，识别缺失材料，总结买家上下文，并准备给 F&I 员工的交接备注。',
            },
            {
              title: '交易台支持',
              body: '呈现交易上下文、客户历史、车辆详情、置换备注、金融状态和经理复核要求。',
            },
          ],
          insight: {
            title: '交易准备简报',
            body: '在交易到达交易台前，准备客户、车辆、金融和置换上下文。',
          },
          trace: [
            ['客户询问', '这款车月供大概是多少？'],
            ['车辆可售状态', '首选版本可预约看车'],
            ['预算信号', '月供区间和首付已记录'],
            ['置换备注', '当前车辆详情已捕获'],
            ['F&I 清单', '缺失文件已准备复核'],
            ['推荐行动', '准备 F&I 交接摘要'],
          ],
          badge: '员工复核就绪',
        },
        {
          id: 'service-retention',
          label: '维修与留存',
          title: '维修与留存智能',
          description: '帮助经销商把维修历史、保养需求、维修状态和忠诚度信号转化为主动客户留存工作流。',
          useCases: [
            {
              title: '维修预约与提醒',
              body: '帮助客户预约维修、理解保养需求、确认预约并接收及时提醒。',
            },
            {
              title: '维修状态支持',
              body: '总结工单状态、配件可用性、技师备注、预计完工时间和客户沟通需求。',
            },
            {
              title: '保养与召回触达',
              body: '基于维修历史发现需要保养、检查、召回、保修或推荐维修的客户。',
            },
            {
              title: '忠诚度与留存触达',
              body: '根据生命周期上下文识别流失风险、临近置换时机或适合定向留存优惠的客户。',
            },
          ],
          insight: {
            title: '留存简报',
            body: '把维修事件、持有历史、维修状态和置换信号转化为及时留存行动。',
          },
          trace: [
            ['未结维修单', '配件状态：等待配件'],
            ['维修历史', '规律到店，并有近期服务顾问备注'],
            ['保养信号', '6 万英里保养到期'],
            ['召回通知', '可准备召回触达'],
            ['留存机会', '升级沟通时机浮现'],
            ['推荐触达', '发送维修更新和留存跟进'],
          ],
          badge: '留存工作流',
        },
      ],
      reasons: [
        {
          title: '经销商决策依赖实时市场上下文',
          body: '二手车定价、拍卖供给、零售需求、库存车龄和车辆流速一直在变化。PrismShadow 帮助 Agent 使用当前经销商上下文，而不是过期报表。',
        },
        {
          title: '拍卖机会转瞬即逝',
          body: '合适车辆可能出现在车道清单、线上拍卖、市场或置换网络中。PrismShadow 帮助把分散寻源信号变成 Agent 可用的情报。',
        },
        {
          title: '库存利润在车辆到店前就已决定',
          body: '出价、车况、整备成本、运输、零售需求和周转天数都会影响利润。PrismShadow 帮助 Agent 在车辆变成库存问题前评估采购决策。',
        },
        {
          title: '经销商工作流横跨许多系统',
          body: 'DMS、CRM、库存工具、拍卖数据、金融、维修、营销和沟通工具共同影响经销商表现。PrismShadow 帮助把这些工作流连接成 Agent 层。',
        },
        {
          title: '独立经销商需要更强杠杆',
          body: '小团队通常没有时间监控每个拍卖、市场、客户信号和维修机会。PrismShadow Agent 可以帮助团队更聪明地采购、销售和留存。',
        },
      ],
      resources: [
        {
          category: '二手车利润',
          title: '为什么二手车利润在车辆到店前就已决定',
          body: '了解拍卖智能、批发可比、车况报告、整备预估和本地需求如何影响采购决策。',
          cta: '阅读文章',
          href: '/blog/used-car-margins-before-the-lot',
        },
        {
          category: '经销商上下文',
          title: '把经销商与拍卖数据转化为 Agent 就绪上下文',
          body: '了解汽车经销商如何连接客户、库存、拍卖、定价、维修和营销数据来支持 AI 工作流。',
          cta: '阅读文章',
          href: '/blog/dealer-auction-data-agent-ready-context',
        },
      ],
    },
  },
} satisfies Record<Locale, Record<IndustryId, IndustryDetailsCopy>>
