import { Role } from '.prisma/client'
import { useQuery } from 'react-query'


export function useRoles() {
  return useQuery<Role[]>('/api/role')
}

export function useRole(id: string) {
  return useQuery<Role>(['/api/role', id])
}
