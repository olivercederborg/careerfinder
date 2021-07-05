import { HTMLProps } from 'react'
import { useQuery } from 'react-query'
import { Area } from '.prisma/client'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'
import { useAreas } from 'hooks/backend/useArea'

interface Props extends HTMLProps<HTMLDivElement> {}

export function AreaList(props: Props) {
  const { data = [] } = useAreas()

  return (
    <Layout createUrl={'/backend/area/create'}>
      <List name="area" data={data}></List>
    </Layout>
  )
}

export default AreaList
