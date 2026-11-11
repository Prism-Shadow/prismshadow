import { CtaBand } from '../site/ui'
import type { Locale } from '../../i18n/locales'
import { homePageCopy } from '../../i18n/messages/home'
import { HeroSection } from './sections/HeroSection'
import { LogosSection } from './sections/LogosSection'
import { PlatformSection } from './sections/PlatformSection'
import { ProductsSection } from './sections/ProductsSection'
import { ProofSection } from './sections/ProofSection'
import { TeamSection } from './sections/TeamSection'
import './home.css'

export type HomePageProps = {
  locale: Locale
}

/**
 * A short, modal-length homepage: hero, logos, platform, products, proof and a
 * one-row team line. The full story lives on /platform, /customers and /people.
 */
export function HomePage({ locale }: HomePageProps) {
  const copy = homePageCopy[locale]

  return (
    <div className="pg-home">
      <HeroSection copy={copy.hero} />
      <LogosSection copy={copy.logos} />
      <PlatformSection copy={copy.platform} />
      <ProductsSection copy={copy.products} locale={locale} />
      <ProofSection copy={copy.proof} />
      <TeamSection copy={copy.team} />
      <CtaBand locale={locale} />
    </div>
  )
}
