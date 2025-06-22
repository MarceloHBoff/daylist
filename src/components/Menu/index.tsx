'use client'

import Image from 'next/image'

import { useState } from 'react'

import MenuLink from './MenuLink'
import SignOut from './SignOut'

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className="flex items-center justify-between border-b-2 border-b-slate-400 bg-zinc-700 p-4 md:justify-center">
        <div className="flex w-full items-center justify-between md:hidden">
          <div className="flex items-center">
            <Image src="/favicon.ico" width={32} height={32} alt="Day list" />
          </div>

          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 flex-col items-center justify-center space-y-1 rounded-md bg-zinc-600 p-2 transition-colors hover:bg-zinc-500"
            aria-label="Toggle menu"
          >
            <div
              className={`h-0.5 w-5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <div
              className={`h-0.5 w-5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <div
              className={`h-0.5 w-5 bg-white transition-all duration-300 ${
                isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        <div className="hidden w-full grid-cols-5 md:mx-14 md:grid">
          <div className="flex items-center justify-center">
            <Image src="/favicon.ico" width={36} height={36} alt="Day list" />
          </div>

          <div className="col-span-3 flex justify-center">
            <MenuLink />
          </div>

          <SignOut />
        </div>
      </nav>

      {isMenuOpen && (
        <div className="bg-zinc-700 transition-all duration-300 md:hidden">
          <div className="flex h-full flex-col items-center justify-center space-y-8 p-8">
            <div className="text-center">
              <MenuLink />
            </div>

            <SignOut />
          </div>
        </div>
      )}
    </>
  )
}
