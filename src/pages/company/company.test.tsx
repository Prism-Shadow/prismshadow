import { describe, expect, it, vi } from 'vitest'
import { locales } from '../../i18n'
import { aboutPageCopy } from '../../i18n/messages/about'
import { contactPageCopy } from '../../i18n/messages/contact'
import { peoplePageCopy } from '../../i18n/messages/people'
import { securityPageCopy } from '../../i18n/messages/security'
import { siteText } from '../../i18n/messages/shared'
import { collectStrings, copyShape, expectPageBasics, renderHtml } from '../../test/pageChecks'
import { AboutPage } from './AboutPage'
import { ContactPage } from './ContactPage'
import { PeoplePage } from './PeoplePage'
import {
  buildMailtoHref,
  contactEmail,
  contactEndpoint,
  initialFormData,
  renderContactEmail,
  submitContactForm,
} from './contact/contactForm'
import { SecurityPage } from './SecurityPage'

/**
 * Visible text of server-rendered HTML: tags stripped (without inserting
 * spaces, so accent spans inside a heading keep its text intact), basic
 * entities decoded.
 */
const toText = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')

const plain = (line: string) => line.replace(/\*\*/g, '')

const copies = {
  people: peoplePageCopy,
  about: aboutPageCopy,
  security: securityPageCopy,
  contact: contactPageCopy,
}

describe.each(Object.entries(copies))('%s copy', (_name, copy) => {
  it('zh has the same shape as en', () => {
    expect(copyShape(copy.zh)).toEqual(copyShape(copy.en))
  })

  it('has no empty strings', () => {
    for (const locale of locales)
      for (const [path, value] of collectStrings(copy[locale]))
        expect(value.trim(), `${locale}.${path}`).not.toBe('')
  })
})

describe.each(locales)('people page (%s)', (locale) => {
  const copy = peoplePageCopy[locale]
  const html = renderHtml(<PeoplePage locale={locale} />)
  const text = toText(html)

  it('passes the page basics', () => {
    expectPageBasics(html)
  })

  it('renders every section', () => {
    for (const id of ['hero', 'founders', 'open-source', 'backgrounds', 'get-started'])
      expect(html).toContain(`id="${id}"`)
  })

  it('leads with the team behind LlamaFactory', () => {
    expect(text).toContain(copy.hero.title)
    expect(text).toContain(copy.hero.lead)
    expect(text).not.toContain('LLaMA Factory')
  })

  it('shows all three founders with photos, roles and every credential', () => {
    expect(copy.founders.people.map((f) => f.name)).toEqual(['Buyue Qian', 'Xuejun Wu', 'Yaowei Zheng'])
    expect(html.match(/class="pg-people-founder"/g)).toHaveLength(3)
    for (const founder of copy.founders.people) {
      expect(html).toContain(`src="${founder.photo}"`)
      expect(html).toContain(`alt="${founder.name}"`)
      expect(text).toContain(founder.name)
      expect(text).toContain(founder.role)
      expect(text).toContain(founder.affiliations.join(' · '))
      for (const line of founder.highlights) expect(text).toContain(plain(line))
    }
  })

  it('shows the four LlamaFactory numbers and links the repo', () => {
    expect(copy.openSource.stats.map((s) => s.value)).toEqual(['70K+', '3M+', '500+', '13K+'])
    for (const stat of copy.openSource.stats) {
      expect(text).toContain(stat.value)
      expect(text).toContain(stat.label)
    }
    expect(html).toContain('href="https://github.com/hiyouga/LlamaFactory"')
  })

  it('lists the open-source projects with their repos and product pages', () => {
    for (const name of ['LlamaFactory', 'EasyR1', 'PenguinHarness']) expect(text).toContain(name)
    for (const href of [
      'https://github.com/hiyouga/EasyR1',
      'https://github.com/Prism-Shadow/penguin-harness',
      '/product/llama-factory',
      '/product/penguin-harness',
    ])
      expect(html).toContain(`href="${href}"`)
  })

  it('keeps the founders’ background logos', () => {
    expect(copy.backgrounds.logos).toHaveLength(7)
    for (const logo of copy.backgrounds.logos) {
      expect(text).toContain(logo.name)
      if (logo.src) expect(html).toContain(`src="${logo.src}"`)
    }
  })

  it('opens external links in a new tab safely', () => {
    for (const tag of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? [])
      expect(tag).toContain('rel="noreferrer"')
  })
})

