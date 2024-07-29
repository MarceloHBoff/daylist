'use client'

import Image from 'next/image'

import { useState } from 'react'

import DateForm from './DateForm'

const options = ['Every Day', 'Day on Month', 'Day on Week']

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="relative z-50 flex w-full items-center rounded-xl bg-zinc-700 p-3 text-white transition-all hover:bg-zinc-600"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Create Tickets
        <Image
          className="ml-4"
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

          <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl bg-zinc-600">
            {options.map((p, index) => (
              <DateForm
                key={p}
                type={index}
                opener={
                  <li className="cursor-pointer p-4 text-white hover:bg-zinc-500">
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
