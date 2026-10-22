import { useState } from 'react'
import { Check, Send } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { SelectField, TextAreaField, TextField } from '../ui/Field.jsx'
import { isValidEmail, saveInquiry } from '../../lib/inquiries.js'

const TIME_SLOTS = [
  { value: 'anytime', label: 'Any time' },
  { value: 'morning', label: 'Morning (9am — 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm — 4pm)' },
  { value: 'evening', label: 'Evening (4pm — 7pm)' },
]

const EMPTY = { name: '', email: '', phone: '', date: '', time: 'anytime', message: '' }

/**
 * One form for both enquiries and viewing requests. `mode` switches the extra
 * scheduling fields; `property` links the enquiry to a listing.
 */
export default function InquiryForm({ mode = 'contact', property, className }) {
  const isViewing = mode === 'viewing'
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [record, setRecord] = useState(null)

  const fieldId = (name) => `${mode}-${name}`

  function setValue(name) {
    return (event) => {
      const { value } = event.target
      setValues((previous) => ({ ...previous, [name]: value }))
      setErrors((previous) => (previous[name] ? { ...previous, [name]: undefined } : previous))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please tell us your name.'
    if (!isValidEmail(values.email)) nextErrors.email = 'A valid email address is required.'
    if (isViewing && !values.date) nextErrors.date = 'Choose a preferred date.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setRecord(
      saveInquiry({
        mode,
        propertyId: property?.id ?? null,
        propertyName: property?.name ?? null,
        ...values,
      }),
    )
  }

  if (record) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-card bg-mist p-6 text-center sm:p-8 ${className ?? ''}`}
      >
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy text-champagne">
          <Check className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold tracking-[-0.015em] text-ink">
          {isViewing ? 'Viewing requested' : 'Enquiry received'}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thank you, {record.name}.{' '}
          {property ? (
            <>
              Your {isViewing ? 'viewing request' : 'enquiry'} for{' '}
              <span className="font-medium text-ink">{property.name}</span> is with our advisory
              team.
            </>
          ) : (
            'One of our advisors will be in touch within one business day.'
          )}
        </p>
        {isViewing && record.date ? (
          <p className="mt-2 text-sm text-muted">
            Requested for {record.date} · {TIME_SLOTS.find((slot) => slot.value === record.time)?.label}
          </p>
        ) : null}
        <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-muted">
          Reference {record.id.toUpperCase()}
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setRecord(null)}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id={fieldId('name')}
          label="Full name"
          autoComplete="name"
          required
          value={values.name}
          onChange={setValue('name')}
          error={errors.name}
          placeholder="Jordan Ellis"
        />
        <TextField
          id={fieldId('email')}
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={setValue('email')}
          error={errors.email}
          placeholder="you@example.com"
        />
        <TextField
          id={fieldId('phone')}
          label="Phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={setValue('phone')}
          placeholder="(555) 000-0000"
          hint="Optional"
        />
        {isViewing ? (
          <TextField
            id={fieldId('date')}
            label="Preferred date"
            type="date"
            required
            value={values.date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={setValue('date')}
            error={errors.date}
          />
        ) : (
          <SelectField
            id={fieldId('interest')}
            label="I am interested in"
            value={values.interest ?? 'buying'}
            onChange={setValue('interest')}
            options={[
              { value: 'buying', label: 'Buying a home' },
              { value: 'selling', label: 'Selling a property' },
              { value: 'investing', label: 'Investing' },
              { value: 'advice', label: 'General advice' },
            ]}
          />
        )}
        {isViewing ? (
          <SelectField
            id={fieldId('time')}
            label="Preferred time"
            value={values.time}
            onChange={setValue('time')}
            options={TIME_SLOTS}
            className="sm:col-span-2"
          />
        ) : null}
      </div>

      <TextAreaField
        id={fieldId('message')}
        label={isViewing ? 'Anything we should know?' : 'Message'}
        className="mt-4"
        rows={4}
        value={values.message}
        onChange={setValue('message')}
        placeholder={
          isViewing
            ? 'We would like to see the pool terrace and the primary suite.'
            : 'Tell us what you are looking for.'
        }
        hint={isViewing ? 'Optional' : undefined}
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-relaxed text-muted">
          We reply within one business day. No listings spam, ever.
        </p>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {isViewing ? 'Request viewing' : 'Send enquiry'}
          <Send className="h-[15px] w-[15px]" strokeWidth={1.9} aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
