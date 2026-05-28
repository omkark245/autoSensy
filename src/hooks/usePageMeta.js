import { useEffect } from 'react'
import { getAbsoluteAssetUrl, getCanonicalUrl, SITE_IMAGE, SITE_LOCALE, SITE_NAME } from '../data/seoData'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', url)
}

export default function usePageMeta({ title, description, keywords, robots = 'index, follow', pathname }) {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(pathname)
    const imageUrl = getAbsoluteAssetUrl(SITE_IMAGE)

    document.title = title

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    })

    upsertMeta('meta[name="keywords"]', {
      name: 'keywords',
      content: keywords,
    })

    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: robots,
    })

    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    })

    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })

    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    })

    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME,
    })

    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: SITE_LOCALE,
    })

    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl,
    })

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })

    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    })

    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })

    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    })

    upsertCanonical(canonicalUrl)
  }, [description, keywords, pathname, robots, title])
}
