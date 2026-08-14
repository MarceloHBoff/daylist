import Dashboard from '@/pages/Dashboard'

export default async function Week({
  params
}: {
  params: Promise<{ week: string }>
}) {
  const { week } = await params

  return <Dashboard week={Number(week)} />
}
