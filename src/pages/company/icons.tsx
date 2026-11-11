import type { SVGProps } from 'react'

/** Company-page line icons: 16px, 1.5px stroke, currentColor, decorative. */
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

export const LockIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="7" width="10" height="7" rx="1.5" />
    <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
  </svg>
)

export const ShieldIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M8 1.8l5 1.9v4c0 3.1-2.1 5.4-5 6.5-2.9-1.1-5-3.4-5-6.5v-4z" />
  </svg>
)

export const DatabaseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <ellipse cx="8" cy="3.8" rx="5" ry="1.8" />
    <path d="M3 3.8v8.4c0 1 2.2 1.8 5 1.8s5-.8 5-1.8V3.8M3 8c0 1 2.2 1.8 5 1.8S13 9 13 8" />
  </svg>
)

export const SearchKeyIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="7" cy="7" r="4.2" />
    <path d="M10.2 10.2L14 14" />
  </svg>
)

export const ServerIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="2.5" y="2.5" width="11" height="4.5" rx="1" />
    <rect x="2.5" y="9" width="11" height="4.5" rx="1" />
    <path d="M5 4.75h.01M5 11.25h.01" />
  </svg>
)

export const ToolIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M9.8 2.6a3.2 3.2 0 00-3.9 4.3L2.4 10.4a1.3 1.3 0 001.8 1.8l3.5-3.5a3.2 3.2 0 004.3-3.9l-2 2-1.6-.4-.4-1.6z" />
  </svg>
)

export const GateIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2.5 13.5v-11M13.5 13.5v-11M2.5 5h11M6 8.5l2 2 2-2" />
  </svg>
)

export const PersonCheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="6.5" cy="5" r="2.5" />
    <path d="M2 13.5c.4-2.4 2.2-4 4.5-4 1 0 1.9.3 2.6.8M10.5 12l1.5 1.5 2.5-3" />
  </svg>
)

export const LayersIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M8 2l6 3.2L8 8.4 2 5.2z" />
    <path d="M2 8l6 3.2L14 8M2 10.8L8 14l6-3.2" />
  </svg>
)

export const SlidersIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 4h6M12 4h1M3 8h1M7 8h6M3 12h7M13 12h0" />
    <circle cx="10.5" cy="4" r="1.5" />
    <circle cx="5.5" cy="8" r="1.5" />
    <circle cx="11.5" cy="12" r="1.5" />
  </svg>
)

export const EraseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2.5 4.5h11M6 4.5V3h4v1.5M4 4.5l.7 9h6.6l.7-9" />
  </svg>
)

export const HistoryIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2.6 8a5.4 5.4 0 101.6-3.8M2.5 2.5v2.2h2.2" />
    <path d="M8 5v3.2l2 1.3" />
  </svg>
)

export const TraceIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="3.5" cy="4" r="1.5" />
    <circle cx="12.5" cy="12" r="1.5" />
    <path d="M5 4h4.5a2 2 0 010 4h-3a2 2 0 000 4H11" />
  </svg>
)

export const EyeIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" />
    <circle cx="8" cy="8" r="2" />
  </svg>
)

export const CloudIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4.5 12.5a3 3 0 01-.4-6A4 4 0 0111.8 6a3.25 3.25 0 01-.3 6.5z" />
  </svg>
)

export const ApiIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5.5 4L2 8l3.5 4M10.5 4L14 8l-3.5 4M9 3l-2 10" />
  </svg>
)

export const BookIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M2.5 3.5c2-.8 3.8-.6 5.5.6v9c-1.7-1.2-3.5-1.4-5.5-.6zM13.5 3.5c-2-.8-3.8-.6-5.5.6v9c1.7-1.2 3.5-1.4 5.5-.6z" />
  </svg>
)

export const StarIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M8 2l1.8 3.8 4.1.5-3 2.8.8 4.1L8 11.2l-3.7 2 .8-4.1-3-2.8 4.1-.5z" />
  </svg>
)

export const DownloadIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M8 2.5v8M4.5 7.5L8 11l3.5-3.5M2.5 13.5h11" />
  </svg>
)

export const CubeIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M8 1.8l5.5 3v6.4L8 14.2l-5.5-3V4.8z" />
    <path d="M2.5 4.8L8 7.8l5.5-3M8 7.8v6.4" />
  </svg>
)

export const ForkIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="4.5" cy="3.5" r="1.5" />
    <circle cx="11.5" cy="3.5" r="1.5" />
    <circle cx="8" cy="12.5" r="1.5" />
    <path d="M4.5 5v1.5a1.5 1.5 0 001.5 1.5h4a1.5 1.5 0 001.5-1.5V5M8 8v3" />
  </svg>
)

export const ChevronIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 4l4 4-4 4" />
  </svg>
)

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    {/* pathLength lets a mock draw the tick in (security.css); no effect at rest. */}
    <path d="M3 8.5l3 3 7-7" pathLength={1} />
  </svg>
)

export const AlertIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4.8v3.6M8 11h.01" />
  </svg>
)

export const CrossIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
  </svg>
)

export const MailIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
    <path d="M2.5 4.5L8 8.8l5.5-4.3" />
  </svg>
)
