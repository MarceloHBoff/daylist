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
  const [text, setText] = useState('')

  const filteredOptions = options.filter(
    p =>
      !text ||
      p.description.toLocaleLowerCase().includes(text.toLocaleLowerCase())
  )

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
              {isOpen ? (
                <input
                  className="h-full w-full bg-transparent text-white outline-none"
                  autoFocus
                  autoComplete="off"
                  id={name}
                  name={name}
                  value={text}
                  onChange={p => setText(p.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && filteredOptions.length > 0) {
                      setIsOpen(false)
                      setText('')
                      field.onChange(filteredOptions[0].id)
                    }
                  }}
                />
              ) : (
                <>
                  {selected?.color && (
                    <div className="mr-2">
                      <TagIcon color={selected.color} />
                    </div>
                  )}

                  {field.value ? selected?.description : ''}
                </>
              )}
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 h-screen w-screen"
                  onClick={() => setIsOpen(false)}
                />

                <ul className="absolute z-50 mt-2 max-h-52 w-full overflow-y-auto overflow-x-hidden rounded-xl bg-zinc-600">
                  {filteredOptions.map(p => (
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
