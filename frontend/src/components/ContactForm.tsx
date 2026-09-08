import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowIcon } from './Icons'

type ContactFields = {
  name: string
  email: string
  company: string
  phone: string
  message: string
  website: string
}

type ContactErrors = Partial<Record<keyof ContactFields, string>>

const emptyContact: ContactFields = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  website: '',
}

export function ContactForm() {
  const [contact, setContact] = useState<ContactFields>(emptyContact)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [validated, setValidated] = useState(false)

  const validate = () => {
    const nextErrors: ContactErrors = {}
    const name = contact.name.trim()
    const email = contact.email.trim()
    const company = contact.company.trim()
    const phone = contact.phone.trim()
    const message = contact.message.trim()

    if (name.length < 2 || name.length > 80) nextErrors.name = 'Enter a name between 2 and 80 characters.'
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    if (company.length > 120) nextErrors.company = 'Company must be 120 characters or fewer.'
    if (phone.length > 30 || (phone && !/^[+()\d\s.-]{7,30}$/.test(phone))) nextErrors.phone = 'Enter a valid phone number of up to 30 characters.'
    if (message.length < 10 || message.length > 2000) nextErrors.message = 'Tell us about your requirement in 10 to 2,000 characters.'

    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidated(false)
    if (contact.website) {
      setValidated(true)
      return
    }

    const nextErrors = validate()
    const firstError = Object.keys(nextErrors)[0] as keyof ContactFields | undefined
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus()
      return
    }

    setValidated(true)
  }

  const update = (field: keyof ContactFields, value: string) => {
    setContact((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setValidated(false)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate data-reveal>
      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-name">Name <span>*</span></label>
          <input id="contact-name" name="name" autoComplete="name" value={contact.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} maxLength={80} />
          {errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email <span>*</span></label>
          <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" value={contact.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} maxLength={254} />
          {errors.email && <p className="field-error" id="contact-email-error">{errors.email}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-company">Company <em>Optional</em></label>
          <input id="contact-company" name="company" autoComplete="organization" value={contact.company} onChange={(event) => update('company', event.target.value)} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'contact-company-error' : undefined} maxLength={120} />
          {errors.company && <p className="field-error" id="contact-company-error">{errors.company}</p>}
        </div>
        <div className="field">
          <label htmlFor="contact-phone">Phone <em>Optional</em></label>
          <input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={contact.phone} onChange={(event) => update('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} maxLength={30} />
          {errors.phone && <p className="field-error" id="contact-phone-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="field field--message">
        <label htmlFor="contact-message">Your requirement <span>*</span></label>
        <textarea id="contact-message" name="message" rows={5} value={contact.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-count'} maxLength={2000} />
        {errors.message ? <p className="field-error" id="contact-message-error">{errors.message}</p> : <p className="field-count" id="contact-message-count">{contact.message.length} / 2,000</p>}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={(event) => update('website', event.target.value)} />
      </div>

      <div className="form-submit">
        <p>By submitting, you agree that your details may be used to respond to this inquiry.</p>
        <motion.button type="submit" className="button button--blue" whileTap={{ scale: 0.97 }}>
          <span>Send enquiry</span><ArrowIcon />
        </motion.button>
      </div>

      <AnimatePresence>
        {validated && (
          <motion.div className="form-status" role="status" aria-live="polite" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span>✓</span>
            <p><strong>Your details are valid.</strong>Email delivery will be connected in the next project phase.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
