import Dashboard from '@/pages/Dashboard'
import PageWrapper from '@/pages/PageWrapper'

export default function Week({ params }: { params: { week: number } }) {
  return (
    <PageWrapper>
      <Dashboard week={params.week} />
    </PageWrapper>
  )
}
