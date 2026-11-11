# Content facts and copy rules

Loaded from `SKILL.md` when a change touches copy. These facts come from the owner. Use them
verbatim in meaning; you may tighten wording, but never change a number, invent a metric, a quote or
a customer, or upgrade an anonymous customer to a named one.

## Names

- The company is **PrismShadow**, one word. Never "Prism Shadow".
- The products are **PenguinHarness**, **Panofy** and **LlamaFactory**. Write **LlamaFactory** as one
  word in this casing, never "LLaMA Factory". Its repo is https://github.com/hiyouga/LlamaFactory.
- Founder names stay romanized in both locales: Buyue Qian (Founder & CEO), Xuejun Wu (Founder & CPO)
  and Yaowei Zheng (Founder & CTO).

## Positioning

> PrismShadow provides an integrated platform for data production, model training and agent
> self-evolution, helping enterprises build and continuously optimize AI workflows and AutoResearch
> systems, cutting labor costs and raising output.
>
> PrismShadow 提供一体化的数据生产、模型训练和 Agent 自进化平台，帮助企业构建并持续优化 AI 工作流与
> AutoResearch 自主科研系统，降低人力成本，提高产出能力。

## The four capabilities

1. **Self-evolving Agent platform.**
   - Agent Teams run real enterprise workflows.
   - 10+ RSI (recursive self-improvement) algorithms and 100+ models.
   - Keeps optimizing itself after deployment.
   - **90%+** accuracy on specialized tasks.
   - Model-call cost **about 1/30 of Claude Code** on identical test tasks.
2. **Data distillation & environment synthesis.** Generates training tasks, eval data, scoring rubrics
   and executable environments from enterprise documents and business rules, for distillation, RL and
   evaluation of models and agents.
3. **Local deployment & business tuning.** On-prem or private LLM deployment, training and tuning on
   enterprise data, and one unified multi-model API into existing systems.
4. **AutoResearch.** Model-driven autonomous research systems that explore algorithms, build models
   and execute solutions around a research goal.

## Customers

- **Cobo Wallet** (digital financial infrastructure): **+8.2%** composite agent success score across
  **30** real office-agent scenarios, at lower cost.
- **Subconscious.ai**: model training and optimization behind a **70B**-parameter social
  causal-reasoning LLM.
- **A semiconductor manufacturer** (anonymous): an enterprise agent platform for office processes and
  R&D test automation.
- **A pharmaceutical company** (anonymous): an AutoResearch system for drug R&D.
- **A health-screening company** (anonymous): a **14B** medical model tuned and deployed on-prem.

The homepage logo marquee shows exactly five logos: NVIDIA, AWS, AMD, Cobo Wallet and Subconscious.ai.
Show only real logo artwork, never an icon-only or unreadable mark. If no vector wordmark exists, set
the name in type next to the real glyph.

## The four customer profiles

- Knowledge-intensive
- Data-security-sensitive
- AI-transforming or AI-native companies
- SaaS and cloud platforms

## Team and open source

- **LlamaFactory**: **70K+** GitHub stars, **3M+** downloads, **500+** models supported, **13K+**
  models built with it.
- The open-source track record is LlamaFactory, EasyR1 and PenguinHarness.
- The founders come from IBM Research, Fudan University, Yahoo, Baidu, Alibaba, JD and ByteDance.
  Read full bios from `src/i18n/messages/people.ts`, the source of truth for them.

## PenguinHarness

Its facts come from its README, the source of truth:
- open-source (Apache 2.0) and local-first, with 1000+ models
- best accuracy on the data-analysis suite at **1/70** of Claude Code's cost
- a complete RAG app generated for **$0.02** of tokens on DeepSeek V4 Pro

Use only published benchmark numbers. Report them honestly, including where it trails, e.g. on the
coding suite.

## Links

| What | URL |
| --- | --- |
| Contact email | contact@prismshadow.com |
| X | https://x.com/prismshadow_ai |
| GitHub org | https://github.com/Prism-Shadow |
| PenguinHarness | https://penguin.ooo · https://github.com/Prism-Shadow/penguin-harness |
| Panofy docs | `docsUrl` in `src/components/site/navigation.ts` |

Social links live in `socialLinks` in `src/components/site/navigation.ts`. Change them there, nowhere
else.

## Copy rules

- **Confident, no hedging.** Show that the technology is excellent, the results significant, the team
  strong and the customers great, using only the facts above.
- **Service-first wherever prospects decide to reach out** (contact page, CTAs). Promise the complete
  platform working for their company, supported all the way to production, without inventing a
  response-time SLA.
- **Every string exists in en and zh.** The tests enforce identical shape and no empty strings.
- **zh addresses the reader as 您** on prospect-facing copy.
- **zh headings must not orphan one character.** Pages keep phrases together with `word-break:
  keep-all` scoped to the page, or with zero-width break hints. Check zh at 1440 and 390.
- **Brand terms stay in English inside zh**: Agent, AutoResearch, LlamaFactory, RSI, API.
