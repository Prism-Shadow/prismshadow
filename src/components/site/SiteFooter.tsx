import { siteText, type Locale } from '../../i18n'
import {
  DiscordIcon,
  GithubIcon,
  GlobeIcon,
  LinkedInIcon,
  XLogoIcon,
  YouTubeIcon,
} from './icons'
import { getFooterColumns, socialLinks } from './navigation'
import './site-footer.css'

const socialIcon = {
  github: GithubIcon,
  x: XLogoIcon,
  discord: DiscordIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
} as const

export function SiteFooter({
  locale,
  onToggleLocale,
}: {
  locale: Locale
  onToggleLocale: () => void
}) {
  const t = siteText[locale]
  const columns = getFooterColumns(locale)

  return (
    <footer className="ds-footer" aria-label={t.a11y.footer}>
      <div className="ds-container">
        <div className="ds-footer__top">
          <div className="ds-footer__brand">
            <a className="ds-footer__logo" href="/" aria-label={t.a11y.home}>
              <img src="/prism-shadow-mark-white.png" alt="" width="24" height="24" />
              <span>{t.brandName}</span>
            </a>
            <p>{t.footer.tagline}</p>
          </div>
          <nav className="ds-footer__nav" aria-label={t.a11y.footerNav}>
            {columns.map((column) => (
              <div className="ds-footer__col" key={column.title}>
                <p className="ds-footer__heading">{column.title}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="ds-footer__bottom">
          <ul className="ds-footer__social" aria-label={t.a11y.social}>
            {socialLinks.map((link) => {
              const Icon = socialIcon[link.id]
              return (
                <li key={link.id}>
                  <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                    <Icon />
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="ds-footer__legal">
            <button
              type="button"
              className="ds-footer__lang"
              onClick={onToggleLocale}
              aria-label={t.a11y.switchLanguage}
            >
              <GlobeIcon />
              {t.nav.otherLanguage}
            </button>
            <span>{t.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
