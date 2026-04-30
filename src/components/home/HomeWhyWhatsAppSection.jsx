import { motion } from 'framer-motion'
import { Building2, CalendarDays, CheckCircle2, MapPin, MessageCircle } from 'lucide-react'
import { WHY_WHATSAPP_POINTS } from '../../data/siteData'
import GridBackground from '../layout/GridBackground'
import SectionHeader from '../ui/SectionHeader'

function ChatPreview() {
  const messages = [
    { text: 'Hi, I need a 2 BHK in Wakad under 75L.', sent: false, delay: 0 },
    {
      text: 'Sure. Here is one matching option.',
      sent: true,
      delay: 0.8,
      preview: {
        type: 'property',
        title: '2 BHK at Green Avenue',
        meta: 'Wakad, Pune',
        extra: 'Rs. 72L onwards',
        cta: 'Schedule a Visit',
      },
    },
    { text: 'Looks good. Share brochure too.', sent: false, delay: 1.6 },
    { text: 'Done. I can also help book a site visit.', sent: true, delay: 2.4 },
    { text: 'Book me for Saturday morning.', sent: false, delay: 3.2 },
    { text: 'Confirmed. Our advisor will call before the visit.', sent: true, delay: 4 },
  ]

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[17.25rem] overflow-hidden rounded-[1.65rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_22px_42px_rgba(2,28,16,0.11)]"
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ perspective: 1000 }}
      aria-label="WhatsApp chat preview"
    >
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--accent)] px-3.5 py-3">
        <div className="flex size-7 items-center justify-center rounded-full bg-white/20">
          <MessageCircle className="size-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">ABC Real Estate</p>
          <p className="flex items-center gap-1 text-[10px] text-white/70">
            <span className="size-1.5 rounded-full bg-white/80" /> Online
          </p>
        </div>
      </div>
      <div className="space-y-2.5 p-3">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, x: message.sent ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: message.delay * 0.4 + 0.3, type: 'spring' }}
          >
            <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-[10px] leading-5 ${
              message.sent
                ? 'rounded-br-sm bg-[var(--accent)] text-[var(--accent-contrast)]'
                : 'rounded-bl-sm bg-[var(--surface-strong)] text-[var(--text)]'
            }`}>
              <p>{message.text}</p>
              {message.preview && (
                <div className="mt-2 overflow-hidden rounded-xl border border-black/5 bg-white/95 text-[10px] text-[#1f2937]">
                  <div className="bg-[linear-gradient(135deg,#dff3e7_0%,#f6efe3_100%)] px-2 py-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-1 text-[8px] font-medium text-[#1f2937] shadow-sm w-fit">
                      <span className="flex size-4 items-center justify-center rounded bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Building2 className="size-2.5" />
                      </span>
                      {message.preview.extra}
                    </div>
                  </div>
                  <div className="space-y-1.5 p-2">
                    <div>
                      <p className="truncate text-[9px] font-semibold">{message.preview.title}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[8px] text-[#6b7280]">
                        <MapPin className="size-2.5" /> {message.preview.meta}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[8px] font-semibold text-[var(--accent)]">
                      <CalendarDays className="size-2.5" /> {message.preview.cta}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function HomeWhyWhatsAppSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20" id="why-whatsapp">
      <div className="card-shadow-soft main-card-accent relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8 md:p-14">
        <GridBackground />
        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeader
              badge="Why WhatsApp"
              title="The highest-intent marketing channel"
              subtitle="Use one fast-response channel for lead capture, follow-up, and support."
            />
            <ul className="space-y-4">
              {WHY_WHATSAPP_POINTS.map((point, index) => (
                <motion.li
                  key={point.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <motion.span
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)]"
                    whileHover={{ scale: 1.2 }}
                  >
                    <CheckCircle2 className="size-[1.125rem] text-[var(--accent)]" />
                  </motion.span>
                  <div>
                    <p className="text-[15px] font-semibold text-[var(--text)]">{point.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{point.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          <ChatPreview />
        </div>
      </div>
    </section>
  )
}
