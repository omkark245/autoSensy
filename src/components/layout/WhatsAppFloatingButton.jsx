import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_HREF = 'https://wa.me/919960756292?text=Hi%20AutoSensy%2C%20I%20want%20to%20know%20more.'

export default function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 grid size-14 place-items-center rounded-full bg-[#22d366] text-white shadow-[0_14px_32px_rgba(34,211,102,0.38)] transition-colors hover:bg-[#1fbd5d] sm:bottom-8 sm:right-8 sm:size-[74px]"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
    >
      <FaWhatsapp className="size-8 sm:size-11" aria-hidden="true" />
    </motion.a>
  )
}
