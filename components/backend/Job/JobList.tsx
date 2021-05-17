import { Job } from '.prisma/client'
import { Alert } from 'components/Alert'
import { HTMLProps } from 'react'
import { useQuery } from 'react-query'
import { List } from 'components/backend/Resource/List'

type Props = HTMLProps<HTMLDivElement>

export function JobList(props: Props) {
  const { data, isLoading, isError } = useQuery<Job[]>('/api/job', {
    refetchOnMount: true,
  })

  if (isLoading) {
    return <Alert>Loading roles...</Alert>
  }

  if (isError) {
    return <Alert>Error fetching roles!</Alert>
  }

  return <List name="role" data={data}></List>
}
