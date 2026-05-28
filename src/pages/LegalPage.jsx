import ContentShell from '../components/ui/ContentShell'

export default function LegalPage({ badge, title, subtitle, sections, tone = 'default' }) {
  const isWarning = tone === 'warning'

  return (
    <ContentShell badge={badge} title={title} subtitle={subtitle}>
      <div className="space-y-5">
        {sections.map((section) => (
          <section
            key={section.title}
            className={`card-shadow-soft card-no-accent rounded-2xl border p-5 sm:p-6 ${
              isWarning
                ? 'border-[color:rgba(220,38,38,0.28)] bg-[color:rgba(254,242,242,0.58)]'
                : 'border-[var(--border)] bg-[var(--surface)]'
            }`}
          >
            <h2 className={`text-base font-bold ${isWarning ? 'text-[#991b1b]' : ''}`}>{section.title}</h2>
            <ul className="mt-4 space-y-3">
              {section.items.map((item) => (
                <li key={item} className="text-sm leading-7 text-[var(--muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ContentShell>
  )
}
