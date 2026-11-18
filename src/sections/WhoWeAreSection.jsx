import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import portrait from '../assets/who-we-are.png'

const EASE = [0.22, 1, 0.36, 1]
const VIEW = { once: true, margin: '0px 0px -12% 0px' }

const HEADING =
  'We are solicitors and notaries public of Nigeria, giving honest, practical legal counsel.'

const PARAGRAPHS = [
  'Osayomwanbor Law Chambers is a firm of legal practitioners based in Benin City, Edo State. We act for individuals, families and businesses, and we bring care, clear communication and real commitment to every matter we take on.',
  'We do not simply follow old routines. We question every step before we take it and ask whether it can be done better for our clients. We combine sound legal knowledge with a modern, practical approach to how our service is run, so that you always understand where you stand and what comes next.',
]

/** heading that reveals word by word as it scrolls into view */
function RevealHeading({ text }) {
  const words = text.split(' ')
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={VIEW}
      transition={{ staggerChildren: 0.055 }}
      aria-label={text}
      className="max-w-[1100px] text-[clamp(26px,2.7vw,52px)] font-semibold leading-[1.38] text-ink"
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

/**
 * Who We Are
 * @param showLink  show the "About us" link (hide it on the Who we are page itself)
 * @param signature optional image URL of a handwritten signature
 */
export default function WhoWeAreSection({ showLink = true, signature }) {
  const photoRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-4%', reduce ? '-4%' : '4%'])

  return (
    <section id="who-we-are" className="bg-white pb-16 pt-6 sm:pb-24 lg:pb-[clamp(90px,7.8vw,150px)]">
      <div className="mx-auto max-w-[1920px] px-5 md:px-8 xl:px-12 2xl:px-32">
        {/* label + gold line */}
        <div className="flex items-center gap-[clamp(20px,2.4vw,46px)]">
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEW}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(20px,1.55vw,30px)] font-semibold text-clay"
          >
            Who We Are
          </motion.p>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="mt-1 h-[2px] w-[clamp(60px,6.1vw,117px)] origin-left bg-gold"
          />
        </div>

        <div className="mt-[clamp(28px,3.9vw,76px)]">
          <RevealHeading text={HEADING} />
        </div>

        <div className="mt-[clamp(28px,4.6vw,88px)] grid gap-12 lg:grid-cols-[minmax(0,1fr)_35.2%] lg:gap-x-[clamp(40px,6.6vw,128px)]">
          {/* copy */}
          <div>
            <div className="max-w-[1000px] space-y-[clamp(20px,2.7vw,52px)] text-[clamp(16px,1.25vw,24px)] leading-[2] text-[#55575e] lg:leading-[2.25]">
              {PARAGRAPHS.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEW}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {(showLink || signature) && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="mt-10 flex flex-wrap items-center gap-x-[clamp(40px,8vw,250px)] gap-y-6 lg:mt-[clamp(32px,3.4vw,64px)]"
              >
                {showLink && (
                  <Link
                    to="/who-we-are"
                    className="group relative inline-block pb-2.5 font-display text-[clamp(18px,1.3vw,25px)] font-bold tracking-[0.08em] text-ink"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      About us
                    </span>
                    <span className="absolute bottom-0 left-0 h-[3px] w-[60%] bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
                  </Link>
                )}
                {signature && (
                  <motion.img
                    src={signature}
                    alt="Signature"
                    className="h-[clamp(60px,5.7vw,110px)] w-auto"
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                    viewport={VIEW}
                    transition={{ duration: 1.6, delay: 0.5, ease: 'easeInOut' }}
                  />
                )}
              </motion.div>
            )}
          </div>

          {/* photo */}
          <motion.div
            ref={photoRef}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative aspect-[583/704] w-full overflow-hidden bg-[#f1f5f4] sm:max-w-[520px] lg:max-w-none lg:self-start"
          >
            <motion.img
              src={portrait}
              alt="The principal of Osayomwanbor Law Chambers"
              style={{ y: imgY }}
              className="absolute inset-x-0 -top-[5%] h-[110%] w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}