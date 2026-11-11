import type { Locale } from '../../locales'

/**
 * A logo in the homepage strip. Every source is a transparent mark that the
 * strip flattens to one light tone, so colour and backgrounds never matter.
 */
export type PartnerLogo = {
  name: string
  src: string
  /** Width / height of the visible mark (after `crop`). Drives optical sizing. */
  ratio: number
  /** Visible region of the source image as `[x, y, width, height]` fractions. */
  crop?: [number, number, number, number]
  /** Optical-size correction: dense marks read larger, so they get < 1. */
  scale?: number
  /**
   * For brands whose official wordmark is live text rather than a vector file:
   * `src` is the official glyph and this name is typeset after it.
   */
  wordmark?: string
}

export type LogosCopy = {
  title: string
  logosLabel: string
  logos: PartnerLogo[]
}

const logos: PartnerLogo[] = [
  { name: 'NVIDIA', src: '/home/partners/nvidia.svg', ratio: 5.22, scale: 0.92 },
  { name: 'AWS', src: '/home/partners/aws.svg', ratio: 1.67, scale: 0.9 },
  { name: 'AMD', src: '/home/partners/amd.svg', ratio: 4.16, scale: 0.8 },
  { name: 'Cobo Wallet', src: '/home/partners/cobo-wallet.svg', ratio: 3.29, scale: 0.84 },
  {
    name: 'Subconscious.ai',
    src: '/home/partners/subconscious-mark.svg',
    ratio: 1,
    wordmark: 'Subconscious',
  },
]

export const logosCopy = {
  en: {
    title: 'Trusted by teams at',
    logosLabel: 'Teams using PrismShadow',
    logos,
  },
  zh: {
    title: '他们在用 PrismShadow',
    logosLabel: '使用 PrismShadow 的团队',
    logos,
  },
} satisfies Record<Locale, LogosCopy>
