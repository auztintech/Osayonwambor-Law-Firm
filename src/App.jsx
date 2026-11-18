import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import WhoWeAre from './pages/WhoWeAre'
import WhatWeDo from './pages/WhatWeDo'
import PracticeArea from './pages/PracticeArea'
import Appointment from './pages/Appointment'
import Testimonials from './pages/Testimonials'
import Partners from './pages/Partners'
import NotFound from './pages/NotFound'

/** every new page opens at the top */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/who-we-are" element={<Page><WhoWeAre /></Page>} />
          <Route path="/what-we-do" element={<Page><WhatWeDo /></Page>} />
          <Route path="/what-we-do/:slug" element={<Page><PracticeArea /></Page>} />
          <Route path="/appointment" element={<Page><Appointment /></Page>} />
          <Route path="/testimonials" element={<Page><Testimonials /></Page>} />
          <Route path="/partners" element={<Page><Partners /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}