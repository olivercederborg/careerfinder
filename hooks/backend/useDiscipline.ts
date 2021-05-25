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

export function useDisciplineMutation() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newDiscipline: Prisma.DisciplineUpdateArgs['data']) => {
      return axios.post('/api/discipline', newDiscipline)
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('/api/discipline')
      },
    }
  )

  return mutation
}
