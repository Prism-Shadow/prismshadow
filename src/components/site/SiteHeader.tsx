import { useEffect, useRef, useState } from 'react'
import { siteText, type Locale } from '../../i18n'
import { ChevronDownIcon, CloseIcon, GlobeIcon, MenuIcon, ArrowRightIcon } from './icons'
import {
  departmentsPath,
  getCompanyLinks,
  getDepartmentLinks,
  getIndustryLinks,
  getProductLinks,
  getResourceLinks,
  productLogos,
  platformPath,
  productOrder,
  type NavLink,
} from './navigation'
import { PixelField } from './ui'
import './site-header.css'

type MenuId = 'products' | 'solutions' | 'resources' | 'company'

export type SiteHeaderProps = {
  locale: Locale
  pathname: string
  onToggleLocale: () => void
}

export function SiteHeader({ locale, pathname, onToggleLocale }: SiteHeaderProps) {
  const t = siteText[locale]
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastPathname, setLastPathname] = useState(pathname)
  const navRef = useRef<HTMLDivElement>(null)

  // Close any open menu once an in-app navigation lands on a new page.
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setOpenMenu(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const section = activeSection(pathname)
  const products = getProductLinks(locale)
  const resources = getResourceLinks(locale)
  const departments = getDepartmentLinks(locale)
  const industries = getIndustryLinks(locale)
  const company = getCompanyLinks(locale)

  const menuTrigger = (id: MenuId, label: string) => (
    <button
      type="button"
      className="ds-nav__trigger"
      aria-expanded={openMenu === id}
      aria-controls={`ds-menu-${id}`}
      data-active={section === id || undefined}
      onClick={() => setOpenMenu((current) => (current === id ? null : id))}
    >
      {label}
      <ChevronDownIcon />
    </button>
  )

  const hoverProps = (id: MenuId) => ({
    onMouseEnter: () => setOpenMenu(id),
    onMouseLeave: () => setOpenMenu((current) => (current === id ? null : current)),
  })

  return (
    <header className="ds-header" data-scrolled={scrolled || mobileOpen || undefined}>
      <a className="ds-skip-link" href="#main">
        {t.a11y.skipToContent}
      </a>
      <div className="ds-container ds-header__bar">
        <a className="ds-header__brand" href="/" aria-label={t.a11y.home}>
          <img src="/prism-shadow-mark-white.png" alt="" width="22" height="22" />
          <span>{t.brandName}</span>
        </a>

        <nav
          className="ds-nav"
          aria-label={t.a11y.primaryNav}
          ref={navRef}
          onClick={(event) => {
            if ((event.target as Element).closest('a')) setOpenMenu(null)
          }}
        >
          <ul className="ds-nav__list">
            <li className="ds-nav__item" {...hoverProps('products')}>
              {menuTrigger('products', t.nav.products)}
              <div
                className="ds-menu ds-menu--products"
                id="ds-menu-products"
                data-open={openMenu === 'products' || undefined}
              >
                <div className="ds-menu__panel">
                  <ul className="ds-menu__products">
                    {products.map((link, index) => (
                      <li key={link.href}>
                        <a className="ds-menu__product" href={link.href}>
                          <span className="ds-menu__logo">
                            <img src={productLogos[productOrder[index]]} alt="" />
                          </span>
                          <span>
                            <span className="ds-menu__name">{link.label}</span>
                            <span className="ds-menu__desc">{link.description}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a className="ds-menu__feature" href={platformPath}>
                    <PixelField
                      className="ds-menu__feature-art"
                      cols={14}
                      rows={5}
                      cell={10}
                      gap={5}
                      lit={[
                        { c: 1, r: 3, tone: 'accent', dim: true },
                        { c: 3, r: 3, tone: 'accent', dim: true },
                        { c: 5, r: 2, tone: 'accent' },
                        { c: 7, r: 2, tone: 'accent' },
                        { c: 9, r: 1, tone: 'cyan' },
                        { c: 11, r: 1, tone: 'accent' },
                        { c: 12, r: 0, tone: 'text' },
                      ]}
                    />
                    <span className="ds-menu__name">{t.nav.platformOverview}</span>
                    <span className="ds-menu__desc">{t.nav.platformOverviewBody}</span>
                  </a>
                </div>
              </div>
            </li>

            <li className="ds-nav__item" {...hoverProps('solutions')}>
              {menuTrigger('solutions', t.nav.solutions)}
              <div
                className="ds-menu ds-menu--solutions"
                id="ds-menu-solutions"
                data-open={openMenu === 'solutions' || undefined}
              >
                <div className="ds-menu__panel">
                  <div className="ds-menu__col">
                    <p className="ds-menu__heading">{t.nav.byDepartment}</p>
                    <ul className="ds-menu__links ds-menu__links--2">
                      {departments.map((link) => (
                        <li key={link.href}>
                          <a href={link.href}>{link.label}</a>
                        </li>
                      ))}
                    </ul>
                    <a className="ds-menu__more" href={departmentsPath}>
                      {t.nav.allDepartments}
                      <ArrowRightIcon />
                    </a>
                  </div>
                  <div className="ds-menu__col">
                    <p className="ds-menu__heading">{t.nav.byIndustry}</p>
                    <ul className="ds-menu__links ds-menu__links--2">
                      {industries.map((link) => (
                        <li key={link.href}>
                          <a href={link.href}>{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li className="ds-nav__item">
              <a
                className="ds-nav__link"
                href="/customers"
                data-active={section === 'customers' || undefined}
              >
                {t.nav.customers}
              </a>
            </li>

            <li className="ds-nav__item" {...hoverProps('resources')}>
              {menuTrigger('resources', t.nav.resources)}
              <div
                className="ds-menu ds-menu--resources"
                id="ds-menu-resources"
                data-open={openMenu === 'resources' || undefined}
              >
                <div className="ds-menu__panel">
                  <ul className="ds-menu__rows">
                    {resources.map((link) => (
                      <li key={link.href}>
                        <MenuRow link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            <li className="ds-nav__item" {...hoverProps('company')}>
              {menuTrigger('company', t.nav.company)}
              <div
                className="ds-menu ds-menu--resources"
                id="ds-menu-company"
                data-open={openMenu === 'company' || undefined}
              >
                <div className="ds-menu__panel">
                  <ul className="ds-menu__rows">
                    {company.map((link) => (
                      <li key={link.href}>
                        <MenuRow link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className="ds-header__actions">
          <button
            type="button"
            className="ds-header__lang"
            onClick={onToggleLocale}
            aria-label={t.a11y.switchLanguage}
          >
            <GlobeIcon />
            <span>{t.nav.otherLanguage}</span>
          </button>
          <a className="ds-btn ds-btn--primary ds-btn--sm" href="/contact">
            {t.nav.contact}
          </a>
        </div>

        <button
          type="button"
          className="ds-header__toggle"
          aria-expanded={mobileOpen}
          aria-controls="ds-mobile-menu"
          aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className="ds-mobile" id="ds-mobile-menu" hidden={!mobileOpen}>
        <div className="ds-container ds-mobile__inner">
          <MobileGroup
            title={t.nav.products}
            links={[{ label: t.footer.platform, href: platformPath }, ...products]}
          />
          <MobileGroup title={t.nav.byDepartment} links={departments} compact />
          <MobileGroup title={t.nav.byIndustry} links={industries} compact />
          <MobileGroup title={t.nav.resources} links={resources} compact />
          <MobileGroup title={t.nav.company} links={company} compact />
          <div className="ds-mobile__actions">
            <a className="ds-btn ds-btn--primary" href="/contact">
              {t.nav.contact}
            </a>
            <button
              type="button"
              className="ds-btn ds-btn--secondary"
              onClick={onToggleLocale}
              aria-label={t.a11y.switchLanguage}
            >
              <GlobeIcon />
              {t.nav.otherLanguage}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function MenuRow({ link }: { link: NavLink }) {
  return (
    <a
      className="ds-menu__row"
      href={link.href}
      {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className="ds-menu__name">
        {link.label}
        {link.external ? <span aria-hidden="true"> ↗</span> : null}
      </span>
      {link.description ? <span className="ds-menu__desc">{link.description}</span> : null}
    </a>
  )
}

function MobileGroup({
  title,
  links,
  compact = false,
}: {
  title: string
  links: NavLink[]
  compact?: boolean
}) {
  return (
    <div className="ds-mobile__group">
      <p className="ds-menu__heading">{title}</p>
      <ul className={compact ? 'ds-mobile__links ds-mobile__links--compact' : 'ds-mobile__links'}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function activeSection(pathname: string) {
  if (pathname.startsWith('/product') || pathname.startsWith('/platform')) return 'products'
  if (pathname.startsWith('/solutions') || pathname.startsWith('/industries')) return 'solutions'
  if (pathname.startsWith('/customers')) return 'customers'
  if (pathname.startsWith('/blog') || pathname.startsWith('/resources')) return 'resources'
  if (['/about', '/people', '/security', '/contact'].some((p) => pathname.startsWith(p))) {
    return 'company'
  }
  return null
}
