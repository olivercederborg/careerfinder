import { useEffect } from 'react'

export function useMounted(cb: () => void) {
  useEffect(() => {
    cb()
  })
}
