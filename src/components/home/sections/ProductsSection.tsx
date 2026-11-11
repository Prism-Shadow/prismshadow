import { SectionHead, TextLink } from '../../site/ui'
import { productLogos, productOrder, productPaths } from '../../site/navigation'
import type { Locale } from '../../../i18n/locales'
import type { ProductsCopy } from '../../../i18n/messages/home'
import { siteText } from '../../../i18n/messages/shared'
import { ProductDrawing } from './products/ProductDrawing'
import './products.css'

export function ProductsSection({ copy, locale }: { copy: ProductsCopy; locale: Locale }) {
  const names = siteText[locale].products

  return (
    <section
      id="products"
      className="ds-section ds-section--raised hp-products"
      aria-labelledby="products-title"
    >
      <div className="ds-container">
        <SectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="products-title"
          lead={copy.body}
        />
        <ul className="hp-products__list">
          {productOrder.map((id, index) => {
            const item = copy.items.find((entry) => entry.id === id)
            if (!item) return null
            return (
              <li key={id} className="hp-products__item">
                <span className="hp-products__index" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="hp-products__art">
                  <ProductDrawing id={id} />
                </div>
                <div className="hp-products__ident">
                  <span className={`hp-products__logo hp-products__logo--${id}`}>
                    <img src={productLogos[id]} alt="" loading="lazy" decoding="async" />
                  </span>
                  <div>
                    <p className="hp-products__kicker">{item.kicker}</p>
                    <h3 className="ds-h4">{names[id].name}</h3>
                  </div>
                </div>
                <p className="hp-products__body">{item.body}</p>
                <TextLink href={productPaths[id]} className="hp-products__link">
                  {item.cta}
                </TextLink>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
