import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { animate, motion, useMotionValue } from 'framer-motion'
import { practiceAreas } from '../data/practiceAreas'
import { RevealHeading, SectionLabel, VIEW } from '../components/SectionHeading'
import { ArrowIcon } from '../components/icons'
import PracticeCard from '../components/PracticeCard'

const EASE = [0.22, 1, 0.36, 1]
const SPRING = { type: 'spring', stiffness: 210, damping: 30, mass: 0.9 }

const HEADING =
  'We handle the legal matters Nigerians face most, from land and property to commercial and family disputes.'

/* ------------------------------------------------------------------ */
/* slider                                                              */
/* ------------------------------------------------------------------ */

function arrowBtn(disabled) {
  return `grid h-12 w-14 place-items-center text-clay transition-opacity duration-300 ${
    disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'
  }`
}

export default function WhatWeDoSection({ detailed = false }) {
  const viewportRef = useRef(null)
  const dragged = useRef(false)
  const x = useMotionValue(0)
  const [boxW, setBoxW] = useState(0)
  const [index, setIndex] = useState(0)

  // measure the visible area and decide how many cards fit
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setBoxW(el.clientWidth))
    ro.observe(el)
    setBoxW(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  const perView = boxW >= 900 ? 3 : boxW >= 560 ? 2 : 1.12
  const gap = boxW >= 900 ? Math.round(boxW * 0.027) : 20
  const cardW = boxW ? (boxW - gap * (Math.ceil(perView) - 1)) / perView : 0
  const step = cardW + gap
  const maxIndex = Math.max(0, practiceAreas.length - Math.floor(perView))

  const goTo = useCallback(
    (i) => {
      const next = Math.min(Math.max(i, 0), maxIndex)
      setIndex(next)
      animate(x, -next * step, SPRING)
    },
    [maxIndex, step, x],
  )

  // keep position correct when the layout changes (resize / rotate)
  useEffect(() => {
    const next = Math.min(index, maxIndex)
    if (next !== index) setIndex(next)
    x.set(-next * step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, maxIndex])

  const onDragEnd = (_, info) => {
    const projected = -(x.get() + info.velocity.x * 0.2) / step
    goTo(Math.round(projected))
    setTimeout(() => (dragged.current = false), 0)
  }

  return (
    <section
      id="what-we-do"
      className="bg-[#f6f6f6] py-[clamp(64px,7vw,135px)] pb-[clamp(64px,9.4vw,180px)]"
    >
      <div className="mx-auto max-w-[1920px] px-5 md:px-8 xl:px-12 2xl:px-32">
        <div className="grid gap-8 lg:grid-cols-[42.8%_57.2%] lg:gap-0">
          <div className="lg:pt-[0.55em]">
            <SectionLabel>What We Do</SectionLabel>
          </div>

          <div>
            <RevealHeading text={HEADING} />

            {/* prev / next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="mt-[clamp(20px,2.9vw,56px)] flex items-center justify-end gap-[clamp(12px,2.4vw,46px)]"
            >
              <motion.button
                type="button"
                aria-label="Previous practice areas"
                disabled={index === 0}
                onClick={() => goTo(index - 1)}
                whileTap={index === 0 ? undefined : { scale: 0.85, x: -6 }}
                whileHover={index === 0 ? undefined : { x: -5 }}
                className={arrowBtn(index === 0)}
              >
                <ArrowIcon className="h-[clamp(26px,2.4vw,46px)] w-[clamp(34px,3vw,58px)] -scale-x-100" />
              </motion.button>
              <motion.button
                type="button"
                aria-label="Next practice areas"
                disabled={index === maxIndex}
                onClick={() => goTo(index + 1)}
                whileTap={index === maxIndex ? undefined : { scale: 0.85, x: 6 }}
                whileHover={index === maxIndex ? undefined : { x: 5 }}
                className={arrowBtn(index === maxIndex)}
              >
                <ArrowIcon className="h-[clamp(26px,2.4vw,46px)] w-[clamp(34px,3vw,58px)]" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* cards */}
        <div
          ref={viewportRef}
          className="mt-[clamp(20px,2.4vw,46px)] overflow-hidden"
          onClickCapture={(e) => {
            // a drag must never count as a click on a card
            if (dragged.current) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -maxIndex * step, right: 0 }}
            dragElastic={0.08}
            dragMomentum={false}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={onDragEnd}
            style={{ x, gap, touchAction: 'pan-y' }}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {practiceAreas.map((item, i) => (
              <PracticeCard
                key={item.slug}
                item={item}
                index={i}
                width={cardW || undefined}
                detailed={detailed}
                firstDelay={i < Math.ceil(perView) ? i * 0.12 : 0}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-[clamp(28px,3vw,56px)]"
        >
          <Link
            to="/what-we-do"
            className="group relative inline-block pb-2.5 font-display text-[clamp(17px,1.25vw,24px)] font-bold uppercase tracking-[0.1em] text-ink"
          >
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              All practice areas
            </span>
            <span className="absolute bottom-0 left-0 h-[3px] w-[60%] bg-gold transition-[width] duration-500 ease-out group-hover:w-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}