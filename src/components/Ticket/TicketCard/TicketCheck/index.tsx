'use client'

import { useRef } from 'react'

import { useMarkAsDone } from '@/hooks/tickets'
import { plop } from '@/utils/audio'
import confetti from 'canvas-confetti'

type TicketCheckProps = {
  id: string
}

function fireConfetti(x: number, y: number) {
  confetti({
    particleCount: 70,
    spread: 90,
    origin: { x, y },
    colors: ['#4ade80', '#22c55e', '#a3e635', '#fbbf24', '#f472b6', '#60a5fa'],
    shapes: ['star'],
    scalar: 1.3,
    gravity: 1.1,
    decay: 0.91,
    startVelocity: 32,
    ticks: 60
  })

  setTimeout(() => {
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { x, y },
      colors: ['#86efac', '#4ade80', '#d9f99d', '#fde68a'],
      shapes: ['circle'],
      scalar: 0.7,
      gravity: 1.3,
      decay: 0.93,
      startVelocity: 20,
      ticks: 50
    })
  }, 90)
}

export default function TicketCheck({ id }: TicketCheckProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const markAsDone = useMarkAsDone()

  const onMarkAsDone = async () => {
    new Audio(plop).play().catch(() => {})

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight
      fireConfetti(x, y)
    }

    markAsDone.mutate(id)
  }

  return (
    <button
      ref={buttonRef}
      className="group h-5 w-5 flex-shrink-0 rounded-full border-2 border-zinc-600 transition-all duration-200 hover:border-green-500 hover:bg-green-500/10"
      onClick={onMarkAsDone}
      disabled={markAsDone.isPending}
    >
      <svg
        className="inset-0 m-auto h-4 w-4 text-green-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
