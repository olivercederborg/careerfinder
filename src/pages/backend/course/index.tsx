import { HTMLProps } from 'react'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'

interface Props extends HTMLProps<HTMLDivElement> {}

export function CourseList(props: Props) {
  return (
    <Layout createUrl={'/backend/course/create'}>
      <List name="course" data={[]}></List>
    </Layout>
  )
}

export default CourseList
