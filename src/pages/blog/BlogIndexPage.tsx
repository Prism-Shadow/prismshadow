import { useState } from 'react'
import type { BlogTopic } from '../../content/blogPosts'
import { blogPageCopy } from '../../i18n/messages/blog'
import { CtaBand, SectionHead } from '../../components/site/ui'
import { renderAccent } from '../../components/site/utils'
import type { PageProps } from '../types'
import { BlogCard } from './BlogCard'
import { featuredPosts, fill, gridPosts, topicLabel, topicOrder } from './blogData'
import './blog.css'

type TopicFilter = BlogTopic | 'all'

const gridTopics = topicOrder.filter((topic) => gridPosts.some((post) => post.topic === topic))
const topicCount = (topic: TopicFilter) =>
  topic === 'all' ? gridPosts.length : gridPosts.filter((post) => post.topic === topic).length

export function BlogIndexPage({ locale }: PageProps) {
  const copy = blogPageCopy[locale]
  const [topic, setTopic] = useState<TopicFilter>('all')
  const visible = topic === 'all' ? gridPosts : gridPosts.filter((post) => post.topic === topic)

  return (
    <div className="pg-blog pg-blog--index">
      <section id="blog" className="pg-blog__hero" aria-labelledby="blog-title">
        <div className="ds-container">
          <SectionHead
            as="h1"
            titleId="blog-title"
            eyebrow={copy.index.eyebrow}
            title={renderAccent(copy.index.title, copy.index.titleAccent)}
            lead={copy.index.lead}
            className="pg-blog__head"
          />

          <div className="pg-blog__featured">
            <h2 className="pg-blog__rule-label" id="featured-title">
              {copy.index.featuredLabel}
            </h2>
            <div className="ds-grid pg-blog__featured-grid">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} locale={locale} copy={copy} featured />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="posts"
        className="ds-section ds-section--paper pg-blog__posts"
        aria-labelledby="posts-title"
      >
        <div className="ds-container">
          <SectionHead
            titleId="posts-title"
            eyebrow={copy.index.postsEyebrow}
            title={copy.index.postsTitle}
            lead={copy.index.postsLead}
            className="pg-blog__posts-head"
          />

          <div className="pg-blog__filters" role="group" aria-label={copy.index.filterLabel}>
            {(['all', ...gridTopics] as TopicFilter[]).map((id) => (
              <button
                key={id}
                type="button"
                className="pg-blog__filter"
                aria-pressed={topic === id}
                aria-controls="posts-grid"
                onClick={() => setTopic(id)}
              >
                {id === 'all' ? copy.index.filterAll : topicLabel(id, locale, copy)}
                <span className="pg-blog__filter-count">{topicCount(id)}</span>
              </button>
            ))}
          </div>
          <p className="ds-sr-only" aria-live="polite">
            {fill(copy.index.showing, { n: visible.length })}
          </p>

          <div className="ds-grid pg-blog__grid" id="posts-grid">
            {visible.map((post) => (
              <BlogCard key={post.slug} post={post} locale={locale} copy={copy} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </div>
  )
}
