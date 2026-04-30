import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const CLIENTS = [
  {
    name: 'IT Roots',
    logo: '/assets/clients/itroots-logo.webp',
  },
  {
    name: 'InsuranceMajha',
    logo: '/assets/clients/insurance-majha-logo.jpeg',
  },
  {
    name: 'Quick Print Technology',
    logo: '/assets/clients/quick-print-logo.png',
    scale: 0.6,
  },
  {
    name: 'Mechnnovation Technologies',
    logo: '/assets/clients/mechnnovation-logo.svg',
  },
]

const MARQUEE_ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS]

export default function ClientMarqueeStrip() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      aria-label="Trusted by businesses"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10"
    >
      {/* divider + label */}
      <div className="mb-5 flex items-center gap-3 sm:gap-4">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <p className="text-center text-sm font-bold uppercase tracking-widest text-black sm:text-base">
          Trusted by businesses
        </p>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="relative w-full overflow-hidden py-6">

        <div
          className="flex w-max items-center gap-7 sm:gap-10"
          style={
            shouldReduceMotion
              ? undefined
              : { animation: 'clientMarquee 30s linear infinite' }
          }
        >
          {MARQUEE_ITEMS.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex h-20 w-[14rem] shrink-0 items-center justify-center px-4 sm:h-24 sm:w-[18rem] sm:px-6"
              aria-label={client.name}
              style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                loading="lazy"
                decoding="async"
                draggable="false"
                className="block h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes clientMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </motion.section>
  )
}





























/* Project completed successfully by Vaibhav Mhamane on 20/03/2026*/
