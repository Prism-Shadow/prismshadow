import { productOrder, productPaths } from '../../../components/site/navigation'
import { SectionHead } from '../../../components/site/ui'
import type { Locale } from '../../../i18n/locales'
import { productCommonCopy } from '../../../i18n/messages/products/common'
import { siteText, type ProductId } from '../../../i18n/messages/shared'
import { ArrowRightIcon } from '../../../components/site/icons'
import { ProductMark } from './ProductPage'

/** Links to the two other product pages, so the three pages read as one family. */
export function CrossLinks({ locale, current }: { locale: Locale; current: ProductId }) {
  const t = productCommonCopy[locale].crossLinks
  const products = siteText[locale].products
  const others = productOrder.filter((id) => id !== current)

  return (
    <section
      id="more-products"
      className="ds-section ds-section--tight pg-product__xlinks"
      aria-labelledby="more-products-title"
    >
      <div className="ds-container">
        <SectionHead eyebrow={t.eyebrow} title={t.title} titleId="more-products-title" variant="stack" />
        <ul className="pg-product__xlink-list">
          {others.map((id) => (
            <li key={id} className="pg-product__xlink-item">
              <a className="ds-card pg-product__xlink" href={productPaths[id]}>
                <span className="pg-product__xlink-top">
                  <ProductMark id={id} />
                  <span className="pg-product__xlink-cta">
                    {t.explore}
                    <ArrowRightIcon />
                  </span>
                </span>
                <h3 className="ds-h3 pg-product__xlink-name">{products[id].name}</h3>
                <p className="pg-product__xlink-body">{products[id].description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
