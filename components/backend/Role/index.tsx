import { Area, Discipline, Prisma, Role } from '.prisma/client'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { List } from 'components/backend/Resource/List'
import { PostRole } from 'pages/api/role'
import { useRouter } from 'next/router'

type Props = (
  | {
      id?: never
    }
  | {
      id?: number
    }
) &
  HTMLProps<HTMLDivElement>

type FormValues = Role & {
  area: Area
}

export function RoleBlock({ id }: Props) {
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useQuery<
    Props['id'] extends number ? FormValues : Role[]
  >(id ? ['/api/role', id] : '/api/role', {
    refetchOnMount: true,
  })
  const disciplines = useQuery<Discipline[]>('/api/discipline')
  const areas = useQuery<Area[]>('/api/area')

  const mutation = useMutation((newRole: PostRole) =>
    axios.post('/api/role', newRole)
  )

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

  if (isLoading) {
    return <Alert>Loading roles...</Alert>
  }

  if (isError) {
    return <Alert>Error fetching roles!</Alert>
  }

  if (Array.isArray(data)) {
    return <List resourceName="role" resourceData={data}></List>
  } else {
    return (
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
            <Alert className="text-red-200 bg-red-500">
              {errors.name.message}
            </Alert>
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
            <Alert className="text-red-200 bg-red-500">
              {errors.area.name.message}
            </Alert>
          ) : null}
        </label>

        <Button type="submit">Submit</Button>
      </form>
    )
  }
}
