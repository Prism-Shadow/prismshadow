// Write one static HTML file per route into dist/ (run after `vite build` and
// `vite build --ssr src/prerender.tsx --outDir dist-prerender`).
//
// GitHub Pages resolves /platform to platform.html, so every route works as a
// direct link without SPA rewrites. A route that is also a folder (/blog has
// /blog/<post>) gets folder/index.html too, in case /blog is redirected to
// /blog/. 404.html is the plain app shell: unknown URLs still load the app.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { prerenderAll } = await import(join(root, 'dist-prerender', 'prerender.js'))

const template = await readFile(join(dist, 'index.html'), 'utf8')
await writeFile(join(dist, '404.html'), template)

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

function fill(page) {
  let html = template
  const replace = (pattern, value) => {
    if (!pattern.test(html)) throw new Error(`index.html is missing ${pattern}`)
    // Function replacements: page text may contain "$", which a string
    // replacement would treat as a capture-group reference.
    html = html.replace(pattern, (_match, before, after) => `${before}${escapeHtml(value)}${after ?? ''}`)
  }
  const meta = (attr, key) => new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)
  const { head } = page

  replace(/(<title>)[^<]*(<\/title>)/, head.title)
  replace(meta('name', 'description'), head.description)
  replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, head.canonicalUrl)
  replace(meta('property', 'og:title'), head.title)
  replace(meta('property', 'og:description'), head.description)
  replace(meta('property', 'og:url'), head.canonicalUrl)
  replace(meta('property', 'og:image'), head.socialImageUrl)
  replace(meta('property', 'og:image:alt'), head.socialImageAlt)
  replace(meta('name', 'twitter:title'), head.title)
  replace(meta('name', 'twitter:description'), head.description)
  replace(meta('name', 'twitter:image'), head.socialImageUrl)

  if (!html.includes('<div id="root"></div>')) throw new Error('index.html is missing the empty #root')
  return html.replace('<div id="root"></div>', () => `<div id="root">${page.html}</div>`)
}

const pages = await prerenderAll()
const paths = pages.map((page) => page.pathname)
let files = 0

for (const page of pages) {
  const html = fill(page)
  const rel = page.pathname.slice(1)
  const targets = page.pathname === '/' ? ['index.html'] : [`${rel}.html`]
  if (page.pathname !== '/' && paths.some((p) => p.startsWith(`${page.pathname}/`))) {
    targets.push(`${rel}/index.html`)
  }
  for (const target of targets) {
    const file = join(dist, target)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
    files += 1
  }
}

console.log(`prerendered ${pages.length} routes into ${files} HTML files (+ 404.html)`)
