import { Area, Discipline } from '.prisma/client'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { useRouter } from 'next/router'
import { PostArea } from 'pages/api/area'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { List } from '../Resource/List'

type Props = (
  | {
      id?: never
    }
  | {
      id?: number
    }
) &
  HTMLProps<HTMLDivElement>

type FormValues = Area & {
  discipline: Discipline
}

export function AreaBlock({ id }: Props) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery<
    Props['id'] extends number ? FormValues : Area[]
  >(id ? ['/api/area', id] : '/api/area')
  const disciplines = useQuery<Discipline[]>('/api/discipline')

  const mutation = useMutation((newArea: PostArea) =>
    axios.post('/api/area', newArea)
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutation.mutate({
      id: data.id,
      name: data.name,
      disciplineName: data.discipline.name,
    })

    await router.push('/backend/area')
  }

  if (isLoading) {
    return <Alert>Loading areas...</Alert>
  }

  if (isError) {
    return <Alert>Error fetching areas!</Alert>
  }

  if (Array.isArray(data)) {
    return <List resourceName="area" resourceData={data}></List>
  } else {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start space-y-4"
      >
        <input defaultValue={data.id} type="hidden" {...register('id')} />

        <label htmlFor="name" className="space-y-1">
          <div className="font-semibold">Name</div>
          <Input defaultValue={data.name} type="text" {...register('name')} />
        </label>

        <label htmlFor="disciplineName" className="space-y-1">
          <div className="font-semibold">Discipline</div>

          <Input
            id="disciplineName"
            defaultValue={data.discipline?.name}
            type="text"
            {...register('discipline.name')}
            list="disciplineNames"
          />

          <datalist id="disciplineNames">
            {disciplines.data?.map((discipline) => (
              <option key={discipline.id} value={discipline.name}></option>
            ))}
          </datalist>

          {errors.discipline?.name ? (
            <Alert className="text-red-200 bg-red-500">
              {errors.discipline.name.message}
            </Alert>
          ) : null}
        </label>

        <Button type="submit">Submit</Button>
      </form>
    )
  }
}
