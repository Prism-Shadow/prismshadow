import { useState, type ChangeEvent, type ComponentType, type FormEvent, type SVGProps } from 'react'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  DiscordIcon,
  GithubIcon,
  LinkedInIcon,
  XLogoIcon,
} from '../../components/site/icons'
import { docsUrl, socialLinks } from '../../components/site/navigation'
import { Eyebrow } from '../../components/site/ui'
import { contactPageCopy, type ContactSocialId } from '../../i18n/messages/contact'
import type { PageProps } from '../types'
import {
  buildMailtoHref,
  contactEmail,
  contactFieldLimits,
  initialFormData,
  renderContactEmail,
  submitContactForm,
  type ContactFormData,
  type ContactSubmitState,
} from './contact/contactForm'
import { AlertIcon, BookIcon, CheckIcon, MailIcon, ShieldIcon } from './icons'
import './contact.css'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

type Channel = {
  key: string
  label: string
  body: string
  href: string
  icon: Icon
  external: boolean
}

const socialOrder: ContactSocialId[] = ['github', 'discord', 'x', 'linkedin']

const socialIcons: Record<ContactSocialId, Icon> = {
  github: GithubIcon,
  discord: DiscordIcon,
  x: XLogoIcon,
  linkedin: LinkedInIcon,
}

