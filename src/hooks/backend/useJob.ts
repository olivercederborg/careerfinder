import { Job, Role } from '.prisma/client'
import axios from 'axios'
import { PostJob } from 'src/pages/api/job'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export type JobFormValues = Job & {
  role: Role
}

export function useJobs() {
  return useQuery<Job[]>('/api/job')
}

export function useJob(id: string) {
  return useQuery<JobFormValues>(['/api/job', id])
}

export function useJobMutation(id?: string) {
  const queryClient = useQueryClient()

  const idCheck = Number(id)

  const mutation = useMutation(
    (job: PostJob) => {
      if (idCheck) {
        return axios.patch(`/api/job/${id}`, job)
      }

      return axios.post('/api/job', job)
    },
    {
      onSettled: () => {
        if (idCheck) {
          queryClient.invalidateQueries(['/api/job', id])
        }

        queryClient.invalidateQueries('/api/job')
      },
    }
  )

  return mutation
}
