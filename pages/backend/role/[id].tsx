import { Area, Role } from '.prisma/client'
import axios from 'axios'
import { Alert } from 'components/Alert'
import { Layout } from 'components/backend/Layout'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { useAreas } from 'hooks/backend/useArea'
import { useRole, useRoleMutation, RoleFormValues } from 'hooks/backend/useRole'
import { useRouter } from 'next/router'
import { HTMLProps } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props extends HTMLProps<HTMLFormElement> {}

export function RoleForm(props: Props) {
  const router = useRouter()
  const id = router.query.id?.toString()

  const { data = {} } = useRole(id)
  const areas = useAreas()
  const { mutate } = useRoleMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleFormValues>({
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<RoleFormValues> = async (data) => {
    mutate({
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
