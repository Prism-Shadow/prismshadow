import type { CSSProperties } from 'react'
import { SectionHead, TextLink } from '../../site/ui'
import type { ProofCopy } from '../../../i18n/messages/home'
import './proof.css'

/** Headline results and the five customers, in one quiet paper band. */
export function ProofSection({ copy }: { copy: ProofCopy }) {
  return (
    <section id="proof" className="ds-section ds-section--paper hp-proof" aria-labelledby="proof-title">
      <div className="ds-container">
        <SectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="proof-title"
          lead={copy.body}
          actions={<TextLink href="/customers">{copy.cta}</TextLink>}
        />

        {/* Motion (proof.css): the four results fade up in turn, once. */}
        <dl className="hp-proof__stats" aria-label={copy.statsLabel} data-animate="custom">
          {copy.stats.map((stat, index) => (
            <div key={stat.value} className="ds-stat hp-proof__stat" style={{ '--i': index } as CSSProperties}>
              <dt className="ds-stat__label">{stat.label}</dt>
              <dd className="ds-stat__value">{stat.value}</dd>
              <dd className="hp-proof__source">{stat.source}</dd>
            </div>
          ))}
        </dl>

        <div className="hp-proof__customers">
          <h3 className="hp-proof__label">{copy.customersLabel}</h3>
          <ul className="hp-proof__list">
            {copy.customers.map((customer) => (
              <li key={customer.name} className="hp-proof__customer">
                <p className="hp-proof__name">{customer.name}</p>
                <p className="hp-proof__detail">{customer.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
