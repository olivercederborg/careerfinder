import { HTMLProps } from 'react'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'
import { useRoles } from 'hooks/backend/useRole'

type Props = HTMLProps<HTMLDivElement>

export function RoleList(props: Props) {
  const { data = [] } = useRoles()

  return (
    <Layout createUrl={'/backend/role/create'}>
      <List name="role" data={data}></List>
    </Layout>
  )
}

export default RoleList
