'use client'

import Image from 'next/image'

import { useState } from 'react'

import DateForm from './DateForm'

const options = [
  'Every Day',
  'Every Business Day',
  'Day on Month',
  'Day on Week'
]

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="relative z-50 flex w-56 items-center rounded-xl border border-sky-400/40 bg-sky-500/10 p-3 font-medium text-sky-300 shadow-[0_0_0_1px_rgba(56,189,248,0.1),0_4px_16px_-6px_rgba(56,189,248,0.4)] transition-all hover:border-sky-400/70 hover:bg-sky-500/15 hover:text-sky-200 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.2),0_6px_24px_-6px_rgba(56,189,248,0.55)]"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Create Tickets
        <Image
          className="ml-auto opacity-80"
          alt="Down"
          src="/down.svg"
          width={18}
          height={18}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 h-screen w-screen"
            onClick={() => setIsOpen(false)}
          />

          <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/60">
            {options.map((p, index) => (
              <DateForm
                key={p}
                type={index}
                opener={
                  <li className="cursor-pointer p-4 text-neutral-100 transition-colors hover:bg-neutral-900">
                    {p}
                  </li>
                }
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
