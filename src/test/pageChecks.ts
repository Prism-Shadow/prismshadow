import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect } from 'vitest'

/** Server-render a page or section to HTML (no DOM needed). */
export const renderHtml = (node: ReactElement) => renderToString(node)

/**
 * Baseline checks every page must pass in both locales:
 * exactly one <h1>, alt text on every image, and no leaked placeholders.
 */
export function expectPageBasics(html: string, { h1 = 1 }: { h1?: number } = {}) {
  expect(html.match(/<h1[\s>]/g)?.length ?? 0, 'number of <h1>').toBe(h1)
  const imgs = html.match(/<img\b[^>]*>/g) ?? []
  for (const img of imgs) expect(img, 'every <img> needs an alt attribute').toMatch(/\salt="/)
  expect(html).not.toMatch(/>\s*(undefined|null|NaN)\s*</)
  expect(html).not.toContain('[object Object]')
}

/** Collect every string leaf of a copy object (to assert nothing is empty). */
export function collectStrings(value: unknown, path = '', out: Array<[string, string]> = []) {
  if (typeof value === 'string') out.push([path, value])
  else if (Array.isArray(value)) value.forEach((v, i) => collectStrings(v, `${path}[${i}]`, out))
  else if (value && typeof value === 'object')
    for (const [k, v] of Object.entries(value)) collectStrings(v, path ? `${path}.${k}` : k, out)
  return out
}

/** Shape of a copy object: keys and array lengths, ignoring string values. */
export function copyShape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(copyShape)
  if (value && typeof value === 'object')
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, copyShape(v)]))
  return typeof value
}
