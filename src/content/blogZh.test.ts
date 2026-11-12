import { describe, expect, it } from 'vitest'
import { blogPosts, type BlogContentSection, type BlogPost, type BlogPostZh } from './blogPosts'
import { blogPostsZh } from './blog-zh'

const CJK = /[一-鿿]/

/** Every string in a value, with its path. */
function strings(value: unknown, path = ''): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`))
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k))
  return []
}

/**
 * The structure a translation must keep: which fields exist, how many items
 * each list has, block types, heading levels, and everything that is not prose
 * (image sources and sizes, link targets, code).
 */
function sectionShape(section: BlogContentSection) {
  return {
    heading: section.heading !== undefined,
    level: section.level,
    kind: section.kind,
    body: section.body?.length,
    bullets: section.bullets?.length,
    table: section.table && {
      headers: section.table.headers.length,
      rows: section.table.rows.map((row) => row.length),
    },
    links: section.links?.map((link) => link.href),
    blocks: section.blocks?.map((block) => {
      if (block.type === 'image')
        return { type: block.type, src: block.src, width: block.width, height: block.height, caption: block.caption !== undefined }
      if (block.type === 'code') return { type: block.type, lines: block.lines }
      if (block.type === 'paragraph') return { type: block.type, lead: block.lead !== undefined }
      return { type: block.type }
    }),
  }
}

function postShape(post: BlogPost | BlogPostZh) {
  return {
    seoTitle: post.seoTitle !== undefined,
    metaDescription: post.metaDescription !== undefined,
    visualSteps: post.visualSteps?.length,
    visualImage: post.visualImage && { caption: post.visualImage.caption !== undefined },
    tags: post.tags?.length,
    content: post.content.map(sectionShape),
  }
}

describe('Chinese blog posts', () => {
  it('translate only posts that exist', () => {
    const slugs = new Set(blogPosts.map((post) => post.slug))
    for (const slug of Object.keys(blogPostsZh)) expect(slugs.has(slug), slug).toBe(true)
  })

  it('exist for every post', () => {
    const missing = blogPosts.filter((post) => !blogPostsZh[post.slug]).map((post) => post.slug)
    expect(missing).toEqual([])
  })

  describe.each(Object.entries(blogPostsZh))('%s', (slug, zh) => {
    const en = blogPosts.find((post) => post.slug === slug)

    it('mirrors the English structure exactly', () => {
      expect(en).toBeDefined()
      expect(postShape(zh)).toEqual(postShape(en!))
    })

    it('has no empty strings', () => {
      // Blank lines inside code blocks are part of the code (copied from the English).
      for (const [path, value] of strings(zh))
        if (!/\.lines\[\d+\]$/.test(path)) expect(value.trim(), path).not.toBe('')
    })

    it('is written in Chinese', () => {
      for (const text of [zh.title, zh.excerpt]) expect(text).toMatch(CJK)
      const prose = zh.content.flatMap((section) => [
        ...(section.body ?? []),
        ...(section.blocks ?? []).flatMap((block) => (block.type === 'paragraph' ? [block.text] : [])),
      ])
      expect(prose.length === 0 || prose.some((text) => CJK.test(text))).toBe(true)
    })

    it('keeps the brand names exact', () => {
      for (const [path, value] of strings(zh)) expect(value, path).not.toMatch(/LLaMA Factory|Prism Shadow/)
    })
  })
})
