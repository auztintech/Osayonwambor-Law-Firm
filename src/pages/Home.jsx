import Hero from '../sections/Hero'
import WhoWeAreSection from '../sections/WhoWeAreSection'
import WhatWeDoSection from '../sections/WhatWeDoSection'
import AwardsSection from '../sections/AwardsSection'
import PartnersSection from '../sections/PartnersSection'
import SchedulerSection from '../sections/SchedulerSection'

/**
 * The home page is the full story: every menu item also lives here as a section
 * (added below as designs arrive), while each also has its own page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAreSection />
      <WhatWeDoSection />
      <AwardsSection />
      <PartnersSection />
      <SchedulerSection />
    </>
  )
}