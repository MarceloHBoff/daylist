'use client'

import { api } from '@/lib/axios'
import { plop } from '@/utils/audio'

type TicketCheckProps = {
  id: string
}

export default function TicketCheck({ id }: TicketCheckProps) {
  const onMarkAsDone = async () => {
    await new Audio(plop).play()

    api.post(`tickets/mark-as-done?id=${id}`).then(() => {
      window.location.reload()
    })
  }

  return (
    <button
      className="w-5 h-5 border-2 rounded-full hover:opacity-80 hover:border-green-500 transition duration-300 group"
      onClick={onMarkAsDone}
    >
      <svg
        className="inset-0 w-4 h-4 m-auto text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
