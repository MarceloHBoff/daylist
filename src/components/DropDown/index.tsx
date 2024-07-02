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
        className="w-full relative z-50 flex items-center p-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-all text-white"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Create Tickets
        <Image
          className="ml-auto"
          alt="Down"
          src="/down.svg"
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 h-screen w-screen z-40"
            onClick={() => setIsOpen(false)}
          />

          <ul className="w-full z-50 absolute mt-2 rounded-xl overflow-hidden bg-zinc-600">
            {options.map((p, index) => (
              <DateForm
                key={p}
                type={index}
                opener={
                  <li className="p-4 cursor-pointer text-white hover:bg-zinc-500">
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
