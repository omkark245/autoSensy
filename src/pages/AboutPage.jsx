import { CheckCircle2 } from 'lucide-react'
import ContentShell from '../components/ui/ContentShell'
import { ABOUT_POINTS } from '../data/trustPages'

export default function AboutPage() {
  return (
    <ContentShell
      badge="About"
      title="About AutoSensy"
      subtitle="AutoSensy is a WhatsApp-first marketing automation platform for businesses that want faster communication, cleaner follow-ups, and more organized customer conversations."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {ABOUT_POINTS.map((point) => (
          <article
            key={point.title}
            className="card-shadow-soft card-no-accent rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <CheckCircle2 className="size-5 text-[var(--accent)]" />
            <h2 className="mt-4 text-base font-bold">{point.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{point.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-sm leading-7 text-[var(--muted)] sm:p-6">
        <p>
          AutoSensy helps teams plan and operate WhatsApp marketing, chatbot automation, template messaging,
          customer support routing, forms, payments, and conversion-focused follow-ups from one business platform.
        </p>
      </div>
    </ContentShell>
  )
}

