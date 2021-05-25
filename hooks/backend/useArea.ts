import { Area, Discipline } from '.prisma/client'
import axios from 'axios'
import { PostArea } from 'pages/api/area/[id]'
import { useMutation, useQuery } from 'react-query'

export type AreaFormValues = Area & {
  discipline: Discipline
}

export function useAreas() {
  return useQuery<Area[]>('/api/area')
}

export function useArea(id: string) {
  return useQuery<AreaFormValues>(['/api/area', id])
}

export function useAreaMutation() {
  return useMutation((newArea: PostArea) => axios.post('/api/area', newArea))
}
