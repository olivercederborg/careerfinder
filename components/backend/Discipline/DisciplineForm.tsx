import { Discipline, Prisma } from '.prisma/client'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { useRouter } from 'next/router'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

type FormValues = Discipline

interface Props extends HTMLProps<HTMLFormElement> {}

async function fetchDiscipline(id: string) {
  const { data } = await axios.get<FormValues>(`/api/discipline/${id}`)

  return data
}

export function DisciplineForm({ id }: Props) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery<Discipline>(
    ['/api/discipline', id],
    () => fetchDiscipline(id)
  )

  const mutation = useMutation(
    (newDiscipline: Prisma.DisciplineUpdateArgs['data']) =>
      axios.post('/api/discipline', newDiscipline)
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
    return <Alert>Loading discipline...</Alert>
  }

  if (isError) {
    return <Alert>Error fetching discipline!</Alert>
  }

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
          <Alert variant="error">{errors.name.message}</Alert>
        ) : null}
      </label>

      <Button type="submit">Submit</Button>
    </form>
  )
}
