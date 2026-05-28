import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Bot, CalendarDays, CheckCircle2, Send, Users, Workflow } from 'lucide-react'
import GlowButton from '../components/ui/GlowButton'
import SectionHeader from '../components/ui/SectionHeader'
import { FEATURES_LIST, PRODUCT_MODULES } from '../data/siteData'

const FEATURE_ICONS = {
  'Template Broadcast': Send,
  'Campaign Scheduler': CalendarDays,
  'Journey Automation': Workflow,
  'Team Inbox': Users,
  'Chatbot Builder': Bot,
  'Performance Analytics': BarChart3,
}

export default function FeaturesPage({ goTo }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <SectionHeader
        badge="Features"
        title="Powerful WhatsApp Business API features"
        subtitle="Built to automate communication, manage campaigns, and support customer engagement at scale."
        headingLevel="h1"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES_LIST.map((feature, index) => {
          const Icon = FEATURE_ICONS[feature] ?? Workflow

          return (
          <motion.article
            key={feature}
            className="card-shadow-soft card-hover-fast card-no-accent group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{
              y: -3,
              boxShadow: '0 20px 60px color-mix(in srgb, var(--accent) 20%, transparent)',
              transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
              style={{ background: 'linear-gradient(135deg, var(--accent-soft), transparent)' }}
            />
            <div className="relative z-10">
              <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-[var(--accent-soft)]">
                <Icon className="size-5 text-[var(--accent)]" />
              </div>
              <p className="font-semibold">{feature}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Built for WhatsApp-first growth operations and high-volume communication workflows.
              </p>
            </div>
          </motion.article>
          )
        })}
      </div>

      <div className="mt-14">
        <SectionHeader
          badge="Feature Modules"
          title="Marketing, chatbot, forms and payments from one platform"
          subtitle="Manage core WhatsApp workflows from one dashboard with modules designed for growth, support, and conversions."
        />
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {PRODUCT_MODULES.map((module, index) => (
            <motion.article
              key={module.title}
              className="card-shadow-soft card-hover-fast card-no-accent rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -3, transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] } }}
            >
              <h3 className="text-lg font-semibold">{module.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{module.intro}</p>
              <ul className="mt-4 space-y-2">
                {module.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <GlowButton onClick={() => goTo('/use-cases')} className="w-full sm:w-auto">
          View Use Cases <ArrowRight className="size-4" />
        </GlowButton>
      </motion.div>
    </section>
  )
}
