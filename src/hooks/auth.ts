import { useQuery } from 'react-query'

export function useAuth() {
  const { data, isSuccess, isError } = useQuery('/api/auth')

  if (isError) {
    return null
  }

  if (isSuccess) {
    return data
  }
}
