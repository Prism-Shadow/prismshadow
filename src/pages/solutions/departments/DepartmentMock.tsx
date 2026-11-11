import type { CSSProperties, ReactNode } from 'react'
import { DiamondIcon } from '../../../components/site/icons'
import { cx } from '../../../components/site/utils'
import { departmentVisuals, type DepartmentTone, type DepartmentVisual } from '../../../content/departments'
import type { Locale } from '../../../i18n'
import { departmentsPageCopy, type DepartmentMockItemCopy } from '../../../i18n/messages/departments'
import type { DepartmentId } from '../../../i18n/messages/shared'

/**
 * A flat dark UI mock of each department's day-to-day work surface: a ticket
 * queue for support, a pipeline for sales, and so on. Illustrative only, so it
 * is exposed as a single image with a descriptive label.
 *
 * Motion (CSS only, see the Motion section of departments.css): when the mock
 * comes into view it fades in and plays one "live" moment, then holds; the
 * focal row's status mark breathes. The markup is always the final state.
 */
export function DepartmentMock({
  id,
  locale,
  className,
}: {
  id: DepartmentId
  locale: Locale
  className?: string
}) {
  const t = departmentsPageCopy[locale]
  const s = t.solutions[id]
  const v = departmentVisuals[id]
  const label = t.detail.mockLabel.replace('{label}', s.label).replace('{title}', s.mock.title)

  return (
    <div
      className={cx('ds-panel pg-mock', `pg-mock--${v.mock}`, className)}
      role="img"
      aria-label={label}
      data-animate="custom"
    >
      <div className="pg-mock__bar">
        <span className="pg-mock__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="pg-mock__title">{s.mock.title}</span>
        <span className="pg-mock__meta">{s.mock.meta}</span>
      </div>
      <div className="pg-mock__body">{renderBody(id, v, s.mock.items)}</div>
      <div className="pg-mock__note">
        <span className="pg-mock__agent">
          <DiamondIcon />
          {t.detail.agentLabel}
        </span>
        <span className="pg-mock__note-text">{s.mock.note}</span>
      </div>
    </div>
  )
}

function Tag({ tone, focal, children }: { tone: DepartmentTone; focal?: boolean; children: ReactNode }) {
  return (
    <span className="pg-mock__tag" data-tone={tone} data-focal={focal || undefined}>
      {children}
    </span>
  )
}

const level = (value: number) => ({ '--level': value }) as CSSProperties
/** Order of an element in its mock's intro stagger. */
const order = (i: number) => ({ '--i': i }) as CSSProperties

