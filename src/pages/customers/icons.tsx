import type { ReactElement, SVGProps } from 'react'
import type { AudienceSegment } from '../../i18n/messages/customersPage'

/*
 * Customer-profile icons: 24px grid, 1.25px stroke, currentColor, decorative,
 * with one accent detail each.
 */

type IconProps = SVGProps<SVGSVGElement>

const accent = 'cu-icon-accent'

const audienceGlyphs: Record<AudienceSegment['id'], ReactElement> = {
  // Briefcase with a document rising out of it: expert knowledge + business.
  knowledge: (
    <>
      <path d="M8.5 9V4a1 1 0 0 1 1-1h4.25L16 5.25V9" />
      <path className={accent} d="M10.75 6.5h2.5" />
      <rect x="3.5" y="9" width="17" height="11.5" rx="2" />
      <path d="M3.5 13.75h6.75M13.75 13.75h6.75" />
      <rect className={accent} x="10.25" y="12.5" width="3.5" height="2.75" rx=".75" />
    </>
  ),
  // Shield with a padlock: data and models stay inside the perimeter.
  security: (
    <>
      <path d="M12 3 19 5.6v5.15c0 4.5-2.95 7.8-7 9.55-4.05-1.75-7-5.05-7-9.55V5.6L12 3Z" />
      <rect className={accent} x="9" y="11.25" width="6" height="4.75" rx="1" />
      <path className={accent} d="M10.1 11.25v-1.2a1.9 1.9 0 0 1 3.8 0v1.2" />
    </>
  ),
  // Chip with a spark at its core: AI built into the product.
  'ai-native': (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <path d="M9.75 3.5v3M14.25 3.5v3M9.75 17.5v3M14.25 17.5v3M3.5 9.75h3M3.5 14.25h3M17.5 9.75h3M17.5 14.25h3" />
      <path
        className={accent}
        d="M12 9.1c.35 1.8 1.1 2.55 2.9 2.9-1.8.35-2.55 1.1-2.9 2.9-.35-1.8-1.1-2.55-2.9-2.9 1.8-.35 2.55-1.1 2.9-2.9Z"
      />
    </>
  ),
  // Cloud over a server stack: a platform serving its own customers.
  platforms: (
    <>
      <path d="M8.25 10.25h7.5a2.6 2.6 0 0 0 .35-5.17 4.1 4.1 0 0 0-7.8-.25 2.5 2.5 0 0 0-.05 5.42Z" />
      <path className={accent} d="M12 10.25v3.25" />
      <rect x="4" y="13.5" width="16" height="3.25" rx="1" />
      <rect x="4" y="17.75" width="16" height="3.25" rx="1" />
      <path className={accent} d="M6.75 15.1h1.25M6.75 19.4h1.25" />
    </>
  ),
}

export const AudienceIcon = ({ name, ...props }: IconProps & { name: AudienceSegment['id'] }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {audienceGlyphs[name]}
  </svg>
)
