import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import { ArrowIcon, PhoneIcon } from './icons'
import { VIEW } from './SectionHeading'

const EASE = [0.22, 1, 0.36, 1]

/** "Speak with us" band used at the end of inner pages */
export default function ConsultCta({
  title = 'Speak with a lawyer about your matter',
  text = 'Book a consultation at our chambers in Benin City. We will listen, explain your options and tell you plainly what we can do.',
  to = '/appointment',
}) {
  return (
    <section className="bg-white py-[clamp(56px,7vw,130px)]">
      <div className="mx-auto max-w-[1920px] px-5 md:px-8 xl:px-12 2xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden bg-ink px-6 py-[clamp(40px,4.6vw,88px)] text-white sm:px-[clamp(32px,4.6vw,88px)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_90%_at_100%_0%,rgba(244,165,60,0.22),transparent_60%)]"
          />
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[5px] bg-gold" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(28px,2.6vw,50px)] font-semibold uppercase leading-[1.1]">
                {title}
              </h2>
              <p className="mt-4 max-w-[720px] text-[clamp(15px,1.1vw,20px)] leading-[1.9] text-white/70">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to={to}
                className="group relative flex h-14 items-center justify-center gap-4 overflow-hidden bg-gold px-8 font-display text-[16px] font-bold uppercase tracking-[0.14em] text-ink sm:h-16 sm:text-[18px]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative">Book a consultation</span>
                <ArrowIcon className="relative h-5 w-7 text-clay transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <a
                href={site.phones[0].href}
                className="flex h-14 items-center justify-center gap-3 border border-white/30 px-8 font-display text-[16px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-gold hover:text-gold sm:h-16 sm:text-[18px]"
              >
                <PhoneIcon className="h-5 w-5 text-gold" />
                {site.phones[0].label}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
