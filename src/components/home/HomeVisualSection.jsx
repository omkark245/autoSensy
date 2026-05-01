import { motion } from 'framer-motion'

const CHAT_DASHBOARD_IMAGE = '/assets/img/dashboard.png?v=20260430b'

export default function HomeVisualSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <motion.figure
        className="overflow-hidden rounded-[22px] border border-slate-200 bg-[#eaf8ef] shadow-[0_18px_45px_rgba(15,23,42,0.10),0_34px_80px_rgba(3,186,106,0.24)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div className="relative aspect-[3/2] w-full">
          <img
            src={CHAT_DASHBOARD_IMAGE}
            alt="AutoSensy WhatsApp dashboard preview"
            className="block h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      </motion.figure>
    </section>
  )
}
