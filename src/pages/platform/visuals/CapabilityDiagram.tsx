import type { CSSProperties, ReactNode } from 'react'
import type {
  PlatformCapabilityId,
  PlatformDiagramsCopy,
} from '../../../i18n/messages/platformPage'

/*
 * Capability schematics on a 600 × 440 board. Outline first: boxes are
 * hairlines, cells are empty outlines, and only a few marks are lit, with one
 * focal point per diagram. Each board is one role="img" with a full text
 * alternative.
 *
 * Motion (platform.css): as a board scrolls into view its frame fades in,
 * the wires draw and the result lands last; then one accent signal travels
 * its key connector every few seconds.
 */

const W = 600
const H = 440
const LABEL = 11

type CellTone = 'off' | 'soft' | 'accent' | 'cyan' | 'pass'

/** Approximate rendered width of a mono label (CJK glyphs are full width). */
const textWidth = (text: string, size = LABEL) => {
  let width = 0
  for (const char of text) width += /[⺀-鿿豈-﫿＀-￯]/.test(char) ? size : size * 0.62
  return width
}

function Board({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg className="pf-dg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} data-animate="custom">
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
  tone = 'base',
}: {
  x: number
  y: number
  w: number
  h: number
  label?: string
  value?: string
  tone?: 'base' | 'accent'
}) {
  return (
    <g>
      <rect className={`pf-dg__box pf-dg__box--${tone}`} x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx="8" />
      {label ? (
        <text className="pf-dg__label" x={x + 16} y={y + 26}>
          {label}
        </text>
      ) : null}
      {value ? (
        <text className="pf-dg__label pf-dg__label--signal" x={x + w - 16} y={y + 26} textAnchor="end">
          {value}
        </text>
      ) : null}
    </g>
  )
}

function Cell({
  x,
  y,
  size,
  tone = 'off',
  shape = 'square',
}: {
  x: number
  y: number
  size: number
  tone?: CellTone
  shape?: 'square' | 'circle' | 'diamond'
}) {
  const className = `pf-dg__cell pf-dg__cell--${tone}`
  if (shape === 'circle') {
    return <circle className={className} cx={x + size / 2} cy={y + size / 2} r={size / 2 - 0.5} />
  }
  if (shape === 'diamond') {
    const h = size / 2
    return (
      <path
        className={className}
        d={`M${x + h} ${y + 0.5}L${x + size - 0.5} ${y + h}L${x + h} ${y + size - 0.5}L${x + 0.5} ${y + h}Z`}
      />
    )
  }
  return <rect className={className} x={x + 0.5} y={y + 0.5} width={size - 1} height={size - 1} rx="3" />
}

/** A small filled dot centred on (x, y). */
function Pip({ x, y, r = 2, tone = 'faint' }: { x: number; y: number; r?: number; tone?: 'faint' | 'accent' | 'cyan' | 'signal' }) {
  return <circle className={`pf-dg__pip pf-dg__pip--${tone}`} cx={x} cy={y} r={r} />
}

/** A connector. Solid wires draw in (pathLength 1); dashed ones keep their dash pattern and fade. */
function Wire({ d, tone = 'base', dashed = false }: { d: string; tone?: 'base' | 'accent'; dashed?: boolean }) {
  return dashed ? (
    <path className={`pf-dg__wire pf-dg__wire--${tone} pf-dg__wire--dash`} d={d} />
  ) : (
    <path className={`pf-dg__wire pf-dg__wire--${tone} pf-dg__wire--draw`} d={d} pathLength={1} />
  )
}

/**
 * The board's one ambient loop: a short accent dash that travels `points` now
 * and then. Invisible at rest (no JS, reduced motion, prerender). Drawn under
 * the shapes it passes, so it slips behind cells, pills and boxes.
 */
function Signal({ points }: { points: Array<[number, number]> }) {
  let length = 0
  for (let i = 1; i < points.length; i += 1) {
    length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1])
  }
  return (
    <path
      className="pf-dg__signal"
      d={`M${points.map((point) => point.join(' ')).join('L')}`}
      style={{ '--pf-sig-len': Math.round(length) } as CSSProperties}
      aria-hidden="true"
    />
  )
}

