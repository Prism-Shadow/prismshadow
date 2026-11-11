import { useEffect } from 'react'
import type { Locale } from '../i18n'
import { applyDocumentMetadata } from './applyMeta'
import type { SeoMetadata } from './routes'

/**
 * During static prerendering (no window, effects never run) the page's
 * metadata is recorded here so the prerenderer can write it into <head>.
 */
let recorded: SeoMetadata | null = null

const recordForPrerender = (metadata: SeoMetadata) => {
  recorded = metadata
}

export const prerenderMetadata = {
  reset() {
    recorded = null
  },
  take(): SeoMetadata | null {
    const metadata = recorded
    recorded = null
    return metadata
  },
}

/**
 * Apply page-specific metadata (title, description, canonical, OG) from inside a
 * page component. Use it only for routes App marks as `dynamicSeo`; every other
 * route gets its metadata from `routeSeoMetadata` automatically.
 */
export function usePageMetadata(metadata: SeoMetadata | null, pathname: string, locale: Locale) {
  if (typeof window === 'undefined' && metadata) recordForPrerender(metadata)
  const key = metadata ? `${metadata.title}|${metadata.description}|${metadata.canonicalPath ?? ''}` : ''
  useEffect(() => {
    if (metadata) applyDocumentMetadata(metadata, pathname, locale)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, pathname, locale])
}
