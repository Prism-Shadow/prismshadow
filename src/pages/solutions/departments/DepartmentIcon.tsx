import type { ReactNode } from 'react'
import type { DepartmentId } from '../../../i18n/messages/shared'

/** 16px line icons for the eight departments (1.5px stroke, currentColor, decorative). */
const glyphs: Record<DepartmentId, ReactNode> = {
  'customer-support': (
    <>
      <path d="M2.75 10V8a5.25 5.25 0 0 1 10.5 0v2" />
      <rect x="2" y="9" width="3" height="4.25" rx="1" />
      <rect x="11" y="9" width="3" height="4.25" rx="1" />
    </>
  ),
  sales: (
    <>
      <path d="M2 12l4-4 3 3 5-6" />
      <path d="M10.5 5H14v3.5" />
    </>
  ),
  marketing: (
    <>
      <path d="M2.5 6.25v3.5h2.25L9.5 12.5v-9L4.75 6.25H2.5z" />
      <path d="M12 6a2.6 2.6 0 0 1 0 4" />
    </>
  ),
  data: (
    <>
      <path d="M2 13.5h12" />
      <path d="M4 11V8M8 11V3.5M12 11V6" />
    </>
  ),
  hr: (
    <>
      <circle cx="6" cy="5.5" r="2.25" />
      <path d="M2 13.25c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <path d="M10.5 3.5a2.25 2.25 0 0 1 0 4.1M11.75 9.5c1.35.6 2.25 2 2.25 3.75" />
    </>
  ),
  legal: (
    <>
      <path d="M8 2.5v11M5 13.5h6M3 4.5h10" />
      <path d="M1.5 9L3 4.75 4.5 9a1.5 1.5 0 0 1-3 0zM11.5 9L13 4.75 14.5 9a1.5 1.5 0 0 1-3 0z" />
    </>
  ),
  engineering: <path d="M5.25 4.5L1.75 8l3.5 3.5M10.75 4.5L14.25 8l-3.5 3.5M9.25 3l-2.5 10" />,
  operations: (
    <>
      <rect x="1.75" y="2.75" width="4.5" height="3.5" rx="1" />
      <rect x="9.75" y="9.75" width="4.5" height="3.5" rx="1" />
      <path d="M6.25 4.5h3.5a1.5 1.5 0 0 1 1.5 1.5v3.75" />
    </>
  ),
}

export function DepartmentIcon({ id }: { id: DepartmentId }) {
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
      {glyphs[id]}
    </svg>
  )
}
