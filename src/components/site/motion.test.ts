/// <reference types="node" />
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Read stylesheets from disk: under vitest, `?raw` CSS imports come back empty.
const cssFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name: string) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return cssFiles(path)
    return name.endsWith('.css') ? [path] : []
  })

const files = cssFiles(join(process.cwd(), 'src'))

// Every animation must be gated on html[data-motion], so no-JS visitors,
// reduced motion and the prerendered HTML always show the final, static state.
describe('motion contract', () => {
  it('reads real stylesheets', () => {
    expect(files.length).toBeGreaterThan(10)
    expect(readFileSync(files[0], 'utf8').length).toBeGreaterThan(0)
  })

  it.each(files)('%s only animates under html[data-motion]', (file) => {
    const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
    for (const block of css.split('}')) {
      if (!/(^|[\s;{])animation\s*:/.test(block)) continue
      // The innermost selector (rules may sit inside @media blocks).
      const head = block.slice(0, block.lastIndexOf('{'))
      const selector = head.slice(head.lastIndexOf('{') + 1).trim()
      const allowed =
        /html\[data-motion\]/.test(selector) ||
        /::view-transition/.test(selector) ||
        /\.ds-page\[data-enter\]/.test(selector) ||
        /\.ds-progress/.test(selector) ||
        /animation\s*:\s*none/.test(block)
      expect(allowed, `${file}\n  ${selector}`).toBe(true)
    }
  })
})
