import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Top band for inner pages: breadcrumb, label, title and an optional lead.
 * `crumbs` is a list of { label, to }; the last one is the current page.
 */
export default function PageHeader({ label, title, lead, crumbs = [], children }) {
  return (
    <section className="relative overflow-hidden bg-[#f7f8fc]">
      {/* faint diagonal rule texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background:repeating-linear-gradient(135deg,rgba(139,74,58,0.05)_0_1px,transparent_1px_18px)]"
      />
      <div className="relative mx-auto max-w-[1920px] px-5 py-[clamp(48px,6.5vw,124px)] md:px-8 xl:px-12 2xl:px-32">
        {crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ol className="flex flex-wrap items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-[#8a8c93] sm:text-[14px]">
              <li>
                <Link to="/" className="transition-colors hover:text-clay">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span className="h-[2px] w-3 bg-gold" aria-hidden="true" />
                  {c.to && i < crumbs.length - 1 ? (
                    <Link to={c.to} className="transition-colors hover:text-clay">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-clay">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        {label && (
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-[clamp(28px,3.4vw,64px)] flex items-center gap-[clamp(16px,2vw,36px)]"
          >
            <p className="font-display text-[clamp(18px,1.4vw,26px)] font-semibold text-clay">{label}</p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              className="mt-1 h-[2px] w-[clamp(48px,5vw,100px)] origin-left bg-gold"
            />
          </motion.div>
        )}

        <h1 className="mt-5 max-w-[1200px] font-display text-[clamp(36px,4.4vw,84px)] font-semibold uppercase leading-[1.04] text-ink">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              {title}
            </motion.span>
          </span>
        </h1>

        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="mt-[clamp(16px,2vw,36px)] max-w-[860px] text-[clamp(16px,1.2vw,22px)] leading-[1.9] text-[#55575e]"
          >
            {lead}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  )
}
