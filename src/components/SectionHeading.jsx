import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
export const VIEW = { once: true, margin: '0px 0px -12% 0px' }

/** "What We Do ———" : brown label followed by a gold line that draws itself */
export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-[clamp(20px,2.4vw,46px)]">
      <motion.p
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-display text-[clamp(20px,1.55vw,30px)] font-semibold text-clay"
      >
        {children}
      </motion.p>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        className="mt-1 h-[2px] w-[clamp(60px,6.1vw,117px)] origin-left bg-gold"
      />
    </div>
  )
}

/** Big heading that reveals word by word as it scrolls into view */
export function RevealHeading({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={VIEW}
      transition={{ staggerChildren: 0.05 }}
      aria-label={text}
      className={`text-[clamp(26px,2.7vw,52px)] font-semibold leading-[1.38] text-ink ${className}`}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}