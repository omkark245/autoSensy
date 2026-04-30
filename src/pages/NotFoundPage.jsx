import { motion } from 'framer-motion'
import GlowButton from '../components/ui/GlowButton'

export default function NotFoundPage({ goTo }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
      <motion.div
        className="card-shadow-soft main-card-accent rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-center sm:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-3 text-sm text-[var(--muted)]">The requested path does not exist.</p>
        <div className="mt-5">
          <GlowButton
            href="/"
            onClick={(event) => {
              event.preventDefault()
              goTo('/')
            }}
            className="w-full sm:w-auto"
          >
            Back to Home
          </GlowButton>
        </div>
      </motion.div>
    </section>
  )
}
