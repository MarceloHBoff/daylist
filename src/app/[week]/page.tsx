import Home from '@/pages/Home'

export default function Week({ params }: { params: { week: number } }) {
  return <Home week={params.week} />
}
