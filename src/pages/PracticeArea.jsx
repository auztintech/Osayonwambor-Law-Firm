import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getPracticeArea, practiceAreas } from '../data/practiceAreas'
import { site } from '../data/site'
import { VIEW } from '../components/SectionHeading'
import { ArrowIcon, PhoneIcon } from '../components/icons'
import ConsultCta from '../components/ConsultCta'
import NotFound from './NotFound'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEW,
  transition: { duration: 0.8, delay, ease: EASE },
})

function Label({ children }) {
  return (
    <motion.div {...fadeUp()} className="flex items-center gap-4">
      <span className="h-[2px] w-8 bg-gold" aria-hidden="true" />
      <h2 className="font-display text-[clamp(20px,1.6vw,30px)] font-semibold uppercase tracking-[0.06em] text-clay">
        {children}
      </h2>
    </motion.div>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mt-1 h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="9.25" stroke="#f4a53c" strokeWidth="1.5" />
      <path d="M6 10.4l2.6 2.6L14.2 7.4" stroke="#8b4a3a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left sm:py-6"
            >
              <span className={`text-[clamp(17px,1.2vw,22px)] font-semibold transition-colors ${isOpen ? 'text-clay' : 'text-ink'}`}>
                {f.q}
              </span>
              <span className="relative grid h-9 w-9 shrink-0 place-items-center border border-line">
                <span className="absolute h-[2px] w-3.5 bg-ink" />
                <motion.span
                  className="absolute h-3.5 w-[2px] bg-ink"
                  animate={{ scaleY: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[70ch] pb-6 text-[clamp(15px,1.05vw,19px)] leading-[1.9] text-[#55575e]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function PracticeArea() {
  const { slug } = useParams()
  const area = getPracticeArea(slug)
  if (!area) return <NotFound />

  const index = practiceAreas.indexOf(area)
  const others = practiceAreas.filter((p) => p.slug !== slug)
  const next = practiceAreas[(index + 1) % practiceAreas.length]

  const heroBg = {
    backgroundImage: [
      'radial-gradient(90% 120% at 100% 0%, rgba(244,165,60,0.28), transparent 55%)',
      'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 16px)',
      `linear-gradient(150deg, ${area.from}, ${area.to})`,
    ].join(','),
  }

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden text-white" style={area.image ? undefined : heroBg}>
        {area.image && (
          <>
            <img src={area.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="relative mx-auto max-w-[1920px] px-5 py-[clamp(48px,6.5vw,124px)] md:px-8 xl:px-12 2xl:px-32">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ol className="flex flex-wrap items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-white/60 sm:text-[14px]">
              <li>
                <Link to="/" className="hover:text-gold">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-[2px] w-3 bg-gold" aria-hidden="true" />
                <Link to="/what-we-do" className="hover:text-gold">What we do</Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-[2px] w-3 bg-gold" aria-hidden="true" />
                <span aria-current="page" className="text-white">{area.title}</span>
              </li>
            </ol>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="mt-[clamp(32px,4vw,76px)] font-display text-[clamp(22px,1.8vw,34px)] font-medium text-gold"
          >
            {String(index + 1).padStart(2, '0')} / {String(practiceAreas.length).padStart(2, '0')}
          </motion.p>
          <h1 className="mt-3 max-w-[1100px] font-display text-[clamp(38px,4.8vw,92px)] font-semibold uppercase leading-[1.02]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
              >
                {area.title}
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-[clamp(18px,2vw,36px)] max-w-[820px] text-[clamp(16px,1.25vw,23px)] leading-[1.85] text-white/80"
          >
            {area.lead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="mt-[clamp(24px,2.6vw,48px)]"
          >
            <Link
              to={`/appointment?area=${area.slug}`}
              className="group relative inline-flex h-14 items-center gap-4 overflow-hidden bg-gold px-7 font-display text-[16px] font-bold uppercase tracking-[0.14em] text-ink sm:h-16 sm:px-9 sm:text-[18px]"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative">Book a consultation</span>
              <ArrowIcon className="relative h-5 w-7 text-clay transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[4px] bg-gold" />
      </section>

      {/* ---------- body ---------- */}
      <section className="bg-white py-[clamp(56px,7vw,130px)]">
        <div className="mx-auto grid max-w-[1920px] gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,30%)] lg:gap-[clamp(48px,6vw,120px)] xl:px-12 2xl:px-32">
          <div className="min-w-0 space-y-[clamp(48px,5.5vw,100px)]">
            {/* overview */}
            <div>
              <Label>Overview</Label>
              <div className="mt-6 space-y-6 text-[clamp(16px,1.15vw,21px)] leading-[2] text-[#55575e]">
                {area.overview.map((p, i) => (
                  <motion.p key={i} {...fadeUp(i * 0.1)}>
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* services */}
            <div>
              <Label>How we can help</Label>
              <ul className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {area.services.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: i % 2 ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEW}
                    transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: EASE }}
                    className="flex gap-3 border-b border-line pb-5 text-[clamp(15px,1.05vw,19px)] leading-relaxed text-ink"
                  >
                    <Check />
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* approach */}
            <div>
              <Label>Our approach</Label>
              <ol className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {area.approach.map((step, i) => (
                  <motion.li
                    key={step.title}
                    {...fadeUp(i * 0.1)}
                    className="group relative bg-[#f6f6f6] p-6 transition-colors duration-500 hover:bg-ink hover:text-white"
                  >
                    <span className="font-display text-[40px] font-semibold leading-none text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-5 text-[19px] font-semibold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-[#55575e] transition-colors duration-500 group-hover:text-white/70">
                      {step.text}
                    </p>
                    <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* FAQ */}
            <div>
              <Label>Common questions</Label>
              <motion.div {...fadeUp(0.1)} className="mt-6">
                <Faq items={area.faqs} />
              </motion.div>
              <p className="mt-6 text-[14px] leading-relaxed text-[#8a8c93]">
                This page gives general information only and is not legal advice for your situation.
                Please book a consultation so we can advise on your specific matter.
              </p>
            </div>
          </div>

          {/* ---------- sidebar ---------- */}
          <aside className="space-y-8 lg:sticky lg:top-[130px] lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.8, ease: EASE }}
              className="bg-ink p-7 text-white sm:p-8"
            >
              <p className="font-display text-[24px] font-semibold uppercase leading-tight">Your first consultation</p>
              <p className="mt-3 text-white/65">Bring these with you, if you have them:</p>
              <ul className="mt-5 space-y-3">
                {area.bring.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                    <span className="mt-2.5 h-[2px] w-3 shrink-0 bg-gold" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to={`/appointment?area=${area.slug}`}
                className="group mt-7 flex h-13 items-center justify-between bg-gold px-5 py-4 font-display text-[16px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-white"
              >
                Book a consultation
                <ArrowIcon className="h-5 w-6 text-clay transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={site.phones[0].href} className="mt-4 flex items-center gap-3 text-white/80 hover:text-gold">
                <PhoneIcon className="h-5 w-5 text-gold" />
                {site.phones[0].label}
              </a>
            </motion.div>

            <motion.nav
              aria-label="Other practice areas"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="border border-line p-7 sm:p-8"
            >
              <p className="font-display text-[18px] font-semibold uppercase tracking-[0.12em] text-clay">
                Other practice areas
              </p>
              <ul className="mt-4 divide-y divide-line">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to={`/what-we-do/${o.slug}`}
                      className="group flex items-center justify-between gap-4 py-3.5 text-[15px] font-medium text-ink transition-colors hover:text-clay"
                    >
                      {o.title}
                      <ArrowIcon className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </aside>
        </div>

        {/* next area */}
        <div className="mx-auto mt-[clamp(56px,6vw,110px)] max-w-[1920px] px-5 md:px-8 xl:px-12 2xl:px-32">
          <Link
            to={`/what-we-do/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-t border-line pt-8"
          >
            <span>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.22em] text-[#8a8c93]">
                Next practice area
              </span>
              <span className="mt-2 block font-display text-[clamp(24px,2.4vw,46px)] font-semibold uppercase leading-tight text-ink transition-colors group-hover:text-clay">
                {next.title}
              </span>
            </span>
            <span className="grid h-14 w-14 shrink-0 place-items-center bg-gold text-ink transition-transform duration-300 group-hover:translate-x-2 sm:h-16 sm:w-16">
              <ArrowIcon className="h-6 w-7" />
            </span>
          </Link>
        </div>
      </section>

      <ConsultCta
        title={`Need help with ${area.title.toLowerCase()}?`}
        to={`/appointment?area=${area.slug}`}
      />
    </>
  )
}
