// Non-localized LlamaFactory facts from the public README (hiyouga/LlamaFactory).

export const llamaLinks = {
  github: 'https://github.com/hiyouga/LlamaFactory',
} as const

/** Tuning methods, the columns of the README's "Supported Training Approaches" table. */
export const tuningMethods = ['Full', 'Freeze', 'LoRA', 'QLoRA', 'OFT', 'QOFT'] as const

/** A selection of model families and sizes from the README's "Supported Models" table. */
export const modelFamilies: { name: string; sizes: string }[] = [
  { name: 'Qwen3', sizes: '0.6B–235B' },
  { name: 'Qwen3-VL', sizes: '2B–235B' },
  { name: 'Llama 4', sizes: '109B / 402B' },
  { name: 'Llama 3–3.3', sizes: '1B–70B' },
  { name: 'DeepSeek 3–3.2', sizes: '236B / 671B' },
  { name: 'DeepSeek R1', sizes: '1.5B–671B' },
  { name: 'Gemma 3', sizes: '270M–27B' },
  { name: 'GLM-4.5', sizes: '9B–355B' },
  { name: 'GPT-OSS', sizes: '20B / 120B' },
  { name: 'Mistral / Mixtral', sizes: '7B–8x22B' },
  { name: 'Phi-4', sizes: '3.8B / 14B' },
  { name: 'InternVL 2.5–3.5', sizes: '1B–241B' },
  { name: 'MiniCPM-o / V 4.5', sizes: '8B / 9B' },
  { name: 'Kimi-VL', sizes: '16B' },
  { name: 'MiniMax-M1 / M2', sizes: '229B / 456B' },
  { name: 'ERNIE-4.5', sizes: '0.3B–300B' },
]

/** Model picker rows for the "Base model" tab (sizes from the README table). */
export const pickerModels: { name: string; template: string; sizes: string }[] = [
  { name: 'Qwen3', template: 'qwen3', sizes: '0.6B · 1.7B · 4B · 8B · 14B · 32B · 80B · 235B' },
  { name: 'Llama 4', template: 'llama4', sizes: '109B · 402B' },
  { name: 'DeepSeek R1', template: 'deepseekr1', sizes: '1.5B · 7B · 8B · 14B · 32B · 70B · 671B' },
  { name: 'Gemma 3', template: 'gemma3', sizes: '270M · 1B · 4B · 12B · 27B' },
  { name: 'GLM-4.5', template: 'glm4_moe', sizes: '9B · 106B · 355B' },
  { name: 'Mistral', template: 'mistral', sizes: '7B · 8x7B · 8x22B' },
]

/** Estimated GPU memory to fine-tune a 7B model, from the README hardware table. */
export const memory7b: { method: string; bits: string; gb: number }[] = [
  { method: 'Full (bf16 / fp16)', bits: '32', gb: 120 },
  { method: 'Full (pure_bf16)', bits: '16', gb: 60 },
  { method: 'Freeze / LoRA / GaLore', bits: '16', gb: 16 },
  { method: 'QLoRA', bits: '8', gb: 10 },
  { method: 'QLoRA', bits: '4', gb: 6 },
  { method: 'QLoRA', bits: '2', gb: 4 },
]

/** More keys from examples/train_lora/qwen3_lora_sft.yaml, shown in the hero board. */
export const boardYaml: [string, string][] = [
  ['cutoff_len', '2048'],
  ['warmup_ratio', '0.1'],
  ['bf16', 'true'],
  ['output_dir', 'saves/qwen3-4b/lora/sft'],
]

export const quickstart = {
  export: 'llamafactory-cli export examples/merge_lora/qwen3_lora_sft.yaml',
  serve:
    'API_PORT=8000 llamafactory-cli api examples/inference/qwen3.yaml infer_backend=vllm vllm_enforce_eager=true',
  train: 'llamafactory-cli train examples/train_lora/qwen3_lora_sft.yaml',
  webui: 'llamafactory-cli webui',
} as const
