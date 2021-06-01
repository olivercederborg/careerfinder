import { Area, Discipline } from '.prisma/client'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PostArea } from 'pages/api/area/[id]'

export type AreaFormValues = Area & {
  discipline: Discipline
}

export function useAreas() {
  return useQuery<Area[]>('/api/area')
}

export function useArea(id: string) {
  return useQuery<AreaFormValues>(['/api/area', id])
}

export function useAreaMutation(id?: string) {
  const queryClient = useQueryClient()

  const idCheck = Number(id)

  const mutation = useMutation(
    (area: PostArea) => {
      if (idCheck) {
        return axios.patch(`/api/area/${id}`, area)
      }

      return axios.post('/api/area', area)
    },
    {
      onSettled: () => {
        if (idCheck) {
          queryClient.invalidateQueries(['/api/area', id])
        }

        queryClient.invalidateQueries('/api/area')
      },
    }
  )

  return mutation
}
