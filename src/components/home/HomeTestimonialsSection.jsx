import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import { TESTIMONIALS } from '../../data/siteData'
import SectionHeader from '../ui/SectionHeader'

function getInitials(label) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

function TestimonialCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -3, transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] } }}
      className="card-shadow-soft card-hover-fast card-no-accent relative overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[var(--surface)] p-5 hover:shadow-[0_18px_36px_rgba(2,28,16,0.07)]"
    >
      <div className="absolute right-4 top-3 text-5xl font-serif leading-none text-[var(--accent)] opacity-[0.15]">"</div>

      <div className="flex items-center gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-[var(--accent)]/25">
          {item.personImage ? (
            <img
              src={item.personImage}
              alt={item.personName ?? item.company}
              width="112"
              height="112"
              loading="lazy"
              decoding="async"
              draggable="false"
              className="h-full w-full object-cover"
            />
          ) : item.logo ? (
            <img
              src={item.logo}
              alt={`${item.company} logo`}
              width="112"
              height="112"
              loading="lazy"
              decoding="async"
              draggable="false"
              className="h-full w-full object-contain p-1.5"
            />
          ) : (
            <span className="text-base font-semibold tracking-tight text-[var(--accent-text)]">
              {item.initials ?? getInitials(item.company)}
            </span>
          )}
        </div>
        <div>
          <p className="text-base font-semibold tracking-tight">
            {item.personName ?? item.company}
          </p>
          <p className="mt-0.5 text-xs font-medium text-[var(--muted)]">
            {item.personRole ?? item.clientCompany}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
        {Array.from({ length: item.rating }).map((_, starIndex) => (
          <Star key={starIndex} className="size-3 fill-[var(--accent)] text-[var(--accent)]" />
        ))}
      </div>

      <p className="mt-3 min-h-24 text-sm leading-7 text-[var(--muted)]">"{item.quote}"</p>
      {item.website && (
        <a
          href={item.website}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]"
        >
          Visit {item.company} <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      )}
    </motion.article>
  )
}

export default function HomeTestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-[4.5rem]" id="testimonials">
      <SectionHeader
        badge="Testimonials"
        title="Businesses use this to scale WhatsApp communication"
        subtitle="Real business use cases focused on lead response, customer engagement, and conversion growth."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((item, index) => (
          <TestimonialCard key={`${item.company}-${item.clientCompany}`} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
