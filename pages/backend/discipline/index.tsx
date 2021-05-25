import { HTMLProps } from 'react'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'
import { useDisciplines } from 'hooks/backend/useDiscipline'

interface Props extends HTMLProps<HTMLDivElement> {}

export function DisciplineList(props: Props) {
  const { data = [] } = useDisciplines()

  return (
    <Layout createUrl={'/backend/discipline/create'}>
      <List name="discipline" data={data}></List>
    </Layout>
  )
}

export default DisciplineList
