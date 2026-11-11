import type { PlatformPageCopy } from '../../../i18n/messages/platformPage'

/*
 * The closed loop as one hairline ring. Knowledge enters once (ingest), then
 * synthesize → train → deploy → evolve run clockwise; the accent arc from
 * evolve back into synthesize is the feedback path and the visual's focus.
 */

const W = 480
const H = 440
const CX = 262
const CY = 226
const R = 136
const NODE = 21
const GAP = (NODE + 9) / R // radians kept clear around each node

/** Ring nodes clockwise from the top: synthesize, train, deploy, evolve. */
const ANGLES = [-90, 0, 90, 180].map((deg) => (deg * Math.PI) / 180)

const on = (theta: number, r = R): [number, number] => [
  Math.round((CX + r * Math.cos(theta)) * 10) / 10,
  Math.round((CY + r * Math.sin(theta)) * 10) / 10,
]

function arc(from: number, to: number) {
  const [x0, y0] = on(from + GAP)
  const [x1, y1] = on(to - GAP)
  return `M${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}`
}

/** Chevron at the end of an arc, pointing along the clockwise tangent. */
function ArcHead({ theta, tone }: { theta: number; tone: 'base' | 'accent' }) {
  const end = theta - GAP
  const [x, y] = on(end)
  const deg = (end * 180) / Math.PI + 90
  return (
    <path
      className={`pf-loopdg__head pf-loopdg__head--${tone}`}
      d="M-5 -3.5L0 0L-5 3.5"
      transform={`translate(${x} ${y}) rotate(${Math.round(deg * 10) / 10})`}
    />
  )
}

export function LoopDiagram({
  steps,
  diagram,
}: {
  steps: PlatformPageCopy['loop']['steps']
  diagram: PlatformPageCopy['loop']['diagram']
}) {
  const ring = steps.slice(1)
  const [topX, topY] = on(ANGLES[0])
  const entryY = topY
  const entryX = 9
  const labelPos: Array<{ x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = [
    { x: topX, y: topY - NODE - 14, anchor: 'middle' },
    { x: CX + R + NODE + 12, y: CY + 4, anchor: 'start' },
    { x: CX, y: CY + R + NODE + 22, anchor: 'middle' },
    { x: CX - R - NODE - 12, y: CY + 4, anchor: 'end' },
  ]
  const feedbackAt = on((-135 * Math.PI) / 180, R + 22)

  return (
    <svg className="pf-loopdg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={diagram.ariaLabel}>
      <circle className="pf-loopdg__inner" cx={CX} cy={CY} r={R - 56} />

      {/* Ingest: knowledge enters once, into synthesis. */}
      <rect className="pf-loopdg__entry" x={entryX - 8.5} y={entryY - 8.5} width="17" height="17" rx="4" />
      <path className="pf-loopdg__wire" d={`M${entryX + 9} ${entryY}H${topX - NODE - 6}`} />
      <path className="pf-loopdg__head pf-loopdg__head--base" d={`M${topX - NODE - 11} ${entryY - 3.5}L${topX - NODE - 6} ${entryY}L${topX - NODE - 11} ${entryY + 3.5}`} />
      <text className="pf-loopdg__label" x={entryX - 8.5} y={entryY - 20}>
        <tspan className="pf-loopdg__index">01 </tspan>
        {steps[0].label}
      </text>

      {/* The cycle: three base arcs and the accent feedback arc. */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path className="pf-loopdg__ring" d={arc(ANGLES[i], ANGLES[i + 1])} />
          <ArcHead theta={ANGLES[i + 1]} tone="base" />
        </g>
      ))}
      <path className="pf-loopdg__ring pf-loopdg__ring--feedback" d={arc(ANGLES[3], ANGLES[0] + 2 * Math.PI)} />
      <ArcHead theta={ANGLES[0] + 2 * Math.PI} tone="accent" />
      <text className="pf-loopdg__label pf-loopdg__label--accent" x={feedbackAt[0]} y={feedbackAt[1]} textAnchor="end">
        {diagram.feedback}
      </text>

      {ring.map((step, i) => {
        const [x, y] = on(ANGLES[i])
        const isEvolve = i === 3
        const pos = labelPos[i]
        return (
          <g key={step.label}>
            <circle className={`pf-loopdg__node${isEvolve ? ' pf-loopdg__node--focus' : ''}`} cx={x} cy={y} r={NODE} />
            {isEvolve ? (
              <circle className="pf-loopdg__core" cx={x} cy={y} r={4} />
            ) : (
              <text className="pf-loopdg__num" x={x} y={y + 4} textAnchor="middle">
                {String(i + 2).padStart(2, '0')}
              </text>
            )}
            <text className="pf-loopdg__label" x={pos.x} y={pos.y} textAnchor={pos.anchor}>
              {step.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
