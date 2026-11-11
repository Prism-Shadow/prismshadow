import { PixelField, type PixelLit, type PixelTone } from '../../../components/site/ui'
import type {
  SecurityActionPolicyVisualCopy,
  SecurityAuditLogVisualCopy,
  SecurityDataFlowVisualCopy,
  SecurityMemoryPolicyVisualCopy,
} from '../../../i18n/messages/security'
import {
  CheckIcon,
  ChevronIcon,
  CrossIcon,
  DatabaseIcon,
  HistoryIcon,
  LayersIcon,
  PersonCheckIcon,
  SearchKeyIcon,
  ToolIcon,
} from '../icons'

/*
 * Flat UI mocks for the four control areas. Each is one image for assistive
 * tech (role="img" + a full-sentence aria-label); the copy beside it carries
 * the controls themselves.
 */

/* ---------- Data access flow ---------- */

const flowCols = 14
const allowed = new Set([0, 1, 3, 4, 6, 8, 9, 11, 12])

const flowRows: PixelLit[][] = [
  Array.from({ length: flowCols }, (_, c) => ({ c, r: 0, tone: 'cyan' as const, dim: c % 4 === 3 })),
  Array.from({ length: flowCols }, (_, c) =>
    allowed.has(c)
      ? { c, r: 0, tone: 'accent' as const }
      : { c, r: 0, tone: 'coral' as const, outline: true },
  ),
  Array.from({ length: flowCols }, (_, c) => c)
    .filter((c) => allowed.has(c))
    .map((c) => ({ c, r: 0, tone: 'accent' as const })),
]

export function DataFlowMock({ copy }: { copy: SecurityDataFlowVisualCopy }) {
  const last = copy.steps.length - 1
  return (
    <div className="ds-panel pg-sec-window pg-sec-flow" role="img" aria-label={copy.ariaLabel}>
      <div className="pg-sec-window__bar">
        <span className="pg-sec-window__title">
          <DatabaseIcon />
          {copy.title}
        </span>
        <span className="pg-sec-status">
          <span className="pg-sec-status__dot" />
          {copy.status}
        </span>
      </div>
      <ol className="pg-sec-flow__steps">
        {copy.steps.map((step, index) => (
          <li key={step} className="pg-sec-flow__step" data-final={index === last ? '' : undefined}>
            <span className="pg-sec-flow__index">{String(index + 1).padStart(2, '0')}</span>
            <span className="pg-sec-flow__name">{step}</span>
            <span className="pg-sec-flow__note">{copy.notes[index]}</span>
            <span className="pg-sec-flow__visual">
              {index < last ? (
                <PixelField cols={flowCols} rows={1} cell={12} gap={6} lit={flowRows[index] ?? []} />
              ) : (
                <span className="pg-sec-flow__done">
                  <CheckIcon />
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- Agent action policy ---------- */

const groupTones = ['green', 'amber', 'coral'] as const
const groupMarks = [CheckIcon, PersonCheckIcon, CrossIcon]

export function ActionPolicyMock({ copy }: { copy: SecurityActionPolicyVisualCopy }) {
  return (
    <div className="ds-panel pg-sec-window pg-sec-policy" role="img" aria-label={copy.ariaLabel}>
      <div className="pg-sec-window__bar">
        <span className="pg-sec-window__title">
          <ToolIcon />
          {copy.title}
        </span>
        <span className="pg-sec-chip">
          <span className="pg-sec-chip__avatar" />
          {copy.agent}
        </span>
      </div>
      <div className="pg-sec-policy__groups">
        {copy.groups.map((group, index) => {
          const Mark = groupMarks[index] ?? CheckIcon
          return (
            <div key={group.label} className="pg-sec-policy__group" data-tone={groupTones[index]}>
              <span className="pg-sec-policy__head">
                <span className="pg-sec-dot" />
                {group.label}
                <span className="pg-sec-policy__count">{group.items.length}</span>
              </span>
              <ul className="pg-sec-policy__items">
                {group.items.map((item) => (
                  <li key={item} className="pg-sec-policy__item">
                    <Mark />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="pg-sec-policy__queue" data-tone="amber">
        <PersonCheckIcon />
        <span className="pg-sec-mono">{copy.queue.label}</span>
        <span className="pg-sec-policy__queue-item">{copy.queue.item}</span>
        <span className="pg-sec-pill">
          <span className="pg-sec-dot" />
          {copy.queue.status}
        </span>
      </div>
    </div>
  )
}

/* ---------- Memory policy ---------- */

const policyTones: PixelTone[] = ['accent', 'coral', 'amber', 'text']
const memoryCols = 24
const memoryRows = 4

// Deterministic memory map: mostly retained context, a few restricted and expiring cells.
const memoryCells: PixelLit[] = Array.from({ length: memoryCols * memoryRows }, (_, i) => {
  const c = i % memoryCols
  const r = Math.floor(i / memoryCols)
  const h = (c * 7 + r * 13 + c * r) % 17
  if (h < 7) return { c, r, tone: 'accent' as const, dim: h > 4 }
  if (h === 8 || h === 15) return { c, r, tone: 'coral' as const, outline: true }
  if (h === 11) return { c, r, tone: 'amber' as const, dim: true }
  return null
}).filter((cell): cell is NonNullable<typeof cell> => cell !== null)

export function MemoryPolicyMock({ copy }: { copy: SecurityMemoryPolicyVisualCopy }) {
  return (
    <div className="ds-panel pg-sec-window pg-sec-memory" role="img" aria-label={copy.ariaLabel}>
      <div className="pg-sec-window__bar">
        <span className="pg-sec-window__title">
          <LayersIcon />
          {copy.title}
        </span>
        <span className="pg-sec-chip">{copy.subtitle}</span>
      </div>
      <div className="pg-sec-memory__store">
        <span className="pg-sec-mono">{copy.storeLabel}</span>
        <PixelField cols={memoryCols} rows={memoryRows} cell={12} gap={6} lit={memoryCells} />
      </div>
      <ul className="pg-sec-memory__rows">
        {copy.policies.map((policy, index) => (
          <li key={policy.label} className="pg-sec-memory__row" data-tone={policyTones[index]}>
            <span className="pg-sec-memory__label">{policy.label}</span>
            <span className="pg-sec-pill">
              <span className="pg-sec-dot" />
              {policy.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Audit log ---------- */

const auditTimes = ['09:41:12', '09:41:18', '09:52:03', '09:52:05', '09:52:06']

export function AuditLogMock({ copy }: { copy: SecurityAuditLogVisualCopy }) {
  return (
    <div className="ds-panel pg-sec-window pg-sec-audit" role="img" aria-label={copy.ariaLabel}>
      <div className="pg-sec-window__bar">
        <span className="pg-sec-window__title">
          <HistoryIcon />
          {copy.title}
        </span>
        <span className="pg-sec-chip">{copy.subtitle}</span>
      </div>
      <div className="pg-sec-audit__filter">
        <SearchKeyIcon />
        {copy.filter}
      </div>
      <div className="pg-sec-audit__table">
        <div className="pg-sec-audit__row pg-sec-audit__row--head">
          <span />
          {copy.columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>
        {copy.rows.map((row, index) => (
          <div
            key={row.event}
            className="pg-sec-audit__row"
            data-tone={index === 2 ? 'amber' : 'accent'}
          >
            <ChevronIcon />
            <span className="pg-sec-audit__time">{auditTimes[index] ?? auditTimes[0]}</span>
            <span className="pg-sec-audit__event">{row.event}</span>
            <span className="pg-sec-audit__actor">
              <span className="pg-sec-chip__avatar" />
              {row.actor}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
