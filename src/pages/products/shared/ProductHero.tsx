import type { ReactNode } from 'react'
import { renderAccent } from '../../../components/site/utils'
import type { ProductId } from '../../../i18n/messages/shared'
import { ProductMark } from './ProductPage'

/**
 * Product hero: mark + product name + eyebrow, h1, lead, actions and a row of key
 * facts on the left eight columns, then one big product visual across all twelve.
 */
export function ProductHero({
  product,
  productName,
  eyebrow,
  title,
  titleAccent,
  lead,
  actions,
  actionsLabel,
  meta,
  metaLabel,
  media,
  mediaId,
}: {
  product: ProductId
  productName: string
  eyebrow: string
  title: string
  titleAccent?: string
  lead: string
  actions: ReactNode
  actionsLabel?: string
  meta?: ReactNode[]
  metaLabel?: string
  media: ReactNode
  mediaId?: string
}) {
  return (
    <section id="hero" className="pg-product__hero" aria-labelledby="hero-title">
      <div className="ds-container">
        <div className="ds-grid">
          <div className="pg-product__hero-copy">
            <p className="pg-product__badge">
              <ProductMark id={product} />
              <span className="pg-product__badge-name">{productName}</span>
              <span className="pg-product__badge-rule" aria-hidden="true" />
              <span className="pg-product__badge-eyebrow">{eyebrow}</span>
            </p>
            <h1 id="hero-title" className="ds-h1 pg-product__hero-title">
              {renderAccent(title, titleAccent)}
            </h1>
            <p className="ds-lead pg-product__hero-lead">{lead}</p>
            <div
              className="ds-actions pg-product__hero-actions"
              role={actionsLabel ? 'group' : undefined}
              aria-label={actionsLabel}
            >
              {actions}
            </div>
            {meta && meta.length > 0 ? (
              <ul className="pg-product__hero-meta" aria-label={metaLabel}>
                {meta.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div className="pg-product__hero-media" id={mediaId}>
          {media}
        </div>
      </div>
    </section>
  )
}

/** Big-number proof row with hairline columns. */
export function ProofRow({
  stats,
  note,
}: {
  stats: { value: string; label: string; body?: string }[]
  note?: ReactNode
}) {
  return (
    <>
      <dl className="pg-product__stats">
        {stats.map((stat) => (
          <div className="pg-product__stat" key={stat.value + stat.label}>
            <dt className="pg-product__stat-value">{stat.value}</dt>
            <dd className="pg-product__stat-label">{stat.label}</dd>
            {stat.body ? <dd className="pg-product__stat-body">{stat.body}</dd> : null}
          </div>
        ))}
      </dl>
      {note ? <p className="pg-product__stats-note">{note}</p> : null}
    </>
  )
}
