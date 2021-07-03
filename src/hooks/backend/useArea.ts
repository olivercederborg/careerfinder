import { Area } from '.prisma/client'
import { useQuery } from 'react-query'

export function useAreas() {
  return useQuery<Area[]>('/api/area')
}

export function useArea(id: string) {
  return useQuery<Area>(['/api/area', id])
}