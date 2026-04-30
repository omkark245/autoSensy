import { motion } from 'framer-motion'
import { useState } from 'react'

export default function GlowButton({
  children,
  onClick,
  href,
  target,
  rel,
  disabled = false,
  type = 'button',
  variant = 'primary',
  className = '',
}) {
  const [hovered, setHovered] = useState(false)
  const base = 'button-hover-fast relative inline-flex max-w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-center text-sm font-semibold leading-snug sm:px-6'
  const primary = 'bg-[var(--accent)] text-[var(--accent-contrast)]'
  const secondary = 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]'
  const disabledState = disabled ? 'cursor-not-allowed opacity-60' : ''
  const classes = `${base} ${variant === 'primary' ? primary : secondary} ${disabledState} ${className}`

  const sharedProps = {
    whileHover: {
      y: -1,
      transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] },
    },
    whileTap: {
      y: 0,
      transition: { duration: 0.08, ease: 'easeOut' },
    },
    onHoverStart: () => setHovered(true),
    onHoverEnd: () => setHovered(false),
    className: classes,
  }

  const content = (
    <>
      {hovered && variant === 'primary' && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        />
      )}
      <span className="relative z-10 flex min-w-0 items-center justify-center gap-2">{children}</span>
      {variant === 'primary' && (
        <motion.span
          className="absolute -inset-1 rounded-full opacity-0"
          style={{ background: 'var(--accent)' }}
          animate={{ opacity: hovered ? 0.35 : 0 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
        />
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault()
            return
          }

          onClick?.(event)
        }}
        target={target}
        rel={rel}
        aria-disabled={disabled}
        {...sharedProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        {...sharedProps}
      >
        {content}
      </motion.button>
  )
}
