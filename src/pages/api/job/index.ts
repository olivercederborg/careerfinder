import { Prisma } from '.prisma/client'
import { jsonHeader } from 'lib/jsonHeader'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export type PostJob = {
  name: string
  roleName: string
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const jobs = await prisma.job.findMany()

  return res.status(200).json(jobs)
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body

  const job = await prisma.job.create({
    data: { name },
  })

  return res.status(200).json(job)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  try {
    switch (method) {
      case 'GET': {
        return getHandler(req, res)
      }
      case 'POST': {
        return postHandler(req, res)
      }
      default: {
        return res.status(405).end()
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}
