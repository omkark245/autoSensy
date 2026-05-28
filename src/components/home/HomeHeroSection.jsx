import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Play, ShieldCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  ASSET_VERSION,
  HERO_BENEFITS,
  HERO_EASY_INTEGRATION_IMAGE,
  HERO_STATS,
} from '../../data/siteData'
import GridBackground from '../layout/GridBackground'
import AnimatedCounter from '../ui/AnimatedCounter'
import GlowButton from '../ui/GlowButton'

const FLOATING_BUBBLES = []

function FloatingBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {FLOATING_BUBBLES.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute z-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold shadow-xl"
          style={{ left: bubble.x, top: bubble.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, -6, -12] }}
          transition={{ duration: 4, delay: bubble.delay, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        >
          {bubble.msg}
        </motion.div>
      ))}
    </div>
  )
}

function TypedText({ words, className = '' }) {
  const shouldReduceMotion = useReducedMotion()
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words.length || shouldReduceMotion) return undefined
    const word = words[wordIdx]
    const reachedEnd = !deleting && charIdx === word.length
    const reachedStart = deleting && charIdx === 0
    const delay = reachedEnd ? 1600 : deleting ? 50 : 90
    const timeout = window.setTimeout(() => {
      if (reachedEnd) { setDeleting(true); return }
      if (reachedStart) {
        setDeleting(false)
        setWordIdx((i) => (i + 1) % words.length)
        return
      }
      setCharIdx((v) => v + (deleting ? -1 : 1))
    }, delay)
    return () => window.clearTimeout(timeout)
  }, [charIdx, deleting, shouldReduceMotion, wordIdx, words])

  if (!words.length) return null
  if (shouldReduceMotion) return <span className={className}>{words[0]}</span>

  return (
    <span className={className}>
      {words[wordIdx].slice(0, charIdx)}
      <motion.span
        className="inline-block w-[2px] bg-[var(--accent)] align-middle"
        style={{ height: '1em', marginLeft: 2 }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </span>
  )
}

function StatCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const statValue = item.display
    ? item.display
    : <AnimatedCounter target={item.value} suffix={item.suffix} />

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 120 }}
      whileHover={{ y: -2, transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] } }}
      className="card-glass card-no-accent group relative cursor-default overflow-hidden rounded-2xl border border-[var(--border)] p-4 sm:p-5"
    >
      <motion.div
        className="absolute -right-4 -top-4 size-16 rounded-full opacity-10"
        style={{ background: 'var(--accent)' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
      />
      <item.icon className="mb-2 size-5 text-[var(--accent)] opacity-60" />
      <p className="text-2xl font-bold text-[var(--accent)]">{statValue}</p>
      <p className="text-xs text-[var(--muted)]">{item.label}</p>
    </motion.article>
  )
}

export default function HomeHeroSection({ goTo }) {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef(null)
  const [desktopScrollEffect, setDesktopScrollEffect] = useState(false)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const syncDesktopScrollEffect = () => setDesktopScrollEffect(mediaQuery.matches)

    syncDesktopScrollEffect()
    mediaQuery.addEventListener('change', syncDesktopScrollEffect)

    return () => mediaQuery.removeEventListener('change', syncDesktopScrollEffect)
  }, [])

  const heroMotionStyle = !shouldReduceMotion && desktopScrollEffect
    ? { y: heroY, opacity: heroOpacity }
    : undefined

  return (
    <section ref={heroRef} className="relative overflow-hidden px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 md:pt-24 lg:pt-28">
      <GridBackground />
      {!shouldReduceMotion && <FloatingBubbles />}

      <motion.div
        style={heroMotionStyle}
        className="relative z-10 mx-auto max-w-7xl"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="space-y-6 sm:space-y-7"
          >
            <motion.p
              className="section-badge inline-flex items-center gap-2"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <ShieldCheck className="size-4" /> Official WhatsApp API Platform
            </motion.p>

            <motion.h1
              className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              Grow your business with{' '}
              <span className="relative">
                <span className="text-[var(--accent)]">
                  <TypedText words={['WhatsApp API', 'Smart Campaigns', 'Sales Automation', 'Customer Support']} />
                </span>
              </span>
            </motion.h1>

            <motion.p
              className="max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Run campaigns, automate replies, engage customers, and grow sales from one WhatsApp
              marketing platform built on official WhatsApp APIs.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <GlowButton
                href="/features"
                onClick={(e) => { e.preventDefault(); goTo('/features') }}
                className="w-full sm:w-auto"
              >
                Explore Features <ArrowRight className="size-4" />
              </GlowButton>
              <GlowButton
                href="/use-cases"
                onClick={(e) => { e.preventDefault(); goTo('/use-cases') }}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Play className="size-4" /> View Use Cases
              </GlowButton>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-3 pt-2 sm:gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {HERO_BENEFITS.map((benefit) => (
                <span key={benefit} className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                  <Check className="size-3.5 text-[var(--accent)]" /> {benefit}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="min-w-0 space-y-5">
            <motion.figure
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              className="overflow-hidden rounded-3xl lg:-mt-8"
            >
              <img
                src={`${HERO_EASY_INTEGRATION_IMAGE}?v=${ASSET_VERSION}`}
                alt="AutoSensy WhatsApp Business API integration visual"
                className="h-[240px] w-full rounded-3xl object-contain object-top sm:h-[310px] md:h-[360px] lg:h-[385px]"
                width="1222"
                height="1264"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </motion.figure>

            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {HERO_STATS.map((item, index) => (
                <StatCard key={item.label} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
