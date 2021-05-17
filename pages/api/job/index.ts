import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

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
  const id = Number(req.body.id)
  const { name } = req.body

  const job = await prisma.job.upsert({
    create: {
      name,
    },
    update: {
      name,
    },
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
