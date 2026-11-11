import type { ReactNode } from 'react'

/** 16px line icons for the four marketplace benefits (decorative). */
const glyphs: ReactNode[] = [
  // Faster rollout
  <path key="0" d="M9 1.75L3.5 9H8l-1 5.25L12.5 7H8l1-5.25z" />,
  // Less prompt sprawl: scattered notes collapse into one stack
  <>
    <rect x="2.5" y="2.5" width="11" height="3" rx="1" />
    <rect x="2.5" y="6.5" width="11" height="3" rx="1" />
    <rect x="2.5" y="10.5" width="11" height="3" rx="1" />
  </>,
  // More consistent execution
  <path key="2" d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11M10.5 2.5l2 2-2 2" />,
  // A practical adoption path
  <>
    <circle cx="3.5" cy="12.5" r="1.5" />
    <circle cx="12.5" cy="3.5" r="1.5" />
    <path d="M5 12.5h3.5a2 2 0 0 0 2-2v-5" />
  </>,
]

export function BenefitIcon({ index }: { index: number }) {
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
    >
      {glyphs[index % glyphs.length]}
    </svg>
  )
}
