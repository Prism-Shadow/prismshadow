import type { ReactNode } from 'react'
import type { PlatformDiagramsCopy, PlatformModuleId } from '../../../../i18n/messages/home'

/*
 * Capability panels: sparse, outline-first schematics on a 600 × 450 board.
 * Boxes, cells and wires are hairlines at low contrast; only a few marks per
 * diagram are lit (accent, or a spectrum dot), and only the result carries
 * colour at full strength. Each diagram is one role="img" with a full text
 * alternative.
 */

const W = 600
const H = 450
const LABEL = 11

type Tone = 'off' | 'accent' | 'cyan' | 'signal'

/** Approximate rendered width of a mono label (CJK glyphs are full width). */
const textWidth = (text: string, size = LABEL) => {
  let width = 0
  for (const char of text) width += /[⺀-鿿豈-﫿＀-￯]/.test(char) ? size : size * 0.66
  return width
}

function Board({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg className="hp-dg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      {children}
    </svg>
  )
}

function Box({
  x,
  y,
  w,
  h,
  label,
  value,
  valueTone = 'signal',
  tone = 'base',
}: {
  x: number
  y: number
  w: number
  h: number
  label?: string
  value?: string
  valueTone?: 'signal' | 'accent'
  tone?: 'base' | 'accent'
}) {
  return (
    <g>
      <rect
        className={`hp-dg__box${tone === 'accent' ? ' hp-dg__box--accent' : ''}`}
        x={x + 0.5}
        y={y + 0.5}
        width={w - 1}
        height={h - 1}
        rx="8"
      />
      {label ? (
        <text className="hp-dg__label" x={x + 16} y={y + 26}>
          {label}
        </text>
      ) : null}
      {value ? (
        <text className={`hp-dg__label hp-dg__label--${valueTone}`} x={x + w - 16} y={y + 26} textAnchor="end">
          {value}
        </text>
      ) : null}
    </g>
  )
}

/** A hairline cell. Lit cells take a tone-coloured outline; `dot` adds a small filled core. */
function Cell({
  x,
  y,
  size,
  tone = 'off',
  shape = 'square',
  dot = false,
}: {
  x: number
  y: number
  size: number
  tone?: Tone
  shape?: 'square' | 'circle' | 'diamond'
  dot?: boolean
}) {
  const className = `hp-dg__cell hp-dg__cell--${tone}`
  const h = size / 2
  let outline: ReactNode
  if (shape === 'circle') {
    outline = <circle className={className} cx={x + h} cy={y + h} r={h - 0.5} />
  } else if (shape === 'diamond') {
    outline = (
      <path
        className={className}
        d={`M${x + h} ${y + 0.5}L${x + size - 0.5} ${y + h}L${x + h} ${y + size - 0.5}L${x + 0.5} ${y + h}Z`}
      />
    )
  } else {
    outline = <rect className={className} x={x + 0.5} y={y + 0.5} width={size - 1} height={size - 1} rx="2.5" />
  }
  return (
    <g>
      {outline}
      {dot ? <circle className={`hp-dg__core hp-dg__core--${tone}`} cx={x + h} cy={y + h} r={Math.min(3.5, Math.max(1.75, size * 0.14))} /> : null}
    </g>
  )
}

function Wire({ d, tone = 'base', dashed = false }: { d: string; tone?: 'base' | 'accent'; dashed?: boolean }) {
  return <path className={`hp-dg__wire hp-dg__wire--${tone}${dashed ? ' hp-dg__wire--dash' : ''}`} d={d} />
}

/** Small filled arrowhead whose tip sits on (x, y). */
function Head({ x, y, dir, tone = 'base' }: {
  x: number
  y: number
  dir: 'up' | 'down' | 'left' | 'right'
  tone?: 'base' | 'accent'
}) {
  const l = 5
  const s = 3
  const points = {
    right: [[x, y], [x - l, y - s], [x - l, y + s]],
    left: [[x, y], [x + l, y - s], [x + l, y + s]],
    down: [[x, y], [x - s, y - l], [x + s, y - l]],
    up: [[x, y], [x - s, y + l], [x + s, y + l]],
  }[dir]
  return <polygon className={`hp-dg__head hp-dg__head--${tone}`} points={points.map((p) => p.join(',')).join(' ')} />
}

