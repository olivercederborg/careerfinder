import { HTMLProps } from 'react'
import { useQuery } from 'react-query'
import { Discipline } from '.prisma/client'
import { Alert } from 'components/Alert'
import { List } from 'components/backend/Resource/List'

interface Props extends HTMLProps<HTMLDivElement> {}

export function DisciplineList(props: Props) {
  const { data, isLoading, isError } = useQuery<Discipline[]>(
    '/api/discipline',
    {
      refetchOnMount: true,
    }
  )

  if (isLoading) {
    return <Alert>Loading disciplines...</Alert>
  }

  if (isError) {
    return <Alert>Error fetching disciplines!</Alert>
  }

  return <List name="discipline" data={data}></List>
}
