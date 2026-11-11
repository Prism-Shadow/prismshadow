import { useId, useRef, type CSSProperties } from 'react'
import { useCycle, useInView, useReducedMotion } from '../../../components/site/motion'
import { cx } from '../../../components/site/utils'
import type { LlamaFactoryCopy } from '../../../i18n/messages/products/llamaFactory'
import { MockWindow } from '../shared/Blocks'
import { Terminal } from '../shared/Terminal'
import { boardYaml, memory7b, pickerModels, quickstart, tuningMethods } from './data'

/* ------------------------------------------------------------------ */
/* Illustrative loss curves (deterministic, so SSR and client match)   */
/* ------------------------------------------------------------------ */

const W = 600
const H = 200

function lossPath(seed: number, offset: number, points = 64) {
  let s = seed >>> 0
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  const coords: string[] = []
  for (let i = 0; i < points; i += 1) {
    const t = i / (points - 1)
    const loss = offset + 0.62 * Math.exp(-t / 0.22) + (rand() - 0.5) * 0.045 * (1 - t * 0.6)
    const x = 8 + t * (W - 16)
    const y = 12 + (1 - loss) * (H - 24)
    coords.push(`${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return coords
}

const trainCurve = lossPath(11, 0.22)
const evalCurve = lossPath(29, 0.27, 16)
const toLine = (coords: string[]) => `M${coords.join(' L')}`
const toArea = (coords: string[]) => `${toLine(coords)} L${W - 8} ${H - 4} L8 ${H - 4} Z`

// The latest training step, as a position inside the plot (for the live marker).
const [lastX, lastY] = trainCurve[trainCurve.length - 1].split(' ').map(Number)
const lastPoint = { left: `${(lastX / W) * 100}%`, top: `${(lastY / H) * 100}%` }

/**
 * Loss chart. Under motion the curves are revealed left to right by a clip
 * (dashes would be mis-measured on these non-scaling strokes), and with `live`
 * the latest step carries a marker that pings slowly.
 */
function LossChart({
  showEval = false,
  live = false,
  lossLabel,
  stepLabel,
}: {
  showEval?: boolean
  live?: boolean
  lossLabel: string
  stepLabel: string
}) {
  const clipId = `lf-loss-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <div className="pg-llama__chart">
      <span className="pg-product__mono pg-llama__chart-y">{lossLabel}</span>
      <div className="pg-llama__plot">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId}>
              <rect className="pg-llama__wipe" x="0" y="0" width={W} height={H} />
            </clipPath>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} className="pg-llama__grid" x1="0" x2={W} y1={H * f} y2={H * f} />
          ))}
          <line className="pg-llama__axis" x1="0" x2={W} y1={H - 4} y2={H - 4} />
          <g clipPath={`url(#${clipId})`}>
            <path className="pg-llama__area" d={toArea(trainCurve)} />
            <path className="pg-llama__curve" d={toLine(trainCurve)} />
            {showEval ? <path className="pg-llama__curve pg-llama__curve--eval" d={toLine(evalCurve)} /> : null}
          </g>
        </svg>
        {live ? <span className="pg-llama__live" style={lastPoint} aria-hidden="true" /> : null}
      </div>
      <span className="pg-product__mono pg-llama__chart-x">{stepLabel}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero: LLaMA Board, the zero-code web UI                             */
/* ------------------------------------------------------------------ */

