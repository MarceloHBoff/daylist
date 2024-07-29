'use client'

import { apiPost } from '@/lib/api'
import { plop } from '@/utils/audio'

type TicketCheckProps = {
  id: string
}

export default function TicketCheck({ id }: TicketCheckProps) {
  const onMarkAsDone = async () => {
    await new Audio(plop).play()

    await apiPost(`/tickets/mark-as-done?id=${id}`, {})

    window.location.reload()
  }

  return (
    <button
      className="group h-5 w-5 rounded-full border-2 transition duration-300 hover:border-green-500 hover:opacity-80"
      onClick={onMarkAsDone}
    >
      <svg
        className="inset-0 m-auto h-4 w-4 text-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
  )
}
