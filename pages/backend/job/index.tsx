import { Job } from '.prisma/client'
import { HTMLProps } from 'react'
import { useQuery } from 'react-query'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'

type Props = HTMLProps<HTMLDivElement>

export function JobList(props: Props) {
  const { data } = useQuery<Job[]>('/api/job')

  return (
    <Layout createUrl={'/backend/job/create'}>
      <List name="role" data={data}></List>
    </Layout>
  )
}

export default JobList
