import type { ProductId } from '../../../i18n/messages/shared'

/**
 * Square product marks for dark surfaces. PenguinHarness and LlamaFactory ship as
 * white rounded tiles; the Panofy glyph is light-on-transparent and sits on a dark tile.
 */
export const productMarks: Record<ProductId, { src: string; tile: 'self' | 'dark' }> = {
  'penguin-harness': { src: '/products/penguin-harness/penguin-logo.svg', tile: 'self' },
  panofy: { src: '/products/panofy-logo-light.png', tile: 'dark' },
  'llama-factory': { src: '/products/llama-factory-mark.png', tile: 'self' },
}
