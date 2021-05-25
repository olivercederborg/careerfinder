import { Area, Role } from '.prisma/client'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Layout } from 'components/backend/Layout'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { useRouter } from 'next/router'
import { PostRole } from 'pages/api/role'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { Maybe } from 'types'

type FormValues = Role & {
  area: Maybe<Area>
}

interface Props extends HTMLProps<HTMLFormElement> {}

async function fetchRole(id: string) {
  const { data } = await axios.get<FormValues>(`/api/role/${id}`)

  return data
}

export function RoleForm({ id }: Props) {
  const router = useRouter()

  const { data } = useQuery<FormValues>(['/api/role', id], () => fetchRole(id))
  const areas = useQuery<Area[]>('/api/area')

  const mutation = useMutation((newRole: PostRole) =>
    axios.post('/api/role', newRole)
  )

  console.log({ data })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutation.mutate({
      id: data.id,
      name: data.name,
      areaName: data.area.name,
    })

    await router.push('/backend/role')
  }

  return (
    <Layout createUrl={'/backend/role/create'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start space-y-4"
      >
        {data.id ? (
          <input defaultValue={data.id} type="hidden" {...register('id')} />
        ) : null}

        <label htmlFor="name" className="space-y-1">
          <div className="font-semibold">Name</div>

          <Input defaultValue={data.name} type="text" {...register('name')} />

          {errors.name ? (
            <Alert variant="error">{errors.name.message}</Alert>
          ) : null}
        </label>

        <label htmlFor="areaName" className="space-y-1">
          <div className="font-semibold">Area</div>

          <Input
            id="areaName"
            defaultValue={data.area?.name}
            type="text"
            {...register('area.name')}
            list="areaNames"
          />

          <datalist id="areaNames">
            {areas.data?.map((area) => (
              <option key={area.id} value={area.name}></option>
            ))}
          </datalist>

          {errors.area?.name ? (
            <Alert variant="error">{errors.area.name.message}</Alert>
          ) : null}
        </label>

        <Button type="submit">Submit</Button>
      </form>
    </Layout>
  )
}

export default RoleForm
