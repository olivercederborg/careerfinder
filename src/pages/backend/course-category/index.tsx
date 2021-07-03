import { HTMLProps } from 'react'
import { List } from 'components/backend/Resource/List'
import { Layout } from 'components/backend/Layout'

interface Props extends HTMLProps<HTMLDivElement> {}

export function CourseCategoryList(props: Props) {
  return (
    <Layout createUrl={'/backend/course-category/create'}>
      <List name="course-category" data={[]}></List>
    </Layout>
  )
}

export default CourseCategoryList
