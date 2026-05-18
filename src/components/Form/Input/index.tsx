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
          className={`${className} min-h-16 w-full rounded-xl border border-neutral-800 bg-black p-4 text-neutral-50 outline-none transition-colors placeholder:text-neutral-600 focus:border-sky-400/40 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]`}
          autoFocus
          autoComplete="off"
          {...rest}
          {...field}
        />
      )}
    />
  )
}