function Joint({ x, y }: { x: number; y: number }) {
  return <circle className="hp-dg__joint" cx={x} cy={y} r="2" />
}

/** A hairline standing in for a line of text. */
function Rule({ x, y, w }: { x: number; y: number; w: number }) {
  return <path className="hp-dg__rule" d={`M${x} ${y + 0.5}h${w}`} />
}

function Chip({ x, y, label }: { x: number; y: number; label: string }) {
  const w = Math.ceil(textWidth(label, 10) + 14)
  return (
    <g>
      <rect className="hp-dg__chip" x={x + 0.5} y={y + 0.5} width={w - 1} height="19" rx="4" />
      <text className="hp-dg__chip-text hp-dg__label--accent" x={x + w / 2} y={y + 13.5} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

function Check({ x, y }: { x: number; y: number }) {
  return <path className="hp-dg__check" d={`M${x} ${y + 4}l3 3 6-7`} />
}

/* ------------------------------------------------------------------ */
/* 1. Self-evolving agents                                             */
/* ------------------------------------------------------------------ */

const ACTIVE_AGENT = 2
const MODELS_LIT = new Set([1, 8])
const RSI_ACTIVE = new Set([3, 7])
const ACCURACY = [0.12, 0.3, 0.36, 0.52, 0.6, 0.76, 0.9]
const EVAL_RUNS = 20
const EVAL_SCORE = 0.9

function AgentsDiagram({ copy }: { copy: PlatformDiagramsCopy['agents'] }) {
  const spark = ACCURACY.map((v, i) => [376 + (i * 168) / (ACCURACY.length - 1), 406 - v * 26] as const)
  const end = spark[spark.length - 1]
  const trackX = 56
  const trackW = 488
  const scoreX = trackX + trackW * EVAL_SCORE

  return (
    <Board label={copy.ariaLabel}>
      {/* Agent Team ↔ models (left column 40–330, right column 360–560) */}
      <Box x={40} y={44} w={290} h={120} label={copy.team} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Cell key={i} x={56 + i * 54.5} y={92} size={40} tone={i === ACTIVE_AGENT ? 'accent' : 'off'} dot={i === ACTIVE_AGENT} />
      ))}
      <Box x={360} y={44} w={200} h={120} label={copy.models} />
      {Array.from({ length: 10 }, (_, i) => (
        <Cell
          key={i}
          x={376 + (i % 5) * 37.5}
          y={94 + Math.floor(i / 5) * 32}
          size={18}
          shape="circle"
          tone={MODELS_LIT.has(i) ? 'cyan' : 'off'}
          dot={MODELS_LIT.has(i)}
        />
      ))}
      <Wire d="M330 112H360" />
      <Joint x={330} y={112} />
      <Joint x={360} y={112} />

      {/* Team → eval → RSI / accuracy */}
      <Wire d="M185 164V199" />
      <Head x={185} y={204} dir="down" />
      <Box x={40} y={204} w={520} h={96} label={copy.evaluate} value={copy.evaluateValue} />
      {/* Score: one tick per evaluated run, and a single line that reaches 90%+. */}
      {Array.from({ length: EVAL_RUNS }, (_, i) => {
        const x = trackX + 0.5 + (i * trackW) / (EVAL_RUNS - 1)
        return <path key={i} className="hp-dg__tick" d={`M${x} 244V252`} />
      })}
      <path className="hp-dg__rule" d={`M${trackX} 268.5h${trackW}`} />
      <path className="hp-dg__score" d={`M${trackX} 268.5H${scoreX}`} />
      <circle className="hp-dg__dot hp-dg__dot--signal" cx={scoreX} cy={268.5} r="2.75" />
      <Wire d="M185 300V335" />
      <Head x={185} y={340} dir="down" />
      <Wire d="M460 300V335" />
      <Head x={460} y={340} dir="down" />

      <Box x={40} y={340} w={290} h={80} label={copy.rsi} />
      {Array.from({ length: 10 }, (_, i) => (
        <Cell
          key={i}
          x={56 + (i * 242) / 9}
          y={378}
          size={16}
          shape="diamond"
          tone={RSI_ACTIVE.has(i) ? 'accent' : 'off'}
          dot={RSI_ACTIVE.has(i)}
        />
      ))}

      <Box x={360} y={340} w={200} h={80} label={copy.accuracy} value={copy.accuracyValue} />
      <path className="hp-dg__spark" d={`M${spark.map((p) => p.join(' ')).join('L')}`} />
      <circle className="hp-dg__dot hp-dg__dot--signal" cx={end[0]} cy={end[1]} r="2.5" />

      {/* RSI feedback into the team */}
      <Wire d="M40 380H22V112H35" tone="accent" />
      <Head x={40} y={112} dir="right" tone="accent" />
      <rect className="hp-dg__pill" x="4.5" y="236.5" width="35" height="19" rx="9.5" />
      <text className="hp-dg__chip-text hp-dg__label--accent" x="22" y="250" textAnchor="middle">
        {copy.loop}
      </text>
    </Board>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Data distillation & environment synthesis                        */
/* ------------------------------------------------------------------ */

const ENGINE_LIT = new Set([5, 10])
const TASK_LIT = new Set([1, 4, 9])

function DataDiagram({ copy }: { copy: PlatformDiagramsCopy['data'] }) {
  const outputs = [36, 164, 292]
  const chipWidths = copy.uses.map((use) => Math.ceil(textWidth(use, 10) + 14))
  const chipStart = 40 + textWidth(copy.usesLabel) + 16
  const chipXs = chipWidths.map(
    (_, i) => chipStart + chipWidths.slice(0, i).reduce((sum, w) => sum + w + 8, 0),
  )

  return (
    <Board label={copy.ariaLabel}>
      {/* Inputs */}
      <Box x={40} y={56} w={150} h={124} label={copy.docs} />
      {[106, 92, 110, 70, 98].map((w, i) => (
        <Rule key={i} x={56} y={100 + i * 14} w={w} />
      ))}
      <Box x={40} y={232} w={150} h={124} label={copy.rules} />
      {[84, 66, 92].map((w, i) => (
        <g key={i}>
          <Cell x={56} y={275 + i * 22} size={10} tone={i === 0 ? 'accent' : 'off'} />
          <Rule x={74} y={279.5 + i * 22} w={w} />
        </g>
      ))}

      <Wire d="M190 118H210V196H225" />
      <Head x={230} y={196} dir="right" />
      <Wire d="M190 294H210V228H225" />
      <Head x={230} y={228} dir="right" />

      {/* Engine */}
      <Box x={230} y={146} w={140} h={136} label={copy.engine} tone="accent" />
      {Array.from({ length: 16 }, (_, i) => (
        <Cell
          key={i}
          x={264.5 + (i % 4) * 19}
          y={192 + Math.floor(i / 4) * 19}
          size={14}
          tone={ENGINE_LIT.has(i) ? 'accent' : 'off'}
          dot={ENGINE_LIT.has(i)}
        />
      ))}

      {/* Outputs */}
      <Wire d="M370 212H390M390 82V338M390 82H405M390 210H405M390 338H405" />
      <Joint x={390} y={212} />
      {outputs.map((y) => (
        <Head key={y} x={410} y={y + 46} dir="right" />
      ))}
      <Box x={410} y={outputs[0]} w={150} h={92} label={copy.outputs[0]} />
      {Array.from({ length: 12 }, (_, i) => (
        <Cell
          key={i}
          x={426 + (i % 6) * 20}
          y={outputs[0] + 42 + Math.floor(i / 6) * 20}
          size={14}
          tone={TASK_LIT.has(i) ? 'accent' : 'off'}
        />
      ))}
      <Box x={410} y={outputs[1]} w={150} h={92} label={copy.outputs[1]} />
      {[70, 54, 84].map((w, i) => (
        <g key={i}>
          <Check x={426} y={outputs[1] + 40 + i * 14} />
          <Rule x={446} y={outputs[1] + 46 + i * 14} w={w} />
        </g>
      ))}
      <Box x={410} y={outputs[2]} w={150} h={92} label={copy.outputs[2]} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect className="hp-dg__window" x={426.5 + i * 40} y={outputs[2] + 44.5} width="33" height="30" rx="3" />
          <path className="hp-dg__rule" d={`M${427 + i * 40} ${outputs[2] + 52.5}h32`} />
          {i === 0 ? (
            <circle className="hp-dg__core hp-dg__core--cyan" cx={432 + i * 40} cy={outputs[2] + 48.75} r="1.5" />
          ) : null}
        </g>
      ))}

      {/* Uses */}
      <text className="hp-dg__label" x={40} y={426}>
        {copy.usesLabel}
      </text>
      {copy.uses.map((use, i) => (
        <Chip key={use} x={chipXs[i]} y={412} label={use} />
      ))}
    </Board>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Local deployment & business tuning                               */
