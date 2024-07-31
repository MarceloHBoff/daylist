import DashboardHeader from './DashboardHeader'
import DashboardOutdated from './DashboardOutdated'
import DashboardTickets from './DashboardTickets'

type DashboardProps = {
  week: number
}

export default function Dashboard({ week }: DashboardProps) {
  return (
    <>
      <DashboardHeader week={week} />

      <div className="flex w-full">
        <div className="flex w-full overflow-x-auto border-t-2 border-gray-700 p-5">
          <DashboardOutdated />

          <DashboardTickets week={week} />
        </div>
      </div>
    </>
  )
}
