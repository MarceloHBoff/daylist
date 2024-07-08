'use client'

import { api } from '@/lib/axios'
import Image from 'next/image'
import { useState } from 'react'

const options = [
  {
    label: 'Move Up',
    icon: '/up.svg'
  },
  {
    label: 'Move Down',
    icon: '/down.svg'
  },
  {
    label: 'Duplicate',
    icon: '/duplicate.svg'
  },
  {
    label: 'Delete',
    icon: '/delete.svg'
  }
]

type TicketContextMenuProps = {
  id: string
  order: number
}

export default function TicketContextMenu({
  id,
  order
}: TicketContextMenuProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const onClickMenu = (label: string) => {
    switch (label) {
      case 'Move Up':
        api
          .post(`tickets/change-order?id=${id}&order=${order - 1}`)
          .then(() => {
            window.location.reload()
          })
        break
      case 'Move Down':
        api
          .post(`tickets/change-order?id=${id}&order=${order + 1}`)
          .then(() => {
            window.location.reload()
          })
        break
      case 'Duplicate':
        api.post(`tickets/duplicate?id=${id}`).then(() => {
          window.location.reload()
        })
        break
      case 'Delete':
        api.post(`tickets/delete?id=${id}`).then(() => {
          window.location.reload()
        })
        break
      default:
        break
    }
    handleClose()
  }

  return (
    <div
      className="relative"
      onContextMenu={e => {
        e.preventDefault()
        handleOpen()
      }}
    >
      <div
        className="hidden group-hover:block cursor-pointer"
        onClick={handleOpen}
      >
        <Image src="/more.svg" alt="More" width={24} height={24} />
      </div>

      {open && (
        <div className="">
          <ul
            className="absolute bg-zinc-600 shadow-lg rounded-lg py-2 z-50 min-w-44"
            style={{ top: 20, right: 20 }}
          >
            {options.map(item => (
              <li
                key={item.label}
                className="px-4 py-2 text-white hover:bg-zinc-700 cursor-pointer flex items-center"
                onClick={() => onClickMenu(item.label)}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className="opacity-75"
                />

                <span className="ml-4">{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="fixed inset-0 z-40" onClick={handleClose} />
        </div>
      )}
    </div>
  )
}