export function ContactPage({ locale }: PageProps) {
  const copy = contactPageCopy[locale]
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [submitState, setSubmitState] = useState<ContactSubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>(copy.form.error)
  const [fallbackHref, setFallbackHref] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const isSubmitting = submitState === 'submitting'

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('submitting')
    setErrorMessage(copy.form.error)
    setFallbackHref(null)

    const context = {
      locale,
      pageUrl: window.location.origin + window.location.pathname,
      sentAt: new Date(),
    }

    try {
      await submitContactForm(formData, copy, context, honeypot)
      setFormData(initialFormData)
      setSubmitState('success')
    } catch (error) {
      setErrorMessage(error instanceof Error && error.message ? error.message : copy.form.error)
      // Delivery failed (not a validation error): offer the same email via mailto.
      if (error instanceof Error && error.message === copy.form.error) {
        setFallbackHref(buildMailtoHref(renderContactEmail(formData, context)))
      }
      setSubmitState('error')
    }
  }

  const channels: Channel[] = [
    {
      key: 'email',
      label: copy.alternatives.email.label,
      body: copy.alternatives.email.body,
      href: `mailto:${contactEmail}`,
      icon: MailIcon,
      external: false,
    },
    {
      key: 'security',
      label: copy.alternatives.security.label,
      body: copy.alternatives.security.body,
      href: '/security',
      icon: ShieldIcon,
      external: false,
    },
    {
      key: 'docs',
      label: copy.alternatives.docs.label,
      body: copy.alternatives.docs.body,
      href: docsUrl,
      icon: BookIcon,
      external: true,
    },
    ...socialOrder.map((id) => {
      const link = socialLinks.find((item) => item.id === id)
      return {
        key: id,
        label: link?.label ?? id,
        body: copy.alternatives.social[id],
        href: link?.href ?? '/',
        icon: socialIcons[id],
        external: true,
      }
    }),
  ]

  const fields = copy.form.fields

  return (
    <div className="pg-contact">
      <section id="contact" className="pg-contact__section" aria-labelledby="contact-title">
        <div className="ds-container pg-contact__grid">
          <div className="pg-contact__head">
            <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
            <h1 id="contact-title" className="ds-h1">
              {copy.hero.title}
            </h1>
            <p className="ds-lead">{copy.hero.body}</p>
          </div>

          <div className="ds-panel pg-contact__panel">
            <div className="pg-contact__panel-head">
              <h2 id="contact-form-title" className="ds-h3">
                {copy.form.title}
              </h2>
              <p className="ds-small">{copy.form.body}</p>
            </div>

            <form
              className="pg-contact-form"
              onSubmit={handleSubmit}
              aria-label={copy.form.ariaLabel}
              aria-busy={isSubmitting}
              data-state={submitState}
            >
              {/* Persistent live regions so the result is announced when it appears. */}
              <div className="pg-contact-form__status" role="status" aria-live="polite">
                {submitState === 'success' ? (
                  <p className="pg-contact-form__feedback pg-contact-form__feedback--success">
                    <CheckIcon />
                    {copy.form.success}
                  </p>
                ) : null}
              </div>
              <div className="pg-contact-form__status" role="alert" aria-live="assertive">
                {submitState === 'error' ? (
                  <div className="pg-contact-form__feedback pg-contact-form__feedback--error">
                    <AlertIcon />
                    <div>
                      <p>{errorMessage}</p>
                      {fallbackHref ? (
                        <p className="pg-contact-form__fallback">
                          {copy.form.fallbackLead}{' '}
                          <a href={fallbackHref}>{copy.form.fallbackCta}</a>
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Anti-spam honeypot: hidden from people and assistive tech; bots fill it. */}
              <div className="pg-contact-form__honeypot" aria-hidden="true">
                <label htmlFor="contact-company-site">{copy.form.honeypotLabel}</label>
                <input
                  autoComplete="off"
                  id="contact-company-site"
                  name="_honey"
                  onChange={(event) => setHoneypot(event.target.value)}
                  tabIndex={-1}
                  type="text"
                  value={honeypot}
                />
              </div>

              <div className="pg-contact-form__field">
                <label className="pg-contact-form__label" htmlFor="contact-name">
                  {fields.name.label}
                </label>
                <input
                  className="pg-contact-form__input"
                  autoComplete="name"
                  id="contact-name"
                  maxLength={contactFieldLimits.name}
                  name="name"
                  onChange={handleChange}
                  placeholder={fields.name.placeholder}
                  required
                  type="text"
                  value={formData.name}
                />
              </div>

              <div className="pg-contact-form__field">
                <label className="pg-contact-form__label" htmlFor="contact-email">
                  {fields.email.label}
                </label>
                <input
                  className="pg-contact-form__input"
                  autoComplete="email"
                  id="contact-email"
                  maxLength={contactFieldLimits.email}
                  name="email"
                  onChange={handleChange}
                  placeholder={fields.email.placeholder}
                  required
                  type="email"
                  value={formData.email}
                />
              </div>

              <div className="pg-contact-form__field">
                <label className="pg-contact-form__label" htmlFor="contact-message">
                  {fields.message.label}
                </label>
                <textarea
                  className="pg-contact-form__input pg-contact-form__textarea"
                  id="contact-message"
                  maxLength={contactFieldLimits.message}
                  name="message"
                  onChange={handleChange}
                  placeholder={fields.message.placeholder}
                  required
                  rows={7}
                  value={formData.message}
                />
              </div>

              <div className="pg-contact-form__actions">
                <button
                  className="ds-btn ds-btn--primary ds-btn--lg pg-contact-form__submit"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? copy.form.submitting : copy.form.submit}
                  {isSubmitting ? null : <ArrowRightIcon />}
                </button>
              </div>
            </form>
          </div>

          <div className="pg-contact__aside">
            <div className="pg-contact__block">
              <h2 className="ds-h4">{copy.next.title}</h2>
              <ol className="pg-contact__steps">
                {copy.next.steps.map((step, index) => (
                  <li key={step.title} className="pg-contact__step">
                    <span className="pg-contact__step-index">{String(index + 1).padStart(2, '0')}</span>
                    <div className="pg-contact__step-copy">
                      <h3 className="pg-contact__step-title">{step.title}</h3>
                      <p className="pg-contact__step-body">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pg-contact__block">
              <h2 className="ds-h4">{copy.alternatives.title}</h2>
              <ul className="pg-contact__channels">
                {channels.map((channel) => {
                  const ChannelIcon = channel.icon
                  return (
                    <li key={channel.key}>
                      <a
                        className="pg-contact__channel"
                        href={channel.href}
                        {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        <span className="pg-contact__channel-label">
                          <ChannelIcon />
                          {channel.label}
                          {channel.external ? (
                            <>
                              <ArrowUpRightIcon className="pg-contact__channel-arrow" />
                              <span className="ds-sr-only"> ({copy.alternatives.newTabLabel})</span>
                            </>
                          ) : (
                            <ArrowRightIcon className="pg-contact__channel-arrow" />
                          )}
                        </span>
                        <span className="pg-contact__channel-body">{channel.body}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
