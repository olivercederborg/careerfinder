import { HTMLProps } from 'react'
import { useQuery } from 'react-query'
import { Role } from '.prisma/client'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'

type Props = HTMLProps<HTMLDivElement>

export function RoleList(props: Props) {
  const { data } = useQuery<Role[]>('/api/role')

  return (
    <Layout createUrl={'/backend/role/create'}>
      <List name="role" data={data}></List>
    </Layout>
  )
}

export default RoleList
