import { useParams } from 'hooks/backend/useParams'

import { Layout } from 'components/backend/Layout'
import { DisciplineForm, DisciplineList } from 'components/backend/Discipline'
import { RoleForm, RoleList } from 'components/backend/Role'
import { AreaForm, AreaList } from 'components/backend/Area'
import { JobForm, JobList } from 'components/backend/Job'

function getContent() {
  const { name, id } = useParams()

  if (id) {
    switch (name.toLowerCase()) {
      case 'role': {
        return <RoleForm id={id}></RoleForm>
      }
      case 'discipline': {
        return <DisciplineForm id={id}></DisciplineForm>
      }
      case 'area': {
        return <AreaForm id={id}></AreaForm>
      }
      case 'job': {
        return <JobForm id={id}></JobForm>
      }
    }
  }

  switch (name.toLowerCase()) {
    case 'role': {
      return <RoleList></RoleList>
    }
    case 'discipline': {
      return <DisciplineList></DisciplineList>
    }
    case 'area': {
      return <AreaList></AreaList>
    }
    case 'job': {
      return <JobList></JobList>
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
