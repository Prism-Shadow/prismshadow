import type { Locale } from '../../locales'
import type { CtaCopy, FeatureCopy, SectionHeadCopy, StatCopy, TabCopy } from './types'

// Old page content plus facts from the public LlamaFactory README.

export type LlamaStepId = 'model' | 'dataset' | 'method' | 'evaluation' | 'export'

export type LlamaFactoryCopy = {
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    body: string
    primaryCta: string
    secondaryCta: string
    metaLabel: string
    meta: string[]
    board: {
      ariaLabel: string
      title: string
      tabs: string[]
      fields: { label: string; value: string }[]
      lossLabel: string
      stepLabel: string
      commandLabel: string
      start: string
    }
  }
  proof: SectionHeadCopy & {
    stats: (StatCopy & { body: string })[]
    usedBy: string
  }
  workflow: SectionHeadCopy & {
    tabsLabel: string
    stackLabel: string
    stackTitle: string
    steps: (TabCopy & { id: LlamaStepId; stack: string })[]
    visuals: {
      model: { selected: string; sizes: string }
      dataset: { columns: string[]; sources: string }
      method: { title: string; note: string; unit: string }
      evaluation: { lossLabel: string; trainLabel: string; evalLabel: string; monitors: string }
      export: { comments: { merge: string; serve: string } }
    }
  }
  capabilities: SectionHeadCopy & {
    items: FeatureCopy[]
  }
  methods: SectionHeadCopy & {
    matrixLabel: string
    approachHeader: string
    approaches: { short: string; name: string }[]
    tricksTitle: string
    tricks: string[]
    algorithmsTitle: string
    algorithms: string[]
  }
  models: SectionHeadCopy & {
    sizesLabel: string
    dayZero: string
    dayOne: string
    familiesLabel: string
  }
  teams: SectionHeadCopy & {
    audience: FeatureCopy[]
  }
  open: SectionHeadCopy & {
    cards: FeatureCopy[]
    architectureAriaLabel: string
    architectureItems: string[]
    architectureCaption: string
  }
  cta: CtaCopy
}

