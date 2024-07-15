import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import TagIcon from '@/components/TagIcon'

type SelectProps = {
  options: { id: string; description: string; color?: string }[]
  name: string
}

export default function Select({ options, name }: SelectProps) {
  const { control } = useFormContext()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = options.find(p => p.id === field.value)

        return (
          <div className="relative w-full">
            <button
              className="min-h-16 w-full text-left flex items-center border-2 rounded-xl p-4 border-gray-600  bg-gray-700 outline-none focus:border-gray-500"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              {selected?.color && (
                <div className="mr-2">
                  <TagIcon color={selected.color} />
                </div>
              )}

              {field.value ? selected?.description : ''}
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 h-screen w-screen z-40"
                  onClick={() => setIsOpen(false)}
                />

                <ul className="w-full z-50 absolute mt-2 rounded-xl overflow-x-hidden overflow-y-auto max-h-96 bg-zinc-600">
                  {options.map(p => (
                    <li
                      key={p.id}
                      value={p.id}
                      className="px-4 py-3 cursor-pointer text-white hover:bg-zinc-500 flex items-center"
                      onClick={() => {
                        setIsOpen(false)
                        field.onChange(p.id)
                      }}
                    >
                      {p.color && (
                        <div className="mr-2">
                          <TagIcon color={p.color} />
                        </div>
                      )}

                      {p.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )
      }}
    />
  )
}
