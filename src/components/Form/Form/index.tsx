import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'

import { ComponentProps } from '@/types'

type FormProps = ComponentProps & {
  onSubmit: (data: any) => void
  defaultData?: any
}

export default function Form({ children, onSubmit, defaultData }: FormProps) {
  const methods = useForm({
    defaultValues: defaultData
  })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}
