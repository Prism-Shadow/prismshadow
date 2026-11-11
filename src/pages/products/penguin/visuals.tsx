import type { CSSProperties } from 'react'
import { PixelField, type PixelLit } from '../../../components/site/ui'
import { cx } from '../../../components/site/utils'
import type { Locale } from '../../../i18n/locales'
import type { PenguinHarnessCopy } from '../../../i18n/messages/products/penguinHarness'
import { MockWindow } from '../shared/Blocks'
import {
  CubeIcon,
  DatabaseIcon,
  LoopIcon,
  MonitorIcon,
  SnapshotIcon,
  TerminalIcon,
} from '../shared/icons'
import {
  benchmarkSuites,
  costMultiple,
  formatPct,
  formatUsd,
  supportedModels,
  type BenchRow,
} from './data'

type HowVisuals = PenguinHarnessCopy['how']['visuals']

/* ------------------------------------------------------------------ */
/* Hero: the genuine Web UI building an app from one sentence          */
/* ------------------------------------------------------------------ */

export function HeroShot({ locale, label, alt }: { locale: Locale; label: string; alt: string }) {
  return (
    <MockWindow label={label} meta="http://127.0.0.1:7364" className="pg-penguin__hero-shot">
      <img
        className="pg-penguin__hero-img"
        src={`/products/penguin-harness/chat-${locale}.webp`}
        alt={alt}
        width={1920}
        height={1200}
        fetchPriority="high"
        decoding="async"
      />
    </MockWindow>
  )
}

/* ------------------------------------------------------------------ */
/* LangChain 1× vs PenguinHarness 100×: one lit cell vs a hundred      */
/* ------------------------------------------------------------------ */

const COMPARE_COLS = 20
const COMPARE_ROWS = 5
const hundredCells: PixelLit[] = Array.from({ length: COMPARE_COLS * COMPARE_ROWS }, (_, i) => ({
  c: i % COMPARE_COLS,
  r: Math.floor(i / COMPARE_COLS),
  tone: 'accent',
}))
const oneCell: PixelLit[] = [{ c: 0, r: 0, tone: 'text' }]