/* ------------------------------------------------------------------ */

function LockGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className="hp-dg__glyph" d="M2.5 5.5V3.5a2.5 2.5 0 0 1 5 0v2" />
      <rect className="hp-dg__glyph" x="0.5" y="5.5" width="9" height="7" rx="1.5" />
    </g>
  )
}

function DeployDiagram({ copy }: { copy: PlatformDiagramsCopy['deploy'] }) {
  const models = [190, 315, 440]
  const systems = [130, 250, 370]

  return (
    <Board label={copy.ariaLabel}>
      <rect className="hp-dg__boundary" x="28.5" y="36.5" width="543" height="267" rx="12" />
      <LockGlyph x={48} y={50} />
      <text className="hp-dg__label" x={66} y={62}>
        {copy.boundary}
      </text>

      {/* Your data → tuned models */}
      <path className="hp-dg__cyl" d="M56 112v58c0 7 20 12 44 12s44-5 44-12v-58" />
      <ellipse className="hp-dg__cyl" cx="100" cy="112" rx="44" ry="12" />
      <path className="hp-dg__rule" d="M56 132c0 7 20 12 44 12s44-5 44-12M56 152c0 7 20 12 44 12s44-5 44-12" />
      <text className="hp-dg__label" x={100} y={208} textAnchor="middle">
        {copy.data}
      </text>

      <Wire d="M144 112V84H370M245 84V95M370 84V95" tone="accent" />
      <Head x={245} y={100} dir="down" tone="accent" />
      <Head x={370} y={100} dir="down" tone="accent" />
      <text className="hp-dg__label hp-dg__label--accent" x={307.5} y={77} textAnchor="middle">
        {copy.tune}
      </text>

      {models.map((x, i) => (
        <g key={x}>
          <Box x={x} y={100} w={111} h={68} tone={i < 2 ? 'accent' : 'base'} />
          <text className="hp-dg__label hp-dg__label--strong" x={x + 14} y={124}>
            {copy.models[i]}
          </text>
          {i < 2 ? (
            <Chip x={x + 14} y={136} label={copy.tuned} />
          ) : (
            <g>
              {[0, 1, 2, 3].map((c) => (
                <Cell key={c} x={x + 14 + c * 14} y={140} size={10} tone="off" />
              ))}
            </g>
          )}
        </g>
      ))}

      {/* Models → one API → business systems */}
      <Wire d="M245.5 168V232M370.5 168V232M495.5 168V232M245.5 232H495.5M300 232V281" />
      <Joint x={300} y={232} />
      <Head x={300} y={286} dir="down" />
      <rect className="hp-dg__api" x="210.5" y="286.5" width="179" height="35" rx="8" />
      <text className="hp-dg__label hp-dg__label--accent" x={300} y={308} textAnchor="middle">
        {copy.api}
      </text>
      <Wire d={`M300 322V348M${systems[0] + 50} 348H${systems[2] + 50}${systems.map((x) => `M${x + 50} 348V367`).join('')}`} />
      <Joint x={300} y={348} />
      {systems.map((x, i) => (
        <g key={x}>
          <Head x={x + 50} y={372} dir="down" />
          <Box x={x} y={372} w={100} h={40} />
          <text className="hp-dg__label hp-dg__label--strong" x={x + 50} y={396} textAnchor="middle">
            {copy.systems[i]}
          </text>
        </g>
      ))}
    </Board>
  )
}

