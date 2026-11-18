import PageHeader from '../components/PageHeader'
import SchedulerSection from '../sections/SchedulerSection'

export default function Appointment() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Appointment' }]}
        label="Appointment"
        title="Book a consultation"
        lead="Choose a day and time to visit our chambers in Benin City. Tell us briefly what your matter is about, and we will call to confirm your appointment."
      />
      <SchedulerSection />
    </>
  )
}
