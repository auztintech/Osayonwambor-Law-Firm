import PageHeader from '../components/PageHeader'
import ConsultCta from '../components/ConsultCta'
import PartnersSection from '../sections/PartnersSection'

export default function Partners() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Partners' }]}
        label="Our Partners"
        title="The people behind the chambers"
        lead="Experienced solicitors and notaries public who give every matter careful, personal attention, from the first consultation to the final resolution."
      />
      <PartnersSection intro={false} showLink={false} />
      <ConsultCta />
    </>
  )
}
