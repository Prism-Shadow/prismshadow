import type { BlogPost, BlogTopic } from '../../content/blogPosts'
import type { Locale } from '../../i18n'
import type { BlogPageCopy } from '../../i18n/messages/blog'
import { cx } from '../../components/site/utils'
import { BlogCover } from './BlogCover'
import { contentLang, formatDate, localizePost, topicLabel, topicTone } from './blogData'

/** Small colored topic tag (tinted in the topic's spectrum tone). */
export function TopicTag({
  topic,
  locale,
  copy,
}: {
  topic: BlogTopic
  locale: Locale
  copy: BlogPageCopy
}) {
  return (
    <span className="pg-blog-tag" data-tone={topicTone[topic]}>
      {topicLabel(topic, locale, copy)}
    </span>
  )
}

/**
 * Modal-style post card: visual on top, title, excerpt, then tag and date
 * pinned to the bottom so they line up across a row. The whole card is the
 * link (stretched from the title anchor).
 *
 * Motion: featured media rise in with the default reveal; grid covers fade
 * their content in and glint (BlogCover, blog.css). Text never moves.
 */
export function BlogCard({
  post: source,
  locale,
  copy,
  featured = false,
}: {
  post: BlogPost
  locale: Locale
  copy: BlogPageCopy
  featured?: boolean
}) {
  const post = localizePost(source, locale)
  return (
    <article className={cx('pg-blog-card', featured && 'pg-blog-card--featured')}>
      <div className="pg-blog-card__media" data-animate={featured ? '' : undefined}>
        <BlogCover post={post} placement={featured ? 'featured' : 'card'} />
      </div>
      <div className="pg-blog-card__body" lang={contentLang(locale, source)}>
        <h3 className="ds-h3 pg-blog-card__title">
          <a href={post.slug}>{post.title}</a>
        </h3>
        <p className="pg-blog-card__excerpt">{post.excerpt}</p>
      </div>
      <div className="pg-blog-card__foot">
        <TopicTag topic={post.topic} locale={locale} copy={copy} />
        <time className="pg-blog-card__date" dateTime={post.date}>
          {formatDate(post.date, copy)}
        </time>
      </div>
    </article>
  )
}
