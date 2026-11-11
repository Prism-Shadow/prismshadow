import type { CSSProperties } from 'react'
import { PixelField, type PixelLit } from '../../../components/site/ui'
import { cx } from '../../../components/site/utils'
import type { PanofyCopy } from '../../../i18n/messages/products/panofy'
import { MockWindow } from '../shared/Blocks'
import {
  ArrowSlimIcon,
  BookIcon,
  CheckIcon,
  FileIcon,
  HandoffIcon,
  LinkIcon,
  ShieldIcon,
} from '../shared/icons'

const PANOFY_MARK = '/products/panofy-logo-light.png'

// A memory strip: a few cells lit as the agent learns.
const memoryLit: PixelLit[] = [
  { c: 0, r: 0 },
  { c: 1, r: 0, dim: true },
  { c: 3, r: 0 },
  { c: 4, r: 1, dim: true },
  { c: 6, r: 0 },
  { c: 7, r: 1 },
  { c: 9, r: 0, dim: true },
  { c: 10, r: 1 },
  { c: 12, r: 0 },
  { c: 13, r: 0, dim: true },
  { c: 15, r: 1 },
]

/* ------------------------------------------------------------------ */
/* Hero: training workspace                                            */
/* ------------------------------------------------------------------ */

/**
 * Three wires fanning between a column of three rows and a centred node, each with
 * a signal overlay that travels along it under motion (sources in, outputs out).
 */
const Wires = ({ reverse = false }: { reverse?: boolean }) => {
  const paths = [16.667, 50, 83.333].map((y) =>
    reverse ? `M0 50 C55 50 45 ${y} 100 ${y}` : `M0 ${y} C55 ${y} 45 50 100 50`,
  )
  return (
    <svg
      className={cx('pg-panofy__wires', reverse ? 'pg-panofy__wires--out' : 'pg-panofy__wires--in')}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
      {paths.map((d, k) => (
        <path
          key={`s-${d}`}
          className="pg-panofy__signal"
          d={d}
          pathLength={1}
          style={{ '--k': k } as CSSProperties}
        />
      ))}
    </svg>
  )
}

