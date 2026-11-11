import type { Locale } from '../../../i18n/locales'

// Non-localized PenguinHarness facts, copied from the public README and the
// penguin.ooo landing source (packages/landing/src/lib/benchmark-data.ts).

export const penguinLinks = {
  site: 'https://penguin.ooo/',
  docs: 'https://penguin.ooo/docs/',
  docker: 'https://penguin.ooo/docs/quickstart-docker',
  download: 'https://penguin.ooo/download',
  github: 'https://github.com/Prism-Shadow/penguin-harness',
  productHunt: 'https://www.producthunt.com/products/penguinharness',
} as const

export type BenchRow = {
  harness: string
  model: string
  accuracyPct: number
  costUsd: number
  /** The series the story is about. */
  ours?: boolean
}

export type BenchSuite = { id: 'data' | 'code'; rows: BenchRow[] }

// Each harness on the model it is normally paired with. Token and cost figures are
// suite totals at official pricing. Data analysis: 15 tasks, single run. Coding: 40
// tasks x 2 runs (accuracy over all 80 outcomes).
export const benchmarkSuites: BenchSuite[] = [
  {
    id: 'data',
    rows: [
      { harness: 'PenguinHarness', model: 'DeepSeek V4 Pro', accuracyPct: 66.67, costUsd: 0.552406, ours: true },
      { harness: 'Claude Code', model: 'Claude Opus 4.8', accuracyPct: 53.33, costUsd: 38.479975 },
      { harness: 'OpenAI Codex', model: 'GPT-5.5', accuracyPct: 53.33, costUsd: 19.413715 },
    ],
  },
  {
    id: 'code',
    rows: [
      { harness: 'PenguinHarness', model: 'DeepSeek V4 Pro', accuracyPct: 71.25, costUsd: 3.812, ours: true },
      { harness: 'Claude Code', model: 'Claude Opus 4.8', accuracyPct: 86.25, costUsd: 146.97 },
      { harness: 'OpenAI Codex', model: 'GPT-5.5', accuracyPct: 71.25, costUsd: 220.08 },
    ],
  },
]

/** How many times more a rival spent on the same suite ($38.48 vs $0.55 → 70). */
export const costMultiple = (rival: BenchRow, ours: BenchRow) =>
  Math.round(rival.costUsd / ours.costUsd)

export const formatUsd = (value: number) => `$${value.toFixed(2)}`

export const formatPct = (value: number) => `${value.toFixed(2)}%`

export const supportedModels: { model: string; providers: string[] }[] = [
  {
    model: 'DeepSeek V4',
    providers: [
      'DeepSeek',
      'OpenRouter',
      'Fireworks AI',
      'SiliconFlow',
      'TokenDance',
      'Qwen Token Plan',
      'Qwen Pay-As-You-Go',
    ],
  },
  {
    model: 'Kimi K3',
    providers: ['Moonshot AI', 'OpenRouter', 'Fireworks AI', 'TokenDance', 'Qwen Pay-As-You-Go'],
  },
  { model: 'GLM 5.3', providers: ['Z.AI', 'OpenRouter', 'TokenDance'] },
  { model: 'Hunyuan 3', providers: ['OpenRouter'] },
  {
    model: 'Qwen 3.8 Max',
    providers: ['Qwen Token Plan', 'Qwen Pay-As-You-Go', 'OpenRouter', 'TokenDance'],
  },
  { model: 'GPT 5.6', providers: ['OpenAI', 'OpenRouter'] },
  { model: 'Gemini 3.7 Flash', providers: ['Google Gemini', 'OpenRouter'] },
  { model: 'Claude 5', providers: ['Anthropic', 'OpenRouter'] },
  { model: 'Inkling', providers: ['OpenRouter', 'Fireworks AI'] },
]

/**
 * Screens of the web app, captured from the live UI gallery (penguin.ooo/gallery)
 * in the default theme, dark mode, once per locale (`<file>-en.webp` / `-zh.webp`).
 * Copy for each screen lives in penguinHarness.ts, in the same order.
 */
export const appScreens = [
  { file: 'agents', path: '/agents' },
  { file: 'evaluation', path: '/benchmark' },
  { file: 'cost-center', path: '/usage' },
  { file: 'models', path: '/models' },
  { file: 'plugins', path: '/plugins' },
] as const

/** The hero (a self-evolution round in chat) and the Build tab (the new-chat page). */
export const heroScreen = { file: 'chat-rsi', width: 1920, height: 1200 } as const
export const buildScreen = { file: 'new-chat', width: 1268, height: 760 } as const

/** Every screenshot is 1920×1200 unless noted. */
export const screenSize = { width: 1920, height: 1200 } as const

export const screenSrc = (file: string, locale: Locale) => `/products/penguin-harness/${file}-${locale}.webp`

export type CommandKey ='start' | 'firstLogin' | 'oneShot' | 'repl' | 'headless'

/** Install snippets per terminal tab; comments are localized by key. */
export const installSnippets: { cmd: string; comment?: CommandKey }[][] = [
  [{ cmd: 'curl -fsSL https://penguin.ooo/install.sh | sh' }, { cmd: 'penguin web', comment: 'start' }],
  [{ cmd: 'irm https://penguin.ooo/install.ps1 | iex' }, { cmd: 'penguin web', comment: 'start' }],
  [{ cmd: 'npm install -g @prismshadow/penguin-cli' }, { cmd: 'penguin web', comment: 'start' }],
  [
    {
      cmd: 'docker run -d --name penguin -p 127.0.0.1:7364:7364 -v penguin-data:/data hiyouga/penguinharness:latest',
    },
    { cmd: 'docker logs penguin', comment: 'firstLogin' },
  ],
  [
    { cmd: 'penguin run -m "Create hello.txt containing Hello, Penguin"', comment: 'oneShot' },
    { cmd: 'penguin chat', comment: 'repl' },
    { cmd: 'penguin server', comment: 'headless' },
  ],
]
