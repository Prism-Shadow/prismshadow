import type { ContactPageCopy } from '../../../i18n/messages/contact'

/*
 * Contact form behaviour, unchanged from the legacy ContactPage component:
 * POST JSON { name, email, message } to /api/contact (see api/contact.ts),
 * map the API's error codes to localized messages, and fall back to the
 * generic error. Only the presentation around it was rebuilt.
 */

/** Field names the API reads; they are also the inputs' `name` attributes. */
export type ContactFormData = {
  email: string
  message: string
  name: string
}

export type ContactSubmitState = 'idle' | 'submitting' | 'success' | 'error'

export type ContactApiResponse = {
  code?: string
  error?: string
  success?: boolean
}

export const contactEndpoint = '/api/contact'

export const initialFormData: ContactFormData = {
  email: '',
  message: '',
  name: '',
}

/** Same limits the API enforces (255 / 255 / 5000 characters). */
export const contactFieldLimits = {
  name: 255,
  email: 255,
  message: 5000,
} as const

export const getSubmitErrorMessage = (copy: ContactPageCopy, response: ContactApiResponse) => {
  switch (response.code) {
    case 'INVALID_EMAIL':
      return copy.form.errors.invalidEmail
    case 'MISSING_FIELDS':
      return copy.form.errors.missingFields
    case 'FORM_TOO_LONG':
      return copy.form.errors.tooLong
    case 'CONTACT_UNAVAILABLE':
      return copy.form.errors.unavailable
    default:
      return copy.form.error
  }
}

export const readContactApiResponse = async (response: Response): Promise<ContactApiResponse> => {
  try {
    return (await response.json()) as ContactApiResponse
  } catch {
    return {}
  }
}

/**
 * Send the form. Resolves on success; on a non-OK response it throws an Error
 * whose message is the localized text to show. Network failures propagate.
 */
export async function submitContactForm(
  formData: ContactFormData,
  copy: ContactPageCopy,
  fetchImpl: typeof fetch = fetch,
): Promise<void> {
  const response = await fetchImpl(contactEndpoint, {
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  const payload = await readContactApiResponse(response)

  if (!response.ok) {
    throw new Error(getSubmitErrorMessage(copy, payload))
  }
}
