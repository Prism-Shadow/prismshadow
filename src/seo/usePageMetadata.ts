import { useEffect } from 'react'
import type { Locale } from '../i18n'
import { applyDocumentMetadata } from './applyMeta'
import type { SeoMetadata } from './routes'

/**
 * Apply page-specific metadata (title, description, canonical, OG) from inside a
 * page component. Use it only for routes App marks as `dynamicSeo`; every other
 * route gets its metadata from `routeSeoMetadata` automatically.
 */
export function usePageMetadata(metadata: SeoMetadata | null, pathname: string, locale: Locale) {
  const key = metadata ? `${metadata.title}|${metadata.description}|${metadata.canonicalPath ?? ''}` : ''
  useEffect(() => {
    if (metadata) applyDocumentMetadata(metadata, pathname, locale)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, pathname, locale])
}
