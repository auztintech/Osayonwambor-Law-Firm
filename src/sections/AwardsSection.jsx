import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { awards } from '../data/awards'
import { RevealHeading, SectionLabel, VIEW } from '../components/SectionHeading'
import { ArrowIcon } from '../components/icons'

const EASE = [0.22, 1, 0.36, 1]
const SLIDE_MS = 5000

const HEADING = 'Recognition that reflects our commitment to our clients and to the profession.'

/** Shown until real certificate images are added in src/data/awards.js */
function PlaceholderSlide({ n }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#f4eedc] p-3 sm:p-5">
      <div className="flex h-full w-full flex-col items-center justify-center border-2 border-[#b7a672] p-2">
        <div className="flex h-full w-full flex-col items-center justify-center border border-[#b7a672]/70 px-4 text-center">
          <p className="font-display text-[clamp(11px,1vw,16px)] font-semibold uppercase tracking-[0.3em] text-[#8a7a4a]">
            Placeholder {n}
          </p>
          <p className="mt-3 font-display text-[clamp(20px,2.2vw,40px)] font-bold uppercase leading-tight text-ink/70">
            Your award image
          </p>
          <span className="my-4 h-[2px] w-16 bg-gold" />
          <p className="max-w-[28ch] text-[clamp(11px,0.95vw,15px)] text-ink/55">
            Add certificates in <span className="font-semibold">src/data/awards.js</span> and they
            will slide here.
          </p>
        </div>
      </div>
    </div>
  )
}

const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (dir) => ({ x: dir >= 0 ? '-100%' : '100%' }),
}

/** the framed box: only the pictures inside it slide */
function AwardFrame() {
  const reduce = useReducedMotion()
  const boxRef = useRef(null)
  const onScreen = useInView(boxRef, { amount: 0.5 })
  const slides = awards.length ? awards : [1, 2, 3].map((n) => ({ placeholder: n }))
  const count = slides.length

  const [[page, dir], setPage] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const current = ((page % count) + count) % count

  const paginate = useCallback(
    (d) => setPage(([p]) => [p + d, d]),
    [],
  )
  const jumpTo = (i) => setPage(([p]) => [i, i >= ((p % count) + count) % count ? 1 : -1])

  const slide = slides[current]

  return (
    <div
      ref={boxRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Awards and certificates"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') paginate(1)
        if (e.key === 'ArrowLeft') paginate(-1)
      }}
    >
      {/* black frame with mitred corners */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={VIEW}
        transition={{ duration: 1.2, ease: EASE }}
        style={{ '--frame': 'clamp(14px,1.56vw,30px)' }}
        className="group relative aspect-[668/541] w-full bg-black p-[var(--frame)]"
      >
        {[
          'left-0 top-0',
          'right-0 top-0 -scale-x-100',
          'bottom-0 left-0 -scale-y-100',
          'bottom-0 right-0 -scale-100',
        ].map((pos) => (
          <span
            key={pos}
            aria-hidden="true"
            className={`pointer-events-none absolute z-10 h-[var(--frame)] w-[var(--frame)] bg-[linear-gradient(to_bottom_right,transparent_calc(50%-0.6px),rgba(255,255,255,0.28)_50%,transparent_calc(50%+0.6px))] ${pos}`}
          />
        ))}

        {/* white mat */}
        <div className="relative h-full w-full overflow-hidden bg-white p-[clamp(14px,2.3vw,44px)]">
          {/* the sliding window */}
          <div className="relative h-full w-full overflow-hidden outline outline-1 -outline-offset-1 outline-[#dcdcdc]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.01 : 0.9, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -450) paginate(1)
                  else if (info.offset.x > 70 || info.velocity.x > 450) paginate(-1)
                }}
                style={{ touchAction: 'pan-y' }}
                className="absolute inset-0 cursor-grab bg-white active:cursor-grabbing"
              >
                {slide.placeholder ? (
                  <PlaceholderSlide n={slide.placeholder} />
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.alt || 'Award certificate'}
                    draggable={false}
                    className="h-full w-full object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* arrows appear on hover (always visible on touch screens) */}
        {count > 1 &&
          [
            { d: -1, label: 'Previous award', side: 'left-[calc(var(--frame)+8px)]', flip: true },
            { d: 1, label: 'Next award', side: 'right-[calc(var(--frame)+8px)]', flip: false },
          ].map(({ d, label, side, flip }) => (
            <motion.button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => paginate(d)}
              whileTap={{ scale: 0.88 }}
              className={`absolute top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center bg-ink/80 text-white opacity-100 backdrop-blur transition-all duration-300 hover:bg-gold hover:text-ink lg:opacity-0 lg:group-hover:opacity-100 ${side}`}
            >
              <ArrowIcon className={`h-5 w-5 ${flip ? '-scale-x-100' : ''}`} />
            </motion.button>
          ))}
      </motion.div>

      {/* progress dots: the active one fills up, then the next picture slides in */}
      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3" aria-label="Choose an award">
          {slides.map((_, i) => {
            const active = i === current
            return (
              <button
                key={i}
                type="button"
                aria-label={`Show award ${i + 1}`}
                aria-current={active}
                onClick={() => jumpTo(i)}
                className="group/dot flex h-6 cursor-pointer items-center"
              >
                <span
                  className={`relative block h-[3px] overflow-hidden bg-ink/15 transition-all duration-500 ${
                    active ? 'w-14' : 'w-7 group-hover/dot:bg-ink/30'
                  }`}
                >
                  {active && (
                    <span
                      key={page}
                      onAnimationEnd={() => !reduce && paginate(1)}
                      style={{
                        animation: reduce ? 'none' : `olc-fill ${SLIDE_MS}ms linear forwards`,
                        animationPlayState: paused || !onScreen ? 'paused' : 'running',
                        transform: reduce ? 'scaleX(1)' : undefined,
                      }}
                      className="absolute inset-0 origin-left bg-gold"
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function AwardsSection() {
  return (
    <section id="awards" className="bg-white py-[clamp(64px,9.6vw,185px)]">
      <div className="mx-auto max-w-[1920px] px-5 md:px-8 xl:px-12 2xl:px-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_40.1%] lg:gap-x-[clamp(40px,9.6vw,185px)]">
          <div>
            <SectionLabel>Awards</SectionLabel>
            <RevealHeading
              text={HEADING}
              className="mt-[clamp(28px,4.4vw,84px)] max-w-[860px]"
            />
          </div>

          <AwardFrame />
        </div>
      </div>
    </section>
  )
}