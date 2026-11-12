import type { ReactElement, SVGProps } from 'react'
import type { PlatformFeatureIcon } from '../../i18n/messages/home'

/* Homepage line icons: 16px grid, 1.5px stroke, currentColor, decorative. */

type IconProps = SVGProps<SVGSVGElement>

function Icon16({ children, ...props }: IconProps & { children: ReactElement }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

const featureGlyphs: Record<PlatformFeatureIcon, ReactElement> = {
  // Circular arrow: recursive self-improvement.
  loop: (
    <>
      <path d="M13 8a5 5 0 1 1-1.6-3.7" />
      <path d="M13.2 2.6v2.6h-2.6" />
    </>
  ),
  // Stacked layers: a pool of models.
  models: (
    <>
      <path d="M8 2.5 13.5 5 8 7.5 2.5 5 8 2.5Z" />
      <path d="M2.5 8 8 10.5 13.5 8" />
      <path d="M2.5 11 8 13.5 13.5 11" />
    </>
  ),
  target: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2" />
    </>
  ),
  // Falling bars: cost going down.
  cost: (
    <>
      <path d="M2.5 13.5h11" />
      <path d="M4 11V3.5M8 11V6.5M12 11V9.5" />
    </>
  ),
  tasks: (
    <>
      <rect x="3" y="2" width="10" height="12" rx="1.5" />
      <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" />
    </>
  ),
  rubric: (
    <>
      <path d="M2.5 4.5 4 6l2.5-2.5" />
      <path d="M2.5 10.5 4 12l2.5-2.5" />
      <path d="M8.5 5h5M8.5 11h5" />
    </>
  ),
  terminal: (
    <>
      <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="1.5" />
      <path d="m4.5 6.5 2 1.5-2 1.5M8 10h3.5" />
    </>
  ),
  // Branching paths: distill, RL and eval from one source.
  branch: (
    <>
      <circle cx="4" cy="3.5" r="1.5" />
      <circle cx="4" cy="12.5" r="1.5" />
      <circle cx="12" cy="8" r="1.5" />
      <path d="M4 5v6M4 8h3.5a3 3 0 0 0 3-3V5M10.5 8H4" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="2.5" width="12" height="4.5" rx="1" />
      <rect x="2" y="9" width="12" height="4.5" rx="1" />
      <path d="M4.5 4.75h1M4.5 11.25h1" />
    </>
  ),
  tune: (
    <>
      <path d="M3 3v10M8 3v10M13 3v10" />
      <circle cx="3" cy="10" r="1.5" fill="currentColor" />
      <circle cx="8" cy="5.5" r="1.5" fill="currentColor" />
      <circle cx="13" cy="8.5" r="1.5" fill="currentColor" />
    </>
  ),
  // Plug: one API into existing systems.
  api: (
    <>
      <path d="M5.5 1.5v3M10.5 1.5v3" />
      <path d="M3.5 4.5h9v2.5a4.5 4.5 0 0 1-9 0V4.5Z" />
      <path d="M8 11.5v3" />
    </>
  ),
  compass: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="m10.5 5.5-1.6 3.4-3.4 1.6 1.6-3.4 3.4-1.6Z" />
    </>
  ),
  cube: (
    <>
      <path d="M8 1.75 13.5 4.75v6.5L8 14.25 2.5 11.25v-6.5L8 1.75Z" />
      <path d="M2.5 4.75 8 7.75l5.5-3M8 7.75v6.5" />
    </>
  ),
  play: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M6.75 5.75v4.5L10.5 8l-3.75-2.25Z" />
    </>
  ),
}

export const FeatureIcon = ({ name, ...props }: IconProps & { name: PlatformFeatureIcon }) => (
  <Icon16 {...props}>{featureGlyphs[name]}</Icon16>
)
