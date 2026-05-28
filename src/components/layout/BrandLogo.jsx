export const BRAND_LOGO_SRC = '/assets/Logo/breathing-space-final-logo-1.webp'

export default function BrandLogo({ className = 'h-10 w-auto', alt = 'AutoSensy WhatsApp marketing automation logo' }) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={alt}
      className={`${className} mix-blend-multiply`}
      loading="eager"
      decoding="async"
    />
  )
}
