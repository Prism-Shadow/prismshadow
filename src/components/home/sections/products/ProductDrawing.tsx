import type { ReactNode } from 'react'
import type { ProductId } from '../../../../i18n/messages/shared'

/*
 * Isometric line drawings for the three products (modal style): 1px edges,
 * faces filled with the section colour so nearer solids hide farther ones,
 * and a few coloured vertex dots.
 */

const COS30 = Math.cos(Math.PI / 6)
type P3 = [number, number, number]

function projector(scale: number, cx: number, cy: number) {
  return ([x, y, z]: P3) => {
    const sx = cx + (x - y) * COS30 * scale
    const sy = cy + (x + y) * 0.5 * scale - z * scale
    return `${Math.round(sx * 10) / 10} ${Math.round(sy * 10) / 10}`
  }
}

type Project = ReturnType<typeof projector>

/** A box from `min` to `max`: filled silhouette plus its nine visible edges. */
function Solid({
  project,
  min,
  max,
  dashed = false,
  faint = false,
  fill = true,
}: {
  project: Project
  min: P3
  max: P3
  dashed?: boolean
  faint?: boolean
  fill?: boolean
}) {
  const [x0, y0, z0] = min
  const [x1, y1, z1] = max
  const p = (x: number, y: number, z: number) => project([x, y, z])
  const silhouette = `M${p(x0, y0, z1)}L${p(x1, y0, z1)}L${p(x1, y0, z0)}L${p(x1, y1, z0)}L${p(x0, y1, z0)}L${p(x0, y1, z1)}Z`
  const edges = [
    `M${p(x0, y0, z1)}L${p(x1, y0, z1)}L${p(x1, y1, z1)}L${p(x0, y1, z1)}Z`,
    `M${p(x1, y0, z1)}L${p(x1, y0, z0)}L${p(x1, y1, z0)}L${p(x0, y1, z0)}L${p(x0, y1, z1)}`,
    `M${p(x1, y1, z1)}L${p(x1, y1, z0)}`,
  ].join('')
  const edgeClass = `hp-iso__edge${dashed ? ' hp-iso__edge--dash' : ''}${faint ? ' hp-iso__edge--faint' : ''}`
  return (
    <g>
      {fill ? <path className="hp-iso__face" d={silhouette} /> : null}
      <path className={edgeClass} d={edges} />
    </g>
  )
}

function Dot({ project, at, tone }: { project: Project; at: P3; tone: 'cyan' | 'amber' | 'accent' }) {
  const [x, y] = project(at).split(' ').map(Number)
  return <circle className={`hp-iso__dot hp-iso__dot--${tone}`} cx={x} cy={y} r="2.5" />
}

function Guide({ project, from, to }: { project: Project; from: P3; to: P3 }) {
  return <path className="hp-iso__edge hp-iso__edge--dash hp-iso__edge--faint" d={`M${project(from)}L${project(to)}`} />
}

/** PenguinHarness: an agent assembly with one agent being placed by agents. */
function HarnessDrawing() {
  const project = projector(31, 120, 112)
  const cubes: P3[] = []
  for (let z = 0; z < 2; z += 1)
    for (let y = 0; y < 2; y += 1)
      for (let x = 0; x < 2; x += 1) if (!(x === 1 && y === 1 && z === 1)) cubes.push([x, y, z])
  cubes.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]))
  const lift = 0.7
  const top = 2 + lift + 1

  return (
    <>
      {cubes.map(([x, y, z]) => (
        <Solid key={`${x}${y}${z}`} project={project} min={[x, y, z]} max={[x + 1, y + 1, z + 1]} />
      ))}
      {([[1, 2], [2, 1], [2, 2]] as const).map(([x, y]) => (
        <Guide key={`${x}${y}`} project={project} from={[x, y, 2]} to={[x, y, 2 + lift]} />
      ))}
      <Solid project={project} min={[1, 1, 2 + lift]} max={[2, 2, top]} />
      <Dot project={project} at={[1, 1, top]} tone="cyan" />
      <Dot project={project} at={[2, 1, top]} tone="cyan" />
      <Dot project={project} at={[1, 2, top]} tone="cyan" />
      <Dot project={project} at={[2, 2, top]} tone="cyan" />
    </>
  )
}

/** Panofy: layers of a team's work distilled into one expert agent. */
function PanofyDrawing() {
  const project = projector(34, 120, 130)
  const t = 0.16

  return (
    <>
      <Solid project={project} min={[-1.5, -1.5, 0]} max={[1.5, 1.5, t]} dashed fill={false} />
      <Guide project={project} from={[1.5, 1.5, t]} to={[1.5, 1.5, 1]} />
      <Guide project={project} from={[-1.5, 1.5, t]} to={[-1.5, 1.5, 1]} />
      <Guide project={project} from={[1.5, -1.5, t]} to={[1.5, -1.5, 1]} />
      <Solid project={project} min={[-1.5, -1.5, 1]} max={[1.5, 1.5, 1 + t]} />
      <Solid project={project} min={[-0.9, -0.9, 1.9]} max={[0.9, 0.9, 1.9 + t]} />
      <Solid project={project} min={[-0.4, -0.4, 1.9 + t]} max={[0.4, 0.4, 2.7 + t]} />
      <Dot project={project} at={[-0.9, -0.9, 1.9 + t]} tone="amber" />
      <Dot project={project} at={[0.9, -0.9, 1.9 + t]} tone="amber" />
      <Dot project={project} at={[-0.9, 0.9, 1.9 + t]} tone="amber" />
      <Dot project={project} at={[0.9, 0.9, 1.9 + t]} tone="amber" />
    </>
  )
}

/** LlamaFactory: an open model shaped inside the fine-tuning frame. */
function FactoryDrawing() {
  const project = projector(29, 120, 100)
  const o = 1.5
  const i = 0.55
  const outer: P3[] = [
    [-o, -o, o],
    [o, -o, o],
    [o, -o, -o],
    [o, o, -o],
    [-o, o, -o],
    [-o, o, o],
  ]
  const inner: P3[] = [
    [-i, -i, i],
    [i, -i, i],
    [i, -i, -i],
    [i, i, -i],
    [-i, i, -i],
    [-i, i, i],
  ]

  return (
    <>
      <Solid project={project} min={[-o, -o, -o]} max={[o, o, o]} faint fill={false} />
      {outer.map((point, index) => (
        <Guide key={index} project={project} from={point} to={inner[index]} />
      ))}
      <Solid project={project} min={[-i, -i, -i]} max={[i, i, i]} />
      {outer.map((point, index) => (
        <Dot key={index} project={project} at={point} tone="accent" />
      ))}
    </>
  )
}

function Drawing({ id }: { id: ProductId }): ReactNode {
  switch (id) {
    case 'penguin-harness':
      return <HarnessDrawing />
    case 'panofy':
      return <PanofyDrawing />
    case 'llama-factory':
      return <FactoryDrawing />
  }
}

export function ProductDrawing({ id }: { id: ProductId }) {
  return (
    <svg className="hp-iso" viewBox="0 0 240 200" aria-hidden="true" focusable="false">
      <Drawing id={id} />
    </svg>
  )
}
