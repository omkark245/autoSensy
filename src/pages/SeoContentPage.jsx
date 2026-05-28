import { CheckCircle2, ExternalLink, MessageCircleQuestion } from 'lucide-react'
import ContentShell from '../components/ui/ContentShell'
import { getSeoContentPage } from '../data/seoData'

export default function SeoContentPage({ pathname = '/' }) {
  const page = getSeoContentPage(pathname)

  if (!page) {
    return null
  }

  return (
    <ContentShell
      badge={page.badge}
      title={page.heading}
      subtitle={page.summary}
    >
      <div className="grid gap-5">
        {page.sections?.map((section) => (
          <article
            key={section.title}
            className="card-shadow-soft card-no-accent rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
          >
            <h2 className="text-lg font-black tracking-tight text-[var(--text)]">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{section.text}</p>
            {section.points?.length > 0 && (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-6 text-[var(--muted)]">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.links?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {section.links.map((link) => {
                  const isExternal = /^https?:\/\//i.test(link.href)

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noreferrer' : undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {link.label}
                      {isExternal && <ExternalLink className="size-3.5" aria-hidden="true" />}
                    </a>
                  )
                })}
              </div>
            )}
          </article>
        ))}

        {page.faqs?.length > 0 && (
          <section className="grid gap-4" aria-label={`${page.heading} FAQs`}>
            {page.faqs.map((item) => (
              <article
                key={item.question}
                className="card-shadow-soft card-no-accent rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                    <MessageCircleQuestion className="size-4 text-[var(--accent)]" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold">{item.question}</h2>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </ContentShell>
  )
}
