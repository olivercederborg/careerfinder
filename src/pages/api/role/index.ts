import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import { session } from 'lib/session'
import { jsonHeader } from 'lib/jsonHeader'

const include = {
  area: true,
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id ?? 0)

  jsonHeader(res)

  if (Number.isNaN(id)) {
    return res.status(204).end()
  }

  if (id) {
    const role = await prisma.role.findUnique({
      where: {
        id,
      },
      include,
    })

    return res.status(200).json(role)
  }

  const roles = await prisma.role.findMany({
    include,
  })

  return res.json(roles)
}

export type PostRole = {
  id?: number
  name: string
  areaName: string
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.body.id ?? 0)
  const { name, areaName }: PostRole = req.body

  const area = await prisma.area.upsert({
    create: {
      name: areaName,
    },
    update: {},
    where: {
      name: areaName,
    },
  })

  if (id) {
    const role = await prisma.role.update({
      data: {
        name,
        area: {
          connectOrCreate: {
            create: {
              name: area.name,
            },
            where: {
              name: area.name,
            },
          },
        },
      },
      where: {
        id,
      },
    })

    return res.status(201).json(role)
  }

  try {
    const role = await prisma.role.create({
      include,
      data: {
        name,
        area: {
          connectOrCreate: {
            create: {
              name: area.name,
            },
            where: {
              name: area.name,
            },
          },
        },
      },
    })

    return res.status(201).json(role)
  } catch (e) {
    return res.status(500).end()
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  session(req, res)

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
