import { describe, expect, it } from 'vitest'

// Every stylesheet in src, as raw text (Vite glob import, no Node APIs needed).
const stylesheets = import.meta.glob('/src/**/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// Every animation must be gated on html[data-motion], so no-JS visitors,
// reduced motion and the prerendered HTML always show the final, static state.
describe('motion contract', () => {
  it('finds the stylesheets', () => {
    expect(Object.keys(stylesheets).length).toBeGreaterThan(10)
  })

  it.each(Object.keys(stylesheets))('%s only animates under html[data-motion]', (file) => {
    const css = stylesheets[file].replace(/\/\*[\s\S]*?\*\//g, '')
    for (const block of css.split('}')) {
      if (!/(^|[\s;{])animation\s*:/.test(block)) continue
      const selector = block.slice(0, block.indexOf('{')).trim()
      const allowed =
        /html\[data-motion\]/.test(selector) ||
        /::view-transition/.test(selector) ||
        /\.ds-page\[data-enter\]/.test(selector) ||
        /\.ds-progress/.test(selector) ||
        /animation:\s*none/.test(block)
      expect(allowed, `${file}\n  ${selector}`).toBe(true)
    }
  })
})
