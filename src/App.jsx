import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MobileNavDrawer from './components/layout/MobileNavDrawer'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import WhatsAppFloatingButton from './components/layout/WhatsAppFloatingButton'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import { getRouteSeo, getSeoContentPage } from './data/seoData'
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
const AboutPage = lazy(() => import('./pages/AboutPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage'))
const RefundCancellationPolicyPage = lazy(() => import('./pages/RefundCancellationPolicyPage'))
const SeoContentPage = lazy(() => import('./pages/SeoContentPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const ROUTES = {
  '/': {
    component: HomePage,
  },
  '/features': {
    component: FeaturesPage,
  },
  '/use-cases': {
    component: UseCasesPage,
  },
  '/pricing': {
    component: PricingPage,
  },
  '/contact': {
    component: ContactPage,
  },
  '/about': {
    component: AboutPage,
  },
  '/faq': {
    component: FAQPage,
  },
  '/privacy-policy': {
    component: PrivacyPolicyPage,
  },
  '/terms-and-conditions': {
    component: TermsAndConditionsPage,
  },
  '/refund-cancellation-policy': {
    component: RefundCancellationPolicyPage,
  },
  '*': {
    component: NotFoundPage,
  },
}

export default function App() {
  const [pathname, setPathname] = useState(normalizePath(window.location.pathname))
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef(null)

  const route = useMemo(() => {
    if (ROUTES[pathname]) {
      return ROUTES[pathname]
    }

    return getSeoContentPage(pathname) ? { component: SeoContentPage } : ROUTES['*']
  }, [pathname])
  const seo = useMemo(() => getRouteSeo(pathname), [pathname])

  usePageMeta({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots,
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
              <ActivePage goTo={goTo} pathname={pathname} />
            </Suspense>
          </motion.main>
        </AnimatePresence>

        <SiteFooter goTo={goTo} pathname={pathname} />
        <WhatsAppFloatingButton />
      </div>
    </MotionConfig>
  )
}
