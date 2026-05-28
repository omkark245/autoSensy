import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ASSET_VERSION, HOME_FEATURE_CARDS } from '../../data/siteData'
import GlowButton from '../ui/GlowButton'

const FEATURE_CARD_STYLES = [
  {
    frame: 'bg-[linear-gradient(160deg,#f8fafc_0%,#edfdf3_100%)]',
    orb: 'bg-[color:rgba(3,186,106,0.10)]',
  },
  {
    frame: 'bg-[linear-gradient(160deg,#f8fafc_0%,#eff6ff_100%)]',
    orb: 'bg-[color:rgba(59,130,246,0.10)]',
  },
  {
    frame: 'bg-[linear-gradient(160deg,#f8fafc_0%,#fff7ed_100%)]',
    orb: 'bg-[color:rgba(249,115,22,0.10)]',
  },
  {
    frame: 'bg-[linear-gradient(160deg,#f8fafc_0%,#f3f4f6_100%)]',
    orb: 'bg-[color:rgba(15,23,42,0.08)]',
  },
]

function HomeFeatureCard({ feature, index }) {
  const style = FEATURE_CARD_STYLES[index] ?? FEATURE_CARD_STYLES[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -3, transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] } }}
      className="card-shadow-soft card-hover-fast card-no-accent group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-6 text-center hover:shadow-[0_16px_40px_rgba(2,28,16,0.08)] md:px-6"
    >
      <div className={`pointer-events-none absolute -right-8 -top-8 size-24 rounded-full opacity-60 transition-transform duration-300 group-hover:scale-110 ${style.orb}`} />
      <div className={`relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/70 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ${style.frame}`}>
        <img
          src={`${feature.image}?v=${ASSET_VERSION}`}
          alt={feature.alt}
          width="512"
          height="512"
          loading="lazy"
          decoding="async"
          className="h-16 w-16 object-contain md:h-[4.5rem] md:w-[4.5rem]"
          draggable={false}
        />
      </div>
      <h3 className="mt-5 text-lg font-black leading-tight tracking-tight sm:text-xl md:text-[1.55rem] xl:text-[1.75rem]">{feature.title}</h3>
      <p className="mt-3 max-w-none text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7 md:max-w-[17ch]">
        {feature.text}
      </p>
    </motion.article>
  )
}

export default function HomeFeaturesSection({ goTo }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-[4.5rem]" id="home-features">
      <div className="card-shadow-soft main-card-accent relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 md:p-10 xl:p-12">
        <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_68%)]" />
        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
            Core Features
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">Our Features</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {HOME_FEATURE_CARDS.map((item, index) => (
            <HomeFeatureCard key={item.title} feature={item} index={index} />
          ))}
        </div>
        <div className="mt-8 flex justify-center md:mt-10">
          <GlowButton
            href="/features"
            onClick={(event) => {
              event.preventDefault()
              goTo('/features')
            }}
            className="w-full sm:w-auto"
          >
            See More Features <ArrowRight className="size-4" />
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
