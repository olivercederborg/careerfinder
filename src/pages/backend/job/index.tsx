import { HTMLProps } from 'react'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'
import { useJobs } from 'hooks/backend/useJob'

type Props = HTMLProps<HTMLDivElement>

export function JobList(props: Props) {
  const { data = [] } = useJobs()

  return (
    <Layout createUrl={'/backend/job/create'}>
      <List name="role" data={data}></List>
    </Layout>
  )
}

export default JobList
