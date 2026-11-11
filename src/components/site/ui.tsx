import type { CSSProperties, ReactNode } from 'react'
import { siteText, type Locale } from '../../i18n'
import { ArrowRightIcon, ArrowUpRightIcon, DiamondIcon } from './icons'
import { cx, renderAccent, type PixelLit, type PixelTone } from './utils'
import './ui.css'

export type { PixelLit, PixelTone } from './utils'

/* ------------------------------------------------------------------ */
/* Eyebrow                                                             */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  icon,
  className,
}: {
  children: ReactNode
  /** 10px glyph inside the chip. Defaults to a diamond. */
  icon?: ReactNode
  className?: string
}) {
  return (
    <span className={cx('ds-eyebrow', className)}>
      <span className="ds-eyebrow__chip" aria-hidden="true">
        {icon ?? <DiamondIcon />}
      </span>
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export type ButtonVariant = 'primary' | 'secondary' | 'accent'

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size,
  arrow = false,
  external = false,
  className,
}: {
  href: string
  children: ReactNode
  variant?: ButtonVariant
  size?: 'sm' | 'lg'
  /** Trailing arrow; external links get an up-right arrow automatically. */
  arrow?: boolean
  external?: boolean
  className?: string
}) {
  return (
    <a
      className={cx('ds-btn', `ds-btn--${variant}`, size && `ds-btn--${size}`, className)}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
      {external ? <ArrowUpRightIcon /> : arrow ? <ArrowRightIcon /> : null}
    </a>
  )
}

