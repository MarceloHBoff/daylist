'use client'

import { useEffect, useRef, useState } from 'react'

import { useMarkAsDone, useMarkAsUndone } from '@/hooks/tickets'
import { plop } from '@/utils/audio'
import confetti from 'canvas-confetti'

type TicketCheckProps = {
  id: string
  done?: boolean
}

const COMPLETION_COOLDOWN_MS = 2000
const COMPLETION_ANIMATION_MS = 650
const completionLockEvent = 'daylist:completion-lock'
let completionLockedUntil = 0

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

export default function TicketCheck({ id, done = false }: TicketCheckProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompletionLocked, setIsCompletionLocked] = useState(false)
  const markAsDone = useMarkAsDone()
  const markAsUndone = useMarkAsUndone()

  useEffect(() => {
    const updateLock = () =>
      setIsCompletionLocked(Date.now() < completionLockedUntil)

    window.addEventListener(completionLockEvent, updateLock)
    updateLock()

    return () => window.removeEventListener(completionLockEvent, updateLock)
  }, [])

  const onMarkAsDone = () => {
    if (done) {
      if (!markAsUndone.isPending) markAsUndone.mutate(id)
      return
    }

    if (isCompleting || Date.now() < completionLockedUntil) return

    completionLockedUntil = Date.now() + COMPLETION_COOLDOWN_MS
    window.dispatchEvent(new Event(completionLockEvent))
    window.setTimeout(() => {
      window.dispatchEvent(new Event(completionLockEvent))
    }, COMPLETION_COOLDOWN_MS)
    setIsCompleting(true)

    new Audio(plop).play().catch(() => {})

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight
      fireConfetti(x, y)
    }

    window.setTimeout(() => {
      markAsDone.mutate(id)
      setIsCompleting(false)
    }, COMPLETION_ANIMATION_MS)
  }

  const isDisabled =
    isCompleting ||
    (!done && isCompletionLocked) ||
    markAsDone.isPending ||
    markAsUndone.isPending

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={done ? 'Mark task as incomplete' : 'Complete task'}
      title={done ? 'Mark as incomplete' : 'Complete task'}
      data-completing={isCompleting ? 'true' : undefined}
      className={`group h-5 w-5 flex-shrink-0 rounded-full border transition-all duration-200 ${
        done || isCompleting
          ? 'scale-110 border-green-400 bg-green-400 text-neutral-950 shadow-[0_0_16px_-2px_rgba(74,222,128,0.65)]'
          : 'border-neutral-700 hover:border-green-400 hover:bg-green-400/10 hover:shadow-[0_0_12px_-2px_rgba(74,222,128,0.4)] disabled:cursor-not-allowed disabled:opacity-45'
      }`}
      onClick={onMarkAsDone}
      disabled={isDisabled}
    >
      <svg
        className={`inset-0 m-auto h-4 w-4 transition-all duration-200 ${
          done || isCompleting
            ? 'scale-100 text-neutral-950 opacity-100'
            : 'scale-75 text-green-400 opacity-0 group-hover:scale-100 group-hover:opacity-100'
        }`}
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
