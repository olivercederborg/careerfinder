import { Job, Role } from '.prisma/client'
import axios from 'axios'
import { PostJob } from 'pages/api/job'
import { useMutation, useQuery } from 'react-query'

export type JobFormValues = Job & {
  role: Role
}

export function useJobs() {
  return useQuery<Job[]>('/api/job')
}

export function useJob(id: string) {
  return useQuery<JobFormValues>(['/api/job', id])
}

export function useJobMutation() {
  return useMutation((newJob: PostJob) => axios.post('/api/job', newJob))
}
