import SectionHeader from '../components/ui/SectionHeader'
import { ASSET_VERSION, USE_CASE_CARDS } from '../data/siteData'

function UseCaseCard({ item }) {
  return (
    <article className="use-case-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-500 ease-out hover:-translate-y-1">

      {/* sliding green overlay */}
      <div className="use-case-overlay pointer-events-none absolute inset-0 translate-y-full rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[#03ba6a] group-hover:translate-y-0" />

      {/* border glow */}
      <div className="use-case-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_0_1.5px_var(--accent)] group-hover:opacity-100" />

      {/* image block */}
      <div className="relative z-10 overflow-hidden rounded-t-2xl bg-[var(--accent-soft)] p-3">
        <div className="aspect-[16/10] overflow-hidden rounded-xl">
          <img
            src={`${item.image}?v=${ASSET_VERSION}`}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </div>

      {/* text block */}
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-6 pt-5 text-center">
        <h3 className="use-case-text text-lg font-black leading-snug tracking-tight text-[var(--text)] group-hover:text-white sm:text-[1.25rem]">
          {item.title}
        </h3>
        <p className="use-case-text mt-3 flex-1 text-sm leading-6 text-[var(--muted)] group-hover:text-[rgba(255,255,255,0.82)] sm:text-[14.5px] sm:leading-7">
          {item.about}
        </p>
      </div>

      {/* decorative letter */}
      <span
        aria-hidden="true"
        className="use-case-text pointer-events-none absolute -right-4 -top-4 z-0 select-none text-[7rem] font-black leading-none text-[var(--accent-soft)] group-hover:text-[rgba(255,255,255,0.08)]"
      >
        {item.title.charAt(0)}
      </span>
    </article>
  )
}

export default function UseCasesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      {/* both in and out are slow at 0.65s */}
      <style>{`
        .use-case-overlay {
          transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .use-case-glow {
          transition: opacity 0.8s ease-in-out;
        }
        .use-case-text {
          transition: color 0.1s ease-in-out;
        }
      `}</style>

      <SectionHeader
        badge="Use Cases"
        title="Built for industry-specific WhatsApp use cases"
        subtitle="Explore how different industries use AutoSensy to manage customer communication, automate repetitive workflows, improve engagement, and drive faster conversions through WhatsApp. Each use case is designed to reflect real business scenarios where timely messaging, follow-ups, and support directly improve customer experience and operational efficiency."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {USE_CASE_CARDS.map((item) => (
          <UseCaseCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  )
}
