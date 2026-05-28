import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  BRAND_ALIASES,
  CLIENT_PROFILES,
  CORE_TOPICS,
  FAQ_ITEMS,
  NOT_FOUND_SEO,
  SEO_ROUTES,
  SOCIAL_PROFILES,
  SITE_IMAGE,
  SITE_LOCALE,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  getAbsoluteAssetUrl,
  getCanonicalUrl,
} from '../src/data/seoData.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const indexFile = path.join(distDir, 'index.html')
const routeEntries = Object.entries(SEO_ROUTES)
const today = new Date().toISOString().slice(0, 10)
const unusedDistAssets = [
  'assets/img/dashboard.png',
  'assets/img/16d60501-3b42-4955-95fe-94552d3e933f.png',
  'assets/img/dashboard-preview.png',
  'assets/img/Gemini_Generated_Image_2yj7hn2yj7hn2yj7.png',
  'assets/img/Gemini_Generated_Image_2yj7hn2yj7hn2yj7 (1).png',
  'assets/img/Gemini_Generated_Image_2yj7hn2yj7hn2yj7 (2).png',
  'assets/img/femal.jpg',
  'assets/clients/itroots.png',
  'assets/clients/insurancemajha.png',
  'assets/clients/quick-print-logo.png',
  'assets/profiles/priya-joshi.png',
  'assets/profiles/rohan-patil.png',
  'assets/profiles/arjun-kulkarni.png',
]

if (!existsSync(indexFile)) {
  throw new Error(`Missing build output: ${indexFile}`)
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeScriptJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function routeUrl(pathname) {
  return getCanonicalUrl(pathname)
}

function buildBreadcrumbSchema(pathname, seo) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: SITE_NAME,
      item: SITE_URL,
    },
  ]

  if (pathname !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: seo.heading,
      item: routeUrl(pathname),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

function buildPageSchema(pathname, seo) {
  const url = routeUrl(pathname)
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      alternateName: BRAND_ALIASES,
      url: SITE_URL,
      logo: getAbsoluteAssetUrl(SITE_LOGO),
      sameAs: SOCIAL_PROFILES,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      description: SEO_ROUTES['/'].description,
      knowsAbout: CORE_TOPICS,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2nd, Saikripa, Chandrabhaga Nagar, Trimurti Chowk',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        postalCode: '411046',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'mr'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      alternateName: BRAND_ALIASES,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      image: getAbsoluteAssetUrl(SITE_IMAGE),
      description: SEO_ROUTES['/'].description,
      brand: {
        '@type': 'Brand',
        name: SITE_NAME,
        alternateName: BRAND_ALIASES,
      },
      offers: {
        '@type': 'Offer',
        price: '800',
        priceCurrency: 'INR',
        category: 'subscription',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: BRAND_ALIASES,
      url: SITE_URL,
      inLanguage: SITE_LOCALE.replace('_', '-'),
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      alternateName: BRAND_ALIASES,
      url: SITE_URL,
      image: getAbsoluteAssetUrl(SITE_IMAGE),
      logo: getAbsoluteAssetUrl(SITE_LOGO),
      sameAs: SOCIAL_PROFILES,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      priceRange: 'INR 800+',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2nd, Saikripa, Chandrabhaga Nagar, Trimurti Chowk',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        postalCode: '411046',
        addressCountry: 'IN',
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'WhatsApp Marketing Automation',
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      serviceType: 'WhatsApp marketing automation, chatbot workflows, team inbox routing, forms, payments, and customer follow-up automation',
      areaServed: 'IN',
      description: SEO_ROUTES['/'].description,
    },
    {
      '@context': 'https://schema.org',
      '@type': pathname === '/' ? 'WebPage' : 'CollectionPage',
      name: seo.title,
      headline: seo.heading,
      url,
      description: seo.description,
      about: CORE_TOPICS,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: getAbsoluteAssetUrl(SITE_IMAGE),
      },
    },
    buildBreadcrumbSchema(pathname, seo),
  ]

  if (seo.routeType === 'service' || seo.routeType === 'industry') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: seo.heading,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      serviceType: seo.heading,
      areaServed: 'IN',
      description: seo.description,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
      },
    })
  }

  if (seo.routeType === 'article' || seo.routeType === 'caseStudy') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seo.heading,
      name: seo.title,
      url,
      description: seo.description,
      inLanguage: SITE_LOCALE.replace('_', '-'),
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: getAbsoluteAssetUrl(SITE_LOGO),
        },
      },
      mainEntityOfPage: url,
      mentions: seo.routeType === 'caseStudy'
        ? CLIENT_PROFILES.map((client) => ({
          '@type': 'Organization',
          name: client.name,
          url: client.url,
        }))
        : undefined,
    })
  }

  if (pathname === '/faq' || seo.faqs?.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (seo.faqs ?? FAQ_ITEMS).map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  return schema
}

