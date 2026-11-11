import type { ReactNode } from 'react'
import { cx } from '../../../components/site/utils'

/** Hairline feature columns (`.ds-features`) with an optional icon and link per item. */
export function FeatureGrid({
  items,
  cols = 3,
  className,
}: {
  items: { title: string; body: string; icon?: ReactNode; label?: string; footer?: ReactNode }[]
  cols?: 2 | 3 | 4
  className?: string
}) {
  return (
    <ul className={cx('ds-features', cols !== 3 && `ds-features--${cols}`, 'pg-product__features', className)}>
      {items.map((item) => (
        <li className="ds-feature pg-product__feature" key={item.title}>
          {item.label ? <span className="pg-product__feature-label">{item.label}</span> : null}
          <h3 className="ds-feature__title">
            {item.icon}
            {item.title}
          </h3>
          <p className="ds-feature__body">{item.body}</p>
          {item.footer ? <div className="pg-product__feature-footer">{item.footer}</div> : null}
        </li>
      ))}
    </ul>
  )
}

/**
 * Flat dark UI frame for code-built visuals: a slim mono title bar and a body.
 * Pass `ariaLabel` to expose the whole mock as one described image.
 */
export function MockWindow({
  label,
  meta,
  ariaLabel,
  texture,
  className,
  bodyClassName,
  children,
}: {
  label: ReactNode
  meta?: ReactNode
  ariaLabel?: string
  texture?: 'cells' | 'dots'
  className?: string
  bodyClassName?: string
  children: ReactNode
}) {
  return (
    <div
      className={cx('ds-panel', texture && `ds-panel--${texture}`, 'pg-product__window', className)}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
    >
      <div className="pg-product__window-bar">
        <span className="pg-product__window-label">
          <span className="pg-product__window-dot" aria-hidden="true" />
          {label}
        </span>
        {meta ? <span className="pg-product__window-meta">{meta}</span> : null}
      </div>
      <div className={cx('pg-product__window-body', bodyClassName)}>{children}</div>
    </div>
  )
}
