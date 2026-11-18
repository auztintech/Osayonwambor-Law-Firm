import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import heroImage from '../assets/hero.png'
import { ArrowIcon } from '../components/icons'

const EASE = [0.22, 1, 0.36, 1]

/** one line of the headline, masked so it slides up out of nowhere */
function Line({ children, delay, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  )
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
})

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '5%'])
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, reduce ? 1 : 0.25])

  return (
    <section
      ref={ref}
      aria-label="Welcome"
      className="relative mb-14 bg-[#f7f8fc] sm:mb-[72px] 2xl:mb-[88px]"
    >
      <div className="relative flex flex-col lg:min-h-[clamp(640px,53.6vw,1029px)] lg:flex-row lg:items-center">
        {/* ---------- photo ---------- */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.3, ease: EASE }}
          className="relative h-[400px] w-full overflow-hidden sm:h-[520px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[54%]"
        >
          <motion.img
            src={heroImage}
            alt="The principal of Osayomwanbor Law Chambers seated at his desk"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: EASE }}
            style={{ y: imageY }}
            className="absolute -top-[6%] left-0 h-[106%] w-full object-cover object-[55%_top] lg:object-left-top"
            fetchPriority="high"
          />
          {/* soft fade into the page colour: right edge on desktop, bottom edge on mobile */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#f7f8fc_0%,transparent_14%)] lg:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-[#f7f8fc] via-[#f7f8fc]/60 to-transparent lg:w-[30%]" />
        </motion.div>

        {/* ---------- copy ---------- */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 w-full px-5 pb-14 pt-2 sm:px-8 sm:pb-16 lg:w-auto lg:flex-1 lg:py-24 lg:pl-[51.2%] lg:pr-8 xl:pr-12 2xl:pr-32"
        >
          <h1 className="font-display text-[clamp(38px,4.8vw,92px)] font-semibold uppercase leading-[1.07] tracking-[-0.005em]">
            <Line delay={0.5} className="text-clay">
              For the love of
            </Line>
            <Line delay={0.65} className="text-gold">
              Your family
            </Line>
          </h1>

          <motion.p
            {...fadeUp(0.95)}
            className="mt-6 max-w-[34rem] text-[16px] leading-[2.05] text-[#55575e] sm:text-[18px] lg:mt-[clamp(20px,3.2vw,62px)] lg:text-[clamp(15px,1.25vw,24px)] lg:leading-[2.25] 2xl:max-w-[775px]"
          >
            We are trusted advisers who help you make the very best personal, financial, legal, and
            business decisions for your family throughout your lifetime, and we are there to guide
            your loved ones when you can&rsquo;t be.
          </motion.p>

          <motion.div {...fadeUp(1.1)} className="mt-6 lg:mt-[clamp(20px,2.8vw,54px)]">
            <Link
              to="/what-we-do"
              className="group relative inline-block pb-3 font-display text-[17px] font-bold uppercase tracking-[0.1em] text-ink sm:text-[20px] lg:text-[clamp(17px,1.25vw,24px)]"
            >
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                All services
              </span>
              <span className="absolute bottom-0 left-0 h-[3px] w-[60%] bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- appointment button, hangs off the bottom edge ---------- */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full">
        <div className="mx-auto flex max-w-[1920px] justify-start px-5 sm:px-8 lg:justify-end xl:px-12 2xl:px-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
          >
            <motion.div whileTap={{ scale: 0.96 }}>
              <Link
                to="/appointment"
                className="group relative flex h-14 items-center gap-4 overflow-hidden bg-gold px-6 font-display text-[16px] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:text-white sm:h-[72px] sm:gap-6 sm:px-10 sm:text-[21px] 2xl:h-[88px] 2xl:gap-9 2xl:px-[52px] 2xl:text-[27px]"
              >
                {/* ink fill sweeping in from the left */}
                <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative">Make an appointment</span>
                <ArrowIcon className="relative h-6 w-8 shrink-0 text-clay transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold sm:w-10 2xl:h-8 2xl:w-[52px]" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}