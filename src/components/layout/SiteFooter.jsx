import { motion } from 'framer-motion'
import { Mail, Phone, QrCode } from 'lucide-react'
import { FEATURES_LIST, MAIN_ROUTES } from '../../data/siteData'
import AppLink from '../navigation/AppLink'
import BrandLogo from './BrandLogo'
import GridBackground from './GridBackground'

export default function SiteFooter({ goTo, pathname }) {
  const featuredLinks = FEATURES_LIST.slice(0, 4)

  return (
    <motion.footer
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface-strong)] px-4 py-10 sm:px-6 sm:py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="hidden md:block">
        <GridBackground />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="border-b border-[var(--border)] pb-8 md:hidden">
          <div className="space-y-7">
            <div className="space-y-3">
              <BrandLogo className="h-10 w-auto" alt="AutoSensy" />
              <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
                WhatsApp-first automation platform for campaigns, chat workflows, team inbox routing, and conversion-focused customer communication.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--text)]">Quick Links</p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                {MAIN_ROUTES.map((route) => (
                  <AppLink
                    key={route.path}
                    to={route.path}
                    goTo={goTo}
                    current={pathname === route.path}
                    className={`text-sm font-medium transition-colors ${
                      pathname === route.path
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text)]'
                    }`}
                  >
                    {route.label}
                  </AppLink>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--text)]">Contact</p>
              <div className="mt-4 space-y-4">
                <a
                  href="mailto:autosensy@gmail.com"
                  className="flex min-w-0 items-center gap-3 text-sm text-[var(--text)]"
                >
                  <Mail className="size-4 shrink-0 text-[var(--accent)]" />
                  <span className="min-w-0 break-all">autosensy@gmail.com</span>
                </a>
                <a
                  href="tel:+919960756292"
                  className="flex items-center gap-3 text-sm text-[var(--text)]"
                >
                  <Phone className="size-4 shrink-0 text-[var(--accent)]" />
                  <span>9960756292</span>
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--text)]">Core Features</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
                {featuredLinks.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                    <span className="size-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden gap-8 border-b border-[var(--border)] pb-8 md:grid md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)_minmax(0,0.8fr)_minmax(0,0.95fr)]">
          <div>
            <BrandLogo className="h-12 w-auto sm:h-14" alt="AutoSensy" />
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">
              WhatsApp-first automation platform for campaigns, chat workflows, team inbox routing, and
              conversion-focused customer communication.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Quick Links</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--muted)]">
              {MAIN_ROUTES.map((route) => (
                <motion.div
                  key={route.path}
                  whileHover={{ x: 2 }}
                >
                  <AppLink
                    to={route.path}
                    goTo={goTo}
                    current={pathname === route.path}
                    className="inline-flex items-center gap-2 transition-colors hover:text-[var(--text)]"
                  >
                    <span>{route.label}</span>
                  </AppLink>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <a
                href="mailto:autosensy@gmail.com"
                className="flex min-w-0 items-center gap-3 rounded-2xl bg-[var(--surface)] px-4 py-3 transition-colors hover:text-[var(--text)]"
              >
                <Mail className="size-4 shrink-0 text-[var(--accent)]" />
                <span className="min-w-0 break-all text-sm text-[var(--text)]">autosensy@gmail.com</span>
              </a>
              <a
                href="tel:+919960756292"
                className="flex items-center gap-3 rounded-2xl bg-[var(--surface)] px-4 py-3 transition-colors hover:text-[var(--text)]"
              >
                <Phone className="size-4 shrink-0 text-[var(--accent)]" />
                <span className="text-sm text-[var(--text)]">9960756292</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Core Features</p>
            <div className="mt-4 flex flex-col gap-3">
              {featuredLinks.map((item) => (
                <p
                  key={item}
                  className="text-sm text-[var(--muted)]"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-center text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between md:text-left">
          <span>Copyright 2026 AutoSensy. All rights reserved.</span>
          <span className="inline-flex items-center justify-center gap-1.5">
            <QrCode className="size-3.5" /> WhatsApp-first
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
