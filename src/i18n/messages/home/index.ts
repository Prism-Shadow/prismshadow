import type { Locale } from '../../locales'
import { heroCopy, type HeroCopy } from './hero'
import { logosCopy, type LogosCopy } from './logos'
import { platformCopy, type PlatformCopy } from './platform'
import { productsCopy, type ProductsCopy } from './products'
import { proofCopy, type ProofCopy } from './proof'
import { teamCopy, type TeamCopy } from './team'

export type { HeroCopy, HeroVisualCopy } from './hero'
export type { LogosCopy, PartnerLogo } from './logos'
export type {
  PlatformCopy,
  PlatformDiagramsCopy,
  PlatformFeature,
  PlatformFeatureIcon,
  PlatformModule,
  PlatformModuleId,
} from './platform'
export type { HomeProduct, ProductsCopy } from './products'
export type { ProofCopy, ProofCustomer, ProofStat } from './proof'
export type { TeamCopy } from './team'

export type HomePageCopy = {
  hero: HeroCopy
  logos: LogosCopy
  platform: PlatformCopy
  products: ProductsCopy
  proof: ProofCopy
  team: TeamCopy
}

const buildHomePageCopy = (locale: Locale): HomePageCopy => ({
  hero: heroCopy[locale],
  logos: logosCopy[locale],
  platform: platformCopy[locale],
  products: productsCopy[locale],
  proof: proofCopy[locale],
  team: teamCopy[locale],
})

export const homePageCopy: Record<Locale, HomePageCopy> = {
  en: buildHomePageCopy('en'),
  zh: buildHomePageCopy('zh'),
}
