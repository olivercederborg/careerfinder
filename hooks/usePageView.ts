import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function usePageView() {
  const { route } = useRouter()

  useEffect(() => {
    fetch('/api/view', {
      method: 'POST',
    })
  }, [route])
}
