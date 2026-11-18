import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import {
  ArrowIcon,
  CaretIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  socialIcons,
} from './icons'

const EASE = [0.22, 1, 0.36, 1]

/* ------------------------------------------------------------------ */
/* hooks                                                               */
/* ------------------------------------------------------------------ */

/** The nav item whose page is currently open (drives the sliding underline). */
function useActiveNav() {
  const { pathname } = useLocation()
  const item = site.nav.find((n) => pathname === n.path || pathname.startsWith(`${n.path}/`))
  return item ? item.id : null
}

/* ------------------------------------------------------------------ */
/* top info bar                                                        */
/* ------------------------------------------------------------------ */

const topItem = {
  hidden: { opacity: 0, y: -14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE },
  }),
}

function PhoneMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        whileTap={{ scale: 0.96 }}
        className="group flex cursor-pointer items-center gap-2.5 text-[15px] md:text-[16px] 2xl:text-[19px]"
      >
        <motion.span
          className="text-gold"
          whileHover={{ rotate: [0, -14, 12, -8, 0], transition: { duration: 0.6 } }}
        >
          <PhoneIcon className="h-[22px] w-[22px] 2xl:h-6 2xl:w-6" delay={0.2} />
        </motion.span>
        <span className="transition-colors group-hover:text-clay">{site.phones[0].label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <CaretIcon className="h-3 w-3 text-clay" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute left-0 top-full z-50 mt-3 w-56 origin-top-left border border-line bg-white p-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)]"
          >
            <span className="absolute -top-[7px] left-6 h-3 w-3 rotate-45 border-l border-t border-line bg-white" />
            {site.phones.map((p, i) => (
              <motion.li
                key={p.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
              >
                <a
                  href={p.href}
                  className="flex items-center justify-between px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-gold/15"
                >
                  {p.label}
                  <ArrowIcon className="h-4 w-4 text-gold" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function TopBar() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Osayomwanbor Law House, ${site.address}`,
  )}`

  return (
    <div className="h-[var(--top-h)] border-b border-line">
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-5 md:px-8 xl:px-12 2xl:px-32">
        <motion.div variants={topItem} initial="hidden" animate="visible" custom={0}>
          <PhoneMenu />
        </motion.div>

        <motion.a
          href={`mailto:${site.email}`}
          variants={topItem}
          initial="hidden"
          animate="visible"
          custom={1}
          whileTap={{ scale: 0.97 }}
          className="group hidden items-center gap-2.5 text-[15px] md:flex md:text-[16px] 2xl:text-[19px]"
        >
          <motion.span className="text-gold" whileHover={{ y: -3 }}>
            <MailIcon className="h-[22px] w-[22px] 2xl:h-6 2xl:w-6" delay={0.35} />
          </motion.span>
          <span className="transition-colors group-hover:text-clay">{site.email}</span>
        </motion.a>

        <motion.a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          title={site.address}
          variants={topItem}
          initial="hidden"
          animate="visible"
          custom={2}
          whileTap={{ scale: 0.97 }}
          className="group hidden min-w-0 items-center gap-2.5 text-[15px] xl:flex 2xl:text-[19px]"
        >
          <motion.span className="shrink-0 text-gold" whileHover={{ y: -3 }}>
            <PinIcon className="h-[22px] w-[22px] 2xl:h-6 2xl:w-6" delay={0.5} />
          </motion.span>
          <span className="truncate transition-colors group-hover:text-clay 2xl:hidden">
            No. 3, Evbayoboru Lane, Benin City, Edo State
          </span>
          <span className="hidden truncate transition-colors group-hover:text-clay 2xl:inline">
            {site.addressShort}
          </span>
        </motion.a>

        <ul className="flex items-center gap-4 md:gap-5 2xl:gap-6">
          {site.socials.map((s, i) => {
            const Icon = socialIcons[s.id]
            return (
              <motion.li
                key={s.id}
                variants={topItem}
                initial="hidden"
                animate="visible"
                custom={3 + i * 0.5}
              >
                <motion.a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-ink"
                  whileHover={{ y: -4, color: '#f4a53c' }}
                  whileTap={{ scale: 0.8, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                >
                  <Icon className="h-[21px] w-[21px] 2xl:h-6 2xl:w-6" />
                </motion.a>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* logo                                                                */
/* ------------------------------------------------------------------ */

function Logo({ scrolled }) {
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={`${site.fullName} — home`}
      className={`block origin-left transition-transform duration-500 ease-out ${
        scrolled ? 'scale-[0.86]' : 'scale-100'
      }`}
    >
      <span className="block overflow-hidden pb-[2px]">
        <motion.span
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="block font-display text-[33px] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-ink sm:text-[40px] xl:text-[44px] 2xl:text-[56px]"
        >
          {site.name}
        </motion.span>
      </span>

      <span className="mt-2 flex items-center gap-2.5 2xl:mt-3">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="h-[2px] w-5 origin-right bg-gold 2xl:w-7"
        />
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.7em' }}
          animate={{ opacity: 1, letterSpacing: '0.42em' }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="flex-1 whitespace-nowrap pl-[0.42em] text-center text-[10px] font-medium uppercase text-clay sm:text-[12px] 2xl:text-[16px]"
        >
          {site.tagline}
        </motion.span>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="h-[2px] w-5 origin-left bg-gold 2xl:w-7"
        />
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* desktop nav                                                         */
/* ------------------------------------------------------------------ */

function DesktopNav({ active }) {
  return (
    <nav aria-label="Primary" className="hidden xl:block">
      <ul className="flex items-center gap-8 2xl:gap-[46px]">
        {site.nav.map((item, i) => {
          const isActive = active === item.id
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.09, ease: EASE }}
            >
              <motion.div whileTap={{ scale: 0.93 }}>
              <Link
                to={item.path}
                className="group relative block py-2 text-[15px] font-semibold uppercase tracking-[0.2em] text-ink 2xl:text-[18px]"
              >
                <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                  {item.label}
                </span>
                {/* hover sweep */}
                <span className="absolute inset-x-0 -bottom-0.5 h-[3px] origin-left scale-x-0 bg-gold/60 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                {/* active slider */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
              </motion.div>
            </motion.li>
          )
        })}
      </ul>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/* mobile menu button + panel                                          */
/* ------------------------------------------------------------------ */

function Burger({ open, onClick }) {
  const bar = 'absolute left-0 block h-[2px] w-full bg-ink'
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      whileTap={{ scale: 0.88 }}
      animate={open ? 'open' : 'closed'}
      className="relative grid h-12 w-12 cursor-pointer place-items-center border border-ink/80 transition-colors hover:border-gold xl:hidden"
    >
      <span className="relative block h-[16px] w-[22px]">
        <motion.span
          className={`${bar} top-0`}
          variants={{ closed: { y: 0, rotate: 0 }, open: { y: 7, rotate: 45 } }}
        />
        <motion.span
          className={`${bar} top-[7px] origin-right`}
          variants={{ closed: { scaleX: 1, opacity: 1 }, open: { scaleX: 0, opacity: 0 } }}
        />
        <motion.span
          className={`${bar} top-[14px]`}
          variants={{ closed: { y: 0, rotate: 0 }, open: { y: -7, rotate: -45 } }}
        />
      </span>
    </motion.button>
  )
}

const panelList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}
const panelItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: 14, transition: { duration: 0.2 } },
}

function MobilePanel({ open, active, onNavigate }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="panel"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-124px)] overflow-y-auto overscroll-contain border-t border-line bg-white xl:hidden"
        >
          <motion.div
            variants={panelList}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto max-w-2xl px-5 pb-10 pt-4 sm:px-8"
          >
            <ul>
              {site.nav.map((item, i) => (
                <motion.li key={item.id} variants={panelItem} className="border-b border-line">
                  <Link
                    to={item.path}
                    onClick={onNavigate}
                    className="group flex items-center gap-4 py-4 sm:py-5"
                  >
                    <span className="w-8 font-display text-[15px] font-semibold text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex-1 font-display text-[26px] font-bold uppercase leading-none tracking-[0.04em] transition-transform duration-300 group-active:translate-x-2 sm:text-[32px] ${
                        active === item.id ? 'text-clay' : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </span>
                    <ArrowIcon className="h-6 w-6 text-gold transition-transform duration-300 group-hover:translate-x-1.5 group-active:translate-x-3" />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={panelItem} className="mt-8 space-y-4 text-[16px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-clay">
                {site.descriptor}
              </p>
              <div className="space-y-2">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-gold" />
                    {p.label}
                  </a>
                ))}
              </div>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all">
                <MailIcon className="h-5 w-5 shrink-0 text-gold" />
                {site.email}
              </a>
              <p className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{site.address}</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/* header                                                              */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveNav()
  const { pathname } = useLocation()

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  const close = useCallback(() => setOpen(false), [])

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // close on Escape, and when the viewport grows to the desktop layout
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close()
    const mq = window.matchMedia('(min-width: 1280px)')
    const onMq = () => mq.matches && close()
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [close])

  // always close the mobile menu when the page changes
  useEffect(() => {
    close()
  }, [pathname, close])

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        className="[--top-h:46px] [--main-h:80px] [--main-s:66px] md:[--top-h:54px] xl:[--top-h:80px] xl:[--main-h:136px] xl:[--main-s:100px]"
      >
        {/* keeps the page from jumping under the fixed header */}
        <div aria-hidden="true" className="h-[calc(var(--top-h)+var(--main-h))]" />

        <header
          className={`fixed inset-x-0 top-0 z-50 bg-white transition-[transform,box-shadow] duration-500 ease-out ${
            scrolled
              ? '-translate-y-[var(--top-h)] shadow-[0_10px_30px_-14px_rgba(0,0,0,0.3)]'
              : 'translate-y-0'
          }`}
        >
          <TopBar />

          <div
            className={`relative transition-[height] duration-500 ease-out ${
              scrolled ? 'h-[var(--main-s)]' : 'h-[var(--main-h)]'
            }`}
          >
            <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-5 md:px-8 xl:px-12 2xl:px-32">
              <Logo scrolled={scrolled} />
              <DesktopNav active={active} />
              <Burger open={open} onClick={() => setOpen((v) => !v)} />
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gold"
          />

          <MobilePanel open={open} active={active} onNavigate={close} />
        </header>
      </div>
    </MotionConfig>
  )
}
