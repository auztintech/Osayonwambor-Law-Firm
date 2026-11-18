import PageHeader from '../components/PageHeader'
import PracticeCard from '../components/PracticeCard'
import ConsultCta from '../components/ConsultCta'
import { practiceAreas } from '../data/practiceAreas'

export default function WhatWeDo() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'What we do' }]}
        label="What We Do"
        title="Areas of practice"
        lead="We handle the legal matters Nigerians face most, from land and property to commercial and family disputes. Choose an area to see how we can help."
      />

      <section className="bg-white py-[clamp(48px,6vw,110px)]">
        <div className="mx-auto grid max-w-[1920px] gap-5 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3 lg:gap-[clamp(20px,2vw,40px)] xl:px-12 2xl:px-32">
          {practiceAreas.map((item, i) => (
            <PracticeCard key={item.slug} item={item} index={i} detailed firstDelay={(i % 3) * 0.1} />
          ))}
        </div>
      </section>

      <ConsultCta />
    </>
  )
}
