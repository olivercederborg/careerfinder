import { Discipline, Prisma } from '.prisma/client'
import { HTMLProps, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { List } from '../Resource/List'
import { useRouter } from 'next/router'
import { useHandleMutation } from 'lib/handleMutation'

type Props = HTMLProps<HTMLDivElement> & {
  id: number
}

type FormValues = Discipline

async function fetchDiscipline(id?: number) {
  const { data } = await axios.get<
    typeof id extends number ? Discipline : Discipline[]
  >(id ? `/api/role/${id}` : '/api/role')

  return data
}

export function DisciplineBlock({ id }: Props) {
  const router = useRouter()
  const handleMutation = useHandleMutation('/api/discipline')

  const { data, isLoading, isError } = useQuery<
    Props['id'] extends number ? FormValues : Discipline[]
  >(
    id ? ['/api/discipline', id] : '/api/discipline',
    () => fetchDiscipline(id),
    {
      refetchOnMount: true,
    }
  )

  const mutation = useMutation(
    (newDiscipline: Prisma.DisciplineUpdateArgs['data']) =>
      axios.post('/api/discipline', newDiscipline),
    handleMutation
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
    })

    await router.push('/backend/discipline')
  }

  if (isLoading) {
    return <Alert>Loading disciplines...</Alert>
  }

  if (isError) {
    return <Alert>Error fetching disciplines!</Alert>
  }

  if (Array.isArray(data)) {
    return <List resourceName="discipline" resourceData={data}></List>
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

          {errors.name ? (
            <Alert className="text-red-200 bg-red-500">
              {errors.name.message}
            </Alert>
          ) : null}
        </label>

        <Button type="submit">Submit</Button>
      </form>
    )
  }
}
