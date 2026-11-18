import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { VIEW } from './SectionHeading'

const EASE = [0.22, 1, 0.36, 1]

function Chevron({ className }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.3 2.2L8.1 6l-3.8 3.8" />
    </svg>
  )
}

/** One practice-area tile. Links to the area's own page. */
export default function PracticeCard({ item, index, width, detailed, firstDelay = 0, className = '' }) {
  const bg = item.image
    ? undefined
    : {
        backgroundImage: [
          'radial-gradient(120% 80% at 92% 0%, rgba(244,165,60,0.30), transparent 55%)',
          'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 15px)',
          `linear-gradient(160deg, ${item.from}, ${item.to})`,
        ].join(','),
      }

  return (
    <motion.article
      style={{ width }}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.8, delay: firstDelay, ease: EASE }}
      className={`group relative aspect-[525/495] shrink-0 overflow-hidden bg-ink ${className}`}
    >
      <Link
        to={`/what-we-do/${item.slug}`}
        draggable={false}
        aria-label={`${item.title}${detailed ? '' : ' — read more'}`}
        className="absolute inset-0 block"
      >
        {/* artwork: photo if supplied, otherwise brand gradient */}
        <div
          className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110"
          style={bg}
        >
          {item.image && (
            <img
              src={item.image}
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5 transition-opacity duration-500 group-hover:from-black/80" />

        {/* gold line that draws across the bottom on hover */}
        <span className="absolute inset-x-0 bottom-0 h-[4px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />

        <div className="absolute inset-x-0 bottom-0 p-[clamp(20px,2.4vw,46px)] text-white transition-transform duration-500 ease-out lg:group-hover:-translate-y-3">
          <p className="font-display text-[clamp(20px,1.65vw,32px)] font-medium text-white/85">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-[clamp(10px,1.7vw,32px)] text-[clamp(22px,1.9vw,36px)] font-semibold leading-[1.15]">
            {item.title}
          </h3>

          {detailed ? (
            <>
              <p className="mt-3 max-w-[34ch] text-[clamp(14px,1vw,18px)] leading-relaxed text-white/80">
                {item.desc}
              </p>
              <p className="mt-4 flex items-center gap-2 text-[clamp(14px,0.95vw,18px)] font-semibold uppercase tracking-[0.12em] text-gold">
                Read more
                <Chevron className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </p>
            </>
          ) : (
            <p className="mt-[clamp(10px,1.4vw,26px)] flex items-center gap-2 text-[clamp(15px,1.05vw,20px)] text-white/70 transition-all duration-500 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              Read more
              <Chevron className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
