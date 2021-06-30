import { Job } from '.prisma/client'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { JobValues } from 'types'

export function useJobs() {
  return useQuery<Job[]>('/api/job')
}

export function useJob(id: string) {
  return useQuery<JobValues>(['/api/job', id])
}

export function useJobMutation(id?: string) {
  const queryClient = useQueryClient()

  const idCheck = Number(id ?? 0)

  return useMutation(
    (job: JobValues) => {
      if (idCheck) {
        return axios.patch(`/api/job/${id}`, job)
      }

      return axios.post('/api/job', job)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/api/job')
      },
    }
  )
}
