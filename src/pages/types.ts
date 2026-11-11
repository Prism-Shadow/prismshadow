import type { Locale } from '../i18n'

/** Props every page component receives. Pages render sections only; App owns <main>, header and footer. */
export type PageProps = { locale: Locale }
