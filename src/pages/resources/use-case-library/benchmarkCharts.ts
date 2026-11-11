/**
 * Chart hints for each benchmark metric, by benchmark id and metric index.
 * The numbers repeat the copy's metric strings (which are identical in en and
 * zh); `resources.test.tsx` checks they never drift apart.
 */
export type MetricChart =
  /** A share of 100%, drawn as a progress bar. */
  | { kind: 'percent'; value: number }
  /** "N× lower": baseline vs Panofy bars, Panofy at 1/N. */
  | { kind: 'ratio'; value: number }
  /** Absolute token counts: baseline vs Panofy bars with the numbers. */
  | { kind: 'tokens'; panofy: number; baseline: number }
  /** Test cases passed, one cell per case. */
  | { kind: 'pass'; passed: number; total: number }
  | null

export const benchmarkCharts: Record<string, MetricChart[]> = {
  'drug-development-agent': [
    { kind: 'percent', value: 82.5 },
    null,
    null,
    { kind: 'tokens', panofy: 35441, baseline: 431040 },
  ],
  'enterprise-bi-agent': [
    { kind: 'percent', value: 100 },
    { kind: 'pass', passed: 5, total: 5 },
    null,
    { kind: 'tokens', panofy: 1691562, baseline: 26945119 },
  ],
  'contract-review-agent': [
    { kind: 'percent', value: 91.4 },
    { kind: 'percent', value: 86.7 },
    { kind: 'ratio', value: 8.4 },
  ],
  'supply-chain-exception-agent': [
    { kind: 'percent', value: 93.2 },
    { kind: 'percent', value: 84.0 },
    { kind: 'ratio', value: 9.2 },
  ],
  'patient-access-agent': [
    { kind: 'percent', value: 94.0 },
    { kind: 'percent', value: 90.7 },
    { kind: 'ratio', value: 6.4 },
  ],
  'restaurant-profit-agent': [
    { kind: 'percent', value: 88.9 },
    { kind: 'percent', value: 86.1 },
    { kind: 'ratio', value: 7.8 },
  ],
  'auto-dealership-inventory-agent': [
    { kind: 'percent', value: 81.0 },
    { kind: 'percent', value: 85.0 },
    { kind: 'ratio', value: 5.9 },
  ],
  'travel-booking-agent': [
    { kind: 'percent', value: 88.0 },
    { kind: 'percent', value: 91.0 },
    { kind: 'ratio', value: 7.1 },
  ],
}
