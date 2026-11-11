import type { ReactNode } from 'react'
import { SectionHead } from '../../../components/site/ui'
import { cx, renderAccent } from '../../../components/site/utils'
import type { ProductId } from '../../../i18n/messages/shared'
import type { SectionHeadCopy } from '../../../i18n/messages/products/types'
import { productMarks } from './marks'
import './product-kit.css'

/** Root of every product page: `.pg-product` scopes the shared kit, `className` the page. */
export function ProductPage({ className, children }: { className: string; children: ReactNode }) {
  return <div className={cx('pg-product', className)}>{children}</div>
}

/** Square product mark (rounded tile), decorative unless `alt` is given. */
export function ProductMark({
  id,
  alt = '',
  className,
}: {
  id: ProductId
  alt?: string
  className?: string
}) {
  const mark = productMarks[id]
  return (
    <span
      className={cx('pg-product__mark', mark.tile === 'dark' && 'pg-product__mark--dark', className)}
    >
      <img src={mark.src} alt={alt} width={64} height={64} decoding="async" />
    </span>
  )
}

/** True when the accent phrase closes the title (only final punctuation after it). */
const accentIsTail = (title: string, accent: string) =>
  accent.length > 0 && /^[\s.。!！?？]*$/.test(title.slice(title.lastIndexOf(accent) + accent.length))

/**
 * A page section with the shared head (eyebrow, accented title, lead).
 * Every section gets an id and is labelled by its h2.
 */
export function ProductSection({
  id,
  head,
  headVariant = 'split',
  headActions,
  tone = 'default',
  className,
  children,
}: {
  id: string
  head: SectionHeadCopy
  headVariant?: 'split' | 'stack'
  headActions?: ReactNode
  tone?: 'default' | 'raised' | 'paper'
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cx('ds-section', tone !== 'default' && `ds-section--${tone}`, className)}
    >
      <div className="ds-container">
        <SectionHead
          eyebrow={head.eyebrow}
          title={renderAccent(head.title, head.titleAccent)}
          titleId={`${id}-title`}
          lead={head.lead}
          actions={headActions}
          variant={headVariant}
          className={accentIsTail(head.title, head.titleAccent) ? 'pg-product__head--tail' : undefined}
        />
        {children}
      </div>
    </section>
  )
}
