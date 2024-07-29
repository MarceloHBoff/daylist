import { InputHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
}

export default function Input({ name, className, ...rest }: InputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          className={`${className} min-h-16 w-full rounded-xl border-2 border-gray-600 bg-gray-700 p-4 outline-none focus:border-gray-500`}
          autoFocus
          autoComplete="off"
          {...rest}
          {...field}
        />
      )}
    />
  )
}
