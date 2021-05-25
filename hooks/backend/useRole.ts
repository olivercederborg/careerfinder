import { Area, Role } from '.prisma/client'
import axios from 'axios'
import { PostRole } from 'pages/api/role'
import { useMutation, useQuery } from 'react-query'
import { Maybe } from 'types'

export type RoleFormValues = Role & {
  area: Maybe<Area>
}

export function useRoles() {
  return useQuery<Role[]>('/api/role')
}

export function useRole(id: string) {
  return useQuery<RoleFormValues>(['/api/role', id])
}

export function useRoleMutation() {
  return useMutation((newRole: PostRole) => axios.post('/api/role', newRole))
}
