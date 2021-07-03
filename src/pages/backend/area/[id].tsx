import { Area, Discipline } from '.prisma/client'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Layout } from 'components/backend/Layout'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { AreaFormValues, useArea, useAreaMutation } from 'hooks/backend/useArea'
import { useDisciplines } from 'hooks/backend/useDiscipline'
import { useRouter } from 'next/router'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props extends HTMLProps<HTMLFormElement> {}

export function AreaForm(props: Props) {
  const router = useRouter()
  const id = router.query.id?.toString()

  const area = useArea(id)
  const { mutate } = useAreaMutation(id)
  const disciplines = useDisciplines()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AreaFormValues>({
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<AreaFormValues> = async (data) => {
    mutate({
      id: data.id,
      name: data.name,
      disciplineName: data.discipline.name,
    })

    await router.push('/backend/area')
  }

  return (
    <Layout createUrl={'/backend/area/create'}>
      {area.isError ? (
        <Alert>Error loading area</Alert>
      ) : area.isLoading ? (
        <Alert>Loading area...</Alert>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start space-y-4"
        >
          <input
            defaultValue={area.data.id}
            type="hidden"
            {...register('id')}
          />

          <label htmlFor="name" className="space-y-1">
            <div className="font-semibold">Name</div>
            <Input
              defaultValue={area.data.name}
              type="text"
              {...register('name')}
            />
          </label>

          <label htmlFor="disciplineName" className="space-y-1">
            <div className="font-semibold">Discipline</div>

            <Input
              id="disciplineName"
              defaultValue={area.data.discipline?.name}
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
              <Alert variant="error">{errors.discipline.name.message}</Alert>
            ) : null}
          </label>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Layout>
  )
}

export default AreaForm
