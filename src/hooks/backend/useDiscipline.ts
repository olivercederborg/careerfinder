import { Discipline, Prisma } from '.prisma/client'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export type FormValues = Discipline

export function useDisciplines() {
  return useQuery<Discipline[]>('/api/discipline')
}

export function useDiscipline(id: string) {
  return useQuery<Discipline>(['/api/discipline', id])
}

export function useDisciplineMutation(id?: string) {
  const queryClient = useQueryClient()

  const idCheck = Number(id)

  const mutation = useMutation(
    (discipline: Prisma.DisciplineUpdateArgs['data']) => {
      if (idCheck) {
        return axios.patch(`/api/discipline/${id}`, discipline)
      }

      return axios.post('/api/discipline', discipline)
    },
    {
      onSettled: () => {
        if (idCheck) {
          queryClient.invalidateQueries(['/api/discipline', id])
        }

        queryClient.invalidateQueries('/api/discipline')
      },
    }
  )

  return mutation
}
