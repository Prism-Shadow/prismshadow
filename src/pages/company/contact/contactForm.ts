import type { Locale } from '../../../i18n'
import type { ContactPageCopy } from '../../../i18n/messages/contact'

/*
 * Contact form delivery.
 *
 * The site is fully static (GitHub Pages), so there is no server of our own.
 * A submission is rendered into an email (subject, plain-text body and a
 * field table) and delivered to contact@prismshadow.com through FormSubmit's
 * AJAX endpoint (https://formsubmit.co). Replies go straight to the visitor
 * via reply-to. If delivery fails, the visitor gets the same email ready to
 * send from their own mail app (mailto), so no enquiry is lost.
 *
 * Set VITE_CONTACT_ENDPOINT at build time to use another endpoint that
 * accepts the same JSON (for example FormSubmit's hashed alias for the
 * address, available after the form is activated).
 */

export const contactEmail = 'contact@prismshadow.com'

export const contactEndpoint: string =
  import.meta.env.VITE_CONTACT_ENDPOINT || `https://formsubmit.co/ajax/${contactEmail}`

/** Field names; they are also the inputs' `name` attributes. */
export type ContactFormData = {
  email: string
  message: string
  name: string
}

export type ContactSubmitState = 'idle' | 'submitting' | 'success' | 'error'

export const initialFormData: ContactFormData = {
  email: '',
  message: '',
  name: '',
}

export const contactFieldLimits = {
  name: 255,
  email: 255,
  message: 5000,
} as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Localized validation message, or null when the form is valid. */
export function validateContactForm(data: ContactFormData, copy: ContactPageCopy): string | null {
  const name = data.name.trim()
  const email = data.email.trim()
  const message = data.message.trim()
  if (!name || !email || !message) return copy.form.errors.missingFields
  if (!emailPattern.test(email)) return copy.form.errors.invalidEmail
  if (
    name.length > contactFieldLimits.name ||
    email.length > contactFieldLimits.email ||
    message.length > contactFieldLimits.message
  ) {
    return copy.form.errors.tooLong
  }
  return null
}

export type ContactEmail = {
  to: string
  replyTo: string
  subject: string
  /** Plain-text body, also used for the mailto fallback. */
  text: string
  /** Rows of the field table in the delivered email, in order. */
  fields: Record<string, string>
}

export type ContactContext = {
  locale: Locale
  /** Page the form was sent from, e.g. https://prismshadow.com/contact */
  pageUrl: string
  sentAt: Date
}

/** Render a submission into the email the team receives. */
export function renderContactEmail(data: ContactFormData, context: ContactContext): ContactEmail {
  const name = data.name.trim()
  const email = data.email.trim()
  const message = data.message.trim()
  const language = context.locale === 'zh' ? '中文' : 'English'
  const sent = `${context.sentAt.toISOString().replace('T', ' ').slice(0, 16)} UTC`

  const fields = {
    Name: name,
    Email: email,
    Message: message,
    Language: language,
    Page: context.pageUrl,
    Sent: sent,
  }

  const text = [
    'New message from the PrismShadow website contact form.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Language: ${language}`,
    `Page: ${context.pageUrl}`,
    `Sent: ${sent}`,
    '',
    'Message:',
    message,
  ].join('\n')

  return {
    to: contactEmail,
    replyTo: email,
    subject: `Website enquiry from ${name}`,
    text,
    fields,
  }
}

/** A mailto: link carrying the rendered email, for when delivery fails. */
export function buildMailtoHref(rendered: ContactEmail): string {
  const params = `subject=${encodeURIComponent(rendered.subject)}&body=${encodeURIComponent(rendered.text)}`
  return `mailto:${rendered.to}?${params}`
}

export class ContactDeliveryError extends Error {}

/**
 * Deliver the rendered email. Resolves on success. Rejects with an Error whose
 * message is the localized text to show (validation or delivery failure).
 *
 * `honeypot` is the hidden anti-spam field: bots fill it, people never see it.
 */
export async function submitContactForm(
  data: ContactFormData,
  copy: ContactPageCopy,
  context: ContactContext,
  honeypot = '',
  fetchImpl: typeof fetch = fetch,
): Promise<ContactEmail> {
  const invalid = validateContactForm(data, copy)
  if (invalid) throw new ContactDeliveryError(invalid)

  const rendered = renderContactEmail(data, context)

  let response: Response
  try {
    response = await fetchImpl(contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...rendered.fields,
        _subject: rendered.subject,
        _replyto: rendered.replyTo,
        _template: 'table',
        _captcha: 'false',
        _honey: honeypot,
      }),
    })
  } catch {
    throw new ContactDeliveryError(copy.form.error)
  }

  let payload: { success?: boolean | string } = {}
  try {
    payload = (await response.json()) as typeof payload
  } catch {
    // Non-JSON answer: treat as a failure below.
  }

  const delivered = response.ok && (payload.success === true || payload.success === 'true')
  if (!delivered) throw new ContactDeliveryError(copy.form.error)
  return rendered
}
