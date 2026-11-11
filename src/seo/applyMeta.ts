import type { Locale } from '../i18n'
import type { SeoMetadata } from './routes'
import {
  defaultSocialImage,
  siteName,
  siteUrl,
} from './site'

const toAbsoluteUrl = (pathOrUrl: string) => {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl
  }

  return new URL(pathOrUrl, siteUrl).toString()
}

const ensureMeta = (
  attribute: 'name' | 'property',
  key: string,
): HTMLMetaElement => {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  return element
}

const ensureLink = (rel: string): HTMLLinkElement => {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  return element
}

export const applyDocumentMetadata = (
  metadata: SeoMetadata,
  pathname: string,
  locale: Locale,
) => {
  const canonicalUrl = toAbsoluteUrl(metadata.canonicalPath ?? pathname)
  const socialImageUrl = toAbsoluteUrl(metadata.image ?? defaultSocialImage)

  document.title = metadata.title

  ensureMeta('name', 'description').content = metadata.description
  ensureLink('canonical').href = canonicalUrl

  ensureMeta('property', 'og:site_name').content = siteName
  ensureMeta('property', 'og:type').content = 'website'
  ensureMeta('property', 'og:title').content = metadata.title
  ensureMeta('property', 'og:description').content = metadata.description
  ensureMeta('property', 'og:url').content = canonicalUrl
  ensureMeta('property', 'og:image').content = socialImageUrl
  ensureMeta('property', 'og:image:alt').content =
    `${siteName} enterprise AI agent runtime`
  ensureMeta('property', 'og:locale').content =
    locale === 'zh' ? 'zh_CN' : 'en_US'

  ensureMeta('name', 'twitter:card').content = 'summary_large_image'
  ensureMeta('name', 'twitter:title').content = metadata.title
  ensureMeta('name', 'twitter:description').content = metadata.description
  ensureMeta('name', 'twitter:image').content = socialImageUrl
}
