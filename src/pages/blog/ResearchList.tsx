import { researchWorks } from '../../content/researchWorks'
import type { Locale } from '../../i18n'
import type { BlogPageCopy } from '../../i18n/messages/blog'
import { ArrowRightIcon, ArrowUpRightIcon } from '../../components/site/icons'
import { SectionHead } from '../../components/site/ui'
import { contentLang, formatMonth } from './blogData'

/**
 * "Papers and open source": the team's research as a hairline list on the
 * 12-column grid (kind and date · title and summary · links), not cards.
 * Every link is described by its row's title, so repeated labels such as
 * "arXiv" or "Read the post" stay unambiguous for screen readers.
 */
export function ResearchList({ locale, copy }: { locale: Locale; copy: BlogPageCopy }) {
  const lang = contentLang(locale)

  return (
    <section
      id="research"
      className="ds-section ds-section--raised pg-blog__works"
      aria-labelledby="research-title"
    >
      <div className="ds-container">
        <SectionHead
          titleId="research-title"
          eyebrow={copy.works.eyebrow}
          title={copy.works.title}
          lead={copy.works.lead}
          className="pg-blog__works-head"
        />

        <ul className="pg-blog-works" aria-label={copy.works.listLabel}>
          {researchWorks.map((work) => {
            const titleId = `work-${work.id}`
            return (
              <li key={work.id} className="pg-blog-works__row">
                <p className="pg-blog-works__meta">
                  <span className="pg-blog-works__kind" data-kind={work.kind}>
                    {copy.works.kinds[work.kind]}
                  </span>
                  <time className="pg-blog-works__date" dateTime={work.date}>
                    {formatMonth(work.date, copy)}
                  </time>
                </p>
                <div className="pg-blog-works__main">
                  <h3 className="pg-blog-works__title" id={titleId} lang={lang}>
                    {work.title}
                  </h3>
                  <p className="pg-blog-works__summary">{work.summary[locale]}</p>
                </div>
                <ul className="pg-blog-works__links">
                  {work.links.map((link) => (
                    <li key={link.href}>
                      <a
                        className="ds-link pg-blog-works__link"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-describedby={titleId}
                      >
                        {copy.works.links[link.kind]}
                        <ArrowUpRightIcon />
                      </a>
                    </li>
                  ))}
                  {work.post ? (
                    <li>
                      <a className="ds-link pg-blog-works__link" href={work.post} aria-describedby={titleId}>
                        {copy.works.links.post}
                        <ArrowRightIcon />
                      </a>
                    </li>
                  ) : null}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
