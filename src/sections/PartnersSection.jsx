import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { partners } from '../data/partners'
import { RevealHeading, SectionLabel, VIEW } from '../components/SectionHeading'

const EASE = [0.22, 1, 0.36, 1]

const initials = (name) =>
  name
    .replace(/^(Barr\.|Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
    .split(/\s+/)
    .filter((w) => /[a-z]/i.test(w))
    .map((w) => w[0])
    .slice(-2)
    .join('')
    .toUpperCase()

function Monogram({ name }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        backgroundImage: [
          'radial-gradient(90% 70% at 85% 0%, rgba(244,165,60,0.28), transparent 60%)',
          'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px)',
          'linear-gradient(165deg, #33201f, #8b4a3a)',
        ].join(','),
      }}
    >
      <span className="grid h-[42%] aspect-square place-items-center rounded-full border border-white/30 font-display text-[clamp(26px,3.4vw,64px)] font-semibold tracking-wide text-white/90">
        {initials(name)}
      </span>
    </div>
  )
}

export function PartnerCard({ partner, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.8, delay: (index % 4) * 0.12, ease: EASE }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#efefef]">
        {partner.photo ? (
          <img
            src={partner.photo}
            alt={`${partner.name}, ${partner.role}`}
            loading="lazy"
            style={{ objectPosition: partner.focus || 'center top' }}
            className="h-full w-full object-cover grayscale-[35%] transition-all duration-[900ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-105">
            <Monogram name={partner.name} />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute inset-x-0 bottom-0 h-[4px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />
      </div>

      <div className="mt-5">
        <h3 className="text-[clamp(17px,1.5vw,28px)] font-semibold leading-tight text-ink">{partner.name}</h3>
        <p className="mt-1.5 font-display text-[clamp(14px,0.95vw,18px)] font-semibold uppercase tracking-[0.16em] text-clay">
          {partner.role}
        </p>
        {partner.note && <p className="mt-1 text-[13px] text-[#77797f] sm:text-[15px]">{partner.note}</p>}
      </div>
    </motion.article>
  )
}

/**
 * Partners grid
 * @param intro show the label + heading (hide when the page header already says it)
 * @param showLink show the link to the Partners page
 */
export default function PartnersSection({ intro = true, showLink = true }) {
  return (
    <section id="partners" className="bg-white py-[clamp(64px,8vw,160px)]">
      <div className="mx-auto max-w-[1920px] px-5 md:px-8 xl:px-12 2xl:px-32">
        {intro && (
          <div className="grid gap-8 lg:grid-cols-[42.8%_57.2%] lg:gap-0">
            <div className="lg:pt-[0.55em]">
              <SectionLabel>Our Partners</SectionLabel>
            </div>
            <RevealHeading text="Experienced lawyers who give every matter the personal attention it deserves." />
          </div>
        )}

        <div
          className={`grid grid-cols-2 gap-x-[clamp(14px,2vw,40px)] gap-y-10 lg:grid-cols-4 lg:gap-y-12 ${
            intro ? 'mt-[clamp(36px,4.4vw,84px)]' : ''
          }`}
        >
          {partners.map((p, i) => (
            <PartnerCard key={p.id} partner={p} index={i} />
          ))}
        </div>

        {showLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-[clamp(36px,3.6vw,68px)]"
          >
            <Link
              to="/partners"
              className="group relative inline-block pb-2.5 font-display text-[clamp(17px,1.25vw,24px)] font-bold uppercase tracking-[0.1em] text-ink"
            >
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                Meet the team
              </span>
              <span className="absolute bottom-0 left-0 h-[3px] w-[60%] bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
