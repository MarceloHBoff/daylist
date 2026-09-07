'use client'

import { useState } from 'react'

import DashboardHeader from './DashboardHeader'
import DashboardOutdated from './DashboardOutdated'
import DashboardTickets from './DashboardTickets'

type DashboardProps = {
  week: number
}

export default function Dashboard({ week }: DashboardProps) {
  const [showCompleted, setShowCompleted] = useState(false)

  return (
    <>
      <DashboardHeader
        week={week}
        showCompleted={showCompleted}
        onShowCompletedChange={setShowCompleted}
      />

      <div className="flex w-full">
        <div className="flex w-full overflow-x-auto border-t border-neutral-800 p-5">
          <DashboardOutdated />

          <DashboardTickets week={week} showCompleted={showCompleted} />
        </div>
      </div>
    </>
  )
}
