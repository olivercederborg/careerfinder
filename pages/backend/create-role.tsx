import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { prisma } from 'lib/prisma'
import { Area, Discipline } from '.prisma/client'
import { FormEvent, useState } from 'react'

export const getStaticProps: GetStaticProps<{
  areas: Area[]
  disciplines: Discipline[]
}> = async () => {
  const [areas, disciplines] = await Promise.all([
    prisma.area.findMany(),
    prisma.discipline.findMany(),
  ])

  return {
    props: {
      areas,
      disciplines,
    },
  }
}

function CreateRole(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { areas, disciplines } = props

  const [response, setResponse] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const title = formData.get('title')
    const areaName = formData.get('areaName')
    const disciplineName = formData.get('disciplineName')

    const json = await fetch('/api/create-role', {
      method: 'POST',
      body: JSON.stringify({
        title,
        areaName,
        disciplineName,
      }),
    }).then((response) => response.json())

    setResponse(JSON.stringify(json, null, 2))
  }

  return (
    <>
      <form
        className="max-w-lg my-16 container space-y-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <label htmlFor="title">
            <div className="font-semibold text-lg">Title</div>
            <input
              id="title"
              name="title"
              className={'w-full px-4 py-2 border border-gray-300 rounded'}
            />
          </label>
        </div>
        <div className="space-y-4">
          <label htmlFor="areaName">
            <div className="font-semibold text-lg">Area</div>
            <input
              list="areaNames"
              id="areaName"
              name="areaName"
              className={'w-full px-4 py-2 border border-gray-300 rounded'}
            />

            <datalist id="areaNames">
              {areas.map((area) => (
                <option value={area.name}></option>
              ))}
            </datalist>
          </label>
        </div>
        <div className="space-y-4">
          <label htmlFor="disciplineName">
            <div className="font-semibold text-lg">Discipline</div>

            <input
              list="disciplineNames"
              id="disciplineName"
              name="disciplineName"
              className={'w-full px-4 py-2 border border-gray-300 rounded'}
            />

            <datalist id="disciplineNames">
              {disciplines.map((discipline) => (
                <option value={discipline.name}></option>
              ))}
            </datalist>
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 border border-black rounded bg-black text-white"
        >
          Submit
        </button>
      </form>
      {response ? <pre>{response}</pre> : null}
    </>
  )
}

export default CreateRole