export const llamaFactoryCopy = {
  en: {
    hero: {
      eyebrow: 'Open-source fine-tuning',
      title: 'Fine-tune open models.',
      titleAccent: 'open models',
      body: 'Avoid tool sprawl with one WebUI and CLI for training, evaluation, quantization, export, and inference.',
      primaryCta: 'Get started on GitHub',
      secondaryCta: 'View workflow',
      metaLabel: 'LlamaFactory at a glance',
      meta: ['Apache-2.0', '8K+ forks', 'ACL 2024 paper', 'Zero-code CLI and Web UI'],
      board: {
        ariaLabel:
          'LLaMA Board, the LlamaFactory web UI, configured for LoRA fine-tuning of Qwen3-4B-Instruct',
        title: 'LLaMA Board',
        tabs: ['Train', 'Evaluate & Predict', 'Chat', 'Export'],
        fields: [
          { label: 'Model', value: 'Qwen/Qwen3-4B-Instruct-2507' },
          { label: 'Stage', value: 'sft' },
          { label: 'Finetuning type', value: 'lora · rank 8' },
          { label: 'Template', value: 'qwen3_nothink' },
          { label: 'Dataset', value: 'identity, alpaca_en_demo' },
          { label: 'Learning rate', value: '1.0e-4' },
          { label: 'Epochs', value: '3.0' },
          { label: 'Scheduler', value: 'cosine' },
        ],
        lossLabel: 'Training loss',
        stepLabel: 'step',
        commandLabel: 'Preview command',
        start: 'Start',
      },
    },
    proof: {
      eyebrow: 'Open source',
      title: 'Open-source traction, product-grade workflow.',
      titleAccent: 'product-grade workflow',
      lead: 'LlamaFactory gives model teams a practical way to standardize fine-tuning without giving up open-source control.',
      stats: [
        {
          value: '70K+',
          label: 'GitHub stars',
          body: 'A strong community signal from engineers building with open models.',
        },
        {
          value: '3M+',
          label: 'Downloads',
          body: 'Adoption across open-model training workflows.',
        },
        {
          value: '500+',
          label: 'Models supported',
          body: 'LLMs and VLMs across LLaMA, Qwen, DeepSeek, Mistral, Gemma, Phi and more.',
        },
        {
          value: '13K+',
          label: 'Models built with it',
          body: 'Fine-tuned models from teams across the open-model ecosystem.',
        },
      ],
      usedBy: 'Used by Amazon, NVIDIA, Aliyun and more.',
    },
    workflow: {
      eyebrow: 'Workflow',
      title: 'From base model to usable checkpoint.',
      titleAccent: 'usable checkpoint',
      lead: 'The workflow stays readable from setup to export, so teams can repeat what worked.',
      tabsLabel: 'Fine-tuning workflow',
      stackLabel: 'Training stack',
      stackTitle: 'Controlled model work',
      steps: [
        {
          id: 'model',
          label: 'Base model',
          stack: 'Qwen, LLaMA, Mistral, Gemma',
          title: 'Select the base model',
          body: 'Choose the open model family, size, and method that fit the task and deployment target.',
          points: [
            {
              title: 'Day-0 support',
              body: 'New releases like Qwen3 and Gemma 3 are ready to fine-tune on launch day.',
            },
            {
              title: 'Every major hub',
              body: 'Load weights from Hugging Face, ModelScope or Modelers.',
            },
          ],
        },
        {
          id: 'dataset',
          label: 'Dataset',
          stack: 'Instruction and domain examples',
          title: 'Attach the dataset',
          body: 'Bring task examples, instruction data, or domain records into a training-ready format.',
          points: [
            {
              title: 'Wide tasks',
              body: 'Multi-turn dialogue, tool use, image, video and audio understanding.',
            },
            {
              title: 'Any source',
              body: 'Hub datasets, local files, or S3 and GCS paths.',
            },
          ],
        },
        {
          id: 'method',
          label: 'Method',
          stack: 'LoRA, QLoRA, full tuning',
          title: 'Configure the run',
          body: 'Set fine-tuning method, quantization, batch settings, schedule, and checkpoint behavior.',
          points: [
            {
              title: '2- to 8-bit QLoRA',
              body: 'Via AQLM, AWQ, GPTQ, LLM.int8, HQQ and EETQ.',
            },
            {
              title: 'Fast kernels',
              body: 'FlashAttention-2, Unsloth and Liger Kernel built in.',
            },
          ],
        },
        {
          id: 'evaluation',
          label: 'Evaluation',
          stack: 'Loss, prediction, checkpoint review',
          title: 'Evaluate checkpoints',
          body: 'Review loss, predictions, and behavior before committing the model to downstream workflows.',
          points: [
            {
              title: 'Experiment monitors',
              body: 'LlamaBoard, TensorBoard, Wandb, MLflow and SwanLab.',
            },
            {
              title: 'Chat before you ship',
              body: 'Talk to any checkpoint in the Web UI or CLI.',
            },
          ],
        },
        {
          id: 'export',
          label: 'Export',
          stack: 'Quantized or inference-ready model',
          title: 'Export for inference',
          body: 'Move the selected checkpoint into an inference-ready format for product or platform teams.',
          points: [
            {
              title: 'OpenAI-style API',
              body: 'Serve with vLLM or SGLang workers.',
            },
            {
              title: 'Merge and quantize',
              body: 'Merge LoRA adapters, export quantized weights or an Ollama modelfile.',
            },
          ],
        },
      ],
      visuals: {
        model: { selected: 'Selected', sizes: 'sizes' },
        dataset: {
          columns: ['instruction', 'input', 'output'],
          sources: 'Hugging Face · ModelScope · Modelers · local · S3 / GCS',
        },
        method: {
          title: 'GPU memory to fine-tune a 7B model',
          note: 'Estimated, from the LlamaFactory hardware table.',
          unit: 'GB',
        },
        evaluation: {
          lossLabel: 'loss',
          trainLabel: 'train',
          evalLabel: 'eval',
          monitors: 'LlamaBoard · TensorBoard · Wandb · MLflow · SwanLab',
        },
        export: {
          comments: {
            merge: 'merge the LoRA adapter into the base model',
            serve: 'OpenAI-style API on port 8000',
          },
        },
      },
    },
    capabilities: {
      eyebrow: 'Capabilities',
      title: 'One workspace for the model loop.',
      titleAccent: 'the model loop',
      lead: 'Bring the messy parts of fine-tuning into one repeatable surface.',
      items: [
        {
          title: 'WebUI for teams, CLI for pipelines',
          body: 'Use a visual workspace for setup and review, or run repeatable training jobs from command-line workflows.',
        },
        {
          title: 'Efficient fine-tuning methods',
          body: 'Work with LoRA, QLoRA, and parameter-efficient methods that keep experiments practical on constrained hardware.',
        },
        {
          title: 'Dataset and checkpoint control',
          body: 'Prepare data, manage checkpoints, inspect runs, and keep model experiments understandable for the whole team.',
        },
        {
          title: 'Evaluation before export',
          body: 'Compare model behavior, validate training choices, and move stronger checkpoints toward production inference.',
        },
        {
          title: 'Open stack integration',
          body: 'Adapt the workflow to your infrastructure instead of locking model training inside a closed platform.',
        },
        {
          title: 'Faster inference',
          body: 'An OpenAI-style API, Gradio UI and CLI, backed by vLLM or SGLang workers.',
        },
      ],
    },
    methods: {
      eyebrow: 'Methods',
      title: 'Every training approach, every tuning method.',
      titleAccent: 'every tuning method',
      lead: 'Pre-training, supervised fine-tuning, reward modeling and preference optimization all run with full, freeze, LoRA, QLoRA, OFT and QOFT tuning.',
      matrixLabel: 'Supported training approaches by tuning method: every combination is supported',
      approachHeader: 'Approach',
      approaches: [
        { short: 'PT', name: 'Pre-training' },
        { short: 'SFT', name: 'Supervised fine-tuning' },
        { short: 'RM', name: 'Reward modeling' },
        { short: 'PPO', name: 'PPO training' },
        { short: 'DPO', name: 'DPO training' },
        { short: 'KTO', name: 'KTO training' },
        { short: 'ORPO', name: 'ORPO training' },
        { short: 'SimPO', name: 'SimPO training' },
      ],
      tricksTitle: 'Practical tricks',
      tricks: [
        'FlashAttention-2',
        'Unsloth',
        'Liger Kernel',
        'KTransformers',
        'RoPE scaling',
        'NEFTune',
        'rsLoRA',
      ],
      algorithmsTitle: 'Advanced algorithms',
      algorithms: [
        'GaLore',
        'BAdam',
        'APOLLO',
        'Adam-mini',
        'Muon',
        'OFT',
        'DoRA',
        'LongLoRA',
        'LLaMA Pro',
        'Mixture-of-Depths',
        'LoRA+',
        'LoftQ',
        'PiSSA',
      ],
    },
    models: {
      eyebrow: 'Models',
      title: '500+ models, ready on day one.',
      titleAccent: 'ready on day one',
      lead: 'LLMs, VLMs and omni models from every major lab. New releases get fine-tuning support on day 0 or day 1.',
      sizesLabel: 'Sizes',
      dayZero: 'Day 0: Qwen3 · Qwen2.5-VL · Gemma 3 · GLM-4.1V · InternLM 3 · MiniCPM-o-2.6',
      dayOne: 'Day 1: Llama 3 · GLM-4 · Mistral Small · PaliGemma2 · Llama 4',
      familiesLabel: 'Supported model families',
    },
    teams: {
      eyebrow: 'Who it is for',
      title: 'Built for the teams behind AI products.',
      titleAccent: 'AI products',
      lead: 'From one researcher’s experiment to a platform standard.',
      audience: [
        {
          title: 'Model engineers',
          body: 'Run repeatable fine-tuning work without stitching together one-off scripts.',
        },
        {
          title: 'Research groups',
          body: 'Compare methods, datasets, and model families with cleaner experiment flow.',
        },
        {
          title: 'Applied AI teams',
          body: 'Prepare task-specific models for products, agents, and internal applications.',
        },
        {
          title: 'Platform owners',
          body: 'Standardize training workflows across teams while keeping infrastructure flexible.',
        },
      ],
    },
    open: {
      eyebrow: 'Architecture',
      title: 'Open source by design.',
      titleAccent: 'by design',
      lead: 'LlamaFactory is built in the open for teams that value visibility, extensibility, and control. Inspect the code, adapt the workflow, integrate it into your stack, and move faster without depending on a closed platform layer.',
      cards: [
        {
          title: 'Apache-2.0 license',
          body: 'Open for inspection, adaptation and reuse inside internal model operations.',
        },
        {
          title: 'Active community',
          body: '8K+ forks. A large builder base contributes fixes, integrations, and practical examples.',
        },
        {
          title: 'Transparent development',
          body: 'Teams can inspect the implementation instead of treating training as a black box.',
        },
        {
          title: 'Extensible architecture',
          body: 'Fit the workflow around your model stack, data handling, and deployment path.',
        },
      ],
      architectureAriaLabel:
        'Open source architecture: the WebUI and CLI drive the Trainer, Evaluator and Exporter',
      architectureItems: ['WebUI', 'CLI', 'Trainer', 'Evaluator', 'Exporter'],
      architectureCaption: 'One engine behind both interfaces',
    },
    cta: {
      title: 'Bring open-model training into one repeatable workflow.',
      titleAccent: 'one repeatable workflow',
      body: 'Use LlamaFactory when your team needs practical fine-tuning, transparent control, and a path from experiment to inference.',
      primary: { label: 'Explore on GitHub', href: 'https://github.com/hiyouga/LlamaFactory' },
      secondary: { label: 'View WebUI', href: '#llama-webui' },
    },
  },
  zh: {
    hero: {
      eyebrow: '开源模型微调',
      title: '微调开源模型。',
      titleAccent: '开源模型',
      body: '用一套 WebUI 和 CLI 覆盖训练、评估、量化、导出和推理，告别四散的工具。',
      primaryCta: '在 GitHub 开始',
      secondaryCta: '查看工作流',
      metaLabel: 'LlamaFactory 概览',
      meta: ['Apache-2.0', '8K+ Fork', 'ACL 2024 论文', '零代码 CLI 与 Web UI'],
      board: {
        ariaLabel: 'LLaMA Board：LlamaFactory 的 Web 界面，已配置 Qwen3-4B-Instruct 的 LoRA 微调',
        title: 'LLaMA Board',
        tabs: ['训练', '评估与预测', '对话', '导出'],
        fields: [
          { label: '模型', value: 'Qwen/Qwen3-4B-Instruct-2507' },
          { label: '训练阶段', value: 'sft' },
          { label: '微调方法', value: 'lora · rank 8' },
          { label: '对话模板', value: 'qwen3_nothink' },
          { label: '数据集', value: 'identity, alpaca_en_demo' },
          { label: '学习率', value: '1.0e-4' },
          { label: '训练轮数', value: '3.0' },
          { label: '学习率调度', value: 'cosine' },
        ],
        lossLabel: '训练损失',
        stepLabel: '步数',
        commandLabel: '预览命令',
        start: '开始',
      },
    },
    proof: {
      eyebrow: '开源',
      title: '开源影响力，产品级工作流。',
      titleAccent: '产品级工作流',
      lead: 'LlamaFactory 让模型团队以务实的方式标准化微调，同时保留开源的控制权。',
      stats: [
        {
          value: '70K+',
          label: 'GitHub 星标',
          body: '来自开源模型工程师社区的强烈信号。',
        },
        {
          value: '3M+',
          label: '下载量',
          body: '广泛用于开源模型训练工作流。',
        },
        {
          value: '500+',
          label: '支持模型',
          body: '覆盖 LLaMA、Qwen、DeepSeek、Mistral、Gemma、Phi 等 LLM 与 VLM。',
        },
        {
          value: '13K+',
          label: '基于其训练的模型',
          body: '来自开源模型生态中各个团队的微调模型。',
        },
      ],
      usedBy: 'Amazon、NVIDIA、阿里云等均在使用。',
    },
    workflow: {
      eyebrow: '工作流',
      title: '从基础模型到可用 checkpoint。',
      titleAccent: '可用 checkpoint',
      lead: '从配置到导出，工作流始终清晰可读，团队可以重复有效的做法。',
      tabsLabel: '微调工作流',
      stackLabel: '训练栈',
      stackTitle: '可控的模型工作',
      steps: [
        {
          id: 'model',
          label: '基础模型',
          stack: 'Qwen、LLaMA、Mistral、Gemma',
          title: '选择基础模型',
          body: '选择适合任务和部署目标的开源模型家族、尺寸和方法。',
          points: [
            {
              title: 'Day-0 适配',
              body: 'Qwen3、Gemma 3 等新模型发布当天即可微调。',
            },
            {
              title: '主流模型仓库',
              body: '从 Hugging Face、ModelScope 或魔乐社区加载权重。',
            },
          ],
        },
        {
          id: 'dataset',
          label: '数据集',
          stack: '指令与领域示例',
          title: '接入数据集',
          body: '将任务示例、指令数据或领域记录整理为可训练的格式。',
          points: [
            {
              title: '广泛任务',
              body: '多轮对话、工具调用、图像、视频与语音理解。',
            },
            {
              title: '任意来源',
              body: '模型仓库数据集、本地文件或 S3 / GCS 路径。',
            },
          ],
        },
        {
          id: 'method',
          label: '微调方法',
          stack: 'LoRA、QLoRA、全量微调',
          title: '配置训练运行',
          body: '设置微调方法、量化、batch、学习率调度和 checkpoint 行为。',
          points: [
            {
              title: '2 至 8 比特 QLoRA',
              body: '基于 AQLM、AWQ、GPTQ、LLM.int8、HQQ 与 EETQ。',
            },
            {
              title: '高性能算子',
              body: '内置 FlashAttention-2、Unsloth 与 Liger Kernel。',
            },
          ],
        },
        {
          id: 'evaluation',
          label: '评估',
          stack: 'Loss、预测、checkpoint 审查',
          title: '评估 checkpoint',
          body: '在模型进入下游工作流之前，审查 loss、预测结果和模型行为。',
          points: [
            {
              title: '实验监控',
              body: 'LlamaBoard、TensorBoard、Wandb、MLflow 与 SwanLab。',
            },
            {
              title: '先对话，再交付',
              body: '在 Web UI 或 CLI 中与任意 checkpoint 对话。',
            },
          ],
        },
        {
          id: 'export',
          label: '导出',
          stack: '量化或推理就绪的模型',
          title: '导出用于推理',
          body: '把选定的 checkpoint 转为产品或平台团队可直接使用的推理格式。',
          points: [
            {
              title: 'OpenAI 风格 API',
              body: '基于 vLLM 或 SGLang 推理后端提供服务。',
            },
            {
              title: '合并与量化',
              body: '合并 LoRA 适配器，导出量化权重或 Ollama modelfile。',
            },
          ],
        },
      ],
      visuals: {
        model: { selected: '已选择', sizes: '尺寸' },
        dataset: {
          columns: ['instruction', 'input', 'output'],
          sources: 'Hugging Face · ModelScope · 魔乐社区 · 本地 · S3 / GCS',
        },
        method: {
          title: '微调 7B 模型所需显存',
          note: '估算值，来自 LlamaFactory 硬件需求表。',
          unit: 'GB',
        },
        evaluation: {
          lossLabel: 'loss',
          trainLabel: '训练',
          evalLabel: '验证',
          monitors: 'LlamaBoard · TensorBoard · Wandb · MLflow · SwanLab',
        },
        export: {
          comments: {
            merge: '将 LoRA 适配器合并进基础模型',
            serve: '在 8000 端口提供 OpenAI 风格 API',
          },
        },
      },
    },
    capabilities: {
      eyebrow: '核心能力',
      title: '覆盖模型闭环的一套工作空间。',
      titleAccent: '模型闭环',
      lead: '把微调中繁琐的环节收进一个可重复的操作界面。',
      items: [
        {
          title: '团队用 WebUI，流水线用 CLI',
          body: '用可视化工作区完成配置和审查，也可以通过命令行运行可重复的训练任务。',
        },
        {
          title: '高效微调方法',
          body: '支持 LoRA、QLoRA 等参数高效方法，让受限硬件上的实验依然可行。',
        },
        {
          title: '数据集与 checkpoint 控制',
          body: '准备数据、管理 checkpoint、检查运行，让整个团队都能看懂模型实验。',
        },
        {
          title: '导出前评估',
          body: '比较模型行为、验证训练选择，把更强的 checkpoint 推向生产推理。',
        },
        {
          title: '开放技术栈集成',
          body: '让工作流适配你的基础设施，而不是把模型训练锁进封闭平台。',
        },
        {
          title: '极速推理',
          body: '基于 vLLM 或 SGLang 的 OpenAI 风格 API、浏览器界面和命令行接口。',
        },
      ],
    },
    methods: {
      eyebrow: '训练方法',
      title: '每种训练范式，每种微调方式。',
      titleAccent: '每种微调方式',
      lead: '预训练、指令监督微调、奖励模型训练与偏好优化，均支持全参数、冻结、LoRA、QLoRA、OFT 与 QOFT 微调。',
      matrixLabel: '训练范式与微调方式的支持矩阵：所有组合均已支持',
      approachHeader: '训练范式',
      approaches: [
        { short: 'PT', name: '预训练' },
        { short: 'SFT', name: '指令监督微调' },
        { short: 'RM', name: '奖励模型训练' },
        { short: 'PPO', name: 'PPO 训练' },
        { short: 'DPO', name: 'DPO 训练' },
        { short: 'KTO', name: 'KTO 训练' },
        { short: 'ORPO', name: 'ORPO 训练' },
        { short: 'SimPO', name: 'SimPO 训练' },
      ],
      tricksTitle: '实用技巧',
      tricks: [
        'FlashAttention-2',
        'Unsloth',
        'Liger Kernel',
        'KTransformers',
        'RoPE scaling',
        'NEFTune',
        'rsLoRA',
      ],
      algorithmsTitle: '先进算法',
      algorithms: [
        'GaLore',
        'BAdam',
        'APOLLO',
        'Adam-mini',
        'Muon',
        'OFT',
        'DoRA',
        'LongLoRA',
        'LLaMA Pro',
        'Mixture-of-Depths',
        'LoRA+',
        'LoftQ',
        'PiSSA',
      ],
    },
    models: {
      eyebrow: '模型',
      title: '500+ 模型，发布当天即可微调。',
      titleAccent: '发布当天即可微调',
      lead: '覆盖各大实验室的 LLM、VLM 与全模态模型，最新模型在发布当天或次日即获得微调支持。',
      sizesLabel: '尺寸',
      dayZero: 'Day 0：Qwen3 · Qwen2.5-VL · Gemma 3 · GLM-4.1V · InternLM 3 · MiniCPM-o-2.6',
      dayOne: 'Day 1：Llama 3 · GLM-4 · Mistral Small · PaliGemma2 · Llama 4',
      familiesLabel: '支持的模型家族',
    },
    teams: {
      eyebrow: '适用团队',
      title: '为 AI 产品背后的团队而构建。',
      titleAccent: 'AI 产品',
      lead: '从一位研究员的实验，到整个平台的标准。',
      audience: [
        {
          title: '模型工程师',
          body: '运行可重复的微调工作，不再拼接一次性脚本。',
        },
        {
          title: '研究团队',
          body: '用更清晰的实验流程比较方法、数据集和模型家族。',
        },
        {
          title: '应用 AI 团队',
          body: '为产品、Agent 和内部应用准备任务专属模型。',
        },
        {
          title: '平台负责人',
          body: '跨团队标准化训练工作流，同时保持基础设施的灵活性。',
        },
      ],
    },
    open: {
      eyebrow: '架构',
      title: '以开源方式构建。',
      titleAccent: '开源方式',
      lead: 'LlamaFactory 为重视可见性、可扩展性和控制权的团队开放构建。你可以检查代码、适配工作流、集成到自己的技术栈，不依赖封闭平台也能更快推进。',
      cards: [
        {
          title: 'Apache-2.0 开源协议',
          body: '可检查、可适配，可在内部模型运营中复用。',
        },
        {
          title: '活跃社区',
          body: '8K+ Fork，庞大的开发者群体持续贡献修复、集成和实践示例。',
        },
        {
          title: '透明开发',
          body: '团队可以检查实现，而不是把训练当成黑箱。',
        },
        {
          title: '可扩展架构',
          body: '围绕你的模型栈、数据处理和部署路径适配工作流。',
        },
      ],
      architectureAriaLabel: '开源架构示意：WebUI 与 CLI 驱动 Trainer、Evaluator 与 Exporter',
      architectureItems: ['WebUI', 'CLI', 'Trainer', 'Evaluator', 'Exporter'],
      architectureCaption: '两种界面，同一个引擎',
    },
    cta: {
      title: '把开源模型训练收进可重复的工作流。',
      titleAccent: '可重复的工作流',
      body: '当团队需要务实的微调、透明的控制，以及从实验到推理的完整路径时，选择 LlamaFactory。',
      primary: { label: '在 GitHub 查看', href: 'https://github.com/hiyouga/LlamaFactory' },
      secondary: { label: '查看 WebUI', href: '#llama-webui' },
    },
  },
} satisfies Record<Locale, LlamaFactoryCopy>
