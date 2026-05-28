import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock3, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import GlowButton from '../components/ui/GlowButton'
import SectionHeader from '../components/ui/SectionHeader'
import { PRICING_PLANS } from '../data/siteData'

const INITIAL_INQUIRY_FORM = {
  name: '',
  company: '',
  phone: '',
  address: '',
  message: '',
}

const WHATSAPP_NUMBER = '919960756292'

function createWhatsAppHref(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function createWhiteLabelMessage(form) {
  return [
    'Hi AutoSensy, I want to discuss a white-label solution.',
    '',
    `Name: ${form.name || '-'}`,
    `Company: ${form.company || '-'}`,
    `Phone number: ${form.phone || '-'}`,
    `Address: ${form.address || '-'}`,
    '',
    'Requirement details:',
    form.message || '-',
  ].join('\n')
}

function PricingCard({ plan, index, goTo, billingCycle }) {
  const isComingSoon = plan.status === 'coming-soon'
  const isWhatsAppContact = plan.status === 'whatsapp-contact'
  const hasOptions = Array.isArray(plan.options)
  const activeOption = hasOptions
    ? plan.options.find((option) => option.label.toLowerCase() === billingCycle) ?? plan.options[0]
    : null

  return (
    <motion.article
      className={`card-shadow-soft card-hover-fast card-no-accent relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:rounded-3xl sm:p-6 ${
        isComingSoon ? 'opacity-95' : ''
      }`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="relative z-10">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
          <div>
            <p className="text-xl font-bold tracking-tight">{plan.name}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{plan.highlight}</p>
          </div>
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            {isComingSoon ? 'Coming Soon' : isWhatsAppContact ? 'Contact WhatsApp' : 'Available'}
          </span>
        </div>

        <div className="mt-8">
          {hasOptions && activeOption ? (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-[var(--accent)]">{activeOption.label} Billing</p>
                {activeOption.discount ? (
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    {activeOption.discount}
                  </span>
                ) : null}
              </div>
              {activeOption.originalPrice ? (
                <p className="mt-4 text-lg font-semibold text-[var(--muted)] line-through decoration-2">
                  {activeOption.originalPrice}
                </p>
              ) : null}
              <p className="mt-2 text-4xl font-black leading-none tracking-tight sm:text-5xl">{activeOption.price}</p>
              <p className="mt-3 text-sm text-[var(--muted)]">{activeOption.cadence}</p>
            </>
          ) : (
            <>
              <p
                className={`font-black leading-tight tracking-tight ${
                  isComingSoon ? 'text-3xl sm:text-4xl' : isWhatsAppContact ? 'text-2xl min-[420px]:text-3xl md:text-4xl' : 'text-4xl sm:text-5xl'
                }`}
              >
                {plan.price}
              </p>
              <p className="mt-3 text-sm text-[var(--muted)]">{plan.cadence}</p>
            </>
          )}
        </div>

        <div className="mt-8 space-y-3">
          {plan.points.map((point) => (
            <div key={point} className="flex items-start gap-3 text-sm text-[var(--muted)]">
              {isComingSoon ? (
                <Clock3 className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
              ) : (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
              )}
              <span>{point}</span>
            </div>
          ))}
        </div>

        {isWhatsAppContact ? (
          <div className="mt-8">
            <GlowButton href={plan.whatsappHref} variant="primary" className="w-full sm:w-auto">
              Contact Us on WhatsApp <MessageCircle className="size-4" />
            </GlowButton>
          </div>
        ) : !isComingSoon && (
          <div className="mt-8">
            <GlowButton
              href="/contact"
              onClick={(event) => {
                event.preventDefault()
                goTo('/contact')
              }}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {`Get ${activeOption?.label ?? 'Subscription'} Plan`} <ArrowRight className="size-4" />
            </GlowButton>
          </div>
        )}
      </div>
    </motion.article>
  )
}

function BillingToggle({ billingCycle, setBillingCycle }) {
  const isYearly = billingCycle === 'yearly'

  return (
    <div className="mb-8 flex justify-center sm:mb-10">
      {/* Toggle pill */}
      <div
        className="relative inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-1.5"
        style={{ boxShadow: '0 8px 24px rgba(2,28,16,0.05)' }}
      >
        {/* Green sliding active pill */}
        <span
          className="absolute top-1.5 bottom-1.5 rounded-full"
          style={{
            transitionProperty: 'left, right',
            transitionDuration: '320ms',
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            left: isYearly ? '50%' : '6px',
            right: isYearly ? '6px' : '50%',
            background: 'linear-gradient(135deg, var(--accent) 0%, #22c55e 100%)',
            boxShadow: '0 0 14px rgba(34,197,94,0.35)',
          }}
        />

        {/* Monthly */}
        <button
          type="button"
          onClick={() => setBillingCycle('monthly')}
          className="relative z-10 rounded-full px-4 py-2.5 text-sm font-semibold sm:px-6"
          style={{
            color: !isYearly ? '#fff' : 'var(--text)',
            transition: 'color 0.25s',
          }}
        >
          Monthly
        </button>

        {/* Yearly */}
        <button
          type="button"
          onClick={() => setBillingCycle('yearly')}
          className="relative z-10 rounded-full px-4 py-2.5 text-sm font-semibold sm:px-6"
          style={{
            color: isYearly ? '#fff' : 'var(--text)',
            transition: 'color 0.25s',
          }}
        >
          Yearly
        </button>
      </div>
    </div>
  )
}

export default function PricingPage({ goTo }) {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [form, setForm] = useState(INITIAL_INQUIRY_FORM)
  const [submitState, setSubmitState] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setSubmitState('idle')
    setSubmitMessage('')
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const whiteLabelHref = createWhatsAppHref(createWhiteLabelMessage(form))
    window.open(whiteLabelHref, '_blank', 'noopener,noreferrer')

    setSubmitState('success')
    setSubmitMessage('WhatsApp opened with your white-label inquiry. Send the message there to complete it.')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <SectionHeader
        badge="Pricing"
        title="Simple pricing for monthly and yearly plans"
        subtitle="Choose a billing plan that fits your business requirements with clear monthly and yearly pricing. A lifetime plan is also being prepared and will be announced separately."
        headingLevel="h1"
      />

      <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

      <div className="grid gap-6 lg:grid-cols-2">
        {PRICING_PLANS.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} index={index} goTo={goTo} billingCycle={billingCycle} />
        ))}
      </div>

      <motion.div
        className="card-shadow-soft main-card-accent mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 md:mt-14 md:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <p className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              White-Label Inquiry
            </p>
            <h3 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
              Discuss your white-label solution requirements
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base sm:leading-8">
              Share your business details and white-label requirements. Your inquiry will open as a WhatsApp message.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
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
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Phone number</span>
              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                placeholder="Enter your phone number"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Address</span>
              <input
                required
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                placeholder="Enter your address"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Requirement details</span>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
                placeholder="Tell us what you need for your white-label setup."
              />
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <GlowButton type="submit" disabled={submitState === 'submitting'} className="w-full sm:w-auto">
                {submitState === 'submitting' ? 'Opening WhatsApp...' : 'Send on WhatsApp'}
              </GlowButton>
              <GlowButton
                href="/contact"
                onClick={(event) => {
                  event.preventDefault()
                  goTo('/contact')
                }}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Contact Us
              </GlowButton>
            </div>

            {submitState === 'success' && <p className="text-sm text-[var(--accent)]">{submitMessage}</p>}

            {submitState === 'error' && (
              <p className="text-sm text-[var(--muted)]">{submitMessage}</p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  )
} 
