import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { appointmentConfig as cfg } from '../data/appointments'
import { practiceAreas } from '../data/practiceAreas'
import { site } from '../data/site'
import { RevealHeading, VIEW } from '../components/SectionHeading'
import { ArrowIcon } from '../components/icons'

const EASE = [0.22, 1, 0.36, 1]
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/* optional photo: drop appointment-bg.jpg (or .png/.webp) into src/assets and it is used automatically */
const bgFiles = import.meta.glob('../assets/appointment-bg.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const bgPhoto = Object.values(bgFiles)[0]

/* ------------------------------------------------------------------ */
/* date helpers                                                        */
/* ------------------------------------------------------------------ */

const pad = (n) => String(n).padStart(2, '0')
const keyOf = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const minutesOf = (label) => {
  const [t, ap] = label.split(' ')
  let [h, m] = t.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  return h * 60 + m
}
const longDate = (d) =>
  d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

function monthCells(year, month) {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7 // Monday first
  const days = new Date(year, month + 1, 0).getDate()
  const total = Math.ceil((offset + days) / 7) * 7
  return Array.from({ length: total }, (_, i) => new Date(year, month, 1 - offset + i))
}

/** the open time slots for a day (empty = closed / past) */
function slotsFor(date, today, last) {
  const d = startOfDay(date)
  if (d < today || d > last) return []
  if (!cfg.openDays.includes(d.getDay())) return []
  if (cfg.closedDates.includes(keyOf(d))) return []
  if (cfg.closedEveryYear.includes(`${pad(d.getMonth() + 1)}-${pad(d.getDate())}`)) return []
  const daySlots = cfg.slotsByDay?.[d.getDay()] ?? cfg.slots
  if (d.getTime() === today.getTime()) {
    const now = new Date()
    const earliest = now.getHours() * 60 + now.getMinutes() + (cfg.minNoticeHours ?? 0) * 60
    return daySlots.filter((s) => minutesOf(s) >= earliest)
  }
  return daySlots
}

/* ------------------------------------------------------------------ */
/* background art: scales of justice, drawn as line work               */
/* ------------------------------------------------------------------ */

const strokeIn = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (d = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2.2, delay: d, ease: 'easeInOut' },
  }),
}

const P = (props) => <motion.path variants={strokeIn} vectorEffect="non-scaling-stroke" {...props} />

function Scales({ className }) {
  return (
    <motion.svg
      viewBox="0 0 400 600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      aria-hidden="true"
    >
      <P d="M200 30a11 11 0 110 22 11 11 0 010-22z" custom={0.1} className="text-gold" />
      <P d="M200 52v28M190 80h20v398h-20z" custom={0.2} />
      <P d="M184 160h32M184 400h32" custom={0.5} />
      <P d="M50 124Q200 88 350 124" custom={0.4} />
      <P d="M200 96a20 20 0 110 40 20 20 0 010-40z" custom={0.6} />
      <P d="M40 124a10 10 0 1020 0 10 10 0 10-20 0M340 124a10 10 0 1020 0 10 10 0 10-20 0" custom={0.7} />
      <P d="M50 134L8 318M50 134l42 184M50 134V318" custom={0.9} />
      <P d="M4 318h92Q50 400 4 318z" custom={1.1} />
      <P d="M350 134l-42 184M350 134l42 184M350 134V318" custom={0.9} />
      <P d="M304 318h92Q350 400 304 318z" custom={1.1} />
      <P d="M158 478h84M138 500h124M112 526h176M96 552h208" custom={1.3} />
    </motion.svg>
  )
}

/* ------------------------------------------------------------------ */
/* one day cell                                                        */
/* ------------------------------------------------------------------ */

const cellVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