export function Workbench({ copy }: { copy: PanofyCopy['workbench'] }) {
  return (
    <MockWindow label={copy.topLabel} meta={copy.brand} texture="dots" ariaLabel={copy.ariaLabel}>
      <div className="pg-panofy__bench">
        <div className="pg-panofy__bench-grid">
          <ul className="pg-panofy__col pg-panofy__col--in">
            {copy.sources.map((source) => (
              <li key={source} className="pg-panofy__tile pg-panofy__tile--in">
                <FileIcon />
                <span>{source}</span>
              </li>
            ))}
          </ul>
          <Wires />
          <div className="pg-panofy__core">
            <img className="pg-panofy__core-mark" src={PANOFY_MARK} alt="" width={48} height={48} />
            <span className="pg-product__mono">{copy.coreLabel}</span>
            <span className="pg-panofy__core-title">{copy.coreTitle}</span>
            <PixelField className="pg-panofy__core-field" cols={16} rows={2} cell={10} gap={4} lit={memoryLit} />
          </div>
          <Wires reverse />
          <ul className="pg-panofy__col pg-panofy__col--out">
            {copy.outputs.map((output, k) => (
              <li
                key={output}
                className="pg-panofy__tile pg-panofy__tile--out"
                style={{ '--k': k } as CSSProperties}
              >
                <span>{output}</span>
                <ArrowSlimIcon />
              </li>
            ))}
          </ul>
        </div>
        <ul className="pg-panofy__status">
          {copy.status.map((item) => (
            <li key={item}>
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </MockWindow>
  )
}

/* ------------------------------------------------------------------ */
/* Tab visuals                                                         */
/* ------------------------------------------------------------------ */

type Visuals = PanofyCopy['visuals']

export function KnowledgeVisual({ copy }: { copy: Visuals['knowledge'] }) {
  return (
    <MockWindow label={copy.coreLabel} meta="sources → context" texture="cells" ariaLabel={copy.ariaLabel}>
      <div className="pg-panofy__kmap">
        <ul className="pg-panofy__krow pg-panofy__krow--top">
          {copy.inputs.map((item, k) => (
            <li key={item} className="pg-panofy__ktile" style={{ '--k': k } as CSSProperties}>
              <FileIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="pg-panofy__kcore">
          <span className="pg-product__mono">{copy.coreLabel}</span>
          <span className="pg-panofy__kcore-title">{copy.coreTitle}</span>
          <PixelField className="pg-panofy__kcore-field" cols={28} rows={2} cell={8} gap={4} lit={memoryLit} />
        </div>
        <ul className="pg-panofy__krow pg-panofy__krow--bottom">
          {copy.outputs.map((item, k) => (
            <li key={item} className="pg-panofy__ktile" style={{ '--k': k } as CSSProperties}>
              <BookIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </MockWindow>
  )
}

const feedbackTones = ['amber', 'green', 'cyan'] as const

const markAt = (left: number, width: number, k: number) =>
  ({ left: `${left}%`, width: `${width}%`, '--k': k }) as CSSProperties

export function TeachingVisual({ copy }: { copy: Visuals['teaching'] }) {
  return (
    <MockWindow label={copy.exampleLabel} meta="review" ariaLabel={copy.ariaLabel}>
      <div className="pg-panofy__teach">
        <div className="pg-panofy__sheet">
          <span className="pg-product__mono">{copy.exampleLabel}</span>
          <span className="pg-panofy__sheet-title">{copy.exampleTitle}</span>
          <p className="pg-panofy__sheet-body">{copy.exampleBody}</p>
          {/* Each highlight (--k) pairs with the feedback note of the same colour. */}
          <span className="pg-panofy__lines" aria-hidden="true">
            <span className="pg-panofy__line" style={{ width: '92%' }}>
              <span className="pg-panofy__mark pg-panofy__mark--amber" style={markAt(38, 22, 0)} />
            </span>
            <span className="pg-panofy__line" style={{ width: '78%' }} />
            <span className="pg-panofy__line" style={{ width: '86%' }}>
              <span className="pg-panofy__mark pg-panofy__mark--green" style={markAt(8, 34, 1)} />
            </span>
            <span className="pg-panofy__line" style={{ width: '64%' }}>
              <span className="pg-panofy__mark pg-panofy__mark--cyan" style={markAt(46, 30, 2)} />
            </span>
          </span>
        </div>
        <ul className="pg-panofy__feedback">
          {copy.feedback.map((item, i) => (
            <li
              key={item}
              className={cx('pg-panofy__fb', `pg-panofy__fb--${feedbackTones[i]}`)}
              style={{ '--k': i } as CSSProperties}
            >
              <span className="pg-panofy__fb-dot" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </MockWindow>
  )
}

const controlIcons = [<ShieldIcon key="p" />, <LinkIcon key="s" />, <HandoffIcon key="h" />]

export function ControlsVisual({ copy }: { copy: Visuals['controls'] }) {
  return (
    <MockWindow label={copy.header} meta="3 / 3" ariaLabel={copy.ariaLabel}>
      <ol className="pg-panofy__controls">
        {copy.rows.map((row, i) => (
          <li key={row.title} className="pg-panofy__control" style={{ '--k': i } as CSSProperties}>
            <span className="pg-panofy__control-icon">{controlIcons[i]}</span>
            <span className="pg-panofy__control-text">
              <span className="pg-panofy__control-title">{row.title}</span>
              <span className="pg-panofy__control-body">{row.body}</span>
            </span>
            <span className="pg-panofy__control-state" aria-hidden="true">
              <CheckIcon />
            </span>
          </li>
        ))}
      </ol>
    </MockWindow>
  )
}

// Hub to each role, in the order of the roles grid (top-left, top-right, bottom-left, bottom-right).
const spokes = ['M50 50 L25 25', 'M50 50 L75 25', 'M50 50 L25 75', 'M50 50 L75 75']

export function RolloutVisual({ copy }: { copy: Visuals['rollout'] }) {
  return (
    <MockWindow label="agents" meta="4 roles" texture="dots" ariaLabel={copy.ariaLabel}>
      <div className="pg-panofy__rollout">
        <svg
          className="pg-panofy__spokes"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {spokes.map((d) => (
            <path key={d} d={d} />
          ))}
          {/* Signals from the hub out to each role (motion only). */}
          {spokes.map((d, k) => (
            <path
              key={`s-${d}`}
              className="pg-panofy__signal"
              d={d}
              pathLength={1}
              style={{ '--k': k } as CSSProperties}
            />
          ))}
        </svg>
        <ul className="pg-panofy__roles">
          {copy.roles.map((role, i) => (
            <li key={role.team} className="pg-panofy__role">
              <span className="pg-product__mono">{role.team}</span>
              <span className="pg-panofy__role-agent">{role.agent}</span>
              <span className="pg-panofy__role-cells" aria-hidden="true">
                {Array.from({ length: 8 }, (_, c) => (
                  <span
                    key={c}
                    className={cx('pg-panofy__role-cell', c < 5 + (i % 3) && 'is-lit')}
                    style={{ '--i': i + c } as CSSProperties}
                  />
                ))}
              </span>
            </li>
          ))}
        </ul>
        <span className="pg-panofy__hub" aria-hidden="true">
          <img src={PANOFY_MARK} alt="" width={28} height={28} />
        </span>
      </div>
    </MockWindow>
  )
}
