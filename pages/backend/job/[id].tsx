import { Alert } from 'components/Alert'
import { Layout } from 'components/backend/Layout'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { JobFormValues, useJob, useJobMutation } from 'hooks/backend/useJob'
import { useRoles } from 'hooks/backend/useRole'
import { useRouter } from 'next/router'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props extends HTMLProps<HTMLFormElement> {}

export function JobForm(props: Props) {
  const router = useRouter()
  const id = router.query.id?.toString()

  const job = useJob(id)
  const roles = useRoles()
  const mutation = useJobMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormValues>({
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<JobFormValues> = async (data) => {
    mutation.mutate({
      name: data.name,
      roleName: data.role.name,
    })

    await router.push('/backend/job')
  }

  return (
    <Layout createUrl={'/backend/job/create'}>
      {job.isLoading || job.isError ? null : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start space-y-4"
        >
          {job.data.id ? (
            <input
              defaultValue={job.data.id}
              type="hidden"
              {...register('id')}
            />
          ) : null}

          <label htmlFor="name" className="space-y-1">
            <div className="font-semibold">Name</div>

            <Input
              defaultValue={job.data.name}
              type="text"
              {...register('name')}
            />

            {errors.name ? (
              <Alert variant="error">{errors.name.message}</Alert>
            ) : null}
          </label>

          <label htmlFor="roleName" className="space-y-1">
            <div className="font-semibold">Role</div>

            <Input
              id="roleName"
              defaultValue={job.data.role?.name}
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
      )}
    </Layout>
  )
}

export default JobForm
