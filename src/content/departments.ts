import type { DepartmentId } from '../i18n/messages/shared'

/**
 * Visual configuration for the department pages. Copy lives in
 * `src/i18n/messages/departments.ts`; this file only holds the locale-free
 * numbers and switches the code-built visuals need.
 */

/** Which flat UI mock stands in for each department's day-to-day work surface. */
export type DepartmentMockKind =
  | 'queue'
  | 'pipeline'
  | 'calendar'
  | 'chart'
  | 'bars'
  | 'document'
  | 'incidents'
  | 'flow'

/** Status colour of a mock row. Spectrum colours are small highlights only. */
export type DepartmentTone = 'accent' | 'green' | 'amber' | 'coral' | 'neutral'

export type DepartmentVisual = {
  mock: DepartmentMockKind
  /** Tone of each mock row's status tag, in the same order as the copy's `mock.items`. */
  tones: DepartmentTone[]
  /** Visual-only magnitudes (0–1) per row: score, risk, queue depth. */
  levels: number[]
  /** Calendar only: scheduled weeks per row (1 = a planned piece). */
  cells?: number[][]
}

export const departmentVisuals: Record<DepartmentId, DepartmentVisual> = {
  'customer-support': {
    mock: 'queue',
    tones: ['accent', 'accent', 'amber', 'green'],
    levels: [1, 1, 1, 1],
  },
  sales: {
    mock: 'pipeline',
    tones: ['neutral', 'neutral', 'neutral', 'neutral', 'accent', 'neutral'],
    levels: [0.38, 0.3, 0.62, 0.56, 0.9, 0.7],
  },
  marketing: {
    mock: 'calendar',
    tones: ['green', 'green', 'amber', 'green'],
    levels: [1, 1, 1, 1],
    cells: [
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [1, 1, 0, 1],
      [0, 0, 1, 0],
    ],
  },
  data: {
    mock: 'chart',
    tones: ['neutral', 'neutral', 'coral', 'neutral'],
    levels: [1, 1, 1, 1],
  },
  hr: {
    mock: 'bars',
    tones: ['coral', 'amber', 'green', 'amber'],
    levels: [0.84, 0.56, 0.22, 0.48],
  },
  legal: {
    mock: 'document',
    tones: ['green', 'coral', 'amber', 'amber'],
    levels: [1, 1, 1, 1],
  },
  engineering: {
    mock: 'incidents',
    tones: ['coral', 'amber', 'amber', 'neutral'],
    levels: [1, 1, 1, 1],
  },
  operations: {
    mock: 'flow',
    tones: ['green', 'amber', 'green', 'green'],
    levels: [0.22, 0.92, 0.34, 0.28],
  },
}
