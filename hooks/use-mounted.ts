import { useSyncExternalStore } from 'react'

export const useMounted = () => {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}
