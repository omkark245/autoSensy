import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Phone, X } from 'lucide-react'
import { MAIN_ROUTES } from '../../data/siteData'
import AppLink from '../navigation/AppLink'
import GlowButton from '../ui/GlowButton'
import BrandLogo from './BrandLogo'

const DEMO_CALL_HREF = 'tel:+919960756292'

export default function MobileNavDrawer({ pathname, menuOpen, onToggleMenu, goTo }) {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="mobile-navigation"
          className="fixed inset-0 z-[100] bg-[color:rgba(2,28,16,0.56)] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onToggleMenu}
        >
          <motion.div
            className="ml-auto flex h-screen w-[min(88vw,340px)] flex-col border-l border-[var(--border)] bg-[var(--surface)] px-4 pb-6 pt-4 shadow-[-18px_0_48px_rgba(2,28,16,0.18)] sm:px-5 sm:pb-8 sm:pt-5"
            initial={{ x: 52 }}
            animate={{ x: 0 }}
            exit={{ x: 52 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <AppLink
                to="/"
                goTo={goTo}
                current={pathname === '/'}
                className="inline-flex items-center text-[var(--text)]"
                aria-label="AutoSensy home"
              >
                <BrandLogo className="h-9 w-auto sm:h-10" alt="AutoSensy" />
              </AppLink>

              <button
                type="button"
                onClick={onToggleMenu}
                className="button-hover-fast flex size-9 items-center justify-center rounded-lg border border-[var(--accent)]/35 bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                aria-label="Close navigation menu"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto">
              <div className="space-y-1">
                {MAIN_ROUTES.map((item) => (
                  <AppLink
                    key={item.path}
                    to={item.path}
                    goTo={goTo}
                    current={pathname === item.path}
                    className={`button-hover-fast flex items-center justify-between rounded-2xl px-3 py-3 text-base font-semibold leading-tight ${
                      pathname === item.path
                        ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                        : 'bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="size-4 opacity-45" />
                  </AppLink>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <GlowButton
                  href={DEMO_CALL_HREF}
                  className="flex w-full items-center justify-center"
                >
                  Call for Demo <Phone className="size-4" />
                </GlowButton>

                <AppLink
                  to="/contact"
                  goTo={goTo}
                  className="button-hover-fast flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--text)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Contact Us <ArrowRight className="size-4" />
                </AppLink>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
