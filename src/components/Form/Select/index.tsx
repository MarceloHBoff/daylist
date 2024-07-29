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
              className="flex min-h-16 w-full items-center rounded-xl border-2 border-gray-600 bg-gray-700 p-4 text-left outline-none focus:border-gray-500"
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
                  className="fixed inset-0 z-40 h-screen w-screen"
                  onClick={() => setIsOpen(false)}
                />

                <ul className="absolute z-50 mt-2 max-h-96 w-full overflow-y-auto overflow-x-hidden rounded-xl bg-zinc-600">
                  {options.map(p => (
                    <li
                      key={p.id}
                      value={p.id}
                      className="flex cursor-pointer items-center px-4 py-3 text-white hover:bg-zinc-500"
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
