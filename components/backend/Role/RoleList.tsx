import { HTMLProps } from 'react'
import { useQuery } from 'react-query'
import { Role } from '.prisma/client'
import { Alert } from 'components/Alert'
import { List } from 'components/backend/Resource/List'

type Props = HTMLProps<HTMLDivElement>

export function RoleList(props: Props) {
  const { data, isLoading, isError } = useQuery<Role[]>('/api/role')

  if (isLoading) {
    return <Alert>Loading roles...</Alert>
  }

  if (isError) {
    return <Alert>Error fetching roles!</Alert>
  }

  return <List name="role" data={data}></List>
}
