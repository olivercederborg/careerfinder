import { Prisma } from '.prisma/client'
import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const include = {
  discipline: true,
}

export type PostArea = {
  id?: number
  name: string
  disciplineName: string
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, disciplineName }: PostArea = req.body

  const discipline = await prisma.discipline.upsert({
    create: {
      name: disciplineName,
    },
    update: {},
    where: {
      name: disciplineName,
    },
  })

  try {
    const upsert: Prisma.AreaUpsertArgs['create'] = {
      name,
      discipline: {
        connectOrCreate: {
          create: {
            name: discipline.name,
          },
          where: {
            name: discipline.name,
          },
        },
      },
    }

    const area = await prisma.area.upsert({
      include,
      update: upsert,
      create: upsert,
      where: {
        id,
      },
    })

    return res.status(201).json(area)
  } catch (e) {
    return res.status(500).end()
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  jsonHeader(res)

  if (id) {
    const area = await prisma.area.findUnique({
      where: {
        id: Number(id),
      },
    })

    return res.status(200).json(area)
  }

  const areas = await prisma.area.findMany()

  return res.status(200).json(areas)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  try {
    switch (method) {
      case 'GET': {
        return get(req, res)
      }
      case 'POST': {
        return post(req, res)
      }
      default: {
        return res.status(405).end()
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