export function TextLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string
  children: ReactNode
  external?: boolean
  className?: string
}) {
  return (
    <a
      className={cx('ds-link', className)}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
      {external ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
    </a>
  )
}

/* ------------------------------------------------------------------ */
/* Section head                                                        */
/* ------------------------------------------------------------------ */

export function SectionHead({
  eyebrow,
  title,
  titleId,
  lead,
  actions,
  variant = 'split',
  as: Heading = 'h2',
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  /** id for the heading so the <section> can use aria-labelledby. */
  titleId?: string
  lead?: ReactNode
  actions?: ReactNode
  /** split: title left, lead right · stack: lead under title · center */
  variant?: 'split' | 'stack' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}) {
  const leadBlock = lead || actions ? (
    <>
      {lead ? <p className="ds-lead">{lead}</p> : null}
      {actions ? <div className="ds-actions">{actions}</div> : null}
    </>
  ) : null

  return (
    <div
      className={cx(
        'ds-section-head',
        variant !== 'split' && `ds-section-head--${variant}`,
        className,
      )}
    >
      <div className="ds-section-head__main">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading className={Heading === 'h1' ? 'ds-h1' : 'ds-h2'} id={titleId}>
          {title}
        </Heading>
        {variant !== 'split' ? leadBlock : null}
      </div>
      {variant === 'split' && leadBlock ? (
        <div className="ds-section-head__aside">{leadBlock}</div>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page hero (inner pages)                                             */
/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  media,
  meta,
  align = 'split',
  id = 'hero',
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  /** Visual on the right (split) or below (center). */
  media?: ReactNode
  /** Small row under the actions: badges, stats, install command… */
  meta?: ReactNode
  align?: 'split' | 'center' | 'left'
  id?: string
  className?: string
}) {
  return (
    <section
      id={id}
      className={cx('ds-page-hero', `ds-page-hero--${align}`, className)}
      aria-labelledby={`${id}-title`}
    >
      <div className="ds-container ds-page-hero__inner">
        <div className="ds-page-hero__copy">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="ds-h1 ds-page-hero__title" id={`${id}-title`}>
            {title}
          </h1>
          {lead ? <p className="ds-lead ds-page-hero__lead">{lead}</p> : null}
          {actions ? <div className="ds-actions ds-page-hero__actions">{actions}</div> : null}
          {meta ? <div className="ds-page-hero__meta">{meta}</div> : null}
        </div>
        {media && align !== 'left' ? <div className="ds-page-hero__media">{media}</div> : null}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Closing CTA band                                                    */
/* ------------------------------------------------------------------ */

export type CtaBandCopy = {
  title: string
  /** Part of the title rendered in the accent color (must appear in title). */
  titleAccent?: string
  body?: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export function CtaBand({
  locale,
  copy,
  id = 'get-started',
}: {
  locale: Locale
  /** Defaults to the shared site CTA. */
  copy?: CtaBandCopy
  id?: string
}) {
  const c = copy ?? siteText[locale].cta
  const title = renderAccent(c.title, c.titleAccent)

  return (
    <section id={id} className="ds-cta" aria-labelledby={`${id}-title`}>
      <div className="ds-container ds-cta__inner">
        <div className="ds-cta__copy">
          <h2 className="ds-cta__title" id={`${id}-title`}>
            {title}
          </h2>
          {c.body ? <p className="ds-lead">{c.body}</p> : null}
          <div className="ds-actions">
            <ButtonLink href={c.primary.href} variant="primary" size="lg" arrow>
              {c.primary.label}
            </ButtonLink>
            {c.secondary ? (
              <ButtonLink href={c.secondary.href} variant="secondary" size="lg">
                {c.secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <PixelField
          className="ds-cta__field"
          animate
          live={0.06}
          seed={3}
          cols={22}
          rows={9}
          shape="square"
          lit={ctaStaircase}
          fade="left"
        />
      </div>
    </section>
  )
}

// A quiet rising path: outlined steps that brighten toward one filled focal point.
const ctaStaircase: PixelLit[] = Array.from({ length: 11 }, (_, i) => {
  const c = 1 + i * 2
  const r = 8 - Math.round((i * 7) / 10)
  return { c, r, tone: 'accent', outline: i < 10, dim: i < 6 } as PixelLit
})

/* ------------------------------------------------------------------ */
/* PixelField: modal-style cell grids, built in SVG                    */
/* ------------------------------------------------------------------ */

const toneVar: Record<PixelTone, string> = {
  accent: 'var(--ds-accent)',
  cyan: 'var(--ds-cyan)',
  amber: 'var(--ds-amber)',
  coral: 'var(--ds-coral)',
  green: 'var(--ds-green)',
  text: 'var(--ds-text)',
}

/**
 * A grid of faint cells with a few lit ones. Purely decorative (aria-hidden);
 * describe what it shows in nearby text if it carries meaning.
 * Deterministic, so it renders identically on server and client.
 */
/** Deterministic 0–1 noise per cell (same on server and client). */
function cellNoise(c: number, r: number, seed: number) {
  let h = (Math.imul(c + 1, 73856093) ^ Math.imul(r + 1, 19349663) ^ Math.imul(seed, 83492791)) >>> 0
  h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0
  h = Math.imul(h ^ (h >>> 13), 3266489917) >>> 0
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

export function PixelField({
  cols,
  rows,
  cell = 14,
  gap = 6,
  shape = 'square',
  lit = [],
  fade = 'none',
  fit = 'meet',
  animate = false,
  live = 0,
  seed = 1,
  className,
  style,
}: {
  cols: number
  rows: number
  cell?: number
  gap?: number
  shape?: 'square' | 'circle' | 'diamond'
  lit?: PixelLit[]
  /** Mask the field so it dissolves toward an edge. */
  fade?: 'none' | 'left' | 'right' | 'bottom' | 'radial'
  fit?: 'meet' | 'slice'
  /** Opt into the motion system (data-animate="custom"); style the motion in CSS. */
  animate?: boolean
  /**
   * Share (0–1) of background cells that fill and empty on their own slow,
   * staggered rhythm while the field is in view (`ds-twinkle`). Deterministic
   * per cell, so server and client render the same markup.
   */
  live?: number
  /** Varies which cells twinkle and when, so neighbouring fields differ. */
  seed?: number
  className?: string
  style?: CSSProperties
}) {
  const step = cell + gap
  const width = cols * step - gap
  const height = rows * step - gap
  const litMap = new Map(lit.map((p, index) => [`${p.c}:${p.r}`, { ...p, index }]))
  const cells: ReactNode[] = []

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const p = litMap.get(`${c}:${r}`)
      const x = c * step
      const y = r * step
      const color = p ? toneVar[p.tone ?? 'accent'] : undefined
      // Outlined lit cells keep their colour as fill at zero opacity, so CSS can
      // turn them solid (animate fill-opacity) without changing the resting look.
      const fill = p ? color : 'var(--ds-pixel-off, rgba(255,255,255,0.035))'
      const stroke = p ? color : 'var(--ds-pixel-line, rgba(255,255,255,0.07))'
      const opacity = p?.dim ? 0.45 : 1
      const key = `${c}:${r}`
      const noise = cellNoise(c, r, seed)
      const twinkle = !p && live > 0 && noise < live
      // Lit cells carry their order (--i) and resting opacity; twinkling cells
      // carry their own delay (--d) and period (--t). CSS does the animating.
      const common = {
        fill,
        stroke,
        strokeWidth: 1,
        opacity,
        fillOpacity: p && p.outline ? 0 : undefined,
        ...(p
          ? {
              'data-lit': '',
              style: { '--i': p.index, '--ds-glint-rest': opacity } as CSSProperties,
            }
          : twinkle
            ? {
                'data-twinkle': '',
                style: {
                  '--d': `${(cellNoise(r, c, seed + 7) * 6).toFixed(2)}s`,
                  '--t': `${(3.2 + cellNoise(c + 3, r + 5, seed) * 3.6).toFixed(2)}s`,
                } as CSSProperties,
              }
            : {}),
      }
      if (shape === 'circle') {
        cells.push(<circle key={key} {...common} cx={x + cell / 2} cy={y + cell / 2} r={cell / 2 - 0.5} />)
      } else if (shape === 'diamond') {
        const h = cell / 2
        cells.push(
          <path
            key={key}
            {...common}
            d={`M${x + h} ${y + 0.5}L${x + cell - 0.5} ${y + h}L${x + h} ${y + cell - 0.5}L${x + 0.5} ${y + h}Z`}
          />,
        )
      } else {
        cells.push(
          <rect key={key} {...common} x={x + 0.5} y={y + 0.5} width={cell - 1} height={cell - 1} rx={2} />,
        )
      }
    }
  }

  return (
    <svg
      className={cx('ds-pixel-field', fade !== 'none' && `ds-pixel-field--fade-${fade}`, className)}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={fit === 'slice' ? 'xMidYMid slice' : 'xMidYMid meet'}
      aria-hidden="true"
      focusable="false"
      data-animate={animate ? 'custom' : undefined}
      style={style}
    >
      {cells}
    </svg>
  )
}
