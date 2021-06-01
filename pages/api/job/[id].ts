import { Prisma } from '.prisma/client'
import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.body.id ?? 0)
  const { name, roleName } = req.body

  const role = await prisma.role.upsert({
    create: {
      name: roleName,
    },
    update: {},
    where: {
      name: roleName,
    },
  })

  const upsert: Prisma.JobUpsertArgs['create'] = {
    name,
    role: {
      connect: {
        name: role.name,
      },
    },
  }

  const job = await prisma.job.upsert({
    create: upsert,
    update: upsert,
    where: {
      id,
    },
  })

  return res.status(200).json(job)
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id ?? 0)

  if (Number.isNaN(id)) {
    return res.status(204).end()
  }

  jsonHeader(res)

  const job = await prisma.job.findUnique({
    where: {
      id: Number(id),
    },
  })

  return res.status(200).json(job)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  jsonHeader(res)

  try {
    switch (method) {
      case 'POST': {
        return postHandler(req, res)
      }
      case 'GET': {
        return getHandler(req, res)
      }
      default: {
        return res.status(405).end()
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
