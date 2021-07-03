import { Prisma } from '.prisma/client'
import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export type PostArea = {
  id?: number
  name: string
  disciplineName: string
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
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
      include: {
        discipline: true,
      },
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

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id)

  if (Number.isNaN(id)) {
    res.status(204).end()
  }

  const area = await prisma.area.findUnique({
    where: {
      id: Number(id),
    },
  })

  return res.status(200).json(area)
}

async function patchHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.body.id)
  const { name } = req.body

  const area = await prisma.area.update({
    data: {
      name,
    },
    where: {
      id,
    },
  })

  return res.status(200).json(area)
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.body.id)

  const area = await prisma.area.delete({
    where: {
      id,
    },
  })

  return res.status(204).json(area)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  jsonHeader(res)

  try {
    switch (method) {
      case 'GET': {
        return getHandler(req, res)
      }
      case 'POST': {
        return postHandler(req, res)
      }
      case 'PATCH': {
        return patchHandler(req, res)
      }
      case 'DELETE': {
        return deleteHandler(req, res)
      }
      default: {
        return res.status(405).end()
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
