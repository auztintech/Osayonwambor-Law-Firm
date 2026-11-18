import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import { practiceAreas } from '../data/practiceAreas'
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, socialIcons } from './icons'

const EASE = [0.22, 1, 0.36, 1]
const VIEW = { once: true, margin: '0px 0px -5% 0px' }

const colTitle = 'font-display text-[15px] font-semibold uppercase tracking-[0.22em] text-gold'
const link = 'text-white/70 transition-colors duration-300 hover:text-white'
const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative bg-[#141313] text-white">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gold" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto grid max-w-[1920px] gap-12 px-5 py-[clamp(56px,6vw,110px)] md:px-8 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr] lg:gap-10 xl:px-12 2xl:px-32"
      >
        {/* brand */}
        <div>
          <Link to="/" aria-label={`${site.fullName} — home`} className="inline-block">
            <span className="block font-display text-[34px] font-bold uppercase leading-[0.95] sm:text-[40px]">
              {site.name}
            </span>
            <span className="mt-2 flex items-center gap-2.5">
              <span className="h-[2px] w-5 bg-gold" />
              <span className="text-[11px] font-medium uppercase tracking-[0.42em] text-gold/90 sm:text-[12px]">
                {site.tagline}
              </span>
              <span className="h-[2px] w-5 bg-gold" />
            </span>
          </Link>
          <p className="mt-6 max-w-[34ch] leading-[1.9] text-white/60">
            {site.descriptor}. Honest, practical legal counsel for individuals, families and
            businesses in Benin City and beyond.
          </p>
          <ul className="mt-7 flex gap-3">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.id]
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-11 w-11 place-items-center border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* explore */}
        <nav aria-label="Footer">
          <p className={colTitle}>Explore</p>
          <ul className="mt-5 space-y-3">
            <li>
              <Link to="/" className={link}>
                Home
              </Link>
            </li>
            {site.nav.map((n) => (
              <li key={n.id}>
                <Link to={n.path} className={link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* practice areas */}
        <div>
          <p className={colTitle}>Practice areas</p>
          <ul className="mt-5 space-y-3">
            {practiceAreas.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link to={`/what-we-do/${p.slug}`} className={link}>
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/what-we-do"
                className="group inline-flex items-center gap-2 font-semibold text-gold transition-colors hover:text-white"
              >
                All practice areas
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </div>

        {/* contact */}
        <div>
          <p className={colTitle}>Contact</p>
          <ul className="mt-5 space-y-4 text-white/70">
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span className="leading-relaxed">{site.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span className="flex flex-col gap-1">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className={link}>
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className={`${link} break-all`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1920px] flex-col gap-4 px-5 py-6 text-[14px] text-white/50 sm:flex-row sm:items-center sm:justify-between md:px-8 xl:px-12 2xl:px-32">
          <p>
            © {YEAR} {site.fullName}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex cursor-pointer items-center gap-2 self-start font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-gold sm:self-auto"
          >
            Back to top
            <ArrowIcon className="h-4 w-4 -rotate-90 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  )
}
