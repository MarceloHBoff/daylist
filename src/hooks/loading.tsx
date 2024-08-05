import { createContext, useContext, useCallback, useState } from 'react'

import Loading from '@/components/Loading'
import { ComponentProps } from '@/types'

type LoadingContextData = {
  loader(func: any): void
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
)

function LoadingProvider({ children }: ComponentProps) {
  const [show, setShow] = useState(false)

  const loader = useCallback(async (func: any) => {
    setShow(true)

    await func()

    setShow(false)
  }, [])

  return (
    <LoadingContext.Provider value={{ loader }}>
      {children}

      {show && <Loading />}
    </LoadingContext.Provider>
  )
}

function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext)

  return context
}

export { LoadingProvider, useLoading }
