import type { SVGProps } from 'react'

/**
 * Shared 16px line icons (1.5px stroke, currentColor). Decorative by default:
 * pass `aria-hidden={false}` plus a <title> if an icon carries meaning alone.
 */
type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
})

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

export const ArrowUpRightIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 11l6-6M6 5h5v5" />
  </svg>
)

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 6l4 4 4-4" />
  </svg>
)

export const ChevronRightIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 4l4 4-4 4" />
  </svg>
)

export const MenuIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2.5 5h11M2.5 11h11" />
  </svg>
)

export const CloseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

export const GlobeIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="8" cy="8" r="6" />
    <path d="M2 8h12M8 2c1.8 1.7 2.6 3.7 2.6 6S9.8 12.3 8 14C6.2 12.3 5.4 10.3 5.4 8S6.2 3.7 8 2z" />
  </svg>
)

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 8.5l3 3 7-7" />
  </svg>
)

/** Default eyebrow glyph: a filled diamond. */
export const DiamondIcon = (props: IconProps) => (
  <svg {...base({ viewBox: '0 0 10 10', stroke: 'none', ...props })}>
    <path d="M5 0.8L9.2 5 5 9.2 0.8 5z" fill="currentColor" />
  </svg>
)

export const GithubIcon = (props: IconProps) => (
  <svg {...base({ stroke: 'none', ...props })}>
    <path
      fill="currentColor"
      d="M8 1.2a6.8 6.8 0 0 0-2.15 13.25c.34.06.47-.15.47-.33v-1.2c-1.9.41-2.3-.8-2.3-.8-.31-.79-.76-1-.76-1-.62-.42.05-.41.05-.41.68.05 1.04.7 1.04.7.61 1.04 1.6.74 1.99.57.06-.44.24-.74.43-.91-1.51-.17-3.1-.76-3.1-3.37 0-.74.27-1.35.7-1.83-.07-.17-.3-.86.07-1.8 0 0 .57-.18 1.87.7a6.5 6.5 0 0 1 3.4 0c1.3-.88 1.87-.7 1.87-.7.37.94.14 1.63.07 1.8.44.48.7 1.09.7 1.83 0 2.62-1.6 3.2-3.11 3.37.24.21.46.62.46 1.25v1.85c0 .18.12.4.47.33A6.8 6.8 0 0 0 8 1.2z"
    />
  </svg>
)

export const XLogoIcon = (props: IconProps) => (
  <svg {...base({ stroke: 'none', ...props })}>
    <path
      fill="currentColor"
      d="M11.9 2h2.1L9.4 7.2 14.8 14h-4.2L7.3 9.7 3.5 14H1.4l4.9-5.6L1.2 2h4.3l3 3.9L11.9 2zm-.7 10.8h1.2L4.9 3.2H3.6l7.6 9.6z"
    />
  </svg>
)

export const DiscordIcon = (props: IconProps) => (
  <svg {...base({ stroke: 'none', ...props })}>
    <path
      fill="currentColor"
      d="M13.2 3.4A11.5 11.5 0 0 0 10.4 2.5l-.36.73a10.6 10.6 0 0 0-4.08 0L5.6 2.5a11.5 11.5 0 0 0-2.8.9C1 6.06.53 8.65.77 11.2a11.6 11.6 0 0 0 3.45 1.75l.74-1.2a7.4 7.4 0 0 1-1.17-.56l.29-.22a8.2 8.2 0 0 0 7.04 0l.29.22c-.37.22-.76.4-1.17.56l.74 1.2a11.6 11.6 0 0 0 3.45-1.75c.29-2.95-.48-5.52-2.03-7.8zM5.8 9.65c-.68 0-1.24-.63-1.24-1.4 0-.78.55-1.41 1.24-1.41.7 0 1.25.64 1.24 1.41 0 .77-.55 1.4-1.24 1.4zm4.4 0c-.68 0-1.24-.63-1.24-1.4 0-.78.55-1.41 1.24-1.41.7 0 1.25.64 1.24 1.41 0 .77-.55 1.4-1.24 1.4z"
    />
  </svg>
)

export const YouTubeIcon = (props: IconProps) => (
  <svg {...base({ stroke: 'none', ...props })}>
    <path
      fill="currentColor"
      d="M15 4.7a1.9 1.9 0 0 0-1.33-1.34C12.5 3 8 3 8 3s-4.5 0-5.67.36A1.9 1.9 0 0 0 1 4.7 19.6 19.6 0 0 0 .67 8 19.6 19.6 0 0 0 1 11.3a1.9 1.9 0 0 0 1.33 1.34C3.5 13 8 13 8 13s4.5 0 5.67-.36A1.9 1.9 0 0 0 15 11.3 19.6 19.6 0 0 0 15.33 8 19.6 19.6 0 0 0 15 4.7zM6.5 10.15v-4.3L10.25 8 6.5 10.15z"
    />
  </svg>
)

export const LinkedInIcon = (props: IconProps) => (
  <svg {...base({ stroke: 'none', ...props })}>
    <path
      fill="currentColor"
      d="M13.6 1H2.4C1.6 1 1 1.6 1 2.4v11.2c0 .8.6 1.4 1.4 1.4h11.2c.8 0 1.4-.6 1.4-1.4V2.4c0-.8-.6-1.4-1.4-1.4zM5.2 12.9H3.1V6.2h2.1v6.7zM4.1 5.3a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm8.8 7.6h-2.1V9.6c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.8v3.3H6.3V6.2h2v.9h.03c.28-.53.97-1.1 2-1.1 2.13 0 2.53 1.4 2.53 3.23v3.67z"
    />
  </svg>
)
