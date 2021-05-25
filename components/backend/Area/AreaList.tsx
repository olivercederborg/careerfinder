import { HTMLProps } from 'react'
import { useQuery } from 'react-query'
import { Area } from '.prisma/client'
import { Alert } from 'components/Alert'
import { List } from 'components/backend/Resource/List'

interface Props extends HTMLProps<HTMLDivElement> {}

export function AreaList(props: Props) {
  const { data, isLoading, isError } = useQuery<Area[]>('/api/area')

  if (isLoading) {
    return <Alert>Loading areas...</Alert>
  }

  if (isError) {
    return <Alert>Error fetching areas!</Alert>
  }

  return <List name="area" data={data}></List>
}
