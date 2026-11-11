import { describe, expect, it } from 'vitest'
import { departmentOrder } from '../../../components/site/navigation'
import { departmentVisuals } from '../../../content/departments'
import { locales } from '../../../i18n'
import { departmentsPageCopy } from '../../../i18n/messages/departments'
import { createDepartmentSeo } from '../../../seo'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../../test/pageChecks'
import { DepartmentsPage } from '../DepartmentsPage'

/** Match how React escapes text in server-rendered HTML. */
const esc = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;')

const count = (html: string, pattern: RegExp) => html.match(pattern)?.length ?? 0
/** Rendered text without tags, and copy without its zh phrase-break markers. */
const plain = (html: string) => html.replace(/<[^>]+>/g, '')
const unmark = (text: string) => esc(text.replaceAll('\u200B', ''))

describe('departments copy', () => {
  it('zh has the same shape as en and no empty strings', () => {
    expect(copyShape(departmentsPageCopy.zh)).toEqual(copyShape(departmentsPageCopy.en))
    for (const locale of locales)
      for (const [path, value] of collectStrings(departmentsPageCopy[locale]))
        expect(value.trim(), `${locale}.${path}`).not.toBe('')
  })

  it.each(locales)('covers all eight departments in full (%s)', (locale) => {
    const solutions = departmentsPageCopy[locale].solutions
    expect(Object.keys(solutions).sort()).toEqual([...departmentOrder].sort())
    for (const id of departmentOrder) {
      const s = solutions[id]
      expect(s.sections, id).toHaveLength(4)
      expect(s.agent.files, id).toHaveLength(5)
      expect(s.agent.tasks, id).toHaveLength(5)
      expect(s.mock.items.length, id).toBeGreaterThanOrEqual(3)
    }
  })

  it('uses zh phrase-break markers only in zh copy', () => {
    expect(JSON.stringify(departmentsPageCopy.en)).not.toContain('​')
  })

  it('has a visual config for every mock row', () => {
    for (const id of departmentOrder) {
      const rows = departmentsPageCopy.en.solutions[id].mock.items.length
      const v = departmentVisuals[id]
      expect(v.tones, id).toHaveLength(rows)
      expect(v.levels, id).toHaveLength(rows)
      if (v.mock === 'calendar') expect(v.cells, id).toHaveLength(rows)
    }
  })

  it.each(locales)('builds detail-page metadata for every department (%s)', (locale) => {
    for (const id of departmentOrder) {
      const s = departmentsPageCopy[locale].solutions[id]
      const meta = createDepartmentSeo({ id, label: s.label, headline: s.headline, subtitle: s.subtitle }, locale)
      expect(meta.canonicalPath).toBe(`/solutions/departments/${id}`)
      expect(meta.title).toContain(s.label)
      expect(meta.description).toBe(s.subtitle)
    }
  })
})

describe.each(locales)('departments overview (%s)', (locale) => {
  const t = departmentsPageCopy[locale]
  const html = renderHtml(<DepartmentsPage locale={locale} departmentId={null} pathname="/solutions/departments" />)

  it('passes the page basics', () => {
    expectPageBasics(html)
  })

  it('renders its sections', () => {
    for (const id of ['hero', 'departments', 'how-it-works', 'get-started'])
      expect(html).toContain(`id="${id}"`)
  })

  it('has one tab and one panel per department, each linking to its page', () => {
    expect(count(html, /role="tab"/g)).toBe(departmentOrder.length)
    expect(count(html, /role="tabpanel"/g)).toBe(departmentOrder.length)
    expect(count(html, /aria-selected="true"/g)).toBe(1)
    for (const id of departmentOrder) {
      expect(html).toContain(`href="/solutions/departments/${id}"`)
      expect(plain(html)).toContain(unmark(t.solutions[id].headline))
      expect(plain(html)).toContain(unmark(t.solutions[id].agent.question))
    }
  })

  it('keeps zh heading phrases together and leaves en untouched', () => {
    if (locale === 'zh') expect(html).toContain('class="pg-phrase"')
    else expect(html).not.toContain('pg-phrase')
  })

  it('explains the training steps', () => {
    expect(t.overview.how.steps).toHaveLength(3)
    for (const step of t.overview.how.steps) expect(html).toContain(esc(step.title))
  })

  it('uses no photos', () => {
    expect(html).not.toMatch(/<img\b/)
    expect(html).not.toMatch(/pose-v\d|\/solutions\/[a-z-]+\.png/)
  })
})

describe.each(locales)('department detail pages (%s)', (locale) => {
  const t = departmentsPageCopy[locale]

  it.each(departmentOrder)('%s', (id) => {
    const s = t.solutions[id]
    const html = renderHtml(
      <DepartmentsPage locale={locale} departmentId={id} pathname={`/solutions/departments/${id}`} />,
    )

    expectPageBasics(html)
    for (const section of ['hero', 'approach', 'agent', 'get-started'])
      expect(html).toContain(`id="${section}"`)

    expect(plain(html)).toContain(unmark(s.headline))
    expect(html).toContain(esc(s.subtitle))
    expect(count(html, /class="pg-departments__row"/g)).toBe(s.sections.length)
    for (const section of s.sections) {
      expect(html).toContain(esc(section.title))
      expect(html).toContain(esc(section.body))
    }

    expect(html).toContain(esc(s.agent.role))
    expect(plain(html)).toContain(unmark(s.agent.question))
    for (const file of s.agent.files) expect(html).toContain(esc(file))
    for (const task of s.agent.tasks) expect(html).toContain(esc(task.body))

    // Switcher: real links to every department, the current one marked.
    for (const other of departmentOrder) expect(html).toContain(`href="/solutions/departments/${other}"`)
    expect(count(html, /aria-current="page"/g)).toBe(1)
    expect(html).toMatch(new RegExp(`href="/solutions/departments/${id}" aria-current="page"`))

    expect(html).not.toMatch(/<img\b/)
  })
})
