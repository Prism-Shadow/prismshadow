// Shared i18n entry. Page copy is imported directly from its own file under
// ./messages/ (so each page chunk only bundles its own strings); only the
// locale setup, the shared site copy and the homepage copy are re-exported here.
export { defaultLocale, localeStorageKey, locales } from './locales'
export type { Locale } from './locales'
export { siteText } from './messages/shared'
export type { DepartmentId, IndustryId, ProductId, SharedMessages } from './messages/shared'
export { homePageCopy } from './messages/home'
export type * from './messages/home'
