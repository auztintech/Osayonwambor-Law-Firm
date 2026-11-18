import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-5 py-24 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-gold sm:text-9xl">404</p>
        <p className="mt-2 text-lg text-[#55575e]">We couldn&rsquo;t find that page.</p>
        <Link
          to="/"
          className="mt-8 inline-block bg-gold px-8 py-4 font-display text-lg font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-white"
        >
          Back home
        </Link>
      </div>
    </section>
  )
}
