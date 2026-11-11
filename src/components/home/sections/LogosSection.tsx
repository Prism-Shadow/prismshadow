import type { CSSProperties } from 'react'
import type { LogosCopy, PartnerLogo } from '../../../i18n/messages/home'
import './logos.css'

/**
 * Optical sizing: a mark's height scales with ratio^-HEIGHT_EXP, so wide
 * wordmarks get wider but thinner and compact marks get taller, keeping the
 * perceived area close across the strip (0.5 would be strictly equal area;
 * a little less keeps long wordmarks legible).
 */
const HEIGHT_EXP = 0.42

/**
 * The marquee track holds the set this many times; it scrolls by exactly one
 * set per loop (see logos.css), so the loop is seamless at any width.
 */
const COPIES = 4

function LogoMark({ logo, decorative }: { logo: PartnerLogo; decorative: boolean }) {
  const alt = decorative ? '' : logo.name

  if (logo.wordmark) {
    // Official glyph + the brand name, typeset (their wordmark is live text).
    return (
      <span className="hp-logos__wordmark">
        <img src={logo.src} alt={alt} loading="lazy" decoding="async" />
        <span aria-hidden="true">{logo.wordmark}</span>
      </span>
    )
  }

  const width = (logo.scale ?? 1) * Math.pow(logo.ratio, 1 - HEIGHT_EXP)
  const markStyle = {
    '--logo-ratio': String(logo.ratio),
    '--logo-w': width.toFixed(3),
  } as CSSProperties

  // Show only the `crop` region: the image is scaled up inside the mark box
  // and offset so the region fills it exactly.
  const [x, y, w, h] = logo.crop ?? [0, 0, 1, 1]
  const imageStyle: CSSProperties | undefined = logo.crop
    ? {
        width: `${100 / w}%`,
        height: `${100 / h}%`,
        left: `${(-100 * x) / w}%`,
        top: `${(-100 * y) / h}%`,
      }
    : undefined

  return (
    <span className="hp-logos__mark" style={markStyle}>
      <img src={logo.src} alt={alt} loading="lazy" decoding="async" style={imageStyle} />
    </span>
  )
}

/**
 * A quiet, slowly scrolling strip. The first set is the real list; the copies
 * that make the loop seamless are hidden from assistive tech. Under reduced
 * motion only the first set shows, as a static centred row.
 */
export function LogosSection({ copy }: { copy: LogosCopy }) {
  return (
    <section id="partners" className="hp-logos" aria-labelledby="partners-title">
      <div className="ds-container hp-logos__inner">
        <h2 id="partners-title" className="hp-logos__title">
          {copy.title}
        </h2>
        {/* Focusable so keyboard users can pause the scroll (it pauses on focus). */}
        <div className="hp-logos__viewport" role="group" aria-label={copy.logosLabel} tabIndex={0}>
          <div className="hp-logos__track">
            {Array.from({ length: COPIES }, (_, copyIndex) => (
              <ul
                key={copyIndex}
                className="hp-logos__set"
                aria-hidden={copyIndex > 0 ? true : undefined}
              >
                {copy.logos.map((logo) => (
                  <li className="hp-logos__item" key={logo.name}>
                    <LogoMark logo={logo} decorative={copyIndex > 0} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
