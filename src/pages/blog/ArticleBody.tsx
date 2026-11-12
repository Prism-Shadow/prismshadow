import type { ReactNode } from 'react'
import type { BlogContentBlock, BlogContentSection, BlogPost } from '../../content/blogPosts'
import type { BlogPageCopy } from '../../i18n/messages/blog'
import { ArrowRightIcon, ArrowUpRightIcon } from '../../components/site/icons'
import { cx } from '../../components/site/utils'
import { figureNumbers } from './blogData'

function Block({
  block,
  figure,
  copy,
  uiLang,
}: {
  block: BlogContentBlock
  figure?: number
  copy: BlogPageCopy
  uiLang?: string
}) {
  switch (block.type) {
    case 'heading':
      return <h3 className="pg-prose__h3">{block.text}</h3>
    case 'quote':
      return (
        <blockquote className="pg-prose__quote">
          <p>{block.text}</p>
        </blockquote>
      )
    case 'code':
      return (
        <pre className="pg-prose__code">
          <code>
            {block.lines.map((line, index) => (
              <span className="pg-prose__code-line" key={index}>
                {line.startsWith('→') ? (
                  <>
                    <span className="pg-prose__code-arrow">→</span>
                    {line.slice(1)}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </code>
        </pre>
      )
    case 'image':
      return (
        <figure className="pg-prose__figure">
          <div className="pg-prose__figure-frame">
            <img
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              loading="lazy"
              decoding="async"
            />
          </div>
          {block.caption ? (
            <figcaption>
              {figure ? (
                <span className="pg-prose__figure-number" lang={uiLang}>
                  {copy.post.figure} {figure}
                </span>
              ) : null}
              <span>{block.caption}</span>
            </figcaption>
          ) : null}
        </figure>
      )
    default:
      return (
        <p>
          {block.lead ? (
            // Chinese punctuation carries its own spacing; a Latin lead needs a space.
            <strong>{/[\u3000-\u303f\uff00-\uffef]$/.test(block.lead) ? block.lead : `${block.lead} `}</strong>
          ) : null}
          {block.text}
        </p>
      )
  }
}

function Links({ section }: { section: BlogContentSection }) {
  if (!section.links?.length) return null
  return (
    <ul className={cx('pg-prose__links', section.kind === 'sources' && 'pg-prose__links--sources')}>
      {section.links.map((link) => {
        // Site paths stay in the tab (the router swaps the page); others open a new one.
        const internal = link.href.startsWith('/')
        return (
          <li key={link.href}>
            <a href={link.href} {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}>
              <span>{link.label}</span>
              {internal ? <ArrowRightIcon /> : <ArrowUpRightIcon />}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Long-form post content. Section headings are h2 (h3 for `level: 3`
 * sub-sections) with stable ids for the table of contents.
 */
export function ArticleBody({
  post,
  ids,
  copy,
  uiLang,
}: {
  post: BlogPost
  ids: Array<string | undefined>
  copy: BlogPageCopy
  /** Language of UI labels (figure numbers) when it differs from the post's. */
  uiLang?: string
}) {
  const figures = figureNumbers(post)

  return (
    <div className="pg-prose">
      {post.content.map((section, s) => {
        const Heading = section.level === 3 ? 'h3' : 'h2'
        const content: ReactNode[] = section.blocks
          ? section.blocks.map((block, b) => (
              <Block
                key={`b${b}`}
                block={block}
                figure={figures.get(`${s}:${b}`)}
                copy={copy}
                uiLang={uiLang}
              />
            ))
          : (section.body ?? []).map((paragraph, p) => <p key={`p${p}`}>{paragraph}</p>)

        return (
          <div
            key={ids[s] ?? `section-${s}`}
            className={cx(
              'pg-prose__section',
              section.level === 3 && 'pg-prose__section--sub',
              section.kind && `pg-prose__section--${section.kind}`,
            )}
          >
            {section.heading ? (
              <Heading id={ids[s]} className={Heading === 'h3' ? 'pg-prose__h3' : 'pg-prose__h2'}>
                {section.heading}
              </Heading>
            ) : null}
            {content}
            {section.bullets?.length ? (
              <ul className="pg-prose__list">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.table ? (
              <div
                className="pg-prose__table"
                role="region"
                aria-label={section.heading}
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      {section.table.headers.map((header) => (
                        <th key={header} scope="col">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row">
                              {cell}
                            </th>
                          ) : (
                            <td key={c}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <Links section={section} />
          </div>
        )
      })}
    </div>
  )
}