function DayCell({ date, col, inMonth, isToday, open, selected, onSelect }) {
  const tone = !inMonth ? 'bg-[#fafafa]' : open ? 'bg-white' : 'bg-[#f5f5f5]'
  const numberTone = !open ? 'text-[#c4c4c4]' : inMonth ? 'text-[#2a2a2a]' : 'text-[#9d9d9d]'

  return (
    <motion.div variants={cellVariants} className={`${tone} ${col > 0 ? 'border-l border-[#efefef]' : ''}`}>
      <button
        type="button"
        disabled={!open}
        onClick={() => onSelect(date)}
        aria-pressed={selected}
        aria-label={`${longDate(date)}${open ? '' : ', unavailable'}${isToday ? ', today' : ''}`}
        className={`group relative flex aspect-[1/0.86] w-full flex-col items-center justify-center outline-none transition-colors duration-300 ${
          open ? 'cursor-pointer hover:bg-gold/10 focus-visible:bg-gold/10' : 'cursor-not-allowed'
        }`}
      >
        <span className="relative grid h-[clamp(32px,3vw,52px)] w-[clamp(32px,3vw,52px)] place-items-center">
          {isToday && !selected && (
            <span className="absolute inset-0 rounded-full border-2 border-clay" aria-hidden="true" />
          )}
          {selected && (
            <motion.span
              layoutId="selected-day"
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gold"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 text-[clamp(14px,1.15vw,21px)] ${selected ? 'font-semibold text-ink' : numberTone}`}
          >
            {date.getDate()}
          </span>
        </span>
        {/* availability mark */}
        <span
          aria-hidden="true"
          className={`mt-[clamp(3px,0.35vw,7px)] h-[5px] w-[5px] rounded-full transition-colors ${
            open ? (selected ? 'bg-clay' : 'bg-gold') : 'bg-transparent'
          }`}
        />
      </button>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* small building blocks                                               */
/* ------------------------------------------------------------------ */

function HeaderBtn({ label, onClick, disabled, children }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.8 }}
      whileHover={disabled ? undefined : { scale: 1.12 }}
      className={`grid h-9 w-9 place-items-center text-ink transition-opacity ${
        disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'
      }`}
    >
      {children}
    </motion.button>
  )
}

function TodayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
      <path d="M5 5.5h14a1.5 1.5 0 011.5 1.5v11a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 18V7A1.5 1.5 0 015 5.5zM3.5 10h17M8 3.5v3M16 3.5v3" />
      <circle cx="12" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

function Step({ n, title, done, active, children }) {
  return (
    <div className="relative pl-12">
      <span
        className={`absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border font-display text-[15px] font-semibold transition-colors duration-300 ${
          done ? 'border-gold bg-gold text-ink' : active ? 'border-gold text-gold' : 'border-white/25 text-white/40'
        }`}
      >
        {done ? (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3.5 8.4l2.8 2.8 6.2-6.4" />
          </svg>
        ) : (
          n
        )}
      </span>
      <p className={`font-display text-[17px] font-semibold uppercase tracking-[0.14em] ${active || done ? 'text-white' : 'text-white/40'}`}>
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

const field =
  'w-full border border-white/20 bg-white/[0.06] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold aria-invalid:border-red-400'

function Field({ label, optional, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-[14px] font-medium text-white/80">
        {label}
        {optional && <span className="text-[12px] font-normal text-white/40">optional</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[13px] text-red-300">{error}</span>}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/* section                                                             */
/* ------------------------------------------------------------------ */

export default function SchedulerSection() {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const reduce = useReducedMotion()
  const [params] = useSearchParams()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], ['6%', reduce ? '6%' : '-10%'])

  const today = useMemo(() => startOfDay(new Date()), [])
  const last = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + cfg.monthsAhead + 1, 0),
    [today],
  )

  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [dir, setDir] = useState(1)
  const [selected, setSelected] = useState(null) // Date
  const [time, setTime] = useState(null)
  const [details, setDetails] = useState({
    name: '',
    phone: '',
    email: '',
    matter: practiceAreas.some((p) => p.slug === params.get('area')) ? params.get('area') : '',
    note: '',
  })
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(null) // 'whatsapp' | 'email'

  const cells = useMemo(() => monthCells(view.y, view.m), [view])
  const monthIndex = view.y * 12 + view.m
  const minIndex = today.getFullYear() * 12 + today.getMonth()
  const maxIndex = minIndex + cfg.monthsAhead
  const monthLabel = new Date(view.y, view.m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  const move = (step) => {
    const next = Math.min(Math.max(monthIndex + step, minIndex), maxIndex)
    if (next === monthIndex) return
    setDir(step)
    setView({ y: Math.floor(next / 12), m: next % 12 })
  }
  const goToday = () => {
    setDir(minIndex < monthIndex ? -1 : 1)
    setView({ y: today.getFullYear(), m: today.getMonth() })
  }

  const select = (d) => {
    setSelected(d)
    setTime(null)
    setSent(null)
    // on small screens, bring the booking panel into view
    if (window.matchMedia('(max-width: 1023px)').matches) {
      setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    }
  }

  const selectedSlots = selected ? slotsFor(selected, today, last) : []
  const morning = selectedSlots.filter((s) => minutesOf(s) < 12 * 60)
  const afternoon = selectedSlots.filter((s) => minutesOf(s) >= 12 * 60)

  const errors = {
    name: details.name.trim().length < 2 ? 'Please enter your name' : '',
    phone: details.phone.replace(/\D/g, '').length < 10 ? 'Please enter a valid phone number' : '',
    email: details.email && !/^\S+@\S+\.\S+$/.test(details.email) ? 'Please check this email address' : '',
  }
  const detailsOk = !errors.name && !errors.phone && !errors.email
  const ready = Boolean(selected && time && detailsOk)
  const matterLabel = practiceAreas.find((p) => p.slug === details.matter)?.title || 'General enquiry'

  const message = ready
    ? [
        `Hello ${site.fullName},`,
        '',
        'I would like to book a consultation.',
        `Date: ${longDate(selected)}`,
        `Time: ${time}`,
        `Matter: ${matterLabel}`,
        `Name: ${details.name.trim()}`,
        `Phone: ${details.phone.trim()}`,
        details.email ? `Email: ${details.email.trim()}` : null,
        details.note ? `Note: ${details.note.trim()}` : null,
        '',
        'Please confirm if this time is available. Thank you.',
      ]
        .filter((l) => l !== null)
        .join('\n')
    : ''
  const subject = ready ? `Consultation request: ${longDate(selected)}, ${time}` : ''
  const waHref = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(message)}`
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`

  const onSend = (channel) => (e) => {
    if (!ready) {
      e.preventDefault()
      setTouched(true)
      return
    }
    setSent(channel)
  }

  const reset = () => {
    setSelected(null)
    setTime(null)
    setSent(null)
    setTouched(false)
    setDetails((d) => ({ ...d, note: '' }))
  }

  const gridVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.01, delayChildren: 0.05 } } }
  const set = (k) => (e) => setDetails((d) => ({ ...d, [k]: e.target.value }))
  const showErr = (k) => (touched ? errors[k] : '')

  return (
    <section
      id="appointment"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0b0b0b] pb-[clamp(64px,9vw,170px)] pt-[clamp(64px,8vw,150px)]"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {bgPhoto && <img src={bgPhoto} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale" />}
        <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_82%_28%,rgba(255,255,255,0.08),transparent_65%)]" />
        {!bgPhoto && (
          <motion.div style={{ y: artY }} className="absolute -right-[6%] top-[22%] h-[78%] text-white/[0.07]">
            <Scales className="h-full w-auto" />
          </motion.div>
        )}
      </div>

      <div className="relative mx-auto max-w-[1920px] px-5 md:px-8 xl:px-12 2xl:px-32">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <RevealHeading text="Schedule Your Visit" className="text-white!" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="max-w-[520px] text-[clamp(15px,1.05vw,19px)] leading-[1.8] text-white/60 lg:text-right"
          >
            Pick a day and time that suits you. Your request goes straight to the chambers, and we will
            call to confirm.
          </motion.p>
        </div>

        <div className="mt-[clamp(28px,3.2vw,62px)] grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,1fr)] lg:gap-[clamp(24px,2.4vw,48px)]">
          {/* ---------------- calendar ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="overflow-hidden rounded-[clamp(10px,0.85vw,16px)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              {/* month bar */}
              <div className="relative flex h-[clamp(48px,3.4vw,64px)] items-center justify-center bg-gold text-ink">
                <div className="flex items-center gap-[clamp(8px,1.6vw,32px)]">
                  <HeaderBtn label="Previous month" onClick={() => move(-1)} disabled={monthIndex <= minIndex}>
                    <ArrowIcon className="h-4 w-4 -scale-x-100" />
                  </HeaderBtn>
                  <div className="relative h-6 w-[clamp(150px,12vw,230px)] overflow-hidden text-center font-display text-[clamp(15px,1.1vw,20px)] font-semibold uppercase tracking-[0.12em]">
                    <AnimatePresence initial={false} custom={dir} mode="popLayout">
                      <motion.span
                        key={monthLabel}
                        initial={{ y: dir > 0 ? '100%' : '-100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: dir > 0 ? '-100%' : '100%', opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="absolute inset-x-0"
                        aria-live="polite"
                      >
                        {monthLabel}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <HeaderBtn label="Next month" onClick={() => move(1)} disabled={monthIndex >= maxIndex}>
                    <ArrowIcon className="h-4 w-4" />
                  </HeaderBtn>
                </div>
                <div className="absolute right-[clamp(8px,1.2vw,24px)] top-1/2 -translate-y-1/2">
                  <HeaderBtn label="Back to this month" onClick={goToday} disabled={monthIndex === minIndex}>
                    <TodayGlyph />
                  </HeaderBtn>
                </div>
              </div>

              {/* weekday bar */}
              <div className="grid grid-cols-7 bg-clay text-center text-[clamp(11px,0.8vw,15px)] font-semibold uppercase tracking-[0.06em] text-white">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="py-[clamp(9px,0.75vw,13px)]">
                    {d}
                  </div>
                ))}
              </div>

              {/* days */}
              <LayoutGroup>
                <div className="relative overflow-hidden bg-white">
                  <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.div
                      key={`${view.y}-${view.m}`}
                      variants={gridVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.25 } }}
                      className="grid grid-cols-7"
                    >
                      {cells.map((d, i) => (
                        <DayCell
                          key={keyOf(d)}
                          date={d}
                          col={i % 7}
                          inMonth={d.getMonth() === view.m}
                          isToday={d.getTime() === today.getTime()}
                          open={slotsFor(d, today, last).length > 0}
                          selected={selected ? keyOf(selected) === keyOf(d) : false}
                          onSelect={select}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </LayoutGroup>
            </div>

            {/* legend + hours */}
            <div className="mt-5 flex flex-col gap-3 text-[14px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Available
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-clay" /> Today
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 bg-[#5a5a5a]" /> Closed
                </li>
              </ul>
              <p className="text-white/50">{cfg.hoursNote}</p>
            </div>
          </motion.div>

          {/* ---------------- booking panel ---------------- */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="scroll-mt-[90px] self-start border border-white/12 bg-white/[0.04] p-6 text-white backdrop-blur-sm sm:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="py-6 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 15, delay: 0.1 }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </motion.span>
                  <p className="mt-6 font-display text-[26px] font-semibold uppercase">Request ready to send</p>
                  <p className="mx-auto mt-3 max-w-[36ch] leading-relaxed text-white/65">
                    {sent === 'whatsapp'
                      ? 'Your request has opened in WhatsApp. Tap send there, and we will reply to confirm your appointment.'
                      : 'Your request has opened in your email app. Press send there, and we will reply to confirm your appointment.'}
                  </p>
                  <div className="mx-auto mt-6 max-w-[340px] border border-white/12 p-4 text-left text-[15px] leading-relaxed text-white/80">
                    <p className="font-semibold text-gold">{longDate(selected)}</p>
                    <p>
                      {time} · {matterLabel}
                    </p>
                  </div>
                  <div className="mt-7 flex flex-col items-center gap-3">
                    <a
                      href={sent === 'whatsapp' ? waHref : mailHref}
                      target={sent === 'whatsapp' ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-[14px] font-semibold uppercase tracking-[0.14em] text-gold hover:text-white"
                    >
                      Didn&rsquo;t open? Try again
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="cursor-pointer text-[14px] text-white/55 underline-offset-4 hover:text-white hover:underline"
                    >
                      Book another time
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* 1. date */}
                  <Step n={1} title="Date" done={!!selected} active={!selected}>
                    {selected ? (
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-display text-[clamp(19px,1.4vw,24px)] font-semibold text-gold">{longDate(selected)}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(null)
                            setTime(null)
                          }}
                          className="cursor-pointer text-[13px] uppercase tracking-[0.14em] text-white/50 hover:text-white"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <p className="text-white/55">Choose an available day on the calendar.</p>
                    )}
                  </Step>

                  {/* 2. time */}
                  <Step n={2} title="Time" done={!!time} active={!!selected && !time}>
                    {selected ? (
                      <div className="space-y-4" role="group" aria-label="Available times">
                        {[
                          ['Morning', morning],
                          ['Afternoon', afternoon],
                        ].map(
                          ([label, list]) =>
                            list.length > 0 && (
                              <div key={label}>
                                <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40">{label}</p>
                                <div className="grid grid-cols-3 gap-2">
                                  {list.map((s) => (
                                    <motion.button
                                      key={s}
                                      type="button"
                                      onClick={() => setTime(s)}
                                      whileTap={{ scale: 0.94 }}
                                      aria-pressed={time === s}
                                      className={`cursor-pointer border py-2.5 text-[14px] transition-colors duration-300 sm:text-[15px] ${
                                        time === s
                                          ? 'border-gold bg-gold font-semibold text-ink'
                                          : 'border-white/20 text-white hover:border-gold hover:text-gold'
                                      }`}
                                    >
                                      {s}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            ),
                        )}
                      </div>
                    ) : (
                      <p className="text-white/35">Available times will appear here.</p>
                    )}
                  </Step>

                  {/* 3. details */}
                  <Step n={3} title="Your details" done={false} active={!!time}>
                    <AnimatePresence initial={false}>
                      {time ? (
                        <motion.div
                          key="details"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 pt-1">
                            <Field label="Full name" error={showErr('name')}>
                              <input
                                className={field}
                                value={details.name}
                                onChange={set('name')}
                                autoComplete="name"
                                placeholder="Your full name"
                                aria-invalid={!!showErr('name') || undefined}
                              />
                            </Field>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                              <Field label="Phone" error={showErr('phone')}>
                                <input
                                  className={field}
                                  type="tel"
                                  value={details.phone}
                                  onChange={set('phone')}
                                  autoComplete="tel"
                                  placeholder="0800 000 0000"
                                  aria-invalid={!!showErr('phone') || undefined}
                                />
                              </Field>
                              <Field label="Email" optional error={showErr('email')}>
                                <input
                                  className={field}
                                  type="email"
                                  value={details.email}
                                  onChange={set('email')}
                                  autoComplete="email"
                                  placeholder="you@example.com"
                                  aria-invalid={!!showErr('email') || undefined}
                                />
                              </Field>
                            </div>
                            <Field label="What is it about?">
                              <div className="relative">
                                <select
                                  className={`${field} cursor-pointer appearance-none pr-10 [&>option]:text-ink`}
                                  value={details.matter}
                                  onChange={set('matter')}
                                >
                                  <option value="">General enquiry / not sure</option>
                                  {practiceAreas.map((p) => (
                                    <option key={p.slug} value={p.slug}>
                                      {p.title}
                                    </option>
                                  ))}
                                </select>
                                <svg viewBox="0 0 12 12" className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-gold" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                                  <path d="M2.5 4.5L6 8l3.5-3.5" />
                                </svg>
                              </div>
                            </Field>
                            <Field label="Brief note" optional>
                              <textarea
                                className={`${field} min-h-[96px] resize-y`}
                                value={details.note}
                                onChange={set('note')}
                                placeholder="A line or two about your matter"
                                maxLength={500}
                              />
                            </Field>
                          </div>
                        </motion.div>
                      ) : (
                        <p className="text-white/35">Pick a time to continue.</p>
                      )}
                    </AnimatePresence>
                  </Step>

                  {/* send */}
                  <div className="space-y-3 border-t border-white/10 pt-6">
                    <a
                      href={ready ? waHref : '#'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={onSend('whatsapp')}
                      aria-disabled={!ready}
                      className={`group relative flex h-14 items-center justify-center gap-3 overflow-hidden px-6 font-display text-[16px] font-bold uppercase tracking-[0.14em] transition-opacity ${
                        ready ? 'bg-gold text-ink' : 'cursor-not-allowed bg-gold/35 text-ink/60'
                      }`}
                    >
                      {ready && (
                        <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
                      )}
                      <span className="relative">Request on WhatsApp</span>
                      <ArrowIcon className="relative h-5 w-7 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </a>
                    <a
                      href={ready ? mailHref : '#'}
                      onClick={onSend('email')}
                      aria-disabled={!ready}
                      className={`flex h-14 items-center justify-center border px-6 font-display text-[16px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                        ready
                          ? 'border-white/40 text-white hover:border-gold hover:text-gold'
                          : 'cursor-not-allowed border-white/12 text-white/30'
                      }`}
                    >
                      Request by email
                    </a>
                    {touched && !ready && (
                      <p className="text-[13px] text-red-300">
                        {!selected ? 'Please choose a date.' : !time ? 'Please choose a time.' : 'Please complete your details above.'}
                      </p>
                    )}
                    <p className="text-[13px] leading-relaxed text-white/40">
                      Your appointment is confirmed once we call or reply to you. For urgent matters, call{' '}
                      <a href={site.phones[0].href} className="text-white/70 hover:text-gold">
                        {site.phones[0].label}
                      </a>
                      .
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
