import { motion } from 'framer-motion'

export default function ContentShell({ badge, title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <motion.div
        className="card-shadow-soft main-card-accent relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8 md:p-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="max-w-3xl">
          <p className="section-badge">{badge}</p>
          <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">{title}</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base md:text-lg md:leading-8">
            {subtitle}
          </p>
        </div>
        <div className="mt-8 md:mt-10">{children}</div>
      </motion.div>
    </section>
  )
}

