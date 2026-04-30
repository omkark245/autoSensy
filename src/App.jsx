import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MobileNavDrawer from './components/layout/MobileNavDrawer'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import WhatsAppFloatingButton from './components/layout/WhatsAppFloatingButton'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import usePageMeta from './hooks/usePageMeta'

function normalizePath(path) {
  if (!path) {
    return '/'
  }

  const normalized = path.replace(/\/+$/, '')
  return normalized || '/'
}

const HomePage = lazy(() => import('./pages/HomePage'))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'))
const UseCasesPage = lazy(() => import('./pages/UseCasesPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const ROUTES = {
  '/': {
    component: HomePage,
    title: 'AutoSensy | WhatsApp Marketing and Automation',
    description: 'Run WhatsApp campaigns, chat automation, use cases, and commerce workflows from one AutoSensy platform.',
  },
  '/features': {
    component: FeaturesPage,
    title: 'Features | AutoSensy',
    description: 'Explore AutoSensy features for WhatsApp marketing, chatbot journeys, team inboxes, forms, and payments.',
  },
  '/use-cases': {
    component: UseCasesPage,
    title: 'Use Cases | AutoSensy',
    description: 'See practical WhatsApp automation use cases across ecommerce, education, travel, finance, and service teams.',
  },
  '/pricing': {
    component: PricingPage,
    title: 'Pricing | AutoSensy',
    description: 'View AutoSensy pricing plans including monthly, yearly, and upcoming lifetime plan options.',
  },
  '/contact': {
    component: ContactPage,
    title: 'Contact | AutoSensy',
    description: 'Request a demo, discuss your WhatsApp workflow, or contact AutoSensy for onboarding and support.',
  },
  '*': {
    component: NotFoundPage,
    title: 'Page Not Found | AutoSensy',
    description: 'The requested AutoSensy page could not be found.',
  },
}

export default function App() {
  const [pathname, setPathname] = useState(normalizePath(window.location.pathname))
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef(null)

  const route = useMemo(() => ROUTES[pathname] ?? ROUTES['*'], [pathname])

  usePageMeta({
    title: route.title,
    description: route.description,
    pathname,
  })

  useEffect(() => {
    const onPopState = () => {
      setPathname(normalizePath(window.location.pathname))
      setMenuOpen(false)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    requestAnimationFrame(() => mainRef.current?.focus())
  }, [pathname])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const goTo = useCallback((path) => {
    if (path === pathname) {
      setMenuOpen(false)
      return
    }

    window.history.pushState({}, '', path)
    setPathname(normalizePath(path))
    setMenuOpen(false)
  }, [pathname])

  const ActivePage = route.component

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-bg min-h-screen text-[var(--text)]">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ScrollProgressBar />

        <SiteHeader
          pathname={pathname}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((open) => !open)}
          goTo={goTo}
        />
        <MobileNavDrawer
          pathname={pathname}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((open) => !open)}
          goTo={goTo}
        />

        <AnimatePresence mode="wait">
          <motion.main
            id="main-content"
            ref={mainRef}
            key={pathname}
            tabIndex={-1}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <Suspense
              fallback={
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20" role="status" aria-live="polite">
                  <div className="card-shadow-soft main-card-accent rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)] sm:p-8">
                    Loading page...
                  </div>
                </div>
              }
            >
              <ActivePage goTo={goTo} />
            </Suspense>
          </motion.main>
        </AnimatePresence>

        <SiteFooter goTo={goTo} pathname={pathname} />
        <WhatsAppFloatingButton />
      </div>
    </MotionConfig>
  )
}
