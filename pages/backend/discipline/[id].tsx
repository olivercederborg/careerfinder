import { Alert } from 'components/Alert'
import { Layout } from 'components/backend/Layout'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import {
  FormValues,
  useDiscipline,
  useDisciplineMutation,
} from 'hooks/backend/useDiscipline'
import { useRouter } from 'next/router'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props extends HTMLProps<HTMLFormElement> {}

export function DisciplineForm(props: Props) {
  const router = useRouter()
  const id = router.query.id?.toString()

  const discipline = useDiscipline(id)
  const { mutate } = useDisciplineMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate({
      id: data.id,
      name: data.name,
    })

    await router.push('/backend/discipline')
  }

  return (
    <Layout createUrl={'/backend/discipline/create'}>
      {discipline.isLoading || discipline.isError ? null : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start space-y-4"
        >
          <input
            defaultValue={discipline.data?.id}
            type="hidden"
            {...register('id')}
          />

          <label htmlFor="name" className="space-y-1">
            <div className="font-semibold">Name</div>

            <Input
              defaultValue={discipline.data?.name}
              type="text"
              {...register('name')}
            />

            {errors.name ? (
              <Alert variant="error">{errors.name.message}</Alert>
            ) : null}
          </label>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Layout>
  )
}

export default DisciplineForm
