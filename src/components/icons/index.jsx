/**
 * Custom-drawn SVG icons for Osayomwanbor Law Chambers.
 * No icon library is used. Line icons "draw themselves" (stroke-dash) on mount.
 * Every icon takes `className` (size/color via Tailwind) and an optional `delay`.
 */
import { motion } from 'framer-motion'

const draw = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay, ease: 'easeInOut' },
      opacity: { duration: 0.01, delay },
    },
  },
})

const Line = ({ d, delay, ...rest }) => (
  <motion.path d={d} variants={draw(delay)} {...rest} />
)

function LineSvg({ className, children, strokeWidth = 1.7 }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {children}
    </motion.svg>
  )
}

/* ---------- contact ---------- */

export const PhoneIcon = ({ className, delay = 0 }) => (
  <LineSvg className={className}>
    <Line d="M8.5 2.5h7a2 2 0 012 2v15a2 2 0 01-2 2h-7a2 2 0 01-2-2v-15a2 2 0 012-2z" delay={delay} />
    <Line d="M10.5 18.2h3" delay={delay + 0.5} />
    <Line d="M10.5 5.4h3" delay={delay + 0.6} />
  </LineSvg>
)

export const MailIcon = ({ className, delay = 0 }) => (
  <LineSvg className={className}>
    <Line d="M5 4.8h14a2 2 0 012 2v10.4a2 2 0 01-2 2H5a2 2 0 01-2-2V6.8a2 2 0 012-2z" delay={delay} />
    <Line d="M3.6 7.2l8.4 6.3 8.4-6.3" delay={delay + 0.5} />
  </LineSvg>
)

export const PinIcon = ({ className, delay = 0 }) => (
  <LineSvg className={className}>
    <Line d="M12 21.3s-6.6-5.5-6.6-11.2a6.6 6.6 0 0113.2 0c0 5.7-6.6 11.2-6.6 11.2z" delay={delay} />
    <Line d="M12 7.8a2.4 2.4 0 110 4.8 2.4 2.4 0 010-4.8z" delay={delay + 0.5} />
  </LineSvg>
)

/* ---------- small UI marks ---------- */

export const ArrowIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3.5 12h17M14.5 5.8L20.7 12l-6.2 6.2" />
  </svg>
)

export const CaretIcon = ({ className }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M2.5 4.5L6 8l3.5-3.5" />
  </svg>
)

/* ---------- social ---------- */

const Fill = ({ className, children }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    {children}
  </svg>
)

export const XIcon = ({ className }) => (
  <Fill className={className}>
    <path d="M4 3.8h4.6l4.1 5.7 4.8-5.7h2.2l-6 7.1 6.6 9.3h-4.6l-4.5-6.3-5.3 6.3H3.7l6.5-7.7L4 3.8zm3.4 1.5l9.4 13.4h1.3L8.7 5.3H7.4z" />
  </Fill>
)

export const FacebookIcon = ({ className }) => (
  <Fill className={className}>
    <path d="M13.6 21.5v-8.2h2.8l.45-3.3H13.6V7.9c0-.95.27-1.6 1.62-1.6h1.7V3.35c-.3-.04-1.3-.13-2.48-.13-2.45 0-4.13 1.5-4.13 4.24V10H7.5v3.3h2.8v8.2h3.3z" />
  </Fill>
)

export const InstagramIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    aria-hidden="true"
  >
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const YoutubeIcon = ({ className }) => (
  <Fill className={className}>
    <path
      fillRule="evenodd"
      d="M6.6 5.5h10.8a4.1 4.1 0 014.1 4.1v4.8a4.1 4.1 0 01-4.1 4.1H6.6a4.1 4.1 0 01-4.1-4.1V9.6a4.1 4.1 0 014.1-4.1zM10 9.2v5.6l4.9-2.8L10 9.2z"
    />
  </Fill>
)

export const socialIcons = {
  x: XIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
}
