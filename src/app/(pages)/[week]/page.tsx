import Dashboard from '@/pages/Dashboard'

export default function Week({ params }: { params: { week: number } }) {
  return <Dashboard week={params.week} />
}
