import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const DEMO_CALL_HREF = 'tel:+919960756292'

const FLOATING_PILLS = [
  // { text: '98% Open Rate',       x: '8%',  y: '18%', delay: 0    },
  // { text: 'Campaign Sent ✓',     x: '72%', y: '12%', delay: 0.6  },
  // { text: '3x More Conversions', x: '78%', y: '72%', delay: 1.2  },
  // { text: 'Lead Captured',       x: '6%',  y: '68%', delay: 1.8  },
]

export default function HomeCtaSection({ goTo }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12" id="get-started">
      <div className="relative overflow-hidden rounded-3xl bg-[var(--accent)] px-5 py-10 text-center sm:px-8 sm:py-12 md:px-16 md:py-14">

        {/* ── decorative circles ── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {!shouldReduceMotion ? (
            <>
              <motion.div
                className="absolute -left-24 -top-24 size-80 rounded-full border-2 border-white/20"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -left-10 -top-10 size-52 rounded-full border-2 border-white/15"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-28 -right-20 size-96 rounded-full border-2 border-white/20"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-12 -right-8 size-56 rounded-full border-2 border-white/15"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              />
            </>
          ) : (
            <>
              <div className="absolute -left-24 -top-24 size-80 rounded-full border-2 border-white/20" />
              <div className="absolute -left-10 -top-10 size-52 rounded-full border-2 border-white/15" />
              <div className="absolute -bottom-28 -right-20 size-96 rounded-full border-2 border-white/20" />
              <div className="absolute -bottom-12 -right-8 size-56 rounded-full border-2 border-white/15" />
            </>
          )}
          {/* small oval blobs */}
          <div className="absolute left-[18%] top-[22%] h-8 w-5 rounded-full bg-white/10" />
          <div className="absolute right-[22%] top-[30%] h-10 w-6 rounded-full bg-white/10" />
          <div className="absolute bottom-[24%] left-[38%] h-6 w-4 rounded-full bg-white/10" />
          {/* soft glow center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,color-mix(in_srgb,white_12%,transparent),transparent_70%)]" />
        </div>

        {/* ── floating stat pills ── */}
        {!shouldReduceMotion && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {FLOATING_PILLS.map((pill, i) => (
              <motion.span
                key={i}
                className="absolute hidden rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white lg:block"
                style={{ left: pill.x, top: pill.y }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pill.delay, duration: 0.5 }}
                animate={{ y: [0, -6, 0] }}
              >
                {pill.text}
              </motion.span>
            ))}
          </div>
        )}

        {/* ── content ── */}
        <div className="relative z-10 mx-auto max-w-2xl">

          {/* heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-5xl"
          >
            Ready to grow with WhatsApp?
          </motion.h2>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="mt-5 text-sm leading-7 text-white/80 sm:text-[1.05rem]"
          >
            Launch campaigns, automate follow-ups, and close more deals — all from one
            WhatsApp platform built on official APIs.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={DEMO_CALL_HREF}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[var(--accent)] shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)] sm:w-auto"
            >
              Call for Demo
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