function buildMetaBlock(pathname, seo) {
  const canonicalUrl = routeUrl(pathname)
  const imageUrl = getAbsoluteAssetUrl(SITE_IMAGE)
  const robots = seo.robots ?? 'index, follow'
  const schema = buildPageSchema(pathname, seo)

  return `    <!-- SEO_META_START -->
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords)}" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:locale" content="${escapeHtml(SITE_LOCALE)}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:image:alt" content="${escapeHtml(`${SITE_NAME} WhatsApp marketing dashboard`)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    <script type="application/ld+json">${escapeScriptJson(schema)}</script>
    <!-- SEO_META_END -->`
}

function buildSectionFallback(seo) {
  if (!seo.sections?.length) {
    return ''
  }

  return seo.sections.map((section) => {
    const points = section.points?.length
      ? `<ul>${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>`
      : ''
    const links = section.links?.length
      ? `<p>${section.links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join(' ')}</p>`
      : ''

    return `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p>${points}${links}</section>`
  }).join('')
}

function buildFaqFallback(seo) {
  const faqs = seo.faqs ?? (seo.heading === SEO_ROUTES['/faq'].heading ? FAQ_ITEMS : [])

  if (!faqs.length) {
    return ''
  }

  return `<section><h2>Common questions</h2>${faqs.map((item) => (
    `<article><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></article>`
  )).join('')}</section>`
}

function buildRouteFallbackLinks() {
  return routeEntries.map(([pathname, seo]) => (
    `<a href="${escapeHtml(pathname)}">${escapeHtml(seo.heading)}</a>`
  )).join('')
}

function buildNoScriptBlock(seo) {
  return `    <noscript data-seo-fallback>
      <main>
        <h1>${escapeHtml(seo.heading)}</h1>
        <p>${escapeHtml(seo.summary)}</p>
        ${buildSectionFallback(seo)}
        ${buildFaqFallback(seo)}
        <nav aria-label="Primary pages">
          ${buildRouteFallbackLinks()}
        </nav>
      </main>
    </noscript>`
}

function applySeo(html, pathname, seo) {
  const metaBlock = buildMetaBlock(pathname, seo)
  const withMeta = html.includes('<!-- SEO_META_START -->')
    ? html.replace(/    <!-- SEO_META_START -->[\s\S]*?    <!-- SEO_META_END -->/, metaBlock)
    : html.replace(/    <title>[\s\S]*?<\/title>/, metaBlock)

  const noScriptBlock = buildNoScriptBlock(seo)
  const withoutOldNoScript = withMeta.replace(/\s*<noscript data-seo-fallback>[\s\S]*?<\/noscript>/, '')

  return withoutOldNoScript.replace('    <div id="root"></div>', `    <div id="root"></div>\n${noScriptBlock}`)
}

async function writeRoutePage(pathname, seo, baseHtml) {
  const html = applySeo(baseHtml, pathname, seo)

  if (pathname === '/') {
    await writeFile(indexFile, html)
    return
  }

  const routeDir = path.join(distDir, pathname.slice(1))
  await mkdir(routeDir, { recursive: true })
  await writeFile(path.join(routeDir, 'index.html'), html)
}

function buildSitemap() {
  const urls = routeEntries.map(([pathname, seo]) => `  <url>
    <loc>${escapeHtml(routeUrl(pathname))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${seo.changefreq}</changefreq>
    <priority>${seo.priority}</priority>
  </url>`)

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
}

async function pruneUnusedDistAssets() {
  await Promise.all(
    unusedDistAssets.map((assetPath) => (
      rm(path.join(distDir, assetPath), { force: true })
    )),
  )
}

const baseHtml = await readFile(indexFile, 'utf8')

await Promise.all(routeEntries.map(([pathname, seo]) => writeRoutePage(pathname, seo, baseHtml)))
await writeFile(path.join(distDir, '404.html'), applySeo(baseHtml, '/404', NOT_FOUND_SEO))
await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap())
await writeFile(path.join(distDir, 'robots.txt'), buildRobots())
await pruneUnusedDistAssets()

console.log(`Created SEO route pages for: ${routeEntries.map(([pathname]) => pathname).join(', ')}`)
