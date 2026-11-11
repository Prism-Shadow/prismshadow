import { describe, expect, it } from 'vitest'
import { blogPosts } from '../../content/blogPosts'
import { locales } from '../../i18n'
import { blogPageCopy } from '../../i18n/messages/blog'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../test/pageChecks'
import { BlogIndexPage } from './BlogIndexPage'
import { BlogPostPage } from './BlogPostPage'
import { coverCells, coverGeometry, featuredPosts, gridPosts, headingIds, readingMinutes } from './blogData'

const count = (html: string, pattern: RegExp) => html.match(pattern)?.length ?? 0

/** React escapes text; compare against the escaped form. */
const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')

describe('blog copy', () => {
  it('zh has the same shape as en and no empty strings', () => {
    expect(copyShape(blogPageCopy.zh)).toEqual(copyShape(blogPageCopy.en))
    for (const locale of locales)
      for (const [path, value] of collectStrings(blogPageCopy[locale]))
        expect(value.trim(), `${locale}.${path}`).not.toBe('')
  })
})

describe('blog data', () => {
  it('has unique slugs under /blog/ and a cover for every post', () => {
    const slugs = blogPosts.map((post) => post.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const post of blogPosts) {
      expect(post.slug).toMatch(/^\/blog\/[a-z0-9-]+$/)
      if (post.visualImage) expect(post.visualImage.src).toMatch(/^\/blog-assets\//)
      else expect(coverCells(post, coverGeometry.compact).length).toBeGreaterThan(10)
      expect(readingMinutes(post)).toBeGreaterThan(0)
    }
  })

  it('splits every post between featured and the grid', () => {
    expect(featuredPosts).toHaveLength(2)
    expect(featuredPosts.length + gridPosts.length).toBe(blogPosts.length)
  })

  it('gives every section heading a unique anchor id', () => {
    for (const post of blogPosts) {
      const ids = headingIds(post).filter(Boolean)
      expect(new Set(ids).size, post.slug).toBe(ids.length)
    }
  })
})

describe.each(locales)('blog index (%s)', (locale) => {
  const html = renderHtml(<BlogIndexPage locale={locale} />)

  it('passes the page basics', () => {
    expectPageBasics(html)
  })

  it('renders the featured posts, every other post and the filter', () => {
    expect(html).toContain('id="blog"')
    expect(html).toContain('id="posts"')
    for (const post of blogPosts) expect(html, post.slug).toContain(`href="${post.slug}"`)
    expect(count(html, /class="pg-blog-card(?: |")/g)).toBe(blogPosts.length)
    expect(count(html, /class="pg-blog__filter"/g)).toBeGreaterThan(5)
    expect(html).toContain('aria-pressed="true"')
    expect(html).toContain(blogPageCopy[locale].index.featuredLabel)
  })

  it('marks the covers for the motion system', () => {
    // Featured media rise in; every grid cover fades its field (or image) in;
    // code-built covers carry a seeded wave and a few live cells, empty at rest.
    expect(count(html, /class="pg-blog-card__media" data-animate=""/g)).toBe(featuredPosts.length)
    expect(count(html, /class="pg-blog-cover__(?:field|image)"[^>]*data-animate="custom"/g)).toBe(gridPosts.length)
    const codeCovers = gridPosts.filter((post) => !post.visualImage).length
    expect(count(html, /data-wave="(?:dim|outline|solid)"/g)).toBeGreaterThan(codeCovers * 10)
    const live = html.match(/<rect class="pg-blog-cover__live"[^>]*>/g) ?? []
    expect(live.length).toBeGreaterThan(codeCovers * 4)
    for (const cell of live) expect(cell).toContain('fill-opacity="0"')
  })
})

describe.each(locales)('blog posts (%s)', (locale) => {
  it.each(blogPosts.map((post) => [post.slug, post] as const))('%s', (slug, post) => {
    const html = renderHtml(<BlogPostPage locale={locale} slug={slug} />)
    expectPageBasics(html)
    expect(html).toContain('id="post-title"')
    expect(html).toContain(escapeHtml(post.title))
    expect(html).toContain('id="related"')
    expect(count(html, /class="pg-blog-card(?: |")/g)).toBe(3)

    // Every section heading, paragraph, list item and image survives.
    for (const section of post.content) {
      if (section.heading) expect(html).toContain(escapeHtml(section.heading))
      for (const paragraph of section.body ?? []) expect(html).toContain(escapeHtml(paragraph))
      for (const item of section.bullets ?? []) expect(html).toContain(escapeHtml(item))
      for (const link of section.links ?? []) expect(html).toContain(`href="${link.href}"`)
      for (const block of section.blocks ?? []) {
        if (block.type === 'image') expect(html).toContain(`src="${block.src}"`)
        else if (block.type === 'code') expect(html).toContain(escapeHtml(block.lines[0]))
        else expect(html).toContain(escapeHtml(block.text))
      }
      for (const row of section.table?.rows ?? []) for (const cell of row) expect(html).toContain(escapeHtml(cell))
    }
    for (const step of post.visualSteps ?? []) expect(html).toContain(escapeHtml(step))
    if (locale === 'zh') expect(html).toContain('lang="en"')

    // Only the cover moves: it carries the motion hook, the prose does not.
    expect(html).toMatch(/class="pg-blog-cover__(?:field pg-blog-cover__field--wide|image)"[^>]*data-animate="custom"/)
    const prose = html.slice(html.indexOf('class="pg-blog-post__main"'), html.indexOf('id="related"'))
    expect(prose).not.toContain('data-animate')
  })

  it('accepts a trailing slash in the pathname', () => {
    const html = renderHtml(<BlogPostPage locale={locale} slug={`${blogPosts[0].slug}/`} />)
    expect(html).toContain(escapeHtml(blogPosts[0].title))
  })

  it('renders a friendly not-found state for an unknown slug', () => {
    const html = renderHtml(<BlogPostPage locale={locale} slug="/blog/does-not-exist" />)
    expectPageBasics(html)
    expect(html).toContain('id="not-found"')
    expect(html).toContain(escapeHtml(blogPageCopy[locale].notFound.title))
    expect(html).toMatch(/<a class="ds-btn[^"]*" href="\/blog"/)
  })
})
