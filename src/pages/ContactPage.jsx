import { motion } from 'framer-motion'
import { Check, ChevronDown, Globe, Mail, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import GlowButton from '../components/ui/GlowButton'

const INITIAL_FORM = {
  name: '',
  company: '',
  phone: '',
  email: '',
  monthlyVolume: '',
  useCase: '',
  message: '',
}

const MONTHLY_VOLUME_OPTIONS = [
  { value: '', label: 'Select range' },
  { value: 'Under 1,000 chats', label: 'Under 1,000 chats' },
  { value: '1,000 - 10,000 chats', label: '1,000 - 10,000 chats' },
  { value: '10,000 - 50,000 chats', label: '10,000 - 50,000 chats' },
  { value: '50,000+ chats', label: '50,000+ chats' },
]

const USE_CASE_OPTIONS = [
  { value: '', label: 'Select use case' },
  { value: 'Campaigns and broadcasts', label: 'Campaigns and broadcasts' },
  { value: 'Lead qualification', label: 'Lead qualification' },
  { value: 'Support and routing', label: 'Support and routing' },
  { value: 'Reminders and payments', label: 'Reminders and payments' },
  { value: 'Mixed workflow', label: 'Mixed workflow' },
]

const WHATSAPP_NUMBER = '919960756292'

function createWhatsAppHref(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function createDemoRequestMessage(form) {
  return [
    'Hi AutoSensy, I want to book a demo.',
    '',
    `Name: ${form.name || '-'}`,
    `Company: ${form.company || '-'}`,
    `Contact number: ${form.phone || '-'}`,
    `Email address: ${form.email || '-'}`,
    `Monthly volume: ${form.monthlyVolume || '-'}`,
    `Primary use case: ${form.useCase || '-'}`,
    '',
    'Demo preparation details:',
    form.message || '-',
  ].join('\n')
}

function ThemedSelect({ label, name, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const listboxId = `${name}-listbox`
  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          className={`button-hover-fast flex w-full min-w-0 items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm shadow-sm ${
            open
              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]'
              : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]'
          }`}
          onClick={() => setOpen((current) => !current)}
        >
          <span className={value ? 'text-[var(--text)]' : 'text-[var(--muted)]'}>
            {selectedOption.label}
          </span>
          <ChevronDown className={`size-4 text-[var(--muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <motion.div
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-20 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_18px_44px_rgba(2,28,16,0.12)]"
          >
            <div className="max-h-64 overflow-y-auto">
              {options.map((option) => {
                const isSelected = option.value === value

                return (
                  <button
                    key={`${name}-${option.label}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`button-hover-fast flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${
                      isSelected
                        ? 'bg-[var(--accent-soft)] font-medium text-[var(--accent)]'
                        : 'text-[var(--text)] hover:bg-[var(--accent-soft)]'
                    }`}
                    onClick={() => {
                      onChange(name, option.value)
                      setOpen(false)
                    }}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="size-4" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const contactItems = [
    { label: 'autosensy@gmail.com', href: 'mailto:autosensy@gmail.com', icon: Mail, helper: 'Email us directly' },
    { label: '9960756292', href: 'tel:+919960756292', icon: Phone, helper: 'Talk to sales' },
    { label: 'https://autosensy.in', href: 'https://autosensy.in', icon: Globe, helper: 'Visit the main site' },
  ]

  const whatsappHref = createWhatsAppHref('Hi AutoSensy, I want a demo.')

  const handleChange = (event) => {
    const { name, value } = event.target
    setSubmitState('idle')
    setSubmitMessage('')
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setSubmitState('idle')
    setSubmitMessage('')
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const demoRequestHref = createWhatsAppHref(createDemoRequestMessage(form))
    window.open(demoRequestHref, '_blank', 'noopener,noreferrer')

    setSubmitState('success')
    setSubmitMessage('WhatsApp opened with your demo request. Send the message there to complete it.')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <motion.div
        className="card-shadow-soft main-card-accent relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8 md:p-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Book a Demo
            </p>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">Tell us how you want to use WhatsApp</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base md:text-lg md:leading-relaxed">
              Share your workflow, expected conversation volume, and team setup. We&apos;ll use that to tailor the product
              walkthrough instead of giving you a generic pitch.
            </p>

            <div className="mt-8 space-y-4 sm:mt-10">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex min-w-0 items-start gap-3 py-2"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                    <item.icon className="size-4 text-[var(--accent)]" />
                  </span>
                  <span>
                    <span className="block break-all text-sm font-semibold">{item.label}</span>
                    <span className="block text-sm text-[var(--muted)]">{item.helper}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="card-shadow-soft rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">Request your walkthrough</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Submit the form and your full request will open as a WhatsApp message.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Your name</span>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                  placeholder="Enter your name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Company</span>
                <input
                  required
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                  placeholder="Your company name"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Contact number</span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                    placeholder="Enter your contact number"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Email address</span>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                    placeholder="Enter your email address"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ThemedSelect
                  label="Monthly volume"
                  name="monthlyVolume"
                  value={form.monthlyVolume}
                  options={MONTHLY_VOLUME_OPTIONS}
                  onChange={handleSelectChange}
                />

                <ThemedSelect
                  label="Primary use case"
                  name="useCase"
                  value={form.useCase}
                  options={USE_CASE_OPTIONS}
                  onChange={handleSelectChange}
                />
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">What should we prepare for the demo?</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                  placeholder="Describe your current process, team size, CRM, or any blockers."
                />
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <GlowButton type="submit" disabled={submitState === 'submitting'} className="w-full sm:w-auto">
                  {submitState === 'submitting' ? 'Opening WhatsApp...' : 'Send on WhatsApp'}
                </GlowButton>
                <GlowButton href={whatsappHref} variant="secondary" className="w-full sm:w-auto">
                  Chat on WhatsApp
                </GlowButton>
              </div>

              {submitState === 'success' && (
                <p className="text-sm text-[var(--accent)]">{submitMessage}</p>
              )}

              {submitState === 'error' && (
                <p className="text-sm text-[var(--muted)]">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
