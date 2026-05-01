import { motion } from 'framer-motion'
import { Menu, Phone } from 'lucide-react'
import { MAIN_ROUTES } from '../../data/siteData'
import AppLink from '../navigation/AppLink'
import GlowButton from '../ui/GlowButton'
import BrandLogo from './BrandLogo'

const DEMO_CALL_HREF = 'tel:+919960756292'

export default function SiteHeader({ pathname, menuOpen, onToggleMenu, goTo }) {
  const activeMain = MAIN_ROUTES.find((route) => route.path === pathname)

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface-strong)]"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4" aria-label="Primary">
        <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
          <AppLink
            to="/"
            goTo={goTo}
            current={pathname === '/'}
            className="inline-flex items-center"
            aria-label="AutoSensy home"
          >
            <BrandLogo className="h-9 w-auto sm:h-12" alt="AutoSensy" />
          </AppLink>
        </motion.div>

        <div className="hidden gap-1 text-[15.5px] md:flex">
          {MAIN_ROUTES.map((item) => (
            <motion.div key={item.path} whileHover={{ y: -1 }}>
              <AppLink
                to={item.path}
                goTo={goTo}
                current={activeMain?.path === item.path}
                className={`relative block rounded-full px-3 py-1.5 font-bold after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-[40%] after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-[var(--accent)] after:opacity-0 after:transition after:duration-200 after:ease-out after:content-[''] hover:after:scale-x-100 hover:after:opacity-100 ${
                  activeMain?.path === item.path
                    ? 'text-[var(--accent)] after:scale-x-100 after:opacity-100'
                    : 'text-[var(--muted)] hover:text-[var(--accent)]'
                }`}
              >
                {item.label}
              </AppLink>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <GlowButton
            href={DEMO_CALL_HREF}
            className="hidden sm:inline-flex"
          >
            Call for Demo <Phone className="size-3.5" />
          </GlowButton>

          <motion.button
            onClick={onToggleMenu}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="button-hover-fast flex size-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] md:hidden hover:border-[var(--accent)] hover:text-[var(--accent)]"
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="size-4" />
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}
