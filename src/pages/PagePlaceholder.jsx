import { motion } from 'framer-motion'

/**
 * Temporary body for each menu page.
 * Swap this out for the real section as the screenshots arrive.
 */
export default function PagePlaceholder({ title }) {
  return (
    <section className="grid min-h-[60vh] place-items-center px-5 py-24 text-center">
      <div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-6 h-[3px] w-16 origin-left bg-gold"
        />
        <h1 className="font-display text-4xl font-semibold uppercase tracking-wide text-clay sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-[#55575e]">This page is ready for its design.</p>
      </div>
    </section>
  )
}
