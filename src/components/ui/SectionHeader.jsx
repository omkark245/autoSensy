import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionHeader({ badge, title, subtitle, headingLevel = 'h2' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Heading = headingLevel === 'h1' ? motion.h1 : motion.h2

  return (
    <motion.div
      ref={ref}
      className="mb-8 max-w-3xl sm:mb-10 md:mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.p
        className="section-badge"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {badge}
      </motion.p>
      <Heading
        className="mt-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </Heading>
      <motion.p
        className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base md:text-lg"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  )
}
