import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { ensureEndsWith } from 'lib/ensureEndsWith'

export function useDeleteMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ route, id }: { route: string; id: number }) => {
      return axios.delete(`${ensureEndsWith(route)}${id}`)
    },
    {
      onSuccess: (response, { route }) => {
        queryClient.invalidateQueries(route)
      },
    }
  )
}
