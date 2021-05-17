import { Layout } from 'components/backend/Layout'

import { RoleBlock } from 'components/backend/Role'
import { AreaBlock } from 'components/backend/Area'
import { DisciplineBlock } from 'components/backend/Discipline'
import { useParams } from 'hooks/backend/useParams'

function getContent() {
  const { name, id } = useParams()

  switch (name.toLowerCase()) {
    case 'role': {
      return <RoleBlock id={id}></RoleBlock>
    }
    case 'discipline': {
      return <DisciplineBlock id={id}></DisciplineBlock>
    }
    case 'area': {
      return <AreaBlock id={id}></AreaBlock>
    }
  }

  return ''
}

function Backend() {
  const { name } = useParams()
  const content = getContent()

  return (
    <Layout
      name={name}
      createUrl={name ? `/backend/${name.toLowerCase()}/create` : null}
    >
      {content}
    </Layout>
  )
}

export default Backend
