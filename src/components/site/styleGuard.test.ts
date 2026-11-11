/// <reference types="node" />
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Site-wide design rules that must hold in every stylesheet (read from disk:
// `?raw` CSS imports are empty under vitest).
const cssFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name: string) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return cssFiles(path)
    return name.endsWith('.css') ? [path] : []
  })

const files = cssFiles(join(process.cwd(), 'src'))

describe('style guard', () => {
  it.each(files)('%s never uses bold type (max weight 500)', (file) => {
    const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
    expect(css).not.toMatch(/font-weight\s*:\s*(600|700|800|900|bold|bolder)\b/)
  })
})