/* ------------------------------------------------------------------ */
/* 4. AutoResearch                                                     */
/* ------------------------------------------------------------------ */

const BRANCHES: Array<{ cells: number; pruned: boolean }> = [
  { cells: 3, pruned: true },
  { cells: 4, pruned: false },
  { cells: 2, pruned: true },
]

function Cross({ x, y }: { x: number; y: number }) {
  return <path className="hp-dg__cross" d={`M${x - 3.5} ${y - 3.5}l7 7M${x + 3.5} ${y - 3.5}l-7 7`} />
}

function ResearchDiagram({ copy }: { copy: PlatformDiagramsCopy['research'] }) {
  const rows = [118, 224, 330]

  return (
    <Board label={copy.ariaLabel}>
      <text className="hp-dg__label" x={202} y={68} textAnchor="middle">
        {copy.hypotheses}
      </text>
      <text className="hp-dg__label" x={309} y={68} textAnchor="middle">
        {copy.experiments}
      </text>

      {/* Goal → hypotheses */}
      <rect className="hp-dg__box hp-dg__box--strong" x="40.5" y="200.5" width="83" height="47" rx="8" />
      <text className="hp-dg__label hp-dg__label--strong" x={82} y={228} textAnchor="middle">
        {copy.goal}
      </text>
      <Wire d={`M124 224H146M146 ${rows[0]}V${rows[2]}${rows.map((y) => `M146 ${y}H165`).join('')}`} />
      <Joint x={146} y={224} />

      {rows.map((y, i) => {
        const branch = BRANCHES[i]
        const cellsEnd = 262 + (branch.cells - 1) * 26 + 16
        return (
          <g key={y}>
            <Head x={170} y={y} dir="right" />
            <rect
              className={branch.pruned ? 'hp-dg__box' : 'hp-dg__box hp-dg__box--accent'}
              x="170.5"
              y={y - 17.5}
              width="63"
              height="35"
              rx="6"
            />
            <text
              className={`hp-dg__label ${branch.pruned ? '' : 'hp-dg__label--strong'}`}
              x={202}
              y={y + 4}
              textAnchor="middle"
            >
              {`H${i + 1}`}
            </text>
            <Wire
              d={`M234 ${y}H${branch.pruned ? cellsEnd + 10 : cellsEnd}`}
              tone={branch.pruned ? 'base' : 'accent'}
              dashed={branch.pruned}
            />
            {Array.from({ length: branch.cells }, (_, c) => (
              <Cell
                key={c}
                x={262 + c * 26}
                y={y - 8}
                size={16}
                tone={branch.pruned ? 'off' : 'accent'}
                dot={!branch.pruned && c === branch.cells - 1}
              />
            ))}
            {branch.pruned ? <Cross x={cellsEnd + 18} y={y} /> : null}
          </g>
        )
      })}

      {/* Winning path → executed solution */}
      <Wire d="M356 224H415" tone="accent" />
      <Head x={420} y={224} dir="right" tone="accent" />
      <Box x={420} y={192} w={140} h={64} label={copy.solution} />
      <circle className="hp-dg__ring" cx="441" cy="236" r="6.5" />
      <path className="hp-dg__check" d="M437.6 236.2l2.3 2.3 3.9-4.6" />
      <text className="hp-dg__label hp-dg__label--signal" x={454} y={240}>
        {copy.executed}
      </text>

      {/* Legend */}
      <path className="hp-dg__wire hp-dg__wire--accent" d="M40 416H64" />
      <text className="hp-dg__label" x={72} y={420}>
        {copy.legend[0]}
      </text>
      <path className="hp-dg__wire hp-dg__wire--dash" d={`M${92 + textWidth(copy.legend[0])} 416H${116 + textWidth(copy.legend[0])}`} />
      <text className="hp-dg__label" x={124 + textWidth(copy.legend[0])} y={420}>
        {copy.legend[1]}
      </text>
    </Board>
  )
}

export function PlatformDiagram({ id, copy }: { id: PlatformModuleId; copy: PlatformDiagramsCopy }) {
  switch (id) {
    case 'agents':
      return <AgentsDiagram copy={copy.agents} />
    case 'data':
      return <DataDiagram copy={copy.data} />
    case 'deploy':
      return <DeployDiagram copy={copy.deploy} />
    case 'research':
      return <ResearchDiagram copy={copy.research} />
  }
}