function renderBody(id: DepartmentId, v: DepartmentVisual, items: DepartmentMockItemCopy[]): ReactNode {
  const tone = (i: number) => v.tones[i] ?? 'neutral'
  const focal = (i: number) => i === v.focal

  switch (v.mock) {
    case 'queue':
      return (
        <ul className="pg-mock__rows">
          {items.map((item, i) => (
            <li key={item.detail} className="pg-mock__row" data-active={i === 0 || undefined}>
              <span className="pg-mock__check" />
              <span className="pg-mock__main">
                <span className="pg-mock__label">{item.label}</span>
                <span className="pg-mock__detail">{item.detail}</span>
                {i === 0 ? (
                  <span className="pg-mock__draft">
                    <i style={level(0.92)} />
                    <i style={level(0.78)} />
                    <i style={level(0.54)} />
                  </span>
                ) : null}
              </span>
              <Tag tone={tone(i)} focal={focal(i)}>
                {item.tag}
              </Tag>
            </li>
          ))}
        </ul>
      )

    case 'pipeline': {
      const stages = [...new Set(items.map((item) => item.detail))]
      return (
        <div className="pg-mock__lanes" style={{ '--lanes': stages.length } as CSSProperties}>
          {stages.map((stage) => (
            <div key={stage} className="pg-mock__lane">
              <span className="pg-mock__lane-head">
                {stage}
                <span>{items.filter((item) => item.detail === stage).length}</span>
              </span>
              {items.map((item, i) =>
                item.detail === stage ? (
                  <div
                    key={item.label}
                    className="pg-mock__card"
                    data-active={focal(i) || undefined}
                    style={order(i)}
                  >
                    <span className="pg-mock__label">{item.label}</span>
                    <span className="pg-mock__meter" style={level(v.levels[i] ?? 0.5)} />
                    <span className="pg-mock__detail">{item.tag}</span>
                  </div>
                ) : null,
              )}
            </div>
          ))}
        </div>
      )
    }

    case 'calendar':
      return (
        <div className="pg-mock__calendar">
          <span className="pg-mock__cal-corner" />
          {[1, 2, 3, 4].map((w) => (
            <span key={w} className="pg-mock__cal-week">
              {String(w).padStart(2, '0')}
            </span>
          ))}
          <span />
          {items.map((item, r) => (
            <div key={item.label} className="pg-mock__cal-row">
              <span className="pg-mock__main">
                <span className="pg-mock__label">{item.label}</span>
                <span className="pg-mock__detail">{item.detail}</span>
              </span>
              {(v.cells?.[r] ?? [0, 0, 0, 0]).map((on, c) => (
                <span
                  key={c}
                  className="pg-mock__cal-cell"
                  data-on={on ? true : undefined}
                  data-tone={tone(r)}
                  style={on ? order(c * items.length + r) : undefined}
                />
              ))}
              <Tag tone={tone(r)} focal={focal(r)}>
                {item.tag}
              </Tag>
            </div>
          ))}
        </div>
      )

    case 'chart':
      return (
        <div className="pg-mock__chart-wrap">
          <div className="pg-mock__chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              {/* The series draw in left to right by uncovering this mask (the stretched,
                  non-scaling strokes rule out a pathLength dash draw). Full width at rest. */}
              <defs>
                <mask id={`pg-mock-reveal-${id}`} maskUnits="userSpaceOnUse" x="-5" y="-5" width="110" height="110">
                  <rect className="pg-mock__reveal" x="-5" y="-5" width="110" height="110" fill="#fff" />
                </mask>
              </defs>
              <rect className="pg-mock__band" x="0" y="34" width="100" height="36" />
              {[25, 50, 75].map((y) => (
                <line key={y} className="pg-mock__grid" x1="0" x2="100" y1={y} y2={y} />
              ))}
              <g mask={`url(#pg-mock-reveal-${id})`}>
                <path className="pg-mock__line pg-mock__line--dim" d={chartPath(chartBase)} />
                <path className="pg-mock__line" d={chartPath(chartChurn)} />
              </g>
            </svg>
            <span className="pg-mock__spike" style={{ '--x': 1, '--y': chartChurn[chartChurn.length - 1] / 100 } as CSSProperties} />
          </div>
          <ul className="pg-mock__kpis">
            {items.map((item, i) => (
              <li key={item.label} className="pg-mock__kpi" data-tone={tone(i)}>
                <span className="pg-mock__label">{item.label}</span>
                <span className="pg-mock__detail">{item.detail}</span>
                <Tag tone={tone(i)}>{item.tag}</Tag>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'bars':
      return (
        <ul className="pg-mock__rows pg-mock__rows--bars">
          {items.map((item, i) => (
            <li key={item.label} className="pg-mock__bar-row">
              <span className="pg-mock__main">
                <span className="pg-mock__label">{item.label}</span>
                <span className="pg-mock__detail">{item.detail}</span>
              </span>
              <span className="pg-mock__track">
                <span
                  className="pg-mock__fill"
                  data-tone={tone(i)}
                  style={{ ...level(v.levels[i] ?? 0.5), ...order(i) }}
                />
              </span>
              <Tag tone={tone(i)} focal={focal(i)}>
                {item.tag}
              </Tag>
            </li>
          ))}
        </ul>
      )

    case 'document':
      return (
        <div className="pg-mock__doc">
          <span className="pg-mock__doc-lines" aria-hidden="true">
            <i style={level(0.62)} />
            <i style={level(0.94)} />
            <i style={level(0.8)} />
          </span>
          <ul className="pg-mock__clauses">
            {items.map((item, i) => (
              <li
                key={item.label}
                className="pg-mock__clause"
                data-tone={tone(i)}
                data-focal={focal(i) || undefined}
                style={order(i)}
              >
                <span className="pg-mock__main">
                  <span className="pg-mock__label">{item.label}</span>
                  <span className="pg-mock__detail">{item.detail}</span>
                </span>
                <Tag tone={tone(i)} focal={focal(i)}>
                  {item.tag}
                </Tag>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'incidents':
      return (
        <ul className="pg-mock__rows">
          {items.map((item, i) => (
            <li key={item.label} className="pg-mock__row pg-mock__row--incident" data-active={i === 0 || undefined}>
              <Tag tone={tone(i)} focal={focal(i)}>
                {item.tag}
              </Tag>
              <span className="pg-mock__main">
                <span className="pg-mock__label">{item.label}</span>
                <span className="pg-mock__detail pg-mock__detail--mono">{item.detail}</span>
              </span>
              <span className="pg-mock__deps" aria-hidden="true">
                {[0, 1, 2].map((d) => (
                  <i key={d} data-on={d <= 2 - i || undefined} style={d <= 2 - i ? order(i * 3 + d) : undefined} />
                ))}
              </span>
            </li>
          ))}
        </ul>
      )

    case 'flow':
      return (
        <ol className="pg-mock__stages">
          {items.map((item, i) => (
            <li key={item.label} className="pg-mock__stage" data-tone={tone(i)} style={order(i)}>
              <span className="pg-mock__queue" aria-hidden="true">
                {Array.from({ length: QUEUE_CELLS }, (_, k) => (
                  <i
                    key={k}
                    data-on={k < Math.round((v.levels[i] ?? 0.3) * QUEUE_CELLS) || undefined}
                    style={{ '--k': k } as CSSProperties}
                  />
                ))}
              </span>
              <span className="pg-mock__label">{item.label}</span>
              <span className="pg-mock__detail">{item.detail}</span>
              <Tag tone={tone(i)} focal={focal(i)}>
                {item.tag}
              </Tag>
            </li>
          ))}
        </ol>
      )
  }
}

/** Queue-depth cells per fulfillment stage. */
const QUEUE_CELLS = 6

/* KPI monitor series, in % of chart height from the top (0 = top). */
const chartBase = [62, 60, 61, 57, 58, 55, 56, 53, 54, 51, 52, 50]
const chartChurn = [58, 57, 59, 56, 57, 58, 55, 56, 54, 55, 47, 18]

function chartPath(points: number[]) {
  const step = 100 / (points.length - 1)
  return points.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(2)} ${y}`).join(' ')
}