export function LlamaBoard({ copy }: { copy: LlamaFactoryCopy['hero']['board'] }) {
  return (
    <MockWindow label={copy.title} meta={quickstart.webui} ariaLabel={copy.ariaLabel}>
      <div className="pg-llama__board">
        <div className="pg-llama__board-tabs">
          {copy.tabs.map((tab, i) => (
            <span key={tab} className={cx('pg-llama__board-tab', i === 0 && 'is-active')}>
              {tab}
            </span>
          ))}
        </div>
        <dl className="pg-llama__fields">
          {copy.fields.map((field) => (
            <div key={field.label} className="pg-llama__field">
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
        <div className="pg-llama__board-main">
          <div className="pg-llama__board-chart">
            <span className="pg-llama__panel-title">{copy.lossLabel}</span>
            <LossChart live lossLabel="loss" stepLabel={copy.stepLabel} />
          </div>
          <div className="pg-llama__board-side">
            <span className="pg-llama__panel-title">{copy.commandLabel}</span>
            <code className="pg-llama__command">
              <span aria-hidden="true">$ </span>
              {quickstart.train}
            </code>
            <dl className="pg-llama__yaml">
              {boardYaml.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <span className="pg-llama__progress" aria-hidden="true">
              <span style={{ width: '62%' }} />
            </span>
            <span className="pg-llama__start">{copy.start}</span>
          </div>
        </div>
      </div>
    </MockWindow>
  )
}

/* ------------------------------------------------------------------ */
/* Workflow tab visuals                                                */
/* ------------------------------------------------------------------ */

type Workflow = LlamaFactoryCopy['workflow']
type Step = Workflow['steps'][number]

const stackWindow = (workflow: Workflow, step: Step) => ({
  label: `${workflow.stackLabel} · ${step.label}`,
  meta: step.stack,
})

/**
 * Model picker. While on screen (and motion is allowed) the selection steps
 * through the models every few seconds; the server, no-JS and reduced-motion
 * render keeps the first model selected.
 */
export function ModelVisual({ workflow, step }: { workflow: Workflow; step: Step }) {
  const v = workflow.visuals.model
  const listRef = useRef<HTMLUListElement>(null)
  const inView = useInView(listRef, 0.5)
  const reduced = useReducedMotion()
  const selected = useCycle(pickerModels.length, 3200, inView && !reduced)
  return (
    <MockWindow {...stackWindow(workflow, step)}>
      <ul className="pg-llama__picker" ref={listRef}>
        {pickerModels.map((model, i) => (
          <li key={model.name} className={cx('pg-llama__pick', i === selected && 'is-selected')}>
            <span className="pg-llama__pick-head">
              <span className="pg-llama__pick-name">{model.name}</span>
              <span className="ds-tag pg-llama__pick-tag" aria-hidden={i === selected ? undefined : true}>
                {v.selected}
              </span>
              <span className="pg-llama__pick-template">{model.template}</span>
            </span>
            <span className="pg-llama__pick-sizes">{model.sizes}</span>
          </li>
        ))}
      </ul>
    </MockWindow>
  )
}

const datasetRows = [
  [0.82, 0.3, 0.9],
  [0.64, 0, 0.72],
  [0.9, 0.46, 0.58],
  [0.56, 0.22, 0.84],
  [0.74, 0, 0.66],
]

export function DatasetVisual({ workflow, step }: { workflow: Workflow; step: Step }) {
  const v = workflow.visuals.dataset
  return (
    <MockWindow {...stackWindow(workflow, step)}>
      <div className="pg-llama__dataset">
        <p className="pg-llama__dataset-file">
          <span className="pg-product__mono">dataset_info.json</span>
          <code>dataset: identity, alpaca_en_demo</code>
        </p>
        <div className="pg-llama__table" aria-hidden="true">
          <div className="pg-llama__tr pg-llama__tr--head">
            {v.columns.map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>
          {datasetRows.map((row, r) => (
            <div key={r} className="pg-llama__tr">
              {row.map((w, c) => (
                <span key={c}>
                  {w > 0 ? (
                    <span
                      className="pg-llama__skel"
                      style={{ width: `${w * 100}%`, '--i': r + c } as CSSProperties}
                    />
                  ) : null}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="pg-product__mono pg-llama__dataset-sources">{v.sources}</p>
      </div>
    </MockWindow>
  )
}

export function MethodVisual({ workflow, step }: { workflow: Workflow; step: Step }) {
  const v = workflow.visuals.method
  const max = Math.max(...memory7b.map((row) => row.gb))
  return (
    <MockWindow {...stackWindow(workflow, step)}>
      <figure className="pg-llama__memory">
        <figcaption className="pg-llama__panel-title">{v.title}</figcaption>
        <ul className="pg-llama__mem-rows">
          {memory7b.map((row, r) => (
            <li
              key={`${row.method}-${row.bits}`}
              className={cx('pg-llama__mem-row', row.gb <= 16 && 'is-efficient')}
              style={{ '--r': r } as CSSProperties}
            >
              <span className="pg-llama__mem-name">
                {row.method}
                <span className="pg-product__mono">{row.bits}-bit</span>
              </span>
              <span className="pg-llama__mem-track">
                <span className="pg-llama__mem-bar" style={{ '--w': row.gb / max } as CSSProperties} />
                <span className="pg-llama__mem-value">
                  {row.gb} {v.unit}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="pg-product__mono">{v.note}</p>
      </figure>
    </MockWindow>
  )
}

export function EvaluationVisual({ workflow, step }: { workflow: Workflow; step: Step }) {
  const v = workflow.visuals.evaluation
  return (
    <MockWindow {...stackWindow(workflow, step)}>
      <div className="pg-llama__eval">
        <ul className="pg-llama__legend">
          <li>
            <span className="pg-llama__key" aria-hidden="true" />
            {v.trainLabel}
          </li>
          <li>
            <span className="pg-llama__key pg-llama__key--eval" aria-hidden="true" />
            {v.evalLabel}
          </li>
        </ul>
        <LossChart showEval lossLabel={v.lossLabel} stepLabel="step" />
        <p className="pg-product__mono pg-llama__eval-monitors">{v.monitors}</p>
      </div>
    </MockWindow>
  )
}

export function ExportVisual({
  workflow,
  step,
  copyLabel,
  copiedLabel,
}: {
  workflow: Workflow
  step: Step
  copyLabel: string
  copiedLabel: string
}) {
  const v = workflow.visuals.export
  return (
    <Terminal
      idBase="lf-export"
      className="pg-llama__export"
      reveal={false}
      label={`${workflow.stackLabel} · ${step.label} — ${step.stack}`}
      copyLabel={copyLabel}
      copiedLabel={copiedLabel}
      tabs={[
        {
          id: 'export',
          label: step.label,
          lines: [
            { cmd: quickstart.export, comment: v.comments.merge },
            { cmd: quickstart.serve, comment: v.comments.serve },
          ],
        },
      ]}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Methods matrix: every approach × every tuning method                */
/* ------------------------------------------------------------------ */

export function MethodsMatrix({ copy }: { copy: LlamaFactoryCopy['methods'] }) {
  return (
    <div className="ds-panel pg-llama__matrix" data-animate="">
      <table>
        <caption className="ds-sr-only">{copy.matrixLabel}</caption>
        <thead>
          <tr>
            <th scope="col" className="pg-llama__matrix-corner">
              {copy.approachHeader}
            </th>
            {tuningMethods.map((method) => (
              <th scope="col" key={method}>
                {method}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {copy.approaches.map((approach, r) => (
            <tr key={approach.short}>
              <th scope="row">
                <span className="pg-llama__approach-name">{approach.name}</span>
                <span className="pg-llama__approach-short">{approach.short}</span>
              </th>
              {tuningMethods.map((method, c) => (
                <td key={method}>
                  {/* --d: diagonal position, for the intro and the highlight sweep. */}
                  <span className="pg-llama__cell" style={{ '--d': r + c } as CSSProperties}>
                    <span className="ds-sr-only">✓</span>
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Open-source architecture                                            */
/* ------------------------------------------------------------------ */

const archWires = ['M50 0 C50 30 100 26 100 56', 'M150 0 C150 30 100 26 100 56']

export function Architecture({ copy }: { copy: LlamaFactoryCopy['open'] }) {
  const [webui, cli, ...engine] = copy.architectureItems
  return (
    <MockWindow label="llamafactory" meta={copy.architectureCaption} texture="cells" ariaLabel={copy.architectureAriaLabel}>
      <div className="pg-llama__arch">
        <div className="pg-llama__arch-top">
          <span className="pg-llama__arch-box pg-llama__arch-box--ui">{webui}</span>
          <span className="pg-llama__arch-box pg-llama__arch-box--ui">{cli}</span>
        </div>
        <svg className="pg-llama__arch-wires" viewBox="0 0 200 56" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          {archWires.map((d) => (
            <path key={d} d={d} />
          ))}
          {/* Signals from both interfaces into the engine (motion only). */}
          {archWires.map((d) => (
            <path key={`s-${d}`} className="pg-llama__arch-signal" d={d} pathLength={1} />
          ))}
        </svg>
        <div className="pg-llama__arch-engine">
          <span className="pg-product__mono">llamafactory-cli</span>
          <div className="pg-llama__arch-row">
            {engine.map((item, i) => (
              <span key={item} className="pg-llama__arch-step">
                <span className="pg-llama__arch-box">{item}</span>
                {i < engine.length - 1 ? (
                  <span className="pg-llama__arch-arrow" style={{ '--k': i } as CSSProperties} aria-hidden="true" />
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MockWindow>
  )
}
