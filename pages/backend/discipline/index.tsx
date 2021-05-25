import { HTMLProps } from 'react'
import { useQuery } from 'react-query'
import { Discipline } from '.prisma/client'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'

interface Props extends HTMLProps<HTMLDivElement> {}

export function DisciplineList(props: Props) {
  const { data = [] } = useQuery<Discipline[]>('/api/discipline')

  return (
    <Layout createUrl={'/backend/discipline/create'}>
      <List name="discipline" data={data}></List>
    </Layout>
  )
}

export default DisciplineList
