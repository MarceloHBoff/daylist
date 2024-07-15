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
          className={`${className} min-h-16 w-full border-2 border-gray-600 rounded-xl p-4 bg-gray-700 outline-none focus:border-gray-500`}
          autoFocus
          autoComplete="off"
          {...rest}
          {...field}
        />
      )}
    />
  )
}