describe.each(locales)('about page (%s)', (locale) => {
  const copy = aboutPageCopy[locale]
  const html = renderHtml(<AboutPage locale={locale} />)
  const text = toText(html)

  it('passes the page basics', () => {
    expectPageBasics(html)
  })

  it('renders every section, without the sections that moved to People', () => {
    for (const id of ['hero', 'story', 'products', 'team', 'get-started'])
      expect(html).toContain(`id="${id}"`)
    for (const id of ['founders', 'backgrounds', 'open-source']) expect(html).not.toContain(`id="${id}"`)
  })

  it('leads with the platform positioning and the company story', () => {
    expect(text).toContain(copy.hero.lead)
    for (const stage of copy.loop.stages) expect(text).toContain(stage.name)
    expect(text).toContain(copy.story.eyebrow)
    for (const pillar of copy.story.pillars) expect(text).toContain(pillar.title)
  })

  it('links all three product pages', () => {
    for (const href of ['/product/penguin-harness', '/product/panofy', '/product/llama-factory'])
      expect(html).toContain(`href="${href}"`)
    for (const product of Object.values(siteText[locale].products)) expect(text).toContain(product.name)
  })

  it('points to the People page with a compact team teaser', () => {
    expect(html).toContain('href="/people"')
    expect(copy.team.link.href).toBe('/people')
    expect(copy.hero.secondaryCta.href).toBe('/people')
    expect(text).toContain(copy.team.title)
    expect(text).toContain(copy.team.stat.value)
    for (const founder of copy.team.founders) {
      expect(text).toContain(founder.name)
      expect(html).toContain(`src="${founder.photo}"`)
    }
  })
})

describe.each(locales)('security page (%s)', (locale) => {
  const copy = securityPageCopy[locale]
  const html = renderHtml(<SecurityPage locale={locale} />)
  const text = toText(html)

  it('passes the page basics', () => {
    expectPageBasics(html)
  })

  it('renders every section', () => {
    for (const id of ['hero', 'private-deployment', 'controls', 'get-started'])
      expect(html).toContain(`id="${id}"`)
  })

  it('makes private deployment a core message', () => {
    expect(text).toContain(copy.deployment.title)
    for (const feature of copy.deployment.features) {
      expect(text).toContain(feature.title)
      expect(text).toContain(feature.body)
    }
    expect(text).toContain(copy.deployment.diagram.boundary)
    expect(text).toContain(copy.deployment.diagram.blocked)
  })

  it('renders every security control area and feature', () => {
    const items = Object.values(copy.controls.items)
    expect(items).toHaveLength(4)
    for (const item of items) {
      expect(text).toContain(item.tab)
      expect(text).toContain(item.title)
      expect(item.features).toHaveLength(3)
      for (const feature of item.features) {
        expect(text).toContain(feature.title)
        expect(text).toContain(feature.body)
      }
    }
  })

  it('builds the controls as WAI-ARIA tabs with one panel per area', () => {
    expect(html.match(/role="tablist"/g)).toHaveLength(1)
    expect(html.match(/role="tab"/g)).toHaveLength(4)
    expect(html.match(/role="tabpanel"/g)).toHaveLength(4)
    expect(html.match(/aria-selected="true"/g)).toHaveLength(1)
  })

  it('renders the boundary, data flow, action, memory and audit mocks', () => {
    expect(text).toContain(copy.boundary.command.title)
    for (const layer of copy.boundary.layers) expect(text).toContain(layer)
    for (const step of copy.visuals.dataFlow.steps) expect(text).toContain(step)
    for (const group of copy.visuals.actionPolicy.groups)
      for (const item of group.items) expect(text).toContain(item)
    expect(text).toContain(copy.visuals.actionPolicy.queue.status)
    for (const policy of copy.visuals.memoryPolicy.policies) {
      expect(text).toContain(policy.label)
      expect(text).toContain(policy.value)
    }
    for (const row of copy.visuals.auditLog.rows) expect(text).toContain(row.event)
  })
})

describe.each(locales)('contact page (%s)', (locale) => {
  const copy = contactPageCopy[locale]
  const html = renderHtml(<ContactPage locale={locale} />)

  it('passes the page basics', () => {
    expectPageBasics(html)
    expect(html).toContain('id="contact"')
  })

  it('renders every field with its exact name', () => {
    const name = html.match(/<input[^>]*name="name"[^>]*>/)?.[0] ?? ''
    const email = html.match(/<input[^>]*name="email"[^>]*>/)?.[0] ?? ''
    const message = html.match(/<textarea[^>]*name="message"[^>]*>/)?.[0] ?? ''

    expect(name).toMatch(/type="text"/)
    expect(name).toMatch(/required/)
    expect(name).toMatch(/maxLength="255"/i)
    expect(name).toMatch(/id="contact-name"/)
    expect(name).toMatch(/autoComplete="name"/i)

    expect(email).toMatch(/type="email"/)
    expect(email).toMatch(/required/)
    expect(email).toMatch(/maxLength="255"/i)
    expect(email).toMatch(/id="contact-email"/)

    expect(message).toMatch(/required/)
    expect(message).toMatch(/maxLength="5000"/i)
    expect(message).toMatch(/id="contact-message"/)

    // Three visible fields; the hidden anti-spam honeypot is not one of them.
    const visible = html.replace(/<input[^>]*name="_honey"[^>]*>/, '')
    expect(visible.match(/<(input|textarea)\b/g)).toHaveLength(3)
  })

  it('labels every field and announces the result', () => {
    for (const id of ['contact-name', 'contact-email', 'contact-message'])
      expect(html).toContain(`for="${id}"`)
    for (const field of Object.values(copy.form.fields)) expect(html).toContain(field.label)
    expect(html).toMatch(/role="status"[^>]*aria-live="polite"/)
    expect(html).toMatch(/role="alert"[^>]*aria-live="assertive"/)
    expect(html).toMatch(/<button[^>]*type="submit"/)
  })
})