/** Open chevron arrowhead whose tip sits on (x, y). */
function Head({
  x,
  y,
  dir,
  tone = 'base',
}: {
  x: number
  y: number
  dir: 'up' | 'down' | 'left' | 'right'
  tone?: 'base' | 'accent'
}) {
  const l = 5
  const s = 3.5
  const d = {
    right: `M${x - l} ${y - s}L${x} ${y}L${x - l} ${y + s}`,
    left: `M${x + l} ${y - s}L${x} ${y}L${x + l} ${y + s}`,
    down: `M${x - s} ${y - l}L${x} ${y}L${x + s} ${y - l}`,
    up: `M${x - s} ${y + l}L${x} ${y}L${x + s} ${y + l}`,
  }[dir]
  return <path className={`pf-dg__head pf-dg__head--${tone}`} d={d} />
}

function Joint({ x, y }: { x: number; y: number }) {
  return <circle className="pf-dg__joint" cx={x} cy={y} r="2.5" />
}

function Bar({ x, y, w }: { x: number; y: number; w: number }) {
  return <rect className="pf-dg__bar" x={x} y={y} width={w} height="4" rx="2" />
}

function Chip({ x, y, label, tone = 'base' }: { x: number; y: number; label: string; tone?: 'base' | 'accent' }) {
  const w = Math.ceil(textWidth(label, 10) + 16)
  return (
    <g>
      <rect className={`pf-dg__chip pf-dg__chip--${tone}`} x={x + 0.5} y={y + 0.5} width={w - 1} height="19" rx="9.5" />
      <text className={`pf-dg__chip-text${tone === 'accent' ? ' pf-dg__label--accent' : ''}`} x={x + w / 2} y={y + 13.5} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

function Check({ x, y }: { x: number; y: number }) {
  return <path className="pf-dg__check" d={`M${x} ${y + 3}l2.5 2.5 5-5.5`} />
}

/* ------------------------------------------------------------------ */
/* 1. Self-evolving agents                                             */
/* ------------------------------------------------------------------ */

const EVAL_MISSES = new Set([6, 15])
const ACCURACY = [0.12, 0.3, 0.36, 0.52, 0.6, 0.76, 0.92]

function AgentsDiagram({ copy }: { copy: PlatformDiagramsCopy['agents'] }) {
  const spark = ACCURACY.map((v, i) => [380 + (i * 156) / (ACCURACY.length - 1), 410 - v * 30] as const)
  const end = spark[spark.length - 1]

  return (
    <Board label={copy.ariaLabel}>
      {/* Agent Team ↔ models */}
      <Box x={40} y={40} w={290} h={116} label={copy.team} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Cell x={56 + i * 53.5} y={84} size={40} tone={i === 2 ? 'soft' : 'off'} />
          <Pip x={76 + i * 53.5} y={104} r={i === 2 ? 3 : 2} tone={i === 2 ? 'accent' : 'faint'} />
        </g>
      ))}
      <Box x={360} y={40} w={200} h={116} label={copy.models} />
      {Array.from({ length: 10 }, (_, i) => {
        const x = 376 + (i % 5) * 37
        const y = 86 + Math.floor(i / 5) * 32
        const lit = i === 1 || i === 8
        return (
          <g key={i}>
            <Cell x={x} y={y} size={18} shape="circle" tone={lit ? 'cyan' : 'off'} />
            {lit ? <Pip x={x + 9} y={y + 9} r={2.5} tone="cyan" /> : null}
          </g>
        )
      })}
      <Wire d="M330 98H360" />
      <Joint x={330} y={98} />
      <Joint x={360} y={98} />

      {/* Team → evaluation → RSI and accuracy */}
      <Wire d="M185 156V194" />
      <Head x={185} y={198} dir="down" />
      <Box x={40} y={198} w={520} h={96} label={copy.evaluate} />
      {Array.from({ length: 20 }, (_, i) => {
        const x = 56 + (i * 470) / 19
        return (
          <g key={i}>
            <Cell x={x} y={242} size={18} />
            {EVAL_MISSES.has(i) ? null : <Check x={x + 5} y={248} />}
          </g>
        )
      })}
      <Wire d="M185 294V330" />
      <Head x={185} y={334} dir="down" />
      <Wire d="M460 294V330" />
      <Head x={460} y={334} dir="down" />

      <Box x={40} y={334} w={290} h={80} label={copy.rsi} />
      {Array.from({ length: 10 }, (_, i) => (
        <Cell key={i} x={56 + (i * 242) / 9} y={372} size={16} shape="diamond" tone={i === 4 ? 'accent' : i === 1 || i === 7 ? 'soft' : 'off'} />
      ))}

      <Box x={360} y={334} w={200} h={80} label={copy.accuracy} value={copy.accuracyValue} />
      <path className="pf-dg__spark" d={`M${spark.map((pt) => pt.join(' ')).join('L')}`} pathLength={1} />
      <circle className="pf-dg__focus-ring" cx={end[0]} cy={end[1]} r="7" />
      <Pip x={end[0]} y={end[1]} r={3} tone="signal" />

      {/* RSI feedback into the team */}
      <Wire d="M40 374H22V98H34" tone="accent" />
      <Signal points={[[40, 374], [22, 374], [22, 98], [35, 98]]} />
      <Head x={40} y={98} dir="right" tone="accent" />
      <rect className="pf-dg__pill" x="4.5" y="226.5" width="35" height="19" rx="9.5" />
      <text className="pf-dg__chip-text pf-dg__label--accent" x="22" y="240" textAnchor="middle">
        {copy.loop}
      </text>
    </Board>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Data distillation & environment synthesis                        */
/* ------------------------------------------------------------------ */

const TASK_LIT = new Set([2, 9])

function DataDiagram({ copy }: { copy: PlatformDiagramsCopy['data'] }) {
  const outputs = [32, 156, 280]
  const chipWidths = copy.uses.map((use) => Math.ceil(textWidth(use, 10) + 16))
  const chipStart = 40 + textWidth(copy.usesLabel) + 16
  const chipXs = chipWidths.map((_, i) => chipStart + chipWidths.slice(0, i).reduce((sum, w) => sum + w + 8, 0))

  return (
    <Board label={copy.ariaLabel}>
      {/* Inputs */}
      <Box x={40} y={52} w={150} h={124} label={copy.docs} />
      {[106, 92, 110, 70, 98].map((w, i) => (
        <Bar key={i} x={56} y={98 + i * 14} w={w} />
      ))}
      <Box x={40} y={224} w={150} h={124} label={copy.rules} />
      {[84, 66, 92].map((w, i) => (
        <g key={i}>
          <Cell x={56} y={268 + i * 22} size={10} />
          <Bar x={74} y={271 + i * 22} w={w} />
        </g>
      ))}

      {/* The signal runs docs → engine → tasks; the engine box hides its middle. */}
      <Signal
        points={[[190, 114], [210, 114], [210, 190], [300, 190], [300, 206], [390, 206], [390, 78], [405, 78]]}
      />
      <Wire d="M190 114H210V190H224" />
      <Head x={230} y={190} dir="right" />
      <Wire d="M190 286H210V222H224" />
      <Head x={230} y={222} dir="right" />

      {/* Engine: the focal point */}
      <rect className="pf-dg__mask" x="230" y="138" width="140" height="136" rx="8" />
      <Box x={230} y={138} w={140} h={136} label={copy.engine} tone="accent" />
      {Array.from({ length: 16 }, (_, i) => (
        <Cell
          key={i}
          x={264.5 + (i % 4) * 19}
          y={184 + Math.floor(i / 4) * 19}
          size={14}
          tone={i === 10 ? 'accent' : i === 5 ? 'soft' : 'off'}
        />
      ))}

      {/* Outputs */}
      <Wire d="M370 206H390M390 78V326M390 78H404M390 202H404M390 326H404" />
      <Joint x={390} y={206} />
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
          tone={TASK_LIT.has(i) ? 'soft' : 'off'}
        />
      ))}
      <Box x={410} y={outputs[1]} w={150} h={92} label={copy.outputs[1]} />
      {[70, 54, 84].map((w, i) => (
        <g key={i}>
          <Check x={426} y={outputs[1] + 40 + i * 14} />
          <Bar x={444} y={outputs[1] + 42 + i * 14} w={w} />
        </g>
      ))}
      <Box x={410} y={outputs[2]} w={150} h={92} label={copy.outputs[2]} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect className="pf-dg__window" x={426.5 + i * 40} y={outputs[2] + 44.5} width="33" height="30" rx="3" />
          <path className="pf-dg__wire" d={`M${427 + i * 40} ${outputs[2] + 52.5}H${459 + i * 40}`} />
          {i === 0 ? <Pip x={432 + i * 40} y={outputs[2] + 49} r={1.5} tone="cyan" /> : null}
        </g>
      ))}

      {/* Uses */}
      <text className="pf-dg__label" x={40} y={414}>
        {copy.usesLabel}
      </text>
      {copy.uses.map((use, i) => (
        <Chip key={use} x={chipXs[i]} y={400} label={use} />
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
      <path className="pf-dg__wire pf-dg__wire--strong" d="M2.5 5.5V3.5a2.5 2.5 0 0 1 5 0v2" />
      <rect className="pf-dg__lock" x="0.5" y="5.5" width="9" height="7" rx="1.5" />
    </g>
  )
}

function DeployDiagram({ copy }: { copy: PlatformDiagramsCopy['deployment'] }) {
  const models = [190, 315, 440]
  const systems = [130, 250, 370]

  return (
    <Board label={copy.ariaLabel}>
      <rect className="pf-dg__boundary" x="28.5" y="32.5" width="543" height="267" rx="12" />
      <LockGlyph x={48} y={46} />
      <text className="pf-dg__label" x={66} y={58}>
        {copy.boundary}
      </text>

      {/* Your data → tuned models */}
      <path className="pf-dg__cyl" d="M56 108v58c0 7 20 12 44 12s44-5 44-12v-58" />
      <ellipse className="pf-dg__cyl" cx="100" cy="108" rx="44" ry="12" />
      <path className="pf-dg__wire" d="M56 128c0 7 20 12 44 12s44-5 44-12M56 148c0 7 20 12 44 12s44-5 44-12" />
      <text className="pf-dg__label" x={100} y={204} textAnchor="middle">
        {copy.data}
      </text>

      <Wire d="M144 108V80H370M245 80V90M370 80V90" tone="accent" />
      <Signal points={[[144, 108], [144, 80], [370, 80], [370, 91]]} />
      <Head x={245} y={96} dir="down" tone="accent" />
      <Head x={370} y={96} dir="down" tone="accent" />
      <text className="pf-dg__label pf-dg__label--accent" x={307.5} y={73} textAnchor="middle">
        {copy.tune}
      </text>

      {models.map((x, i) => (
        <g key={x}>
          <Box x={x} y={96} w={111} h={68} />
          <text className="pf-dg__label pf-dg__label--strong" x={x + 14} y={120}>
            {copy.models[i]}
          </text>
          {i < 2 ? (
            <Chip x={x + 14} y={132} label={copy.tuned} tone="accent" />
          ) : (
            <g>
              {[0, 1, 2, 3].map((c) => (
                <Cell key={c} x={x + 14 + c * 14} y={136} size={10} />
              ))}
            </g>
          )}
        </g>
      ))}

      {/* Models → one API → business systems */}
      <Wire d="M245.5 164V228M370.5 164V228M495.5 164V228M245.5 228H495.5M300 228V276" />
      <Joint x={300} y={228} />
      <Head x={300} y={282} dir="down" />
      <rect className="pf-dg__api" x="210.5" y="282.5" width="179" height="35" rx="17.5" />
      <text className="pf-dg__label pf-dg__label--accent" x={300} y={304} textAnchor="middle">
        {copy.api}
      </text>
      <Wire d={`M300 318V344M${systems[0] + 50} 344H${systems[2] + 50}${systems.map((x) => `M${x + 50} 344V362`).join('')}`} />
      <Joint x={300} y={344} />
      {systems.map((x, i) => (
        <g key={x}>
          <Head x={x + 50} y={368} dir="down" />
          <Box x={x} y={368} w={100} h={40} />
          <text className="pf-dg__label pf-dg__label--strong" x={x + 50} y={392} textAnchor="middle">
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
  return <path className="pf-dg__cross" d={`M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8`} />
}

function ResearchDiagram({ copy }: { copy: PlatformDiagramsCopy['autoresearch'] }) {
  const rows = [114, 220, 326]

  return (
    <Board label={copy.ariaLabel}>
      <text className="pf-dg__label" x={202} y={64} textAnchor="middle">
        {copy.hypotheses}
      </text>
      <text className="pf-dg__label" x={309} y={64} textAnchor="middle">
        {copy.experiments}
      </text>

      {/* Goal → hypotheses */}
      <rect className="pf-dg__goal" x="40.5" y="196.5" width="83" height="47" rx="8" />
      <text className="pf-dg__label pf-dg__label--strong" x={82} y={224} textAnchor="middle">
        {copy.goal}
      </text>
      <Wire d={`M124 220H146M146 ${rows[0]}V${rows[2]}${rows.map((y) => `M146 ${y}H164`).join('')}`} />
      <Joint x={146} y={220} />

      {rows.map((y, i) => {
        const branch = BRANCHES[i]
        const cellsEnd = 262 + (branch.cells - 1) * 26 + 16
        return (
          <g key={y}>
            <Head x={170} y={y} dir="right" />
            <rect
              className={branch.pruned ? 'pf-dg__box pf-dg__box--base' : 'pf-dg__box pf-dg__box--accent'}
              x="170.5"
              y={y - 17.5}
              width="63"
              height="35"
              rx="6"
            />
            <text className={`pf-dg__label${branch.pruned ? '' : ' pf-dg__label--strong'}`} x={202} y={y + 4} textAnchor="middle">
              {`H${i + 1}`}
            </text>
            <Wire d={`M234 ${y}H${branch.pruned ? cellsEnd + 10 : cellsEnd}`} tone={branch.pruned ? 'base' : 'accent'} dashed={branch.pruned} />
            {branch.pruned ? null : <Signal points={[[234, y], [415, y]]} />}
            {Array.from({ length: branch.cells }, (_, c) => (
              <Cell
                key={c}
                x={262 + c * 26}
                y={y - 8}
                size={16}
                tone={branch.pruned ? 'off' : c === branch.cells - 1 ? 'accent' : 'soft'}
              />
            ))}
            {branch.pruned ? <Cross x={cellsEnd + 18} y={y} /> : null}
          </g>
        )
      })}

      {/* Winning path → executed solution (the focal point) */}
      <Wire d="M356 220H414" tone="accent" />
      <Head x={420} y={220} dir="right" tone="accent" />
      <Box x={420} y={188} w={140} h={64} label={copy.solution} />
      <circle className="pf-dg__focus-ring" cx="441" cy="232" r="9" />
      <Pip x={441} y={232} r={3} tone="signal" />
      <text className="pf-dg__label pf-dg__label--signal" x={458} y={236}>
        {copy.executed}
      </text>

      {/* Legend */}
      <path className="pf-dg__wire pf-dg__wire--accent" d="M40 410H64" />
      <text className="pf-dg__label" x={72} y={414}>
        {copy.legend[0]}
      </text>
      <path
        className="pf-dg__wire pf-dg__wire--dash"
        d={`M${92 + textWidth(copy.legend[0])} 410H${116 + textWidth(copy.legend[0])}`}
      />
      <text className="pf-dg__label" x={124 + textWidth(copy.legend[0])} y={414}>
        {copy.legend[1]}
      </text>
    </Board>
  )
}

export function CapabilityDiagram({ id, copy }: { id: PlatformCapabilityId; copy: PlatformDiagramsCopy }) {
  switch (id) {
    case 'agents':
      return <AgentsDiagram copy={copy.agents} />
    case 'data':
      return <DataDiagram copy={copy.data} />
    case 'deployment':
      return <DeployDiagram copy={copy.deployment} />
    case 'autoresearch':
      return <ResearchDiagram copy={copy.autoresearch} />
  }
}