export function CompareVisual({ sides }: { sides: PenguinHarnessCopy['compare']['sides'] }) {
  return (
    <ul className="pg-penguin__compare">
      {sides.map((side, index) => {
        const ours = index === 1
        return (
          <li key={side.name} className={cx('ds-panel', 'pg-penguin__side', ours && 'pg-penguin__side--ours')}>
            <div className="pg-penguin__side-head">
              <h3 className="pg-penguin__side-name">{side.name}</h3>
              <span className="pg-product__mono">{side.mode}</span>
            </div>
            <p className="pg-penguin__side-speed">{side.speed}</p>
            <PixelField
              className="pg-penguin__side-field"
              cols={COMPARE_COLS}
              rows={COMPARE_ROWS}
              cell={14}
              gap={6}
              lit={ours ? hundredCells : oneCell}
            />
            <p className="pg-penguin__side-note">{side.note}</p>
          </li>
        )
      })}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* Tab visuals                                                         */
/* ------------------------------------------------------------------ */

export function BuildVisual({ locale, copy }: { locale: Locale; copy: HowVisuals['build'] }) {
  return (
    <MockWindow label={copy.promptLabel} meta={copy.cost} className="pg-penguin__build">
      <p className="pg-penguin__prompt">
        <span className="pg-penguin__prompt-caret" aria-hidden="true">
          ›
        </span>
        {copy.prompt}
      </p>
      <div className="pg-penguin__build-shot">
        <img
          src={`/products/penguin-harness/rag-app-${locale}.webp`}
          alt={copy.imageAlt}
          width={1920}
          height={1140}
          loading="lazy"
          decoding="async"
        />
      </div>
    </MockWindow>
  )
}

// Execution timeline lanes, shaped after the product's Trace view.
const traceLanes: { kind: number; from: number; to: number }[][] = [
  [
    { kind: 0, from: 0, to: 6 },
    { kind: 1, from: 6, to: 7.2 },
    { kind: 2, from: 7.2, to: 9.2 },
    { kind: 0, from: 13, to: 21 },
    { kind: 1, from: 21, to: 22.6 },
    { kind: 2, from: 22.6, to: 35 },
    { kind: 1, from: 91.5, to: 100 },
  ],
  [
    { kind: 3, from: 9.4, to: 10.4 },
    { kind: 4, from: 10.4, to: 11.4 },
    { kind: 3, from: 35, to: 37 },
    { kind: 4, from: 37, to: 89.5 },
  ],
]

export function EvaluateVisual({ copy }: { copy: HowVisuals['evaluate'] }) {
  return (
    <MockWindow label={copy.title} meta="Sec A – Sec E" className="pg-penguin__eval">
      <div className="pg-penguin__eval-body">
        <p className="pg-product__mono">{copy.suitesLabel}</p>
        <ul className="pg-penguin__suites">
          {copy.suites.map((suite) => (
            <li key={suite.id} className="pg-penguin__suite-row">
              <span className="pg-penguin__suite-id">{suite.id}</span>
              <span className="pg-penguin__suite-name">{suite.name}</span>
              <span className="pg-penguin__suite-cells" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="pg-penguin__suite-cell" />
                ))}
              </span>
              <span className="pg-penguin__suite-tasks">{copy.tasks}</span>
            </li>
          ))}
        </ul>
        <div className="pg-penguin__trace">
          <p className="pg-product__mono">{copy.traceLabel}</p>
          <div className="pg-penguin__lanes" aria-hidden="true">
            {traceLanes.map((lane, laneIndex) => (
              <div key={laneIndex} className="pg-penguin__lane">
                <span className="pg-penguin__lane-name">{copy.lanes[laneIndex]}</span>
                <span className="pg-penguin__lane-track">
                  {lane.map((seg, i) => (
                    <span
                      key={i}
                      className={`pg-penguin__seg pg-penguin__seg--${seg.kind}`}
                      style={{ left: `${seg.from}%`, width: `${seg.to - seg.from}%` }}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
          <ul className="pg-penguin__legend">
            {copy.legend.map((item, kind) => (
              <li key={item}>
                <span className={`pg-penguin__swatch pg-penguin__seg--${kind}`} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockWindow>
  )
}

const LoopArrow = ({ dir }: { dir: 'right' | 'down' | 'left' | 'up' }) => (
  <span className={`pg-penguin__arrow pg-penguin__arrow--${dir}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M2 12h19M16 7l5 5-5 5" />
    </svg>
  </span>
)

export function EvolveVisual({ copy }: { copy: HowVisuals['evolve'] }) {
  const [optimizer, evaluators, traces, agent] = copy.nodes
  return (
    <MockWindow label="self-evolution" meta="vN → vN+1" texture="dots" ariaLabel={copy.ariaLabel}>
      <div className="pg-penguin__loop">
        <div className="pg-penguin__node pg-penguin__node--a">
          <span className="pg-penguin__node-label">{optimizer.label}</span>
          <span className="pg-penguin__node-body">{optimizer.body}</span>
          <span className="pg-penguin__glyphs" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className={cx('pg-penguin__diamond', i > 0 && 'is-dim')} />
            ))}
          </span>
        </div>
        <LoopArrow dir="right" />
        <div className="pg-penguin__node pg-penguin__node--b">
          <span className="pg-penguin__node-label">{evaluators.label}</span>
          <span className="pg-penguin__node-body">{evaluators.body}</span>
          <span className="pg-penguin__glyphs" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className={cx('pg-penguin__hex', i < 5 && 'is-lit')} />
            ))}
          </span>
        </div>
        <LoopArrow dir="up" />
        <div className="pg-penguin__loop-center" aria-hidden="true">
          <LoopIcon />
          <span>{copy.loop}</span>
        </div>
        <LoopArrow dir="down" />
        <div className="pg-penguin__node pg-penguin__node--d">
          <span className="pg-penguin__node-label">{agent.label}</span>
          <span className="pg-penguin__node-body">{agent.body}</span>
          <span className="pg-penguin__versions" aria-hidden="true">
            <span className="pg-penguin__version">vN</span>
            <span className="pg-penguin__version-rule" />
            <span className="pg-penguin__version is-new">vN+1</span>
            <span className="pg-penguin__snapshot">
              <SnapshotIcon />
              {copy.snapshot}
            </span>
          </span>
        </div>
        <LoopArrow dir="left" />
        <div className="pg-penguin__node pg-penguin__node--c">
          <span className="pg-penguin__node-label">{traces.label}</span>
          <span className="pg-penguin__node-body">{traces.body}</span>
          <svg className="pg-penguin__spark" viewBox="0 0 120 32" aria-hidden="true" focusable="false">
            <path d="M2 28 L20 25 L36 26 L52 19 L68 20 L84 12 L100 10 L118 4" />
            <circle cx="118" cy="4" r="3" />
          </svg>
        </div>
      </div>
    </MockWindow>
  )
}

export function DeployVisual({ copy }: { copy: HowVisuals['deploy'] }) {
  const icons = [<MonitorIcon key="d" />, <TerminalIcon key="c" />, <CubeIcon key="k" />]
  return (
    <MockWindow label="~/.penguin/data" meta="0.0.0.0:7364" texture="cells" ariaLabel={copy.ariaLabel}>
      <div className="pg-penguin__deploy">
        <ul className="pg-penguin__entries">
          {copy.entries.map((entry, i) => (
            <li key={entry.label} className="pg-penguin__entry">
              <span className="pg-penguin__entry-icon">{icons[i]}</span>
              <span className="pg-penguin__entry-label">{entry.label}</span>
              <span className="pg-product__mono">{entry.meta}</span>
            </li>
          ))}
        </ul>
        <svg className="pg-penguin__bus" viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M50 0 C50 40 150 24 150 64" />
          <path d="M150 0 V64" />
          <path d="M250 0 C250 40 150 24 150 64" />
        </svg>
        <div className="pg-penguin__root">
          <DatabaseIcon />
          <span className="pg-penguin__root-path">~/.penguin/data</span>
          <span className="pg-product__mono">{copy.rootLabel}</span>
        </div>
        <p className="pg-penguin__platforms pg-product__mono">{copy.platforms}</p>
      </div>
    </MockWindow>
  )
}

/* ------------------------------------------------------------------ */
/* Benchmark chart: accuracy and cost per suite, code-built            */
/* ------------------------------------------------------------------ */

type BenchCopy = PenguinHarnessCopy['benchmark']

function BarRows({
  rows,
  value,
  format,
  ours,
  multiples,
  scaleMax,
}: {
  rows: BenchRow[]
  value: (row: BenchRow) => number
  format: (n: number) => string
  ours: BenchRow
  multiples?: boolean
  /** Axis maximum; defaults to the largest value. */
  scaleMax?: number
}) {
  const max = scaleMax ?? Math.max(...rows.map(value))
  return (
    <ul className={cx('pg-penguin__bars', multiples && 'pg-penguin__bars--tagged')}>
      {rows.map((row) => {
        const share = value(row) / max
        return (
          <li key={row.harness} className={cx('pg-penguin__bar-row', row.ours && 'is-ours')}>
            <span className="pg-penguin__bar-name">{row.harness}</span>
            <span className="pg-penguin__bar-track">
              <span className="pg-penguin__bar" style={{ '--w': share } as CSSProperties} />
              <span className="pg-penguin__bar-value">{format(value(row))}</span>
              {multiples && !row.ours ? (
                <span className="ds-tag ds-tag--neutral pg-penguin__bar-tag">
                  {costMultiple(row, ours)}×
                </span>
              ) : null}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function BenchmarkChart({ copy }: { copy: BenchCopy }) {
  return (
    <div className="pg-penguin__bench">
      <div className="ds-panel pg-penguin__bench-panel">
        {benchmarkSuites.map((suite, i) => {
          const t = copy.suites[i]
          const ours = suite.rows.find((row) => row.ours) ?? suite.rows[0]
          return (
            <figure key={suite.id} className="pg-penguin__bsuite">
              <figcaption className="pg-penguin__bsuite-head">
                <h3 className="ds-h3">{t.title}</h3>
                <span className="pg-product__mono">{t.meta}</span>
              </figcaption>
              <div className="pg-penguin__metric">
                <p className="pg-penguin__metric-head">
                  <span>{copy.accuracy}</span>
                  <span className="pg-product__mono">{copy.higher}</span>
                </p>
                <BarRows
                  rows={suite.rows}
                  value={(r) => r.accuracyPct}
                  format={formatPct}
                  ours={ours}
                  scaleMax={100}
                />
              </div>
              <div className="pg-penguin__metric">
                <p className="pg-penguin__metric-head">
                  <span>{copy.cost}</span>
                  <span className="pg-product__mono">{copy.lower}</span>
                </p>
                <BarRows
                  rows={suite.rows}
                  value={(r) => r.costUsd}
                  format={formatUsd}
                  ours={ours}
                  multiples
                />
              </div>
              <p className="pg-penguin__bsuite-summary">{t.summary}</p>
            </figure>
          )
        })}
      </div>
      <div className="pg-penguin__bench-notes">
        <p>{copy.multipleNote}</p>
        <p>{copy.footnote}</p>
      </div>
      <div className="ds-sr-only">
        <table>
          <caption>{copy.tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.colHarness}</th>
              <th scope="col">{copy.colModel}</th>
              {copy.suites.map((s) => (
                <th scope="col" key={`${s.title}-a`}>
                  {s.title} · {copy.accuracy}
                </th>
              ))}
              {copy.suites.map((s) => (
                <th scope="col" key={`${s.title}-c`}>
                  {s.title} · {copy.cost}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {benchmarkSuites[0].rows.map((row, r) => (
              <tr key={row.harness}>
                <th scope="row">{row.harness}</th>
                <td>{row.model}</td>
                {benchmarkSuites.map((suite) => (
                  <td key={`${suite.id}-a`}>{formatPct(suite.rows[r].accuracyPct)}</td>
                ))}
                {benchmarkSuites.map((suite) => (
                  <td key={`${suite.id}-c`}>{formatUsd(suite.rows[r].costUsd)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* In the box: plugins and models                                      */
/* ------------------------------------------------------------------ */

export function PluginList({ title, plugins }: { title: string; plugins: PenguinHarnessCopy['inTheBox']['plugins'] }) {
  return (
    <div className="pg-penguin__box">
      <h3 className="pg-product__subhead">{title}</h3>
      <dl className="pg-penguin__plugins">
        {plugins.map((group) => (
          <div key={group.category} className="pg-penguin__plugin-row">
            <dt>{group.category}</dt>
            <dd>
              <ul className="pg-penguin__plugin-names">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function ModelTable({ copy }: { copy: PenguinHarnessCopy['inTheBox'] }) {
  return (
    <div className="pg-penguin__box">
      <h3 className="pg-product__subhead" id="models-table-title">
        {copy.modelsTitle}
      </h3>
      <table className="pg-penguin__models" aria-labelledby="models-table-title">
        <thead className="ds-sr-only">
          <tr>
            <th scope="col">{copy.colModel}</th>
            <th scope="col">{copy.colProviders}</th>
          </tr>
        </thead>
        <tbody>
          {supportedModels.map((row) => (
            <tr key={row.model}>
              <th scope="row">{row.model}</th>
              <td>{row.providers.join(' · ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pg-penguin__models-note">{copy.modelsNote}</p>
    </div>
  )
}
