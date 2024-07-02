import { UseFormRegister } from 'react-hook-form'

type SelectProps = {
  options: { id: string; description: string }[]
  register: UseFormRegister<any>
  name: string
}

export default function Select({ options, name, register }: SelectProps) {
  return (
    <select
      {...register(name)}
      className="w-full border-2 border-gray-600 rounded-xl p-4 bg-transparent outline-none focus:border-gray-500"
    >
      <option className="bg-gray-700" />

      {options.map(p => (
        <option key={p.id} value={p.id} className="bg-gray-700">
          {p.description}
        </option>
      ))}
    </select>
  )
}
