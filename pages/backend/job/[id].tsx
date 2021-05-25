import { Job, Role } from '.prisma/client'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Layout } from 'components/backend/Layout'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { useRouter } from 'next/router'
import { PostJob } from 'pages/api/job'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

type FormValues = Job & {
  role: Role
}

interface Props extends HTMLProps<HTMLFormElement> {}

async function fetchJob(id: string) {
  const { data } = await axios.get(`/api/job/${id}`)

  return data
}

export function JobForm({ id }: Props) {
  const router = useRouter()
  const { data } = useQuery<FormValues>(['/api/job', id], () => fetchJob(id))
  const roles = useQuery<Role[]>('/api/role')

  const mutation = useMutation((newJob: PostJob) =>
    axios.post('/api/job', newJob)
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
      name: data.name,
      roleName: data.role.name,
    })

    await router.push('/backend/job')
  }

  return (
    <Layout createUrl={'/backend/job/create'}>
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

        <label htmlFor="roleName" className="space-y-1">
          <div className="font-semibold">Role</div>

          <Input
            id="roleName"
            defaultValue={data.role?.name}
            type="text"
            {...register('role.name')}
            list="roleNames"
          />

          <datalist id="roleNames">
            {roles.data?.map((role) => (
              <option key={role.id} value={role.name}></option>
            ))}
          </datalist>

          {errors.role?.name ? (
            <Alert variant="error">{errors.role.name.message}</Alert>
          ) : null}
        </label>

        <Button type="submit">Submit</Button>
      </form>
    </Layout>
  )
}

export default JobForm
