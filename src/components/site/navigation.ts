import { siteText, type Locale } from '../../i18n'
import type { DepartmentId, IndustryId, ProductId } from '../../i18n/messages/shared'

export type NavLink = {
  label: string
  href: string
  description?: string
  external?: boolean
}

export const productOrder: ProductId[] = ['penguin-harness', 'panofy', 'llama-factory']

export const productPaths: Record<ProductId, string> = {
  'penguin-harness': '/product/penguin-harness',
  panofy: '/product/panofy',
  'llama-factory': '/product/llama-factory',
}

export const productLogos: Record<ProductId, string> = {
  'penguin-harness': '/products/penguin-harness/penguin-logo.svg',
  panofy: '/products/panofy-logo-light.png',
  'llama-factory': '/products/llama-factory-mark.png',
}

export const departmentOrder: DepartmentId[] = [
  'customer-support',
  'sales',
  'marketing',
  'data',
  'hr',
  'legal',
  'engineering',
  'operations',
]

export const departmentsPath = '/solutions/departments'

export const getDepartmentPath = (id: DepartmentId) => `${departmentsPath}/${id}`

export const industryOrder: IndustryId[] = [
  'b2b-saas',
  'financial-services',
  'retail',
  'travel',
  'healthcare',
  'supply-chain',
  'restaurants',
  'auto-dealerships',
]

export const getIndustryPath = (id: IndustryId) => `/solutions/industries/${id}`

export const docsUrl = 'https://docs.panofy.ai/en-US/getting-started/panofy-tutorial'

export const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Prism-Shadow' },
  { id: 'x', label: 'X', href: 'https://x.com/prismshadow_ai' },
  { id: 'discord', label: 'Discord', href: 'https://discord.com/invite/g5tFcYxkG2' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@panofy_ai' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/prismshadow/' },
] as const

export function getProductLinks(locale: Locale): NavLink[] {
  const t = siteText[locale].products
  return productOrder.map((id) => ({
    label: t[id].name,
    description: t[id].description,
    href: productPaths[id],
  }))
}

export function getDepartmentLinks(locale: Locale): NavLink[] {
  const t = siteText[locale].departments
  return departmentOrder.map((id) => ({ label: t[id], href: getDepartmentPath(id) }))
}

export function getIndustryLinks(locale: Locale): NavLink[] {
  const t = siteText[locale].industries
  return industryOrder.map((id) => ({ label: t[id], href: getIndustryPath(id) }))
}

export function getResourceLinks(locale: Locale): NavLink[] {
  const t = siteText[locale].resources
  return [
    { label: t.blog.name, description: t.blog.description, href: '/blog' },
    {
      label: t.useCaseLibrary.name,
      description: t.useCaseLibrary.description,
      href: '/resources/use-case-library',
    },
    {
      label: t.agentMarketplace.name,
      description: t.agentMarketplace.description,
      href: '/resources/agent-marketplace',
    },
    { label: t.docs.name, description: t.docs.description, href: docsUrl, external: true },
  ]
}

export const platformPath = '/platform'

export function getCompanyLinks(locale: Locale): NavLink[] {
  const t = siteText[locale].company
  return [
    { label: t.about.name, description: t.about.description, href: '/about' },
    { label: t.people.name, description: t.people.description, href: '/people' },
    { label: t.customers.name, description: t.customers.description, href: '/customers' },
    { label: t.security.name, description: t.security.description, href: '/security' },
    { label: t.contact.name, description: t.contact.description, href: '/contact' },
  ]
}

export type FooterColumn = { title: string; links: NavLink[] }

export function getFooterColumns(locale: Locale): FooterColumn[] {
  const t = siteText[locale]
  return [
    {
      title: t.footer.products,
      links: [
        { label: t.footer.platform, href: platformPath },
        ...getProductLinks(locale).map(stripDescription),
      ],
    },
    {
      title: t.footer.departments,
      links: [
        { label: t.nav.allDepartments, href: departmentsPath },
        ...getDepartmentLinks(locale).slice(0, 6),
      ],
    },
    { title: t.footer.industries, links: getIndustryLinks(locale) },
    { title: t.footer.resources, links: getResourceLinks(locale).map(stripDescription) },
    { title: t.footer.company, links: getCompanyLinks(locale).map(stripDescription) },
  ]
}

const stripDescription = ({ label, href, external }: NavLink): NavLink => ({ label, href, external })
