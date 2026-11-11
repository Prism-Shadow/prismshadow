import { PixelField, type PixelLit } from '../../../components/site/ui'
import type { SecurityDeploymentDiagramCopy } from '../../../i18n/messages/security'
import { CloudIcon, CrossIcon, LockIcon } from '../icons'

// Deterministic lit cells for each node's mini pixel array.
const dataCells: PixelLit[] = [
  [0, 0], [1, 0], [3, 0], [4, 0], [5, 0], [0, 1], [2, 1], [3, 1], [5, 1], [1, 2], [2, 2], [4, 2],
].map(([c, r]) => ({ c, r, tone: 'cyan' as const, dim: (c + r) % 3 === 0 }))

const modelCells: PixelLit[] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2],
].map(([c, r]) => ({ c, r, tone: 'amber' as const, dim: r === 2 }))

const agentCells: PixelLit[] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2],
].map(([c, r]) => ({ c, r, tone: 'accent' as const, dim: r > 0 && c > 1 }))

function Node({
  label,
  note,
  lit,
  shape = 'square',
}: {
  label: string
  note?: string
  lit: PixelLit[]
  shape?: 'square' | 'diamond'
}) {
  return (
    <div className="pg-sec-perimeter__node">
      <span className="pg-sec-mono pg-sec-perimeter__label">{label}</span>
      <PixelField className="pg-sec-perimeter__cells" cols={6} rows={3} cell={11} gap={6} shape={shape} lit={lit} />
      {note ? <span className="pg-sec-perimeter__note">{note}</span> : null}
    </div>
  )
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="pg-sec-perimeter__link">
      {label ? <span className="pg-sec-perimeter__link-label">{label}</span> : null}
    </div>
  )
}

/**
 * Private deployment schematic: everything from data to agents runs inside the
 * customer's perimeter; the path out to the public internet is blocked.
 */
export function PerimeterDiagram({ copy }: { copy: SecurityDeploymentDiagramCopy }) {
  return (
    <div className="ds-panel ds-panel--cells pg-sec-perimeter" role="img" aria-label={copy.ariaLabel}>
      <div className="pg-sec-perimeter__boundary">
        <span className="pg-sec-perimeter__boundary-label">
          <LockIcon />
          {copy.boundary}
        </span>
        <div className="pg-sec-perimeter__flow">
          <Node label={copy.data} lit={dataCells} />
          <Connector label={copy.train} />
          <Node label={copy.models} note={copy.tuned} lit={modelCells} shape="diamond" />
          <Connector label={copy.api} />
          <Node label={copy.agents} lit={agentCells} />
          <Connector />
          <div className="pg-sec-perimeter__systems">
            {copy.systems.map((system) => (
              <span key={system} className="pg-sec-perimeter__system">
                {system}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pg-sec-perimeter__egress">
        <span className="pg-sec-perimeter__block">
          <CrossIcon />
        </span>
        <span className="pg-sec-perimeter__blocked">{copy.blocked}</span>
      </div>

      <div className="pg-sec-perimeter__outside">
        <CloudIcon />
        {copy.outside}
      </div>
    </div>
  )
}