describe('contact form behaviour', () => {
  const copy = contactPageCopy.en
  const data = { email: 'ada@example.com', message: 'Hello\nWe run 30 workflows.', name: 'Ada' }
  const context = {
    locale: 'en' as const,
    pageUrl: 'https://prismshadow.com/contact',
    sentAt: new Date('2026-11-11T08:30:00Z'),
  }
  const ok = () =>
    vi.fn<typeof fetch>(async () => new Response(JSON.stringify({ success: 'true' }), { status: 200 }))

  it('starts empty with exactly the three fields', () => {
    expect(Object.keys(initialFormData).sort()).toEqual(['email', 'message', 'name'])
    expect(Object.values(initialFormData).every((value) => value === '')).toBe(true)
  })

  it('renders the submission into an email for contact@prismshadow.com', () => {
    const email = renderContactEmail(data, context)
    expect(email.to).toBe('contact@prismshadow.com')
    expect(email.replyTo).toBe('ada@example.com')
    expect(email.subject).toBe('Website enquiry from Ada')
    expect(email.text).toContain('Name: Ada')
    expect(email.text).toContain('Email: ada@example.com')
    expect(email.text).toContain('Sent: 2026-11-11 08:30 UTC')
    expect(email.text).toContain('Message:\nHello\nWe run 30 workflows.')
    expect(Object.keys(email.fields)).toEqual(['Name', 'Email', 'Message', 'Language', 'Page', 'Sent'])
  })

  it('delivers the rendered email as JSON to the contact endpoint', async () => {
    const fetchMock = ok()
    await expect(submitContactForm(data, copy, context, '', fetchMock)).resolves.toMatchObject({
      to: contactEmail,
    })
    expect(contactEndpoint).toBe('https://formsubmit.co/ajax/contact@prismshadow.com')
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(contactEndpoint)
    expect(init?.method).toBe('POST')
    const body = JSON.parse(String(init?.body))
    expect(body).toMatchObject({
      Name: 'Ada',
      Email: 'ada@example.com',
      _subject: 'Website enquiry from Ada',
      _replyto: 'ada@example.com',
      _template: 'table',
      _honey: '',
    })
  })

  it.each([
    ['missing fields', { ...data, message: '  ' }, copy.form.errors.missingFields],
    ['an invalid email', { ...data, email: 'ada@' }, copy.form.errors.invalidEmail],
    ['an over-long message', { ...data, message: 'x'.repeat(5001) }, copy.form.errors.tooLong],
  ])('rejects %s before sending', async (_label, input, message) => {
    const fetchMock = ok()
    await expect(submitContactForm(input, copy, context, '', fetchMock)).rejects.toThrow(message)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each([
    ['an unactivated or failed form', () => new Response(JSON.stringify({ success: 'false' }), { status: 200 })],
    ['a non-JSON error', () => new Response('Bad gateway', { status: 502 })],
  ])('shows the generic error for %s', async (_label, respond) => {
    const fetchMock = vi.fn<typeof fetch>(async () => respond())
    await expect(submitContactForm(data, copy, context, '', fetchMock)).rejects.toThrow(copy.form.error)
  })

  it('shows the generic error when the network fails', async () => {
    const fetchMock = vi.fn<typeof fetch>(async () => {
      throw new TypeError('Failed to fetch')
    })
    await expect(submitContactForm(data, copy, context, '', fetchMock)).rejects.toThrow(copy.form.error)
  })

  it('builds a mailto fallback carrying the same email', () => {
    const href = buildMailtoHref(renderContactEmail(data, context))
    expect(href.startsWith('mailto:contact@prismshadow.com?subject=')).toBe(true)
    expect(decodeURIComponent(href)).toContain('Name: Ada')
  })

  it('renders the hidden honeypot and the email channel', () => {
    const html = renderHtml(<ContactPage locale="en" />)
    expect(html).toMatch(/name="_honey"[^>]*tabindex="-1"|tabindex="-1"[^>]*name="_honey"/i)
    expect(html).toContain('href="mailto:contact@prismshadow.com"')
  })
})
