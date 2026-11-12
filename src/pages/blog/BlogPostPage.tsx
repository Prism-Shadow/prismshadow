import { useEffect, useState } from 'react'
import type { BlogPost } from '../../content/blogPosts'
import type { Locale } from '../../i18n'
import { blogPageCopy, type BlogPageCopy } from '../../i18n/messages/blog'
import { ButtonLink, CtaBand, PageHero, SectionHead, TextLink } from '../../components/site/ui'
import { ChevronRightIcon } from '../../components/site/icons'
import { cx } from '../../components/site/utils'
import { createBlogSeo, usePageMetadata, type SeoMetadata } from '../../seo'
import type { PageProps } from '../types'
import { ArticleBody } from './ArticleBody'
import { BlogCard, TopicTag } from './BlogCard'
import { BlogCover } from './BlogCover'
import {
  contentLang,
  defaultAuthor,
  fill,
  findPost,
  formatDate,
  headingIds,
  localizePost,
  normalizeSlug,
  postsByDate,
  readingMinutes,
  relatedPosts,
  variedPosts,
} from './blogData'
import './blog.css'

/** `slug` is the full pathname, e.g. `/blog/agentic-supply-chain-control-towers`. */
export function BlogPostPage({ locale, slug }: PageProps & { slug: string }) {
  const copy = blogPageCopy[locale]
  const source = findPost(slug)
  const post = source && localizePost(source, locale)

  const metadata: SeoMetadata = post
    ? { ...createBlogSeo(post, copy.post.seoSuffix), ...(post.visualImage ? { image: post.visualImage.src } : {}) }
    : { title: copy.notFound.metaTitle, description: copy.notFound.lead, canonicalPath: '/blog' }
  usePageMetadata(metadata, normalizeSlug(slug), locale)

  return (
    <div className="pg-blog pg-blog--post">
      {post ? (
        <Article post={post} locale={locale} copy={copy} />
      ) : (
        <NotFound locale={locale} copy={copy} />
      )}
    </div>
  )
}

type ArticleProps = { post: BlogPost; locale: Locale; copy: BlogPageCopy }

function Article({ post, locale, copy }: ArticleProps) {
  const ids = headingIds(post)
  const toc = post.content
    .map((section, index) => ({ section, id: ids[index] }))
    .filter(({ section, id }) => id && section.heading && section.level !== 3 && !section.kind)
    .map(({ section, id }) => ({ id: id as string, label: section.heading as string }))
  const lang = contentLang(locale, post)

  return (
    <>
      <article className="pg-blog-post" aria-labelledby="post-title">
        <section id="post" className="pg-blog-post__hero" aria-labelledby="post-title">
          <div className="ds-container ds-grid pg-blog-post__head">
            <nav className="pg-blog-post__crumbs" aria-label={copy.post.breadcrumbLabel}>
              <a className="pg-blog-post__crumb" href="/blog">
                {copy.post.breadcrumb}
              </a>
              <ChevronRightIcon className="pg-blog-post__crumb-sep" />
              <TopicTag topic={post.topic} locale={locale} copy={copy} />
            </nav>
            <h1 className="ds-h1 pg-blog-post__title" id="post-title" lang={lang}>
              {post.title}
            </h1>
            <p className="ds-lead pg-blog-post__lead" lang={lang}>
              {post.excerpt}
            </p>
            <div className="pg-blog-post__byline">
              <span className="pg-blog-post__by">
                <span className="pg-blog-post__avatar" aria-hidden="true">
                  <img src="/prism-shadow-mark-white.png" alt="" width={14} height={14} />
                </span>
                <span className="pg-blog-post__author">{post.author ?? defaultAuthor}</span>
              </span>
              <span className="pg-blog-post__meta">
                <time dateTime={post.date}>{formatDate(post.date, copy)}</time>
                <span className="pg-blog-post__dot" aria-hidden="true" />
                <span>{fill(copy.meta.readingTime, { n: readingMinutes(post) })}</span>
              </span>
              {lang ? (
                <span className="ds-tag ds-tag--neutral">{copy.post.languageNote}</span>
              ) : null}
            </div>
            <div className="pg-blog-post__cover">
              <BlogCover post={post} placement="article" workflowLabel={copy.post.workflow} lang={lang} />
            </div>
          </div>
        </section>

        <div className="pg-blog-post__main">
          <div className="ds-container ds-grid">
            <div className="pg-blog-post__body" lang={lang}>
              <ArticleBody post={post} ids={ids} copy={copy} uiLang={lang ? 'zh-CN' : undefined} />
            </div>
            {toc.length >= 3 ? (
              <aside className="pg-blog-post__aside">
                <Toc entries={toc} copy={copy} lang={lang} />
              </aside>
            ) : null}
          </div>
        </div>
      </article>

      <section
        id="related"
        className="ds-section ds-section--paper pg-blog__posts"
        aria-labelledby="related-title"
      >
        <div className="ds-container">
          <SectionHead
            titleId="related-title"
            eyebrow={copy.post.relatedEyebrow}
            title={copy.post.relatedTitle}
            actions={<TextLink href="/blog">{copy.post.allPosts}</TextLink>}
            className="pg-blog__posts-head"
          />
          <div className="ds-grid pg-blog__grid">
            {relatedPosts(post).map((related) => (
              <BlogCard key={related.slug} post={related} locale={locale} copy={copy} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  )
}

/** Sticky "On this page" list; highlights the section being read. */
function Toc({
  entries,
  copy,
  lang,
}: {
  entries: Array<{ id: string; label: string }>
  copy: BlogPageCopy
  lang?: string
}) {
  const [active, setActive] = useState<string | null>(null)
  const idKey = entries.map((entry) => entry.id).join(' ')

  useEffect(() => {
    const headings = idKey
      .split(' ')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!headings.length) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      let current: string | null = null
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) current = heading.id
        else break
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [idKey])

  return (
    <nav className="pg-blog-toc" aria-labelledby="toc-title">
      <p className="pg-blog-toc__title" id="toc-title">
        {copy.post.onThisPage}
      </p>
      <ol className="pg-blog-toc__list" lang={lang}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              className={cx('pg-blog-toc__link', active === entry.id && 'is-active')}
              href={`#${entry.id}`}
              aria-current={active === entry.id ? 'location' : undefined}
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function NotFound({ locale, copy }: { locale: Locale; copy: BlogPageCopy }) {
  return (
    <>
      <PageHero
        id="not-found"
        align="left"
        eyebrow={copy.notFound.eyebrow}
        title={copy.notFound.title}
        lead={copy.notFound.lead}
        actions={
          <ButtonLink href="/blog" variant="primary" arrow>
            {copy.notFound.back}
          </ButtonLink>
        }
      />
      <section
        id="latest"
        className="ds-section ds-section--paper pg-blog__posts"
        aria-labelledby="latest-title"
      >
        <div className="ds-container">
          <SectionHead
            titleId="latest-title"
            eyebrow={copy.notFound.latestEyebrow}
            title={copy.notFound.latestTitle}
            className="pg-blog__posts-head"
          />
          <div className="ds-grid pg-blog__grid">
            {variedPosts(postsByDate, 3).map((post) => (
              <BlogCard key={post.slug} post={post} locale={locale} copy={copy} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
