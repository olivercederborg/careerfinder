import { Area, Role } from '.prisma/client'
import axios from 'axios'
import { PostRole } from 'src/pages/api/role'
import { useMutation, useQuery, useQueryClient } from 'react-query'
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

export function useRoleMutation(id?: string) {
  const queryClient = useQueryClient()

  const idCheck = Number(id)

  const mutation = useMutation(
    (role: PostRole) => {
      if (idCheck) {
        return axios.patch(`/api/role/${id}`, role)
      }

      return axios.post('/api/role', role)
    },
    {
      onSettled: () => {
        if (idCheck) {
          queryClient.invalidateQueries(['/api/role', id])
        }

        queryClient.invalidateQueries('/api/role')
      },
    }
  )

  return mutation
}
