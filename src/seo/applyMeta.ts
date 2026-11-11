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

export type HeadMetadata = {
  title: string
  description: string
  canonicalUrl: string
  socialImageUrl: string
  socialImageAlt: string
  ogLocale: string
}

/** Resolve page metadata into the exact values written to <head>. */
export const buildHeadMetadata = (
  metadata: SeoMetadata,
  pathname: string,
  locale: Locale,
): HeadMetadata => ({
  title: metadata.title,
  description: metadata.description,
  canonicalUrl: toAbsoluteUrl(metadata.canonicalPath ?? pathname),
  socialImageUrl: toAbsoluteUrl(metadata.image ?? defaultSocialImage),
  socialImageAlt: `${siteName}: the self-evolving AI platform for enterprise`,
  ogLocale: locale === 'zh' ? 'zh_CN' : 'en_US',
})

export const applyDocumentMetadata = (
  metadata: SeoMetadata,
  pathname: string,
  locale: Locale,
) => {
  const head = buildHeadMetadata(metadata, pathname, locale)

  document.title = head.title

  ensureMeta('name', 'description').content = head.description
  ensureLink('canonical').href = head.canonicalUrl

  ensureMeta('property', 'og:site_name').content = siteName
  ensureMeta('property', 'og:type').content = 'website'
  ensureMeta('property', 'og:title').content = head.title
  ensureMeta('property', 'og:description').content = head.description
  ensureMeta('property', 'og:url').content = head.canonicalUrl
  ensureMeta('property', 'og:image').content = head.socialImageUrl
  ensureMeta('property', 'og:image:alt').content = head.socialImageAlt
  ensureMeta('property', 'og:locale').content = head.ogLocale

  ensureMeta('name', 'twitter:card').content = 'summary_large_image'
  ensureMeta('name', 'twitter:title').content = head.title
  ensureMeta('name', 'twitter:description').content = head.description
  ensureMeta('name', 'twitter:image').content = head.socialImageUrl
}
