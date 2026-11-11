import type { SVGProps } from 'react'

/** Product-page line icons: 16px grid, 1.5px stroke, currentColor, decorative by default. */
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

export const SparkIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 2v3M8 11v3M2 8h3M11 8h3M4.2 4.2l1.6 1.6M10.2 10.2l1.6 1.6M11.8 4.2l-1.6 1.6M5.8 10.2l-1.6 1.6" />
  </svg>
)

export const GaugeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 11a5.5 5.5 0 1 1 11 0" />
    <path d="M8 11l2.5-3.5" />
  </svg>
)

export const LoopIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 6.5A5 5 0 0 0 3.6 5M3 9.5A5 5 0 0 0 12.4 11" />
    <path d="M3.5 2.5V5H6M12.5 13.5V11H10" />
  </svg>
)

export const ServerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="2.5" width="11" height="4.5" rx="1" />
    <rect x="2.5" y="9" width="11" height="4.5" rx="1" />
    <path d="M5 4.75h.01M5 11.25h.01" />
  </svg>
)

export const ChatIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 4a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 13.5 4v5.5A1.5 1.5 0 0 1 12 11H7l-3 2.5V11a1.5 1.5 0 0 1-1.5-1.5Z" />
  </svg>
)

export const UsersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="6" cy="5.5" r="2.5" />
    <path d="M1.5 13.5a4.5 4.5 0 0 1 9 0M10.5 3.2a2.5 2.5 0 0 1 0 4.6M12 9.6a4.5 4.5 0 0 1 2.5 3.9" />
  </svg>
)

export const BookIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 4.5C6.5 3.2 4.5 3 2.5 3.2v9.3c2-.2 4 0 5.5 1.3 1.5-1.3 3.5-1.5 5.5-1.3V3.2C11.5 3 9.5 3.2 8 4.5ZM8 4.5v9.3" />
  </svg>
)

export const ClockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="5.5" />
    <path d="M8 5v3l2 1.5" />
  </svg>
)

export const BranchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="4.5" cy="3.5" r="1.5" />
    <circle cx="4.5" cy="12.5" r="1.5" />
    <circle cx="11.5" cy="6" r="1.5" />
    <path d="M4.5 5v6M11.5 7.5c0 2.5-2 3-5.5 4" />
  </svg>
)

export const ChartIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V6.5" />
  </svg>
)

export const TraceIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.5 4h6M5 8h8.5M2.5 12h4.5" />
  </svg>
)

export const TrophyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 2.5h6v3.5a3 3 0 0 1-6 0Z" />
    <path d="M5 4H2.5c0 2 1 3 2.7 3.2M11 4h2.5c0 2-1 3-2.7 3.2M8 9v2.5M5.5 13.5h5" />
  </svg>
)

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 2l5 2v4c0 3-2.2 5.2-5 6-2.8-.8-5-3-5-6V4Z" />
    <path d="M6 8l1.5 1.5L10.5 6.5" />
  </svg>
)

export const FileIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 2.5h5l3 3v8H4Z" />
    <path d="M9 2.5v3h3M6 9h4M6 11h3" />
  </svg>
)

export const LayersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 2.5l5.5 3L8 8.5l-5.5-3Z" />
    <path d="M2.5 8.5l5.5 3 5.5-3M2.5 11l5.5 3 5.5-3" />
  </svg>
)

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
)

export const LinkIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.5 9.5l3-3M7 4.5l1-1a2.8 2.8 0 0 1 4 4l-1 1M9 11.5l-1 1a2.8 2.8 0 0 1-4-4l1-1" />
  </svg>
)

export const HandoffIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="5" cy="5" r="2" />
    <path d="M1.5 12.5a3.5 3.5 0 0 1 7 0M10 6.5h4.5M12.5 4.5l2 2-2 2" />
  </svg>
)

export const DatabaseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <ellipse cx="8" cy="4" rx="5" ry="1.8" />
    <path d="M3 4v8c0 1 2.2 1.8 5 1.8s5-.8 5-1.8V4M3 8c0 1 2.2 1.8 5 1.8S13 9 13 8" />
  </svg>
)

export const CubeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 2l5.5 3v6L8 14l-5.5-3V5Z" />
    <path d="M2.5 5L8 8l5.5-3M8 8v6" />
  </svg>
)

export const SlidersIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 4h10M3 8h10M3 12h10" />
    <circle cx="6" cy="4" r="1.3" fill="currentColor" />
    <circle cx="10.5" cy="8" r="1.3" fill="currentColor" />
    <circle cx="5" cy="12" r="1.3" fill="currentColor" />
  </svg>
)

export const ArrowSlimIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 8h9.5M9.5 5l3 3-3 3" />
  </svg>
)

export const MonitorIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2" y="2.5" width="12" height="8.5" rx="1.5" />
    <path d="M5.5 13.5h5M8 11v2.5" />
  </svg>
)

export const UploadIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 10.5V2.5M5 5.5l3-3 3 3M2.5 10v3.5h11V10" />
  </svg>
)

export const TerminalIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2" y="3" width="12" height="10" rx="1.5" />
    <path d="M4.5 6.5L6.5 8l-2 1.5M8 10h3" />
  </svg>
)

export const CopyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
    <path d="M10.5 5.5V3.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
  </svg>
)

export const PlugIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 2.5v3M10 2.5v3M4.5 5.5h7v2a3.5 3.5 0 0 1-7 0ZM8 11v2.5" />
  </svg>
)

export const GlobeGridIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="5.5" />
    <path d="M2.5 8h11M8 2.5c1.6 1.6 2.4 3.4 2.4 5.5S9.6 11.9 8 13.5C6.4 11.9 5.6 10.1 5.6 8S6.4 4.1 8 2.5Z" />
  </svg>
)

export const SnapshotIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="4" width="11" height="8.5" rx="1.5" />
    <circle cx="8" cy="8.25" r="2.2" />
    <path d="M5.5 4l1-1.5h3l1 1.5" />
  </svg>
)
