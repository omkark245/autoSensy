import { MessageCircleQuestion } from 'lucide-react'
import ContentShell from '../components/ui/ContentShell'
import { FAQ_ITEMS } from '../data/seoData'

export default function FAQPage() {
  return (
    <ContentShell
      badge="FAQs"
      title="AutoSensy FAQs"
      subtitle="Answers to common questions about AutoSensy, WhatsApp marketing automation, chatbot workflows, industry use cases, demos, and onboarding."
    >
      <div className="grid gap-4">
        {FAQ_ITEMS.map((item) => (
          <article
            key={item.question}
            className="card-shadow-soft card-no-accent rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                <MessageCircleQuestion className="size-4 text-[var(--accent)]" />
              </span>
              <div>
                <h2 className="text-base font-bold">{item.question}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ContentShell>
  )
}

