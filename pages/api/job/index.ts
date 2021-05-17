import { Prisma } from '.prisma/client'
import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export type PostJob = {
  name: string
  roleName: string
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id ?? 0)

  if (Number.isNaN(id)) {
    return res.status(204).end()
  }

  jsonHeader(res)

  if (id) {
    const job = await prisma.job.findUnique({
      where: {
        id: Number(id),
      },
    })

    return res.status(200).json(job)
  }

  const jobs = await prisma.job.findMany()

  return res.status(200).json(jobs)
}

async function post(req: NextApiRequest, res: NextApiResponse) {
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
      connectOrCreate: {
        create: {
          name: role.name,
        },
        where: {
          name: role.name,
        },
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
